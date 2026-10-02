import { weatherInfo, formatTemp } from '../utils/weather.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

export default function DailyForecast({ data, unit }) {
  const { t, lang, locale } = useI18n();
  const d = data.daily;
  const lo = Math.min(...d.temperature_2m_min);
  const range = Math.max(...d.temperature_2m_max) - lo || 1;

  return (
    <section className="min-w-0 rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl animate-fade-up sm:p-6">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/60">{t.daily}</h3>
      <ul className="divide-y divide-white/10">
        {d.time.map((day, i) => {
          const info = weatherInfo(d.weather_code[i], 1, lang);
          const min = d.temperature_2m_min[i], max = d.temperature_2m_max[i];
          const name = i === 0 ? t.today : new Date(`${day}T12:00`).toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'numeric' });
          return (
            <li key={day} className="grid grid-cols-[minmax(0,5.5rem)_2rem_2.75rem_minmax(0,1fr)] items-center gap-2 py-3 text-sm sm:gap-3">
              <span className="truncate font-medium capitalize">{name}</span>
              <span className="text-xl" title={info.label}>{info.icon}</span>
              <span className="text-xs text-sky-200">💧{d.precipitation_probability_max[i] ?? 0}%</span>
              <div className="flex min-w-0 items-center gap-2">
                <span className="w-9 shrink-0 text-right text-white/60">{formatTemp(min, unit)}</span>
                <div className="relative h-1.5 min-w-0 flex-1 rounded-full bg-white/10">
                  <div
                    className="absolute inset-y-0 rounded-full bg-gradient-to-r from-sky-300 via-amber-300 to-rose-400"
                    style={{ left: `${((min - lo) / range) * 100}%`, right: `${100 - ((max - lo) / range) * 100}%` }}
                  />
                </div>
                <span className="w-9 shrink-0 font-semibold">{formatTemp(max, unit)}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-xs text-white/50">☀️ {t.uv}: {Math.round(d.uv_index_max[0])}</p>
    </section>
  );
}
