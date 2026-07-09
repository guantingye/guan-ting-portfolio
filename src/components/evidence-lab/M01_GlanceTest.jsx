import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion, STATUS, StatusIcon } from './shared/labKit.jsx';

const STRINGS = {
    en: {
        eyebrow: 'RESEARCH METHOD',
        title: 'Glance Test: Can You Spot the Change?',
        intent: 'This small simulator turns one HMI question into a hands-on test: when a status changes quickly, can people notice it in three seconds?',
        a11yNote: 'This demo is mainly visual, but every round result is also announced in text for screen-reader users.',
        run: 'Start 3-second test',
        round: 'Round',
        watch: 'Watch the panel…',
        which: 'Which tile changed?',
        reveal: 'Answer',
        next: 'Next round',
        restart: 'Run again',
        correct: 'Correct',
        miss: 'Missed',
        colorOnly: 'color only',
        multi: 'color + shape + value',
        summaryTitle: 'What you detected',
        rateColor: 'Changes shown only by color',
        rateMulti: 'Changes shown with more than one cue',
        caught: 'noticed',
        takeaway: 'Important status changes should not rely on color alone. People detect them faster when color, icon, and value change together.',
        simNote: 'Scripted 5-round demo · Built to show the method, not to claim statistical significance.',
        tiles: [
            { name: 'Pump pressure', val: '4.2 bar' },
            { name: 'Flow rate', val: '62 %' },
            { name: 'Temperature', val: '48 °C' },
            { name: 'Valve status', val: 'OPEN' },
            { name: 'Queue depth', val: '3' },
            { name: 'System link', val: 'OK' },
        ],
        notes: [
            {
                tag: 'Design decision / 設計判斷',
                text: 'I used a fixed sequence instead of full randomization, so the comparison between “color only” and “multiple cues” stays controlled.',
            },
            {
                tag: 'Reading note / 閱讀提醒',
                text: 'Five rounds are not enough for statistical proof. This module is a method demonstration: it helps viewers feel why HMI states need more than color.',
            },
        ],
    },
    zh: {
        eyebrow: '研究方法',
        title: '一眼辨識測試：你看得出哪裡變了嗎？',
        intent: '這個小模擬器把一個 HMI 問題變成可以親自體驗的測試：當狀態快速改變時，人能不能在三秒內注意到？',
        a11yNote: '這個示範主要測試視覺辨識，但每回合結果也會用文字播報，讓螢幕閱讀器使用者能理解測試結果。',
        run: '開始 3 秒測試',
        round: '回合',
        watch: '請注視面板…',
        which: '哪一格剛剛變了？',
        reveal: '答案',
        next: '下一回合',
        restart: '再測一次',
        correct: '答對',
        miss: '漏看',
        colorOnly: '只靠顏色',
        multi: '顏色＋圖示＋數值',
        summaryTitle: '你的辨識結果',
        rateColor: '只用顏色提示的變化',
        rateMulti: '使用多種線索提示的變化',
        caught: '次看出',
        takeaway: '重要狀態不應該只靠顏色。當顏色、圖示與數值一起變化，人更快看出差異。',
        simNote: '固定腳本的 5 回合示範 · 用來展示方法，不宣稱統計顯著。',
        tiles: [
            { name: '泵浦壓力', val: '4.2 bar' },
            { name: '流量', val: '62 %' },
            { name: '溫度', val: '48 °C' },
            { name: '閥門狀態', val: 'OPEN' },
            { name: '排隊數量', val: '3' },
            { name: '系統連線', val: 'OK' },
        ],
        notes: [
            {
                tag: 'Design decision / 設計判斷',
                text: '我使用固定腳本，而不是完全隨機，讓「只靠顏色」與「多重線索」之間的比較能保持受控。',
            },
            {
                tag: 'Reading note / 閱讀提醒',
                text: '五回合不足以做統計推論。這個模組是方法示範，目的是讓觀看者實際感受到：HMI 狀態不能只靠顏色傳達。',
            },
        ],
    },
};

