---
id: 587d7fb5367417b2b2512c02
title: 用波浪号维持依赖项的最新修订号
challengeType: 2
forumTopicId: 301532
dashedName: use-the-tilde-character-to-always-use-the-latest-patch-version-of-a-dependency
---

# --description--

在上一个挑战中，npm 只包含特定版本的依赖包。 如果想让项目各个部分保持相互兼容，锁定依赖包版本是一个行之有效的办法。 但是大多数情况下，我们并不希望错过依赖项的问题修复，因为它们通常包含重要的安全补丁，而且它们理论上也会兼容我们既有的代码。

可以在依赖项的版本号前加一个波浪号（`~`），以让 npm 依赖项更新到最新的修订版。 这里有一个允许升级到任何 1.3.x 的例子：

```json
"package": "~1.3.8"
```

# --instructions--

在 package.json 文件中，当前规则是 npm 将 moment 升级到特定版本（2.10.2）。 但是现在，要允许使用最新的 2.10.x 版本。

在依赖项中，给 moment 的版本号添加波浪号（`~`）前缀，允许 npm 将其更新为最新的修订版。

**注意：**原来的版本号不用更改。

# --hints--

“dependencies”应该包含“moment”

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

“moment”的版本号应该是“~2.10.2”

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
