// Registry + copy for the Brain, Mind & Learning evidence layer ("journal-paper" dialect).
// Everything inside the paper zone reads from this file. Chapter numbering follows
// CHAPTER_LIST array order — insert a chapter by editing that array only.
// `todo` fields are provenance hooks for the user's deepening pass (mirrored in
// AUDIT.md) and are NEVER rendered on the page.

// Two-tier authenticity vocabulary — same convention as the rest of the portfolio,
// trimmed to the two tiers this project actually needs (no reconstructed artifacts
// here — published research facts vs. representative/schematic visualizations).
export const BADGES = {
    real:         { term: 'REAL',         en: 'A published fact — from the thesis, the poster abstracts, or the job record.', zh: '已公開發表的事實——出自碩論、海報摘要，或工作紀錄。' },
    illustrative: { term: 'ILLUSTRATIVE', en: 'A representative / schematic visualization, not the raw statistic or coefficient.', zh: '示意性視覺化，並非原始統計值或係數。' },
};

// ---- Abstract + metadata (dark head) ---------------------------------------
export const ABSTRACT = {
    en: {
        eyebrow: 'Research record · 2023 – 2025',
        title: 'Brain, Mind & Learning',
        lead: 'Projects 01–10 are consoles, briefs, and field records. This page is the science underneath them: two years inside a cognitive-neuroscience lab, designing experiments that step outside the sterile button-press paradigm — and reading the brain with two methods most undergraduate labs never touch: functional connectivity mapping and machine-learning classification.',
        authors: 'Guan-Ting Ye · Nai-Feng Chen · Ting-Ting Chang',
        affiliation: 'Dept. of Psychology / Research Center for Mind, Brain, and Learning, National Chengchi University · Taiwan Mind and Brain Imaging Center',
        metaLine: 'TSCN 2025 · The Excellent Award — OHBM 2025 · Brisbane — M.S. Thesis, Psychology',
        abstractLabel: 'Abstract',
        abstractBody: 'Most of what cognitive neuroscience knows about attention comes from artificial tasks — a button press, a flashed image, a silent room. This work asked what happens if the stimulus is naturalistic instead: a real, continuous lecture, watched the way a person actually watches one. Across 43 participants, we contrasted a dynamic live instructor against a static-image instructor delivering the same content, then read the difference through two lenses that were the real innovation of the design: network-wise functional connectivity (Frontoparietal, Salience, and Default Mode networks) and a machine-learning classifier built on those connectivity features. The naturalistic condition produced a distinct connectivity signature — one strong enough that a leave-one-out classifier could tell learner groups apart from it. The finding travels beyond the classroom: naturalistic paradigms and connectivity-based classification are two of the more transferable tools this thesis leaves behind.',
        keywords: ['fMRI', 'Functional connectivity', 'Naturalistic paradigm', 'Machine-learning classification', 'Frontoparietal · Salience · Default Mode Networks'],
        keywordsLabel: 'Keywords',
    },
    zh: {
        eyebrow: '研究紀錄 · 2023 – 2025',
        title: 'Brain, Mind & Learning',
        lead: '專案 01–10 是主控台、brief 與田野紀錄。這一頁是它們底下的科學：兩年在認知神經科學實驗室，設計跳脫「按鍵反應」制式典範的實驗——並用兩套多數大學部實驗室不會碰的方法讀腦：功能性神經連結分析，以及機器學習分類。',
        authors: '葉冠廷 · Nai-Feng Chen · 張婷婷',
        affiliation: '國立政治大學心理學系／大腦與學習研究中心 · 台灣心智科學腦造影中心',
        metaLine: 'TSCN 2025 · 碩士論文優等獎 — OHBM 2025 · 布里斯本 — 碩士論文，心理學',
        abstractLabel: '摘要',
        abstractBody: '認知神經科學對注意力的理解，多半來自人工作業——一次按鍵、一張快閃圖片、一間安靜的房間。這項研究想知道：如果換成自然情境的刺激會怎樣——一段真實、連續的講課內容，用一個人實際觀看的方式去看它。我們招募 43 名受試者，比較動態真人講師與靜態圖像講師講授相同內容，再透過這項研究設計真正的創新之處——兩個分析視角——去解讀差異：網絡層級的功能性連結分析（額葉頂葉網絡、顯著性網絡、預設模式網絡），以及建立在這些連結特徵上的機器學習分類器。自然情境條件產生了獨特的連結型態——強到足以讓留一法交叉驗證分類器，從中區分出不同的學習者群組。這項發現的意義超越教室本身：自然情境典範與連結基礎的分類方法，是這篇論文留下最具可轉移性的兩項工具。',
        keywords: ['fMRI', '功能性連結', '自然情境典範', '機器學習分類', '額葉頂葉／顯著性／預設模式網絡'],
        keywordsLabel: '關鍵字',
    },
};

