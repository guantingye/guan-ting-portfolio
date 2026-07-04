import React, { useRef, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion } from './shared/labKit.jsx';

const STRINGS = {
    en: {
        eyebrow: 'DESIGN PROCESS',
        title: 'Fidelity Ladder',
        intent: 'The same pump-station screen at three fidelities — with the reasoning that moved it forward.',
        stops: ['Sketch', 'Wireframe', 'Hi-fi'],
        stageLabel: 'Pump-station overview', of: 'Fidelity',
        compare: 'Compare with previous', comparing: 'Comparing', sliderLabel: 'Reveal slider — previous vs current',
        prev: 'previous', curr: 'current',
        annTitle: 'What changed & why', change: 'Change', reason: 'Reason',
        paperNote: 'Paper artifact — the one light surface on this page, on purpose.',
        notes: [
            { tag: 'Decision / 決策', text: 'The ladder is rendered in code, not exported images. The portfolio medium is itself the frontend evidence.' },
            { tag: 'Trade-off / 取捨', text: 'Drawing sketches in SVG costs time; screenshots would be faster and prove less.' },
        ],
        ann: [
            [
                { title: 'One column first', change: 'Stacked every readout in a single column.', reason: 'Take content inventory before committing to a grid.' },
                { title: 'Alarm rail on the right', change: 'Parked alarms on the right edge.', reason: 'First instinct — later tested against reading gravity.' },
                { title: 'One hero number', change: 'Chose pressure as the primary value.', reason: 'The scenario is a pressure incident; the rest supports it.' },
            ],
            [
                { title: 'Alarm rail moved left', change: 'Relocated the alarm column to the left.', reason: 'Reading gravity: an LTR scan hits the left column first at glance distance.' },
                { title: 'Explicit layout grid', change: 'Locked a 12-unit grid with fixed gutters.', reason: 'Makes density decisions reviewable instead of eyeballed.' },
                { title: 'Icon slot per status', change: 'Reserved a shape slot beside each status row.', reason: 'So color is never the only channel once it goes hi-fi.' },
            ],
            [
                { title: 'Live status color', change: 'Bound tokens to real state colors.', reason: 'Critical stays the only red; amber and teal carry the rest.' },
                { title: 'Value enlarged for glance', change: 'Scaled the hero value ~2.4×.', reason: 'Readable at 3 m without enlarging the whole screen.' },
                { title: 'Motion budget attached', change: 'Set 240 ms state changes, 160 ms alert-enter.', reason: 'Fast enough to feel responsive, calm enough to trust.' },
            ],
        ],
    },
    zh: {
        eyebrow: '設計流程',
        title: '精細度階梯',
        intent: '同一個泵站畫面的三種精細度——連同推動它前進的理由。',
        stops: ['草圖', '線框', '高精度'],
        stageLabel: '泵站總覽', of: '精細度',
        compare: '與上一版比較', comparing: '比較中', sliderLabel: '揭示滑桿——上一版 vs 目前版',
        prev: '上一版', curr: '目前版',
        annTitle: '改了什麼，為什麼', change: '變更', reason: '理由',
        paperNote: '紙本產物——整頁刻意保留的唯一淺色表面。',
        notes: [
            { tag: 'Decision / 決策', text: '這座階梯以程式碼繪製，而非輸出圖片。作品集的媒介本身就是前端證據。' },
            { tag: 'Trade-off / 取捨', text: '用 SVG 畫草圖很花時間；截圖會更快，但證明的東西更少。' },
        ],
        ann: [
            [
                { title: '先單欄排列', change: '把所有讀值堆在單一欄位。', reason: '在決定格線前先盤點內容。' },
                { title: '警示列放右側', change: '把警示停在右邊緣。', reason: '最初直覺——之後再用閱讀重心檢驗。' },
                { title: '單一主數值', change: '選定壓力為主要數值。', reason: '情境是壓力事故；其餘皆為輔助。' },
            ],
            [
                { title: '警示列移到左側', change: '把警示欄搬到左邊。', reason: '閱讀重心：一瞥距離下 LTR 掃視先落在左欄。' },
                { title: '明確的版面格線', change: '鎖定 12 單位格線與固定間距。', reason: '讓密度決策可被審視，而非憑感覺。' },
                { title: '每列狀態留圖示位', change: '在每個狀態列旁保留形狀欄位。', reason: '進到高精度時，顏色才不會是唯一通道。' },
            ],
            [
                { title: '套用即時狀態色', change: '將代幣綁定真實狀態色。', reason: '危急仍是唯一紅色；其餘由琥珀與青綠承載。' },
                { title: '主數值為一瞥放大', change: '主數值放大約 2.4×。', reason: '在 3 m 可讀，又不必放大整個畫面。' },
                { title: '掛上動態預算', change: '狀態變化 240 ms、警示進場 160 ms。', reason: '快到有反應感，慢到讓人信任。' },
            ],
        ],
    },
};

