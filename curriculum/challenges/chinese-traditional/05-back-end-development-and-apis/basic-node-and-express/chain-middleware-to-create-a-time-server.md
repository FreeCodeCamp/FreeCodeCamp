---
id: 587d7fb1367417b2b2512bf4
title: 通過鏈式調用中間件來創建時間服務
challengeType: 2
forumTopicId: 301510
dashedName: chain-middleware-to-create-a-time-server
---

# --description--

使用 `app.METHOD(path, middlewareFunction)` 可以在指定的路由掛載中間件， 也可以在路由定義中鏈式調用中間件。

請看以下示例：

```js
app.get('/user', function(req, res, next) {
  req.user = getTheUserSync();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send(req.user);
});
```

此方法可用於將服務操作拆分爲較小的單元， 這可以讓應用擁有更好的結構，也便於在不同的位置上覆用代碼； 此方法還可用於對數據執行某些驗證。 可以在每一箇中間件堆棧中，阻止當前鏈的執行，並將控制權傳遞給專門設計用於處理錯誤的函數； 或者可以將控制權傳遞給下一個匹配的路由，以處理特殊情況， 我們將在高級 Express 章節中看到這些內容。

# --instructions--

在路由 `app.get('/now', ...)` 中鏈式調用中間件函數，並在最後處理。 在中間件函數中給請求對象中的 `req.time` 添加到當前時間， 可以使用 `new Date().toString()`， 在處理函數中，使用 `{time: req.time}` 結構的 JSON 對象來響應請求。

**注意：** 如果不鏈式調用中間件，測試將不能通過。 如果將中間件函數掛載在其他地方，即使輸出結果正確，測試也會失敗。

# --hints--

/now 接口應該已經掛載了中間件

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/chain-middleware-time').then(
    (data) => {
      assert.equal(
        data.stackLength,
        2,
        '"/now" route has no mounted middleware'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

/now 接口應該返回一個現在時間 +/-20 秒的時間

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/chain-middleware-time').then(
    (data) => {
      var now = new Date();
      assert.isAtMost(
        Math.abs(new Date(data.time) - now),
        20000,
        'the returned time is not between +- 20 secs from now'
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
