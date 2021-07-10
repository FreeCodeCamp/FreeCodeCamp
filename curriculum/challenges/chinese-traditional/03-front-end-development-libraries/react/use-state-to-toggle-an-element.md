---
id: 5a24c314108439a4d4036176
title: 使用 State 切換元素
challengeType: 6
forumTopicId: 301421
dashedName: use-state-to-toggle-an-element
---

# --description--

有時可能在更新狀態的時候想知道上一個狀態是什麼。 但是狀態更新是異步的，這意味着 React 可能會把多個 `setState()` 集中在一起批量更新。 所以計算下一個值時 `this.state` 或者 `this.props` 不能作爲當前值。 所以最好不要寫如下的代碼：

```jsx
this.setState({
  counter: this.state.counter + this.props.increment
});
```

正確的做法是，給 `setState` 傳入一個函數，這個函數可以訪問 state 和 props。 給 `setState` 傳入函數可以保證 state 和 props 是正確的值。 代碼可以重寫爲這樣：

```jsx
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

如果只需要 `state`，那麼用下面沒有 `props` 的格式也是可以的：

```jsx
this.setState(state => ({
  counter: state.counter + 1
}));
```

注意一定要把 object 放在括號裏，否則 JavaScript 會認爲這只是代碼片段。

# --instructions--

`MyComponent` 有一個初始值爲 `false` 的`visibility` 屬性。 如果 `visibility` 的值爲 true，render 方法返回一個視圖，如果爲 false，返回另一個視圖。

目前，無法更新組件 `state` 中的 `visibility` 屬性， 該值應在 true 和 false 之間來回切換。 按鈕上有一個單擊處理程序，它觸發一個名爲 `toggleVisibility()` 的類方法。 給函數傳入 `setState` 來定義此方法，以便 `visibility` 的 `state` 在調用方法時切換到相反的值。 如果 `visibility` 是 `false`，則該方法將其設置爲`true`，反之亦然。

最後，單擊按鈕以查看基於其 `state` 的組件的條件渲染。

**提示：** 不要忘記將 `this` 關鍵字綁定到 `constructor` 中的方法上！

# --hints--

`MyComponent` 應該返回一個 `div` 元素，其中包含一個 `button` 元素。

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(MyComponent)).find('div').find('button')
    .length,
  1
);
```

`MyComponent` 應該使用設置爲 `false` 的 `visibility` 屬性來初始化其 state。

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(MyComponent)).state('visibility'),
  false
);
```

單擊按鈕元素應在 `true` 和 `false` 之間切換 `visibility` 屬性的狀態。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ visibility: false });
    return mockedComponent.state('visibility');
  };
  const second = () => {
    mockedComponent.find('button').simulate('click');
    return mockedComponent.state('visibility');
  };
  const third = () => {
    mockedComponent.find('button').simulate('click');
    return mockedComponent.state('visibility');
  };
  const firstValue = first();
  const secondValue = second();
  const thirdValue = third();
  assert(!firstValue && secondValue && !thirdValue);
})();
```

應該給 `setState` 傳入一個匿名函數。

```js
const paramRegex = '[a-zA-Z$_]\\w*(,[a-zA-Z$_]\\w*)?';
assert(
  new RegExp(
    'this\\.setState\\((function\\(' +
      paramRegex +
      '\\){|([a-zA-Z$_]\\w*|\\(' +
      paramRegex +
      '\\))=>)'
  ).test(__helpers.removeWhiteSpace(code))
);
```

不要在 `setState` 裏面使用 `this`。

```js
assert(!/this\.setState\([^}]*this/.test(code));
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
      visibility: false
    };
    // Change code below this line

    // Change code above this line
  }
  // Change code below this line

  // Change code above this line
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
}
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  toggleVisibility() {
    this.setState(state => ({
      visibility: !state.visibility
    }));
  }
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
}
```
