import { useMemo, useRef, useState } from 'react';
import { CITIES, COUNTRIES, normalize } from '../data/cities.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

// Поиск с выпадающими подсказками: ↑/↓ — выбор, Enter — открыть, Esc — закрыть
export default function SearchBox({ value, onChange, onSelect }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const q = normalize(value);
    if (!q) return [];
    return CITIES.filter((c) => c.searchIndex.includes(q)).slice(0, 7);
  }, [value]);

  const choose = (city) => {
    onSelect(city.id);
    onChange('');
    setOpen(false);
    inputRef.current?.blur();
  };

  const onKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => (i + 1) % results.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => (i - 1 + results.length) % results.length); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(results[active] || results[0]); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="relative w-full min-w-0">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50">🔍</span>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => { onChange(e.target.value); setActive(0); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        placeholder={t.searchPlaceholder}
        aria-label={t.searchPlaceholder}
        autoComplete="off"
        className="w-full rounded-2xl border border-white/15 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder-white/50 outline-none transition focus:border-white/40 focus:bg-white/15 [&::-webkit-search-cancel-button]:invert"
      />
      {open && value.trim() && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/95 shadow-2xl backdrop-blur-xl">
          {results.length ? results.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); choose(c); }}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition ${i === active ? 'bg-white/15' : ''}`}
              >
                <span className="text-lg">{c.flag}</span>
                <span className="font-semibold">{c.names[lang]}</span>
                <span className="truncate text-white/50">{COUNTRIES[c.country][lang]}</span>
              </button>
            </li>
          )) : <li className="px-4 py-3 text-sm text-white/60">{t.noResults}</li>}
        </ul>
      )}
    </div>
  );
}
