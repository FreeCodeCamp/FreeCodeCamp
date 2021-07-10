---
id: 5a24c314108439a4d4036171
title: 在用戶界面中渲染狀態
challengeType: 6
forumTopicId: 301409
dashedName: render-state-in-the-user-interface
---

# --description--

定義了組件的初始 state 之後，就可以在要渲染的 UI 中顯示它。 如果組件是有狀態的，它將始終可以訪問 `render()` 方法中 `state` 的數據。 就可以使用 `this.state` 訪問數據。

如果想在 render 方法的 `return` 中訪問 state 值，必須把這個值用花括號括起來。

`state` 是 React 組件中最強大的特性之一， 它可以跟蹤應用程序中的重要數據，並根據數據的變化渲染 UI。 如果數據發生變化，UI 也會隨之改變。 React 使用所謂的虛擬 DOM 來跟蹤幕後的變化。 當 state 數據更新時，它會使用該數據觸發組件的重新渲染 -- 包括接收 prop 數據的子組件。 React 只在必要的時候更新實際的 DOM， 這意味着你不必擔心 DOM 的變更， 只需聲明 UI 的外觀即可。

注意，如果組件是有狀態的，其它組件並不知道它的 `state`。 它的 `state` 是完全封裝的，或者是侷限於組件本身的，除非你將 state 數據作爲 `props` 傳遞給子組件。 封裝 `state` 的概念非常重要，因爲它允許編寫特定的邏輯，然後將該邏輯包含並隔離在代碼中的某個位置。

# --instructions--

在代碼編輯器中，`MyComponent` 是一個有狀態組件， 在組件的 render 方法中定義一個`h1`標籤，該方法從組件的 state 渲染 `name` 的值。

**注意：** `h1` 應該只渲染來自 `state` 的值。 在 JSX 中，使用花括號 `{ }` 編寫的任何代碼都將被視爲 JavaScript。 因此，要訪問 `state` 中的值，只需將引用括在花括號中即可。

# --hints--

`MyComponent` 應該有一個鍵 `name`，其值 `freeCodeCamp` 存儲在其 state 中。

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).state('name') ===
    'freeCodeCamp'
);
```

`MyComponent` 應該在 `div` 中渲染一個 `h1` 標題。

```js
assert(
  /<div><h1>.*<\/h1><\/div>/.test(
    Enzyme.mount(React.createElement(MyComponent)).html()
  )
);
```

渲染的 `h1` 標題中應該只包含一段文本，這段文本是從組件的 state 中渲染出來的。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ name: 'TestName' });
    return waitForIt(() => mockedComponent.html());
  };
  const firstValue = await first();
  const getValue = firstValue.replace(/\s/g, '');
  assert(getValue === '<div><h1>TestName</h1></div>');
};
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
      name: 'freeCodeCamp'
    }
  }
  render() {
    return (
      <div>
        { /* Change code below this line */ }

        { /* Change code above this line */ }
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
      name: 'freeCodeCamp'
    }
  }
  render() {
    return (
      <div>
        { /* Change code below this line */ }
        <h1>{this.state.name}</h1>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
