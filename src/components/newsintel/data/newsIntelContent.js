// Registry + shell copy for the AI News Intelligence evidence layer.
// Full module copy lives inside each module file (colocation); this file holds
// only the lightweight metadata the Evidence Ledger (F1) needs to count and
// filter, plus shared shell/badge strings.

// Five acts — the page spine (plan 0.2).
export const ACTS = [
    { id: 'ingest',     num: 'I',   name: { en: 'Ingest',     zh: '匯入' }, tag: { en: 'who suffers, what the raw signal looks like',   zh: '誰在受苦、原始訊號長什麼樣' } },
    { id: 'interpret',  num: 'II',  name: { en: 'Interpret',  zh: '詮釋' }, tag: { en: 'turning noise into structured intelligence',     zh: '把雜訊變成結構化情報' } },
    { id: 'interface',  num: 'III', name: { en: 'Interface',  zh: '介面' }, tag: { en: 'how the platform UI was designed, lo-fi to hi-fi', zh: '平台介面如何從草圖走到成品' } },
    { id: 'instrument', num: 'IV',  name: { en: 'Instrument', zh: '運維' }, tag: { en: 'how the MVP was engineered and measured',        zh: 'MVP 如何被工程化與量測' } },
    { id: 'iterate',    num: 'V',   name: { en: 'Iterate',    zh: '迭代' }, tag: { en: 'what was learned, fixed, and still broken',       zh: '學到什麼、修了什麼、還壞在哪' } },
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
    { id: 'ni-m1',  key: 'M01', act: 'ingest',     fidelity: ['RESEARCH', 'METRICS'], roles: ['UXR', 'TPM'],       badge: 'reconstructed', title: { en: "The analyst's morning",        zh: '分析師的早晨' } },
    { id: 'ni-m2',  key: 'M02', act: 'ingest',     fidelity: ['RESEARCH'],            roles: ['UXR', 'TPM', 'AIPD'], badge: 'reconstructed', title: { en: 'Source selection audit',       zh: '來源選擇盤點' } },
    { id: 'ni-m3',  key: 'M03', act: 'ingest',     fidelity: ['RESEARCH'],            roles: ['PD', 'TPM'],         badge: 'reconstructed', title: { en: 'Job stories & scope contract', zh: 'Job stories 與範圍契約' } },
    { id: 'ni-m4',  key: 'M04', act: 'interpret',  fidelity: ['HI-FI', 'CODE', 'METRICS'], roles: ['AIPD', 'FE'],  badge: 'reconstructed', title: { en: 'Prompt engineering lab',       zh: '提示工程實驗室' } },
    { id: 'ni-m5',  key: 'M05', act: 'interpret',  fidelity: ['RESEARCH', 'METRICS'], roles: ['AIPD', 'TPM'],       badge: 'reconstructed', title: { en: 'Model selection record',       zh: '模型選型決策紀錄' } },
    { id: 'ni-m6',  key: 'M06', act: 'interpret',  fidelity: ['RESEARCH', 'HI-FI'],   roles: ['AIPD', 'UXR'],       badge: 'reconstructed', title: { en: 'Bilingual taxonomy design',    zh: '雙語分類法設計' } },
    { id: 'ni-m7',  key: 'M07', act: 'interpret',  fidelity: ['HI-FI', 'CODE'],       roles: ['AIPD', 'UXR', 'PD', 'FE', 'TPM'], badge: 'real', title: { en: 'Pipeline anatomy: live signal trace', zh: '管線解剖：即時訊號追蹤' } },
    { id: 'ni-mp',  key: 'MP',  act: 'interface',  fidelity: ['HI-FI'],               roles: ['PD', 'FE', 'AIPD', 'TPM'], badge: 'reconstructed', title: { en: 'The shipped platform: three surfaces', zh: '已上線平台：三個介面' } },
    { id: 'ni-m8',  key: 'M08', act: 'interface',  fidelity: ['LO-FI'],               roles: ['PD', 'UXR'],         badge: 'reconstructed', title: { en: 'Information architecture evolution', zh: '資訊架構演進' } },
    { id: 'ni-m9',  key: 'M09', act: 'interface',  fidelity: ['LO-FI'],               roles: ['PD', 'UXR'],         badge: 'reconstructed', title: { en: 'Lo-fi wireframe plates',       zh: '低保真線框圖' } },
    { id: 'ni-m10', key: 'M10', act: 'interface',  fidelity: ['HI-FI'],               roles: ['PD', 'FE', 'AIPD'],  badge: 'real',          title: { en: 'Hi-fi redesign comparator',    zh: '高保真改版對照' } },
    { id: 'ni-m11', key: 'M11', act: 'interface',  fidelity: ['HI-FI', 'CODE'],       roles: ['FE', 'PD'],          badge: 'real',          title: { en: 'Component & state inventory',  zh: '元件與狀態清單' } },
    { id: 'ni-m12', key: 'M12', act: 'instrument', fidelity: ['CODE'],                roles: ['FE', 'TPM', 'AIPD'], badge: 'real',          title: { en: 'MVP architecture ledger',      zh: 'MVP 架構台帳' } },
    { id: 'ni-m13', key: 'M13', act: 'instrument', fidelity: ['CODE', 'METRICS'],     roles: ['TPM', 'FE'],         badge: 'reconstructed', title: { en: 'Reliability & ops log',        zh: '可靠度與維運紀錄' } },
    { id: 'ni-m14', key: 'M14', act: 'instrument', fidelity: ['METRICS'],             roles: ['TPM', 'PD'],         badge: 'real',          title: { en: 'Impact metrics board',         zh: '成效指標看板' } },
    { id: 'ni-m15', key: 'M15', act: 'iterate',    fidelity: ['RESEARCH', 'METRICS'], roles: ['UXR', 'PD'],         badge: 'reconstructed', title: { en: 'Usability findings & fix log', zh: '易用性發現與修正紀錄' } },
    { id: 'ni-m16', key: 'M16', act: 'iterate',    fidelity: ['RESEARCH'],            roles: ['TPM', 'AIPD'],       badge: 'real',          title: { en: 'Roadmap & honest limits',      zh: '路線圖與誠實限制' } },
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
        title: 'From raw signal to strategic briefing',
        lead: "The section above is the short version. This is the long one — how the research was done, how the prompts were tuned, where the model tradeoffs landed, how the interface got decided, and the MVP that still runs every morning. I built the AI system and the product that delivers it myself, start to finish.",
        ledgerLabel: 'Evidence ledger',
        indexLabel: 'Module index',
        filterHint: 'Filter by fidelity',
        clear: 'Clear',
        skipLink: 'Skip to evidence ledger',
        readLabel: 'READ',
        dispatchLabel: 'DISPATCH',
        demoTitle: 'See it live',
        demoLead: 'The evidence above rebuilds the product as DOM. Here are the real routes — open them and check the claims against the running platform.',
        demoPrintNote: 'Plain URL for print / PDF:',
    },
    zh: {
        eyebrow: '證據層 · v1 · 2026-07',
        title: '從原始訊號到策略簡報',
        lead: '上面是簡短版，這裡是完整版：研究怎麼做、提示怎麼調、模型取捨落在哪、介面怎麼決定，還有那個到現在每天早上都還在跑的 MVP。AI 系統和交付它的產品，都是我一個人從頭做到尾。',
        ledgerLabel: '證據台帳',
        indexLabel: '模組索引',
        filterHint: '依保真度篩選',
        clear: '清除',
        skipLink: '跳至證據台帳',
        readLabel: 'READ',
        dispatchLabel: 'DISPATCH',
        demoTitle: '打開實機',
        demoLead: '上方證據把產品重建成 DOM；這裡是真實路徑——打開它們，對照運作中的平台檢查每項宣稱。',
        demoPrintNote: '列印／PDF 用純文字網址：',
    },
};
