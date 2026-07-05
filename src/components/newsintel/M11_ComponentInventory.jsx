import React, { useState } from 'react';
import ModuleFrame, { injectStyles, useI18n } from './shared/niKit.jsx';
import { MODULES } from './data/newsIntelContent.js';

const MOD = MODULES.find(m => m.key === 'M11');

const STATES = ['default', 'hover', 'focus', 'loading', 'empty', 'error'];
const STATE_LABEL = {
    en: { default: 'DEFAULT', hover: 'HOVER', focus: 'FOCUS', loading: 'LOADING', empty: 'EMPTY', error: 'ERROR' },
    zh: { default: '預設', hover: '滑過', focus: '聚焦', loading: '載入', empty: '空', error: '錯誤' },
};

// Each component renders a small light-theme preview per state.
function InsightCard({ st, lang }) {
    if (st === 'loading') return <div className="ni-c-card"><span className="ni-skel-line w60" /><span className="ni-skel-line w90" /><span className="ni-skel-line w40" /></div>;
    if (st === 'empty') return <div className="ni-c-card is-empty">{lang === 'zh' ? '本週尚無報告' : 'No reports this week'}</div>;
    if (st === 'error') return <div className="ni-c-card is-error">{lang === 'zh' ? '來源版面已變更' : 'Source layout changed'}</div>;
    return (
        <div className={`ni-c-card${st === 'hover' ? ' is-hover' : ''}${st === 'focus' ? ' is-focus' : ''}`}>
            <div className="ni-c-card-h">AI 晶片市場趨勢</div>
            <div className="ni-c-card-meta">2025-01-15 · Semiconductor</div>
            <div className="ni-c-card-tags"><span>AI</span><span>半導體</span></div>
        </div>
    );
}
function FilterChip({ st, lang }) {
    if (st === 'loading') return <span className="ni-c-chip is-loading" />;
    if (st === 'empty') return <span className="ni-c-chip is-dim">{lang === 'zh' ? '全部產業' : 'All'}</span>;
    if (st === 'error') return <span className="ni-c-chip is-cerror">!</span>;
    return <span className={`ni-c-chip${st === 'hover' ? ' is-hover' : ''}${st === 'focus' ? ' is-focus' : ''}${st === 'default' ? ' is-on' : ''}`}>Semiconductor</span>;
}
function StampCell({ st, lang }) {
    if (st === 'loading') return <span className="ni-c-stamp is-loading" />;
    if (st === 'empty') return <span className="ni-c-stamp is-dim">—</span>;
    if (st === 'error') return <span className="ni-c-stamp is-serror">low conf</span>;
    return <span className={`ni-c-stamp${st === 'hover' ? ' is-hover' : ''}${st === 'focus' ? ' is-focus' : ''}`}>high · 92%</span>;
}
function FeedRow({ st, lang }) {
    if (st === 'loading') return <div className="ni-c-row"><span className="ni-skel-line w90" /></div>;
    if (st === 'empty') return <div className="ni-c-row is-empty">{lang === 'zh' ? '無符合項目' : 'No matches'}</div>;
    if (st === 'error') return <div className="ni-c-row is-error">{lang === 'zh' ? '載入失敗 · 重試' : 'Load failed · retry'}</div>;
    return (
        <div className={`ni-c-row${st === 'hover' ? ' is-hover' : ''}${st === 'focus' ? ' is-focus' : ''}`}>
            <span className="ni-c-row-tick" /><span className="ni-c-row-title">台積電 CoWoS 封裝…</span><span className="ni-c-row-date">01/15</span>
        </div>
    );
}

