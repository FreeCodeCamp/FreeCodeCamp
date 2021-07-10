---
id: 5a24c314108439a4d4036163
title: 创建一个 React 组件
challengeType: 6
forumTopicId: 301386
dashedName: create-a-react-component
---

# --description--

定义 React 组件的另一种方法是使用 ES6 的 `class`语法。 在以下示例中，`Kitten` 扩展了`React.Component`：

```jsx
class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hi</h1>
    );
  }
}
```

这将创建一个 ES6 类 `Kitten`，它扩展了 `React.Component` 类。 因此，`Kitten` 类现在可以访问许多有用的 React 功能，例如本地状态和生命周期钩子。 如果还不熟悉这些术语，请不要担心，在以后的挑战中我们将更详细地介绍它们。 另请注意，`Kitten` 类中定义了一个调用 `super()` 方法的 `constructor`。 它使用 `super()` 调用父类的构造函数，即本例中的 `React.Component`。 构造函数是使用 `class` 关键字创建的特殊方法，它在实例初始化之前调用。 最佳做法是在组件的 `constructor` 里调用 `super`，并将 `props` 传递给它们， 这样可以保证组件能够正确地初始化。 目前为止 ，需要知道这些代码是必要的。 很快会了解到到构造函数的其他用途以及 `props`。

# --instructions--

`MyComponent` 是使用类语法在代码编辑器中定义的。 完成 `render` 方法的编写，使其返回 `div` 元素，其中包含文本内容为 `Hello React!` 的 `h1` 元素。

# --hints--

该 React 组件应该返回一个 `div` 元素。

```js
assert(Enzyme.shallow(React.createElement(MyComponent)).type() === 'div');
```

返回的 `div` 中应该渲染一个 `h1` 标题。

```js
assert(
  /<div><h1>.*<\/h1><\/div>/.test(
    Enzyme.shallow(React.createElement(MyComponent)).html()
  )
);
```

`h1` 标题中应该包含字符串 `Hello React!`。

```js
assert(
  Enzyme.shallow(React.createElement(MyComponent)).html() ===
    '<div><h1>Hello React!</h1></div>'
);
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
  }
  render() {
    // Change code below this line



    // Change code above this line
  }
};
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Change code below this line
    return (
      <div>
        <h1>Hello React!</h1>
      </div>
    );
    // Change code above this line
  }
};
```
