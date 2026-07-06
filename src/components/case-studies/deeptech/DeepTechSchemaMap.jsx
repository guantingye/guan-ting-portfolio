import React from 'react';

const tablePositions = [
  [7, 11],
  [36, 5],
  [67, 11],
  [8, 52],
  [37, 46],
  [67, 52],
  [24, 78],
  [58, 80],
];

export default function DeepTechSchemaMap({ content }) {
  return (
    <div className="deeptech-schema-map">
      <div className="deeptech-schema-canvas">
        <svg className="deeptech-schema-lines" viewBox="0 0 1000 640" role="img" aria-labelledby="deeptech-schema-title deeptech-schema-desc">
          <title id="deeptech-schema-title">DeepTech relational schema map</title>
          <desc id="deeptech-schema-desc">A conceptual relational model connecting company entities, aliases, sources, raw rows, source evidence, profiles, tags, and update logs.</desc>
          <path d="M185 145 C330 115, 395 124, 475 90" />
          <path d="M185 145 C352 242, 420 304, 500 330" />
          <path d="M790 145 C735 228, 690 287, 623 348" />
          <path d="M790 145 C714 116, 648 105, 585 90" />
          <path d="M500 330 C438 438, 360 506, 315 560" />
          <path d="M500 330 C560 440, 610 502, 690 562" />
          <path d="M790 145 C820 268, 816 410, 712 562" />
        </svg>
        {content.tables.map((table, index) => {
          const [x, y] = tablePositions[index];

          return (
            <article
              className="deeptech-schema-table-card"
              key={table.name}
              style={{ '--table-x': `${x}%`, '--table-y': `${y}%` }}
              tabIndex={0}
            >
              <strong>{table.name}</strong>
              {table.fields.map(field => <code key={field}>{field}</code>)}
            </article>
          );
        })}
      </div>

      <aside className="deeptech-schema-explainer">
        <p>{content.body}</p>
        <div>
          {content.relations.map(relation => <span key={relation}>{relation}</span>)}
        </div>
      </aside>
    </div>
  );
}
