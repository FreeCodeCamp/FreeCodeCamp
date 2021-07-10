---
id: 587d7fb6367417b2b2512c07
title: 创建一个模型（Model）
challengeType: 2
forumTopicId: 301535
dashedName: create-a-model
---

# --description--

**C**RUD 第一小节——CREATE

首先，我们需要一个 Schema， 每一个 Schema 都对应一个 MongoDB 的 collection， 并且在相应的 collection 里定义 documents 的“样子”。 Schema 用于组成模型（Model）， 我们甚至可以通过嵌套 Schema 来创建复杂的模型。目前我们先从简。 我们可以根据模型创建实例，模型实例化后的对象称为 documents。

Replit 是一个真实的服务器，在其中，通过 handler 函数和数据库交互。 这些函数会在特定事件（比如有人调用了我们的服务器 API）发生时执行。 接下来的挑战题目即是以此为基础。 `done()` 是一个回调函数，它的作用是在一个异步操作（比如对数据库进行插入、查询、更新或删除）执行完成时，通知我们可以继续执行后续的其它代码。 这与 Node.js 中的处理方式十分类似，在 Node.js 中，我们会在（异步操作）成功时调用 `done(null, data)`，在失败时调用 `done(err)`。

注意：与远程服务器进行交互时，我们需要考虑到发生错误的可能！

```js
/* Example */

const someFunc = function(done) {
  //... do something (risky) ...
  if (error) return done(error);
  done(null, result);
};
```

# --instructions--

按下面的原型信息创建一个名为 `personSchema` 的 schema：

```markup
- Person Prototype -
--------------------
name : string [required]
age :  number
favoriteFoods : array of strings (*)
```

采用 Mongoose 基础 schema 类型。 你如果还想添加更多的键，就请使用 required 或 unique 等简单的验证器（validators），并设置默认值。 详情请参考 [Mongoose 文档](http://mongoosejs.com/docs/guide.html)。

请从 `personSchema` 创建一个名为 `Person` 的 model。

# --hints--

应当成功地通过 Mongoose schema 创建实例

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
