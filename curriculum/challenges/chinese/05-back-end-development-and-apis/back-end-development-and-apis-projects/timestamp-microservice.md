---
id: bd7158d8c443edefaeb5bdef
title: 时间戳微服务
challengeType: 4
forumTopicId: 301508
dashedName: timestamp-microservice
---

# --description--

构建一个 JavaScript 的全栈应用，在功能上与这个应用相似：<https://timestamp-microservice.freecodecamp.rocks/>。 可以采用下面的任意一种方式完成这个挑战：

-   克隆 [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-timestamp/) 并在本地完成项目。
-   使用[我们的 Replit 初始化项目](https://replit.com/github/freeCodeCamp/boilerplate-project-timestamp)来完成你的项目。
-   使用你选择的网站生成器来完成项目， 并确保包含了我们 GitHub 仓库的所有文件。

当完成本项目，请确认有一个正常运行的 demo 可以公开访问。 然后将 URL 提交到 `Solution Link` 中。 此外，还可以将项目的源码提交到 `GitHub Link` 中。

# --hints--

提交自己的项目，而不是示例的 URL。

```js
(getUserInput) => {
  assert(
    !/.*\/timestamp-microservice\.freecodecamp\.rocks/.test(getUserInput('url'))
  );
};
```

向 `/api/:date?` 发送一个带有有效日期的请求，应该很快（在几毫秒内）返回一个 JSON 对象，在这个 JSON 对象内有一个包含输入日期的 Unix 时间戳的 `unix` 键。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/2016-12-25').then(
    (data) => {
      assert.equal(
        data.unix,
        1482624000000,
        'Should be a valid unix timestamp'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

向 `/api/:date?` 发送一个带有有效日期的请求，应该返回一个 JSON 对象，在这个 JSON 对象内有一个包含如 `Thu, 01 Jan 1970 00:00:00 GMT` 格式的输入日期的 `utc` 键。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/2016-12-25').then(
    (data) => {
      assert.equal(
        data.utc,
        'Sun, 25 Dec 2016 00:00:00 GMT',
        'Should be a valid UTC date string'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

向 `/api/1451001600000` 发送请求，应该返回 `{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }`。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/1451001600000').then(
    (data) => {
      assert(
        data.unix === 1451001600000 &&
          data.utc === 'Fri, 25 Dec 2015 00:00:00 GMT'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

程序能成功处理能被 `new Date(date_string)` 解析的日期。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/05 October 2011').then(
    (data) => {
      assert(
        data.unix === 1317772800000 &&
          data.utc === 'Wed, 05 Oct 2011 00:00:00 GMT'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

如果传入的日期是无效的，将返回一个带有结构体 `{ error : "Invalid Date" }` 的对象。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/this-is-not-a-date').then(
    (data) => {
      assert.equal(data.error.toLowerCase(), 'invalid date');
    },
    (xhr) => {
      assert(xhr.responseJSON.error.toLowerCase() === 'invalid date');
    }
  );
```

如果传入的参数是空日期，将返回一个包含当前时间的 `unix` 键的 JSON 对象。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api').then(
    (data) => {
      var now = Date.now();
      assert.approximately(data.unix, now, 20000);
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

如果传入的参数是空日期，将返回一个包含当前时间的 `utc` 键的 JSON 对象。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api').then(
    (data) => {
      var now = Date.now();
      var serverTime = new Date(data.utc).getTime();
      assert.approximately(serverTime, now, 20000);
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
