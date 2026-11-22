# Y.A.S Custom Cleaning Services — Premium Homepage

A premium, mobile-first, GitHub Pages-ready homepage redesign for **Y.A.S Custom Cleaning Services** (Cape Town, Western Cape).

## Project structure

```
.
├── index.html            # Homepage (GitHub Pages entry point)
├── assets/
│   ├── images/           # AI-generated photography for the homepage
│   │   ├── hero.jpg
│   │   ├── commercial.jpg
│   │   ├── residential.jpg
│   │   └── hospitality.jpg
│   └── logo/             # Brand mark (SVG)
│       ├── logo.svg
│       └── favicon.svg
├── css/
│   └── style.css          # Mobile-first, CSS variables, no build step
├── js/
│   └── script.js          # Mobile menu, FAQ accordion, reveals, quote form
├── .nojekyll
└── README.md
```

## Tech

- HTML5 · CSS3 · Vanilla JavaScript (no frameworks, no build step)
- Relative asset paths — works on GitHub Pages project subdirectories
- SEO meta tags + LocalBusiness JSON-LD (demo page is `noindex`)
- Mobile-first responsive layout (360px → 1440px+)

## Business details used

- Name: Y.A.S Custom Cleaning Services
- Location: Cape Town, Western Cape
- Phone: 082 953 4985
- WhatsApp: 071 179 0374
- Email: customyas@gmail.com

## Running locally

Any static file server works:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open http://localhost:8080/ (replace the port as needed).

## GitHub Pages

Push this branch and enable Pages with source = this branch, folder = `/`.
The site is a static build — no build step required.
