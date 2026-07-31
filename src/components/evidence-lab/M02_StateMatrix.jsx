import React, { useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, STATUS, StatusIcon } from './shared/labKit.jsx';

const STRINGS = {
    en: {
        eyebrow: 'STATE MODEL',
        title: 'HMI State Matrix Explorer',
        intent: 'The same system state should not use an identical interface across different distances, lighting conditions, and operating contexts. This module crosses normal, advisory, warning, critical, degraded, offline, and handoff states with desk monitoring, a three-meter glance view, gloved operation, and low-glare night shifts, showing how information density, type scale, color, and interaction adapt to the context.',
        gridLabel: 'Interface states across operating contexts',
        states: 'States',
        contexts: 'Contexts',
        pick: 'Choose a cell',
        arrowHint: 'Use arrow keys to move · Enter opens',
        specTitle: 'State specification',
        specTarget: 'Touch target',
        specType: 'Primary value size',
        specContrast: 'Text contrast',
        specMotion: 'Motion behavior',
        specSurface: 'Surface',
        ack: 'Acknowledge',
        secondaryDropped: 'Secondary text is hidden in this glance context',
        notes: [
            {
                tag: 'Design decision / 設計判斷',
                text: 'Red is reserved for critical states that require immediate action. Other levels use amber, blue, teal, or gold so red is not diluted through overuse.',
            },
            {
                tag: 'Trade-off / 設計取捨',
                text: 'Creating dedicated versions for different states and operating contexts adds design, implementation, and maintenance cost. The matrix makes those differences, specifications, and trade-offs reviewable one by one instead of leaving them for ad hoc decisions during development.',
            },
        ],
        content: {
            normal: {
                title: 'Pump A',
                value: '4.2 bar',
                sub: 'Loop is running normally',
            },
            advisory: {
                title: 'Pump A',
                value: '4.8 bar',
                sub: 'Pressure is rising slowly',
            },
            warning: {
                title: 'Loop A',
                value: '5.6 bar',
                sub: 'Above the soft limit',
            },
            critical: {
                title: 'Loop A',
                value: '6.8 bar',
                sub: 'Valve V-2 may be restricted',
            },
            degraded: {
                title: 'Sensor S-3',
                value: '—.— bar',
                sub: 'Signal lost for 12 seconds',
            },
            offline: {
                title: 'Connection',
                value: 'OFFLINE',
                sub: 'Trying to reconnect',
            },
            handoff: {
                title: 'Control',
                value: 'MANUAL',
                sub: 'Operator has control',
            },
        },
        ctx: {
            desk: {
                name: 'Desk',
                dist: '40 cm',
                motion: 'standard 240 ms',
                note: 'This is the baseline version for nearby operation at a workstation. Its information density supports routine monitoring while retaining clear visual hierarchy, so the card does not become overloaded.',
            },
            glance: {
                name: 'Glance · 3 m',
                dist: '3 m',
                motion: 'essential only',
                note: 'This version is designed for a quick look from farther away. The main value is enlarged, and secondary text is removed so the state can be read in one glance.',
            },
            gloved: {
                name: 'Gloved touch',
                dist: '40 cm',
                motion: 'standard 240 ms',
                note: 'This context assumes slower, less precise input. Touch targets become larger, and the design avoids interactions that depend only on hover.',
            },
            night: {
                name: 'Night shift',
                dist: '60 cm',
                motion: 'reduced glare',
                note: 'This version lowers the visual brightness while keeping the critical state recognizable. The goal is to reduce glare without weakening important warnings.',
            },
        },
    },
    zh: {
        eyebrow: '狀態模型',
        title: 'HMI 狀態矩陣瀏覽器',
        intent: '同一個系統狀態，在不同距離、光線與操作條件下，不應套用完全相同的介面。這個模組將桌面監控、三公尺外快速辨識、戴手套操作與夜班低眩光四種情境，交叉比對正常、注意、警告、危急、降級、離線與交接七類狀態，呈現資訊密度、字級、色彩與操作方式如何隨情境調整。',
        gridLabel: '不同情境下的介面狀態',
        states: '狀態',
        contexts: '操作情境',
        pick: '選擇一格',
        arrowHint: '方向鍵移動 · Enter 開啟',
        specTitle: '狀態規格',
        specTarget: '可點擊範圍',
        specType: '主要數字大小',
        specContrast: '文字對比',
        specMotion: '動態節奏',
        specSurface: '背景表面',
        ack: '確認',
        secondaryDropped: '此情境先拿掉次要說明',
        notes: [
            {
                tag: 'Design decision / 設計判斷',
                text: '整套介面只將紅色保留給需要立即處置的危急狀態；其餘層級改用琥珀、藍、青綠或金色，避免紅色因過度使用而失去警示力。',
            },
            {
                tag: 'Trade-off / 設計取捨',
                text: '為不同狀態與操作情境建立專屬版本，會增加設計、實作與維護成本；但矩陣能讓這些差異、規格與取捨被逐項檢查，而不是留到開發階段再臨時判斷。',
            },
        ],
        content: {
            normal: {
                title: '泵浦 A',
                value: '4.2 bar',
                sub: '迴路運作正常',
            },
            advisory: {
                title: '泵浦 A',
                value: '4.8 bar',
                sub: '壓力正在緩慢上升',
            },
            warning: {
                title: '迴路 A',
                value: '5.6 bar',
                sub: '已高於軟性上限',
            },
            critical: {
                title: '迴路 A',
                value: '6.8 bar',
                sub: '閥件 V-2 可能受阻',
            },
            degraded: {
                title: '感測器 S-3',
                value: '—.— bar',
                sub: '訊號已中斷 12 秒',
            },
            offline: {
                title: '連線狀態',
                value: '離線',
                sub: '正在嘗試重新連線',
            },
            handoff: {
                title: '控制權',
                value: '手動',
                sub: '目前由操作員控制',
            },
        },
        ctx: {
            desk: {
                name: '桌面監控',
                dist: '40 cm',
                motion: '標準 240 ms',
                note: '這是工作站近距離操作的基準版本。資訊密度足以支援日常監控，同時保留清楚的主次層級，避免單張狀態卡承載過多內容。',
            },
            glance: {
                name: '一眼辨識 · 3 m',
                dist: '3 m',
                motion: '只保留必要動態',
                note: '這個版本是為了較遠距離的快速判讀而設計。主要數字被放大，次要文字先拿掉，讓操作員能一眼看出狀態。',
            },
            gloved: {
                name: '戴手套操作',
                dist: '40 cm',
                motion: '標準 240 ms',
                note: '這個情境假設操作會比較慢、也比較不精準。因此可點擊範圍會放大，並避免只靠 hover 才看得見的操作提示。',
            },
            night: {
                name: '夜班低眩光',
                dist: '60 cm',
                motion: '降低眩光',
                note: '這個版本降低整體亮度，同時保留危急狀態的可辨識性。目標是減少眩光，但不削弱重要警示。',
            },
        },
    },
};

