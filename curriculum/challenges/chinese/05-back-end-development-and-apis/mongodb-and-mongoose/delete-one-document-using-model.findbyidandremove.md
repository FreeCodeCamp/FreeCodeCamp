---
id: 587d7fb8367417b2b2512c10
title: 使用 model.findByIdAndRemove 删除一个 document
challengeType: 2
forumTopicId: 301539
dashedName: delete-one-document-using-model-findbyidandremove
---

# --description--

`findByIdAndRemove` 和 `findOneAndRemove` 类似于我们之前的更新方法， 它们将被删除的 document 传给数据库。 和之前一样，使用函数参数 `personId` 作为查询关键字。

# --instructions--

修改 `removeById` 函数，通过 `_id` 删除一个人的数据， 可以使用 `findByIdAndRemove()` 或 `findOneAndRemove()` 方法。

# --hints--

应当成功地删除一条数据

```js
(getUserInput) =>
  $.post(getUserInput('url') + '/_api/remove-one-person', {
    name: 'Jason Bourne',
    age: 36,
    favoriteFoods: ['apples']
  }).then(
    (data) => {
      assert.equal(data.name, 'Jason Bourne', 'item.name is not what expected');
      assert.equal(data.age, 36, 'item.age is not what expected');
      assert.deepEqual(
        data.favoriteFoods,
        ['apples'],
        'item.favoriteFoods is not what expected'
      );
      assert.equal(data.__v, 0);
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
