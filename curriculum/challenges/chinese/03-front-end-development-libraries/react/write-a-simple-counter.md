---
id: 5a24c314108439a4d4036177
title: 写一个简单的计数器
challengeType: 6
forumTopicId: 301425
dashedName: write-a-simple-counter
---

# --description--

可以结合目前为止所涵盖的概念来设计更复杂的有状态组件。 这包括初始化 `state`，编写设置 `state` 的方法，以及指定单击处理程序来触发这些方法。

# --instructions--

`Counter` 组件跟踪 `state` 中的 `count` 值。 有两个按钮分别调用 `increment()` 和 `decrement()` 方法。 编写这些方法，使计数器值在单击相应按钮时增加或减少 1。 另外，创建一个 `reset()` 方法，当单击 reset 按钮时，把计数设置为 0。

**注意：** 确保没有修改按钮的 `className`。 另外，请记住在构造函数中为新创建的方法添加必要的绑定。

# --hints--

`Counter` 应该返回一个 `div` 元素，它包含三个按钮，按钮内容依次是 `Increment!`、`Decrement!`、`Reset`。

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(Counter));
    return (
      mockedComponent.find('.inc').text() === 'Increment!' &&
      mockedComponent.find('.dec').text() === 'Decrement!' &&
      mockedComponent.find('.reset').text() === 'Reset'
    );
  })()
);
```

`Counter` 应该使用设置为 `0` 的 `count` 属性初始化 state。

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
assert(mockedComponent.find('h1').text() === 'Current Count: 0');
```

单击 increment 按钮应将计数增加 `1`。

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
mockedComponent.find('.inc').simulate('click');
assert(mockedComponent.find('h1').text() === 'Current Count: 1');
```

单击 decrement 按钮应将计数减少 `1`。

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
mockedComponent.find('.dec').simulate('click');
assert(mockedComponent.find('h1').text() === 'Current Count: -1');
```

单击 reset 按钮应将计数重置为 `0`。

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
mockedComponent.setState({ count: 5 });
const currentCountElement = mockedComponent.find('h1');
assert(currentCountElement.text() === 'Current Count: 5');
mockedComponent.find('.reset').simulate('click');
assert(currentCountElement.text() === 'Current Count: 0');
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<Counter />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    // Change code below this line

    // Change code above this line
  }
  // Change code below this line

  // Change code above this line
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};
```

# --solutions--

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  this.increment = this.increment.bind(this);
 this.decrement = this.decrement.bind(this);
 this.reset = this.reset.bind(this);
 }
  reset() {
    this.setState({
      count: 0
    });
  }
  increment() {
    this.setState(state => ({
      count: state.count + 1
    }));
  }
  decrement() {
    this.setState(state => ({
      count: state.count - 1
    }));
  }
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};
```
