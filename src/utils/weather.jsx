// WMO-коды Open-Meteo → [иконка день, иконка ночь, тема, ru, en, sk]
const CODES = {
  0: ['☀️', '🌙', 'clear', 'Ясно', 'Clear sky', 'Jasno'],
  1: ['🌤️', '🌙', 'clear', 'Преимущественно ясно', 'Mainly clear', 'Prevažne jasno'],
  2: ['⛅', '☁️', 'cloudy', 'Переменная облачность', 'Partly cloudy', 'Polojasno'],
  3: ['☁️', '☁️', 'cloudy', 'Пасмурно', 'Overcast', 'Zamračené'],
  45: ['🌫️', '🌫️', 'fog', 'Туман', 'Fog', 'Hmla'],
  48: ['🌫️', '🌫️', 'fog', 'Изморозь', 'Rime fog', 'Námraza'],
  51: ['🌦️', '🌧️', 'rain', 'Лёгкая морось', 'Light drizzle', 'Slabé mrholenie'],
  53: ['🌦️', '🌧️', 'rain', 'Морось', 'Drizzle', 'Mrholenie'],
  55: ['🌧️', '🌧️', 'rain', 'Сильная морось', 'Dense drizzle', 'Silné mrholenie'],
  56: ['🌧️', '🌧️', 'rain', 'Ледяная морось', 'Freezing drizzle', 'Mrznúce mrholenie'],
  57: ['🌧️', '🌧️', 'rain', 'Ледяная морось', 'Freezing drizzle', 'Mrznúce mrholenie'],
  61: ['🌦️', '🌧️', 'rain', 'Небольшой дождь', 'Light rain', 'Slabý dážď'],
  63: ['🌧️', '🌧️', 'rain', 'Дождь', 'Rain', 'Dážď'],
  65: ['🌧️', '🌧️', 'rain', 'Сильный дождь', 'Heavy rain', 'Silný dážď'],
  66: ['🌧️', '🌧️', 'rain', 'Ледяной дождь', 'Freezing rain', 'Mrznúci dážď'],
  67: ['🌧️', '🌧️', 'rain', 'Ледяной дождь', 'Freezing rain', 'Mrznúci dážď'],
  71: ['🌨️', '🌨️', 'snow', 'Небольшой снег', 'Light snow', 'Slabé sneženie'],
  73: ['🌨️', '🌨️', 'snow', 'Снег', 'Snow', 'Sneženie'],
  75: ['❄️', '❄️', 'snow', 'Сильный снег', 'Heavy snow', 'Silné sneženie'],
  77: ['🌨️', '🌨️', 'snow', 'Снежные зёрна', 'Snow grains', 'Snehové zrná'],
  80: ['🌦️', '🌧️', 'rain', 'Ливень', 'Rain showers', 'Prehánky'],
  81: ['🌧️', '🌧️', 'rain', 'Ливни', 'Heavy showers', 'Silné prehánky'],
  82: ['⛈️', '⛈️', 'storm', 'Сильный ливень', 'Violent showers', 'Prudké prehánky'],
  85: ['🌨️', '🌨️', 'snow', 'Снегопад', 'Snow showers', 'Snehové prehánky'],
  86: ['❄️', '❄️', 'snow', 'Сильный снегопад', 'Heavy snow showers', 'Silné snehové prehánky'],
  95: ['⛈️', '⛈️', 'storm', 'Гроза', 'Thunderstorm', 'Búrka'],
  96: ['⛈️', '⛈️', 'storm', 'Гроза с градом', 'Thunderstorm with hail', 'Búrka s krupobitím'],
  99: ['⛈️', '⛈️', 'storm', 'Гроза с сильным градом', 'Severe hailstorm', 'Silná búrka s krupobitím'],
};
const LANG_IDX = { ru: 3, en: 4, sk: 5 };

export function weatherInfo(code, isDay = 1, lang = 'ru') {
  const c = CODES[code] || ['🌡️', '🌡️', 'cloudy', '—', '—', '—'];
  const night = !isDay;
  return {
    icon: night ? c[1] : c[0],
    theme: night && c[2] === 'clear' ? 'night' : c[2],
    label: c[LANG_IDX[lang] ?? 3],
  };
}

export const THEMES = {
  clear: { bg: 'from-sky-500 via-indigo-600 to-violet-900', a: 'bg-amber-300', b: 'bg-pink-500' },
  night: { bg: 'from-slate-900 via-indigo-950 to-black', a: 'bg-indigo-600', b: 'bg-purple-800' },
  cloudy: { bg: 'from-slate-600 via-slate-800 to-gray-950', a: 'bg-slate-400', b: 'bg-blue-600' },
  fog: { bg: 'from-gray-500 via-slate-700 to-zinc-950', a: 'bg-gray-300', b: 'bg-slate-500' },
  rain: { bg: 'from-blue-800 via-slate-800 to-gray-950', a: 'bg-cyan-500', b: 'bg-blue-700' },
  snow: { bg: 'from-sky-400 via-blue-700 to-indigo-950', a: 'bg-white', b: 'bg-cyan-300' },
  storm: { bg: 'from-gray-800 via-purple-950 to-black', a: 'bg-yellow-400', b: 'bg-purple-700' },
};

// Единицы измерения
export const toUnit = (c, unit) => (unit === 'F' ? (c * 9) / 5 + 32 : c);
export const formatTemp = (c, unit, withUnit = false) =>
  c == null ? '—' : `${Math.round(toUnit(c, unit))}°${withUnit ? unit : ''}`;
export const formatWind = (kmh, unit, t) =>
  unit === 'F' ? `${Math.round(kmh * 0.621371)} ${t.mph}` : `${Math.round(kmh)} ${t.kmh}`;
export const formatPressure = (hpa, lang, t) =>
  `${Math.round(lang === 'ru' ? hpa * 0.750062 : hpa)} ${t.pressureUnit}`;
export const windDir = (deg, t) => t.windDirs[Math.round(deg / 45) % 8];
