---
id: 587d7fb0367417b2b2512bed
title: 认识 Node 的控制台
challengeType: 2
forumTopicId: 301515
dashedName: meet-the-node-console
---

# --description--

可以采用下面的任意一种方式完成这些挑战：

- 克隆 [这个 GitHub 仓库](https://github.com/freeCodeCamp/boilerplate-express/) 并在本地完成项目。
- 使用[我们的 Repl.it 上的初始化项目](https://replit.com/github/freeCodeCamp/boilerplate-express)来完成项目。
- 使用你选择的网站生成器来完成项目， 并确保包含了我们 GitHub 仓库的所有文件。

当完成本项目，请确认有一个正常运行的 demo 可以公开访问。 然后将 URL 提交到 `Solution Link` 中。

在开发过程中，能够随时看到代码的运行结果是非常重要的。

Node 只是一个 JavaScript 环境。 与客户端 JavaScript 一样，你可以使用控制台显示有用的调试信息。 在本地计算机上，你可以在终端中输出调试信息。 在 Replit 上，右侧边栏会默认打开一个终端。

我们建议在做这些挑战题时保持终端打开的状态。 通过这些终端的输出，你可能会发现这些错误的本质原因。

# --instructions--

修改 `myApp.js` 文件，在控制台打印出 “Hello World”。

# --hints--

控制台应该输出 `"Hello World"`

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/hello-console').then(
    (data) => {
      assert.isTrue(data.passed, '"Hello World" is not in the server console');
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
