# pi-btw

一個小巧的 [pi](https://github.com/earendil-works/pi-mono) 擴充套件，新增一個 `/btw` 側聊頻道。

`/btw` 會打開一個真正具備程式工具存取權的 pi 子會話，即使主代理還在忙碌中也能立刻運作。

![BTW overlay example](docs/btw-overlay.png)

## 功能

- 在不打斷主執行流程的情況下，打開一個並行的側邊對話
- 這個側邊對話會以真正的 pi 子會話運行，具備 `read` / `bash` / `edit` / `write` 工具存取權
- 預設維持一個連續的 BTW 話題
- 接受 `/side` 作為 `/btw` 進入指令的別名
- 支援 `/btw:tangent`，用於不繼承目前主線程對話的無上下文側邊話題
- 支援 `/btw:ask`，用於繼承主線程上下文、但只暴露 `read` / `grep` / `find` / `ls` 的只讀側邊話題
- 打開一個專屬的 BTW 彈出視窗，擁有自己的輸入框與對話記錄
- 用 `Alt+/`、`Super+/` 或 `Ctrl+Alt+W`（皆可重新綁定）切回主編輯器焦點時，BTW 視窗仍會保持開啟
- 讓 BTW 話題紀錄不會進入主代理未來的上下文中
- 支援僅限 BTW 使用的模型與思考深度覆寫設定，不影響主線程設定
- 可以將完整話題，或是該話題的摘要，注入回主代理
- 可選擇用 `--save` 將單次 BTW 交流保存為可見的會話筆記

## 安裝

pi-btw 支援 Pi 0.85.1 到 1.x 版本。

開發依賴目標為 Pi 0.99.2。CI 會在每個 PR 以及每週，針對鎖定的依賴版本、Pi
0.85.1，以及最新發布的 Pi 版本執行測試與型別檢查。Pi 0.99.2 需要
Node.js 22.19.0 或更新版本。

### 透過 npm 安裝（發布後）

```bash
pi install npm:pi-btw
```

### 透過 git 安裝

```bash
pi install git:github.com/dbachelder/pi-btw
```

然後重新載入 pi：

```text
/reload
```

### 從本機路徑安裝

```bash
pi install /absolute/path/to/pi-btw
```

## 使用方式

```text
/btw what file defines this route?
/side what file defines this route?
/btw how would you refactor this parser?
/btw --save summarize the last error in one sentence
/btw:new let's start a fresh thread about auth
/btw:tangent brainstorm from first principles without using the current chat context
/btw:ask what does this module do?
/btw:ask --save explain the latest test failure
/btw:model openai gpt-5-mini openai-responses
/btw:thinking low
/btw:inject implement the plan we just discussed
/btw:summarize turn that side thread into a short handoff
/btw:clear
```

## 指令

### `/btw [--save] <question>`

- 立即執行
- 即使 pi 正在忙碌中也能運作
- 建立或重用一個真正的 BTW 子會話，而不是臨時的單次補全呼叫
- 延續目前的 BTW 話題
- 打開或重新整理專屬的 BTW 彈出視窗
- 將內容串流到 BTW 視窗的對話記錄/狀態介面中
- 在 RPC/SDK 主機上，完成的行內提問回應會改以可見的會話筆記顯示
- 僅用輸入框的 `/btw`（不帶問題文字）需要 TUI；在 RPC/SDK 主機上請直接把問題文字接在指令後面
- 將這次 BTW 交流保存為隱藏的話題狀態
- 加上 `--save` 的話，也會將這一次交流保存為可見的會話筆記

### `/side [--save] <question>`

- `/btw` 的別名，對應 Codex 中的同等指令
- 與 `/btw` 共用同一個話題、視窗、持久化紀錄、模型與思考深度設定
- `/btw` 仍是正式指令；生命週期相關指令仍統一放在 `/btw:*` 命名空間下，因此沒有 `/side:new` 或 `/side:clear`

## 視窗控制

- `Alt+w` 可以切換視窗在有框線的視窗版面（相對於終端機邊緣內縮）與寬幅版面之間
- 寬幅模式下，終端機的 Shift+拖曳選取只會框選到對話框本身的文字，方便複製而不會夾帶周圍主畫面的內容
- 視窗模式會保留完整的方框外框；寬幅模式則會移除左右邊框與角落字符（只保留水平分隔線），確保這些邊框欄位不會落在拖曳選取範圍內
- `Alt+/`、`Super+/` 或 `Ctrl+Alt+W` 可以在 BTW 與主編輯器之間切換焦點，而不會關閉視窗
- `Super+/` 需要終端機能回報 Super 修飾鍵，通常透過 Kitty 鍵盤協定才能支援
- `Ctrl+Alt+W` 是給無法傳送上述任一主要快捷鍵的終端機使用的備援方案
- 如果這些快捷鍵跟你的視窗管理器或終端機衝突，可以設定 `PI_BTW_FOCUS_KEYS` 環境變數重新對應
- 這個值是逗號分隔的 pi-tui 鍵值識別字串列表，例如 `PI_BTW_FOCUS_KEYS="ctrl+/,ctrl+alt+b"`；它會完全取代預設值
- 識別字串可以組合 `ctrl`、`shift`、`alt`、`super` 加上單一的基礎鍵（字母、數字、符號，或像 `enter`/`f5` 這種具名按鍵）；空白或無效的項目會被忽略，若沒有可用項目則保留預設值
- 當 BTW 正在串流輸出時，第一次按 `Esc` 會中斷請求但保留部分對話記錄；再按一次 `Esc` 才會關閉視窗
- 當 BTW 處於閒置狀態時，`Esc` 會立即關閉視窗
- BTW 現在會從畫面上方居中位置打開，讓主會話在它下方仍保持可見

### `/btw:new [question]`

- 清除目前的 BTW 話題
- 開始一個全新的話題，但仍繼承目前主線程的上下文
- 可選擇立即在新話題中提出第一個問題
- 如果沒有提供問題，就打開一個全新的 BTW 視窗，等待下一個提問

### `/btw:tangent [--save] <question>`

- 開始或延續一個無上下文的支線話題
- 不會繼承目前主線程的對話
- 如果你從 `/btw` 切換到 `/btw:tangent`（或反過來切換），之前的側邊話題會被清除，避免兩種模式混在一起
- 打開或重新整理同一個專屬的 BTW 彈出視窗
- 加上 `--save` 的話，也會將這一次交流保存為可見的會話筆記

### `/btw:ask [--save] <question>`

- 開始或延續一個強制只讀的側邊話題
- 跟 `/btw` 一樣繼承目前主線程的對話
- 只暴露 pi 內建的只讀工具（`read`、`grep`、`find`、`ls`）；`bash`、`edit` 和 `write` 絕對不會提供給它
- 整個話題的生命週期內都維持只讀
- 視窗標題會標示該話題為只讀
- 如果你在 `/btw`、`/btw:tangent` 和 `/btw:ask` 之間切換，之前的側邊話題會被清除，子會話也會重新建立，確保能力邊界不會混淆
- 打開或重新整理同一個專屬的 BTW 彈出視窗
- 加上 `--save` 的話，也會將這一次交流保存為可見的會話筆記

### `/btw:clear`

- 關閉 BTW 視窗/小工具
- 清除目前的 BTW 話題

### `/btw:inject [instructions]`

- 將完整的 BTW 話題以使用者訊息的形式送回主代理
- 如果 pi 正在忙碌，會排入佇列作為後續訊息
- 傳送後會清除 BTW 話題

### `/btw:summarize [instructions]`

- 用目前實際生效的 BTW 模型對話題進行摘要
- 不論 BTW 對話本身是否使用思考深度覆寫，摘要時一律關閉思考模式
- 將摘要注入回主代理
- 如果 pi 正在忙碌，會排入佇列作為後續訊息
- 傳送後會清除 BTW 話題

### `/btw:model [<provider> <model> <api> | clear]`

- 不帶參數時，顯示目前實際生效的 BTW 模型，以及它是繼承而來還是被覆寫
- 帶參數時，設定一個僅限 BTW 使用的模型覆寫
- `clear` 會移除覆寫，讓 BTW 回到繼承主線程模型
- 如果設定的 BTW 模型沒有可用憑證，BTW 會發出警告並改用主線程模型

### `/btw:thinking [<level> | clear]`

- 不帶參數時，顯示目前實際生效的 BTW 思考深度，以及它是繼承而來還是被覆寫
- 帶參數時，為一般 BTW 對話設定一個僅限 BTW 使用的思考深度覆寫
- `clear` 會移除覆寫，讓 BTW 回到繼承主線程思考深度
- 更改 `/btw:model` 或 `/btw:thinking` 會釋放目前的 BTW 子會話，並在下一次 BTW 提問時套用新設定，同時保留隱藏話題

## 行為說明

### 真正的子會話模型

BTW 的實作是一個真正的 pi 子會話，擁有自己的記憶體內會話狀態、對話事件與工具介面。

- 有上下文的 `/btw` 話題會從目前主線程分支初始化這個子會話，同時過濾掉父層上下文中僅供 BTW 使用的筆記
- `/btw:tangent` 會以無上下文模式啟動同一套 BTW 介面，不繼承任何主線程對話
- `/btw:ask` 會跟 `/btw` 一樣繼承主線程上下文，但會把子會話的工具介面限制為 pi 的只讀工具，所以這個邊界是結構性的，不是靠提示詞約束
- BTW 可以繼承主線程的模型/思考深度設定，也可以透過 `/btw:model` 和 `/btw:thinking` 使用僅限 BTW 的覆寫
- `/btw:summarize` 使用目前實際生效的 BTW 模型，但一律關閉思考模式
- 視窗的對話記錄/狀態列由子會話事件驅動，因此工具活動、串流增量、失敗與復原狀態都能直接呈現，不需要解析渲染後的畫面輸出
- 子提問會保留主會話的指示，並額外附上一份具權威性的自身工具清單；繼承而來的工具/skill 指示與歷史工具呼叫都不會額外授予能力
- 交接指令（`/btw:inject` 和 `/btw:summarize`）會從 BTW 子會話的話題中讀取內容，而不是另外維護一個獨立的手動對話模型

### 選用的擴充工具

BTW 預設不會載入任何擴充套件。若要在 `/btw`、`/side` 和 `/btw:tangent`
中啟用像 `web_search` 和 `fetch_content` 這類工具，請建立
`~/.pi/agent/btw.json`（或在你的 `PI_CODING_AGENT_DIR` 中建立 `btw.json`）：

```json
{
  "extensions": ["npm:pi-web-access"]
}
```

受信任的專案可以用自己的 `.pi/btw.json` 覆寫這份清單。清單是整份取代而非合併；
`{"extensions": []}` 會停用該專案的全域 BTW 擴充套件。省略 `extensions`
欄位則會繼承全域清單。不受信任的專案不會貢獻任何設定。設定會在建立子會話時讀取；
請用 `/btw:clear` 來讓現有話題套用變更。

來源可以是 Pi 的 `npm:` 或 `git:` 套件，或是本機的擴充檔案/套件目錄。
本機路徑是相對於設定檔所在的目錄解析的。遠端套件會被解析到代理目錄下獨立的
BTW 快取（`btw/` 資料夾）中，並可在第一次使用時安裝。若需要可重現的行為，
請固定來源的版本號。

只會載入清單中列出的來源。BTW 會以無介面模式（`ctx.hasUI === false`）
執行它們的生命週期處理器，並讓它們的工具與 `read`、`bash`、`edit`、`write`
一起暴露出來，包括在啟動時註冊的工具。能力提示會依照子會話目前啟用的工具而定。
載入/啟動時發生的錯誤會中止子會話建立，並回報是哪個來源失敗；清除、
模式/模型變更，以及父層關閉時都會先執行擴充套件的清理流程才釋放資源。

請選擇支援無介面會話的擴充套件。需要互動對話框的工具（例如 `ask_user`）
需要額外的 UI 整合才能運作。BTW 不會把擴充套件的 skill、提示範本、主題、
widget 或快捷鍵帶入自己的介面中。擴充套件是受信任的程式碼，並非沙箱環境：
分開安裝套件可以避免共用父層快取的擴充套件工廠，但擴充套件仍可能使用
共用檔案或外部服務。如果本機來源已經被父層註冊過，會被拒絕使用；
請改用 `npm:` 或 `git:` 來源進行獨立安裝。

`/btw:ask` 絕對不會讀取這份設定或載入擴充工具，因此會維持內建的只讀工具組。
`/btw:summarize` 則維持完全不帶工具。擴充套件設定屬於機器/專案層級設定，
不會保存在隱藏的對話歷史紀錄項目中。

### 視窗內斜線指令行為

在 BTW 視窗的輸入框中，斜線指令的處理會依照 BTW/會話的界線區分：

- `/btw:new`、`/btw:tangent`、`/btw:ask`、`/btw:clear`、`/btw:model`、
  `/btw:thinking`、`/btw:inject` 和 `/btw:summarize` 仍由 BTW 自身處理，
  因為它們控制的是 BTW 的生命週期、設定或交接行為
- 其他任何以斜線開頭的輸入，都會透過 BTW 子會話一般的 `prompt()` 路徑處理
- 這意味著像 `/help` 這種一般的 pi 斜線指令，會由子會話處理，而不是被視窗專用的備援機制拒絕
- 如果子會話無法處理某個斜線指令，BTW 會透過對話記錄/狀態呈現真正的子會話失敗訊息，
  而不是自行捏造一個「不支援的斜線輸入」警告

這樣可以讓 BTW 自身的生命週期指令維持明確，同時讓側邊對話擁有跟底層子會話相同的斜線指令能力。

## 行為說明

### 隱藏的 BTW 話題狀態

BTW 的交流內容會以隱藏的自訂項目形式保存在會話中，因此它們會：

- 在重新載入與重啟後仍然保留
- 針對目前分支還原 BTW 視窗的狀態
- 保留目前側邊話題是一般 `/btw` 話題、無上下文的 `/btw:tangent`，還是只讀的 `/btw:ask` 話題
- 保留該會話歷史對應的僅限 BTW 模型與思考深度覆寫設定
- 不會進入主代理的 LLM 上下文中

### 可見的保存筆記

如果你使用 `--save`，那一次 BTW 交流也會以可見的自訂訊息形式寫入會話的對話記錄中。

## 為什麼需要這個

有時候你會想要：

- 在主代理持續工作的同時提出一個澄清問題
- 在不打斷目前回合的情況下思考下一步
- 先探索一個想法，準備好之後再注入回去

## 內建的 skill

這個套件還附帶一個小巧的 `btw` skill，讓 pi 更能辨識出什麼時候適合使用側聊工作流程。

它有助於提升可發現性與引導效果，但並非擴充套件運作所必需。

## 開發

擴充套件的進入點是：

- `extensions/btw.ts`

內建的 skill 位於：

- `skills/btw/SKILL.md`

不安裝即可直接使用：

```bash
pi -e /path/to/pi-btw
```

## DeepSeek Harness

pi-btw 也可以透過 [pi2dsh](https://github.com/weijiafu14/pi2dsh) 相容橋接套件，
不經修改直接在 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 上運行。

對於 DSH Web，請安裝 **dsh-work-x** 套件組，裡面包含了 pi-btw、pi2dsh、
瀏覽器側邊聊天視窗，以及其他擴充套件：

```bash
dsh plugin --profile web add dsh-work-x
```

若只想單獨安裝橋接套件與這個擴充套件：

```bash
dsh plugin --profile web add pi2dsh
dsh plugin --profile web add pi-btw
```

安裝後重新啟動 DSH，然後使用 `/btw <question>` 開始一段側聊對話。
這個套件組會以瀏覽器側邊聊天視窗呈現，背後由原生的 DSH 子會話支援。
DSH 的指令家族使用連字號命名：例如 `/btw:inject` 會變成 `/btw-inject`。

CLI 專用的安裝、使用方式與截圖，請參考
[DSH 側聊指南](https://github.com/weijiafu14/pi2dsh/tree/main/examples/side-conversation)；
已測試過的版本結果，請參考
[版本驗證結果](https://github.com/weijiafu14/pi2dsh/tree/main/community/release-0.25.1)。
DSH 整合相關的問題請回報到 [pi2dsh](https://github.com/weijiafu14/pi2dsh/issues)。

## 授權條款

MIT
