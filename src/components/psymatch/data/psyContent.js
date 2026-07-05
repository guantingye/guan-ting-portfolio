// PsyMatch evidence layer — structure, module registry, shell copy, references.
// Prose lives inside each module (bilingual via useI18n); this file holds the
// paper's skeleton so the outline, numbering, and references stay in one place.

export const LIVE_URL = 'https://psymatch-rose.vercel.app';
export const EMOBOT_SLUG = 'emobot-plus';

export const SECTIONS = [
    { id: 's1', tag: '§1', name: 'BACKGROUND',  zh: '背景',   full: { en: 'Background', zh: '背景與假設' } },
    { id: 's2', tag: '§2', name: 'INSTRUMENT',  zh: '量表',   full: { en: 'Instrument', zh: '量表與流程' } },
    { id: 's3', tag: '§3', name: 'ALGORITHM',   zh: '演算法', full: { en: 'Algorithm',  zh: '媒合演算法' } },
    { id: 's4', tag: '§4', name: 'SYSTEM',      zh: '系統',   full: { en: 'System',     zh: '系統與交付' } },
    { id: 's5', tag: '§5', name: 'RESULTS',     zh: '結果',   full: { en: 'Results',    zh: '結果與稽核' } },
    { id: 's6', tag: '§6', name: 'DISCUSSION',  zh: '討論',   full: { en: 'Discussion', zh: '討論與倫理' } },
];

// key → lazy component; num → "M4"; no → paper section number "2.1"
export const MODULES = [
    { id: 'pm-m1',  key: 'M01', num: 'M1',  no: '1.1', section: 's1', badge: 'real',          roles: ['UXR', 'TPM'] },
    { id: 'pm-m2',  key: 'M02', num: 'M2',  no: '1.2', section: 's1', badge: 'real',          roles: ['UXR', 'AIPD'] },
    { id: 'pm-m3',  key: 'M03', num: 'M3',  no: '1.3', section: 's1', badge: 'reconstructed', roles: ['UXR', 'TPM'] },
    { id: 'pm-m4',  key: 'M04', num: 'M4',  no: '2.1', section: 's2', badge: 'real',          roles: ['UXR', 'AIPD'] },
    { id: 'pm-m5',  key: 'M05', num: 'M5',  no: '2.2', section: 's2', badge: 'real',          roles: ['AIPD', 'FE', 'UXR'] },
    { id: 'pm-m6',  key: 'M06', num: 'M6',  no: '2.3', section: 's2', badge: 'reconstructed', roles: ['PD', 'UXR'] },
    { id: 'pm-m7',  key: 'M07', num: 'M7',  no: '3.1', section: 's3', badge: 'real',          roles: ['AIPD', 'UXR', 'PD', 'FE', 'TPM'], signature: true },
    { id: 'pm-m8',  key: 'M08', num: 'M8',  no: '3.2', section: 's3', badge: 'real',          roles: ['AIPD', 'UXR'] },
    { id: 'pm-m9',  key: 'M09', num: 'M9',  no: '3.3', section: 's3', badge: 'real',          roles: ['AIPD', 'TPM', 'FE'] },
    { id: 'pm-m10', key: 'M10', num: 'M10', no: '4.1', section: 's4', badge: 'real',          roles: ['PD', 'FE'] },
    { id: 'pm-m11', key: 'M11', num: 'M11', no: '4.2', section: 's4', badge: 'real',          roles: ['FE', 'TPM'] },
    { id: 'pm-m12', key: 'M12', num: 'M12', no: '4.3', section: 's4', badge: 'reconstructed', roles: ['FE', 'PD', 'TPM'] },
    { id: 'pm-m13', key: 'M13', num: 'M13', no: '5.1', section: 's5', badge: 'reconstructed', roles: ['UXR', 'TPM'] },
    { id: 'pm-m14', key: 'M14', num: 'M14', no: '5.2', section: 's5', badge: 'real',          roles: ['AIPD', 'FE'] },
    { id: 'pm-m15', key: 'M15', num: 'M15', no: '6.1', section: 's6', badge: 'real',          roles: ['AIPD', 'UXR', 'TPM'] },
    { id: 'pm-m16', key: 'M16', num: 'M16', no: '6.2', section: 's6', badge: 'real',          roles: ['TPM', 'AIPD', 'UXR'] },
    { id: 'pm-m17', key: 'M17', num: 'M17', no: '6.3', section: 's6', badge: 'real',          roles: ['AIPD', 'TPM'] },
];

