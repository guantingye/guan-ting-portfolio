import{u as x,a as m,r as v,j as a,y as u,z as g,A as b,i as y}from"./index-BTnBFpGd.js";const i=g.H2,p=b[i.phase].accent;function j({target:t,dur:e,playKey:n,reduced:r}){const[l,d]=v.useState(r?t:0);return v.useEffect(()=>{if(r){d(t);return}let s,f;const o=c=>{f||(f=c);const h=Math.min(1,(c-f)/e);d(Math.round(t*(1-Math.pow(1-h,3)))),h<1&&(s=requestAnimationFrame(o))};return s=requestAnimationFrame(o),()=>cancelAnimationFrame(s)},[n,r]),a.jsx("span",{children:l})}function k({id:t,playKey:e,reduced:n}){const r=n?"":" play";return t==="badge"?a.jsxs("div",{className:`vf-h2-badge${r}`,children:[a.jsxs("span",{className:"vf-h2-badge-chip",children:["156 ",a.jsx("em",{children:"▾"})]}),a.jsx("div",{className:"vf-h2-badge-panel",children:["grants 42","market 51","collab 63"].map(l=>a.jsx("span",{children:l},l))})]},e):t==="skeleton"?a.jsxs("div",{className:`vf-h2-skel${r}`,children:[a.jsxs("div",{className:"vf-h2-skel-a",children:[a.jsx("span",{className:"vf-h2-skbox"}),a.jsx("span",{className:"vf-h2-skline"})]}),a.jsxs("div",{className:"vf-h2-skel-b",children:[a.jsx("span",{className:"vf-h2-avatar"}),a.jsxs("span",{className:"vf-h2-txt",children:[a.jsx("i",{}),a.jsx("i",{})]})]})]},e):t==="count"?a.jsxs("div",{className:"vf-h2-count",children:[a.jsx("span",{className:"vf-h2-count-num",children:a.jsx(j,{target:94,dur:i.samples.find(l=>l.id==="count").dur,playKey:e,reduced:n})}),a.jsx("span",{className:"vf-h2-count-label",children:"results"})]},e):a.jsxs("div",{className:`vf-h2-save${r}`,children:[a.jsx("span",{className:"vf-h2-save-btn",children:a.jsx("svg",{viewBox:"0 0 24 24",width:"18",height:"18","aria-hidden":"true",children:a.jsx("path",{className:"vf-h2-star",d:"M12 3l2.9 6 6.6.6-5 4.3 1.5 6.5L12 17l-6 3.4 1.5-6.5-5-4.3 6.6-.6z"})})}),a.jsx("span",{className:"vf-h2-toast",children:"saved"})]},e)}function w(){const{lang:t}=x(),e=i[t]??i.en,n=m(),[r,l]=v.useState({}),d=s=>l(f=>({...f,[s]:(f[s]||0)+1}));return a.jsx(u,{id:"vf-h2",code:i.code,phase:i.phase,accent:p,title:e.title,lead:e.lead,roles:i.roles,tier:i.tier,footer:e.foot,children:a.jsxs("div",{className:"vf-h2",style:{"--vf-accent":p},children:[n&&a.jsx("p",{className:"vf-h2-reduced",children:e.reducedNote}),a.jsx("div",{className:"vf-h2-grid",children:i.samples.map(s=>a.jsxs("div",{className:"vf-h2-cell",children:[a.jsxs("div",{className:"vf-h2-cell-head",children:[a.jsx("span",{className:"vf-h2-name",children:e.sampleNames[s.id]}),a.jsxs("button",{className:"vf-btn vf-h2-replay",onClick:()=>d(s.id),disabled:n,children:["↻ ",e.replay]})]}),a.jsx("div",{className:"vf-h2-stage",style:{"--dur":`${s.dur}ms`,"--ease":s.ease},children:a.jsx(k,{id:s.id,playKey:r[s.id]||0,reduced:n})}),a.jsx("p",{className:"vf-h2-desc",children:e.sampleDesc[s.id]}),a.jsx("table",{className:"vf-h2-spec",children:a.jsxs("tbody",{children:[a.jsxs("tr",{children:[a.jsx("th",{children:e.propLabel}),a.jsx("td",{children:e.specs[s.id].prop})]}),a.jsxs("tr",{children:[a.jsx("th",{children:e.durLabel}),a.jsxs("td",{children:[s.dur,"ms"]})]}),a.jsxs("tr",{children:[a.jsx("th",{children:e.easeLabel}),a.jsx("td",{className:"vf-h2-ease",children:s.ease})]}),a.jsxs("tr",{children:[a.jsx("th",{children:e.whyLabel}),a.jsx("td",{children:e.specs[s.id].why})]})]})})]},s.id))})]})})}y("vf-h2-style",`
.vf-h2-reduced { margin: 0 0 14px; font-family: var(--vf-font-data); font-size: 11.5px; color: var(--vf-amber); border: 1px solid var(--vf-amber); border-radius: var(--vf-r-sm); padding: 8px 12px; background: var(--vf-amber-dim); }
.vf-h2-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.vf-h2-cell { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); padding: 15px; }
.vf-h2-cell-head { display: flex; align-items: center; justify-content: space-between; }
.vf-h2-name { font-size: 13.5px; font-weight: 600; color: var(--vf-text-1); }
.vf-h2-replay { font-size: 11.5px; padding: 5px 10px; }
.vf-h2-stage { height: 86px; display: flex; align-items: center; justify-content: center; margin: 12px 0; background: var(--vf-bg-1); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-sm); overflow: hidden; }
.vf-h2-desc { margin: 0 0 10px; font-size: 12px; color: var(--vf-text-3); }
.vf-h2-spec { width: 100%; border-collapse: collapse; }
.vf-h2-spec th { text-align: left; width: 78px; font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vf-text-3); font-weight: 400; padding: 4px 0; vertical-align: top; }
.vf-h2-spec td { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-text-2); padding: 4px 0; line-height: 1.45; }
.vf-h2-ease { word-break: break-all; }

/* badge demo */
.vf-h2-badge-chip { display: inline-flex; align-items: center; gap: 5px; font-family: var(--vf-font-data); font-size: 15px; color: var(--vf-bg-0); background: var(--vf-accent); border-radius: 6px; padding: 5px 11px; }
.vf-h2-badge-panel { display: flex; gap: 6px; margin-top: 8px; max-height: 0; opacity: 0; overflow: hidden; }
.vf-h2-badge-panel span { font-family: var(--vf-font-data); font-size: 9.5px; color: var(--vf-text-2); background: var(--vf-bg-3); border-radius: 4px; padding: 3px 6px; white-space: nowrap; }
.vf-h2-badge { text-align: center; }
.vf-h2-badge.play .vf-h2-badge-panel { animation: vf-h2-expand var(--dur) var(--ease) forwards; }
@keyframes vf-h2-expand { to { max-height: 40px; opacity: 1; } }
.vf-h2-badge:not(.play) .vf-h2-badge-panel { max-height: 40px; opacity: 1; }

/* skeleton demo */
.vf-h2-skel { width: 82%; }
.vf-h2-skel-a, .vf-h2-skel-b { display: flex; align-items: center; gap: 8px; }
.vf-h2-skel-b { position: absolute; }
.vf-h2-skbox, .vf-h2-avatar { width: 26px; height: 26px; border-radius: 6px; background: var(--vf-line-2); flex: 0 0 auto; }
.vf-h2-avatar { background: var(--vf-accent); opacity: 0.6; }
.vf-h2-skline { height: 8px; flex: 1; border-radius: 4px; background: var(--vf-line-2); }
.vf-h2-txt { display: flex; flex-direction: column; gap: 5px; flex: 1; }
.vf-h2-txt i { height: 6px; border-radius: 3px; background: var(--vf-line-1); }
.vf-h2-txt i:first-child { width: 70%; } .vf-h2-txt i:last-child { width: 45%; }
.vf-h2-skel .vf-h2-skel-a { animation: vf-h2-shimmer 1.6s var(--ease) infinite; }
.vf-h2-skel .vf-h2-skel-b { opacity: 0; }
.vf-h2-skel.play .vf-h2-skel-a { animation: vf-h2-fadeout var(--dur) var(--ease) forwards; }
.vf-h2-skel.play .vf-h2-skel-b { animation: vf-h2-fadein var(--dur) var(--ease) forwards; }
.vf-h2-skel:not(.play) .vf-h2-skel-a { display: none; }
.vf-h2-skel:not(.play) .vf-h2-skel-b { position: static; opacity: 1; }
@keyframes vf-h2-shimmer { 0%,100% { opacity: 0.4; } 50% { opacity: 0.85; } }
@keyframes vf-h2-fadeout { to { opacity: 0; } }
@keyframes vf-h2-fadein { from { opacity: 0; } to { opacity: 1; } }

/* count demo */
.vf-h2-count { display: flex; align-items: baseline; gap: 8px; }
.vf-h2-count-num { font-family: var(--vf-font-data); font-size: 40px; font-weight: 500; color: var(--vf-accent); line-height: 1; }
.vf-h2-count-label { font-size: 13px; color: var(--vf-text-3); }

/* save demo */
.vf-h2-save { position: relative; display: flex; align-items: center; gap: 12px; }
.vf-h2-save-btn { display: inline-flex; padding: 8px; border-radius: 8px; background: var(--vf-bg-3); border: 1px solid var(--vf-line-2); }
.vf-h2-star { fill: none; stroke: var(--vf-text-3); stroke-width: 1.6; stroke-linejoin: round; }
.vf-h2-toast { font-family: var(--vf-font-data); font-size: 11px; color: var(--vf-bg-0); background: var(--vf-accent); border-radius: 5px; padding: 4px 9px; opacity: 0; }
.vf-h2-save.play .vf-h2-star { animation: vf-h2-fill var(--dur) var(--ease) forwards; }
.vf-h2-save.play .vf-h2-toast { animation: vf-h2-toast var(--dur) var(--ease) forwards; }
.vf-h2-save:not(.play) .vf-h2-star { fill: var(--vf-accent); stroke: var(--vf-accent); }
.vf-h2-save:not(.play) .vf-h2-toast { opacity: 1; }
@keyframes vf-h2-fill { 0% { fill: transparent; stroke: var(--vf-text-3); transform: scale(1); } 60% { transform: scale(1.25); } 100% { fill: var(--vf-accent); stroke: var(--vf-accent); transform: scale(1); } }
@keyframes vf-h2-toast { 0% { opacity: 0; transform: translateX(-6px); } 100% { opacity: 1; transform: none; } }

@media (max-width: 720px) { .vf-h2-grid { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) {
  .vf-h2-badge-panel, .vf-h2-skel-a, .vf-h2-skel-b, .vf-h2-star, .vf-h2-toast { animation: none !important; }
}
`);export{w as default};
