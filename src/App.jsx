import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { CITIES, CITY_BY_ID, normalize } from './data/cities.jsx';
import { fetchAllCurrent, fetchForecast } from './utils/api.jsx';
import { weatherInfo } from './utils/weather.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.jsx';
import { useI18n } from './i18n/I18nProvider.jsx';
import Background from './components/Background.jsx';
import Header from './components/Header.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import HourlyForecast from './components/HourlyForecast.jsx';
import DailyForecast from './components/DailyForecast.jsx';
import Extremes from './components/Extremes.jsx';
import CityGrid from './components/CityGrid.jsx';
import { Loader, ErrorBox } from './components/Status.jsx';

const REFRESH_MS = 10 * 60 * 1000;

export default function App() {
  const { t } = useI18n();
  const [unit, setUnit] = useLocalStorage('skycast-unit', 'C');
  const [favorites, setFavorites] = useLocalStorage('skycast-favs', ['bratislava', 'budapest']);
  const [selectedId, setSelectedId] = useLocalStorage('skycast-city', 'bratislava');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');
  const [onlyFav, setOnlyFav] = useState(false);

  const [current, setCurrent] = useState({});
  const [updatedAt, setUpdatedAt] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [reload, setReload] = useState(0);

  const selected = CITY_BY_ID[selectedId] || CITIES[0];

  // Текущая погода по всем городам + автообновление
  useEffect(() => {
    const ctrl = new AbortController();
    const load = () => fetchAllCurrent(CITIES, ctrl.signal)
      .then((d) => { setCurrent(d); setUpdatedAt(new Date()); })
      .catch(() => {});
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => { ctrl.abort(); clearInterval(id); };
  }, []);

  // Прогноз выбранного города (с отменой устаревших запросов)
  useEffect(() => {
    const ctrl = new AbortController();
    setStatus((s) => (s === 'ready' ? 'ready' : 'loading'));
    fetchForecast(selected, ctrl.signal)
      .then((d) => { setForecast(d); setStatus('ready'); })
      .catch((e) => { if (e.name !== 'AbortError') setStatus('error'); });
    return () => ctrl.abort();
  }, [selected, reload]);

  // useDeferredValue: ввод в поиске не блокируется перерисовкой сетки
  const deferredSearch = useDeferredValue(search);
  const visibleCities = useMemo(() => {
    const q = normalize(deferredSearch);
    return CITIES
      .filter((c) => (region === 'all' || c.region === region)
        && (!onlyFav || favorites.includes(c.id))
        && (!q || c.searchIndex.includes(q)))
      .sort((a, b) => favorites.includes(b.id) - favorites.includes(a.id));
  }, [deferredSearch, region, onlyFav, favorites]);

  const selectCity = useCallback((id) => {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setSelectedId]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }, [setFavorites]);

  const theme = forecast ? weatherInfo(forecast.current.weather_code, forecast.current.is_day).theme : 'night';

  return (
    <div className="relative isolate min-h-dvh w-full overflow-x-hidden">
      <Background theme={theme} />
      <div className="w-full px-4 py-6 sm:px-6 lg:px-10 lg:py-8 2xl:px-16">
        <Header search={search} setSearch={setSearch} onSelectCity={selectCity} unit={unit} setUnit={setUnit} />

        {/* minmax(0,1fr) не даёт контенту растягивать колонку шире экрана */}
        <main className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div className="min-w-0 space-y-6">
            {status === 'error' ? <ErrorBox onRetry={() => setReload((n) => n + 1)} />
              : !forecast ? <Loader />
              : (
                <>
                  <CurrentWeather city={selected} data={forecast} unit={unit} />
                  <HourlyForecast data={forecast} unit={unit} />
                </>
              )}
          </div>
          <aside className="min-w-0 space-y-6">
            {forecast && status !== 'error' && <DailyForecast data={forecast} unit={unit} />}
            <Extremes current={current} unit={unit} onSelect={selectCity} />
          </aside>
        </main>

        <CityGrid
          cities={visibleCities}
          current={current}
          unit={unit}
          selectedId={selected.id}
          favorites={favorites}
          region={region}
          setRegion={setRegion}
          onlyFav={onlyFav}
          setOnlyFav={setOnlyFav}
          onSelect={selectCity}
          onToggleFavorite={toggleFavorite}
          updatedAt={updatedAt}
        />

        <footer className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-center text-xs text-white/50 md:flex-row">
          <span>© {new Date().getFullYear()} Skycast.eu — {t.footer}</span>
          <span>React · Tailwind CSS · {t.data} <a className="underline hover:text-white" href="https://open-meteo.com" target="_blank" rel="noreferrer">Open-Meteo</a></span>
        </footer>
      </div>
    </div>
  );
}
