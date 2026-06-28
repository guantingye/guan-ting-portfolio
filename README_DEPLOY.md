# Guan-Ting Ye Portfolio — GitHub Pages Ready

## Files
- `index.html`: deploy-ready portfolio. It can be opened directly in a browser and can be uploaded to GitHub Pages.
- `assets/`: put optimized images here.
- `src/main.optimized.jsx`: readable React source used to produce the deploy-ready inline script.
- `assets/Ye_Guan Ting, CV.pdf`: resume download target used by the navigation and static fallback.

## Image convention
Use paths such as:
- `assets/cv_visual.webp`
- `assets/projects/emobot-plus-cover.webp`
- `assets/projects/startup-intelligence-platform-cover.webp`

The current hero image uses `assets/cv_visual.webp`.

The page includes a static fallback inside `#root`. If the external React ESM CDN is unavailable, visitors still see a useful portfolio summary with contact and CV links instead of a loading-only screen.

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
