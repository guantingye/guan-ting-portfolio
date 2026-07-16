import React, { useState } from 'react';
import {
    FiCheckCircle,
    FiCornerUpLeft,
    FiGrid,
    FiTrash2,
    FiVolume2,
} from 'react-icons/fi';
import { injectStyles, useI18n } from './shared/fjKit.jsx';
import StationChapter from './shared/StationChapter.jsx';
import { CHAPTERS, STATIONS } from './data/fjContent.js';

const chapter = CHAPTERS.find(c => c.key === 'C03');
const station = STATIONS[0];
const AAC_ART_SPRITE = `${import.meta.env.BASE_URL}assets/field-journey/aac-handdrawn-sprite.png`;

const COPY = {
    en: {
        spotTitle: 'AAC communication board prototype',
        boardLabel: 'Daily needs board',
        fixedLayout: 'Fixed card positions',
        readPoint: 'Reading point',
        readPointHint: 'Touch the lower-right target with the reading pen.',
        ready: 'Reading pen ready',
        recognized: label => `${label} recognized`,
        hint: 'Cards stay in predictable locations. Touch the reading point, then choose cards in message order.',
        strip: 'Message strip',
        empty: 'Choose a card to begin. Your message will remain visible here.',
        undo: 'Undo last',
        clear: 'Clear all',
        remove: 'Remove',
        selectedCount: count => `${count} ${count === 1 ? 'card' : 'cards'} selected`,
        caption: 'A reconstruction of the AAC boards designed and produced at the institution. The original tools used laminated cards and hook-and-loop sentence strips. This prototype preserves fixed locations, visible labels, and step-by-step message building.',
    },
    zh: {
        spotTitle: 'AAC 溝通板原型重構',
        boardLabel: '日常需求溝通板',
        fixedLayout: '固定牌位',
        readPoint: '點讀位置',
        readPointHint: '將點讀筆對準牌卡右下角感應區。',
        ready: '點讀筆已就緒',
        recognized: label => `已辨識「${label}」`,
        hint: '牌卡維持在可預期的位置，點讀後再依照想表達的順序選取。',
        strip: '表達句帶',
        empty: '選擇第一張牌卡，訊息會持續顯示在這裡。',
        undo: '撤回一張',
        clear: '全部清除',
        remove: '移除',
        selectedCount: count => `已選擇 ${count} 張牌卡`,
        caption: '重構當年在機構設計製作的 AAC 圖卡溝通板。實物使用護貝牌卡與魔鬼氈句帶，此原型保留固定牌位、清楚標籤與逐步組句的操作方式。',
    },
};

const CARD_GROUPS = [
    { key: 'starter', title: { en: 'Message starters', zh: '表達起始' } },
    { key: 'activity', title: { en: 'Daily actions', zh: '日常活動' } },
    { key: 'care', title: { en: 'Care and comfort', zh: '照護與感受' } },
];

// Fixed positions preserve the reading order taught on the floor.
const CARDS = [
    { key: 'i', group: 'starter', artPosition: '0% 0%', label: { en: 'I', zh: '我' } },
    { key: 'want', group: 'starter', artPosition: '33.333% 0%', label: { en: 'want', zh: '想要' } },
    { key: 'eat', group: 'activity', artPosition: '66.667% 0%', label: { en: 'to eat', zh: '吃' } },
    { key: 'drink', group: 'activity', artPosition: '100% 0%', label: { en: 'to drink', zh: '喝水' } },
    { key: 'play', group: 'activity', artPosition: '0% 100%', label: { en: 'to play', zh: '玩' } },
    { key: 'rest', group: 'activity', artPosition: '33.333% 100%', label: { en: 'to rest', zh: '休息' } },
    { key: 'help', group: 'care', artPosition: '66.667% 100%', label: { en: 'help', zh: '幫忙' } },
    { key: 'hurt', group: 'care', artPosition: '100% 100%', label: { en: 'feel unwell', zh: '不舒服' } },
];

