import React from 'react';

export default function DeepTechQualityBoard({ content }) {
  return (
    <div className="deeptech-quality-board">
      <div className="deeptech-quality-note">{content.note}</div>
      <div className="deeptech-quality-grid">
        {content.cards.map(card => (
          <article className="deeptech-quality-card" key={card.label} tabIndex={0}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <p>{card.caption}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
