import{u as h,r as u,j as e,y as b,z as y,A as j,i as w}from"./index-DinO7kZj.js";const s=y.D2,i=j[s.phase].accent,d={3:.85,2:.44,1:.14};function k(){const{lang:c}=h(),a=s[c]??s.en,[v,o]=u.useState(null),f=(r,t)=>{const l=r.grid[t],p=s.competitors[t],x=a.capNames[r.id],m=s.levels[c][l],n=`${p} · ${x}: ${m}`,g=t===s.competitors.length-1;return e.jsx("button",{className:`vf-d2-cell${g?" is-own":""}`,style:{"--a":d[l]},title:n,"aria-label":n,onMouseEnter:()=>o(n),onFocus:()=>o(n),onMouseLeave:()=>o(null),onBlur:()=>o(null),children:e.jsx("span",{className:"vf-d2-dot","aria-hidden":"true","data-level":l})},r.id+t)};return e.jsx(b,{id:"vf-d2",code:s.code,phase:s.phase,accent:i,title:a.title,lead:a.lead,roles:s.roles,tier:s.tier,footer:a.foot,children:e.jsxs("div",{className:"vf-d2",style:{"--vf-accent":i},children:[e.jsx("div",{className:"vf-d2-scroll",children:e.jsxs("div",{className:"vf-d2-grid",role:"table","aria-label":a.title,children:[e.jsxs("div",{className:"vf-d2-row vf-d2-head",role:"row",children:[e.jsx("span",{className:"vf-d2-caplabel",role:"columnheader",children:a.capLabel}),s.competitors.map((r,t)=>e.jsx("span",{role:"columnheader",className:`vf-d2-comp${t===s.competitors.length-1?" is-own":""}`,children:r},r))]}),s.capabilities.map(r=>e.jsxs("div",{className:"vf-d2-row",role:"row",children:[e.jsx("span",{className:"vf-d2-capname",role:"rowheader",children:a.capNames[r.id]}),s.competitors.map((t,l)=>f(r,l))]},r.id))]})}),e.jsxs("div",{className:"vf-d2-legend","aria-hidden":"true",children:[e.jsx("span",{className:"vf-d2-readout",children:v||" "}),e.jsxs("span",{className:"vf-d2-legend-keys",children:[e.jsxs("span",{className:"vf-d2-key",children:[e.jsx("i",{style:{"--a":d[3]}}),a.legendStrong]}),e.jsxs("span",{className:"vf-d2-key",children:[e.jsx("i",{style:{"--a":d[2]}}),a.legendMid]}),e.jsxs("span",{className:"vf-d2-key",children:[e.jsx("i",{style:{"--a":d[1]}}),a.legendWeak]})]})]}),e.jsxs("div",{className:"vf-d2-gap",children:[e.jsx("span",{className:"vf-eyebrow",style:{color:i},children:a.gapLabel}),e.jsx("p",{children:a.gap})]}),e.jsxs("div",{className:"vf-d2-source",children:[e.jsx("span",{className:"vf-tag",children:a.asOf}),e.jsxs("p",{children:[e.jsxs("span",{className:"vf-d2-source-label",children:[a.sourceLabel," · "]}),a.source]})]})]})})}w("vf-d2-style",`
.vf-d2-scroll { overflow-x: auto; scrollbar-width: thin; padding-bottom: 4px; }
.vf-d2-grid { min-width: 560px; }
.vf-d2-row { display: grid; grid-template-columns: 168px repeat(5, 1fr); align-items: stretch; gap: 4px; }
.vf-d2-row + .vf-d2-row { margin-top: 4px; }
.vf-d2-head { margin-bottom: 6px; }
.vf-d2-caplabel { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--vf-text-3); align-self: end; padding-bottom: 4px; }
.vf-d2-comp { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-2); text-align: center; align-self: end; padding-bottom: 4px; line-height: 1.25; }
.vf-d2-comp.is-own { color: var(--vf-accent); font-weight: 500; }
.vf-d2-capname { font-size: 12.5px; color: var(--vf-text-2); display: flex; align-items: center; padding-right: 8px; }
.vf-d2-cell { height: 40px; border-radius: var(--vf-r-sm); border: 1px solid var(--vf-line-1); background: color-mix(in srgb, var(--vf-accent) calc(var(--a) * 100%), var(--vf-bg-2)); display: flex; align-items: center; justify-content: center; transition: transform 140ms var(--vf-ease), border-color 140ms var(--vf-ease); }
.vf-d2-cell:hover, .vf-d2-cell:focus-visible { transform: translateY(-2px); border-color: var(--vf-accent); }
.vf-d2-cell.is-own { border-color: var(--vf-accent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vf-accent) 40%, transparent); }
.vf-d2-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--vf-bg-0); opacity: 0.5; }
.vf-d2-dot[data-level="3"] { opacity: 0.9; }
.vf-d2-dot[data-level="1"] { opacity: 0.22; }
.vf-d2-legend { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 12px; }
.vf-d2-readout { font-family: var(--vf-font-data); font-size: 12px; color: var(--vf-text-1); min-height: 18px; }
.vf-d2-legend-keys { display: flex; gap: 14px; }
.vf-d2-key { display: inline-flex; align-items: center; gap: 6px; font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
.vf-d2-key i { width: 12px; height: 12px; border-radius: 3px; background: color-mix(in srgb, var(--vf-accent) calc(var(--a) * 100%), var(--vf-bg-2)); border: 1px solid var(--vf-line-2); }
.vf-d2-gap { margin-top: 22px; padding: 18px 20px; border-left: 2px solid var(--vf-accent); background: var(--vf-bg-2); border-radius: 0 var(--vf-r-md) var(--vf-r-md) 0; }
.vf-d2-gap p { margin: 8px 0 0; color: var(--vf-text-1); font-size: 15px; line-height: 1.6; }
.vf-d2-source { display: flex; gap: 14px; align-items: flex-start; margin-top: 16px; }
.vf-d2-source p { margin: 0; font-family: var(--vf-font-data); font-size: 11.5px; line-height: 1.6; color: var(--vf-text-3); }
.vf-d2-source-label { color: var(--vf-text-2); }
@media (max-width: 720px) { .vf-d2-source { flex-direction: column; gap: 8px; } }
`);export{k as default};
