---
id: 5a24c314108439a4d403617c
title: 使用生命週期方法：componentWillMount
challengeType: 6
forumTopicId: 301423
dashedName: use-the-lifecycle-method-componentwillmount
---

# --description--

React 組件有幾種特殊方法，可以在組件生命週期的特定點執行操作。 這些稱爲生命週期方法或生命週期鉤子，允許在特定時間點捕獲組件。 這可以在渲染之前、更新之前、接收 props 之前、卸載之前等等。 以下是一些主要生命週期方法的列表： `componentWillMount()` `componentDidMount()` `shouldComponentUpdate()` `componentDidUpdate()` `componentWillUnmount()` 接下來的幾節課將講述這些生命週期方法的一些基本用例。

**注意：** `componentWillMount` 生命週期方法會在版本 16.X 廢棄在版本 17 移除。 [(來源)](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)

# --instructions--

當組件被掛載到 DOM 時，`componentWillMount()` 方法在 `render()` 方法之前被調用。 在`componentWillMount()`中將一些內容記錄到控制檯 -- 可能需要打開瀏覽器控制檯以查看輸出。

# --hints--

`MyComponent` 應該渲染一個 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('div').length === 1;
  })()
);
```

應該在 `componentWillMount` 中調用 `console.log`。

```js
assert(
  (function () {
    const lifecycle = React.createElement(MyComponent)
      .type.prototype.componentWillMount.toString()
      .replace(/ /g, '');
    return lifecycle.includes('console.log(');
  })()
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
  componentWillMount() {
    // Change code below this line

    // Change code above this line
  }
  render() {
    return <div />
  }
};
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // Change code below this line
    console.log('Component is mounting...');
    // Change code above this line
  }
  render() {
    return <div />
  }
};
```
