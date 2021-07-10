---
id: 587d7fb1367417b2b2512bf3
title: 實現一個根級的請求記錄中間件
challengeType: 2
forumTopicId: 301514
dashedName: implement-a-root-level-request-logger-middleware
---

# --description--

前面我們介紹了 `express.static()` 中間件函數， 現在是時候更詳細地瞭解什麼是中間件了。 中間件函數是一個接收 3 個參數的函數，這 3 個參數分別是：請求對象、響應對象和在應用的請求-響應循環中的下一個函數。 中間件函數執行一些可能對應用程序產生一些效果的代碼，通常還會在請求對象或者響應對象裏添加一些信息， 它們也可以在滿足某些條件時通過發送響應來結束循環， 如果在它們完成時沒有發送響應，那麼就會開始執行堆棧中的下一個函數， `next()` 將觸發調用第 3 個參數。

看看下面的例子：

```js
function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```

假設在某個路由上安裝了這個中間件函數， 當一個請求與路由匹配時，它會顯示字符串“I’m a middleware…”，然後它執行堆棧中的下一個函數。 在這個練習中，我們將構建根級中間件。 正如我們在挑戰 4 中看到的，要在根層級安裝中間件函數，我們可以使用 `app.use(<mware-function>)` 方法。 在這種情況下，該函數將對所有請求執行，但也可以設置更具體的條件來執行， 例如，如果你希望某個函數只針對 POST 請求執行，可以使用 `app.post(<mware-function>)` 方法。 所有的 HTTP 動詞（GET、DELETE、PUT……）都存在類似的方法。

# --instructions--

構建一個簡單的日誌記錄器。 對於每個請求，它應該在控制檯中打印一個採用以下格式的字符串：`method path - ip`， 例如：`GET /json - ::ffff:127.0.0.1`。 注意 `method` 和 `path` 之間有一個空格，並且 `path` 和 `ip` 中間的破折號的兩邊都有空格。 可以使用 `req.method`、`req.path` 和 `req.ip` 從請求對象中分別獲取請求方法（http 動詞）、路由相對路徑和請求者的 ip 信息。 當你完成時，記得要調用 `next()`，否則服務器將一直處於掛起狀態。 請確保“Logs”是打開的，觀察一下當一些請求到達時會發生什麼事情。

**注意：**Express 按照函數在代碼中出現的順序來執行， 中間件也是如此。 如果你想讓中間件函數適用於所有路由，那麼應該在路由之前配置好中間件。

# --hints--

應該激活根級記錄器中間件

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/root-middleware-logger').then(
    (data) => {
      assert.isTrue(
        data.passed,
        'root-level logger is not working as expected'
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
