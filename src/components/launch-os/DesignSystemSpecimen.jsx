import React, { useRef, useState } from 'react';
import ModuleFrame, { injectStyles } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// Contrast ratios are measured against --bg-1 (#0C0E12) with the WCAG 2.1
// formula, not estimated. text-3 fails body-text AA on purpose and says so.

const COLOR_TOKENS = [
    { name: '--bg-0', hex: '#060709', usage: { en: 'Page base', zh: '頁面最底層' }, contrast: null },
    { name: '--bg-1', hex: '#0C0E12', usage: { en: 'Module container', zh: '模組容器底' }, contrast: null },
    { name: '--bg-2', hex: '#14171D', usage: { en: 'Cards, panels', zh: '卡片／面板底' }, contrast: null },
    { name: '--bg-3', hex: '#1C2028', usage: { en: 'Hover lift', zh: 'hover 抬升層' }, contrast: null },
    { name: '--line-1', hex: '#262B35', usage: { en: 'Primary strokes', zh: '主要描邊' }, contrast: null },
    { name: '--line-2', hex: '#333A47', usage: { en: 'Hover strokes', zh: 'hover 描邊' }, contrast: null },
    { name: '--text-1', hex: '#F2F0EB', usage: { en: 'Headings (warm white)', zh: '主標題（暖白）' }, contrast: 17.0, grade: 'AAA' },
    { name: '--text-2', hex: '#A8ADB8', usage: { en: 'Body text', zh: '內文' }, contrast: 8.6, grade: 'AAA' },
    { name: '--text-3', hex: '#6B7280', usage: { en: 'Labels, secondary notes', zh: '標籤／次要說明' }, contrast: 4.0, grade: 'large-only' },
    { name: '--teal', hex: '#35C2B0', usage: { en: 'System working: interaction, pass, focus', zh: '系統在運作：互動、通過、focus' }, contrast: 8.7, grade: 'AAA' },
    { name: '--amber', hex: '#E8A33D', usage: { en: 'Human judgment: notes, cautions', zh: '人的判斷：註記、警示' }, contrast: 9.0, grade: 'AAA' },
    { name: '--red', hex: '#D96A5B', usage: { en: 'Stop: blocked, high risk (≤3 per view)', zh: '停下來：blocked、高風險（每畫面 ≤3 處）' }, contrast: 5.7, grade: 'AA' },
];

