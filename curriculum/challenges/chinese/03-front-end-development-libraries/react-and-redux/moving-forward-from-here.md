---
id: 5a24c314108439a4d403614a
title: 从这里前进
challengeType: 6
forumTopicId: 301434
dashedName: moving-forward-from-here
---

# --description--

恭喜！ 你完成了 React 和 Redux 的所有课程！ 结束之前，还要再提一点。 通常，我们不会在这样的编辑器中编写 React 应用代码。 如果你在自己的计算机上使用 npm 和文件系统，这个挑战可让你一瞥 React 应用的语法之貌。 除了使用 `import` 语句（这些语句引入了各挑战中提供的所有依赖关系），其代码看起来类似。 “管理包（含 npm）”这一节更详细地介绍了 npm。

最后，写 React 和 Redux 的代码通常需要一些配置， 且很快会变得复杂起来。 如果你有兴趣在自己的电脑上尝试，<a href="https://github.com/facebookincubator/create-react-app" target="_blank" rel="nofollow">Create React App</a> 已配置好，并准备就绪。

或者，你可以在 CodePen 中启用 Babel 作为 JavaScript 预处理器，将 React 和 ReactDOM 添加为外部 JavaScript 资源，这样编写应用。

# --instructions--

在控制台输出消息 `'Now I know React and Redux!'`。

# --hints--

应该将 `Now I know React and Redux!` 这一消息应输出到控制台。

```js
(getUserInput) =>
  assert(
    /console\s*\.\s*log\s*\(\s*('|"|`)Now I know React and Redux!\1\s*\)/.test(
      getUserInput('index')
    )
  );
```

# --seed--

## --seed-contents--

```jsx
/*
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers'
import App from './components/App'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
*/

// Only change code below this line
```

# --solutions--

```jsx
console.log('Now I know React and Redux!');
```
