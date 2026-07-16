import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import ChapterFrame, { injectStyles, useI18n, PhotoSlot, stagger, riseItem } from './shared/fjKit.jsx';
import PhotoLightbox from './shared/PhotoLightbox.jsx';
import { CHAPTERS, PHOTOS } from './data/fjContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C06');

const COPY = {
    en: {
        lead: 'Three photographs place the first two stations back in their real settings: an institution activity, a working session, and an association event. Open a photograph to view the full frame.',
    },
    zh: {
        lead: '三張照片把前兩站帶回真實場域：機構活動、工作現場與協會活動。點選縮圖可查看完整畫面。',
    },
};

export default function C06_FieldAlbum() {
    const { lang } = useI18n();
    const reduced = useReducedMotion();
    const c = COPY[lang] ?? COPY.en;
    const [activePhoto, setActivePhoto] = useState(null);
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
                    <motion.div key={photo.id} className={`fj-album-item fj-album-item--${photo.layout}`} variants={riseItem}>
                        <PhotoSlot photo={photo} onOpen={setActivePhoto} />
                    </motion.div>
                ))}
            </motion.div>
            <PhotoLightbox image={activePhoto} lang={lang} onClose={() => setActivePhoto(null)} />
        </ChapterFrame>
    );
}

injectStyles('fj-c06-styles', `
.fj-album { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 22px 18px; padding-top: 10px; align-items: start; }
.fj-album-item--portrait { grid-column: span 3; width: min(100%, 224px); justify-self: start; }
.fj-album-item--work { grid-column: span 4; }
.fj-album-item--event { grid-column: span 5; }
@media (max-width: 1023px) { .fj-album { grid-template-columns: repeat(2, minmax(0, 1fr)); } .fj-album-item { grid-column: span 1; } .fj-album-item--portrait { width: min(100%, 224px); } }
@media (max-width: 520px) { .fj-album { grid-template-columns: 1fr; } }
`);
