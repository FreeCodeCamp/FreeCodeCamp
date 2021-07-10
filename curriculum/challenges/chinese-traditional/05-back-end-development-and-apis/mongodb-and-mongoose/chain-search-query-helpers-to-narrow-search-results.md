---
id: 587d7fb9367417b2b2512c12
title: 通過鏈式調用輔助查詢函數來縮小搜索結果
challengeType: 2
forumTopicId: 301533
dashedName: chain-search-query-helpers-to-narrow-search-results
---

# --description--

如果不給 `Model.find()`（或者別的搜索方法）的最後一個參數傳入回調函數, 查詢將不會執行。 可以將查詢條件存儲在變量中供以後使用， 也可以通過鏈式調用這類變量來構建新的查詢字段。 實際的數據庫操作會在最後調用 `.exec()` 方法時執行。 必須把回調函數傳給最後一個方法。 Mongoose 提供了許多輔助查詢函數, 這裏使用最常見的一種。

# --instructions--

修改 `queryChain` 函數來查詢喜歡 `foodToSearch` 食物的人。 同時，需要將查詢結果按 `name` 屬性排序， 查詢結果應限制在兩個 document 內，並隱藏 age 屬性。 請鏈式調用 `.find()`、`.sort()`、`.limit()` 和 `.select()`，並在最後調用 `.exec()`， 並將 `done(err, data)` 回調函數傳入 `exec()`。

# --hints--

應該成功地鏈式調用輔助查詢函數。

```js
(getUserInput) =>
  $.ajax({
    url: getUserInput('url') + '/_api/query-tools',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify([
      { name: 'Pablo', age: 26, favoriteFoods: ['burrito', 'hot-dog'] },
      { name: 'Bob', age: 23, favoriteFoods: ['pizza', 'nachos'] },
      { name: 'Ashley', age: 32, favoriteFoods: ['steak', 'burrito'] },
      { name: 'Mario', age: 51, favoriteFoods: ['burrito', 'prosciutto'] }
    ])
  }).then(
    (data) => {
      assert.isArray(data, 'the response should be an Array');
      assert.equal(
        data.length,
        2,
        'the data array length is not what expected'
      );
      assert.notProperty(
        data[0],
        'age',
        'The returned first item has too many properties'
      );
      assert.equal(
        data[0].name,
        'Ashley',
        'The returned first item name is not what expected'
      );
      assert.notProperty(
        data[1],
        'age',
        'The returned second item has too many properties'
      );
      assert.equal(
        data[1].name,
        'Mario',
        'The returned second item name is not what expected'
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
