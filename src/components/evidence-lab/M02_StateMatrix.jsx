import React, { useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, STATUS, StatusIcon } from './shared/labKit.jsx';

const STRINGS = {
    en: {
        eyebrow: 'STATE MODEL',
        title: 'HMI State Matrix Explorer',
        intent: 'Every state, every context, designed on purpose — not just the happy path.',
        gridLabel: 'Interface state by operating context',
        states: 'States', contexts: 'Contexts',
        pick: 'Pick a cell', arrowHint: 'Arrow keys move · Enter opens',
        specTitle: 'Spec readout',
        specTarget: 'Min touch target', specType: 'Primary type', specContrast: 'Contrast', specMotion: 'Motion', specSurface: 'Surface',
        ack: 'Acknowledge',
        secondaryDropped: 'Secondary text dropped at glance distance',
        notes: [
            { tag: 'Decision / 決策', text: 'Critical is the only red on this page. Every other tier uses amber, teal, or gold so red keeps its meaning.' },
            { tag: 'Trade-off / 取捨', text: '28 designed combinations is expensive. The matrix is what makes that cost visible and reviewable.' },
        ],
        content: {
            normal:   { title: 'Pump A',    value: '4.2 bar', sub: 'loop nominal' },
            advisory: { title: 'Pump A',    value: '4.8 bar', sub: 'trend rising +0.4/min' },
            warning:  { title: 'Loop A',    value: '5.6 bar', sub: 'above soft limit' },
            critical: { title: 'Loop A',    value: '6.8 bar', sub: 'valve V-2 restriction' },
            degraded: { title: 'Sensor S-3', value: '—.— bar', sub: 'signal lost 12 s' },
            offline:  { title: 'Link',      value: 'OFFLINE', sub: 'reconnecting…' },
            handoff:  { title: 'Control',   value: 'MANUAL',  sub: 'operator has control' },
        },
        ctx: {
            desk:   { name: 'Desk',         dist: '40 cm', motion: 'standard 240 ms',    note: 'Baseline density for a seated operator at a workstation.' },
            glance: { name: 'Glance · 3 m', dist: '3 m',   motion: 'essential only',     note: 'Primary value scales ~2.4×; secondary text is dropped so the state reads in one look.' },
            gloved: { name: 'Gloved touch', dist: '40 cm', motion: 'standard 240 ms',    note: 'Hit areas grow to 56 px and hover-only affordances are removed.' },
            night:  { name: 'Night shift',  dist: '60 cm', motion: 'reduced glare',      note: 'Dimmed surface preserves red for critical; luminance drops to protect dark adaptation.' },
        },
    },
    zh: {
        eyebrow: '狀態模型',
        title: 'HMI 狀態矩陣瀏覽器',
        intent: '每一種狀態、每一種情境，都是刻意設計的結果，而不只是順利路徑。',
        gridLabel: '介面狀態 × 操作情境',
        states: '狀態', contexts: '情境',
        pick: '選擇一格', arrowHint: '方向鍵移動 · Enter 開啟',
        specTitle: '規格讀出',
        specTarget: '最小點擊區', specType: '主要字級', specContrast: '對比', specMotion: '動態', specSurface: '表面',
        ack: '確認',
        secondaryDropped: '在一瞥距離下捨去次要文字',
        notes: [
            { tag: 'Decision / 決策', text: '整頁只有危急狀態使用紅色。其他層級一律用琥珀、青綠或金色，讓紅色保有意義。' },
            { tag: 'Trade-off / 取捨', text: '28 種設計組合成本很高。矩陣的作用，就是把這個成本攤開、可被審視。' },
        ],
        content: {
            normal:   { title: '泵浦 A',   value: '4.2 bar', sub: '迴路正常' },
            advisory: { title: '泵浦 A',   value: '4.8 bar', sub: '趨勢上升 +0.4/分' },
            warning:  { title: '迴路 A',   value: '5.6 bar', sub: '超過軟性上限' },
            critical: { title: '迴路 A',   value: '6.8 bar', sub: '閥件 V-2 阻塞' },
            degraded: { title: '感測 S-3', value: '—.— bar', sub: '訊號遺失 12 秒' },
            offline:  { title: '連線',     value: 'OFFLINE', sub: '重新連線中…' },
            handoff:  { title: '控制權',   value: 'MANUAL',  sub: '操作員持有控制' },
        },
        ctx: {
            desk:   { name: '桌面',      dist: '40 cm', motion: '標準 240 ms', note: '坐姿操作員在工作站前的基準密度。' },
            glance: { name: '一瞥 · 3 m', dist: '3 m',  motion: '僅必要動態', note: '主要數值放大約 2.4×，捨去次要文字，讓狀態一眼可讀。' },
            gloved: { name: '戴手套操作', dist: '40 cm', motion: '標準 240 ms', note: '點擊區放大到 56 px，並移除僅靠 hover 的操作提示。' },
            night:  { name: '夜班',      dist: '60 cm', motion: '降低眩光',   note: '暗化表面仍保留危急紅色；降低亮度以保護暗適應。' },
        },
    },
};

