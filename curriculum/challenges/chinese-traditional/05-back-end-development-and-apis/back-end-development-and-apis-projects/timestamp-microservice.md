---
id: bd7158d8c443edefaeb5bdef
title: 時間戳微服務
challengeType: 4
forumTopicId: 301508
dashedName: timestamp-microservice
---

# --description--

構建一個 JavaScript 的全棧應用，在功能上與這個應用相似：<https://timestamp-microservice.freecodecamp.rocks/>。 可以採用下面的任意一種方式完成這個挑戰：

-   克隆 [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-timestamp/) 並在本地完成項目。
-   使用[我們的 Replit 初始化項目](https://replit.com/github/freeCodeCamp/boilerplate-project-timestamp)來完成你的項目。
-   使用你選擇的網站生成器來完成項目， 並確保包含了我們 GitHub 倉庫的所有文件。

當完成本項目，請確認有一個正常運行的 demo 可以公開訪問。 然後將 URL 提交到 `Solution Link` 中。 此外，還可以將項目的源碼提交到 `GitHub Link` 中。

# --hints--

提交自己的項目，而不是示例的 URL。

```js
(getUserInput) => {
  assert(
    !/.*\/timestamp-microservice\.freecodecamp\.rocks/.test(getUserInput('url'))
  );
};
```

向 `/api/:date?` 發送一個帶有有效日期的請求，應該很快（在幾毫秒內）返回一個 JSON 對象，在這個 JSON 對象內有一個包含輸入日期的 Unix 時間戳的 `unix` 鍵。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/2016-12-25').then(
    (data) => {
      assert.equal(
        data.unix,
        1482624000000,
        'Should be a valid unix timestamp'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

向 `/api/:date?` 發送一個帶有有效日期的請求，應該返回一個 JSON 對象，在這個 JSON 對象內有一個包含如 `Thu, 01 Jan 1970 00:00:00 GMT` 格式的輸入日期的 `utc` 鍵。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/2016-12-25').then(
    (data) => {
      assert.equal(
        data.utc,
        'Sun, 25 Dec 2016 00:00:00 GMT',
        'Should be a valid UTC date string'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

向 `/api/1451001600000` 發送請求，應該返回 `{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }`。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/1451001600000').then(
    (data) => {
      assert(
        data.unix === 1451001600000 &&
          data.utc === 'Fri, 25 Dec 2015 00:00:00 GMT'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

程序能成功處理能被 `new Date(date_string)` 解析的日期。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/05 October 2011').then(
    (data) => {
      assert(
        data.unix === 1317772800000 &&
          data.utc === 'Wed, 05 Oct 2011 00:00:00 GMT'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

如果傳入的日期是無效的，將返回一個帶有結構體 `{ error : "Invalid Date" }` 的對象。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/this-is-not-a-date').then(
    (data) => {
      assert.equal(data.error.toLowerCase(), 'invalid date');
    },
    (xhr) => {
      assert(xhr.responseJSON.error.toLowerCase() === 'invalid date');
    }
  );
```

如果傳入的參數是空日期，將返回一個包含當前時間的 `unix` 鍵的 JSON 對象。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api').then(
    (data) => {
      var now = Date.now();
      assert.approximately(data.unix, now, 20000);
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

如果傳入的參數是空日期，將返回一個包含當前時間的 `utc` 鍵的 JSON 對象。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api').then(
    (data) => {
      var now = Date.now();
      var serverTime = new Date(data.utc).getTime();
      assert.approximately(serverTime, now, 20000);
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
