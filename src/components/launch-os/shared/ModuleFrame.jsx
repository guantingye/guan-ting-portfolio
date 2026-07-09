import React, { useEffect, useState } from 'react';
import DataProvenance from './DataProvenance.jsx';

// ---- style injection ----------------------------------------------------
// Modules are self-contained: each injects its own stylesheet once at import
// time. Idempotent by id, so a module can also be mounted standalone.
export function injectStyles(id, css) {
    if (typeof document === 'undefined' || document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
}

// ---- viewport / motion hooks --------------------------------------------
const DESKTOP_QUERY = '(min-width: 1200px)';
const TABLET_QUERY = '(min-width: 768px)';

export function useViewport() {
    const read = () => {
        if (typeof window === 'undefined') return 'desktop';
        if (window.matchMedia(DESKTOP_QUERY).matches) return 'desktop';
        if (window.matchMedia(TABLET_QUERY).matches) return 'tablet';
        return 'mobile';
    };
    const [viewport, setViewport] = useState(read);

    useEffect(() => {
        const queries = [DESKTOP_QUERY, TABLET_QUERY].map(q => window.matchMedia(q));
        const onChange = () => setViewport(read());
        queries.forEach(q => q.addEventListener('change', onChange));
        return () => queries.forEach(q => q.removeEventListener('change', onChange));
    }, []);

    return viewport;
}

export function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(() =>
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReduced(query.matches);
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    }, []);

    return reduced;
}

// ---- shared tokens + frame styles (spec ch.1 / 3.4) ----------------------
injectStyles('los-shared-styles', `
.los {
  --bg-0: #060709;
  --bg-1: #0C0E12;
  --bg-2: #14171D;
  --bg-3: #1C2028;
  --line-1: #262B35;
  --line-2: #333A47;
  --text-1: #F2F0EB;
  --text-2: #A8ADB8;
  --text-3: #6B7280;
  --teal: #35C2B0;
  --teal-dim: rgba(53,194,176,0.14);
  --amber: #E8A33D;
  --amber-dim: rgba(232,163,61,0.12);
  --red: #D96A5B;
  --red-dim: rgba(217,106,91,0.12);
  --font-display: 'Newsreader', 'Noto Serif TC', serif;
  --font-body: 'Inter', 'Noto Sans TC', sans-serif;
  --font-data: 'JetBrains Mono', monospace;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  font-family: var(--font-body);
  color: var(--text-2);
  font-size: 16px;
  line-height: 1.65;
}

.los *, .los *::before, .los *::after { box-sizing: border-box; }

:where(.los button) {
  font: inherit;
  color: inherit;
  background: none;
  border: none;
  padding: 0;
  text-align: inherit;
  cursor: pointer;
}

.los :is(button, a, input, [tabindex="0"]):focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 2px;
  border-radius: 2px;
}

.los-sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.los-eyebrow {
  font-family: var(--font-data);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  line-height: 1;
  color: var(--text-3);
}

.los-display-md {
  font-family: var(--font-display);
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 500;
  line-height: 1.15;
  color: var(--text-1);
  margin: 0;
}

.los-heading {
  font-family: var(--font-body);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-1);
}

.los-body {
  font-size: 16px;
  line-height: 1.65;
  color: var(--text-2);
}

.los-data-md {
  font-family: var(--font-data);
  font-size: 14px;
  line-height: 1.5;
}

.los-data-sm {
  font-family: var(--font-data);
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.06em;
}

.los-module {
  background: var(--bg-1);
  border: 1px solid var(--line-1);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin: 0 0 48px;
}

.los-frame-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.los-role-map {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.los-role-chip {
  font-family: var(--font-data);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--teal);
  border: 1px solid var(--teal);
  border-radius: var(--radius-sm);
  padding: 3px 8px;
  white-space: nowrap;
}

/* ✅ 修改處 1：
   原本 .los-frame-lead 是套在單一 <p> 上。
   現在改成 lead 容器，可以容納多個段落。 */
.los-frame-lead {
  max-width: 820px;
  margin: 12px 0 0;
  display: grid;
  gap: 10px;
}

/* ✅ 修改處 2：
   新增段落樣式，讓 lead 陣列 map 出來的多個 <p> 保持一致排版。 */
.los-frame-lead p {
  margin: 0;
  font-size: 16px;
  line-height: 1.75;
  color: var(--text-2);
}

.los-frame-context {
  color: var(--text-3);
  margin: 12px 0 0;
}

.los-frame-divider {
  border: none;
  border-top: 1px solid var(--line-1);
  margin: 24px 0;
}

.los-frame-foot {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.los-signature {
  font-family: var(--font-data);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--text-3);
  text-align: right;
}

.los-signature::before {
  content: '◇ ';
  color: var(--amber);
}

@media (max-width: 767px) {
  .los-module {
    padding: 20px 16px;
  }

  .los-frame-foot {
    flex-direction: column;
  }

  .los-signature {
    text-align: left;
  }

  /* ✅ 修改處 3：
     手機版縮小 lead 間距，避免段落太鬆。 */
  .los-frame-lead {
    gap: 8px;
  }

  .los-frame-lead p {
    font-size: 15px;
    line-height: 1.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .los *, .los *::before, .los *::after {
    transition-duration: 100ms !important;
    transition-property: opacity, background-color, border-color, color !important;
    animation: none !important;
  }
}
`);

// ---- frame (spec 3.4) -----------------------------------------------------

// ✅ 修改處 4：新增 LeadBlock component
// 目的：讓 ModuleFrame 的 lead 同時支援：
// 1. 字串：lead: '一段文字'
// 2. 陣列：lead: ['第一段', '第二段']
// 這樣既不會破壞其他舊模組，也可以讓新模組自然分段。
function LeadBlock({ lead }) {
    if (!lead) return null;

    return (
        <div className="los-frame-lead">
            {Array.isArray(lead) ? (
                lead.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))
            ) : (
                <p>{lead}</p>
            )}
        </div>
    );
}

export default function ModuleFrame({
    id,
    eyebrow,
    title,
    lead,
    context,
    roles = [],
    signature,
    children,
}) {
    return (
        <section className="los los-module" id={id} aria-labelledby={`${id}-title`}>
            <header>
                <div className="los-frame-topline">
                    <span className="los-eyebrow">{eyebrow}</span>

                    <div className="los-role-map" aria-label="Target roles">
                        {roles.map(role => (
                            <span className="los-role-chip" key={role}>
                                {role}
                            </span>
                        ))}
                    </div>
                </div>

                <h3 className="los-display-md" id={`${id}-title`}>
                    {title}
                </h3>

                {/* ✅ 修改處 5：
                    原本是：
                    <p className="los-body los-frame-lead">{lead}</p>

                    現在改成 LeadBlock，讓 lead 可以支援多段落。 */}
                <LeadBlock lead={lead} />

                {context && (
                    <p className="los-data-sm los-frame-context">
                        {context}
                    </p>
                )}
            </header>

            <hr className="los-frame-divider" />

            {children}

            <hr className="los-frame-divider" />

            <footer className="los-frame-foot">
                <DataProvenance />

                {signature && (
                    <span className="los-signature">
                        {signature}
                    </span>
                )}
            </footer>
        </section>
    );
}