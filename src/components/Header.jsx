import { LANGUAGES } from '../i18n/translations.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';
import SearchBox from './SearchBox.jsx';

function Segmented({ options, value, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="flex shrink-0 rounded-2xl border border-white/15 bg-white/10 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${value === o.value ? 'bg-white text-slate-900 shadow' : 'text-white/70 hover:text-white'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function Header({ search, setSearch, onSelectCity, unit, setUnit }) {
  const { t, lang, setLang } = useI18n();
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 text-2xl ring-1 ring-white/20">🌍</div>
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold tracking-tight">Skycast<span className="text-white/60">.eu</span></h1>
          <p className="truncate text-xs text-white/60">{t.tagline}</p>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto lg:flex-nowrap">
        <div className="min-w-0 flex-1 basis-full sm:basis-auto lg:w-96 lg:flex-none">
          <SearchBox value={search} onChange={setSearch} onSelect={onSelectCity} />
        </div>
        <Segmented label="Language" value={lang} onChange={setLang} options={LANGUAGES.map((l) => ({ value: l.code, label: l.label }))} />
        <Segmented label="Units" value={unit} onChange={setUnit} options={[{ value: 'C', label: '°C' }, { value: 'F', label: '°F' }]} />
      </div>
    </header>
  );
}
