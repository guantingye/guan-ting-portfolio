// Registry + shell copy for the DeepScout evidence layer ("design record" dialect).
// Heavy per-module data (company rows, risk register, metric tree) is colocated
// inside each module file; this file holds only the page spine, badge/act
// vocabulary, and links back to the real deployed site.

// Five acts — the page spine.
export const ACTS = [
    { id: 'frame',  num: 'I',   name: { en: 'Frame',  zh: '框架' }, tag: { en: 'the premise and the three-way tension',            zh: '命題與三方張力' } },
    { id: 'draw',   num: 'II',  name: { en: 'Draw',   zh: '成形' }, tag: { en: 'wireframes, fidelity, and the shape of doubt',      zh: '線框、保真與不確定的形狀' } },
    { id: 'system', num: 'III', name: { en: 'System', zh: '系統' }, tag: { en: 'component honesty and bilingual craft',             zh: '元件誠實與雙語工藝' } },
    { id: 'proof',  num: 'IV',  name: { en: 'Proof',  zh: '驗證' }, tag: { en: 'real data, metrics, and risk mapped to guardrail',  zh: '真資料、指標與風險對護欄' } },
    { id: 'ship',   num: 'V',   name: { en: 'Ship',   zh: '上線' }, tag: { en: 'engineering discipline and the live bridge',        zh: '工程紀律與實品入口' } },
];

// Authenticity stamps — same three-tier vocabulary as the rest of the portfolio.
export const BADGES = {
    real:          { term: 'REAL',          en: 'Verified from the live DeepScout site, its repository, or my own records.', zh: '可從 DeepScout 線上站、其原始碼庫或我的實際紀錄驗證。' },
    reconstructed: { term: 'RECONSTRUCTED', en: 'A real event or process; specific details re-drawn from memory, not from a preserved file.', zh: '真實事件或流程，細節依記憶重繪，並非保存下來的原始檔案。' },
    illustrative:  { term: 'ILLUSTRATIVE',  en: 'Conceptual, for explanation only.', zh: '概念性內容，僅供說明。' },
};

// Competency chips — passive labels only (no filtering). Which capability a
// module is evidence for, mapped against the role rubric in the build plan.
export const SKILL_MAP = {
    PROD: { en: 'Product Judgment',   zh: '產品判斷' },
    UX:   { en: 'UX Research',        zh: 'UX 研究' },
    RAI:  { en: 'Responsible AI',     zh: '負責任的 AI' },
    SYS:  { en: 'Design System',      zh: '設計系統' },
    CPY:  { en: 'Content Design',     zh: '內容設計' },
    ENG:  { en: 'Front-End Craft',    zh: '前端工藝' },
    DATA: { en: 'Data Credibility',   zh: '資料可信度' },
};

