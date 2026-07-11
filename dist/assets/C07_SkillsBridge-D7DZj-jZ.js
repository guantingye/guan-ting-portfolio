import{u as f,j as e,U as j,a1 as p,V as g,K as t,N as h,a2 as x,Z as m,O as v,i as b}from"./index-BTnBFpGd.js";const u=v.find(i=>i.key==="C07"),l={en:{lead:"Nothing here was called UX at the time — it was called the job. Five lines carried over; each one points at the projects where it lives now.",close:"The field gave the discipline. The tools came later — projects 01–09 are what this job looks like once it got them."},zh:{lead:"這些在當年都不叫 UX，只叫「份內的事」。有五條線被帶走了；每一條，都指向它現在住的專案。",close:"田野給了紀律，工具是後來的事。專案 01–09，就是這份工作拿到工具之後的樣子。"}},k={data:"st2",forms:"st3",aac:"st1",content:"st2",ops:"st3"};function w(){const{lang:i}=f(),n=l[i]??l.en;return e.jsxs(j,{chapter:u,lead:n.lead,children:[e.jsx("div",{className:"fj-bridges",children:p.map((r,o)=>{const d=g.find(a=>a.id===k[r.key]);return e.jsx(t,{delay:o*.06,children:e.jsxs("div",{className:"fj-bridge",style:m(d),children:[e.jsxs("div",{className:"fj-bridge-from",children:[e.jsx("h4",{className:"fj-bridge-skill",children:r.from[i]}),e.jsx("p",{className:"fj-bridge-note",children:r.note[i]})]}),e.jsx("div",{className:"fj-bridge-link","aria-hidden":"true",children:e.jsxs("svg",{viewBox:"0 0 90 24",preserveAspectRatio:"none",focusable:"false",children:[e.jsx(h,{d:"M4 14 C 26 6, 40 20, 60 11 C 70 7, 78 11, 86 10",stroke:"var(--fj-accent-ink)",strokeWidth:"1.8",duration:.9,delay:.15,vectorEffect:"non-scaling-stroke"}),e.jsx("path",{d:"M79 5 L87 10 L79 15",fill:"none",stroke:"var(--fj-accent-ink)",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})]})}),e.jsx("div",{className:"fj-bridge-to",children:r.links.map(a=>{const s=x.find(c=>c.slug===a.slug);return s?e.jsxs("a",{className:"fj-bridge-proj",href:`#/project/${a.slug}`,children:[e.jsx("span",{className:"fj-bridge-num",children:a.num}),e.jsx("span",{className:"fj-bridge-title",children:i==="zh"?s.zhTitle:s.title})]},a.slug):null})})]})},r.key)})}),e.jsx(t,{delay:.1,children:e.jsx("p",{className:"fj-close",children:n.close})})]})}b("fj-c07-styles",`
.fj-bridges { display: flex; flex-direction: column; gap: 14px; }
.fj-bridge { display: grid; grid-template-columns: minmax(0, 5fr) 90px minmax(0, 4fr); gap: 16px; align-items: center; background: var(--fj-paper-1); border: 1px solid var(--fj-line); border-radius: var(--fj-r-md); box-shadow: var(--fj-shadow); padding: 16px 20px; }
.fj-bridge-skill { margin: 0 0 5px; font-family: var(--fj-font-display); font-size: 17px; font-weight: 500; color: var(--fj-ink); }
.fj-bridge-note { margin: 0; font-size: 13px; line-height: 1.6; color: var(--fj-ink-2); }
html.lang-zh .fj-bridge-note { line-height: 1.8; }
.fj-bridge-link svg { display: block; width: 100%; height: 24px; }
.fj-bridge-to { display: flex; flex-direction: column; gap: 7px; align-items: flex-start; }
.fj-bridge-proj { display: inline-flex; align-items: baseline; gap: 8px; text-decoration: none; font-size: 13.5px; color: var(--fj-ink); border: 1px solid var(--fj-line); border-radius: 999px; padding: 5px 14px; background: var(--fj-paper-0); transition: border-color 160ms var(--fj-ease), background 160ms var(--fj-ease), transform 160ms var(--fj-ease); }
.fj-bridge-proj:hover { border-color: var(--fj-accent-ink); background: var(--fj-accent-soft); transform: translateX(2px); }
.fj-bridge-num { font-family: var(--fj-font-data); font-size: 10.5px; color: var(--fj-accent-ink); }
.fj-bridge-title { font-weight: 600; }

.fj-close { margin: 34px auto 0; max-width: 640px; text-align: center; font-family: var(--fj-font-display); font-style: italic; font-size: clamp(18px, 2.2vw, 23px); line-height: 1.6; color: var(--fj-ink); }
html.lang-zh .fj-close { font-style: normal; line-height: 1.9; }

@media (max-width: 860px) {
  .fj-bridge { grid-template-columns: 1fr; gap: 10px; }
  .fj-bridge-link { display: none; }
  .fj-bridge-to { flex-direction: row; flex-wrap: wrap; }
}
`);export{w as default};
