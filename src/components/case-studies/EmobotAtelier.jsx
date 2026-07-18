import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../ui/Icon.jsx';

// Design-evidence assets (bundled from repo-root /assets via Vite new URL)
const canvasV2 = new URL('../../../assets/emobot/design-evidence/planning-canvas-v2.webp', import.meta.url).href;
const canvasV1 = new URL('../../../assets/emobot/design-evidence/planning-canvas.webp', import.meta.url).href;
const lofiV2 = new URL('../../../assets/emobot/design-evidence/low-fi-flow-v2.webp', import.meta.url).href;
const lofiV1 = new URL('../../../assets/emobot/design-evidence/low-fi-flow.webp', import.meta.url).href;
const hifiScreens = new URL('../../../assets/emobot/design-evidence/high-fi-screens.webp', import.meta.url).href;
const liveHome = new URL('../../../assets/emobot/design-evidence/live-home.webp', import.meta.url).href;
const liveLogin = new URL('../../../assets/emobot/design-evidence/live-login.webp', import.meta.url).href;
const matchResult = new URL('../../../assets/emobot/design-evidence/actual-match-result.webp', import.meta.url).href;
const crisisChat = new URL('../../../assets/emobot/design-evidence/actual-crisis-chat.webp', import.meta.url).href;
const systemSketch = new URL('../../../assets/System architecture wireframe.png', import.meta.url).href;

const LIVE_URL = 'https://emobot-plus.vercel.app';

const h = React.createElement;

// ---- local IntersectionObserver hook for the sticky spine -----------------
function useActiveStage(count) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const ratios = new Array(count).fill(0);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const i = refs.current.indexOf(e.target);
        if (i >= 0) ratios[i] = e.isIntersecting ? e.intersectionRatio : 0;
      });
      let best = 0;
      let bestRatio = -1;
      ratios.forEach((r, i) => { if (r > bestRatio) { bestRatio = r; best = i; } });
      if (bestRatio > 0) setActive(best);
    }, { rootMargin: '-38% 0px -42%', threshold: [0.01, 0.25, 0.5, 0.75, 1] });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);
  return [active, refs];
}

