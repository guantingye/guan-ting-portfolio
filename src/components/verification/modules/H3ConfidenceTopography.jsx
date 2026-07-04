import React, { useMemo, useState } from 'react';
import ModuleFrame, { injectStyles, useI18n, usePrefersReducedMotion, mulberry32 } from '../shared/vfKit.jsx';
import { MODULES, PHASE_MAP } from '../data/verificationContent.js';

const M = MODULES.H3;
const ACCENT = PHASE_MAP[M.phase].accent;

const COLS = 46, ROWS = 30, CELL = 10;         // grid → viewBox 460 × 300
const W = (COLS - 1) * CELL, H = (ROWS - 1) * CELL;
const LEVELS = [0.22, 0.38, 0.54, 0.7, 0.85];
const LEVEL_COLOR = ['var(--vf-amber)', 'var(--vf-gold)', 'var(--vf-slate)', 'var(--vf-sky)', 'var(--vf-teal)'];

// Seeded data points once — stable across renders and screenshots.
const POINTS = (() => {
    const rnd = mulberry32(97);
    return Array.from({ length: 46 }, () => ({
        gx: rnd() * (COLS - 1), gy: rnd() * (ROWS - 1),
        base: 0.4 + rnd() * 0.6, age: rnd(),
    }));
})();

// Inverse-distance-weighted scalar field, modulated by the two sliders.
function buildField(sourceWeight, timeDecay) {
    const field = new Float32Array(COLS * ROWS);
    // sourceWeight raises contrast (a contrast exponent, so it survives the
    // per-frame normalization below); timeDecay fades older points per-point.
    const eff = POINTS.map(p => Math.pow(p.base, 0.3 + sourceWeight * 2.5) * (1 - p.age * timeDecay * 0.9));
    let max = 0;
    for (let gy = 0; gy < ROWS; gy++) {
        for (let gx = 0; gx < COLS; gx++) {
            let sum = 0;
            for (let i = 0; i < POINTS.length; i++) {
                const dx = gx - POINTS[i].gx, dy = gy - POINTS[i].gy;
                sum += eff[i] / (dx * dx + dy * dy + 6);
            }
            field[gy * COLS + gx] = sum;
            if (sum > max) max = sum;
        }
    }
    if (max > 0) for (let i = 0; i < field.length; i++) field[i] /= max;
    return field;
}

