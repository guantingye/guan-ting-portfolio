import React from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/ecoKit.jsx';
import { MODULES, GAPS } from './data/ecoContent.js';

const MOD = MODULES.find(m => m.key === 'E05');
const SEV_TONE = { high: 'eco-tag--red', mid: 'eco-tag--ink', low: 'eco-tag--teal' };

const WHY = {
    en: {
        g1: ['Tooling under-supplied vs a fab-heavy economy', 'few local EDA seed teams'],
        g2: ['Packaging is the next bottleneck after nodes', 'thin startup layer under large IDMs'],
        g3: ['Models exist; the ops layer to run them lags', 'scattered MLOps founders'],
        g4: ['Renewables outrun the storage to firm them', 'capital-heavy, few entrants'],
        g5: ['Discovery ahead of scale-up capacity', 'talent leaves for pharma abroad'],
        g6: ['Policy demand rising faster than supply', 'materials IP concentrated overseas'],
        g7: ['Deep tech dies at the commercialisation step', 'PhD founders lack GTM partners'],
    },
    zh: {
        g1: ['相對於以晶圓廠為主的經濟，工具供給不足', '本地 EDA 種子團隊稀少'],
        g2: ['封裝是製程節點之後的下一個瓶頸', '大型 IDM 之下新創層單薄'],
        g3: ['模型已具備，運行它們的維運層落後', 'MLOps 創辦人分散'],
        g4: ['再生能源的成長超越可穩定它的儲能', '資本密集、進入者少'],
        g5: ['發現領先於放大產能', '人才外流至海外藥廠'],
        g6: ['政策需求成長快過供給', '材料 IP 集中於海外'],
        g7: ['深科技死在商化這一步', '博士創辦人缺乏 GTM 夥伴'],
    },
};

const COPY = {
    en: {
        title: 'Gap analysis',
        lead: 'Where the chain is thin, stated with a reason and a signal rather than a hunch.',
        soWhat: 'Where Taiwan’s chain is thin, stated with evidence, not opinion.',
        cols: ['Gap', 'Severity', 'Why it matters', 'Signal in the data'],
        sev: { high: 'high', mid: 'mid', low: 'low' },
        caption: 'Seven value-chain gaps read from coverage, funding density, and hiring signals.',
    },
    zh: {
        title: '缺口分析',
        lead: '價值鏈哪裡單薄，附上理由與訊號，而非直覺。',
        soWhat: '台灣價值鏈哪裡單薄，以證據而非意見陳述。',
        cols: ['缺口', '嚴重度', '為何重要', '資料中的訊號'],
        sev: { high: '高', mid: '中', low: '低' },
        caption: '七個價值鏈缺口，讀自覆蓋度、資金密度與招募訊號。',
    },
};

export default function E05_GapAnalysis() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    const why = WHY[lang] ?? WHY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <figure style={{ margin: 0 }}>
                <div className="eco-table-wrap">
                    <table className="eco-table eco-table--gap">
                        <thead><tr>{c.cols.map(h => <th key={h}>{h}</th>)}</tr></thead>
                        <tbody>
                            {GAPS.map(g => (
                                <tr key={g.id}>
                                    <td data-label={c.cols[0]} className="eco-table-lead">{g[lang]}</td>
                                    <td data-label={c.cols[1]}><span className={`eco-tag ${SEV_TONE[g.sev]}`}>{c.sev[g.sev]}</span></td>
                                    <td data-label={c.cols[2]}>{why[g.id][0]}</td>
                                    <td data-label={c.cols[3]}>{why[g.id][1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Caption kind="Table" n={1}>{c.caption}</Caption>
            </figure>
        </SectionModule>
    );
}

injectStyles('eco-e5', `
.eco-table--gap tbody td:nth-child(4) { font-family: var(--eco-font-data); font-size: 12px; color: var(--eco-text-3); }
`);
