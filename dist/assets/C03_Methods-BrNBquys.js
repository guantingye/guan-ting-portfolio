import{u as c,j as a,ar as p,aw as n,ax as d,ay as r,aq as b,az as t,i as x}from"./index-B1HqV9rD.js";const h=b.find(l=>l.key==="C03"),o={en:{bgLabel:"Background",qLabel:"Research question",participantsLabel:"Participants",manipLabel:"Manipulation",pipeTitle:"The research pipeline",pipeCap:"Eight stages, run end to end — the same discipline that now runs every data layer in this portfolio.",condTitle:"Two lecture formats, one content",condCap:n.manipulation.en,analysesLabel:"Analyses",live:"Dynamic instructor (naturalistic)",static:"Static image (traditional)",traditional:"Traditional paradigm",thisStudy:"This study"},zh:{bgLabel:"研究背景",qLabel:"研究問題",participantsLabel:"受試者",manipLabel:"操弄設計",pipeTitle:"研究流程",pipeCap:"八個階段，端到端跑完——這正是現在跑在作品集每一層資料底下的同一套紀律。",condTitle:"同一份內容，兩種呈現格式",condCap:n.manipulation.zh,analysesLabel:"分析方法",live:"動態講師（自然情境）",static:"靜態圖像（傳統典範）",traditional:"傳統典範",thisStudy:"這項研究"}};function m({lang:l,c:e}){return a.jsxs("div",{className:"bl-contrast",children:[a.jsx("span",{className:"bl-eyebrow",children:t.heading[l]}),a.jsx("p",{className:"bl-contrast-lead",children:t.lead[l]}),a.jsxs("div",{className:"bl-contrast-table",role:"table","aria-label":t.heading[l],children:[a.jsxs("div",{className:"bl-contrast-row bl-contrast-row--head",role:"row",children:[a.jsx("span",{role:"columnheader"}),a.jsx("span",{role:"columnheader",children:e.traditional}),a.jsx("span",{role:"columnheader",className:"is-now",children:e.thisStudy})]}),t.rows.map((i,s)=>a.jsxs("div",{className:"bl-contrast-row",role:"row",children:[a.jsx("span",{className:"bl-contrast-dim",role:"rowheader",children:i.dim[l]}),a.jsx("span",{role:"cell",children:i.old[l]}),a.jsx("span",{role:"cell",className:"is-now",children:i.now[l]})]},s))]})]})}function f(){return a.jsxs("svg",{viewBox:"0 0 60 60",width:"52",height:"52","aria-hidden":"true",children:[a.jsx("circle",{cx:"30",cy:"19",r:"9",fill:"none",stroke:"var(--bl-fpn-ink)",strokeWidth:"2"}),a.jsx("path",{d:"M13 50c2-11 9-17 17-17s15 6 17 17",fill:"none",stroke:"var(--bl-fpn-ink)",strokeWidth:"2",strokeLinecap:"round"}),a.jsx("g",{stroke:"var(--bl-fpn)",strokeWidth:"1.4",opacity:"0.7",children:a.jsx("path",{d:"M6 24c-2 3-2 7 0 10M54 24c2 3 2 7 0 10",strokeLinecap:"round"})})]})}function u(){return a.jsxs("svg",{viewBox:"0 0 60 60",width:"52",height:"52","aria-hidden":"true",children:[a.jsx("rect",{x:"10",y:"10",width:"40",height:"40",rx:"3",fill:"none",stroke:"var(--bl-ink-3)",strokeWidth:"2"}),a.jsx("circle",{cx:"24",cy:"24",r:"5",fill:"none",stroke:"var(--bl-ink-3)",strokeWidth:"1.8"}),a.jsx("path",{d:"M13 42l11-11 8 8 8-10 9 13",fill:"none",stroke:"var(--bl-ink-3)",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})]})}function v(){const{lang:l}=c(),e=o[l]??o.en;return a.jsxs(p,{chapter:h,lead:n.question[l],children:[a.jsxs("div",{className:"bl-study-title",children:[a.jsx("span",{className:"bl-eyebrow",children:e.bgLabel}),a.jsx("h4",{className:"bl-study-name",children:n.title[l]}),a.jsx("p",{className:"bl-study-sub",children:n.subtitle[l]}),a.jsx("p",{className:"bl-study-bg",children:n.background[l]})]}),a.jsx(m,{lang:l,c:e}),a.jsxs("div",{className:"bl-participants",children:[a.jsxs("div",{className:"bl-participants-n",children:[a.jsx("span",{className:"bl-participants-num",children:a.jsx(d,{value:43,decimals:0})}),a.jsx("span",{className:"bl-participants-label",children:e.participantsLabel})]}),a.jsx("p",{className:"bl-participants-detail",children:n.participants.detail[l]})]}),a.jsx(r,{num:1,title:e.pipeTitle,caption:e.pipeCap,children:a.jsx("ol",{className:"bl-pipe-row",children:n.pipeline.map((i,s)=>a.jsxs("li",{className:`bl-pipe-step${s===n.pipeline.length-1?" is-final":""}`,children:[a.jsx("span",{className:"bl-pipe-num","aria-hidden":"true",children:s+1}),a.jsx("span",{children:i[l]})]},s))})}),a.jsx(r,{num:2,title:e.condTitle,caption:e.condCap,children:a.jsxs("div",{className:"bl-cond-grid",children:[a.jsxs("div",{className:"bl-cond-panel",children:[a.jsx(f,{}),a.jsx("span",{className:"bl-cond-label",children:e.live})]}),a.jsx("span",{className:"bl-cond-vs","aria-hidden":"true",children:"vs"}),a.jsxs("div",{className:"bl-cond-panel is-static",children:[a.jsx(u,{}),a.jsx("span",{className:"bl-cond-label",children:e.static})]})]})}),a.jsxs("div",{className:"bl-analyses",children:[a.jsx("span",{className:"bl-eyebrow",children:e.analysesLabel}),a.jsx("ul",{children:n.analyses.map((i,s)=>a.jsx("li",{children:i[l]},s))})]})]})}x("bl-c03-styles",`
.bl-study-title { margin-top: 4px; }
.bl-study-name { margin: 8px 0 0; font-family: var(--bl-font-display); font-size: 21px; font-weight: 500; color: var(--bl-ink); }
.bl-study-sub { margin: 4px 0 0; font-size: 13.5px; font-style: italic; color: var(--bl-ink-3); }
html.lang-zh .bl-study-sub { font-style: normal; }
.bl-study-bg { margin: 14px 0 0; font-size: 14.5px; line-height: 1.7; color: var(--bl-ink-2); max-width: 700px; }
html.lang-zh .bl-study-bg { line-height: 1.9; }

.bl-contrast { margin-top: 24px; }
.bl-contrast-lead { margin: 8px 0 0; font-size: 13.5px; line-height: 1.65; color: var(--bl-ink-2); max-width: 640px; }
html.lang-zh .bl-contrast-lead { line-height: 1.85; }
.bl-contrast-table { margin-top: 14px; border: 1px solid var(--bl-line); border-radius: var(--bl-r-md); overflow: hidden; }
.bl-contrast-row { display: grid; grid-template-columns: 148px 1fr 1fr; }
.bl-contrast-row + .bl-contrast-row { border-top: 1px solid var(--bl-line-soft); }
.bl-contrast-row > span { padding: 11px 14px; font-size: 12.5px; line-height: 1.55; color: var(--bl-ink-2); }
.bl-contrast-row--head { background: var(--bl-paper-2); }
.bl-contrast-row--head > span { font-family: var(--bl-font-data); font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--bl-ink-3); padding: 9px 14px; }
.bl-contrast-row--head > span.is-now { color: var(--bl-fpn-ink); }
.bl-contrast-dim { font-weight: 600; color: var(--bl-ink); background: var(--bl-paper-1); border-right: 1px solid var(--bl-line-soft); }
.bl-contrast-row > span.is-now { background: var(--bl-fpn-soft, rgba(91,108,240,0.05)); color: var(--bl-ink); }
@media (max-width: 640px) {
  .bl-contrast-row { grid-template-columns: 92px 1fr 1fr; }
  .bl-contrast-row > span { padding: 9px 8px; font-size: 11.5px; }
}

.bl-participants { display: flex; align-items: center; gap: 20px; margin-top: 22px; padding: 14px 18px; background: var(--bl-paper-2); border-radius: var(--bl-r-md); border: 1px solid var(--bl-line); }
.bl-participants-n { display: flex; flex-direction: column; align-items: center; min-width: 64px; }
.bl-participants-num { font-family: var(--bl-font-display); font-size: 32px; font-weight: 600; color: var(--bl-fpn-ink); line-height: 1; }
.bl-participants-label { font-family: var(--bl-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--bl-ink-3); margin-top: 4px; }
.bl-participants-detail { margin: 0; font-size: 13.5px; color: var(--bl-ink-2); border-left: 1px solid var(--bl-line); padding-left: 18px; }

.bl-cond-grid { display: flex; align-items: center; justify-content: center; gap: 30px; padding: 8px 0; }
.bl-cond-panel { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 26px; border: 1px solid var(--bl-line); border-radius: var(--bl-r-md); background: var(--bl-fpn-soft, rgba(91,108,240,0.06)); }
.bl-cond-panel.is-static { background: var(--bl-paper-2); }
.bl-cond-label { font-family: var(--bl-font-data); font-size: 11px; letter-spacing: 0.05em; color: var(--bl-ink-2); }
.bl-cond-vs { font-family: var(--bl-font-display); font-style: italic; font-size: 14px; color: var(--bl-ink-3); }

.bl-analyses { margin-top: 22px; }
.bl-analyses ul { margin: 10px 0 0; padding-left: 20px; display: flex; flex-direction: column; gap: 7px; }
.bl-analyses li { font-size: 13.5px; line-height: 1.6; color: var(--bl-ink-2); }
html.lang-zh .bl-analyses li { line-height: 1.85; }

@media (max-width: 600px) {
  .bl-cond-grid { flex-direction: column; gap: 12px; }
}
`);export{v as default};
