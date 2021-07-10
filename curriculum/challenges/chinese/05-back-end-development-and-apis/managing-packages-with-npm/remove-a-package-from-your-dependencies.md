---
id: 587d7fb5367417b2b2512c04
title: 从依赖项中删除依赖包
challengeType: 2
forumTopicId: 301530
dashedName: remove-a-package-from-your-dependencies
---

# --description--

已经尝试过一些通过项目 package.json 文件中依赖项管理依赖的方式了， 也添加了一些外部的依赖包到项目中，甚至通过一些特殊的字符比如波浪号或者脱字符来告诉 npm 想要的版本类型。

但是，如果想要删除不再需要的依赖包，该怎么办呢？ 可能已经猜到了——只需要从依赖项中删除相应的键值对就行了。

同样的方法也适用于删除 package.json 中的其它字段。

# --instructions--

从依赖项中删除 moment 依赖包。

**注意：**删除依赖包后，确保逗号数量正确。

# --hints--

“dependencies”字段不包含“moment”。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.notProperty(
        packJson.dependencies,
        'moment',
        '"dependencies" still includes "moment"'
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
