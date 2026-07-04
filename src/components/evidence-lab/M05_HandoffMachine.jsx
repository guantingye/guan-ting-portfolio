import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion, StatusIcon } from './shared/labKit.jsx';

const STRINGS = {
    en: {
        eyebrow: 'SYSTEM MODEL',
        title: 'Control Handoff Machine',
        intent: 'Human ↔ automation handoff, as an operable state machine — not a diagram picture.',
        levels: [
            { name: 'Manual', control: 'Operator has control', tone: 'var(--gx-sky)' },
            { name: 'Assisted', control: 'Operator, with assist', tone: 'var(--gx-teal)' },
            { name: 'Supervised auto', control: 'Automation, operator supervises', tone: 'var(--gx-gold)' },
            { name: 'Full auto', control: 'Automation has control', tone: 'var(--gx-iris)' },
        ],
        whoLabel: 'Who has control', modeLabel: 'Mode', transitions: 'Transitions',
        cockpit: 'Cockpit strip', guardWord: 'Guard',
        actForward: ['Enable assist', 'Approve plan', 'Approve full auto', '—'],
        actBack: ['—', 'Take control', 'Take partial control', 'Hand back'],
        takeManual: 'Take manual control',
        degrade: 'Inject: sensor degraded',
        degradeMsg: 'Machine-initiated handoff: sensor degraded — automation stepped down to supervised. Operator, resume supervision.',
        blocked: 'Blocked: automation must reach a stable state before manual takeover.',
        blockedGuard: 'speed < threshold for 3 s (simulated)',
        legal: 'legal', illegal: 'needs step-down', log: 'Transition log',
        guards: {
            '0>1': 'operator enables assist', '1>0': 'operator takes control',
            '1>2': 'plan approved', '2>1': 'operator takes partial control',
            '2>3': 'confidence high for 10 s (simulated)', '3>2': 'operator resumes supervision',
        },
        notes: [
            { tag: 'Decision / 決策', text: 'Every automation level always shows who has control. Mode confusion is the exact failure this model exists to prevent.' },
            { tag: 'Trade-off / 取捨', text: 'Four levels, not six SAE-style. Fewer states a person can actually tell apart beats taxonomy completeness.' },
        ],
    },
    zh: {
        eyebrow: '系統模型',
        title: '控制權交接狀態機',
        intent: '人 ↔ 自動化的交接，做成可操作的狀態機——不是一張圖。',
        levels: [
            { name: '手動', control: '操作員持有控制', tone: 'var(--gx-sky)' },
            { name: '輔助', control: '操作員（有輔助）', tone: 'var(--gx-teal)' },
            { name: '監督自動', control: '自動化執行，操作員監督', tone: 'var(--gx-gold)' },
            { name: '完全自動', control: '自動化持有控制', tone: 'var(--gx-iris)' },
        ],
        whoLabel: '誰持有控制', modeLabel: '模式', transitions: '轉換',
        cockpit: '駕駛艙列', guardWord: '守衛條件',
        actForward: ['啟用輔助', '核准計畫', '核准完全自動', '—'],
        actBack: ['—', '取回控制', '取回部分控制', '交還'],
        takeManual: '取回手動控制',
        degrade: '注入：感測器降級',
        degradeMsg: '機器發起的交接：感測器降級——自動化降回監督層級。請操作員恢復監督。',
        blocked: '已阻擋：自動化必須先達到穩定狀態，才能交還手動。',
        blockedGuard: '速度 < 門檻 持續 3 秒（模擬）',
        legal: '合法', illegal: '需逐級退出', log: '轉換記錄',
        guards: {
            '0>1': '操作員啟用輔助', '1>0': '操作員取回控制',
            '1>2': '計畫已核准', '2>1': '操作員取回部分控制',
            '2>3': '可信度高持續 10 秒（模擬）', '3>2': '操作員恢復監督',
        },
        notes: [
            { tag: 'Decision / 決策', text: '每個自動化層級都持續顯示誰持有控制。模式混淆，正是這個模型要防止的失效。' },
            { tag: 'Trade-off / 取捨', text: '四個層級，而非 SAE 的六級。人能真正分辨的少數狀態，勝過分類完整。' },
        ],
    },
};

const NODE_X = [58, 196, 334, 472];
const CY = 42;

