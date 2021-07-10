---
id: 587d7fb4367417b2b2512bfd
title: 給 package.json 添加關鍵詞
challengeType: 2
forumTopicId: 301526
dashedName: add-keywords-to-your-package-json
---

# --description--

在 `keywords` 字段中可以使用相關的關鍵字描述項目。 例如：

```json
"keywords": [ "descriptive", "related", "words" ],
```

正如你所見的，這個字段的結構是一個由雙引號字符串組成的數組。

# --instructions--

在 package.json 文件中，給 `keywords` 字段添加一個由適當的字符串組成的數組。

“freecodecamp”應該是關鍵詞之一。

# --hints--

package.json 應該有一個有效的“keywords”鍵

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

“keywords”字段應該是一個數組

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

“keywords”中應該包含關鍵詞“freecodecamp”

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
