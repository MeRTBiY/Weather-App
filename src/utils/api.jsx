// Open-Meteo: бесплатно, без API-ключа
const API = 'https://api.open-meteo.com/v1/forecast';

async function get(params, signal) {
  const res = await fetch(`${API}?${new URLSearchParams(params)}`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Текущая погода для всех городов одним запросом
export async function fetchAllCurrent(cities, signal) {
  const data = await get({
    latitude: cities.map((c) => c.lat).join(','),
    longitude: cities.map((c) => c.lon).join(','),
    current: 'temperature_2m,weather_code,is_day,wind_speed_10m',
    timezone: 'auto',
  }, signal);
  const list = Array.isArray(data) ? data : [data];
  return Object.fromEntries(cities.map((c, i) => [c.id, list[i]?.current]));
}

// Подробный прогноз с кэшем на 10 минут → повторное переключение города мгновенное
const cache = new Map();
const TTL = 10 * 60 * 1000;

export async function fetchForecast(city, signal) {
  const hit = cache.get(city.id);
  if (hit && Date.now() - hit.at < TTL) return hit.data;
  const data = await get({
    latitude: city.lat,
    longitude: city.lon,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,cloud_cover',
    hourly: 'temperature_2m,weather_code,is_day,precipitation_probability',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: 7,
  }, signal);
  cache.set(city.id, { at: Date.now(), data });
  return data;
}