// Fixed sequence: color-only rounds are deliberately harder so viewers can feel
// why safety-facing interfaces need more than color.
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
            <span className="gx-gt-tile-icon" style={{ color: s.hex }}>
                <StatusIcon name={icon} size={15} />
            </span>
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
        setPick(null);
        setProgress(0);
        setPhase('exposing');

        const t0 = performance.now();

        const tick = now => {
            const p = Math.min(1, (now - t0) / 3000);
            setProgress(p);

            if (p >= 1) {
                setPhase('masked');
                return;
            }

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

        const onKey = e => {
            const n = parseInt(e.key, 10);
            if (n >= 1 && n <= 6) answer(n - 1);
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    const advance = () => {
        if (round + 1 >= ROUNDS) {
            setPhase('summary');
        } else {
            setRound(round + 1);
            setPhase('idle');
        }
    };

    const restart = () => {
        setRound(0);
        setResults([]);
        setPick(null);
        setPhase('idle');
    };

    const rate = channel => {
        const rs = results.filter(r => r.channel === channel);
        const hit = rs.filter(r => r.correct).length;

        return {
            hit,
            total: rs.length,
            pct: rs.length ? Math.round((hit / rs.length) * 100) : 0,
        };
    };

    const lastResult = results[results.length - 1];
    const announce = lastResult
        ? `${t.round} ${lastResult.round + 1}: ${lastResult.correct ? t.correct : t.miss} · ${lastResult.channel === 'color' ? t.colorOnly : t.multi}`
        : '';

    const R = 20;
    const C = 2 * Math.PI * R;

    return (
        <ModuleFrame
            id="gx-m01"
            num="01"
            tone="var(--gx-sky)"
            eyebrow={t.eyebrow}
            title={t.title}
            intent={t.intent}
            notes={t.notes}
        >
            <div className="gx-m01">
                <p className="gx-m01-a11y">{t.a11yNote}</p>
                <p className="gx-sr-only" aria-live="polite">{announce}</p>

                {phase !== 'summary' ? (
                    <>
                        <div className="gx-m01-panel-wrap">
                            <div className={`gx-m01-panel${phase === 'masked' ? ' masked' : ''}${phase === 'masked' && reduced ? ' solid' : ''}`}>
                                {t.tiles.map((tile, i) => (
                                    <Tile
                                        key={i}
                                        tile={tile}
                                        lang={lang}
                                        mut={mut}
                                        phase={phase}
                                        revealed={phase === 'result' && i === SEQUENCE[round].tile}
                                    />
                                ))}
                            </div>

                            {phase === 'exposing' && (
                                <div className="gx-m01-count" aria-hidden="true">
                                    {reduced ? (
                                        <span className="gx-m01-count-num">
                                            {Math.ceil(3 * (1 - progress)) || 1}
                                        </span>
                                    ) : (
                                        <svg viewBox="0 0 48 48">
                                            <circle
                                                cx="24"
                                                cy="24"
                                                r={R}
                                                fill="none"
                                                stroke="var(--gx-line-2)"
                                                strokeWidth="3"
                                            />
                                            <circle
                                                cx="24"
                                                cy="24"
                                                r={R}
                                                fill="none"
                                                stroke="var(--gx-sky)"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeDasharray={C}
                                                strokeDashoffset={C * progress}
                                                transform="rotate(-90 24 24)"
                                            />
                                        </svg>
                                    )}
                                </div>
                            )}

                            {phase === 'masked' && (
                                <div className="gx-m01-maskmsg">{t.which}</div>
                            )}
                        </div>

                        {phase === 'masked' && (
                            <div className="gx-m01-answers">
                                {t.tiles.map((tile, i) => (
                                    <button
                                        key={i}
                                        className="gx-btn gx-m01-answer"
                                        onClick={() => answer(i)}
                                    >
                                        <span className="gx-m01-answer-key">{i + 1}</span>
                                        {tile.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {phase === 'result' && (
                            <div
                                className="gx-m01-result"
                                role="status"
                                style={{ '--gx-accent': lastResult.correct ? STATUS.normal.hex : STATUS.warning.hex }}
                            >
                                <span className="gx-m01-result-tag">
                                    {lastResult.correct ? t.correct : t.miss}
                                </span>
                                <span className="gx-m01-result-ch">
                                    {lastResult.channel === 'color' ? t.colorOnly : t.multi}
                                </span>
                                <button className="gx-btn gx-btn-accent" onClick={advance}>
                                    {t.next} ▸
                                </button>
                            </div>
                        )}

                        <div className="gx-m01-bar">
                            {phase === 'idle' && (
                                <button
                                    className="gx-btn gx-btn-accent"
                                    style={{ '--gx-accent': 'var(--gx-sky)' }}
                                    onClick={startRound}
                                >
                                    ◈ {t.run}
                                </button>
                            )}

                            {phase === 'exposing' && (
                                <span className="gx-caption">{t.watch}</span>
                            )}

                            <span className="gx-m01-round">
                                {t.round} {Math.min(round + 1, ROUNDS)} / {ROUNDS}
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="gx-m01-summary">
                        <span className="gx-eyebrow" style={{ color: 'var(--gx-sky)' }}>
                            {t.summaryTitle}
                        </span>

                        <div className="gx-m01-summary-grid">
                            {[['color', t.rateColor], ['multi', t.rateMulti]].map(([ch, label]) => {
                                const r = rate(ch);

                                return (
                                    <div
                                        className="gx-m01-rate"
                                        key={ch}
                                        style={{ '--tc': ch === 'color' ? STATUS.advisory.hex : STATUS.normal.hex }}
                                    >
                                        <span className="gx-m01-rate-label">{label}</span>
                                        <span className="gx-m01-rate-big">{r.pct}%</span>
                                        <span className="gx-m01-rate-sub">
                                            {r.hit}/{r.total} {t.caught}
                                        </span>
                                        <div className="gx-m01-rate-track">
                                            <span style={{ width: `${r.pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <blockquote className="gx-m01-takeaway">
                            {t.takeaway}
                            <span>／{STRINGS[lang === 'en' ? 'zh' : 'en'].takeaway}</span>
                        </blockquote>

                        <button className="gx-btn" onClick={restart}>
                            ↺ {t.restart}
                        </button>
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