const CARD_BY_KEY = Object.fromEntries(CARDS.map(card => [card.key, card]));

function CardIllustration({ card, compact = false }) {
    return (
        <span
            className={`fj-aac-art${compact ? ' is-compact' : ''}`}
            style={{ backgroundImage: `url(${AAC_ART_SPRITE})`, backgroundPosition: card.artPosition }}
            aria-hidden="true"
        />
    );
}

function ReadingPoint({ label }) {
    return (
        <span className="fj-aac-readpoint" aria-hidden="true">
            <span className="fj-aac-readpoint-target"><FiVolume2 /></span>
            <span>{label}</span>
        </span>
    );
}

function AacCard({ card, lang, order, readPointLabel, onToggle }) {
    const isSelected = order >= 0;
    const secondaryLang = lang === 'zh' ? 'en' : 'zh';
    return (
        <button
            type="button"
            className={`fj-aac-card fj-aac-tone--${card.group}${isSelected ? ' is-on' : ''}`}
            aria-pressed={isSelected}
            aria-label={`${card.label[lang]}, ${readPointLabel}`}
            onClick={() => onToggle(card.key)}
        >
            {isSelected && <span className="fj-aac-order" aria-hidden="true">{order + 1}</span>}
            <CardIllustration card={card} />
            <span className="fj-aac-card-copy">
                <span className="fj-aac-label">{card.label[lang]}</span>
                <span className="fj-aac-translation">{card.label[secondaryLang]}</span>
            </span>
            <ReadingPoint label={readPointLabel} />
        </button>
    );
}

function SentenceToken({ card, lang, order, removeLabel, onRemove }) {
    return (
        <button
            type="button"
            className={`fj-aac-token fj-aac-tone--${card.group}`}
            aria-label={`${removeLabel} ${card.label[lang]}`}
            onClick={() => onRemove(card.key)}
        >
            <span className="fj-aac-token-order" aria-hidden="true">{order + 1}</span>
            <CardIllustration card={card} compact />
            <span>{card.label[lang]}</span>
        </button>
    );
}

function SentenceComposer({ cards, lang, copy, onRemove, onUndo, onClear }) {
    const hasCards = cards.length > 0;
    return (
        <section className="fj-aac-composer" aria-labelledby="fj-aac-strip-title">
            <div className="fj-aac-composer-head">
                <div className="fj-aac-strip-meta">
                    <h5 id="fj-aac-strip-title">{copy.strip}</h5>
                    <span>{copy.selectedCount(cards.length)}</span>
                </div>
                <div className="fj-aac-tools">
                    <button type="button" className="fj-aac-tool" onClick={onUndo} disabled={!hasCards}>
                        <FiCornerUpLeft aria-hidden="true" />
                        <span>{copy.undo}</span>
                    </button>
                    <button type="button" className="fj-aac-tool" onClick={onClear} disabled={!hasCards}>
                        <FiTrash2 aria-hidden="true" />
                        <span>{copy.clear}</span>
                    </button>
                </div>
            </div>
            <div className="fj-aac-strip" aria-live="polite">
                {hasCards
                    ? cards.map((card, index) => (
                        <SentenceToken
                            key={card.key}
                            card={card}
                            lang={lang}
                            order={index}
                            removeLabel={copy.remove}
                            onRemove={onRemove}
                        />
                    ))
                    : <div className="fj-aac-empty">
                        <span className="fj-aac-empty-slots" aria-hidden="true"><i /><i /><i /></span>
                        <span>{copy.empty}</span>
                    </div>}
            </div>
        </section>
    );
}

