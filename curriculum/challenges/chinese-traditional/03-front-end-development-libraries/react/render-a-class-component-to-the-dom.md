---
id: 5a24c314108439a4d4036167
title: 將 class 組件渲染到 DOM 樹
challengeType: 6
forumTopicId: 301404
dashedName: render-a-class-component-to-the-dom
---

# --description--

還記不記得在之前的挑戰中使用 ReactDOM API 將 JSX 元素渲染到 DOM， 這與渲染 React 組件的過程十分相似。 過去的幾個挑戰主要針對組件和組合，因此渲染是在幕後完成的。 但是，如果不調用 ReactDOM API，編寫的任何 React 代碼都不會渲染到 DOM。

複習一下語法： `ReactDOM.render(componentToRender, targetNode)`。 第一個參數是要渲染的 React 組件。 第二個參數是要在其中渲染該組件的 DOM 節點。

傳遞到`ReactDOM.render()` 的React 組件與 JSX 元素略有不同。 對於 JSX 元素，傳入的是要渲染的元素的名稱。 但是，對於 React 組件，需要使用與渲染嵌套組件相同的語法，例如`ReactDOM.render(<ComponentToRender />, targetNode)`。 此語法用於 ES6 class 組件和函數組件都可以。

# --instructions--

在後臺引入了 `Fruits` 和 `Vegetables` 組件。 將兩個組件渲染爲 `TypesOfFood` 組件的子組件，然後將 `TypesOfFood` 渲染到 DOM 節點， 在這個挑戰中，請渲染到 `id='challenge-node'`的 `div` 中。

# --hints--

`TypesOfFood` 組件應該返回單個 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().type() === 'div';
  })()
);
```

`TypesOfFood` 組件應該在 `h1` 元素之後渲染 `Fruits` 組件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().childAt(1).name() === 'Fruits';
  })()
);
```

`TypesOfFood` 組件應該在 `Fruits` 組件之後渲染 `Vegetables` 組件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().childAt(2).name() === 'Vegetables';
  })()
);
```

`TypesOfFood` 組件應該渲染到 id 爲 `challenge-node` 的 `div`中。

```js
assert(
  (function () {
    const html = document.getElementById('challenge-node').childNodes[0]
      .innerHTML;
    return (
      html.includes(
        '<div><h2>Fruits:</h2><h4>Non-Citrus:</h4><ul><li>Apples</li><li>Blueberries</li><li>Strawberries</li><li>Bananas</li></ul><h4>Citrus:</h4><ul><li>Lemon</li><li>Lime</li><li>Orange</li><li>Grapefruit</li></ul></div>'
      ) &&
      html.includes(
        '<div><h2>Vegetables:</h2><ul><li>Brussel Sprouts</li><li>Broccoli</li><li>Squash</li></ul></div>'
      )
    );
  })()
);
```

# --seed--

## --before-user-code--

```jsx
const Fruits = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <h4>Non-Citrus:</h4>
        <ul>
          <li>Apples</li>
          <li>Blueberries</li>
          <li>Strawberries</li>
          <li>Bananas</li>
        </ul>
      <h4>Citrus:</h4>
        <ul>
          <li>Lemon</li>
          <li>Lime</li>
          <li>Orange</li>
          <li>Grapefruit</li>
        </ul>
    </div>
  );
};
const Vegetables = () => {
  return (
    <div>
      <h2>Vegetables:</h2>
      <ul>
        <li>Brussel Sprouts</li>
        <li>Broccoli</li>
        <li>Squash</li>
      </ul>
    </div>
  );
};
```

## --seed-contents--

```jsx
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
};

// Change code below this line
```

# --solutions--

```jsx
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}
          <Fruits />
           <Vegetables />
         {/* Change code above this line */}
      </div>
    );
  }
};

// Change code below this line
ReactDOM.render(<TypesOfFood />, document.getElementById('challenge-node'));
```
