import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import ChapterFrame, { injectStyles, useI18n, PhotoSlot, stagger, riseItem } from './shared/fjKit.jsx';
import { CHAPTERS, PHOTOS } from './data/fjContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C06');

const COPY = {
    en: {
        lead: 'The paper trail: boards, report spreads, recordings, and rooms. The scans are being pulled from old drives — each frame below is reserved for one, and the captions already say what belongs there.',
    },
    zh: {
        lead: '紙本的證據：溝通板、報告攤頁、錄音現場與活動教室。掃描檔正從舊硬碟裡整理出來——下面每一個相框都留給一張，圖說先告訴你那裡會放什麼。',
    },
};

export default function C06_FieldAlbum() {
    const { lang } = useI18n();
    const reduced = useReducedMotion();
    const c = COPY[lang] ?? COPY.en;
    return (
        <ChapterFrame chapter={chapter} lead={c.lead}>
            <motion.div
                className="fj-album"
                variants={stagger()}
                initial={reduced ? false : 'hidden'}
                whileInView="show"
                viewport={{ once: true, amount: 0.08 }}
            >
                {PHOTOS.map(photo => (
                    <motion.div key={photo.id} variants={riseItem}>
                        <PhotoSlot photo={photo} />
                    </motion.div>
                ))}
            </motion.div>
        </ChapterFrame>
    );
}

injectStyles('fj-c06-styles', `
.fj-album { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px 18px; padding-top: 10px; }
@media (max-width: 1023px) { .fj-album { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .fj-album { grid-template-columns: 1fr; } }
`);
