import { memo } from 'react';
import { THEMES } from '../utils/weather.jsx';

// Статичный фон без тяжёлых анимаций blur → плавная прокрутка
function Background({ theme }) {
  const t = THEMES[theme] || THEMES.clear;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${t.bg} transition-colors duration-700`} />
      <div className={`absolute -left-[10%] -top-[15%] h-[45vmax] w-[45vmax] rounded-full ${t.a} opacity-25 blur-[100px]`} />
      <div className={`absolute -bottom-[20%] -right-[10%] h-[50vmax] w-[50vmax] rounded-full ${t.b} opacity-25 blur-[100px]`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,.45)_100%)]" />
    </div>
  );
}
export default memo(Background);
