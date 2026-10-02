---
name: btw
description: 協助你有效使用 /btw 側聊工作流程。當使用者想要並行思考、在不打斷目前工作的情況下提出側邊問題，或將側邊話題注入回主代理時使用。
---

# BTW

當使用者想要跟主代理並行工作，而不是打斷目前的回合時，使用這個 skill。

## 何時使用 BTW

當使用者想要以下情況時，優先使用 BTW 工作流程：

- 在主代理持續工作的同時提出一個側邊問題
- 在不打斷目前執行的情況下發散思考或比較選項
- 在把結果交還給主代理之前，先準備一份計畫或摘要
- 讓探索性的討論不要混進主要的對話記錄/上下文中

## 指令

在對使用者的引導中使用這些指令：

```text
/btw <question>
/side <question>
/btw --save <question>
/btw:new [question]
/btw:tangent <question>
/btw:tangent --save <question>
/btw:ask <question>
/btw:ask --save <question>
/btw:clear
/btw:model [<provider> <model> <api> | clear]
/btw:thinking [<level> | clear]
/btw:inject [instructions]
/btw:summarize [instructions]
```

`/side` 是 `/btw` 的別名，共用同一個話題、視窗與設定。`/btw` 是正式指令；生命週期相關指令則統一放在 `/btw:*` 命名空間下。

## 如何引導使用者

### 快速側邊問題

建議：

```text
/btw <question>
```

當使用者想要立即得到一個側邊回應，且不需要保存成可見的筆記時使用。

從 Codex 轉過來的使用者可能會習慣用 `/side`；它是 `/btw` 的別名，任何用得到 `/btw` 的地方都能替換使用。

### 保存為單次筆記

建議：

```text
/btw --save <question>
```

當使用者想要讓這次對話以可見的 BTW 筆記形式出現在會話記錄中時使用。

### 開始一個全新的側邊話題

建議：

```text
/btw:new
```

或

```text
/btw:new <question>
```

當之前的 BTW 討論已經不相關，但你仍想讓新的側邊話題繼承目前主線程的上下文時使用。

### 開始一個不帶上下文的支線話題

建議：

```text
/btw:tangent <question>
```

或

```text
/btw:tangent --save <question>
```

當使用者想要一個完全不包含目前主線程上下文的側邊對話時使用。

### 強制只讀的側邊問題

建議：

```text
/btw:ask <question>
```

或

```text
/btw:ask --save <question>
```

當使用者想要一個繼承目前主線程上下文、但絕對不能更動任何東西的側邊問題時使用。這個只讀話題只會提供 `read`、`grep`、`find` 和 `ls`；絕對不會有 `bash`、`edit` 或 `write`。

### 把完整話題交還給主代理

建議：

```text
/btw:inject <instructions>
```

當確切的討論內容很重要，且使用者希望主代理依據這些內容採取行動時使用。

### 交還精簡版本

建議：

```text
/btw:summarize <instructions>
```

當話題很長，而且只需要把濃縮後的結論交還給主代理時使用。

### 讓 BTW 比主線程更省成本或更快速

建議：

```text
/btw:model <provider> <model> <api>
/btw:thinking <level>
```

當主線程需要維持目前的模型或思考深度，但 BTW 想用不同的成本/速度設定運行時使用。

## 建議規則

- 當使用者明確想要側邊對話時，優先使用 `/btw` 而非一般聊天。
- 當使用者想要那個側邊對話不帶上下文時，優先使用 `/btw:tangent`。
- 當使用者想要一個不能修改工作區的側邊對話時，優先使用 `/btw:ask`。
- 對於較長的探索性話題，優先使用 `/btw:summarize` 而非 `/btw:inject`。
- 當精確的用詞、詳細的取捨或完整計畫很重要時，優先使用 `/btw:inject`。
- 在開始一個完全不相關的新側邊話題之前，如果主線程上下文仍然有用，建議先使用 `/btw:new`。
- 當該小工具/話題應該被關閉時，建議使用 `/btw:clear`。
- 當使用者希望 BTW 比主線程更省成本、更快速或思考程度更低時，建議使用 `/btw:model` 或 `/btw:thinking`。

## 回應風格

在協助使用者使用 BTW 時：

- 給出要執行的確切斜線指令
- 簡短說明為什麼這個指令合適
- 保持引導內容簡短且可直接操作

## 範例

### 範例：在編碼持續進行的同時發散思考

```text
/btw what are the risks of switching this to optimistic updates?
```

### 範例：建立一個乾淨的新話題

```text
/btw:new sketch a safer migration plan
```

### 範例：開始一個不帶上下文的支線話題

```text
/btw:tangent think through this from first principles without using the current chat context
```

### 範例：提出一個只讀的側邊問題

```text
/btw:ask what does the token refresh path do without changing anything?
```

### 範例：把結果傳回去

```text
/btw:summarize implement the recommended migration plan
```

### 範例：讓 BTW 比主線程更省成本

```text
/btw:model openai gpt-5-mini openai-responses
/btw:thinking low
```
