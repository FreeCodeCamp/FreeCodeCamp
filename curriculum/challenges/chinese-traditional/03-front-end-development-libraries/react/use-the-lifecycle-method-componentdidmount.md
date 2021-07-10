---
id: 5a24c314108439a4d403617d
title: 使用生命週期方法：componentDidMount
challengeType: 6
forumTopicId: 301422
dashedName: use-the-lifecycle-method-componentdidmount
---

# --description--

某些時候，大多數 web 開發人員需要調用 API 接口來獲取數據。 如果正在使用 React，知道在哪裏執行這個動作是很重要的。

React 的最佳實踐是在生命週期方法 `componentDidMount()` 中對服務器進行 API 調用或任何其它調用。 將組件裝載到 DOM 後會調用此方法。 此處對 `setState()` 的任何調用都將觸發組件的重新渲染。 在此方法中調用 API 並用 API​​ 返回的數據設置 state 時，一旦收到數據，它將自動觸發更新。

# --instructions--

`componentDidMount()` 中有一個模擬 API 調用。 它在 2.5 秒後設置 state，以模擬調用服務器檢索數據。 本示例請求站點的當前活動用戶總數。 在 render 方法中，把 `activeUsers` 渲染到文字 `Active Users:` 後的 `h1` 標籤中。 觀看預覽中發生的事情，隨意更改超時時間以查看不同的效果。

# --hints--

`MyComponent` 應該渲染一個包含 `h1` 標籤的 `div` 元素。

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

組件 state 應該用 `componentDidMount` 中的延時函數來更新。

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

`h1` 標籤應該從 `MyComponent` 的 state 渲染 `activeUsers` 值。

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
