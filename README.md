# FIRST MOVE｜高中數學解題思維實驗室

> 解題之前，先找到第一步。

一個使用 **HTML / CSS / 原生 JavaScript** 製作的原創互動高中數學教學網站。以「觀察 → 選擇 → 提示 → 解答 → 反思」五階段，讓學習者先思考解題起點，再閱讀詳解。

## 功能

- 原創響應式首頁與四個教學模組：絕對值、算幾不等式、斜率、二次式。
- 依單元分類篩選，選擇解題方向後提供對應回饋。
- 分段提示、解答、反思及延伸問題。
- 已完成狀態保存在瀏覽器內，不需登入。
- `AGENTS.md` 規範 AI 如何新增單元，`scripts/validate.mjs` 檢查內容格式。

## 本地預覽

> ES Modules 需透過 HTTP 伺服器開啟；不要直接雙擊 `index.html` 使用 `file://`。

```bash
python -m http.server 8000
```

瀏覽 `http://localhost:8000`。也可使用 VS Code Live Server。

## 自動驗證

請安裝 Node.js（支援 ES Modules 的現代版本）。本專案沒有 npm 相依套件：

```bash
npm run check
```

此檢查涵蓋 Schema、重複 ID、正確選項、存在的入口檔案、頁面中的相對資源引用。**數學正確性、實際視覺和完整互動仍需人工或瀏覽器驗收**。

## 專案結構

```text
first-move/
├── AGENTS.md
├── README.md
├── index.html
├── css/style.css
├── js/app.js
├── js/lesson.js
├── data/lessons.js
├── scripts/validate.mjs
├── package.json
└── .gitignore
```

## 如何新增一題

1. 先閱讀 `AGENTS.md`。
2. 在 `data/lessons.js` 新增一筆符合 Schema 的物件，編號、ID 不得重複。
3. 執行 `npm run check`。
4. 在瀏覽器測試新題互動與手機版，審閱數學推論。
5. 記錄 Git commit。

網站首頁會自動讀取新題並產生課程卡片，不需手改 HTML。

### 可直接交給 Coding Agent 的測試指令

> 請先閱讀 AGENTS.md，再新增「數列等差中項」互動單元。只修改 data/lessons.js，依照五階段教學法編寫題目、策略回饋、提示、詳解與反思。完成後執行 npm run check，並回報修改檔案與驗證結果。不要覆蓋現有單元。

## 部署至 GitHub Pages

1. 在 GitHub 建立公開 Repository：例如 `first-move`。
2. 將本資料夾全部檔案推送到 Repository 的 `main` 分支。
3. 前往 **Settings → Pages**，在 **Build and deployment** 選擇 **Deploy from a branch**，指定 `main` 和 `/(root)`，儲存。
4. 等 GitHub Pages 顯示成功部署後，前往 `https://<your-username>.github.io/first-move/` 確認。

請依實際 Repository 名稱和帳號替換網址；本專案沒有預先假設已經部署成功。

## 原創性與適用範圍

內容從台灣高中數學的教學難點出發，自行撰寫互動提示、策略與解題反思；圖形由原生 SVG 程式繪製，沒有抄用課堂示範網頁、圖片或第三方版型。專案雖可擴充，仍需教師審查題目、數學推論與學生適切性。
