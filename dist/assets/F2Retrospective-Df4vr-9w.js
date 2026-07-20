import{u as r,j as e,y as n,z as o,A as c,i as d}from"./index-DinO7kZj.js";const a=o.F2,f=c[a.phase].accent;function v(){const{lang:i}=r(),t=a[i]??a.en;return e.jsx(n,{id:"vf-f2",code:a.code,phase:a.phase,accent:f,title:t.title,lead:t.lead,roles:a.roles,tier:a.tier,children:e.jsxs("div",{className:"vf-f2",style:{"--vf-accent":f},children:[e.jsx("span",{className:"vf-eyebrow vf-f2-label",style:{color:f},children:t.tradeLabel}),e.jsx("div",{className:"vf-f2-trades",children:a.tradeoffs.map(l=>{const s=t.tradeoffs[l];return e.jsxs("div",{className:"vf-f2-trade",children:[e.jsx("p",{className:"vf-f2-choice",children:s.choice}),e.jsxs("p",{className:"vf-f2-line",children:[e.jsx("span",{className:"vf-f2-key",children:"↓"}),s.cost]}),e.jsxs("p",{className:"vf-f2-line",children:[e.jsx("span",{className:"vf-f2-key",children:"↻"}),s.today]})]},l)})}),e.jsxs("div",{className:"vf-f2-next",children:[e.jsx("span",{className:"vf-eyebrow vf-f2-label",style:{color:f},children:t.nextLabel}),e.jsx("ul",{children:t.next.map((l,s)=>e.jsx("li",{children:l},s))})]}),e.jsx("blockquote",{className:"vf-f2-quote",children:t.quote})]})})}d("vf-f2-style",`
.vf-f2-label { display: block; margin-bottom: 14px; }
.vf-f2-trades { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px; }
.vf-f2-trade { background: var(--vf-bg-2); border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); border-top: 2px solid var(--vf-accent); padding: 16px; }
.vf-f2-choice { margin: 0 0 12px; font-size: 14px; line-height: 1.55; color: var(--vf-text-1); font-weight: 500; }
.vf-f2-line { display: grid; grid-template-columns: 18px 1fr; gap: 6px; margin: 8px 0 0; font-size: 12.5px; line-height: 1.55; color: var(--vf-text-2); }
.vf-f2-key { font-family: var(--vf-font-data); color: var(--vf-accent); }
.vf-f2-next { margin-top: 26px; }
.vf-f2-next ul { margin: 0; padding: 0; list-style: none; }
.vf-f2-next li { position: relative; padding-left: 20px; margin-top: 10px; font-size: 14px; line-height: 1.6; color: var(--vf-text-2); }
.vf-f2-next li::before { content: ''; position: absolute; left: 2px; top: 9px; width: 6px; height: 6px; border-radius: 50%; background: var(--vf-accent); }
.vf-f2-quote { margin: 30px 0 4px; padding: 0 0 0 22px; border-left: 3px solid var(--vf-accent); font-family: var(--vf-font-display); font-size: clamp(19px, 2.4vw, 25px); font-weight: 500; font-style: italic; line-height: 1.4; color: var(--vf-text-1); }
`);export{v as default};