const GROUPS = [
    {
        id: 'card', name: { en: 'Insight card', zh: '洞察卡' }, render: InsightCard,
        code: `function InsightCard({ item, status }) {
  if (status === 'loading') return <CardSkeleton />
  if (status === 'error')   return <CardError onRetry={refetch} />
  if (!item)                return <CardEmpty />
  return (
    <article className="card" tabIndex={0}
             aria-label={item.title}>
      <ConfidenceTick level={item.confidence} />
      <h3>{item.title}</h3>
      <Meta date={item.date} category={item.category} />
    </article>
  )
}`,
        note: { en: 'Every branch is a real state — the happy path is one of five, not the only one.', zh: '每個分支都是真實狀態——happy path 只是五分之一，不是唯一。' },
    },
    {
        id: 'chip', name: { en: 'Filter chip', zh: '篩選晶片' }, render: FilterChip,
        code: `<button role="tab"
        aria-selected={active === id}
        aria-controls="feed"
        className={cx('chip', { on: active === id })}
        onClick={() => setActive(id)}>
  {label}
</button>`,
        note: { en: 'Filters are real tabs: aria-selected + aria-controls tie the chip to the feed it drives.', zh: '篩選是真正的 tab：aria-selected + aria-controls 把晶片綁到它驅動的列表。' },
    },
    {
        id: 'stamp', name: { en: 'Confidence stamp', zh: '信心標記' }, render: StampCell,
        code: `// Color is never the only channel.
<span className={\`stamp stamp--\${level}\`}>
  <ShapeIcon level={level} aria-hidden />
  {level === 'low' ? 'low conf' : \`high · \${pct}%\`}
</span>
// low confidence also routes the item to manual review.`,
        note: { en: 'Confidence carries a shape and text, not just a color — it survives grayscale.', zh: '信心同時帶形狀與文字，不只顏色——灰階下也讀得出來。' },
    },
    {
        id: 'row', name: { en: 'Feed row', zh: '列表列' }, render: FeedRow,
        code: `<div id="feed" aria-live="polite" aria-busy={loading}>
  {rows.map(r => <FeedRow key={r.id} item={r} />)}
</div>
// aria-live announces new items when the
// morning crawl finishes and the feed updates.`,
        note: { en: 'The feed is an aria-live region — new items are announced, not silently swapped.', zh: '列表是 aria-live 區——新項目會被朗讀，而非默默替換。' },
    },
];

const COPY = {
    en: {
        title: 'Component & state inventory',
        lead: 'Four platform components, each shown across six states and rendered live — with the piece of code from each that is actually worth a look.',
        copy: 'Copy', copied: 'Copied',
        soWhat: 'Components ship with all their states, not the happy path.',
    },
    zh: {
        title: '元件與狀態清單',
        lead: '四個平台元件，各自跨六種狀態、即時渲染——再附上每個元件裡真正值得一看的那段程式碼。',
        copy: '複製', copied: '已複製',
        soWhat: '元件出貨時帶著它所有的狀態，不只 happy path。',
    },
};

