---
id: bd7157d8c242eddfaeb5bd13
title: 構建一個 Markdown 文件預覽器
challengeType: 3
forumTopicId: 301372
dashedName: build-a-markdown-previewer
---

# --description--

**目標：** 在 [CodePen.io](https://codepen.io) 上實現一個功能類似 <https://codepen.io/freeCodeCamp/full/GrZVVO> 的 App。

在滿足以下[需求](https://en.wikipedia.org/wiki/User_story)並能通過所有測試的前提下， 你可以根據自己的喜好來美化 app。

可以使用 HTML、JavaScript、CSS、Bootstrap、SASS、React、Redux、jQuery 來完成這個挑戰。 但鑑於這個章節的學習內容與前端框架相關，推薦使用一款前端框架（比如 React）來完成這個挑戰。 不推薦使用前面沒有提到的技術，否則風險自負。 我們有計劃新增其他前端框架課程，例如 Angular 和 Vue，不過目前還沒有這些內容。 我們會接受並嘗試修復使用推薦技術棧遇到的反饋問題。 編碼愉快！

**需求 1：** 應該能看到一個具有 `id="editor"` 屬性的 `textarea` 元素。

**需求 2：** 應該能看到一個具有 `id="preview"` 屬性的元素。

**需求 3：** 當在具有 `#editor` 屬性的元素內輸入文本時，具有 `#preview` 屬性的元素應該同步更新展示鍵入的內容。

**需求 4：** 當在具有 `#editor` 屬性的元素內輸入 GitHub 風格的 markdown 內容時，文本應該以 HTML 的形式，把所鍵入的內容渲染在具有 `#preview` 屬性的元素中（提示：不需要自己解析 Markdown——可以引入一個叫做 Marked 的庫來完成這項工作：<https://cdnjs.com/libraries/marked>）。

**需求 5：** 當 Markdown 預覽器首次加載時，具有 `#editor` 屬性的元素內的默認內容應該包含以下每個種類的至少一段有效的 Markdown 代碼：標題（H1 標籤）、次級標題（H2 標籤）、鏈接、行內代碼、代碼塊、列表、引用塊、圖片、加粗文本。

**需求 6：** 當 Markdown 預覽器首次加載時，具有 `#editor` 屬性的元素內容應該以 HTML 的形式渲染在具有 `#preview` 屬性的元素中。

**可選需求（你無需通過這項測試）：** Markdown 預覽器能夠解析回車符並且將他們以 `br`（換行）元素的形式渲染出來。

你可以<a href='https://codepen.io/pen?template=MJjpwO' target='_blank' rel='nofollow'>使用這個 CodePen 模板</a>，點擊 `Save` 即可創建你自己的項目。 或者可以在任何喜歡的環境中使用以下 CDN 鏈接來運行測試：`https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js`。

當你完成了本項目，並且該項目所有測試運行通過，請提交項目的 URL。

# --solutions--

```js
// solution required
```
