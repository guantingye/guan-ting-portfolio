# Guan-Ting Ye Portfolio — GitHub Pages Ready

## Files
- `index.html`: deploy-ready portfolio. It can be opened directly in a browser and can be uploaded to GitHub Pages.
- `assets/`: put optimized images here.
- `src/main.optimized.jsx`: readable React source used to produce the deploy-ready inline script.

## Image convention
Use paths such as:
- `assets/cv_visual.webp`
- `assets/projects/emobot-plus-cover.webp`
- `assets/projects/startup-intelligence-platform-cover.webp`

The current hero image tries `assets/cv_visual.webp` first and falls back to `cv_visual.png` if you keep the old image beside `index.html`.

## Quick local test
Double-click `index.html`, or run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages quick deploy
1. Create a new GitHub repository, for example `guan-ting-portfolio`.
2. Upload `index.html` and the `assets/` folder to the repository root.
3. Go to `Settings` → `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Choose branch `main` and folder `/root`, then save.
6. Wait for the deployment to finish. Your site will usually be available at:
   `https://<your-github-username>.github.io/guan-ting-portfolio/`
