---
id: 5a24c314108439a4d4036187
title: 使用三元表达式进行条件渲染
challengeType: 6
forumTopicId: 301414
dashedName: use-a-ternary-expression-for-conditional-rendering
---

# --description--

在继续使用动态渲染技术之前，还有最后一种方法可以渲染想要的东西，它使用内置的 JavaScript 条件：<dfn>三元运算符</dfn>。 三元运算符经常被用作 JavaScript 中 `if/else` 语句的缩写。 它们不像传统的 `if/else` 语句那样强大，但是在 React 开发人员中非常流行， 原因之一就是 JSX 的编译原理，`if/else` 语句不能直接插入到 JSX 代码中。 可能你在前几个挑战就注意到了这一点——当需要 `if/else` 语句时，它总是在 `return` 语句的*外面*。 如果想在 JSX 中实现条件逻辑，三元表达式是一个很好的选择。 回想一下，三元运算符有三个部分，但是可以将多个三元表达式组合在一起。 以下是基本语法：

```jsx
condition ? expressionIfTrue : expressionIfFalse;
```

# --instructions--

代码编辑器在 `CheckUserAge` 组件的 `render()` 方法中定义了三个常量， 它们分别是 `buttonOne`、`buttonTwo` 和 `buttonThree`。 每个都分配了一个表示按钮元素的简单 JSX 表达式。 首先，使用 `input` 和 `userAge` 初始化 `CheckUserAge` 的 state，并将其值设置为空字符串。

一旦组件将信息渲染给页面，用户应该有一种方法与之交互。 在组件的 `return` 语句中，设置一个实现以下逻辑的三元表达式：当页面首次加载时，将提交按钮 `buttonOne` 渲染到页面。 然后，当用户输入年龄并点击该按钮时，根据年龄渲染不同的按钮。 如果用户输入的数字小于`18`，则渲染`buttonThree`。 如果用户输入的数字大于或等于`18`，则渲染`buttonTwo`。

# --hints--

`CheckUserAge` 组件应该渲染出单个 `input` 元素和单个 `button` 元素。

```js
assert(
  Enzyme.mount(React.createElement(CheckUserAge)).find('div').find('input')
    .length === 1 &&
    Enzyme.mount(React.createElement(CheckUserAge)).find('div').find('button')
      .length === 1
);
```

`CheckUserAge` 组件的 state 应该用 `userAge` 属性和 `input` 属性初始化，并且这两个属性的值都被设置为空字符串。

```js
assert(
  Enzyme.mount(React.createElement(CheckUserAge)).state().input === '' &&
    Enzyme.mount(React.createElement(CheckUserAge)).state().userAge === ''
);
```

当 `CheckUserAge` 组件首次渲染到 DOM 时，`button` 内部的文本应为 Submit。

```js
assert(
  Enzyme.mount(React.createElement(CheckUserAge)).find('button').text() ===
    'Submit'
);
```

当小于 18 的数字输入到 `input` 元素中，并点击该`button` 时，该 `button` 的内部文本应该是 `You Shall Not Pass`。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(CheckUserAge));
  const initialButton = mockedComponent.find('button').text();
  const enter3AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '3' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const enter17AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '17' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const userAge3 = enter3AndClickButton();
  const userAge17 = enter17AndClickButton();
  assert(
    initialButton === 'Submit' &&
      userAge3 === 'You Shall Not Pass' &&
      userAge17 === 'You Shall Not Pass'
  );
})();
```

当大于或等于 18 的数字输入到 `input` 元素中，并点击该 `button` 时，该 `button` 的内部文本应该是 `You May Enter`。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(CheckUserAge));
  const initialButton = mockedComponent.find('button').text();
  const enter18AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '18' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const enter35AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '35' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const userAge18 = enter18AndClickButton();
  const userAge35 = enter35AndClickButton();
  assert(
    initialButton === 'Submit' &&
      userAge18 === 'You May Enter' &&
      userAge35 === 'You May Enter'
  );
})();
```

提交了一个数字之后，并再次更改了 `input` 的值，该 `button` 内部文本应该变回 `Submit`。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(CheckUserAge));
  const enter18AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '18' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const changeInputDontClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '5' } });
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const enter10AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '10' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const userAge18 = enter18AndClickButton();
  const changeInput1 = changeInputDontClickButton();
  const userAge10 = enter10AndClickButton();
  const changeInput2 = changeInputDontClickButton();
  assert(
    userAge18 === 'You May Enter' &&
      changeInput1 === 'Submit' &&
      userAge10 === 'You Shall Not Pass' &&
      changeInput2 === 'Submit'
  );
})();
```

你的代码不应该包含任何 `if/else` 语句。

```js
assert(
  new RegExp(/(\s|;)if(\s|\()/).test(
    Enzyme.mount(React.createElement(CheckUserAge)).instance().render.toString()
  ) === false
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<CheckUserAge />, document.getElementById('root'));
```

## --seed-contents--

```jsx
const inputStyle = {
  width: 235,
  margin: 5
};

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    // Change code below this line

    // Change code above this line
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
}
```

# --solutions--

```jsx
const inputStyle = {
  width: 235,
  margin: 5
};

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAge: '',
      input: ''
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {this.state.userAge === ''
          ? buttonOne
          : this.state.userAge >= 18
          ? buttonTwo
          : buttonThree}
      </div>
    );
  }
}
```
