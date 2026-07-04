import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion, STATUS, StatusIcon } from './shared/labKit.jsx';

const STRINGS = {
    en: {
        eyebrow: 'RESEARCH METHOD',
        title: 'Glance Test Simulator',
        intent: 'Take the test the page keeps talking about: can you catch the change in three seconds?',
        a11yNote: 'This demo tests visual glance behaviour; each round result is also announced as text for screen-reader users.',
        run: 'Run 3-second glance', round: 'Round', watch: 'Watch the panel…',
        which: 'Which tile changed?', reveal: 'Answer', next: 'Next round', restart: 'Run again',
        correct: 'Correct', miss: 'Missed', colorOnly: 'color-only', multi: 'multi-channel',
        summaryTitle: 'Detection summary',
        rateColor: 'Color-only changes', rateMulti: 'Multi-channel changes', caught: 'caught',
        takeaway: 'Redundant coding is not decoration. It is detection speed.',
        simNote: 'Simulated scripted mutations · 5 rounds · a demonstration of method, not a statistic.',
        tiles: [
            { name: 'Pump pressure', val: '4.2 bar' }, { name: 'Flow rate', val: '62 %' }, { name: 'Temp', val: '48 °C' },
            { name: 'Valve', val: 'OPEN' }, { name: 'Queue depth', val: '3' }, { name: 'Link', val: 'OK' },
        ],
        notes: [
            { tag: 'Decision / 決策', text: 'Fixed scripted mutations, not full randomization, so the color-only vs multi-channel comparison is actually controlled.' },
            { tag: 'Trade-off / 取捨', text: 'Five rounds is far too few for statistics. It is a demonstration of method — and it says so.' },
        ],
    },
    zh: {
        eyebrow: '研究方法',
        title: '一眼測試模擬器',
        intent: '親自做這頁一直在講的測試：你能在三秒內抓到變化嗎？',
        a11yNote: '本示範測試視覺一瞥行為；每回合結果同時以文字向螢幕報讀器使用者播報。',
        run: '執行 3 秒一瞥', round: '回合', watch: '注視面板…',
        which: '哪一格變了？', reveal: '答案', next: '下一回合', restart: '再測一次',
        correct: '答對', miss: '漏看', colorOnly: '僅顏色', multi: '多重通道',
        summaryTitle: '偵測結果',
        rateColor: '僅顏色的變化', rateMulti: '多重通道的變化', caught: '抓到',
        takeaway: '多重編碼不是裝飾，而是可視速度。',
        simNote: '模擬腳本變化 · 5 回合 · 是方法示範，不是統計。',
        tiles: [
            { name: '泵浦壓力', val: '4.2 bar' }, { name: '流量', val: '62 %' }, { name: '溫度', val: '48 °C' },
            { name: '閥件', val: 'OPEN' }, { name: '佇列深度', val: '3' }, { name: '連線', val: 'OK' },
        ],
        notes: [
            { tag: 'Decision / 決策', text: '採用固定腳本變化而非全隨機，讓「僅顏色 vs 多重通道」的比較真的受控。' },
            { tag: 'Trade-off / 取捨', text: '五回合遠不足以做統計。這是方法示範——而且它明說了。' },
        ],
    },
};

// Fixed sequence (spec: color-only rounds are deliberately harder).
const SEQUENCE = [
    { tile: 2, channel: 'multi', status: 'warning', val: { en: '71 °C ▲', zh: '71 °C ▲' } },
    { tile: 0, channel: 'color', status: 'advisory' },
    { tile: 3, channel: 'multi', status: 'critical', val: { en: 'FAULT', zh: '故障' } },
    { tile: 4, channel: 'color', status: 'warning' },
    { tile: 1, channel: 'multi', status: 'advisory', val: { en: '54 % ▼', zh: '54 % ▼' } },
];
const ROUNDS = SEQUENCE.length;

function Tile({ tile, lang, mut, phase, revealed }) {
    const active = mut && phase !== 'idle';
    const s = active ? STATUS[mut.status] : STATUS.normal;
    const colorOnly = active && mut.channel === 'color';
    const icon = active && !colorOnly ? s.icon : STATUS.normal.icon;
    const value = active && !colorOnly && mut.val ? mut.val[lang] : tile.val;
    return (
        <div className={`gx-gt-tile${revealed ? ' revealed' : ''}`} style={{ '--tc': s.hex }}>
            <span className="gx-gt-tile-icon" style={{ color: s.hex }}><StatusIcon name={icon} size={15} /></span>
            <span className="gx-gt-tile-name">{tile.name}</span>
            <span className="gx-gt-tile-val" style={{ color: s.hex }}>{value}</span>
            <span className="gx-gt-tile-led" style={{ background: s.hex }} />
        </div>
    );
}

