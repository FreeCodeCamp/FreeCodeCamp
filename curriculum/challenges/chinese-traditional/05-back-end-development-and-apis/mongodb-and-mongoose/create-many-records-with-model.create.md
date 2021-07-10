---
id: 587d7fb7367417b2b2512c0a
title: 使用 model.create() 創建多條記錄
challengeType: 2
forumTopicId: 301537
dashedName: create-many-records-with-model-create
---

# --description--

在一些情況下，比如進行數據庫初始化，你會需要創建很多 model 實例來用作初始數據。 `Model.create()` 接受一組像 `[{name: 'John', ...}, {...}, ...]` 的數組作爲第一個參數，並將其保存到數據庫。

# --instructions--

修改 `createManyPeople` 方法，使用 `arrayOfPeople` 作爲 `Model.create()` 的參數來創建多個 people 實例。

**注意：** 你可以使用在上一個挑戰中創建的 model 來完成當前挑戰。

# --hints--

應當成功地一次性創建多條數據

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
