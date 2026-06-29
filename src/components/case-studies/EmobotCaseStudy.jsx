import React, { useState, useRef, useEffect } from 'react';
import Icon from '../ui/Icon.jsx';

export default function EmobotCaseStudy({ lang }) {
  const PA = lang === 'zh';
  const [activePersona, setActivePersona] = useState(0);
  const archWrapRef = useRef(null);
  const [archScale, setArchScale] = useState(1);
  useEffect(() => {
    const el = archWrapRef.current;
    if (!el) return;
    const update = () => setArchScale(Math.min(1, el.getBoundingClientRect().width / 1260));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pick = (item, key) => {
    const zhKey = 'zh' + key.charAt(0).toUpperCase() + key.slice(1);
    return PA && item[zhKey] ? item[zhKey] : item[key];
  };

  const proof = [
    { num: 'Silver', label: 'Award Signal', zhLabel: '獎項證據', desc: '2025 AI Interdisciplinary Sustainability Innovation Contest', zhDesc: '2025 AI 跨域永續創新競賽銀獎' },
    { num: '23.1%', label: 'Student Need', zhLabel: '學生需求', desc: 'High depressive tendency cited in the proposal context', zhDesc: '提案脈絡引用大學生高憂鬱傾向比例' },
    { num: '24/7', label: 'Support Layer', zhLabel: '支持層', desc: 'Always-available, low-threshold emotional check-in', zhDesc: '全天候、低門檻的情緒檢核與陪伴入口' },
  ];

  const liveProjectUrl = 'https://emobot-plus.vercel.app';
  const iaicReportUrl = 'https://iaic.nccu.edu.tw/achievements/60';
  const awardVideoUrl = 'https://www.youtube.com/watch?v=3wb-ZB9ALIg';

  const mediaLinks = [
    { kind: 'Interview', zhKind: '專訪報導', title: 'NCCU IAIC feature', zhTitle: '政大 AI 中心專訪', desc: 'Published 2026-01-20', zhDesc: '2026-01-20 發佈', href: iaicReportUrl },
    { kind: 'Live build', zhKind: '實際專案', title: 'Emobot+ prototype', zhTitle: 'Emobot+ 線上原型', desc: 'Open the deployed product', zhDesc: '開啟 Vercel 實際作品', href: liveProjectUrl },
    { kind: 'Award proof', zhKind: '得獎佐證', title: 'Contest video', zhTitle: '競賽得獎影片', desc: 'Watch on YouTube', zhDesc: '前往 YouTube 觀看', href: awardVideoUrl },
  ];

  const problems = [
    { iconKey: 'heart', title: 'Hidden Distress', zhTitle: '隱性心理壓力', body: 'Students often avoid formal help because of stigma, self-denial, or fear that their issue is not serious enough. The product starts with everyday language instead of a clinical intake form.', zhBody: '學生常因污名、自我否認或覺得問題不夠嚴重而延後求助。產品以日常語言開始，而不是一開始就要求臨床式填表。' },
    { iconKey: 'activity', title: 'Counseling Bottleneck', zhTitle: '諮商量能瓶頸', body: 'Campus counseling teams face long queues and limited session capacity. Emobot+ creates a pre-counseling layer that helps users organize emotions before professional support.', zhBody: '校園諮商端面臨排程等待與接案量能限制。Emobot+ 建立諮商前支持層，協助使用者先整理情緒與問題脈絡。' },
    { iconKey: 'shield', title: 'Weak Risk Continuity', zhTitle: '風險追蹤斷點', body: 'Most tools answer one message at a time. The proposal reframed safety as longitudinal tracking: emotional trend, issue tags, risk phrases, and consent-based escalation.', zhBody: '多數工具只回覆單次訊息。提案將安全性重構為長期追蹤：情緒趨勢、議題標籤、風險語句與同意制轉介。' },
  ];

  const swot = [
    { iconKey: 'award', label: 'Strengths', zhLabel: 'Strengths 優勢', points: ['Trait-matched support instead of one-size-fits-all chat', 'Avatar and voice direction increases emotional presence', 'Anonymous, low-threshold entry reduces help-seeking pressure'], zhPoints: ['心理特質智慧媒合，提供個人化支持體驗', '擬人化視覺與語音互動，提升沉浸感與情感連結', '即時、匿名、低進入門檻，降低心理防衛與求助壓力'] },
    { iconKey: 'shield', label: 'Weaknesses', zhLabel: 'Weaknesses 弱點', points: ['AI support still needs trust calibration', 'Matching quality depends on long-term feedback data', 'Technical development and safety governance are costly'], zhPoints: ['使用者對 AI 數位心理支持的信任仍需建立', '精準媒合需要長期優化與足夠資料量', '技術研發、安全治理與維運成本較高'] },
    { iconKey: 'trend', label: 'Opportunities', zhLabel: 'Opportunities 機會', points: ['Mental-health demand continues to grow globally', 'Schools and public agencies need preventive support systems', 'Most AI companions still lack structured referral architecture'], zhPoints: ['全球心理健康市場需求持續成長', '政府與教育單位推動心理健康促進與防治計畫', '現有 AI 陪伴產品仍缺乏完整心理支持與轉介架構'] },
    { iconKey: 'target', label: 'Threats', zhLabel: 'Threats 威脅', points: ['Ethical and regulatory expectations for AI intervention', 'Fast-moving AI companion competitors', 'Habit formation and sustainable business model risk'], zhPoints: ['AI 介入心理支持涉及法規與倫理挑戰', '競爭者快速跟進，產品差異化需要持續深化', '使用者接受度、習慣養成與商業模式仍需驗證'] },
  ];

  const solutions = [
    { index: '01', iconKey: 'heart', title: 'Low-threshold Companion', zhTitle: '低門檻陪伴入口', body: 'A non-judgmental dialogue surface for self-disclosure, emotional labeling, grounding prompts, and self-awareness before the user is ready to seek formal help.', zhBody: '建立非評價式對話介面，支持自我揭露、情緒標記、穩定練習與自我覺察，讓使用者在正式求助前也有安全出口。', tags: ['Self-disclosure', 'CASA', 'Daily check-in'] },
    { index: '02', iconKey: 'target', title: 'Trait-matched AI Persona', zhTitle: '特質媒合 AI 人設', body: 'Psychological scales and conversation history become a need vector that selects a companion style, not a diagnosis. The match can adapt as user feedback and emotion patterns change.', zhBody: '心理量表與對話歷程轉為需求向量，用來媒合陪伴風格，而不是診斷。媒合結果可隨回饋與情緒模式動態調整。', tags: ['Attachment', 'DERS', 'Needs vector'] },
    { index: '03', iconKey: 'shield', title: 'Safety-aware Handoff', zhTitle: '風險感知銜接', body: 'Risk phrase detection, topic labels, and emotional trends feed a structured counselor summary when consent is granted, reducing the friction between AI support and human care.', zhBody: '風險語句偵測、議題標籤與情緒趨勢在使用者同意後整理成諮商摘要，降低 AI 支持與真人照護之間的銜接成本。', tags: ['Risk routing', 'Consent', 'Counselor report'] },
  ];

  const sysArchZones = [
    {
      id: 'client', zoneClass: 'zone-client',
      tag: 'Client Interface', zhTag: '客戶端介面',
      proto: 'HTTPS / WebSocket',
      nodes: [
        { iconKey: 'monitor', label: 'React Web App', zhLabel: 'React Web 應用', tech: 'TypeScript + Vite' },
        { iconKey: 'globe', label: 'Mobile Client', zhLabel: '行動用戶端', tech: 'Responsive PWA' },
        { iconKey: 'briefcase', label: 'Counselor Portal', zhLabel: '諮商師後台', tech: 'Role-based dashboard' },
      ],
    },
    {
      id: 'gateway', zoneClass: 'zone-gw',
      tag: 'Gateway Layer', zhTag: '閘道器層',
      proto: 'REST + JWT Auth',
      nodes: [
        { iconKey: 'shield', label: 'Nginx', zhLabel: 'Nginx', tech: 'TLS · rate limit · load balance' },
      ],
    },
    {
      id: 'core', zoneClass: 'zone-core',
      tag: 'Core API Layer', zhTag: '核心 API 層',
      proto: null,
      nodes: [
        { iconKey: 'zap', label: 'FastAPI Gateway', zhLabel: 'FastAPI 閘道', tech: 'Python async server' },
        { iconKey: 'layers', label: 'Auth & Session', zhLabel: '認證與 Session', tech: 'JWT + Redis sessions' },
        { iconKey: 'activity', label: 'Orchestrator', zhLabel: '請求協調器', tech: 'Persona routing logic' },
      ],
    },
  ];

  const sysArchServices = [
    {
      id: 'psych', colClass: 'svc-psych',
      tag: 'Psychological Engine', zhTag: '心理推論引擎',
      nodes: [
        { iconKey: 'heart', name: 'MBTI + DERS + ERQ + BPNS', desc: 'Multi-scale trait signal capture', zhDesc: '多量表特質訊號擷取模組' },
        { iconKey: 'target', name: 'Siamese Network', desc: 'Trait similarity matching model', zhDesc: '特質相似度比對模型' },
        { iconKey: 'chart', name: 'Bayesian Inference', desc: 'Probabilistic persona matching', zhDesc: '機率式人設媒合推論演算' },
        { iconKey: 'database', name: 'PostgreSQL', desc: 'User profile + psych data store', zhDesc: '使用者資料與心理量表數據庫' },
      ],
    },
    {
      id: 'ai', colClass: 'svc-ai',
      tag: 'AI Interaction Module', zhTag: 'AI 互動模組',
      nodes: [
        { iconKey: 'cpu', name: 'LLM + Prompt Engine', desc: 'Persona-specific dialogue gen', zhDesc: '人設導向對話生成引擎' },
        { iconKey: 'book', name: 'BERT + NRC Lexicon', desc: 'Real-time emotion classifier', zhDesc: '即時情緒分類與主題偵測' },
        { iconKey: 'trend', name: 'TTS + Avatar API', desc: 'D-ID / HeyGen voice & avatar', zhDesc: 'D-ID / HeyGen 語音與虛擬形象' },
        { iconKey: 'shield', name: 'Risk Detector', desc: 'High-risk phrase flagging', zhDesc: '高風險語句即時標記系統' },
      ],
    },
    {
      id: 'data', colClass: 'svc-data',
      tag: 'Data Infrastructure', zhTag: '資料基礎設施',
      nodes: [
        { iconKey: 'zap', name: 'Redis Cache', desc: 'Session state + pub/sub', zhDesc: 'Session 狀態管理與 Pub/Sub' },
        { iconKey: 'database', name: 'PostgreSQL', desc: 'Relational data + profiles', zhDesc: '關聯式資料庫 + 使用者資料' },
        { iconKey: 'layers', name: 'S3 Object Store', desc: 'Media + model artifacts', zhDesc: '媒體儲存與模型 Artifacts' },
        { iconKey: 'trend', name: 'ETL Pipeline', desc: 'Analytics export + ETL', zhDesc: '分析輸出與資料轉換流水線' },
      ],
    },
  ];

  const archPipeline = [
    {
      num: '1', title: 'Frontend Layer', zhTitle: '前端體驗層', sub: 'React + JavaScript',
      nodes: [
        { tech: 'Figma + Framer Motion', fn: 'UI wireframing, component design and micro-interaction prototyping', zhFn: '介面設計、元件規劃與微互動原型建立' },
        { tech: 'React Router + Axios', fn: 'Route management, application state and API data-layer integration', zhFn: '路由架構、應用狀態管理與 API 資料層整合' },
        { tech: 'Tailwind CSS + Styled Components', fn: 'Responsive design system and immersive dark-mode visual layer', zhFn: '響應式設計系統與沉浸式深色模式視覺體驗層' },
      ],
    },
    {
      num: '2', title: 'Backend & Data', zhTitle: '後端資料層', sub: 'Python + FastAPI',
      nodes: [
        { tech: 'MBTI + DERS + ERQ + BPNS', fn: 'Psychological scale integration as trait signal modules for support matching', zhFn: '心理量表整合為特質訊號模組，驅動個人化媒合邏輯' },
        { tech: 'Siamese Net + Bayesian Inference', fn: 'Similarity-based trait-to-persona matching and recommendation algorithm', zhFn: '特質相似度運算與貝葉斯推論驅動的個人化媒合演算法' },
        { tech: 'Pandas + NumPy + PyTorch', fn: 'Data vectorization, statistical modeling and model training pipeline', zhFn: '資料向量化、統計建模與 PyTorch 模型訓練流程' },
      ],
    },
    {
      num: '3', title: 'AI Interaction Module', zhTitle: 'AI 互動模組', sub: 'LLM + NLP Pipeline',
      nodes: [
        { tech: 'LLM + Prompt Engineering', fn: 'Persona-specific dialogue generation, tone control and support style pacing', zhFn: '依人設調整的對話生成、語氣節奏與支持風格控制' },
        { tech: 'TTS + Avatar Animation API', fn: 'D-ID and HeyGen voice and dynamic avatar multimodal presence direction', zhFn: '語音合成與動態虛擬形象的多模態臨場感整合方向' },
        { tech: 'BERT + NRC Emotion Lexicon', fn: 'Real-time emotion classification, issue tagging and risk phrase detection', zhFn: '即時情緒分類、議題標籤偵測與高風險語句辨識模型' },
      ],
    },
  ];

  const architectureColumns = [
    {
      num: '1',
      title: 'Frontend System',
      zhTitle: '前端系統架構',
      sub: 'React + JavaScript',
      nodes: [
        { top: 'Figma + Framer Motion', bottom: 'User interface design and interaction planning', zhBottom: '使用者介面設計與互動規劃' },
        { top: 'React Router + Axios', bottom: 'Route, state, and API connection framework', zhBottom: '系統框架管理與資料串接' },
        { top: 'Tailwind CSS + styled components', bottom: 'Immersive visual layer and responsive components', zhBottom: '視覺化沉浸體驗與響應式元件' },
      ],
    },
    {
      num: '2',
      title: 'Backend Data Processing',
      zhTitle: '後端資料處理',
      sub: 'Python + FastAPI',
      nodes: [
        { top: 'MBTI + DERS + ERQ + BPNS', bottom: 'Psychological signal and trait module', zhBottom: '心理測驗與特質訊號模組' },
        { top: 'Siamese Net + Bayesian Inference', bottom: 'Personalized matching algorithm direction', zhBottom: '個人化推薦與媒合演算法方向' },
        { top: 'Pandas + NumPy + PyTorch', bottom: 'Data vectorization and model training pipeline', zhBottom: '資料向量化與模型訓練流程' },
      ],
    },
    {
      num: '3',
      title: 'AI Interaction Module',
      zhTitle: 'AI 互動模組',
      sub: 'Python + FastAPI',
      nodes: [
        { top: 'LLM + Prompt Engineering', bottom: 'Language generation and support-tone control', zhBottom: '語言模組生成與支持語氣控制' },
        { top: 'TTS + Avatar Animation API', bottom: 'Dynamic AI avatar and multimodal presence', zhBottom: 'AI avatar 動態影像與多模態臨場感' },
        { top: 'BERT + NRC Emotion Lexicon', bottom: 'Emotion recognition and risk classification', zhBottom: '情緒辨識與風險分類' },
      ],
    },
  ];

  const flow = [
    { title: 'Anonymous Entry', zhTitle: '匿名入口', body: 'The first screen avoids diagnostic pressure and invites a small emotional check-in.', zhBody: '首屏避免診斷壓力，以低壓的情緒檢核開啟互動。' },
    { title: 'Trait Signal', zhTitle: '特質訊號', body: 'MBTI, attachment style, emotion regulation, and basic psychological needs form a lightweight support profile.', zhBody: 'MBTI、依附風格、情緒調節與基本心理需求形成輕量支持輪廓。' },
    { title: 'Companion Session', zhTitle: '陪伴對話', body: 'The selected persona adjusts tone, structure, and support mode across text, audio, and avatar-ready surfaces.', zhBody: '被媒合的人設會調整語氣、結構與支持方式，對應文字、語音與虛擬形象介面。' },
    { title: 'Insight & Referral', zhTitle: '洞察與轉介', body: 'Emotion-topic analysis creates trends, issue labels, risk flags, and counselor-ready summaries with consent.', zhBody: '情緒議題分析整理趨勢、議題標籤、風險旗標與同意制諮商摘要。' },
  ];

  const journey = [
    { iconKey: 'heart', title: 'Contact & Guidance', zhTitle: '接觸與引導', body: 'Anonymous login, simple consent language, and a gentle entry prompt frame the experience as digital support and self-exploration.', zhBody: '匿名登入、簡明同意條款與柔性入口提示，將體驗定位為數位情緒支持與自我探索。', purpose: 'Lower defense and help-seeking pressure', zhPurpose: '降低心理防衛與求助壓力' },
    { iconKey: 'target', title: 'Matching Algorithm', zhTitle: '媒合演算法', body: 'Psychological scales and early dialogue signals become trait vectors that map users to a better-fit companion style.', zhBody: '心理測驗與早期對話訊號轉為特徵向量，媒合更適合的 AI 陪伴風格。', purpose: 'Understand trait and support needs', zhPurpose: '理解使用者特質與支持需求' },
    { iconKey: 'cpu', title: 'AI Companion', zhTitle: 'AI 互動陪伴', body: 'The system adapts language, response length, emotional tone, and optional avatar presentation during conversation.', zhBody: '系統在對話中調整語言、回覆長度、情緒語氣與可選虛擬形象呈現。', purpose: 'Build trust, emotional support, and early insight', zhPurpose: '建立信任、情緒陪伴與初步覺察' },
    { iconKey: 'shield', title: 'Risk Sensing', zhTitle: '情緒風險偵測', body: 'Persistent risk phrases, despair signals, and emotional volatility trigger flags for professional resource guidance.', zhBody: '對話中的持續風險語句、無望感與情緒波動會觸發專業資源提示與預警。', purpose: 'Detect risk without over-claiming clinical diagnosis', zhPurpose: '進行情緒分析與即時風險判斷' },
    { iconKey: 'briefcase', title: 'Feedback & Intervention', zhTitle: '回饋與介入', body: 'After feedback and consent, structured summaries can support school counselors or mental-health partners.', zhBody: '完成回饋與同意後，系統整理結構化摘要，支援校方或專業心理資源介入。', purpose: 'Connect AI support back to human care', zhPurpose: '必要時與專業心理資源合作介入' },
  ];

  const personaPrinciples = [
    { label: 'Match', zhLabel: '媒合', body: 'Each persona maps to a different help-seeking state, not a visual skin.', zhBody: '每個人設對應不同求助狀態，而不是替換外觀而已。' },
    { label: 'Tone', zhLabel: '語氣', body: 'Response length, pacing, and emotional directness change with the support need.', zhBody: '回覆長度、節奏與情緒直率度，會隨支持需求調整。' },
    { label: 'Boundary', zhLabel: '邊界', body: 'The system keeps care language supportive while avoiding clinical over-claiming.', zhBody: '系統維持支持語言，但避免宣稱取代臨床判斷。' },
  ];

  const personas = [
    {
      name: 'Lumi',
      iconKey: 'heart',
      image: 'assets/emobot-persona-lumi.webp',
      type: 'Empathic listener',
      zhType: '同理型 AI',
      trait: 'Validation and warmth',
      zhTrait: '情緒接住與溫暖支持',
      ability: 'Builds a warm, receptive atmosphere and helps users feel seen before problem solving.',
      zhAbility: '擅長建立溫暖、接納的氛圍，陪伴使用者覺察情緒並與之共處。',
      topics: 'Loneliness, low self-esteem, emotional loss, self-doubt, relationship tension',
      zhTopics: '孤獨感、低自尊、情感失落、自我懷疑、親密關係議題',
      desc: 'Reflects the user in clear, gentle language and helps them feel seen before moving into problem solving.',
      zhDesc: '以清楚且溫和的語言映照使用者，先讓對方感覺被理解，再逐步進入問題整理。',
      prompt: 'I keep replaying a conflict with my friend and I cannot stop blaming myself.',
      zhPrompt: '我一直重播跟朋友吵架的畫面，停不下來地責怪自己。',
      response: 'It makes sense that your mind keeps returning to it. Let us separate what actually happened from what your guilt is adding on top.',
      zhResponse: '你的腦袋一直回到那件事是可以理解的。我們先把實際發生的事情，和罪惡感額外加上的部分分開看。',
    },
    {
      name: 'Solin',
      iconKey: 'activity',
      image: 'assets/emobot-persona-solin.webp',
      type: 'Insight companion',
      zhType: '洞察型 AI',
      trait: 'Depth and hidden motives',
      zhTrait: '深層理解與內在探索',
      ability: 'Explores subconscious patterns, repeated interpersonal scripts, and unresolved inner conflicts.',
      zhAbility: '探索潛意識與隱藏動機，引導使用者對過往經驗進行深層理解。',
      topics: 'Repeated relationship patterns, trauma narratives, self-worth questions, dream exploration',
      zhTopics: '反覆的人際模式、創傷經驗、自我價值疑問、夢境探索、內在空虛感',
      desc: 'Guides reflective conversation when the user needs meaning-making, not immediate action.',
      zhDesc: '當使用者需要理解脈絡而不是立刻行動時，引導更深層的反思與意義整理。',
      prompt: 'I always choose people who make me feel small, and I do not understand why.',
      zhPrompt: '我總是靠近讓我覺得自己很渺小的人，但我不知道為什麼。',
      response: 'That pattern may be protecting something older. Let us look at when this feeling first became familiar, without rushing to judge it.',
      zhResponse: '這個模式可能在保護某個更早形成的感受。我們先看看這種熟悉感最早從哪裡來，不急著評價它。',
    },
    {
      name: 'Niko',
      iconKey: 'zap',
      image: 'assets/emobot-persona-niko.webp',
      type: 'Solution strategist',
      zhType: '解決型 AI',
      trait: 'Action planning and focus',
      zhTrait: '目標拆解與行動推進',
      ability: 'Turns vague pressure into goals, priorities, resources, and small executable steps.',
      zhAbility: '現實導向，強調目標設定與資源活用，能快速聚焦在問題解決上。',
      topics: 'Work stress, conflict handling, time management, short-term decisions, daily pressure',
      zhTopics: '職場壓力、衝突處理、時間管理、短期決策困難、日常壓力應對',
      desc: 'Turns vague pressure into options, priorities, and a visible plan without dismissing the emotional context.',
      zhDesc: '把模糊壓力拆成選項、優先順序與可視化計畫，但不忽略情緒脈絡。',
      prompt: 'Everything is overdue and I do not know where to start.',
      zhPrompt: '每件事都延後了，我不知道要從哪裡開始。',
      response: 'We will not solve everything tonight. Pick the task with the closest consequence, then we make a 20-minute first move.',
      zhResponse: '今晚不用一次解決全部。我們先挑出後果最近的任務，再設定一個 20 分鐘就能開始的第一步。',
    },
    {
      name: 'Clara',
      iconKey: 'book',
      image: 'assets/emobot-persona-clara.webp',
      type: 'Cognitive reframer',
      zhType: '認知型 AI',
      trait: 'Structure and cognitive clarity',
      zhTrait: '邏輯釐清與認知重建',
      ability: 'Clarifies structure, analyzes irrational thoughts, and proposes cognitive reconstruction steps.',
      zhAbility: '結構明確、邏輯清晰，分析非理性思考並提供認知重建步驟。',
      topics: 'Negative self-talk, anxiety, perfectionism, procrastination, emotion regulation',
      zhTopics: '負面自我對話、焦慮、完美主義、拖延、情緒管理',
      desc: 'Uses evidence-based questioning to identify assumptions, reframe self-criticism, and generate a structured reflection.',
      zhDesc: '透過實證式提問辨識假設、重構自我批評，並整理成結構化反思。',
      prompt: 'If I fail this interview, it means I am not capable.',
      zhPrompt: '如果我這次面試失敗，就代表我不夠有能力。',
      response: 'That sentence sounds like a conclusion, not evidence. What are two other explanations that would still fit the facts?',
      zhResponse: '這句話比較像結論，而不是證據。還有哪些解釋也符合事實？我們先列兩個。',
    },
  ];

  const active = personas[activePersona];

  const architecture = [
    { iconKey: 'monitor', name: 'React Experience Layer', zhName: 'React 體驗層', desc: 'Onboarding, companion chat, avatar-ready surface, report preview, responsive portfolio case UI', zhDesc: '引導流程、陪伴對話、虛擬形象介面、報告預覽與響應式案例頁' },
    { iconKey: 'database', name: 'FastAPI Service Layer', zhName: 'FastAPI 服務層', desc: 'Session logging, consent state, report generation, counselor integration boundaries', zhDesc: '對話紀錄、同意狀態、報告生成與諮商端整合邊界' },
    { iconKey: 'target', name: 'Psychological Embedding', zhName: '心理嵌入媒合', desc: 'Trait vectors from scales, needs, emotion regulation patterns, and conversation history', zhDesc: '從量表、需求、情緒調節模式與對話歷程形成特質向量' },
    { iconKey: 'cpu', name: 'Emotion and Risk Intelligence', zhName: '情緒與風險智慧層', desc: 'LLM dialogue, BERT/NRC-style emotion analysis, topic tagging, risk phrase detection', zhDesc: 'LLM 對話、BERT/NRC 式情緒分析、議題標籤與風險語句偵測' },
    { iconKey: 'activity', name: 'Avatar and Voice Direction', zhName: '虛擬形象與語音方向', desc: 'D-ID, HeyGen, and TTS-ready design direction for face, voice, gaze, and tone', zhDesc: '以 D-ID、HeyGen 與 TTS 為方向規劃表情、聲音、眼神與語氣' },
  ];

  const features = [
    { iconKey: 'layers', title: 'Consent-first data model', zhTitle: '同意優先的資料模型', body: 'The product distinguishes private companionship, anonymized analytics, and counselor handoff so trust is designed into the workflow.', zhBody: '產品區分私人陪伴、匿名化分析與諮商端銜接，讓信任從流程中被設計出來。' },
    { iconKey: 'chart', title: 'Issue and emotion timeline', zhTitle: '議題與情緒時間軸', body: 'Dialogue records can be transformed into topic labels, emotional fluctuations, support needs, and longitudinal change.', zhBody: '對話紀錄可轉成議題標籤、情緒波動、支持需求與長期變化。' },
    { iconKey: 'shield', title: 'Risk threshold logic', zhTitle: '風險門檻邏輯', body: 'Extreme self-negation, hopelessness, and self-harm signals trigger supportive guidance and professional resource routing.', zhBody: '極端自我否定、無望感與自傷傾向會觸發支持性引導與專業資源導向。' },
    { iconKey: 'briefcase', title: 'Counselor-ready summary', zhTitle: '諮商端摘要', body: 'The system can generate structured intake context: scale results, key phrases, emotional trends, and priority markers.', zhBody: '系統可生成結構化初談脈絡：量表結果、關鍵語句、情緒趨勢與優先標記。' },
    { iconKey: 'globe', title: 'Campus to EAP expansion', zhTitle: '校園到企業 EAP', body: 'The same support logic can extend to universities, NGOs, community mental health centers, and employee assistance programs.', zhBody: '同一套支持邏輯可延伸到大學、NGO、社區心理衛生中心與企業員工協助方案。' },
    { iconKey: 'trend', title: 'Research-backed iteration', zhTitle: '研究驅動迭代', body: 'Qualitative interviews, questionnaire analysis, dialogue semantics, and prototype feedback become concrete changes to matching, tone, and safety handoff.', zhBody: '質性訪談、問卷分析、對話語意與原型回饋會轉化為媒合、語氣與安全銜接的具體迭代。' },
  ];

  const researchMetrics = [
    { value: 'Mixed', label: 'Qual + Quant design', zhLabel: '質性 + 量化研究設計' },
    { value: '3', label: 'Evidence artifacts', zhLabel: '研究結果圖' },
    { value: '2', label: 'Questionnaire analysis views', zhLabel: '問卷分析視角' },
    { value: '1', label: 'Dialogue semantic model', zhLabel: '對話語意模型' },
  ];

  const researchMethods = [
    { iconKey: 'heart', label: '01 / Discovery', zhLabel: '01 / 探索', title: 'User interviews', zhTitle: '使用者質性訪談', body: 'Interviewed target users around help-seeking friction, disclosure comfort, AI trust, and the emotional language they naturally use before counseling.', zhBody: '針對求助阻力、自我揭露舒適度、AI 信任感，以及進入諮商前會自然使用的情緒語言進行使用者訪談。' },
    { iconKey: 'book', label: '02 / Instrument', zhLabel: '02 / 工具', title: 'Survey and construct design', zhTitle: '問卷與構念設計', body: 'Translated psychological constructs into measurable questionnaire dimensions, then connected responses back to persona matching and support-style design.', zhBody: '將心理構念轉成可測量的問卷維度，再把回應結果連回人設媒合與支持風格設計。' },
    { iconKey: 'zap', label: '03 / Experiment', zhLabel: '03 / 實驗', title: 'Prototype response testing', zhTitle: '原型互動測試', body: 'Compared user responses to different companion tones, emotional prompts, and dialogue structures to identify which patterns improved perceived understanding.', zhBody: '比較使用者面對不同陪伴語氣、情緒提示與對話結構時的反應，找出能提升被理解感的互動模式。' },
    { iconKey: 'chart', label: '04 / Analysis', zhLabel: '04 / 分析', title: 'Semantic and quantitative readout', zhTitle: '語意與量化讀出', body: 'Combined semantic dialogue analysis with questionnaire distributions, correlation patterns, and design implications for the next MVP iteration.', zhBody: '整合對話語意分析、問卷分布、相關模式與設計推論，回饋到下一輪 MVP 迭代。' },
  ];

  const researchArtifacts = [
    {
      src: 'assets/p1.png',
      title: 'Dialogue Semantic Analysis',
      zhTitle: '對話語意分析結果',
      meta: 'Qualitative coding / semantic clustering',
      zhMeta: '質性編碼 / 語意群集',
      desc: 'Maps user language into emotional themes, support needs, and candidate response strategies for AI companion dialogue design.',
      zhDesc: '將使用者語言映射為情緒主題、支持需求與 AI 陪伴回應策略，作為對話設計依據。',
      badge: 'P1',
    },
    {
      src: 'assets/p2.png',
      title: 'User Design Questionnaire',
      zhTitle: '使用者設計問卷量化分析',
      meta: 'Survey distribution / construct readout',
      zhMeta: '問卷分布 / 構念讀出',
      desc: 'Shows how questionnaire responses inform trust, disclosure comfort, interaction preference, and support-mode prioritization.',
      zhDesc: '呈現問卷回應如何回饋信任感、自我揭露舒適度、互動偏好與支持模式排序。',
      badge: 'P2',
    },
    {
      src: 'assets/p3.png',
      title: 'Quantitative Pattern Comparison',
      zhTitle: '量化模式比較分析',
      meta: 'Comparative analysis / design implication',
      zhMeta: '比較分析 / 設計推論',
      desc: 'Compares questionnaire dimensions to identify which signals should influence onboarding, persona matching, and counselor-facing summaries.',
      zhDesc: '比較不同問卷維度，判斷哪些訊號應影響引導流程、人設媒合與諮商端摘要。',
      badge: 'P3',
      wide: true,
    },
  ];

  const researchInsights = [
    { label: 'Finding 01', zhLabel: '發現 01', title: 'Trust is earned before advice', zhTitle: '信任先於建議', body: 'Users respond better when the system validates emotion and clarifies boundaries before moving into planning.', zhBody: '系統先接住情緒並說清楚邊界，再進入行動建議時，使用者反應更穩定。' },
    { label: 'Finding 02', zhLabel: '發現 02', title: 'Questionnaires need a product role', zhTitle: '問卷需要產品角色', body: 'Survey results are not decoration; they become onboarding signals that shape tone, pacing, and support depth.', zhBody: '問卷不是裝飾，而是引導流程訊號，用來調整語氣、節奏與支持深度。' },
    { label: 'Finding 03', zhLabel: '發現 03', title: 'Semantic evidence guides safety', zhTitle: '語意證據導向安全設計', body: 'Repeated emotional themes and risk-adjacent language define when the system should slow down, summarize, or route to human care.', zhBody: '重複出現的情緒主題與風險鄰近語言，決定系統何時放慢、摘要或導向真人支持。' },
  ];

  const evidence = [
    { iconKey: 'award', title: 'Award Video', zhTitle: '得獎影片', body: 'Embedded contest video for the portfolio reader to verify the award context.', zhBody: '嵌入競賽影片，讓作品集讀者能直接驗證得獎脈絡。' },
    { iconKey: 'book', title: 'Proposal PDF', zhTitle: '提案計畫書', body: 'Reserve for the final deck, problem analysis, market research, and SDG impact page.', zhBody: '預留放置完整提案書、問題分析、市場研究與 SDG 影響頁。' },
    { iconKey: 'monitor', title: 'MVP Screens', zhTitle: 'MVP 畫面', body: 'Reserve for onboarding, persona match, chat interface, report preview, and dashboard screenshots.', zhBody: '預留放置引導流程、人設媒合、對話介面、報告預覽與儀表板截圖。' },
  ];



  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: 'proj-section reveal' },
      React.createElement('div', { className: 'emobot-case' },
        React.createElement('div', { className: 'emobot-case-hero' },
          React.createElement('div', { className: 'emobot-case-copy' },
            React.createElement('div', { className: 'emobot-case-kicker' },
              React.createElement(Icon, { name: 'award' }),
              PA ? '得獎數位心理健康案例' : 'Award-winning digital mental health case'
            ),
            React.createElement('h2', { className: 'emobot-case-title' },
              PA ? '把校園心理支持，設計成一個' : 'Designing campus mental health as a ',
              React.createElement('span', null, PA ? '可被信任的產品系統' : 'trusted product system'),
              PA ? '。' : '.'
            ),
            React.createElement('p', { className: 'emobot-case-lead' },
              PA
                ? '這個頁面將 Emobot+ 從競賽提案重新轉譯成作品集案例：從問題洞察、互動策略、AI 架構、安全邊界，到如何讓諮商中心在使用者同意後更快理解個案脈絡。'
                : 'This case translates the award proposal into a portfolio-ready product story: problem framing, interaction strategy, AI architecture, safety boundaries, and the handoff logic that helps counselors understand context after consent.'
            ),
            React.createElement('div', { className: 'emobot-pill-row' },
              ...['SDG 3', 'Campus Care', 'AI Companion', 'Risk Routing'].map((label, i) =>
                React.createElement('span', { className: 'emobot-pill', key: label },
                  React.createElement(Icon, { name: ['globe', 'heart', 'cpu', 'shield'][i] }),
                  label
                )
              )
            )
          ),
          React.createElement('div', { className: 'emobot-video-panel' },
            React.createElement('div', { className: 'emobot-video-toolbar' },
              React.createElement('div', { className: 'emobot-video-dots' },
                React.createElement('span', null),
                React.createElement('span', null),
                React.createElement('span', null)
              ),
              React.createElement('span', null, PA ? '產品展示影片' : 'Product demo')
            ),
            React.createElement('div', { className: 'emobot-video-frame' },
              React.createElement('video', {
                src: 'assets/demo_v1.mp4',
                autoPlay: true,
                muted: true,
                loop: true,
                playsInline: true,
                controls: true,
                preload: 'metadata'
              })
            ),
            React.createElement('div', { className: 'emobot-reference-grid' },
              ...mediaLinks.map(link => React.createElement('a', {
                className: 'emobot-reference-card',
                href: link.href,
                target: '_blank',
                rel: 'noreferrer',
                key: link.href
              },
                React.createElement('span', null, PA ? link.zhKind : link.kind),
                React.createElement('strong', null, PA ? link.zhTitle : link.title),
                React.createElement('small', null, PA ? link.zhDesc : link.desc)
              ))
            ),
            React.createElement('div', { className: 'emobot-live-preview' },
              React.createElement('img', {
                src: 'assets/emobot-live-home.webp',
                alt: PA ? 'Emobot+ 線上專案首頁截圖' : 'Emobot+ live project home screen',
                loading: 'lazy',
                decoding: 'async'
              }),
              React.createElement('div', { className: 'emobot-live-preview-copy' },
                React.createElement('div', null,
                  React.createElement('div', { className: 'emobot-live-preview-label' }, PA ? 'Live product reference' : 'Live product reference'),
                  React.createElement('p', null,
                    PA
                      ? '實際部署版本保留柔和藍色、低壓入口與機器人介紹；作品集頁將其轉譯成更完整的產品敘事與研究證據。'
                      : 'The deployed build carries the soft blue product language and low-pressure entry; this portfolio page reframes it as a fuller product and research case.'
                  )
                ),
                React.createElement('a', { href: liveProjectUrl, target: '_blank', rel: 'noreferrer' }, PA ? '開啟線上作品 ↗' : 'Open live build ↗')
              )
            )
          )
        ),
        React.createElement('div', { className: 'emobot-proof-grid' },
          ...proof.map(item => React.createElement('div', { className: 'emobot-proof-card', key: item.label },
            React.createElement('div', { className: 'emobot-proof-num' }, item.num),
            React.createElement('div', { className: 'emobot-proof-label' }, pick(item, 'label')),
            React.createElement('div', { className: 'emobot-proof-desc' }, pick(item, 'desc'))
          ))
        )
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '01 / 問題不是缺少聊天機器人' : '01 / The problem is not another chatbot'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '真正缺的是低壓入口、持續訊號與安全銜接。' : 'What is missing is a low-pressure entry, continuous signals, and safe handoff.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '提案中的問題分析被整理成三個產品設計約束：不能讓學生一開始就感覺被診斷、不能加重諮商端負擔，也不能忽略高風險訊號。'
            : 'The proposal becomes three product constraints: avoid making students feel diagnosed at entry, avoid adding burden to counseling teams, and avoid missing high-risk signals.'
        )
      ),
      React.createElement('div', { className: 'emobot-swot-v3' },
        React.createElement('div', { className: 'emobot-swot-v3-hdr' },
          React.createElement('div', { className: 'emobot-swot-v3-hdr-title' }, 'SWOT'),
          React.createElement('div', { className: 'emobot-swot-v3-hdr-tag' }, PA ? '策略診斷矩陣' : 'Strategic diagnosis matrix')
        ),
        React.createElement('div', { className: 'emobot-swot-v3-col-hdrs' },
          React.createElement('div', { className: 'emobot-swot-v3-col-hdrs-spacer' }),
          React.createElement('div', { className: 'emobot-swot-v3-col-hdr positive' }, PA ? '優勢向量 — 可利用因素' : 'Positive — leverage factors'),
          React.createElement('div', { className: 'emobot-swot-v3-col-hdr risk' }, PA ? '風險向量 — 需管理因素' : 'Risk — factors to manage')
        ),
        ...[[0, 1], [2, 3]].map(([posIdx, riskIdx], rowIdx) =>
          React.createElement('div', { className: 'emobot-swot-v3-row', key: rowIdx },
            React.createElement('div', { className: 'emobot-swot-v3-row-label' }, PA ? (rowIdx === 0 ? '內部' : '外部') : (rowIdx === 0 ? 'Internal' : 'External')),
            ...([
              { item: swot[posIdx], letter: ['S','O'][rowIdx], cls: 'positive-cell' },
              { item: swot[riskIdx], letter: ['W','T'][rowIdx], cls: 'risk-cell' },
            ].map(({ item, letter, cls }) =>
              React.createElement('div', { className: `emobot-swot-v3-cell ${cls}`, key: letter },
                React.createElement('div', { className: 'emobot-swot-v3-cell-head' },
                  React.createElement('span', { className: 'emobot-swot-v3-cell-id' }, letter),
                  React.createElement('span', { className: 'emobot-swot-v3-cell-title' }, PA ? item.zhLabel : item.label)
                ),
                React.createElement('div', { className: 'emobot-swot-v3-cell-sep' }),
                React.createElement('ul', null,
                  ...(PA ? item.zhPoints : item.points).map(p => React.createElement('li', { key: p }, p))
                )
              )
            ))
          )
        )
      ),
      React.createElement('div', { className: 'emobot-problem-rhythm' },
        ...problems.map(item => React.createElement('span', { className: 'emobot-problem-pill', key: item.title },
          React.createElement(Icon, { name: item.iconKey }),
          pick(item, 'title')
        ))
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '02 / 技術互動架構' : '02 / Interaction architecture'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '用三條能力線，串起前端、心理訊號與 AI 陪伴。' : 'Three capability lanes connect frontend, psychological signals, and AI companionship.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '參考原始架構圖的資訊組織方式，這裡將系統改寫成前端體驗、後端資料處理、AI 互動模組三條 runway，讓面試官能快速讀懂我的產品架構思維。'
            : 'Inspired by the original architecture diagram, this turns the system into three runways: frontend experience, backend data processing, and AI interaction modules.'
        )
      ),
      React.createElement('div', { className: 'emobot-architecture-runway' },
        ...architectureColumns.map(col => React.createElement('section', { className: 'emobot-arch-column', key: col.num },
          React.createElement('div', { className: 'emobot-arch-column-head' },
            React.createElement('div', { className: 'emobot-arch-column-num' }, col.num),
            React.createElement('div', null,
              React.createElement('div', { className: 'emobot-arch-column-title' }, pick(col, 'title')),
              React.createElement('span', { className: 'emobot-arch-column-sub' }, col.sub)
            )
          ),
          ...col.nodes.map(node => React.createElement('div', { className: 'emobot-arch-node', key: node.top },
            React.createElement('strong', null, node.top),
            React.createElement('span', null, pick(node, 'bottom'))
          ))
        ))
      ),
      React.createElement('div', { className: 'emobot-problem-rhythm' },
        ...solutions.map(item => React.createElement('span', { className: 'emobot-problem-pill', key: item.title },
          React.createElement(Icon, { name: item.iconKey }),
          pick(item, 'title')
        ))
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '03 / 服務旅程' : '03 / Service journey'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '從一則匿名訊息，到可行的支持路徑。' : 'From one anonymous message to an actionable support path.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '流程把心理學語言轉成產品語言：入口要輕、媒合要有理由、對話要能變成可被理解的趨勢，轉介則必須由使用者同意啟動。'
            : 'The journey translates psychology into product behavior: the entry stays light, matching has a reason, dialogue becomes legible trends, and referral begins only after consent.'
        )
      ),
      React.createElement('div', { className: 'emobot-flow-ribbon' },
        ...journey.map((step, i) => React.createElement('article', { className: 'emobot-flow-card', key: step.title },
          React.createElement('div', null,
            React.createElement('div', { className: 'emobot-flow-badge' }, String(i + 1).padStart(2, '0')),
            React.createElement(Icon, { name: step.iconKey }),
            React.createElement('h4', null, pick(step, 'title')),
            React.createElement('p', null, pick(step, 'body'))
          ),
          React.createElement('div', { className: 'emobot-flow-purpose' }, pick(step, 'purpose'))
        ))
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '04 / 互動原型' : '04 / Interaction prototype'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? 'Persona 是心理支持策略，不是角色裝飾。' : 'Personas are support strategies, not character skins.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '此區塊依據實際專案的人設卡片重構：每個 AI 代表不同支持任務，從同理、洞察、行動到認知重構，回應不同情緒狀態與求助議題。'
            : 'This section rebuilds the deployed persona cards as a design system: each AI owns a support job, from validation and insight to action planning and cognitive reframing.'
        )
      ),
      React.createElement('div', { className: 'emobot-persona-evidence' },
        ...personaPrinciples.map(item => React.createElement('article', { key: item.label },
          React.createElement('span', null, PA ? item.zhLabel : item.label),
          React.createElement('p', null, PA ? item.zhBody : item.body)
        ))
      ),
      React.createElement('div', { className: 'persona-lab' },
        React.createElement('div', { className: 'persona-tabs', role: 'tablist', 'aria-label': PA ? '選擇 AI 人設' : 'Choose AI persona' },
          ...personas.map((p, i) => React.createElement('button', {
            key: p.name, type: 'button', role: 'tab', 'aria-selected': i === activePersona,
            className: `persona-tab ${i === activePersona ? 'active' : ''}`,
            onClick: () => setActivePersona(i)
          },
            React.createElement('div', { className: 'persona-tab-avatar' },
              React.createElement('img', { src: `assets/persona_${p.name.toLowerCase()}.png`, alt: p.name, loading: 'lazy' })
            ),
            React.createElement('div', { className: 'persona-tab-info' },
              React.createElement('strong', null, p.name),
              React.createElement('span', null, PA ? p.zhType : p.type)
            )
          ))
        ),
        React.createElement('div', { className: 'persona-detail' },
          React.createElement('div', { className: 'persona-detail-profile' },
            React.createElement('div', { className: 'persona-detail-photo' },
              React.createElement('img', { src: `assets/persona_${active.name.toLowerCase()}.png`, alt: active.name, loading: 'lazy' })
            ),
            React.createElement('div', { className: 'persona-detail-id' },
              React.createElement('div', { className: 'persona-detail-type' }, PA ? active.zhType : active.type),
              React.createElement('h4', { className: 'persona-detail-name' }, active.name),
              React.createElement('div', { className: 'persona-detail-trait' }, PA ? active.zhTrait : active.trait),
              React.createElement('p', { className: 'persona-detail-desc' }, PA ? active.zhDesc : active.desc)
            )
          ),
          React.createElement('div', { className: 'persona-detail-content' },
            React.createElement('div', { className: 'persona-detail-stats' },
              React.createElement('div', { className: 'persona-stat-block' },
                React.createElement('div', { className: 'persona-stat-label' }, PA ? '核心能力' : 'Core ability'),
                React.createElement('p', { className: 'persona-stat-body' }, PA ? active.zhAbility : active.ability)
              ),
              React.createElement('div', { className: 'persona-stat-block' },
                React.createElement('div', { className: 'persona-stat-label' }, PA ? '適合議題' : 'Best-fit topics'),
                React.createElement('p', { className: 'persona-stat-body' }, PA ? active.zhTopics : active.topics)
              )
            ),
            React.createElement('div', { className: 'persona-chat-shell' },
              React.createElement('div', { className: 'persona-chat-header' },
                React.createElement('div', { className: 'persona-chat-dot' }, React.createElement(Icon, { name: active.iconKey })),
                React.createElement('span', null, PA ? '對話語氣樣本' : 'Sample interaction')
              ),
              React.createElement('div', { className: 'persona-chat-row user' },
                React.createElement('div', { className: 'persona-chat-bubble' }, PA ? active.zhPrompt : active.prompt)
              ),
              React.createElement('div', { className: 'persona-chat-row' },
                React.createElement('img', { src: `assets/persona_${active.name.toLowerCase()}.png`, alt: active.name, className: 'persona-chat-avatar', loading: 'lazy' }),
                React.createElement('div', { className: 'persona-chat-bubble' }, PA ? active.zhResponse : active.response)
              )
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '05 / 系統架構' : '05 / System architecture'),
          React.createElement('h3', { className: 'emobot-section-title' },
            PA ? '微服務架構，連結 AI 推論、資料持久化與安全轉介。' : 'Microservices architecture connecting AI reasoning, data persistence, and safe professional handoff.'
          )
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? 'Kubernetes 編排的微服務設計：FastAPI 統一閘道、事件驅動 AI 服務網格、獨立資料庫策略，以及知情同意後的結構化轉介輸出。'
            : 'Kubernetes-orchestrated microservices: a FastAPI unified gateway, event-driven AI service mesh, database-per-service strategy, and consent-based structured referral output.'
        )
      ),
      React.createElement('div', { className: 'arch-diagram-wrap' },

        React.createElement('div', { className: 'arch-sketch-card' },
          React.createElement('div', { className: 'arch-sketch-img-container' },
            React.createElement('img', {
              src: 'assets/System architecture wireframe.png',
              alt: PA ? '系統架構草稿圖' : 'System architecture wireframe draft',
              loading: 'lazy', decoding: 'async',
            })
          ),
          React.createElement('div', { className: 'arch-sketch-text' },
            React.createElement('span', { className: 'arch-sketch-stamp' }, 'DRAFT WIREFRAME · 草稿圖'),
            React.createElement('p', { className: 'arch-sketch-note' },
              PA
                ? '初期架構草稿，用於驗證服務邊界與資料流規劃。'
                : 'Initial wireframe to validate service boundaries and data flow.'
            )
          )
        ),

        React.createElement('div', { className: 'arch-abs-wrap', ref: archWrapRef },
          React.createElement('div', { className: 'arch-abs-outer', style: { zoom: archScale } },
            React.createElement('div', { className: 'arch-abs-canvas' },
              React.createElement('svg', {
                viewBox: '0 0 1200 1064', width: '1200', height: '1064',
                style: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 0 },
                fill: 'none'
              },
                React.createElement('defs', null,
                  React.createElement('marker', { id: 'ea-ah', markerWidth: 9, markerHeight: 9, refX: 7, refY: 4.5, orient: 'auto' },
                    React.createElement('path', { d: 'M1 1L7 4.5L1 8', stroke: '#6E7C92', strokeWidth: '1.5', fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' })
                  ),
                  React.createElement('marker', { id: 'ea-ahA', markerWidth: 9, markerHeight: 9, refX: 7, refY: 4.5, orient: 'auto' },
                    React.createElement('path', { d: 'M1 1L7 4.5L1 8', stroke: '#E0A33A', strokeWidth: '1.6', fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' })
                  )
                ),
                React.createElement('g', { stroke: '#5D6B82', strokeWidth: '1.7', markerEnd: 'url(#ea-ah)' },
                  React.createElement('path', { d: 'M238 358 L316 396' }),
                  React.createElement('path', { d: 'M238 706 L316 714' }),
                  React.createElement('path', { d: 'M536 396 L716 294' }),
                  React.createElement('path', { d: 'M536 412 L716 450' }),
                  React.createElement('path', { d: 'M536 428 L716 606' }),
                  React.createElement('path', { d: 'M536 714 L716 762' }),
                  React.createElement('path', { d: 'M916 294 L974 294' }),
                  React.createElement('path', { d: 'M916 450 L974 450' }),
                  React.createElement('path', { d: 'M916 606 L974 606' }),
                  React.createElement('path', { d: 'M916 762 L974 762' })
                ),
                React.createElement('g', { stroke: '#7A5A2E', strokeWidth: '1.6', strokeDasharray: '5 5' },
                  React.createElement('path', { d: 'M821 338 L821 406' }),
                  React.createElement('path', { d: 'M821 494 L821 562' }),
                  React.createElement('path', { d: 'M821 650 L821 718' })
                ),
                React.createElement('path', { d: 'M821 806 L821 907', stroke: '#E0A33A', strokeWidth: '1.7', strokeDasharray: '6 5', markerEnd: 'url(#ea-ahA)' })
              ),
              React.createElement('div', { style: { position: 'absolute', left: 70, top: 120, width: 168, textAlign: 'center', zIndex: 2, fontSize: 12, fontWeight: 600, letterSpacing: '.14em', color: '#6B7C92' } }, PA ? '前端層' : 'CLIENT TIER'),
              React.createElement('div', { style: { position: 'absolute', left: 326, top: 120, width: 210, textAlign: 'center', zIndex: 2, fontSize: 12, fontWeight: 600, letterSpacing: '.14em', color: '#6B7C92' } }, PA ? '閘道層' : 'EDGE / GATEWAY'),
              React.createElement('div', { style: { position: 'absolute', left: 726, top: 120, width: 190, textAlign: 'center', zIndex: 2, fontSize: 12, fontWeight: 600, letterSpacing: '.14em', color: '#6B7C92' } }, PA ? 'AI 服務網格' : 'AI SERVICE MESH'),
              React.createElement('div', { style: { position: 'absolute', left: 980, top: 120, width: 190, textAlign: 'center', zIndex: 2, fontSize: 12, fontWeight: 600, letterSpacing: '.14em', color: '#6B7C92' } }, PA ? '資料層' : 'DATA TIER'),
              React.createElement('div', { style: { position: 'absolute', left: 0, right: 0, top: 156, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, fontSize: 12.5, color: '#94A1B2' } },
                React.createElement('span', { style: { fontWeight: 600, color: '#7FD3E4' } }, PA ? '資料流' : 'Data Flow'),
                ...[
                  { n: '1', b: '#36B6CE', c: '#7FD3E4', en: 'Pre-test / chat', zh: '量表前測 / 對話' },
                  { sep: true },
                  { n: '2', b: '#36B6CE', c: '#7FD3E4', en: 'AI processing',   zh: 'AI 服務處理' },
                  { sep: true },
                  { n: '3', b: '#36B6CE', c: '#7FD3E4', en: 'Data R/W',        zh: '資料讀寫' },
                  { sep: true },
                  { n: '4', b: '#E0A33A', c: '#F0BD66', en: 'Risk referral',   zh: '風險轉介' },
                ].map((s, i) => s.sep
                  ? React.createElement('span', { key: `sp${i}`, style: { color: '#46566B' } }, '→')
                  : React.createElement('span', { key: s.n, style: { display: 'flex', alignItems: 'center', gap: 6 } },
                      React.createElement('b', { style: { display: 'inline-flex', width: 17, height: 17, borderRadius: '50%', border: `1px solid ${s.b}`, color: s.c, fontSize: 10, fontWeight: 700, alignItems: 'center', justifyContent: 'center' } }, s.n),
                      PA ? s.zh : s.en
                    )
                )
              ),
              ...[
                { left: 261, top: 357, n: '1', bg: '#0E1A2A', border: '#36B6CE', color: '#7FD3E4' },
                { left: 606, top: 323, n: '2', bg: '#0E1A2A', border: '#36B6CE', color: '#7FD3E4' },
                { left: 936, top: 272, n: '3', bg: '#0E1A2A', border: '#36B6CE', color: '#7FD3E4' },
                { left: 810, top: 864, n: '4', bg: '#2A2008', border: '#E0A33A', color: '#F0BD66' },
              ].map(m => React.createElement('div', { key: `fm${m.n}`, style: { position: 'absolute', left: m.left, top: m.top, width: 23, height: 23, zIndex: 4, borderRadius: '50%', background: m.bg, border: `1.5px solid ${m.border}`, color: m.color, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' } }, m.n)),
              React.createElement('div', { style: { position: 'absolute', left: 486, top: 188, width: 694, height: 686, border: '1.6px dashed #2A9DB8', borderRadius: 14, zIndex: 1 } }),
              React.createElement('div', { style: { position: 'absolute', left: 512, top: 200, zIndex: 2, display: 'flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 600, color: '#36B6CE', letterSpacing: '.03em' } },
                React.createElement('svg', { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none' },
                  React.createElement('path', { d: 'M12 2.6l8.2 4.7v9.4L12 21.4 3.8 16.7V7.3z', stroke: '#36B6CE', strokeWidth: '1.5', strokeLinejoin: 'round' }),
                  React.createElement('path', { d: 'M12 7.5l4 2.3v4.4L12 16.5 8 14.2V9.8z', stroke: '#36B6CE', strokeWidth: '1.3', strokeLinejoin: 'round' })
                ),
                PA ? 'AI 互動核心模組 · Kubernetes Cluster' : 'AI Interaction Core · Kubernetes Cluster'
              ),
              React.createElement('div', { className: 'arch-abs-client', style: { position: 'absolute', left: 70, top: 312, width: 168, height: 92, zIndex: 2, border: '1.5px solid #2EB6CE', background: '#0A2530', borderRadius: 12, boxShadow: '0 0 20px rgba(46,182,206,.13)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none' },
                    React.createElement('rect', { x: 3, y: 4, width: 18, height: 13, rx: 1.8, stroke: '#48C8DD', strokeWidth: 1.7 }),
                    React.createElement('path', { d: 'M3 8h18M9 20.5h6', stroke: '#48C8DD', strokeWidth: 1.7, strokeLinecap: 'round' })
                  ),
                  React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: '#F1F6F9' } }, PA ? 'Web 前端' : 'Web App')
                ),
                React.createElement('div', { style: { fontSize: 12, color: '#8FB7C2' } }, 'React SPA')
              ),
              React.createElement('div', { className: 'arch-abs-client', style: { position: 'absolute', left: 70, top: 660, width: 168, height: 92, zIndex: 2, border: '1.5px solid #2EB6CE', background: '#0A2530', borderRadius: 12, boxShadow: '0 0 20px rgba(46,182,206,.13)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none' },
                    React.createElement('rect', { x: 7, y: 2.5, width: 10, height: 19, rx: 2.2, stroke: '#48C8DD', strokeWidth: 1.7 }),
                    React.createElement('path', { d: 'M10.5 18.5h3', stroke: '#48C8DD', strokeWidth: 1.7, strokeLinecap: 'round' })
                  ),
                  React.createElement('div', { style: { fontSize: 16, fontWeight: 700, color: '#F1F6F9' } }, PA ? '行動 App' : 'Mobile App')
                ),
                React.createElement('div', { style: { fontSize: 12, color: '#8FB7C2' } }, 'iOS / Android')
              ),
              React.createElement('div', { className: 'arch-abs-gw', style: { position: 'absolute', left: 326, top: 312, width: 210, height: 174, zIndex: 2, border: '1.5px solid #C0405A', background: '#240F18', borderRadius: 12, boxShadow: '0 0 22px rgba(192,64,90,.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none' },
                    React.createElement('path', { d: 'M12 3l7 2.5v5c0 4-2.8 6.8-7 8.5-4.2-1.7-7-4.5-7-8.5v-5z', stroke: '#E97A90', strokeWidth: 1.6, strokeLinejoin: 'round' }),
                    React.createElement('path', { d: 'M8.5 12l2.2 2.2 4.3-4.4', stroke: '#E97A90', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' })
                  ),
                  React.createElement('div', { style: { fontSize: 16.5, fontWeight: 700, color: '#F6EDF0' } }, PA ? 'API 閘道' : 'API Gateway')
                ),
                React.createElement('div', { style: { fontSize: 12.5, color: '#C99AA6', lineHeight: 1.55 } },
                  PA ? 'FastAPI · 路由' : 'FastAPI · Routing',
                  React.createElement('br'),
                  PA ? '三大模組協作 · 限流' : 'Module orchestration · rate limit'
                ),
                React.createElement('div', { style: { fontSize: 11, color: '#F2899E', fontWeight: 600, background: 'rgba(224,102,126,.13)', border: '1px solid rgba(224,102,126,.3)', borderRadius: 5, padding: '2px 10px' } }, ':443')
              ),
              React.createElement('div', { className: 'arch-abs-gw', style: { position: 'absolute', left: 326, top: 660, width: 210, height: 108, zIndex: 2, border: '1.5px solid #C0405A', background: '#240F18', borderRadius: 12, boxShadow: '0 0 22px rgba(192,64,90,.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7, textAlign: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('svg', { width: 21, height: 21, viewBox: '0 0 24 24', fill: 'none' },
                    React.createElement('rect', { x: 5, y: 10.5, width: 14, height: 9.5, rx: 2, stroke: '#E97A90', strokeWidth: 1.6 }),
                    React.createElement('path', { d: 'M8 10.5V8a4 4 0 018 0v2.5', stroke: '#E97A90', strokeWidth: 1.6 }),
                    React.createElement('circle', { cx: 12, cy: 15, r: 1.4, fill: '#E97A90' })
                  ),
                  React.createElement('div', { style: { fontSize: 15.5, fontWeight: 700, color: '#F6EDF0' } }, PA ? '認證服務' : 'Auth Service')
                ),
                React.createElement('div', { style: { fontSize: 12.5, color: '#C99AA6' } }, PA ? 'OAuth2 / JWT · 知情同意' : 'OAuth2 / JWT · Consent')
              ),
              ...[
                { top: 250, en: 'Matching Service', zh: '智慧媒合服務', sub: 'Bayesian · DNN · Siamese', port: 'Python :8081', badge: '×2', ip: [['circle', { cx: 6, cy: 7, r: 2.2, stroke: '#43D79E', strokeWidth: 1.6 }], ['circle', { cx: 6, cy: 17, r: 2.2, stroke: '#43D79E', strokeWidth: 1.6 }], ['circle', { cx: 18, cy: 12, r: 2.2, stroke: '#43D79E', strokeWidth: 1.6 }], ['path', { d: 'M8 8l8 3M8 16l8-3', stroke: '#43D79E', strokeWidth: 1.4 }]] },
                { top: 406, en: 'Emotion Chatbot',  zh: '情緒 Chatbot',  sub: 'fine-tuned BERT · NRC', port: 'Python :8082', badge: '×3', ip: [['path', { d: 'M4 5h16v11H9l-4 3v-3H4z', stroke: '#43D79E', strokeWidth: 1.6, strokeLinejoin: 'round' }], ['path', { d: 'M8 9.5h8M8 12.5h5', stroke: '#43D79E', strokeWidth: 1.5, strokeLinecap: 'round' }]] },
                { top: 562, en: 'Avatar Engine',    zh: 'Avatar 引擎',   sub: 'D-ID / HeyGen · TTS',  port: 'Python :8083', badge: '×2', ip: [['circle', { cx: 12, cy: 8.5, r: 3.4, stroke: '#43D79E', strokeWidth: 1.6 }], ['path', { d: 'M5.5 19.5a6.5 6.5 0 0113 0', stroke: '#43D79E', strokeWidth: 1.6, strokeLinecap: 'round' }]] },
                { top: 718, en: 'Risk & Referral',  zh: '風險感知／轉介', sub: 'LLM · risk threshold', port: 'Python :8084', badge: '×2', ip: [['path', { d: 'M12 4l9 16H3z', stroke: '#43D79E', strokeWidth: 1.6, strokeLinejoin: 'round' }], ['path', { d: 'M12 10v4.5M12 17.5h.01', stroke: '#43D79E', strokeWidth: 1.7, strokeLinecap: 'round' }]] },
              ].map(svc => React.createElement('div', { key: svc.en, className: 'arch-abs-svc', style: { position: 'absolute', left: 726, top: svc.top, width: 190, height: 90, zIndex: 2, border: '1.5px solid #2BB984', background: '#0B231B', borderRadius: 11, boxShadow: '0 0 20px rgba(43,185,132,.13)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' }, ...svc.ip.map(([t, p], i) => React.createElement(t, { ...p, key: i }))),
                  React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: '#EAF7F1' } }, PA ? svc.zh : svc.en)
                ),
                React.createElement('div', { style: { fontSize: 11.5, color: '#62B596' } }, svc.sub),
                React.createElement('div', { style: { fontSize: 10.5, color: '#7FCFB0', background: 'rgba(43,185,132,.12)', border: '1px solid rgba(43,185,132,.25)', borderRadius: 5, padding: '1px 8px' } }, svc.port),
                React.createElement('div', { style: { position: 'absolute', top: -9, right: 9, fontSize: 9.5, fontWeight: 600, color: '#9FE0C6', background: '#0B231B', border: '1px solid #2BB984', borderRadius: 6, padding: '1px 7px', zIndex: 3 } }, svc.badge),
                React.createElement('div', { style: { position: 'absolute', top: 9, left: 9, width: 7, height: 7, borderRadius: '50%', background: '#3FD79E', boxShadow: '0 0 7px #3FD79E' } })
              )),
              ...[
                { top: 250, en: 'Vector · Milvus', enSub: 'Trait embeddings',         zhSub: '心理特質向量嵌入',   ip: [['ellipse', { cx: 12, cy: 6, rx: 7, ry: 2.8, stroke: '#B49BFA', strokeWidth: 1.5 }], ['path', { d: 'M5 6v12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V6', stroke: '#B49BFA', strokeWidth: 1.5 }], ['circle', { cx: 9, cy: 13, r: 1, fill: '#B49BFA' }], ['circle', { cx: 15, cy: 13, r: 1, fill: '#B49BFA' }], ['circle', { cx: 12, cy: 16, r: 1, fill: '#B49BFA' }], ['path', { d: 'M9 13l3 3 3-3', stroke: '#B49BFA', strokeWidth: 1 }]] },
                { top: 406, en: 'PostgreSQL',       enSub: 'Scales / chat history',    zhSub: '量表 / 對話歷程',    ip: [['ellipse', { cx: 12, cy: 6, rx: 7, ry: 2.8, stroke: '#B49BFA', strokeWidth: 1.5 }], ['path', { d: 'M5 6v12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V6M5 12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8', stroke: '#B49BFA', strokeWidth: 1.5 }]] },
                { top: 562, en: 'Redis',            enSub: 'Cache / media queue',      zhSub: '快取 / 媒體佇列',    ip: [['path', { d: 'M12 3l8 4-8 4-8-4z', stroke: '#B49BFA', strokeWidth: 1.5, strokeLinejoin: 'round' }], ['path', { d: 'M4 11l8 4 8-4M4 15l8 4 8-4', stroke: '#B49BFA', strokeWidth: 1.5, strokeLinejoin: 'round' }]] },
                { top: 718, en: 'Elasticsearch',    enSub: 'Utterance / issue search',  zhSub: '語句 / 議題標籤檢索', ip: [['circle', { cx: 10.5, cy: 10.5, r: 6, stroke: '#B49BFA', strokeWidth: 1.6 }], ['path', { d: 'M15 15l5 5', stroke: '#B49BFA', strokeWidth: 1.6, strokeLinecap: 'round' }]] },
              ].map(ds => React.createElement('div', { key: ds.en, className: 'arch-abs-data', style: { position: 'absolute', left: 980, top: ds.top, width: 190, height: 90, zIndex: 2, border: '1.5px solid #8B5CF6', background: '#170F2C', borderRadius: 11, boxShadow: '0 0 20px rgba(139,92,246,.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, textAlign: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' }, ...ds.ip.map(([t, p], i) => React.createElement(t, { ...p, key: i }))),
                  React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: '#EFEAFB' } }, ds.en)
                ),
                React.createElement('div', { style: { fontSize: 11.5, color: '#A593D6' } }, PA ? ds.zhSub : ds.enSub)
              )),
              ...[
                { top: 364, en: 'Event Bus · trait vector', zh: 'Event Bus · 特質向量化' },
                { top: 520, en: 'Event Bus · emotion',      zh: 'Event Bus · 情緒特徵' },
                { top: 676, en: 'Event Bus · feedback',     zh: 'Event Bus · 歷程回饋' },
              ].map(bus => React.createElement('div', { key: bus.en, style: { position: 'absolute', left: 736, top: bus.top, width: 170, height: 27, zIndex: 3, border: '1px solid #C77B3B', background: '#2A1B0E', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: '#E2A45E' } },
                React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none' },
                  React.createElement('path', { d: 'M3 12h5l2-4 4 8 2-4h5', stroke: '#E2A45E', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' })
                ),
                PA ? bus.zh : bus.en
              )),
              React.createElement('div', { style: { position: 'absolute', left: 696, top: 840, width: 250, height: 27, zIndex: 3, border: '1px solid #E0A33A', background: '#2A2008', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: '#F0BD66' } },
                React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none' },
                  React.createElement('path', { d: 'M12 3l7 2.5v5c0 4-2.8 6.8-7 8.5-4.2-1.7-7-4.5-7-8.5v-5z', stroke: '#F0BD66', strokeWidth: 1.5, strokeLinejoin: 'round' }),
                  React.createElement('path', { d: 'M9 12l2 2 4-4', stroke: '#F0BD66', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })
                ),
                PA ? '知情同意後轉介 · 結構化前測報告' : 'Consented referral · structured report'
              ),
              React.createElement('div', { style: { position: 'absolute', left: 691, top: 907, width: 260, height: 90, zIndex: 2, border: '1.5px solid #E0A33A', background: '#241B07', borderRadius: 12, boxShadow: '0 0 22px rgba(224,163,58,.16)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                  React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none' },
                    React.createElement('path', { d: 'M4 21V8.5l8-4 8 4V21', stroke: '#F0BD66', strokeWidth: 1.6, strokeLinejoin: 'round' }),
                    React.createElement('path', { d: 'M12 13.5c-1.4-1.3-3-.2-3 1.2 0 1 1 1.9 3 3 2-1.1 3-2 3-3 0-1.4-1.6-2.5-3-1.2z', stroke: '#F0BD66', strokeWidth: 1.3, strokeLinejoin: 'round' })
                  ),
                  React.createElement('div', { style: { fontSize: 15, fontWeight: 700, color: '#FBF1DC' } }, PA ? '校方身心健康中心' : 'Campus Counseling Center')
                ),
                React.createElement('div', { style: { fontSize: 11.5, color: '#C7A766' } }, PA ? '心理師工作台 · 優先介入個案' : 'Counselor console · priority cases')
              ),
              React.createElement('div', { style: { position: 'absolute', left: 0, right: 0, bottom: 22, zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 } },
                React.createElement('span', { style: { fontSize: 13, color: '#7C8AA0', fontWeight: 600 } }, PA ? '圖例' : 'Legend'),
                ...[
                  { border: '#2BB984', bg: '#0B231B', en: 'AI Service',   zh: 'AI 服務' },
                  { border: '#8B5CF6', bg: '#170F2C', en: 'Database',      zh: '資料庫' },
                  { border: '#C0405A', bg: '#240F18', en: 'Gateway',        zh: '閘道' },
                  { border: '#C77B3B', bg: '#2A1B0E', en: 'Event Bus',     zh: '事件匯流排' },
                  { border: '#E0A33A', bg: '#241B07', en: 'Referral',       zh: '轉介輸出' },
                ].map(leg => React.createElement('span', { key: leg.en, style: { display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: '#AEB9C8' } },
                  React.createElement('span', { style: { width: 18, height: 13, borderRadius: 4, border: `1.5px solid ${leg.border}`, background: leg.bg, display: 'inline-block' } }),
                  PA ? leg.zh : leg.en
                ))
              )
            ),
            React.createElement('div', { className: 'arch-abs-panels' },
              ...[
                {
                  en: 'Client Applications', zh: '前端應用',
                  enItems: ['React SPA (Web)', 'Pre-test scales (MBTI/DERS/AAS/BPNS)', 'Text / video chat UI', 'Progress dashboard'],
                  zhItems: ['React SPA 網頁前端', '心理量表前測 (MBTI/DERS/AAS/BPNS)', '文字 / 影像對話介面', '心理歷程趨勢儀表板'],
                  ip: [['rect', { x: 3, y: 4, width: 18, height: 13, rx: 1.8, stroke: '#2EB6CE', strokeWidth: 1.7 }], ['path', { d: 'M3 8h18M9 20.5h6', stroke: '#2EB6CE', strokeWidth: 1.7, strokeLinecap: 'round' }]],
                },
                {
                  en: 'AI Microservices', zh: 'AI 微服務',
                  enItems: ['Trait-vector matching', 'Emotion-adaptive dialogue (Gross)', 'Anthropomorphic Avatar sync', 'Event-driven · database per service'],
                  zhItems: ['心理特質向量化媒合', '情緒適應性對話 (Gross 五策略)', '擬人化 Avatar 視覺/語音同步', '事件驅動 · 各服務專屬資料庫'],
                  ip: [['circle', { cx: 6, cy: 7, r: 2.2, stroke: '#2BB984', strokeWidth: 1.6 }], ['circle', { cx: 6, cy: 17, r: 2.2, stroke: '#2BB984', strokeWidth: 1.6 }], ['circle', { cx: 18, cy: 12, r: 2.2, stroke: '#2BB984', strokeWidth: 1.6 }], ['path', { d: 'M8 8l8 3M8 16l8-3', stroke: '#2BB984', strokeWidth: 1.4 }]],
                },
                {
                  en: 'Infrastructure (future)', zh: '基礎設施（未來擴充）',
                  enItems: ['Kubernetes orchestration', 'FastAPI unified gateway', 'Kafka / RabbitMQ streaming', 'Prometheus monitoring · learning loop'],
                  zhItems: ['Kubernetes 容器編排', 'FastAPI 統一閘道', 'Kafka / RabbitMQ 事件串流', 'Prometheus 監控 · 持續學習迴圈'],
                  ip: [['path', { d: 'M12 2.6l8.2 4.7v9.4L12 21.4 3.8 16.7V7.3z', stroke: '#E05572', strokeWidth: 1.6, strokeLinejoin: 'round' }], ['circle', { cx: 12, cy: 12, r: 2.4, stroke: '#E05572', strokeWidth: 1.5 }]],
                },
              ].map(panel => React.createElement('div', { key: panel.en, className: 'arch-abs-panel' },
                React.createElement('div', { className: 'arch-abs-panel-head' },
                  React.createElement('svg', { width: 19, height: 19, viewBox: '0 0 24 24', fill: 'none' }, ...panel.ip.map(([t, p], i) => React.createElement(t, { ...p, key: i }))),
                  React.createElement('span', { className: 'arch-abs-panel-title' }, PA ? panel.zh : panel.en)
                ),
                React.createElement('div', { className: 'arch-abs-panel-items' },
                  ...(PA ? panel.zhItems : panel.enItems).map(item =>
                    React.createElement('div', { key: item }, `· ${item}`)
                  )
                )
              ))
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '06 / 功能亮點' : '06 / Feature system'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '讓功能回到使用者、諮商端與導入場域。' : 'Features mapped to the user, counselor, and adoption context.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '這些功能不是規格清單，而是對應到提案中的真實情境：學生如何願意說、系統如何辨識、諮商端如何使用，以及未來如何擴散到其他支持場域。'
            : 'These are not generic specs. They map to proposal scenarios: how students begin, how the system interprets, how counselors use the output, and how the model expands to other support settings.'
        )
      ),
      React.createElement('div', { className: 'emobot-feature-grid' },
        ...features.map(item => React.createElement('article', { className: 'emobot-feature-card', key: item.title },
          React.createElement('div', { className: 'emobot-card-icon' }, React.createElement(Icon, { name: item.iconKey })),
          React.createElement('h4', { className: 'emobot-card-title' }, pick(item, 'title')),
          React.createElement('p', { className: 'emobot-card-body' }, pick(item, 'body'))
        ))
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '07 / 使用者研究與實驗分析' : '07 / User research and experiment analysis'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '我把使用者研究做成可回饋產品決策的證據系統。' : 'I turned user research into an evidence system for product decisions.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '此區塊整合完整使用者研究工作：質性訪談、使用者設計問卷、原型互動測試、對話語意分析與量化分析。重點不是只證明有人使用，而是讓研究結果直接改變 onboarding、人設媒合、支持語氣與安全銜接設計。'
            : 'This section combines complete user research work: qualitative interviews, design questionnaires, prototype response testing, dialogue semantic analysis, and quantitative analysis. The goal is not only to prove usage, but to let evidence reshape onboarding, persona matching, support tone, and safe handoff.'
        )
      ),
      React.createElement('div', { className: 'emobot-research-lab' },
        React.createElement('div', { className: 'emobot-research-flow' },
          ...researchMethods.map((step, i) =>
            React.createElement('div', { className: 'emobot-research-flow-step', key: step.label },
              React.createElement('div', { className: 'emobot-research-flow-num' }, `Step ${i + 1}`),
              React.createElement('div', { className: 'emobot-research-flow-icon' },
                React.createElement(Icon, { name: step.iconKey })
              ),
              React.createElement('div', { className: 'emobot-research-flow-badge' }, PA ? step.zhTitle : step.title),
              React.createElement('div', { className: 'emobot-research-flow-desc' }, PA ? step.zhBody : step.body)
            )
          )
        ),
        React.createElement('div', { className: 'emobot-research-artifacts' },
          ...researchArtifacts.map(item => React.createElement('figure', { className: `emobot-research-artifact${item.wide ? ' wide' : ''}`, key: item.src },
            React.createElement('div', { className: 'emobot-research-artifact-image' },
              React.createElement('img', { src: item.src, alt: PA ? item.zhTitle : item.title, loading: 'lazy', decoding: 'async' })
            ),
            React.createElement('figcaption', { className: 'emobot-research-artifact-caption' },
              React.createElement('div', null,
                React.createElement('div', { className: 'emobot-research-artifact-meta' }, PA ? item.zhMeta : item.meta),
                React.createElement('h4', null, PA ? item.zhTitle : item.title),
                React.createElement('p', null, PA ? item.zhDesc : item.desc)
              ),
              React.createElement('span', { className: 'emobot-research-artifact-badge' }, item.badge)
            )
          ))
        ),
        React.createElement('div', { className: 'emobot-research-insights' },
          ...researchInsights.map(item => React.createElement('article', { className: 'emobot-research-insight', key: item.label },
            React.createElement('span', null, PA ? item.zhLabel : item.label),
            React.createElement('strong', null, PA ? item.zhTitle : item.title),
            React.createElement('p', null, PA ? item.zhBody : item.body)
          ))
        )
      )
    ),
    React.createElement('div', { className: 'proj-section reveal emobot-case-section' },
      React.createElement('div', { className: 'emobot-section-head' },
        React.createElement('div', null,
          React.createElement('div', { className: 'emobot-section-kicker' }, PA ? '08 / 佐證素材預留區' : '08 / Evidence slots'),
          React.createElement('h3', { className: 'emobot-section-title' }, PA ? '讓作品集之後能直接接上真實畫面與文件。' : 'A page ready for real artifacts, screenshots, and documents.')
        ),
        React.createElement('p', { className: 'emobot-section-copy' },
          PA
            ? '此區塊先保留完整素材位置，後續可以替換為得獎截圖、提案書頁面、MVP 操作畫面、使用者流程或報告輸出。'
            : 'These slots are prepared for award screenshots, proposal pages, MVP screens, user flows, and report artifacts once final assets are ready.'
        )
      ),
      React.createElement('div', { className: 'emobot-evidence-grid' },
        ...evidence.map(item => React.createElement('article', { className: 'emobot-evidence-card', key: item.title },
          React.createElement('div', { className: 'emobot-evidence-placeholder' }, React.createElement(Icon, { name: item.iconKey })),
          React.createElement('h4', { className: 'emobot-card-title' }, pick(item, 'title')),
          React.createElement('p', { className: 'emobot-card-body' }, pick(item, 'body'))
        ))
      )
    )
  );
}