// ---- C03 · why a naturalistic paradigm (traditional vs. this design) ------
export const PARADIGM_CONTRAST = {
    heading: { en: 'Why design it this way', zh: '為什麼這樣設計' },
    lead: {
        en: 'Most connectivity studies still run on the oldest paradigm in the field: a controlled, repetitive, artificial task. This thesis deliberately traded some of that control for ecological validity.',
        zh: '大多數連結研究至今仍沿用這個領域最古老的典範：受控、重複、人工化的作業。這篇論文刻意用一部分「控制力」，換取生態效度。',
    },
    rows: [
        {
            dim: { en: 'Stimulus', zh: '刺激材料' },
            old: { en: 'Flashed images, tones, or button-press tasks', zh: '快閃圖片、聲音，或按鍵反應作業' },
            now: { en: 'A real, continuous lecture — dynamic or static', zh: '一段真實、連續的講課內容——動態或靜態' },
        },
        {
            dim: { en: 'Setting', zh: '情境' },
            old: { en: 'Repeated trials, isolated from context', zh: '重複試次，脫離情境脈絡' },
            now: { en: 'One continuous, naturalistic viewing experience', zh: '一段連續、貼近自然情境的觀看經驗' },
        },
        {
            dim: { en: 'Analysis lens', zh: '分析視角' },
            old: { en: 'Single-region activation, condition means', zh: '單一腦區活化、條件平均值比較' },
            now: { en: 'Network-wise functional connectivity (FPN · SN · DMN)', zh: '網絡層級功能性連結分析（FPN・SN・DMN）' },
        },
        {
            dim: { en: 'Inference', zh: '推論方法' },
            old: { en: 'Group-average statistical contrast', zh: '群組平均統計對比' },
            now: { en: 'Machine-learning classification, leave-one-out validated', zh: '機器學習分類，留一法交叉驗證' },
        },
    ],
};

