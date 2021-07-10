---
id: 587d7fb6367417b2b2512c09
title: 創建並保存一條 Model 記錄
challengeType: 2
forumTopicId: 301536
dashedName: create-and-save-a-record-of-a-model
---

# --description--

在這個挑戰中，你需要創建並保存一條模型數據。

# --instructions--

在 `createAndSavePerson` 函數中，用我們在上一個挑戰中寫好的 `Person` 構造函數創建 document 實例， 將包含 `name`、`age` 和 `favoriteFoods` 的對象傳給構造函數， 這些屬性的數據類型必須符合我們在 `personSchema` 中定義的類型。 然後在返回的 document 實例上調用方法 `document.save()`。 同時，按 Node.js 的方式爲它傳一個回調函數。 這是一種常見模式，以下所有CRUD方法都將這樣的回調函數作爲最後一個參數。

```js
/* Example */

// ...
person.save(function(err, data) {
  //   ...do your stuff here...
});
```

# --hints--

應成功地創建數據並保存一條數據到數據庫

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/create-and-save-person').then(
    (data) => {
      assert.isString(data.name, '"item.name" should be a String');
      assert.isNumber(data.age, '28', '"item.age" should be a Number');
      assert.isArray(
        data.favoriteFoods,
        '"item.favoriteFoods" should be an Array'
      );
      assert.equal(data.__v, 0, 'The db item should be not previously edited');
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