function AacCardGroup({ group, lang, strip, readPointLabel, onToggle }) {
    const groupCards = CARDS.filter(card => card.group === group.key);
    return (
        <section className={`fj-aac-group fj-aac-tone--${group.key}`} aria-labelledby={`fj-aac-group-${group.key}`}>
            <h5 id={`fj-aac-group-${group.key}`} className="fj-aac-group-title">{group.title[lang]}</h5>
            <div className="fj-aac-card-grid">
                {groupCards.map(card => (
                    <AacCard
                        key={card.key}
                        card={card}
                        lang={lang}
                        order={strip.indexOf(card.key)}
                        readPointLabel={readPointLabel}
                        onToggle={onToggle}
                    />
                ))}
            </div>
        </section>
    );
}

function AacBoard() {
    const { lang } = useI18n();
    const copy = COPY[lang] ?? COPY.en;
    const [strip, setStrip] = useState([]);
    const [lastReadKey, setLastReadKey] = useState(null);
    const selectedCards = strip.map(key => CARD_BY_KEY[key]).filter(Boolean);
    const lastReadCard = CARD_BY_KEY[lastReadKey];
    const toggleCard = key => {
        setLastReadKey(key);
        setStrip(current => current.includes(key)
            ? current.filter(cardKey => cardKey !== key)
            : [...current, key]);
    };
    const removeCard = key => setStrip(current => current.filter(cardKey => cardKey !== key));
    const undoCard = () => setStrip(current => current.slice(0, -1));

    return (
        <div className="fj-aac">
            <div className="fj-aac-topbar">
                <div>
                    <span className="fj-aac-board-label">{copy.boardLabel}</span>
                    <p className="fj-aac-hint">{copy.hint}</p>
                    <span className="fj-aac-layout-note"><FiGrid aria-hidden="true" />{copy.fixedLayout}</span>
                </div>
                <div className="fj-aac-device-status" aria-live="polite">
                    <span className="fj-aac-status-icon" aria-hidden="true">
                        {lastReadCard ? <FiCheckCircle /> : <FiVolume2 />}
                    </span>
                    <span>
                        <strong>{lastReadCard ? copy.recognized(lastReadCard.label[lang]) : copy.ready}</strong>
                        <small>{copy.readPointHint}</small>
                    </span>
                </div>
            </div>
            <SentenceComposer
                cards={selectedCards}
                lang={lang}
                copy={copy}
                onRemove={removeCard}
                onUndo={undoCard}
                onClear={() => setStrip([])}
            />
            <div className="fj-aac-groups">
                {CARD_GROUPS.map(group => (
                    <AacCardGroup
                        key={group.key}
                        group={group}
                        lang={lang}
                        strip={strip}
                        readPointLabel={copy.readPoint}
                        onToggle={toggleCard}
                    />
                ))}
            </div>
        </div>
    );
}

export default function C03_StationOne() {
    const { lang } = useI18n();
    const c = COPY[lang] ?? COPY.en;
    return (
        <StationChapter
            chapter={chapter}
            station={station}
            spotlightTitle={c.spotTitle}
            spotlight={<AacBoard />}
            spotlightCaption={c.caption}
        />
    );
}

