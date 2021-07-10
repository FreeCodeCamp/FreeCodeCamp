---
id: 5a24c314108439a4d403617e
title: 添加事件偵聽器
challengeType: 6
forumTopicId: 301377
dashedName: add-event-listeners
---

# --description--

`componentDidMount()` 方法也是添加特定功能所需的任何事件監聽器的最佳位置。 React 提供了一個合成事件系統，它封裝了瀏覽器中的事件系統。 這意味着，不管用戶用的是什麼瀏覽器，合成事件系統的行爲都完全相同 -- 即使不同瀏覽器之間的本地事件的行爲可能不同。

之前已經接觸了一些合成事件處理程序，如`onClick()`。 React 的合成事件系統非常適合用於在 DOM 元素上管理的大多數交互。 但是，如果要將事件處理程序附加到 document 或 window 對象，則必須直接執行此操作。

# --instructions--

在 `componentDidMount()` 方法中爲 `keydown` 事件添加事件監聽器，並讓這些事件觸發回調 `handleKeyPress()`。 可以使用 `document.addEventListener()`，它將事件（用引號括起來）作爲第一個參數，將回調作爲第二個參數。

然後，在 `componentWillUnmount()` 中移除相同的事件監聽器。 可以把相同的參數傳遞給 `document.removeEventListener()`。 在卸載和銷燬 React 組件之前，最好在這個生命週期方法中對它們進行清理。 移除事件監聽器就是這樣一個清理操作的例子。

# --hints--

`MyComponent` 應該渲染一個包含 `h1` 標籤的 `div` 元素。

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('div').children().find('h1').length === 1;
  })()
);
```

應該在 `componentDidMount` 中將 `keydown` 事件監聽添加到到 document 上。

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    const didMountString = mockedComponent
      .instance()
      .componentDidMount.toString();
    return new RegExp(
      'document.addEventListener(.|\n|\r)+keydown(.|\n|\r)+this.handleKeyPress'
    ).test(didMountString);
  })()
);
```

應該在 `componentWillUnmount` 中將 document 上的 `keydown` 事件監聽移除。

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    const willUnmountString = mockedComponent
      .instance()
      .componentWillUnmount.toString();
    return new RegExp(
      'document.removeEventListener(.|\n|\r)+keydown(.|\n|\r)+this.handleKeyPress'
    ).test(willUnmountString);
  })()
);
```

當組件裝載完畢，按 `enter` 鍵應該會更新其 state ，並渲染到 `h1` 標籤。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const beforeState = mockedComponent.state('message');
  const beforeText = mockedComponent.find('h1').text();
  const pressEnterKey = () => {
    mockedComponent.instance().handleKeyPress({ keyCode: 13 });
    return waitForIt(() => {
      mockedComponent.update();
      return {
        state: mockedComponent.state('message'),
        text: mockedComponent.find('h1').text()
      };
    });
  };
  const afterKeyPress = await pressEnterKey();
  assert(
    beforeState !== afterKeyPress.state && beforeText !== afterKeyPress.text
  );
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
      message: ''
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  // Change code below this line
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  // Change code above this line
  handleEnter() {
    this.setState((state) => ({
      message: state.message + 'You pressed the enter key! '
    }));
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
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
      message: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleEnter = this.handleEnter.bind(this);  }
  componentDidMount() {
    // Change code below this line
    document.addEventListener('keydown', this.handleKeyPress);
    // Change code above this line
  }
  componentWillUnmount() {
    // Change code below this line
    document.removeEventListener('keydown', this.handleKeyPress);
    // Change code above this line
  }
  handleEnter() {
    this.setState((state) => ({
      message: state.message + 'You pressed the enter key! '
    }));
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
};
```
