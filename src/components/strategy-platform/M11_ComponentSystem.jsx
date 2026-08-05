import React from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/ispKit.jsx';
import { MODULES } from './data/strategyPlatformContent.js';

const MOD = MODULES.find(m => m.key === 'M11');

const COPY = {
    en: {
        title: 'Component & interaction-state system',
        lead: 'Five core components support the three primary product routes. Their value is not whether their form is unusual, but that each defines the states, feedback, and recognition rules needed for real use.',
        specimens: [
            { id: 'marker', name: 'Hub marker', states: ['idle', 'selected'], note: 'The outer ring signals an explorable point; the filled center marks the current selection. Even at globe scale, users can distinguish the state without relying on a text label.' },
            { id: 'row', name: 'Expandable table row', states: ['collapsed', 'expanded'], note: 'Details expand directly below the source row, preserving the reader’s position and comparison context in the table without sending them to another page.' },
            { id: 'chip', name: 'Sector filter chip', states: ['inactive', 'active'], note: 'An accent outline and text treatment distinguish active from inactive, avoiding extra fills, shadows, or motion that would disrupt dense filtering.' },
            { id: 'lang', name: 'Language toggle', states: ['EN', '中文'], note: 'The two languages appear side by side rather than inside a dropdown, so the current language and available alternative remain visible together.' },
            { id: 'nav', name: 'Floating nav', states: ['idle', 'hover'], note: 'The three primary entries stay fixed across Home, Insights, and Startups, so users can change reading modes without returning home to find navigation again.' },
        ],
        soWhat: 'The strength of a small design system is not its component count, but that every state has a clear purpose, can be recognized, and can be reused consistently across routes.',
    },
    zh: {
        title: '元件與互動狀態系統',
        lead: '五類核心元件支撐三條主要產品路徑。它們的價值不在造型是否特殊，而在於每個元件都定義了足以支撐實際使用的狀態、回饋與辨識規則。',
        specimens: [
            { id: 'marker', name: 'Hub marker', states: ['未選取', '已選取'], note: '外環表示可探索，實心中心表示目前選取。即使縮放到地球儀尺度，使用者仍能在不依賴文字標籤的情況下辨識狀態。' },
            { id: 'row', name: '可展開表格列', states: ['收合', '展開'], note: '詳細內容直接展開於原資料列下方，保留使用者在表格中的位置與比較脈絡，不必跳轉至另一個頁面。' },
            { id: 'chip', name: '產業篩選 chip', states: ['未啟用', '已啟用'], note: '以強調色描邊與文字狀態區分是否啟用，避免額外填色、陰影或動畫干擾高密度篩選。' },
            { id: 'lang', name: '語言切換', states: ['EN', '中文'], note: '兩種語言以並列切換呈現，不藏入下拉選單，讓目前語言與可切換選項始終同時可見。' },
            { id: 'nav', name: '浮動導覽', states: ['未觸碰', 'hover'], note: '三個主要入口固定出現在 Home、Insights 與 Startups，讓使用者在不同閱讀模式切換時，不必先返回首頁重新尋找導覽。' },
        ],
        soWhat: '小型設計系統的力量不在元件數量，而在每個狀態都有明確用途、可以被辨識，也能在不同路徑中一致地重複使用。',
    },
};

function MiniMarker({ on }) {
    return (
        <span className={`isp-m11-marker${on ? ' is-on' : ''}`} aria-hidden="true">
            {on && <span className="isp-m11-marker-ring" />}
            <span className="isp-m11-marker-dot" />
        </span>
    );
}
function MiniRow({ on }) {
    return (
        <span className={`isp-m11-row${on ? ' is-on' : ''}`} aria-hidden="true">
            <span className="isp-m11-row-bar" />
            <span className="isp-m11-row-chev">{on ? '▾' : '▸'}</span>
        </span>
    );
}
function MiniChip({ on }) {
    return <span className={`isp-m11-chip${on ? ' is-on' : ''}`} aria-hidden="true">sector</span>;
}
function MiniLang({ label, on }) {
    return <span className={`isp-m11-lang${on ? ' is-on' : ''}`} aria-hidden="true">{label}</span>;
}
function MiniNav({ hover }) {
    return (
        <span className={`isp-m11-nav${hover ? ' is-hover' : ''}`} aria-hidden="true">
            <span /><span /><span />
        </span>
    );
}

