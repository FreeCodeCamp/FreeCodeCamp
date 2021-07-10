---
id: 587d7fb2367417b2b2512bf7
title: 使用 body-parser 来解析 POST 请求
challengeType: 2
forumTopicId: 301520
dashedName: use-body-parser-to-parse-post-requests
---

# --description--

除了 GET 还有另一个常见的 HTTP 动词，即 POST。 POST 是使用 HTML 表单发送客户端数据的默认方法。 在 REST 规范中，POST 常用于发送数据以在数据库中创建新项目（新用户或新博客文章）。 在这个项目中没有使用数据库，但下面将学习如何处理 POST 请求。

在这些类型的请求中，数据不会出现在 URL 中，而是隐藏在请求正文中。 请求正文也是 HTML 请求的一部分，被称为负载。 即使数据在 URL 中是不可见的，也不意味着它是私有的。 要了解原因，请观察 HTTP POST 请求的原始内容：

```http
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

name=John+Doe&age=25
```

正如你所看到的，正文被编码成类似查询字符串的形式， 这是 HTML 表单使用的默认格式。 我们还可以通过 Ajax 使用 JSON 来处理具有更复杂结构的数据。 还有另一种类型的编码：multipart/form-data， 它被用来上传二进制文件。 在本练习中，我们将使用 URL 编码请求正文。 要解析来自 POST 请求的数据，你必须安装 `body-parser` 包， 这个包包含一套可以解码不同格式数据的中间件。

# --instructions--

在 `package.json` 中安装 `body-parser` 模块， 然后在文件顶部 `require` 进来， 用变量 `bodyParser` 保存它。 通过中间件的 `bodyParser.urlencoded({extended: false})` 方法处理 URL 编码数据， 将调用上个方法返回的函数传给 `app.use()`， 中间件通常挂载在所有需要它的路由之前。

**注意：**`extended=false` 是一个告诉解析器使用经典编码的配置选项， 当使用它时，值只能是字符串或者数组， 拓展版本数据更加灵活，但稍逊于 JSON。

# --hints--

应该挂载“body-parser”中间件

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/add-body-parser').then(
    (data) => {
      assert.isAbove(
        data.mountedAt,
        0,
        '"body-parser" is not mounted correctly'
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
