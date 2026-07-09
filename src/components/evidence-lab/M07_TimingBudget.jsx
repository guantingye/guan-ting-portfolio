import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion } from './shared/labKit.jsx';

const STRINGS = {
    en: {
        eyebrow: 'INTERACTION SPEC',
        title: 'Timing & Feedback Budget',
        intent: 'This module translates waiting time into user experience. A press needs to feel instant, a panel change needs to feel smooth, a save action needs reassurance, and longer tasks need visible progress instead of a mystery spinner.',
        scale: 'Perception budget',
        bands: [
            { range: '0–100 ms', name: 'Feels instant' },
            { range: '100–300 ms', name: 'Still responsive' },
            { range: '300 ms–1 s', name: 'Flow starts to break' },
            { range: '> 1 s', name: 'Attention starts to drift' },
        ],
        specWord: 'Rule',
        breaksWord: 'Fails when',
        demos: [
            {
                title: 'Immediate press feedback',
                label: 'Press me',
                hint: 'The button reacts as soon as it is pressed',
                rule: 'Direct manipulation should show feedback almost immediately. The user should feel that the interface reacted to their hand, not to a later server response.',
                breaks: 'The press state waits for a network request before changing, so the button feels unresponsive even if the system eventually succeeds.',
            },
            {
                title: '240 ms panel transition',
                label: 'Toggle panel',
                hint: 'A short transition that is easy to follow',
                rule: 'A state change can use a brief transition when it helps the user understand what moved or opened. Here, 240 ms keeps the motion visible without making the interface feel slow.',
                breaks: 'The same timing is reused everywhere without naming the device or distance. A desktop screen, wall display, and mobile interface may need different motion timing.',
            },
            {
                title: 'Respond first, sync after',
                label: 'Save',
                hint: 'Show the result now, then confirm in the background',
                rule: 'For reversible actions, the interface can show the expected result immediately and reconcile with the system afterward. This keeps the flow moving while still reporting status.',
                breaks: 'The action is irreversible or high-risk. In those cases, the interface should ask for confirmation instead of pretending the result is already safe.',
            },
            {
                title: 'Visible progress for longer tasks',
                label: 'Run task',
                hint: 'Progress is shown and can be cancelled',
                rule: 'Once a task takes long enough to make the user wait, the interface should show where things stand and offer a way out when possible.',
                breaks: 'A generic spinner is used even though the system already knows how long the task will take or how far it has progressed.',
            },
        ],
        committing: 'saving…',
        committed: 'saved after simulated sync',
        saved: 'Saved',
        save: 'Save',
        run: 'Run task',
        cancel: 'Cancel',
        done: 'Done',
        pressed: 'pressed',
        panelText: 'Panel content · 240 ms transition',
        notes: [
            {
                tag: 'Decision / 設計判斷',
                text: 'The timing rules are written as design contracts that a frontend implementation can be checked against, not as vague “make it feel smooth” comments.',
            },
            {
                tag: 'Trade-off / 取捨',
                text: 'A single timing value never fits every device. This specimen keeps 240 ms because the target context is an HMI-style monitoring display, where motion needs to be readable and calm.',
            },
        ],
    },
    zh: {
        eyebrow: '互動規格',
        title: '時序與回饋預算',
        intent: '這個模組把等待時間翻譯成使用者感受：按下按鈕要像即時反應，面板切換要能被看懂，儲存動作要讓人安心，較長任務則需要清楚進度，而不是只給一個不知道何時結束的轉圈。',
        scale: '感知時間預算',
        bands: [
            { range: '0–100 ms', name: '像即時反應' },
            { range: '100–300 ms', name: '仍然覺得順' },
            { range: '300 ms–1 s', name: '開始打斷流程' },
            { range: '> 1 s', name: '注意力開始漂移' },
        ],
        specWord: '規則',
        breaksWord: '什麼時候會失效',
        demos: [
            {
                title: '按下就立刻有回饋',
                label: '按我',
                hint: '按下的瞬間就看到狀態變化',
                rule: '直接操作的回饋應該幾乎立刻出現。使用者要感覺是自己的手觸發了介面，而不是等到某個後端回應後才有反應。',
                breaks: '按下狀態要等網路請求回來才改變。即使最後成功，使用者也會覺得按鈕沒有反應。',
            },
            {
                title: '240 ms 面板切換',
                label: '切換面板',
                hint: '短暫、可跟上的轉場',
                rule: '當轉場能幫助使用者理解畫面如何展開或移動時，可以保留短暫動畫。這裡的 240 ms 讓變化看得見，但不拖慢節奏。',
                breaks: '把同一個時間套用到所有裝置與距離。桌機、牆面顯示器、手機介面可能需要不同的動態節奏。',
            },
            {
                title: '先回應，再同步',
                label: '儲存',
                hint: '先顯示結果，再在背景確認',
                rule: '對可逆操作，介面可以先顯示預期結果，再和系統背景同步。這樣能保持流程順暢，同時仍讓使用者知道狀態。',
                breaks: '操作不可逆或風險很高。這種情況不該假裝已經安全完成，而應該先要求使用者確認。',
            },
            {
                title: '較長任務顯示明確進度',
                label: '執行任務',
                hint: '看得到進度，也能取消',
                rule: '當任務長到使用者需要等待時，介面應該清楚顯示目前進展；如果可以，也應提供取消選項。',
                breaks: '明明知道任務時長或進度，卻只顯示一個不確定的轉圈，讓使用者不知道還要等多久。',
            },
        ],
        committing: '儲存中…',
        committed: '已完成同步',
        saved: '已儲存',
        save: '儲存',
        run: '執行任務',
        cancel: '取消',
        done: '完成',
        pressed: '已按下',
        panelText: '面板內容 · 240 ms 轉場',
        notes: [
            {
                tag: 'Decision / 設計判斷',
                text: '這些時序不是「做順一點」這種模糊描述，而是前端實作可以被檢查的設計契約。',
            },
            {
                tag: 'Trade-off / 取捨',
                text: '沒有一個時間數字能適用所有裝置。這裡保留 240 ms，是因為目標情境偏向 HMI 監控畫面，需要讓動態看得清楚，也不能讓畫面變得焦躁。',
            },
        ],
    },
};

