---
id: 587d7fb2367417b2b2512bf6
title: 从客户端获取输入的查询参数
challengeType: 2
forumTopicId: 301512
dashedName: get-query-parameter-input-from-the-client
---

# --description--

从客户端获取输入的另一种常见方式是使用查询字符串对路由路径中的数据进行编码， 查询字符串使用标记（?）分隔，并且包含键值对 field=value， 每对键值使用连字号（&）分隔。 Express 能够从查询字符串中解析这些数据，并且把它放到 `req.query` 对象中。 有些字符（如百分号（%））不能在出现在 URL 中，它们在发送前必须以不同的格式进行编码。 如果使用 JavaScript 的 API，可以用特定的方法来编码/解码这些字符。

<blockquote>路由地址：'/library'<br> 实际请求 URL：'/library?userId=546&#x26;bookId=6754'<br>req.query：{userId: '546', bookId: '6754'}</blockquote>

# --instructions--

构建一个 API 接口，使用路由挂载在 `GET /name` 上， 使用一个 JSON 文件来响应，它的结构是这样的：`{ name: 'firstname lastname'}`， 名字（first name）和姓氏（last name）参数应该编码在查询参数中，例如：`?first=firstname&last=lastname`。

**注意：** 在后面的练习中，我们将向相同的路由路径 `/name` 发送 POST 请求来接收数据。 如果愿意，可以使用`app.route(path).get(handler).post(handler)`这中写法， 这种语法允许在同一路径路由上链式调用不同的请求方法， 可以节省一点打字时间，也可以让代码看起来更清晰。

# --hints--

测试 1：你的 API 应该用正确的名字来响应

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/name?first=Mick&last=Jagger').then(
    (data) => {
      assert.equal(
        data.name,
        'Mick Jagger',
        'Test 1: "GET /name" route does not behave as expected'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

测试 2：你的 API 应该用正确的名字来响应

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/name?last=Richards&first=Keith').then(
    (data) => {
      assert.equal(
        data.name,
        'Keith Richards',
        'Test 2: "GET /name" route does not behave as expected'
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