const RENDER = {
    marker: i => <MiniMarker on={i === 1} />,
    row: i => <MiniRow on={i === 1} />,
    chip: i => <MiniChip on={i === 1} />,
    lang: (i, states) => <MiniLang label={states[i]} on={i === 0} />,
    nav: i => <MiniNav hover={i === 1} />,
};

export default function M11_ComponentSystem() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="isp-m11-grid">
                {t.specimens.map(s => (
                    <div className="isp-m11-card" key={s.id}>
                        <strong>{s.name}</strong>
                        <div className="isp-m11-states">
                            {s.states.map((label, i) => (
                                <div className="isp-m11-state" key={label}>
                                    <span className="isp-m11-preview">{RENDER[s.id](i, s.states)}</span>
                                    <span className="isp-m11-state-label">{label}</span>
                                </div>
                            ))}
                        </div>
                        <p>{s.note}</p>
                    </div>
                ))}
            </div>
        </ModuleFrame>
    );
}

injectStyles('isp-m11-style', `
.isp-m11-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
.isp-m11-card { padding: 16px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-md); }
.isp-m11-card strong { display: block; font-size: 13px; color: var(--isp-text-1); margin-bottom: 12px; }
.isp-m11-states { display: flex; gap: 18px; margin-bottom: 12px; }
.isp-m11-state { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.isp-m11-preview { display: flex; align-items: center; justify-content: center; width: 56px; height: 40px; background: var(--isp-bg-0); border: 1px solid var(--isp-line-1); border-radius: var(--isp-r-sm); }
.isp-m11-state-label { font-family: var(--isp-font-data); font-size: 10px; color: var(--isp-text-3); }
.isp-m11-card p { margin: 0; font-size: 12px; line-height: 1.55; color: var(--isp-text-3); }

.isp-m11-marker { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; }
.isp-m11-marker-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--isp-text-2); }
.isp-m11-marker.is-on .isp-m11-marker-dot { background: var(--isp-teal); }
.isp-m11-marker-ring { position: absolute; inset: 0; border: 1.5px solid var(--isp-teal); border-radius: 50%; opacity: 0.5; }

.isp-m11-row { display: flex; align-items: center; gap: 6px; width: 40px; }
.isp-m11-row-bar { flex: 1; height: 5px; background: var(--isp-line-2); border-radius: 2px; }
.isp-m11-row.is-on .isp-m11-row-bar { background: var(--isp-teal); }
.isp-m11-row-chev { font-size: 9px; color: var(--isp-text-3); }

.isp-m11-chip { font-family: var(--isp-font-data); font-size: 9.5px; padding: 3px 8px; border-radius: 999px; border: 1px solid var(--isp-line-2); color: var(--isp-text-3); }
.isp-m11-chip.is-on { border-color: var(--isp-teal); color: var(--isp-teal); }

.isp-m11-lang { font-family: var(--isp-font-data); font-size: 10px; padding: 3px 9px; border-radius: 999px; color: var(--isp-text-3); }
.isp-m11-lang.is-on { color: var(--isp-bg-0); background: var(--isp-teal); }

.isp-m11-nav { display: flex; gap: 5px; padding: 5px 8px; border-radius: 999px; background: var(--isp-bg-2); border: 1px solid var(--isp-line-2); }
.isp-m11-nav span { width: 6px; height: 6px; border-radius: 2px; background: var(--isp-text-3); }
.isp-m11-nav.is-hover { border-color: var(--isp-teal); }
.isp-m11-nav.is-hover span:nth-child(2) { background: var(--isp-teal); }
`);