// ---- C02 · The lab & the role: three responsibility clusters --------------
// Mirrors the three numbered sections of the actual RA job record.
export const RESPONSIBILITIES = [
    {
        key: 'collection',
        num: '01',
        title: { en: 'Experiment & data collection', zh: '實驗收案' },
        intro: {
            en: 'The floor of the lab: running MRI, cognitive, and physiological experiments end to end, for participants ranging from children to adults.',
            zh: '實驗室的第一線：從頭到尾執行 MRI、認知與生理實驗，受試者橫跨孩童到成人。',
        },
        duties: [
            { key: 'mri', title: { en: 'MRI, cognitive & physiological sessions', zh: 'MRI、認知、生理實驗執行' }, body: { en: 'Ran the full experimental workflow for MRI, cognitive, and physiological studies — every stage of session logistics, from participant briefing to data logging.', zh: '執行 MRI、認知與生理實驗的完整工作流程——從受試者說明到資料紀錄，參與每一個階段。' }, todo: 'quantify: 參與場次數／受試者總人次' },
            { key: 'equipment', title: { en: 'Equipment & materials', zh: '設備與材料協調' }, body: { en: 'Coordinated the equipment and materials each study needed — scanner scheduling, stimulus presentation setup, physiological recording gear.', zh: '協助安排各項實驗所需的設備和材料——掃描排程、刺激呈現設定、生理訊號紀錄器材。' } },
            { key: 'safety', title: { en: 'Child & adult protocol safety', zh: '孩童與成人的實驗安全與流程' }, body: { en: 'Owned the safety and procedural protocol across two very different participant populations — a child in an MRI bore and an adult in the same bore are not the same safety problem.', zh: '負責孩童與成人的實驗安全與流程——同一台掃描儀裡的孩童與成人，是完全不同的安全課題。' } },
            { key: 'ops', title: { en: 'Lab operations support', zh: '實驗室相關庶務支援' }, body: { en: 'Supported the operational work that keeps a research lab running between studies.', zh: '支援研究計畫之間，讓實驗室維持運作的相關庶務。' } },
        ],
        tags: [
            { en: 'MRI protocol', zh: 'MRI 流程' },
            { en: 'Participant safety', zh: '受試者安全' },
            { en: 'Session logistics', zh: '場次執行' },
        ],
    },
    {
        key: 'analysis',
        num: '02',
        title: { en: 'Data management & statistics', zh: '資料整理與統計' },
        intro: {
            en: 'Turning scanner output and behavioral logs into numbers someone can trust — and then into a picture someone can read.',
            zh: '把掃描機與行為紀錄的原始輸出，變成能被信任的數字——再變成能被讀懂的圖。',
        },
        duties: [
            { key: 'manage', title: { en: 'Experimental data management', zh: '實驗數據管理' }, body: { en: 'Managed experimental data across studies — organization, version control, and the unglamorous discipline that makes later analysis possible.', zh: '管理跨研究的實驗數據——整理、版本控管，以及讓後續分析得以進行的枯燥紀律。' } },
            { key: 'stats', title: { en: 'Statistical analysis & visualization', zh: '數據分析與資料視覺化' }, body: { en: 'Ran statistical analysis and built the visualizations that made the results legible to psychologists and non-specialists alike.', zh: '進行數據分析，並建立能讓心理師與非專業讀者都看得懂的資料視覺化。' } },
            { key: 'tools', title: { en: 'SPSS · R · Python · MATLAB', zh: 'SPSS、R、Python、Matlab' }, body: { en: 'Worked across the standard cognitive-neuroscience toolchain — SPSS for behavioral stats, R and Python for modeling and machine learning, MATLAB for signal- and neuroimaging-adjacent processing.', zh: '橫跨認知神經科學常用工具鏈——SPSS 做行為統計、R 與 Python 做建模與機器學習、Matlab 做訊號與神經影像相關處理。' } },
            { key: 'integrity', title: { en: 'Accuracy & completeness', zh: '準確性與完整性' }, body: { en: 'Owned data accuracy and completeness as a first-class deliverable, not an afterthought — the discipline every downstream statistic depends on.', zh: '把資料的準確性與完整性當成第一順位的產出，而非附帶項目——這是後續每一個統計數字都仰賴的紀律。' } },
        ],
        tags: [
            { en: 'SPSS / R / Python / MATLAB', zh: 'SPSS／R／Python／Matlab' },
            { en: 'Data visualization', zh: '資料視覺化' },
            { en: 'Data integrity', zh: '資料完整性' },
        ],
    },
    {
        key: 'reporting',
        num: '03',
        title: { en: 'Reporting & dissemination', zh: '報告撰寫與發表' },
        intro: {
            en: 'Where the numbers become an argument — for a journal, a conference room, or a funding committee.',
            zh: '數字變成一場論證的地方——面向期刊、會議室，或是評審委員會。',
        },
        duties: [
            { key: 'reports', title: { en: 'Professional academic reports', zh: '專業學術報告撰寫' }, body: { en: 'Wrote up experimental results and tracked research progress into reports the lab could act on and the center could report upward.', zh: '撰寫專業學術報告，彙總實驗結果並追蹤研究進度，供實驗室據以行動、中心據以上報。' } },
            { key: 'conferences', title: { en: 'Domestic & international conferences', zh: '國內外年會參與' }, body: { en: 'Presented and attended domestic and international annual meetings — TSCN in Taiwan, OHBM in Brisbane — the two anchors of this record.', zh: '參與國內外年會發表——台灣的 TSCN、澳洲布里斯本的 OHBM——是這份紀錄的兩個錨點。' } },
            { key: 'submission', title: { en: 'Journal submission', zh: '期刊投稿發表' }, body: { en: 'Carried findings toward journal submission — the last mile from a lab result to a citable claim.', zh: '把研究發現往期刊投稿推進——從實驗室結果到一則可被引用的主張，最後一哩路。' } },
        ],
        tags: [
            { en: 'Academic writing', zh: '學術寫作' },
            { en: 'Conference presentation', zh: '會議發表' },
            { en: 'Journal submission', zh: '期刊投稿' },
        ],
    },
];

