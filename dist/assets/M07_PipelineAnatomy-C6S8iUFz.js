import{u as k,a as L,q as E,r,e as M,j as e,n as R,p as T,i as F}from"./index-5Szh5aR5.js";const O=T.find(n=>n.key==="M07"),s=[{id:"crawl",label:{en:"Crawl",zh:"爬取"},inCap:{en:"Entering — source URL",zh:"進入——來源 URL"},outCap:{en:"Leaving — raw HTML",zh:"離開——原始 HTML"},in:`GET tech&industry feed
→ item: "AI chip market 2024…"`,out:`<article><h1>AI 晶片市場…</h1>
<div class="ad">…</div><p>隨著生成式AI…</p>`},{id:"clean",label:{en:"Clean",zh:"清理"},inCap:{en:"Entering — raw HTML",zh:"進入——原始 HTML"},outCap:{en:"Leaving — plain text (Trafilatura)",zh:"離開——純文字（Trafilatura）"},in:`<article>…<div class="ad">…</div>
<nav>…</nav><p>隨著生成式AI…</p>`,out:`隨著生成式AI應用快速普及，AI晶片市場
呈現爆炸性成長。2024年全球AI晶片市場
規模達到530億美元…`},{id:"dedupe",label:{en:"Dedupe",zh:"去重"},inCap:{en:"Entering — cleaned text",zh:"進入——清理後文字"},outCap:{en:"Leaving — hash + verdict",zh:"離開——雜湊 + 判定"},in:'title="全球半導體產業AI晶片市場趨勢分析"',out:`sha1(title)=9f3c… · fuzzy=0.12
verdict: UNIQUE (keep)`},{id:"classify",label:{en:"Classify",zh:"分類"},inCap:{en:"Entering — text",zh:"進入——文字"},outCap:{en:"Leaving — taxonomy JSON",zh:"離開——分類 JSON"},in:"隨著生成式AI…台灣半導體供應鏈…",out:`{ "primary": "Semiconductor",
  "tags": ["AI","半導體","晶片設計","市場趨勢"],
  "confidence": "high" }`},{id:"summarize",label:{en:"Summarise",zh:"摘要"},inCap:{en:"Entering — text + tags",zh:"進入——文字 + 標籤"},outCap:{en:"Leaving — bilingual briefing",zh:"離開——雙語簡報"},in:"prompt v5 · quote numbers verbatim, null if absent",out:`{ "summary_zh": "2024年AI晶片市場達530億美元，
  2028年將突破1,200億美元，CAGR 23.6%…",
  "figures": ["US$53B","US$120B","23.6%","80%"] }`},{id:"publish",label:{en:"Publish",zh:"發布"},inCap:{en:"Entering — briefing JSON",zh:"進入——簡報 JSON"},outCap:{en:"Leaving — structured record",zh:"離開——結構化紀錄"},in:"{ summary_zh, figures, tags, source_span }",out:`DB row: { title, date:2025-01-15,
  category:"Semiconductor", body, tags } → /insights`},{id:"platform",label:{en:"Platform",zh:"平台"},inCap:{en:"Entering — published record",zh:"進入——已發布紀錄"},outCap:{en:"Leaving — live insight card (REAL)",zh:"離開——線上洞察卡（真實）"},in:"record #… on /insights",out:`「全球半導體產業AI晶片市場趨勢分析」
發布日期 2025-01-15 · Semiconductor
#AI #半導體 #晶片設計 #市場趨勢`}],w={en:{title:"Pipeline anatomy — live signal trace",lead:"Follow one real headline — the AI-chip market report — from the crawl all the way to its live card on /insights. Click any stage to freeze the trace and see exactly what went in and what came out.",run:"Run trace",running:"Tracing…",headlineLabel:"Signal in transit",headline:"「全球半導體產業AI晶片市場趨勢分析」",inspectLabel:"Stage inspector",soWhat:"Every transformation in the system is inspectable."},zh:{title:"管線解剖——即時訊號追蹤",lead:"跟著一則真實新聞——AI 晶片市場報告——從爬取一路走到它在 /insights 上的線上卡片。點任一階段就會凍結追蹤，看清楚那一步進去什麼、又出來什麼。",run:"執行追蹤",running:"追蹤中…",headlineLabel:"傳輸中的訊號",headline:"「全球半導體產業AI晶片市場趨勢分析」",inspectLabel:"階段檢視器",soWhat:"系統裡每一次轉換都可被檢視。"}},P=4400;function $(){const{lang:n}=k(),i=w[n]??w.en,p=L(),z=E(),l=p||z==="mobile",[o,d]=r.useState(0),[m,u]=r.useState(!1),[x,h]=r.useState(1),c=r.useRef(0),g=r.useRef(0),f=r.useRef(!1),[N,b]=M({rootMargin:"0px 0px -20% 0px"}),A=()=>{cancelAnimationFrame(c.current),u(!1)},v=()=>{const a=Math.min(1,(performance.now()-g.current)/P);h(a),d(Math.min(s.length-1,Math.floor(a*s.length))),a<1?c.current=requestAnimationFrame(v):u(!1)},y=()=>{if(l){d(0);return}cancelAnimationFrame(c.current),u(!0),h(0),d(0),g.current=performance.now(),c.current=requestAnimationFrame(v)},C=a=>{A(),d(a),h(a/(s.length-1))};r.useEffect(()=>{b&&!f.current&&!l&&(f.current=!0,y())},[b,l]),r.useEffect(()=>()=>cancelAnimationFrame(c.current),[]);const S=s[o];return e.jsx(R,{mod:O,title:i.title,lead:i.lead,soWhat:i.soWhat,children:e.jsxs("div",{className:"ni-m7",ref:N,children:[e.jsxs("div",{className:"ni-m7-top",children:[e.jsxs("div",{className:"ni-m7-headline",children:[e.jsx("span",{className:"ni-caption",children:i.headlineLabel}),e.jsx("span",{className:"ni-m7-headline-text",children:i.headline})]}),!l&&e.jsxs("button",{className:`ni-btn ni-m7-run${m?" is-on":""}`,onClick:y,disabled:m,children:[e.jsx("span",{className:"ni-m7-run-dot","aria-hidden":"true"}),m?i.running:i.run]})]}),l?e.jsx("ol",{className:"ni-m7-stepper",children:s.map((a,t)=>e.jsxs("li",{className:`ni-m7-step${t===o?" is-on":""}`,children:[e.jsxs("button",{className:"ni-m7-step-head","aria-expanded":t===o,onClick:()=>d(t),children:[e.jsx("span",{className:"ni-m7-step-num",children:String(t+1).padStart(2,"0")}),e.jsx("span",{className:"ni-m7-step-label",children:a.label[n]})]}),t===o&&e.jsx(j,{s:a,lang:n})]},a.id))}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"ni-m7-rail",role:"tablist","aria-label":i.title,children:[e.jsx("div",{className:"ni-m7-rail-line","aria-hidden":"true"}),e.jsx("div",{className:"ni-m7-pulse","aria-hidden":"true",style:{left:`${x*100}%`,opacity:m?1:.001}}),s.map((a,t)=>{const I=x>=t/(s.length-1)-.001;return e.jsxs("button",{role:"tab","aria-selected":t===o,className:`ni-m7-node${t===o?" is-on":""}${I?" is-passed":""}`,style:{left:`${t/(s.length-1)*100}%`},onClick:()=>C(t),children:[e.jsx("span",{className:"ni-m7-node-dot","aria-hidden":"true"}),e.jsx("span",{className:"ni-m7-node-label",children:a.label[n]}),e.jsx("span",{className:"ni-m7-node-idx",children:String(t+1).padStart(2,"0")})]},a.id)})]}),e.jsx(j,{s:S,lang:n,label:i.inspectLabel})]})]})})}function j({s:n,lang:i,label:p}){return e.jsxs("div",{className:"ni-m7-inspect","aria-live":"polite",children:[p&&e.jsxs("span",{className:"ni-caption ni-m7-inspect-label",children:[p," · ",n.label[i]]}),e.jsxs("div",{className:"ni-m7-io",children:[e.jsxs("div",{className:"ni-m7-io-col",children:[e.jsx("span",{className:"ni-m7-io-cap ni-m7-io-cap--in",children:n.inCap[i]}),e.jsx("pre",{className:"ni-m7-io-code ni-m7-io-code--in",children:n.in})]}),e.jsx("span",{className:"ni-m7-io-arrow","aria-hidden":"true",children:"→"}),e.jsxs("div",{className:"ni-m7-io-col",children:[e.jsx("span",{className:"ni-m7-io-cap ni-m7-io-cap--out",children:n.outCap[i]}),e.jsx("pre",{className:"ni-m7-io-code ni-m7-io-code--out",children:n.out})]})]})]})}F("ni-m7",`
.ni-m7-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 30px; }
.ni-m7-headline { display: flex; flex-direction: column; gap: 6px; }
.ni-m7-headline-text { font-family: var(--ni-font-display); font-size: 18px; color: var(--ni-text-1); }
.ni-m7-run-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ni-teal); box-shadow: 0 0 8px var(--ni-teal); }
.ni-m7-run.is-on { border-color: var(--ni-teal); }

.ni-m7-rail { position: relative; height: 92px; margin: 8px 12px 26px; }
.ni-m7-rail-line { position: absolute; top: 16px; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--ni-line-2), var(--ni-line-1)); }
.ni-m7-pulse { position: absolute; top: 17px; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: var(--ni-teal); box-shadow: 0 0 0 4px rgba(53,194,176,0.25), 0 0 18px 4px var(--ni-teal); transition: opacity 200ms linear; }
.ni-m7-node { position: absolute; top: 0; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 7px; width: 92px; }
.ni-m7-node-dot { width: 13px; height: 13px; border-radius: 50%; background: var(--ni-bg-2); border: 2px solid var(--ni-line-2); margin-top: 10px; transition: background 200ms var(--ni-ease), border-color 200ms var(--ni-ease), box-shadow 200ms var(--ni-ease); }
.ni-m7-node.is-passed .ni-m7-node-dot { border-color: var(--ni-teal); background: var(--ni-teal-dim); }
.ni-m7-node.is-on .ni-m7-node-dot { background: var(--ni-teal); box-shadow: 0 0 10px var(--ni-teal); }
.ni-m7-node-label { font-size: 12px; color: var(--ni-text-3); text-align: center; transition: color 200ms var(--ni-ease); }
.ni-m7-node.is-on .ni-m7-node-label, .ni-m7-node.is-passed .ni-m7-node-label { color: var(--ni-text-1); }
.ni-m7-node-idx { font-family: var(--ni-font-data); font-size: 9px; letter-spacing: 0.1em; color: var(--ni-text-3); }

.ni-m7-inspect { border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); background: var(--ni-bg-2); padding: 16px; }
.ni-m7-inspect-label { display: block; margin-bottom: 12px; }
.ni-m7-io { display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: stretch; }
.ni-m7-io-col { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.ni-m7-io-cap { font-family: var(--ni-font-data); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; }
.ni-m7-io-cap--in { color: var(--ni-text-3); }
.ni-m7-io-cap--out { color: var(--ni-teal); }
.ni-m7-io-code { margin: 0; flex: 1; font-family: var(--ni-font-data); font-size: 11.5px; line-height: 1.65; color: var(--ni-text-2); background: var(--ni-bg-0); border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-sm); padding: 12px; overflow-x: auto; white-space: pre; }
.ni-m7-io-code--out { color: var(--ni-text-1); border-color: var(--ni-line-2); }
.ni-m7-io-arrow { align-self: center; color: var(--ni-teal); font-size: 18px; }

.ni-m7-stepper { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.ni-m7-step { border: 1px solid var(--ni-line-1); border-radius: var(--ni-r-md); overflow: hidden; background: var(--ni-bg-1); }
.ni-m7-step.is-on { border-color: var(--ni-line-2); }
.ni-m7-step-head { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 14px; background: var(--ni-bg-2); }
.ni-m7-step-num { font-family: var(--ni-font-data); font-size: 12px; color: var(--ni-teal); }
.ni-m7-step-label { font-size: 14px; color: var(--ni-text-1); }
.ni-m7-step .ni-m7-inspect { border: none; border-top: 1px solid var(--ni-line-1); border-radius: 0; }
.ni-m7-step .ni-m7-io { grid-template-columns: 1fr; }
.ni-m7-step .ni-m7-io-arrow { display: none; }

@media (max-width: 900px) { .ni-m7-io { grid-template-columns: 1fr; } .ni-m7-io-arrow { transform: rotate(90deg); } }
`);export{$ as default};