const BAND_TONES = ['var(--gx-teal)', 'var(--gx-sky)', 'var(--gx-amber)', 'var(--gx-gold)'];

function SpecFlyout({ demo, t }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="gx-m07-spec">
            <button
                className="gx-m07-spec-btn"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                {t.specWord} {open ? '▾' : '▸'}
            </button>

            {open && (
                <div className="gx-m07-spec-body">
                    <p>{demo.rule}</p>
                    <p className="gx-m07-breaks">
                        <span>{t.breaksWord}:</span> {demo.breaks}
                    </p>
                </div>
            )}
        </div>
    );
}

function InstantDemo({ demo, t }) {
    const [down, setDown] = useState(false);

    return (
        <button
            className={`gx-m07-press${down ? ' down' : ''}`}
            onPointerDown={() => setDown(true)}
            onPointerUp={() => setDown(false)}
            onPointerLeave={() => setDown(false)}
        >
            {down ? `▟ ${t.pressed}` : demo.label}
        </button>
    );
}

function TransitionDemo({ demo, t }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="gx-m07-trans">
            <button className="gx-btn" onClick={() => setOpen(o => !o)}>
                {demo.label}
            </button>

            <div className={`gx-m07-trans-panel${open ? ' open' : ''}`}>
                {t.panelText}
            </div>
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

        timer.current = setTimeout(() => {
            setStatus(next ? t.committed : '');
        }, 600);
    };

    useEffect(() => () => clearTimeout(timer.current), []);

    return (
        <div className="gx-m07-opt">
            <button
                role="switch"
                aria-checked={on}
                className={`gx-m07-switch${on ? ' on' : ''}`}
                onClick={toggle}
                aria-label={demo.label}
            >
                <span className="gx-m07-switch-knob" />
            </button>

            <span className="gx-m07-opt-status">
                {on ? (status || t.saved) : status}
            </span>
        </div>
    );
}

function ProgressDemo({ demo, t, reduced }) {
    const [pct, setPct] = useState(0);
    const [running, setRunning] = useState(false);
    const raf = useRef(0);

    const run = () => {
        setRunning(true);
        setPct(0);

        const t0 = performance.now();

        const tick = now => {
            const p = Math.min(1, (now - t0) / 2500);
            setPct(p);

            if (p < 1) {
                raf.current = requestAnimationFrame(tick);
            } else {
                setRunning(false);
            }
        };

        raf.current = requestAnimationFrame(tick);
    };

    const cancel = () => {
        cancelAnimationFrame(raf.current);
        setRunning(false);
        setPct(0);
    };

    useEffect(() => () => cancelAnimationFrame(raf.current), []);

    return (
        <div className="gx-m07-prog">
            <div className="gx-m07-prog-track">
                <span style={{ width: `${pct * 100}%` }} />
            </div>

            <div className="gx-m07-prog-row">
                {!running ? (
                    <button className="gx-btn" onClick={run}>
                        {pct >= 1 ? t.done : t.run}
                    </button>
                ) : (
                    <button className="gx-btn" onClick={cancel}>
                        {t.cancel}
                    </button>
                )}

                <span className="gx-m07-prog-pct">
                    {Math.round(pct * 100)}%
                </span>
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
        <ModuleFrame
            id="gx-m07"
            num="07"
            tone="var(--gx-gold)"
            eyebrow={t.eyebrow}
            title={t.title}
            intent={t.intent}
            notes={t.notes}
        >
            <div className="gx-m07">
                <div className="gx-m07-scale" aria-hidden="true">
                    {t.bands.map((b, i) => (
                        <div
                            key={i}
                            className="gx-m07-scale-band"
                            style={{ '--tone': BAND_TONES[i] }}
                        >
                            <span className="gx-m07-scale-range">
                                {b.range}
                            </span>

                            <span className="gx-m07-scale-name">
                                {b.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="gx-m07-grid">
                    {t.demos.map((demo, i) => {
                        const Demo = DEMO_COMPS[i];

                        return (
                            <article
                                className="gx-m07-card"
                                key={i}
                                style={{ '--tone': BAND_TONES[i] }}
                            >
                                <div className="gx-m07-card-head">
                                    <span className="gx-m07-card-band">
                                        {t.bands[i].range}
                                    </span>

                                    <h5>{demo.title}</h5>

                                    <span className="gx-caption">
                                        {demo.hint}
                                    </span>
                                </div>

                                <div className="gx-m07-card-demo">
                                    <Demo demo={demo} t={t} reduced={reduced} />
                                </div>

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

@media (max-width: 767px) {
  .gx-m07-scale { grid-template-columns: repeat(2, 1fr); }
}
`);