// ---- C03 · Flagship study — design & method --------------------------------
export const STUDY = {
    title: { en: 'Decoding the Instructor Presence Effect', zh: '解碼講師臨場感效應' },
    subtitle: {
        en: 'A naturalistic fMRI paradigm, read through functional connectivity and machine learning',
        zh: '一項自然情境 fMRI 典範，透過功能性連結與機器學習來解讀',
    },
    question: {
        en: 'Instead of another artificial lab task, what if the stimulus were a real lecture — and the analysis a network-wise connectivity map read by a classifier, not a single condition mean?',
        zh: '如果不再是另一個人工實驗室作業，而是一段真實的講課內容——分析方式也換成用分類器讀取的網絡層級連結圖，而非單一條件平均值，會如何？',
    },
    background: {
        en: 'Most fMRI attention research still relies on repeated, artificial trials. This thesis used a naturalistic viewing paradigm instead — one continuous lecture, delivered two ways — specifically so the analysis could move past single-region activation and into network-wise functional connectivity and machine-learning classification, the two methodological innovations this study was built around.',
        zh: '多數 fMRI 注意力研究仍仰賴重複、人工化的試次設計。這篇論文改用自然情境觀看典範——一段連續講課內容、以兩種方式呈現——目的正是讓分析能跳脫單一腦區活化，進入這項研究真正圍繞的兩項方法論創新：網絡層級功能性連結分析，以及機器學習分類。',
    },
    participants: {
        n: '43',
        detail: { en: '34 female · mean age 23.19 (SD 3.79)', zh: '34 位女性 · 平均年齡 23.19（SD 3.79）' },
    },
    manipulation: {
        en: 'A within-content, between-format contrast: the same lecture content delivered by a dynamic live instructor in one condition, and a static instructor image in the other.',
        zh: '同一份講課內容、兩種呈現格式的對照：一組由動態真人講師講授，另一組僅呈現靜態講師圖像。',
    },
    pipeline: [
        { en: 'Research question', zh: '研究問題形成' },
        { en: 'Literature review', zh: '文獻回顧' },
        { en: 'Experimental design', zh: '實驗設計' },
        { en: 'Participant recruitment & data collection', zh: '受試者招募與資料收集' },
        { en: 'Preprocessing', zh: '資料前處理' },
        { en: 'Statistical analysis', zh: '統計分析' },
        { en: 'Visualization', zh: '結果視覺化' },
        { en: 'Interpretation', zh: '研究詮釋' },
    ],
    analyses: [
        { en: 'Connectivity contrast between live and static conditions', zh: '計算真人／靜態兩條件間的腦網絡連結差異' },
        { en: 'Connectivity strength vs. behavioral engagement', zh: '探討連結強度與行為投入之關聯' },
        { en: 'Machine-learning prediction of engagement from neural connectivity', zh: '以神經連結資料透過機器學習預測學習投入' },
    ],
    note: {
        en: 'A multivariate, cross-modal integration of fMRI functional-connectivity data with behavioral performance — the discipline of treating high-dimensional data as evidence with an interpretable structure, not just a number.',
        zh: '將 fMRI 功能性連結資料與行為表現資料進行多變量、跨模態整合——把高維度資料當成「有可解釋結構的證據」，而不只是一個數字的那份紀律。',
    },
};