// Hand-written marching squares → SVG path per threshold. No plotting library.
const lerp = (a, b, t, va, vb) => a + (b - a) * ((t - va) / (vb - va || 1e-6));
function contourPath(field, level) {
    let d = '';
    for (let cy = 0; cy < ROWS - 1; cy++) {
        for (let cx = 0; cx < COLS - 1; cx++) {
            const tl = field[cy * COLS + cx], tr = field[cy * COLS + cx + 1];
            const br = field[(cy + 1) * COLS + cx + 1], bl = field[(cy + 1) * COLS + cx];
            const idx = (tl >= level ? 8 : 0) | (tr >= level ? 4 : 0) | (br >= level ? 2 : 0) | (bl >= level ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x = cx * CELL, y = cy * CELL;
            const top = () => [lerp(x, x + CELL, level, tl, tr), y];
            const right = () => [x + CELL, lerp(y, y + CELL, level, tr, br)];
            const bottom = () => [lerp(x, x + CELL, level, bl, br), y + CELL];
            const left = () => [x, lerp(y, y + CELL, level, tl, bl)];
            const seg = (a, b) => { d += `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`; };
            switch (idx) {
                case 1: case 14: seg(left(), bottom()); break;
                case 2: case 13: seg(bottom(), right()); break;
                case 3: case 12: seg(left(), right()); break;
                case 4: case 11: seg(top(), right()); break;
                case 6: case 9: seg(top(), bottom()); break;
                case 7: case 8: seg(top(), left()); break;
                case 5: seg(top(), left()); seg(bottom(), right()); break;
                case 10: seg(top(), right()); seg(left(), bottom()); break;
                default: break;
            }
        }
    }
    return d;
}

export default function H3ConfidenceTopography() {
    const { lang } = useI18n();
    const c = M[lang] ?? M.en;
    const reduced = usePrefersReducedMotion();
    const [step, setStep] = useState(2);
    const [weight, setWeight] = useState(0.6);
    const [decay, setDecay] = useState(0.4);

    const field = useMemo(() => buildField(weight, decay), [weight, decay]);
    const paths = useMemo(() => LEVELS.map(l => contourPath(field, l)), [field]);

    const showDots = step <= 1;
    const showContours = step === 2;

    return (
        <ModuleFrame id="vf-h3" code={M.code} phase={M.phase} accent={ACCENT}
            title={c.title} lead={c.lead} roles={M.roles} tier={M.tier} footer={c.foot}>
            <div className={`vf-h3${reduced ? ' reduced' : ''}`} style={{ '--vf-accent': ACCENT }}>
                <ol className="vf-h3-steps">
                    {c.steps.map((s, i) => (
                        <li key={i}>
                            <button className={`vf-h3-step${step === i ? ' on' : ''}`} aria-pressed={step === i} onClick={() => setStep(i)}>
                                <span className="vf-h3-step-n">{i + 1}</span>
                                <span className="vf-h3-step-body"><b>{s.t}</b><span>{s.d}</span></span>
                            </button>
                        </li>
                    ))}
                </ol>

                <div className="vf-h3-viz">
                    <svg viewBox={`0 0 ${W} ${H}`} className="vf-h3-svg" role="img"
                        aria-label={`${c.title} — ${c.peakLabel} / ${c.valleyLabel}`}>
                        <rect x="0" y="0" width={W} height={H} fill="var(--vf-bg-2)" />
                        {showContours && paths.map((d, i) => (
                            <path key={i} d={d} fill="none" stroke={LEVEL_COLOR[i]}
                                strokeWidth={1 + i * 0.5} opacity={0.35 + i * 0.13} strokeLinecap="round" />
                        ))}
                        {POINTS.map((p, i) => {
                            const eff = p.base * (1 - p.age * decay * 0.9);
                            return (
                                <circle key={i} cx={p.gx * CELL} cy={p.gy * CELL}
                                    r={showDots ? (step === 1 ? 1.5 + eff * 4 : 2.4) : 1.4}
                                    fill={showContours ? 'var(--vf-text-1)' : ACCENT}
                                    opacity={showContours ? 0.35 : 0.4 + eff * 0.5} />
                            );
                        })}
                    </svg>
                    <div className="vf-h3-scale" aria-hidden="true">
                        <span className="vf-h3-scale-cap" style={{ color: 'var(--vf-teal)' }}>{c.peakLabel}</span>
                        <span className="vf-h3-scale-bar" />
                        <span className="vf-h3-scale-cap" style={{ color: 'var(--vf-amber)' }}>{c.valleyLabel}</span>
                    </div>
                </div>

                <div className="vf-h3-controls">
                    <label className="vf-h3-slider">
                        <span className="vf-h3-slider-label">{c.weightLabel}<b>{Math.round(weight * 100)}</b></span>
                        <input type="range" min="0" max="1" step="0.02" value={weight}
                            onChange={e => setWeight(+e.target.value)} aria-label={c.weightLabel} />
                    </label>
                    <label className="vf-h3-slider">
                        <span className="vf-h3-slider-label">{c.decayLabel}<b>{Math.round(decay * 100)}</b></span>
                        <input type="range" min="0" max="1" step="0.02" value={decay}
                            onChange={e => setDecay(+e.target.value)} aria-label={c.decayLabel} />
                    </label>
                </div>

                <div className="vf-h3-arg">
                    <span className="vf-eyebrow" style={{ color: ACCENT }}>{c.argLabel}</span>
                    <p>{c.argument}</p>
                    <p className="vf-h3-algo">{c.algoNote}</p>
                    {reduced && <p className="vf-h3-algo">{c.reducedNote}</p>}
                </div>
            </div>
        </ModuleFrame>
    );
}

injectStyles('vf-h3-style', `
.vf-h3 { display: grid; grid-template-columns: 0.9fr 1.1fr; grid-template-areas: 'steps viz' 'steps controls' 'arg arg'; gap: 18px; }
.vf-h3-steps { grid-area: steps; list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.vf-h3-step { display: flex; gap: 12px; width: 100%; padding: 13px; border-radius: var(--vf-r-md); border: 1px solid var(--vf-line-1); background: var(--vf-bg-2); transition: border-color 180ms var(--vf-ease), background 180ms var(--vf-ease); }
.vf-h3-step.on { border-color: var(--vf-accent); background: color-mix(in srgb, var(--vf-accent) 9%, var(--vf-bg-2)); }
.vf-h3-step-n { flex: 0 0 auto; width: 22px; height: 22px; border-radius: 50%; font-family: var(--vf-font-data); font-size: 12px; display: flex; align-items: center; justify-content: center; color: var(--vf-text-3); border: 1px solid var(--vf-line-2); }
.vf-h3-step.on .vf-h3-step-n { color: var(--vf-bg-0); background: var(--vf-accent); border-color: transparent; }
.vf-h3-step-body { min-width: 0; }
.vf-h3-step-body b { display: block; font-size: 13.5px; color: var(--vf-text-1); }
.vf-h3-step-body span { font-size: 12px; line-height: 1.5; color: var(--vf-text-2); }
.vf-h3-viz { grid-area: viz; }
.vf-h3-svg { width: 100%; height: auto; border: 1px solid var(--vf-line-1); border-radius: var(--vf-r-md); display: block; }
.vf-h3-svg path { transition: opacity 260ms var(--vf-ease); }
.vf-h3-scale { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.vf-h3-scale-cap { font-family: var(--vf-font-data); font-size: 10px; letter-spacing: 0.04em; }
.vf-h3-scale-bar { flex: 1; height: 5px; border-radius: 999px; background: linear-gradient(90deg, var(--vf-teal), var(--vf-sky), var(--vf-slate), var(--vf-gold), var(--vf-amber)); }
.vf-h3-controls { grid-area: controls; display: flex; flex-direction: column; gap: 14px; justify-content: center; }
.vf-h3-slider { display: block; }
.vf-h3-slider-label { display: flex; justify-content: space-between; font-family: var(--vf-font-data); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--vf-text-3); margin-bottom: 7px; }
.vf-h3-slider-label b { color: var(--vf-accent); }
.vf-h3-slider input[type=range] { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 999px; background: var(--vf-bg-3); outline-offset: 4px; }
.vf-h3-slider input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--vf-accent); border: 3px solid var(--vf-bg-1); cursor: pointer; box-shadow: 0 0 0 1px var(--vf-accent); }
.vf-h3-slider input[type=range]::-moz-range-thumb { width: 15px; height: 15px; border-radius: 50%; background: var(--vf-accent); border: 3px solid var(--vf-bg-1); cursor: pointer; }
.vf-h3-arg { grid-area: arg; padding: 16px 18px; background: var(--vf-bg-2); border-left: 2px solid var(--vf-accent); border-radius: 0 var(--vf-r-md) var(--vf-r-md) 0; }
.vf-h3-arg p { margin: 8px 0 0; font-size: 15px; line-height: 1.6; color: var(--vf-text-1); }
.vf-h3-algo { font-family: var(--vf-font-data); font-size: 11.5px !important; color: var(--vf-text-3) !important; line-height: 1.55 !important; }
@media (max-width: 720px) {
  .vf-h3 { grid-template-columns: 1fr; grid-template-areas: 'steps' 'viz' 'controls' 'arg'; }
}
@media (prefers-reduced-motion: reduce) { .vf-h3-svg path { transition: none; } }
`);
