import{u as f,Q as j,j as a,U as c,W as l,X as x,_ as m,Y as h,i as g}from"./index-BTnBFpGd.js";function y({chapter:p,station:e,spotlight:n,spotlightTitle:r,spotlightCaption:o}){const{lang:t}=f(),d=j();return a.jsxs(c,{chapter:p,station:e,lead:e.intro[t],note:e.fieldNote[t],children:[n&&a.jsxs("div",{className:"fj-spot",children:[a.jsxs("div",{className:"fj-spot-head",children:[a.jsx("span",{className:"fj-eyebrow",children:t==="zh"?"招牌一件":"Signature piece"}),r&&a.jsx("h4",{className:"fj-spot-title",children:r})]}),n,o&&a.jsx("p",{className:"fj-spot-cap",children:o})]}),a.jsx(l.div,{className:"fj-duty-grid",variants:m(),initial:d?!1:"hidden",whileInView:"show",viewport:{once:!0,amount:.1},children:e.duties.map((i,s)=>a.jsxs(l.div,{className:"fj-card fj-duty",variants:x,children:[a.jsx("span",{className:"fj-duty-num",children:String(s+1).padStart(2,"0")}),a.jsx("h4",{className:"fj-duty-title",children:i.title[t]}),a.jsx("p",{className:"fj-duty-body",children:i.body[t]})]},i.key))}),a.jsx("div",{className:"fj-station-tags",children:e.tags.map((i,s)=>a.jsx(h,{children:i[t]},s))})]})}g("fj-station-styles",`
/* spotlight */
.fj-spot { margin-bottom: 30px; }
.fj-spot-head { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; margin-bottom: 14px; }
.fj-spot-title { margin: 0; font-family: var(--fj-font-display); font-size: 21px; font-weight: 500; color: var(--fj-ink); }
.fj-spot-cap { margin: 12px 0 0; font-size: 12.5px; line-height: 1.6; color: var(--fj-ink-3); max-width: 620px; }

/* duty cards */
.fj-duty-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
.fj-duty { position: relative; padding: 18px 18px 16px; }
.fj-duty-num { position: absolute; top: 14px; right: 16px; font-family: var(--fj-font-data); font-size: 11px; color: var(--fj-accent-ink); opacity: 0.75; }
.fj-duty-title { margin: 0 26px 8px 0; font-family: var(--fj-font-display); font-size: 16.5px; font-weight: 500; line-height: 1.4; color: var(--fj-ink); }
.fj-duty-body { margin: 0; font-size: 13.5px; line-height: 1.62; color: var(--fj-ink-2); }
html.lang-zh .fj-duty-body { line-height: 1.85; }

.fj-station-tags { display: flex; gap: 9px; flex-wrap: wrap; margin-top: 22px; }
`);export{y as S};
