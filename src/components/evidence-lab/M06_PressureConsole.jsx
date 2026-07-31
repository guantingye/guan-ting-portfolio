import React, { useEffect, useRef, useState } from 'react';
import ModuleFrame, {
    injectStyles, useI18n, usePrefersReducedMotion, useInView,
    STATUS, StatusIcon, HoldButton, mulberry32,
} from './shared/labKit.jsx';

const STRINGS = {
    en: {
        eyebrow: 'MVP PROTOTYPE',
        title: 'Pressure Anomaly Response Console',
        intent: 'This interactive prototype simulates a controlled pressure anomaly so readers can observe how the interface guides an operator through noticing, understanding, judging, confirming, and follow-up response. The focus is not information volume or visual style, but the order in which information is presented, the task each stage enables, the next actionable step, and the path for recovery.',
        telemetry: 'Live readings',
        pressure: 'Pressure',
        flow: 'Flow',
        simCaption: 'Simulated Process Data',
        unitBar: 'bar',
        unitFlow: '% flow',
        rail: 'System status',
        events: 'Event log',
        actions: 'Operator actions',
        inject: 'Start simulated incident',
        reset: 'Reset console',
        nextStep: 'Next step',
        reduce: 'Reduce flow to 70%',
        investigate: 'Inspect valve first',
        motionPaused: 'Motion is reduced — showing a snapshot. Advance the incident one step at a time.',
        modalTitle: 'Critical pressure — action required',
        modalBody: 'Pressure in loop A has crossed the critical line with high confidence. Reduce flow now to protect valve V-2. Hold to confirm the action.',
        holdReduce: 'Reduce flow',
        holding: 'holding',
        dismiss: 'Dismiss (Esc)',
        resolTitle: 'Incident result',
        resolNotice: 'Time to notice',
        resolAction: 'Time to recover',
        resolActions: 'Actions taken',
        stepped: '— (stepped)',
        tiles: {
            pumpA: 'Pump A',
            pumpB: 'Pump B',
            valve: 'Valve V-2',
            coolant: 'Coolant',
            link: 'Uplink',
        },
        log: {
            advisory: 'early signal: loop A pressure is rising faster than usual',
            warning: 'warning: pressure is above the soft limit; valve V-2 may be restricted',
            critical: 'critical: pressure crossed the safety line; flow reduction is required',
            investigate: 'operator note: inspecting valve V-2 before taking action',
            reduce: 'operator action: flow reduced to 70%',
            recover: 'recovery: pressure is moving back into the safe band',
            normal: 'resolved: loop A is stable and the incident is closed',
            reset: 'console reset to baseline',
        },
        actionReduce: 'Reduced flow to 70%',
        actionInvestigate: 'Inspected valve first',
        actionHeld: 'Confirmed critical flow reduction',
        notes: [
            {
                tag: 'Decision / 設計判斷',
                text: 'This interactive script deliberately covers five critical stages: noticing an anomaly, understanding its cause, choosing a response, confirming authorization, and completing recovery. The prototype does not validate the dashboard as a whole; it tests whether the interface can continue to support evidence-based, reversible judgment as pressure rises.',
            },
            {
                tag: 'Trade-off / 設計取捨',
                text: 'I chose one repeatable, controlled incident rather than an open-ended sandbox. It limits exploratory freedom, but ensures that every participant faces the same decision conditions and lets the effect of each interface cue, alert, and decision point be examined.',
            },
        ],
    },
    zh: {
        eyebrow: 'MVP 原型',
        title: '壓力異常處理控制台',
        intent: '這個互動原型模擬一段受控的壓力異常，讓讀者觀察介面如何引導操作員完成察覺、理解、判斷、確認與後續處置。重點不在資訊量或視覺風格，而是在資訊呈現順序、每一階段能完成的任務、可執行的下一步，以及可以回復的操作路徑。',
        telemetry: '即時讀值',
        pressure: '壓力',
        flow: '流量',
        simCaption: '模擬流程資料',
        unitBar: 'bar',
        unitFlow: '% 流量',
        rail: '系統狀態',
        events: '事件紀錄',
        actions: '操作行動',
        inject: '啟動模擬事件',
        reset: '重設控制台',
        nextStep: '下一步',
        reduce: '將流量降至 70%',
        investigate: '先檢查閥件',
        motionPaused: '已降低動態效果——目前顯示靜態快照，請逐步推進事故。',
        modalTitle: '危急壓力——需要立即處置',
        modalBody: '迴路 A 壓力已高可信度越過危急線。請立即降低流量，以保護閥件 V-2。長按以確認操作。',
        holdReduce: '降低流量',
        holding: '長按中',
        dismiss: '關閉（Esc）',
        resolTitle: '事故處置結果',
        resolNotice: '注意到耗時',
        resolAction: '復原耗時',
        resolActions: '採取的行動',
        stepped: '—（逐步）',
        tiles: {
            pumpA: '泵浦 A',
            pumpB: '泵浦 B',
            valve: '閥件 V-2',
            coolant: '冷卻系統',
            link: '上行連線',
        },
        log: {
            advisory: '早期訊號：迴路 A 壓力上升速度高於平常',
            warning: '警告：壓力已超過軟性上限，閥件 V-2 可能受阻',
            critical: '危急：壓力已越過安全線，必須降低流量',
            investigate: '操作紀錄：先檢查閥件 V-2，再決定是否處置',
            reduce: '操作紀錄：流量已降至 70%',
            recover: '復原中：壓力正在回到安全區間',
            normal: '已解除：迴路 A 穩定，事故結束',
            reset: '控制台已重設為基準狀態',
        },
        actionReduce: '將流量降至 70%',
        actionInvestigate: '先檢查閥件',
        actionHeld: '確認危急降流量操作',
        notes: [
            {
                tag: 'Decision / 設計判斷',
                text: '這段互動腳本刻意涵蓋五個關鍵階段：察覺異常、理解原因、選擇處置、確認授權，以及完成復原。原型驗證的不是整體儀表板本身，而是介面能否在壓力升高時，持續支援操作員做出有依據、可回復的判斷。',
            },
            {
                tag: 'Trade-off / 設計取捨',
                text: '我選擇單一、可重複的受控事件，而不是開放式操作沙盒。這限制了探索自由，但能確保每位體驗者面對相同的判斷條件，同時讓每個介面提示、警報與決策節點的效果可以被檢驗。',
            },
        ],
    },
};

