import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion } from './shared/labKit.jsx';

const STRINGS = {
    en: {
        eyebrow: 'INTERACTION SPEC',
        title: 'Timing & Feedback Budget',
        intent: 'Latency budgets tied to perception thresholds — each one demonstrated live, not asserted.',
        scale: 'Perception budget',
        bands: [
            { range: '0–100 ms', name: 'Instant' },
            { range: '100–300 ms', name: 'Responsive' },
            { range: '300 ms–1 s', name: 'Flow-break' },
            { range: '> 1 s', name: 'Attention-loss' },
        ],
        specWord: 'Spec', breaksWord: 'Breaks when',
        demos: [
            { title: 'Immediate press-state', label: 'Press me', hint: 'pressed-state on the same frame',
              rule: 'Feedback to a direct manipulation must land under ~100 ms, ideally the same frame.',
              breaks: 'A network round-trip is placed on the press path instead of local state.' },
            { title: '240 ms panel transition', label: 'Toggle panel', hint: 'exactly 240 ms ease',
              rule: 'State changes animate at 240 ms — fast enough to feel responsive, slow enough to follow.',
              breaks: 'The same 240 ms feels sluggish on a desktop and right on a wall display; the spec names its target device.' },
            { title: 'Optimistic commit', label: 'Save', hint: 'flip now, reconcile after',
              rule: 'For reversible actions, reflect the result instantly and reconcile in the background.',
              breaks: 'Optimistic UI is forbidden for irreversible actions — see Module 03 confirmation friction.' },
            { title: 'Determinate progress', label: 'Run task', hint: 'determinate + cancel',
              rule: 'Past ~1 s, show determinate progress and a cancel affordance; never a mystery spinner.',
              breaks: 'An indeterminate spinner is used where the duration is actually known.' },
        ],
        committing: 'committing…', committed: 'committed (simulated 600 ms)', saved: 'Saved', save: 'Save',
        run: 'Run task', cancel: 'Cancel', done: 'Done', pressed: 'pressed', panelText: 'Panel content · 240 ms',
        notes: [
            { tag: 'Decision / 決策', text: 'Budgets are written as design contracts the frontend can be tested against — not vibes.' },
            { tag: 'Trade-off / 取捨', text: '240 ms feels slow on desktop and right on a wall display; the spec names its target device instead of pretending one number fits all.' },
        ],
    },
    zh: {
        eyebrow: '互動規格',
        title: '時序與回饋預算',
        intent: '把延遲預算綁到知覺門檻——每一條都現場示範，而非空談。',
        scale: '知覺預算',
        bands: [
            { range: '0–100 ms', name: '即時' },
            { range: '100–300 ms', name: '有反應' },
            { range: '300 ms–1 s', name: '打斷心流' },
            { range: '> 1 s', name: '注意力流失' },
        ],
        specWord: '規格', breaksWord: '何時失效',
        demos: [
            { title: '立即按下狀態', label: '按我', hint: '同一幀給出按下狀態',
              rule: '對直接操作的回饋必須在約 100 ms 內出現，最好是同一幀。',
              breaks: '把網路往返放進按下路徑，而非使用本地狀態。' },
            { title: '240 ms 面板轉場', label: '切換面板', hint: '正好 240 ms 緩動',
              rule: '狀態變化以 240 ms 動畫——快到有反應感，慢到跟得上。',
              breaks: '同樣 240 ms 在桌機顯得慢、在牆面顯示器剛好；規格要指名目標裝置。' },
            { title: '樂觀提交', label: '儲存', hint: '先翻轉，之後對帳',
              rule: '對可逆操作，先即時反映結果，於背景對帳。',
              breaks: '樂觀 UI 禁用於不可逆操作——見模組 03 的確認摩擦。' },
            { title: '確定式進度', label: '執行任務', hint: '確定式 + 可取消',
              rule: '超過約 1 秒，顯示確定式進度與取消選項；絕不用神祕轉圈。',
              breaks: '在其實已知時長的情況下，卻用不確定的轉圈。' },
        ],
        committing: '提交中…', committed: '已提交（模擬 600 ms）', saved: '已儲存', save: '儲存',
        run: '執行任務', cancel: '取消', done: '完成', pressed: '已按下', panelText: '面板內容 · 240 ms',
        notes: [
            { tag: 'Decision / 決策', text: '預算寫成前端可被測試的設計契約——不是感覺。' },
            { tag: 'Trade-off / 取捨', text: '240 ms 在桌機顯得慢、在牆面顯示器剛好；規格指名目標裝置，而非假裝一個數字通吃。' },
        ],
    },
};

