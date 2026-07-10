import{u as t,j as e,M as d,b as m,P as o,i as v}from"./index-LCyjzQSx.js";const r=m.M1,i=o[r.phase].accent,n=Math.max(...r.tasks.map(l=>l.timeBefore));function x(){const{lang:l}=t(),a=r[l]??r.en;return e.jsx(d,{id:"vf-m1",code:r.code,phase:r.phase,accent:i,title:a.title,lead:a.lead,roles:r.roles,tier:r.tier,footer:a.foot,disclaimer:a.disclaimer,children:e.jsxs("div",{className:"vf-m1",style:{"--vf-accent":i},children:[e.jsxs("div",{className:"vf-m1-design",children:[e.jsx("span",{className:"vf-eyebrow",style:{color:i},children:a.designLabel}),e.jsx("dl",{children:a.designItems.map(s=>e.jsxs("div",{className:"vf-m1-di",children:[e.jsx("dt",{children:s.k}),e.jsx("dd",{children:s.v})]},s.k))})]}),e.jsxs("div",{className:"vf-m1-tasks",children:[e.jsxs("div",{className:"vf-m1-tasks-head",children:[e.jsx("span",{className:"vf-m1-col-task"}),e.jsxs("span",{className:"vf-m1-legend",children:[e.jsx("i",{className:"before"}),a.beforeLabel]}),e.jsxs("span",{className:"vf-m1-legend",children:[e.jsx("i",{className:"after"}),a.afterLabel]})]}),r.tasks.map(s=>e.jsxs("div",{className:"vf-m1-task",children:[e.jsx("span",{className:"vf-m1-task-name",children:a.taskNames[s.id]}),e.jsxs("div",{className:"vf-m1-metric",children:[e.jsx("span",{className:"vf-m1-metric-k",children:a.successLabel}),e.jsxs("div",{className:"vf-m1-bars",children:[e.jsx("div",{className:"vf-m1-bar",role:"img","aria-label":`${a.beforeLabel} ${s.before}%`,children:e.jsx("div",{className:"vf-m1-bar-fill before",style:{width:`${s.before}%`},children:e.jsxs("span",{children:[s.before,"%"]})})}),e.jsx("div",{className:"vf-m1-bar",role:"img","aria-label":`${a.afterLabel} ${s.after}%`,children:e.jsx("div",{className:"vf-m1-bar-fill after",style:{width:`${s.after}%`},children:e.jsxs("span",{children:[s.after,"%"]})})})]})]}),e.jsxs("div",{className:"vf-m1-metric",children:[e.jsx("span",{className:"vf-m1-metric-k",children:a.timeLabel}),e.jsxs("div",{className:"vf-m1-bars",children:[e.jsx("div",{className:"vf-m1-bar",role:"img","aria-label":`${a.beforeLabel} ${s.timeBefore}s`,children:e.jsx("div",{className:"vf-m1-bar-fill before dim",style:{width:`${s.timeBefore/n*100}%`},children:e.jsxs("span",{children:[s.timeBefore,"s"]})})}),e.jsx("div",{className:"vf-m1-bar",role:"img","aria-label":`${a.afterLabel} ${s.timeAfter}s`,children:e.jsx("div",{className:"vf-m1-bar-fill after dim",style:{width:`${s.timeAfter/n*100}%`},children:e.jsxs("span",{children:[s.timeAfter,"s"]})})})]})]})]},s.id))]}),e.jsxs("div",{className:"vf-m1-lower",children:[e.jsxs("div",{className:"vf-m1-sus",children:[e.jsx("span",{className:"vf-eyebrow",style:{color:i},children:a.susLabel}),e.jsxs("div",{className:"vf-m1-sus-nums",children:[e.jsx("span",{className:"vf-m1-sus-before",children:r.sus.before}),e.jsx("span",{className:"vf-m1-sus-arrow",children:"→"}),e.jsx("span",{className:"vf-m1-sus-after",children:r.sus.after})]}),e.jsx("span",{className:"vf-m1-sus-band",children:a.susBandLabel})]}),e.jsxs("div",{className:"vf-m1-quotes",children:[e.jsx("span",{className:"vf-eyebrow",style:{color:i},children:a.quotesLabel}),a.quotes.map((s,f)=>e.jsx("blockquote",{className:"vf-m1-quote",children:s},f)),e.jsx("span",{className:"vf-caption",children:a.quotesNote})]})]}),e.jsxs("div",{className:"vf-m1-changed",children:[e.jsx("span",{className:"vf-eyebrow",style:{color:i},children:a.changedLabel}),e.jsx("ul",{children:a.changed.map((s,f)=>e.jsx("li",{children:s},f))})]})]})})}v("vf-m1-style",`
.vf-m1 { display: flex; flex-direction: column; gap: 20px; }
.vf-m1-design dl { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin: 10px 0 0; }
.vf-m1-di { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); padding: 11px 13px; }
.vf-m1-di dt { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--vf-text-3); }
.vf-m1-di dd { margin: 5px 0 0; font-size: 13px; color: var(--vf-text-1); }
.vf-m1-tasks { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-m1-tasks-head { display: flex; justify-content: flex-end; gap: 16px; margin-bottom: 12px; }
.vf-m1-legend { display: inline-flex; align-items: center; gap: 6px; font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
.vf-m1-legend i { width: 11px; height: 11px; border-radius: 3px; }
.vf-m1-legend i.before { background: var(--vf-line-2); }
.vf-m1-legend i.after { background: var(--vf-accent); }
.vf-m1-task { padding: 12px 0; border-top: 1px solid var(--vf-line-1); }
.vf-m1-task-name { font-size: 13.5px; font-weight: 600; color: var(--vf-text-1); }
.vf-m1-metric { display: grid; grid-template-columns: 110px 1fr; gap: 12px; align-items: center; margin-top: 9px; }
.vf-m1-metric-k { font-family: var(--vf-font-data); font-size: 10.5px; color: var(--vf-text-3); }
.vf-m1-bars { display: flex; flex-direction: column; gap: 5px; }
.vf-m1-bar { background: var(--vf-bg-3); border-radius: 999px; height: 16px; overflow: hidden; }
.vf-m1-bar-fill { height: 100%; border-radius: 999px; display: flex; align-items: center; justify-content: flex-end; padding-right: 7px; min-width: 30px; }
.vf-m1-bar-fill span { font-family: var(--vf-font-data); font-size: 10px; color: var(--vf-bg-0); font-weight: 500; }
.vf-m1-bar-fill.before { background: var(--vf-line-2); }
.vf-m1-bar-fill.before span { color: var(--vf-text-1); }
.vf-m1-bar-fill.after { background: var(--vf-accent); }
.vf-m1-bar-fill.dim { opacity: 0.85; }
.vf-m1-lower { display: grid; grid-template-columns: 0.7fr 1.3fr; gap: 14px; }
.vf-m1-sus { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-m1-sus-nums { display: flex; align-items: baseline; gap: 10px; margin: 10px 0; }
.vf-m1-sus-before { font-family: var(--vf-font-data); font-size: 24px; color: var(--vf-text-3); }
.vf-m1-sus-arrow { color: var(--vf-text-3); }
.vf-m1-sus-after { font-family: var(--vf-font-data); font-size: 38px; font-weight: 500; color: var(--vf-accent); line-height: 1; }
.vf-m1-sus-band { font-size: 12px; color: var(--vf-text-2); }
.vf-m1-quotes { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-m1-quote { margin: 10px 0; padding-left: 14px; border-left: 2px solid var(--vf-accent); font-family: var(--vf-font-display); font-style: italic; font-size: 15px; line-height: 1.5; color: var(--vf-text-1); }
.vf-m1-changed ul { list-style: none; margin: 10px 0 0; padding: 0; }
.vf-m1-changed li { position: relative; padding-left: 20px; margin-bottom: 8px; font-size: 13.5px; line-height: 1.6; color: var(--vf-text-2); }
.vf-m1-changed li::before { content: '→'; position: absolute; left: 0; color: var(--vf-accent); }
@media (max-width: 720px) { .vf-m1-lower { grid-template-columns: 1fr; } .vf-m1-metric { grid-template-columns: 1fr; gap: 6px; } }
`);export{x as default};
