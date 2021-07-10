---
id: 587d7fb2367417b2b2512bf5
title: 从客户端获取输入的路由参数
challengeType: 2
forumTopicId: 301513
dashedName: get-route-parameter-input-from-the-client
---

# --description--

在构建 API 时，要让用户告诉我们他们想从服务中获取什么。 举个例子，如果客户请求数据库中存储的用户信息，他们需要一种方法让我们知道他们对哪个用户感兴趣， 使用路由参数可以实现这个需求。 路由参数是由斜杠（/）分隔的 URL 命名段， 每一小段能捕获与其位置匹配的 URL 部分的值， 捕获的值能够在 `req.params` 对象中找到。

<blockquote>路由地址：'/user/:userId/book/:bookId'<br> 实际请求 URL：'/user/546/book/6754'<br> req.params：{userId: '546', bookId: '6754'}</blockquote>

# --instructions--

在路由 `GET /:word/echo` 中构建一个响应服务， 响应一个采用 `{echo: word}` 结构的 JSON 对象。 可以在 `req.params.word` 中找到要重复的单词， 可以在浏览器的地址栏测试你的路由，访问一些匹配的路由，比如：`your-app-rootpath/freecodecamp/echo`。

# --hints--

测试 1：你的 echo 服务应该正确地重复单词

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/eChOtEsT/echo').then(
    (data) => {
      assert.equal(
        data.echo,
        'eChOtEsT',
        'Test 1: the echo server is not working as expected'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

测试 2：你的 echo 服务应该正确地重复单词

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/ech0-t3st/echo').then(
    (data) => {
      assert.equal(
        data.echo,
        'ech0-t3st',
        'Test 2: the echo server is not working as expected'
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
