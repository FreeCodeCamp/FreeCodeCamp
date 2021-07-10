---
id: 5a24c314108439a4d4036185
title: Use && for a More Concise Conditional
challengeType: 6
forumTopicId: 301413
dashedName: use--for-a-more-concise-conditional
---

# --description--

`if/else` 語句在上一次挑戰中是有效的，但是有一種更簡潔的方法可以達到同樣的結果。 假設正在跟蹤組件中的幾個條件，並且希望根據這些條件中的每一個來渲染不同的元素。 如果你寫了很多 `else if` 語句來返回稍微不同的 UI，你可能會寫很多重複代碼，這就留下了出錯的空間。 相反，你可以使用 `&&` 邏輯運算符以更簡潔的方式執行條件邏輯。 這是完全可行的，因爲你希望檢查條件是否爲 `true`。如果是，則返回一些標記。 這裏有一個例子：

```jsx
{condition && <p>markup</p>}
```

如果 `condition` 爲 `true`，則返回標記。 如果條件爲 `false` ，則在評估 `condition` 後操作將立即返回 `false`，並且不返回任何內容。 可以將這些語句直接包含在 JSX 中，並通過在每個條件後面寫 `&&` 來將多個條件串在一起。 這允許你在 `render()` 方法中處理更復雜的條件邏輯，而無需重複大量代碼。

# --instructions--

再來看看前面的示例，`h1` 還是在 `display` 爲 `true` 時渲染，但使用 `&&` 邏輯運算符代替 `if/else` 語句。

# --hints--

`MyComponent` 應該存在並渲染。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('MyComponent').length;
  })()
);
```

當 `display` 被設置爲 `true` 時，`div`、`button` 和 `h1` 標籤應該渲染。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const state_1 = () => {
    mockedComponent.setState({ display: true });
    return waitForIt(() => mockedComponent);
  };
  const updated = await state_1();
  assert(
    updated.find('div').length === 1 &&
      updated.find('div').children().length === 2 &&
      updated.find('button').length === 1 &&
      updated.find('h1').length === 1
  );
};
```

當 `display` 被設置爲 `false` 時，只有 `div` 和 `button` 應該渲染。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const state_1 = () => {
    mockedComponent.setState({ display: false });
    return waitForIt(() => mockedComponent);
  };
  const updated = await state_1();
  assert(
    updated.find('div').length === 1 &&
      updated.find('div').children().length === 1 &&
      updated.find('button').length === 1 &&
      updated.find('h1').length === 0
  );
};
```

render 方法應該使用 `&&` 邏輯運算符來檢查 `this.state.display` 的條件。

```js
(getUserInput) => assert(getUserInput('index').includes('&&'));
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
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState(state => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         <h1>Displayed!</h1>
       </div>
    );
  }
};
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
 this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState(state => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         {this.state.display && <h1>Displayed!</h1>}
       </div>
    );
  }
};
```
