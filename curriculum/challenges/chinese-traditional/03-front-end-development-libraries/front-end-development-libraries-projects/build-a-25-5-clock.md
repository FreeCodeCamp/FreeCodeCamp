---
id: bd7158d8c442eddfaeb5bd0f
title: 構建一個番茄時鐘
challengeType: 3
forumTopicId: 301373
dashedName: build-a-25--5-clock
---

# --description--

**目標：** 在 [CodePen.io](https://codepen.io) 上實現一個功能類似 <https://codepen.io/freeCodeCamp/full/XpKrrW> 的 App。

在滿足以下[需求](https://en.wikipedia.org/wiki/User_story)並能通過所有測試的前提下， 可以根據自己的喜好來美化 app。

可以使用 HTML、JavaScript、CSS、Bootstrap、SASS、React、Redux、jQuery 來完成這個挑戰。 但鑑於這個章節的學習內容與前端框架相關，推薦使用一款前端框架（比如 React）來完成這個挑戰。 不推薦使用前面沒有提到的技術，否則風險自負。 我們有計劃新增其他前端框架課程，例如 Angular 和 Vue，不過目前還沒有這些內容。 如果使用建議的技術棧完成這個項目，我們會接受並嘗試修復相關的問題反饋。 編碼愉快！

**需求 1：** 應該能看到一個具有`id="break-label"`屬性的元素，這個元素的內容應該是一個字符串（例如："Break Length"）。

**需求 2：** 應該能看到一個具有`id="session-label"`屬性的元素，這個元素的內容應該是一個字符串（例如："Session Length"）。

**需求 3：** 應該能看到兩個可以點擊的元素，他們分別具有如下 id：`id="break-decrement"` 和 `id="session-decrement"`。

**需求 4：** 應該能看到兩個可以點擊的元素，它們分別具有如下 id：`id="break-increment"` 和 `id="session-increment"`。

**需求 5：** 應該能看到一個具有 `id="break-length"` 屬性的元素，這個元素默認展示數值應該爲 5（加載後）。

**需求 6：** 應該能看到一個具有 `id="session-length"` 屬性的元素，這個元素默認展示數值應該爲 25（加載後）。

**需求 7：** 應該能看到一個具有 `id="timer-label"` 屬性的元素，這個元素包含一個表示當前狀態的字符串（例如："Session"）。

**需求 8：** 應該能看到一個具有 `id="time-left"` 屬性的元素。 注意：暫停或者運行時，該元素的內容應始終以 `mm:ss` 格式顯示（如 25:00）。

**需求 9：** 應該能看到一個具有 `id="start_stop"` 屬性的可點擊的元素。

**需求 10：** 應該能看到一個具有 `id="reset"` 屬性的可點擊的元素。

**需求 11：** 當點擊 id 屬性爲 `reset` 的元素時，運行中的計時器都應該停止，`id="break-length"` 元素中的值應該重新回到 `5`，`id="session-length"` 元素中的值應該重新回到 25，且 `id="time-left"` 元素應該重置爲默認狀態。

**需求 12：** 當點擊 id 屬性爲 `break-decrement` 的元素時，`id="break-length"` 元素的值應該減去 1，且我應該能看到更新後的值。

**需求 13：** 當點擊 id 屬性爲 `break-increment` 的元素時，`id="break-length"` 元素的值應該增加 1，且應該能看到更新後的值。

**需求 14：** 當點擊 id 屬性爲 `session-decrement` 的元素時，`id="session-length"` 元素的值應該減去 1，且應該能看到更新後的值。

**需求 15：** 當點擊 id 屬性爲 `session-increment` 的元素時，`id="session-length"` 元素的值應該增加 1，且應該能看到更新後的值。

**需求 16：** 工作或者休息長度不應該可以設置爲 &lt;= 0 的值。

**需求 17：** 工作或者休息長度比應該可以設置爲 > 60 的值。

**需求 18：** 當首次點擊具有 `id="start_stop"` 屬性的元素時，計時器應該根據 `id="session-length"` 元素當前顯示的值開始運行，即使該值已從原始值 25 遞增過或遞減過。

**需求 19：** 如果計時器正在運行，id 屬性爲 `time-left` 的元素應該以 `mm:ss` 的格式展示剩餘的時間（按1遞減並且每秒更新一次顯示的值）。

**需求 20：** 如果計時器正在運行，當點擊 `id="start_stop"` 元素時，倒計時應該暫停。

**需求 21：** 如果計時器已經暫停，當點擊 `id="start_stop"` 元素時，倒計時應該從暫停的時間點恢復運行。

**需求 22：** 當一個工作倒計時結束（注意：計時器必須達到 00:00），並且新的倒計時開始運行時，id 屬性爲 `timer-label` 的元素應該顯示一個表示已經開始休息的字符串。

**需求 23：** 當一個工作倒計時結束（注意：計時器必須達到 00:00），應該開始一個新的休息倒計時，時間應該從 `id="break-length"` 元素中當前顯示的值開始計算。

**需求 24：** 當一個休息倒計時結束（注意：計時器必須達到 00:00），並且新的倒計時開始運行時，id 屬性爲 `timer-label` 的元素應該顯示一個表示已經開始工作的字符串。

**需求 25：** 當一個休息倒計時結束（注意：計時器必須達到 00:00），應該開始一個新的工作倒計時，時間應該從 `id="session-length"` 元素中當前顯示的值開始計算。

**需求 26：** 當一個倒計時結束（注意：計時器必須達到 00:00），應該播放一個表示時間到了的聲音提示。 這個提示音應該使用 HTML5 的 `audio`標籤並有一個 `id="beep"` 屬性。

**需求 27：** 具有`id="beep"`屬性的音頻元素時長應該至少有一秒。

**需求 28：** 當點擊 id 屬性爲 `reset` 的元素時，id 屬性爲 `beep` 的音頻元素必須停止播放並回到開頭。

你可以<a href='https://codepen.io/pen?template=MJjpwO' target='_blank' rel='nofollow'>使用這個 CodePen 模板</a>，點擊 `Save` 即可創建你自己的項目。 或者你可以在任何你喜歡的環境中使用以下 CDN 鏈接來運行測試：`https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js`。

當你完成了本項目，並且該項目所有測試運行通過， 請提交項目的 URL。

# --solutions--

```js
// solution required
```
