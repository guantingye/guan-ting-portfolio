import React, { useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion, STATUS, StatusIcon } from './shared/labKit.jsx';

// Contrast ratios below are verified with WCAG 2.1 relative luminance:
//   L = 0.2126·R + 0.7152·G + 0.0722·B  (each channel linearized:
//   c/12.92 if c ≤ 0.03928 else ((c+0.055)/1.055)^2.4), ratio = (Lhi+0.05)/(Llo+0.05).
// Day ratios are against panel #14171D; night ratios against #05080C.
const RAMP = ['normal', 'advisory', 'warning', 'critical', 'offline'];

const STRINGS = {
    en: {
        eyebrow: 'DESIGN SYSTEM',
        title: 'HMI Token Specimen',
        intent: 'The system layer under every module above — with contrast numbers printed, not implied.',
        tabs: ['Status color', 'Glance type', 'Targets & density', 'Motion'],
        colHex: 'Hex', colSample: 'On-surface', colDay: 'Day', colNight: 'Night', night: 'Night-shift',
        typeRule: 'Sizing heuristic: x-height ≥ distance ÷ 150 (stated as a heuristic, not a law).',
        distances: [{ d: '40 cm', ctx: 'Desk', px: 30 }, { d: '1 m', ctx: 'Standing', px: 46 }, { d: '3 m', ctx: 'Wall', px: 72 }],
        sample: '4.2 bar', secondary: 'loop A nominal',
        densityTitle: 'Density mode', desk: 'Desk · 40 px', gloved: 'Gloved · 56 px',
        targetNote: 'Minimum touch target',
        clusterAck: 'Acknowledge', clusterReduce: 'Reduce', clusterHold: 'Hold',
        motionCols: ['Intent', 'Duration', 'Easing', ''],
        motion: [
            { intent: 'State change', dur: '240 ms', ease: 'standard', cb: 'cubic-bezier(.22,1,.36,1)' },
            { intent: 'Alert enter', dur: '160 ms', ease: 'ease-out', cb: 'cubic-bezier(0,0,.2,1)' },
            { intent: 'Recovery', dur: '400 ms', ease: 'decelerate', cb: 'cubic-bezier(0,0,.2,1)' },
        ],
        play: 'Play', before: 'before', after: 'after', motionPaused: 'Motion paused — before / after frames shown.',
        notes: [
            { tag: 'Decision / 決策', text: 'Contrast ratios are printed on the swatches, because claiming accessibility without numbers is decoration.' },
            { tag: 'Trade-off / 取捨', text: 'Two density modes, not a continuum. Discrete modes can be QA-ed; continuums cannot.' },
        ],
    },
    zh: {
        eyebrow: '設計系統',
        title: 'HMI 設計代幣切片',
        intent: '上面每個模組底下的系統層——對比數字直接印出來，而非暗示。',
        tabs: ['狀態色', '一瞥字級', '目標與密度', '動態'],
        colHex: '色碼', colSample: '表面上', colDay: '日間', colNight: '夜間', night: '夜班',
        typeRule: '尺寸經驗法則：x 高度 ≥ 距離 ÷ 150（明說是經驗法則，非定律）。',
        distances: [{ d: '40 cm', ctx: '桌面', px: 30 }, { d: '1 m', ctx: '站立', px: 46 }, { d: '3 m', ctx: '牆面', px: 72 }],
        sample: '4.2 bar', secondary: '迴路 A 正常',
        densityTitle: '密度模式', desk: '桌面 · 40 px', gloved: '手套 · 56 px',
        targetNote: '最小點擊目標',
        clusterAck: '確認', clusterReduce: '降流量', clusterHold: '長按',
        motionCols: ['意圖', '時長', '緩動', ''],
        motion: [
            { intent: '狀態變化', dur: '240 ms', ease: 'standard', cb: 'cubic-bezier(.22,1,.36,1)' },
            { intent: '警示進場', dur: '160 ms', ease: 'ease-out', cb: 'cubic-bezier(0,0,.2,1)' },
            { intent: '復原', dur: '400 ms', ease: 'decelerate', cb: 'cubic-bezier(0,0,.2,1)' },
        ],
        play: '播放', before: '前', after: '後', motionPaused: '動態已暫停——顯示前 / 後兩幀。',
        notes: [
            { tag: 'Decision / 決策', text: '對比數字直接印在色票上，因為沒有數字的無障礙宣稱只是裝飾。' },
            { tag: 'Trade-off / 取捨', text: '兩種密度模式，而非連續值。離散模式可被 QA；連續值不行。' },
        ],
    },
};

