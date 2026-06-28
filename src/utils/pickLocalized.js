export const loc = (obj, field, lang) =>
    (lang === 'zh' && obj['zh' + field.charAt(0).toUpperCase() + field.slice(1)]) || obj[field];
