// Registry + shell copy for the AI News Intelligence evidence layer.
// Full module copy lives inside each module file (colocation); this file holds
// only the lightweight metadata the Evidence Ledger (F1) needs to count and
// filter, plus shared shell/badge strings.

// Five acts — the page spine (plan 0.2).
export const ACTS = [
    { id: 'ingest',     num: 'I',   name: { en: 'Ingest',     zh: '匯入' }, tag: { en: 'who handles the information, where friction occurs', zh: '誰在處理資訊，摩擦發生在哪裡' } },
    { id: 'interpret',  num: 'II',  name: { en: 'Interpret',  zh: '詮釋' }, tag: { en: 'turning noise into structured intelligence',     zh: '把雜訊變成結構化情報' } },
    { id: 'interface',  num: 'III', name: { en: 'Interface',  zh: '介面' }, tag: { en: 'how the platform UI was designed, lo-fi to hi-fi', zh: '平台介面如何從草圖走到成品' } },
    { id: 'instrument', num: 'IV',  name: { en: 'Instrument', zh: '運維' }, tag: { en: 'how the MVP runs reliably, is monitored, and is continuously improved', zh: 'MVP 如何穩定運作、被監測並持續修正' } },
    { id: 'iterate',    num: 'V',   name: { en: 'Iterate',    zh: '迭代' }, tag: { en: 'from research findings and design fixes to the next validation cycle', zh: '從研究發現、設計修正到下一輪驗證' } },
];

// Fidelity tags drive the ledger filter (deliberately unlike the sibling ROLE filter).
export const FIDELITIES = ['RESEARCH', 'LO-FI', 'HI-FI', 'CODE', 'METRICS'];

// Target roles (passive labels only — no filtering, plan 4.2 / F2).
export const ROLE_MAP = {
    AIPD: { en: 'AI Product Designer',       zh: 'AI 產品設計師' },
    UXR:  { en: 'UX Researcher',             zh: 'UX 研究員' },
    PD:   { en: 'Product Designer',          zh: '產品設計師' },
    FE:   { en: 'Front-End Product Engineer', zh: '前端產品工程師' },
    TPM:  { en: 'Technical PM',              zh: '技術 PM' },
};

// Authenticity stamps (plan 3.2). Each carries a distinct glyph so it survives grayscale.
export const BADGES = {
    real:          { term: 'REAL',          en: 'Verified from the live platform, this repo, or my own records.',        zh: '可從線上平台、此儲存庫或我的實際紀錄驗證。' },
    reconstructed: { term: 'RECONSTRUCTED', en: 'A real event or process; specific details re-created from memory.',      zh: '真實事件或流程，細節依記憶重建。' },
    simulated:     { term: 'SIMULATED',     en: 'Realistic data generated to demonstrate the method.',                   zh: '為展示方法而生成的擬真資料。' },
    illustrative:  { term: 'ILLUSTRATIVE',  en: 'Conceptual, for explanation only.',                                     zh: '概念性內容，僅供說明。' },
};

