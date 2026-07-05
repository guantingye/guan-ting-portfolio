import React from 'react';
import SectionModule, { useI18n, Caption, LegendKey, injectStyles } from './shared/ecoKit.jsx';
import { MODULES, SECTORS } from './data/ecoContent.js';

const MOD = MODULES.find(m => m.key === 'E06');

// Reconstructed capital composition per sector (gov / vc-cvc / corporate), and
// a relative funding index — illustrative, to show the flow's shape.
const FLOW = {
    ic:    { gov: 25, vc: 30, corp: 45, index: 92 },
    ai:    { gov: 20, vc: 55, corp: 25, index: 100 },
    bio:   { gov: 45, vc: 40, corp: 15, index: 61 },
    clean: { gov: 55, vc: 30, corp: 15, index: 48 },
    mfg:   { gov: 35, vc: 25, corp: 40, index: 66 },
    enab:  { gov: 50, vc: 35, corp: 15, index: 29 },
};
const SRC = [
    { id: 'gov', color: 'var(--eco-ink)' },
    { id: 'vc', color: 'var(--eco-sky)' },
    { id: 'corp', color: 'var(--eco-teal)' },
];

const COPY = {
    en: {
        title: 'Investment flow',
        lead: 'Where capital comes from, sector by sector — government, venture, and corporate.',
        soWhat: 'Capital direction is legible per sector, not just in aggregate.',
        src: { gov: 'Gov grants', vc: 'VC / CVC', corp: 'Corporate' },
        indexLabel: 'Funding index',
        caption: 'Capital composition and relative funding weight across the six sectors.',
    },
    zh: {
        title: '投資流向',
        lead: '資金從哪裡來，逐產業拆解——政府、創投與企業。',
        soWhat: '資金流向可逐產業判讀，而非只有總量。',
        src: { gov: '政府補助', vc: '創投 / 企業創投', corp: '企業' },
        indexLabel: '資金指數',
        caption: '六個產業的資金組成與相對資金權重。',
    },
};

export default function E06_InvestmentFlow() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <figure style={{ margin: 0 }}>
                <ul className="eco-flow" role="img" aria-label={c.caption}>
                    {SECTORS.map(s => {
                        const f = FLOW[s.id];
                        return (
                            <li key={s.id} className="eco-flow-row">
                                <span className="eco-flow-name">{s[lang]}</span>
                                <span className="eco-flow-bar">
                                    {SRC.map(src => f[src.id] > 0 && (
                                        <span key={src.id} className="eco-flow-seg" style={{ width: `${f[src.id]}%`, background: src.color }}
                                            title={`${c.src[src.id]} ${f[src.id]}%`} />
                                    ))}
                                </span>
                                <span className="eco-flow-index" style={{ '--w': `${f.index}%` }}>
                                    <span className="eco-flow-index-fill" />
                                    <span className="eco-flow-index-n">{f.index}</span>
                                </span>
                            </li>
                        );
                    })}
                </ul>
                <div className="eco-flow-foot">
                    <LegendKey items={SRC.map(s => ({ label: c.src[s.id], color: s.color }))} />
                    <span className="eco-flow-idxlabel">{c.indexLabel} →</span>
                </div>
                <Caption kind="Plate" n={5}>{c.caption}</Caption>
            </figure>
        </SectionModule>
    );
}

injectStyles('eco-e6', `
.eco-flow { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.eco-flow-row { display: grid; grid-template-columns: 140px 1fr 96px; gap: 12px; align-items: center; }
.eco-flow-name { font-size: 13px; color: var(--eco-text-1); }
.eco-flow-bar { display: flex; height: 16px; border-radius: 4px; overflow: hidden; background: var(--eco-bg-0); }
.eco-flow-seg { height: 100%; }
.eco-flow-index { position: relative; height: 16px; background: var(--eco-bg-0); border-radius: 4px; overflow: hidden; display: flex; align-items: center; }
.eco-flow-index-fill { position: absolute; left: 0; top: 0; bottom: 0; width: var(--w); background: color-mix(in srgb, var(--eco-iris) 45%, transparent); }
.eco-flow-index-n { position: relative; font-family: var(--eco-font-data); font-size: 11px; color: var(--eco-text-1); padding-left: 8px; }
.eco-flow-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 12px; }
.eco-flow-idxlabel { font-family: var(--eco-font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--eco-iris); }
@media (max-width: 620px) { .eco-flow-row { grid-template-columns: 100px 1fr 64px; gap: 8px; } }
`);