export const SHELL = {
    en: {
        eyebrow: 'REGISTERED REPORT · INTERACTIVE',
        title: 'How PsyMatch measures a person, then matches the help',
        lead: 'A laboratory-style walk-through of a shipped counselling-matching platform: the intake instrument, the exact scoring algorithm, the system around it, and an honest account of what it can and cannot claim.',
        meta: ['Solo: research · design · algorithm · build', '7-topic intake · 4-criterion match', 'Live system audited 2026-07-05'],
        outlineLabel: 'PROTOCOL OUTLINE',
        outlineHint: 'Six sections. Current section is highlighted as you read.',
        referencesTitle: 'References',
        referencesLead: 'Real, verifiable anchors — literature the design leans on, plus the internal artifacts of record.',
        bridgeEyebrow: 'LIVE SYSTEM',
        bridgeNote: 'Open the running platform (new tab):',
    },
    zh: {
        eyebrow: '註冊報告 · 可互動',
        title: 'PsyMatch 如何先量測一個人，再媒合適合的協助',
        lead: '以研究報告的方式，走過一個已上線的諮商媒合平台：量表工具、確切的評分演算法、周邊系統，以及對它能宣稱與不能宣稱什麼的誠實交代。',
        meta: ['獨立：研究 · 設計 · 演算法 · 開發', '七題量表 · 四準則媒合', '線上系統稽核於 2026-07-05'],
        outlineLabel: '報告大綱',
        outlineHint: '六個章節，閱讀時自動標示目前所在段落。',
        referencesTitle: '參考文獻',
        referencesLead: '僅引用真實、可查證的來源：設計所依據的文獻，以及作為佐證的內部產出。',
        bridgeEyebrow: '線上系統',
        bridgeNote: '開啟運行中的平台（新分頁）：',
    },
};

// Real citations only (plan 3.8). Verified landmark works on the therapeutic
// alliance, client preferences, and common factors — the premise of matching.
export const REFERENCES = [
    {
        n: 1,
        cite: {
            en: 'Flückiger, C., Del Re, A. C., Wampold, B. E., & Horvath, A. O. (2018). The alliance in adult psychotherapy: A meta-analytic synthesis. Psychotherapy, 55(4), 316–340.',
            zh: 'Flückiger 等人（2018）。成人心理治療中的治療同盟：後設分析綜整。Psychotherapy, 55(4), 316–340。',
        },
    },
    {
        n: 2,
        cite: {
            en: 'Swift, J. K., & Callahan, J. L. (2009). The impact of client treatment preferences on outcome: A meta-analysis. Journal of Clinical Psychology, 65(4), 368–381.',
            zh: 'Swift & Callahan（2009）。個案治療偏好對療效的影響：後設分析。Journal of Clinical Psychology, 65(4), 368–381。',
        },
    },
    {
        n: 3,
        cite: {
            en: 'Wampold, B. E. (2015). How important are the common factors in psychotherapy? An update. World Psychiatry, 14(3), 270–277.',
            zh: 'Wampold（2015）。心理治療中的共同因素有多重要？World Psychiatry, 14(3), 270–277。',
        },
    },
    {
        n: 4,
        cite: {
            en: 'Internal artifact — shipped matching function, PsyMatch production bundle /assets/index-B7MHzdX5.js (audited 2026-07-05).',
            zh: '內部產出——已上線的媒合函式，PsyMatch 正式版 bundle /assets/index-B7MHzdX5.js（稽核於 2026-07-05）。',
        },
        href: LIVE_URL,
    },
];
