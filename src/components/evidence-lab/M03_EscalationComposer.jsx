import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion, HoldButton, StatusIcon } from './shared/labKit.jsx';

const STRINGS = {
    en: {
        eyebrow: 'INTERACTION LOGIC',
        title: 'Alert Escalation Composer',
        intent: 'This module shows how an alarm should escalate based on both severity and evidence. The goal is not to make every alert louder, but to decide when the interface should stay quiet, when it should ask for attention, and when it is allowed to interrupt.',
        severity: 'Severity',
        confidence: 'Evidence confidence',
        sev: ['Advisory', 'Warning', 'Major', 'Critical'],
        conf: ['Low', 'Medium', 'High'],
        policyReadout: 'Escalation rule',
        ladder: 'Escalation ladder',
        rungs: ['Status badge', 'Banner', 'Banner + sound', 'Critical dialog'],
        preview: 'Alert preview',
        acknowledge: 'Acknowledge',
        dismiss: 'Dismiss',
        confirm: 'Confirm',
        holdConfirm: 'Reduce pressure & confirm',
        holding: 'holding',
        typedHint: 'Type CONFIRM to acknowledge',
        typedPlaceholder: 'CONFIRM',
        unverified: 'not fully verified — sensor cross-check is still running',
        acked: 'Acknowledged. Alert cleared.',
        frictionLabel: 'Confirmation',
        liveLabel: 'Screen-reader announcement',
        friction: {
            none: 'no confirmation needed',
            click: 'click to confirm',
            hold: 'hold for 800 ms',
            typed: 'type to confirm',
        },
        live: {
            off: 'no announcement',
            polite: 'non-interrupting',
            assertive: 'immediate',
        },
        caption: 'Escalate with evidence, not volume.',
        readout: (severity, confidence, rung, live, friction) =>
            `When severity is ${severity} and evidence confidence is ${confidence}, the interface shows ${rung}. Screen-reader announcement is ${live}, and confirmation uses ${friction}.`,
        alertBody: {
            1: 'Pressure in loop A is starting to rise. No immediate action is required yet.',
            2: 'Pressure in loop A is above the soft limit. The operator should review it soon.',
            3: 'Pressure is high in loop A. Valve V-2 restriction is likely and should be checked.',
            4: 'Pressure in loop A is critical. Valve V-2 must be reduced now.',
        },
        notes: [
            {
                tag: 'Decision / 設計判斷',
                text: 'A low-confidence critical alert should not take over the whole screen. If the system interrupts too often when it is unsure, operators learn to dismiss the alerts that actually matter.',
            },
            {
                tag: 'Trade-off / 取捨',
                text: 'Typed confirmation is intentionally slow. When an action is difficult to undo, the interface should make the user slow down before confirming.',
            },
        ],
    },
    zh: {
        eyebrow: '互動邏輯',
        title: '警報升級策略編排器',
        intent: '這個模組展示警報如何同時根據「嚴重度」與「證據可信度」升級。重點不是把每個警報都做得更吵，而是判斷什麼時候應該安靜提示、什麼時候需要吸引注意、什麼時候才有資格打斷使用者。',
        severity: '嚴重度',
        confidence: '證據可信度',
        sev: ['注意', '警告', '重大', '危急'],
        conf: ['低', '中', '高'],
        policyReadout: '升級規則',
        ladder: '警報升級階梯',
        rungs: ['狀態標記', '畫面橫幅', '橫幅＋聲音提示', '關鍵彈窗'],
        preview: '警報預覽',
        acknowledge: '確認',
        dismiss: '關閉',
        confirm: '確認',
        holdConfirm: '降壓並確認',
        holding: '長按中',
        typedHint: '輸入 CONFIRM 以完成確認',
        typedPlaceholder: 'CONFIRM',
        unverified: '尚未完全驗證——感測器仍在交叉檢查',
        acked: '已確認，警報解除。',
        frictionLabel: '確認方式',
        liveLabel: '報讀方式',
        friction: {
            none: '不需確認',
            click: '點擊確認',
            hold: '長按 800 ms',
            typed: '輸入確認',
        },
        live: {
            off: '不播報',
            polite: '非打斷式播報',
            assertive: '立即播報',
        },
        caption: '警報應該根據證據升級，而不是只靠音量升級。',
        readout: (severity, confidence, rung, live, friction) =>
            `當嚴重度是「${severity}」、證據可信度是「${confidence}」時，介面會升級到「${rung}」；螢幕報讀採用「${live}」，確認方式為「${friction}」。`,
        alertBody: {
            1: '迴路 A 壓力開始上升，目前還不需要立即處理。',
            2: '迴路 A 壓力已高於軟性上限，操作員應該盡快確認。',
            3: '迴路 A 壓力偏高，閥件 V-2 可能受阻，需要檢查。',
            4: '迴路 A 壓力已達危急狀態，必須立即降低閥件 V-2。',
        },
        notes: [
            {
                tag: 'Decision / 設計判斷',
                text: '低可信度的危急警報不應該直接接管整個畫面。如果系統在不確定時也頻繁打斷使用者，操作員最後會學會忽略真正重要的警報。',
            },
            {
                tag: 'Trade-off / 取捨',
                text: '輸入確認是刻意變慢的設計。當一個操作很難回復時，介面應該讓使用者在確認前慢下來。',
            },
        ],
    },
};

