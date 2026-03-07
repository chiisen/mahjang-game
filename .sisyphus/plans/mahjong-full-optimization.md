# 麻將網頁版完整優化計劃

## TL;DR

> **Quick Summary**: 對麻將網頁版進行全面優化，包括工程化重構、程式碼品質提升、AI 邏輯優化、完整計分系統、使用者體驗改善、以及測試覆蓋
> 
> **Deliverables**: 
> - Vite 建置環境
> - ES6 Modules 重構
> - 修復 canChow 演算法
> - AI 策略優化
> - 完整台灣麻將番型
> - 測試框架與單元測試
> 
> **Estimated Effort**: XL (大型)
> **Parallel Execution**: YES - 多 wave
> **Critical Path**: Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6

---

## Context

### Original Request
根據 docs/TODO.md 執行完整優化，包含：
- Phase 1: 架構/工程化 (Vite, ES6 Modules)
- Phase 2: 程式碼品質 (封裝、修復 Bug、註解)
- Phase 3: AI 邏輯優化
- Phase 4: 完整計分系統
- Phase 5: 使用者體驗
- Phase 6: 測試覆蓋

### Test Strategy Decision
- **Infrastructure exists**: NO
- **Automated tests**: YES (TDD)
- **Framework**: vitest
- **Agent-Executed QA**: ALWAYS

---

## Work Objectives

### Core Objective
將麻將網頁版從 Vanilla JS 重構為現代化工程專案，同時修復已知問題並增強功能。

### Must Have
- [ ] Vite 建置工具引入
- [ ] ES6 Modules 重構
- [ ] canChow 演算法修復
- [ ] AI 決策優化
- [ ] 完整番型計分
- [ ] 單元測試覆蓋

### Must NOT Have
- [ ] 破壞現有遊戲邏輯
- [ ] 新增非必要的第三方依賴
- [ ] 過度工程化（如引入 Redux）

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO - 需要建立
- **Automated tests**: YES (TDD)
- **Framework**: vitest
- **If TDD**: 每個任務遵循 RED → GREEN → REFACTOR

### QA Policy
每個任務必須包含 Agent-Executed QA 場景：
- **Frontend/UI**: Playwright - 開啟瀏覽器、驗證 DOM、截圖
- **Logic/Module**: Bash (node) - Import、呼叫函數、驗證輸出

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — 基礎設施):
├── Task 1: 初始化 Vite 專案 + 配置
├── Task 2: 建立測試環境 (vitest)
├── Task 3: 建立專案目錄結構
├── Task 4: 建立基礎測試範例
└── Task 5: 現有程式碼遷移規劃

Wave 2 (After Wave 1 — 核心重構):
├── Task 6: tiles.js 重構為 ES6 Module
├── Task 7: player.js 重構為 ES6 Module
├── Task 8: ai.js 重構為 ES6 Module
├── Task 9: scoring.js 重構為 ES6 Module
├── Task 10: game.js 重構為 ES6 Module
└── Task 11: index.html 改為 ES6 Module 載入

Wave 3 (After Wave 2 — 錯誤修復):
├── Task 12: 修復 canChow 演算法
├── Task 13: 為核心函數新增 JSDoc
├── Task 14: 建立 tiles.js 單元測試
└── Task 15: 建立 player.js 單元測試

Wave 4 (After Wave 3 — AI 優化):
├── Task 16: 移除 AI 隨機決策
├── Task 17: 實作基本牌譜策略
├── Task 18: 建立 ai.js 單元測試
└── Task 19: 建立 scoring.js 單元測試

Wave 5 (After Wave 4 — 計分系統):
├── Task 20: 實作天胡/地胡/人胡
├── Task 21: 實作海底撈月/河底撈魚
├── Task 22: 實作大三元/大四喜
├── Task 23: 實作清一色/混一色
└── Task 24: 實作對對胡/平胡

Wave 6 (After Wave 5 — 使用者體驗):
├── Task 25: 移除硬編碼 setTimeout
├── Task 26: 優化牌疊動畫效果
├── Task 27: 實作設定功能
├── Task 28: 行動裝置支援
└── Task 29: 建立整合測試

