import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import ChapterFrame, { injectStyles, useI18n, Plate, stagger, riseItem } from './shared/blKit.jsx';
import { CHAPTERS, PHOTOS } from './data/blContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C08');

const COPY = {
    en: { lead: 'The award, the poster, and both methodology figures already appear inline above. This is what\'s still waiting on a scan: the room where it happened, and the people who made it possible.' },
    zh: { lead: '獎項、海報，與兩張方法論圖版，都已經出現在上方的章節裡。這裡是還在等掃描檔的部分：事情發生的房間，還有讓這一切成真的人。' },
};

export default function C08_Plates() {
    const { lang } = useI18n();
    const reduced = useReducedMotion();
    const c = COPY[lang] ?? COPY.en;
    return (
        <ChapterFrame chapter={chapter} lead={c.lead}>
            <motion.div
                className="bl-plate-grid"
                variants={stagger(0.06)}
                initial={reduced ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
            >
                {PHOTOS.map((p, i) => (
                    <motion.div key={p.id} variants={riseItem}>
                        <Plate photo={p} num={i + 1} />
                    </motion.div>
                ))}
            </motion.div>
        </ChapterFrame>
    );
}

injectStyles('bl-c08-styles', `
.bl-plate-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 280px)); gap: 16px; }
@media (max-width: 560px) {
  .bl-plate-grid { grid-template-columns: 1fr; }
}
`);
