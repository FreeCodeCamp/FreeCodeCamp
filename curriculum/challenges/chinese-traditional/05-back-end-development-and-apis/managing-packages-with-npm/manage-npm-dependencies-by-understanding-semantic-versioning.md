---
id: 587d7fb5367417b2b2512c01
title: 通過語義化版本來管理 npm 依賴關係
challengeType: 2
forumTopicId: 301529
dashedName: manage-npm-dependencies-by-understanding-semantic-versioning
---

# --description--

在 package.json 文件的依賴項中，npm 包的 `Versions` 遵循語義化版本（SemVer，Semantic Versioning），它是一種旨在使管理依賴項更加容易的軟件版本控制的行業標準。 在 npm 上發佈的庫、框架或其它工具都應該使用語義化版本，以便讓用戶清晰地知道如果項目升級將帶來哪些改變。

在使用外部依賴項（大多數情況都是這樣）進行軟件開發時，瞭解語義化版本會很有用。 這些數字保存着項目的偶然發生的破壞性改變，不會讓人對項目昨天還正常，今天卻無法運行而百思不解。 根據官網，這是語義化版本的工作方式：

```json
"package": "MAJOR.MINOR.PATCH"
```

當做了不兼容的 API 修改，應該增加主版本號（MAJOR）； 當新增了向下兼容的新功能時，應該增加次版本號（MINOR）； 當修復了向下兼容的 bug 時，應該增加修訂號（PATCH）。 這意味着修訂號是用來修復錯誤的，次版本號則是添加了新功能，但它們都沒有破壞之前的功能。 主版本號（MAJOR）是添加了不兼容早期版本的更改。

# --instructions--

在 package.json 文件的依賴項中，修改 moment 的`version`，讓它的主版本是 2，次版本號是 10，修訂號是 2。

# --hints--

“dependencies”字段應該包含“moment”

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

“moment”的版本號應該是“2.10.2”

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
