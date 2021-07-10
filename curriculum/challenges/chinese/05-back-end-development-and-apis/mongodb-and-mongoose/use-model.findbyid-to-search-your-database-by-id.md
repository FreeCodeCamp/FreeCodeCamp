---
id: 587d7fb7367417b2b2512c0d
title: 使用 model.findById() 方法，根据 _id 来搜索数据
challengeType: 2
forumTopicId: 301544
dashedName: use-model-findbyid-to-search-your-database-by-id
---

# --description--

在保存 document 的时候，MongoDB 会自动为它添加 `_id` 字段，并给该字段设置一个唯一的仅包含数字和字母的值。 通过 `_id` 搜索是一个十分常见的操作，为此，Mongoose 提供了一个专门的方法。

# --instructions--

修改 `findPersonById`，用 `Model.findById() -> Person` 来查询唯一一个给定 `_id` 的人， 把函数参数 `personId` 作为查询键。

# --hints--

应成功地根据 Id 找到对应的数据

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/find-by-id').then(
    (data) => {
      assert.equal(data.name, 'test', 'item.name is not what expected');
      assert.equal(data.age, 0, 'item.age is not what expected');
      assert.deepEqual(
        data.favoriteFoods,
        ['none'],
        'item.favoriteFoods is not what expected'
      );
      assert.equal(data.__v, 0, 'The item should be not previously edited');
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
