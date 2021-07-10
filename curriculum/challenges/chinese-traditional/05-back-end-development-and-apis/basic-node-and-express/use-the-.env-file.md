---
id: 587d7fb1367417b2b2512bf2
title: 使用 .env 文件
challengeType: 2
forumTopicId: 301521
dashedName: use-the--env-file
---

# --description--

`.env` 文件是一個用於將環境變量傳給應用程序的隱藏文件， 這是一個除了開發者之外沒人可以訪問的私密文件，它可以用來存儲你想保密或者隱藏的數據， 例如，它可以存儲第三方服務的 API 密鑰或者數據庫 URI， 也可以使用它來存儲配置選項， 通過設置配置選項，你可以改變應用程序的行爲，而無需重寫一些代碼。

在應用程序中可以通過 `process.env.VAR_NAME` 訪問到環境變量。 `process.env` 對象是 Node 程序中的一個全局對象，可以給這個變量傳字符串。 習慣上，變量名全部大寫，單詞之間用下劃線分隔。 `.env` 是一個 shell 文件，因此不需要用給變量名和值加引號。 還有一點需要注意，當你給變量賦值時等號兩側不能有空格，例如：`VAR_NAME=value`。 通常來講，每一個變量定義會獨佔一行。

# --instructions--

添加一個環境變量作爲配置選項。

在項目根目錄創建一個 `.env` 文件，並存儲變量 `MESSAGE_STYLE=uppercase`。

當向 `/json` 發 GET 請求時，如果 `process.env.MESSAGE_STYLE` 的值爲 `uppercase`，那麼上一次挑戰中的路由處理程序返回的對象的消息則應該大寫。 響應對象應該是 `{"message": "Hello json"}` or `{"message": "HELLO JSON"}`，取決於 `MESSAGE_STYLE` 的值。

**注意：**如果你正在使用 Replit，你無法創建一個 `.env` 文件。 相反，使用內置的 <dfn>SECRETS</dfn> 標籤添加變量。

# --hints--

端口 `/json` 響應的值，應該隨着環境變量 `MESSAGE_STYLE` 的變化而改變。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/use-env-vars').then(
    (data) => {
      assert.isTrue(
        data.passed,
        'The response of "/json" does not change according to MESSAGE_STYLE'
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
