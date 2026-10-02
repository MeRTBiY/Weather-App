// Страны: флаг + название на трёх языках
export const COUNTRIES = {
  GB: { flag: '🇬🇧', ru: 'Великобритания', en: 'United Kingdom', sk: 'Spojené kráľovstvo' },
  IE: { flag: '🇮🇪', ru: 'Ирландия', en: 'Ireland', sk: 'Írsko' },
  FR: { flag: '🇫🇷', ru: 'Франция', en: 'France', sk: 'Francúzsko' },
  NL: { flag: '🇳🇱', ru: 'Нидерланды', en: 'Netherlands', sk: 'Holandsko' },
  BE: { flag: '🇧🇪', ru: 'Бельгия', en: 'Belgium', sk: 'Belgicko' },
  LU: { flag: '🇱🇺', ru: 'Люксембург', en: 'Luxembourg', sk: 'Luxembursko' },
  DE: { flag: '🇩🇪', ru: 'Германия', en: 'Germany', sk: 'Nemecko' },
  AT: { flag: '🇦🇹', ru: 'Австрия', en: 'Austria', sk: 'Rakúsko' },
  CH: { flag: '🇨🇭', ru: 'Швейцария', en: 'Switzerland', sk: 'Švajčiarsko' },
  CZ: { flag: '🇨🇿', ru: 'Чехия', en: 'Czechia', sk: 'Česko' },
  HU: { flag: '🇭🇺', ru: 'Венгрия', en: 'Hungary', sk: 'Maďarsko' },
  SK: { flag: '🇸🇰', ru: 'Словакия', en: 'Slovakia', sk: 'Slovensko' },
  PL: { flag: '🇵🇱', ru: 'Польша', en: 'Poland', sk: 'Poľsko' },
  SI: { flag: '🇸🇮', ru: 'Словения', en: 'Slovenia', sk: 'Slovinsko' },
  ES: { flag: '🇪🇸', ru: 'Испания', en: 'Spain', sk: 'Španielsko' },
  PT: { flag: '🇵🇹', ru: 'Португалия', en: 'Portugal', sk: 'Portugalsko' },
  IT: { flag: '🇮🇹', ru: 'Италия', en: 'Italy', sk: 'Taliansko' },
  GR: { flag: '🇬🇷', ru: 'Греция', en: 'Greece', sk: 'Grécko' },
  MT: { flag: '🇲🇹', ru: 'Мальта', en: 'Malta', sk: 'Malta' },
  HR: { flag: '🇭🇷', ru: 'Хорватия', en: 'Croatia', sk: 'Chorvátsko' },
  SE: { flag: '🇸🇪', ru: 'Швеция', en: 'Sweden', sk: 'Švédsko' },
  NO: { flag: '🇳🇴', ru: 'Норвегия', en: 'Norway', sk: 'Nórsko' },
  DK: { flag: '🇩🇰', ru: 'Дания', en: 'Denmark', sk: 'Dánsko' },
  FI: { flag: '🇫🇮', ru: 'Финляндия', en: 'Finland', sk: 'Fínsko' },
  IS: { flag: '🇮🇸', ru: 'Исландия', en: 'Iceland', sk: 'Island' },
  LV: { flag: '🇱🇻', ru: 'Латвия', en: 'Latvia', sk: 'Lotyšsko' },
  LT: { flag: '🇱🇹', ru: 'Литва', en: 'Lithuania', sk: 'Litva' },
  EE: { flag: '🇪🇪', ru: 'Эстония', en: 'Estonia', sk: 'Estónsko' },
  UA: { flag: '🇺🇦', ru: 'Украина', en: 'Ukraine', sk: 'Ukrajina' },
  RO: { flag: '🇷🇴', ru: 'Румыния', en: 'Romania', sk: 'Rumunsko' },
  BG: { flag: '🇧🇬', ru: 'Болгария', en: 'Bulgaria', sk: 'Bulharsko' },
  RS: { flag: '🇷🇸', ru: 'Сербия', en: 'Serbia', sk: 'Srbsko' },
  MD: { flag: '🇲🇩', ru: 'Молдова', en: 'Moldova', sk: 'Moldavsko' },
  TR: { flag: '🇹🇷', ru: 'Турция', en: 'Turkey', sk: 'Turecko' },
};

