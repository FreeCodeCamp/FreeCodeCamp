---
id: 587d7fb4367417b2b2512c00
title: 使用 npm 的外部包扩展项目
challengeType: 2
forumTopicId: 301527
dashedName: expand-your-project-with-external-packages-from-npm
---

# --description--

强大的依赖管理特性是使用包管理器的最大原因之一。 每当在新的计算机上开始一个项目时，无需手动，npm 会自动安装所有的依赖项。 但是 npm 如何准确地知道项目需要哪些依赖呢？ 来看看 package.json 文件中 `dependencies` 这一部分。

在这部分，你的项目需要按照下面这种格式来存储依赖包：

```json
"dependencies": {
  "package-name": "version",
  "express": "4.14.0"
}

```

# --instructions--

在 package.json 文件的 `dependencies` 字段中添加一个版本号为“2.14.0”的“moment”包。

**注意：** Moment 是一个非常方便地用来处理时间和日期的库。

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

“moment”的版本应该是“2.14.0”

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
