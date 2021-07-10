---
id: 587d7fb4367417b2b2512bfd
title: 给 package.json 添加关键词
challengeType: 2
forumTopicId: 301526
dashedName: add-keywords-to-your-package-json
---

# --description--

在 `keywords` 字段中可以使用相关的关键字描述项目。 例如：

```json
"keywords": [ "descriptive", "related", "words" ],
```

正如你所见的，这个字段的结构是一个由双引号字符串组成的数组。

# --instructions--

在 package.json 文件中，给 `keywords` 字段添加一个由适当的字符串组成的数组。

“freecodecamp”应该是关键词之一。

# --hints--

package.json 应该有一个有效的“keywords”键

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert(packJson.keywords, '"keywords" is missing');
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

“keywords”字段应该是一个数组

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.isArray(packJson.keywords, '"keywords" is not an array');
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

“keywords”中应该包含关键词“freecodecamp”

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.include(
        packJson.keywords,
        'freecodecamp',
        '"keywords" does not include "freecodecamp"'
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
