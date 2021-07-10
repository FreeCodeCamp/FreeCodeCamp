---
id: 587d7fb5367417b2b2512c03
title: 用脱字符（^）来使用依赖项的最新次要版本
challengeType: 2
forumTopicId: 301531
dashedName: use-the-caret-character-to-use-the-latest-minor-version-of-a-dependency
---

# --description--

和上一个挑战中我们学到的用波浪号来安装最新的修订版依赖一样，脱字符（`^`）也允许 npm 来安装功能更新。 它们的不同之处在于：脱字符允许次版本和修订版更新。

现在项目中的 moment 依赖包的版本应该是“~2.10.2”，这意味着 npm 可以安装最新的 2.10.x 版的 moment， 如果使用脱字符（^）来替换版本号的前缀，那么 npm 可以将 moment 升级安装到任何 2.x.x 的版本。

```json
"package": "^1.3.8"
```

这会将依赖包更新到任意的 1.x.x 版本。

# --instructions--

在依赖项中，使用脱字符（`^`）为 moment 的版本添加前缀，允许 npm 更新依赖包到任意新的次版本。

**注意：**原来的版本号不用更改。

# --hints--

“dependencies”字段中应包含“moment”

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

“moment”的版本应是“^2.x.x”

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.match(
        packJson.dependencies.moment,
        /^\^2\./,
        'Wrong version of "moment". It should be ^2.10.2'
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