function StatusColorTab({ t, lang }) {
    return (
        <div className="gx-m09-ramps">
            <div className="gx-m09-ramp-head">
                <span /><span>{t.colHex}</span><span>{t.colSample}</span><span>{t.colDay}</span><span>{t.colNight}</span>
            </div>
            {RAMP.map(k => {
                const s = STATUS[k];
                return (
                    <div className="gx-m09-ramp" key={k}>
                        <span className="gx-m09-ramp-name"><StatusIcon name={s.icon} size={14} style={{ color: s.hex }} /> {s.label[lang]}</span>
                        <code className="gx-m09-ramp-hex">{s.hex}</code>
                        <span className="gx-m09-ramp-chip" style={{ background: '#14171D', color: s.hex }}>Aa 4.2</span>
                        <span className="gx-m09-ramp-ratio">{s.ratio}:1</span>
                        <span className="gx-m09-ramp-night">
                            <span className="gx-m09-ramp-chip" style={{ background: '#05080C', color: s.night }}>Aa</span>
                            <em>{s.nightRatio}:1</em>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

function GlanceTypeTab({ t }) {
    return (
        <div className="gx-m09-type">
            {t.distances.map(d => (
                <div className="gx-m09-type-row" key={d.d}>
                    <div className="gx-m09-type-meta">
                        <span className="gx-m09-type-dist">{d.d}</span>
                        <span className="gx-m09-type-ctx">{d.ctx}</span>
                    </div>
                    <div className="gx-m09-type-sample">
                        <span style={{ fontSize: d.px }}>{t.sample}</span>
                        <small>{t.secondary}</small>
                    </div>
                </div>
            ))}
            <p className="gx-caption gx-m09-type-rule">{t.typeRule}</p>
        </div>
    );
}

function DensityTab({ t }) {
    const [gloved, setGloved] = useState(false);
    const px = gloved ? 56 : 40;
    return (
        <div className="gx-m09-density">
            <div className="gx-m09-density-toggle" role="radiogroup" aria-label={t.densityTitle}>
                <button role="radio" aria-checked={!gloved} className={`gx-m09-dbtn${!gloved ? ' on' : ''}`} onClick={() => setGloved(false)}>{t.desk}</button>
                <button role="radio" aria-checked={gloved} className={`gx-m09-dbtn${gloved ? ' on' : ''}`} onClick={() => setGloved(true)}>{t.gloved}</button>
            </div>
            <div className="gx-m09-cluster" style={{ '--hit': `${px}px` }}>
                <button className="gx-m09-cbtn primary">{t.clusterAck}</button>
                <button className="gx-m09-cbtn">{t.clusterReduce}</button>
                <div className="gx-m09-stepper">
                    <button className="gx-m09-cbtn" aria-label="decrease">−</button>
                    <span>70%</span>
                    <button className="gx-m09-cbtn" aria-label="increase">+</button>
                </div>
            </div>
            <p className="gx-caption">{t.targetNote}: <b style={{ color: 'var(--gx-teal)' }}>{px} px</b></p>
        </div>
    );
}

function MotionTab({ t, reduced }) {
    const [playing, setPlaying] = useState(null);
    const timer = useRef(0);
    const play = i => {
        clearTimeout(timer.current);
        setPlaying(i);
        timer.current = setTimeout(() => setPlaying(null), 700);
    };
    return (
        <div className="gx-m09-motion">
            {reduced && <p className="gx-caption gx-m09-motion-note">{t.motionPaused}</p>}
            <div className="gx-m09-motion-head">
                {t.motionCols.map((c, i) => <span key={i}>{c}</span>)}
            </div>
            {t.motion.map((m, i) => (
                <div className="gx-m09-motion-row" key={m.intent}>
                    <span className="gx-m09-motion-intent">{m.intent}</span>
                    <code>{m.dur}</code>
                    <code className="gx-m09-motion-ease">{m.ease}</code>
                    <div className="gx-m09-motion-demo">
                        {reduced ? (
                            <div className="gx-m09-frames">
                                <span className="gx-m09-frame"><i style={{ opacity: 0.3 }} />{t.before}</span>
                                <span className="gx-m09-frame"><i />{t.after}</span>
                            </div>
                        ) : (
                            <>
                                <div className="gx-m09-track">
                                    <span className="gx-m09-dot" style={{
                                        transform: playing === i ? 'translateX(56px)' : 'translateX(0)',
                                        opacity: playing === i ? 1 : 0.4,
                                        transitionDuration: m.dur, transitionTimingFunction: m.cb,
                                    }} />
                                </div>
                                <button className="gx-btn gx-m09-play" onClick={() => play(i)}>▸ {t.play}</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

const TAB_COMPS = [StatusColorTab, GlanceTypeTab, DensityTab, MotionTab];

export default function M09TokenSpecimen() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const reduced = usePrefersReducedMotion();
    const [tab, setTab] = useState(0);
    const tabsRef = useRef([]);

    const onKey = e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const next = e.key === 'ArrowRight' ? (tab + 1) % 4 : (tab + 3) % 4;
        setTab(next);
        tabsRef.current[next]?.focus();
    };
    const Body = TAB_COMPS[tab];

    return (
        <ModuleFrame id="gx-m09" num="09" tone="var(--gx-teal)" eyebrow={t.eyebrow} title={t.title} intent={t.intent} notes={t.notes}>
            <div className="gx-m09">
                <div className="gx-m09-tabs" role="tablist" aria-label={t.title} onKeyDown={onKey}>
                    {t.tabs.map((label, i) => (
                        <button key={label} role="tab" id={`gx-m09-tab-${i}`} aria-selected={tab === i}
                            aria-controls={`gx-m09-panel-${i}`} tabIndex={tab === i ? 0 : -1}
                            ref={el => (tabsRef.current[i] = el)}
                            className={`gx-m09-tab${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>
                            <span className="gx-m09-tab-num">0{i + 1}</span> {label}
                        </button>
                    ))}
                </div>
                <div className="gx-m09-panel" role="tabpanel" id={`gx-m09-panel-${tab}`} aria-labelledby={`gx-m09-tab-${tab}`} tabIndex={0}>
                    <Body t={t} lang={lang} reduced={reduced} />
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('gx-m09-styles', `
.gx-m09-tabs { display: flex; gap: 4px; flex-wrap: wrap; border-bottom: 1px solid var(--gx-line-1); margin-bottom: 18px; }
.gx-m09-tab { font-size: 13px; font-weight: 600; color: var(--gx-text-3); padding: 10px 14px; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: color 160ms var(--gx-ease), border-color 160ms var(--gx-ease); }
.gx-m09-tab.active { color: var(--gx-text-1); border-bottom-color: var(--gx-teal); }
.gx-m09-tab-num { font-family: var(--gx-font-data); font-size: 10px; color: var(--gx-teal); margin-right: 3px; }
.gx-m09-panel:focus-visible { outline: 2px solid var(--gx-teal); outline-offset: 4px; border-radius: 4px; }

/* status ramps */
.gx-m09-ramp-head, .gx-m09-ramp { display: grid; grid-template-columns: 1.4fr 1fr 1fr 0.7fr 1.1fr; gap: 12px; align-items: center; }
.gx-m09-ramp-head { padding: 0 0 8px; font-family: var(--gx-font-data); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--gx-text-3); border-bottom: 1px solid var(--gx-line-1); }
.gx-m09-ramp { padding: 12px 0; border-bottom: 1px dashed var(--gx-line-1); }
.gx-m09-ramp-name { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--gx-text-1); }
.gx-m09-ramp-hex { font-family: var(--gx-font-data); font-size: 12px; color: var(--gx-text-2); }
.gx-m09-ramp-chip { display: inline-flex; align-items: center; justify-content: center; min-width: 46px; padding: 5px 8px; font-family: var(--gx-font-data); font-size: 12px; border-radius: 4px; border: 1px solid var(--gx-line-1); }
.gx-m09-ramp-ratio { font-family: var(--gx-font-data); font-size: 12px; color: var(--gx-teal); }
.gx-m09-ramp-night { display: flex; align-items: center; gap: 8px; }
.gx-m09-ramp-night em { font-family: var(--gx-font-data); font-size: 11px; font-style: normal; color: var(--gx-text-3); }

/* glance type */
.gx-m09-type-row { display: flex; align-items: center; gap: 20px; padding: 16px 0; border-bottom: 1px dashed var(--gx-line-1); }
.gx-m09-type-meta { flex: 0 0 90px; }
.gx-m09-type-dist { display: block; font-family: var(--gx-font-data); font-size: 14px; color: var(--gx-teal); }
.gx-m09-type-ctx { font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-text-3); }
.gx-m09-type-sample span { font-family: var(--gx-font-data); font-weight: 500; color: var(--gx-text-1); line-height: 1; display: block; }
.gx-m09-type-sample small { font-size: 12px; color: var(--gx-text-3); }
.gx-m09-type-rule { margin-top: 16px; }

/* density */
.gx-m09-density-toggle { display: inline-flex; gap: 4px; padding: 3px; background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-sm); margin-bottom: 20px; }
.gx-m09-dbtn { font-family: var(--gx-font-data); font-size: 12px; color: var(--gx-text-3); padding: 7px 14px; border-radius: 5px; }
.gx-m09-dbtn.on { color: var(--gx-text-1); background: var(--gx-bg-3); }
.gx-m09-cluster { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.gx-m09-cbtn { min-height: var(--hit); min-width: var(--hit); display: inline-flex; align-items: center; justify-content: center; padding: 0 18px; font-size: 13px; font-weight: 600; color: var(--gx-text-1); background: var(--gx-bg-3); border: 1px solid var(--gx-line-2); border-radius: var(--gx-r-sm); transition: min-height 200ms var(--gx-ease), min-width 200ms var(--gx-ease); }
.gx-m09-cbtn.primary { background: var(--gx-teal); color: #060709; border-color: transparent; }
.gx-m09-stepper { display: flex; align-items: center; gap: 8px; }
.gx-m09-stepper span { font-family: var(--gx-font-data); font-size: 14px; color: var(--gx-text-1); min-width: 40px; text-align: center; }

/* motion */
.gx-m09-motion-note { margin-bottom: 14px; color: var(--gx-amber); }
.gx-m09-motion-head, .gx-m09-motion-row { display: grid; grid-template-columns: 1.2fr 0.8fr 1fr 1.4fr; gap: 12px; align-items: center; }
.gx-m09-motion-head { padding-bottom: 8px; font-family: var(--gx-font-data); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--gx-text-3); border-bottom: 1px solid var(--gx-line-1); }
.gx-m09-motion-row { padding: 14px 0; border-bottom: 1px dashed var(--gx-line-1); }
.gx-m09-motion-intent { font-size: 13px; color: var(--gx-text-1); }
.gx-m09-motion-row code { font-family: var(--gx-font-data); font-size: 12px; color: var(--gx-text-2); }
.gx-m09-motion-ease { color: var(--gx-text-3) !important; }
.gx-m09-motion-demo { display: flex; align-items: center; gap: 10px; }
.gx-m09-track { flex: 1; height: 24px; display: flex; align-items: center; background: var(--gx-bg-1); border-radius: var(--gx-r-sm); padding: 0 6px; }
.gx-m09-dot { width: 12px; height: 12px; border-radius: 3px; background: var(--gx-teal); transition-property: transform, opacity; }
.gx-m09-play { padding: 6px 12px; font-size: 12px; }
.gx-m09-frames { display: flex; gap: 12px; }
.gx-m09-frame { display: flex; flex-direction: column; align-items: center; gap: 4px; font-family: var(--gx-font-data); font-size: 10px; color: var(--gx-text-3); }
.gx-m09-frame i { width: 14px; height: 14px; border-radius: 3px; background: var(--gx-teal); }

@media (max-width: 620px) {
  .gx-m09-ramp-head, .gx-m09-ramp { grid-template-columns: 1.2fr 1fr 0.9fr; }
  .gx-m09-ramp-chip, .gx-m09-ramp-night { display: none; }
  .gx-m09-ramp-head span:nth-child(3), .gx-m09-ramp-head span:nth-child(5) { display: none; }
  .gx-m09-motion-head, .gx-m09-motion-row { grid-template-columns: 1fr 0.7fr 1.3fr; }
  .gx-m09-motion-ease { display: none; }
  .gx-m09-motion-head span:nth-child(3) { display: none; }
}
`);
