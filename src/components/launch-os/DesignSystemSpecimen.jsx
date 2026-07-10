import React, { useRef, useState } from 'react';
import ModuleFrame, { injectStyles } from './shared/ModuleFrame.jsx';
import { useI18n } from './shared/useI18n.js';

// ---- DATA ------------------------------------------------------------------
// Contrast ratios are measured against --bg-1 (#0C0E12) with the WCAG 2.1
// formula, not estimated. text-3 fails body-text AA on purpose and says so.
// ✅ 文案優化：保留原本設計系統結構，只讓說明更自然、可讀，像真實作品集裡的設計與工程決策紀錄。

const COLOR_TOKENS = [
    { name: '--bg-0', hex: '#060709', usage: { en: 'Page background', zh: '頁面最底層背景' }, contrast: null },
    { name: '--bg-1', hex: '#0C0E12', usage: { en: 'Module background', zh: '模組主要背景' }, contrast: null },
    { name: '--bg-2', hex: '#14171D', usage: { en: 'Cards and panels', zh: '卡片與面板背景' }, contrast: null },
    { name: '--bg-3', hex: '#1C2028', usage: { en: 'Hover and raised states', zh: '滑過或抬升時的背景' }, contrast: null },
    { name: '--line-1', hex: '#262B35', usage: { en: 'Default borders', zh: '預設邊框' }, contrast: null },
    { name: '--line-2', hex: '#333A47', usage: { en: 'Active or hover borders', zh: '滑過或啟用時的邊框' }, contrast: null },
    { name: '--text-1', hex: '#F2F0EB', usage: { en: 'Primary headings', zh: '主要標題與關鍵文字' }, contrast: 17.0, grade: 'AAA' },
    { name: '--text-2', hex: '#A8ADB8', usage: { en: 'Body text', zh: '一般內文' }, contrast: 8.6, grade: 'AAA' },
    { name: '--text-3', hex: '#6B7280', usage: { en: 'Labels and supporting notes', zh: '標籤與輔助說明，不作為長內文' }, contrast: 4.0, grade: 'large-only' },
    { name: '--teal', hex: '#35C2B0', usage: { en: 'Interaction, pass states, focus', zh: '互動、通過狀態與鍵盤聚焦' }, contrast: 8.7, grade: 'AAA' },
    { name: '--amber', hex: '#E8A33D', usage: { en: 'Caution and decision notes', zh: '提醒、取捨與需要判斷的狀態' }, contrast: 9.0, grade: 'AAA' },
    { name: '--red', hex: '#D96A5B', usage: { en: 'Blocked or high-risk states', zh: '阻擋狀態與高風險提醒' }, contrast: 5.7, grade: 'AA' },
];

