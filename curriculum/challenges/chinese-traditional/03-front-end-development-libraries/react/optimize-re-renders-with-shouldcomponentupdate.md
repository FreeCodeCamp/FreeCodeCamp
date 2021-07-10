---
id: 5a24c314108439a4d4036180
title: 使用 shouldComponentUpdate 優化重新渲染
challengeType: 6
forumTopicId: 301398
dashedName: optimize-re-renders-with-shouldcomponentupdate
---

# --description--

到目前爲止，如果任何組件接收到新的 `state` 或新的 `props`，它會重新渲染自己及其所有子組件。 這通常是好的。 但是 React 提供了一種生命週期方法，當子組件接收到新的 `state` 或 `props` 時，可以調用該方法，並特別聲明組件是否應該更新。 這個方法就是 `shouldComponentUpdate()`，它將 `nextProps` 和 `nextState` 作爲參數。

這種方法是優化性能的有效方法。 例如，默認行爲是，當組件接收到新的 `props` 時，即使 `props` 沒有改變，它也會重新渲染。 可以通過使用 `shouldComponentUpdate()` 比較 `props` 來防止這種情況發生。 該方法必須返回一個 `boolean`（布爾值），該值告訴 React 是否更新組件。 可以比較當前的 props（`this.props`）和下一個 props（`nextProps`），以確定你是否需要更新，並相應地返回 `true` 或 `false`。

# --instructions--

將 `shouldComponentUpdate()` 方法添加到名爲 `OnlyEvens` 的組件中。 目前，該方法返回 `true`，因此每次收到新的 `props` 時，`OnlyEvens` 都會重新渲染。 修改該方法，以便 `OnlyEvens` 僅在其新 props 的 `value` 爲偶數時更新。 單擊 `Add` 按鈕，在觸發其他生命週期鉤子時，在瀏覽器控制檯中查看事件的順序。

# --hints--

`Controller` 組件應該將 `OnlyEvens` 組件渲染爲子組件。

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

應該在 `OnlyEvens` 組件上定義 `shouldComponentUpdate` 方法。

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

`OnlyEvens` 組件應該返回一個 `h1` 標籤，該標籤渲染 `this.props.value` 的值。

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

只有在 `nextProps.value` 爲偶數時，`OnlyEvens` 纔會重新渲染。

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
