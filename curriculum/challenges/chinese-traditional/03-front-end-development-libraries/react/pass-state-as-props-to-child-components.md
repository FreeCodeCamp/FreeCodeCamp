---
id: 5a24c314108439a4d403617a
title: 將 State 作爲 Props 傳遞給子組件
challengeType: 6
forumTopicId: 301403
dashedName: pass-state-as-props-to-child-components
---

# --description--

在之前的挑戰中，看到了很多將 props 傳遞給子 JSX 元素和子 React 組件的例子。 你可能想知道那些 props 是從哪裏來的。 一個常見的模式是：有狀態組件中包含對應用程序很重要的 `state`，然後用它渲染子組件。 如果想讓這些組件能夠訪問該 `state` 的某些部分，就把這些部分作爲 props 傳入。

例如，有一個 `App` 組件可以渲染 `Navbar` 以及其他組件。 `App` 裏的 `state` 包含大量用戶信息，但 `Navbar` 只需要訪問用戶的用戶名，以便顯示它。 將該 `state` 作爲 prop 傳遞給`Navbar`組件。

這個模式說明了 React 中的一些重要範例。 第一個是*單向數據流*， state 沿着應用程序組件樹的一個方向流動，從有狀態父組件到子組件， 子組件只接收它們需要的 state 數據。 第二，複雜的有狀態應用程序可以分解成幾個，或者可能是一個單一的有狀態組件。 其餘組件只是從父組件簡單的接收 state 作爲 props，並從該 state 渲染 UI。 它開始創建一種分離，在這種分離中，state 管理在代碼的一部分中處理，而 UI 渲染在另一部分中處理。 將 state 邏輯與 UI 邏輯分離是 React 的關鍵原則之一。 當它被正確使用時，它使得複雜的、有狀態的應用程序的設計變得更容易管理。

# --instructions--

`MyApp` 組件是有狀態的，並將 `Navbar` 組件渲染爲子組件。 將 `state` 的 `name` 屬性向下傳遞給子組件，然後在 `h1` 中顯示該 `name` ，h1 是 `Navbar` render方法的一部分。 `name` 應該顯示在文本 `Hello, my name is:` 後面。

# --hints--

`MyApp` 組件應該在內部渲染一個 `Navbar` 組件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return (
      mockedComponent.find('MyApp').length === 1 &&
      mockedComponent.find('Navbar').length === 1
    );
  })()
);
```

`Navbar` 組件應該接收 `MyApp` 的 state 中的 `name` 屬性作爲 props。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const setState = () => {
    mockedComponent.setState({ name: 'TestName' });
    return waitForIt(() => mockedComponent.find('Navbar').props());
  };
  const navProps = await setState();
  assert(navProps.name === 'TestName');
};
```

`Navbar` 中的 `h1`元素應該渲染 prop `name`。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const navH1Before = mockedComponent.find('Navbar').find('h1').text();
  const setState = () => {
    mockedComponent.setState({ name: 'TestName' });
    return waitForIt(() => mockedComponent.find('Navbar').find('h1').text());
  };
  const navH1After = await setState();
  assert(new RegExp('TestName').test(navH1After) && navH1After !== navH1Before);
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyApp />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CamperBot'
    }
  }
  render() {
    return (
       <div>
         {/* Change code below this line */}
         <Navbar />
         {/* Change code above this line */}
       </div>
    );
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      {/* Change code below this line */}
      <h1>Hello, my name is: </h1>
      {/* Change code above this line */}
    </div>
    );
  }
};
```

# --solutions--

```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CamperBot'
    }
  }
  render() {
    return (
       <div>
         <Navbar name={this.state.name}/>
       </div>
    );
  }
};
class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <h1>Hello, my name is: {this.props.name}</h1>
    </div>
    );
  }
};
```
