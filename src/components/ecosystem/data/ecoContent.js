// Taiwan Startup Ecosystem Atlas — structure, registry, shell copy, domain data.
// Real foundation: the ITRI/ISTI ecosystem-mapping work (230+ companies, 40+
// dimensions, bilingual taxonomy, gap analysis). Proposed layer: the B2B
// intelligence think-tank + RAG query surface (labelled SIMULATED honestly).

export const PLATFORM_SLUG = 'startup-intelligence-platform'; // project 07
export const DATAROOM_SLUG = 'deeptech-database';             // project 02

export const SECTIONS = [
    { id: 'a', tag: 'SHEET A', name: 'ACQUIRE', full: { en: 'Acquire', zh: '擷取' } },
    { id: 'b', tag: 'SHEET B', name: 'MAP',     full: { en: 'Map',     zh: '製圖' } },
    { id: 'c', tag: 'SHEET C', name: 'ANALYZE', full: { en: 'Analyze', zh: '分析' } },
    { id: 'd', tag: 'SHEET D', name: 'DELIVER', full: { en: 'Deliver', zh: '交付' } },
];

export const MODULES = [
    { id: 'eco-e1',  key: 'E01', num: 'E1',  no: 'A.1', section: 'a', badge: 'real',          roles: ['DE', 'TPM'], coord: '25.0°N 121.5°E' },
    { id: 'eco-e2',  key: 'E02', num: 'E2',  no: 'A.2', section: 'a', badge: 'real',          roles: ['DE', 'DA'] },
    { id: 'eco-e3',  key: 'E03', num: 'E3',  no: 'B.1', section: 'b', badge: 'real',          roles: ['DA', 'STR'], signature: true },
    { id: 'eco-e4',  key: 'E04', num: 'E4',  no: 'B.2', section: 'b', badge: 'real',          roles: ['STR', 'DA'] },
    { id: 'eco-e5',  key: 'E05', num: 'E5',  no: 'C.1', section: 'c', badge: 'real',          roles: ['STR', 'TPM'] },
    { id: 'eco-e6',  key: 'E06', num: 'E6',  no: 'C.2', section: 'c', badge: 'reconstructed', roles: ['DA', 'STR'] },
    { id: 'eco-e7',  key: 'E07', num: 'E7',  no: 'C.3', section: 'c', badge: 'reconstructed', roles: ['DA', 'STR'] },
    { id: 'eco-e8',  key: 'E08', num: 'E8',  no: 'D.1', section: 'd', badge: 'reconstructed', roles: ['AIPD', 'TPM'] },
    { id: 'eco-e9',  key: 'E09', num: 'E9',  no: 'D.2', section: 'd', badge: 'simulated',     roles: ['AIPD', 'FE'], signature: true },
    { id: 'eco-e10', key: 'E10', num: 'E10', no: 'D.3', section: 'd', badge: 'real',          roles: ['TPM', 'STR'] },
];

// Real sector coverage (counts from the shipped value-chain breakdown; total 233).
export const SECTORS = [
    { id: 'ic',    en: 'Semiconductor / IC design', zh: '半導體 / IC 設計', count: 45, x: 22, y: 30, funding: 'high',   gap: 'low' },
    { id: 'ai',    en: 'AI / machine learning',     zh: 'AI / 機器學習',    count: 62, x: 50, y: 22, funding: 'high',   gap: 'mid' },
    { id: 'bio',   en: 'Biotech / medtech',         zh: '生技 / 醫材',      count: 38, x: 72, y: 40, funding: 'mid',    gap: 'high' },
    { id: 'clean', en: 'Cleantech / energy',        zh: '潔淨科技 / 能源',  count: 29, x: 34, y: 62, funding: 'mid',    gap: 'high' },
    { id: 'mfg',   en: 'Advanced manufacturing',    zh: '先進製造',         count: 41, x: 62, y: 66, funding: 'mid',    gap: 'mid' },
    { id: 'enab',  en: 'Deep-tech enablers',        zh: '深科技賦能層',     count: 18, x: 82, y: 74, funding: 'low',    gap: 'high' },
];

export const SOURCES = [
    { id: 's1', name: '104 人力銀行', kind: 'talent',   en: 'Headcount, roles, hiring velocity' },
    { id: 's2', name: '公開資訊觀測站 MOPS', kind: 'finance', en: 'Filings, capital, revenue signals' },
    { id: 's3', name: 'TSIA', kind: 'industry', en: 'Semiconductor association rosters' },
    { id: 's4', name: 'SEMI.org', kind: 'industry', en: 'Equipment & materials membership' },
    { id: 's5', name: 'ASIP / 創業計畫', kind: 'policy', en: 'Accelerator & grant cohorts' },
    { id: 's6', name: '公司官網', kind: 'profile', en: 'Product, team, technology copy' },
    { id: 's7', name: '新聞 / 媒體', kind: 'signal', en: 'Rounds, launches, partnerships' },
    { id: 's8', name: '專利資料庫', kind: 'ip', en: 'Patent families & assignees' },
    { id: 's9', name: '政府補助公告', kind: 'policy', en: 'Grant awards & programme lists' },
];

export const GAPS = [
    { id: 'g1', en: 'EDA & chip-design tooling', zh: 'EDA 與晶片設計工具', sev: 'high' },
    { id: 'g2', en: 'Advanced packaging startups', zh: '先進封裝新創', sev: 'high' },
    { id: 'g3', en: 'AI infra / MLOps', zh: 'AI 基礎設施 / MLOps', sev: 'mid' },
    { id: 'g4', en: 'Grid-scale energy storage', zh: '電網級儲能', sev: 'high' },
    { id: 'g5', en: 'Biomanufacturing scale-up', zh: '生物製造放大', sev: 'mid' },
    { id: 'g6', en: 'Carbon-capture materials', zh: '碳捕捉材料', sev: 'mid' },
    { id: 'g7', en: 'Deep-tech commercialisation talent', zh: '深科技商化人才', sev: 'high' },
];

export const SHELL = {
    en: {
        eyebrow: 'FIELD ATLAS · INTERACTIVE',
        title: 'An atlas of Taiwan’s deep-tech ecosystem — crawled, tagged, and queryable',
        lead: 'A working intelligence layer over 230+ companies: how the data is acquired and structured, mapped into an ecosystem atlas, read for gaps and flows, and delivered as B2B intelligence you can question in plain language.',
        meta: ['230+ companies · 40+ dimensions · 9 sources', 'Real ITRI/ISTI foundation · proposed B2B layer', 'Bilingual taxonomy · RAG query surface'],
        navLabel: 'ATLAS INDEX',
        bridgeEyebrow: 'RELATED SYSTEMS',
    },
    zh: {
        eyebrow: '田野地圖集 · 可互動',
        title: '台灣深科技生態系地圖集——爬取、標籤化、可查詢',
        lead: '一層覆蓋 230+ 家公司的商情智庫：資料如何被擷取與結構化、繪成生態系地圖、讀出缺口與資金流向，並以能用白話提問的 B2B 商情形式交付。',
        meta: ['230+ 家公司 · 40+ 維度 · 9 類來源', '真實工研院基礎 · 提案 B2B 層', '雙語分類 · RAG 查詢介面'],
        navLabel: '地圖集索引',
        bridgeEyebrow: '相關系統',
    },
};
