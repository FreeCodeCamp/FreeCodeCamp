---
id: 587d7fb0367417b2b2512bed
title: 認識 Node 的控制檯
challengeType: 2
forumTopicId: 301515
dashedName: meet-the-node-console
---

# --description--

可以採用下面的任意一種方式完成這些挑戰：

- 克隆 [這個 GitHub 倉庫](https://github.com/freeCodeCamp/boilerplate-express/) 並在本地完成項目。
- 使用[我們的 Repl.it 上的初始化項目](https://replit.com/github/freeCodeCamp/boilerplate-express)來完成項目。
- 使用你選擇的網站生成器來完成項目， 並確保包含了我們 GitHub 倉庫的所有文件。

當完成本項目，請確認有一個正常運行的 demo 可以公開訪問。 然後將 URL 提交到 `Solution Link` 中。

在開發過程中，能夠隨時看到代碼的運行結果是非常重要的。

Node 只是一個 JavaScript 環境。 與客戶端 JavaScript 一樣，你可以使用控制檯顯示有用的調試信息。 在本地計算機上，你可以在終端中輸出調試信息。 在 Replit 上，右側邊欄會默認打開一個終端。

我們建議在做這些挑戰題時保持終端打開的狀態。 通過這些終端的輸出，你可能會發現這些錯誤的本質原因。

# --instructions--

修改 `myApp.js` 文件，在控制檯打印出 “Hello World”。

# --hints--

控制檯應該輸出 `"Hello World"`

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/hello-console').then(
    (data) => {
      assert.isTrue(data.passed, '"Hello World" is not in the server console');
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

# --solutions--

```js
/**
  Backend challenges don't need solutions, 
  because they would need to be tested against a full working project. 
  Please check our contributing guidelines to learn more.
*/
```
