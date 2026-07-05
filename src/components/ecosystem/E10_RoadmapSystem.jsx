import React from 'react';
import SectionModule, { useI18n, Caption, injectStyles } from './shared/ecoKit.jsx';
import { MODULES, PLATFORM_SLUG, DATAROOM_SLUG } from './data/ecoContent.js';

const MOD = MODULES.find(m => m.key === 'E10');
const TONE = { data: 'var(--eco-sky)', atlas: 'var(--eco-ink)', platform: 'var(--eco-teal)' };

const COPY = {
    en: {
        title: 'Roadmap, limits & the system it sits in',
        lead: 'What is real today, what is proposed, and where this atlas fits between two sibling systems.',
        soWhat: 'I know which parts ship today and which are a costed next step.',
        limTitle: 'Limitations',
        lims: [
            'The B2B layer — investment flow, patent ledger, RAG — is proposed; the data foundation is the shipped part.',
            'Company-level records stay private; this page shows the operating model, not the rows.',
            'The RAG console answers a fixed demo set, not live records.',
            'Curation is single-analyst; refresh runs monthly, so fast-moving rounds lag.',
        ],
        roadTitle: 'Roadmap',
        roads: [
            ['Ground RAG on live records', 'Gate: record-display licensing and consent in place.'],
            ['Wire a real patent / grant API', 'Gate: a paying pilot that needs the depth.'],
            ['Automate the monthly refresh', 'Gate: selector-stability checks stay green.'],
            ['Open a partner query API', 'Gate: one design partner committed.'],
        ],
        gate: 'GATE',
        mapTitle: 'Where this sits',
        nodes: [
            { id: 'data', label: 'Data Room', sub: 'acquire & structure · project 02', tone: 'data', link: DATAROOM_SLUG },
            { id: 'atlas', label: 'Ecosystem Atlas', sub: 'map · analyze · query', tone: 'atlas', self: true },
            { id: 'platform', label: 'Intelligence Platform', sub: 'live delivery · project 07', tone: 'platform', link: PLATFORM_SLUG },
        ],
        edge: 'feeds',
        seeProj: n => `See project ${n} →`,
        reflection: 'A map earns its keep when someone makes a different decision because of it. The hard part was never the crawler; it was turning scattered public signals into a picture an analyst, an investor, and a policymaker could each read from their own angle — and then let them ask it a question.',
        caption: 'Data Room acquires, the Atlas maps and reasons, the Platform delivers.',
    },
    zh: {
        title: '路線圖、限制，與它所處的系統',
        lead: '今天什麼是真的、什麼是提案，以及這張地圖集在兩個姊妹系統之間的位置。',
        soWhat: '我清楚哪些部分今天就上線，哪些是算過成本的下一步。',
        limTitle: '限制',
        lims: [
            'B2B 層——投資流向、專利帳、RAG——為提案；資料基礎才是已交付的部分。',
            '公司級紀錄維持不公開；本頁呈現運作模式，而非逐列資料。',
            'RAG 查詢台回答固定示範集，非即時紀錄。',
            '策展為單一分析師；更新為每月，因此快速的募資動態會落後。',
        ],
        roadTitle: '路線圖',
        roads: [
            ['讓 RAG 以即時紀錄為依據', '門檻：紀錄顯示的授權與同意就位。'],
            ['接上真實專利／補助 API', '門檻：一個需要此深度的付費試點。'],
            ['自動化每月更新', '門檻：selector 穩定性檢查維持綠燈。'],
            ['開放夥伴查詢 API', '門檻：一個設計夥伴確認投入。'],
        ],
        gate: '門檻',
        mapTitle: '它的位置',
        nodes: [
            { id: 'data', label: '資料工作室', sub: '擷取與結構化 · 專案 02', tone: 'data', link: DATAROOM_SLUG },
            { id: 'atlas', label: '生態系地圖集', sub: '製圖 · 分析 · 查詢', tone: 'atlas', self: true },
            { id: 'platform', label: '商情平台', sub: '即時交付 · 專案 07', tone: 'platform', link: PLATFORM_SLUG },
        ],
        edge: '餵入',
        seeProj: n => `見專案 ${n} →`,
        reflection: '一張地圖真正有價值，是當有人因為它而做出不同的決策。難的從來不是爬蟲，而是把分散的公開訊號，變成分析師、投資人與政策制定者各自都能從自己角度讀懂的一張圖——然後讓他們能向它提問。',
        caption: '資料工作室擷取、地圖集製圖與推理、平台交付。',
    },
};

