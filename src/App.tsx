import { useEffect, useMemo } from 'react'
import { AppContext, type AppState } from './context'
import { home, ui } from './lib/content'
import { useRoute, useStored } from './lib/hooks'
import type { Lang, L } from './types'
import { BackButton, Card, NavCard } from './components/Layout'
import {
  BeforePage, DailyPage, FavPage, GlossaryPage, PrayPage, StartPage, SunnahPage, SurahPage, TopicPage, WuduPage,
} from './components/pages'

const SIZES = [0.9, 1, 1.15, 1.3, 1.5]

export default function App() {
  const [lang, setLang] = useStored<Lang>('dpc-lang', 'en')
  const [favs, setFavs] = useStored<string[]>('dpc-favs', [])
  const [counts, setCounts] = useStored<Record<string, number>>('dpc-counts', {})
  const [size, setSize] = useStored<number>('dpc-size', 1)
  const [route, go] = useRoute()

  const t = (v: L) => v[lang]

  useEffect(() => {
    document.documentElement.lang = lang === 'ms' ? 'ms' : 'en'
    document.documentElement.style.fontSize = `${16 * size}px`
  }, [lang, size])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route.page, route.param])

  const state: AppState = useMemo(
    () => ({
      lang,
      t: (v) => v[lang],
      favs,
      toggleFav: (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
      counts,
      setCount: (id, n) => setCounts((c) => ({ ...c, [id]: n })),
      go,
    }),
    [lang, favs, counts, go, setFavs, setCounts],
  )

  const step = (d: number) => {
    const i = SIZES.indexOf(size)
    setSize(SIZES[Math.min(SIZES.length - 1, Math.max(0, (i < 0 ? 1 : i) + d))])
  }

  const page = route.page
  return (
    <AppContext.Provider value={state}>
      <div className="mx-auto min-h-screen max-w-2xl px-4 pb-10">
        <header className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <button onClick={() => go('home')} className="font-display text-lg text-primary">
            {t(ui.appName)}
          </button>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-border p-1" role="group" aria-label={t(ui.textSize)}>
              <button onClick={() => step(-1)} aria-label={t(ui.smaller)} className="rounded-full px-3 py-1 text-sm font-semibold text-muted-foreground">
                A−
              </button>
              <button onClick={() => step(1)} aria-label={t(ui.larger)} className="rounded-full px-3 py-1 text-base font-semibold text-primary">
                A+
              </button>
            </div>
            <div className="flex rounded-full border border-border p-1" role="group" aria-label={t(ui.language)}>
              {(['en', 'ms'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${lang === l ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                >
                  {l === 'en' ? 'English' : 'Melayu'}
                </button>
              ))}
            </div>
          </div>
        </header>

        {page === 'home' ? (
          <>
            <section className="py-10 text-center">
              <h1 dir="rtl" lang="ar" className="animate-write font-arabic text-5xl leading-[1.6] text-primary sm:text-6xl">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </h1>
              <p className="mt-4 text-muted-foreground">{t(ui.tagline)}</p>
            </section>
            <div className="grid gap-4 sm:grid-cols-2">
              {home.map((c) => (
                <NavCard key={c.id} icon={c.icon} title={t(c.title)} sub={t(c.sub)} onClick={() => go(c.id)} />
              ))}
              <NavCard icon="❤️" title={t(ui.favourites)} sub={`${favs.length}`} onClick={() => go('fav')} />
            </div>
            <div className="mt-6 space-y-3">
              <Card>
                <p className="text-sm font-semibold text-accent-foreground">{t(ui.madhhabTitle)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t(ui.madhhabNote)}</p>
              </Card>
              <p className="text-center text-sm text-muted-foreground">{t(ui.installHint)}</p>
            </div>
          </>
        ) : (
          <main className="pt-6">
            <BackButton />
            {page === 'start' && <StartPage />}
            {page === 'before' && <BeforePage />}
            {page === 'wudhu' && <WuduPage />}
            {page === 'pray' && <PrayPage />}
            {page === 'sunat' && <SunnahPage />}
            {page === 'dua' && <TopicPage kind="dua" />}
            {page === 'zikir' && <TopicPage kind="zikir" initial={route.param} />}
            {page === 'surah' && <SurahPage />}
            {page === 'daily' && <DailyPage />}
            {page === 'glossary' && <GlossaryPage />}
            {page === 'fav' && <FavPage />}
          </main>
        )}

        <footer className="mt-12 space-y-2 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p className="text-accent-foreground">{t(ui.note)}</p>
          <p>{t(ui.madeBy)}</p>
        </footer>
      </div>
    </AppContext.Provider>
  )
}
