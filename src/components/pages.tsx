import { useState } from 'react'
import { useApp } from '../context'
import { useStored } from '../lib/hooks'
import { buildPrayer } from '../lib/prayer'
import {
  daily, duaTopics, guide, homeCard, prayers, reading, sunnah, surahs, ui, wudu, zikirTopics, allReadings,
} from '../lib/content'
import type { PrayerStep, Reading, Topic, L } from '../types'
import ReadingCard from './ReadingCard'
import PostureIcon from './PostureIcon'
import { Card, Num, Section, Select } from './Layout'

export function StartPage() {
  const { t, go } = useApp()
  const [done, setDone] = useStored<string[]>('dpc-start', [])
  const steps = guide.start.steps
  const toggle = (id: string) => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))
  return (
    <Section title={t(homeCard('start').title)}>
      <p className="text-muted-foreground">{t(guide.start.intro)}</p>
      <p className="font-semibold text-accent-foreground" role="status">
        {done.length} / {steps.length} {t(ui.progress)}
      </p>
      <ol className="space-y-3">
        {steps.map((s, i) => {
          const ok = done.includes(s.id)
          return (
            <li key={s.id} className={`rounded-xl border bg-card p-4 ${ok ? 'border-primary' : 'border-border'}`}>
              <div className="flex gap-3">
                <Num n={i + 1} />
                <div className="flex-1">
                  <p className="font-display text-lg text-primary">{t(s.title)}</p>
                  <p className="mt-1 text-muted-foreground">{t(s.text)}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button onClick={() => go(s.target)} className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary">
                      {t(ui.open)}
                    </button>
                    <button
                      onClick={() => toggle(s.id)}
                      aria-pressed={ok}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${ok ? 'bg-primary text-primary-foreground' : 'border border-border'}`}
                    >
                      {ok ? '✓ ' : ''}
                      {t(ok ? ui.done : ui.markDone)}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}

export function BeforePage() {
  const { t } = useApp()
  return (
    <Section title={t(guide.before.title)}>
      <p className="text-muted-foreground">{t(guide.before.intro)}</p>
      <ol className="space-y-3">
        {guide.before.items.map((it, i) => (
          <li key={i} className="flex gap-3 rounded-xl bg-card p-4">
            <Num n={i + 1} />
            <div>
              <p className="font-semibold text-primary">{t(it.title)}</p>
              <p className="mt-1 text-muted-foreground">{t(it.text)}</p>
            </div>
          </li>
        ))}
      </ol>
      <Card>
        <p>{t(guide.before.sick)}</p>
      </Card>
    </Section>
  )
}

export function WuduPage() {
  const { t } = useApp()
  const x = guide.wuduExtras
  return (
    <Section title={t(homeCard('wudhu').title)}>
      <ol className="space-y-3">
        {wudu.map((s, i) => (
          <li key={i} className="rounded-xl bg-card p-4">
            <div className="flex gap-3">
              <Num n={i + 1} />
              <span className="pt-1">{t(s.text)}</span>
            </div>
            {s.reading && (
              <div className="mt-3">
                <ReadingCard item={reading(s.reading)} />
              </div>
            )}
          </li>
        ))}
      </ol>
      <Card title={t(x.breaksTitle)}>
        <ul className="list-disc space-y-2 pl-5">
          {x.breaks.map((b, i) => (
            <li key={i}>{t(b)}</li>
          ))}
        </ul>
      </Card>
      <Card title={t(x.waterTitle)}>{t(x.water)}</Card>
      <Card title={t(x.tayammumTitle)}>{t(x.tayammum)}</Card>
    </Section>
  )
}

function Steps({ steps }: { steps: PrayerStep[] }) {
  const { t } = useApp()
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="rounded-xl bg-card p-4">
          <div className="flex items-start gap-3">
            <Num n={i + 1} />
            <span className="flex-1 pt-1">{t(s.text)}</span>
            {s.posture && <PostureIcon posture={s.posture} />}
          </div>
          {s.note && <p className="mt-2 rounded-lg bg-accent p-3 text-sm text-accent-foreground">{t(s.note)}</p>}
          {s.reading && (
            <div className="mt-3">
              <ReadingCard item={s.reading} optional={s.optional} />
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}

export function PrayPage() {
  const { t, go } = useApp()
  const [id, setId] = useState(prayers[0].id)
  const p = prayers.find((x) => x.id === id)!
  const rak = t(ui.rakaat)
  return (
    <Section title={t(homeCard('pray').title)}>
      <Card>
        <p className="text-sm font-semibold text-accent-foreground">{t(ui.madhhabTitle)}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t(ui.madhhabNote)}</p>
      </Card>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t(homeCard('pray').title)}>
        {prayers.map((x) => (
          <button
            key={x.id}
            onClick={() => setId(x.id)}
            aria-pressed={id === x.id}
            className={`rounded-full border px-4 py-2 font-semibold ${id === x.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground'}`}
          >
            {t(x.name)}
          </button>
        ))}
      </div>
      <Card tone="strong">
        <p className="font-display text-2xl text-primary">
          {t(p.name)} · {p.rakaat} {rak}
        </p>
        <p className="text-muted-foreground">{t(p.time)}</p>
        <p className="mt-2 text-sm">{t(p.loud)}</p>
      </Card>
      {buildPrayer(p.id, p.rakaat).map((r) => (
        <div key={r.rakaat}>
          <h3 className="mb-3 mt-4 font-display text-xl text-accent-foreground">
            {rak.charAt(0).toUpperCase() + rak.slice(1)} {r.rakaat}
          </h3>
          <Steps steps={r.steps} />
        </div>
      ))}
      <Card title={t(guide.afterPrayer.title)}>
        <p>{t(guide.afterPrayer.text)}</p>
        <button onClick={() => go('zikir', 'after')} className="mt-3 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary">
          {t(ui.openAfterPrayer)}
        </button>
      </Card>
    </Section>
  )
}

export function SunnahPage() {
  const { t } = useApp()
  const [id, setId] = useState(sunnah[0].id)
  const s = sunnah.find((x) => x.id === id)!
  return (
    <Section title={t(homeCard('sunat').title)}>
      <Select label={t(ui.chooseTopic)} value={id} onChange={setId} options={sunnah} text={(o) => t(o.name)} />
      <Card tone="strong">
        <p className="font-display text-2xl text-primary">{t(s.name)}</p>
        <p className="font-semibold">{t(s.rakaat)}</p>
        <p className="text-muted-foreground">{t(s.time)}</p>
        <p className="mt-2 text-sm">{t(s.about)}</p>
      </Card>
      <ol className="space-y-3">
        {s.steps.map((st, i) => (
          <li key={i} className="flex gap-3 rounded-xl bg-card p-4">
            <Num n={i + 1} />
            <span className="pt-1">{t(st)}</span>
          </li>
        ))}
      </ol>
      {s.recite && (
        <div className="space-y-3">
          <h3 className="mt-4 font-display text-xl text-accent-foreground">{t(ui.suggestedSurah)}</h3>
          {s.recite.map((r, i) => (
            <div key={i} className="space-y-3 rounded-xl bg-card p-4">
              <p className="font-semibold">{t(r.label)}</p>
              {r.surahs.map((sid) => {
                const sur = surahs.find((x) => x.id === sid)
                return sur ? <ReadingCard key={sid} item={sur} /> : null
              })}
            </div>
          ))}
        </div>
      )}
      {s.dua && <ReadingCard item={s.dua} />}
    </Section>
  )
}

export function TopicPage({ kind, initial }: { kind: 'dua' | 'zikir'; initial?: string }) {
  const { t } = useApp()
  const topics: Topic[] = kind === 'dua' ? duaTopics : zikirTopics
  const [id, setId] = useState(topics.some((x) => x.id === initial) ? initial! : topics[0].id)
  const topic = topics.find((x) => x.id === id)!
  return (
    <Section title={t(homeCard(kind).title)}>
      <Select label={t(ui.chooseTopic)} value={id} onChange={setId} options={topics} text={(o) => t(o.name)} />
      {topic.items.map((it) => (
        <ReadingCard key={it.id} item={it} />
      ))}
    </Section>
  )
}

export function SurahPage() {
  const { t } = useApp()
  const [id, setId] = useState(surahs[0].id)
  const s = surahs.find((x) => x.id === id)!
  return (
    <Section title={t(homeCard('surah').title)}>
      <Select label={t(ui.chooseSurah)} value={id} onChange={setId} options={surahs} text={(o) => t(o.title)} />
      <ReadingCard item={s} />
    </Section>
  )
}

export function DailyPage() {
  const { t } = useApp()
  return (
    <Section title={t(homeCard('daily').title)}>
      {daily.map((d) => (
        <ReadingCard key={d.id} item={d} />
      ))}
    </Section>
  )
}

export function FavPage() {
  const { t, favs } = useApp()
  const items: Reading[] = allReadings.filter((r, i, a) => favs.includes(r.id) && a.findIndex((x) => x.id === r.id) === i)
  return (
    <Section title={t(ui.favourites)}>
      {items.length === 0 && <p className="text-muted-foreground">{t(ui.noFav)}</p>}
      {items.map((r) => (
        <ReadingCard key={r.id} item={r} />
      ))}
    </Section>
  )
}

export function GlossaryPage() {
  const { t, lang } = useApp()
  return (
    <Section title={t(homeCard('glossary').title)}>
      <dl className="space-y-3">
        {guide.glossary.map((g) => (
          <div key={g.term} className="rounded-xl bg-card p-4">
            <dt className="font-display text-lg text-primary">{lang === 'ms' ? g.ms : g.term}</dt>
            <dd className="mt-1 text-muted-foreground">{t(g.def as L)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
