# Comet the Shiba website

The marketing site for **Comet the Shiba**, an original arcade platformer for
iPhone and iPad. Static HTML, no build step, no dependencies. Deployed with
GitHub Pages.

Live: https://barqawiz.github.io/comet-website/

## Layout

```
index.html            the whole site, one page
favicon.ico
.nojekyll             tells Pages to serve the files as-is
assets/
  css/style.css       palette and components lifted from the game's own UI
  js/main.js          pauses the hero loop off screen, one video at a time
  img/icon.png        app icon
  img/og.jpg          social preview card (1200x630)
  img/shots/          in-game screenshots, half-res WebP
  img/sprites/        trimmed sprites straight from the game's art masters
  video/              gameplay captures, H.264 1280px wide, plus WebP posters
```

Total weight is about 18 MB, almost all of it the five gameplay captures, and
they only load when someone presses play.

## Publishing

Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
Pages picks up every push to `main` after that.

## Local preview

```bash
python3 -m http.server 8899
```

Then open http://localhost:8899.

## Regenerating the assets

Everything under `assets/` is derived from the game repo (`../comet`):
screenshots come from `app-store/screenshots`, sprites are trimmed out of
`design/*/frames`, and the captures are re-encoded from `app-store/videos`.
Re-run those steps whenever the game's art or screenshots change, and keep the
run-cycle sheets built from a shared bounding box so the animation does not
jitter.
