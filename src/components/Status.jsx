import { useI18n } from '../i18n/I18nProvider.jsx';

export function Loader() {
  const { t } = useI18n();
  return (
    <div className="grid min-h-[320px] place-items-center rounded-[2rem] border border-white/10 bg-white/5">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
        <p className="mt-4 text-sm text-white/70">{t.loading}</p>
      </div>
    </div>
  );
}

export function ErrorBox({ onRetry }) {
  const { t } = useI18n();
  return (
    <div className="rounded-[2rem] border border-rose-300/30 bg-rose-500/15 p-8 text-center">
      <div className="text-4xl">⚠️</div>
      <p className="mt-2">{t.error}</p>
      <button type="button" onClick={onRetry} className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white/90">{t.retry}</button>
    </div>
  );
}
