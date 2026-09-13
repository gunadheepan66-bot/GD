# PANGU Personal Website

A lightweight static personal website for Guna Dheepan, built with plain HTML, CSS and JavaScript for GitHub Pages.

## Files

- `index.html` - the complete page structure and profile content.
- `styles.css` - the dark emerald visual system, responsive layout, animations, placeholders and birthday mode styling.
- `script.js` - mobile navigation, scroll reveals, gallery lightbox, placeholder link handling and annual birthday balloons.

## Content Notes

The profile content is based on `Guna_Dheepan_About_Me.pdf`.

Unavailable items are intentionally marked as placeholders:

- Profile photo
- Project images
- Photography gallery images
- Social profile URLs

Replace those placeholders only when real assets or links are available.

## Local Preview

Open `index.html` directly in a browser, or run a small local server from this folder:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Deploy To GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `script.js` and this `README.md` to the repository root.
3. In GitHub, open `Settings`.
4. Open `Pages`.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Select the `main` branch and `/root`.
7. Save.

GitHub will publish the site at a URL like:

```text
https://your-username.github.io/your-repository-name/
```

## Birthday Mode

Every year on 6 November, the site automatically enables a birthday mode with floating balloons. Clicking a balloon pops it into particles.

For testing, temporarily change this line in `script.js`:

```js
const isBirthday = today.getMonth() === 10 && today.getDate() === 6;
```

to:

```js
const isBirthday = true;
```