// ---- C04 · A novel lens: functional connectivity ---------------------------
// Real figures from the actual analysis (public/brain-and-learning/) replace
// any custom-built data visualization. No raw statistics are surfaced here —
// only the qualitative direction of the finding, which is already published.
export const FUNCTIONAL_CONNECTIVITY = {
    procedureImage: 'functional-connectivity-procedure.png',
    labImage: 'lab-activation-maps.png',
    lead: {
        en: 'The methodological bet of this thesis: instead of asking "which single region lit up," ask how three whole networks talk to each other — the Frontoparietal Network (executive attention), the Salience Network (what deserves attention), and the Default Mode Network (internally-directed thought).',
        zh: '這篇論文的方法論賭注：與其問「哪一個腦區亮了」，不如問三個完整網絡彼此如何對話——額葉頂葉網絡（執行注意力）、顯著性網絡（判斷什麼值得注意），以及預設模式網絡（向內的思緒）。',
    },
    procedureCaption: {
        en: 'Network-wise functional connectivity — the actual analysis diagram from the thesis. Each arrow is a connectivity pathway computed between network-level activation, not a single-voxel comparison.',
        zh: '網絡層級功能性連結分析——論文中實際使用的分析示意圖。每一支箭頭代表在網絡層級活化之間計算出的連結路徑，而非單一體素的比較。',
    },
    labCaption: {
        en: 'Group-level activation underlying each network (A · Frontoparietal, B · Salience, C · Default Mode) — axial, sagittal, and coronal views from the real analysis.',
        zh: '各網絡對應的群體層級活化圖（A・額葉頂葉，B・顯著性，C・預設模式）——來自實際分析的橫斷面、矢狀面與冠狀面影像。',
    },
    finding: {
        en: 'The naturalistic, dynamic-instructor condition produced a measurably different connectivity signature between these networks than the static condition — a direction the thesis reports without needing to name every coefficient here.',
        zh: '自然情境、動態講師條件下，這些網絡之間產生了與靜態條件可量測的不同連結型態——這是論文報告的方向，細節係數則不在此逐一揭露。',
    },
};

// ---- C05 · A novel lens: machine-learning classification -------------------
export const ML_CLASSIFICATION = {
    procedureImage: 'ml-procedure.png',
    lead: {
        en: 'The second bet: don\'t stop at "the groups differ on average" — ask whether a classifier, trained only on connectivity features, can tell individuals apart at all.',
        zh: '第二個賭注：不只停在「兩組平均值不同」——而是問，一個只用連結特徵訓練出來的分類器，究竟能不能把個體區分開來。',
    },
    steps: [
        { en: 'Median split into high/low groups', zh: '以中位數切分高／低兩組' },
        { en: 'Feature selection via recursive feature elimination (RFE)', zh: '透過遞迴特徵消除法（RFE）進行特徵選取' },
        { en: 'Leave-one-out cross-validation', zh: '留一法交叉驗證' },
        { en: 'Logistic regression classifier', zh: '邏輯迴歸分類器' },
        { en: 'Evaluated via ROC / AUC', zh: '以 ROC／AUC 評估表現' },
    ],
    procedureCaption: {
        en: 'The actual classification pipeline and diagnostics from the thesis — median-split groups, RFE feature ranking, leave-one-out folds, the fitted logistic curve, the ROC curve, and the resulting group separation. Exact accuracy figures are intentionally left off this page; what matters here is that the pipeline is real, and it separated the groups better than chance.',
        zh: '論文中實際的分類流程與診斷圖——中位數分組、RFE 特徵排序、留一法折疊、擬合的邏輯曲線、ROC 曲線，以及最終的分組結果。此頁刻意不揭露精確準確率數字；重點在於這條流程是真實的，且分類結果優於機率水準。',
    },
    finding: {
        en: 'Connectivity-based classification is the more transferable half of this thesis — the same pipeline (feature selection → cross-validation → classifier → ROC) applies well beyond a lecture hall, to any problem where a group difference needs to become an individual-level prediction.',
        zh: '以連結為基礎的分類方法，是這篇論文更具可轉移性的一半——同一條流程（特徵選取→交叉驗證→分類器→ROC）遠遠不只適用於講堂，任何需要把「群組差異」變成「個體層級預測」的問題都用得上。',
    },
};

