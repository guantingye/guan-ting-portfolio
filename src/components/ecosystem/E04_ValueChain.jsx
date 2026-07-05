import React from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/ecoKit.jsx';
import { MODULES } from './data/ecoContent.js';

const MOD = MODULES.find(m => m.key === 'E04');

const STAGES = [
    { id: 'mat', count: 22, en: 'Materials & substrates', zh: '材料與基板', thin: true },
    { id: 'chip', count: 45, en: 'Chips & components', zh: '晶片與元件', thin: false },
    { id: 'dev', count: 41, en: 'Devices & systems', zh: '裝置與系統', thin: false },
    { id: 'ai', count: 62, en: 'AI & software', zh: 'AI 與軟體', thin: false },
    { id: 'app', count: 45, en: 'Applications & services', zh: '應用與服務', thin: false },
    { id: 'enab', count: 18, en: 'Enablers & tooling', zh: '賦能與工具', thin: true },
];
const maxC = Math.max(...STAGES.map(s => s.count));

const COPY = {
    en: {
        title: 'Value-chain transect',
        lead: 'The same 233 companies re-cut upstream-to-downstream. Thin stages preview the gaps in C.1.',
        soWhat: 'Where the chain is thick or thin is visible before a word of analysis.',
        upstream: 'Upstream', downstream: 'Downstream',
        thin: 'thin', thick: 'covered',
        caption: 'Company count by value-chain stage; two thin ends bracket a dense middle.',
    },
    zh: {
        title: '價值鏈剖面',
        lead: '同樣的 233 家公司，由上游到下游重新切分。單薄的階段預告 C.1 的缺口。',
        soWhat: '價值鏈哪裡厚、哪裡薄，在任何分析文字之前就看得見。',
        upstream: '上游', downstream: '下游',
        thin: '單薄', thick: '覆蓋',
        caption: '各價值鏈階段的公司數；兩個單薄的端點夾住密集的中段。',
    },
};

export default function E04_ValueChain() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="eco-vc-axis"><span>{c.upstream}</span><span className="eco-vc-axis-line" aria-hidden="true" /><span>{c.downstream}</span></div>
            <figure style={{ margin: '10px 0 0' }}>
                <ol className="eco-vc">
                    {STAGES.map(s => (
                        <li key={s.id} className={`eco-vc-stage${s.thin ? ' is-thin' : ''}`}>
                            <div className="eco-vc-bar-wrap">
                                <span className="eco-vc-bar" style={{ height: `${(s.count / maxC) * 100}%` }} />
                            </div>
                            <span className="eco-vc-count">{s.count}</span>
                            <span className="eco-vc-name">{s[lang]}</span>
                            <span className={`eco-tag ${s.thin ? 'eco-tag--red' : 'eco-tag--teal'}`}>{s.thin ? c.thin : c.thick}</span>
                        </li>
                    ))}
                </ol>
                <Caption kind="Plate" n={4}>{c.caption}</Caption>
            </figure>
        </SectionModule>
    );
}

injectStyles('eco-e4', `
.eco-vc-axis { display: flex; align-items: center; gap: 10px; font-family: var(--eco-font-data); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--eco-text-3); }
.eco-vc-axis-line { flex: 1; height: 1px; background: repeating-linear-gradient(90deg, var(--eco-line-2) 0 5px, transparent 5px 10px); }
.eco-vc { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; align-items: end; }
.eco-vc-stage { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 10px 6px; border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-sm); background: var(--eco-bg-2); }
.eco-vc-stage.is-thin { border-color: var(--eco-red); }
.eco-vc-bar-wrap { height: 96px; width: 26px; display: flex; align-items: flex-end; background: var(--eco-bg-0); border-radius: 4px; overflow: hidden; }
.eco-vc-bar { width: 100%; background: var(--eco-teal); }
.eco-vc-stage.is-thin .eco-vc-bar { background: var(--eco-red); }
.eco-vc-count { font-family: var(--eco-font-data); font-size: 15px; color: var(--eco-text-1); }
.eco-vc-name { font-size: 11.5px; text-align: center; color: var(--eco-text-2); line-height: 1.35; min-height: 2.7em; }
@media (max-width: 767px) { .eco-vc { grid-template-columns: repeat(3, 1fr); } }
`);
