---
id: 587d7fb3367417b2b2512bfb
title: '如何使用 package.json ——所有 Node.js 項目或 npm 包的核心'
challengeType: 2
forumTopicId: 301528
dashedName: how-to-use-package-json-the-core-of-any-node-js-project-or-npm-package
---

# --description--

可以採用下面的任意一種方式完成這些挑戰：

- 克隆 [GitHub repo](https://github.com/freeCodeCamp/boilerplate-npm/) 並在本地完成項目。
- 使用[我們的 Replit 上的初始化項目](https://replit.com/github/freeCodeCamp/boilerplate-npm)來完成項目。
- 使用你選擇的網站生成器來完成項目， 並確保包含了我們 GitHub 倉庫的所有文件。

當完成本項目，請確認有一個正常運行的 demo 可以公開訪問。 然後將 URL 提交到 `Solution Link` 中。 此外，還可以將項目的源碼提交到 `GitHub Link` 中。

`package.json` 文件是所有 Node.js 項目和 npm 包的樞紐， 和 HTML 文檔中的 &lt;head> 區域用來描述網頁的配置信息（元數據）一樣，它存儲項目的相關信息。 它由單個 JSON 對象組成，並以鍵值對的形式存儲項目信息， 且至少包含兩個必填字段：“name”和“version”——但是最好提供有關項目的其他信息，這將對用戶或者維護者有所幫助。

如果能找到項目的文件樹，那麼可以在文件樹的最外層找到 package.json， 在接下來的幾個挑戰中將完善這個文件。

在這個文件中最常見的信息之一是 `author` 字段， 它說明了項目的創建者，它可以是字符串，也可以是帶有聯繫人詳細信息的對象。 對於較大的項目，建議使用對象；但是在我們的項目中，一個簡單的字符串就夠了，比如下面的例子：

```json
"author": "Jane Doe",
```

# --instructions--

在項目的 package.json 文件的 `author` 鍵中添加你的名字。

**注意：** 正在修改的是一個 JSON，所有的字段名必須用雙引號（"）包裹，也必須用逗號（,）分割。

# --hints--

package.json 應該有一個有效的“author”鍵

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert(packJson.author, '"author" is missing');
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
