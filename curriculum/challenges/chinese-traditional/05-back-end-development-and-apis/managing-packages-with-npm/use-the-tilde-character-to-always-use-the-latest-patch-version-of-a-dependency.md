---
id: 587d7fb5367417b2b2512c02
title: 用波浪號維持依賴項的最新修訂號
challengeType: 2
forumTopicId: 301532
dashedName: use-the-tilde-character-to-always-use-the-latest-patch-version-of-a-dependency
---

# --description--

在上一個挑戰中，npm 只包含特定版本的依賴包。 如果想讓項目各個部分保持相互兼容，鎖定依賴包版本是一個行之有效的辦法。 但是大多數情況下，我們並不希望錯過依賴項的問題修復，因爲它們通常包含重要的安全補丁，而且它們理論上也會兼容我們既有的代碼。

可以在依賴項的版本號前加一個波浪號（`~`），以讓 npm 依賴項更新到最新的修訂版。 這裏有一個允許升級到任何 1.3.x 的例子：

```json
"package": "~1.3.8"
```

# --instructions--

在 package.json 文件中，當前規則是 npm 將 moment 升級到特定版本（2.10.2）。 但是現在，要允許使用最新的 2.10.x 版本。

在依賴項中，給 moment 的版本號添加波浪號（`~`）前綴，允許 npm 將其更新爲最新的修訂版。

**注意：**原來的版本號不用更改。

# --hints--

“dependencies”應該包含“moment”

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.property(
        packJson.dependencies,
        'moment',
        '"dependencies" does not include "moment"'
      );
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

“moment”的版本號應該是“~2.10.2”

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.match(
        packJson.dependencies.moment,
        /^\~2\.10\.2/,
        'Wrong version of "moment". It should be ~2.10.2'
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