// [id, страна, регион, lat, lon, ru, en, sk]
const RAW = [
  ['london', 'GB', 'west', 51.5074, -0.1278, 'Лондон', 'London', 'Londýn'],
  ['manchester', 'GB', 'west', 53.4808, -2.2426, 'Манчестер', 'Manchester', 'Manchester'],
  ['edinburgh', 'GB', 'west', 55.9533, -3.1883, 'Эдинбург', 'Edinburgh', 'Edinburgh'],
  ['dublin', 'IE', 'west', 53.3498, -6.2603, 'Дублин', 'Dublin', 'Dublin'],
  ['paris', 'FR', 'west', 48.8566, 2.3522, 'Париж', 'Paris', 'Paríž'],
  ['lyon', 'FR', 'west', 45.764, 4.8357, 'Лион', 'Lyon', 'Lyon'],
  ['marseille', 'FR', 'west', 43.2965, 5.3698, 'Марсель', 'Marseille', 'Marseille'],
  ['amsterdam', 'NL', 'west', 52.3676, 4.9041, 'Амстердам', 'Amsterdam', 'Amsterdam'],
  ['rotterdam', 'NL', 'west', 51.9244, 4.4777, 'Роттердам', 'Rotterdam', 'Rotterdam'],
  ['brussels', 'BE', 'west', 50.8503, 4.3517, 'Брюссель', 'Brussels', 'Brusel'],
  ['luxembourg', 'LU', 'west', 49.6116, 6.1319, 'Люксембург', 'Luxembourg', 'Luxemburg'],

  ['berlin', 'DE', 'central', 52.52, 13.405, 'Берлин', 'Berlin', 'Berlín'],
  ['hamburg', 'DE', 'central', 53.5511, 9.9937, 'Гамбург', 'Hamburg', 'Hamburg'],
  ['munich', 'DE', 'central', 48.1351, 11.582, 'Мюнхен', 'Munich', 'Mníchov'],
  ['frankfurt', 'DE', 'central', 50.1109, 8.6821, 'Франкфурт', 'Frankfurt', 'Frankfurt'],
  ['cologne', 'DE', 'central', 50.9375, 6.9603, 'Кёльн', 'Cologne', 'Kolín'],
  ['vienna', 'AT', 'central', 48.2082, 16.3738, 'Вена', 'Vienna', 'Viedeň'],
  ['zurich', 'CH', 'central', 47.3769, 8.5417, 'Цюрих', 'Zurich', 'Zürich'],
  ['geneva', 'CH', 'central', 46.2044, 6.1432, 'Женева', 'Geneva', 'Ženeva'],
  ['prague', 'CZ', 'central', 50.0755, 14.4378, 'Прага', 'Prague', 'Praha'],
  ['budapest', 'HU', 'central', 47.4979, 19.0402, 'Будапешт', 'Budapest', 'Budapešť'],
  ['bratislava', 'SK', 'central', 48.1486, 17.1077, 'Братислава', 'Bratislava', 'Bratislava'],
  ['kosice', 'SK', 'central', 48.7164, 21.2611, 'Кошице', 'Košice', 'Košice'],
  ['warsaw', 'PL', 'central', 52.2297, 21.0122, 'Варшава', 'Warsaw', 'Varšava'],
  ['krakow', 'PL', 'central', 50.0647, 19.945, 'Краков', 'Kraków', 'Krakov'],
  ['ljubljana', 'SI', 'central', 46.0569, 14.5058, 'Любляна', 'Ljubljana', 'Ľubľana'],

  ['madrid', 'ES', 'south', 40.4168, -3.7038, 'Мадрид', 'Madrid', 'Madrid'],
  ['barcelona', 'ES', 'south', 41.3874, 2.1686, 'Барселона', 'Barcelona', 'Barcelona'],
  ['valencia', 'ES', 'south', 39.4699, -0.3763, 'Валенсия', 'Valencia', 'Valencia'],
  ['seville', 'ES', 'south', 37.3891, -5.9845, 'Севилья', 'Seville', 'Sevilla'],
  ['lisbon', 'PT', 'south', 38.7223, -9.1393, 'Лиссабон', 'Lisbon', 'Lisabon'],
  ['porto', 'PT', 'south', 41.1579, -8.6291, 'Порту', 'Porto', 'Porto'],
  ['rome', 'IT', 'south', 41.9028, 12.4964, 'Рим', 'Rome', 'Rím'],
  ['milan', 'IT', 'south', 45.4642, 9.19, 'Милан', 'Milan', 'Miláno'],
  ['naples', 'IT', 'south', 40.8518, 14.2681, 'Неаполь', 'Naples', 'Neapol'],
  ['venice', 'IT', 'south', 45.4408, 12.3155, 'Венеция', 'Venice', 'Benátky'],
  ['athens', 'GR', 'south', 37.9838, 23.7275, 'Афины', 'Athens', 'Atény'],
  ['valletta', 'MT', 'south', 35.8989, 14.5146, 'Валлетта', 'Valletta', 'Valletta'],
  ['zagreb', 'HR', 'south', 45.815, 15.9819, 'Загреб', 'Zagreb', 'Záhreb'],

  ['stockholm', 'SE', 'north', 59.3293, 18.0686, 'Стокгольм', 'Stockholm', 'Štokholm'],
  ['oslo', 'NO', 'north', 59.9139, 10.7522, 'Осло', 'Oslo', 'Oslo'],
  ['copenhagen', 'DK', 'north', 55.6761, 12.5683, 'Копенгаген', 'Copenhagen', 'Kodaň'],
  ['helsinki', 'FI', 'north', 60.1699, 24.9384, 'Хельсинки', 'Helsinki', 'Helsinki'],
  ['reykjavik', 'IS', 'north', 64.1466, -21.9426, 'Рейкьявик', 'Reykjavik', 'Reykjavík'],
  ['riga', 'LV', 'north', 56.9496, 24.1052, 'Рига', 'Riga', 'Riga'],
  ['vilnius', 'LT', 'north', 54.6872, 25.2797, 'Вильнюс', 'Vilnius', 'Vilnius'],
  ['tallinn', 'EE', 'north', 59.437, 24.7536, 'Таллин', 'Tallinn', 'Tallinn'],

  ['kyiv', 'UA', 'east', 50.4501, 30.5234, 'Киев', 'Kyiv', 'Kyjev'],
  ['bucharest', 'RO', 'east', 44.4268, 26.1025, 'Бухарест', 'Bucharest', 'Bukurešť'],
  ['sofia', 'BG', 'east', 42.6977, 23.3219, 'София', 'Sofia', 'Sofia'],
  ['belgrade', 'RS', 'east', 44.7866, 20.4489, 'Белград', 'Belgrade', 'Belehrad'],
  ['chisinau', 'MD', 'east', 47.0105, 28.8638, 'Кишинёв', 'Chișinău', 'Kišiňov'],
  ['istanbul', 'TR', 'east', 41.0082, 28.9784, 'Стамбул', 'Istanbul', 'Istanbul'],
];

// Нормализация для поиска: нижний регистр, без диакритики (Košice → kosice, ё → е)
export const normalize = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ё/g, 'е').trim();

export const CITIES = RAW.map(([id, country, region, lat, lon, ru, en, sk]) => {
  const c = COUNTRIES[country];
  return {
    id, country, region, lat, lon,
    flag: c.flag,
    names: { ru, en, sk },
    // Поиск работает на любом языке, независимо от выбранного
    searchIndex: normalize([id, ru, en, sk, c.ru, c.en, c.sk].join(' ')),
  };
});

export const CITY_BY_ID = Object.fromEntries(CITIES.map((c) => [c.id, c]));
export const REGIONS = ['all', 'west', 'central', 'south', 'north', 'east'];
