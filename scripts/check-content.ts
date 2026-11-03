// Sanity checks for the guide's content. Run with `npm test`.
import { allReadings, guide, home, prayers, readings, sunnah, surahs, wudu } from '../src/lib/content'
import { buildPrayer } from '../src/lib/prayer'

const errors: string[] = []
const fail = (m: string) => errors.push(m)

const seen = new Set<string>()
for (const r of allReadings) {
  if (!r.arabic.trim()) fail(`${r.id}: missing Arabic`)
  if (!r.translit.trim()) fail(`${r.id}: missing transliteration`)
  if (!r.meaning.en.trim() || !r.meaning.ms.trim()) fail(`${r.id}: missing meaning in en or ms`)
  if (!r.title.en.trim() || !r.title.ms.trim()) fail(`${r.id}: missing title`)
  if (/\.\.\./.test(r.meaning.en + r.meaning.ms)) fail(`${r.id}: meaning is cut off with "..."`)
}
for (const r of [...readings, ...surahs]) {
  if (seen.has(r.id)) fail(`duplicate id ${r.id}`)
  seen.add(r.id)
}
for (const s of wudu) if (s.reading && !readings.some((r) => r.id === s.reading)) fail(`wudu: unknown reading ${s.reading}`)
for (const s of sunnah) for (const rc of s.recite ?? []) for (const id of rc.surahs) if (!surahs.some((x) => x.id === id)) fail(`${s.id}: unknown surah ${id}`)
for (const p of prayers) {
  const rak = buildPrayer(p.id, p.rakaat)
  if (rak.length !== p.rakaat) fail(`${p.id}: wrong number of rak'ah`)
  if (!rak[rak.length - 1].steps.some((s) => s.reading?.id === 'r-salam')) fail(`${p.id}: no salam at the end`)
  for (const r of rak) if (r.steps.some((s) => s.reading?.id === 'r-takbir' && r.rakaat > 1)) fail(`${p.id}: Takbiratul Ihram used after rak'ah 1`)
}
if (JSON.stringify({ home, guide }).match(/@|mailto|whatsapp|phone/i)) fail('contact information found in content')
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`OK: ${allReadings.length} readings, ${prayers.length} prayers, ${sunnah.length} sunnah prayers checked`)
