---
id: 587d7fb0367417b2b2512bf0
title: 提供靜態資源服務
challengeType: 2
forumTopicId: 301518
dashedName: serve-static-assets
---

# --description--

HTML 服務器通常有一個或多個用戶可以訪問的目錄。 你可以將應用程序所需的靜態資源 (樣式表、腳本、圖片) 放在那裏。

在 Express 中可以使用中間件 `express.static(path)` 來設置此功能，它的參數 `path` 就是包含靜態資源文件的絕對路徑。

如果你不知道什麼是中間件……別擔心，我們將在後面詳細討論。 其實，中間件就是一個攔截路由處理方法並在裏面添加一些信息的函數。 使用 `app.use(path, middlewareFunction)` 方法來加載一箇中間件， 它的第一個參數 `path` 是可選的， 如果沒設置第一個參數，那麼所有的請求都會經過這個中間件處理。

# --instructions--

使用 `app.use()` 爲路徑 `/public` 的請求安裝 `express.static()` 中間件， 靜態資源的絕對路徑是 `__dirname + /public`。

現在應用應該能提供 CSS 樣式表， 請注意， `/public/style.css` 文件被項目模板的 `/views/index.html` 引用， 首頁應該更好看了。

# --hints--

應用應該將資源文件從 `/public` 目錄發送到 `/public` 路徑

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/public/style.css').then(
    (data) => {
      assert.match(
        data,
        /body\s*\{[^\}]*\}/,
        'Your app does not serve static assets'
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
