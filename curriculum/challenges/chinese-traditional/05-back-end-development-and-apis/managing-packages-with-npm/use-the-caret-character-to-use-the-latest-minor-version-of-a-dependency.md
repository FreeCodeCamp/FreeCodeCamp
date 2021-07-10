---
id: 587d7fb5367417b2b2512c03
title: 用脫字符（^）來使用依賴項的最新次要版本
challengeType: 2
forumTopicId: 301531
dashedName: use-the-caret-character-to-use-the-latest-minor-version-of-a-dependency
---

# --description--

和上一個挑戰中我們學到的用波浪號來安裝最新的修訂版依賴一樣，脫字符（`^`）也允許 npm 來安裝功能更新。 它們的不同之處在於：脫字符允許次版本和修訂版更新。

現在項目中的 moment 依賴包的版本應該是“~2.10.2”，這意味着 npm 可以安裝最新的 2.10.x 版的 moment， 如果使用脫字符（^）來替換版本號的前綴，那麼 npm 可以將 moment 升級安裝到任何 2.x.x 的版本。

```json
"package": "^1.3.8"
```

這會將依賴包更新到任意的 1.x.x 版本。

# --instructions--

在依賴項中，使用脫字符（`^`）爲 moment 的版本添加前綴，允許 npm 更新依賴包到任意新的次版本。

**注意：**原來的版本號不用更改。

# --hints--

“dependencies”字段中應包含“moment”

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

“moment”的版本應是“^2.x.x”

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
