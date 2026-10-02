import { memo } from 'react';
import { COUNTRIES } from '../data/cities.jsx';
import { weatherInfo, formatTemp, formatWind } from '../utils/weather.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

// memo: карточка перерисовывается только при изменении своих данных
function CityCard({ city, weather, unit, active, favorite, onSelect, onToggleFavorite }) {
  const { t, lang } = useI18n();
  const info = weather ? weatherInfo(weather.weather_code, weather.is_day, lang) : null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(city.id)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(city.id)}
      className={`group relative min-w-0 cursor-pointer rounded-3xl border p-4 transition-[transform,background-color,border-color] duration-200 animate-fade-up hover:-translate-y-0.5 ${
        active ? 'border-white/60 bg-white/25' : 'border-white/10 bg-white/10 hover:bg-white/[0.16]'
      }`}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(city.id); }}
        title={favorite ? t.removeFav : t.addFav}
        aria-label={favorite ? t.removeFav : t.addFav}
        className={`absolute right-3 top-3 text-lg leading-none transition ${favorite ? 'text-amber-300' : 'text-white/30 group-hover:text-white/80'}`}
      >
        {favorite ? '★' : '☆'}
      </button>
      <div className="flex min-w-0 items-center gap-2 pr-6 text-xs text-white/60">
        <span className="text-base">{city.flag}</span>
        <span className="truncate">{COUNTRIES[city.country][lang]}</span>
      </div>
      <h3 className="mt-1 truncate text-lg font-bold">{city.names[lang]}</h3>
      <div className="mt-3 flex items-end justify-between gap-2">
        {weather ? (
          <>
            <span className="text-3xl font-light tracking-tighter sm:text-4xl">{formatTemp(weather.temperature_2m, unit, true)}</span>
            <span className="text-3xl sm:text-4xl">{info.icon}</span>
          </>
        ) : (
          <div className="h-10 w-full animate-pulse rounded-xl bg-white/10" />
        )}
      </div>
      {weather && (
        <div className="mt-2 flex justify-between gap-2 text-[11px] text-white/60">
          <span className="truncate">{info.label}</span>
          <span className="shrink-0">💨 {formatWind(weather.wind_speed_10m, unit, t)}</span>
        </div>
      )}
    </div>
  );
}
export default memo(CityCard);
