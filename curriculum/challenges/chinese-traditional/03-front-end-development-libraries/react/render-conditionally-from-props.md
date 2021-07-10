---
id: 5a24c314108439a4d4036188
title: 根據 Props 有條件地渲染
challengeType: 6
forumTopicId: 301405
dashedName: render-conditionally-from-props
---

# --description--

到目前爲止，你已經看到如何使用 `if/else`、`&&` 以及三元運算符（`condition ? expressionIfTrue : expressionIfFalse`）在不同條件下運行不同的代碼。 然而，還有一個重要的話題需要討論，將這些概念中的任何一個或所有概念與另一個強大的 React 功能 props 結合起來。 使用 props 有條件地渲染代碼在 React 開發人員中很常見——也就是說：他們使用給定 prop 的值來自動決定渲染什麼。

在這個挑戰中，將設置一個子組件來根據 props 做出渲染決定。 可以使用三元運算符，但是可以看到過去幾個挑戰中涵蓋的其他幾個概念在這種情況下可能同樣有用。

# --instructions--

代碼編輯器有兩個部分爲你定義的組件：一個名爲 `GameOfChance` 的父組件和一個名爲 `Results` 的子組件。 它們被用來創建一個簡單的遊戲，用戶按下按鈕來看它們是贏還是輸。

首先，需要一個簡單的表達式，每次運行時都會隨機返回一個不同的值。 可以使用 `Math.random()`。 每次調用此方法時，此方法返回 `0`（包括）和 `1`（不包括）之間的值。 因此，對於50/50的機率，請在表達式中使用 `Math.random() >= .5`。 從統計學上講，這個表達式有 50％ 的機率返回 `true`，另外 50％ 返回 `false`。 在第 render 方法裏，用此表達式替換 `null` 以完成變量聲明。

現在了一個表達式，可以使用該表達式在代碼中做出隨機決策。 接下來，需要實現此功能。 將 `Results` 組件渲染爲 `GameOfChance` 的子 組件，並將 `expression` 作爲名爲 `fiftyFifty` 的 prop 傳入 。 在 `Results` 組件中，編寫一個三元表達式來渲染 `h1` 元素的文本。`GameOfChance` 傳來的 prop `fiftyFifty` 來決定渲染文本 `You Win!` 還是 `You Lose!`。 最後，確保 `handleClick()` 方法正確計算每個回合，以便用戶知道他們玩過多少次。 這也可以讓用戶知道組件實際上已經更新，以防他們連續贏兩次或輸兩次時自己不知道。

# --hints--

`GameOfChance` 組件應該存在並渲染到頁面。

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).find('GameOfChance').length,
  1
);
```

`GameOfChance` 應該返回單個 `button` 元素。

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).find('button').length,
  1
);
```

`GameOfChance` 應該返回 `Results` 組件的一個實例，它有一個名爲 `fiftyFifty` 的 prop。

```js
assert(
  Enzyme.mount(React.createElement(GameOfChance)).find('Results').length ===
    1 &&
    Enzyme.mount(React.createElement(GameOfChance))
      .find('Results')
      .props()
      .hasOwnProperty('fiftyFifty') === true
);
```

`GameOfChance` 的 state 應該使用值爲 `1` 的 `counter` 屬性來初始化。

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).state().counter,
  1
);
```

當 `GameOfChance` 組件第一次渲染到 DOM 時，應該返回一個 `p` 元素，其內部文本爲 `Turn: 1`。

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).find('p').text(),
  'Turn: 1'
);
```

每次點擊按鈕，counter 應該增加 1，並且一個包含文本 `Turn: N` 的 `p` 元素應該渲染到 DOM，其中 `N` 是 counter 的值。

