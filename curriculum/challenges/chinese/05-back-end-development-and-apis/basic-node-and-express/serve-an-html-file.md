---
id: 587d7fb0367417b2b2512bef
title: 提供 HTML 文件服务
challengeType: 2
forumTopicId: 301516
dashedName: serve-an-html-file
---

# --description--

通过 `res.sendFile(path)` 方法给请求响应一个文件， 可以把它放到路由处理 `app.get('/', ...)` 中。 在后台，这个方法会根据你想发送的文件的类型，设置适当的消息头信息来告诉浏览器如何处理它， 然后读取并发送文件， 此方法需要文件的绝对路径。 建议使用 Node. js 的全局变量 `__dirname` 来计算出这个文件的绝对路径：

```js
absolutePath = __dirname + relativePath/file.ext
```

# --instructions--

发送文件 `/views/index.html` 作为 `/` 的 GET 请求的响应。 如果实时查看应用，你会看到一个大的 HTML 标题（以及我们稍后将使用的表单……），目前它们还没有任何样式。

**注意：** 你可以编辑上一个挑战的解题代码，或者创建一个新的代码片段。 如果你创建一个新的代码片段，请记住 Express 会从上到下匹配路由，并执行第一个匹配的处理程序， 你必须注释掉前面的代码，否则服务器还是响应之前的字符串。

# --hints--

应用应该响应 views/index.html 文件

```js
(getUserInput) =>
  $.get(getUserInput('url')).then(
    (data) => {
      assert.match(
        data,
        /<h1>.*<\/h1>/,
        'Your app does not serve the expected HTML'
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
