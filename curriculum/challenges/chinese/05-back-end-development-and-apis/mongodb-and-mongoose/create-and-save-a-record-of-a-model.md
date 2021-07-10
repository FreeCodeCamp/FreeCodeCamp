---
id: 587d7fb6367417b2b2512c09
title: 创建并保存一条 Model 记录
challengeType: 2
forumTopicId: 301536
dashedName: create-and-save-a-record-of-a-model
---

# --description--

在这个挑战中，你需要创建并保存一条模型数据。

# --instructions--

在 `createAndSavePerson` 函数中，用我们在上一个挑战中写好的 `Person` 构造函数创建 document 实例， 将包含 `name`、`age` 和 `favoriteFoods` 的对象传给构造函数， 这些属性的数据类型必须符合我们在 `personSchema` 中定义的类型。 然后在返回的 document 实例上调用方法 `document.save()`。 同时，按 Node.js 的方式为它传一个回调函数。 这是一种常见模式，以下所有CRUD方法都将这样的回调函数作为最后一个参数。

```js
/* Example */

// ...
person.save(function(err, data) {
  //   ...do your stuff here...
});
```

# --hints--

应成功地创建数据并保存一条数据到数据库

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
