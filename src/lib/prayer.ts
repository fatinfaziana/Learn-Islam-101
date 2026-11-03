import { guide, reading } from './content'
import type { PrayerStep, L } from '../types'

const t = (en: string, ms: string): L => ({ en, ms })

export interface RakaatSteps {
  rakaat: number
  steps: PrayerStep[]
}

/** Builds the steps of every rak'ah for a prayer of `total` rak'ah. */
export function buildPrayer(prayerId: string, total: number): RakaatSteps[] {
  const out: RakaatSteps[] = []
  for (let n = 1; n <= total; n++) {
    const s: PrayerStep[] = []
    if (n === 1) {
      s.push({
        text: t('Stand facing the qiblah and make the intention in your heart for this prayer.', 'Berdiri menghadap kiblat dan berniat dalam hati untuk solat ini.'),
        posture: 'stand',
      })
      s.push({
        text: t('Raise both hands to your ears and say the opening takbir. Then place your right hand over your left on your chest.', 'Angkat kedua tangan setentang telinga dan lafazkan takbiratul ihram. Kemudian letak tangan kanan di atas tangan kiri di dada.'),
        reading: reading('r-takbir'),
        posture: 'stand',
      })
      s.push({
        text: t('Read the opening dua (Iftitah) quietly.', 'Baca doa iftitah secara perlahan.'),
        reading: reading('r-iftitah'),
        posture: 'stand',
      })
    } else {
      s.push({
        text: t('Stand up straight saying "Allahu Akbar".', 'Bangun berdiri tegak sambil menyebut "Allahu Akbar".'),
        reading: reading('r-takbir2'),
        posture: 'stand',
      })
    }
    s.push({
      text: t('Read Al-Fatihah.', 'Baca Al-Fatihah.'),
      reading: reading('r-fatihah'),
      posture: 'stand',
      note: n > 2 ? guide.fatihahOnly : undefined,
    })
    s.push({
      text: t('Say "Amin" after finishing Al-Fatihah.', 'Sebut "Amin" selepas selesai Al-Fatihah.'),
      reading: reading('r-amin'),
      posture: 'stand',
    })
    if (n <= 2) {
      s.push({
        text: t('Read a short surah, for example Al-Ikhlas.', 'Baca surah pendek, contohnya Al-Ikhlas.'),
        reading: reading('r-ikhlas'),
        posture: 'stand',
      })
    }
    s.push({
      text: t('Say "Allahu Akbar" and bow, back straight, hands on knees. Read 3 times:', 'Sebut "Allahu Akbar" dan rukuk, belakang lurus, tangan di lutut. Baca 3 kali:'),
      reading: reading('r-ruku'),
      posture: 'bow',
    })
    s.push({
      text: t('Rise up and stand straight, raising your hands, and say:', "Bangun berdiri tegak (i'tidal) sambil mengangkat tangan, dan baca:"),
      reading: reading('r-itidal'),
      posture: 'stand',
    })
    if (prayerId === 'subuh' && n === 2) {
      s.push({
        text: t('Optional: read Qunut while standing.', 'Pilihan: baca doa Qunut sambil berdiri.'),
        reading: reading('r-qunut'),
        posture: 'stand',
        note: guide.qunutNote,
        optional: true,
      })
    }
    s.push({
      text: t('Say "Allahu Akbar" and prostrate: forehead, nose, palms, knees and toes on the floor. Read 3 times:', 'Sebut "Allahu Akbar" dan sujud: dahi, hidung, tapak tangan, lutut dan hujung jari kaki di lantai. Baca 3 kali:'),
      reading: reading('r-sujud'),
      posture: 'sujud',
    })
    s.push({
      text: t('Say "Allahu Akbar" and sit between the two prostrations. Read:', 'Sebut "Allahu Akbar" dan duduk antara dua sujud. Baca:'),
      reading: reading('r-between'),
      posture: 'sit',
    })
    s.push({
      text: t('Say "Allahu Akbar" and prostrate a second time. Read 3 times:', 'Sebut "Allahu Akbar" dan sujud kali kedua. Baca 3 kali:'),
      reading: reading('r-sujud'),
      posture: 'sujud',
    })
    if (n === total) {
      s.push({
        text: t('Say "Allahu Akbar" and sit for the final tashahhud. Read the tashahhud:', 'Sebut "Allahu Akbar" dan duduk tahiyyat akhir. Baca tahiyyat:'),
        reading: reading('r-tahiyyat'),
        posture: 'sit',
      })
      s.push({
        text: t('Still sitting, continue with the salawat:', 'Masih duduk, sambung dengan selawat:'),
        reading: reading('r-selawat'),
        posture: 'sit',
      })
      s.push({
        text: t('Turn your head to the right and say the salam, then turn to the left and say it again. Your prayer is complete.', 'Toleh ke kanan sambil memberi salam, kemudian toleh ke kiri dan beri salam sekali lagi. Solat selesai.'),
        reading: reading('r-salam'),
        posture: 'sit',
      })
    } else if (n === 2) {
      s.push({
        text: t('Say "Allahu Akbar" and sit for the first tashahhud. Read up to the shahadah, then stand up for the next rak\'ah.', 'Sebut "Allahu Akbar" dan duduk tahiyyat awal. Baca hingga dua kalimah syahadah, kemudian bangun untuk rakaat seterusnya.'),
        reading: reading('r-tahiyyat'),
        posture: 'sit',
      })
    }
    out.push({ rakaat: n, steps: s })
  }
  return out
}
