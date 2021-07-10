---
id: 587d7fb2367417b2b2512bf6
title: 從客戶端獲取輸入的查詢參數
challengeType: 2
forumTopicId: 301512
dashedName: get-query-parameter-input-from-the-client
---

# --description--

從客戶端獲取輸入的另一種常見方式是使用查詢字符串對路由路徑中的數據進行編碼， 查詢字符串使用標記（?）分隔，並且包含鍵值對 field=value， 每對鍵值使用連字號（&）分隔。 Express 能夠從查詢字符串中解析這些數據，並且把它放到 `req.query` 對象中。 有些字符（如百分號（%））不能在出現在 URL 中，它們在發送前必須以不同的格式進行編碼。 如果使用 JavaScript 的 API，可以用特定的方法來編碼/解碼這些字符。

<blockquote>路由地址：'/library'<br> 實際請求 URL：'/library?userId=546&#x26;bookId=6754'<br>req.query：{userId: '546', bookId: '6754'}</blockquote>

# --instructions--

構建一個 API 接口，使用路由掛載在 `GET /name` 上， 使用一個 JSON 文件來響應，它的結構是這樣的：`{ name: 'firstname lastname'}`， 名字（first name）和姓氏（last name）參數應該編碼在查詢參數中，例如：`?first=firstname&last=lastname`。

**注意：** 在後面的練習中，我們將向相同的路由路徑 `/name` 發送 POST 請求來接收數據。 如果願意，可以使用`app.route(path).get(handler).post(handler)`這中寫法， 這種語法允許在同一路徑路由上鍊式調用不同的請求方法， 可以節省一點打字時間，也可以讓代碼看起來更清晰。

# --hints--

測試 1：你的 API 應該用正確的名字來響應

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/name?first=Mick&last=Jagger').then(
    (data) => {
      assert.equal(
        data.name,
        'Mick Jagger',
        'Test 1: "GET /name" route does not behave as expected'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

測試 2：你的 API 應該用正確的名字來響應

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/name?last=Richards&first=Keith').then(
    (data) => {
      assert.equal(
        data.name,
        'Keith Richards',
        'Test 2: "GET /name" route does not behave as expected'
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
