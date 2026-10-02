English
A small weather app for European cities.

I wanted to see the weather in a bunch of cities at once without opening ten tabs, and I also wanted to practice React on something more real than a todo list. So I built this.

What's inside
You pick a city and see the current weather: temperature, feels-like, wind, humidity, pressure, sunrise and sunset. Below that there's a forecast for the next 24 hours and for the week. Further down is a grid with 53 cities across Europe. You can filter them by region, star your favorites, and search by name.

Other things I added along the way:

three languages: English, Russian and Slovak
°C / °F (wind switches to mph too)
the background changes depending on the weather in the selected city
language, units, city and favorites are saved in localStorage, so they're still there after a reload
Stack
React 18: function components and hooks. For the translations I just used Context and wrote the dictionaries myself, no i18n library.
Tailwind CSS 4
Vite: dev server and build
vite-plugin-singlefile: builds everything into one HTML file, which is handy for showing the project to someone without a server
Open-Meteo API: free and doesn't need an API key. I get current weather for all cities in a single request.
Running it
The easiest way is to open skycast-standalone.html in a browser. It's already built.

If you want to run it from source (you'll need Node.js 18 or newer):

npm install
npm run dev
Then open localhos

Build:

npm run build         # regular build into dist/
npm run build:single  # single index.html in dist-single/
What gave me trouble
On mobile the page kept scrolling sideways. It turned out a grid column with 1fr was being stretched by its content. minmax(0, 1fr) fixed it.
Search used to lag on every keystroke because the whole city grid re-rendered. useDeferredValue and memo on the cards sorted that out.
I wanted search to find cities in any language and without diacritics, so typing "kosice" finds Košice. I ended up building one search string per city with all the names and normalizing it.
Weather data comes from Open-Meteo.



Русский
Небольшое приложение с погодой по городам Европы.

Хотелось смотреть погоду сразу в куче городов, не открывая десять вкладок. Заодно хотелось потренироваться в React на чём-то посерьёзнее, чем todo-лист. Вот так оно и получилось.

Что тут есть
Выбираешь город и видишь текущую погоду: температуру, как ощущается, ветер, влажность, давление, восход и закат. Под этим прогноз на ближайшие сутки и на неделю. Ещё ниже сетка из 53 городов Европы. Их можно фильтровать по регионам, добавлять в избранное звёздочкой и искать по названию.

Что я ещё добавил по ходу:

три языка: русский, английский и словацкий
°C / °F (ветер тоже переключается на мили в час)
фон меняется в зависимости от погоды в выбранном городе
язык, единицы, город и избранное сохраняются в localStorage, так что после перезагрузки ничего не слетает
Стек
React 18: функциональные компоненты и хуки. Для переводов просто Context и свои словари, без i18n-библиотек.
Tailwind CSS 4
Vite: сервер разработки и сборка
vite-plugin-singlefile: собирает всё в один HTML-файл. Удобно, когда надо скинуть проект кому-то без сервера.
Open-Meteo API: бесплатный и без API-ключа. Текущую погоду по всем городам беру одним запросом.
Как запустить
Проще всего открыть skycast-standalone.html в браузере, он уже собран.

Если хочешь запустить из исходников (нужен Node.js 18 или новее):

npm install
npm run dev
И открыть localhost

Сборка:

npm run build         # обычная сборка в dist/
npm run build:single  # один index.html в dist-single/
Что вызвало трудности
На телефоне страница уезжала вбок. Оказалось, что колонку грида с 1fr растягивал её контент. Помогло minmax(0, 1fr).
Поиск подтормаживал на каждой букве, потому что перерисовывалась вся сетка городов. Исправил с помощью useDeferredValue и memo на карточках.
Хотелось, чтобы поиск находил город на любом языке и без диакритики: пишешь «kosice» и находит Košice. В итоге для каждого города собираю одну строку со всеми названиями и нормализую её.
Данные о погоде берутся из Open-Meteo.



Slovenčina
Malá aplikácia o počasí v európskych mestách.

Chcel som vidieť počasie vo viacerých mestách naraz bez otvárania desiatich kariet. Zároveň som si chcel precvičiť React na niečom reálnejšom ako todo list. Tak vznikla táto aplikácia.

Čo tu je
Vyberieš si mesto a vidíš aktuálne počasie: teplotu, pocitovú teplotu, vietor, vlhkosť, tlak, východ a západ slnka. Pod tým je predpoveď na najbližších 24 hodín a na týždeň. Ešte nižšie je mriežka s 53 mestami Európy. Dajú sa filtrovať podľa regiónu, pridať hviezdičkou do obľúbených a vyhľadávať podľa názvu.

Čo som ešte pridal popri tom:

tri jazyky: slovenčina, angličtina a ruština
°C / °F (vietor sa tiež prepne na mph)
pozadie sa mení podľa počasia vo vybranom meste
jazyk, jednotky, mesto a obľúbené sa ukladajú do localStorage, takže po obnovení stránky nič nezmizne
Stack
React 18: funkčné komponenty a hooky. Na preklady stačil Context a vlastné slovníky, bez i18n knižnice.
Tailwind CSS 4
Vite: vývojový server a build
vite-plugin-singlefile: zostaví všetko do jedného HTML súboru. Hodí sa, keď chceš projekt niekomu poslať bez servera.
Open-Meteo API: zadarmo a bez API kľúča. Aktuálne počasie pre všetky mestá beriem jednou požiadavkou.
Ako to spustiť
Najjednoduchšie je otvoriť skycast-standalone.html v prehliadači, už je zostavený.

Ak to chceš spustiť zo zdrojákov (potrebuješ Node.js 18 alebo novší):

npm install
npm run dev
Potom otvor localhost

Build:

npm run build         # bežný build do dist/
npm run build:single  # jeden index.html v dist-single/
Čo mi robilo problémy
Na mobile stránka utekala do strany. Ukázalo sa, že stĺpec gridu s 1fr naťahoval jeho obsah. Pomohlo minmax(0, 1fr).
Vyhľadávanie sa sekalo pri každom písmene, lebo sa prekresľovala celá mriežka miest. Vyriešil som to cez useDeferredValue a memo na kartách.
Chcel som, aby vyhľadávanie našlo mesto v akomkoľvek jazyku a bez diakritiky: napíšeš „kosice“ a nájde Košice. Nakoniec pre každé mesto skladám jeden reťazec so všetkými názvami a normalizujem ho.
Údaje o počasí sú z Open-Meteo.