const STATE_KEYS = ['normal', 'advisory', 'warning', 'critical', 'degraded', 'offline', 'handoff'];
const CTX_KEYS = ['desk', 'glance', 'gloved', 'night'];

// Context adaptations. typeScale multiplies the ~30px base value.
const CTX_SPEC = {
    desk: { typeScale: 1.0, hitPx: 40, secondary: true, night: false },
    glance: { typeScale: 2.4, hitPx: 44, secondary: false, night: false },
    gloved: { typeScale: 1.1, hitPx: 56, secondary: true, night: false },
    night: { typeScale: 1.0, hitPx: 44, secondary: true, night: true },
};

function tokensFor(stateKey, ctxKey) {
    const s = STATUS[stateKey];
    const c = CTX_SPEC[ctxKey];

    return {
        accent: c.night ? s.night : s.hex,
        contrast: c.night ? s.nightRatio : s.ratio,
        surface: c.night ? '#05080C' : 'var(--gx-bg-2)',
        icon: s.icon,
        ...c,
    };
}

function StatusCard({ stateKey, ctxKey, t, lang, variant }) {
    const tk = tokensFor(stateKey, ctxKey);
    const c = t.content[stateKey];
    const isFull = variant === 'full';
    const valueSize = isFull ? Math.round(30 * tk.typeScale) : 13;

    return (
        <div
            className={`gx-sc gx-sc-${variant}`}
            style={{ '--sc': tk.accent, background: tk.surface }}
        >
            <div className="gx-sc-top">
                <span className="gx-sc-icon" style={{ color: tk.accent }}>
                    <StatusIcon name={tk.icon} size={isFull ? 20 : 12} />
                </span>

                {isFull && (
                    <span className="gx-sc-label" style={{ color: tk.accent }}>
                        {STATUS[stateKey].label[lang]}
                    </span>
                )}

                <span className="gx-sc-led" style={{ background: tk.accent }} />
            </div>

            <div className="gx-sc-title">
                {c.title}
            </div>

            <div className="gx-sc-value" style={{ fontSize: valueSize, color: tk.accent }}>
                {c.value}
            </div>

            {tk.secondary ? (
                <div className="gx-sc-sub">
                    {c.sub}
                </div>
            ) : (
                isFull && (
                    <div className="gx-sc-sub gx-sc-sub-muted">
                        · {t.secondaryDropped} ·
                    </div>
                )
            )}

            {isFull && (
                <button
                    className="gx-sc-ack"
                    style={{ minHeight: tk.hitPx, minWidth: tk.hitPx }}
                >
                    {t.ack}
                </button>
            )}
        </div>
    );
}

