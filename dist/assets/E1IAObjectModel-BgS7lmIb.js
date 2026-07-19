import{u as x,r as m,j as e,y as b,z as g,A as h,i as u}from"./index-C8jkLbP4.js";const s=g.E1,o=h[s.phase].accent,d=Object.fromEntries(s.entities.map(v=>[v.id,v]));function j(){const{lang:v}=x(),i=s[v]??s.en,[l,f]=m.useState("opportunity"),c=(a,r)=>s.links.some(([t,n])=>t===a&&n===r||t===r&&n===a),p=d[l];return e.jsx(b,{id:"vf-e1",code:s.code,phase:s.phase,accent:o,title:i.title,lead:i.lead,roles:s.roles,tier:s.tier,footer:i.foot,children:e.jsxs("div",{className:"vf-e1",style:{"--vf-accent":o},children:[e.jsxs("div",{className:"vf-e1-diagram",children:[e.jsx("span",{className:"vf-eyebrow vf-e1-caption",children:i.objectLabel}),e.jsxs("svg",{viewBox:"0 0 100 100",className:"vf-e1-svg",role:"img","aria-label":i.objectLabel,children:[s.links.map(([a,r],t)=>{const n=a===l||r===l;return e.jsx("line",{x1:d[a].x,y1:d[a].y,x2:d[r].x,y2:d[r].y,stroke:n?o:"var(--vf-line-2)",strokeWidth:n?.7:.4,opacity:n?.9:.4},t)}),s.entities.map(a=>{const r=a.id===l,t=c(a.id,l);return e.jsxs("g",{className:"vf-e1-node",tabIndex:0,role:"button","aria-label":i.entityNames[a.id],"aria-pressed":r,onMouseEnter:()=>f(a.id),onFocus:()=>f(a.id),transform:`translate(${a.x} ${a.y})`,children:[e.jsx("circle",{r:r?4.6:3.6,fill:r||t?o:"var(--vf-bg-3)",stroke:o,strokeWidth:r?.9:.5,opacity:r?1:t?.85:.55}),e.jsx("text",{y:"-6",textAnchor:"middle",className:`vf-e1-nodelabel${r?" on":""}`,children:i.entityNames[a.id]})]},a.id)})]}),e.jsx("p",{className:"vf-e1-hint",children:i.hoverHint})]}),e.jsxs("div",{className:"vf-e1-detail","aria-live":"polite",children:[e.jsx("h4",{className:"vf-e1-detail-name",children:i.entityNames[l]}),e.jsx("span",{className:"vf-e1-detail-sub",children:i.attrsLabel}),e.jsx("ul",{className:"vf-e1-attrs",children:p.attrs.map(a=>e.jsx("li",{children:a},a))}),e.jsx("div",{className:"vf-e1-rels",children:s.links.filter(([a,r])=>a===l||r===l).map(([a,r,t],n)=>e.jsxs("div",{className:"vf-e1-rel",children:[e.jsx("span",{children:i.entityNames[a]}),e.jsx("span",{className:"vf-e1-rel-verb",children:i.linkLabels[t]}),e.jsx("span",{children:i.entityNames[r]})]},n))})]}),e.jsxs("div",{className:"vf-e1-sitemap",children:[e.jsx("span",{className:"vf-eyebrow vf-e1-caption",children:i.sitemapLabel}),e.jsx("div",{className:"vf-e1-tree",children:s.sitemap.map(a=>e.jsxs("div",{className:"vf-e1-branch",children:[e.jsx("span",{className:"vf-e1-l1",children:i.sitemapNames[a.id]}),e.jsx("div",{className:"vf-e1-children",children:a.children.map(r=>e.jsx("span",{className:"vf-e1-l2",children:i.sitemapNames[r]},r))})]},a.id))})]}),e.jsxs("div",{className:"vf-e1-principle",children:[e.jsx("span",{className:"vf-eyebrow",style:{color:o},children:i.principleLabel}),e.jsx("p",{children:i.principle})]})]})})}u("vf-e1-style",`
.vf-e1 { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 18px; }
.vf-e1-caption { display: block; color: var(--vf-text-3); margin-bottom: 8px; }
.vf-e1-diagram { min-width: 0; }
.vf-e1-svg { width: 100%; aspect-ratio: 1 / 0.82; background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); overflow: visible; }
.vf-e1-node { cursor: pointer; }
.vf-e1-node:focus { outline: none; }
.vf-e1-node:focus-visible circle { stroke-width: 1.2; }
.vf-e1-nodelabel { font-family: var(--vf-font-data); font-size: 3.4px; fill: var(--vf-text-3); letter-spacing: 0.02em; }
.vf-e1-nodelabel.on { fill: var(--vf-text-1); }
.vf-e1-hint { margin: 10px 0 0; font-size: 12px; color: var(--vf-text-3); }
.vf-e1-detail { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 16px; align-self: start; }
.vf-e1-detail-name { margin: 0; font-family: var(--vf-font-display); font-size: 20px; color: var(--vf-text-1); }
.vf-e1-detail-sub { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--vf-text-3); }
.vf-e1-attrs { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.vf-e1-attrs li { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-accent); background: color-mix(in srgb, var(--vf-accent) 12%, transparent); border-radius: 4px; padding: 3px 7px; }
.vf-e1-rels { margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--vf-line-1); display: flex; flex-direction: column; gap: 7px; }
.vf-e1-rel { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--vf-text-2); flex-wrap: wrap; }
.vf-e1-rel-verb { font-family: var(--vf-font-data); font-size: 10px; color: var(--vf-text-3); border: 1px solid var(--vf-line-2); border-radius: 4px; padding: 1px 6px; }
.vf-e1-sitemap { grid-column: 1 / -1; margin-top: 6px; }
.vf-e1-tree { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
.vf-e1-branch { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); padding: 12px; }
.vf-e1-l1 { display: block; font-size: 13px; font-weight: 600; color: var(--vf-text-1); margin-bottom: 8px; }
.vf-e1-children { display: flex; flex-direction: column; gap: 5px; padding-left: 12px; border-left: 1px solid var(--vf-line-2); }
.vf-e1-l2 { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-3); }
.vf-e1-principle { grid-column: 1 / -1; margin-top: 8px; padding: 16px 18px; background: var(--vf-bg-2); border-left: 2px solid var(--vf-accent); border-radius: 0 var(--vf-r-md) var(--vf-r-md) 0; }
.vf-e1-principle p { margin: 8px 0 0; font-size: 15px; line-height: 1.6; color: var(--vf-text-1); }
@media (max-width: 720px) { .vf-e1 { grid-template-columns: 1fr; } }
`);export{j as default};
