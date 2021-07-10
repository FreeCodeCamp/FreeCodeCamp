---
id: 5a24c314108439a4d403617e
title: 添加事件侦听器
challengeType: 6
forumTopicId: 301377
dashedName: add-event-listeners
---

# --description--

`componentDidMount()` 方法也是添加特定功能所需的任何事件监听器的最佳位置。 React 提供了一个合成事件系统，它封装了浏览器中的事件系统。 这意味着，不管用户用的是什么浏览器，合成事件系统的行为都完全相同 -- 即使不同浏览器之间的本地事件的行为可能不同。

之前已经接触了一些合成事件处理程序，如`onClick()`。 React 的合成事件系统非常适合用于在 DOM 元素上管理的大多数交互。 但是，如果要将事件处理程序附加到 document 或 window 对象，则必须直接执行此操作。

# --instructions--

在 `componentDidMount()` 方法中为 `keydown` 事件添加事件监听器，并让这些事件触发回调 `handleKeyPress()`。 可以使用 `document.addEventListener()`，它将事件（用引号括起来）作为第一个参数，将回调作为第二个参数。

然后，在 `componentWillUnmount()` 中移除相同的事件监听器。 可以把相同的参数传递给 `document.removeEventListener()`。 在卸载和销毁 React 组件之前，最好在这个生命周期方法中对它们进行清理。 移除事件监听器就是这样一个清理操作的例子。

# --hints--

`MyComponent` 应该渲染一个包含 `h1` 标签的 `div` 元素。

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('div').children().find('h1').length === 1;
  })()
);
```

应该在 `componentDidMount` 中将 `keydown` 事件监听添加到到 document 上。

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

应该在 `componentWillUnmount` 中将 document 上的 `keydown` 事件监听移除。

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

当组件装载完毕，按 `enter` 键应该会更新其 state ，并渲染到 `h1` 标签。

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
