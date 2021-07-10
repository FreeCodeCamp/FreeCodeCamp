---
id: 5a24c314108439a4d403617c
title: 使用生命周期方法：componentWillMount
challengeType: 6
forumTopicId: 301423
dashedName: use-the-lifecycle-method-componentwillmount
---

# --description--

React 组件有几种特殊方法，可以在组件生命周期的特定点执行操作。 这些称为生命周期方法或生命周期钩子，允许在特定时间点捕获组件。 这可以在渲染之前、更新之前、接收 props 之前、卸载之前等等。 以下是一些主要生命周期方法的列表： `componentWillMount()` `componentDidMount()` `shouldComponentUpdate()` `componentDidUpdate()` `componentWillUnmount()` 接下来的几节课将讲述这些生命周期方法的一些基本用例。

**注意：** `componentWillMount` 生命周期方法会在版本 16.X 废弃在版本 17 移除。 [(来源)](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)

# --instructions--

当组件被挂载到 DOM 时，`componentWillMount()` 方法在 `render()` 方法之前被调用。 在`componentWillMount()`中将一些内容记录到控制台 -- 可能需要打开浏览器控制台以查看输出。

# --hints--

`MyComponent` 应该渲染一个 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('div').length === 1;
  })()
);
```

应该在 `componentWillMount` 中调用 `console.log`。

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
