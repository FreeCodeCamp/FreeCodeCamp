---
id: 5a24c314108439a4d403617d
title: 使用生命周期方法：componentDidMount
challengeType: 6
forumTopicId: 301422
dashedName: use-the-lifecycle-method-componentdidmount
---

# --description--

某些时候，大多数 web 开发人员需要调用 API 接口来获取数据。 如果正在使用 React，知道在哪里执行这个动作是很重要的。

React 的最佳实践是在生命周期方法 `componentDidMount()` 中对服务器进行 API 调用或任何其它调用。 将组件装载到 DOM 后会调用此方法。 此处对 `setState()` 的任何调用都将触发组件的重新渲染。 在此方法中调用 API 并用 API​​ 返回的数据设置 state 时，一旦收到数据，它将自动触发更新。

# --instructions--

`componentDidMount()` 中有一个模拟 API 调用。 它在 2.5 秒后设置 state，以模拟调用服务器检索数据。 本示例请求站点的当前活动用户总数。 在 render 方法中，把 `activeUsers` 渲染到文字 `Active Users:` 后的 `h1` 标签中。 观看预览中发生的事情，随意更改超时时间以查看不同的效果。

# --hints--

`MyComponent` 应该渲染一个包含 `h1` 标签的 `div` 元素。

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return (
      mockedComponent.find('div').length === 1 &&
      mockedComponent.find('h1').length === 1
    );
  })()
);
```

组件 state 应该用 `componentDidMount` 中的延时函数来更新。

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return new RegExp('setTimeout(.|\n)+setState(.|\n)+activeUsers').test(
      String(mockedComponent.instance().componentDidMount)
    );
  })()
);
```

`h1` 标签应该从 `MyComponent` 的 state 渲染 `activeUsers` 值。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ activeUsers: 1237 });
    return mockedComponent.find('h1').text();
  };
  const second = () => {
    mockedComponent.setState({ activeUsers: 1000 });
    return mockedComponent.find('h1').text();
  };
  assert(new RegExp('1237').test(first()) && new RegExp('1000').test(second()));
})();
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyComponent />, document.getElementById('root'));
```

## --seed-contents--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: null
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        activeUsers: 1273
      });
    }, 2500);
  }
  render() {
    return (
      <div>
        {/* Change code below this line */}
        <h1>Active Users: </h1>
        {/* Change code above this line */}
      </div>
    );
  }
}
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: null
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        activeUsers: 1273
      });
    }, 2500);
  }
  render() {
    return (
      <div>
        <h1>Active Users: {this.state.activeUsers}</h1>
      </div>
    );
  }
}
```
