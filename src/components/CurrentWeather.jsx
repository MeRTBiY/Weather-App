import { COUNTRIES } from '../data/cities.jsx';
import { weatherInfo, formatTemp, formatWind, formatPressure, windDir } from '../utils/weather.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

function Stat({ icon, label, value }) {
  return (
    <div className="min-w-0 rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
      <div className="truncate text-xs text-white/60">{icon} {label}</div>
      <div className="mt-1 truncate text-base font-semibold sm:text-lg">{value}</div>
    </div>
  );
}

export default function CurrentWeather({ city, data, unit }) {
  const { t, lang, locale } = useI18n();
  const c = data.current;
  const d = data.daily;
  const info = weatherInfo(c.weather_code, c.is_day, lang);
  const hhmm = (iso) => iso.slice(11, 16);
  const localTime = new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', timeZone: data.timezone });

  return (
    <section className="min-w-0 rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl animate-fade-up sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 text-sm text-white/70">
            <span className="text-xl">{city.flag}</span>
            <span>{COUNTRIES[city.country][lang]}</span>
            <span>· {localTime} {t.localTime}</span>
          </div>
          <h2 className="mt-1 truncate text-4xl font-extrabold tracking-tight sm:text-5xl">{city.names[lang]}</h2>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-7xl font-thin leading-none tracking-tighter sm:text-8xl">{formatTemp(c.temperature_2m, unit, true)}</span>
            <div>
              <div className="text-lg font-medium">{info.label}</div>
              <div className="text-sm text-white/60">{t.feelsLike} {formatTemp(c.apparent_temperature, unit, true)}</div>
              <div className="text-sm text-white/60">↑ {formatTemp(d.temperature_2m_max[0], unit)} · ↓ {formatTemp(d.temperature_2m_min[0], unit)}</div>
            </div>
          </div>
        </div>
        <div className="hidden shrink-0 text-[8rem] leading-none animate-float sm:block md:text-[10rem]">{info.icon}</div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <Stat icon="💧" label={t.humidity} value={`${c.relative_humidity_2m}%`} />
        <Stat icon="💨" label={t.wind} value={`${formatWind(c.wind_speed_10m, unit, t)} ${windDir(c.wind_direction_10m, t)}`} />
        <Stat icon="🧭" label={t.pressure} value={formatPressure(c.pressure_msl, lang, t)} />
        <Stat icon="☁️" label={t.clouds} value={`${c.cloud_cover}%`} />
        <Stat icon="🌅" label={t.sunrise} value={hhmm(d.sunrise[0])} />
        <Stat icon="🌇" label={t.sunset} value={hhmm(d.sunset[0])} />
      </div>
    </section>
  );
}