const WIN = 60;
const P_RANGE = [3.4, 7.4], P_BAND = [3.8, 4.6], P_WARN = 5.4, P_CRIT = 6.3;
const F_RANGE = [30, 82];
const TARGET = {
    idle: { p: 4.2, f: 62 },
    advisory: { p: 5.5, f: 62 },
    warning: { p: 6.1, f: 60 },
    critical: { p: 6.8, f: 58 },
    recovering: { p: 4.2, f: 44 },
    resolved: { p: 4.2, f: 44 },
};
const PHASE_ORDER = ['idle', 'advisory', 'warning', 'critical', 'recovering', 'resolved'];

// tile status per phase: only Pump A and the valve react, so the interface stays calm.
const tileStatus = (key, phase) => {
    const react = {
        idle: 'normal',
        advisory: 'advisory',
        warning: 'warning',
        critical: 'critical',
        recovering: 'warning',
        resolved: 'normal',
    }[phase];

    if (key === 'pumpA') return react;
    if (key === 'valve') return phase === 'critical'
        ? 'critical'
        : (phase === 'warning' || phase === 'recovering')
            ? 'warning'
            : 'normal';

    return 'normal';
};

function snapshot(phase, seed) {
    const rng = mulberry32(seed);
    const tgt = TARGET[phase];
    const p = [];
    const f = [];

    for (let i = 0; i < WIN; i++) {
        const ramp = phase === 'advisory' ? (i / WIN) * 1.0 : 0;
        p.push(tgt.p - (phase === 'advisory' ? 0.6 : 0) + ramp + (rng() - 0.5) * 0.12);
        f.push(tgt.f + (rng() - 0.5) * 1.6);
    }

    return { p, f };
}

