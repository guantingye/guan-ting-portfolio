import{u as x,a as m,j as e,y as b,z as h,A as g,r as v,m as u,i as j}from"./index-BTnBFpGd.js";const f=h.D1,p=g[f.phase].accent,c={trust:"var(--vf-teal)",target:"var(--vf-sky)",reconcile:"var(--vf-iris)",timely:"var(--vf-amber)"};function y({c:r,reduced:a}){const[o,d]=v.useState(a),l=v.useMemo(()=>{const s=u(41);return r.notes.map(()=>({x:4+s()*78,y:4+s()*80,r:(s()-.5)*6}))},[r]);return e.jsxs("div",{className:"vf-d1-wall",children:[e.jsxs("div",{className:"vf-d1-wall-head",children:[e.jsx("span",{className:"vf-eyebrow",style:{color:p},children:r.wallLabel}),e.jsx("button",{className:"vf-btn",onClick:()=>d(s=>!s),"aria-pressed":o,children:o?r.resetBtn:r.clusterBtn})]}),!o&&e.jsx("p",{className:"vf-d1-wall-hint",children:r.wallHint}),o?e.jsx("div",{className:"vf-d1-clusters",children:r.clusters.map(s=>e.jsxs("div",{className:"vf-d1-cluster",style:{"--t":c[s.id]},children:[e.jsx("span",{className:"vf-d1-cluster-name",children:s.name}),e.jsx("div",{className:"vf-d1-cluster-notes",children:r.notes.filter(t=>t.c===s.id).map((t,n)=>e.jsx("span",{className:"vf-d1-note sm",children:t.t},n))}),e.jsx("p",{className:"vf-d1-cluster-insight",children:s.insight})]},s.id))}):e.jsx("div",{className:"vf-d1-scatter",children:r.notes.map((s,t)=>e.jsx("span",{className:"vf-d1-note",style:{left:`${l[t].x}%`,top:`${l[t].y}%`,"--r":`${l[t].r}deg`,"--t":c[s.c]},children:s.t},t))})]})}function N({c:r}){const[a,o]=v.useState(0),d=v.useRef([]),l=t=>{var i;const n=(a+t+r.personas.length)%r.personas.length;o(n),(i=d.current[n])==null||i.focus()},s=r.personas[a];return e.jsxs("div",{className:"vf-d1-persona",children:[e.jsx("span",{className:"vf-eyebrow",style:{color:p},children:r.personaLabel}),e.jsx("div",{className:"vf-d1-tabs",role:"tablist","aria-label":r.personaLabel,children:r.personas.map((t,n)=>e.jsx("button",{role:"tab",ref:i=>d.current[n]=i,className:`vf-d1-tab${n===a?" on":""}`,"aria-selected":n===a,tabIndex:n===a?0:-1,onClick:()=>o(n),onKeyDown:i=>{i.key==="ArrowRight"&&(i.preventDefault(),l(1)),i.key==="ArrowLeft"&&(i.preventDefault(),l(-1))},children:t.name},n))}),e.jsxs("div",{className:"vf-d1-file",role:"tabpanel",children:[e.jsx("span",{className:"vf-d1-file-role",children:s.role}),e.jsxs("p",{className:"vf-d1-jtbd",children:[e.jsx("span",{className:"vf-d1-jtbd-k",children:"When"})," ",s.when,e.jsx("span",{className:"vf-d1-jtbd-k",children:"I want to"})," ",s.want,e.jsx("span",{className:"vf-d1-jtbd-k",children:"so I can"})," ",s.so]}),e.jsxs("div",{className:"vf-d1-po",children:[e.jsxs("div",{children:[e.jsx("span",{className:"vf-d1-po-k",children:"Pains"}),e.jsx("ul",{children:s.pains.map((t,n)=>e.jsx("li",{children:t},n))})]}),e.jsxs("div",{children:[e.jsx("span",{className:"vf-d1-po-k",children:"Desired outcomes"}),e.jsx("ul",{children:s.outcomes.map((t,n)=>e.jsx("li",{children:t},n))})]})]})]})]})}function k(){const{lang:r}=x(),a=f[r]??f.en,o=m();return e.jsx(b,{id:"vf-d1",code:f.code,phase:f.phase,accent:p,title:a.title,lead:a.lead,roles:f.roles,tier:f.tier,footer:a.foot,disclaimer:a.disclaimer,children:e.jsxs("div",{className:"vf-d1",style:{"--vf-accent":p},children:[e.jsxs("div",{className:"vf-d1-plan",children:[e.jsx("span",{className:"vf-eyebrow",style:{color:p},children:a.planLabel}),e.jsxs("div",{className:"vf-d1-plan-grid",children:[e.jsxs("div",{children:[e.jsx("span",{className:"vf-d1-sub",children:a.questionsLabel}),e.jsx("ol",{className:"vf-d1-q",children:a.questions.map((d,l)=>e.jsx("li",{children:d},l))})]}),e.jsxs("div",{children:[e.jsx("span",{className:"vf-d1-sub",children:a.methodsLabel}),e.jsx("ul",{className:"vf-d1-methods",children:a.methods.map((d,l)=>e.jsxs("li",{children:[e.jsx("b",{children:d.name}),e.jsx("span",{children:d.desc})]},l))}),e.jsx("span",{className:"vf-d1-sub",style:{marginTop:14},children:a.sampleLabel}),e.jsx("div",{className:"vf-d1-sample",children:a.sample.map((d,l)=>e.jsxs("span",{className:"vf-d1-samp",children:[d.role,e.jsxs("b",{children:["×",d.n]})]},l))})]})]})]}),e.jsx(y,{c:a,reduced:o}),e.jsx(N,{c:a})]})})}j("vf-d1-style",`
.vf-d1 { display: flex; flex-direction: column; gap: 22px; }
.vf-d1-sub { display: block; font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--vf-text-3); margin-bottom: 8px; }
.vf-d1-plan-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 10px; }
.vf-d1-q { margin: 0; padding-left: 18px; }
.vf-d1-q li { font-size: 13.5px; line-height: 1.55; color: var(--vf-text-2); margin-bottom: 8px; }
.vf-d1-methods { list-style: none; margin: 0; padding: 0; }
.vf-d1-methods li { margin-bottom: 9px; }
.vf-d1-methods b { display: block; font-size: 13px; color: var(--vf-text-1); font-weight: 600; }
.vf-d1-methods span { font-size: 12px; color: var(--vf-text-3); }
.vf-d1-sample { display: flex; flex-wrap: wrap; gap: 7px; }
.vf-d1-samp { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-2); background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: 999px; padding: 4px 10px; }
.vf-d1-samp b { color: var(--vf-accent); margin-left: 5px; }

.vf-d1-wall { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-d1-wall-head { display: flex; align-items: center; justify-content: space-between; }
.vf-d1-wall-hint { margin: 8px 0 0; font-size: 12px; color: var(--vf-text-3); }
.vf-d1-scatter { position: relative; height: 220px; margin-top: 12px; }
.vf-d1-note { position: absolute; font-size: 11px; line-height: 1.35; color: var(--vf-text-2); background: var(--vf-bg-3); border: 1px solid var(--vf-line-1); border-left: 2px solid var(--t); border-radius: 3px; padding: 5px 8px; max-width: 150px; transform: rotate(var(--r, 0deg)); box-shadow: 0 4px 10px rgba(0,0,0,0.25); transition: transform 400ms var(--vf-ease); }
.vf-d1-note.sm { position: static; max-width: none; transform: none; box-shadow: none; margin-bottom: 5px; display: block; }
.vf-d1-clusters { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 12px; }
.vf-d1-cluster { border: 1px solid var(--vf-line-1); border-top: 2px solid var(--t); border-radius: var(--vf-r-sm); padding: 12px; background: var(--vf-bg-1); }
.vf-d1-cluster-name { display: block; font-size: 13px; font-weight: 600; color: var(--vf-text-1); margin-bottom: 8px; }
.vf-d1-cluster-notes { margin-bottom: 10px; }
.vf-d1-cluster-insight { margin: 0; padding-top: 9px; border-top: 1px solid var(--vf-line-1); font-size: 12px; line-height: 1.55; color: var(--vf-text-2); }

.vf-d1-persona { }
.vf-d1-tabs { display: flex; gap: 4px; margin-top: 10px; }
.vf-d1-tab { font-size: 13px; font-weight: 600; color: var(--vf-text-3); background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-bottom: none; border-radius: var(--vf-r-sm) var(--vf-r-sm) 0 0; padding: 9px 16px; position: relative; top: 1px; }
.vf-d1-tab.on { color: var(--vf-text-1); background: var(--vf-bg-3); border-color: var(--vf-line-2); }
.vf-d1-file { background: var(--vf-bg-3); border: 1px solid var(--vf-line-2); border-radius: 0 var(--vf-r-md) var(--vf-r-md) var(--vf-r-md); padding: 18px; }
.vf-d1-file-role { font-family: var(--vf-font-data); font-size: 11px; letter-spacing: 0.06em; color: var(--vf-accent); }
.vf-d1-jtbd { margin: 12px 0 0; font-family: var(--vf-font-display); font-size: 18px; line-height: 1.5; color: var(--vf-text-1); }
.vf-d1-jtbd-k { display: inline; font-family: var(--vf-font-data); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vf-text-3); margin: 0 6px 0 2px; }
.vf-d1-jtbd-k:first-child { margin-left: 0; }
.vf-d1-po { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--vf-line-1); }
.vf-d1-po-k { display: block; font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--vf-text-3); margin-bottom: 6px; }
.vf-d1-po ul { list-style: none; margin: 0; padding: 0; }
.vf-d1-po li { position: relative; padding-left: 14px; font-size: 12.5px; line-height: 1.5; color: var(--vf-text-2); margin-bottom: 6px; }
.vf-d1-po li::before { content: ''; position: absolute; left: 2px; top: 8px; width: 4px; height: 4px; border-radius: 50%; background: var(--vf-accent); }
@media (max-width: 720px) {
  .vf-d1-plan-grid, .vf-d1-po { grid-template-columns: 1fr; }
  .vf-d1-tabs { flex-wrap: wrap; }
  .vf-d1-tab { border-radius: var(--vf-r-sm); top: 0; }
}
@media (prefers-reduced-motion: reduce) { .vf-d1-note { transition: none; } }
`);export{k as default};
