import { createContext, useContext, useEffect, useMemo } from 'react';
import { LANGUAGES, T } from './translations.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.jsx';

const I18nContext = createContext(null);

const detect = () => {
  const nav = (navigator.language || 'ru').slice(0, 2);
  return T[nav] ? nav : 'ru';
};

export function I18nProvider({ children }) {
  const [lang, setLang] = useLocalStorage('skycast-lang', detect());

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t: T[lang] || T.ru,
    locale: LANGUAGES.find((l) => l.code === lang)?.locale || 'ru-RU',
  }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