```js
(() => {
  const comp = Enzyme.mount(React.createElement(GameOfChance));
  const simulate = () => {
    comp.find('button').simulate('click');
  };
  const result = () => ({
    count: comp.state('counter'),
    text: comp.find('p').text()
  });
  const _1 = () => {
    simulate();
    return result();
  };
  const _2 = () => {
    simulate();
    return result();
  };
  const _3 = () => {
    simulate();
    return result();
  };
  const _4 = () => {
    simulate();
    return result();
  };
  const _5 = () => {
    simulate();
    return result();
  };
  const _1_val = _1();
  const _2_val = _2();
  const _3_val = _3();
  const _4_val = _4();
  const _5_val = _5();
  assert(
    _1_val.count === 2 &&
      _1_val.text === 'Turn: 2' &&
      _2_val.count === 3 &&
      _2_val.text === 'Turn: 3' &&
      _3_val.count === 4 &&
      _3_val.text === 'Turn: 4' &&
      _4_val.count === 5 &&
      _4_val.text === 'Turn: 5' &&
      _5_val.count === 6 &&
      _5_val.text === 'Turn: 6'
  );
})();
```

當 `GameOfChance` 組件第一次掛載到 DOM 上時，每次按鈕被點擊，都應該返回一個 `h1` 元素，元素中隨機渲染 `You Win!` 或者 `You Lose!`。

```js
(() => {
  const comp = Enzyme.mount(React.createElement(GameOfChance));
  const simulate = () => {
    comp.find('button').simulate('click');
  };
  const result = () => ({
    h1: comp.find('h1').length,
    text: comp.find('h1').text()
  });
  const _1 = result();
  const _2 = () => {
    simulate();
    return result();
  };
  const _3 = () => {
    simulate();
    return result();
  };
  const _4 = () => {
    simulate();
    return result();
  };
  const _5 = () => {
    simulate();
    return result();
  };
  const _6 = () => {
    simulate();
    return result();
  };
  const _7 = () => {
    simulate();
    return result();
  };
  const _8 = () => {
    simulate();
    return result();
  };
  const _9 = () => {
    simulate();
    return result();
  };
  const _10 = () => {
    simulate();
    return result();
  };
  const _2_val = _2();
  const _3_val = _3();
  const _4_val = _4();
  const _5_val = _5();
  const _6_val = _6();
  const _7_val = _7();
  const _8_val = _8();
  const _9_val = _9();
  const _10_val = _10();
  const __text = new Set([
    _1.text,
    _2_val.text,
    _3_val.text,
    _4_val.text,
    _5_val.text,
    _6_val.text,
    _7_val.text,
    _8_val.text,
    _9_val.text,
    _10_val.text
  ]);
  const __h1 = new Set([
    _1.h1,
    _2_val.h1,
    _3_val.h1,
    _4_val.h1,
    _5_val.h1,
    _6_val.h1,
    _7_val.h1,
    _8_val.h1,
    _9_val.h1,
    _10_val.h1
  ]);
  assert(__text.size === 2 && __h1.size === 1);
})();
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<GameOfChance />, document.getElementById('root'));
```

## --seed-contents--

```jsx
class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    {/* Change code below this line */}
    return <h1></h1>;
    {/* Change code above this line */}
  }
}

class GameOfChance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => {
      // Complete the return statement:
      return {
        counter: prevState
      }
    });
  }
  render() {
    const expression = null; // Change this line
    return (
      <div>
        <button onClick={this.handleClick}>Play Again</button>
        {/* Change code below this line */}

        {/* Change code above this line */}
        <p>{'Turn: ' + this.state.counter}</p>
      </div>
    );
  }
}
```

# --solutions--

```jsx
class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>{this.props.fiftyFifty ? 'You Win!' : 'You Lose!'}</h1>;
  }
}

class GameOfChance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => {
      return {
        counter: prevState.counter + 1
      }
    });
  }
  render() {
    const expression = Math.random() >= 0.5;
    return (
      <div>
        <button onClick={this.handleClick}>Play Again</button>
        <Results fiftyFifty={expression} />
        <p>{'Turn: ' + this.state.counter}</p>
      </div>
    );
  }
}
```
