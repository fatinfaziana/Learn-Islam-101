# Dua & Prayer Companion

A free guide for people who are new to Islam or relearning it: how to take wudu, how to pray the five daily prayers, the short surahs, duas and zikir. Available in English and Malay. Works offline once opened.

## Run it

```bash
npm install
npm run dev      # local development at http://localhost:5173
npm test         # checks the content (missing translations, broken references, cut-off text)
npm run build    # production build in dist/
```

## Where the content lives

All text is in [`src/data/content.json`](src/data/content.json), with `en` and `ms` for every string, so it can be reviewed and corrected without touching code.
The step-by-step prayer is assembled in [`src/lib/prayer.ts`](src/lib/prayer.ts).

## Publish

The workflow in `.github/workflows/deploy.yml` publishes to GitHub Pages on every push to `main`.
In the repository go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The build uses relative paths, so it also works on Netlify, Vercel or any static host (build command `npm run build`, output folder `dist`).

## Religious content review

The Arabic, transliterations and translations were written and gathered without review by a scholar. Please have an ustaz check them before sharing widely. Where scholars differ (opening dua, Qunut in Fajr, what breaks wudu), the app says so and marks optional parts.
