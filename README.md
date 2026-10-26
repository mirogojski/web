# mirogoj.com

Zapisi o zagrebačkom Mirogoju — o Bolléovim arkadama, o ljudima koji tu počivaju
i o skupini prijatelja koja je svaki dan prolazila pokraj groblja na putu u školu.

Astro + Tailwind CSS v4. Za konvencije vidi `AGENTS.md`.

## Razvoj

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gradi u dist/
npm run preview
```

Potreban Node 22.12 ili noviji (pinano u `.node-version`).

## Provjere

```bash
npm run check:kpis   # statičke provjere konvencija
npm run lint
npm run format
```

## Postavke okoline

Vidi `.env.example`. Ništa nije obavezno — bez postavljenih vrijednosti galerija
i video prikazuju kratku napomenu umjesto sadržaja.

| Varijabla | Namjena |
|---|---|
| `PUBLIC_GOOGLE_PHOTOS_ALBUM_URL` | javno podijeljeni Google Photos album za `/fotos` |
| `PUBLIC_VIMEO_VIDEO_URL` | Vimeo poveznica za `/video` |
| `PUBLIC_CONTACT_FORM_ENDPOINT` | vanjsko odredište obrasca; prazno znači `/api/contact` |

Obrazac šalje e-poštu preko `functions/api/contact.ts` kroz Resend. Worker
(`worker/index.ts`, `wrangler.jsonc`) usmjerava `/api/contact` na tu funkciju.
`CONTACT_TO` i `CONTACT_FROM` su u `wrangler.jsonc`; `RESEND_API_KEY` je tajna i
postavlja se u Cloudflare nadzornoj ploči (Worker → Settings → Variables and
Secrets), a lokalno u `.dev.vars` (ne ide u git):

```bash
echo 'RESEND_API_KEY=re_...' > .dev.vars
npm run preview:worker   # gradi stranicu i pokreće Worker na http://localhost:8787
```