// ---- C06 · TSCN 2025 --------------------------------------------------------
export const TSCN = {
    name: { en: '2025 Taiwan Society for Cognitive Neuroscience Annual Meeting', zh: '2025 年台灣認知神經科學年會（TSCN Annual Meeting 2025）' },
    dateRange: '2025/10 – 2025/11',
    award: { en: 'The Excellent Award — Master’s Thesis', zh: '碩士論文優等獎 · The Excellent Award' },
    tags: [
        { en: 'Cognitive neuroscience research', zh: '認知神經科學研究' },
        { en: 'Cross-modal data analysis', zh: '跨模態資料分析' },
    ],
    points: [
        { en: 'Presented the thesis research as an oral talk, focused on multimodal neural data, learning performance, and instructor presence in online teaching.', zh: '以口頭報告發表碩士論文研究，聚焦多模態神經資料、學習表現與線上教學情境中講師臨場感之關聯。' },
        { en: 'Integrated behavioral data, subjective engagement indices, and fMRI data to examine how presentation format shapes learning outcomes and brain functional connectivity.', zh: '整合行為資料、主觀投入指標與 fMRI 資料，探討不同教學呈現方式對學習成效與大腦功能性連結的影響。' },
        { en: 'Ran the complete research pipeline — question, literature, design, data collection, preprocessing, statistics, visualization, interpretation.', zh: '實作完整研究流程：問題形成、文獻回顧、實驗設計、資料收集、前處理、統計分析、視覺化與詮釋。' },
        { en: 'Presented a poster session, exchanging with researchers across cognitive neuroscience, psychology, and education technology.', zh: '進行海報展示，與認知神經科學、心理學、教育科技背景研究者交流。' },
        { en: 'Won The Excellent Award, recognizing research design, data analysis, interpretation, and academic contribution.', zh: '榮獲 The Excellent Award（碩士論文優等獎），肯定研究設計、資料分析、結果詮釋與學術貢獻。' },
    ],
    bridge: {
        en: 'This research foundation extends directly into UX Research, Human Factors Research, Learning Experience Design, data-driven product research, and human–computer interaction design.',
        zh: '這份研究基礎可直接延伸至 UX Research、Human Factors Research、Learning Experience Design、Data-driven Product Research 與人機互動設計。',
    },
    image: 'tscn-award-ceremony.png',
    imageCaption: {
        en: 'Receiving The Excellent Award at the TSCN 2025 poster session.',
        zh: '於 TSCN 2025 海報發表現場獲頒 The Excellent Award。',
    },
};

