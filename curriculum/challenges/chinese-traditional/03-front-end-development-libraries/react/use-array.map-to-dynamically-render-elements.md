---
id: 5a24c314108439a4d403618a
title: 使用 Array.map() 動態渲染元素
challengeType: 6
forumTopicId: 301417
dashedName: use-array-map-to-dynamically-render-elements
---

# --description--

條件渲染很有用，但是可能需要組件來渲染未知數量的元素。 通常在響應式編程中，程序員在應用程序運行時之前無法知道其 state，因爲這在很大程度上取決於用戶與該程序的交互。 程序員需要提前編寫代碼來正確處理未知狀態。 在 React 中使用 `Array.map()` 闡明瞭這個概念。

例如，創建一個簡單的“To Do List”應用程序。 作爲程序員，你無法知道用戶可能在其列表中有多少項。 需要設置組件，以便在使用該程序的人決定今天今日待辦事項之前動態渲染正確數量的列表元素。

# --instructions--

代碼編輯器完成了 `MyToDoList` 組件的大部分設置。 如果完成了受控表單挑戰，這些代碼中的一些應該看起來很熟悉。 你會注意到一個 `textarea` 和一個 `button`，以及一些跟蹤它們狀態的方法，但是頁面當前還沒有任何東西被渲染。

在 `constructor` 中，創建一個 `this.state` 對象並定義兩個 state：`userInput` 應該初始化爲空字符串，`toDoList` 應該初始化爲空數組。 接下來，刪除 `items` 變量旁邊 `render()` 方法中的註釋。 取而代之的是，將存儲在組件內部 state 中的 `toDoList` 數組一一遍歷並相應的動態呈現 `li` 元素中。 嘗試在 `textarea` 中輸入 `eat, code, sleep, repeat`，然後點擊按鈕，看看會發生什麼。

**注意：** 像這樣的映射操作創建的所有兄弟子元素都需要提供唯一的 `key` 屬性。 別擔心，這是下一個挑戰的主題。

# --hints--

MyToDoList 組件應該存在，並渲染到頁面。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    return mockedComponent.find('MyToDoList').length === 1;
  })()
);
```

`MyToDoList` 組件的第一個子元素應該是 `textarea` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    return (
      mockedComponent.find('MyToDoList').children().childAt(0).type() ===
      'textarea'
    );
  })()
);
```

`MyToDoList` 組件的第二個子元素應該是 `br` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    return (
      mockedComponent.find('MyToDoList').children().childAt(1).type() === 'br'
    );
  })()
);
```

`MyToDoList` 組件的第三個子元素應該是 `button` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    return (
      mockedComponent.find('MyToDoList').children().childAt(2).type() ===
      'button'
    );
  })()
);
```

`MyToDoList` 的 state 應該使用被設置爲空數組的 `toDoList` 進行初始化。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    const initialState = mockedComponent.state();
    return (
      Array.isArray(initialState.toDoList) === true &&
      initialState.toDoList.length === 0
    );
  })()
);
```

`MyToDoList` 的 state 應該使用被設置爲空字符串的 `userInput` 進行初始化。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    const initialState = mockedComponent.state();
    return (
      typeof initialState.userInput === 'string' &&
      initialState.userInput.length === 0
    );
  })()
);
```

單擊 `Create List` 按鈕時，`MyToDoList` 組件應該動態返回一個無序列表，該列表包含輸入到 `textarea` 元素中的逗號分隔列表的每個項目的列表項目元素。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
  const simulateChange = (el, value) =>
    el.simulate('change', { target: { value } });
  const state_1 = () => {
    return mockedComponent.find('ul').find('li');
  };
  const setInput = () => {
    return simulateChange(
      mockedComponent.find('textarea'),
      'testA, testB, testC'
    );
  };
  const click = () => {
    return mockedComponent.find('button').simulate('click');
  };
  const state_2 = () => {
    const nodes = mockedComponent.find('ul').find('li');
    return { nodes, text: nodes.reduce((t, n) => t + n.text().trim(), '') };
  };
  const setInput_2 = () => {
    return simulateChange(
      mockedComponent.find('textarea'),
      't1, t2, t3, t4, t5, t6'
    );
  };
  const click_1 = () => {
    return mockedComponent.find('button').simulate('click');
  };
  const state_3 = () => {
    const nodes = mockedComponent.find('ul').find('li');
    return { nodes, text: nodes.reduce((t, n) => t + n.text().trim(), '') };
  };
  const awaited_state_1 = state_1();
  const awaited_setInput = setInput();
  const awaited_click = click();
  const awaited_state_2 = state_2();
  const awaited_setInput_2 = setInput_2();
  const awaited_click_1 = click_1();
  const awaited_state_3 = state_3();
  assert(
    awaited_state_1.length === 0 &&
      awaited_state_2.nodes.length === 3 &&
      awaited_state_3.nodes.length === 6 &&
      awaited_state_2.text === 'testAtestBtestC' &&
      awaited_state_3.text === 't1t2t3t4t5t6'
  );
})();
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyToDoList />, document.getElementById('root'));
```

## --seed-contents--

```jsx
const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    // Change code below this line

    // Change code above this line
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    const items = null; // Change this line
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder='Separate Items With Commas'
        />
        <br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>{items}</ul>
      </div>
    );
  }
}
```

# --solutions--

```jsx
const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      userInput: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    const items = this.state.toDoList.map((item, i) => {
      return <li key={i}>{item}</li>;
    });
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder='Separate Items With Commas'
        />
        <br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>{items}</ul>
      </div>
    );
  }
}
```
