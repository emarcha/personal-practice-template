# Landing Page

A warm, organic, and professional landing page for a neuropsychology therapy practice, built with [Eleventy (11ty)](https://www.11ty.dev/).

## Quick Start

```bash
# Install dependencies
npm install

# Start local dev server (hot-reload at http://localhost:8080)
npm start

# Build for production
npm run build
# Output goes to _site/
```

## Project Structure

```
neuropsych-site/
├── src/
│   ├── _data/
│   │   └── site.json          ← ALL placeholder content lives here
│   ├── _includes/
│   │   ├── base.njk           ← HTML shell / <head>
│   │   ├── header.njk         ← Nav bar
│   │   └── footer.njk         ← Footer
│   ├── css/
│   │   └── style.css          ← All styles (single file, no build step)
│   ├── js/
│   │   └── main.js            ← Nav toggle, scroll animations
│   ├── images/                ← Drop images here
│   └── index.njk             ← Landing page sections
├── .eleventy.js               ← 11ty config
├── .github/workflows/
│   └── deploy.yml             ← GitHub Pages CI/CD
├── package.json
└── README.md
```

## How to Customize

### 1. Content — Edit `src/_data/site.json`

Every piece of text on the site is driven from this single JSON file. Update:

- **Practice name & tagline** — `name`, `tagline`, `heroSubtitle`
- **Contact info** — `phone`, `email`, `address`, `hours`
- **About section** — `about.headline`, `about.text`, `about.philosophy`
- **Services** — Add/remove/edit objects in the `services` array
- **Provider bio** — `provider.name`, `provider.title`, `provider.bio`, `provider.credentials`
- **Insurance** — `insurance.providers` array
- **Testimonials** — `testimonials` array
- **FAQ** — `faq` array

### 2. Images

Replace the placeholder blocks with real images:

1. Drop images into `src/images/`
2. In `src/index.njk`, replace the `<div class="about-image-placeholder">` blocks with `<img>` tags:
   ```html
   <img src="/images/office-photo.jpg" alt="Our welcoming office space" loading="lazy">
   ```

### 3. Colors & Fonts

All design tokens are CSS custom properties at the top of `src/css/style.css`:

```css
:root {
  --clr-sage: #8B9E7E;        /* Primary accent (sage green) */
  --clr-cream: #FAF6F1;       /* Background */
  --clr-charcoal: #2D2824;    /* Headings */
  --ff-serif: 'DM Serif Display', Georgia, serif;
  --ff-sans: 'Outfit', sans-serif;
}
```

### 4. Contact Form

The form is pre-wired for **[Formspree](https://formspree.io)** (free tier handles up to 50 submissions/month). To set it up:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID
3. In `src/index.njk`, replace `YOUR_FORMSPREE_ID` in the form action URL

---

## Deployment (GitHub Pages)

1. Push code to GitHub
2. Go to repo Settings → Pages → Source: **"GitHub Actions"**
3. The included `.github/workflows/deploy.yml` handles build and deploy automatically on push to `main`
4. Site will be live at `https://username.github.io/repo-name/`

**Custom domain:**
- Add a `CNAME` file to `src/` containing your domain (e.g., `somesite.com`)
- Add it to 11ty passthrough: in `.eleventy.js`, add `eleventyConfig.addPassthroughCopy("src/CNAME")`
- Configure DNS: add an A record pointing to [GitHub's IPs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) or a CNAME to `username.github.io`
- HTTPS is automatic once the custom domain is verified

---

## Adding New Pages

To add a standalone page (e.g., `/about/`):

1. Create `src/pages/about.njk`:
   ```
   ---
   layout: base.njk
   title: About Us
   permalink: /about/
   ---
   <section class="section">
     <div class="container">
       <h1>About Us</h1>
       ...
     </div>
   </section>
   ```
2. Add a link in `header.njk`

---

## Tech Stack

- **11ty v2** — Static site generator (zero client JS framework)
- **Nunjucks** — Templating
- **Vanilla CSS** — No preprocessor, all custom properties
- **Vanilla JS** — ~60 lines for nav, scroll, animations
- **Google Fonts** — DM Serif Display + Outfit
