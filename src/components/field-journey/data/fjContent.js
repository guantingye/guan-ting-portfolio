// Registry + copy for the Field Journey evidence layer ("storybook" dialect).
// Everything inside the paper zone reads from this file. Station order is the
// STATIONS array order — swap objects to reorder; chapter numbering, the map,
// and the rail all follow. `todo` fields are provenance hooks for the user's
// deepening pass (mirrored in AUDIT.md) and are NEVER rendered on the page.

// Three-tier authenticity vocabulary — same terms as the rest of the portfolio.
export const BADGES = {
    real:          { term: 'REAL',          en: 'Drawn from my actual work records, deliverables, or publicly verifiable institutional facts.', zh: '出自我的實際工作紀錄、成品，或可公開查證的機構資訊。' },
    reconstructed: { term: 'RECONSTRUCTED', en: 'A real duty or artifact; specific details re-drawn from memory, not from a preserved file.', zh: '真實職務或產出，細節依記憶重繪，並非保存下來的原始檔案。' },
    illustrative:  { term: 'ILLUSTRATIVE',  en: 'Conceptual, for storytelling only.', zh: '概念性內容，僅供敘事說明。' },
};

// The three stations, in journey order. `accent`/`accentInk` are the only
// color hooks a chapter needs; `landmark` picks the map glyph.
export const STATIONS = [
    {
        id: 'st1',
        chapterId: 'fj-c03',
        name: { en: 'Mennonite Hospital · Liming Institution', zh: '門諾醫院黎明機構' },
        short: { en: 'Liming', zh: '門諾黎明' },
        sector: { en: 'Hospital-affiliated disability services', zh: '醫院附設身心障礙服務' },
        size: { en: '30–100 staff', zh: '30–100 人' },
        role: { en: 'Project Assistant', zh: '計畫助理' },
        accent: '#D97841', accentInk: '#9C4A1B', accentSoft: 'rgba(217,120,65,0.14)',
        landmark: 'hospital',
        intro: {
            en: 'My first station taught me what the word “user” really weighs. At a hospital-affiliated institution serving autistic residents, I worked the floor — daily service and care — while designing what the floor needed: structured course materials, and communication aids for people whom standard interfaces simply do not serve.',
            zh: '第一站教會我「使用者」三個字的真正重量。在門諾醫院附設的黎明機構，我一邊在第一線陪伴自閉症院生的日常，一邊為第一線設計需要的東西——結構化課程教材，以及為「一般介面根本服務不到的人」做的溝通輔具。',
        },
        duties: [
            { key: 'care', title: { en: 'Daily service on the autism unit', zh: '自閉症個案日常服務處遇' }, body: { en: 'Day-to-day service and care for autistic residents — routines, transitions, and the constant reading of nonverbal signals. The rawest field research a designer can get.', zh: '自閉症院生的日常服務與處遇：作息、轉換，以及不間斷地讀取非語言訊號——這是一個設計者能得到最原始的田野研究。' }, todo: 'quantify: 每週服務個案數／服務時數' },
            { key: 'curriculum', title: { en: 'Structured curriculum, end to end', zh: '結構化課程專案' }, body: { en: 'Conceived, designed, taught, and produced the materials for structured courses — breaking a skill into visual, predictable steps that autistic learners can trust.', zh: '從發想、設計、實際教學到教材設計製作一手包辦——把一項技能拆解成視覺化、可預期的步驟，讓自閉症學習者能安心跟隨。' }, todo: 'quantify: 課程主題數／學員人數' },
            { key: 'aac', title: { en: 'Communication aids (AAC)', zh: '溝通輔具專案' }, body: { en: 'Designed, produced, and taught with augmentative and alternative communication tools — picture cards and boards that give nonverbal residents a way to say “I want”, “it hurts”, “help me”. My first accessibility practice, before I knew the word for it.', zh: '發想、設計並製作溝通輔具，再帶著它教學——圖卡與溝通板，讓無口語的院生能說出「我想要」「不舒服」「幫幫我」。那是我最早的無障礙設計實務，早在我認識這個詞之前。' }, todo: 'quantify: 輔具套數／使用院生人數' },
            { key: 'events', title: { en: 'Large-scale event operations', zh: '大型活動規劃統籌與執行' }, body: { en: 'Planned, coordinated, and ran institution-wide events — logistics, staffing, and the accessibility details that decide whether everyone can actually take part.', zh: '規劃、統籌並執行機構大型活動——場地動線、人力配置，以及決定「每個人都能真正參與」的無障礙細節。' }, todo: 'quantify: 場次／參與人數' },
            { key: 'content', title: { en: 'Copy, layout, and reports', zh: '文案美編、報告撰寫' }, body: { en: 'Wrote the copy, designed the layouts, and drafted the reports that carried the floor’s work out to families, funders, and the hospital.', zh: '撰寫文案、美編排版、撰寫報告——把第一線的工作，傳達給家屬、補助單位與醫院。' } },
        ],
        tags: [
            { en: 'Field service', zh: '第一線服務' },
            { en: 'Teaching materials', zh: '教材設計' },
            { en: 'AAC · accessibility', zh: 'AAC 溝通輔具' },
            { en: 'Event ops', zh: '活動統籌' },
        ],
        fieldNote: {
            en: 'Everything I now believe about interface states — clarity, predictability, one thing at a time — I first learned from learners who could not tolerate ambiguity.',
            zh: '我現在相信的介面原則——清楚、可預期、一次只做一件事——最早是跟無法忍受模糊的學習者學來的。',
        },
    },
    {
        id: 'st2',
        chapterId: 'fj-c04',
        name: { en: 'Children & Family Welfare Association', zh: '兒童暨家庭關懷協會' },
        short: { en: 'CFWA', zh: '兒家協會' },
        sector: { en: 'Social-welfare NGO', zh: '社會福利協會' },
        size: { en: '1–30 staff', zh: '1–30 人' },
        role: { en: 'Project Assistant', zh: '計畫助理' },
        accent: '#7A8B4E', accentInk: '#4F5D2D', accentSoft: 'rgba(122,139,78,0.16)',
        landmark: 'house',
        intro: {
            en: 'A small association with a wide mission: children and family welfare. On a team you can count on two hands, everyone builds everything — I ran the numbers, designed the scales and forms, produced the podcast, managed the website, and helped carry the lectures. Small-team fieldwork is where generalists are made.',
            zh: '一個小而使命很寬的協會：兒童與家庭關懷。團隊十指可數，每個人都得會蓋整棟房子——我跑統計、設計量表與表單、剪 Podcast、管網站、也扛講座。小團隊的田野，是通才被鍛造出來的地方。',
        },
        duties: [
            { key: 'casedata', title: { en: 'Case data, made legible', zh: '個案資料統計與數據整理' }, body: { en: 'Collected and organized the association’s case records, ran the statistical analysis, and wrote it into reports people could actually read.', zh: '收集並整理協會個案資料，進行統計分析，再把數字寫成別人真的讀得懂的報告。' }, todo: 'quantify: 年度個案筆數' },
            { key: 'annual', title: { en: 'The annual report that argued for funding', zh: '年度資料統合與分析報告' }, body: { en: 'Planned the statistical workflow and designed the measurement scales, integrated a year of data, visualized the results — then sat down with the psychologists to read them together, and used that evidence to argue for program funding.', zh: '規劃統計流程、設計量表，整合一整年的資料並把結果視覺化——再和心理師一起對讀數據，最後用這份證據去爭取計畫經費。' }, todo: 'quantify: 經費金額／計畫名稱' },
            { key: 'project', title: { en: 'Projects, ideation to acceptance', zh: '專案計畫參與（發想到驗收）' }, body: { en: 'Worked every phase of program projects — ideation, design, evaluation, execution, acceptance — plus the material design, photo retouching, and copywriting that carried them.', zh: '參與專案計畫的每個階段——發想、設計、評估、執行、驗收——外加一路相隨的媒材美編、修圖與文稿撰寫。' } },
            { key: 'podcast', title: { en: 'A podcast, produced end to end', zh: 'Podcast 剪輯與上架' }, body: { en: 'Drafted the interview outlines, invited the guests, sat in on recordings, edited the audio, and published the episodes — an entire content pipeline in one seat.', zh: '從訪談大綱、人選邀稿、實際錄音參與、音訊剪輯後製到上架平台——一個人坐完整條內容產線。' }, todo: 'quantify: 集數／上架平台' },
            { key: 'web', title: { en: 'The association’s public face', zh: '網站平台發文美編管理' }, body: { en: 'Managed the association website — publishing, editing, visual upkeep — keeping the content accurate, engaging, and on-brand.', zh: '管理協會網站平台：發文、編輯、視覺維護——讓內容準確、吸引人，也守住品牌形象。' } },
            { key: 'form', title: { en: 'Counseling intake forms', zh: '諮詢諮商表單設計' }, body: { en: 'Designed the consultation and counseling forms that collect needs and feedback — clear enough that a parent under stress can fill them in without a second explanation.', zh: '設計諮詢與諮商表單，收集需求與回饋——清楚到焦急的家長不需要第二次說明就能填完。' } },
            { key: 'lecture', title: { en: 'Lectures and events', zh: '講座活動支援' }, body: { en: 'Venue, promotion, logistics, on-site support — the invisible work that makes a lecture look effortless.', zh: '場地安排、宣傳推廣、後勤與現場支援——讓一場講座看起來毫不費力的，都是看不見的工。' }, todo: 'quantify: 場次／參與人數' },
        ],
        tags: [
            { en: 'Statistics & scales', zh: '統計與量表' },
            { en: 'Podcast production', zh: 'Podcast 產製' },
            { en: 'Form design', zh: '表單設計' },
            { en: 'Web & content', zh: '網站與內容' },
        ],
        fieldNote: {
            en: 'In a ten-person organization there is no “not my job.” That range — data to design to production — later became the shape of this portfolio.',
            zh: '在十人以下的組織裡，沒有「這不是我的工作」這句話。從資料、設計到產製的這個跨度，後來長成了這整本作品集的形狀。',
        },
    },
    {
        id: 'st3',
        chapterId: 'fj-c05',
        name: { en: 'MoHW Mental Health Center', zh: '衛福部心理衛生中心' },
        short: { en: 'MoHW Center', zh: '心衛中心' },
        sector: { en: 'Ministry-level health services', zh: '部級心理衛生服務' },
        size: { en: '30–100 staff', zh: '30–100 人' },
        role: { en: 'Project Assistant', zh: '計畫助理' },
        accent: '#B08D57', accentInk: '#6E5426', accentSoft: 'rgba(176,141,87,0.16)',
        landmark: 'civic',
        intro: {
            en: 'The third station scaled everything up: a mental-health center in the Ministry of Health and Welfare system. Same crafts — data, forms, web, events — but now with strategy on the table and other departments and institutions across it. I learned to design not just artifacts, but coordination.',
            zh: '第三站把一切放大：衛福部體系下的心理衛生中心。同樣的手藝——資料、表單、網站、活動——但桌上多了整體策略，桌子對面多了其他部門與機構。我學到的不只是設計產出物，而是設計「協作」這件事本身。',
        },
        duties: [
            { key: 'data', title: { en: 'Center-wide case statistics', zh: '個案資料統計與報告' }, body: { en: 'Organized, analyzed, and reported the center’s case data — the numbers behind its service decisions.', zh: '負責心衛中心個案資料的整理、分析與報告——服務決策背後的那些數字。' } },
            { key: 'web', title: { en: 'A website for people under stress', zh: '網頁設計與管理' }, body: { en: 'Managed the center’s web presence — content updates, navigation, visual clarity — for visitors who are looking for help on a hard day.', zh: '管理心衛中心網頁：內容更新、導覽動線、視覺呈現——為的是讓在難熬的日子裡求助的人，也能一眼找到路。' } },
            { key: 'form', title: { en: 'Forms that fit the case', zh: '諮詢諮商表單開發設計' }, body: { en: 'Developed and designed counseling intake forms differentiated by case type and consultation purpose — one size never fits a person in crisis.', zh: '依不同個案需求與諮詢目的，開發設計對應的諮詢諮商表單——因為「一體適用」從來不適用於身處危機的人。' } },
            { key: 'lecture', title: { en: 'Lectures, theme to follow-up', zh: '講座活動籌劃與跟進' }, body: { en: 'Planned public lectures end to end — theme design, guest invitations, venue, promotion — then ran the logistics and followed up on participant feedback.', zh: '端到端籌劃講座活動：主題設計、嘉賓邀請、場地安排、宣傳推廣——活動中扛後勤，活動後跟進參與者的回饋與需求。' }, todo: 'quantify: 場次／講者／參與人數' },
            { key: 'strategy', title: { en: 'Strategy with the team', zh: '整體策略與計劃制定' }, body: { en: 'Worked with the team on the center’s overall strategy and plans, aimed at raising service quality and satisfaction.', zh: '與團隊共同制定中心的整體策略和計劃，目標是提高服務品質與滿意度。' } },
            { key: 'crossorg', title: { en: 'Cross-institution resource mapping', zh: '跨部門與跨機構合作' }, body: { en: 'Coordinated with other departments and institutions to promote mental-health awareness — surveying and integrating the resources each unit could actually offer.', zh: '與其他部門和機構合作，推動心理健康意識與資源共享——調查並整合各單位實際可用的資源。' } },
        ],
        tags: [
            { en: 'Data & reporting', zh: '資料分析與統計報告' },
            { en: 'Web design & IA', zh: '網頁設計和導覽' },
            { en: 'Form optimization', zh: '表單設計和優化' },
            { en: 'Cross-org collaboration', zh: '跨機構協作' },
        ],
        fieldNote: {
            en: 'Ministry-level work taught me the difference between making a thing and making it land: the strategy, the partners, and the follow-up.',
            zh: '部級單位的工作教我分辨「做出來」和「落地」的差別：策略、夥伴，以及事後的跟進。',
        },
    },
];

