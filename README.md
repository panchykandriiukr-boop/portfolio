# Portfolio (static site)

Plain HTML + CSS + a little JS. No build step, no dependencies.

```
index.html   Home   (not in the nav – the logo links here)
work.html    Work   (filterable project grid)
about.html   About
approach.html Approach (AI, UX, business, metrics)
css/styles.css · js/main.js
assets/logo/   logo.svg + PNG/JPEG exports
assets/img/    portrait + illustrations
```

## Preview locally

```bash
python3 -m http.server 4173 --directory portfolio
```

Open http://localhost:4173 (from the folder that contains `portfolio/`).

## Placeholders to replace

Search for `Placeholder`, `[Company`, `hello@example.com`, `your-handle`:
- Medium URL: `https://medium.com/@your-handle` (header, footer, Home, About)
- Dribbble / Behance URLs (`your-handle`), email
- Name ("Andrii"), city, bio, projects, articles, talks
- `assets/img/portrait.png` is only 317×339 px – swap in a larger photo for crisp retina rendering

## Logo exports (`assets/logo/`)

| File | Use |
| --- | --- |
| `logo.svg` | Vector master, transparent background (also the favicon) |
| `logo-2048.png`, `logo-1024.png`, `logo-512.png` | Transparent PNG |
| `logo-1024.jpg` | JPEG on cream `#FCFBF8` |
| `logo-180.png` | Apple touch icon |

On the site it is displayed at 40×40 px.

## Colours (from productdesignportfolios.com + one added accent)

| Token | Hex | Used for | Contrast |
| --- | --- | --- | --- |
| `--bg` | `#FCFBF8` | page | – |
| `--ink` | `#150101` | body text | 19.6:1 on bg |
| `--navy` | `#0F3548` | headings, buttons, borders | 12.5:1 on bg |
| `--muted` | `#4A5560` | secondary text | 7.3:1 on bg |
| `--yellow` | `#FFE202` | highlighter / hover | navy on it 9.9:1 |
| `--amber` | `#F5A623` | decorative | ink on it 10:1 |
| `--green` (added) | `#2FAE57` | decorative, from the collage | – |
| `--green-ink` (added) | `#17612F` | green text (eyebrows, dates) | 7.3:1 on bg |

Interactive borders use `#8A8F94` (3.1:1, WCAG 1.4.11). Also: skip link, visible focus rings, 44px touch targets, `prefers-reduced-motion` support, semantic landmarks.

## Publish

Any static host works – upload the `portfolio/` folder:
- **Netlify Drop** (drag & drop folder at app.netlify.com/drop) – fastest
- **Cloudflare Pages / Vercel / GitHub Pages** – connect a repo, no build command, output dir = `portfolio`

Before going live: set the real `<title>`/description, add `og:url`, and use absolute URLs for `og:image`.