// ---- C07 · OHBM 2025 --------------------------------------------------------
export const OHBM = {
    name: { en: '2025 Annual Meeting of the Organization for Human Brain Mapping (OHBM)', zh: '2025 年度國際神經影像學術會議 OHBM Annual Meeting' },
    location: { en: 'Brisbane, Australia', zh: '澳洲布里斯本' },
    dateRange: '2025/06 – 2025/06',
    acceptedDate: { en: 'Abstract accepted February 2025', zh: '摘要於 2025 年 2 月獲官方審查接受' },
    posterTitle: 'Instructor presence enhanced learning and strengthened FPN–SN connectivity during online lecture',
    tags: [
        { en: 'International neuroimaging presentation', zh: '國際神經影像學術發表' },
        { en: 'Naturalistic fMRI paradigm', zh: '自然情境 fMRI 典範' },
    ],
    points: [
        { en: 'Presented a poster at the international neuroimaging conference, built around the same two methodological bets: a naturalistic viewing paradigm, and network-wise functional connectivity as the analysis lens.', zh: '於國際神經影像學術會議發表研究海報，圍繞同樣的兩項方法論賭注：自然情境觀看典範，以及以網絡層級功能性連結作為分析視角。' },
        { en: 'Integrated psychology, cognitive neuroscience, and education-technology perspectives to examine how a dynamic, naturalistic stimulus reshapes Frontoparietal and Salience Network connectivity.', zh: '整合心理學、認知神經科學與教育科技觀點，探討動態自然情境刺激如何重塑額葉頂葉網絡與顯著性網絡的連結。' },
        { en: 'Contributed to experimental design, protocol planning, behavioral data organization, fMRI analysis, and statistical modeling — a cross-modal integration of behavioral and neuroimaging data.', zh: '參與研究設計、實驗流程規劃、行為資料整理、fMRI 分析與統計建模，將行為與神經影像資料跨模態整合。' },
        { en: 'Used statistical and machine-learning methods to examine how connectivity features relate to individual differences — the same classification approach detailed in Chapter 05.', zh: '運用統計分析與機器學習方法，檢視神經連結特徵與個體差異之關聯——與第 05 章詳述的分類方法一致。' },
    ],
    authors: 'Guan-Ting Ye · Nai-Feng Chen · Ting-Ting Chang',
    affiliation: { en: 'Dept. of Psychology / Research Center for Mind, Brain, and Learning, National Chengchi University, Taipei, Taiwan', zh: '國立政治大學心理學系／大腦與學習研究中心，台灣台北' },
    logo: 'ohbm-logo.png',
    image: 'ohbm-poster-session.png',
    imageCaption: {
        en: 'Presenting the poster in Brisbane, June 2025.',
        zh: '2025 年 6 月於布里斯本發表海報現場。',
    },
};

// ---- Chapter spine — `num` derives from array order. Section ids bl-c0X are
// the ONLY ids exposed to projects.js (outcomeModules / evidenceSlots); style
// ids always end in -styles.
const CHAPTER_LIST = [
    { id: 'bl-c01', key: 'C01', badge: 'illustrative', title: { en: 'The question behind the dashboards', zh: '儀表板背後的提問' }, short: { en: 'Question', zh: '提問' } },
    { id: 'bl-c02', key: 'C02', badge: 'real',          title: { en: 'The lab, the center, the role', zh: '實驗室、造影中心與角色' }, short: { en: 'Lab & Role', zh: '實驗室與角色' } },
    { id: 'bl-c03', key: 'C03', badge: 'real',          title: { en: 'The flagship study — design & method', zh: '旗艦研究 · 設計與方法' }, short: { en: 'Method', zh: '研究方法' } },
    { id: 'bl-c04', key: 'C04', badge: 'real',          title: { en: 'A novel lens: functional connectivity', zh: '新穎視角：功能性連結分析' }, short: { en: 'Functional Connectivity', zh: '功能性連結' } },
    { id: 'bl-c05', key: 'C05', badge: 'real',          title: { en: 'A novel lens: machine-learning classification', zh: '新穎視角：機器學習分類' }, short: { en: 'ML Classification', zh: '機器學習分類' } },
    { id: 'bl-c06', key: 'C06', badge: 'real',          title: { en: 'TSCN 2025 · The Excellent Award', zh: 'TSCN 2025 · 優等獎' }, short: { en: 'TSCN 2025', zh: 'TSCN 2025' } },
    { id: 'bl-c07', key: 'C07', badge: 'real',          title: { en: 'OHBM 2025 · Brisbane', zh: 'OHBM 2025 · 布里斯本' }, short: { en: 'OHBM 2025', zh: 'OHBM 2025' } },
    { id: 'bl-c08', key: 'C08', badge: 'real',          title: { en: 'What\'s still on its way', zh: '還在路上的紀錄' }, short: { en: 'Field Record', zh: '田野紀錄' } },
    { id: 'bl-c09', key: 'C09', badge: 'real',          title: { en: 'From scanner to interface', zh: '從掃描室到介面' }, short: { en: 'Bridge', zh: '技能橋接' } },
];
export const CHAPTERS = CHAPTER_LIST.map((c, i) => ({ ...c, num: String(i + 1).padStart(2, '0') }));

