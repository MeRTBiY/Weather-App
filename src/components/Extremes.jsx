import { CITIES } from '../data/cities.jsx';
import { formatTemp } from '../utils/weather.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

function Card({ city, temp, label, className, onClick, unit, lang }) {
  return (
    <button type="button" onClick={() => onClick(city.id)} className={`min-w-0 rounded-3xl border border-white/10 p-4 text-left transition hover:scale-[1.02] ${className}`}>
      <div className="text-xs text-white/70">{label}</div>
      <div className="mt-1 truncate font-bold">{city.flag} {city.names[lang]}</div>
      <div className="text-2xl font-light">{formatTemp(temp, unit, true)}</div>
    </button>
  );
}

export default function Extremes({ current, unit, onSelect }) {
  const { t, lang } = useI18n();
  const list = CITIES.filter((c) => current[c.id]);
  if (!list.length) return null;
  let hot = list[0], cold = list[0];
  for (const c of list) {
    if (current[c.id].temperature_2m > current[hot.id].temperature_2m) hot = c;
    if (current[c.id].temperature_2m < current[cold.id].temperature_2m) cold = c;
  }
  const p = { unit, lang, onClick: onSelect };
  return (
    <div className="grid grid-cols-2 gap-3 animate-fade-up">
      <Card {...p} city={hot} temp={current[hot.id].temperature_2m} label={`🔥 ${t.warmest}`} className="bg-gradient-to-br from-orange-400/30 to-rose-500/30" />
      <Card {...p} city={cold} temp={current[cold.id].temperature_2m} label={`🧊 ${t.coldest}`} className="bg-gradient-to-br from-sky-400/30 to-indigo-500/30" />
    </div>
  );
}
