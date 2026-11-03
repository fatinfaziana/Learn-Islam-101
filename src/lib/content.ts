import raw from '../data/content.json'
import type { Guide, HomeCard, Prayer, Reading, SunnahPrayer, Topic, WuduStep, L } from '../types'

// All text lives in src/data/content.json so it can be reviewed and corrected without touching code.
export const ui = raw.ui as Record<string, L>
export const home = raw.home as HomeCard[]
export const wudu = raw.wudu as WuduStep[]
export const prayers = raw.prayers as Prayer[]
export const readings = raw.readings as Reading[]
export const sunnah = raw.sunnah as SunnahPrayer[]
export const duaTopics = raw.duaTopics as Topic[]
export const zikirTopics = raw.zikirTopics as Topic[]
export const surahs = raw.surahs as Reading[]
export const daily = raw.daily as Reading[]
export const guide = raw.guide as unknown as Guide

export const reading = (id: string): Reading => {
  const r = readings.find((x) => x.id === id)
  if (!r) throw new Error(`Unknown reading: ${id}`)
  return r
}

export const homeCard = (id: string): HomeCard => {
  const c = home.find((x) => x.id === id)
  if (!c) throw new Error(`Unknown home card: ${id}`)
  return c
}

// Everything a person can save with the heart button.
export const allReadings: Reading[] = [
  ...duaTopics.flatMap((t) => t.items),
  ...zikirTopics.flatMap((t) => t.items),
  ...readings,
  ...surahs,
  ...daily,
  ...sunnah.flatMap((s) => (s.dua ? [s.dua] : [])),
]
