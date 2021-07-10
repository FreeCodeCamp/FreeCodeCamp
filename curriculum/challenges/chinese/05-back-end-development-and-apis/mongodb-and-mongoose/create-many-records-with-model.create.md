---
id: 587d7fb7367417b2b2512c0a
title: 使用 model.create() 创建多条记录
challengeType: 2
forumTopicId: 301537
dashedName: create-many-records-with-model-create
---

# --description--

在一些情况下，比如进行数据库初始化，你会需要创建很多 model 实例来用作初始数据。 `Model.create()` 接受一组像 `[{name: 'John', ...}, {...}, ...]` 的数组作为第一个参数，并将其保存到数据库。

# --instructions--

修改 `createManyPeople` 方法，使用 `arrayOfPeople` 作为 `Model.create()` 的参数来创建多个 people 实例。

**注意：** 你可以使用在上一个挑战中创建的 model 来完成当前挑战。

# --hints--

应当成功地一次性创建多条数据

```js
(getUserInput) =>
  $.ajax({
    url: getUserInput('url') + '/_api/create-many-people',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify([
      { name: 'John', age: 24, favoriteFoods: ['pizza', 'salad'] },
      { name: 'Mary', age: 21, favoriteFoods: ['onions', 'chicken'] }
    ])
  }).then(
    (data) => {
      assert.isArray(data, 'the response should be an array');
      assert.equal(
        data.length,
        2,
        'the response does not contain the expected number of items'
      );
      assert.equal(data[0].name, 'John', 'The first item is not correct');
      assert.equal(
        data[0].__v,
        0,
        'The first item should be not previously edited'
      );
      assert.equal(data[1].name, 'Mary', 'The second item is not correct');
      assert.equal(
        data[1].__v,
        0,
        'The second item should be not previously edited'
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
