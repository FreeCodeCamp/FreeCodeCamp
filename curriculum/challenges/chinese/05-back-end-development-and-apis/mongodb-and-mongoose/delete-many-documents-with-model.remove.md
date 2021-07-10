---
id: 587d7fb8367417b2b2512c11
title: 使用 model.remove() 删除多个 document
challengeType: 2
forumTopicId: 301538
dashedName: delete-many-documents-with-model-remove
---

# --description--

`Model.remove()` 可以用于删除符合给定匹配条件的所有 document。

# --instructions--

修改 `removeManyPeople` 函数，使用 `nameToRemove` 删除所有姓名是变量 `Model.remove()` 的人。 给它传入一个带有 `name` 字段的查询 document 和一个回调函数。

**注意：** `Model.remove()` 不会返回被删除的 document，而是会返回一个包含操作结果以及受影响的数据数量的 JSON 对象。 不要忘记将它传入 `done()` 回调函数，因为我们需要在挑战的测试中调用它。

# --hints--

应一次性成功删除多条数据

```js
(getUserInput) =>
  $.ajax({
    url: getUserInput('url') + '/_api/remove-many-people',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify([
      { name: 'Mary', age: 16, favoriteFoods: ['lollipop'] },
      { name: 'Mary', age: 21, favoriteFoods: ['steak'] }
    ])
  }).then(
    (data) => {
      assert.isTrue(!!data.ok, 'The mongo stats are not what expected');
      assert.equal(
        data.n,
        2,
        'The number of items affected is not what expected'
      );
      assert.equal(data.count, 0, 'the db items count is not what expected');
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
