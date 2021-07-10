---
id: 587d7fb8367417b2b2512c0f
title: 在 document 中执行新的更新方式——使用 model.findOneAndUpdate()
challengeType: 2
forumTopicId: 301542
dashedName: perform-new-updates-on-a-document-using-model-findoneandupdate
---

# --description--

最近发布的 mongoose 版本简化了 document 的更新方式， 但同时，一些高级功能（如 pre/post hook, 验证）的使用方式也变得和以前不同。因此，在很多情景下，上一个挑战中提到的老方法其实更常用。 新方法的加入，可以让我们使用 `findByIdAndUpdate()` 来进行基于 id 的搜索。

# --instructions--

修改 `findAndUpdate` 函数，通过 `Name` 查询人，并将查到的人的年龄设为 `20` 岁， 将函数参数 `personName` 作为查询关键字。

**提示：** 你需要返回更新后的 document。 你可以把 `findOneAndUpdate()` 的第三个参数设置为 `{ new: true }` 。 默认情况下，这个方法会返回修改前的数据。

# --hints--

应成功地使用 findOneAndUpdate 更新数据

```js
(getUserInput) =>
  $.post(getUserInput('url') + '/_api/find-one-update', {
    name: 'Dorian Gray',
    age: 35,
    favoriteFoods: ['unknown']
  }).then(
    (data) => {
      assert.equal(data.name, 'Dorian Gray', 'item.name is not what expected');
      assert.equal(data.age, 20, 'item.age is not what expected');
      assert.deepEqual(
        data.favoriteFoods,
        ['unknown'],
        'item.favoriteFoods is not what expected'
      );
      assert.equal(
        data.__v,
        0,
        'findOneAndUpdate does not increment version by design!'
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
