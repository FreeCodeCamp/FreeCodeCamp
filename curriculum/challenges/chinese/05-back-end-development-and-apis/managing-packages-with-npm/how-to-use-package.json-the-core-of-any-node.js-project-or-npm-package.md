---
id: 587d7fb3367417b2b2512bfb
title: '如何使用 package.json ——所有 Node.js 项目或 npm 包的核心'
challengeType: 2
forumTopicId: 301528
dashedName: how-to-use-package-json-the-core-of-any-node-js-project-or-npm-package
---

# --description--

可以采用下面的任意一种方式完成这些挑战：

- 克隆 [GitHub repo](https://github.com/freeCodeCamp/boilerplate-npm/) 并在本地完成项目。
- 使用[我们的 Replit 上的初始化项目](https://replit.com/github/freeCodeCamp/boilerplate-npm)来完成项目。
- 使用你选择的网站生成器来完成项目， 并确保包含了我们 GitHub 仓库的所有文件。

当完成本项目，请确认有一个正常运行的 demo 可以公开访问。 然后将 URL 提交到 `Solution Link` 中。 此外，还可以将项目的源码提交到 `GitHub Link` 中。

`package.json` 文件是所有 Node.js 项目和 npm 包的枢纽， 和 HTML 文档中的 &lt;head> 区域用来描述网页的配置信息（元数据）一样，它存储项目的相关信息。 它由单个 JSON 对象组成，并以键值对的形式存储项目信息， 且至少包含两个必填字段：“name”和“version”——但是最好提供有关项目的其他信息，这将对用户或者维护者有所帮助。

如果能找到项目的文件树，那么可以在文件树的最外层找到 package.json， 在接下来的几个挑战中将完善这个文件。

在这个文件中最常见的信息之一是 `author` 字段， 它说明了项目的创建者，它可以是字符串，也可以是带有联系人详细信息的对象。 对于较大的项目，建议使用对象；但是在我们的项目中，一个简单的字符串就够了，比如下面的例子：

```json
"author": "Jane Doe",
```

# --instructions--

在项目的 package.json 文件的 `author` 键中添加你的名字。

**注意：** 正在修改的是一个 JSON，所有的字段名必须用双引号（"）包裹，也必须用逗号（,）分割。

# --hints--

package.json 应该有一个有效的“author”键

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert(packJson.author, '"author" is missing');
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
