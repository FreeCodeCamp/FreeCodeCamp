---
id: 5a24c314108439a4d4036166
title: Creare componenti React
challengeType: 6
forumTopicId: 301381
dashedName: compose-react-components
---

# --description--

Dato che le sfide continuano a utilizzare composizioni più complesse di componenti React e JSX, c'è un punto importante da osservare. Il rendering di componenti di classe stile ES6 all'interno di altri componenti non è diverso dal render dei componenti semplici che hai usato nelle ultime sfide. All'interno di altri componenti puoi fare il render di elementi JSX, componenti funzionali senza stato, e componenti di classe ES6.

# --instructions--

Nell'editor di codice, il componente `TypesOfFood` sta già mostrando un componente chiamato `Vegetables`. Inoltre, c'è il componente `Fruits` preso dall'ultima sfida.

Annida due componenti all'interno di `Fruits` — prima `NonCitrus`, e poi `Citrus`. Entrambi questi componenti ti sono forniti dietro le quinte. Successivamente, annida il componente di classe `Fruits` nel componente `TypesOfFood`, sotto l'intestazione `h1` e sopra `Vegetables`. Il risultato dovrebbe essere una serie di componenti annidati, che utilizza due tipi di componenti diversi.

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

Il componente `TypesOfFood` dovrebbe restituire il componente `Fruits`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().childAt(1).name() === 'Fruits';
  })()
);
```

Il componente `Fruits` dovrebbe restituire il componente `NonCitrus` e il componente `Citrus`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return (
      mockedComponent.find('Fruits').children().find('NonCitrus').length ===
        1 &&
      mockedComponent.find('Fruits').children().find('Citrus').length === 1
    );
  })()
);
```

Il componente `TypesOfFood` dovrebbe restituire il componente `Vegetables` sotto il componente `Fruits`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().childAt(2).name() === 'Vegetables';
  })()
);
```

# --seed--

## --before-user-code--

```jsx
class NonCitrus extends React.Component {
  render() {
    return (
      <div>
        <h4>Non-Citrus:</h4>
        <ul>
          <li>Apples</li>
          <li>Blueberries</li>
          <li>Strawberries</li>
          <li>Bananas</li>
        </ul>
      </div>
    );
  }
};
class Citrus extends React.Component {
  render() {
    return (
      <div>
        <h4>Citrus:</h4>
        <ul>
          <li>Lemon</li>
          <li>Lime</li>
          <li>Orange</li>
          <li>Grapefruit</li>
        </ul>
      </div>
    );
  }
};
class Vegetables extends React.Component {
  render() {
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
     }
};
```

## --after-user-code--

```jsx
ReactDOM.render(<TypesOfFood />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class Fruits extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Fruits:</h2>
        { /* Change code below this line */ }

        { /* Change code above this line */ }
      </div>
    );
  }
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
        <Vegetables />
      </div>
    );
  }
};
```

# --solutions--

```jsx
class Fruits extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Fruits:</h2>
        { /* Change code below this line */ }
        <NonCitrus />
        <Citrus />
        { /* Change code above this line */ }
      </div>
    )
  }
}

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
          <Vegetables />
        </div>
      );
    }
};
```
