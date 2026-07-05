import React, { useState } from 'react';
import SectionModule, { useI18n, Caption, LegendKey, injectStyles } from './shared/ecoKit.jsx';
import { MODULES, SECTORS } from './data/ecoContent.js';

const MOD = MODULES.find(m => m.key === 'E03');
const GAP_COLOR = { low: 'var(--eco-teal)', mid: 'var(--eco-ink)', high: 'var(--eco-red)' };
const total = SECTORS.reduce((s, x) => s + x.count, 0);

const COPY = {
    en: {
        title: 'Industry coverage atlas',
        lead: 'The whole ecosystem as one navigable picture. Select a territory to read it.',
        soWhat: 'The ecosystem is one navigable picture, not a spreadsheet.',
        legend: [
            { label: 'Low gap', color: 'var(--eco-teal)' },
            { label: 'Mid gap', color: 'var(--eco-ink)' },
            { label: 'High gap', color: 'var(--eco-red)' },
        ],
        pick: 'Select a sector',
        companies: 'companies',
        share: 'of mapped set',
        funding: 'Funding density',
        gap: 'Chain gap',
        levels: { high: 'high', mid: 'moderate', low: 'low' },
        caption: 'Six sectors sized by company count, coloured by value-chain gap severity.',
    },
    zh: {
        title: '產業覆蓋地圖',
        lead: '整個生態系收攏成一張可導覽的圖。點選一塊領域來讀它。',
        soWhat: '生態系是一張可導覽的圖，而不是一份試算表。',
        legend: [
            { label: '缺口低', color: 'var(--eco-teal)' },
            { label: '缺口中', color: 'var(--eco-ink)' },
            { label: '缺口高', color: 'var(--eco-red)' },
        ],
        pick: '點選一個產業',
        companies: '家公司',
        share: '佔已測繪集',
        funding: '資金密度',
        gap: '價值鏈缺口',
        levels: { high: '高', mid: '中', low: '低' },
        caption: '六個產業，大小依公司數，顏色依價值鏈缺口嚴重度。',
    },
};

export default function E03_SectorAtlas() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const [sel, setSel] = useState(SECTORS[1].id);
    const cur = SECTORS.find(s => s.id === sel);
    const size = n => 40 + (n / 62) * 44;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="eco-atlas">
                <div className="eco-atlas-field" role="group" aria-label={c.pick}>
                    {SECTORS.map(s => (
                        <button key={s.id} className={`eco-node${sel === s.id ? ' is-sel' : ''}`}
                            style={{ left: `${s.x}%`, top: `${s.y}%`, width: size(s.count), height: size(s.count), '--eco-node': GAP_COLOR[s.gap] }}
                            aria-pressed={sel === s.id} onClick={() => setSel(s.id)}
                            title={`${s[lang]} · ${s.count}`}>
                            <span className="eco-node-count">{s.count}</span>
                        </button>
                    ))}
                </div>
                <aside className="eco-atlas-read" aria-live="polite">
                    <span className="eco-atlas-read-eyebrow">{cur[lang]}</span>
                    <div className="eco-atlas-stat"><strong>{cur.count}</strong><span>{c.companies}</span></div>
                    <div className="eco-atlas-bar" aria-hidden="true"><span style={{ width: `${(cur.count / 62) * 100}%`, background: GAP_COLOR[cur.gap] }} /></div>
                    <div className="eco-atlas-meta">
                        <div><span>{c.share}</span><strong>{Math.round((cur.count / total) * 100)}%</strong></div>
                        <div><span>{c.funding}</span><strong>{c.levels[cur.funding]}</strong></div>
                        <div><span>{c.gap}</span><strong style={{ color: GAP_COLOR[cur.gap] }}>{c.levels[cur.gap]}</strong></div>
                    </div>
                </aside>
            </div>
            <LegendKey items={c.legend} />
            <Caption kind="Plate" n={3}>{c.caption}</Caption>
        </SectionModule>
    );
}

injectStyles('eco-e3', `
.eco-atlas { display: grid; grid-template-columns: 1.4fr 1fr; gap: 18px; }
.eco-atlas-field { position: relative; min-height: 300px; border: 1px solid var(--eco-line-2); border-radius: var(--eco-r-md); background:
  linear-gradient(var(--eco-line-1) 1px, transparent 1px) 0 0 / 100% 40px,
  linear-gradient(90deg, var(--eco-line-1) 1px, transparent 1px) 0 0 / 40px 100%,
  var(--eco-bg-2); }
.eco-node { position: absolute; transform: translate(-50%, -50%); border-radius: 50%; border: 1.5px solid var(--eco-node); background: color-mix(in srgb, var(--eco-node) 14%, transparent); display: flex; align-items: center; justify-content: center; transition: transform 160ms var(--eco-ease), box-shadow 160ms var(--eco-ease); }
.eco-node:hover { transform: translate(-50%, -50%) scale(1.06); }
.eco-node.is-sel { box-shadow: 0 0 0 3px color-mix(in srgb, var(--eco-node) 30%, transparent); background: color-mix(in srgb, var(--eco-node) 26%, transparent); }
.eco-node-count { font-family: var(--eco-font-data); font-size: 13px; color: var(--eco-text-1); }
.eco-atlas-read { padding: 18px; border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-md); background: var(--eco-bg-2); }
.eco-atlas-read-eyebrow { font-family: var(--eco-font-display); font-size: 18px; color: var(--eco-text-1); }
.eco-atlas-stat { display: flex; align-items: baseline; gap: 8px; margin: 12px 0 8px; }
.eco-atlas-stat strong { font-family: var(--eco-font-data); font-size: 34px; color: var(--eco-ink); }
.eco-atlas-stat span { font-size: 12.5px; color: var(--eco-text-3); }
.eco-atlas-bar { height: 8px; border-radius: 4px; background: var(--eco-bg-0); overflow: hidden; }
.eco-atlas-bar span { display: block; height: 100%; }
.eco-atlas-meta { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
.eco-atlas-meta div { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dotted var(--eco-line-1); padding-bottom: 6px; }
.eco-atlas-meta span { font-size: 12.5px; color: var(--eco-text-3); }
.eco-atlas-meta strong { font-family: var(--eco-font-data); font-size: 13px; color: var(--eco-text-1); text-transform: capitalize; }
@media (max-width: 767px) { .eco-atlas { grid-template-columns: 1fr; } }
`);
