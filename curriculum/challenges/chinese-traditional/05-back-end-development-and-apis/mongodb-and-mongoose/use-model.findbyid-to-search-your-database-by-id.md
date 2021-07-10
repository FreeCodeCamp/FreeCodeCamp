---
id: 587d7fb7367417b2b2512c0d
title: 使用 model.findById() 方法，根據 _id 來搜索數據
challengeType: 2
forumTopicId: 301544
dashedName: use-model-findbyid-to-search-your-database-by-id
---

# --description--

在保存 document 的時候，MongoDB 會自動爲它添加 `_id` 字段，並給該字段設置一個唯一的僅包含數字和字母的值。 通過 `_id` 搜索是一個十分常見的操作，爲此，Mongoose 提供了一個專門的方法。

# --instructions--

修改 `findPersonById`，用 `Model.findById() -> Person` 來查詢唯一一個給定 `_id` 的人， 把函數參數 `personId` 作爲查詢鍵。

# --hints--

應成功地根據 Id 找到對應的數據

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