Wave FINAL (After ALL — 驗證):
├── Task F1: Plan Compliance Audit
├── Task F2: Code Quality Review
├── Task F3: Real Manual QA
└── Task F4: Scope Fidelity Check
```

---

## TODOs

- [ ] 1. 初始化 Vite 專案 + 配置

  **What to do**:
  - 安裝 Vite: `npm create vite@latest . -- --template vanilla`
  - 配置 vite.config.js
  - 建立 package.json scripts
  - 設定 tsconfig.json (如需 TypeScript)

  **Must NOT do**:
  - 不要修改現有 HTML/CSS 結構

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要建置工具配置經驗
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 2, 3, 4, 5
  - **Blocked By**: None

  **References**:
  - Official docs: `https://vite.dev/` - Vite 配置

  **Acceptance Criteria**:
  - [ ] `npm run dev` 可啟動開發伺服器
  - [ ] `npm run build` 可建置 production

  **QA Scenarios**:
  ```
  Scenario: Vite 開發伺服器可正常啟動
    Tool: Bash
    Preconditions: 已執行 npm install
    Steps:
      1. cd 到專案目錄
      2. 執行 npm run dev
      3. 檢查是否有錯誤輸出
    Expected Result: 伺服器成功啟動，顯示 localhost:5173
    Failure Indicators: Error messages, build failures

  Scenario: Vite 建置成功
    Tool: Bash
    Preconditions: None
    Steps:
      1. 執行 npm run build
      2. 檢查 dist 目錄
    Expected Result: dist 目錄包含優化後的檔案
    Failure Indicators: Build errors, missing files
  ```

  **Commit**: YES
  - Message: `feat(infrastructure): init Vite project`
  - Files: `package.json`, `vite.config.js`, `index.html`

---

- [ ] 2. 建立測試環境 (vitest)

  **What to do**:
  - 安裝 vitest: `npm install -D vitest`
  - 配置 vitest.config.js
  - 新增 test script 到 package.json

  **Must NOT do**:
  - 不要修改現有程式碼

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 測試框架配置
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 4
  - **Blocked By**: None

  **References**:
  - Official docs: `https://vitest.dev/` - Vitest 配置

  **Acceptance Criteria**:
  - [ ] `npm test` 可執行
  - [ ] 可執行簡單測試案例

  **QA Scenarios**:
  ```
  Scenario: Vitest 可執行測試
    Tool: Bash
    Preconditions: 已安裝 vitest
    Steps:
      1. 執行 npm test -- --run
      2. 檢查輸出
    Expected Result: 測試框架啟動，顯示 0 tests
    Failure Indicators: Test framework errors
  ```

  **Commit**: YES
  - Message: `test(infrastructure): setup vitest`
  - Files: `vitest.config.js`, `package.json`

---

- [ ] 3. 建立專案目錄結構

  **What to do**:
  - 建立 src/ 目錄結構:
    - src/tiles/
    - src/player/
    - src/ai/
    - src/scoring/
    - src/game/
    - src/ui/
  - 移動現有 JS 檔案到對應目錄

  **Must NOT do**:
  - 不要修改程式碼內容

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 簡單的檔案移動
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 6, 7, 8, 9, 10
  - **Blocked By**: 1

  **References**:
  - 現有結構: js/tiles.js, js/player.js 等

  **Acceptance Criteria**:
  - [ ] 目錄結構符合現代專案慣例

  **QA Scenarios**:
  ```
  Scenario: 目錄結構正確建立
    Tool: Bash
    Preconditions: None
    Steps:
      1. ls -R src/
    Expected Result: 顯示正確的目錄樹
  ```

  **Commit**: YES
  - Message: `refactor(structure): reorganize project directories`
  - Files: 移動後的目錄

---

- [ ] 4. 建立基礎測試範例

  **What to do**:
  - 建立 tests/tiles.test.js 範例
  - 建立測試 tile 基礎功能

  **Must NOT do**:
  - 不要破壞現有邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 測試碼撰寫
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 14
  - **Blocked By**: 2

  **References**:
  - 現有 tiles.js

  **Acceptance Criteria**:
  - [ ] 測試可通過

  **QA Scenarios**:
  ```
  Scenario: 基礎測試可執行
    Tool: Bash
    Preconditions: vitest 已設定
    Steps:
      1. npm test -- --run
    Expected Result: 測試通過
  ```

  **Commit**: YES
  - Message: `test: add example unit test`
  - Files: `tests/tiles.test.js`

