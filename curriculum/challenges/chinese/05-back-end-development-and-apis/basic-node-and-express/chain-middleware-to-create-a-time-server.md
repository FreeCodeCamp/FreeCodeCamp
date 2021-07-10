---
id: 587d7fb1367417b2b2512bf4
title: 通过链式调用中间件来创建时间服务
challengeType: 2
forumTopicId: 301510
dashedName: chain-middleware-to-create-a-time-server
---

# --description--

使用 `app.METHOD(path, middlewareFunction)` 可以在指定的路由挂载中间件， 也可以在路由定义中链式调用中间件。

请看以下示例：

```js
app.get('/user', function(req, res, next) {
  req.user = getTheUserSync();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send(req.user);
});
```

此方法可用于将服务操作拆分为较小的单元， 这可以让应用拥有更好的结构，也便于在不同的位置上复用代码； 此方法还可用于对数据执行某些验证。 可以在每一个中间件堆栈中，阻止当前链的执行，并将控制权传递给专门设计用于处理错误的函数； 或者可以将控制权传递给下一个匹配的路由，以处理特殊情况， 我们将在高级 Express 章节中看到这些内容。

# --instructions--

在路由 `app.get('/now', ...)` 中链式调用中间件函数，并在最后处理。 在中间件函数中给请求对象中的 `req.time` 添加到当前时间， 可以使用 `new Date().toString()`， 在处理函数中，使用 `{time: req.time}` 结构的 JSON 对象来响应请求。

**注意：** 如果不链式调用中间件，测试将不能通过。 如果将中间件函数挂载在其他地方，即使输出结果正确，测试也会失败。

# --hints--

/now 接口应该已经挂载了中间件

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/chain-middleware-time').then(
    (data) => {
      assert.equal(
        data.stackLength,
        2,
        '"/now" route has no mounted middleware'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

/now 接口应该返回一个现在时间 +/-20 秒的时间

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/chain-middleware-time').then(
    (data) => {
      var now = new Date();
      assert.isAtMost(
        Math.abs(new Date(data.time) - now),
        20000,
        'the returned time is not between +- 20 secs from now'
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
