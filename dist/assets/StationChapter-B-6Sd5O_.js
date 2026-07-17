import{u as x,U as j,j as t,V as u,Y as y,W as s,a4 as h,a5 as m,a6 as n,a7 as g,a8 as v,a9 as w,aa as b,ab as f,ac as k,ad as z,ae as N,af as F,ag as S,ah as C,X as D,_ as I,i as U}from"./index-5Szh5aR5.js";const T={care:C,curriculum:S,aac:F,events:N,content:z,casedata:k,annual:n,project:f,podcast:b,web:w,form:v,lecture:g,data:n,strategy:m,crossorg:h},_=f;function B({duties:d,lang:a,reduced:r}){return t.jsx(s.ol,{className:"fj-duty-route",role:"list",variants:I(),initial:r?!1:"hidden",whileInView:"show",viewport:{once:!0,amount:.1},children:d.map((e,p)=>{const i=T[e.key]??_;return t.jsxs(s.li,{className:"fj-duty-step",variants:D,children:[t.jsx("span",{className:"fj-duty-marker","aria-hidden":"true",children:String(p+1).padStart(2,"0")}),t.jsxs("div",{className:"fj-duty-sheet",children:[t.jsxs("div",{className:"fj-duty-title-wrap",children:[t.jsx("span",{className:"fj-duty-icon","aria-hidden":"true",children:t.jsx(i,{})}),t.jsx("h4",{className:"fj-duty-title",children:e.title[a]})]}),t.jsx("div",{className:"fj-duty-copy",children:t.jsx("p",{className:"fj-duty-body",children:e.body[a]})})]})]},e.key)})})}function M({chapter:d,station:a,spotlight:r,spotlightTitle:e,spotlightCaption:p}){const{lang:i}=x(),o=j();return t.jsxs(u,{chapter:d,station:a,lead:a.intro[i],note:a.fieldNote[i],children:[r&&t.jsxs("div",{className:"fj-spot",children:[t.jsxs("div",{className:"fj-spot-head",children:[t.jsx("span",{className:"fj-eyebrow",children:i==="zh"?"招牌一件":"Signature piece"}),e&&t.jsx("h4",{className:"fj-spot-title",children:e})]}),r,p&&t.jsx("p",{className:"fj-spot-cap",children:p})]}),t.jsx(B,{duties:a.duties,lang:i,reduced:o}),t.jsx("div",{className:"fj-station-tags",children:a.tags.map((c,l)=>t.jsx(y,{children:c[i]},l))})]})}U("fj-station-styles",`
/* spotlight */
.fj-spot { margin-bottom: 30px; }
.fj-spot-head { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin-bottom: 14px; }
.fj-spot-title { margin: 0; font-family: var(--fj-font-display); font-size: 21px; font-weight: 500; color: var(--fj-ink); }
.fj-spot-cap { margin: 12px 0 0; font-size: 12.5px; line-height: 1.6; color: var(--fj-ink-3); max-width: 620px; }

/* duty route */
.fj-duty-route { position: relative; display: grid; gap: 18px; list-style: none; margin: 0; padding: 4px 0; }
.fj-duty-route::before { content: ''; position: absolute; z-index: 0; top: 28px; bottom: 28px; left: 27px; width: 2px; background: repeating-linear-gradient(180deg, var(--fj-accent) 0 7px, transparent 7px 13px); opacity: 0.55; }
.fj-duty-step { --fj-duty-marker-size: 56px; --fj-duty-gap: 18px; --fj-duty-offset: 0px; position: relative; z-index: 1; display: grid; grid-template-columns: var(--fj-duty-marker-size) minmax(0, 1fr); gap: var(--fj-duty-gap); align-items: start; }
.fj-duty-step:nth-child(3n + 2) { --fj-duty-offset: clamp(18px, 4vw, 52px); }
.fj-duty-step:nth-child(3n) { --fj-duty-offset: clamp(7px, 1.8vw, 24px); }
.fj-duty-step::after { content: ''; position: absolute; z-index: 0; top: 27px; left: calc(var(--fj-duty-marker-size) - 2px); width: calc(var(--fj-duty-gap) + var(--fj-duty-offset) + 9px); border-top: 1px solid var(--fj-accent); opacity: 0.48; }
.fj-duty-marker { position: relative; z-index: 2; display: grid; place-items: center; width: 56px; height: 56px; background: var(--fj-paper-1); border: 1.5px solid var(--fj-accent); border-radius: var(--fj-r-sm); box-shadow: 2px 3px 0 var(--fj-accent-soft); color: var(--fj-accent-ink); font-family: var(--fj-font-data); font-size: 16px; font-weight: 600; letter-spacing: 0.05em; transform: rotate(-1.4deg); }
.fj-duty-step:nth-child(even) .fj-duty-marker { transform: rotate(1.2deg); }
.fj-duty-sheet { --fj-duty-cut: 10px; --fj-duty-notch-y: 27px; position: relative; z-index: 1; display: grid; grid-template-columns: minmax(190px, 0.72fr) minmax(0, 1.28fr); gap: 1px; align-items: stretch; width: calc(100% - var(--fj-duty-offset) - 4px); margin-left: var(--fj-duty-offset); overflow: hidden; padding: 1px; background: var(--fj-line); clip-path: polygon(var(--fj-duty-cut) 0, 100% 0, 100% calc(100% - var(--fj-duty-cut)), calc(100% - var(--fj-duty-cut)) 100%, 0 100%, 0 calc(var(--fj-duty-notch-y) + 7px), 7px var(--fj-duty-notch-y), 0 calc(var(--fj-duty-notch-y) - 7px), 0 var(--fj-duty-cut)); }
.fj-duty-title-wrap { display: flex; align-items: flex-start; gap: 12px; min-width: 0; padding: 18px 18px 18px 20px; background: linear-gradient(105deg, var(--fj-accent-soft), transparent 78%), var(--fj-paper-1); }
.fj-duty-icon { display: grid; flex: 0 0 auto; place-items: center; width: 30px; height: 30px; margin-top: 1px; border: 1px solid var(--fj-accent); border-radius: var(--fj-r-sm); background: var(--fj-paper-0); color: var(--fj-accent-ink); }
.fj-duty-icon svg { display: block; width: 17px; height: 17px; }
.fj-duty-title { margin: 0; font-family: var(--fj-font-display); font-size: 17px; font-weight: 500; line-height: 1.42; color: var(--fj-ink); }
.fj-duty-copy { display: flex; align-items: center; min-width: 0; padding: 18px 24px; background: var(--fj-paper-1); }
.fj-duty-body { margin: 0; font-size: 13.5px; line-height: 1.62; color: var(--fj-ink-2); }
html.lang-zh .fj-duty-body { line-height: 1.85; }

.fj-station-tags { display: flex; gap: 9px; flex-wrap: wrap; margin-top: 22px; }

@media (max-width: 899px) {
  .fj-duty-sheet { grid-template-columns: 1fr; }
  .fj-duty-title-wrap { padding: 16px 18px 12px; }
  .fj-duty-copy { padding: 14px 18px 16px 60px; }
}
@media (max-width: 767px) {
  .fj-duty-route { gap: 16px; padding-top: 2px; }
  .fj-duty-route::before { top: 21px; bottom: 21px; left: 20px; }
  .fj-duty-step { --fj-duty-marker-size: 42px; --fj-duty-gap: 12px; --fj-duty-offset: 0px; grid-template-columns: var(--fj-duty-marker-size) minmax(0, 1fr); gap: var(--fj-duty-gap); }
  .fj-duty-step:nth-child(3n + 2), .fj-duty-step:nth-child(3n) { --fj-duty-offset: 0px; }
  .fj-duty-step::after { top: 20px; }
  .fj-duty-marker { width: 42px; height: 42px; font-size: 13px; transform: none; }
  .fj-duty-step:nth-child(even) .fj-duty-marker { transform: none; }
  .fj-duty-sheet { --fj-duty-cut: 8px; --fj-duty-notch-y: 20px; width: 100%; margin-left: 0; }
  .fj-duty-title-wrap { gap: 10px; padding: 14px 14px 12px; }
  .fj-duty-icon { width: 28px; height: 28px; }
  .fj-duty-icon svg { width: 16px; height: 16px; }
  .fj-duty-copy { padding: 12px 14px 14px 52px; }
  .fj-duty-title { font-size: 16px; }
}
`);export{M as S};
