---
id: bd7158d8c443edefaeb5bd0f
title: 文件元數據微服務
challengeType: 4
forumTopicId: 301506
dashedName: file-metadata-microservice
---

# --description--

構建一個 JavaScript 的全棧應用，在功能上與這個應用相似：<https://file-metadata-microservice.freecodecamp.rocks/>。 可以採用下面的一種方式完成這個挑戰：

-   克隆 [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-filemetadata/) 並在本地完成項目。
-   使用[我們的 Replit 初始化項目](https://replit.com/github/freeCodeCamp/boilerplate-project-filemetadata)來完成你的項目。
-   使用你選擇的網站生成器來完成項目， 並確保包含了我們 GitHub 倉庫的所有文件。

當完成本項目，請確認有一個正常運行的 demo 可以公開訪問。 然後將 URL 提交到 `Solution Link` 中。 此外，還可以將項目的源碼提交到 `GitHub Link` 中。

# --instructions--

** 提示：** 可以使用 `multer` npm 包來處理上傳文件

# --hints--

提交自己的項目，而不是示例的 URL。

```js
(getUserInput) => {
  assert(
    !/.*\/file-metadata-microservice\.freecodecamp\.rocks/.test(
      getUserInput('url')
    )
  );
};
```

可以提交一個包含上傳文件的表單。

```js
async (getUserInput) => {
  const site = await fetch(getUserInput('url'));
  const data = await site.text();
  const doc = new DOMParser().parseFromString(data, 'text/html');
  assert(doc.querySelector('input[type="file"]'));
};
```

表單的文件上傳標籤的 `name` 屬性設置成 `upfile`。

```js
async (getUserInput) => {
  const site = await fetch(getUserInput('url'));
  const data = await site.text();
  const doc = new DOMParser().parseFromString(data, 'text/html');
  assert(doc.querySelector('input[name="upfile"]'));
};
```

當提交一個文件時，在 JSON 響應中收到文件的 `name`、`type` 和`size`（以 bytes（字節）爲單位）。

```js
async (getUserInput) => {
  const formData = new FormData();
  const fileData = await fetch(
    'https://cdn.freecodecamp.org/weather-icons/01d.png'
  );
  const file = await fileData.blob();
  formData.append('upfile', file, 'icon');
  const data = await fetch(getUserInput('url') + '/api/fileanalyse', {
    method: 'POST',
    body: formData
  });
  const parsed = await data.json();
  assert.property(parsed, 'size');
  assert.equal(parsed.name, 'icon');
  assert.equal(parsed.type, 'image/png');
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