// Chapter spine — `num` derives from array order so a chapter can be inserted
// without renumbering. Section ids fj-c0X are the ONLY ids exposed to
// projects.js (outcomeModules / evidenceSlots); style ids always end in -styles.
const CHAPTER_LIST = [
    { id: 'fj-c01', key: 'C01', badge: 'illustrative', title: { en: 'Before the console, the field', zh: '在儀表板之前，是田野' } },
    { id: 'fj-c02', key: 'C02', badge: 'real',          title: { en: 'Three stations, one route', zh: '三站，一條路' } },
    { id: 'fj-c03', key: 'C03', badge: 'reconstructed', title: { en: 'Station 1 · Mennonite Liming', zh: '第一站 · 門諾黎明' } },
    { id: 'fj-c04', key: 'C04', badge: 'reconstructed', title: { en: 'Station 2 · Children & Family Welfare', zh: '第二站 · 兒家協會' } },
    { id: 'fj-c05', key: 'C05', badge: 'reconstructed', title: { en: 'Station 3 · MoHW Mental Health Center', zh: '第三站 · 心衛中心' } },
    { id: 'fj-c06', key: 'C06', badge: 'real',          title: { en: 'The field album', zh: '田野相簿' } },
    { id: 'fj-c07', key: 'C07', badge: 'real',          title: { en: 'What the field carried forward', zh: '田野帶走的東西' } },
];
export const CHAPTERS = CHAPTER_LIST.map((c, i) => ({ ...c, num: String(i + 1).padStart(2, '0') }));

