import{u as o,j as a,ao as c,ap as d,aq as p,i as h}from"./index-BbFJAtDQ.js";const n={en:{lines:["Most of what cognitive neuroscience knows about attention comes from a room built to remove everything natural from it.","This is what happened when the stimulus was allowed to be real — and the analysis caught up to match it: functional connectivity, read by a machine-learning classifier."],cta:"Scroll down — the paper begins where the naturalistic data does."},zh:{lines:["認知神經科學對注意力的理解，多半來自一間被設計來移除一切自然元素的房間。","這是當刺激材料被容許「是真的」之後發生的事——而分析方法也跟上了腳步：功能性連結分析，交給機器學習分類器來解讀。"],cta:"往下捲——論文從自然情境資料開始的地方開始。"}},r=p.find(i=>i.key==="C01");function x(){const{lang:i}=o(),s=n[i]??n.en;return a.jsx("section",{className:"bl bl-c01",id:r.id,"aria-label":r.title[i],children:a.jsxs("div",{className:"bl-c01-grid",children:[a.jsxs("div",{className:"bl-c01-copy",children:[s.lines.map((t,e)=>a.jsx(c,{delay:e*.12,children:a.jsx("p",{children:t})},e)),a.jsx(c,{delay:.28,children:a.jsxs("p",{className:"bl-c01-cta",children:[s.cta," ↓"]})})]}),a.jsx("div",{className:"bl-c01-scene","aria-hidden":"true",children:a.jsxs("svg",{viewBox:"0 0 260 230",focusable:"false",children:[a.jsx("g",{stroke:"rgba(242,242,247,0.28)",strokeWidth:"1.4",fill:"none",children:[[42,40],[30,108],[58,178],[200,44],[214,112],[188,180]].map(([t,e],l)=>a.jsx(d,{d:`M${t} ${e} L130 115`,stroke:"rgba(242,242,247,0.28)",strokeWidth:"1.4",duration:1,delay:l*.06},l))}),[[42,40],[30,108],[58,178],[200,44],[214,112],[188,180]].map(([t,e],l)=>a.jsx("circle",{cx:t,cy:e,r:"4",fill:"rgba(154,163,255,0.6)"},l)),a.jsx("circle",{cx:"130",cy:"115",r:"12",fill:"#5B6CF0",opacity:"0.9"}),a.jsx("circle",{cx:"130",cy:"115",r:"19",fill:"none",stroke:"#5B6CF0",strokeWidth:"1.4",opacity:"0.5"})]})})]})})}h("bl-c01-styles",`
.bl-c01 { margin-top: clamp(26px, 4vw, 44px); }
.bl-c01-grid { display: grid; grid-template-columns: minmax(0, 1fr) 220px; gap: 36px; align-items: end; }
.bl-c01-copy p { margin: 0 0 14px; max-width: 560px; font-family: var(--bl-font-display); font-size: clamp(16px, 1.9vw, 20px); line-height: 1.6; color: rgba(242,242,247,0.78); }
html.lang-zh .bl-c01-copy p { line-height: 1.85; }
.bl-c01-cta { color: #9AA3FF !important; font-size: clamp(14px, 1.5vw, 16px) !important; font-style: italic; }
html.lang-zh .bl-c01-cta { font-style: normal; }
.bl-c01-scene svg { display: block; width: 100%; height: auto; }
@media (max-width: 767px) {
  .bl-c01-grid { grid-template-columns: 1fr; gap: 10px; }
  .bl-c01-scene { max-width: 160px; margin: 0 auto; }
}
`);export{x as default};
