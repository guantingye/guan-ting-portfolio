import{u as c,a as f,r as v,j as e,y as p,z as b,A as x,R as m,i as u}from"./index-BNepDqQQ.js";const o=b.B1,n=x[o.phase].accent;function h(){const{lang:l}=c(),r=o[l]??o.en,d=f(),[i,s]=v.useState("resolve");return e.jsx(p,{id:"vf-b1",code:o.code,phase:o.phase,accent:n,title:r.title,lead:r.lead,roles:o.roles,tier:o.tier,footer:r.foot,children:e.jsxs("div",{className:`vf-b1${d?" reduced":""}`,style:{"--vf-accent":n},children:[e.jsx("p",{className:"vf-caption vf-b1-flownote",children:r.flowNote}),e.jsx("div",{className:"vf-b1-track",role:"list","aria-label":r.title,children:o.nodes.map((a,t)=>e.jsxs(m.Fragment,{children:[e.jsxs("button",{role:"listitem",className:`vf-b1-node ${a.kind}${i===a.id?" on":""}`,"aria-pressed":i===a.id,onMouseEnter:()=>s(a.id),onFocus:()=>s(a.id),onClick:()=>s(a.id),children:[e.jsx("span",{className:"vf-b1-node-idx",children:String(t+1).padStart(2,"0")}),e.jsx("span",{className:"vf-b1-node-name",children:r.nodeNames[a.id]})]}),t<o.nodes.length-1&&e.jsx("span",{className:"vf-b1-pipe","aria-hidden":"true",children:e.jsx("span",{className:"vf-b1-flow"})})]},a.id))}),e.jsxs("div",{className:"vf-b1-detail","aria-live":"polite",children:[e.jsx("span",{className:"vf-b1-detail-name",children:r.nodeNames[i]}),e.jsx("ul",{children:r.nodeDetails[i].map((a,t)=>e.jsx("li",{children:a},t))})]}),e.jsx("div",{className:"vf-b1-callouts",children:r.callouts.map((a,t)=>e.jsxs("div",{className:"vf-b1-callout",children:[e.jsx("span",{className:"vf-eyebrow",style:{color:n},children:r.calloutLabel}),e.jsx("h5",{children:a.t}),e.jsx("p",{children:a.d})]},t))})]})})}u("vf-b1-style",`
.vf-b1-flownote { display: block; margin-bottom: 10px; }
.vf-b1-track { display: flex; align-items: center; overflow-x: auto; padding: 6px 2px 14px; scrollbar-width: thin; }
.vf-b1-node { flex: 0 0 auto; display: flex; flex-direction: column; gap: 4px; align-items: flex-start; padding: 11px 14px; border-radius: var(--vf-r-sm); border: 1px solid var(--vf-line-2); background: var(--vf-bg-2); transition: border-color 160ms var(--vf-ease), background 160ms var(--vf-ease), transform 140ms var(--vf-ease); }
.vf-b1-node.io { background: var(--vf-bg-3); }
.vf-b1-node.on { border-color: var(--vf-accent); background: color-mix(in srgb, var(--vf-accent) 12%, var(--vf-bg-2)); transform: translateY(-2px); }
.vf-b1-node-idx { font-family: var(--vf-font-data); font-size: 9.5px; color: var(--vf-accent); letter-spacing: 0.08em; }
.vf-b1-node-name { font-size: 12.5px; font-weight: 600; color: var(--vf-text-1); white-space: nowrap; }
.vf-b1-pipe { flex: 0 0 26px; height: 2px; background: var(--vf-line-2); position: relative; overflow: hidden; border-radius: 2px; }
.vf-b1-flow { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, var(--vf-accent), transparent); background-size: 40% 100%; background-repeat: no-repeat; animation: vf-b1-move 1.8s linear infinite; }
@keyframes vf-b1-move { from { background-position: -40% 0; } to { background-position: 140% 0; } }
.vf-b1.reduced .vf-b1-pipe { background: var(--vf-accent); opacity: 0.5; }
.vf-b1.reduced .vf-b1-flow { display: none; }
.vf-b1-detail { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-left: 2px solid var(--vf-accent); border-radius: var(--vf-r-md); padding: 14px 16px; margin-bottom: 14px; }
.vf-b1-detail-name { font-size: 14px; font-weight: 600; color: var(--vf-text-1); }
.vf-b1-detail ul { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px 10px; }
.vf-b1-detail li { font-family: var(--vf-font-data); font-size: 11.5px; color: var(--vf-text-2); background: var(--vf-bg-3); border-radius: 4px; padding: 4px 9px; }
.vf-b1-callouts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.vf-b1-callout { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 14px 16px; }
.vf-b1-callout h5 { margin: 8px 0 6px; font-size: 13.5px; color: var(--vf-text-1); }
.vf-b1-callout p { margin: 0; font-size: 12.5px; line-height: 1.55; color: var(--vf-text-2); }
@media (max-width: 720px) { .vf-b1-callouts { grid-template-columns: 1fr; } }
`);export{h as default};
