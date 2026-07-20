import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import SectionModule, { injectStyles, useI18n, ProvenanceBadge } from './shared/dtKit.jsx';
import { MODULES } from './data/dtContent.js';

const MOD = MODULES.find(m => m.key === 'M07');

const IMG_BASE = (import.meta.env.BASE_URL || '/') + 'dataroom/';

const ARTIFACTS = [
  {
    id: 'index', fig: 'fig01-company-index.png', figNo: '01', figKind: { en: 'DIRECTORY', zh: '公司索引' },
    title: { en: 'Startup / DeepTech Company Index', zh: 'Startup / DeepTech Company Index' },
    desc: { en: 'Search companies by name, aliases, industry tags, and review status to quickly access company profiles for research.', zh: '依公司名稱、別名、產業標籤與審核狀態搜尋企業，快速查詢供研究使用的公司檔案。' },
    caption: { en: 'Company records by industry category, stacked by review status — with a live query preview and entity-resolution metrics.', zh: '依產業類別的公司記錄數並以審核狀態堆疊，右側為查詢預覽與實體解析指標。' },
    tables: ['companies', 'company_aliases', 'company_tags'],
  },
  {
    id: 'map', fig: 'fig02-deeptech-map.png', figNo: '02', figKind: { en: 'GEOSPATIAL', zh: '地理分布' },
    title: { en: 'Taiwan Semiconductor / DeepTech Map', zh: 'Taiwan Semiconductor / DeepTech Map' },
    desc: { en: 'Show company distribution by city, park, coordinates, and industry tags to support regional comparison and industry-cluster analysis.', zh: '依城市、園區、經緯度與產業標籤呈現企業分布，支援區域比較或與產業聚落分析。' },
    caption: { en: '1,247 companies geocoded to real park & city centroids, ranked by regional cluster.', zh: '1,247 家公司地理編碼至真實園區與城市中心點，並依區域群聚排名。' },
    tables: ['company_profiles', 'companies'],
  },
  {
    id: 'dashboard', fig: 'fig03-segmentation.png', figNo: '03', figKind: { en: 'SEGMENTATION', zh: '生態切面' },
    title: { en: 'Ecosystem Segmentation Dashboard', zh: 'Ecosystem Segmentation Dashboard' },
    desc: { en: 'Compare company categories, regional clusters, source coverage, and development trends to support industry mapping and research presentations.', zh: '比較企業類別、區域群聚、來源覆蓋率與發展趨勢，支援產業盤點與研究簡報。' },
    caption: { en: 'Four cuts: category mix, regional clustering heatmap, source-coverage depth, and founding-cohort trend.', zh: '四種切面：類別組成、區域群聚熱區、來源覆蓋深度與創立世代趨勢。' },
    tables: ['company_tags', 'companies'],
  },
  {
    id: 'brief', fig: 'fig04-research-brief.png', figNo: '04', figKind: { en: 'BRIEF', zh: '研究簡報' },
    title: { en: 'Research Brief Materials', zh: 'Research Brief Materials' },
    desc: { en: 'Turn the data into charts, summaries, and key findings for internal research, presentation meetings, and stakeholder communication.', zh: '將資料整理為可供內部研究、會議簡報與利害關係人溝通使用的圖表、摘要與重點發現。' },
    caption: { en: 'Records corroborated by each source, completeness by review status, and three supporting key findings.', zh: '各來源可佐證的公司比例、依審核狀態的完整度，以及三項重點發現。' },
    tables: ['company_profiles', 'company_sources'],
  },
  {
    id: 'package', fig: 'fig05-dataset-package.png', figNo: '05', figKind: { en: 'DELIVERY', zh: '資料包交付' },
    title: { en: 'Enriched Dataset Package', zh: 'Enriched Dataset Package' },
    desc: { en: 'Export CSV, XLSX, and query-ready data tables with source metadata, field definitions, and update rules to support follow-on analysis and handoff.', zh: '輸出為 CSV、XLSX 與可直接查詢的資料表，並附上來源 Metadata、欄位說明與更新規則，支援後續分析與交接。' },
    caption: { en: 'Six governed tables ship as one documented package — relational schema, field completeness, and export & governance rules.', zh: '六張受治理資料表交付為單一資料包：關聯結構、欄位完整度與匯出治理規則。' },
    tables: ['companies', 'company_profiles', 'company_tags', 'update_logs'],
  },
];

