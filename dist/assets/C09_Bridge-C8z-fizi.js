import{u as c,j as e,ar as b,aG as p,ao as n,ap as g,an as h,aq as x,i as m}from"./index-CRXAj-yh.js";const f=x.find(l=>l.key==="C09"),t={en:{lead:"None of this was called UX Research at the time — it was called the study. Four lines carried over; each one points at the projects where it lives now.",close:"The lab gave the discipline. The interfaces came later — projects 01–10 are what this training looks like once it met a product."},zh:{lead:"這些在當年都不叫 UX Research，只叫「研究」。有四條線被帶走了；每一條，都指向它現在住的專案。",close:"實驗室給了紀律，介面是後來的事。專案 01–10，就是這套訓練遇到產品之後的樣子。"}};function v(){const{lang:l}=c(),s=t[l]??t.en;return e.jsxs(b,{chapter:f,lead:s.lead,children:[e.jsx("div",{className:"bl-bridges",children:p.map((a,o)=>e.jsx(n,{delay:o*.06,children:e.jsxs("div",{className:"bl-bridge",children:[e.jsxs("div",{className:"bl-bridge-from",children:[e.jsx("h4",{className:"bl-bridge-skill",children:a.from[l]}),e.jsx("p",{className:"bl-bridge-note",children:a.note[l]})]}),e.jsx("div",{className:"bl-bridge-link","aria-hidden":"true",children:e.jsxs("svg",{viewBox:"0 0 90 24",preserveAspectRatio:"none",focusable:"false",children:[e.jsx(g,{d:"M4 14 C 26 6, 40 20, 60 11 C 70 7, 78 11, 86 10",stroke:"var(--bl-accent-ink)",strokeWidth:"1.6",duration:.9,delay:.15,vectorEffect:"non-scaling-stroke"}),e.jsx("path",{d:"M79 5 L87 10 L79 15",fill:"none",stroke:"var(--bl-accent-ink)",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})]})}),e.jsx("div",{className:"bl-bridge-to",children:a.links.map(i=>{const r=h.find(d=>d.slug===i.slug);return r?e.jsxs("a",{className:"bl-bridge-proj",href:`#/project/${i.slug}`,children:[e.jsx("span",{className:"bl-bridge-num",children:i.num}),e.jsx("span",{className:"bl-bridge-title",children:l==="zh"?r.zhTitle:r.title})]},i.slug):null})})]})},a.key))}),e.jsx(n,{delay:.1,children:e.jsx("p",{className:"bl-close",children:s.close})})]})}m("bl-c09-styles",`
.bl-bridges { display: flex; flex-direction: column; gap: 12px; }
.bl-bridge { display: grid; grid-template-columns: minmax(0, 5fr) 90px minmax(0, 4fr); gap: 16px; align-items: center; background: var(--bl-paper-1); border: 1px solid var(--bl-line); border-radius: var(--bl-r-md); padding: 16px 20px; }
.bl-bridge-skill { margin: 0 0 5px; font-family: var(--bl-font-display); font-size: 16.5px; font-weight: 500; color: var(--bl-ink); }
.bl-bridge-note { margin: 0; font-size: 12.5px; line-height: 1.6; color: var(--bl-ink-2); }
html.lang-zh .bl-bridge-note { line-height: 1.8; }
.bl-bridge-link svg { display: block; width: 100%; height: 24px; }
.bl-bridge-to { display: flex; flex-direction: column; gap: 7px; align-items: flex-start; }
.bl-bridge-proj { display: inline-flex; align-items: baseline; gap: 8px; text-decoration: none; font-size: 13px; color: var(--bl-ink); border: 1px solid var(--bl-line); border-radius: 999px; padding: 5px 14px; background: var(--bl-paper-0); transition: border-color 160ms var(--bl-ease), background 160ms var(--bl-ease), transform 160ms var(--bl-ease); }
.bl-bridge-proj:hover { border-color: var(--bl-accent-ink); background: var(--bl-accent-soft); transform: translateX(2px); }
.bl-bridge-num { font-family: var(--bl-font-data); font-size: 10px; color: var(--bl-accent-ink); }
.bl-bridge-title { font-weight: 600; }

.bl-close { margin: 32px auto 0; max-width: 620px; text-align: center; font-family: var(--bl-font-display); font-style: italic; font-size: clamp(17px, 2vw, 21px); line-height: 1.6; color: var(--bl-ink); }
html.lang-zh .bl-close { font-style: normal; line-height: 1.85; }

@media (max-width: 860px) {
  .bl-bridge { grid-template-columns: 1fr; gap: 10px; }
  .bl-bridge-link { display: none; }
  .bl-bridge-to { flex-direction: row; flex-wrap: wrap; }
}
`);export{v as default};