const SEV_TONE = ['var(--gx-sky)', 'var(--gx-amber)', 'var(--gx-gold)', 'var(--gx-red)'];
const SEV_ICON = ['info', 'warn', 'warn', 'alert'];

// Pure policy: escalation = f(severity 1..4, confidence 0..2). Exported for testability.
export function policy(severity, confidence) {
    if (severity === 1) return { rung: 1, friction: 'none', live: 'off', sound: false };
    if (severity === 2) return { rung: 2, friction: 'click', live: 'polite', sound: false };

    if (severity === 3) {
        if (confidence === 2) return { rung: 3, friction: 'hold', live: 'assertive', sound: true };
        if (confidence === 1) return { rung: 3, friction: 'click', live: 'polite', sound: true };
        return { rung: 2, friction: 'click', live: 'polite', sound: false, unverified: true };
    }

    // severity 4 — critical
    if (confidence === 2) return { rung: 4, friction: 'typed', live: 'assertive', sound: true };
    if (confidence === 1) return { rung: 3, friction: 'hold', live: 'assertive', sound: true };
    return { rung: 2, friction: 'click', live: 'polite', sound: false, unverified: true };
}

function Slider({ label, value, setValue, labels, tone }) {
    return (
        <div className="gx-m03-slider">
            <div className="gx-m03-slider-top">
                <span className="gx-eyebrow">{label}</span>
                <span className="gx-m03-slider-val" style={{ color: tone }}>
                    {labels[value]}
                </span>
            </div>

            <input
                type="range"
                min="0"
                max={labels.length - 1}
                step="1"
                value={value}
                style={{ '--tone': tone }}
                aria-label={label}
                aria-valuetext={labels[value]}
                onChange={e => setValue(Number(e.target.value))}
            />

            <div className="gx-m03-ticks">
                {labels.map((l, i) => (
                    <span key={l} className={i === value ? 'on' : ''}>
                        {l}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function M03EscalationComposer() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const reduced = usePrefersReducedMotion();
    const [sevIdx, setSevIdx] = useState(3); // start at critical
    const [confIdx, setConfIdx] = useState(2); // high
    const [acked, setAcked] = useState(false);
    const [typed, setTyped] = useState('');
    const modalRef = useRef(null);

    const severity = sevIdx + 1;
    const p = policy(severity, confIdx);
    const tone = SEV_TONE[sevIdx];
    const bodyText = p.unverified ? `${t.alertBody[severity]} (${t.unverified})` : t.alertBody[severity];

    useEffect(() => {
        setAcked(false);
        setTyped('');
    }, [sevIdx, confIdx]);

    // Focus containment for the modal rung. This preview recomposes from the
    // sliders, so it must NOT steal focus or scroll the page on mount.
    useEffect(() => {
        if (p.rung !== 4 || acked) return;

        const node = modalRef.current;
        if (!node) return;

        const onKey = e => {
            if (e.key === 'Escape') {
                e.preventDefault();
                setAcked(true);
                return;
            }

            if (e.key !== 'Tab') return;

            const f = node.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');
            if (!f.length) return;

            const a = f[0];
            const b = f[f.length - 1];

            if (e.shiftKey && document.activeElement === a) {
                e.preventDefault();
                b.focus();
            } else if (!e.shiftKey && document.activeElement === b) {
                e.preventDefault();
                a.focus();
            }
        };

        node.addEventListener('keydown', onKey);
        return () => node.removeEventListener('keydown', onKey);
    }, [p.rung, acked, sevIdx, confIdx]);

    const readout = t.readout(
        t.sev[sevIdx],
        t.conf[confIdx],
        t.rungs[p.rung - 1],
        t.live[p.live],
        t.friction[p.friction],
    );

    const ActionArea = () => {
        if (acked) {
            return (
                <p className="gx-m03-acked">
                    <StatusIcon name="check" size={15} /> {t.acked}
                </p>
            );
        }

        if (p.friction === 'none') return null;

        if (p.friction === 'click') {
            return (
                <div className="gx-m03-actions">
                    <button
                        className="gx-btn gx-btn-accent"
                        style={{ '--gx-accent': tone }}
                        onClick={() => setAcked(true)}
                    >
                        {t.acknowledge}
                    </button>

                    <button className="gx-btn" onClick={() => setAcked(true)}>
                        {t.dismiss}
                    </button>
                </div>
            );
        }

        if (p.friction === 'hold') {
            return (
                <div className="gx-m03-actions">
                    <HoldButton
                        label={t.holdConfirm}
                        holdingLabel={t.holding}
                        tone={tone}
                        reduced={reduced}
                        onConfirm={() => setAcked(true)}
                    />
                </div>
            );
        }

        return null; // typed handled in modal
    };

    return (
        <ModuleFrame
            id="gx-m03"
            num="03"
            tone="var(--gx-amber)"
            eyebrow={t.eyebrow}
            title={t.title}
            intent={t.intent}
            notes={t.notes}
        >
            <div className="gx-m03">
                <div className="gx-m03-controls">
                    <Slider
                        label={t.severity}
                        value={sevIdx}
                        setValue={setSevIdx}
                        labels={t.sev}
                        tone={tone}
                    />

                    <Slider
                        label={t.confidence}
                        value={confIdx}
                        setValue={setConfIdx}
                        labels={t.conf}
                        tone="var(--gx-teal)"
                    />

                    <div className="gx-m03-readout">
                        <span className="gx-eyebrow">
                            {t.policyReadout}
                        </span>

                        <code>
                            {readout}
                        </code>

                        <div className="gx-m03-readout-meta">
                            <span>
                                {t.frictionLabel}: <b>{t.friction[p.friction]}</b>
                            </span>
                            <span>
                                {t.liveLabel}: <b>{t.live[p.live]}</b>
                            </span>
                        </div>
                    </div>

                    <p className="gx-m03-caption">
                        {t.caption}
                        <span>／{STRINGS[lang === 'en' ? 'zh' : 'en'].caption}</span>
                    </p>
                </div>

                <div className="gx-m03-stage">
                    <div className="gx-m03-ladder" aria-label={t.ladder}>
                        <span className="gx-eyebrow">
                            {t.ladder}
                        </span>

                        {t.rungs.map((r, i) => (
                            <div
                                key={r}
                                className={`gx-m03-rung${i + 1 <= p.rung ? ' on' : ''}${i + 1 === p.rung ? ' current' : ''}`}
                                style={{ '--tone': tone }}
                            >
                                <span className="gx-m03-rung-dot" />
                                <span className="gx-m03-rung-label">{r}</span>
                                {i === 2 && p.sound && (
                                    <span className="gx-m03-rung-sound" title="sound">
                                        ♪
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="gx-m03-preview">
                        <span className="gx-eyebrow">
                            {t.preview}
                        </span>

                        {/* live regions */}
                        <p className="gx-sr-only" aria-live="polite">
                            {p.live === 'polite' && !acked ? bodyText : ''}
                        </p>

                        <p className="gx-sr-only" aria-live="assertive">
                            {p.live === 'assertive' && !acked && p.rung !== 4 ? bodyText : ''}
                        </p>

                        {p.rung === 1 && (
                            <div className="gx-m03-badge" style={{ '--tone': tone }}>
                                <StatusIcon name={SEV_ICON[sevIdx]} size={14} />
                                <span>{t.sev[sevIdx]}</span>
                                <small>{bodyText}</small>
                            </div>
                        )}

                        {(p.rung === 2 || p.rung === 3) && (
                            <div
                                className={`gx-m03-alert rung-${p.rung}`}
                                role="status"
                                style={{ '--tone': tone }}
                            >
                                <div className="gx-m03-alert-head">
                                    <span className="gx-m03-alert-icon" style={{ color: tone }}>
                                        <StatusIcon name={SEV_ICON[sevIdx]} size={18} />
                                    </span>

                                    <span className="gx-m03-alert-title">
                                        {t.sev[sevIdx]}
                                    </span>

                                    {p.sound && (
                                        <span className="gx-m03-alert-sound" aria-label="sound cue">
                                            ♪
                                        </span>
                                    )}

                                    {p.unverified && (
                                        <span className="gx-m03-alert-flag">
                                            {t.conf[confIdx]}
                                        </span>
                                    )}
                                </div>

                                <p className="gx-m03-alert-body">
                                    {bodyText}
                                </p>

                                <ActionArea />
                            </div>
                        )}

                        {p.rung === 4 && !acked && (
                            <div className="gx-m03-modal-scrim">
                                <div
                                    className="gx-m03-modal"
                                    role="alertdialog"
                                    aria-labelledby="gx-m03-mt"
                                    aria-describedby="gx-m03-md"
                                    ref={modalRef}
                                    style={{ '--tone': tone }}
                                >
                                    <div className="gx-m03-alert-head">
                                        <span style={{ color: tone }}>
                                            <StatusIcon name="alert" size={20} />
                                        </span>

                                        <h4 id="gx-m03-mt">
                                            {t.sev[sevIdx]}
                                        </h4>
                                    </div>

                                    <p id="gx-m03-md" className="gx-m03-alert-body">
                                        {bodyText}
                                    </p>

                                    <label className="gx-m03-typed-hint" htmlFor="gx-m03-typed">
                                        {t.typedHint}
                                    </label>

                                    <div className="gx-m03-typed-row">
                                        <input
                                            id="gx-m03-typed"
                                            className="gx-m03-typed-input"
                                            value={typed}
                                            placeholder={t.typedPlaceholder}
                                            autoComplete="off"
                                            spellCheck="false"
                                            onChange={e => setTyped(e.target.value)}
                                        />

                                        <button
                                            className="gx-btn gx-btn-accent"
                                            style={{ '--gx-accent': tone }}
                                            disabled={typed.trim().toUpperCase() !== 'CONFIRM'}
                                            onClick={() => setAcked(true)}
                                        >
                                            {t.confirm}
                                        </button>
                                    </div>

                                    <button
                                        className="gx-m03-modal-dismiss"
                                        onClick={() => setAcked(true)}
                                    >
                                        {t.dismiss} (Esc)
                                    </button>
                                </div>
                            </div>
                        )}

                        {p.rung === 4 && acked && (
                            <p className="gx-m03-acked">
                                <StatusIcon name="check" size={15} /> {t.acked}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('gx-m03-styles', `
.gx-m03 { display: grid; grid-template-columns: 1fr; gap: 20px; }
.gx-m03-slider { margin-bottom: 18px; }
.gx-m03-slider-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.gx-m03-slider-val { font-family: var(--gx-font-data); font-size: 14px; font-weight: 500; }
.gx-m03-slider input[type=range] { width: 100%; height: 6px; -webkit-appearance: none; appearance: none; background: var(--gx-bg-3); border-radius: 3px; outline-offset: 4px; }
.gx-m03-slider input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--tone); border: 3px solid var(--gx-bg-1); cursor: pointer; }
.gx-m03-slider input[type=range]::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: var(--tone); border: 3px solid var(--gx-bg-1); cursor: pointer; }
.gx-m03-ticks { display: flex; justify-content: space-between; margin-top: 8px; }
.gx-m03-ticks span { font-family: var(--gx-font-data); font-size: 10.5px; color: var(--gx-text-3); }
.gx-m03-ticks span.on { color: var(--gx-text-1); }
.gx-m03-readout { padding: 14px; background: var(--gx-bg-1); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); }
.gx-m03-readout code { display: block; font-family: var(--gx-font-data); font-size: 12px; line-height: 1.5; color: var(--gx-teal); margin: 8px 0; word-break: break-word; }
.gx-m03-readout-meta { display: flex; gap: 16px; flex-wrap: wrap; font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-text-3); }
.gx-m03-readout-meta b { color: var(--gx-text-1); font-weight: 500; }
.gx-m03-caption { font-family: var(--gx-font-display); font-size: 17px; color: var(--gx-text-1); margin: 0; }
.gx-m03-caption span { display: block; font-family: var(--gx-font-body); font-size: 12px; color: var(--gx-text-3); margin-top: 2px; }

.gx-m03-stage { display: grid; grid-template-columns: 1fr; gap: 16px; }
.gx-m03-ladder { padding: 16px; background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); }
.gx-m03-ladder .gx-eyebrow { display: block; margin-bottom: 12px; color: var(--gx-text-3); }
.gx-m03-rung { display: flex; align-items: center; gap: 10px; padding: 8px 0; opacity: 0.4; transition: opacity 200ms var(--gx-ease); }
.gx-m03-rung.on { opacity: 1; }
.gx-m03-rung-dot { width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--gx-line-2); flex: 0 0 auto; }
.gx-m03-rung.on .gx-m03-rung-dot { background: var(--tone); border-color: var(--tone); }
.gx-m03-rung.current .gx-m03-rung-dot { box-shadow: 0 0 0 3px color-mix(in srgb, var(--tone) 30%, transparent); }
.gx-m03-rung-label { font-size: 13px; color: var(--gx-text-2); }
.gx-m03-rung.current .gx-m03-rung-label { color: var(--gx-text-1); font-weight: 600; }
.gx-m03-rung-sound { margin-left: auto; color: var(--gx-amber); }

.gx-m03-preview { position: relative; min-height: 160px; padding: 16px; background: var(--gx-bg-1); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); display: flex; flex-direction: column; }
.gx-m03-preview > .gx-eyebrow { color: var(--gx-text-3); margin-bottom: 14px; }
.gx-m03-badge { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; padding: 6px 12px; border-radius: 999px; border: 1px solid var(--tone); color: var(--tone); font-size: 13px; }
.gx-m03-badge small { color: var(--gx-text-3); font-size: 11px; }
.gx-m03-alert { padding: 16px; border-radius: var(--gx-r-md); border: 1px solid var(--tone); background: color-mix(in srgb, var(--tone) 8%, var(--gx-bg-2)); }
.gx-m03-alert.rung-3 { box-shadow: 0 0 0 1px var(--tone), 0 8px 24px color-mix(in srgb, var(--tone) 20%, transparent); }
.gx-m03-alert-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.gx-m03-alert-title { font-weight: 600; color: var(--gx-text-1); }
.gx-m03-alert-head h4 { margin: 0; font-family: var(--gx-font-display); font-size: 20px; font-weight: 500; color: var(--gx-text-1); }
.gx-m03-alert-sound { color: var(--gx-amber); }
.gx-m03-alert-flag { margin-left: auto; font-family: var(--gx-font-data); font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--gx-text-3); border: 1px solid var(--gx-line-2); border-radius: 4px; padding: 1px 6px; }
.gx-m03-alert-body { margin: 0 0 14px; font-size: 14px; line-height: 1.55; color: var(--gx-text-2); }
.gx-m03-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.gx-m03-acked { display: inline-flex; align-items: center; gap: 8px; color: var(--gx-teal); font-size: 14px; margin: 8px 0 0; }

.gx-m03-modal-scrim { position: absolute; inset: 0; z-index: 4; display: flex; align-items: center; justify-content: center; padding: 12px; background: rgba(4,5,8,0.78); border-radius: var(--gx-r-md); }
.gx-m03-modal { width: 100%; max-width: 360px; padding: 20px; background: var(--gx-bg-2); border: 1px solid var(--tone); border-radius: var(--gx-r-md); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.gx-m03-typed-hint { display: block; font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-text-3); margin-bottom: 6px; }
.gx-m03-typed-row { display: flex; gap: 8px; }
.gx-m03-typed-input { flex: 1; font-family: var(--gx-font-data); font-size: 13px; letter-spacing: 0.16em; color: var(--gx-text-1); background: var(--gx-bg-1); border: 1px solid var(--gx-line-2); border-radius: var(--gx-r-sm); padding: 8px 12px; }
.gx-m03-modal-dismiss { display: block; margin-top: 12px; font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-text-3); text-decoration: underline; }

@media (min-width: 900px) {
  .gx-m03 { grid-template-columns: 1fr 1.2fr; align-items: start; }
  .gx-m03-stage { grid-template-columns: 200px 1fr; }
}
`);