injectStyles('fj-c03-styles', `
.fj-aac { background: linear-gradient(145deg, rgba(255,255,255,0.42), transparent 42%), var(--fj-paper-2); border: 1px solid var(--fj-line); border-radius: var(--fj-r-lg); padding: clamp(16px, 2.4vw, 24px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), 0 12px 30px rgba(59,50,38,0.07); }
.fj-aac-topbar { display: grid; grid-template-columns: minmax(0, 1fr) minmax(230px, 290px); gap: 24px; align-items: start; margin-bottom: 18px; }
.fj-aac-board-label { display: block; font-family: var(--fj-font-data); font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fj-accent-ink); }
.fj-aac-hint { max-width: 620px; margin: 6px 0 8px; font-size: 13.5px; line-height: 1.65; color: var(--fj-ink-2); }
.fj-aac-layout-note { display: inline-flex; align-items: center; gap: 7px; font-family: var(--fj-font-data); font-size: 9.5px; letter-spacing: 0.04em; color: var(--fj-ink-3); }
.fj-aac-layout-note svg { width: 14px; height: 14px; color: var(--fj-accent-ink); }
.fj-aac-device-status { display: grid; grid-template-columns: 36px minmax(0, 1fr); gap: 10px; align-items: center; min-height: 60px; padding: 10px 12px; background: rgba(255,255,255,0.34); border: 1px solid var(--fj-line); border-radius: var(--fj-r-md); box-shadow: inset 0 1px 0 rgba(255,255,255,0.58); }
.fj-aac-status-icon { display: grid; place-items: center; width: 36px; height: 36px; background: var(--fj-accent-soft); border: 1px solid color-mix(in srgb, var(--fj-accent) 48%, transparent); border-radius: var(--fj-r-sm); color: var(--fj-accent-ink); }
.fj-aac-status-icon svg { width: 18px; height: 18px; stroke-width: 1.8; }
.fj-aac-device-status strong, .fj-aac-device-status small { display: block; }
.fj-aac-device-status strong { overflow: hidden; color: var(--fj-ink); font-size: 11px; font-weight: 650; line-height: 1.35; text-overflow: ellipsis; white-space: nowrap; }
.fj-aac-device-status small { margin-top: 3px; color: var(--fj-ink-3); font-size: 9.5px; line-height: 1.4; }

.fj-aac-composer { padding: 13px; background: rgba(255,255,255,0.38); border: 1px solid var(--fj-line); border-radius: var(--fj-r-md); box-shadow: inset 0 1px 0 rgba(255,255,255,0.55); }
.fj-aac-composer-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
.fj-aac-strip-meta { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.fj-aac-strip-meta h5 { margin: 0; font-family: var(--fj-font-display); font-size: 16px; font-weight: 500; color: var(--fj-ink); }
.fj-aac-strip-meta span { font-family: var(--fj-font-data); font-size: 9.5px; color: var(--fj-ink-3); }
.fj-aac-tools { display: flex; gap: 7px; }
.fj-aac-tool { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 40px; padding: 7px 10px; background: var(--fj-paper-0); border: 1px solid var(--fj-line); border-radius: var(--fj-r-sm); color: var(--fj-ink-2); font-family: var(--fj-font-data); font-size: 10px; transition: border-color 160ms var(--fj-ease), color 160ms var(--fj-ease), transform 160ms var(--fj-ease); }
.fj-aac-tool:hover:not(:disabled) { border-color: var(--fj-accent); color: var(--fj-accent-ink); }
.fj-aac-tool:active:not(:disabled) { transform: scale(0.98); }
.fj-aac-tool:disabled { cursor: not-allowed; opacity: 0.4; }
.fj-aac-tool svg { width: 15px; height: 15px; }
.fj-aac-strip { display: flex; align-items: stretch; gap: 9px; min-height: 112px; margin-top: 10px; overflow-x: auto; padding: 10px; background-color: #E7DCC6; background-image: radial-gradient(rgba(92,82,64,0.2) 0.7px, transparent 0.7px); background-size: 7px 7px; border: 1px solid var(--fj-line); border-radius: var(--fj-r-sm); box-shadow: inset 0 2px 6px rgba(59,50,38,0.06); scrollbar-width: thin; scrollbar-color: var(--fj-line) transparent; }
.fj-aac-empty { display: flex; align-items: center; gap: 12px; width: 100%; color: var(--fj-ink-3); font-size: 12.5px; }
.fj-aac-empty-slots { display: flex; gap: 6px; flex: 0 0 auto; }
.fj-aac-empty-slots i { display: block; width: 37px; aspect-ratio: 3 / 4; border: 1px dashed rgba(59,50,38,0.24); border-radius: 5px; background: rgba(251,246,234,0.38); }
.fj-aac-token { position: relative; display: flex; flex: 0 0 84px; flex-direction: column; align-items: center; justify-content: center; gap: 4px; min-height: 90px; padding: 7px 6px 6px; background: var(--fj-paper-1); border: 1px solid var(--fj-aac-tone); border-top-width: 3px; border-radius: var(--fj-r-sm); box-shadow: 0 2px 0 rgba(59,50,38,0.08); color: var(--fj-ink); transition: transform 160ms var(--fj-ease), background 160ms var(--fj-ease); }
.fj-aac-token:hover { background: var(--fj-aac-tone-soft); transform: translateY(-1px); }
.fj-aac-token > span:last-child { max-width: 100%; overflow: hidden; font-size: 11.5px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.fj-aac-token-order { position: absolute; top: 4px; right: 5px; display: grid; place-items: center; width: 17px; height: 17px; background: var(--fj-paper-0); border: 1px solid var(--fj-aac-tone); border-radius: 50%; color: var(--fj-ink-2); font-family: var(--fj-font-data); font-size: 8.5px; }

.fj-aac-groups { display: grid; grid-template-columns: 1fr 2.2fr 1fr; gap: 14px; margin-top: 20px; }
.fj-aac-group { min-width: 0; }
.fj-aac-group-title { display: flex; align-items: center; gap: 8px; margin: 0 0 9px; font-family: var(--fj-font-data); font-size: 10px; font-weight: 600; letter-spacing: 0.07em; color: var(--fj-ink-2); }
.fj-aac-group-title::before { content: ''; flex: 0 0 24px; height: 3px; border-radius: 2px; background: var(--fj-aac-tone); }
.fj-aac-card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.fj-aac-tone--activity .fj-aac-card-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.fj-aac-card { position: relative; isolation: isolate; display: flex; min-width: 0; min-height: 208px; flex-direction: column; align-items: center; overflow: hidden; padding: 11px 8px 8px; background: #FFFDF8; border: 1px solid color-mix(in srgb, var(--fj-aac-tone) 46%, var(--fj-line)); border-radius: var(--fj-r-md); box-shadow: 0 5px 12px rgba(59,50,38,0.08), 0 1px 1px rgba(59,50,38,0.08), inset 0 0 0 3px rgba(255,255,255,0.48); color: var(--fj-ink-2); transition: border-color 180ms var(--fj-ease), background 180ms var(--fj-ease), transform 180ms var(--fj-ease), box-shadow 180ms var(--fj-ease); }
.fj-aac-card::before { content: ''; position: absolute; inset: 0 0 auto; z-index: 2; height: 4px; background: var(--fj-aac-tone); opacity: 0.82; }
.fj-aac-card::after { content: ''; position: absolute; z-index: 3; inset: -28% 38% 52% -24%; transform: rotate(-18deg); background: linear-gradient(90deg, transparent, rgba(255,255,255,0.42), transparent); pointer-events: none; }
.fj-aac-card:hover { transform: translateY(-3px) rotate(-0.35deg); border-color: var(--fj-aac-tone); box-shadow: 0 8px 17px rgba(59,50,38,0.11), 0 1px 1px rgba(59,50,38,0.08), inset 0 0 0 3px rgba(255,255,255,0.52); }
.fj-aac-card:active { transform: scale(0.98); }
.fj-aac-card.is-on { border-color: var(--fj-aac-tone); background: linear-gradient(180deg, var(--fj-aac-tone-soft), #FFFDF8 54%); box-shadow: 0 7px 16px rgba(59,50,38,0.1), inset 0 0 0 2px var(--fj-aac-tone); }
.fj-aac-art { display: block; flex: 0 0 auto; width: min(84%, 90px); aspect-ratio: 3 / 4; background-repeat: no-repeat; background-size: 400% 200%; border-radius: calc(var(--fj-r-sm) - 2px); }
.fj-aac-art.is-compact { width: 42px; }
.fj-aac-card-copy { display: flex; min-width: 0; width: 100%; flex-direction: column; align-items: center; margin-top: -2px; }
.fj-aac-label { display: grid; place-items: center; min-height: 35px; max-width: 100%; color: var(--fj-ink); font-size: 14px; font-weight: 700; line-height: 1.25; text-align: center; }
.fj-aac-translation { max-width: 100%; margin-top: 1px; overflow: hidden; color: var(--fj-ink-3); font-family: var(--fj-font-data); font-size: 8.5px; line-height: 1.3; text-overflow: ellipsis; white-space: nowrap; }
.fj-aac-readpoint { display: flex; align-items: center; justify-content: flex-end; gap: 5px; width: 100%; margin-top: auto; color: var(--fj-ink-3); font-family: var(--fj-font-data); font-size: 7.5px; letter-spacing: 0.03em; white-space: nowrap; }
.fj-aac-readpoint-target { position: relative; display: grid; place-items: center; width: 23px; height: 23px; background: var(--fj-aac-tone-soft); border: 1px solid var(--fj-aac-tone); border-radius: 50%; color: var(--fj-aac-tone); }
.fj-aac-readpoint-target::after { content: ''; position: absolute; inset: 3px; border: 1px solid currentColor; border-radius: inherit; opacity: 0.35; }
.fj-aac-readpoint-target svg { width: 10px; height: 10px; stroke-width: 2; }
.fj-aac-card:hover .fj-aac-readpoint-target { background: var(--fj-aac-tone); color: #FFFDF8; }
.fj-aac-card:focus-visible, .fj-aac-token:focus-visible, .fj-aac-tool:focus-visible { outline: 3px solid color-mix(in srgb, var(--fj-accent) 55%, white); outline-offset: 3px; }
.fj-aac-order { position: absolute; z-index: 4; top: 8px; right: 8px; display: grid; place-items: center; width: 22px; height: 22px; background: #FFFDF8; border: 1px solid var(--fj-aac-tone); border-radius: 50%; box-shadow: 0 1px 4px rgba(59,50,38,0.12); color: var(--fj-ink); font-family: var(--fj-font-data); font-size: 9px; font-weight: 600; }

.fj-aac-tone--starter { --fj-aac-tone: #A86E22; --fj-aac-tone-soft: rgba(196,151,62,0.14); }
.fj-aac-tone--activity { --fj-aac-tone: #5F733C; --fj-aac-tone-soft: rgba(122,139,78,0.14); }
.fj-aac-tone--care { --fj-aac-tone: #4F7180; --fj-aac-tone-soft: rgba(79,113,128,0.13); }

@media (max-width: 820px) {
  .fj-aac-topbar { grid-template-columns: minmax(0, 1fr) minmax(220px, 260px); }
  .fj-aac-groups { grid-template-columns: 1fr; }
  .fj-aac-tone--starter .fj-aac-card-grid, .fj-aac-tone--care .fj-aac-card-grid { max-width: 430px; }
}
@media (max-width: 600px) {
  .fj-aac-topbar { grid-template-columns: 1fr; gap: 12px; }
  .fj-aac-composer-head { align-items: stretch; flex-direction: column; }
  .fj-aac-tools { width: 100%; }
  .fj-aac-tool { flex: 1; }
  .fj-aac-strip-meta { justify-content: space-between; }
  .fj-aac-empty { align-items: flex-start; flex-direction: column; }
  .fj-aac-empty-slots i { width: 32px; }
  .fj-aac-tone--activity .fj-aac-card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .fj-aac-card { min-height: 212px; }
  .fj-aac-art { width: min(76%, 112px); }
}
@media (prefers-reduced-motion: reduce) {
  .fj-aac-card, .fj-aac-token, .fj-aac-tool { transition: none; }
  .fj-aac-card:hover, .fj-aac-token:hover { transform: none; }
}
`);