const TYPE_SCALE = [
    { name: 'display-xl', spec: 'clamp(40–64px) · Newsreader 500', style: { fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 4.5vw, 64px)', fontWeight: 500, lineHeight: 1.05 } },
    { name: 'display-md', spec: 'clamp(28–40px) · Newsreader 500', style: { fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 500, lineHeight: 1.15 } },
    { name: 'heading', spec: '20px / 1.3 · Inter 600', style: { fontFamily: 'var(--font-body)', fontSize: 20, fontWeight: 600, lineHeight: 1.3 } },
    { name: 'body', spec: '16px / 1.65 · Inter 400', style: { fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.65 } },
    { name: 'data-md', spec: '14px / 1.5 · JetBrains Mono 400', style: { fontFamily: 'var(--font-data)', fontSize: 14, lineHeight: 1.5 } },
    { name: 'data-sm', spec: '12px / 1.5 · Mono 400 · ls 0.06em', style: { fontFamily: 'var(--font-data)', fontSize: 12, letterSpacing: '0.06em' } },
    { name: 'eyebrow', spec: '12px · Mono 500 · ls 0.18em · caps', style: { fontFamily: 'var(--font-data)', fontSize: 12, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' } },
];

const GATE_STATES = [
    { id: 'default', note: { en: 'Resting state', zh: '靜止狀態' } },
    { id: 'hover', note: { en: 'Pointer over row: bg-2 → bg-3, stroke lifts', zh: '游標懸停：bg-2 → bg-3，描邊提亮' } },
    { id: 'focus-visible', note: { en: 'Keyboard focus: 2px teal ring, 2px offset', zh: '鍵盤 focus：2px teal 環，offset 2px' } },
    { id: 'disabled', note: { en: 'Gate not yet reachable: 45% opacity, no pointer', zh: '尚不可達的 gate：45% 透明度，停用游標' } },
    { id: 'loading', note: { en: 'Evidence loading: static skeleton, no shimmer', zh: '證據載入中：靜態骨架，不做閃爍動畫' } },
];

const A11Y_NOTES = [
    {
        problem: { en: 'The risk heat map is purely visual information.', zh: '風險熱度圖是純視覺資訊。' },
        approach: { en: 'A visually-hidden <table> carries every risk with its likelihood and impact values.', zh: '以視覺隱藏的 <table> 承載每項風險及其 likelihood 與 impact 值。' },
        verify: {
            en: 'VoiceOver walkthrough — actual transcript: “Risks by likelihood and impact, table, 3 columns, 5 rows.” / “R1, Hallucinated policy details in replies. Likelihood: 4. Impact: 5.”',
            zh: 'VoiceOver 走查——實際逐字稿：「Risks by likelihood and impact, table, 3 columns, 5 rows.」／「R1, Hallucinated policy details in replies. Likelihood: 4. Impact: 5.」',
        },
    },
    {
        problem: { en: 'The ranking re-sort animation could disorient motion-sensitive users.', zh: '排序重排動畫可能造成動暈敏感使用者不適。' },
        approach: { en: 'prefers-reduced-motion collapses every transition to a 100ms opacity change; the FLIP glide is skipped in JS, not just CSS.', zh: 'prefers-reduced-motion 將所有 transition 降為 100ms 的透明度變化；FLIP 滑移在 JS 層跳過，不只靠 CSS。' },
        verify: { en: 'Toggled macOS Reduce Motion: rows still re-rank instantly, sparklines render their final state, nothing glides.', zh: '切換 macOS「減少動態效果」驗證：排序仍即時更新、sparkline 直接呈現終態、沒有任何滑移。' },
    },
    {
        problem: { en: 'Cross-panel links in the cockpit are hover-driven.', zh: 'Cockpit 的跨欄連動以 hover 驅動。' },
        approach: { en: 'Focus and blur fire the same highlight handlers, and the mobile layout replaces hover entirely with always-visible “feeds A · C” text.', zh: 'focus 與 blur 觸發同一組 highlight 邏輯；行動版則完全改為常駐的「feeds A · C」文字。' },
        verify: { en: 'Keyboard-only pass: Tab reaches every signal card, gate, slider, and chip; the linked panels light up without a mouse.', zh: '純鍵盤走查：Tab 可達每張訊號卡、gate、滑桿與 chip；不用滑鼠也能看到連動亮起。' },
    },
    {
        problem: { en: 'Gate status could read as color alone.', zh: 'Gate 狀態可能淪為只靠顏色辨識。' },
        approach: { en: 'Every status ships icon + word + note (“Blocked — no owner named”); color is the third channel, never the only one.', zh: '每個狀態都有 icon + 文字 + 註記（「Blocked — no owner named」）；顏色是第三個訊號通道，從來不是唯一的。' },
        verify: { en: 'Grayscale filter check: all seven gates remain distinguishable with color removed.', zh: '灰階濾鏡檢查：拿掉顏色後，七道 gate 仍可完整區辨。' },
    },
];

const ENGINEERING_NOTES = [
    {
        title: { en: 'Why hash routing', zh: '為什麼用 hash routing' },
        body: {
            en: 'GitHub Pages serves a static bundle from a subpath and returns 404 for any deep URL it has never heard of. I considered the 404.html redirect trick — it works, but it flashes on every deep link and pollutes analytics with fake 404s. Hash routing costs URL elegance and buys certainty: every route resolves to index.html by construction, refreshes never break, and the router stays ~30 dependency-free lines. On a portfolio, a link that always opens beats a URL that looks pretty in a bar nobody reads.',
            zh: 'GitHub Pages 從子路徑供應靜態檔案，任何它沒聽過的深層網址都回 404。我考慮過 404.html 重導向的技巧——可行，但每次深層連結都會閃一下，還會用假 404 汙染分析數據。Hash routing 犧牲網址的優雅，換來確定性：每條路由天生都落在 index.html，重新整理永遠不會壞，router 維持在約 30 行、零依賴。對作品集來說，一個永遠打得開的連結，勝過一串只在沒人看的網址列裡漂亮的字。',
        },
    },
    {
        title: { en: 'The reduced-motion budget', zh: 'Reduced-motion 的取捨' },
        body: {
            en: 'The rule I settled on: motion that carries information survives in reduced form; motion that carries pleasure dies. Ranking re-sorts still reorder — instantly, without the FLIP glide. Panel reveals keep a 100ms opacity fade so state changes stay findable. Sparkline draw-ins and tab cross-fades go entirely. My first version killed everything, and testing showed that instant reorder with no fade actually reads worse — you lose track of what moved. Reduce, it turns out, does not mean remove.',
            zh: '我最後定下的規則：承載資訊的動效以降級形式保留，承載愉悅的動效直接刪除。排序重排仍會發生——瞬間完成，沒有 FLIP 滑移。面板揭示保留 100ms 的透明度過渡，讓狀態變化仍然可被察覺。Sparkline 描線與 tab 淡入淡出則完全移除。第一版我把所有動效都砍了，實測發現「無過渡的瞬間重排」反而更難讀——你會跟丟到底是誰動了。原來 reduce 的意思不是 remove。',
        },
    },
    {
        title: { en: 'Zero raster images', zh: '零點陣圖' },
        body: {
            en: 'The six evidence modules ship no raster images — every diagram, chart, and thumbnail is DOM or hand-written SVG. Three reasons. Bundle: the whole evidence layer costs less than one hero JPEG. Sharpness: vectors survive any zoom level and pixel density. Consistency: SVG inherits CSS variables, so every chart recolors with the theme for free. The cost was real — the heat map took longer to draw in SVG than a screenshot would have — but a screenshot cannot take keyboard focus, and it cannot speak to a screen reader.',
            zh: '六個證據模組不含任何點陣圖——每張圖表、示意與縮圖都是 DOM 或手寫 SVG。理由有三。體積：整個證據層的成本比一張 hero JPEG 還小。銳利度：向量圖經得起任何縮放與像素密度。一致性：SVG 繼承 CSS variables，所有圖表跟著主題換色，不用額外成本。代價是真實的——熱度圖用 SVG 畫，比截一張圖久得多——但截圖沒辦法接住鍵盤 focus，也沒辦法對螢幕閱讀器說話。',
        },
    },
];

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 06 — SYSTEM SPECIMEN',
        title: 'Design System Specimen & Engineering Notes',
        lead: 'The Neural Signal OS itself, exhibited as work: tokens with measured contrast, one component in five states, accessibility notes with their verification, and three short engineering decisions — including a wrong turn.',
        context: 'Contrast ratios computed against --bg-1 (#0C0E12) with the WCAG 2.1 formula. One token fails body-text AA and is labeled accordingly.',
        signature: 'Signature interaction: hover a swatch, click to copy its hex.',
        sections: { tokens: 'A · TOKENS', states: 'B · COMPONENT STATES', a11y: 'C · A11Y NOTES', eng: 'D · ENGINEERING DECISIONS' },
        tableHeaders: { swatch: '', token: 'Token', hex: 'Hex', usage: 'Usage', contrast: 'Contrast vs bg-1' },
        gradeNote: { AAA: '✓ AAA', AA: '✓ AA', 'large-only': '△ 3:1 — large text / labels only' },
        copied: 'Copied',
        copyHint: 'Click to copy',
        typeLabel: 'TYPE SCALE',
        stateFields: { problem: 'Problem', approach: 'Approach', verify: 'Verified by' },
        gateSample: 'Model risk bounded',
        gateStatus: 'Conditional — one legal review open',
    },
    zh: {
        eyebrow: 'MODULE 06 — SYSTEM SPECIMEN',
        title: '設計系統切片與工程筆記',
        lead: '把 Neural Signal OS 本身當作品展出：附實測對比值的 tokens、一個元件的五種狀態、附驗證方式的無障礙筆記，以及三則簡短的工程決策——包含一段走過的彎路。',
        context: '對比值以 WCAG 2.1 公式對 --bg-1（#0C0E12）實際計算。有一個 token 沒過內文 AA，並如實標註。',
        signature: '招牌互動：懸停色票可預覽，點擊複製 hex。',
        sections: { tokens: 'A · TOKENS', states: 'B · COMPONENT STATES', a11y: 'C · A11Y NOTES', eng: 'D · ENGINEERING DECISIONS' },
        tableHeaders: { swatch: '', token: 'Token', hex: 'Hex', usage: '用途', contrast: '對 bg-1 對比值' },
        gradeNote: { AAA: '✓ AAA', AA: '✓ AA', 'large-only': '△ 3:1——僅限大字／標籤' },
        copied: '已複製',
        copyHint: '點擊複製',
        typeLabel: 'TYPE SCALE',
        stateFields: { problem: '問題', approach: '做法', verify: '驗證方式' },
        gateSample: 'Model risk bounded',
        gateStatus: 'Conditional — 一項法務審查未完成',
    },
};

// ---- pieces -----------------------------------------------------------------
function Swatch({ token, t }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);
    const copy = () => {
        navigator.clipboard?.writeText(token.hex).catch(() => {});
        clearTimeout(timer.current);
        setCopied(true);
        timer.current = setTimeout(() => setCopied(false), 1500);
    };
    return (
        <button
            className="los-m6-swatch"
            style={{ background: token.hex }}
            onClick={copy}
            aria-label={`${token.name} ${token.hex} — ${t.copyHint}`}
        >
            <span className={`los-m6-swatch-tip los-data-sm${copied ? ' is-copied' : ''}`}>
                {copied ? t.copied : token.hex}
            </span>
        </button>
    );
}

