import { useLang } from '../../../app/providers/LanguageProvider.jsx';

// Launch-OS i18n contract (spec 3.3): modules declare COPY = { en: {...}, zh: {...} }
// and read the active branch via `t`. Language switching stays at the page level.
export function useI18n(copy) {
    const { lang } = useLang();
    return { lang, t: copy ? (copy[lang] ?? copy.en) : undefined };
}
