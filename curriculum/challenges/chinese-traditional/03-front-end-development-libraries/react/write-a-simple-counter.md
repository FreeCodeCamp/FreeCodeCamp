---
id: 5a24c314108439a4d4036177
title: 寫一個簡單的計數器
challengeType: 6
forumTopicId: 301425
dashedName: write-a-simple-counter
---

# --description--

可以結合目前爲止所涵蓋的概念來設計更復雜的有狀態組件。 這包括初始化 `state`，編寫設置 `state` 的方法，以及指定單擊處理程序來觸發這些方法。

# --instructions--

`Counter` 組件跟蹤 `state` 中的 `count` 值。 有兩個按鈕分別調用 `increment()` 和 `decrement()` 方法。 編寫這些方法，使計數器值在單擊相應按鈕時增加或減少 1。 另外，創建一個 `reset()` 方法，當單擊 reset 按鈕時，把計數設置爲 0。

**注意：** 確保沒有修改按鈕的 `className`。 另外，請記住在構造函數中爲新創建的方法添加必要的綁定。

# --hints--

`Counter` 應該返回一個 `div` 元素，它包含三個按鈕，按鈕內容依次是 `Increment!`、`Decrement!`、`Reset`。

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

`Counter` 應該使用設置爲 `0` 的 `count` 屬性初始化 state。

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
assert(mockedComponent.find('h1').text() === 'Current Count: 0');
```

單擊 increment 按鈕應將計數增加 `1`。

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
mockedComponent.find('.inc').simulate('click');
assert(mockedComponent.find('h1').text() === 'Current Count: 1');
```

單擊 decrement 按鈕應將計數減少 `1`。

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
mockedComponent.find('.dec').simulate('click');
assert(mockedComponent.find('h1').text() === 'Current Count: -1');
```

單擊 reset 按鈕應將計數重置爲 `0`。

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
