---
id: 587d7fb4367417b2b2512bff
title: 给 package.json 添加版本号
challengeType: 2
forumTopicId: 301525
dashedName: add-a-version-to-your-package-json
---

# --description--

`version` 是 package.json 文件中必填字段之一， 这个字段描述了当前项目的版本， 如：

```json
"version": "1.2.0",
```

# --instructions--

给 package.json 文件添加项目的版本号（`version`）。

# --hints--

package.json 应该包含一个有效的 “version” 键

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert(packJson.version, '"version" is missing');
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