const BAND_TONES = ['var(--gx-teal)', 'var(--gx-sky)', 'var(--gx-amber)', 'var(--gx-gold)'];

function SpecFlyout({ demo, t }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="gx-m07-spec">
            <button className="gx-m07-spec-btn" aria-expanded={open} onClick={() => setOpen(o => !o)}>
                {t.specWord} {open ? '▾' : '▸'}
            </button>
            {open && (
                <div className="gx-m07-spec-body">
                    <p>{demo.rule}</p>
                    <p className="gx-m07-breaks"><span>{t.breaksWord}:</span> {demo.breaks}</p>
                </div>
            )}
        </div>
    );
}

function InstantDemo({ demo, t }) {
    const [down, setDown] = useState(false);
    return (
        <button className={`gx-m07-press${down ? ' down' : ''}`} onPointerDown={() => setDown(true)}
            onPointerUp={() => setDown(false)} onPointerLeave={() => setDown(false)}>
            {down ? `▟ ${t.pressed}` : demo.label}
        </button>
    );
}
function TransitionDemo({ demo, t }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="gx-m07-trans">
            <button className="gx-btn" onClick={() => setOpen(o => !o)}>{demo.label}</button>
            <div className={`gx-m07-trans-panel${open ? ' open' : ''}`}>{t.panelText}</div>
        </div>
    );
}
function OptimisticDemo({ demo, t }) {
    const [on, setOn] = useState(false);
    const [status, setStatus] = useState('');
    const timer = useRef(0);
    const toggle = () => {
        const next = !on;
        setOn(next);
        setStatus(t.committing);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setStatus(next ? t.committed : ''), 600);
    };
    useEffect(() => () => clearTimeout(timer.current), []);
    return (
        <div className="gx-m07-opt">
            <button role="switch" aria-checked={on} className={`gx-m07-switch${on ? ' on' : ''}`} onClick={toggle}>
                <span className="gx-m07-switch-knob" />
            </button>
            <span className="gx-m07-opt-status">{on ? (status || t.saved) : status}</span>
        </div>
    );
}
function ProgressDemo({ demo, t, reduced }) {
    const [pct, setPct] = useState(0);
    const [running, setRunning] = useState(false);
    const raf = useRef(0);
    const run = () => {
        setRunning(true); setPct(0);
        const t0 = performance.now();
        const tick = now => {
            const p = Math.min(1, (now - t0) / 2500);
            setPct(p);
            if (p < 1) raf.current = requestAnimationFrame(tick);
            else setRunning(false);
        };
        raf.current = requestAnimationFrame(tick);
    };
    const cancel = () => { cancelAnimationFrame(raf.current); setRunning(false); setPct(0); };
    useEffect(() => () => cancelAnimationFrame(raf.current), []);
    return (
        <div className="gx-m07-prog">
            <div className="gx-m07-prog-track"><span style={{ width: `${pct * 100}%` }} /></div>
            <div className="gx-m07-prog-row">
                {!running ? <button className="gx-btn" onClick={run}>{pct >= 1 ? t.done : t.run}</button>
                    : <button className="gx-btn" onClick={cancel}>{t.cancel}</button>}
                <span className="gx-m07-prog-pct">{Math.round(pct * 100)}%</span>
            </div>
        </div>
    );
}
const DEMO_COMPS = [InstantDemo, TransitionDemo, OptimisticDemo, ProgressDemo];

