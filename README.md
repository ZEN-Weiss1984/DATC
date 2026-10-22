# DATC

Project page for **Direction-Aware Token Credit Assignment with Reward-Model Gradients**.

**[Project page](https://datc-project.github.io/)** · **[Paper](https://datc-project.github.io/assets/paper/datc.pdf)**

This repository contains the project website. The code repository is [kilgrims/DATC](https://github.com/kilgrims/DATC).

## Website

The page includes the paper abstract, method, experimental results, token-level analysis, and citation. Formulas and tables are pre-rendered; fonts and figures are bundled locally.

## Local preview

```sh
node scripts/preview.mjs
```

Open the printed local URL. No package installation or build is required to read the website.

## Deployment

GitHub Pages is configured to use **GitHub Actions**. A push to `main` runs `.github/workflows/pages.yml`, checks the site, and deploys its public files to:

https://datc-project.github.io/

The workflow publishes `index.html`, styles, browser JavaScript, figures, the paper, math fonts, and site metadata. Development scripts and this README are not included in the deployed site.

For updates:

```sh
node scripts/check.mjs
git add .
git commit -m "Update project page"
git push
```

## Editing

- Paper text, authors, affiliations, links, BibTeX: `index.html`
- Table values: `data.js`
- Appearance and mobile layout: `styles.css`
- Filtering, figure viewer, citation copy: `app.js`
- PDF and paper figures: `assets/`

After changing table data or formula definitions:

```sh
node scripts/render-tables.mjs
node scripts/render-math.mjs
node scripts/check.mjs
```

The formula source is in `scripts/render-math.mjs`. KaTeX 0.19.0 and its license are included in `assets/vendor/katex/`.

## Linking from a manuscript

```latex
The project page is available at
\url{https://datc-project.github.io/}.
```

See `paper-link.tex` for an alternative footnote.

## Attribution

The layout takes inspiration from the [ShowLab Multimodal Embodied Agents project page](https://showlab.github.io/Awesome-Multimodal-Embodied-Agent/). Website styles and interactions are independently implemented. Figures and experimental results come from the DATC manuscript.