// Module registry — id, act, fidelity tags, roles, badge tier, short title.
// Order is the reading order down the page; `num` is derived from that order so
// a module can be inserted without hand-renumbering the rest.
const MODULE_LIST = [
    { id: 'ni-m1',  key: 'M01', act: 'ingest',     fidelity: ['RESEARCH', 'METRICS'], roles: ['UXR', 'TPM'],       badge: 'reconstructed', title: { en: "The analyst's morning intelligence workflow", zh: '分析師的晨間情報工作流' } },
    { id: 'ni-m2',  key: 'M02', act: 'ingest',     fidelity: ['RESEARCH'],            roles: ['UXR', 'TPM', 'AIPD'], badge: 'reconstructed', title: { en: 'Source selection audit',       zh: '來源選擇盤點' } },
    { id: 'ni-m3',  key: 'M03', act: 'ingest',     fidelity: ['RESEARCH'],            roles: ['PD', 'TPM'],         badge: 'reconstructed', title: { en: 'Job stories & scope contract', zh: 'Job stories 與範圍契約' } },
    { id: 'ni-m4',  key: 'M04', act: 'interpret',  fidelity: ['HI-FI', 'CODE', 'METRICS'], roles: ['AIPD', 'FE'],  badge: 'reconstructed', title: { en: 'Prompt versioning & evaluation lab', zh: '提示版本與評測實驗室' } },
    { id: 'ni-m5',  key: 'M05', act: 'interpret',  fidelity: ['RESEARCH', 'METRICS'], roles: ['AIPD', 'TPM'],       badge: 'reconstructed', title: { en: 'Model selection record',       zh: '模型選型決策紀錄' } },
    { id: 'ni-m6',  key: 'M06', act: 'interpret',  fidelity: ['RESEARCH', 'HI-FI'],   roles: ['AIPD', 'UXR'],       badge: 'reconstructed', title: { en: 'Bilingual taxonomy architecture & boundary rules', zh: '雙語分類架構與邊界規則' } },
    { id: 'ni-m7',  key: 'M07', act: 'interpret',  fidelity: ['HI-FI', 'CODE'],       roles: ['AIPD', 'UXR', 'PD', 'FE', 'TPM'], badge: 'real', title: { en: 'Data pipeline trace | From source news to product page', zh: '資料管線追蹤｜從原始新聞到產品頁面' } },
    { id: 'ni-mp',  key: 'MP',  act: 'interface',  fidelity: ['HI-FI'],               roles: ['PD', 'FE', 'AIPD', 'TPM'], badge: 'reconstructed', title: { en: 'Shipped product | Three core surfaces', zh: '已上線產品｜三個核心介面' } },
    { id: 'ni-m8',  key: 'M08', act: 'interface',  fidelity: ['LO-FI'],               roles: ['PD', 'UXR'],         badge: 'reconstructed', title: { en: 'From daily reports to an intelligence platform | Information architecture evolution', zh: '從每日報告到情報平台｜資訊架構演進' } },
    { id: 'ni-m9',  key: 'M09', act: 'interface',  fidelity: ['LO-FI'],               roles: ['PD', 'UXR'],         badge: 'reconstructed', title: { en: 'Lo-fi wireframes and layout trade-offs', zh: '低保真線框圖與版型取捨' } },
    { id: 'ni-m10', key: 'M10', act: 'interface',  fidelity: ['HI-FI'],               roles: ['PD', 'FE', 'AIPD'],  badge: 'real',          title: { en: 'From Notion daily reports to a queryable interface', zh: '從 Notion 日報到可查詢介面' } },
    { id: 'ni-m11', key: 'M11', act: 'interface',  fidelity: ['HI-FI', 'CODE'],       roles: ['FE', 'PD'],          badge: 'real',          title: { en: 'Component and state specifications', zh: '元件與狀態規格' } },
    { id: 'ni-m12', key: 'M12', act: 'instrument', fidelity: ['CODE'],                roles: ['FE', 'TPM', 'AIPD'], badge: 'real',          title: { en: 'MVP architecture decision model', zh: 'MVP 架構決策模型' } },
    { id: 'ni-m13', key: 'M13', act: 'instrument', fidelity: ['CODE', 'METRICS'],     roles: ['TPM', 'FE'],         badge: 'reconstructed', title: { en: 'System reliability & operations log', zh: '系統可靠度與維運紀錄' } },
    { id: 'ni-m14', key: 'M14', act: 'instrument', fidelity: ['METRICS'],             roles: ['TPM', 'PD'],         badge: 'real',          title: { en: 'Performance & operations metrics', zh: '成效與運作指標' } },
    { id: 'ni-m15', key: 'M15', act: 'iterate',    fidelity: ['RESEARCH', 'METRICS'], roles: ['UXR', 'PD'],         badge: 'reconstructed', title: { en: 'Usability-test findings & fixes', zh: '可用性測試發現與修正' } },
    { id: 'ni-m16', key: 'M16', act: 'iterate',    fidelity: ['RESEARCH'],            roles: ['TPM', 'AIPD'],       badge: 'real',          title: { en: 'Next validation gates & known limits', zh: '下一步驗證門檻與已知限制' } },
];
export const MODULES = MODULE_LIST.map((m, i) => ({ ...m, num: String(i + 1).padStart(2, '0') }));

// Ledger counts (computed once, real, from the registry above).
export const FIDELITY_COUNTS = FIDELITIES.reduce((acc, f) => {
    acc[f] = MODULES.filter(m => m.fidelity.includes(f)).length;
    return acc;
}, {});

export const LIVE_URL = 'https://industry-strategy-platform.vercel.app/';
export const ROUTES = {
    home:     'https://industry-strategy-platform.vercel.app/',
    insights: 'https://industry-strategy-platform.vercel.app/insights',
    startups: 'https://industry-strategy-platform.vercel.app/startups',
};

export const SHELL = {
    en: {
        eyebrow: 'Evidence layer · v1 · 2026-07',
        title: 'From raw signal to traceable strategic briefings',
        lead: 'The section above introduces the outcome. Here I unpack the work: how I studied the workflow, tuned prompts and models, made interface decisions, and turned the system into an MVP that still runs each morning. I independently designed and developed both the AI system and the product interface that delivers the briefings.',
        ledgerLabel: 'Evidence ledger',
        indexLabel: 'Module index',
        filterHint: 'Filter by fidelity',
        clear: 'Clear',
        skipLink: 'Skip to evidence ledger',
        readLabel: 'READ',
        dispatchLabel: 'DISPATCH',
        demoTitle: 'From case evidence to the live product',
        demoLead: 'The modules above rebuild design and decision evidence as interactive DOM components; the links below open the interactive prototype currently deployed. Open each surface to compare the case study’s information architecture, categorisation, and interaction details with how they work in practice.',
        demoPrintNote: 'If the links cannot be opened, use the URL below:',
    },
    zh: {
        eyebrow: '證據層 · v1 · 2026-07',
        title: '從原始訊號到可追溯的策略簡報',
        lead: '上方交代成果，這裡拆開過程：我如何研究工作流程、調整提示與模型、做出介面決策，並把系統做成每天早上仍在運作的 MVP。AI 系統與交付簡報的產品介面，皆由我獨立設計與開發。',
        ledgerLabel: '證據台帳',
        indexLabel: '模組索引',
        filterHint: '依保真度篩選',
        clear: '清除',
        skipLink: '跳至證據台帳',
        readLabel: 'READ',
        dispatchLabel: 'DISPATCH',
        demoTitle: '從案例證據進入線上產品',
        demoLead: '上方模組以可操作的 DOM 元件重建設計與決策證據；下方則直接連往目前部署的互動原型。你可以開啟各個介面，對照案例中的資訊架構、分類方式與互動細節，檢查它們如何實際運作。',
        demoPrintNote: '無法點擊連結時，請使用下方網址：',
    },
};
