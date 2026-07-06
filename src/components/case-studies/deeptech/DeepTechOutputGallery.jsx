import React from 'react';

function OutputVisual({ type }) {
  if (type === 'map') {
    return (
      <div className="deeptech-output-visual is-map" aria-hidden="true">
        <i style={{ '--x': '28%', '--y': '34%' }} />
        <i style={{ '--x': '58%', '--y': '24%' }} />
        <i style={{ '--x': '72%', '--y': '62%' }} />
        <i style={{ '--x': '40%', '--y': '74%' }} />
      </div>
    );
  }

  if (type === 'dashboard') {
    return (
      <div className="deeptech-output-visual is-dashboard" aria-hidden="true">
        <span style={{ '--h': '58%' }} />
        <span style={{ '--h': '82%' }} />
        <span style={{ '--h': '44%' }} />
        <span style={{ '--h': '70%' }} />
      </div>
    );
  }

  return (
    <div className={`deeptech-output-visual is-${type}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export default function DeepTechOutputGallery({ content }) {
  return (
    <div className="deeptech-output-gallery">
      {content.artifacts.map((artifact, index) => (
        <article className={`deeptech-output-card card-${index + 1}`} key={artifact.title}>
          <OutputVisual type={artifact.type} />
          <h3>{artifact.title}</h3>
          <p>{artifact.desc}</p>
        </article>
      ))}

      <article className="deeptech-output-dictionary">
        <span>{content.dictionaryTitle}</span>
        {content.dictionary.map(([label, value]) => (
          <div key={label}>
            <code>{label}</code>
            <strong>{value}</strong>
          </div>
        ))}
      </article>
    </div>
  );
}