const STATE_KEYS = ['normal', 'advisory', 'warning', 'critical', 'degraded', 'offline', 'handoff'];
const CTX_KEYS = ['desk', 'glance', 'gloved', 'night'];

// Context adaptations (spec 3 · M02). typeScale multiplies the ~28px base value.
const CTX_SPEC = {
    desk:   { typeScale: 1.0, hitPx: 40, secondary: true, night: false },
    glance: { typeScale: 2.4, hitPx: 44, secondary: false, night: false },
    gloved: { typeScale: 1.1, hitPx: 56, secondary: true, night: false },
    night:  { typeScale: 1.0, hitPx: 44, secondary: true, night: true },
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
        <div className={`gx-sc gx-sc-${variant}`} style={{ '--sc': tk.accent, background: tk.surface }}>
            <div className="gx-sc-top">
                <span className="gx-sc-icon" style={{ color: tk.accent }}><StatusIcon name={tk.icon} size={isFull ? 20 : 12} /></span>
                {isFull && <span className="gx-sc-label" style={{ color: tk.accent }}>{STATUS[stateKey].label[lang]}</span>}
                <span className="gx-sc-led" style={{ background: tk.accent }} />
            </div>
            <div className="gx-sc-title">{c.title}</div>
            <div className="gx-sc-value" style={{ fontSize: valueSize, color: tk.accent }}>{c.value}</div>
            {tk.secondary
                ? <div className="gx-sc-sub">{c.sub}</div>
                : isFull && <div className="gx-sc-sub gx-sc-sub-muted">· {t.secondaryDropped} ·</div>}
            {isFull && (
                <button className="gx-sc-ack" style={{ minHeight: tk.hitPx, minWidth: tk.hitPx }}>
                    {t.ack}
                </button>
            )}
        </div>
    );
}

function SpecRow({ k, v, accent }) {
    return <div className="gx-spec-row"><span>{k}</span><b style={accent ? { color: accent } : undefined}>{v}</b></div>;
}

export default function M02StateMatrix() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const [active, setActive] = useState({ r: 3, c: 0 }); // opens on Critical/Desk
    const gridRef = useRef(null);

    const move = (dr, dc) => setActive(({ r, c }) => ({
        r: Math.max(0, Math.min(STATE_KEYS.length - 1, r + dr)),
        c: Math.max(0, Math.min(CTX_KEYS.length - 1, c + dc)),
    }));

    const onKeyDown = e => {
        const map = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
        if (map[e.key]) { e.preventDefault(); move(...map[e.key]); }
    };

    const stateKey = STATE_KEYS[active.r];
    const ctxKey = CTX_KEYS[active.c];
    const tk = tokensFor(stateKey, ctxKey);

    return (
        <ModuleFrame id="gx-m02" num="02" tone="var(--gx-teal)" eyebrow={t.eyebrow} title={t.title} intent={t.intent} notes={t.notes}>
            <div className="gx-m02">
                <div className="gx-m02-grid-wrap">
                    <div className="gx-m02-colhead" aria-hidden="true">
                        <span className="gx-m02-corner">{t.states} \\ {t.contexts}</span>
                        {CTX_KEYS.map(ck => <span key={ck} className="gx-m02-cth">{t.ctx[ck].name}</span>)}
                    </div>
                    <div ref={gridRef} className="gx-m02-grid" role="grid" aria-label={t.gridLabel} onKeyDown={onKeyDown}>
                        {STATE_KEYS.map((sk, r) => (
                            <div className="gx-m02-row" role="row" key={sk}>
                                <span className="gx-m02-rth" role="rowheader" style={{ color: STATUS[sk].hex }}>
                                    <StatusIcon name={STATUS[sk].icon} size={13} /> {STATUS[sk].label[lang]}
                                </span>
                                {CTX_KEYS.map((ck, c) => {
                                    const on = active.r === r && active.c === c;
                                    return (
                                        <div role="gridcell" key={ck} className="gx-m02-cell-wrap">
                                            <button
                                                className={`gx-m02-cell${on ? ' active' : ''}`}
                                                tabIndex={on ? 0 : -1}
                                                aria-label={`${STATUS[sk].label[lang]} · ${t.ctx[ck].name}`}
                                                aria-pressed={on}
                                                onClick={() => setActive({ r, c })}
                                                onFocus={() => setActive({ r, c })}>
                                                <StatusCard stateKey={sk} ctxKey={ck} t={t} lang={lang} variant="thumb" />
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
                        <span className="gx-eyebrow" style={{ color: tk.accent }}>{STATUS[stateKey].label[lang]} · {t.ctx[ctxKey].name}</span>
                        <span className="gx-caption">{t.arrowHint}</span>
                    </div>
                    <div className="gx-m02-stage" style={CTX_SPEC[ctxKey].night ? { background: '#04060A' } : undefined}>
                        <StatusCard stateKey={stateKey} ctxKey={ctxKey} t={t} lang={lang} variant="full" />
                    </div>
                    <p className="gx-m02-ctxnote">{t.ctx[ctxKey].note}</p>
                    <div className="gx-m02-spec">
                        <div className="gx-eyebrow gx-m02-spec-title">{t.specTitle}</div>
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
