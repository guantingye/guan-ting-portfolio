import{u as l,j as e,v as i,C as p,T as d,w as c,i as m}from"./index-BloPbmfu.js";const s=c.find(o=>o.key==="M11"),h=`POST /recommend
{
  "topics": { "anxiety": 6, "sleep": 3, "work_stress": 4,
              "relationship": 5, "self_explore": 2,
              "emotion_reg": 4, "trauma": 1 },
  "approach": "CBT",
  "online": true,
  "budget": 2000
}
→ 200 { "ranked": [
    { "id": "t1", "score": 0.80, "criteria": ["online","budget","topic"] },
    { "id": "t3", "score": 0.50, "criteria": ["online","topic"] }, … ] }`,f=`@app.post("/recommend")
def recommend(q: Intake) -> list[Match]:
    highs = [k for k, v in q.topics.items() if v >= 4]
    out = []
    for t in THERAPISTS:
        s = 0.0
        if q.approach and q.approach in t.approaches: s += 0.30
        if q.online and t.online:                     s += 0.20
        if q.budget >= t.fee_min:                      s += 0.20
        if any(x in t.specialties for x in highs):     s += 0.30
        out.append(Match(id=t.id, score=s))
    return sorted(out, key=lambda m: m.score, reverse=True)[:5]`,r={en:{title:"API & data flow",lead:"The full request path, both sides of the wire.",soWhat:"I shipped the full request path and can show both sides of the wire.",steps:[{k:"01",t:"Intake steps 1–4",d:"React local state",tone:"sky"},{k:"02",t:"Assemble payload",d:"one intake object",tone:"sky"},{k:"03",t:"Score",d:"≥4 threshold → 4 criteria",tone:"teal"},{k:"04",t:"Ranked response",d:"top-5, descending",tone:"teal"},{k:"05",t:"Results render",d:"interpreted profile",tone:"amber"},{k:"06",t:"Selection logged",d:"future training signal",tone:"amber"}],payloadLabel:"Payload & response (real field names)",serverLabel:"Server contract",serverNote:"The shipped MVP scores in the browser; this FastAPI endpoint is the server contract the flow is built toward, mirroring the exact client logic.",caption:"Intake → assemble → score → rank → render → log, with the real payload shape."},zh:{title:"API 與資料流",lead:"完整的請求路徑，線的兩端都在。",soWhat:"我交付了完整的請求路徑，並能展示線的兩端。",steps:[{k:"01",t:"量表步驟 1–4",d:"React 本地狀態",tone:"sky"},{k:"02",t:"組裝 payload",d:"單一 intake 物件",tone:"sky"},{k:"03",t:"評分",d:"≥4 門檻 → 四準則",tone:"teal"},{k:"04",t:"排序回應",d:"前五名，遞減",tone:"teal"},{k:"05",t:"結果渲染",d:"詮釋後的輪廓",tone:"amber"},{k:"06",t:"記錄選擇",d:"未來訓練訊號",tone:"amber"}],payloadLabel:"Payload 與回應（真實欄位名）",serverLabel:"伺服器契約",serverNote:"已上線 MVP 在瀏覽器中評分；此 FastAPI 端點是流程所朝向的伺服器契約，鏡射與客戶端完全相同的邏輯。",caption:"量表 → 組裝 → 評分 → 排序 → 渲染 → 記錄，附真實 payload 結構。"}};function g(){const{lang:o}=l(),t=r[o]??r.en;return e.jsxs(i,{mod:s,sectionNo:s.no,title:t.title,lead:t.lead,soWhat:t.soWhat,children:[e.jsxs("figure",{style:{margin:0},children:[e.jsx("ol",{className:"pm-flow",children:t.steps.map((a,n)=>e.jsxs("li",{className:`pm-flow-step pm-flow-step--${a.tone}`,children:[e.jsx("span",{className:"pm-flow-k",children:a.k}),e.jsx("strong",{children:a.t}),e.jsx("span",{className:"pm-flow-d",children:a.d}),n<t.steps.length-1&&e.jsx("span",{className:"pm-flow-arrow","aria-hidden":"true",children:"→"})]},a.k))}),e.jsx(p,{kind:"Fig.",n:6,children:t.caption})]}),e.jsxs("div",{className:"pm-flow-code",children:[e.jsxs("div",{children:[e.jsx("span",{className:"pm-budget-head",children:t.payloadLabel}),e.jsx("pre",{className:"pm-code",tabIndex:0,children:e.jsx("code",{children:h})})]}),e.jsxs("div",{children:[e.jsxs("span",{className:"pm-budget-head",children:[t.serverLabel," ",e.jsx(d,{tone:"amber",children:"RECONSTRUCTED"})]}),e.jsx("pre",{className:"pm-code",tabIndex:0,children:e.jsx("code",{children:f})}),e.jsx("p",{className:"pm-flow-note",children:t.serverNote})]})]})]})}m("pm-m11",`
.pm-flow { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
.pm-flow-step { position: relative; padding: 13px 12px; border: 1px solid var(--pm-line-1); border-radius: var(--pm-r-sm); background: var(--pm-bg-2); }
.pm-flow-step--sky { border-top: 2px solid var(--pm-sky); }
.pm-flow-step--teal { border-top: 2px solid var(--pm-teal); }
.pm-flow-step--amber { border-top: 2px solid var(--pm-amber); }
.pm-flow-k { font-family: var(--pm-font-data); font-size: 10px; color: var(--pm-text-3); }
.pm-flow-step strong { display: block; color: var(--pm-text-1); font-size: 12.5px; margin: 4px 0 2px; }
.pm-flow-d { font-size: 11px; color: var(--pm-text-3); line-height: 1.4; }
.pm-flow-arrow { position: absolute; right: -8px; top: 50%; transform: translateY(-50%); color: var(--pm-line-2); z-index: 1; font-family: var(--pm-font-data); }
.pm-flow-code { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 22px; align-items: start; }
.pm-flow-note { margin: 10px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--pm-text-3); font-style: italic; }
@media (max-width: 900px) { .pm-flow { grid-template-columns: repeat(2, 1fr); } .pm-flow-arrow { display: none; } .pm-flow-code { grid-template-columns: 1fr; } }
`);export{g as default};
