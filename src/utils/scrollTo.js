export const scrollTo = (id, delay = 120) =>
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), delay);