function SpecRow({ k, v, accent }) {
    return (
        <div className="gx-spec-row">
            <span>{k}</span>
            <b style={accent ? { color: accent } : undefined}>{v}</b>
        </div>
    );
}

export default function M02StateMatrix() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const [active, setActive] = useState({ r: 3, c: 0 }); // opens on Critical / Desk
    const gridRef = useRef(null);

    const move = (dr, dc) => setActive(({ r, c }) => ({
        r: Math.max(0, Math.min(STATE_KEYS.length - 1, r + dr)),
        c: Math.max(0, Math.min(CTX_KEYS.length - 1, c + dc)),
    }));

    const onKeyDown = e => {
        const map = {
            ArrowUp: [-1, 0],
            ArrowDown: [1, 0],
            ArrowLeft: [0, -1],
            ArrowRight: [0, 1],
        };

        if (map[e.key]) {
            e.preventDefault();
            move(...map[e.key]);
        }
    };

    const stateKey = STATE_KEYS[active.r];
    const ctxKey = CTX_KEYS[active.c];
    const tk = tokensFor(stateKey, ctxKey);

    return (
        <ModuleFrame
            id="gx-m02"
            num="02"
            tone="var(--gx-teal)"
            eyebrow={t.eyebrow}
            title={t.title}
            intent={t.intent}
            notes={t.notes}
        >
            <div className="gx-m02">
                <div className="gx-m02-grid-wrap">
                    <div className="gx-m02-colhead" aria-hidden="true">
                        <span className="gx-m02-corner">
                            {t.states} \ {t.contexts}
                        </span>

                        {CTX_KEYS.map(ck => (
                            <span key={ck} className="gx-m02-cth">
                                {t.ctx[ck].name}
                            </span>
                        ))}
                    </div>

                    <div
                        ref={gridRef}
                        className="gx-m02-grid"
                        role="grid"
                        aria-label={t.gridLabel}
                        onKeyDown={onKeyDown}
                    >
                        {STATE_KEYS.map((sk, r) => (
                            <div className="gx-m02-row" role="row" key={sk}>
                                <span
                                    className="gx-m02-rth"
                                    role="rowheader"
                                    style={{ color: STATUS[sk].hex }}
                                >
                                    <StatusIcon name={STATUS[sk].icon} size={13} /> {STATUS[sk].label[lang]}
                                </span>

                                {CTX_KEYS.map((ck, c) => {
                                    const on = active.r === r && active.c === c;

                                    return (
                                        <div
                                            role="gridcell"
                                            key={ck}
                                            className="gx-m02-cell-wrap"
                                        >
                                            <button
                                                className={`gx-m02-cell${on ? ' active' : ''}`}
                                                tabIndex={on ? 0 : -1}
                                                aria-label={`${STATUS[sk].label[lang]} · ${t.ctx[ck].name}`}
                                                aria-pressed={on}
                                                onClick={() => setActive({ r, c })}
                                                onFocus={() => setActive({ r, c })}
                                            >
                                                <StatusCard
                                                    stateKey={sk}
                                                    ctxKey={ck}
                                                    t={t}
                                                    lang={lang}
                                                    variant="thumb"
                                                />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="gx-m02-detail" aria-live="polite">
                    <div className="gx-m02-detail-head">
                        <span className="gx-eyebrow" style={{ color: tk.accent }}>
                            {STATUS[stateKey].label[lang]} · {t.ctx[ctxKey].name}
                        </span>

                        <span className="gx-caption">
                            {t.arrowHint}
                        </span>
                    </div>

                    <div
                        className="gx-m02-stage"
                        style={CTX_SPEC[ctxKey].night ? { background: '#04060A' } : undefined}
                    >
                        <StatusCard
                            stateKey={stateKey}
                            ctxKey={ctxKey}
                            t={t}
                            lang={lang}
                            variant="full"
                        />
                    </div>

                    <p className="gx-m02-ctxnote">
                        {t.ctx[ctxKey].note}
                    </p>

                    <div className="gx-m02-spec">
                        <div className="gx-eyebrow gx-m02-spec-title">
                            {t.specTitle}
                        </div>

                        <SpecRow k={t.specTarget} v={`${tk.hitPx} px`} />
                        <SpecRow k={t.specType} v={`${Math.round(30 * tk.typeScale)} px`} />
                        <SpecRow k={t.specContrast} v={`${tk.contrast} : 1`} accent={tk.accent} />
                        <SpecRow k={t.specSurface} v={CTX_SPEC[ctxKey].night ? '#05080C' : '#14171D'} />
                        <SpecRow k={t.specMotion} v={t.ctx[ctxKey].motion} />
                    </div>
                </aside>
            </div>
        </ModuleFrame>
    );
}

injectStyles('gx-m02-styles', `
.gx-m02 { display: grid; grid-template-columns: 1fr; gap: 22px; }
.gx-m02-grid-wrap { overflow-x: auto; min-width: 0; }
.gx-m02-detail { min-width: 0; }
.gx-m02-colhead { display: grid; grid-template-columns: 92px repeat(4, minmax(78px, 1fr)); gap: 6px; margin-bottom: 6px; min-width: 440px; }
.gx-m02-corner { font-family: var(--gx-font-data); font-size: 10px; color: var(--gx-text-3); align-self: end; }
.gx-m02-cth { font-family: var(--gx-font-data); font-size: 10.5px; letter-spacing: 0.03em; color: var(--gx-text-2); text-align: center; align-self: end; line-height: 1.3; }
.gx-m02-grid { display: flex; flex-direction: column; gap: 6px; min-width: 440px; }
.gx-m02-row { display: grid; grid-template-columns: 92px repeat(4, minmax(78px, 1fr)); gap: 6px; align-items: stretch; }
.gx-m02-rth { display: flex; align-items: center; gap: 5px; font-family: var(--gx-font-data); font-size: 11px; white-space: nowrap; }
.gx-m02-cell-wrap { display: flex; }
.gx-m02-cell { display: block; width: 100%; border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-sm); padding: 3px; transition: border-color 160ms var(--gx-ease), transform 140ms var(--gx-ease), box-shadow 160ms var(--gx-ease); }
.gx-m02-cell:hover { border-color: var(--gx-line-2); transform: translateY(-1px); }
.gx-m02-cell.active { border-color: var(--gx-accent); box-shadow: 0 0 0 1px var(--gx-accent); }

/* status card */
.gx-sc { border-radius: 5px; padding: 7px 8px; }
.gx-sc-top { display: flex; align-items: center; gap: 6px; }
.gx-sc-led { width: 5px; height: 5px; border-radius: 50%; margin-left: auto; }
.gx-sc-title { font-family: var(--gx-font-data); color: var(--gx-text-3); }
.gx-sc-value { font-family: var(--gx-font-data); font-weight: 500; line-height: 1.1; }
.gx-sc-sub { color: var(--gx-text-3); }
.gx-sc-thumb { min-height: 46px; }
.gx-sc-thumb .gx-sc-title { font-size: 9px; margin-top: 2px; }
.gx-sc-thumb .gx-sc-value { margin-top: 1px; }
.gx-sc-thumb .gx-sc-sub { display: none; }

.gx-sc-full { padding: 18px 18px 16px; border: 1px solid rgba(255,255,255,0.06); border-radius: var(--gx-r-md); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.gx-sc-full .gx-sc-label { font-family: var(--gx-font-data); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; }
.gx-sc-full .gx-sc-icon { display: inline-flex; }
.gx-sc-full .gx-sc-led { width: 8px; height: 8px; box-shadow: 0 0 8px currentColor; }
.gx-sc-full .gx-sc-title { font-size: 12px; margin-top: 14px; letter-spacing: 0.08em; text-transform: uppercase; }
.gx-sc-full .gx-sc-value { margin-top: 2px; }
.gx-sc-full .gx-sc-sub { font-size: 13px; margin-top: 6px; font-family: var(--gx-font-body); }
.gx-sc-sub-muted { color: var(--gx-text-3); font-style: italic; }
.gx-sc-ack { display: inline-flex; align-items: center; justify-content: center; margin-top: 16px; padding: 0 18px; font-size: 13px; font-weight: 600; color: var(--gx-text-1); background: rgba(255,255,255,0.05); border: 1px solid var(--sc); border-radius: var(--gx-r-sm); }

.gx-m02-detail { background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); padding: 18px; }
.gx-m02-detail-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; }
.gx-m02-stage { display: flex; justify-content: center; padding: 22px; background: var(--gx-bg-1); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); }
.gx-m02-stage .gx-sc-full { width: 100%; max-width: 300px; }
.gx-m02-ctxnote { font-size: 13px; color: var(--gx-text-2); margin: 14px 0; }
.gx-m02-spec { border-top: 1px solid var(--gx-line-1); padding-top: 14px; }
.gx-m02-spec-title { color: var(--gx-text-3); margin-bottom: 10px; }
.gx-spec-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; font-family: var(--gx-font-data); font-size: 12px; padding: 5px 0; border-bottom: 1px dashed var(--gx-line-1); }
.gx-spec-row span { color: var(--gx-text-3); }
.gx-spec-row b { color: var(--gx-text-1); font-weight: 500; }

@media (min-width: 900px) {
  .gx-m02 { grid-template-columns: 1.3fr 1fr; align-items: start; }
}
`);
