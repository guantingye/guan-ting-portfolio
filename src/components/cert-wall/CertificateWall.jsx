import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const CERT_BASE = `${import.meta.env.BASE_URL}assets/certificate/`;

function getFocusableElements(container) {
    return container.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
}

function ExpandIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5" />
        </svg>
    );
}

function CertLightbox({ cert, lang, onClose }) {
    const dialogRef = useRef(null);
    const zh = lang === 'zh';

    useEffect(() => {
        if (!cert) return undefined;

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
    }, [cert, onClose]);

    if (!cert) return null;

    const name = zh ? cert.zhName || cert.name : cert.name;
    const titleId = `cert-lightbox-${cert.img}-title`;

    return createPortal(
        <div className="cert-lightbox" onMouseDown={event => event.currentTarget === event.target && onClose()}>
            <div className="cert-lightbox-panel" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId}>
                <button className="cert-lightbox-close" type="button" onClick={onClose}>
                    {zh ? '關閉' : 'Close'} <span aria-hidden="true">×</span>
                </button>
                <img src={CERT_BASE + cert.img} alt={`${name} certificate, full view`} decoding="async" />
                <div className="cert-lightbox-caption">
                    <span>{cert.issuer}</span>
                    <strong id={titleId}>{name}</strong>
                </div>
            </div>
        </div>,
        document.body,
    );
}

export default function CertificateWall({ certs, lang, title }) {
    const [openCert, setOpenCert] = useState(null);
    const zh = lang === 'zh';

    if (!certs || !certs.length) return null;

    return (
        <div className="proj-section reveal cert-wall">
            <div className="proj-section-title">{title}</div>
            <div className="cert-wall-grid">
                {certs.map((c, i) => {
                    const name = zh ? c.zhName || c.name : c.name;
                    return (
                        <figure className="cert-wall-card" key={c.img}>
                            <button
                                type="button"
                                className="cert-wall-frame"
                                onClick={() => setOpenCert(c)}
                                aria-label={zh ? `放大檢視 ${name}` : `View ${name} full size`}
                            >
                                <span className="cert-wall-tick tl" aria-hidden="true" />
                                <span className="cert-wall-tick tr" aria-hidden="true" />
                                <span className="cert-wall-tick bl" aria-hidden="true" />
                                <span className="cert-wall-tick br" aria-hidden="true" />
                                <img src={CERT_BASE + c.img} alt={`${name} certificate`} loading="lazy" decoding="async" />
                                <span className="cert-wall-sheen" aria-hidden="true" />
                                <span className="cert-wall-glance">
                                    <ExpandIcon className="cert-wall-expand-icon" />
                                    <span>{zh ? '點擊放大檢視' : 'Inspect certificate'}</span>
                                </span>
                            </button>
                            <figcaption className="cert-wall-plate">
                                <div className="cert-wall-plate-top">
                                    <span className="cert-wall-index">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="cert-wall-issuer">
                                        <i className="cert-wall-issuer-dot" aria-hidden="true" />
                                        {c.issuer}
                                    </span>
                                </div>
                                <strong className="cert-wall-name">{name}</strong>
                                <p className="cert-wall-focus">{zh ? c.zhFocus || c.focus : c.focus}</p>
                            </figcaption>
                        </figure>
                    );
                })}
            </div>
            <CertLightbox cert={openCert} lang={lang} onClose={() => setOpenCert(null)} />
        </div>
    );
}
