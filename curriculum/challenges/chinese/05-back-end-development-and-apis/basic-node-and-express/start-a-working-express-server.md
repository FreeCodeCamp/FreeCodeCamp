---
id: 587d7fb0367417b2b2512bee
title: 启动一个 Express 服务
challengeType: 2
forumTopicId: 301519
dashedName: start-a-working-express-server
---

# --description--

在 `myApp.js` 文件的前两行中，你可以看到创建一个 Express 应用对象很简单。 这个对象有几种方法，在后面的挑战中将学习到其中的许多部分。 一个基础的方法是 `app.listen(port)`。 它处于运行状态时告诉服务器监听指定的端口。 出于测试的原因，需要应用在后台运行，所以在 `server.js` 中已经添加了这个方法。

让我们在服务端输出第一个字符串！ 在 Express 中，路由采用这种结构：`app.METHOD(PATH, HANDLER)`， METHOD 是 http 请求方法的小写形式， PATH 是服务器上的相对路径（它可以是一个字符串，甚至可以是正则表达式）， HANDLER 是匹配路由时 Express 调用的函数， 处理函数采用这种形式：`function(req, res) {...}`，其中 req 是请求对象，res 是响应对象， 例如：

```js
function(req, res) {
  res.send('Response String');
}
```

将会响应一个字符串“Response String”。

# --instructions--

当 GET 请求 `/`（根路由 ）时，使用 `app.get()` 方法响应一个“Hello Express”字符串。 通过查看日志确保代码正常运行，如果使用 Replit 可以在预览中查看结果。

**注意：** 这些课程的所有代码应该放在开始给出的几行代码之间。

# --hints--

应用应该返回字符串“Hello Express”

```js
(getUserInput) =>
  $.get(getUserInput('url')).then(
    (data) => {
      assert.equal(
        data,
        'Hello Express',
        'Your app does not serve the text "Hello Express"'
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
