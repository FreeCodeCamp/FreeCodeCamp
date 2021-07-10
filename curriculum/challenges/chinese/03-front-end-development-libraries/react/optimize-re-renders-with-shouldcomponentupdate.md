---
id: 5a24c314108439a4d4036180
title: 使用 shouldComponentUpdate 优化重新渲染
challengeType: 6
forumTopicId: 301398
dashedName: optimize-re-renders-with-shouldcomponentupdate
---

# --description--

到目前为止，如果任何组件接收到新的 `state` 或新的 `props`，它会重新渲染自己及其所有子组件。 这通常是好的。 但是 React 提供了一种生命周期方法，当子组件接收到新的 `state` 或 `props` 时，可以调用该方法，并特别声明组件是否应该更新。 这个方法就是 `shouldComponentUpdate()`，它将 `nextProps` 和 `nextState` 作为参数。

这种方法是优化性能的有效方法。 例如，默认行为是，当组件接收到新的 `props` 时，即使 `props` 没有改变，它也会重新渲染。 可以通过使用 `shouldComponentUpdate()` 比较 `props` 来防止这种情况发生。 该方法必须返回一个 `boolean`（布尔值），该值告诉 React 是否更新组件。 可以比较当前的 props（`this.props`）和下一个 props（`nextProps`），以确定你是否需要更新，并相应地返回 `true` 或 `false`。

# --instructions--

将 `shouldComponentUpdate()` 方法添加到名为 `OnlyEvens` 的组件中。 目前，该方法返回 `true`，因此每次收到新的 `props` 时，`OnlyEvens` 都会重新渲染。 修改该方法，以便 `OnlyEvens` 仅在其新 props 的 `value` 为偶数时更新。 单击 `Add` 按钮，在触发其他生命周期钩子时，在浏览器控制台中查看事件的顺序。

# --hints--

`Controller` 组件应该将 `OnlyEvens` 组件渲染为子组件。

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(Controller));
    return (
      mockedComponent.find('Controller').length === 1 &&
      mockedComponent.find('OnlyEvens').length === 1
    );
  })()
);
```

应该在 `OnlyEvens` 组件上定义 `shouldComponentUpdate` 方法。

```js
assert(
  (() => {
    const child = React.createElement(OnlyEvens)
      .type.prototype.shouldComponentUpdate.toString()
      .replace(/s/g, '');
    return child !== 'undefined';
  })()
);
```

`OnlyEvens` 组件应该返回一个 `h1` 标签，该标签渲染 `this.props.value` 的值。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(Controller));
  const first = () => {
    mockedComponent.setState({ value: 1000 });
    return mockedComponent.find('h1').html();
  };
  const second = () => {
    mockedComponent.setState({ value: 10 });
    return mockedComponent.find('h1').html();
  };
  const firstValue = first();
  const secondValue = second();
  assert(firstValue === '<h1>1000</h1>' && secondValue === '<h1>10</h1>');
})();
```

只有在 `nextProps.value` 为偶数时，`OnlyEvens` 才会重新渲染。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(Controller));
  const first = () => {
    mockedComponent.setState({ value: 8 });
    return mockedComponent.find('h1').text();
  };
  const second = () => {
    mockedComponent.setState({ value: 7 });
    return mockedComponent.find('h1').text();
  };
  const third = () => {
    mockedComponent.setState({ value: 42 });
    return mockedComponent.find('h1').text();
  };
  const firstValue = first();
  const secondValue = second();
  const thirdValue = third();
  assert(firstValue === '8' && secondValue === '8' && thirdValue === '42');
})();
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<Controller />, document.getElementById('root'));
```

## --seed-contents--

```jsx
class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    // Change code below this line
    return true;
    // Change code above this line
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>;
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState(state => ({
      value: state.value + 1
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value} />
      </div>
    );
  }
}
```

# --solutions--

```jsx
class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    // Change code below this line
    return nextProps.value % 2 === 0;
    // Change code above this line
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>;
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState(state => ({
      value: state.value + 1
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value} />
      </div>
    );
  }
}
```