export default function M07TimingBudget() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const reduced = usePrefersReducedMotion();
    return (
        <ModuleFrame id="gx-m07" num="07" tone="var(--gx-gold)" eyebrow={t.eyebrow} title={t.title} intent={t.intent} notes={t.notes}>
            <div className="gx-m07">
                <div className="gx-m07-scale" aria-hidden="true">
                    {t.bands.map((b, i) => (
                        <div key={i} className="gx-m07-scale-band" style={{ '--tone': BAND_TONES[i] }}>
                            <span className="gx-m07-scale-range">{b.range}</span>
                            <span className="gx-m07-scale-name">{b.name}</span>
                        </div>
                    ))}
                </div>
                <div className="gx-m07-grid">
                    {t.demos.map((demo, i) => {
                        const Demo = DEMO_COMPS[i];
                        return (
                            <article className="gx-m07-card" key={i} style={{ '--tone': BAND_TONES[i] }}>
                                <div className="gx-m07-card-head">
                                    <span className="gx-m07-card-band">{t.bands[i].range}</span>
                                    <h5>{demo.title}</h5>
                                    <span className="gx-caption">{demo.hint}</span>
                                </div>
                                <div className="gx-m07-card-demo"><Demo demo={demo} t={t} reduced={reduced} /></div>
                                <SpecFlyout demo={demo} t={t} />
                            </article>
                        );
                    })}
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('gx-m07-styles', `
.gx-m07-scale { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; margin-bottom: 20px; }
.gx-m07-scale-band { padding: 10px 12px; background: var(--gx-bg-2); border-top: 2px solid var(--tone); border-radius: 0 0 var(--gx-r-sm) var(--gx-r-sm); }
.gx-m07-scale-range { display: block; font-family: var(--gx-font-data); font-size: 11px; color: var(--tone); }
.gx-m07-scale-name { display: block; font-size: 12px; color: var(--gx-text-2); margin-top: 2px; }
.gx-m07-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
.gx-m07-card { display: flex; flex-direction: column; padding: 16px; background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); }
.gx-m07-card-band { font-family: var(--gx-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--tone); }
.gx-m07-card-head h5 { margin: 6px 0 4px; font-size: 14px; color: var(--gx-text-1); }
.gx-m07-card-demo { display: flex; align-items: center; justify-content: center; min-height: 88px; margin: 14px 0; padding: 14px; background: var(--gx-bg-1); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-sm); }

.gx-m07-press { font-family: var(--gx-font-body); font-size: 13px; font-weight: 600; color: var(--gx-text-1); background: var(--gx-bg-3); border: 1px solid var(--gx-line-2); border-radius: var(--gx-r-sm); padding: 12px 20px; transition: transform 60ms linear, background 60ms linear; }
.gx-m07-press.down { transform: scale(0.94); background: var(--tone); color: #060709; border-color: var(--tone); }

.gx-m07-trans { width: 100%; text-align: center; }
.gx-m07-trans-panel { max-height: 0; overflow: hidden; opacity: 0; margin-top: 0; font-family: var(--gx-font-data); font-size: 12px; color: var(--gx-text-2); background: var(--gx-bg-3); border-radius: var(--gx-r-sm); transition: max-height 240ms var(--gx-ease), opacity 240ms var(--gx-ease), margin-top 240ms var(--gx-ease), padding 240ms var(--gx-ease); padding: 0 12px; }
.gx-m07-trans-panel.open { max-height: 60px; opacity: 1; margin-top: 10px; padding: 10px 12px; }

.gx-m07-opt { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.gx-m07-switch { width: 46px; height: 26px; border-radius: 999px; background: var(--gx-bg-3); border: 1px solid var(--gx-line-2); padding: 2px; display: flex; transition: background 200ms var(--gx-ease); }
.gx-m07-switch.on { background: var(--tone); border-color: var(--tone); justify-content: flex-end; }
.gx-m07-switch-knob { width: 20px; height: 20px; border-radius: 50%; background: var(--gx-text-1); }
.gx-m07-switch.on .gx-m07-switch-knob { background: #060709; }
.gx-m07-opt-status { font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-text-3); min-height: 14px; }

.gx-m07-prog { width: 100%; }
.gx-m07-prog-track { height: 8px; background: var(--gx-bg-3); border-radius: 4px; overflow: hidden; }
.gx-m07-prog-track span { display: block; height: 100%; background: var(--tone); border-radius: 4px; }
.gx-m07-prog-row { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
.gx-m07-prog-pct { font-family: var(--gx-font-data); font-size: 12px; color: var(--gx-text-2); }

.gx-m07-spec { border-top: 1px solid var(--gx-line-1); padding-top: 10px; margin-top: auto; }
.gx-m07-spec-btn { font-family: var(--gx-font-data); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--tone); }
.gx-m07-spec-body { margin-top: 8px; }
.gx-m07-spec-body p { margin: 0 0 6px; font-size: 12px; line-height: 1.5; color: var(--gx-text-2); }
.gx-m07-breaks span { font-family: var(--gx-font-data); font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--gx-text-3); }
`);