const DICTIONARY = [
  { field: 'company_id', type: { en: 'stable key', zh: 'stable key' }, source: 'company_sources', review: { en: 'required before export', zh: '匯出前需審核' } },
  { field: 'lat_lng', type: { en: 'geo pair', zh: 'geo pair' }, source: 'company_profiles', review: { en: 'required before map export', zh: '匯出地圖前需審核' } },
];

const COPY = {
  en: {
    title: 'Research Outputs Overview',
    lead: 'The database’s value ultimately lies in how it is used for subsequent research. Five outputs share the same company master records and source logs, allowing every map, chart, and data package to be traced back to its corresponding tables.',
    soWhat: 'Every output clearly identifies its source tables and export conditions. When stakeholders question a map, dashboard, or research brief, they can quickly return to the source data and processing records for confirmation.',
    soWhatLabel: 'Design focus →',
    fedBy: 'Fed by tables', dictionaryTitle: 'Field Dictionary & Export Rules',
    field: 'Field', type: 'Type', source: 'Source', review: 'Review',
    view: 'View full figure', figure: 'Figure', of: 'of', close: 'Close',
    prev: 'Previous figure', next: 'Next figure', zoomIn: 'Zoom in', zoomOut: 'Fit to view',
    openFull: 'Open full resolution', hint: 'Click a figure to open the full result',
  },
  zh: {
    title: '研究輸出總覽',
    lead: '資料庫的價值，最終體現在後續研究如何使用它。五種輸出共用同一套企業主檔與來源紀錄，讓每張地圖、圖表與資料包都能回查到對應資料表。',
    soWhat: '每項輸出都清楚標示來源資料表與匯出條件。當利害關係人對地圖、儀表板或研究摘要提出疑問時，可以快速回到資料來源與處理紀錄確認。',
    soWhatLabel: '設計重點 →',
    fedBy: '來源資料表', dictionaryTitle: '欄位字典與匯出規則',
    field: '欄位', type: '型別', source: '來源', review: '審核',
    view: '檢視完整圖表', figure: '圖', of: '/', close: '關閉',
    prev: '上一張', next: '下一張', zoomIn: '放大檢視', zoomOut: '符合視窗',
    openFull: '開啟原始圖檔', hint: '點選任一張圖以開啟完整結果圖',
  },
};

function IconChevron({ dir = 'left' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ transform: dir === 'right' ? 'rotate(180deg)' : 'none' }}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}
function IconZoom({ on }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
      <path d="M8 11h6" />{!on && <path d="M11 8v6" />}
    </svg>
  );
}
function IconExternal() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

// Project-page card thumbnails stay abstract (previous design) — the real figure
// only appears in the lightbox. `type` maps 1:1 to each artifact's id.
function OutputVisual({ type }) {
  if (type === 'index') return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="8" y="10" width="184" height="16" rx="3" fill="var(--dt-bg-3)" />
      <rect x="8" y="34" width="140" height="10" rx="2" fill="var(--dt-line-2)" />
      <rect x="8" y="50" width="164" height="10" rx="2" fill="var(--dt-line-2)" />
      <rect x="8" y="66" width="112" height="10" rx="2" fill="var(--dt-line-2)" />
      <circle cx="182" cy="18" r="5" fill="var(--dt-accent)" />
    </svg>
  );
  if (type === 'map') return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="8" y="8" width="184" height="80" rx="6" fill="var(--dt-bg-3)" />
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 20 + (i % 8) * 21;
        const y = 20 + Math.floor(i / 8) * 22;
        const hot = [3, 10, 14, 19].includes(i);
        return <circle key={i} cx={x} cy={y} r={hot ? 3.4 : 2} fill={hot ? 'var(--dt-accent)' : 'var(--dt-line-2)'} />;
      })}
    </svg>
  );
  if (type === 'dashboard') return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="8" y="52" width="24" height="34" fill="var(--dt-line-2)" />
      <rect x="40" y="34" width="24" height="52" fill="var(--dt-accent)" opacity="0.85" />
      <rect x="72" y="44" width="24" height="42" fill="var(--dt-line-2)" />
      <rect x="104" y="20" width="24" height="66" fill="var(--dt-accent)" opacity="0.55" />
      <polyline points="8,30 40,26 72,32 104,14 136,18" fill="none" stroke="var(--dt-accent)" strokeWidth="2" />
    </svg>
  );
  if (type === 'brief') return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="46" y="8" width="108" height="80" rx="4" fill="var(--dt-bg-3)" stroke="var(--dt-line-2)" />
      <rect x="58" y="22" width="60" height="8" rx="2" fill="var(--dt-accent)" opacity="0.7" />
      {[38, 50, 62, 74].map(y => <rect key={y} x="58" y={y} width="84" height="6" rx="2" fill="var(--dt-line-2)" />)}
    </svg>
  );
  return (
    <svg viewBox="0 0 200 96" aria-hidden="true">
      <rect x="60" y="18" width="80" height="52" rx="4" fill="var(--dt-bg-3)" stroke="var(--dt-line-2)" />
      <rect x="70" y="28" width="60" height="10" rx="2" fill="var(--dt-line-2)" />
      <rect x="70" y="44" width="60" height="10" rx="2" fill="var(--dt-line-2)" />
      <rect x="24" y="76" width="34" height="14" rx="3" fill="none" stroke="var(--dt-accent)" />
      <rect x="66" y="76" width="34" height="14" rx="3" fill="none" stroke="var(--dt-accent)" />
      <rect x="108" y="76" width="34" height="14" rx="3" fill="none" stroke="var(--dt-accent)" />
    </svg>
  );
}

