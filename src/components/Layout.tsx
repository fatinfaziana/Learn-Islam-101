import type { ReactNode } from 'react'
import { useApp } from '../context'
import { guide, ui } from '../lib/content'

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 font-display text-3xl text-primary">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

export function Card({ title, children, tone }: { title?: string; children: ReactNode; tone?: 'strong' }) {
  return (
    <div className={`rounded-2xl border bg-card p-5 ${tone === 'strong' ? 'border-primary' : 'border-border'}`}>
      {title && <h3 className="mb-2 font-display text-xl text-primary">{title}</h3>}
      {children}
    </div>
  )
}

export function Num({ n }: { n: number }) {
  return <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">{n}</span>
}

export function Select<T extends { id: string }>({
  label,
  value,
  onChange,
  options,
  text,
}: {
  label: string
  value: string
  onChange: (id: string) => void
  options: T[]
  text: (o: T) => string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-card px-4 py-3 text-lg text-foreground"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {text(o)}
          </option>
        ))}
      </select>
    </label>
  )
}

export function NavCard({ icon, title, sub, onClick }: { icon: string; title: string; sub: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-lg transition hover:-translate-y-0.5 hover:border-primary"
    >
      <span className="text-4xl" aria-hidden="true">
        {icon}
      </span>
      <span>
        <span className="block font-display text-xl text-primary">{title}</span>
        <span className="block text-sm text-muted-foreground">{sub}</span>
      </span>
    </button>
  )
}

export function BackButton() {
  const { t, go } = useApp()
  return (
    <button onClick={() => go('home')} className="mb-5 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-semibold text-primary">
      ← {t({ en: 'Back', ms: 'Kembali' })}
    </button>
  )
}

const duration = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

/** Links (not embeds) to short videos, so nothing is loaded from YouTube until the person chooses to open one. */
export function VideoLinks({ topic }: { topic: 'wudhu' | 'pray' }) {
  const { t, lang } = useApp()
  const videos = guide.videos[topic].filter((v) => v.lang === lang)
  if (videos.length === 0) return null
  return (
    <Card title={t(ui.watchTitle)}>
      <ul className="space-y-2">
        {videos.map((v) => (
          <li key={v.id}>
            <a
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-xl border border-border p-3 hover:border-primary"
            >
              <span className="text-2xl" aria-hidden="true">▶️</span>
              <span>
                <span className="block font-semibold text-primary">{v.title}</span>
                <span className="block text-sm text-muted-foreground">
                  {v.channel} · {duration(v.seconds)} {t(ui.minutes)}
                  {v.note ? ` · ${t(v.note)}` : ''}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">{t(ui.watchNote)}</p>
    </Card>
  )
}
