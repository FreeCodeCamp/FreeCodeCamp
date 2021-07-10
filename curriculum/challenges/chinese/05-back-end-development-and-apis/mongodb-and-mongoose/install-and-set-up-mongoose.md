---
id: 587d7fb6367417b2b2512c06
title: 安装和设置 Mongoose
challengeType: 2
forumTopicId: 301540
dashedName: install-and-set-up-mongoose
---

# --description--

可以采用下面的任意一种方式完成这些挑战：

- 克隆 [GitHub repo](https://github.com/freeCodeCamp/boilerplate-mongomongoose/) 并在本地完成项目。
- 使用[我们的 Replit 上的初始化项目](https://replit.com/github/freeCodeCamp/boilerplate-mongomongoose)来完成项目。
- 使用你选择的网站生成器来完成项目， 并确保包含了我们 GitHub 仓库的所有文件。

当完成本项目，请确认有一个正常运行的 demo 可以公开访问。 然后将 URL 提交到 `Solution Link` 中。

在这个挑战中，你将建立一个 MongoDB Atlas 数据库并导入连接到它所需的软件包。

按照<a href='https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/' rel='noopener noreferrer' target='_blank'>这篇教程</a>在 MongoDB Atlas 创建一个托管数据库。

# --instructions--

将 `mongodb` 和 `mongoose` 添加到项目的 `package.json` 文件中。 然后，在 `myApp.js` 文件中请求 `mongoose`。 创建一个 `.env` 文件，给它添加一个 `MONGO_URI` 变量。 变量的值为你的 MongoDB Atlas 数据库 URI。 应用单引号或双引号包裹 URI。请记住，环境变量 `=` 两边不能有空格。 例如，`MONGO_URI='VALUE'`。 完成后，使用下面的代码来连接数据库。

```js
mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true });
```

# --hints--

“mongodb” 应在 package.json 中作为依赖项定义。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/file/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.property(packJson.dependencies, 'mongodb');
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

“mongoose” 应在 package.json 中作为依赖项定义。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/file/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.property(packJson.dependencies, 'mongoose');
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

应使用 “mongoose” 连接数据库。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/is-mongoose-ok').then(
    (data) => {
      assert.isTrue(data.isMongooseOk, 'mongoose is not connected');
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