// Shared pump-station layout, drawn at three fidelities. viewBox 0 0 400 250.
function SketchScreen({ rough }) {
    const filter = rough ? 'url(#gx-rough)' : undefined;
    return (
        <svg viewBox="0 0 400 250" className="gx-fid-svg gx-fid-sketch" preserveAspectRatio="xMidYMid meet">
            <defs>
                <filter id="gx-rough"><feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" seed="7" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" /></filter>
            </defs>
            <rect x="0" y="0" width="400" height="250" fill="#F4F1E8" />
            <g filter={filter} fill="none" stroke="#5A554C" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 3">
                <rect x="16" y="14" width="368" height="30" rx="3" />
                <path d="M28 30 h70" strokeDasharray="none" strokeWidth="2.4" />
                <rect x="300" y="20" width="70" height="18" rx="9" />
                <rect x="150" y="60" width="234" height="120" rx="4" />
                <text x="168" y="120" fontFamily="'Newsreader',serif" fontSize="42" fill="#5A554C" stroke="none">4.2</text>
                <path d="M168 140 h120" strokeWidth="2" />
                <g strokeDasharray="none">
                    <rect x="16" y="60" width="120" height="35" rx="3" /><rect x="16" y="102" width="120" height="35" rx="3" /><rect x="16" y="144" width="120" height="35" rx="3" />
                </g>
                <rect x="16" y="196" width="368" height="40" rx="4" />
                <circle cx="44" cy="216" r="10" /><rect x="70" y="208" width="80" height="16" rx="8" />
            </g>
        </svg>
    );
}
function WireframeScreen() {
    return (
        <svg viewBox="0 0 400 250" className="gx-fid-svg" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="0" width="400" height="250" fill="#0F1218" />
            <g stroke="#232A36" strokeWidth="1">
                {[50, 100, 150, 200, 250, 300, 350].map(x => <line key={x} x1={x} y1="0" x2={x} y2="250" />)}
                {[42, 84, 126, 168, 210].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} />)}
            </g>
            <g fill="#1B222D" stroke="#3A4454" strokeWidth="1.4">
                <rect x="16" y="14" width="368" height="30" rx="3" />
                <rect x="16" y="60" width="120" height="120" rx="3" />
                <rect x="150" y="60" width="234" height="80" rx="3" />
                <rect x="150" y="150" width="234" height="30" rx="3" />
                <rect x="16" y="196" width="368" height="40" rx="3" />
            </g>
            <g fill="#4A5568">
                <rect x="28" y="24" width="90" height="10" rx="2" />
                <rect x="168" y="80" width="90" height="34" rx="2" />
                {[74, 108, 142].map(y => <rect key={y} x="30" y={y} width="60" height="8" rx="2" />)}
                {[74, 108, 142].map(y => <circle key={y} cx="120" cy={y + 4} r="5" />)}
            </g>
            <g fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="#5D8BC4">
                <rect x="20" y="64" width="14" height="12" rx="2" fill="#12202E" stroke="#2C5C86" /><text x="23" y="73">1</text>
                <rect x="154" y="64" width="14" height="12" rx="2" fill="#12202E" stroke="#2C5C86" /><text x="157" y="73">2</text>
                <rect x="20" y="200" width="14" height="12" rx="2" fill="#12202E" stroke="#2C5C86" /><text x="23" y="209">3</text>
            </g>
        </svg>
    );
}
function HifiScreen() {
    const rows = [{ y: 66, c: '#35C2B0', label: 'FLOW', v: '62%' }, { y: 108, c: '#57A6E8', label: 'TEMP', v: '48°' }, { y: 150, c: '#E8A33D', label: 'VALVE', v: 'V-2' }];
    return (
        <svg viewBox="0 0 400 250" className="gx-fid-svg" preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="0" width="400" height="250" fill="#0C0E12" />
            <rect x="16" y="14" width="368" height="32" rx="6" fill="#14171D" stroke="#262B35" />
            <text x="30" y="34" fontFamily="'Inter',sans-serif" fontSize="13" fill="#F2F0EB" fontWeight="600">Pump Station A</text>
            <rect x="300" y="21" width="70" height="18" rx="9" fill="rgba(53,194,176,0.14)" stroke="#35C2B0" />
            <text x="316" y="34" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill="#35C2B0">NORMAL</text>
            <rect x="150" y="60" width="234" height="90" rx="8" fill="#14171D" stroke="#262B35" />
            <text x="168" y="120" fontFamily="'JetBrains Mono',monospace" fontSize="52" fill="#35C2B0" fontWeight="500">4.2</text>
            <text x="300" y="120" fontFamily="'JetBrains Mono',monospace" fontSize="14" fill="#6B7280">bar</text>
            <text x="168" y="140" fontFamily="'Inter',sans-serif" fontSize="11" fill="#A8ADB8">loop A nominal</text>
            {rows.map(r => (
                <g key={r.label}>
                    <rect x="16" y={r.y} width="120" height="34" rx="6" fill="#14171D" stroke="#262B35" />
                    <rect x="16" y={r.y} width="3" height="34" rx="1.5" fill={r.c} />
                    <circle cx="34" cy={r.y + 17} r="4" fill={r.c} />
                    <text x="46" y={r.y + 15} fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="#6B7280">{r.label}</text>
                    <text x="46" y={r.y + 28} fontFamily="'JetBrains Mono',monospace" fontSize="12" fill="#F2F0EB">{r.v}</text>
                </g>
            ))}
            <rect x="16" y="196" width="368" height="40" rx="8" fill="#14171D" stroke="#262B35" />
            <rect x="28" y="206" width="96" height="20" rx="6" fill="#35C2B0" />
            <text x="46" y="220" fontFamily="'Inter',sans-serif" fontSize="11" fill="#060709" fontWeight="600">Acknowledge</text>
            <rect x="136" y="206" width="80" height="20" rx="6" fill="none" stroke="#333A47" />
        </svg>
    );
}
const SCREENS = [rough => <SketchScreen rough={rough} />, () => <WireframeScreen />, () => <HifiScreen />];

