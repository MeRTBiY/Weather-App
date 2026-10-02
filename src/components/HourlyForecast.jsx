import { useMemo } from 'react';
import { weatherInfo, formatTemp } from '../utils/weather.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

// 24 часа с шагом 3 часа в виде сетки — без горизонтальной прокрутки
export default function HourlyForecast({ data, unit }) {
  const { t, lang } = useI18n();

  const hours = useMemo(() => {
    const { hourly, current } = data;
    const start = Math.max(0, hourly.time.findIndex((x) => x.slice(0, 13) === current.time.slice(0, 13)));
    const out = [];
    for (let i = start; i <= start + 21 && i < hourly.time.length; i += 3) {
      out.push({
        key: hourly.time[i],
        time: i === start ? null : hourly.time[i].slice(11, 16),
        temp: hourly.temperature_2m[i],
        code: hourly.weather_code[i],
        isDay: hourly.is_day[i],
        rain: hourly.precipitation_probability[i] ?? 0,
      });
    }
    return out;
  }, [data]);

  return (
    <section className="min-w-0 rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl animate-fade-up sm:p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/60">{t.hourly}</h3>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
        {hours.map((h, i) => (
          <div key={h.key} className={`flex min-w-0 flex-col items-center gap-1.5 rounded-2xl px-1 py-3 ${i === 0 ? 'bg-white/25 ring-1 ring-white/30' : 'bg-white/5'}`}>
            <span className="text-xs text-white/70">{h.time ?? t.now}</span>
            <span className="text-2xl">{weatherInfo(h.code, h.isDay, lang).icon}</span>
            <span className="font-semibold">{formatTemp(h.temp, unit)}</span>
            <span className="text-[10px] text-sky-200">💧 {h.rain}%</span>
          </div>
        ))}
      </div>
    </section>
  );
}
