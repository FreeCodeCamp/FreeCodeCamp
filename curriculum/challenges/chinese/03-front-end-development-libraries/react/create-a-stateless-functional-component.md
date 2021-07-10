---
id: 5a24c314108439a4d4036162
title: 创建一个无状态的函数组件
challengeType: 6
forumTopicId: 301392
dashedName: create-a-stateless-functional-component
---

# --description--

组件是 React 的核心。 React 中的所有内容都是一个组件，在这里将学习如何创建一个组件。

有两种方法可以创建 React 组件。 第一种方法是使用 JavaScript 函数。 以这种方式定义组件会创建*无状态功能组件*。 应用程序中的状态概念将在以后的挑战中介绍。 目前为止，可以将无状态组件视为能接收数据并对其进行渲染，但不管理或跟踪该数据的更改的组件。 (我们将下一个挑战使用中第二种方式创建 React 组件。)

要用函数创建组件，只需编写一个返回 JSX 或 `null` 的 JavaScript 函数。 需要注意的一点是，React 要求你的函数名以大写字母开头。 下面是一个无状态功能组件的示例，该组件在 JSX 中分配一个 HTML 的 class：

```jsx
const DemoComponent = function() {
  return (
    <div className='customClass' />
  );
};
```

翻译完成后， `<div>` 将有一个 `customClass` 的 CSS class。

因为 JSX 组件代表 HTML，所以你可以将几个组件放在一起以创建更复杂的 HTML 页面。 这是 React 提供的组件架构的关键优势之一。 它允许用许多独立的组件组合成 UI。 这使得构建和维护复杂的用户界面变得更加容易。

# --instructions--

代码编辑器中有一个名为 `MyComponent` 的函数。 完成此函数，使其返回包含一些文本字符串的单个`div`元素。

**注意：** 文本被视为是 `div` 的子元素，因此不能使用自闭合标签。

# --hints--

`MyComponent` 应该返回 JSX。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.length === 1;
  })()
);
```

`MyComponent` 应该返回一个 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.children().type() === 'div';
  })()
);
```

`div` 元素应该包含一个文本字符串。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('div').text() !== '';
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyComponent />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const MyComponent = function() {
  // Change code below this line



  // Change code above this line
}
```

# --solutions--

```jsx
const MyComponent = function() {
  // Change code below this line
  return (
    <div>
      Demo Solution
    </div>
  );
  // Change code above this line
}
```
