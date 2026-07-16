import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { injectStyles } from './fjKit.jsx';

const COPY = {
    en: { close: 'Close' },
    zh: { close: '關閉' },
};

function getFocusableElements(container) {
    return container.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
}

export default function PhotoLightbox({ image, lang, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!image) return undefined;

        const previousFocus = document.activeElement;
        const originalOverflow = document.body.style.overflow;
        const dialog = dialogRef.current;
        document.body.style.overflow = 'hidden';
        dialog?.querySelector('button')?.focus();

        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (event.key !== 'Tab' || !dialog) return;
            const focusableElements = getFocusableElements(dialog);
            if (!focusableElements.length) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        dialog?.addEventListener('keydown', handleKeyDown);
        return () => {
            dialog?.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;
            previousFocus?.focus?.();
        };
    }, [image, onClose]);

    if (!image) return null;

    const copy = COPY[lang] ?? COPY.en;
    const title = image.title[lang] ?? image.title.en;
    const note = image.note?.[lang] ?? image.note?.en;
    const titleId = `fj-lightbox-${image.id}-title`;
    const noteId = `fj-lightbox-${image.id}-note`;

    return createPortal(
        <div className="fj-lightbox" onMouseDown={event => event.currentTarget === event.target && onClose()}>
            <div
                className="fj fj-lightbox-panel"
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={note ? noteId : undefined}
            >
                <button className="fj-lightbox-close" type="button" onClick={onClose}>
                    {copy.close} <span aria-hidden="true">×</span>
                </button>
                <figure className="fj-lightbox-figure">
                    <img src={image.src} alt={title} />
                    <figcaption>
                        <strong id={titleId}>{title}</strong>
                        {note && <span id={noteId}>{note}</span>}
                    </figcaption>
                </figure>
            </div>
        </div>,
        document.body,
    );
}

injectStyles('fj-photo-lightbox-styles', `
.fj-lightbox { position: fixed; inset: 0; z-index: 1600; display: grid; place-items: center; padding: 24px; background: rgba(20,17,34,0.86); backdrop-filter: blur(8px); }
.fj-lightbox-panel { width: min(980px, 100%); max-height: calc(100dvh - 48px); overflow: auto; position: relative; background: var(--fj-paper-1); border: 1px solid rgba(246,239,224,0.28); border-radius: var(--fj-r-lg); box-shadow: 0 28px 80px rgba(20,17,34,0.42); padding: 18px; }
.fj-lightbox-close { min-width: 44px; min-height: 44px; margin-left: auto; display: flex; align-items: center; justify-content: center; gap: 7px; padding: 8px 12px; border: 1px solid var(--fj-line); border-radius: var(--fj-r-sm) !important; background: var(--fj-paper-2) !important; color: var(--fj-ink) !important; font-family: var(--fj-font-data) !important; font-size: 11px !important; letter-spacing: 0.06em; }
.fj-lightbox-close:hover { border-color: var(--fj-accent-ink); }
.fj-lightbox-close:active { transform: translateY(1px); }
.fj-lightbox-figure { margin: 12px 0 0; }
.fj-lightbox-figure img { display: block; width: 100%; max-height: min(68vh, 760px); object-fit: contain; background: var(--fj-paper-2); }
.fj-lightbox-figure figcaption { display: grid; gap: 3px; padding: 14px 4px 2px; }
.fj-lightbox-figure strong { color: var(--fj-ink); font-family: var(--fj-font-display); font-size: 17px; font-weight: 500; }
.fj-lightbox-figure span { color: var(--fj-ink-3); font-size: 13px; line-height: 1.6; }
@media (max-width: 767px) { .fj-lightbox { padding: 16px; } .fj-lightbox-panel { max-height: calc(100dvh - 32px); padding: 14px; } .fj-lightbox-figure img { max-height: 65vh; } }
`);