// Skill bridges — field craft → where it lives in the portfolio now.
// Link titles are looked up from PROJECTS at render time so they never drift.
export const SKILL_BRIDGES = [
    {
        key: 'data',
        from: { en: 'Case statistics & scale design', zh: '個案統計與量表設計' },
        note: { en: 'Three institutions of case data taught me to treat numbers as evidence with provenance — the discipline that now runs the data layers.', zh: '三個機構的個案資料教會我：數字是「有出處的證據」。這條紀律現在跑在所有資料層裡。' },
        links: [{ slug: 'deeptech-database', num: '02' }, { slug: 'ai-news-intelligence', num: '04' }, { slug: 'deepscout', num: '09' }],
    },
    {
        key: 'forms',
        from: { en: 'Counseling intake forms', zh: '諮詢諮商表單設計' },
        note: { en: 'Forms for people in distress grew into research instruments — the intake scale in PsyMatch is their direct descendant.', zh: '為受苦的人設計的表單，後來長成了研究工具——PsyMatch 的量表就是它的直系後代。' },
        links: [{ slug: 'psymatch', num: '08' }, { slug: 'ux-hmi-interaction-lab', num: '05' }],
    },
    {
        key: 'aac',
        from: { en: 'AAC communication aids', zh: 'AAC 溝通輔具' },
        note: { en: 'Designing for people whom standard interfaces exclude is accessibility in its rawest form — and mental-health care was the field it happened in.', zh: '為被一般介面排除的人設計，是最原始形態的無障礙設計——而它發生的場域，正是心理健康照護。' },
        links: [{ slug: 'ux-hmi-interaction-lab', num: '05' }, { slug: 'emobot-plus', num: '01' }],
    },
    {
        key: 'content',
        from: { en: 'Podcast & content production', zh: 'Podcast 與內容產製' },
        note: { en: 'Outline → record → edit → publish: the same pipeline now produces bilingual UX writing and case narration.', zh: '大綱→錄音→剪輯→上架：同一條產線，現在生產的是雙語 UX 文案與案例敘事。' },
        links: [{ slug: 'ai-news-intelligence', num: '04' }, { slug: 'deepscout', num: '09' }],
    },
    {
        key: 'ops',
        from: { en: 'Event ops & cross-org coordination', zh: '活動統籌與跨機構協作' },
        note: { en: 'Shipping an event and shipping a product need the same spine: plan, coordinate, follow through.', zh: '辦好一場活動和上線一個產品，需要同一條脊椎：規劃、協調、貫徹到底。' },
        links: [{ slug: 'ai-product-launch-os', num: '03' }, { slug: 'industry-strategy-platform', num: '06' }],
    },
];

