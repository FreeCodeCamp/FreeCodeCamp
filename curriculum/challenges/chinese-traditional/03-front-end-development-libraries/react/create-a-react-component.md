---
id: 5a24c314108439a4d4036163
title: 創建一個 React 組件
challengeType: 6
forumTopicId: 301386
dashedName: create-a-react-component
---

# --description--

定義 React 組件的另一種方法是使用 ES6 的 `class`語法。 在以下示例中，`Kitten` 擴展了`React.Component`：

```jsx
class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hi</h1>
    );
  }
}
```

這將創建一個 ES6 類 `Kitten`，它擴展了 `React.Component` 類。 因此，`Kitten` 類現在可以訪問許多有用的 React 功能，例如本地狀態和生命週期鉤子。 如果還不熟悉這些術語，請不要擔心，在以後的挑戰中我們將更詳細地介紹它們。 另請注意，`Kitten` 類中定義了一個調用 `super()` 方法的 `constructor`。 它使用 `super()` 調用父類的構造函數，即本例中的 `React.Component`。 構造函數是使用 `class` 關鍵字創建的特殊方法，它在實例初始化之前調用。 最佳做法是在組件的 `constructor` 裏調用 `super`，並將 `props` 傳遞給它們， 這樣可以保證組件能夠正確地初始化。 目前爲止 ，需要知道這些代碼是必要的。 很快會了解到到構造函數的其他用途以及 `props`。

# --instructions--

`MyComponent` 是使用類語法在代碼編輯器中定義的。 完成 `render` 方法的編寫，使其返回 `div` 元素，其中包含文本內容爲 `Hello React!` 的 `h1` 元素。

# --hints--

該 React 組件應該返回一個 `div` 元素。

```js
assert(Enzyme.shallow(React.createElement(MyComponent)).type() === 'div');
```

返回的 `div` 中應該渲染一個 `h1` 標題。

```js
assert(
  /<div><h1>.*<\/h1><\/div>/.test(
    Enzyme.shallow(React.createElement(MyComponent)).html()
  )
);
```

`h1` 標題中應該包含字符串 `Hello React!`。

```js
assert(
  Enzyme.shallow(React.createElement(MyComponent)).html() ===
    '<div><h1>Hello React!</h1></div>'
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyComponent />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Change code below this line



    // Change code above this line
  }
};
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Change code below this line
    return (
      <div>
        <h1>Hello React!</h1>
      </div>
    );
    // Change code above this line
  }
};
```
