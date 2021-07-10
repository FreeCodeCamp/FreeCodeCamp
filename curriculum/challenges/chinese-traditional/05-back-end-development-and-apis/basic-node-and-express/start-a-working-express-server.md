---
id: 587d7fb0367417b2b2512bee
title: 啓動一個 Express 服務
challengeType: 2
forumTopicId: 301519
dashedName: start-a-working-express-server
---

# --description--

在 `myApp.js` 文件的前兩行中，你可以看到創建一個 Express 應用對象很簡單。 這個對象有幾種方法，在後面的挑戰中將學習到其中的許多部分。 一個基礎的方法是 `app.listen(port)`。 它處於運行狀態時告訴服務器監聽指定的端口。 出於測試的原因，需要應用在後臺運行，所以在 `server.js` 中已經添加了這個方法。

讓我們在服務端輸出第一個字符串！ 在 Express 中，路由採用這種結構：`app.METHOD(PATH, HANDLER)`， METHOD 是 http 請求方法的小寫形式， PATH 是服務器上的相對路徑（它可以是一個字符串，甚至可以是正則表達式）， HANDLER 是匹配路由時 Express 調用的函數， 處理函數採用這種形式：`function(req, res) {...}`，其中 req 是請求對象，res 是響應對象， 例如：

```js
function(req, res) {
  res.send('Response String');
}
```

將會響應一個字符串“Response String”。

# --instructions--

當 GET 請求 `/`（根路由 ）時，使用 `app.get()` 方法響應一個“Hello Express”字符串。 通過查看日誌確保代碼正常運行，如果使用 Replit 可以在預覽中查看結果。

**注意：** 這些課程的所有代碼應該放在開始給出的幾行代碼之間。

# --hints--

應用應該返回字符串“Hello Express”

```js
(getUserInput) =>
  $.get(getUserInput('url')).then(
    (data) => {
      assert.equal(
        data,
        'Hello Express',
        'Your app does not serve the text "Hello Express"'
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