export default function E10_RoadmapSystem() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <SectionModule mod={MOD} sectionNo={MOD.no} title={c.title} lead={c.lead} soWhat={c.soWhat}>
            <div className="eco-rl">
                <div>
                    <span className="eco-b2b-k">{c.limTitle}</span>
                    <ul className="eco-rl-lims">{c.lims.map((x, i) => <li key={i}>{x}</li>)}</ul>
                </div>
                <div>
                    <span className="eco-b2b-k">{c.roadTitle}</span>
                    <ul className="eco-rl-roads">
                        {c.roads.map(([h, g], i) => (
                            <li key={i}><strong>{h}</strong><span><span className="eco-tag eco-tag--ink">{c.gate}</span>{g.replace(/^Gate: |^門檻：/, '')}</span></li>
                        ))}
                    </ul>
                </div>
            </div>

            <figure style={{ margin: '24px 0 0' }}>
                <span className="eco-b2b-k">{c.mapTitle}</span>
                <div className="eco-sysmap" role="img" aria-label={c.caption}>
                    {c.nodes.map((n, i) => (
                        <React.Fragment key={n.id}>
                            <div className={`eco-sysnode${n.self ? ' is-self' : ''}`} style={{ '--n': TONE[n.tone] }}>
                                <strong>{n.label}</strong>
                                <span>{n.sub}</span>
                                {n.link && <a href={`#/project/${n.link}`} className="eco-sysnode-link">{c.seeProj(n.link === DATAROOM_SLUG ? '02' : '07')}</a>}
                            </div>
                            {i < c.nodes.length - 1 && <div className="eco-sysedge" aria-hidden="true"><span>{c.edge}</span><i /></div>}
                        </React.Fragment>
                    ))}
                </div>
                <Caption kind="Plate" n={7}>{c.caption}</Caption>
            </figure>

            <blockquote className="eco-reflection">{c.reflection}</blockquote>
        </SectionModule>
    );
}

injectStyles('eco-e10', `
.eco-rl { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.eco-rl-lims { list-style: none; margin: 0; padding: 0; }
.eco-rl-lims li { position: relative; padding: 0 0 10px 20px; font-size: 13.5px; line-height: 1.55; color: var(--eco-text-2); }
.eco-rl-lims li::before { content: '—'; position: absolute; left: 0; color: var(--eco-red); }
.eco-rl-roads { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.eco-rl-roads li { padding: 12px 14px; border: 1px solid var(--eco-line-1); border-radius: var(--eco-r-sm); background: var(--eco-bg-2); }
.eco-rl-roads strong { display: block; color: var(--eco-text-1); font-size: 13.5px; margin-bottom: 5px; }
.eco-rl-roads span { font-size: 12.5px; line-height: 1.5; color: var(--eco-text-3); }
.eco-rl-roads .eco-tag { margin-right: 8px; }
.eco-sysmap { display: flex; align-items: stretch; flex-wrap: wrap; margin-top: 10px; }
.eco-sysnode { flex: 1; min-width: 150px; padding: 16px; border: 1px solid var(--eco-line-1); border-top: 2px solid var(--n); border-radius: var(--eco-r-md); background: var(--eco-bg-2); }
.eco-sysnode.is-self { background: var(--eco-ink-dim); }
.eco-sysnode strong { display: block; font-family: var(--eco-font-display); font-size: 17px; color: var(--eco-text-1); }
.eco-sysnode span { display: block; font-size: 12px; color: var(--eco-text-3); margin-top: 4px; }
.eco-sysnode-link { display: inline-block; margin-top: 8px; font-family: var(--eco-font-data); font-size: 11px; color: var(--eco-sky); text-decoration: none; }
.eco-sysnode-link:hover { text-decoration: underline; }
.eco-sysedge { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 0 12px; }
.eco-sysedge span { font-family: var(--eco-font-data); font-size: 9.5px; letter-spacing: 0.06em; color: var(--eco-text-3); }
.eco-sysedge i { width: 30px; height: 2px; background: var(--eco-line-2); position: relative; }
.eco-sysedge i::after { content: ''; position: absolute; right: -1px; top: -3px; border-left: 6px solid var(--eco-line-2); border-top: 4px solid transparent; border-bottom: 4px solid transparent; }
.eco-reflection { margin: 24px 0 0; padding: 18px 22px; border-left: 3px solid var(--eco-ink); background: var(--eco-bg-2); border-radius: 0 var(--eco-r-md) var(--eco-r-md) 0; font-family: var(--eco-font-display); font-size: 17px; font-style: italic; line-height: 1.6; color: var(--eco-text-1); }
@media (max-width: 720px) { .eco-rl { grid-template-columns: 1fr; } .eco-sysmap { flex-direction: column; } .eco-sysedge { flex-direction: row; padding: 8px 0; } .eco-sysedge i { width: 2px; height: 18px; } .eco-sysedge i::after { right: -3px; top: auto; bottom: -1px; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 6px solid var(--eco-line-2); border-bottom: none; } }
`);
