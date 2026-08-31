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
| `PUBLIC_CONTACT_FORM_ENDPOINT` | odredište obrasca; prazno znači `mailto:` |

Za obrazac koji šalje e-poštu preko `functions/api/contact.ts` potrebni su
`RESEND_API_KEY`, `CONTACT_TO` i `CONTACT_FROM`, postavljeni u nadzornoj ploči
hostinga. Funkcija radi samo na Cloudflare Pages, ne na Workeru sa statičkim
sadržajem.
