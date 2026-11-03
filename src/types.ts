export type Lang = 'en' | 'ms'
export type L = Record<Lang, string>

export interface Reading {
  id: string
  title: L
  arabic: string
  translit: string
  meaning: L
  count?: number | null
}

export interface Topic {
  id: string
  name: L
  items: Reading[]
}

export interface HomeCard {
  id: string
  icon: string
  title: L
  sub: L
}

export interface Prayer {
  id: string
  name: L
  rakaat: number
  time: L
  loud: L
}

export interface SunnahPrayer {
  id: string
  name: L
  rakaat: L
  time: L
  about: L
  steps: L[]
  recite?: { label: L; surahs: string[] }[]
  dua?: Reading
}

export type Posture = 'stand' | 'bow' | 'sujud' | 'sit'

export interface PrayerStep {
  text: L
  reading?: Reading
  posture?: Posture
  note?: L
  optional?: boolean
}

export interface WuduStep {
  text: L
  reading?: string
}

export interface GuideItem {
  title: L
  text: L
}

export interface Guide {
  start: { intro: L; steps: { id: string; target: string; title: L; text: L }[] }
  before: { title: L; intro: L; items: GuideItem[]; sick: L }
  wuduExtras: {
    breaksTitle: L
    breaks: L[]
    waterTitle: L
    water: L
    tayammumTitle: L
    tayammum: L
  }
  afterPrayer: { title: L; text: L }
  duaTimes: { title: L; items: L[] }
  videos: Record<'wudhu' | 'pray', Video[]>
  qunutNote: L
  fatihahOnly: L
  glossary: { term: string; ms: string; def: L }[]
}

export interface Video {
  id: string
  lang: Lang
  title: string
  channel: string
  seconds: number
  note?: L
}