export default function M05HandoffMachine() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const reduced = usePrefersReducedMotion();
    const [level, setLevel] = useState(0);
    const [tokenX, setTokenX] = useState(NODE_X[0]);
    const [log, setLog] = useState([]);
    const [block, setBlock] = useState(null);
    const [alert, setAlert] = useState('');
    const raf = useRef(0);

    const pushLog = text => setLog(l => [{ id: Date.now() + Math.random(), text }, ...l].slice(0, 5));

    const animateTo = to => {
        const from = NODE_X[level];
        const target = NODE_X[to];
        if (reduced) { setTokenX(target); return; }
        cancelAnimationFrame(raf.current);
        const t0 = performance.now();
        const tick = now => {
            const p = Math.min(1, (now - t0) / 600);
            const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            setTokenX(from + (target - from) * eased);
            if (p < 1) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
    };
    useEffect(() => () => cancelAnimationFrame(raf.current), []);

    const transition = (to, machineInitiated) => {
        setBlock(null);
        if (to === level) return;
        if (Math.abs(to - level) !== 1) {
            setBlock({ text: t.blocked, guard: t.blockedGuard });
            return;
        }
        const key = `${level}>${to}`;
        const guard = machineInitiated ? t.degradeMsg : t.guards[key];
        animateTo(to);
        setLevel(to);
        pushLog(`${t.levels[level].name} → ${t.levels[to].name} · ${guard}`);
    };

    const degrade = () => {
        setBlock(null);
        if (level >= 2) { setAlert(t.degradeMsg); transition(level - 1, true); }
        else pushLog(t.degradeMsg);
        setTimeout(() => setAlert(''), 100);
    };

    const EDGES = [
        { from: 0, to: 1 }, { from: 1, to: 0 }, { from: 1, to: 2 }, { from: 2, to: 1 }, { from: 2, to: 3 }, { from: 3, to: 2 },
    ];

    return (
        <ModuleFrame id="gx-m05" num="05" tone="var(--gx-sky)" eyebrow={t.eyebrow} title={t.title} intent={t.intent} notes={t.notes}>
            <div className="gx-m05">
                <p className="gx-sr-only" aria-live="assertive">{alert}</p>

                <div className="gx-m05-diagram">
                    <svg viewBox="0 0 530 96" className="gx-m05-svg" role="img" aria-label={`${t.modeLabel}: ${t.levels[level].name}`}>
                        <line x1={NODE_X[0]} y1={CY} x2={NODE_X[3]} y2={CY} stroke="var(--gx-line-1)" strokeWidth="2" />
                        {NODE_X.map((x, i) => (
                            <g key={i}>
                                <circle cx={x} cy={CY} r="7" fill={i === level ? t.levels[i].tone : 'var(--gx-bg-3)'} stroke={t.levels[i].tone} strokeWidth="2" />
                                <text x={x} y={CY + 30} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill={i === level ? 'var(--gx-text-1)' : 'var(--gx-text-3)'}>{t.levels[i].name}</text>
                                <text x={x} y={CY - 16} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="var(--gx-text-3)">L{i}</text>
                            </g>
                        ))}
                        <circle cx={tokenX} cy={CY} r="4" fill="#fff" />
                        <circle cx={tokenX} cy={CY} r="9" fill="none" stroke={t.levels[level].tone} strokeWidth="1.5" opacity="0.6" />
                    </svg>
                    <div className="gx-m05-axis"><span>← human</span><span>automation →</span></div>
                </div>

                <div className="gx-m05-cols">
                    <div className="gx-m05-cockpit gx-panel" style={{ '--tone': t.levels[level].tone }} aria-label={t.cockpit}>
                        <span className="gx-eyebrow">{t.cockpit}</span>
                        <div className="gx-m05-mode">
                            <span className="gx-m05-mode-chip" style={{ color: t.levels[level].tone, borderColor: t.levels[level].tone }}>L{level} · {t.levels[level].name}</span>
                        </div>
                        <div className="gx-m05-who">
                            <span className="gx-m05-who-label">{t.whoLabel}</span>
                            <span className="gx-m05-who-val">
                                <StatusIcon name={level >= 2 ? 'swap' : 'check'} size={15} style={{ color: t.levels[level].tone }} />
                                {t.levels[level].control}
                            </span>
                        </div>
                        <div className="gx-m05-cockpit-actions">
                            {level < 3 && <button className="gx-btn gx-btn-accent" style={{ '--gx-accent': t.levels[level].tone }} onClick={() => transition(level + 1)}>{t.actForward[level]} ▸</button>}
                            {level > 0 && <button className="gx-btn" onClick={() => transition(level - 1)}>◂ {t.actBack[level]}</button>}
                            {level === 3 && <button className="gx-btn gx-m05-illegal" onClick={() => transition(0)}>{t.takeManual}</button>}
                        </div>
                        {block && (
                            <div className="gx-m05-block" role="alert">
                                <StatusIcon name="warn" size={15} style={{ color: 'var(--gx-amber)', flex: '0 0 auto' }} />
                                <span>{block.text} <b>{t.guardWord}: {block.guard}</b></span>
                            </div>
                        )}
                    </div>

                    <div className="gx-m05-side">
                        <div className="gx-m05-edges gx-panel">
                            <span className="gx-eyebrow">{t.transitions}</span>
                            <ul>
                                {EDGES.map(e => {
                                    const legalNow = e.from === level;
                                    return (
                                        <li key={`${e.from}>${e.to}`}>
                                            <button className={`gx-m05-edge${legalNow ? ' active' : ''}`} disabled={!legalNow} onClick={() => transition(e.to)}>
                                                <span className="gx-m05-edge-path">{t.levels[e.from].name} <span aria-hidden="true">→</span> {t.levels[e.to].name}</span>
                                                <span className="gx-m05-edge-guard">{t.guards[`${e.from}>${e.to}`]}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <button className="gx-btn gx-btn-amber gx-m05-degrade" onClick={degrade}>◈ {t.degrade}</button>
                        </div>
                        <div className="gx-m05-log gx-panel" aria-label={t.log}>
                            <span className="gx-eyebrow">{t.log}</span>
                            <ul aria-live="polite">
                                {log.length === 0 && <li className="gx-m05-log-empty">—</li>}
                                {log.map(e => <li key={e.id}>{e.text}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('gx-m05-styles', `
.gx-m05-diagram { padding: 16px 8px; background: var(--gx-bg-1); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); margin-bottom: 16px; }
.gx-m05-svg { width: 100%; height: auto; display: block; }
.gx-m05-axis { display: flex; justify-content: space-between; padding: 0 44px; font-family: var(--gx-font-data); font-size: 10px; color: var(--gx-text-3); }
.gx-m05-cols { display: grid; grid-template-columns: 1fr; gap: 16px; }
.gx-m05-cockpit { padding: 18px; --tone: var(--gx-sky); }
.gx-m05-cockpit > .gx-eyebrow { color: var(--gx-text-3); }
.gx-m05-mode { margin: 12px 0; }
.gx-m05-mode-chip { display: inline-block; font-family: var(--gx-font-data); font-size: 13px; letter-spacing: 0.06em; padding: 6px 12px; border: 1px solid; border-radius: 999px; }
.gx-m05-who { display: flex; flex-direction: column; gap: 4px; padding: 12px 0; border-top: 1px solid var(--gx-line-1); border-bottom: 1px solid var(--gx-line-1); margin-bottom: 14px; }
.gx-m05-who-label { font-family: var(--gx-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gx-text-3); }
.gx-m05-who-val { display: flex; align-items: center; gap: 8px; font-size: 15px; color: var(--gx-text-1); }
.gx-m05-cockpit-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.gx-m05-illegal { border-style: dashed; color: var(--gx-text-3); }
.gx-m05-block { display: flex; gap: 10px; align-items: flex-start; margin-top: 14px; padding: 12px; border: 1px solid var(--gx-amber); border-radius: var(--gx-r-sm); background: var(--gx-amber-dim); font-size: 13px; line-height: 1.5; color: var(--gx-text-1); }
.gx-m05-block b { color: var(--gx-amber); font-family: var(--gx-font-data); font-weight: 400; font-size: 12px; }

.gx-m05-side { display: grid; gap: 16px; }
.gx-m05-edges { padding: 16px; }
.gx-m05-edges > .gx-eyebrow { color: var(--gx-text-3); }
.gx-m05-edges ul { list-style: none; margin: 12px 0; padding: 0; display: grid; gap: 6px; }
.gx-m05-edge { display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%; padding: 8px 12px; border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-sm); transition: border-color 160ms var(--gx-ease), opacity 160ms; }
.gx-m05-edge[disabled] { opacity: 0.35; cursor: default; }
.gx-m05-edge.active:hover { border-color: var(--gx-sky); }
.gx-m05-edge-path { font-size: 12.5px; color: var(--gx-text-1); }
.gx-m05-edge-guard { font-family: var(--gx-font-data); font-size: 10px; color: var(--gx-text-3); text-align: right; }
.gx-m05-degrade { width: 100%; justify-content: center; }
.gx-m05-log { padding: 16px; }
.gx-m05-log > .gx-eyebrow { color: var(--gx-text-3); }
.gx-m05-log ul { list-style: none; margin: 10px 0 0; padding: 0; font-family: var(--gx-font-data); font-size: 11px; }
.gx-m05-log li { padding: 5px 0; border-bottom: 1px dashed var(--gx-line-1); color: var(--gx-text-2); line-height: 1.5; }
.gx-m05-log-empty { color: var(--gx-text-3); }

@media (min-width: 900px) {
  .gx-m05-cols { grid-template-columns: 1fr 1fr; align-items: start; }
}
`);