// Real photo evidence shown in the field album. Files live in
// public/field-journey/ and are addressed through Vite's BASE_URL.
export const PHOTOS = [
    { id: 'ph-01', station: 'st1', src: '01-st1-liming-event.png', layout: 'portrait', aspectRatio: '14 / 19', title: { en: 'Liming Institution activity', zh: '黎明機構活動現場' }, note: { en: 'Supporting a resident during an institution activity.', zh: '在機構活動中協助服務對象。' } },
    { id: 'ph-02', station: 'st2', src: '02-st2-work-session.jpg', layout: 'work', aspectRatio: '4 / 3', title: { en: 'Association work session', zh: '兒家協會工作現場' }, note: { en: 'A working session with children and family materials.', zh: '與兒童及家庭主題材料一起工作的現場。' } },
    { id: 'ph-03', station: 'st2', src: '03-st2-association-event.jpg', layout: 'event', aspectRatio: '4 / 3', title: { en: 'Association event', zh: '兒家協會活動合照' }, note: { en: 'The team gathered at an association event.', zh: '協會活動中的團隊合照。' } },
];

// Shell copy — the paper zone's own header and chrome.
export const SHELL = {
    en: {
        eyebrow: 'Field journal · 2021 – 2023',
        title: 'Three stations before the dashboards',
        lead: 'Projects 01–09 are consoles, briefs, and design records. This page is where they came from: three years as a project assistant inside a hospital institution, a family-welfare association, and a ministry-level mental-health center. Scroll the route — the field notes, the artifacts, and the skills that walked out with me.',
        skipLink: 'Skip to journey map',
        railLabel: 'Journey',
        chapterLabel: 'Chapter',
        stationWord: 'STATION',
        noteLabel: 'FIELD NOTE',
    },
    zh: {
        eyebrow: '田野日誌 · 2021 – 2023',
        title: '在儀表板之前的三站田野',
        lead: '專案 01–09 是主控台、brief 與設計檔案。這一頁是它們的來處：三年計畫助理，走過醫院附設機構、社福協會與部級心衛中心。往下捲動這條路——田野筆記、產出物，以及那些跟著我走出來的能力。',
        skipLink: '跳至旅程地圖',
        railLabel: '旅程',
        chapterLabel: '章節',
        stationWord: 'STATION',
        noteLabel: '田野筆記',
    },
};
