---
id: bd7158d8c442eddfaeb5bd13
title: 构建一个随机引语生成器
challengeType: 3
forumTopicId: 301374
dashedName: build-a-random-quote-machine
---

# --description--

**目标：** 在 [CodePen.io](https://codepen.io) 上实现一个功能类似 <https://codepen.io/freeCodeCamp/full/qRZeGZ> 的 App。

在满足以下[需求](https://en.wikipedia.org/wiki/User_story)并能通过所有测试的前提下， 可以根据自己的喜好来美化 app。

可以使用 HTML、JavaScript、CSS、Bootstrap、SASS、React、Redux、jQuery 来完成这个挑战。 但鉴于这个章节的学习内容与前端框架相关，推荐使用一款前端框架（比如 React）来完成这个挑战。 不推荐使用前面没有提到的技术，否则风险自担。 我们有计划新增其他前端框架课程，例如 Angular 和 Vue，不过目前还没有这些内容。 我们会接受并尝试修复使用推荐技术栈遇到的反馈问题。 编码愉快！

**需求 1：** 应该能看到一个具有 `id="quote-box"` 属性的包裹元素。

**需求 2：** 在 `#quote-box` 元素内，应该能看到一个具有 `id="text"` 属性的元素。

**需求 3：** 在 `#quote-box` 元素内，应该能看到一个具有 `id="author"` 属性的元素。

**需求 4：** 在 `#quote-box` 元素内，应该能看到一个具有 `id="new-quote"` 属性的可点击元素。

**需求 5：** 在 `#quote-box` 元素内，应该能看到一个具有 `id="tweet-quote"` 属性的可点击 `a` 元素。

**需求 6：** 首次加载时，App 应该在具有 `id="text"` 属性的元素内展示一条随机引语。

**需求 7：** 首次加载时，App 应该在具有 `id="author"` 属性的元素内展示该条随机引语的作者。

**需求 8：** 当点击具有 `#new-quote` 属性的按钮时，App 应该得到一条新的引语并在具有 `#text` 属性的元素内展示出来。

**需求 9：** 当点击具有 `#new-quote` 属性的按钮时，App 应该得到新引语的作者并在具有 `#author` 属性的元素内展示出来。

**需求 10：** 可以通过点击具有 `#tweet-quote` 属性的 `a` 标签将当前引语发送到推特。 该 `a` 标签的 `href` 属性应该是 `"twitter.com/intent/tweet"`，以便成功发送。

**需求 11：** 具有 `#quote-box` 属性的包裹元素应该水平居中。 请在浏览器缩放尺寸为 100% 且页面窗口最大化时运行测试。

你可以<a href='https://codepen.io/pen?template=MJjpwO' target='_blank' rel='nofollow'>使用这个 CodePen 模板</a>，点击 `Save` 创建即可你自己的项目 或者可以在任何喜欢的环境中使用以下 CDN 链接来运行测试：`https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js`。

一旦完成了本项目并且该项目所有测试运行通过，请提交项目的 URL。

**注意：** Twitter 不允许在 iframe 里加载链接。 如果 tweet 不能加载，尝试在 `#tweet-quote` 元素上使用 `target="_blank"` 或者 `target="_top"` 属性。 `target="_top"` 会替换当前 tab 页的内容，所以确保当前内容已经保存了。

# --solutions--

```js
// solution required
```
