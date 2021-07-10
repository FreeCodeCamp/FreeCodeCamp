---
id: bd7158d8c443edefaeb5bd0f
title: 文件元数据微服务
challengeType: 4
forumTopicId: 301506
dashedName: file-metadata-microservice
---

# --description--

构建一个 JavaScript 的全栈应用，在功能上与这个应用相似：<https://file-metadata-microservice.freecodecamp.rocks/>。 可以采用下面的一种方式完成这个挑战：

-   克隆 [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-filemetadata/) 并在本地完成项目。
-   使用[我们的 Replit 初始化项目](https://replit.com/github/freeCodeCamp/boilerplate-project-filemetadata)来完成你的项目。
-   使用你选择的网站生成器来完成项目， 并确保包含了我们 GitHub 仓库的所有文件。

当完成本项目，请确认有一个正常运行的 demo 可以公开访问。 然后将 URL 提交到 `Solution Link` 中。 此外，还可以将项目的源码提交到 `GitHub Link` 中。

# --instructions--

** 提示：** 可以使用 `multer` npm 包来处理上传文件

# --hints--

提交自己的项目，而不是示例的 URL。

```js
(getUserInput) => {
  assert(
    !/.*\/file-metadata-microservice\.freecodecamp\.rocks/.test(
      getUserInput('url')
    )
  );
};
```

可以提交一个包含上传文件的表单。

```js
async (getUserInput) => {
  const site = await fetch(getUserInput('url'));
  const data = await site.text();
  const doc = new DOMParser().parseFromString(data, 'text/html');
  assert(doc.querySelector('input[type="file"]'));
};
```

表单的文件上传标签的 `name` 属性设置成 `upfile`。

```js
async (getUserInput) => {
  const site = await fetch(getUserInput('url'));
  const data = await site.text();
  const doc = new DOMParser().parseFromString(data, 'text/html');
  assert(doc.querySelector('input[name="upfile"]'));
};
```

当提交一个文件时，在 JSON 响应中收到文件的 `name`、`type` 和`size`（以 bytes（字节）为单位）。

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