function StripChart({ samples, range, band, thresholds = [], color, label, unit, value }) {
    const W = 300;
    const H = 96;
    const n = samples.length;
    const y = v => H - ((v - range[0]) / (range[1] - range[0])) * H;
    const pts = samples
        .map((v, i) => `${(i / (WIN - 1)) * W},${y(v).toFixed(1)}`)
        .join(' ');

    return (
        <figure className="gx-chart">
            <figcaption>
                <span className="gx-chart-name">{label}</span>
                <span className="gx-chart-val" style={{ color }}>
                    {value}<em>{unit}</em>
                </span>
            </figcaption>

            <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                role="img"
                aria-label={`${label} ${value} ${unit}`}
            >
                {band && (
                    <rect
                        x="0"
                        y={y(band[1])}
                        width={W}
                        height={y(band[0]) - y(band[1])}
                        fill="var(--gx-teal)"
                        opacity="0.06"
                    />
                )}

                {thresholds.map((t, i) => (
                    <line
                        key={i}
                        x1="0"
                        y1={y(t.v)}
                        x2={W}
                        y2={y(t.v)}
                        stroke={t.c}
                        strokeWidth="1"
                        strokeDasharray="3 4"
                        opacity="0.5"
                    />
                ))}

                {n > 1 && (
                    <polyline
                        points={pts}
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                )}

                {n > 1 && (
                    <circle cx={W} cy={y(samples[n - 1])} r="3" fill={color} />
                )}
            </svg>
        </figure>
    );
}

function StatusTile({ label, status, lang }) {
    const s = STATUS[status];

    return (
        <div className="gx-tile" style={{ '--tc': s.hex }}>
            <span className="gx-tile-icon" style={{ color: s.hex }}>
                <StatusIcon name={s.icon} size={14} />
            </span>

            <span className="gx-tile-label">
                {label}
            </span>

            <span className="gx-tile-status" style={{ color: s.hex }}>
                {s.label[lang]}
            </span>

            <span className="gx-tile-led" style={{ background: s.hex }} />
        </div>
    );
}

