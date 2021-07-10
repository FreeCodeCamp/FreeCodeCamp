---
id: 5a24c314108439a4d4036167
title: Presentare un componente di classe nel DOM
challengeType: 6
forumTopicId: 301404
dashedName: render-a-class-component-to-the-dom
---

# --description--

Potresti ricordare l'uso dell'API ReactDOM in una sfida precedente, usata per fare il render degli elementi JSX nel DOM. Il processo di rendering dei componenti di React sarà molto simile. Le poche sfide viste finora si sono concentrate su componenti e composizione, e il rendering è stato fatto per te dietro le quinte. Tuttavia, niente del codice React che scrivi sarà presentato nel DOM senza effettuare una chiamata all'API ReactDOM.

Ecco un ripasso della sintassi: `ReactDOM.render(componentToRender, targetNode)`. Il primo argomento è il componente React che si desidera presentare. Il secondo argomento è il nodo del DOM all'interno del quale si desidera fare il render di quel componente.

I componenti React sono passati in `ReactDOM.render()` in modo un po' diverso dagli elementi JSX. Per gli elementi JSX, passi il nome dell'elemento che desideri presentare. Tuttavia, per i componenti React, è necessario utilizzare la stessa sintassi come se si stesse presentando un componente nidificato, ad esempio `ReactDOM.render(<ComponentToRender />, targetNode)`. Si utilizza questa sintassi sia per i componenti di classe ES6 che per i componenti funzionali.

# --instructions--

I componenti `Fruits` e `Vegetables` sono definiti per te dietro le quinte. Presenta entrambi i componenti come figli del componente `TypesOfFood`, quindi presenta `TypesOfFood` nel DOM. C'è un `div` con `id='challenge-node'` pronto all'uso per te.

# --hints--

Il componente `TypesOfFood` dovrebbe restituire un singolo elemento `div`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().type() === 'div';
  })()
);
```

Il componente `TypesOfFood` dovrebbe presentare il componente `Fruits` dopo l'elemento `h1`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().childAt(1).name() === 'Fruits';
  })()
);
```

Il componente `TypesOfFood` dovrebbe presentare il componente `Vegetables` dopo `Fruits`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().childAt(2).name() === 'Vegetables';
  })()
);
```

Il componente `TypesOfFood` dovrebbe essere presentato nel DOM all'interno del `div` con l'id `challenge-node`.

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
