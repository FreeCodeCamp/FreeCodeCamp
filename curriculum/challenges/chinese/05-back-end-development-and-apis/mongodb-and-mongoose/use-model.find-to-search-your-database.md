---
id: 587d7fb7367417b2b2512c0b
title: 使用 model.find() 查询数据库
challengeType: 2
forumTopicId: 301543
dashedName: use-model-find-to-search-your-database
---

# --description--

我们尝试一种最简单的用法，`Model.find()` 接收一个查询 document（一个 JSON 对象）作为第一个参数，一个回调函数作为第二个参数， 它会返回由匹配到的数据组成的数组。 这个方法支持很多搜索选项， 详情请参阅文档。

# --instructions--

修改 `findPeopleByName` 函数使用 <code>Model.find() -\> [Person]</code> 查询所有给定名字的人。

请使用函数参数中的 `personName` 作为搜索条件。

# --hints--

应成功地找到所有符合条件的数据

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