// Skill bridges — research craft → where it lives in the portfolio now.
// Link titles are looked up from PROJECTS at render time so they never drift.
export const SKILL_BRIDGES = [
    {
        key: 'attention',
        from: { en: 'Attention & cognitive-load measurement', zh: '注意力與認知負荷量測' },
        note: { en: 'Reading fMRI attention signals taught me to read interface attention signals — the same instinct now runs the accessibility and interaction-lab work.', zh: '讀 fMRI 注意力訊號的訓練，變成讀介面注意力訊號的本能——這個直覺現在跑在無障礙與互動實驗室的工作裡。' },
        links: [{ slug: 'ux-hmi-interaction-lab', num: '05' }, { slug: 'emobot-plus', num: '01' }],
    },
    {
        key: 'data',
        from: { en: 'Multivariate, cross-modal data integration', zh: '多變量跨模態資料整合' },
        note: { en: 'fMRI connectivity plus behavioral data is a high-dimensional integration problem — the exact discipline now running the data and evidence layers.', zh: 'fMRI 連結資料加上行為資料，本質是一個高維度整合問題——這正是現在跑在資料與證據層裡的那套紀律。' },
        links: [{ slug: 'deeptech-database', num: '02' }, { slug: 'deepscout', num: '09' }],
    },
    {
        key: 'instruments',
        from: { en: 'Scale design & research instruments', zh: '量表設計與研究工具' },
        note: { en: 'A validated psychological instrument and a well-designed intake form solve the same problem — ask the right thing, in the right order.', zh: '一份經過驗證的心理量表，和一張設計良好的表單，解決的是同一個問題：用對的順序問對的事。' },
        links: [{ slug: 'psymatch', num: '08' }],
    },
    {
        key: 'ml',
        from: { en: 'Statistics & machine-learning modeling', zh: '統計與機器學習建模' },
        note: { en: 'Predicting engagement from connectivity is a modeling problem before it is a neuroscience one — the reasoning transfers directly to product analytics.', zh: '用連結資料預測投入，本質上先是一個建模問題，才是神經科學問題——這套推理可以直接轉移到產品分析。' },
        links: [{ slug: 'ai-news-intelligence', num: '04' }, { slug: 'startup-intelligence-platform', num: '07' }],
    },
];

// Photo/plate slots — what's still genuinely pending. The award, the poster,
// the OHBM banner, and both methodology figures are real and now embedded
// inline in C06/C07/C04/C05; `src` stays null here until a real scan lands in
// public/brain-and-learning/ for these two remaining slots.
export const PHOTOS = [
    { id: 'ph-01', chapter: 'C03', src: null, title: { en: 'Scanner room / session setup', zh: '掃描室 / 收案現場' }, note: { en: 'Where the fMRI sessions actually ran.', zh: 'fMRI 收案實際進行的場地。' } },
    { id: 'ph-02', chapter: 'C08', src: null, title: { en: 'Lab team', zh: '實驗室團隊' }, note: { en: 'The people behind the pipeline.', zh: '產線背後的人。' } },
];

// Shell copy — the paper zone's own header and chrome.
export const SHELL = {
    en: {
        railLabel: 'Contents',
        chapterLabel: 'Chapter',
        figureLabel: 'Figure',
        noteLabel: 'RESEARCH NOTE',
        skipLink: 'Skip to table of contents',
    },
    zh: {
        railLabel: '目錄',
        chapterLabel: '章',
        figureLabel: '圖',
        noteLabel: '研究筆記',
        skipLink: '跳至目錄',
    },
};
