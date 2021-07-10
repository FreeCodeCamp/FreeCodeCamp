---
id: 5a24c314108439a4d4036164
title: 用組合的方式創建一個 React 組件
challengeType: 6
forumTopicId: 301383
dashedName: create-a-component-with-composition
---

# --description--

現在來看看如何組合多個 React 組件。 想象一下，現在正在構建一個應用程序，並創建了三個組件：`Navbar`、`Dashboard` 和 `Footer`。

要將這些組件組合在一起，可以創建一個 `App` *父組件*，將這三個組件分別渲染成爲*子組件*。 要在 React 組件中渲染一個子組件，需要在 JSX 中包含作爲自定義 HTML 標籤編寫的組件名稱。 例如，在 `render` 方法中，可以這樣編寫：

```jsx
return (
 <App>
  <Navbar />
  <Dashboard />
  <Footer />
 </App>
)
```

當 React 遇到一個自定義 HTML 標籤引用另一個組件的時（如本例所示，組件名稱包含在 `< />` 中），它在自定義標籤的位置渲染該組件的標籤。 這可以說明 `App` 組件和 `Navbar`、`Dashboard` 以及 `Footer` 之間的父子關係。

# --instructions--

在代碼編輯器中，有一個名爲 `ChildComponent` 的簡單功能組件和一個名爲 `ParentComponent` 的 React 組件。 通過在 `ParentComponent` 中渲染 `ChildComponent` 來將兩者組合在一起。 確保使用正斜槓關閉 `ChildComponent` 標籤。

**注意：** `ChildComponent` 是使用 ES6 的箭頭函數定義的，這是使用 React 時非常常見的做法。 但是，要知道這只是一個函數。 如果你不熟悉箭頭函數語法，請參閱 JavaScript 部分。

# --hints--

React 組件應該返回單個 `div` 元素。

```js
assert(
  (function () {
    var shallowRender = Enzyme.shallow(React.createElement(ParentComponent));
    return shallowRender.type() === 'div';
  })()
);
```

組件應該返回兩個嵌套的元素。

```js
assert(
  (function () {
    var shallowRender = Enzyme.shallow(React.createElement(ParentComponent));
    return shallowRender.children().length === 2;
  })()
);
```

組件的第二個子元素應該是 `ChildComponent`。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ParentComponent));
    return (
      mockedComponent.find('ParentComponent').find('ChildComponent').length ===
      1
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<ParentComponent />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        { /* Change code below this line */ }


        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        { /* Change code below this line */ }
        <ChildComponent />
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
