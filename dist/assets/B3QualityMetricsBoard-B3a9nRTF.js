import{u as f,j as a,y as d,z as p,A as x,i as m}from"./index-C8jkLbP4.js";const t=p.B3,o=x[t.phase].accent;function b({data:r,up:s}){const e=Math.min(...r),i=Math.max(...r)-e||1,c=r.map((l,v)=>`${v/(r.length-1)*100},${28-(l-e)/i*24-2}`).join(" ");return a.jsxs("svg",{className:"vf-b3-spark",viewBox:"0 0 100 28",preserveAspectRatio:"none","aria-hidden":"true",children:[a.jsx("polyline",{points:c,fill:"none",stroke:s?"var(--vf-accent)":"var(--vf-text-3)",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round",vectorEffect:"non-scaling-stroke"}),a.jsx("circle",{cx:"100",cy:28-(r[r.length-1]-e)/i*24-2,r:"2",fill:s?"var(--vf-accent)":"var(--vf-text-3)"})]})}function g(){const{lang:r}=f(),s=t[r]??t.en;return a.jsx(d,{id:"vf-b3",code:t.code,phase:t.phase,accent:o,title:s.title,lead:s.lead,roles:t.roles,tier:t.tier,footer:s.foot,disclaimer:s.note,children:a.jsxs("div",{className:"vf-b3",style:{"--vf-accent":o},children:[a.jsx("div",{className:"vf-b3-kpis",children:t.kpis.map(e=>{const i=e.id!=="freshness"&&e.id!=="review"?e.delta>=0:e.delta<=0;return a.jsxs("div",{className:"vf-b3-card",children:[a.jsx("span",{className:"vf-b3-name",children:s.kpiNames[e.id]}),a.jsxs("div",{className:"vf-b3-valrow",children:[a.jsx("span",{className:"vf-b3-val",children:s.kpiVals[e.id]}),a.jsxs("span",{className:`vf-b3-delta${i?" up":" down"}`,children:[e.delta>=0?"▲":"▼"," ",Math.abs(e.delta)]})]}),a.jsx("span",{className:"vf-b3-unit",children:s.kpiUnits[e.id]}),a.jsx(b,{data:e.spark,up:i})]},e.id)})}),a.jsxs("div",{className:"vf-b3-gate",children:[a.jsxs("div",{className:"vf-b3-gate-head",children:[a.jsx("span",{className:"vf-eyebrow",style:{color:o},children:s.gateLabel}),a.jsx("p",{children:s.gateDesc})]}),a.jsx("div",{className:"vf-b3-checks",children:t.gates.map(e=>{const n=s.gateStates[e],i=/\d/.test(n);return a.jsxs("div",{className:`vf-b3-check${i?" flag":""}`,children:[a.jsx("span",{className:"vf-b3-check-dot","aria-hidden":"true"}),a.jsx("span",{className:"vf-b3-check-name",children:s.gateNames[e]}),a.jsx("span",{className:"vf-b3-check-state",children:n})]},e)})})]})]})})}m("vf-b3-style",`
.vf-b3-kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
.vf-b3-card { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 15px; }
.vf-b3-name { font-family: var(--vf-font-data); font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vf-text-3); }
.vf-b3-valrow { display: flex; align-items: baseline; gap: 8px; margin-top: 6px; }
.vf-b3-val { font-family: var(--vf-font-data); font-size: 30px; font-weight: 500; color: var(--vf-text-1); line-height: 1; }
.vf-b3-delta { font-family: var(--vf-font-data); font-size: 11px; }
.vf-b3-delta.up { color: var(--vf-teal); }
.vf-b3-delta.down { color: var(--vf-text-3); }
.vf-b3-unit { display: block; font-family: var(--vf-font-data); font-size: 10px; color: var(--vf-text-3); margin-top: 3px; }
.vf-b3-spark { width: 100%; height: 28px; margin-top: 10px; }
.vf-b3-gate { margin-top: 18px; background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; }
.vf-b3-gate-head p { margin: 8px 0 14px; font-size: 13.5px; color: var(--vf-text-2); }
.vf-b3-checks { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }
.vf-b3-check { display: flex; align-items: center; gap: 9px; background: var(--vf-bg-3); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); padding: 10px 12px; }
.vf-b3-check-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--vf-teal); box-shadow: 0 0 6px var(--vf-teal); flex: 0 0 auto; }
.vf-b3-check.flag .vf-b3-check-dot { background: var(--vf-amber); box-shadow: 0 0 6px var(--vf-amber); }
.vf-b3-check-name { font-size: 12.5px; color: var(--vf-text-1); flex: 1 1 auto; }
.vf-b3-check-state { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
.vf-b3-check.flag .vf-b3-check-state { color: var(--vf-amber); }
`);export{g as default};
