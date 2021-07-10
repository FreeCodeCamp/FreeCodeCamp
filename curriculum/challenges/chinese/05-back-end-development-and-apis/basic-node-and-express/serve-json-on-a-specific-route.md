---
id: 587d7fb1367417b2b2512bf1
title: 在指定路由上提供 JSON 服务
challengeType: 2
forumTopicId: 301517
dashedName: serve-json-on-a-specific-route
---

# --description--

HTML 服务器提供 HTML 服务，而 API 提供数据服务。 <dfn>REST</dfn>（REpresentational State Transfer）API 允许以简单的方式进行数据交换，对于客户端不必要知道服务器的细节。 客户只需要知道资源在哪里（URL），以及想执行的动作（动词）。 GET 动词常被用来获取无需修改的信息。 如今，网络上的移动数据首选格式是 JSON， 简而言之，JSON 是一种可以方便地用字符串表示 JavaScript 对象的方式，因此它很容易传输。

我们来创建一个简单的 API，创建一个路径为 `/json` 且返回数据是 JSON 格式的路由， 可以像之前那样用 `app.get()` 方法来做。 然后在路由处理部分使用 `res.json()` 方法，并传入一个对象作为参数， 这个方法会结束请求响应循环（request-response loop），然后返回数据。 原来，一个有效的 JavaScript 对象会转化为字符串，然后会设置适当的消息头来告诉浏览器：“这是一个 JSON 数据”，最后将数据返回给客户端。 一个有效的对象通常是这种结构：`{key: data}`， `data` 可以是数字、字符串、嵌套对象或数组， `data` 也可以是变量或者函数返回值，在这种情况下，它们先求值再转成字符串。

# --instructions--

当向路由 `/json` 发送 GET 请求，将对象 `{"message": "Hello json"}` 以 JSON 格式返回给客户端， 浏览器访问 `your-app-url/json` 时，应该在屏幕上看到这个消息。

# --hints--

访问端口 `/json` 应该返回一个 json 对象 `{"message": "Hello json"}`

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/json').then(
    (data) => {
      assert.equal(
        data.message,
        'Hello json',
        "The '/json' endpoint does not serve the right data"
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