export default function M11_ComponentInventory() {
    const { lang } = useI18n();
    const t = COPY[lang] ?? COPY.en;
    const [gi, setGi] = useState(0);
    const [copied, setCopied] = useState(false);
    const g = GROUPS[gi];

    const copy = async () => {
        try { await navigator.clipboard.writeText(g.code); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {}
    };

    return (
        <ModuleFrame mod={MOD} title={t.title} lead={t.lead} soWhat={t.soWhat}>
            <div className="ni-c-tabs" role="tablist" aria-label="Components">
                {GROUPS.map((grp, i) => (
                    <button key={grp.id} role="tab" aria-selected={i === gi}
                        className={`ni-c-tab${i === gi ? ' is-on' : ''}`} onClick={() => setGi(i)}>
                        {grp.name[lang]}
                    </button>
                ))}
            </div>

            <div className="ni-c-strip">
                {STATES.map(st => (
                    <div key={st} className="ni-c-cell">
                        <span className="ni-c-cell-label">{STATE_LABEL[lang][st]}</span>
                        <div className="ni-c-cell-stage">{g.render({ st, lang })}</div>
                    </div>
                ))}
            </div>

            <div className="ni-c-code-wrap">
                <div className="ni-c-code-head">
                    <span className="ni-caption">{g.name[lang]} · logic</span>
                    <button className="ni-btn ni-c-copy" onClick={copy}>{copied ? t.copied : t.copy}</button>
                </div>
                <pre className="ni-c-code"><code>{g.code}</code></pre>
                <p className="ni-c-note">{g.note[lang]}</p>
            </div>
        </ModuleFrame>
    );
}

injectStyles('ni-m11', `
.ni-c-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
.ni-c-tab { font-family: var(--ni-font-body); font-size: 13px; color: var(--ni-text-2); padding: 7px 14px; border: 1px solid var(--ni-line-2); border-radius: 999px; background: var(--ni-bg-2); transition: border-color 160ms var(--ni-ease), color 160ms var(--ni-ease); }
.ni-c-tab:hover { border-color: var(--ni-teal); }
.ni-c-tab.is-on { color: var(--ni-teal); border-color: var(--ni-teal); background: var(--ni-teal-dim); }
.ni-c-strip { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
.ni-c-cell { display: flex; flex-direction: column; gap: 8px; }
.ni-c-cell-label { font-family: var(--ni-font-data); font-size: 9px; letter-spacing: 0.1em; color: var(--ni-text-3); text-align: center; }
.ni-c-cell-stage { flex: 1; display: flex; align-items: center; justify-content: center; min-height: 92px; padding: 10px; background: #eef2f7; border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-sm); }

/* light-theme mini components */
.ni-c-card { width: 100%; background: #fff; border: 1px solid #e6ebf2; border-radius: 7px; padding: 9px; font-family: 'Inter','Noto Sans TC',sans-serif; }
.ni-c-card.is-hover { border-color: #2f9be0; box-shadow: 0 2px 8px rgba(47,155,224,0.16); }
.ni-c-card.is-focus { border-color: #2f9be0; box-shadow: 0 0 0 2px rgba(47,155,224,0.5); }
.ni-c-card.is-empty, .ni-c-card.is-error { display: flex; align-items: center; justify-content: center; min-height: 64px; font-size: 11px; text-align: center; }
.ni-c-card.is-empty { color: #98a2b3; }
.ni-c-card.is-error { color: #c0392b; border-color: #e6a79f; background: #fdf1ef; }
.ni-c-card-h { font-size: 12px; font-weight: 700; color: #1f2a37; }
.ni-c-card-meta { font-size: 9px; color: #77828f; margin: 4px 0 6px; }
.ni-c-card-tags { display: flex; gap: 4px; }
.ni-c-card-tags span { font-size: 9px; color: #55606d; background: #eef2f7; border-radius: 3px; padding: 1px 5px; }
.ni-c-chip { font-family: 'Inter',sans-serif; font-size: 11px; color: #55606d; background: #fff; border: 1px solid #d5dce6; border-radius: 999px; padding: 4px 12px; }
.ni-c-chip.is-on { color: #fff; background: #2f9be0; border-color: #2f9be0; }
.ni-c-chip.is-hover { border-color: #2f9be0; }
.ni-c-chip.is-focus { box-shadow: 0 0 0 2px rgba(47,155,224,0.5); }
.ni-c-chip.is-dim { color: #98a2b3; }
.ni-c-chip.is-loading { width: 56px; height: 22px; background: #dde3ec; border: none; animation: ni-c-pulse 1.4s infinite; }
.ni-c-chip.is-cerror { color: #fff; background: #c0392b; border-color: #c0392b; }
.ni-c-stamp { font-family: 'JetBrains Mono',monospace; font-size: 10px; color: #167a6c; background: #e2f5f1; border: 1px solid #9cd8ce; border-radius: 4px; padding: 3px 7px; }
.ni-c-stamp.is-hover { border-color: #167a6c; }
.ni-c-stamp.is-focus { box-shadow: 0 0 0 2px rgba(22,122,108,0.4); }
.ni-c-stamp.is-dim { color: #98a2b3; background: #eef2f7; border-color: #d5dce6; }
.ni-c-stamp.is-serror { color: #b26a00; background: #fbeed0; border-color: #e6c877; }
.ni-c-stamp.is-loading { display: inline-block; width: 54px; height: 18px; background: #dde3ec; animation: ni-c-pulse 1.4s infinite; }
.ni-c-row { width: 100%; display: flex; align-items: center; gap: 6px; background: #fff; border: 1px solid #e6ebf2; border-radius: 5px; padding: 8px; font-family: 'Inter','Noto Sans TC',sans-serif; }
.ni-c-row.is-hover { background: #f4f9fe; }
.ni-c-row.is-focus { box-shadow: 0 0 0 2px rgba(47,155,224,0.5); }
.ni-c-row.is-empty { color: #98a2b3; justify-content: center; font-size: 11px; }
.ni-c-row.is-error { color: #c0392b; justify-content: center; font-size: 11px; border-color: #e6a79f; background: #fdf1ef; }
.ni-c-row-tick { width: 6px; height: 6px; border-radius: 50%; background: #35c2b0; flex: 0 0 auto; }
.ni-c-row-title { font-size: 11px; color: #1f2a37; flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ni-c-row-date { font-family: 'JetBrains Mono',monospace; font-size: 9px; color: #98a2b3; }
.ni-skel-line { display: block; height: 7px; border-radius: 3px; background: #dde3ec; margin-bottom: 6px; animation: ni-c-pulse 1.4s infinite; }
.ni-skel-line.w40 { width: 40%; } .ni-skel-line.w60 { width: 60%; } .ni-skel-line.w90 { width: 90%; }
@keyframes ni-c-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

.ni-c-code-wrap { margin-top: 18px; }
.ni-c-code-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
.ni-c-copy { font-size: 11px; padding: 5px 12px; }
.ni-c-code { margin: 0; padding: 14px; background: var(--ni-bg-0); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); overflow-x: auto; font-family: var(--ni-font-data); font-size: 11.5px; line-height: 1.65; color: var(--ni-text-2); }
.ni-c-note { margin: 10px 0 0; font-size: 12.5px; line-height: 1.55; color: var(--ni-text-3); border-left: 2px solid var(--ni-teal); padding-left: 12px; }
@media (max-width: 900px) { .ni-c-strip { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 460px) { .ni-c-strip { grid-template-columns: repeat(2, 1fr); } }
`);
