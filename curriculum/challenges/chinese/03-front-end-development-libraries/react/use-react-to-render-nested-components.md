---
id: 5a24c314108439a4d4036165
title: 使用 React 渲染嵌套组件
challengeType: 6
forumTopicId: 301420
dashedName: use-react-to-render-nested-components
---

# --description--

上一个挑战显示了组合两个组件的简单方法，但是有许多不同的方法可以把 React 组件组合在一起。

组件组合是 React 的强大功能之一。 当使用 React 时，应当先用组件的思路考虑清楚用户界面的结构（如上一个挑战中的 App 示例）。 可以将 UI 分解为基本的构建块，这些构建块就是组件。 这样做有助于将负责 UI 的代码与负责处理应用程序逻辑的代码分开， 并可以大大简化复杂项目的开发和维护。

# --instructions--

代码编辑器中定义了两个功能组件，分别是 `TypesOfFruit` 和 `Fruits`。 请用组合或者*嵌套*把 `TypesOfFruit` 组件放到 `Fruits` 组件中， 然后把 `Fruits` 组件放到 `TypesOfFood` 组件中。 结果应该是子组件嵌套在父组件中，父组件嵌套在它本身的父组件中！

# --hints--

`TypesOfFood` 组件应该返回单个 `div` 元素。

```js
assert(Enzyme.shallow(React.createElement(TypesOfFood)).type() === 'div');
```

`TypesOfFood` 组件应该返回 `Fruits` 组件。

```js
assert(
  Enzyme.shallow(React.createElement(TypesOfFood)).props().children[1].type
    .name === 'Fruits'
);
```

`Fruits` 组件应该返回 `TypesOfFruit` 组件。

```js
assert(
  Enzyme.mount(React.createElement(TypesOfFood)).find('h2').html() ===
    '<h2>Fruits:</h2>'
);
```

`TypesOfFruit` 组件应该返回 `h2` 和 `ul` 元素。

```js
assert(
  Enzyme.mount(React.createElement(TypesOfFood)).find('ul').text() ===
    'ApplesBlueberriesStrawberriesBananas'
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<TypesOfFood />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const TypesOfFruit = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <ul>
        <li>Apples</li>
        <li>Blueberries</li>
        <li>Strawberries</li>
        <li>Bananas</li>
      </ul>
    </div>
  );
};

const Fruits = () => {
  return (
    <div>
      { /* Change code below this line */ }

      { /* Change code above this line */ }
    </div>
  );
};

class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        { /* Change code below this line */ }

        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
const TypesOfFruit = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <ul>
        <li>Apples</li>
        <li>Blueberries</li>
        <li>Strawberries</li>
        <li>Bananas</li>
      </ul>
    </div>
  );
};

const Fruits = () => {
  return (
    <div>
      { /* Change code below this line */ }
        <TypesOfFruit />
      { /* Change code above this line */ }
    </div>
  );
};

class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        { /* Change code below this line */ }
        <Fruits />
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