export default function M06PressureConsole() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const reduced = usePrefersReducedMotion();
    const [viewRef, inView] = useInView({ rootMargin: '200px' });

    const [phase, setPhase] = useState('idle');
    const [chart, setChart] = useState(() => snapshot('idle', 7));
    const [log, setLog] = useState([]);
    const [summary, setSummary] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [metrics, setMetrics] = useState(null);

    const sim = useRef({
        p: 4.2,
        f: 62,
        clock: 0,
        phase: 'idle',
        phaseAt: 0,
        accS: 0,
        accSum: 0,
    });

    const raf = useRef(0);
    const last = useRef(0);
    const rng = useRef(mulberry32(20260704));
    const meta = useRef({
        injectAt: null,
        firstAt: null,
        resolveAt: null,
        auto: false,
        actions: [],
    });
    const modalRef = useRef(null);
    const restoreFocus = useRef(null);

    const pushLog = key => setLog(l => [
        { id: Date.now() + Math.random(), text: t.log[key] },
        ...l,
    ].slice(0, 6));

    const finish = () => {
        const m = meta.current;
        const notice = m.firstAt != null && m.injectAt != null
            ? (m.firstAt - m.injectAt)
            : null;
        const resolve = m.resolveAt != null && m.injectAt != null
            ? (m.resolveAt - m.injectAt)
            : null;

        setMetrics({
            notice,
            resolve,
            auto: m.auto,
            actions: [...m.actions],
        });
    };

    const go = next => {
        const s = sim.current;

        if (next === 'critical' && s.phase === 'warning') {
            meta.current.auto = meta.current.firstAt == null;
        }

        s.phase = next;
        s.phaseAt = s.clock;
        setPhase(next);

        const logKey = {
            advisory: 'advisory',
            warning: 'warning',
            critical: 'critical',
            recovering: 'recover',
            resolved: 'normal',
        }[next];

        if (logKey) pushLog(logKey);
        if (next === 'critical') setModalOpen(true);
        if (reduced) setChart(snapshot(next, 7 + PHASE_ORDER.indexOf(next)));
    };

    // ---- single rAF loop (streaming); gated by view + tab visibility ------
    useEffect(() => {
        if (reduced) return;

        const loop = now => {
            const s = sim.current;
            const dt = Math.min(0.05, (now - last.current) / 1000);

            last.current = now;
            s.clock += dt;

            const tgt = TARGET[s.phase];
            const rate = s.phase === 'advisory'
                ? 0.7
                : s.phase === 'recovering'
                    ? 0.9
                    : 1.0;

            s.p += (tgt.p - s.p) * (1 - Math.exp(-rate * dt)) + (rng.current() - 0.5) * 0.03;
            s.f += (tgt.f - s.f) * (1 - Math.exp(-1.0 * dt)) + (rng.current() - 0.5) * 0.35;

            const since = s.clock - s.phaseAt;

            if (s.phase === 'advisory' && since >= 3) {
                go('warning');
            } else if (s.phase === 'warning' && since >= 6) {
                go('critical');
            } else if (s.phase === 'recovering' && s.p <= 4.7 && since >= 1.2) {
                go('resolved');
                finish();
            }

            s.accS += dt;

            if (s.accS >= 0.25) {
                s.accS = 0;
                setChart(c => ({
                    p: [...c.p.slice(-(WIN - 1)), s.p],
                    f: [...c.f.slice(-(WIN - 1)), s.f],
                }));
            }

            s.accSum += dt;

            if (s.accSum >= 2) {
                s.accSum = 0;
                setSummary(`${t.pressure} ${s.p.toFixed(1)} ${t.unitBar}, ${t.flow} ${Math.round(s.f)} ${t.unitFlow}.`);
            }

            raf.current = requestAnimationFrame(loop);
        };

        const start = () => {
            if (!raf.current) {
                last.current = performance.now();
                raf.current = requestAnimationFrame(loop);
            }
        };

        const stop = () => {
            cancelAnimationFrame(raf.current);
            raf.current = 0;
        };

        const sync = () => {
            (inView && !document.hidden) ? start() : stop();
        };

        sync();
        document.addEventListener('visibilitychange', sync);

        return () => {
            document.removeEventListener('visibilitychange', sync);
            stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, reduced, lang]);

    const inject = () => {
        meta.current = {
            injectAt: sim.current.clock,
            firstAt: null,
            resolveAt: null,
            auto: false,
            actions: [],
        };

        setMetrics(null);
        go('advisory');
    };

    const markFirst = () => {
        if (meta.current.firstAt == null) {
            meta.current.firstAt = sim.current.clock;
        }
    };

    const reduceFlow = actionLabel => {
        markFirst();
        meta.current.actions.push(actionLabel);
        meta.current.resolveAt = sim.current.clock;

        pushLog('reduce');
        setModalOpen(false);
        go('recovering');

        if (reduced) {
            setTimeout(() => {
                go('resolved');
                finish();
            }, 0);
        }
    };

    const investigate = () => {
        markFirst();
        meta.current.actions.push(t.actionInvestigate);
        pushLog('investigate');
    };

    const reset = () => {
        Object.assign(sim.current, {
            p: 4.2,
            f: 62,
            phase: 'idle',
            phaseAt: sim.current.clock,
            accS: 0,
            accSum: 0,
        });

        setModalOpen(false);
        setMetrics(null);
        setLog([]);
        pushLog('reset');
        setPhase('idle');
        setChart(snapshot('idle', 7));
    };

    const stepReduced = () => {
        const s = sim.current;
        const idx = PHASE_ORDER.indexOf(s.phase);
        const next = PHASE_ORDER[Math.min(idx + 1, PHASE_ORDER.length - 1)];

        if (next === 'resolved') {
            go('resolved');
            finish();
        } else {
            go(next);
        }
    };

    // ---- focus trap for the critical alertdialog --------------------------
    useEffect(() => {
        if (!modalOpen) return;

        restoreFocus.current = document.activeElement;

        const node = modalRef.current;
        const focusables = () => node.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        const first = focusables()[0];

        first && first.focus();

        const onKey = e => {
            if (e.key === 'Escape') {
                e.preventDefault();
                setModalOpen(false);
                return;
            }

            if (e.key !== 'Tab') return;

            const f = focusables();
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

        return () => {
            node.removeEventListener('keydown', onKey);
            restoreFocus.current && restoreFocus.current.focus && restoreFocus.current.focus();
        };
    }, [modalOpen]);

    const running = phase !== 'idle';
    const pressureColor = phase === 'critical'
        ? STATUS.critical.hex
        : (phase === 'warning' || phase === 'recovering')
            ? STATUS.warning.hex
            : STATUS.normal.hex;

    const tiles = ['pumpA', 'pumpB', 'valve', 'coolant', 'link'];

    return (
        <ModuleFrame
            id="gx-m06"
            num="06"
            tone="var(--gx-teal)"
            eyebrow={t.eyebrow}
            title={t.title}
            intent={t.intent}
            notes={t.notes}
        >
            <div className="gx-m06" ref={viewRef}>
                <p className="gx-sr-only" aria-live="polite">
                    {summary}
                </p>

                <div className="gx-m06-panels">
                    <section className="gx-panel gx-m06-telemetry" aria-label={t.telemetry}>
                        <div className="gx-m06-panel-head">
                            <span className="gx-eyebrow">
                                {t.telemetry}
                            </span>

                            <span className="gx-caption">
                                {t.simCaption} / {STRINGS[lang === 'en' ? 'zh' : 'en'].simCaption}
                            </span>
                        </div>

                        <StripChart
                            samples={chart.p}
                            range={P_RANGE}
                            band={P_BAND}
                            thresholds={[
                                { v: P_WARN, c: STATUS.warning.hex },
                                { v: P_CRIT, c: STATUS.critical.hex },
                            ]}
                            color={pressureColor}
                            label={t.pressure}
                            unit={` ${t.unitBar}`}
                            value={chart.p[chart.p.length - 1].toFixed(1)}
                        />

                        <StripChart
                            samples={chart.f}
                            range={F_RANGE}
                            color={STATUS.advisory.hex}
                            label={t.flow}
                            unit="%"
                            value={Math.round(chart.f[chart.f.length - 1])}
                        />

                        {reduced && (
                            <p className="gx-m06-paused">
                                {t.motionPaused}
                            </p>
                        )}
                    </section>

                    <section className="gx-m06-side">
                        <div className="gx-panel gx-m06-rail" aria-label={t.rail}>
                            <div className="gx-m06-panel-head">
                                <span className="gx-eyebrow">
                                    {t.rail}
                                </span>
                            </div>

                            <div className="gx-m06-tiles">
                                {tiles.map(k => (
                                    <StatusTile
                                        key={k}
                                        label={t.tiles[k]}
                                        status={tileStatus(k, phase)}
                                        lang={lang}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="gx-panel gx-m06-events" aria-label={t.events}>
                            <div className="gx-m06-panel-head">
                                <span className="gx-eyebrow">
                                    {t.events}
                                </span>
                            </div>

                            <ul className="gx-m06-log" aria-live="polite">
                                {log.length === 0 && (
                                    <li className="gx-m06-log-empty">
                                        —
                                    </li>
                                )}

                                {log.map(e => (
                                    <li key={e.id}>
                                        {e.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>

                {phase === 'warning' && !modalOpen && (
                    <div className="gx-m06-banner gx-m06-banner-warn" role="status">
                        <span className="gx-m06-banner-icon">
                            <StatusIcon name="warn" size={18} />
                        </span>

                        <p>
                            {t.log.warning}. <b>{t.reduce}.</b>
                        </p>

                        <div className="gx-m06-banner-actions">
                            <button
                                className="gx-btn gx-btn-accent"
                                style={{ '--gx-accent': STATUS.warning.hex }}
                                onClick={() => reduceFlow(t.actionReduce)}
                            >
                                {t.reduce}
                            </button>

                            <button className="gx-btn" onClick={investigate}>
                                {t.investigate}
                            </button>
                        </div>
                    </div>
                )}

                {phase === 'critical' && !modalOpen && (
                    <div
                        className="gx-m06-banner gx-m06-banner-crit"
                        role="status"
                        style={{ '--gx-accent': STATUS.critical.hex }}
                    >
                        <span className="gx-m06-banner-icon" style={{ color: STATUS.critical.hex }}>
                            <StatusIcon name="alert" size={18} />
                        </span>

                        <p>
                            {t.log.critical}.
                        </p>

                        <div className="gx-m06-banner-actions">
                            <HoldButton
                                label={t.holdReduce}
                                holdingLabel={t.holding}
                                tone={STATUS.critical.hex}
                                reduced={reduced}
                                onConfirm={() => reduceFlow(t.actionHeld)}
                            />
                        </div>
                    </div>
                )}

                {metrics && (
                    <div className="gx-m06-resolution" role="status">
                        <span className="gx-eyebrow" style={{ color: STATUS.normal.hex }}>
                            {t.resolTitle}
                        </span>

                        <div className="gx-m06-resolution-grid">
                            <div>
                                <span>{t.resolNotice}</span>
                                <b>{reduced || metrics.notice == null ? t.stepped : `${metrics.notice.toFixed(1)} s`}</b>
                            </div>

                            <div>
                                <span>{t.resolAction}</span>
                                <b>{reduced || metrics.resolve == null ? t.stepped : `${metrics.resolve.toFixed(1)} s`}</b>
                            </div>

                            <div>
                                <span>{t.resolActions}</span>
                                <b>{metrics.actions.length ? metrics.actions.join(' · ') : '—'}</b>
                            </div>
                        </div>
                    </div>
                )}

                <div className="gx-m06-controls">
                    {!running && (
                        <button className="gx-btn gx-btn-amber" onClick={inject}>
                            ◈ {t.inject}
                        </button>
                    )}

                    {running && reduced && phase !== 'resolved' && phase !== 'critical' && (
                        <button className="gx-btn" onClick={stepReduced}>
                            {t.nextStep} ▸
                        </button>
                    )}

                    {running && (
                        <button className="gx-btn" onClick={reset}>
                            ↺ {t.reset}
                        </button>
                    )}
                </div>

                {modalOpen && (
                    <div className="gx-m06-modal-scrim" onClick={() => setModalOpen(false)}>
                        <div
                            className="gx-m06-modal"
                            role="alertdialog"
                            aria-labelledby="gx-m06-modal-t"
                            aria-describedby="gx-m06-modal-d"
                            ref={modalRef}
                            onClick={e => e.stopPropagation()}
                            style={{ '--gx-accent': STATUS.critical.hex }}
                        >
                            <div className="gx-m06-modal-head">
                                <span style={{ color: STATUS.critical.hex }}>
                                    <StatusIcon name="alert" size={22} />
                                </span>

                                <h4 id="gx-m06-modal-t">
                                    {t.modalTitle}
                                </h4>
                            </div>

                            <p id="gx-m06-modal-d">
                                {t.modalBody}
                            </p>

                            <div className="gx-m06-modal-actions">
                                <HoldButton
                                    label={t.holdReduce}
                                    holdingLabel={t.holding}
                                    tone={STATUS.critical.hex}
                                    reduced={reduced}
                                    onConfirm={() => reduceFlow(t.actionHeld)}
                                />

                                <button className="gx-btn" onClick={() => setModalOpen(false)}>
                                    {t.dismiss}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ModuleFrame>
    );
}

injectStyles('gx-m06-styles', `
.gx-m06 { position: relative; }
.gx-m06-panels { display: grid; grid-template-columns: 1fr; gap: 14px; }
.gx-m06-panel-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 12px; }
.gx-m06-telemetry { padding: 16px; }
.gx-chart { margin: 0 0 14px; }
.gx-chart:last-child { margin-bottom: 0; }
.gx-chart figcaption { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
.gx-chart-name { font-family: var(--gx-font-data); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gx-text-3); }
.gx-chart-val { font-family: var(--gx-font-data); font-size: 18px; font-weight: 500; }
.gx-chart-val em { font-size: 11px; font-style: normal; color: var(--gx-text-3); margin-left: 3px; }
.gx-chart svg { width: 100%; height: 84px; display: block; background: var(--gx-bg-1); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-sm); }
.gx-m06-paused { font-family: var(--gx-font-data); font-size: 11px; color: var(--gx-amber); margin: 10px 0 0; }
.gx-m06-side { display: grid; gap: 14px; }
.gx-m06-rail, .gx-m06-events { padding: 16px; }
.gx-m06-tiles { display: grid; gap: 8px; }
.gx-tile { display: flex; align-items: center; gap: 10px; padding: 9px 12px; background: var(--gx-bg-1); border: 1px solid var(--gx-line-1); border-left: 2px solid var(--tc); border-radius: var(--gx-r-sm); }
.gx-tile-label { font-size: 13px; color: var(--gx-text-1); }
.gx-tile-status { font-family: var(--gx-font-data); font-size: 11px; letter-spacing: 0.06em; margin-left: auto; }
.gx-tile-led { width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 6px currentColor; }
.gx-m06-log { list-style: none; margin: 0; padding: 0; font-family: var(--gx-font-data); font-size: 11.5px; line-height: 1.5; max-height: 168px; overflow-y: auto; }
.gx-m06-log li { padding: 5px 0; border-bottom: 1px dashed var(--gx-line-1); color: var(--gx-text-2); }
.gx-m06-log-empty { color: var(--gx-text-3); }

.gx-m06-banner { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-top: 14px; padding: 14px 16px; border-radius: var(--gx-r-md); border: 1px solid var(--gx-accent, var(--gx-amber)); background: color-mix(in srgb, var(--gx-accent, var(--gx-amber)) 8%, var(--gx-bg-1)); }
.gx-m06-banner-warn { --gx-accent: #E8A33D; }
.gx-m06-banner p { margin: 0; flex: 1 1 240px; font-size: 14px; color: var(--gx-text-1); }
.gx-m06-banner-icon { color: var(--gx-amber); flex: 0 0 auto; }
.gx-m06-banner-actions { display: flex; gap: 8px; flex-wrap: wrap; }

.gx-m06-resolution { margin-top: 14px; padding: 16px; border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); background: var(--gx-bg-2); }
.gx-m06-resolution-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-top: 10px; }
.gx-m06-resolution-grid span { display: block; font-family: var(--gx-font-data); font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gx-text-3); }
.gx-m06-resolution-grid b { display: block; font-family: var(--gx-font-data); font-size: 15px; color: var(--gx-text-1); margin-top: 4px; }

.gx-m06-controls { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }

.gx-m06-modal-scrim { position: fixed; inset: 0; z-index: 60; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(4,5,8,0.72); backdrop-filter: blur(2px); }
.gx-m06-modal { max-width: 420px; width: 100%; padding: 24px; background: var(--gx-bg-2); border: 1px solid var(--gx-accent); border-radius: var(--gx-r-lg); box-shadow: 0 24px 64px rgba(0,0,0,0.5); }
.gx-m06-modal-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.gx-m06-modal-head h4 { margin: 0; font-family: var(--gx-font-display); font-size: 22px; font-weight: 500; color: var(--gx-text-1); }
.gx-m06-modal p { margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: var(--gx-text-2); }
.gx-m06-modal-actions { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }

@media (min-width: 860px) {
  .gx-m06-panels { grid-template-columns: 1.4fr 1fr; align-items: start; }
}
`);