const TYPE_SCALE = [
    { name: 'display-xl', spec: 'clamp(40–64px) · Fraunces 500', style: { fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 4.5vw, 64px)', fontWeight: 500, lineHeight: 1.05 } },
    { name: 'display-md', spec: 'clamp(28–40px) · Fraunces 500', style: { fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 500, lineHeight: 1.15 } },
    { name: 'heading', spec: '20px / 1.3 · Inter 600', style: { fontFamily: 'var(--font-body)', fontSize: 20, fontWeight: 600, lineHeight: 1.3 } },
    { name: 'body', spec: '16px / 1.65 · Inter 400', style: { fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.65 } },
    { name: 'data-md', spec: '14px / 1.5 · JetBrains Mono 400', style: { fontFamily: 'var(--font-data)', fontSize: 14, lineHeight: 1.5 } },
    { name: 'data-sm', spec: '12px / 1.5 · Mono 400 · ls 0.06em', style: { fontFamily: 'var(--font-data)', fontSize: 12, letterSpacing: '0.06em' } },
    { name: 'eyebrow', spec: '12px · Mono 500 · ls 0.18em · caps', style: { fontFamily: 'var(--font-data)', fontSize: 12, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' } },
];

const GATE_STATES = [
    { id: 'default', note: { en: 'Default resting state', zh: '元件尚未被操作時的預設狀態' } },
    { id: 'hover', note: { en: 'Hover state: the background lifts slightly and the border becomes clearer', zh: '滑過時背景微微抬升，邊框變得更清楚' } },
    { id: 'focus-visible', note: { en: 'Keyboard focus: a clear teal ring shows where the user is', zh: '鍵盤操作時顯示清楚的聚焦外框，讓使用者知道目前位置' } },
    { id: 'disabled', note: { en: 'Disabled state: visible but not yet available', zh: '停用狀態：仍可看見，但目前尚不能操作' } },
    { id: 'loading', note: { en: 'Loading state: uses a calm placeholder instead of a distracting shimmer', zh: '載入狀態：使用安靜的占位樣式，不用容易干擾閱讀的閃爍動畫' } },
];

const A11Y_NOTES = [
    {
        problem: {
            en: 'The risk heat map could become impossible to understand for someone who cannot see the chart.',
            zh: '風險熱度圖如果只靠視覺呈現，使用螢幕閱讀器的人會無法理解每個風險的位置與嚴重程度。',
        },
        approach: {
            en: 'The visual chart is paired with a hidden table that lists every risk, its likelihood, and its impact.',
            zh: '因此我在視覺圖表之外，補上一份隱藏表格，讓每個風險的發生可能性與影響程度都能被讀取。',
        },
        verify: {
            en: 'Checked with VoiceOver: the heat map is announced as a table with risks, likelihood, and impact values.',
            zh: '以 VoiceOver 檢查後，系統能將風險熱度圖讀成包含風險、發生可能性與影響程度的表格。',
        },
    },
    {
        problem: {
            en: 'The animated ranking change may make the interface harder to follow for motion-sensitive users.',
            zh: '機會排序重新排列時的動畫，可能讓對動態效果敏感的使用者感到不適或難以追蹤。',
        },
        approach: {
            en: 'When reduced motion is enabled, the ranking still updates, but the sliding motion is removed and replaced with a very short opacity change.',
            zh: '當使用者開啟減少動態效果時，排序仍會更新，但滑動動畫會被移除，只保留非常短的透明度變化。',
        },
        verify: {
            en: 'Tested with macOS Reduce Motion: rows re-rank without sliding, and the interface still communicates what changed.',
            zh: '以 macOS「減少動態效果」測試後，排序能即時更新且不再滑動，同時仍能看出狀態變化。',
        },
    },
    {
        problem: {
            en: 'Some interactions rely on hover, which does not work for keyboard and touch users.',
            zh: '部分跨欄互動原本依賴 hover，但鍵盤使用者與手機使用者不一定能使用 hover。',
        },
        approach: {
            en: 'Keyboard focus triggers the same highlighting behavior. On mobile, relationship text is shown directly instead of waiting for hover.',
            zh: '鍵盤 focus 會觸發同樣的連動效果；在手機版則直接顯示關聯文字，不要求使用者滑過才看得到。',
        },
        verify: {
            en: 'Keyboard-only walkthrough: every signal, gate, slider, and chip can be reached and understood without a mouse.',
            zh: '以純鍵盤走查後，每張訊號卡、檢查項目、滑桿與篩選標籤都能被操作與理解。',
        },
    },
    {
        problem: {
            en: 'Gate status could be misunderstood if color is the only signal.',
            zh: '如果檢查狀態只靠顏色區分，色弱使用者或在灰階情境下會難以判斷。',
        },
        approach: {
            en: 'Each status includes an icon, a word, and a short note. Color is used as support, not as the only way to understand the state.',
            zh: '每個狀態都同時包含圖示、文字與簡短說明。顏色只是輔助訊號，不是唯一辨識方式。',
        },
        verify: {
            en: 'Checked with a grayscale filter: all gate states remain distinguishable without color.',
            zh: '以灰階濾鏡檢查後，即使拿掉顏色，所有狀態仍能被區分。',
        },
    },
];

const ENGINEERING_NOTES = [
    {
        title: {
            en: 'Why I used hash routing',
            zh: '為什麼這個作品集使用 hash routing',
        },
        body: {
            en: 'This portfolio is hosted on GitHub Pages, which is reliable for static sites but not friendly to deep links in single-page apps. I considered using a redirect workaround, but that can briefly flash a 404 page and make analytics messy. Hash routing is less elegant visually, but it makes every project link open safely, even after refresh. For a portfolio, reliability matters more than a perfectly clean URL.',
            zh: '這個作品集部署在 GitHub Pages。它很適合靜態網站，但對單頁應用的深層連結並不友善。我考慮過用重新導向的方式處理，但那會讓頁面短暫閃過 404，也可能讓分析數據變得混亂。Hash routing 的網址看起來沒有那麼漂亮，但能確保每個專案連結重新整理後都打得開。對作品集來說，可靠比網址優雅更重要。',
        },
    },
    {
        title: {
            en: 'How I handled reduced motion',
            zh: '我如何處理減少動態效果',
        },
        body: {
            en: 'I did not simply remove every animation. Some motion helps users understand what changed, while some motion is only decorative. In the reduced-motion version, decorative movement is removed, but small state changes remain visible. For example, ranking changes still happen, but without the sliding animation. This keeps the interface calmer without making it harder to follow.',
            zh: '我沒有把所有動畫直接關掉，因為有些動效是在幫助使用者理解畫面變化，有些則只是裝飾。減少動態效果開啟後，裝飾性的動效會被移除，但必要的狀態變化仍會被保留。例如排序仍會更新，只是不再滑動。這樣介面會更安靜，但不會讓人失去方向感。',
        },
    },
    {
        title: {
            en: 'Why the evidence modules use DOM and SVG',
            zh: '為什麼證據模組不用截圖',
        },
        body: {
            en: 'The six evidence modules are built with DOM and hand-written SVG instead of screenshots. This keeps the interface sharp at any screen size, allows the charts to follow the same design tokens, and makes the content easier to support with keyboard focus and screen readers. It took more time than exporting images, but the result is more flexible, lighter, and more accessible.',
            zh: '這六個證據模組使用 DOM 與手寫 SVG 製作，而不是直接放截圖。這樣在不同螢幕尺寸下都能保持清晰，圖表也能跟著同一套設計變數一起變化，並且更容易支援鍵盤操作與螢幕閱讀器。它比輸出圖片更花時間，但結果更輕、更彈性，也更符合無障礙設計。',
        },
    },
];

// ---- COPY -------------------------------------------------------------------
const COPY = {
    en: {
        eyebrow: 'MODULE 06 — SYSTEM SPECIMEN',
        title: 'Design System Slice & Engineering Notes',
        lead: [
            'This module shows the system behind the portfolio itself: the colors, type scale, component states, accessibility checks, and engineering decisions that make the work feel consistent and usable.',
            'Instead of treating the interface as decoration, this section explains how the visual language, interaction states, and technical choices support readability, accessibility, and long-term maintainability.',
        ],
        context: 'Color contrast is calculated against --bg-1 (#0C0E12) using the WCAG 2.1 formula. One supporting text token is intentionally marked for labels only, not body copy.',
        signature: 'Signature interaction: hover a color swatch to preview it, or click to copy its hex value.',
        sections: {
            tokens: 'A · DESIGN TOKENS',
            states: 'B · COMPONENT STATES',
            a11y: 'C · ACCESSIBILITY NOTES',
            eng: 'D · ENGINEERING NOTES',
        },
        tableHeaders: {
            swatch: '',
            token: 'Token',
            hex: 'Hex',
            usage: 'Usage',
            contrast: 'Contrast vs bg-1',
        },
        gradeNote: {
            AAA: '✓ AAA',
            AA: '✓ AA',
            'large-only': '△ labels / large text only',
        },
        copied: 'Copied',
        copyHint: 'Click to copy',
        typeLabel: 'TYPE SCALE',
        stateFields: {
            problem: 'Problem',
            approach: 'Approach',
            verify: 'Verified by',
        },
        gateSample: 'AI risk is manageable',
        gateStatus: 'Needs review — one legal check remains',
    },
    zh: {
        eyebrow: 'MODULE 06 — SYSTEM SPECIMEN',
        title: '設計系統切片與工程筆記',
        lead: [
            '這個模組展示作品集背後的系統：色彩、字級、元件狀態、無障礙檢查，以及讓整個網站維持一致與可用的工程取捨。',
            '它不是把介面當成裝飾，而是說明視覺語言、互動狀態與技術選擇如何一起支撐閱讀性、可及性與後續維護。',
        ],
        context: '色彩對比以 WCAG 2.1 公式，對 --bg-1（#0C0E12）實際計算。其中一個輔助文字色只適合標籤與大字，不建議用於長篇內文。',
        signature: '懸停色票可以預覽色碼，點擊即可複製 hex。',
        sections: {
            tokens: 'A · 設計變數',
            states: 'B · 元件狀態',
            a11y: 'C · 無障礙筆記',
            eng: 'D · 工程筆記',
        },
        tableHeaders: {
            swatch: '',
            token: '變數',
            hex: 'Hex',
            usage: '用途',
            contrast: '對 bg-1 的對比',
        },
        gradeNote: {
            AAA: '✓ AAA',
            AA: '✓ AA',
            'large-only': '△ 僅適合標籤或大字',
        },
        copied: '已複製',
        copyHint: '點擊複製',
        typeLabel: '字級系統',
        stateFields: {
            problem: '遇到的問題',
            approach: '處理方式',
            verify: '如何確認',
        },
        gateSample: 'AI 風險是否可控',
        gateStatus: '待確認——仍有一項法務檢查未完成',
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
                                        <span
                                            className="los-m6-skeleton"
                                            style={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: '50%',
                                                flexShrink: 0,
                                                marginTop: 3,
                                            }}
                                        />
                                        <span className="los-m6-gate-main">
                                            <span
                                                className="los-m6-skeleton"
                                                style={{ width: '72%', height: 10, display: 'block' }}
                                            />
                                            <span
                                                className="los-m6-skeleton"
                                                style={{ width: '48%', height: 8, display: 'block', marginTop: 6 }}
                                            />
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