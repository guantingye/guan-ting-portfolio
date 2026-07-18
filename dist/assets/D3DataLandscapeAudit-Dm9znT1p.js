import{u as l,j as a,y as f,z as n,A as v,i as o}from"./index-BCTaCMZ4.js";const s=n.D3,d=v[s.phase].accent;function p(){const{lang:t}=l(),e=s[t]??s.en;return a.jsx(f,{id:"vf-d3",code:s.code,phase:s.phase,accent:d,title:e.title,lead:e.lead,roles:s.roles,tier:s.tier,footer:e.foot,children:a.jsxs("div",{className:"vf-d3",style:{"--vf-accent":d},children:[a.jsx("div",{className:"vf-d3-sources",children:s.sources.map(r=>{const i=e.rows[r.id];return a.jsxs("div",{className:`vf-d3-card ${r.tier}`,children:[a.jsxs("div",{className:"vf-d3-card-head",children:[a.jsx("span",{className:"vf-d3-src",children:e.sourceNames[r.id]}),a.jsx("span",{className:"vf-d3-type",children:r.tier==="gov"?e.typeGov:e.typeNiche})]}),a.jsx("p",{className:"vf-d3-fields",children:i.fields}),a.jsx("div",{className:"vf-d3-metaline",children:a.jsxs("span",{className:"vf-d3-freq",children:[e.freqLabel,": ",i.freq]})}),a.jsxs("div",{className:"vf-d3-defect",children:[a.jsx("span",{className:"vf-d3-defect-k",children:e.defectLabel}),a.jsx("span",{children:i.defect})]})]},r.id)})}),a.jsxs("div",{className:"vf-d3-problem",children:[a.jsxs("div",{className:"vf-d3-problem-body",children:[a.jsx("span",{className:"vf-eyebrow",style:{color:d},children:e.problemLabel}),a.jsx("h4",{className:"vf-d3-problem-title",children:e.problemTitle}),a.jsx("p",{children:e.problem})]}),a.jsxs("div",{className:"vf-d3-variants",children:[a.jsx("span",{className:"vf-caption",children:e.variantsCaption}),a.jsx("div",{className:"vf-d3-variant-chips",children:e.variants.map(r=>a.jsx("span",{className:"vf-d3-variant",children:r},r))})]})]}),a.jsxs("div",{className:"vf-d3-quality",children:[a.jsx("span",{className:"vf-eyebrow",style:{color:d},children:e.qualityLabel}),a.jsx("div",{className:"vf-d3-bars",role:"img","aria-label":e.qualityLabel,children:s.quality.map(r=>a.jsxs("div",{className:"vf-d3-bar-row",children:[a.jsx("span",{className:"vf-d3-bar-name",children:e.qNames[r.id]}),a.jsx("div",{className:"vf-d3-bar-track",children:a.jsx("div",{className:"vf-d3-bar-fill",style:{width:`${r.v}%`}})}),a.jsx("span",{className:"vf-d3-bar-val",children:r.v})]},r.id))}),a.jsx("p",{className:"vf-d3-qnote",children:e.qNote})]})]})})}o("vf-d3-style",`
.vf-d3 { display: flex; flex-direction: column; gap: 20px; }
.vf-d3-sources { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
.vf-d3-card { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); padding: 13px; }
.vf-d3-card.gov { border-left: 2px solid var(--vf-accent); }
.vf-d3-card.niche { border-left: 2px solid var(--vf-iris); }
.vf-d3-card-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
.vf-d3-src { font-size: 13px; font-weight: 600; color: var(--vf-text-1); }
.vf-d3-type { font-family: var(--vf-font-data); font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vf-text-3); white-space: nowrap; }
.vf-d3-fields { margin: 7px 0; font-size: 12px; color: var(--vf-text-2); }
.vf-d3-metaline { margin-bottom: 8px; }
.vf-d3-freq { font-family: var(--vf-font-data); font-size: 10.5px; color: var(--vf-text-3); }
.vf-d3-defect { display: flex; flex-direction: column; gap: 2px; padding-top: 8px; border-top: 1px solid var(--vf-line-1); }
.vf-d3-defect-k { font-family: var(--vf-font-data); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--vf-amber); }
.vf-d3-defect span:last-child { font-family: var(--vf-font-data); font-size: 11px; line-height: 1.45; color: var(--vf-text-2); }

.vf-d3-problem { display: grid; grid-template-columns: 1.3fr 1fr; gap: 18px; background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 18px; }
.vf-d3-problem-title { margin: 8px 0 8px; font-family: var(--vf-font-display); font-size: 22px; color: var(--vf-text-1); }
.vf-d3-problem-body p { margin: 0; font-size: 14px; line-height: 1.6; color: var(--vf-text-2); }
.vf-d3-variants { align-self: center; }
.vf-d3-variant-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.vf-d3-variant { font-family: var(--vf-font-data); font-size: 11.5px; color: var(--vf-text-1); background: var(--vf-bg-3); border: 1px dashed var(--vf-line-2); border-radius: 4px; padding: 4px 9px; }
.vf-d3-variant:first-child { border-style: solid; border-color: var(--vf-accent); color: var(--vf-accent); }

.vf-d3-quality { }
.vf-d3-bars { margin-top: 12px; display: flex; flex-direction: column; gap: 10px; }
.vf-d3-bar-row { display: grid; grid-template-columns: 96px 1fr 32px; align-items: center; gap: 12px; }
.vf-d3-bar-name { font-size: 12.5px; color: var(--vf-text-2); }
.vf-d3-bar-track { height: 8px; background: var(--vf-bg-3); border-radius: 999px; overflow: hidden; }
.vf-d3-bar-fill { height: 100%; background: linear-gradient(90deg, color-mix(in srgb, var(--vf-accent) 55%, transparent), var(--vf-accent)); border-radius: 999px; }
.vf-d3-bar-val { font-family: var(--vf-font-data); font-size: 12px; color: var(--vf-text-1); text-align: right; }
.vf-d3-qnote { margin: 12px 0 0; font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
@media (max-width: 720px) { .vf-d3-problem { grid-template-columns: 1fr; } }
`);export{p as default};
