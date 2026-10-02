import { REGIONS, CITIES } from '../data/cities.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';
import CityCard from './CityCard.jsx';

const chip = (on, onClass = 'bg-white text-slate-900') =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${on ? onClass : 'bg-white/10 text-white/80 hover:bg-white/20'}`;

export default function CityGrid({ cities, current, unit, selectedId, favorites, region, setRegion, onlyFav, setOnlyFav, onSelect, onToggleFavorite, updatedAt }) {
  const { t, locale } = useI18n();
  return (
    <section className="mt-10">
      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t.cities}</h2>
          <p className="text-sm text-white/60">
            {cities.length} {t.of} {CITIES.length} · {updatedAt ? `${t.updated} ${updatedAt.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}` : t.loading}
          </p>
        </div>
        {/* flex-wrap: фильтры переносятся на новую строку вместо горизонтального скролла */}
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setOnlyFav((v) => !v)} className={chip(onlyFav, 'bg-amber-300 text-slate-900')}>★ {t.favorites}</button>
          {REGIONS.map((r) => (
            <button type="button" key={r} onClick={() => setRegion(r)} className={chip(region === r)}>{t.regions[r]}</button>
          ))}
        </div>
      </div>

      {cities.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {cities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              weather={current[city.id]}
              unit={unit}
              active={city.id === selectedId}
              favorite={favorites.includes(city.id)}
              onSelect={onSelect}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/60">{t.noResults} 🔭</div>
      )}
    </section>
  );
}
