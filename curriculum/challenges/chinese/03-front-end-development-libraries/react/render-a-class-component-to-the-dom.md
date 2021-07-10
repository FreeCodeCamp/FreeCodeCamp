---
id: 5a24c314108439a4d4036167
title: 将 class 组件渲染到 DOM 树
challengeType: 6
forumTopicId: 301404
dashedName: render-a-class-component-to-the-dom
---

# --description--

还记不记得在之前的挑战中使用 ReactDOM API 将 JSX 元素渲染到 DOM， 这与渲染 React 组件的过程十分相似。 过去的几个挑战主要针对组件和组合，因此渲染是在幕后完成的。 但是，如果不调用 ReactDOM API，编写的任何 React 代码都不会渲染到 DOM。

复习一下语法： `ReactDOM.render(componentToRender, targetNode)`。 第一个参数是要渲染的 React 组件。 第二个参数是要在其中渲染该组件的 DOM 节点。

传递到`ReactDOM.render()` 的React 组件与 JSX 元素略有不同。 对于 JSX 元素，传入的是要渲染的元素的名称。 但是，对于 React 组件，需要使用与渲染嵌套组件相同的语法，例如`ReactDOM.render(<ComponentToRender />, targetNode)`。 此语法用于 ES6 class 组件和函数组件都可以。

# --instructions--

在后台引入了 `Fruits` 和 `Vegetables` 组件。 将两个组件渲染为 `TypesOfFood` 组件的子组件，然后将 `TypesOfFood` 渲染到 DOM 节点， 在这个挑战中，请渲染到 `id='challenge-node'`的 `div` 中。

# --hints--

`TypesOfFood` 组件应该返回单个 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().type() === 'div';
  })()
);
```

`TypesOfFood` 组件应该在 `h1` 元素之后渲染 `Fruits` 组件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().childAt(1).name() === 'Fruits';
  })()
);
```

`TypesOfFood` 组件应该在 `Fruits` 组件之后渲染 `Vegetables` 组件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().childAt(2).name() === 'Vegetables';
  })()
);
```

`TypesOfFood` 组件应该渲染到 id 为 `challenge-node` 的 `div`中。

```js
assert(
  (function () {
    const html = document.getElementById('challenge-node').childNodes[0]
      .innerHTML;
    return (
      html.includes(
        '<div><h2>Fruits:</h2><h4>Non-Citrus:</h4><ul><li>Apples</li><li>Blueberries</li><li>Strawberries</li><li>Bananas</li></ul><h4>Citrus:</h4><ul><li>Lemon</li><li>Lime</li><li>Orange</li><li>Grapefruit</li></ul></div>'
      ) &&
      html.includes(
        '<div><h2>Vegetables:</h2><ul><li>Brussel Sprouts</li><li>Broccoli</li><li>Squash</li></ul></div>'
      )
    );
  })()
);
```

# --seed--

## --before-user-code--

```jsx
const Fruits = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <h4>Non-Citrus:</h4>
        <ul>
          <li>Apples</li>
          <li>Blueberries</li>
          <li>Strawberries</li>
          <li>Bananas</li>
        </ul>
      <h4>Citrus:</h4>
        <ul>
          <li>Lemon</li>
          <li>Lime</li>
          <li>Orange</li>
          <li>Grapefruit</li>
        </ul>
    </div>
  );
};
const Vegetables = () => {
  return (
    <div>
      <h2>Vegetables:</h2>
      <ul>
        <li>Brussel Sprouts</li>
        <li>Broccoli</li>
        <li>Squash</li>
      </ul>
    </div>
  );
};
```

## --seed-contents--

```jsx
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
};

// Change code below this line
```

# --solutions--

```jsx
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}
          <Fruits />
           <Vegetables />
         {/* Change code above this line */}
      </div>
    );
  }
};

// Change code below this line
ReactDOM.render(<TypesOfFood />, document.getElementById('challenge-node'));
```