export default function M01GlanceTest() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const reduced = usePrefersReducedMotion();

    const [phase, setPhase] = useState('idle'); // idle | exposing | masked | result | summary
    const [round, setRound] = useState(0);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState([]);
    const [pick, setPick] = useState(null);
    const raf = useRef(0);

    const mut = phase === 'idle' || phase === 'summary' ? null : SEQUENCE[round];

    const startRound = () => {
        setPick(null); setProgress(0); setPhase('exposing');
        const t0 = performance.now();
        const tick = now => {
            const p = Math.min(1, (now - t0) / 3000);
            setProgress(p);
            if (p >= 1) { setPhase('masked'); return; }
            raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
    };
    useEffect(() => () => cancelAnimationFrame(raf.current), []);

    const answer = idx => {
        if (phase !== 'masked') return;
        const m = SEQUENCE[round];
        const correct = idx === m.tile;
        setPick(idx);
        setResults(r => [...r, { round, correct, channel: m.channel }]);
        setPhase('result');
    };
    useEffect(() => {
        if (phase !== 'masked') return;
        const onKey = e => { const n = parseInt(e.key, 10); if (n >= 1 && n <= 6) answer(n - 1); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    const advance = () => {
        if (round + 1 >= ROUNDS) setPhase('summary');
        else { setRound(round + 1); setPhase('idle'); }
    };
    const restart = () => { setRound(0); setResults([]); setPick(null); setPhase('idle'); };

    const rate = channel => {
        const rs = results.filter(r => r.channel === channel);
        const hit = rs.filter(r => r.correct).length;
        return { hit, total: rs.length, pct: rs.length ? Math.round((hit / rs.length) * 100) : 0 };
    };
    const lastResult = results[results.length - 1];
    const announce = lastResult
        ? `${t.round} ${lastResult.round + 1}: ${lastResult.correct ? t.correct : t.miss} · ${lastResult.channel === 'color' ? t.colorOnly : t.multi}`
        : '';
    const R = 20, C = 2 * Math.PI * R;

    return (
        <ModuleFrame id="gx-m01" num="01" tone="var(--gx-sky)" eyebrow={t.eyebrow} title={t.title} intent={t.intent} notes={t.notes}>
            <div className="gx-m01">
                <p className="gx-m01-a11y">{t.a11yNote}</p>
                <p className="gx-sr-only" aria-live="polite">{announce}</p>

                {phase !== 'summary' ? (
                    <>
                        <div className="gx-m01-panel-wrap">
                            <div className={`gx-m01-panel${phase === 'masked' ? ' masked' : ''}${phase === 'masked' && reduced ? ' solid' : ''}`}>
                                {t.tiles.map((tile, i) => (
                                    <Tile key={i} tile={tile} lang={lang} mut={mut}
                                        phase={phase} revealed={phase === 'result' && i === SEQUENCE[round].tile} />
                                ))}
                            </div>

                            {phase === 'exposing' && (
                                <div className="gx-m01-count" aria-hidden="true">
                                    {reduced
                                        ? <span className="gx-m01-count-num">{Math.ceil(3 * (1 - progress)) || 1}</span>
                                        : <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r={R} fill="none" stroke="var(--gx-line-2)" strokeWidth="3" />
                                            <circle cx="24" cy="24" r={R} fill="none" stroke="var(--gx-sky)" strokeWidth="3" strokeLinecap="round"
                                                strokeDasharray={C} strokeDashoffset={C * progress} transform="rotate(-90 24 24)" /></svg>}
                                </div>
                            )}
                            {phase === 'masked' && <div className="gx-m01-maskmsg">{t.which}</div>}
                        </div>

                        {phase === 'masked' && (
                            <div className="gx-m01-answers">
                                {t.tiles.map((tile, i) => (
                                    <button key={i} className="gx-btn gx-m01-answer" onClick={() => answer(i)}>
                                        <span className="gx-m01-answer-key">{i + 1}</span>{tile.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {phase === 'result' && (
                            <div className="gx-m01-result" role="status" style={{ '--gx-accent': lastResult.correct ? STATUS.normal.hex : STATUS.warning.hex }}>
                                <span className="gx-m01-result-tag">{lastResult.correct ? t.correct : t.miss}</span>
                                <span className="gx-m01-result-ch">{lastResult.channel === 'color' ? t.colorOnly : t.multi}</span>
                                <button className="gx-btn gx-btn-accent" onClick={advance}>{t.next} ▸</button>
                            </div>
                        )}

                        <div className="gx-m01-bar">
                            {(phase === 'idle') && <button className="gx-btn gx-btn-accent" style={{ '--gx-accent': 'var(--gx-sky)' }} onClick={startRound}>◈ {t.run}</button>}
                            {phase === 'exposing' && <span className="gx-caption">{t.watch}</span>}
                            <span className="gx-m01-round">{t.round} {Math.min(round + 1, ROUNDS)} / {ROUNDS}</span>
                        </div>
                    </>
                ) : (
                    <div className="gx-m01-summary">
                        <span className="gx-eyebrow" style={{ color: 'var(--gx-sky)' }}>{t.summaryTitle}</span>
                        <div className="gx-m01-summary-grid">
                            {[['color', t.rateColor], ['multi', t.rateMulti]].map(([ch, label]) => {
                                const r = rate(ch);
                                return (
                                    <div className="gx-m01-rate" key={ch} style={{ '--tc': ch === 'color' ? STATUS.advisory.hex : STATUS.normal.hex }}>
                                        <span className="gx-m01-rate-label">{label}</span>
                                        <span className="gx-m01-rate-big">{r.pct}%</span>
                                        <span className="gx-m01-rate-sub">{r.hit}/{r.total} {t.caught}</span>
                                        <div className="gx-m01-rate-track"><span style={{ width: `${r.pct}%` }} /></div>
                                    </div>
                                );
                            })}
                        </div>
                        <blockquote className="gx-m01-takeaway">{t.takeaway}<span>／{STRINGS[lang === 'en' ? 'zh' : 'en'].takeaway}</span></blockquote>
                        <button className="gx-btn" onClick={restart}>↺ {t.restart}</button>
                    </div>
                )}
                <p className="gx-caption gx-m01-simnote">{t.simNote}</p>
            </div>
        </ModuleFrame>
    );
}

injectStyles('gx-m01-styles', `
.gx-m01-a11y { font-size: 12.5px; color: var(--gx-text-3); border-left: 2px solid var(--gx-line-2); padding-left: 12px; margin: 0 0 16px; }
.gx-m01-panel-wrap { position: relative; }
.gx-m01-panel { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 16px; background: var(--gx-bg-1); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); transition: filter 200ms var(--gx-ease); }
.gx-m01-panel.masked { filter: blur(7px); }
.gx-m01-panel.masked.solid { filter: none; opacity: 0; }
.gx-gt-tile { position: relative; display: grid; grid-template-columns: auto 1fr; grid-template-rows: auto auto; gap: 2px 8px; padding: 12px; background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-left: 2px solid var(--tc); border-radius: var(--gx-r-sm); transition: border-color 200ms var(--gx-ease); }
.gx-gt-tile.revealed { border-color: var(--gx-sky); box-shadow: 0 0 0 2px var(--gx-sky); }
.gx-gt-tile-icon { grid-row: 1 / 3; align-self: center; }
.gx-gt-tile-name { font-family: var(--gx-font-data); font-size: 10px; letter-spacing: 0.04em; color: var(--gx-text-3); }
.gx-gt-tile-val { font-family: var(--gx-font-data); font-size: 15px; font-weight: 500; }
.gx-gt-tile-led { position: absolute; top: 10px; right: 10px; width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 6px currentColor; }
.gx-m01-maskmsg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--gx-font-display); font-size: 22px; color: var(--gx-text-1); }
.gx-m01-count { position: absolute; top: 12px; right: 12px; width: 40px; height: 40px; }
.gx-m01-count svg { width: 40px; height: 40px; }
.gx-m01-count-num { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; font-family: var(--gx-font-data); font-size: 22px; color: var(--gx-sky); }

.gx-m01-answers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 14px; }
.gx-m01-answer { justify-content: flex-start; }
.gx-m01-answer-key { font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-sky); border: 1px solid var(--gx-line-2); border-radius: 4px; padding: 1px 6px; }
.gx-m01-result { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-top: 14px; padding: 12px 16px; border: 1px solid var(--gx-accent); border-radius: var(--gx-r-md); background: color-mix(in srgb, var(--gx-accent) 8%, var(--gx-bg-1)); }
.gx-m01-result-tag { font-family: var(--gx-font-data); font-size: 13px; font-weight: 500; color: var(--gx-accent); text-transform: uppercase; letter-spacing: 0.08em; }
.gx-m01-result-ch { font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-text-3); }
.gx-m01-result .gx-btn { margin-left: auto; }
.gx-m01-bar { display: flex; align-items: center; gap: 14px; margin-top: 16px; }
.gx-m01-round { margin-left: auto; font-family: var(--gx-font-data); font-size: 12px; color: var(--gx-text-3); }

.gx-m01-summary { padding: 20px; background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); }
.gx-m01-summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin: 14px 0; }
.gx-m01-rate { padding: 16px; background: var(--gx-bg-1); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); }
.gx-m01-rate-label { font-family: var(--gx-font-data); font-size: 11px; letter-spacing: 0.04em; color: var(--gx-text-3); }
.gx-m01-rate-big { display: block; font-family: var(--gx-font-data); font-size: 34px; font-weight: 500; color: var(--tc); margin: 6px 0 2px; }
.gx-m01-rate-sub { font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-text-3); }
.gx-m01-rate-track { height: 5px; margin-top: 10px; background: var(--gx-bg-3); border-radius: 3px; overflow: hidden; }
.gx-m01-rate-track span { display: block; height: 100%; background: var(--tc); border-radius: 3px; transition: width 500ms var(--gx-ease); }
.gx-m01-takeaway { margin: 4px 0 18px; padding-left: 14px; border-left: 2px solid var(--gx-sky); font-family: var(--gx-font-display); font-size: 19px; line-height: 1.4; color: var(--gx-text-1); }
.gx-m01-takeaway span { display: block; font-family: var(--gx-font-body); font-size: 13px; color: var(--gx-text-3); margin-top: 4px; }
.gx-m01-simnote { margin-top: 16px; }
@media (max-width: 560px) {
  .gx-m01-panel, .gx-m01-answers { grid-template-columns: repeat(2, 1fr); }
}
`);
