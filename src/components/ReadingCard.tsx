import { useApp } from '../context'
import { ui } from '../lib/content'
import type { Reading } from '../types'

export default function ReadingCard({ item, optional }: { item: Reading; optional?: boolean }) {
  const { t, favs, toggleFav, counts, setCount } = useApp()
  const saved = favs.includes(item.id)
  const count = counts[item.id] ?? 0
  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg text-primary">
          {t(item.title)}
          {optional && <span className="ml-2 rounded-full bg-accent px-2 py-0.5 font-sans text-xs text-accent-foreground">{t(ui.optional)}</span>}
        </h3>
        <button
          onClick={() => toggleFav(item.id)}
          aria-label={t(saved ? ui.removeFav : ui.addFav)}
          aria-pressed={saved}
          className="text-2xl leading-none"
        >
          {saved ? '❤️' : '🤍'}
        </button>
      </div>
      <p dir="rtl" lang="ar" className="my-4 font-arabic text-3xl leading-[1.9]">
        {item.arabic}
      </p>
      <p className="italic text-accent-foreground">{item.translit}</p>
      <p className="mt-2 text-muted-foreground">{t(item.meaning)}</p>
      {item.count ? (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setCount(item.id, count + 1)}
            className={`flex-1 rounded-xl py-3 text-lg font-bold ${count >= item.count ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'}`}
          >
            {count} / {item.count} · {t(ui.tapCount)}
          </button>
          <button onClick={() => setCount(item.id, 0)} className="rounded-xl border border-border px-4 py-3 text-sm">
            {t(ui.reset)}
          </button>
        </div>
      ) : null}
    </article>
  )
}
