---
id: 587d7fb4367417b2b2512c00
title: 使用 npm 的外部包擴展項目
challengeType: 2
forumTopicId: 301527
dashedName: expand-your-project-with-external-packages-from-npm
---

# --description--

強大的依賴管理特性是使用包管理器的最大原因之一。 每當在新的計算機上開始一個項目時，無需手動，npm 會自動安裝所有的依賴項。 但是 npm 如何準確地知道項目需要哪些依賴呢？ 來看看 package.json 文件中 `dependencies` 這一部分。

在這部分，你的項目需要按照下面這種格式來存儲依賴包：

```json
"dependencies": {
  "package-name": "version",
  "express": "4.14.0"
}

```

# --instructions--

在 package.json 文件的 `dependencies` 字段中添加一個版本號爲“2.14.0”的“moment”包。

**注意：** Moment 是一個非常方便地用來處理時間和日期的庫。

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

“moment”的版本應該是“2.14.0”

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.match(
        packJson.dependencies.moment,
        /^[\^\~]?2\.14\.0/,
        'Wrong version of "moment" installed. It should be 2.14.0'
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
