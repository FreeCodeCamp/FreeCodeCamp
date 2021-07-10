---
id: 587d7fb4367417b2b2512bff
title: 給 package.json 添加版本號
challengeType: 2
forumTopicId: 301525
dashedName: add-a-version-to-your-package-json
---

# --description--

`version` 是 package.json 文件中必填字段之一， 這個字段描述了當前項目的版本， 如：

```json
"version": "1.2.0",
```

# --instructions--

給 package.json 文件添加項目的版本號（`version`）。

# --hints--

package.json 應該包含一個有效的 “version” 鍵

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
