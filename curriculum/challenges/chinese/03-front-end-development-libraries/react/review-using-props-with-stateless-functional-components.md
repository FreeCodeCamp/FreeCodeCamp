---
id: 5a24c314108439a4d403616f
title: 复习使用无状态函数组件的 Props
challengeType: 6
forumTopicId: 301411
dashedName: review-using-props-with-stateless-functional-components
---

# --description--

除了上一个挑战，一直在将 props 传递给无状态的函数组件。 这些组件就像纯函数， 它们接收 props 作为输入，并在每次传递相同 props 时返回相同的视图。 你可能好奇什么是状态，下一个挑战将会更详细地讲述它。 在此之前，我们先来回顾一下组件的术语。

*无状态函数组件*是一个函数，它接收 props 作为输入并返回 JSX。 另一方面，*无状态组件*是一个类，它扩展了`React.Component`，但是不使用内部状态（下一个挑战中讨论）。 最后，*状态组件*是指维护其自身内部状态的组件， 它简称组件或 React 组件。

一种常见的应用模式是尽可能减少状态组件并创建无状态的函数组件。 这有助于将状态管理包含到应用程序的特定区域。 反过来，通过更容易地跟踪状态变化如何影响其行为，可以改善应用程序的开发和维护。

# --instructions--

在代码编辑器中有一个 `CampSite` 组件，它把 `Camper` 组件渲染为自己的子组件。 定义 `Camper` 组件，并为其分配默认 props `{ name: 'CamperBot' }`。 可以在 `Camper` 组件内部渲染任何你想要的代码，但是要确保有一个 `p` 元素，它只包含作为 `prop` 传递的 `name` 值。 最后，在 `Camper` 组件上定义 `propTypes`，要求提供 `name` 作为 prop，并验证它是 `string` 类型。

# --hints--

应该渲染 `CampSite` 组件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(CampSite));
    return mockedComponent.find('CampSite').length === 1;
  })()
);
```

应该渲染 `Camper` 组件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(CampSite));
    return mockedComponent.find('Camper').length === 1;
  })()
);
```

`Camper` 组件应该包含默认 props，它将字符串 `CamperBot` 赋值给关键字 `name`。

```js
assert(
  /Camper.defaultProps={name:(['"`])CamperBot\1,?}/.test(
    __helpers.removeWhiteSpace(code)
  )
);
```

`Camper` 组件应该包含 `string` 类型的 `name` prop。

```js
assert(
  /Camper.propTypes={name:PropTypes.string.isRequired,?}/.test(
    __helpers.removeWhiteSpace(code)
  )
);
```

`Camper` 组件应该包含 `p` 元素，元素的文本是 prop 的 `name`。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(CampSite));
    return (
      mockedComponent.find('p').text() ===
      mockedComponent.find('Camper').props().name
    );
  })()
);
```

# --seed--

## --before-user-code--

```jsx
var PropTypes = {
   string: { isRequired: true }
};
```

## --after-user-code--

```jsx
ReactDOM.render(<CampSite />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// Change code below this line
```

# --solutions--

```jsx
class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// Change code below this line

const Camper = (props) => {
   return (
     <div>
       <p>{props.name}</p>
     </div>
   );
};

Camper.propTypes = {
  name: PropTypes.string.isRequired
};

Camper.defaultProps = {
  name: 'CamperBot'
};
```
