---
id: 587d7fb5367417b2b2512c01
title: 通过语义化版本来管理 npm 依赖关系
challengeType: 2
forumTopicId: 301529
dashedName: manage-npm-dependencies-by-understanding-semantic-versioning
---

# --description--

在 package.json 文件的依赖项中，npm 包的 `Versions` 遵循语义化版本（SemVer，Semantic Versioning），它是一种旨在使管理依赖项更加容易的软件版本控制的行业标准。 在 npm 上发布的库、框架或其它工具都应该使用语义化版本，以便让用户清晰地知道如果项目升级将带来哪些改变。

在使用外部依赖项（大多数情况都是这样）进行软件开发时，了解语义化版本会很有用。 这些数字保存着项目的偶然发生的破坏性改变，不会让人对项目昨天还正常，今天却无法运行而百思不解。 根据官网，这是语义化版本的工作方式：

```json
"package": "MAJOR.MINOR.PATCH"
```

当做了不兼容的 API 修改，应该增加主版本号（MAJOR）； 当新增了向下兼容的新功能时，应该增加次版本号（MINOR）； 当修复了向下兼容的 bug 时，应该增加修订号（PATCH）。 这意味着修订号是用来修复错误的，次版本号则是添加了新功能，但它们都没有破坏之前的功能。 主版本号（MAJOR）是添加了不兼容早期版本的更改。

# --instructions--

在 package.json 文件的依赖项中，修改 moment 的`version`，让它的主版本是 2，次版本号是 10，修订号是 2。

# --hints--

“dependencies”字段应该包含“moment”

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

“moment”的版本号应该是“2.10.2”

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.equal(
        packJson.dependencies.moment,
        '2.10.2',
        'Wrong version of "moment". It should be 2.10.2'
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
