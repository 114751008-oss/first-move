# FIRST MOVE｜高中數學解題思維實驗室

> 解題之前，先找到第一步。

一個使用 **HTML / CSS / 原生 JavaScript** 製作的原創互動高中數學教學網站。以「觀察 → 選擇 → 提示 → 解答 → 反思」五階段，讓學習者先思考解題起點，再閱讀詳解。

## 功能

- 原創響應式首頁提供五個教學模組，涵蓋絕對值、算幾不等式、斜率、二次式與等差數列。
- 依單元分類篩選，選擇解題方向後提供對應回饋。
- 分段提示、解答、反思及延伸問題。
- 已完成狀態保存在瀏覽器內，不需登入。
- `AGENTS.md` 規範 AI 如何新增單元，`scripts/validate.mjs` 檢查內容格式。

## 本地預覽

> ES Modules 需透過 HTTP 伺服器開啟；不要直接雙擊 `index.html` 使用 `file://`。

```bash
python -m http.server 8000
```

在專案根目錄執行上方指令後，瀏覽 `http://localhost:8000/`。`npm run start` 會呼叫同一個 Python 指令，也可使用 VS Code Live Server。

## 自動驗證

請安裝 Node.js（支援 ES Modules 的現代版本）。本專案沒有 npm 相依套件：

```bash
npm run check
```

也可直接執行 `node scripts/validate.mjs`。腳本檢查單元 Schema、ID 與編號的唯一性、策略數量、正確選項及必要檔案。首頁路徑檢查會確認 `index.html` 包含預期的 CSS 與 JavaScript 相對路徑，並攔截以單一 `/` 開頭的 `src` 或 `href` 值。**數學正確性、實際視覺和完整互動仍需人工或瀏覽器驗收**。

## 專案結構

```text
first-move/
├── .gitignore
├── AGENTS.md
├── README.md
├── index.html
├── package.json
├── assets/               # 本機空目錄，網站未使用
├── css/
│   └── style.css
├── data/
│   └── lessons.js
├── js/
│   ├── app.js
│   └── lesson.js
└── scripts/
    └── validate.mjs
```

GitHub 儲存庫另保留早期上傳在根目錄的檔案，包括 `app.js`、`lesson.js`、`lessons.js`、`style.css`、`validate.mjs` 和 `download`。網站與驗證腳本使用上方目錄樹的路徑。

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

網站已部署至 GitHub Pages。以下以在另一個 Repository 從 `main` 分支的 `/(root)` 部署為例。

1. 在 GitHub 建立公開 Repository：例如 `first-move`。
2. 將專案檔案推送到 Repository 的 `main` 分支。
3. 前往 **Settings → Pages**，在 **Build and deployment** 選擇 **Deploy from a branch**，指定 `main` 和 `/(root)`，儲存。
4. 等 GitHub Pages 顯示成功部署後，前往 `https://<your-username>.github.io/first-move/` 確認。

請依實際帳號與 Repository 名稱替換示例網址。`index.html` 透過 `./css/style.css` 和 `./js/app.js` 載入樣式與入口模組，`js/app.js` 再透過 `./lesson.js` 和 `../data/lessons.js` 載入互動模組及單元資料。這些相對路徑在 `/first-move/` 等專案子路徑下皆可解析。

## 原創性與適用範圍

內容從台灣高中數學的教學難點出發，自行撰寫互動提示、策略與解題反思；圖形由原生 SVG 程式繪製，沒有抄用課堂示範網頁、圖片或第三方版型。專案雖可擴充，仍需教師審查題目、數學推論與學生適切性。