---

- [ ] 5. 現有程式碼遷移規劃

  **What to do**:
  - 分析現有程式碼依賴關係
  - 規劃 import/export 結構

  **Must NOT do**:
  - 不要修改程式碼

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 需要理解程式碼結構
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: 6, 7, 8, 9, 10
  - **Blocked By**: None

  **References**:
  - 現有 js/*.js 檔案

  **Acceptance Criteria**:
  - [ ] 產生遷移計劃文件

  **QA Scenarios**:
  ```
  Scenario: 依賴關係分析完成
    Tool: Read
    Preconditions: None
    Steps:
      1. 分析現有程式碼
    Expected Result: 產生 import 規劃
  ```

  **Commit**: NO

---

- [ ] 6. tiles.js 重構為 ES6 Module

  **What to do**:
  - 將 Tile, TileSet, TileType, TileValue 等改為 export
  - 使用 ES6 class 語法
  - 新增 import/export

  **Must NOT do**:
  - 不要改變現有邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要 JS 重構經驗
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 11, 12, 14
  - **Blocked By**: 3

  **References**:
  - `js/tiles.js` - 現有實作

  **Acceptance Criteria**:
  - [ ] 可被其他模組 import

  **QA Scenarios**:
  ```
  Scenario: tiles.js 可被 import
    Tool: Bash
    Preconditions: 程式碼已重構
    Steps:
      1. node -e "import('./src/tiles/index.js')"
    Expected Result: 無錯誤
  ```

  **Commit**: YES
  - Message: `refactor(tiles): convert to ES6 module`
  - Files: `src/tiles/index.js`

---

- [ ] 7. player.js 重構為 ES6 Module

  **What to do**:
  - 將 Player class 改為 export
  - 新增 import 依賴

  **Must NOT do**:
  - 不要改變現有邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要 JS 重構經驗
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 13, 15
  - **Blocked By**: 3

  **References**:
  - `js/player.js` - 現有實作

  **Acceptance Criteria**:
  - [ ] 可被其他模組 import

  **QA Scenarios**:
  ```
  Scenario: player.js 可被 import
    Tool: Bash
    Preconditions: 程式碼已重構
    Steps:
      1. node -e "import('./src/player/index.js')"
    Expected Result: 無錯誤
  ```

  **Commit**: YES
  - Message: `refactor(player): convert to ES6 module`
  - Files: `src/player/index.js`

---

- [ ] 8. ai.js 重構為 ES6 Module

  **What to do**:
  - 將 AIPlayer class 改為 export

  **Must NOT do**:
  - 不要改變現有邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要 JS 重構經驗
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 16, 17, 18
  - **Blocked By**: 3

  **References**:
  - `js/ai.js` - 現有實作

  **Acceptance Criteria**:
  - [ ] 可被其他模組 import

  **QA Scenarios**:
  ```
  Scenario: ai.js 可被 import
    Tool: Bash
    Preconditions: 程式碼已重構
    Steps:
      1. node -e "import('./src/ai/index.js')"
    Expected Result: 無錯誤
  ```

  **Commit**: YES
  - Message: `refactor(ai): convert to ES6 module`
  - Files: `src/ai/index.js`

---

- [ ] 9. scoring.js 重構為 ES6 Module

  **What to do**:
  - 將 Scoring class 改為 export

  **Must NOT do**:
  - 不要改變現有邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要 JS 重構經驗
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 19, 20, 21, 22, 23, 24
  - **Blocked By**: 3

  **References**:
  - `js/scoring.js` - 現有實作

  **Acceptance Criteria**:
  - [ ] 可被其他模組 import

  **QA Scenarios**:
  ```
  Scenario: scoring.js 可被 import
    Tool: Bash
    Preconditions: 程式碼已重構
    Steps:
      1. node -e "import('./src/scoring/index.js')"
    Expected Result: 無錯誤
  ```

  **Commit**: YES
  - Message: `refactor(scoring): convert to ES6 module`
  - Files: `src/scoring/index.js`

---

- [ ] 10. game.js 重構為 ES6 Module

  **What to do**:
  - 將 Game class, GameState, PlayerDirection, Logger 改為 export

  **Must NOT do**:
  - 不要改變現有邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要 JS 重構經驗
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: 11, 25, 26, 27, 28, 29
  - **Blocked By**: 3

  **References**:
  - `js/game.js` - 現有實作

  **Acceptance Criteria**:
  - [ ] 可被其他模組 import

  **QA Scenarios**:
  ```
  Scenario: game.js 可被 import
    Tool: Bash
    Preconditions: 程式碼已重構
    Steps:
      1. node -e "import('./src/game/index.js')"
    Expected Result: 無錯誤
  ```

  **Commit**: YES
  - Message: `refactor(game): convert to ES6 module`
  - Files: `src/game/index.js`

---

- [ ] 11. index.html 改為 ES6 Module 載入

  **What to do**:
  - 修改 index.html 使用 ES6 module
  - 建立 src/main.js 作為 entry point

  **Must NOT do**:
  - 不要改變現有 DOM 結構

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要 HTML/JS 配置經驗
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: 6, 7, 8, 9, 10

  **References**:
  - `index.html` - 現有 HTML

  **Acceptance Criteria**:
  - [ ] 網頁可正常載入

  **QA Scenarios**:
  ```
  Scenario: 網頁可正常載入遊戲
    Tool: Playwright
    Preconditions: npm run dev 已啟動
    Steps:
      1. 打開瀏覽器訪問 localhost:5173
      2. 檢查遊戲標題是否顯示
    Expected Result: 正常顯示麻將網頁版
  ```

  **Commit**: YES
  - Message: `refactor(html): use ES6 module`
  - Files: `index.html`, `src/main.js`

---

- [ ] 12. 修復 canChow 演算法

  **What to do**:
  - 分析現有 canChow 邏輯問題
  - 實作正確的順子判斷演算法

  **Must NOT do**:
  - 不要破壞其他功能

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 需要演算法修復
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: 6, 7

  **References**:
  - `js/player.js:64-80` - 現有 canChow

  **Acceptance Criteria**:
  - [ ] 正確判斷可吃牌型

  **QA Scenarios**:
  ```
  Scenario: canChow 正確判斷順子
    Tool: Bash
    Preconditions: 程式碼已修復
    Steps:
      1. 執行單元測試
    Expected Result: 所有 canChow 測試通過
  ```

  **Commit**: YES
  - Message: `fix(player): correct canChow algorithm`
  - Files: `src/player/index.js`

---

- [ ] 13. 為核心函數新增 JSDoc

  **What to do**:
  - 為所有 exported functions 添加 JSDoc
  - 包含 @param, @returns 等

  **Must NOT do**:
  - 不要修改實際邏輯

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 文件撰寫
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: 6, 7, 8, 9, 10

  **References**:
  - 重構後的 src/ 檔案

  **Acceptance Criteria**:
  - [ ] 主要函數都有 JSDoc

  **QA Scenarios**:
  ```
  Scenario: JSDoc 已添加
    Tool: Grep
    Preconditions: None
    Steps:
      1. grep -r "@param" src/
    Expected Result: 找到多處 JSDoc
  ```

  **Commit**: YES
  - Message: `docs: add JSDoc comments`
  - Files: `src/**/*.js`

---

- [ ] 14. 建立 tiles.js 單元測試

  **What to do**:
  - 為 TileSet 類別建立完整測試
  - 測試洗牌、發牌、補牌

  **Must NOT do**:
  - 不要修改實際邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 測試碼撰寫
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: 4, 6

  **References**:
  - `src/tiles/index.js`

  **Acceptance Criteria**:
  - [ ] 所有 tiles.js 測試通過

  **QA Scenarios**:
  ```
  Scenario: tiles 測試通過
    Tool: Bash
    Preconditions: None
    Steps:
      1. npm test -- --run tiles
    Expected Result: All tests passed
  ```

  **Commit**: YES
  - Message: `test(tiles): add unit tests`
  - Files: `tests/tiles.test.js`

---

- [ ] 15. 建立 player.js 單元測試

  **What to do**:
  - 為 Player 類別建立完整測試
  - 測試吃碰槓胡判斷

  **Must NOT do**:
  - 不要修改實際邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 測試碼撰寫
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: 7

  **References**:
  - `src/player/index.js`

  **Acceptance Criteria**:
  - [ ] 所有 player.js 測試通過

  **QA Scenarios**:
  ```
  Scenario: player 測試通過
    Tool: Bash
    Preconditions: None
    Steps:
      1. npm test -- --run player
    Expected Result: All tests passed
  ```

  **Commit**: YES
  - Message: `test(player): add unit tests`
  - Files: `tests/player.test.js`

---

- [ ] 16. 移除 AI 隨機決策

  **What to do**:
  - 移除 ai.js 中的 Math.random()
  - 改為基於牌價值的邏輯判斷

  **Must NOT do**:
  - 不要破壞現有介面

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要 AI 邏輯修改
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: 8

  **References**:
  - `js/ai.js:17, 23, 29` - 隨機決策位置

  **Acceptance Criteria**:
  - [ ] AI 决策不再使用隨機

  **QA Scenarios**:
  ```
  Scenario: AI 不再使用隨機決策
    Tool: Grep
    Preconditions: None
    Steps:
      1. grep "Math.random" src/ai/
    Expected Result: 無結果
  ```

  **Commit**: YES
  - Message: `refactor(ai): remove random decisions`
  - Files: `src/ai/index.js`

---

- [ ] 17. 實作基本牌譜策略

  **What to do**:
  - 優先打孤張字牌
  - 保留潛在順子
  - 避免打出生張

  **Must NOT do**:
  - 不要破壞遊戲平衡

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要 AI 策略設計
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: 16

  **References**:
  - 現有 ai.js 邏輯

  **Acceptance Criteria**:
  - [ ] AI 有基本策略行為

  **QA Scenarios**:
  ```
  Scenario: AI 表現合理策略
    Tool: Bash
    Preconditions: 程式碼已修改
    Steps:
      1. npm test -- --run ai
    Expected Result: AI 測試通過
  ```

  **Commit**: YES
  - Message: `feat(ai): add basic strategy`
  - Files: `src/ai/index.js`

---

- [ ] 18. 建立 ai.js 單元測試

  **What to do**:
  - 為 AIPlayer 類別建立測試
  - 測試各種決策場景

  **Must NOT do**:
  - 不要修改實際邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 測試碼撰寫
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: 16, 17

  **References**:
  - `src/ai/index.js`

  **Acceptance Criteria**:
  - [ ] 所有 ai.js 測試通過

  **QA Scenarios**:
  ```
  Scenario: ai 測試通過
    Tool: Bash
    Preconditions: None
    Steps:
      1. npm test -- --run ai
    Expected Result: All tests passed
  ```

  **Commit**: YES
  - Message: `test(ai): add unit tests`
  - Files: `tests/ai.test.js`

---

- [ ] 19. 建立 scoring.js 單元測試

  **What to do**:
  - 為 Scoring 類別建立測試
  - 測試各類番型計算

  **Must NOT do**:
  - 不要修改實際邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 測試碼撰寫
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4
  - **Blocks**: None
  - **Blocked By**: 9

  **References**:
  - `src/scoring/index.js`

  **Acceptance Criteria**:
  - [ ] 所有 scoring.js 測試通過

  **QA Scenarios**:
  ```
  Scenario: scoring 測試通過
    Tool: Bash
    Preconditions: None
    Steps:
      1. npm test -- --run scoring
    Expected Result: All tests passed
  ```

  **Commit**: YES
  - Message: `test(scoring): add unit tests`
  - Files: `tests/scoring.test.js`

---

- [ ] 20. 實作天胡/地胡/人胡

  **What to do**:
  - 在 scoring.js 新增判斷邏輯

  **Must NOT do**:
  - 不要破壞現有計分

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要計分邏輯
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: 9, 19

  **References**:
  - `js/scoring.js` - 現有邏輯

  **Acceptance Criteria**:
  - [ ] 天胡/地胡/人胡 可正確計算

  **QA Scenarios**:
  ```
  Scenario: 特殊胡牌型計算正確
    Tool: Bash
    Preconditions: 程式碼已修改
    Steps:
      1. npm test -- --run scoring
    Expected Result: 測試通過
  ```

  **Commit**: YES
  - Message: `feat(scoring): add special win patterns`
  - Files: `src/scoring/index.js`

---

- [ ] 21. 實作海底撈月/河底撈魚

  **What to do**:
  - 新增海底撈月/河底撈魚 番型

  **Must NOT do**:
  - 不要破壞現有邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要計分邏輯
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: 20

  **References**:
  - 現有 scoring.js

  **Acceptance Criteria**:
  - [ ] 番型可正確計算

  **QA Scenarios**:
  ```
  Scenario: 海底撈月/河底撈魚 計算正確
    Tool: Bash
    Preconditions: 程式碼已修改
    Steps:
      1. npm test -- --run scoring
    Expected Result: 測試通過
  ```

  **Commit**: YES
  - Message: `feat(scoring): add last tile patterns`
  - Files: `src/scoring/index.js`

---

- [ ] 22. 實作大三元/大四喜

  **What to do**:
  - 新增大三元/大四喜 番型

  **Must NOT do**:
  - 不要破壞現有邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要計分邏輯
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: 20

  **References**:
  - 現有 scoring.js

  **Acceptance Criteria**:
  - [ ] 番型可正確計算

  **QA Scenarios**:
  ```
  Scenario: 大三元/大四喜 計算正確
    Tool: Bash
    Preconditions: 程式碼已修改
    Steps:
      1. npm test -- --run scoring
    Expected Result: 測試通過
  ```

  **Commit**: YES
  - Message: `feat(scoring): add honor patterns`
  - Files: `src/scoring/index.js`

---

- [ ] 23. 實作清一色/混一色

  **What to do**:
  - 新增清一色/混一色 番型

  **Must NOT do**:
  - 不要破壞現有邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要計分邏輯
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: 20

  **References**:
  - 現有 scoring.js

  **Acceptance Criteria**:
  - [ ] 番型可正確計算

  **QA Scenarios**:
  ```
  Scenario: 清一色/混一色 計算正確
    Tool: Bash
    Preconditions: 程式碼已修改
    Steps:
      1. npm test -- --run scoring
    Expected Result: 測試通過
  ```

  **Commit**: YES
  - Message: `feat(scoring): add suit patterns`
  - Files: `src/scoring/index.js`

---

- [ ] 24. 實作對對胡/平胡

  **What to do**:
  - 新增對對胡/平胡 番型

  **Must NOT do**:
  - 不要破壞現有邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要計分邏輯
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 5
  - **Blocks**: None
  - **Blocked By**: 20

  **References**:
  - 現有 scoring.js

  **Acceptance Criteria**:
  - [ ] 番型可正確計算

  **QA Scenarios**:
  ```
  Scenario: 對對胡/平胡 計算正確
    Tool: Bash
    Preconditions: 程式碼已修改
    Steps:
      1. npm test -- --run scoring
    Expected Result: 測試通過
  ```

  **Commit**: YES
  - Message: `feat(scoring): add hand patterns`
  - Files: `src/scoring/index.js`

---

- [ ] 25. 移除硬編碼 setTimeout

  **What to do**:
  - 將 setTimeout 改為可配置
  - 或使用 CSS transition

  **Must NOT do**:
  - 不要改變遊戲邏輯

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要程式碼優化
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6
  - **Blocks**: None
  - **Blocked By**: 10

  **References**:
  - `js/game.js` - setTimeout 位置

  **Acceptance Criteria**:
  - [ ] 硬編碼時間已移除

  **QA Scenarios**:
  ```
  Scenario: 無硬編碼 setTimeout
    Tool: Grep
    Preconditions: None
    Steps:
      1. grep "setTimeout" src/game/
    Expected Result: 無結果或已參數化
  ```

  **Commit**: YES
  - Message: `refactor(game): remove hardcoded timeouts`
  - Files: `src/game/index.js`

---

- [ ] 26. 優化牌疊動畫效果

  **What to do**:
  - 改善牌疊 hover 效果
  - 強化選取狀態視覺

  **Must NOT do**:
  - 不要破壞現有佈局

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI/UX 優化
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6
  - **Blocks**: None
  - **Blocked By**: 10

  **References**:
  - `css/style.css`

  **Acceptance Criteria**:
  - [ ] 動畫效果流暢

  **QA Scenarios**:
  ```
  Scenario: 動畫效果正常
    Tool: Playwright
    Preconditions: npm run dev 已啟動
    Steps:
      1. 滑鼠移到牌疊上
      2. 檢查動畫效果
    Expected Result: 流暢的 hover 動畫
  ```

  **Commit**: YES
  - Message: `style(ui): enhance tile animations`
  - Files: `src/ui/styles.css`

---

- [ ] 27. 實作設定功能

  **What to do**:
  - 為設定按鈕新增功能
  - 支援：音效開關、動畫開關、遊戲速度

  **Must NOT do**:
  - 不要破壞現有功能

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 功能開發
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6
  - **Blocks**: None
  - **Blocked By**: 10

  **References**:
  - `index.html` - 設定按鈕

  **Acceptance Criteria**:
  - [ ] 設定功能可運作

  **QA Scenarios**:
  ```
  Scenario: 設定功能正常
    Tool: Playwright
    Preconditions: npm run dev 已啟動
    Steps:
      1. 點擊設定按鈕
      2. 檢查設定對話框
    Expected Result: 對話框開啟
  ```

  **Commit**: YES
  - Message: `feat(ui): add settings panel`
  - Files: `src/ui/`, `index.html`

---

- [ ] 28. 行動裝置支援

  **What to do**:
  - 新增觸控事件處理
  - 響應式牌疊尺寸

  **Must NOT do**:
  - 不要破壞桌面版

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 響應式設計
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6
  - **Blocks**: None
  - **Blocked By**: 10

  **References**:
  - `css/style.css`

  **Acceptance Criteria**:
  - [ ] 行動裝置可正常操作

  **QA Scenarios**:
  ```
  Scenario: 行動裝置支援正常
    Tool: Playwright
    Preconditions: None
    Steps:
      1. 模擬行動裝置 viewport
      2. 檢查牌疊顯示
    Expected Result: 正確顯示
  ```

  **Commit**: YES
  - Message: `style(ui): add mobile support`
  - Files: `src/ui/styles.css`

---

- [ ] 29. 建立整合測試

  **What to do**:
  - 建立完整遊戲流程測試
  - 測試 AI 整合

  **Must NOT do**:
  - 不要破壞現有測試

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 整合測試
  - **Skills**: []
  - **Skills Evaluated but Omitted**:

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 6
  - **Blocks**: None
  - **Blocked By**: 14, 15, 18, 19

  **References**:
  - 各單元測試檔案

  **Acceptance Criteria**:
  - [ ] 整合測試通過

  **QA Scenarios**:
  ```
  Scenario: 整合測試通過
    Tool: Bash
    Preconditions: None
    Steps:
      1. npm test -- --run
    Expected Result: All tests passed
  ```

  **Commit**: YES
  - Message: `test: add integration tests`
  - Files: `tests/integration.test.js`

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — `oracle`
  檢查所有 Must Have 是否完成
  Output: VERDICT: APPROVE/REJECT

- [ ] F2. **Code Quality Review** — `unspecified-high`
  執行 npm run build + npm test
  Output: Build [PASS/FAIL] | Tests [N pass/N fail] | VERDICT

- [ ] F3. **Real Manual QA** — `unspecified-high`
  使用 Playwright 驗證遊戲功能
  Output: Scenarios [N/N pass] | VERDICT

- [ ] F4. **Scope Fidelity Check** — `deep`
  驗證無多餘變更
  Output: VERDICT

---

## Success Criteria

### Verification Commands
```bash
npm run dev     # 開發伺服器正常啟動
npm run build   # 建置成功
npm test        # 所有測試通過
```

### Final Checklist
- [ ] 所有 Must Have 完成
- [ ] 所有 Must NOT Have 遵守
- [ ] 建置無錯誤
- [ ] 測試全部通過
