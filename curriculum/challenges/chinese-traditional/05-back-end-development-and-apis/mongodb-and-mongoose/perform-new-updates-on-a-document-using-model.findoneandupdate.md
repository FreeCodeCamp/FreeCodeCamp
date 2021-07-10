---
id: 587d7fb8367417b2b2512c0f
title: 在 document 中執行新的更新方式——使用 model.findOneAndUpdate()
challengeType: 2
forumTopicId: 301542
dashedName: perform-new-updates-on-a-document-using-model-findoneandupdate
---

# --description--

最近發佈的 mongoose 版本簡化了 document 的更新方式， 但同時，一些高級功能（如 pre/post hook, 驗證）的使用方式也變得和以前不同。因此，在很多情景下，上一個挑戰中提到的老方法其實更常用。 新方法的加入，可以讓我們使用 `findByIdAndUpdate()` 來進行基於 id 的搜索。

# --instructions--

修改 `findAndUpdate` 函數，通過 `Name` 查詢人，並將查到的人的年齡設爲 `20` 歲， 將函數參數 `personName` 作爲查詢關鍵字。

**提示：** 你需要返回更新後的 document。 你可以把 `findOneAndUpdate()` 的第三個參數設置爲 `{ new: true }` 。 默認情況下，這個方法會返回修改前的數據。

# --hints--

應成功地使用 findOneAndUpdate 更新數據

```js
(getUserInput) =>
  $.post(getUserInput('url') + '/_api/find-one-update', {
    name: 'Dorian Gray',
    age: 35,
    favoriteFoods: ['unknown']
  }).then(
    (data) => {
      assert.equal(data.name, 'Dorian Gray', 'item.name is not what expected');
      assert.equal(data.age, 20, 'item.age is not what expected');
      assert.deepEqual(
        data.favoriteFoods,
        ['unknown'],
        'item.favoriteFoods is not what expected'
      );
      assert.equal(
        data.__v,
        0,
        'findOneAndUpdate does not increment version by design!'
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
