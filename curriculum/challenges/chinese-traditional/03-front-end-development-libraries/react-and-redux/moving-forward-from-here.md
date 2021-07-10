---
id: 5a24c314108439a4d403614a
title: 從這裏前進
challengeType: 6
forumTopicId: 301434
dashedName: moving-forward-from-here
---

# --description--

恭喜！ 你完成了 React 和 Redux 的所有課程！ 結束之前，還要再提一點。 通常，我們不會在這樣的編輯器中編寫 React 應用代碼。 如果你在自己的計算機上使用 npm 和文件系統，這個挑戰可讓你一瞥 React 應用的語法之貌。 除了使用 `import` 語句（這些語句引入了各挑戰中提供的所有依賴關係），其代碼看起來類似。 “管理包（含 npm）”這一節更詳細地介紹了 npm。

最後，寫 React 和 Redux 的代碼通常需要一些配置， 且很快會變得複雜起來。 如果你有興趣在自己的電腦上嘗試，<a href="https://github.com/facebookincubator/create-react-app" target="_blank" rel="nofollow">Create React App</a> 已配置好，並準備就緒。

或者，你可以在 CodePen 中啓用 Babel 作爲 JavaScript 預處理器，將 React 和 ReactDOM 添加爲外部 JavaScript 資源，這樣編寫應用。

# --instructions--

在控制檯輸出消息 `'Now I know React and Redux!'`。

# --hints--

應該將 `Now I know React and Redux!` 這一消息應輸出到控制檯。

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
