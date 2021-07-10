---
id: 5a24c314108439a4d4036165
title: 使用 React 渲染嵌套組件
challengeType: 6
forumTopicId: 301420
dashedName: use-react-to-render-nested-components
---

# --description--

上一個挑戰顯示了組合兩個組件的簡單方法，但是有許多不同的方法可以把 React 組件組合在一起。

組件組合是 React 的強大功能之一。 當使用 React 時，應當先用組件的思路考慮清楚用戶界面的結構（如上一個挑戰中的 App 示例）。 可以將 UI 分解爲基本的構建塊，這些構建塊就是組件。 這樣做有助於將負責 UI 的代碼與負責處理應用程序邏輯的代碼分開， 並可以大大簡化複雜項目的開發和維護。

# --instructions--

代碼編輯器中定義了兩個功能組件，分別是 `TypesOfFruit` 和 `Fruits`。 請用組合或者*嵌套*把 `TypesOfFruit` 組件放到 `Fruits` 組件中， 然後把 `Fruits` 組件放到 `TypesOfFood` 組件中。 結果應該是子組件嵌套在父組件中，父組件嵌套在它本身的父組件中！

# --hints--

`TypesOfFood` 組件應該返回單個 `div` 元素。

```js
assert(Enzyme.shallow(React.createElement(TypesOfFood)).type() === 'div');
```

`TypesOfFood` 組件應該返回 `Fruits` 組件。

```js
assert(
  Enzyme.shallow(React.createElement(TypesOfFood)).props().children[1].type
    .name === 'Fruits'
);
```

`Fruits` 組件應該返回 `TypesOfFruit` 組件。

```js
assert(
  Enzyme.mount(React.createElement(TypesOfFood)).find('h2').html() ===
    '<h2>Fruits:</h2>'
);
```

`TypesOfFruit` 組件應該返回 `h2` 和 `ul` 元素。

```js
assert(
  Enzyme.mount(React.createElement(TypesOfFood)).find('ul').text() ===
    'ApplesBlueberriesStrawberriesBananas'
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<TypesOfFood />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const TypesOfFruit = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <ul>
        <li>Apples</li>
        <li>Blueberries</li>
        <li>Strawberries</li>
        <li>Bananas</li>
      </ul>
    </div>
  );
};

const Fruits = () => {
  return (
    <div>
      { /* Change code below this line */ }

      { /* Change code above this line */ }
    </div>
  );
};

class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        { /* Change code below this line */ }

        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
const TypesOfFruit = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <ul>
        <li>Apples</li>
        <li>Blueberries</li>
        <li>Strawberries</li>
        <li>Bananas</li>
      </ul>
    </div>
  );
};

const Fruits = () => {
  return (
    <div>
      { /* Change code below this line */ }
        <TypesOfFruit />
      { /* Change code above this line */ }
    </div>
  );
};

class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        { /* Change code below this line */ }
        <Fruits />
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
