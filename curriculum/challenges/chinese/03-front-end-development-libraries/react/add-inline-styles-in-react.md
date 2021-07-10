---
id: 5a24c314108439a4d4036182
title: 在 React 中添加内联样式
challengeType: 6
forumTopicId: 301378
dashedName: add-inline-styles-in-react
---

# --description--

在上一次挑战中，你可能已经注意到，除了设置为 JavaScript 对象的 `style` 属性之外，与 HTML 内联样式相比，React 的内联样式还有其他几个语法差异。 首先，某些 CSS 样式属性的名称使用驼峰式命名。 例如，最后一个挑战用 `fontSize` 而不是 `font-size` 来设置字体的大小。 对于 JavaScript 对象属性来说，像 `font-size` 这样的连字符命名是无效的语法，所以 React 使用驼峰式命名。 通常，任何连字符的 style 属性在 JSX 中都是使用驼峰式命名的。

除非另有规定，否则所有属性值的 length（如`height`、`width` 和 `fontSize`）其单位都假定为 `px`。 例如，如果要使用 `em`，可以用引号将值和单位括起来，例如 `{fontSize: "4em"}`。 除了默认为 `px` 的 length 值之外，所有其他属性值都应该用引号括起来。

# --instructions--

如果你有大量样式，你可以将样式 `object`（对象）分配给一个常量，以保持代码的组织有序。 在文件顶部将你的样式声明为全局变量。 定义一个 `styles` 常量，并将其声明为具有三个样式属性及对应值的 `object`（对象）。 使 `div` 的文字颜色为 `purple`、字号为 `40`、边框为 `2px solid purple`。 然后设置 `style` 属性，使其等于 `styles` 常量。

# --hints--

`styles` 变量应该是具有三个属性的 `object`（对象）。

```js
assert(Object.keys(styles).length === 3);
```

`styles` 变量的 `color` 属性应该设置为 `purple`。

```js
assert(styles.color === 'purple');
```

`styles` 变量应该将 `fontSize` 属性设置为 `40`。

```js
assert(styles.fontSize === 40);
```

`styles` 变量的 `border` 属性应该设置为 `2px solid purple`。

```js
assert(styles.border === '2px solid purple');
```

组件应该渲染一个 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.shallow(React.createElement(Colorful));
    return mockedComponent.type() === 'div';
  })()
);
```

`div` 元素的样式应该由 `styles` 对象定义。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.shallow(React.createElement(Colorful));
    return (
      mockedComponent.props().style.color === 'purple' &&
      mockedComponent.props().style.fontSize === 40 &&
      mockedComponent.props().style.border === '2px solid purple'
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<Colorful />, document.getElementById('root'))
```

## --seed-contents--

```jsx
// Change code above this line
class Colorful extends React.Component {
  render() {
    // Change code below this line
    return (
      <div style={{color: "yellow", fontSize: 24}}>Style Me!</div>
    );
    // Change code above this line
  }
};
```

# --solutions--

```jsx
const styles = {
  color: "purple",
  fontSize: 40,
  border: "2px solid purple"
};
// Change code above this line
class Colorful extends React.Component {
  render() {
    // Change code below this line
    return (
      <div style={styles}>Style Me!</div>
    );
    // Change code above this line
  }
};
```
