import{u as m,r as t,j as e,n as x,p as u,i as b}from"./index-B1HqV9rD.js";const g=u.find(i=>i.key==="M11"),v=["default","hover","focus","loading","empty","error"],w={en:{default:"DEFAULT",hover:"HOVER",focus:"FOCUS",loading:"LOADING",empty:"EMPTY",error:"ERROR"},zh:{default:"預設",hover:"滑過",focus:"聚焦",loading:"載入",empty:"空",error:"錯誤"}};function y({st:i,lang:n}){return i==="loading"?e.jsxs("div",{className:"ni-c-card",children:[e.jsx("span",{className:"ni-skel-line w60"}),e.jsx("span",{className:"ni-skel-line w90"}),e.jsx("span",{className:"ni-skel-line w40"})]}):i==="empty"?e.jsx("div",{className:"ni-c-card is-empty",children:n==="zh"?"本週尚無報告":"No reports this week"}):i==="error"?e.jsx("div",{className:"ni-c-card is-error",children:n==="zh"?"來源版面已變更":"Source layout changed"}):e.jsxs("div",{className:`ni-c-card${i==="hover"?" is-hover":""}${i==="focus"?" is-focus":""}`,children:[e.jsx("div",{className:"ni-c-card-h",children:"AI 晶片市場趨勢"}),e.jsx("div",{className:"ni-c-card-meta",children:"2025-01-15 · Semiconductor"}),e.jsxs("div",{className:"ni-c-card-tags",children:[e.jsx("span",{children:"AI"}),e.jsx("span",{children:"半導體"})]})]})}function j({st:i,lang:n}){return i==="loading"?e.jsx("span",{className:"ni-c-chip is-loading"}):i==="empty"?e.jsx("span",{className:"ni-c-chip is-dim",children:n==="zh"?"全部產業":"All"}):i==="error"?e.jsx("span",{className:"ni-c-chip is-cerror",children:"!"}):e.jsx("span",{className:`ni-c-chip${i==="hover"?" is-hover":""}${i==="focus"?" is-focus":""}${i==="default"?" is-on":""}`,children:"Semiconductor"})}function N({st:i,lang:n}){return i==="loading"?e.jsx("span",{className:"ni-c-stamp is-loading"}):i==="empty"?e.jsx("span",{className:"ni-c-stamp is-dim",children:"—"}):i==="error"?e.jsx("span",{className:"ni-c-stamp is-serror",children:"low conf"}):e.jsx("span",{className:`ni-c-stamp${i==="hover"?" is-hover":""}${i==="focus"?" is-focus":""}`,children:"high · 92%"})}function k({st:i,lang:n}){return i==="loading"?e.jsx("div",{className:"ni-c-row",children:e.jsx("span",{className:"ni-skel-line w90"})}):i==="empty"?e.jsx("div",{className:"ni-c-row is-empty",children:n==="zh"?"無符合項目":"No matches"}):i==="error"?e.jsx("div",{className:"ni-c-row is-error",children:n==="zh"?"載入失敗 · 重試":"Load failed · retry"}):e.jsxs("div",{className:`ni-c-row${i==="hover"?" is-hover":""}${i==="focus"?" is-focus":""}`,children:[e.jsx("span",{className:"ni-c-row-tick"}),e.jsx("span",{className:"ni-c-row-title",children:"台積電 CoWoS 封裝…"}),e.jsx("span",{className:"ni-c-row-date",children:"01/15"})]})}const d=[{id:"card",name:{en:"Insight card",zh:"洞察卡"},render:y,code:`function InsightCard({ item, status }) {
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
}`,note:{en:"Every branch is a real state — the happy path is one of five, not the only one.",zh:"每個分支都是真實狀態——happy path 只是五分之一，不是唯一。"}},{id:"chip",name:{en:"Filter chip",zh:"篩選晶片"},render:j,code:`<button role="tab"
        aria-selected={active === id}
        aria-controls="feed"
        className={cx('chip', { on: active === id })}
        onClick={() => setActive(id)}>
  {label}
</button>`,note:{en:"Filters are real tabs: aria-selected + aria-controls tie the chip to the feed it drives.",zh:"篩選是真正的 tab：aria-selected + aria-controls 把晶片綁到它驅動的列表。"}},{id:"stamp",name:{en:"Confidence stamp",zh:"信心標記"},render:N,code:"// Color is never the only channel.\n<span className={`stamp stamp--${level}`}>\n  <ShapeIcon level={level} aria-hidden />\n  {level === 'low' ? 'low conf' : `high · ${pct}%`}\n</span>\n// low confidence also routes the item to manual review.",note:{en:"Confidence carries a shape and text, not just a color — it survives grayscale.",zh:"信心同時帶形狀與文字，不只顏色——灰階下也讀得出來。"}},{id:"row",name:{en:"Feed row",zh:"列表列"},render:k,code:`<div id="feed" aria-live="polite" aria-busy={loading}>
  {rows.map(r => <FeedRow key={r.id} item={r} />)}
</div>
// aria-live announces new items when the
// morning crawl finishes and the feed updates.`,note:{en:"The feed is an aria-live region — new items are announced, not silently swapped.",zh:"列表是 aria-live 區——新項目會被朗讀，而非默默替換。"}}],l={en:{title:"Component & state inventory",lead:"Four platform components, each shown across six states and rendered live — with the piece of code from each that is actually worth a look.",copy:"Copy",copied:"Copied",soWhat:"Components ship with all their states, not the happy path."},zh:{title:"元件與狀態清單",lead:"四個平台元件，各自跨六種狀態、即時渲染——再附上每個元件裡真正值得一看的那段程式碼。",copy:"複製",copied:"已複製",soWhat:"元件出貨時帶著它所有的狀態，不只 happy path。"}};function C(){const{lang:i}=m(),n=l[i]??l.en,[o,p]=t.useState(0),[f,s]=t.useState(!1),r=d[o],h=async()=>{try{await navigator.clipboard.writeText(r.code),s(!0),setTimeout(()=>s(!1),1600)}catch{}};return e.jsxs(x,{mod:g,title:n.title,lead:n.lead,soWhat:n.soWhat,children:[e.jsx("div",{className:"ni-c-tabs",role:"tablist","aria-label":"Components",children:d.map((a,c)=>e.jsx("button",{role:"tab","aria-selected":c===o,className:`ni-c-tab${c===o?" is-on":""}`,onClick:()=>p(c),children:a.name[i]},a.id))}),e.jsx("div",{className:"ni-c-strip",children:v.map(a=>e.jsxs("div",{className:"ni-c-cell",children:[e.jsx("span",{className:"ni-c-cell-label",children:w[i][a]}),e.jsx("div",{className:"ni-c-cell-stage",children:r.render({st:a,lang:i})})]},a))}),e.jsxs("div",{className:"ni-c-code-wrap",children:[e.jsxs("div",{className:"ni-c-code-head",children:[e.jsxs("span",{className:"ni-caption",children:[r.name[i]," · logic"]}),e.jsx("button",{className:"ni-btn ni-c-copy",onClick:h,children:f?n.copied:n.copy})]}),e.jsx("pre",{className:"ni-c-code",children:e.jsx("code",{children:r.code})}),e.jsx("p",{className:"ni-c-note",children:r.note[i]})]})]})}b("ni-m11",`
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
`);export{C as default};
