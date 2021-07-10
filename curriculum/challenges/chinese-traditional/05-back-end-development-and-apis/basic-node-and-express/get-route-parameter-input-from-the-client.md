---
id: 587d7fb2367417b2b2512bf5
title: 從客戶端獲取輸入的路由參數
challengeType: 2
forumTopicId: 301513
dashedName: get-route-parameter-input-from-the-client
---

# --description--

在構建 API 時，要讓用戶告訴我們他們想從服務中獲取什麼。 舉個例子，如果客戶請求數據庫中存儲的用戶信息，他們需要一種方法讓我們知道他們對哪個用戶感興趣， 使用路由參數可以實現這個需求。 路由參數是由斜槓（/）分隔的 URL 命名段， 每一小段能捕獲與其位置匹配的 URL 部分的值， 捕獲的值能夠在 `req.params` 對象中找到。

<blockquote>路由地址：'/user/:userId/book/:bookId'<br> 實際請求 URL：'/user/546/book/6754'<br> req.params：{userId: '546', bookId: '6754'}</blockquote>

# --instructions--

在路由 `GET /:word/echo` 中構建一個響應服務， 響應一個採用 `{echo: word}` 結構的 JSON 對象。 可以在 `req.params.word` 中找到要重複的單詞， 可以在瀏覽器的地址欄測試你的路由，訪問一些匹配的路由，比如：`your-app-rootpath/freecodecamp/echo`。

# --hints--

測試 1：你的 echo 服務應該正確地重複單詞

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/eChOtEsT/echo').then(
    (data) => {
      assert.equal(
        data.echo,
        'eChOtEsT',
        'Test 1: the echo server is not working as expected'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

測試 2：你的 echo 服務應該正確地重複單詞

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/ech0-t3st/echo').then(
    (data) => {
      assert.equal(
        data.echo,
        'ech0-t3st',
        'Test 2: the echo server is not working as expected'
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
