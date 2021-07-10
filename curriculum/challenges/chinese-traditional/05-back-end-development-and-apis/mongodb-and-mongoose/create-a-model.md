---
id: 587d7fb6367417b2b2512c07
title: 創建一個模型（Model）
challengeType: 2
forumTopicId: 301535
dashedName: create-a-model
---

# --description--

**C**RUD 第一小節——CREATE

首先，我們需要一個 Schema， 每一個 Schema 都對應一個 MongoDB 的 collection， 並且在相應的 collection 裏定義 documents 的“樣子”。 Schema 用於組成模型（Model）， 我們甚至可以通過嵌套 Schema 來創建複雜的模型。目前我們先從簡。 我們可以根據模型創建實例，模型實例化後的對象稱爲 documents。

Replit 是一個真實的服務器，在其中，通過 handler 函數和數據庫交互。 這些函數會在特定事件（比如有人調用了我們的服務器 API）發生時執行。 接下來的挑戰題目即是以此爲基礎。 `done()` 是一個回調函數，它的作用是在一個異步操作（比如對數據庫進行插入、查詢、更新或刪除）執行完成時，通知我們可以繼續執行後續的其它代碼。 這與 Node.js 中的處理方式十分類似，在 Node.js 中，我們會在（異步操作）成功時調用 `done(null, data)`，在失敗時調用 `done(err)`。

注意：與遠程服務器進行交互時，我們需要考慮到發生錯誤的可能！

```js
/* Example */

const someFunc = function(done) {
  //... do something (risky) ...
  if (error) return done(error);
  done(null, result);
};
```

# --instructions--

按下面的原型信息創建一個名爲 `personSchema` 的 schema：

```markup
- Person Prototype -
--------------------
name : string [required]
age :  number
favoriteFoods : array of strings (*)
```

採用 Mongoose 基礎 schema 類型。 你如果還想添加更多的鍵，就請使用 required 或 unique 等簡單的驗證器（validators），並設置默認值。 詳情請參考 [Mongoose 文檔](http://mongoosejs.com/docs/guide.html)。

請從 `personSchema` 創建一個名爲 `Person` 的 model。

# --hints--

應當成功地通過 Mongoose schema 創建實例

```js
(getUserInput) =>
  $.post(getUserInput('url') + '/_api/mongoose-model', {
    name: 'Mike',
    age: 28,
    favoriteFoods: ['pizza', 'cheese']
  }).then(
    (data) => {
      assert.equal(data.name, 'Mike', '"model.name" is not what expected');
      assert.equal(data.age, '28', '"model.age" is not what expected');
      assert.isArray(
        data.favoriteFoods,
        '"model.favoriteFoods" is not an Array'
      );
      assert.include(
        data.favoriteFoods,
        'pizza',
        '"model.favoriteFoods" does not include the expected items'
      );
      assert.include(
        data.favoriteFoods,
        'cheese',
        '"model.favoriteFoods" does not include the expected items'
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
