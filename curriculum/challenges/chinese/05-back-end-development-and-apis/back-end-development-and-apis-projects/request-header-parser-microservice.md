---
id: bd7158d8c443edefaeb5bdff
title: 请求头解析器微服务
challengeType: 4
forumTopicId: 301507
dashedName: request-header-parser-microservice
---

# --description--

构建一个 JavaScript 的全栈应用，在功能上与这个应用相似：<https://request-header-parser-microservice.freecodecamp.rocks/>。 可以采用下面的一种方式完成这个挑战：

-   克隆 [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-headerparser/) 并在本地完成项目。
-   使用[我们的 Replit 初始化项目](https://replit.com/github/freeCodeCamp/boilerplate-project-headerparser)来完成你的项目。
-   使用你选择的网站生成器来完成项目， 并确保包含了我们 GitHub 仓库的所有文件。

当完成本项目，请确认有一个正常运行的 demo 可以公开访问。 然后将 URL 提交到 `Solution Link` 中。 此外，还可以将项目的源码提交到 `GitHub Link` 中。

# --hints--

提交自己的项目，而不是示例的 URL。

```js
(getUserInput) => {
  assert(
    !/.*\/request-header-parser-microservice\.freecodecamp\.rocks/.test(
      getUserInput('url')
    )
  );
};
```

向 `/api/whoami` 发送请求，返回一个 JSON 对象，这个JSON 对象应该含有存放 IP 地址的 `ipaddress` 键中。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/whoami').then(
    (data) => assert(data.ipaddress && data.ipaddress.length > 0),
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

向 `/api/whoami` 发送请求，返回一个 JSON 对象，这个 JSON 对象应该含有存放语言首选项的 `language` 键。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/whoami').then(
    (data) => assert(data.language && data.language.length > 0),
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

向 `/api/whoami` 发送请求，返回一个 JSON 对象，这个 JSON 对象应该含有存放（发送请求的）软件的 `software` 键。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/api/whoami').then(
    (data) => assert(data.software && data.software.length > 0),
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
