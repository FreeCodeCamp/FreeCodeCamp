---
id: bd7158d8c443edefaeb5bd0e
title: 短网址微服务
challengeType: 4
forumTopicId: 301509
dashedName: url-shortener-microservice
---

# --description--

构建一个 JavaScript 的全栈应用，在功能上与这个应用相似：<https://url-shortener-microservice.freecodecamp.rocks/>。 可以采用下面的任意一种方式完成这个挑战：

-   克隆 [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-filemetadata/) 并在本地完成项目。
-   使用[我们的 Replit 初始化项目](https://replit.com/github/freeCodeCamp/boilerplate-project-urlshortener)来完成你的项目。
-   使用你选择的网站生成器来完成项目， 并确保包含了我们 GitHub 仓库的所有文件。

当完成本项目，请确认有一个正常运行的 demo 可以公开访问。 然后将 URL 提交到 `Solution Link` 中。 此外，还可以将项目的源码提交到 `GitHub Link` 中。

# --instructions--

**提示：** 请使用 body parsing 中间件来处理 POST 请求， 也可以使用 `dns` 核心模块中的 `dns.lookup(host, cb)` 函数验证提交的 URL。

# --hints--

提交自己的项目，而不是示例的 URL。

```js
(getUserInput) => {
  assert(
    !/.*\/url-shortener-microservice\.freecodecamp\.rocks/.test(
      getUserInput('url')
    )
  );
};
```

可以通过 POST 请求给 `/api/shorturl` 发送一个 URL，并返回一个带有 `original_url` 和 `short_url` 属性的 JSON 响应。 例如：`{ original_url : 'https://freeCodeCamp.org', short_url : 1}`。

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const urlVariable = Date.now();
  const fullUrl = `${url}/?v=${urlVariable}`
  const res = await fetch(url + '/api/shorturl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `url=${fullUrl}`
  });
  if (res.ok) {
    const { short_url, original_url } = await res.json();
    assert.isNotNull(short_url);
    assert.strictEqual(original_url, `${url}/?v=${urlVariable}`);
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};
```

当访问 `/api/shorturl/<short_url>` 时, 将重定向到原来的 URL。

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const urlVariable = Date.now();
  const fullUrl = `${url}/?v=${urlVariable}`
  let shortenedUrlVariable;
  const postResponse = await fetch(url + '/api/shorturl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `url=${fullUrl}`
  });
  if (postResponse.ok) {
    const { short_url } = await postResponse.json();
    shortenedUrlVariable = short_url;
  } else {
    throw new Error(`${postResponse.status} ${postResponse.statusText}`);
  }
  const getResponse = await fetch(
    url + '/api/shorturl/' + shortenedUrlVariable
  );
  if (getResponse) {
    const { redirected, url } = getResponse;
    assert.isTrue(redirected);
    assert.strictEqual(url,fullUrl);
  } else {
    throw new Error(`${getResponse.status} ${getResponse.statusText}`);
  }
};
```

如果传入一个没有遵循如 `http://www.example.com` 的无效 URL，则返回包含 `{ error: 'invalid url' }` 的 JSON 响应。

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/shorturl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `url=ftp:/john-doe.org`
  });
  if (res.ok) {
    const { error } = await res.json();
    assert.isNotNull(error);
    assert.strictEqual(error.toLowerCase(), 'invalid url');
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};
```

# --solutions--

```js
/**
  Backend challenges don't need solutions, 
  because they would need to be tested against a full working project. 
  Please check our contributing guidelines to learn more.
*/
```