export default function EmobotAtelier({ lang, onZoom, children }) {
  const PA = lang === 'zh';
  const t = (en, zh) => (PA ? zh : en);

  const stages = [
    {
      id: 'canvas',
      step: '01',
      icon: 'map',
      tool: 'FigJam',
      label: t('Frame the route', '定義路徑'),
      claim: t('Put the whole support journey on one canvas.', '先把整段支持旅程，攤在同一張畫布上。'),
      story: t(
        'Before a single screen, the job was to see the system whole — where consent sits, how matching feeds chat, and where a crisis message has to branch off toward real people.',
        '在畫任何一個畫面之前，要先把系統看成一個整體：知情同意放在哪、媒合如何餵給對話，以及一則危機訊息必須在哪裡分岔、轉向真正的人。'
      ),
      badge: 'recon',
      provenance: t('Reconstructed from the shipped product', '依實際成品逆向重建'),
      constraint: t('Login, assessment, and chat cannot feel like three disconnected features.', '登入、評估與對話不能像三個彼此分離的功能。'),
      decision: t('Place consent before assessment; treat crisis routing as a dedicated branch.', '將知情同意放在評估之前，把危機轉介設計成獨立分支。'),
      output: t('Route map · component inventory · crisis flow', '路徑圖 · 元件盤點 · 危機流程'),
      iterations: [
        {
          tag: 'v1', kicker: t('First pass · diverge', '第一輪 · 發散'),
          note: t('English service blueprint — mapping every service before choosing a shape.', '英文服務藍圖——在選定形狀前，先攤開每一項服務。'),
          image: { code: 'CANVAS / v1', title: 'First-pass service blueprint', zhTitle: '第一輪服務藍圖', src: canvasV1, alt: 'Dark FigJam service blueprint with entry, match, conversation, insight, referral columns', zhAlt: '深色 FigJam 服務藍圖，含入口、媒合、對話、洞察、轉介欄位' },
        },
        {
          tag: 'v2', kicker: t('Second pass · converge', '第二輪 · 收斂'),
          note: t('Redrawn against the real screens — routes, components, and the crisis branch aligned to what shipped.', '對齊實際畫面重畫——路徑、元件與危機分支都收斂到最終成品。'),
          image: { code: 'CANVAS / v2', title: 'Reconstructed product planning canvas', zhTitle: '重建的產品規劃畫布', src: canvasV2, alt: 'Planning canvas connecting Emobot screens, components, routes, and crisis response', zhAlt: '串聯 Emobot 畫面、元件、路徑與危機回應的規劃畫布' },
        },
      ],
      pins: [
        { x: 16, y: 30, title: t('Route map', '路徑圖'), body: t('Home → login → assessment → match → chat, with a 5a crisis exit.', '首頁 → 登入 → 評估 → 媒合 → 對話，外加 5a 危機出口。') },
        { x: 20, y: 62, title: t('Consent checkpoint', '同意檢查點'), body: t('Opt-in gate sits before any analysis runs.', '任何分析執行前，先過知情同意這一關。') },
        { x: 78, y: 55, title: t('Crisis routing', '危機轉介'), body: t('A high-risk signal breaks out to campus safety and hotlines.', '高風險訊號會跳出主流程，轉向校安與求助專線。') },
      ],
    },
    {
      id: 'lofi',
      step: '02',
      icon: 'edit',
      tool: t('Grid paper', '方格紙'),
      label: t('Test the structure', '驗證結構'),
      claim: t('Test trust and safety before any visual polish.', '在任何視覺精修之前，先驗證信任感與安全路徑。'),
      story: t(
        'Low fidelity keeps the argument about behavior, not colour. The question here: can someone see why a companion was recommended, and can a high-risk line move cleanly toward professional help?',
        '低保真讓討論停留在「行為」而非「顏色」。這一步要問的是：使用者能不能看懂 AI 夥伴為什麼被推薦，以及一句高風險訊息能否乾淨地導向專業協助？'
      ),
      badge: 'recon',
      provenance: t('Reconstructed from the interaction flow', '依實際互動流程重建'),
      constraint: t('The match result must explain itself without slowing the next action.', '媒合結果必須說明依據，同時不能拖慢下一步。'),
      decision: t('Keep persona card, radar chart, and start-chat on one decision surface.', '把人格卡、雷達圖與開始聊天，留在同一個決策畫面。'),
      output: t('Desktop wireflow · safety edge state', '桌面 wireflow · 安全邊界狀態'),
      iterations: [
        {
          tag: 'v1', kicker: t('First pass · mobile', '第一輪 · 行動版'),
          note: t('A mobile hypothesis — six vertical screens from welcome to referral, plus edge cases.', '行動版假設——從歡迎到轉介的六個直向畫面，外加邊界情境。'),
          image: { code: 'WIREFLOW / v1', title: 'Mobile wireflow hypothesis', zhTitle: '行動版 wireflow 假設', src: lofiV1, alt: 'Mobile low-fidelity wireflow with welcome, check-in, match, chat, insight, referral', zhAlt: '行動版低保真流程，含歡迎、檢核、媒合、對話、洞察、轉介' },
        },
        {
          tag: 'v2', kicker: t('Second pass · desktop', '第二輪 · 桌面版'),
          note: t('Converged to the desktop journey, with the hardest edge — the crisis branch — wired end to end.', '收斂為桌面旅程，把最難的邊界——危機分支——完整接起來。'),
          image: { code: 'WIREFLOW / v2', title: 'Desktop wireflow and safety branch', zhTitle: '桌面 wireflow 與安全分支', src: lofiV2, alt: 'Desktop low-fidelity Emobot wireflow from home to safety handoff', zhAlt: '從首頁一路連到安全轉介的桌面低保真流程' },
        },
      ],
      pins: [
        { x: 50, y: 20, ink: 'blue', title: t('Explainable match', '可解釋媒合'), body: t('Radar chart earns trust before the chat begins.', '雷達圖在對話開始前先建立信任。') },
        { x: 72, y: 74, ink: 'red', title: t('Safety branch', '安全分支'), body: t('High-risk detected → resources surface in-context.', '偵測高風險 → 資源在對話內即時浮現。') },
      ],
    },
    {
      id: 'hifi',
      step: '03',
      icon: 'monitor',
      tool: 'Figma',
      label: t('Pressure-test the look', '打磨視覺語言'),
      claim: t('Explore the visual language, then converge it.', '探索視覺語言，再把它收斂下來。'),
      story: t(
        'A high-fidelity exploration set the calm, low-pressure tone: soft blue, gentle type, a companion that listens. This English mobile study is where the mood was found — the shipped product then carried that mood into a Chinese desktop build.',
        '一組高保真探索定下了溫和、低壓的基調：柔和藍、平靜的字、一個願意聆聽的夥伴。這份英文行動版研究是「氣質」被找到的地方——最終成品再把這份氣質帶進中文桌面版。'
      ),
      badge: 'recon',
      provenance: t('Reconstructed visual-language study', '重建的視覺語言探索'),
      constraint: t('It must feel gentle, yet still turn decisively toward professional resources.', '體驗要保持溫和，但遇到風險時仍要明確導向專業資源。'),
      decision: t('Lock a pale-blue system, soft cards, and a persistent privacy line.', '定下淡藍色系、柔卡片，以及常駐的隱私聲明。'),
      output: t('Companion pick · chat · insight · counselor handoff', '夥伴挑選 · 對話 · 洞察 · 諮商轉介'),
      dimension: '1586 × 992',
      swatches: [
        { hex: '#DCE7F6', name: t('Calm base', '沉靜底') },
        { hex: '#2E3A73', name: t('Trust ink', '信任靛') },
        { hex: '#F2D79B', name: t('Warm accent', '暖點綴') },
        { hex: '#B7C8FF', name: t('Companion', '夥伴藍') },
      ],
      layers: ['Find your companion', 'Chat / listening', 'Your insight', 'Share with counselor'],
      carry: [
        { from: t('Persistent privacy line', '常駐隱私聲明'), to: t('kept on the live chat surface', '保留在實際對話畫面') },
        { from: t('Companion-choice cards', '夥伴選擇卡'), to: t('became the match-result page', '成為媒合結果頁') },
        { from: t('Reflect / insight summary', '反思 / 洞察摘要'), to: t('feeds the emotion analysis', '接進情緒分析') },
      ],
      image: { code: 'HI-FI / STUDY', title: 'High-fidelity visual-language study', zhTitle: '高保真視覺語言探索', src: hifiScreens, alt: 'Four high-fidelity Emobot screens: companion pick, chat, insight, counselor handoff', zhAlt: 'Emobot 四張高保真畫面：夥伴挑選、對話、洞察、諮商轉介' },
    },
    {
      id: 'live',
      step: '04',
      icon: 'monitor',
      tool: t('Live build', '線上實裝'),
      label: t('Ship it', '實際上線'),
      claim: t('Not mockups — the deployed product, in a real browser.', '不是示意稿——是真正上線、跑在瀏覽器裡的成品。'),
      story: t(
        'Everything above resolves here: a calm entry, an ID login, an explainable match, and a Niko AI reply that meets a crisis with real resources. These are captures of the live build.',
        '前面的每一步，都在這裡收束：低壓入口、ID 登入、可解釋的媒合，以及 Niko AI 在危機時刻端出真實資源的回覆。這些都是實際上線版本的截圖。'
      ),
      badge: 'live',
      provenance: t('Captures of the deployed product', '實際上線產品截圖'),
      constraint: t('The gentle surface must still act decisively under risk.', '溫和的介面在風險下仍要果斷行動。'),
      decision: t('Calm entry, visualized matching, in-context safety reply with resources.', '低壓入口、視覺化媒合，對話內含可行資源的安全回覆。'),
      output: t('Home · ID login · match result · crisis chat', '首頁 · ID 登入 · 媒合結果 · 危機對話'),
      tabs: [
        { key: 'home', label: t('Home', '首頁'), path: '/', code: 'LIVE / HOME', title: t('Emobot+ live home', 'Emobot+ 實際首頁'), src: liveHome, alt: 'Live Emobot home page', zhAlt: 'Emobot 實際首頁' },
        { key: 'login', label: t('Login', '登入'), path: '/Login', code: 'LIVE / LOGIN', title: t('Emobot+ ID login', 'Emobot+ ID 登入'), src: liveLogin, alt: 'Live Emobot ID login page', zhAlt: 'Emobot 實際 ID 登入頁' },
        { key: 'match', label: t('Match', '媒合'), path: t('  ·  signed-in area', '  ·  登入區'), code: 'PRODUCT / MATCH', title: t('Amanda match result', 'Amanda 媒合結果'), src: matchResult, alt: 'Emobot match result with Amanda persona and radar chart', zhAlt: '含 Amanda 人格卡與雷達圖的媒合結果' },
        { key: 'crisis', label: t('Safety', '危機'), path: t('  ·  signed-in area', '  ·  登入區'), code: 'PRODUCT / SAFETY', title: t('Niko crisis-support response', 'Niko 危機支持回應'), src: crisisChat, alt: 'Emobot Niko AI chat with crisis-support resources', zhAlt: '含危機支持資源的 Niko AI 對話' },
      ],
    },
    {
      id: 'system',
      step: '05',
      icon: 'layers',
      tool: 'K8s · FastAPI',
      label: t('Deliver the system', '交付系統'),
      claim: t('The final deliverable is not a screen — it is the system.', '最後交付的不是畫面，而是整套系統。'),
      story: t(
        'Beneath every screen sits a set of separated services. A FastAPI gateway fronts an event-driven mesh of AI services, each holding its own datastore, all orchestrated on Kubernetes — so safety routing never leans on a single chat service or one database. It began as a hand sketch; this is the architecture that shipped.',
        '每一個畫面之下，都是一組被拆分的服務。FastAPI 統一閘道對接事件驅動的 AI 服務網格，各自持有獨立資料庫，全部由 Kubernetes 編排——讓安全轉介永遠不依賴單一對話服務或單一資料庫。一切始於一張手繪草圖，而這是最後交付上線的架構。'
      ),
      badge: 'recon',
      provenance: t('Formal redraw of the original architecture spec', '依原始架構規格正式重繪'),
      constraint: t('Safety routing cannot lean on one chat service or one database.', '安全轉介不能只依賴單一對話服務或單一資料庫。'),
      decision: t('Separate matching, emotion chat, avatar, risk detection, and referral.', '拆分媒合、情緒對話、Avatar、風險偵測與轉介的責任。'),
      output: t('Client · gateway · AI services · data · referral', '客戶端 · 閘道 · AI 服務 · 資料 · 轉介'),
      sketch: { code: 'SOURCE / SYSTEM', title: 'Original Emobot system architecture sketch', zhTitle: 'Emobot 原始系統架構草圖', src: systemSketch, alt: 'Original Emobot system architecture sketch', zhAlt: 'Emobot 原始系統架構草圖' },
    },
  ];

  const [active, stageRefs] = useActiveStage(stages.length);
  const [iter, setIter] = useState({ canvas: 1, lofi: 1 });
  const [liveTab, setLiveTab] = useState(0);
  const [openPin, setOpenPin] = useState(null);
  const tabsRef = useRef(null);

  // Mobile: the dense architecture diagram is collapsed into a card that opens a fullscreen, pannable overlay.
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 680px)').matches);
  const [blueprintOpen, setBlueprintOpen] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 680px)');
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  useEffect(() => {
    if (!blueprintOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setBlueprintOpen(false); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [blueprintOpen]);
  useEffect(() => { if (!isMobile) setBlueprintOpen(false); }, [isMobile]);

  const scrollToStage = (i) => {
    stageRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navTabs = (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const n = stages[3].tabs.length;
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : (liveTab + (e.key === 'ArrowRight' ? 1 : -1) + n) % n;
    setLiveTab(next);
    requestAnimationFrame(() => tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus());
  };

  const zoomBtn = (image) => h('button', {
    className: 'atelier-zoom', type: 'button',
    onClick: () => onZoom?.(image),
    'aria-label': t(`Enlarge: ${image.title}`, `放大檢視：${image.zhTitle}`),
  }, h(Icon, { name: 'maximize' }));

  const badgeStamp = (kind, textEn, textZh) => h('span', {
    className: `atelier-stamp atelier-stamp-${kind}`,
  }, kind === 'live'
    ? h('span', { className: 'atelier-stamp-dot' })
    : h('span', { className: 'atelier-stamp-ring' }),
    t(textEn, textZh));

  // ---- per-medium frames ---------------------------------------------------
  const canvasFrame = (stage) => {
    const idx = iter[stage.id];
    const it = stage.iterations[idx];
    return h('div', { className: 'atelier-frame frame-figjam' },
      h('div', { className: 'figjam-bar' },
        h('span', { className: 'figjam-file' },
          h('span', { className: 'figjam-dot-mark' }),
          t('Emobot — planning', 'Emobot — 規劃')),
        h('span', { className: 'figjam-cursors' },
          h('i', { style: { '--c': '#b7c8ff' } }),
          h('i', { style: { '--c': '#d8c5a4' } }),
          h('i', { style: { '--c': '#8fe3c8' } })),
        h('span', { className: 'figjam-zoom' }, '42%')),
      h('div', { className: 'figjam-board' },
        h('button', {
          className: 'atelier-plate-img', type: 'button', key: it.tag,
          onClick: () => onZoom?.(it.image),
          'aria-label': t(`Enlarge: ${it.image.title}`, `放大檢視：${it.image.zhTitle}`),
        }, h('img', { src: it.image.src, alt: PA ? it.image.zhAlt : it.image.alt, loading: 'lazy', decoding: 'async' })),
        zoomBtn(it.image),
        idx === 1 && stage.pins.map((p, i) => pin(stage.id, i, p)),
      ),
    );
  };

  const lofiFrame = (stage) => {
    const idx = iter[stage.id];
    const it = stage.iterations[idx];
    return h('div', { className: 'atelier-frame frame-paper' },
      h('div', { className: 'paper-titleblock' },
        h('span', { className: 'paper-title-main' }, t('WIREFLOW SHEET', '低保真流程圖')),
        h('span', { className: 'paper-title-meta' }, `SHT-02 · ${it.tag.toUpperCase()}`)),
      h('div', { className: 'paper-board' },
        ['tl', 'tr', 'bl', 'br'].map((c) => h('span', { key: c, className: `paper-reg paper-reg-${c}`, 'aria-hidden': 'true' })),
        h('button', {
          className: 'atelier-plate-img', type: 'button', key: it.tag,
          onClick: () => onZoom?.(it.image),
          'aria-label': t(`Enlarge: ${it.image.title}`, `放大檢視：${it.image.zhTitle}`),
        }, h('img', { src: it.image.src, alt: PA ? it.image.zhAlt : it.image.alt, loading: 'lazy', decoding: 'async' })),
        zoomBtn(it.image),
        idx === 1 && stage.pins.map((p, i) => pin(stage.id, i, p)),
      ),
    );
  };

  const hifiFrame = (stage) => h('div', { className: 'atelier-frame frame-figma' },
    h('div', { className: 'figma-bar' },
      h('span', { className: 'figma-menu' }, h('span'), h('span'), h('span')),
      h('span', { className: 'figma-file' }, t('emobot-hifi · Page 1', 'emobot-hifi · Page 1')),
      h('span', { className: 'figma-share' }, t('Share', '分享'))),
    h('div', { className: 'figma-body' },
      h('div', { className: 'figma-layers', 'aria-hidden': 'true' },
        h('span', { className: 'figma-panel-h' }, 'Layers'),
        stage.layers.map((l, i) => h('span', { key: i, className: 'figma-layer' },
          h('i', { className: 'figma-layer-ic' }), l))),
      h('div', { className: 'figma-canvas' },
        h('div', { className: 'figma-selection' },
          h('button', {
            className: 'atelier-plate-img', type: 'button',
            onClick: () => onZoom?.(stage.image),
            'aria-label': t(`Enlarge: ${stage.image.title}`, `放大檢視：${stage.image.zhTitle}`),
          }, h('img', { src: stage.image.src, alt: PA ? stage.image.zhAlt : stage.image.alt, loading: 'lazy', decoding: 'async' })),
          ['tl', 'tr', 'bl', 'br', 'tc', 'bc', 'lc', 'rc'].map((c) => h('span', { key: c, className: `figma-handle figma-handle-${c}`, 'aria-hidden': 'true' })),
          h('span', { className: 'figma-dim' }, stage.dimension)),
        zoomBtn(stage.image)),
      h('div', { className: 'figma-props', 'aria-hidden': 'true' },
        h('span', { className: 'figma-panel-h' }, t('Fill', '填色')),
        stage.swatches.map((s, i) => h('span', { key: i, className: 'figma-swatch' },
          h('i', { style: { background: s.hex } }),
          h('span', { className: 'figma-swatch-hex' }, s.hex.replace('#', '')),
          h('span', { className: 'figma-swatch-name' }, s.name))))),
  );

  const liveFrame = (stage) => {
    const tab = stage.tabs[liveTab];
    return h('div', { className: 'atelier-frame frame-browser' },
      h('div', { className: 'browser-bar' },
        h('span', { className: 'browser-lights' }, h('i'), h('i'), h('i')),
        h('div', {
          className: 'browser-tabs', role: 'tablist', ref: tabsRef,
          onKeyDown: navTabs, 'aria-label': t('Live screens', '線上畫面'),
        },
          stage.tabs.map((tb, i) => h('button', {
            key: tb.key, type: 'button', role: 'tab',
            className: `browser-tab${i === liveTab ? ' active' : ''}`,
            id: `atelier-livetab-${tb.key}`,
            'aria-selected': i === liveTab,
            'aria-controls': 'atelier-live-panel',
            tabIndex: i === liveTab ? 0 : -1,
            onClick: () => setLiveTab(i),
          }, tb.label))),
        h('span', { className: 'browser-live' }, h('i'), 'LIVE')),
      h('div', { className: 'browser-url' },
        h(Icon, { name: 'shield' }),
        h('span', null, h('b', null, 'emobot-plus.vercel.app'), tab.path === '/' ? '' : tab.path)),
      h('div', {
        className: 'browser-viewport', id: 'atelier-live-panel',
        role: 'tabpanel', 'aria-labelledby': `atelier-livetab-${tab.key}`, key: tab.key,
      },
        h('button', {
          className: 'atelier-plate-img', type: 'button',
          onClick: () => onZoom?.(tab),
          'aria-label': t(`Enlarge: ${tab.title}`, `放大檢視：${tab.zhTitle}`),
        }, h('img', { src: tab.src, alt: PA ? tab.zhAlt : tab.alt, loading: 'lazy', decoding: 'async' })),
        zoomBtn(tab)),
    );
  };

  const pin = (stageId, i, p) => {
    const id = `${stageId}-${i}`;
    const open = openPin === id;
    return h('div', {
      key: i,
      className: `atelier-pin${p.ink ? ` ink-${p.ink}` : ''}${open ? ' open' : ''}`,
      style: { left: `${p.x}%`, top: `${p.y}%` },
    },
      h('button', {
        type: 'button', className: 'atelier-pin-dot',
        'aria-expanded': open, 'aria-label': p.title,
        onClick: () => setOpenPin(open ? null : id),
      }, i + 1),
      h('span', { className: 'atelier-pin-card', role: 'note' },
        h('strong', null, p.title),
        h('span', null, p.body)),
    );
  };

  const iterToggle = (stage) => h('div', { className: 'atelier-iter', role: 'group', 'aria-label': t('Iteration', '迭代版本') },
    stage.iterations.map((it, i) => h('button', {
      key: it.tag, type: 'button',
      className: `atelier-iter-btn${iter[stage.id] === i ? ' active' : ''}`,
      'aria-pressed': iter[stage.id] === i,
      onClick: () => setIter((s) => ({ ...s, [stage.id]: i })),
    }, h('b', null, it.tag), it.kicker)));

  const activeIterNote = (stage) => h('p', { className: 'atelier-iter-note' },
    stage.iterations[iter[stage.id]].note);

  const noteCards = (stage) => h('div', { className: 'atelier-notes' },
    [
      { k: t('Constraint', '限制'), v: stage.constraint },
      { k: t('Design move', '設計決策'), v: stage.decision },
      { k: t('Output', '產出'), v: stage.output },
    ].map((n, i) => h('div', { key: i, className: 'atelier-note' },
      h('span', { className: 'atelier-note-k' }, n.k),
      h('p', null, n.v))),
  );

  const blueprintSource = (stage) => h('div', { className: 'atelier-blueprint-source' },
    h('figure', { className: 'blueprint-source-fig' },
      h('span', { className: 'blueprint-source-stamp' }, badgeStamp('recon', 'Source artifact', '原始素材')),
      h('img', { src: stage.sketch.src, alt: PA ? stage.sketch.zhAlt : stage.sketch.alt, loading: 'lazy', decoding: 'async' })),
    h('div', { className: 'blueprint-source-copy' },
      h('span', { className: 'blueprint-source-k' }, t('Where it began', '起點')),
      h('p', null, t('The hand sketch the services started from — the delivered blueprint below was drawn straight off it.', '服務最初的手繪草圖——下方正式交付的系統藍圖，就是照著它畫出來的。'))),
    h('span', { className: 'blueprint-source-arrow', 'aria-hidden': 'true' }),
  );

  const blueprintFrame = () => h('div', { className: 'atelier-frame frame-blueprint' },
    h('div', { className: 'blueprint-bar' },
      h('span', { className: 'blueprint-title-main' }, t('SYSTEM BLUEPRINT', '系統架構藍圖')),
      h('span', { className: 'blueprint-grid-badge', 'aria-hidden': 'true' },
        h(Icon, { name: 'layers' }), t('DELIVERED', '交付版')),
      h('span', { className: 'blueprint-title-meta' }, 'SHT-05 · FINAL')),
    h('div', { className: 'blueprint-board' },
      isMobile
        ? h('button', {
            className: 'blueprint-collapsed', type: 'button',
            onClick: () => setBlueprintOpen(true),
            'aria-label': t('Open the full system architecture diagram', '展開完整系統架構圖'),
          },
            h('span', { className: 'blueprint-collapsed-grid', 'aria-hidden': 'true' }),
            h('span', { className: 'blueprint-collapsed-ic' }, h(Icon, { name: 'layers' })),
            h('strong', null, t('System architecture', '系統架構全圖')),
            h('small', null, t('Client · gateway · AI mesh · data · referral', '客戶端 · 閘道 · AI 網格 · 資料 · 轉介')),
            h('span', { className: 'blueprint-collapsed-cta' }, h(Icon, { name: 'maximize' }), t('Tap to explore the full diagram', '點開瀏覽完整互動全圖')))
        : children),
  );

  const frameFor = (stage) => {
    if (stage.id === 'canvas') return canvasFrame(stage);
    if (stage.id === 'lofi') return lofiFrame(stage);
    if (stage.id === 'hifi') return hifiFrame(stage);
    if (stage.id === 'system') return blueprintFrame();
    return liveFrame(stage);
  };

  return h(React.Fragment, null,
    h('section', { className: 'emobot-atelier', 'aria-label': t('How Emobot+ was made', 'Emobot+ 開發歷程') },
    // legend strip (title duties belong to the section head above)
    h('div', { className: 'atelier-legend' },
      h('span', { className: 'atelier-legend-item' }, h('span', { className: 'atelier-stamp-ring' }), t('Reconstruction — reverse-built from the real product', '重建稿 — 依實際成品逆向重建')),
      h('span', { className: 'atelier-legend-item' }, h('span', { className: 'atelier-stamp-dot' }), t('Live capture — from the deployed build', '實機紀錄 — 擷取自上線版本'))),
    // body
    h('div', { className: 'atelier-body' },
      // sticky spine
      h('nav', { className: 'atelier-spine', 'aria-label': t('Development stages', '開發階段') },
        h('span', { className: 'atelier-spine-track', 'aria-hidden': 'true' }),
        h('span', {
          className: 'atelier-spine-fill', 'aria-hidden': 'true',
          style: { height: `${(active / (stages.length - 1)) * 100}%` },
        }),
        stages.map((s, i) => h('button', {
          key: s.id, type: 'button',
          className: `atelier-spine-node${i === active ? ' active' : ''}${i < active ? ' done' : ''}`,
          'aria-current': i === active ? 'step' : undefined,
          onClick: () => scrollToStage(i),
        },
          h('span', { className: 'atelier-spine-num' }, s.step),
          h('span', { className: 'atelier-spine-label' }, s.label))),
      ),
      // plates
      h('div', { className: 'atelier-plates' },
        stages.map((stage, i) => h('article', {
          key: stage.id,
          className: `atelier-plate plate-${stage.id}`,
          ref: (el) => { stageRefs.current[i] = el; },
        },
          h('div', { className: 'atelier-plate-head' },
            h('span', { className: 'atelier-plate-step' }, stage.step),
            h('div', { className: 'atelier-plate-headmain' },
              h('div', { className: 'atelier-plate-toprow' },
                h('span', { className: 'atelier-tool' }, h(Icon, { name: stage.icon }), stage.tool),
                stage.badge === 'live'
                  ? badgeStamp('live', 'Live capture', '實機紀錄')
                  : badgeStamp('recon', 'Reconstruction', '重建稿')),
              h('h5', null, stage.claim),
              h('p', { className: 'atelier-plate-story' }, stage.story),
              h('span', { className: 'atelier-plate-prov' }, stage.provenance))),
          (stage.id === 'canvas' || stage.id === 'lofi') && h('div', { className: 'atelier-iter-wrap' },
            iterToggle(stage), activeIterNote(stage)),
          stage.id === 'system' && blueprintSource(stage),
          frameFor(stage),
          stage.id === 'hifi' && h('div', { className: 'atelier-carry' },
            h('span', { className: 'atelier-carry-h' }, t('Carried into the product', '帶進實際成品')),
            h('ul', null, stage.carry.map((c, ci) => h('li', { key: ci },
              h('b', null, c.from), h('i', null, '→'), h('span', null, c.to))))),
          stage.id === 'live' && h('div', { className: 'atelier-live-links' },
            h('a', { href: LIVE_URL, target: '_blank', rel: 'noreferrer' },
              h(Icon, { name: 'monitor' }), t('Open live site ↗', '開啟實站 ↗')),
            h('a', { href: `${LIVE_URL}/Login`, target: '_blank', rel: 'noreferrer' },
              t('Open /Login ↗', '開啟 /Login ↗'))),
          noteCards(stage),
        )),
      ),
    ),
    ),
    isMobile && blueprintOpen ? createPortal(
      h('div', {
        className: 'blueprint-overlay', role: 'dialog', 'aria-modal': 'true',
        'aria-label': t('System architecture blueprint', '系統架構藍圖'),
        onClick: () => setBlueprintOpen(false),
      },
        h('div', { className: 'blueprint-overlay-bar' },
          h('span', { className: 'blueprint-overlay-title' },
            h(Icon, { name: 'layers' }), t('System blueprint', '系統架構全圖')),
          h('button', {
            className: 'blueprint-overlay-close', type: 'button',
            onClick: () => setBlueprintOpen(false), 'aria-label': t('Close', '關閉'),
          }, '×')),
        h('div', { className: 'blueprint-overlay-scroll', onClick: (e) => e.stopPropagation() }, children),
        h('span', { className: 'blueprint-overlay-hint' }, t('Swipe to pan the full diagram', '滑動即可瀏覽完整全圖'))),
      document.body) : null
  );
}
