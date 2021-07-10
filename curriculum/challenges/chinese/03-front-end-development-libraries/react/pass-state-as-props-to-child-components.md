---
id: 5a24c314108439a4d403617a
title: 将 State 作为 Props 传递给子组件
challengeType: 6
forumTopicId: 301403
dashedName: pass-state-as-props-to-child-components
---

# --description--

在之前的挑战中，看到了很多将 props 传递给子 JSX 元素和子 React 组件的例子。 你可能想知道那些 props 是从哪里来的。 一个常见的模式是：有状态组件中包含对应用程序很重要的 `state`，然后用它渲染子组件。 如果想让这些组件能够访问该 `state` 的某些部分，就把这些部分作为 props 传入。

例如，有一个 `App` 组件可以渲染 `Navbar` 以及其他组件。 `App` 里的 `state` 包含大量用户信息，但 `Navbar` 只需要访问用户的用户名，以便显示它。 将该 `state` 作为 prop 传递给`Navbar`组件。

这个模式说明了 React 中的一些重要范例。 第一个是*单向数据流*， state 沿着应用程序组件树的一个方向流动，从有状态父组件到子组件， 子组件只接收它们需要的 state 数据。 第二，复杂的有状态应用程序可以分解成几个，或者可能是一个单一的有状态组件。 其余组件只是从父组件简单的接收 state 作为 props，并从该 state 渲染 UI。 它开始创建一种分离，在这种分离中，state 管理在代码的一部分中处理，而 UI 渲染在另一部分中处理。 将 state 逻辑与 UI 逻辑分离是 React 的关键原则之一。 当它被正确使用时，它使得复杂的、有状态的应用程序的设计变得更容易管理。

# --instructions--

`MyApp` 组件是有状态的，并将 `Navbar` 组件渲染为子组件。 将 `state` 的 `name` 属性向下传递给子组件，然后在 `h1` 中显示该 `name` ，h1 是 `Navbar` render方法的一部分。 `name` 应该显示在文本 `Hello, my name is:` 后面。

# --hints--

`MyApp` 组件应该在内部渲染一个 `Navbar` 组件。

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

`Navbar` 组件应该接收 `MyApp` 的 state 中的 `name` 属性作为 props。

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

`Navbar` 中的 `h1`元素应该渲染 prop `name`。

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
