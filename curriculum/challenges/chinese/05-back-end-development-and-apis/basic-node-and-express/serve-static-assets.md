---
id: 587d7fb0367417b2b2512bf0
title: 提供静态资源服务
challengeType: 2
forumTopicId: 301518
dashedName: serve-static-assets
---

# --description--

HTML 服务器通常有一个或多个用户可以访问的目录。 你可以将应用程序所需的静态资源 (样式表、脚本、图片) 放在那里。

在 Express 中可以使用中间件 `express.static(path)` 来设置此功能，它的参数 `path` 就是包含静态资源文件的绝对路径。

如果你不知道什么是中间件……别担心，我们将在后面详细讨论。 其实，中间件就是一个拦截路由处理方法并在里面添加一些信息的函数。 使用 `app.use(path, middlewareFunction)` 方法来加载一个中间件， 它的第一个参数 `path` 是可选的， 如果没设置第一个参数，那么所有的请求都会经过这个中间件处理。

# --instructions--

使用 `app.use()` 为路径 `/public` 的请求安装 `express.static()` 中间件， 静态资源的绝对路径是 `__dirname + /public`。

现在应用应该能提供 CSS 样式表， 请注意， `/public/style.css` 文件被项目模板的 `/views/index.html` 引用， 首页应该更好看了。

# --hints--

应用应该将资源文件从 `/public` 目录发送到 `/public` 路径

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
