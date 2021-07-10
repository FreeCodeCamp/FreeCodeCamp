---
id: 587d7fb1367417b2b2512bf3
title: 实现一个根级的请求记录中间件
challengeType: 2
forumTopicId: 301514
dashedName: implement-a-root-level-request-logger-middleware
---

# --description--

前面我们介绍了 `express.static()` 中间件函数， 现在是时候更详细地了解什么是中间件了。 中间件函数是一个接收 3 个参数的函数，这 3 个参数分别是：请求对象、响应对象和在应用的请求-响应循环中的下一个函数。 中间件函数执行一些可能对应用程序产生一些效果的代码，通常还会在请求对象或者响应对象里添加一些信息， 它们也可以在满足某些条件时通过发送响应来结束循环， 如果在它们完成时没有发送响应，那么就会开始执行堆栈中的下一个函数， `next()` 将触发调用第 3 个参数。

看看下面的例子：

```js
function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```

假设在某个路由上安装了这个中间件函数， 当一个请求与路由匹配时，它会显示字符串“I’m a middleware…”，然后它执行堆栈中的下一个函数。 在这个练习中，我们将构建根级中间件。 正如我们在挑战 4 中看到的，要在根层级安装中间件函数，我们可以使用 `app.use(<mware-function>)` 方法。 在这种情况下，该函数将对所有请求执行，但也可以设置更具体的条件来执行， 例如，如果你希望某个函数只针对 POST 请求执行，可以使用 `app.post(<mware-function>)` 方法。 所有的 HTTP 动词（GET、DELETE、PUT……）都存在类似的方法。

# --instructions--

构建一个简单的日志记录器。 对于每个请求，它应该在控制台中打印一个采用以下格式的字符串：`method path - ip`， 例如：`GET /json - ::ffff:127.0.0.1`。 注意 `method` 和 `path` 之间有一个空格，并且 `path` 和 `ip` 中间的破折号的两边都有空格。 可以使用 `req.method`、`req.path` 和 `req.ip` 从请求对象中分别获取请求方法（http 动词）、路由相对路径和请求者的 ip 信息。 当你完成时，记得要调用 `next()`，否则服务器将一直处于挂起状态。 请确保“Logs”是打开的，观察一下当一些请求到达时会发生什么事情。

**注意：**Express 按照函数在代码中出现的顺序来执行， 中间件也是如此。 如果你想让中间件函数适用于所有路由，那么应该在路由之前配置好中间件。

# --hints--

应该激活根级记录器中间件

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/root-middleware-logger').then(
    (data) => {
      assert.isTrue(
        data.passed,
        'root-level logger is not working as expected'
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
