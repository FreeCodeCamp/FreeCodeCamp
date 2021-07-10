---
id: bd7158d8c442eddfaeb5bd13
title: 構建一個隨機引語生成器
challengeType: 3
forumTopicId: 301374
dashedName: build-a-random-quote-machine
---

# --description--

**目標：** 在 [CodePen.io](https://codepen.io) 上實現一個功能類似 <https://codepen.io/freeCodeCamp/full/qRZeGZ> 的 App。

在滿足以下[需求](https://en.wikipedia.org/wiki/User_story)並能通過所有測試的前提下， 可以根據自己的喜好來美化 app。

可以使用 HTML、JavaScript、CSS、Bootstrap、SASS、React、Redux、jQuery 來完成這個挑戰。 但鑑於這個章節的學習內容與前端框架相關，推薦使用一款前端框架（比如 React）來完成這個挑戰。 不推薦使用前面沒有提到的技術，否則風險自擔。 我們有計劃新增其他前端框架課程，例如 Angular 和 Vue，不過目前還沒有這些內容。 我們會接受並嘗試修復使用推薦技術棧遇到的反饋問題。 編碼愉快！

**需求 1：** 應該能看到一個具有 `id="quote-box"` 屬性的包裹元素。

**需求 2：** 在 `#quote-box` 元素內，應該能看到一個具有 `id="text"` 屬性的元素。

**需求 3：** 在 `#quote-box` 元素內，應該能看到一個具有 `id="author"` 屬性的元素。

**需求 4：** 在 `#quote-box` 元素內，應該能看到一個具有 `id="new-quote"` 屬性的可點擊元素。

**需求 5：** 在 `#quote-box` 元素內，應該能看到一個具有 `id="tweet-quote"` 屬性的可點擊 `a` 元素。

**需求 6：** 首次加載時，App 應該在具有 `id="text"` 屬性的元素內展示一條隨機引語。

**需求 7：** 首次加載時，App 應該在具有 `id="author"` 屬性的元素內展示該條隨機引語的作者。

**需求 8：** 當點擊具有 `#new-quote` 屬性的按鈕時，App 應該得到一條新的引語並在具有 `#text` 屬性的元素內展示出來。

**需求 9：** 當點擊具有 `#new-quote` 屬性的按鈕時，App 應該得到新引語的作者並在具有 `#author` 屬性的元素內展示出來。

**需求 10：** 可以通過點擊具有 `#tweet-quote` 屬性的 `a` 標籤將當前引語發送到推特。 該 `a` 標籤的 `href` 屬性應該是 `"twitter.com/intent/tweet"`，以便成功發送。

**需求 11：** 具有 `#quote-box` 屬性的包裹元素應該水平居中。 請在瀏覽器縮放尺寸爲 100% 且頁面窗口最大化時運行測試。

你可以<a href='https://codepen.io/pen?template=MJjpwO' target='_blank' rel='nofollow'>使用這個 CodePen 模板</a>，點擊 `Save` 創建即可你自己的項目 或者可以在任何喜歡的環境中使用以下 CDN 鏈接來運行測試：`https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js`。

一旦完成了本項目並且該項目所有測試運行通過，請提交項目的 URL。

**注意：** Twitter 不允許在 iframe 里加載鏈接。 如果 tweet 不能加載，嘗試在 `#tweet-quote` 元素上使用 `target="_blank"` 或者 `target="_top"` 屬性。 `target="_top"` 會替換當前 tab 頁的內容，所以確保當前內容已經保存了。

# --solutions--

```js
// solution required
```
