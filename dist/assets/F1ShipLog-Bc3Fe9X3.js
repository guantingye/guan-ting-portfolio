import{u as l,r as p,j as e,M as d,b as v,P as c,i as x}from"./index-DuCSLQfW.js";const t=v.F1,i=c[t.phase].accent;function m(){const{lang:o}=l(),n=t[o]??t.en,[r,s]=p.useState(null);return e.jsx(d,{id:"vf-f1",code:t.code,phase:t.phase,accent:i,title:n.title,lead:n.lead,roles:t.roles,tier:t.tier,footer:n.foot,children:e.jsx("ol",{className:"vf-f1",style:{"--vf-accent":i},children:t.milestones.map(a=>{const f=r===a.id;return e.jsxs("li",{className:"vf-f1-item",children:[e.jsx("span",{className:"vf-f1-dot","aria-hidden":"true"}),e.jsxs("button",{className:"vf-f1-btn","aria-expanded":f,onClick:()=>s(f?null:a.id),onMouseEnter:()=>s(a.id),children:[e.jsx("span",{className:"vf-f1-ver",children:a.ver}),e.jsxs("span",{className:"vf-f1-main",children:[e.jsx("span",{className:"vf-f1-name",children:n.milestoneNames[a.id]}),e.jsxs("span",{className:"vf-f1-meta",children:[e.jsx("span",{className:"vf-f1-date",children:a.date}),e.jsx("span",{className:"vf-f1-tag",children:a.tag})]})]})]}),e.jsxs("div",{className:`vf-f1-why${f?" open":""}`,children:[e.jsx("span",{className:"vf-f1-why-label",children:n.whyLabel}),e.jsx("p",{children:n.milestoneWhy[a.id]})]})]},a.id)})})})}x("vf-f1-style",`
.vf-f1 { list-style: none; margin: 0; padding: 0 0 0 4px; position: relative; }
.vf-f1::before { content: ''; position: absolute; left: 9px; top: 6px; bottom: 6px; width: 1px; background: var(--vf-line-2); }
.vf-f1-item { position: relative; padding-left: 30px; padding-bottom: 4px; }
.vf-f1-dot { position: absolute; left: 5px; top: 15px; width: 9px; height: 9px; border-radius: 50%; background: var(--vf-bg-1); border: 2px solid var(--vf-accent); }
.vf-f1-btn { display: flex; align-items: center; gap: 14px; width: 100%; padding: 10px 12px; border-radius: var(--vf-r-sm); transition: background 160ms var(--vf-ease); }
.vf-f1-btn:hover { background: var(--vf-bg-2); }
.vf-f1-ver { font-family: var(--vf-font-data); font-size: 13px; font-weight: 500; color: var(--vf-accent); flex: 0 0 40px; }
.vf-f1-main { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex: 1 1 auto; min-width: 0; flex-wrap: wrap; }
.vf-f1-name { font-size: 14px; color: var(--vf-text-1); }
.vf-f1-meta { display: inline-flex; align-items: center; gap: 10px; }
.vf-f1-date { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
.vf-f1-tag { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.04em; color: var(--vf-text-3); border: 1px solid var(--vf-line-2); border-radius: 999px; padding: 1px 8px; }
.vf-f1-why { max-height: 0; overflow: hidden; transition: max-height 260ms var(--vf-ease); }
.vf-f1-why.open { max-height: 120px; }
.vf-f1-why-label { display: block; font-family: var(--vf-font-data); font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--vf-accent); padding: 6px 12px 0; }
.vf-f1-why p { margin: 4px 12px 12px; font-size: 13px; line-height: 1.6; color: var(--vf-text-2); }
@media (prefers-reduced-motion: reduce) { .vf-f1-why { transition: none; } }
`);export{m as default};
