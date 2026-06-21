# GitHub Pages 部署指南（中文版）

## 你需要上傳的檔案

- `index.html`：主要作品集檔案，可直接部署。
- `assets/`：圖片資料夾。
- `.nojekyll`：避免 GitHub Pages 用 Jekyll 處理靜態檔案。
- `src/main.optimized.jsx`：可讀版 React 原始碼，方便未來維護；部署時不是必要檔，但建議保留。

## 圖片放置方式

建議路徑：

```text
assets/cv_visual.webp
assets/projects/emobot-plus-cover.webp
assets/projects/startup-intelligence-platform-cover.webp
```

目前首頁 hero 圖片會優先讀取：

```text
assets/cv_visual.webp
```

如果找不到，會自動 fallback 到舊路徑：

```text
cv_visual.png
```

建議正式投遞履歷時只保留壓縮後的 `.webp` 或 `.avif`，不要把原始大圖、PSD、Figma 匯出原檔一起放進公開 GitHub repository。

## 本機測試

在資料夾內執行：

```bash
python3 -m http.server 8000
```

然後打開：

```text
http://localhost:8000
```

## GitHub Pages 部署

1. 到 GitHub 建立新的 repository，例如 `guan-ting-portfolio`。
2. 將 `index.html`、`assets/`、`.nojekyll` 上傳到 repository 根目錄。
3. 進入 repository 的 `Settings` → `Pages`。
4. `Build and deployment` 選擇 `Deploy from a branch`。
5. Branch 選 `main`，資料夾選 `/root`，按 Save。
6. 等待 Actions / Pages 部署完成。
7. 網址通常會是：

```text
https://你的-github-username.github.io/guan-ting-portfolio/
```

若你建立的是特殊 repository：

```text
你的-github-username.github.io
```

則網址會是：

```text
https://你的-github-username.github.io/
```