// ---- module ------------------------------------------------------------------
export default function DesignSystemSpecimen() {
    const { lang, t } = useI18n(COPY);
    return (
        <ModuleFrame
            id="los-module-specimen"
            eyebrow={t.eyebrow}
            title={t.title}
            lead={t.lead}
            context={t.context}
            roles={['FRONT-END ENGINEER', 'PRODUCT DESIGNER']}
            signature={t.signature}
        >
            <section aria-label={t.sections.tokens}>
                <h4 className="los-eyebrow los-m6-heading">{t.sections.tokens}</h4>
                <div className="los-m6-tablewrap">
                    <table className="los-m6-table">
                        <thead>
                            <tr>
                                <th aria-label="swatch"></th>
                                <th>{t.tableHeaders.token}</th>
                                <th>{t.tableHeaders.hex}</th>
                                <th>{t.tableHeaders.usage}</th>
                                <th>{t.tableHeaders.contrast}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COLOR_TOKENS.map(token => (
                                <tr key={token.name}>
                                    <td><Swatch token={token} t={t} /></td>
                                    <td className="los-data-md los-m6-token-name">{token.name}</td>
                                    <td className="los-data-sm">{token.hex}</td>
                                    <td>{token.usage[lang]}</td>
                                    <td className="los-data-sm">
                                        {token.contrast == null ? '—' : (
                                            <>
                                                {token.contrast.toFixed(1)}{' '}
                                                <span className={`los-m6-grade is-${token.grade === 'large-only' ? 'warn' : 'pass'}`}>
                                                    {t.gradeNote[token.grade]}
                                                </span>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h5 className="los-eyebrow los-m6-subheading">{t.typeLabel}</h5>
                <div className="los-m6-typescale">
                    {TYPE_SCALE.map(step => (
                        <div className="los-m6-type-row" key={step.name}>
                            <span style={{ ...step.style, color: 'var(--text-1)' }}>{step.name}</span>
                            <span className="los-data-sm los-m6-type-spec">{step.spec}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-label={t.sections.states}>
                <h4 className="los-eyebrow los-m6-heading">{t.sections.states}</h4>
                <div className="los-m6-states">
                    {GATE_STATES.map(state => (
                        <div className="los-m6-state" key={state.id}>
                            <div className={`los-m6-gate is-${state.id}`} aria-hidden="true">
                                {state.id === 'loading' ? (
                                    <>
                                        <span className="los-m6-skeleton" style={{ width: 14, height: 14, borderRadius: '50%', flexShrink: 0, marginTop: 3 }} />
                                        <span className="los-m6-gate-main">
                                            <span className="los-m6-skeleton" style={{ width: '72%', height: 10, display: 'block' }} />
                                            <span className="los-m6-skeleton" style={{ width: '48%', height: 8, display: 'block', marginTop: 6 }} />
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0, marginTop: 3 }}>
                                            <circle cx="7" cy="7" r="5.4" fill="none" stroke="var(--amber)" strokeWidth="1.4" />
                                            <path d="M7 1.6a5.4 5.4 0 0 1 0 10.8z" fill="var(--amber)" />
                                        </svg>
                                        <span className="los-m6-gate-main">
                                            <span className="los-m6-gate-name">3. {t.gateSample}</span>
                                            <span className="los-data-sm los-m6-gate-status">{t.gateStatus}</span>
                                        </span>
                                    </>
                                )}
                            </div>
                            <span className="los-data-sm los-m6-state-id">{state.id}</span>
                            <span className="los-data-sm los-m6-state-note">{state.note[lang]}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-label={t.sections.a11y}>
                <h4 className="los-eyebrow los-m6-heading">{t.sections.a11y}</h4>
                <div className="los-m6-a11y">
                    {A11Y_NOTES.map((note, i) => (
                        <div className="los-m6-a11y-card" key={i}>
                            <p><span className="los-data-sm">{t.stateFields.problem}</span>{note.problem[lang]}</p>
                            <p><span className="los-data-sm">{t.stateFields.approach}</span>{note.approach[lang]}</p>
                            <p><span className="los-data-sm">{t.stateFields.verify}</span>{note.verify[lang]}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-label={t.sections.eng}>
                <h4 className="los-eyebrow los-m6-heading">{t.sections.eng}</h4>
                <div className="los-m6-eng">
                    {ENGINEERING_NOTES.map((note, i) => (
                        <article className="los-m6-eng-card" key={i}>
                            <h5 className="los-m6-eng-title">{note.title[lang]}</h5>
                            <p>{note.body[lang]}</p>
                        </article>
                    ))}
                </div>
            </section>
        </ModuleFrame>
    );
}

// ---- styles ---------------------------------------------------------------------
injectStyles('los-m6-styles', `
.los-m6-heading { display: block; color: var(--text-3); margin: 28px 0 14px; }
.los-m6-heading:first-of-type { margin-top: 0; }
.los-m6-subheading { display: block; color: var(--text-3); margin: 24px 0 10px; font-size: 10px; }

.los-m6-tablewrap { overflow-x: auto; }
.los-m6-table { width: 100%; border-collapse: collapse; min-width: 640px; }
.los-m6-table th {
  font-family: var(--font-data); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-3); text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--line-2);
}
.los-m6-table td {
  font-size: 13px; color: var(--text-2); padding: 8px 10px;
  border-bottom: 1px solid var(--line-1); vertical-align: middle;
}
.los-m6-token-name { color: var(--text-1); }
.los-m6-grade.is-pass { color: var(--teal); }
.los-m6-grade.is-warn { color: var(--amber); }
.los-m6-swatch {
  position: relative;
  width: 36px; height: 24px; border-radius: var(--radius-sm);
  border: 1px solid var(--line-2); cursor: pointer; display: block;
}
.los-m6-swatch-tip {
  position: absolute; left: 50%; bottom: calc(100% + 6px); transform: translateX(-50%);
  background: var(--bg-3); border: 1px solid var(--line-2); border-radius: var(--radius-sm);
  color: var(--text-1); padding: 2px 8px; white-space: nowrap;
  opacity: 0; pointer-events: none; transition: opacity 120ms var(--ease);
  z-index: 3;
}
.los-m6-swatch:hover .los-m6-swatch-tip,
.los-m6-swatch:focus-visible .los-m6-swatch-tip,
.los-m6-swatch-tip.is-copied { opacity: 1; }
.los-m6-swatch-tip.is-copied { color: var(--teal); }

.los-m6-typescale { display: flex; flex-direction: column; gap: 10px; }
.los-m6-type-row {
  display: flex; align-items: baseline; justify-content: space-between; gap: 16px;
  border-bottom: 1px solid var(--line-1); padding-bottom: 10px;
}
.los-m6-type-spec { color: var(--text-3); white-space: nowrap; }

.los-m6-states { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
.los-m6-state { display: flex; flex-direction: column; gap: 6px; }
.los-m6-gate {
  display: flex; gap: 10px; align-items: flex-start;
  background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-md);
  padding: 11px 12px; min-height: 64px;
}
.los-m6-gate.is-hover { background: var(--bg-3); border-color: var(--line-2); }
.los-m6-gate.is-focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; }
.los-m6-gate.is-disabled { opacity: 0.45; }
.los-m6-gate-main { flex: 1; min-width: 0; }
.los-m6-gate-name { display: block; font-size: 13px; font-weight: 500; color: var(--text-1); line-height: 1.35; }
.los-m6-gate-status { display: block; color: var(--amber); margin-top: 2px; }
.los-m6-skeleton { background: var(--bg-3); border-radius: 4px; display: inline-block; }
.los-m6-state-id { color: var(--text-1); letter-spacing: 0.08em; }
.los-m6-state-note { color: var(--text-3); line-height: 1.5; }

.los-m6-a11y { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.los-m6-a11y-card {
  background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-md);
  padding: 14px;
}
.los-m6-a11y-card p { font-size: 13px; line-height: 1.6; color: var(--text-2); margin: 0 0 10px; }
.los-m6-a11y-card p:last-child { margin-bottom: 0; }
.los-m6-a11y-card .los-data-sm {
  display: block; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2px;
}

.los-m6-eng { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.los-m6-eng-card {
  background: var(--bg-2); border: 1px solid var(--line-1); border-radius: var(--radius-md);
  padding: 16px;
}
.los-m6-eng-title { font-size: 15px; font-weight: 600; color: var(--text-1); margin: 0 0 8px; }
.los-m6-eng-card p { font-size: 13px; line-height: 1.7; color: var(--text-2); margin: 0; }

@media (max-width: 1023px) {
  .los-m6-states { grid-template-columns: repeat(2, 1fr); }
  .los-m6-eng { grid-template-columns: 1fr; }
}
@media (max-width: 767px) {
  .los-m6-states { grid-template-columns: 1fr; }
  .los-m6-a11y { grid-template-columns: 1fr; }
}
`);
