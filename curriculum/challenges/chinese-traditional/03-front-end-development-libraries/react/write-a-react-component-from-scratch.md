---
id: 5a24c314108439a4d4036168
title: 從零開始寫一個 React 組件
challengeType: 6
forumTopicId: 301424
dashedName: write-a-react-component-from-scratch
---

# --description--

你已經瞭解了 JSX 和 React 組件的基礎知識，是時候自己編寫一個組件了。 React 組件是 React 應用程序的核心組成部分，因此熟練編寫它們是非常重要的。 記住，典型的 React 組件是 ES6 `class`，它擴展了 `React.Component`。 它有一個返回 HTML（從 JSX 返回）或 `null` 的渲染方法， 這是 React 組件的基本形式。 理解了這一點之後，就可以開始構建更復雜的 React 項目了。

# --instructions--

定義一個 `MyComponent` 類，它是 `React.Component` 的擴展。 它的渲染方法應該返回一個 `div`，其中包含一個 `h1` 標籤，標籤文本爲：`My First React Component!`。 準確使用此文本，大小寫和標點符號也要考慮。 確保也調用組件的構造器。

使用 `ReactDOM.render()` 把該組件渲染到 DOM 中。 有一個 `id='challenge-node'` 的 `div` 可供渲染。

# --hints--

應該有一個名爲 `MyComponent` 的 React 組件。

```js
(getUserInput) =>
  assert(
    __helpers
      .removeWhiteSpace(getUserInput('index'))
      .includes('classMyComponentextendsReact.Component{')
  );
```

`MyComponent` 應該包含一個 `h1` 標籤，標籤的文本爲 `My First React Component!`，區分大小寫並有標點符號。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('h1').text() === 'My First React Component!';
  })()
);
```

`MyComponent` 應該渲染到 DOM。

```js
assert(document.getElementById('challenge-node').childNodes.length === 1);
```

`MyComponent` 應該有一個構造器，裏面調用了傳參 `props` 的 `super` 函數。

```js
assert(
  MyComponent.toString().includes('MyComponent(props)') &&
    MyComponent.toString().includes('_super.call(this, props)')
);
```

# --seed--

## --seed-contents--

```jsx
// Change code below this line
```

# --solutions--

```jsx
// Change code below this line
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>My First React Component!</h1>
      </div>
    );
  }
};

ReactDOM.render(<MyComponent />, document.getElementById('challenge-node'));
```
