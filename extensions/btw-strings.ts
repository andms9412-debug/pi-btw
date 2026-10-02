/**
 * Centralized user-facing strings for the BTW extension (Traditional Chinese, zh-TW).
 *
 * All UI text, notifications, command/shortcut descriptions, and the system prompts
 * sent to the BTW sub-session model live here. Keeping them in one place makes it
 * easier to diff upstream English-string changes and re-apply translations after
 * merging updates from the original dbachelder/pi-btw repository.
 */

export const BTW_STRINGS = {
  // System prompts sent to the BTW child session.
  systemPrompt: [
    "You are having an aside conversation with the user, separate from their main working session.",
    "If main session messages are provided, they are for context only — that work is being handled by another agent.",
    "If no main session messages are provided, treat this as a fully contextless tangent thread and rely only on the user's words plus your general instructions.",
    "Focus on answering the user's side questions, helping them think through ideas, or planning next steps.",
    "Do not act as if you need to continue unfinished work from the main session unless the user explicitly asks you to prepare something for injection back to it.",
    "Respond to the user in Traditional Chinese (zh-TW) unless they explicitly ask for another language.",
  ].join(" "),

  summarizeSystemPrompt:
    "Summarize the side conversation concisely in Traditional Chinese (zh-TW). Preserve key decisions, plans, insights, risks, and action items. Output only the summary.",

  // Argument parsing / usage errors.
  modelUsage: "用法：/btw:model <provider> <model> <api> | clear",
  modelPickerTitle: "選擇 BTW 模型",

  // Overlay transcript.
  emptyTranscript: "還沒有 BTW 話題。問個側聊問題開始吧。",
  badgeYou: "你",
  badgeThinking: "思考中",
  badgeTool: "工具",
  badgeAssistant: "助理",

  // Visible BTW note message content.
  noteContent: (question: string, answer: string) => `**問題**\n\n${question}\n\n**回應**\n\n${answer}`,
  noTextResponse: "（沒有文字回應）",
  noUserPrompt: "（沒有使用者提問）",
  noAssistantResponse: "（沒有助理回應）",
  nonTextMessage: "（非文字 BTW 訊息）",

  // Handoff thread formatting (injected into the main session).
  handoffUserLabel: "使用者",
  handoffAssistantLabel: "助理",
  handoffWithInstructions: (instructions: string, thread: string) => `這是一段我進行過的側聊對話。${instructions}\n\n${thread}`,
  handoffWithoutInstructions: (thread: string) => `這是我進行過的側聊對話，作為額外背景資訊：\n\n${thread}`,
  summaryWithInstructions: (instructions: string, summary: string) => `這是一段我進行過的側聊對話摘要。${instructions}\n\n${summary}`,
  summaryWithoutInstructions: (summary: string) => `這是我進行過的側聊對話摘要：\n\n${summary}`,

  // Inline-composer requirement.
  inlineQuestionRequired: (command: string) => `${command} 在 Pi 的 TUI 之外無法打開輸入框。請直接在指令後附上問題。`,

  // Overlay titles.
  overlayTitleTangent: "BTW 支線話題",
  overlayTitleReadonly: "BTW 詢問（只讀）",
  overlayTitleDefault: "BTW",

  // Overlay chrome (mode line, summary, status, hints).
  modeLineSuffix: "隱藏話題已保存",
  summaryStreaming: " · 串流中",
  summaryIdle: " · 閒置中",
  summaryExchanges: (count: number) => `${count} 輪對話`,
  defaultStatus: "就緒。Enter 送出；Esc 關閉且不清除話題。",
  hints: (focusLabel: string) => `滑鼠滾輪 ↑↓ PgUp/PgDn · Enter · ${focusLabel} 切換焦點 · Alt+w 切換寬度 · Esc`,

  // Width toggle.
  widthFullModeStatus: "已切換為寬幅模式。Shift+拖曳現在只會選取視窗內的內容。按 Alt+w 恢復視窗模式。",
  widthWindowModeStatus: "已切換為視窗模式。按 Alt+w 切換為寬幅模式也能乾淨地複製內容。",

  // Session event status updates.
  runningTool: (toolName: string) => `⏳ 正在執行工具：${toolName}`,
  streamingStatus: "⏳ 串流輸出中...",
  aborting: "⏹ 正在中斷。再按一次 Esc 關閉 BTW 視窗。",
  aborted: "⏹ 已中斷。再按一次 Esc 關閉 BTW 視窗。",

  // Model override resolution.
  modelFallbackWithMain: (overrideRef: string, mainRef: string) =>
    `設定的 BTW 模型 ${overrideRef} 沒有憑證。將改用主線程模型 ${mainRef}。`,
  modelFallbackNoMain: (overrideRef: string) => `設定的 BTW 模型 ${overrideRef} 沒有憑證，且沒有啟用中的主線程模型。`,
  modelUnavailableWithReason: (reason: string) => `BTW 模型不可用。${reason}`,
  modelUnavailable: "BTW 模型不可用。沒有啟用中的主線程模型。",
  modelSourceOverride: "自訂覆寫",
  modelSourceInheritedFallback: "繼承的備案",
  modelSourceInheritsMain: "繼承主線程",
  modelDescription: (modelRef: string, source: string, fallbackReason?: string) =>
    `BTW 模型：${modelRef} (${source})。${fallbackReason ? ` ${fallbackReason}` : ""}`,
  thinkingSourceOverride: "自訂覆寫",
  thinkingSourceInheritsMain: "繼承主線程",
  thinkingDescription: (level: string, source: string) => `BTW 思考深度：${level} (${source})。`,
  modelOverrideSet: (modelRef: string) => `BTW 模型已設定為 ${modelRef}。`,
  modelOverrideCleared: "BTW 模型已清除。現在 BTW 將繼承主線程模型。",
  thinkingOverrideSet: (level: string) => `BTW 思考深度已設定為 ${level}。`,
  thinkingOverrideCleared: "BTW 思考深度已清除。現在 BTW 將繼承主線程的思考深度。",

  // Session lifecycle errors.
  noActiveModel: "沒有啟用中的主線程模型。",
  couldNotStartSession: (reason: string) => `無法啟動 BTW 話題：${reason}`,

  // Command feedback.
  startedFreshThread: "已開始一個全新的 BTW 話題。",
  clearedThread: "已清除 BTW 話題。",
  unknownModel: (provider: string, id: string) =>
    `找不到模型 ${provider}/${id}。請先使用 /login 或 /models 新增它，再設定為 BTW 備案。`,
  noThreadToInject: "沒有可注入的 BTW 話題。",
  injectingStatus: "⏳ 正在注入主線程...",
  injectedThread: (count: number) => `已注入 BTW 話題（${count} 輪對話）。`,
  injectFailed: "注入失敗。話題已保留，可重試或改用摘要。",
  noThreadToSummarize: "沒有可摘要的 BTW 話題。",
  summarizingStatus: "⏳ 正在摘要...",
  injectedSummary: (count: number) => `已注入 BTW 摘要（${count} 輪對話）。`,
  summarizeFailed: "摘要失敗。話題已保留，可重試或注入。",

  // Overlay submit guards.
  enterPromptFirst: "請在送出前輸入 BTW 提問。",
  overlaySubmitNeedsCommandContext: "BTW 視窗送出需要指令上下文。請從指令重新打開 BTW。",

  // Model/auth errors during a BTW turn.
  noUsableAuth: (provider: string, id: string) => `${provider}/${id} 沒有可用憑證。`,
  waitingForCurrentTurn: "⏳ 正在等待目前的 BTW 輪對話結束...",
  waitingForCancellation: "⏳ 正在等待中斷完成...",
  requestNoResponse: "BTW 請求完成但沒有回應。",
  requestFailed: "BTW 請求失敗。",
  responseQueued: "BTW 回應已排入佇列，將在目前輪次結束後顯示。",
  responseDisplayed: "已在會話中顯示 BTW 回應。",
  noteSaved: "已將 BTW 筆記儲存至會話。",
  noteQueued: "BTW 筆記已排入佇列，將在目前輪次結束後儲存。",
  readyForFollowUp: "可以繼續追問。隱藏的 BTW 話題已更新。",
  requestFailedRetry: "請求失敗。話題已保留，可重試或追問。",

  // Handoff / summarize errors.
  noThreadForHandoff: "沒有可交接的 BTW 話題。",
  summarizeNoResponse: "BTW 摘要完成但沒有回應。",
  summarizeThreadFailed: "摘要 BTW 話題失敗。",
  summarizeAborted: "BTW 摘要已中斷。",

  // Message renderer (expanded note details).
  noteMeta: (provider: string, model: string, api: string, thinkingLevel: string) =>
    `模型：${provider}/${model} (${api}) · 思考深度：${thinkingLevel}`,
  noteTokens: (input: number, output: number, total: number) => `token：輸入 ${input} · 輸出 ${output} · 總計 ${total}`,

  // Shortcut descriptions.
  shortcutToggleFocus: "切換 BTW 視窗的焦點，保持視窗開啟。",
  shortcutToggleWidth: "切換 BTW 視窗在視窗模式與寬幅模式之間。",

  // Command descriptions.
  cmdBtw: "在專用的 BTW 視窗中繼續側聊對話。加上 --save 可以同時保存成可見筆記。",
  cmdSide: "/btw 的別名：在專用的 BTW 視窗中繼續側聊對話。",
  cmdTangent: "在專用的 BTW 視窗中開始或繼續一個不帶上下文的側聊話題。",
  cmdAsk: "提出一個只讀的側聊問題：繼承主線程上下文，但只暴露 read/grep/find/ls 工具。",
  cmdNew: "帶主線程上下文開始一個全新的 BTW 話題。也可以同時立即提出第一個問題。",
  cmdClear: "關閉 BTW 視窗/小工具並清除目前的話題。",
  cmdInject: "將完整的 BTW 話題以使用者訊息的形式注入回主線程。",
  cmdSummarize: "摘要 BTW 話題，然後將摘要注入回主線程。",
  cmdModel: "顯示、設定或清除僅限 BTW 使用的模型備案。不帶引數時在交互式介面中會跣出選單。",
  cmdThinking: "顯示、設定或清除僅限 BTW 使用的思考深度備案。",
} as const;