// Module registry — id, act, badge tier, skill chips, short title.
// `num` is derived from array order so a module can be inserted without
// hand-renumbering everything after it.
const MODULE_LIST = [
    { id: 'ds-m01', key: 'M01', act: 'frame',  skills: ['PROD', 'UX'],        badge: 'real',          title: { en: 'The Brief Behind the Brief', zh: '命題與三方張力' } },
    { id: 'ds-m02', key: 'M02', act: 'frame',  skills: ['PROD', 'DATA'],      badge: 'real',          title: { en: 'Signal → Schema',            zh: '訊號變欄位' } },
    { id: 'ds-m03', key: 'M03', act: 'draw',   skills: ['UX', 'SYS'],         badge: 'reconstructed', title: { en: 'Wireflow',                   zh: '線框演進' } },
    { id: 'ds-m04', key: 'M04', act: 'draw',   skills: ['UX', 'SYS', 'ENG'],  badge: 'reconstructed', title: { en: 'Same Brief, Four Passes',    zh: '一份 brief，四道工序' } },
    { id: 'ds-m05', key: 'M05', act: 'draw',   skills: ['RAI', 'UX'],         badge: 'real',          title: { en: 'Designing for Doubt',        zh: '不確定狀態設計' } },
    { id: 'ds-m06', key: 'M06', act: 'system', skills: ['SYS', 'ENG'],        badge: 'real',          title: { en: 'Component Honesty',          zh: '元件誠實' } },
    { id: 'ds-m07', key: 'M07', act: 'system', skills: ['CPY', 'UX'],         badge: 'real',          title: { en: 'Two Languages, One Product', zh: '雙語文案工程' } },
    { id: 'ds-m08', key: 'M08', act: 'proof',  skills: ['DATA', 'PROD'],      badge: 'real',          title: { en: 'The Freshness Problem',      zh: '真資料的代價' } },
    { id: 'ds-m09', key: 'M09', act: 'proof',  skills: ['PROD', 'DATA'],      badge: 'real',          title: { en: 'Metric Tree',                zh: '北極星與護欄' } },
    { id: 'ds-m10', key: 'M10', act: 'proof',  skills: ['RAI', 'PROD'],       badge: 'real',          title: { en: 'Risk → Guardrail',           zh: '風險對護欄' } },
    { id: 'ds-m11', key: 'M11', act: 'ship',   skills: ['ENG', 'SYS'],        badge: 'real',          title: { en: 'Engineering the Case',       zh: '技術框架' } },
    { id: 'ds-mb',  key: 'MB',  act: 'ship',   skills: ['PROD', 'ENG'],       badge: 'real',          title: { en: 'Live Bridge',                zh: '實品入口' } },
];
export const MODULES = MODULE_LIST.map((m, i) => ({ ...m, num: String(i + 1).padStart(2, '0') }));

export const LIVE_URL = 'https://guantingye.github.io/DeepScout/';
export const ROUTES = {
    home:       'https://guantingye.github.io/DeepScout/',
    copilot:    'https://guantingye.github.io/DeepScout/copilot',
    personas:   'https://guantingye.github.io/DeepScout/personas',
    journey:    'https://guantingye.github.io/DeepScout/journey',
    risks:      'https://guantingye.github.io/DeepScout/risks',
    roadmap:    'https://guantingye.github.io/DeepScout/roadmap',
    experiment: 'https://guantingye.github.io/DeepScout/experiment',
    graph:      'https://guantingye.github.io/DeepScout/graph',
    designSystem: 'https://guantingye.github.io/DeepScout/design-system',
    copilotCorintis:     'https://guantingye.github.io/DeepScout/copilot?company=corintis',
    copilotLow:          'https://guantingye.github.io/DeepScout/copilot?state=low',
    copilotInsufficient: 'https://guantingye.github.io/DeepScout/copilot?state=insufficient',
    copilotTimeout:      'https://guantingye.github.io/DeepScout/copilot?state=error',
};

export const SHELL = {
    en: {
        eyebrow: 'Design record · v1 · 2026-07',
        title: 'The design record behind the live site',
        lead: "The eight chapters at guantingye.github.io/DeepScout are the case study — operable, bilingual, and already telling its own story. This is the layer beneath it: the premise, the wireframes, the fidelity passes, and the decision to give uncertainty its own interface. Each module argues a decision, then links to the live chapter where you can check it.",
        indexLabel: 'Module index',
        skipLink: 'Skip to module index',
        demoTitle: 'Open the real site',
        demoLead: 'Every module above rebuilds one decision as evidence. Here are the eight real chapters — open them and check the claims against the running site.',
        demoPrintNote: 'Plain URL for print / PDF:',
        readLabel: 'READ',
    },
    zh: {
        eyebrow: '設計檔案 · v1 · 2026-07',
        title: '線上站背後的設計檔案',
        lead: 'guantingye.github.io/DeepScout 的八個章節就是案例本身——可操作、雙語，而且已經把自己的故事講完了。這裡是它底下的那一層：命題、線框、保真迭代，以及「給不確定性一個自己的介面」這個決定。每個模組談一個決策，結尾深連結到線上站對應章節，供你核對。',
        indexLabel: '模組索引',
        skipLink: '跳至模組索引',
        demoTitle: '打開真正的網站',
        demoLead: '上方每個模組都把一個決策重建成證據。這裡是八個真實章節——打開它們，對照運作中的網站核對每一項宣稱。',
        demoPrintNote: '列印／PDF 用純文字網址：',
        readLabel: 'READ',
    },
};
