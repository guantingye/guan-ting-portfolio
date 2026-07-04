import React from 'react';
import { useI18n } from './useI18n.js';

const COPY = {
    en: 'Data simulated for demonstration. Framework, methodology, and build are original work.',
    zh: '資料為展示用模擬數據；框架、方法與實作皆為原創。',
};

// Honesty footnote (spec 0.4 / 3.6) — identical wording across all six modules.
export default function DataProvenance() {
    const { lang } = useI18n();
    return (
        <p className="los-data-sm" style={{ color: 'var(--text-3)', margin: 0 }}>
            <span aria-hidden="true" style={{
                display: 'inline-block', width: 4, height: 4, borderRadius: '50%',
                background: 'var(--teal)', marginRight: 8, verticalAlign: 2,
            }} />
            {COPY[lang] ?? COPY.en}
        </p>
    );
}
