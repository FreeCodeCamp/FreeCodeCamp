---
id: 5a24c314108439a4d403616a
title: 傳遞一個數組作爲 Props
challengeType: 6
forumTopicId: 301401
dashedName: pass-an-array-as-props
---

# --description--

上一個挑戰演示瞭如何將來自父組件的信息作爲 `props` 傳遞給子組件。 這個挑戰着眼於如何將數組作爲 `props` 傳遞。 要將數組傳遞給 JSX 元素，必須將其視爲 JavaScript 並用花括號括起來。

```jsx
<ParentComponent>
  <ChildComponent colors={["green", "blue", "red"]} />
</ParentComponent>
```

這樣，子組件就可以訪問數組屬性 `colors`。 訪問屬性時可以使用 `join()` 等數組方法。 `const ChildComponent = (props) => <p>{props.colors.join(', ')}</p>` 這將把所有 `colors` 數組項連接成一個逗號分隔的字符串並生成： `<p>green, blue, red</p>` 稍後，我們將瞭解在 React 中渲染數組數據的其他常用方法。

# --instructions--

代碼編輯器中有 `List` 和 `ToDo` 組件。 在 `ToDo` 組件中渲染每個 `List` 時，傳入 `tasks` 屬性並將其分配給待辦任務數組，例如 `["walk dog", "workout"]`。 然後訪問 `List` 組件中的 `tasks` 數組，在`p`元素中顯示其值。 使用 `join(", ")` 把 `props.tasks` 數組作爲逗號分隔列表顯示在 `p` 元素中。 今天的列表應該至少有 2 個任務，明天的列表應該至少有 3 個任務。

# --hints--

`ToDo` 組件應該返回單個外部 `div`。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.children().first().type() === 'div';
  })()
);
```

`ToDo` 組件的第三個子元素應該是 `List` 組件的一個實例。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.children().first().childAt(2).name() === 'List';
  })()
);
```

`ToDo` 組件的第五個子元素應該是 `List` 組件的一個實例。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.children().first().childAt(4).name() === 'List';
  })()
);
```

`List` 組件的兩個實例都應該具有一個名爲 `tasks` 的屬性，並且 `tasks` 的類型應該是數組。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return (
      Array.isArray(mockedComponent.find('List').get(0).props.tasks) &&
      Array.isArray(mockedComponent.find('List').get(1).props.tasks)
    );
  })()
);
```

表示今天任務的第一個 `List` 組件應該有 2 個或更多項。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.find('List').get(0).props.tasks.length >= 2;
  })()
);
```

表示明天任務的第二個 `List` 組件應該有 3 個或更多項。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.find('List').get(1).props.tasks.length >= 3;
  })()
);
```

`List` 組件應在 `p` 標籤中渲染 `tasks` 屬性的值。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return (
      mockedComponent
        .find('p')
        .get(0)
        .props.children.replace(/\s*,\s*/g, ',') ===
        mockedComponent
          .find('List')
          .get(0)
          .props.tasks.join(',')
          .replace(/\s*,\s*/g, ',') &&
      mockedComponent
        .find('p')
        .get(1)
        .props.children.replace(/\s*,\s*/g, ',') ===
        mockedComponent
          .find('List')
          .get(1)
          .props.tasks.join(',')
          .replace(/\s*,\s*/g, ',')
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<ToDo />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const List = (props) => {
  { /* Change code below this line */ }
  return <p>{}</p>
  { /* Change code above this line */ }
};

class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h2>Today</h2>
        { /* Change code below this line */ }
        <List/>
        <h2>Tomorrow</h2>
        <List/>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
const List= (props) => {
  return <p>{props.tasks.join(', ')}</p>
};

class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h2>Today</h2>
        <List tasks={['study', 'exercise']} />
        <h2>Tomorrow</h2>
        <List tasks={['call Sam', 'grocery shopping', 'order tickets']} />
      </div>
    );
  }
};
```
