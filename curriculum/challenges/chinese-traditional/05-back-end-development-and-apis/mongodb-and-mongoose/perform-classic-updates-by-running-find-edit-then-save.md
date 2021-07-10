---
id: 587d7fb8367417b2b2512c0e
title: '通過執行查詢、編輯、保存來執行經典更新流程'
challengeType: 2
forumTopicId: 301541
dashedName: perform-classic-updates-by-running-find-edit-then-save
---

# --description--

在過去，如果想要編輯 document 並以某種方式使用它（比如放到服務器的返回數據中），就必須執行查找、編輯和保存。 Mongoose 有一個專用的更新方法 `Model.update()`， 它與底層的 mongo 驅動綁定。 通過這個方法，我們可以批量編輯符合特定條件的多個 document。但問題在於，這個方法不會返回更新後的 document，而是返回狀態信息。 此外，它直接調用 mongo 的底層驅動，讓處理 model 的驗證變得更加棘手。

# --instructions--

在這個挑戰中，請使用參數 `personId` 作爲字段，修改 `findEditThenSave` 方法，以在數據庫中通過 `_id` 找到相應的 person（你可以使用之前挑戰中的任何一種方法）。 將 `"hamburger"` 添加到它的 `favoriteFoods` 清單中（你可以使用 `Array.push()`）。 然後，在查詢數據庫的方法的回調裏通過 `save()` 方法更新 `Person` 的數據。

**提示：** 如果你在 Schema 中將 `favoriteFoods` 聲明爲一個 Array（數組）並且沒有指定數組的類型(如 `[String]`)， 那麼此時，`favoriteFoods` 就會是默認的 Mixed 類型。如果想編輯它，就必須執行 `document.markModified('edited-field')`。 詳情請參閱 [Mongoose 文檔](https://mongoosejs.com/docs/schematypes.html#Mixed)

# --hints--

應成功地對一條數據進行查找、編輯和更新

```js
(getUserInput) =>
  $.post(getUserInput('url') + '/_api/find-edit-save', {
    name: 'Poldo',
    age: 40,
    favoriteFoods: ['spaghetti']
  }).then(
    (data) => {
      assert.equal(data.name, 'Poldo', 'item.name is not what is expected');
      assert.equal(data.age, 40, 'item.age is not what expected');
      assert.deepEqual(
        data.favoriteFoods,
        ['spaghetti', 'hamburger'],
        'item.favoriteFoods is not what expected'
      );
      assert.equal(data.__v, 1, 'The item should be previously edited');
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
