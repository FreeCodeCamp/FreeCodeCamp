---
id: 587d7fb0367417b2b2512bef
title: 提供 HTML 文件服務
challengeType: 2
forumTopicId: 301516
dashedName: serve-an-html-file
---

# --description--

通過 `res.sendFile(path)` 方法給請求響應一個文件， 可以把它放到路由處理 `app.get('/', ...)` 中。 在後臺，這個方法會根據你想發送的文件的類型，設置適當的消息頭信息來告訴瀏覽器如何處理它， 然後讀取併發送文件， 此方法需要文件的絕對路徑。 建議使用 Node. js 的全局變量 `__dirname` 來計算出這個文件的絕對路徑：

```js
absolutePath = __dirname + relativePath/file.ext
```

# --instructions--

發送文件 `/views/index.html` 作爲 `/` 的 GET 請求的響應。 如果實時查看應用，你會看到一個大的 HTML 標題（以及我們稍後將使用的表單……），目前它們還沒有任何樣式。

**注意：** 你可以編輯上一個挑戰的解題代碼，或者創建一個新的代碼片段。 如果你創建一個新的代碼片段，請記住 Express 會從上到下匹配路由，並執行第一個匹配的處理程序， 你必須註釋掉前面的代碼，否則服務器還是響應之前的字符串。

# --hints--

應用應該響應 views/index.html 文件

```js
(getUserInput) =>
  $.get(getUserInput('url')).then(
    (data) => {
      assert.match(
        data,
        /<h1>.*<\/h1>/,
        'Your app does not serve the expected HTML'
      );
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
