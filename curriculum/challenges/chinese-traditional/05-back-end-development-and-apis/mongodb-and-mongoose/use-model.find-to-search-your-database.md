---
id: 587d7fb7367417b2b2512c0b
title: 使用 model.find() 查詢數據庫
challengeType: 2
forumTopicId: 301543
dashedName: use-model-find-to-search-your-database
---

# --description--

我們嘗試一種最簡單的用法，`Model.find()` 接收一個查詢 document（一個 JSON 對象）作爲第一個參數，一個回調函數作爲第二個參數， 它會返回由匹配到的數據組成的數組。 這個方法支持很多搜索選項， 詳情請參閱文檔。

# --instructions--

修改 `findPeopleByName` 函數使用 <code>Model.find() -\> [Person]</code> 查詢所有給定名字的人。

請使用函數參數中的 `personName` 作爲搜索條件。

# --hints--

應成功地找到所有符合條件的數據

```js
(getUserInput) =>
  $.post(getUserInput('url') + '/_api/find-all-by-name', {
    name: 'r@nd0mN4m3',
    age: 24,
    favoriteFoods: ['pizza']
  }).then(
    (data) => {
      assert.isArray(data, 'the response should be an Array');
      assert.equal(
        data[0].name,
        'r@nd0mN4m3',
        'item.name is not what expected'
      );
      assert.equal(data[0].__v, 0, 'The item should be not previously edited');
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
