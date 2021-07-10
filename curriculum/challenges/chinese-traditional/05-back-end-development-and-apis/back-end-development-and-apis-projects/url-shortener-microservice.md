---
id: bd7158d8c443edefaeb5bd0e
title: 短網址微服務
challengeType: 4
forumTopicId: 301509
dashedName: url-shortener-microservice
---

# --description--

構建一個 JavaScript 的全棧應用，在功能上與這個應用相似：<https://url-shortener-microservice.freecodecamp.rocks/>。 可以採用下面的任意一種方式完成這個挑戰：

-   克隆 [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-filemetadata/) 並在本地完成項目。
-   使用[我們的 Replit 初始化項目](https://replit.com/github/freeCodeCamp/boilerplate-project-urlshortener)來完成你的項目。
-   使用你選擇的網站生成器來完成項目， 並確保包含了我們 GitHub 倉庫的所有文件。

當完成本項目，請確認有一個正常運行的 demo 可以公開訪問。 然後將 URL 提交到 `Solution Link` 中。 此外，還可以將項目的源碼提交到 `GitHub Link` 中。

# --instructions--

**提示：** 請使用 body parsing 中間件來處理 POST 請求， 也可以使用 `dns` 核心模塊中的 `dns.lookup(host, cb)` 函數驗證提交的 URL。

# --hints--

提交自己的項目，而不是示例的 URL。

```js
(getUserInput) => {
  assert(
    !/.*\/url-shortener-microservice\.freecodecamp\.rocks/.test(
      getUserInput('url')
    )
  );
};
```

可以通過 POST 請求給 `/api/shorturl` 發送一個 URL，並返回一個帶有 `original_url` 和 `short_url` 屬性的 JSON 響應。 例如：`{ original_url : 'https://freeCodeCamp.org', short_url : 1}`。

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

當訪問 `/api/shorturl/<short_url>` 時, 將重定向到原來的 URL。

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

如果傳入一個沒有遵循如 `http://www.example.com` 的無效 URL，則返回包含 `{ error: 'invalid url' }` 的 JSON 響應。

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