function FigureLightbox({ index, onClose, onNav, c, lang }) {
  const panelRef = useRef(null);
  const stageRef = useRef(null);
  const triggerRef = useRef(null);
  const [zoom, setZoom] = useState(false);
  const drag = useRef(null);

  const a = ARTIFACTS[index];
  const total = ARTIFACTS.length;

  // reset zoom whenever the figure changes
  useEffect(() => { setZoom(false); if (stageRef.current) stageRef.current.scrollTo(0, 0); }, [index]);

  useEffect(() => {
    triggerRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    panel?.querySelector('[data-autofocus]')?.focus();

    const onKey = e => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowRight') { onNav(1); return; }
      if (e.key === 'ArrowLeft') { onNav(-1); return; }
      if (e.key === 'Tab' && panel) {
        const f = panel.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus?.();
    };
  }, [onClose, onNav]);

  // desktop drag-to-pan when zoomed
  const onPointerDown = e => {
    if (!zoom || !stageRef.current) return;
    if (e.pointerType === 'touch') return; // let native touch scroll handle it
    drag.current = { x: e.clientX, y: e.clientY, sl: stageRef.current.scrollLeft, st: stageRef.current.scrollTop };
    stageRef.current.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = e => {
    if (!drag.current || !stageRef.current) return;
    stageRef.current.scrollLeft = drag.current.sl - (e.clientX - drag.current.x);
    stageRef.current.scrollTop = drag.current.st - (e.clientY - drag.current.y);
  };
  const onPointerUp = () => { drag.current = null; };

  const figLabel = `${c.figure} ${a.figNo}`;
  const src = IMG_BASE + a.fig;
  const titleId = `dt-lb-${a.id}-t`;

  return createPortal(
    <div className="dt dt-lb-scrim" style={{ '--dt-accent': 'var(--dt-amber)' }}
      onMouseDown={e => e.currentTarget === e.target && onClose()}>
      <div className="dt-lb-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={titleId}>

        <header className="dt-lb-head">
          <div className="dt-lb-headings">
            <span className="dt-lb-fig">{figLabel} <span className="dt-lb-kind">· {a.figKind[lang]}</span></span>
            <h4 id={titleId}>{a.title[lang]}</h4>
          </div>
          <div className="dt-lb-head-right">
            <ProvenanceBadge tier="simulated" note={lang === 'zh' ? '圖表結構為專案真實設計；圖中數據為模擬展示。' : 'Chart is the real project deliverable; underlying values are simulated for display.'} />
            <button type="button" className="dt-lb-close" data-autofocus onClick={onClose} aria-label={c.close}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </header>

        <div
          className={`dt-lb-stage${zoom ? ' is-zoom' : ''}`}
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <img
            src={src}
            alt={`${a.title[lang]} — ${a.caption[lang]}`}
            className="dt-lb-img"
            draggable="false"
            onClick={() => setZoom(z => !z)}
          />
        </div>

        <footer className="dt-lb-foot">
          <div className="dt-lb-meta">
            <p className="dt-lb-cap">{a.caption[lang]}</p>
            <div className="dt-lb-tables">
              <span className="dt-data-sm">{c.fedBy}:</span>
              {a.tables.map(t => <span className="dt-lb-chip dt-mono" key={t}>{t}</span>)}
            </div>
          </div>
          <div className="dt-lb-controls">
            <div className="dt-lb-actions">
              <button type="button" className="dt-lb-btn" aria-pressed={zoom} onClick={() => setZoom(z => !z)}>
                <IconZoom on={zoom} /> {zoom ? c.zoomOut : c.zoomIn}
              </button>
              <a className="dt-lb-btn" href={src} target="_blank" rel="noopener noreferrer">
                <IconExternal /> {c.openFull}
              </a>
            </div>
            <div className="dt-lb-nav">
              <button type="button" className="dt-lb-arrow" onClick={() => onNav(-1)} aria-label={c.prev}><IconChevron dir="left" /></button>
              <div className="dt-lb-dots" role="presentation">
                {ARTIFACTS.map((art, i) => (
                  <button key={art.id} type="button"
                    className={`dt-lb-dot${i === index ? ' is-on' : ''}`}
                    aria-label={`${c.figure} ${art.figNo}`} aria-current={i === index}
                    onClick={() => onNav(i - index)} />
                ))}
              </div>
              <span className="dt-lb-count dt-mono">{a.figNo} {c.of} {String(total).padStart(2, '0')}</span>
              <button type="button" className="dt-lb-arrow" onClick={() => onNav(1)} aria-label={c.next}><IconChevron dir="right" /></button>
            </div>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

export default function M07_DecisionSurfaces() {
  const { lang } = useI18n();
  const c = COPY[lang] ?? COPY.en;
  const [open, setOpen] = useState(null); // index or null
  const goToSchema = () => document.getElementById('dt-m04')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const nav = useCallback(step => {
    setOpen(i => (i == null ? i : (i + step + ARTIFACTS.length) % ARTIFACTS.length));
  }, []);

  return (
    <SectionModule mod={MOD} title={c.title} lead={c.lead} soWhat={c.soWhat} soWhatLabel={c.soWhatLabel}>
      <div className="dt-ds">
        <div className="dt-ds-hint dt-data-sm">{c.hint}</div>
        <div className="dt-ds-grid">
          {ARTIFACTS.map((a, i) => (
            <article className="dt-panel dt-ds-card" key={a.id}>
              <button type="button" className="dt-ds-thumb" onClick={() => setOpen(i)}
                aria-label={`${c.view} — ${a.title[lang]}`}>
                <OutputVisual type={a.id} />
                <span className="dt-ds-hover" aria-hidden="true">
                  <IconZoom on={false} /> {c.view}
                </span>
              </button>
              <h4>{a.title[lang]}</h4>
              <p>{a.desc[lang]}</p>
              <button type="button" className="dt-ds-fedby" onClick={goToSchema}>
                <span className="dt-data-sm">{c.fedBy}:</span> {a.tables.join(', ')} →
              </button>
            </article>
          ))}
        </div>

        <div className="dt-panel dt-ds-dict">
          <span className="dt-data-sm">{c.dictionaryTitle}</span>
          <table className="dt-table">
            <thead><tr><th>{c.field}</th><th>{c.type}</th><th>{c.source}</th><th>{c.review}</th></tr></thead>
            <tbody>
              {DICTIONARY.map(d => (
                <tr key={d.field}>
                  <td className="dt-mono">{d.field}</td>
                  <td className="dt-mono">{d.type[lang]}</td>
                  <td className="dt-mono">{d.source}</td>
                  <td>{d.review[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {open != null && (
        <FigureLightbox index={open} onClose={() => setOpen(null)} onNav={nav} c={c} lang={lang} />
      )}
    </SectionModule>
  );
}

injectStyles('dt-m07-styles', `
.dt-ds-hint { color: var(--dt-text-3); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
.dt-ds-hint::before { content: ''; width: 14px; height: 1px; background: var(--dt-accent); }
.dt-ds-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
.dt-ds-card { padding: 16px; display: flex; flex-direction: column; gap: 8px; }

/* thumbnail = abstract output diagram (previous design); click opens the real figure */
.dt-ds-thumb { position: relative; display: block; width: 100%; border-radius: var(--dt-r-sm); overflow: hidden; background: var(--dt-bg-2); border: 1px solid transparent; transition: border-color 180ms var(--dt-ease); }
.dt-ds-thumb svg { display: block; width: 100%; height: auto; }
.dt-ds-hover { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 7px; font-family: var(--dt-font-data); font-size: 11.5px; letter-spacing: 0.04em; color: var(--dt-text-1); background: linear-gradient(to top, rgba(6,7,9,0.86), rgba(6,7,9,0.4)); opacity: 0; transition: opacity 200ms var(--dt-ease); }
.dt-ds-thumb:hover { border-color: var(--dt-accent); }
.dt-ds-thumb:hover .dt-ds-hover, .dt-ds-thumb:focus-visible .dt-ds-hover { opacity: 1; }
.dt-ds-card h4 { margin: 4px 0 0; font-size: 13.5px; color: var(--dt-text-1); font-weight: 600; }
.dt-ds-card p { margin: 0; font-size: 12.5px; color: var(--dt-text-2); line-height: 1.55; flex: 1; }
.dt-ds-fedby { text-align: left; font-family: var(--dt-font-data); font-size: 11px; color: var(--dt-accent); border-top: 1px solid var(--dt-line-1); padding-top: 8px; transition: color 140ms var(--dt-ease); }
.dt-ds-fedby:hover { color: var(--dt-text-1); }
.dt-ds-fedby .dt-data-sm { color: var(--dt-text-3); }
.dt-ds-dict { margin-top: 18px; padding: 16px 18px; }
.dt-ds-dict > .dt-data-sm { color: var(--dt-text-3); text-transform: uppercase; letter-spacing: 0.08em; }
.dt-ds-dict table { margin-top: 10px; }

/* ---- figure lightbox ---- */
.dt-lb-scrim { position: fixed; inset: 0; z-index: 1600; display: grid; place-items: center; padding: 32px; background: rgba(3,4,6,0.82); backdrop-filter: blur(10px); animation: dt-lb-fade 180ms var(--dt-ease); }
@keyframes dt-lb-fade { from { opacity: 0; } to { opacity: 1; } }
.dt-lb-panel { display: flex; flex-direction: column; width: min(1140px, 100%); max-height: calc(100dvh - 64px); background: var(--dt-bg-1); border: 1px solid var(--dt-line-2); border-radius: var(--dt-r-lg); box-shadow: 0 32px 90px rgba(0,0,0,0.55); overflow: hidden; animation: dt-lb-rise 240ms var(--dt-ease); }
@keyframes dt-lb-rise { from { opacity: 0; transform: translateY(12px) scale(0.99); } to { opacity: 1; transform: none; } }

.dt-lb-head { flex: 0 0 auto; display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 16px 18px; border-bottom: 1px solid var(--dt-line-1); }
.dt-lb-headings { min-width: 0; }
.dt-lb-fig { font-family: var(--dt-font-data); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--dt-accent); }
.dt-lb-kind { color: var(--dt-text-3); letter-spacing: 0.06em; }
.dt-lb-head h4 { margin: 5px 0 0; font-family: var(--dt-font-display); font-size: 18px; font-weight: 500; color: var(--dt-text-1); line-height: 1.25; }
.dt-lb-head-right { flex: 0 0 auto; display: flex; align-items: center; gap: 10px; }
.dt-lb-close { flex: 0 0 auto; width: 34px; height: 34px; display: grid; place-items: center; font-size: 22px; line-height: 1; color: var(--dt-text-2); border: 1px solid var(--dt-line-2); border-radius: var(--dt-r-sm); background: var(--dt-bg-2); transition: border-color 140ms var(--dt-ease), color 140ms var(--dt-ease); }
.dt-lb-close:hover { color: var(--dt-text-1); border-color: var(--dt-accent); }

.dt-lb-stage { flex: 1 1 auto; min-height: 0; display: grid; place-items: center; padding: 20px; overflow: hidden; background: var(--dt-bg-0); background-image: linear-gradient(45deg, rgba(255,255,255,0.018) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.018) 75%), linear-gradient(45deg, rgba(255,255,255,0.018) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.018) 75%); background-size: 22px 22px; background-position: 0 0, 11px 11px; }
.dt-lb-img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 4px; background: #fff; box-shadow: 0 8px 30px rgba(0,0,0,0.4); cursor: zoom-in; }
.dt-lb-stage.is-zoom { place-items: start; overflow: auto; cursor: grab; }
.dt-lb-stage.is-zoom:active { cursor: grabbing; }
.dt-lb-stage.is-zoom .dt-lb-img { max-width: none; max-height: none; width: auto; min-width: 100%; cursor: zoom-out; }

.dt-lb-foot { flex: 0 0 auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; flex-wrap: wrap; padding: 14px 18px; border-top: 1px solid var(--dt-line-1); }
.dt-lb-meta { min-width: 0; flex: 1 1 320px; }
.dt-lb-cap { margin: 0; font-size: 13px; line-height: 1.55; color: var(--dt-text-2); }
.dt-lb-tables { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
.dt-lb-tables .dt-data-sm { color: var(--dt-text-3); }
.dt-lb-chip { font-size: 10.5px; color: var(--dt-text-2); background: var(--dt-bg-2); border: 1px solid var(--dt-line-1); border-radius: 4px; padding: 2px 7px; }

.dt-lb-controls { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.dt-lb-actions { display: flex; align-items: center; gap: 8px; }
.dt-lb-btn { display: inline-flex; align-items: center; gap: 7px; font-family: var(--dt-font-data); font-size: 11.5px; color: var(--dt-text-2); background: var(--dt-bg-2); border: 1px solid var(--dt-line-2); border-radius: var(--dt-r-sm); padding: 7px 11px; text-decoration: none; transition: border-color 140ms var(--dt-ease), color 140ms var(--dt-ease); }
.dt-lb-btn:hover { color: var(--dt-text-1); border-color: var(--dt-accent); }
.dt-lb-btn[aria-pressed="true"] { color: #060709; background: var(--dt-accent); border-color: transparent; }
.dt-lb-nav { display: flex; align-items: center; gap: 10px; }
.dt-lb-arrow { width: 34px; height: 34px; display: grid; place-items: center; color: var(--dt-text-2); background: var(--dt-bg-2); border: 1px solid var(--dt-line-2); border-radius: var(--dt-r-sm); transition: border-color 140ms var(--dt-ease), color 140ms var(--dt-ease); }
.dt-lb-arrow:hover { color: var(--dt-text-1); border-color: var(--dt-accent); }
.dt-lb-dots { display: flex; align-items: center; gap: 7px; }
.dt-lb-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--dt-line-2); transition: background 160ms var(--dt-ease), transform 160ms var(--dt-ease); }
.dt-lb-dot.is-on { background: var(--dt-accent); transform: scale(1.35); }
.dt-lb-dot:hover { background: var(--dt-text-2); }
.dt-lb-count { font-size: 11.5px; color: var(--dt-text-3); letter-spacing: 0.06em; }

@media (max-width: 767px) {
  /* content-sized centered card (base scrim keeps place-items:center) so a wide
     landscape figure never leaves a full-height void */
  .dt-lb-scrim { padding: 10px calc(10px + env(safe-area-inset-right, 0px)) calc(10px + env(safe-area-inset-bottom, 0px)) calc(10px + env(safe-area-inset-left, 0px)); }
  .dt-lb-panel { width: 100%; max-height: calc(100dvh - 20px); overflow-y: auto; border-radius: var(--dt-r-md); }
  .dt-lb-head { padding: 13px 14px; }
  .dt-lb-head h4 { font-size: 15px; }
  .dt-lb-head-right { gap: 8px; }
  /* size the card to its content — the stage must not flex-grow the panel to full height */
  .dt-lb-stage:not(.is-zoom) { flex: 0 0 auto; padding: 12px; }
  .dt-lb-stage:not(.is-zoom) .dt-lb-img { max-height: 54vh; }
  /* stack footer vertically — a wrapping flex row stretched its lines and left a void */
  .dt-lb-foot { flex-direction: column; align-items: stretch; padding: 12px 14px; gap: 12px; }
  .dt-lb-meta { flex: 0 0 auto; }
  .dt-lb-controls { width: 100%; flex-direction: column; align-items: stretch; gap: 10px; }
  .dt-lb-actions { order: 2; }
  .dt-lb-actions .dt-lb-btn { flex: 1 1 0; justify-content: center; }
  .dt-lb-nav { order: 1; justify-content: space-between; }
}
@media (max-width: 400px) { .dt-lb-dots { display: none; } }
`);
