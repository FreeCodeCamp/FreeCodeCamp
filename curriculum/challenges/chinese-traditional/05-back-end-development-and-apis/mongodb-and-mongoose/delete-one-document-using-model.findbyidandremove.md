---
id: 587d7fb8367417b2b2512c10
title: 使用 model.findByIdAndRemove 刪除一個 document
challengeType: 2
forumTopicId: 301539
dashedName: delete-one-document-using-model-findbyidandremove
---

# --description--

`findByIdAndRemove` 和 `findOneAndRemove` 類似於我們之前的更新方法， 它們將被刪除的 document 傳給數據庫。 和之前一樣，使用函數參數 `personId` 作爲查詢關鍵字。

# --instructions--

修改 `removeById` 函數，通過 `_id` 刪除一個人的數據， 可以使用 `findByIdAndRemove()` 或 `findOneAndRemove()` 方法。

# --hints--

應當成功地刪除一條數據

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