function CompareSlider({ stage, rough, t }) {
    const [pct, setPct] = useState(50);
    const trackRef = useRef(null);
    const setFromClientX = clientX => {
        const r = trackRef.current.getBoundingClientRect();
        setPct(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
    };
    const onKey = e => {
        const step = e.shiftKey ? 10 : 5;
        if (e.key === 'ArrowLeft') { e.preventDefault(); setPct(p => Math.max(0, p - step)); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); setPct(p => Math.min(100, p + step)); }
        else if (e.key === 'Home') { e.preventDefault(); setPct(0); }
        else if (e.key === 'End') { e.preventDefault(); setPct(100); }
    };
    return (
        <div className="gx-fid-compare" ref={trackRef}
            onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); setFromClientX(e.clientX); }}
            onPointerMove={e => { if (e.buttons) setFromClientX(e.clientX); }}>
            <div className="gx-fid-layer">{SCREENS[stage - 1]()}</div>
            <div className="gx-fid-layer gx-fid-layer-top" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>{SCREENS[stage](rough)}</div>
            <div className="gx-fid-divider" style={{ left: `${pct}%` }} aria-hidden="true">
                <span className="gx-fid-tag gx-fid-tag-l">{t.stops[stage]} · {t.curr}</span>
                <span className="gx-fid-tag gx-fid-tag-r">{t.stops[stage - 1]} · {t.prev}</span>
            </div>
            <button className="gx-fid-handle" style={{ left: `${pct}%` }} role="slider"
                aria-label={t.sliderLabel} aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}
                aria-valuetext={`${Math.round(pct)}%`} onKeyDown={onKey}
                onPointerDown={e => e.stopPropagation()}>‹ ›</button>
        </div>
    );
}

