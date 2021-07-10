---
id: 5a24c314108439a4d403616a
title: 传递一个数组作为 Props
challengeType: 6
forumTopicId: 301401
dashedName: pass-an-array-as-props
---

# --description--

上一个挑战演示了如何将来自父组件的信息作为 `props` 传递给子组件。 这个挑战着眼于如何将数组作为 `props` 传递。 要将数组传递给 JSX 元素，必须将其视为 JavaScript 并用花括号括起来。

```jsx
<ParentComponent>
  <ChildComponent colors={["green", "blue", "red"]} />
</ParentComponent>
```

这样，子组件就可以访问数组属性 `colors`。 访问属性时可以使用 `join()` 等数组方法。 `const ChildComponent = (props) => <p>{props.colors.join(', ')}</p>` 这将把所有 `colors` 数组项连接成一个逗号分隔的字符串并生成： `<p>green, blue, red</p>` 稍后，我们将了解在 React 中渲染数组数据的其他常用方法。

# --instructions--

代码编辑器中有 `List` 和 `ToDo` 组件。 在 `ToDo` 组件中渲染每个 `List` 时，传入 `tasks` 属性并将其分配给待办任务数组，例如 `["walk dog", "workout"]`。 然后访问 `List` 组件中的 `tasks` 数组，在`p`元素中显示其值。 使用 `join(", ")` 把 `props.tasks` 数组作为逗号分隔列表显示在 `p` 元素中。 今天的列表应该至少有 2 个任务，明天的列表应该至少有 3 个任务。

# --hints--

`ToDo` 组件应该返回单个外部 `div`。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.children().first().type() === 'div';
  })()
);
```

`ToDo` 组件的第三个子元素应该是 `List` 组件的一个实例。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.children().first().childAt(2).name() === 'List';
  })()
);
```

`ToDo` 组件的第五个子元素应该是 `List` 组件的一个实例。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.children().first().childAt(4).name() === 'List';
  })()
);
```

`List` 组件的两个实例都应该具有一个名为 `tasks` 的属性，并且 `tasks` 的类型应该是数组。

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

表示今天任务的第一个 `List` 组件应该有 2 个或更多项。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.find('List').get(0).props.tasks.length >= 2;
  })()
);
```

表示明天任务的第二个 `List` 组件应该有 3 个或更多项。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.find('List').get(1).props.tasks.length >= 3;
  })()
);
```

`List` 组件应在 `p` 标签中渲染 `tasks` 属性的值。

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
