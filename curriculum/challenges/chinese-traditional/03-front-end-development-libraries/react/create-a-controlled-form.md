---
id: 5a24c314108439a4d4036179
title: 創建一個可以控制的表單
challengeType: 6
forumTopicId: 301384
dashedName: create-a-controlled-form
---

# --description--

上一個挑戰展示了 React 能控制某些元素的內部 state，比如 `input` 和 `textarea`，這使得這些元素成爲受控組件。 這也適用於其他表單元素，包括常規的 HTML 表單 `form` 元素。

# --instructions--

`MyForm` 組件中是一個帶有提交處理程序的空 `form` 元素， 提交處理程序將在提交表單時被調用。

我們增加了一個提交表單的按鈕。 可以看到它的 `type` 被設置爲 `submit`，表明它是控制表單提交的按鈕。 在 `form` 中添加 `input` 元素，並像上個挑戰一樣設置其 `value` 和 `onChange()` 屬性。 然後，應該完成 `handleSubmit` 方法，以便將組件 state 屬性 `submit` 設置爲本地 `state` 下的當前輸入值。

**注意：** 還必須在提交處理程序中調用 `event.preventDefault()`，以防止將會刷新網頁的默認的表單提交行爲。 爲了便於學員操作，默認行爲在這裏被禁用，以防止重置挑戰的代碼。

最後，在 `form` 元素之後創建一個 `h1` 標籤，該標籤從組件的 `state` 渲染 `submit` 的值。 然後，可以在表單中鍵入任何內容，然後單擊按鈕（或按 enter 鍵），輸入會渲染到頁面上。

# --hints--

`MyForm` 應該返回一個包含 `form` 和 `h1` 標籤的 `div` 元素， 其中，表單中應該包括一個 `input` 和一個 `button`。

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyForm));
    return (
      mockedComponent.find('div').children().find('form').length === 1 &&
      mockedComponent.find('div').children().find('h1').length === 1 &&
      mockedComponent.find('form').children().find('input').length === 1 &&
      mockedComponent.find('form').children().find('button').length === 1
    );
  })()
);
```

`MyForm` 的 state 應該用 `input` 和 `submit` 屬性初始化，且兩者都爲空字符串。

```js
assert(
  Enzyme.mount(React.createElement(MyForm)).state('input') === '' &&
    Enzyme.mount(React.createElement(MyForm)).state('submit') === ''
);
```

`input` 元素中的輸入應該會更新組件中 state 的 `input` 屬性。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyForm));
  const _1 = () => {
    mockedComponent.setState({ input: '' });
    return mockedComponent.state('input');
  };
  const _2 = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'TestInput' } });
    return {
      state: mockedComponent.state('input'),
      inputVal: mockedComponent.find('input').props().value
    };
  };
  const before = _1();
  const after = _2();
  assert(
    before === '' &&
      after.state === 'TestInput' &&
      after.inputVal === 'TestInput'
  );
})();
```

提交表單應該運行 `handleSubmit`，它應該將 state 中的 `submit` 屬性設置爲當前輸入。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyForm));
  const _1 = () => {
    mockedComponent.setState({ input: '' });
    mockedComponent.setState({ submit: '' });
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'SubmitInput' } });
    return mockedComponent.state('submit');
  };
  const _2 = () => {
    mockedComponent.find('form').simulate('submit');
    return mockedComponent.state('submit');
  };
  const before = _1();
  const after = _2();
  assert(before === '' && after === 'SubmitInput');
})();
```

`handleSubmit` 應該調用 `event.preventDefault`。

```js
const handleSubmit = MyForm.prototype.handleSubmit.toString();
const allMatches = handleSubmit.match(/\bevent\.preventDefault\(\s*?\)/g) ?? [];
const blockCommented = handleSubmit.match(
  /\/\*.*?\bevent\.preventDefault\(\s*?\).*?\*\//gs
);
const lineCommented = handleSubmit.match(
  /\/\/.*?\bevent\.preventDefault\(\s*?\)/g
);
const commentedMatches = [...(blockCommented ?? []), ...(lineCommented ?? [])];

assert(
  // At least one event.preventDefault() call exists and is not commented out
  allMatches.length > commentedMatches.length
);
```

`h1` 標頭應該從組件的 state 渲染 `submit` 字段的值。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyForm));
  const _1 = () => {
    mockedComponent.setState({ input: '' });
    mockedComponent.setState({ submit: '' });
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'TestInput' } });
    return mockedComponent.find('h1').text();
  };
  const _2 = () => {
    mockedComponent.find('form').simulate('submit');
    return mockedComponent.find('h1').text();
  };
  const before = _1();
  const after = _2();
  assert(before === '' && after === 'TestInput');
})();
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyForm />, document.getElementById('root'));
```

## --seed-contents--

```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    // Change code below this line

    // Change code above this line
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* Change code below this line */}

          {/* Change code above this line */}
          <button type='submit'>Submit!</button>
        </form>
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
}
```

# --solutions--

```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState(state => ({
      submit: state.input
    }));
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.input} onChange={this.handleChange} />
          <button type='submit'>Submit!</button>
        </form>
        <h1>{this.state.submit}</h1>
      </div>
    );
  }
}
```
