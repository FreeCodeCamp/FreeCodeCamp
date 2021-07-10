---
id: bd7158d8c442eddfaeb5bd0f
title: 构建一个番茄时钟
challengeType: 3
forumTopicId: 301373
dashedName: build-a-25--5-clock
---

# --description--

**目标：** 在 [CodePen.io](https://codepen.io) 上实现一个功能类似 <https://codepen.io/freeCodeCamp/full/XpKrrW> 的 App。

在满足以下[需求](https://en.wikipedia.org/wiki/User_story)并能通过所有测试的前提下， 可以根据自己的喜好来美化 app。

可以使用 HTML、JavaScript、CSS、Bootstrap、SASS、React、Redux、jQuery 来完成这个挑战。 但鉴于这个章节的学习内容与前端框架相关，推荐使用一款前端框架（比如 React）来完成这个挑战。 不推荐使用前面没有提到的技术，否则风险自负。 我们有计划新增其他前端框架课程，例如 Angular 和 Vue，不过目前还没有这些内容。 如果使用建议的技术栈完成这个项目，我们会接受并尝试修复相关的问题反馈。 编码愉快！

**需求 1：** 应该能看到一个具有`id="break-label"`属性的元素，这个元素的内容应该是一个字符串（例如："Break Length"）。

**需求 2：** 应该能看到一个具有`id="session-label"`属性的元素，这个元素的内容应该是一个字符串（例如："Session Length"）。

**需求 3：** 应该能看到两个可以点击的元素，他们分别具有如下 id：`id="break-decrement"` 和 `id="session-decrement"`。

**需求 4：** 应该能看到两个可以点击的元素，它们分别具有如下 id：`id="break-increment"` 和 `id="session-increment"`。

**需求 5：** 应该能看到一个具有 `id="break-length"` 属性的元素，这个元素默认展示数值应该为 5（加载后）。

**需求 6：** 应该能看到一个具有 `id="session-length"` 属性的元素，这个元素默认展示数值应该为 25（加载后）。

**需求 7：** 应该能看到一个具有 `id="timer-label"` 属性的元素，这个元素包含一个表示当前状态的字符串（例如："Session"）。

**需求 8：** 应该能看到一个具有 `id="time-left"` 属性的元素。 注意：暂停或者运行时，该元素的内容应始终以 `mm:ss` 格式显示（如 25:00）。

**需求 9：** 应该能看到一个具有 `id="start_stop"` 属性的可点击的元素。

**需求 10：** 应该能看到一个具有 `id="reset"` 属性的可点击的元素。

**需求 11：** 当点击 id 属性为 `reset` 的元素时，运行中的计时器都应该停止，`id="break-length"` 元素中的值应该重新回到 `5`，`id="session-length"` 元素中的值应该重新回到 25，且 `id="time-left"` 元素应该重置为默认状态。

**需求 12：** 当点击 id 属性为 `break-decrement` 的元素时，`id="break-length"` 元素的值应该减去 1，且我应该能看到更新后的值。

**需求 13：** 当点击 id 属性为 `break-increment` 的元素时，`id="break-length"` 元素的值应该增加 1，且应该能看到更新后的值。

**需求 14：** 当点击 id 属性为 `session-decrement` 的元素时，`id="session-length"` 元素的值应该减去 1，且应该能看到更新后的值。

**需求 15：** 当点击 id 属性为 `session-increment` 的元素时，`id="session-length"` 元素的值应该增加 1，且应该能看到更新后的值。

**需求 16：** 工作或者休息长度不应该可以设置为 &lt;= 0 的值。

**需求 17：** 工作或者休息长度比应该可以设置为 > 60 的值。

**需求 18：** 当首次点击具有 `id="start_stop"` 属性的元素时，计时器应该根据 `id="session-length"` 元素当前显示的值开始运行，即使该值已从原始值 25 递增过或递减过。

**需求 19：** 如果计时器正在运行，id 属性为 `time-left` 的元素应该以 `mm:ss` 的格式展示剩余的时间（按1递减并且每秒更新一次显示的值）。

**需求 20：** 如果计时器正在运行，当点击 `id="start_stop"` 元素时，倒计时应该暂停。

**需求 21：** 如果计时器已经暂停，当点击 `id="start_stop"` 元素时，倒计时应该从暂停的时间点恢复运行。

**需求 22：** 当一个工作倒计时结束（注意：计时器必须达到 00:00），并且新的倒计时开始运行时，id 属性为 `timer-label` 的元素应该显示一个表示已经开始休息的字符串。

**需求 23：** 当一个工作倒计时结束（注意：计时器必须达到 00:00），应该开始一个新的休息倒计时，时间应该从 `id="break-length"` 元素中当前显示的值开始计算。

**需求 24：** 当一个休息倒计时结束（注意：计时器必须达到 00:00），并且新的倒计时开始运行时，id 属性为 `timer-label` 的元素应该显示一个表示已经开始工作的字符串。

**需求 25：** 当一个休息倒计时结束（注意：计时器必须达到 00:00），应该开始一个新的工作倒计时，时间应该从 `id="session-length"` 元素中当前显示的值开始计算。

**需求 26：** 当一个倒计时结束（注意：计时器必须达到 00:00），应该播放一个表示时间到了的声音提示。 这个提示音应该使用 HTML5 的 `audio`标签并有一个 `id="beep"` 属性。

**需求 27：** 具有`id="beep"`属性的音频元素时长应该至少有一秒。

**需求 28：** 当点击 id 属性为 `reset` 的元素时，id 属性为 `beep` 的音频元素必须停止播放并回到开头。

你可以<a href='https://codepen.io/pen?template=MJjpwO' target='_blank' rel='nofollow'>使用这个 CodePen 模板</a>，点击 `Save` 即可创建你自己的项目。 或者你可以在任何你喜欢的环境中使用以下 CDN 链接来运行测试：`https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js`。

当你完成了本项目，并且该项目所有测试运行通过， 请提交项目的 URL。

# --solutions--

```js
// solution required
```
