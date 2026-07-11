import{u as n,j as e,K as c,N as o,O as d,i as h}from"./index-BTnBFpGd.js";const t={en:{lines:["Every console in this portfolio learned its manners somewhere.","Before the dashboards: hallways, case files, picture cards, and folding chairs."],cta:"Scroll down — the paper begins where the field did."},zh:{lines:["這本作品集裡的每一座主控台，都是在某個地方學會規矩的。","在儀表板之前，是走廊、個案紀錄、圖卡，和一張張折疊椅。"],cta:"往下捲——紙張開始的地方，就是田野開始的地方。"}},l=d.find(s=>s.key==="C01");function x(){const{lang:s}=n(),i=t[s]??t.en;return e.jsx("section",{className:"fj fj-c01",id:l.id,"aria-label":l.title[s],children:e.jsxs("div",{className:"fj-c01-grid",children:[e.jsxs("div",{className:"fj-c01-copy",children:[i.lines.map((r,a)=>e.jsx(c,{delay:a*.14,children:e.jsx("p",{children:r})},a)),e.jsx(c,{delay:.3,children:e.jsxs("p",{className:"fj-c01-cta",children:[i.cta," ↓"]})})]}),e.jsx("div",{className:"fj-c01-scene","aria-hidden":"true",children:e.jsxs("svg",{viewBox:"0 0 300 330",focusable:"false",children:[e.jsxs("g",{stroke:"rgba(240,239,249,0.4)",strokeWidth:"2",fill:"none",strokeLinecap:"round",children:[e.jsx("rect",{x:"96",y:"18",width:"108",height:"70",rx:"8"}),e.jsx("path",{d:"M134 100h32M150 88v12"})]}),e.jsx("g",{stroke:"#E0956A",strokeWidth:"2",fill:"none",strokeLinecap:"round",opacity:"0.7",children:e.jsx("path",{d:"M110 40h44M110 54h64M110 68h32"})}),e.jsx(o,{d:"M150 112 C 110 160, 196 190, 150 236 C 112 274, 168 300, 150 330",stroke:"#E0956A",strokeWidth:"2.5",duration:1.7}),e.jsxs("g",{fill:"#E0956A",opacity:"0.85",children:[e.jsx("circle",{cx:"128",cy:"168",r:"3"}),e.jsx("circle",{cx:"172",cy:"212",r:"3"}),e.jsx("circle",{cx:"132",cy:"278",r:"3"})]})]})})]})})}h("fj-c01-styles",`
.fj-c01 { margin-top: clamp(28px, 4vw, 46px); }
.fj-c01-grid { display: grid; grid-template-columns: minmax(0, 1fr) 240px; gap: 36px; align-items: end; }
.fj-c01-copy p { margin: 0 0 14px; max-width: 560px; font-family: var(--fj-font-display); font-size: clamp(17px, 2vw, 21px); line-height: 1.6; color: rgba(240,239,249,0.78); }
html.lang-zh .fj-c01-copy p { line-height: 1.85; }
.fj-c01-cta { color: #E0956A !important; font-size: clamp(15px, 1.6vw, 17px) !important; font-style: italic; }
html.lang-zh .fj-c01-cta { font-style: normal; }
.fj-c01-scene svg { display: block; width: 100%; height: auto; }
@media (max-width: 767px) {
  .fj-c01-grid { grid-template-columns: 1fr; gap: 10px; }
  .fj-c01-scene { max-width: 170px; margin: 0 auto; }
}
`);export{x as default};