export default function M04FidelityLadder() {
    const { lang } = useI18n();
    const t = STRINGS[lang] ?? STRINGS.en;
    const reduced = usePrefersReducedMotion();
    const [stage, setStage] = useState(0);
    const [compare, setCompare] = useState(false);
    const rough = !reduced;

    const selectStage = i => { setStage(i); if (i === 0) setCompare(false); };
    const onRadioKey = e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); selectStage(Math.min(2, stage + 1)); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); selectStage(Math.max(0, stage - 1)); }
    };

    return (
        <ModuleFrame id="gx-m04" num="04" tone="var(--gx-iris)" eyebrow={t.eyebrow} title={t.title} intent={t.intent} notes={t.notes}>
            <div className="gx-m04">
                <div className="gx-m04-bar">
                    <div className="gx-seg" role="radiogroup" aria-label={t.of} onKeyDown={onRadioKey}>
                        {t.stops.map((s, i) => (
                            <button key={s} role="radio" aria-checked={stage === i} tabIndex={stage === i ? 0 : -1}
                                className={`gx-seg-btn${stage === i ? ' active' : ''}`} onClick={() => selectStage(i)}>
                                <span className="gx-seg-num">0{i + 1}</span> {s}
                            </button>
                        ))}
                    </div>
                    <label className={`gx-m04-toggle${stage === 0 ? ' disabled' : ''}`}>
                        <input type="checkbox" checked={compare} disabled={stage === 0} onChange={e => setCompare(e.target.checked)} />
                        <span>{compare ? t.comparing : t.compare}</span>
                    </label>
                </div>

                <div className={`gx-m04-stage${stage === 0 ? ' paper' : ''}`}>
                    {stage === 0 && !compare && <><span className="gx-fid-tape gx-fid-tape-l" aria-hidden="true" /><span className="gx-fid-tape gx-fid-tape-r" aria-hidden="true" /></>}
                    <div className="gx-m04-stagecap"><span className="gx-caption">{t.stageLabel} · {t.of} 0{stage + 1}</span></div>
                    {compare && stage > 0 ? <CompareSlider stage={stage} rough={rough} t={t} /> : <div className="gx-fid-layer gx-fid-single">{SCREENS[stage](rough)}</div>}
                    {stage === 0 && !compare && <p className="gx-m04-papernote">{t.paperNote}</p>}
                </div>

                <div className="gx-m04-ann">
                    <div className="gx-eyebrow gx-m04-ann-title">{t.annTitle}</div>
                    <div className="gx-m04-ann-grid">
                        {t.ann[stage].map((a, i) => (
                            <article className="gx-m04-card" key={i}>
                                <span className="gx-m04-card-flag">{i + 1}</span>
                                <h5>{a.title}</h5>
                                <p><span className="gx-m04-k">{t.change}</span> {a.change}</p>
                                <p><span className="gx-m04-k">{t.reason}</span> {a.reason}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('gx-m04-styles', `
.gx-m04-bar { display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 16px; }
.gx-seg { display: inline-flex; background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-sm); padding: 3px; }
.gx-seg-btn { font-size: 13px; font-weight: 600; color: var(--gx-text-3); padding: 7px 14px; border-radius: 5px; transition: color 160ms var(--gx-ease), background 160ms var(--gx-ease); }
.gx-seg-btn.active { color: var(--gx-text-1); background: var(--gx-bg-3); }
.gx-seg-num { font-family: var(--gx-font-data); font-size: 10px; color: var(--gx-iris); margin-right: 2px; }
.gx-m04-toggle { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-family: var(--gx-font-data); letter-spacing: 0.04em; color: var(--gx-text-2); cursor: pointer; }
.gx-m04-toggle.disabled { opacity: 0.4; cursor: not-allowed; }
.gx-m04-toggle input { width: 15px; height: 15px; accent-color: var(--gx-iris); }

.gx-m04-stage { position: relative; padding: 18px; background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); }
.gx-m04-stage.paper { background: #E9E4D6; border-color: #CFC7B4; }
.gx-m04-stagecap { margin-bottom: 12px; }
.gx-m04-stage.paper .gx-caption { color: #7A7360; }
.gx-m04-stage.paper .gx-caption::before { background: #7A7360; box-shadow: none; }
.gx-fid-svg { width: 100%; height: auto; display: block; border-radius: var(--gx-r-sm); }
.gx-fid-single { border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-sm); overflow: hidden; }
.gx-m04-stage.paper .gx-fid-single { border-color: #CFC7B4; }
.gx-fid-tape { position: absolute; top: 6px; width: 58px; height: 20px; background: rgba(210,196,120,0.5); border: 1px solid rgba(160,146,80,0.4); }
.gx-fid-tape-l { left: 24px; transform: rotate(-4deg); }
.gx-fid-tape-r { right: 24px; transform: rotate(3deg); }
.gx-m04-papernote { font-family: var(--gx-font-data); font-size: 11px; color: #7A7360; margin: 12px 0 0; }

.gx-fid-compare { position: relative; overflow: hidden; border-radius: var(--gx-r-sm); touch-action: none; cursor: ew-resize; user-select: none; }
.gx-fid-layer { position: relative; inset: 0; }
.gx-fid-layer-top { position: absolute; top: 0; left: 0; right: 0; }
.gx-fid-divider { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--gx-iris); pointer-events: none; }
.gx-fid-tag { position: absolute; top: 8px; font-family: var(--gx-font-data); font-size: 9px; letter-spacing: 0.06em; padding: 2px 6px; border-radius: 3px; background: rgba(6,7,9,0.8); color: var(--gx-text-1); white-space: nowrap; }
.gx-fid-tag-l { right: 6px; }
.gx-fid-tag-r { left: 6px; }
.gx-fid-handle { position: absolute; top: 50%; transform: translate(-50%, -50%); width: 32px; height: 32px; border-radius: 50%; background: var(--gx-iris); color: #060709; font-size: 13px; font-weight: 700; letter-spacing: -1px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.4); cursor: ew-resize; }

.gx-m04-ann { margin-top: 20px; }
.gx-m04-ann-title { color: var(--gx-text-3); margin-bottom: 12px; }
.gx-m04-ann-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
.gx-m04-card { position: relative; padding: 16px; background: var(--gx-bg-2); border: 1px solid var(--gx-line-1); border-radius: var(--gx-r-md); }
.gx-m04-card-flag { position: absolute; top: 12px; right: 12px; font-family: var(--gx-font-data); font-size: 11px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--gx-iris); border-radius: 50%; color: var(--gx-iris); }
.gx-m04-card h5 { margin: 0 26px 8px 0; font-size: 14px; color: var(--gx-text-1); }
.gx-m04-card p { margin: 6px 0 0; font-size: 12.5px; line-height: 1.55; color: var(--gx-text-2); }
.gx-m04-k { font-family: var(--gx-font-data); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gx-text-3); margin-right: 4px; }
`);
