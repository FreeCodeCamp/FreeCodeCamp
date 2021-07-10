---
id: 587d7fb1367417b2b2512bf1
title: 在指定路由上提供 JSON 服務
challengeType: 2
forumTopicId: 301517
dashedName: serve-json-on-a-specific-route
---

# --description--

HTML 服務器提供 HTML 服務，而 API 提供數據服務。 <dfn>REST</dfn>（REpresentational State Transfer）API 允許以簡單的方式進行數據交換，對於客戶端不必要知道服務器的細節。 客戶只需要知道資源在哪裏（URL），以及想執行的動作（動詞）。 GET 動詞常被用來獲取無需修改的信息。 如今，網絡上的移動數據首選格式是 JSON， 簡而言之，JSON 是一種可以方便地用字符串表示 JavaScript 對象的方式，因此它很容易傳輸。

我們來創建一個簡單的 API，創建一個路徑爲 `/json` 且返回數據是 JSON 格式的路由， 可以像之前那樣用 `app.get()` 方法來做。 然後在路由處理部分使用 `res.json()` 方法，並傳入一個對象作爲參數， 這個方法會結束請求響應循環（request-response loop），然後返回數據。 原來，一個有效的 JavaScript 對象會轉化爲字符串，然後會設置適當的消息頭來告訴瀏覽器：“這是一個 JSON 數據”，最後將數據返回給客戶端。 一個有效的對象通常是這種結構：`{key: data}`， `data` 可以是數字、字符串、嵌套對象或數組， `data` 也可以是變量或者函數返回值，在這種情況下，它們先求值再轉成字符串。

# --instructions--

當向路由 `/json` 發送 GET 請求，將對象 `{"message": "Hello json"}` 以 JSON 格式返回給客戶端， 瀏覽器訪問 `your-app-url/json` 時，應該在屏幕上看到這個消息。

# --hints--

訪問端口 `/json` 應該返回一個 json 對象 `{"message": "Hello json"}`

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/json').then(
    (data) => {
      assert.equal(
        data.message,
        'Hello json',
        "The '/json' endpoint does not serve the right data"
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
