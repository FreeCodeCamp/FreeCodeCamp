---
id: 5a24c314108439a4d4036168
title: Scrivere un componente React da zero
challengeType: 6
forumTopicId: 301424
dashedName: write-a-react-component-from-scratch
---

# --description--

Ora che hai imparato le basi dei componenti JSX e React, è il momento di scrivere un componente da solo. I componenti di React sono gli elementi fondamentali delle applicazioni React quindi è importante acquisire familiarità con la loro scrittura. Ricorda, un componente React tipico è una `class` ES6 che estende `React.Component`. Essa ha un metodo render che restituisce HTML (da JSX) o `null`. Questa è la forma di base di una componente React. Una volta che avrai capito bene questo, sarai pronto a iniziare a costruire progetti React più complessi.

# --instructions--

Definisci una classe `MyComponent` che estenda `React.Component`. Il suo metodo render dovrebbe restituire un `div` che contiene un tag `h1` con il testo: `My First React Component!` in esso. Usa questo testo esattamente, le maiuscole e la punteggiatura contano. Assicurati di chiamare anche il costruttore per il tuo componente.

Presenta questo componente nel DOM usando `ReactDOM.render()`. C'è un `div` con `id='challenge-node'` pronto all'uso per te.

# --hints--

Ci dovrebbe essere un componente React chiamato `MyComponent`.

```js
(getUserInput) =>
  assert(
    __helpers
      .removeWhiteSpace(getUserInput('index'))
      .includes('classMyComponentextendsReact.Component{')
  );
```

`MyComponent` dovrebbe contenere un tag `h1` con testo `My First React Component!` Maiuscole e punteggiatura contano.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('h1').text() === 'My First React Component!';
  })()
);
```

`MyComponent` dovrebbe essere presentato nel DOM.

```js
assert(document.getElementById('challenge-node').childNodes.length === 1);
```

`MyComponent` dovrebbe avere un costruttore che chiama `super` con `props`.

```js
assert(
  MyComponent.toString().includes('MyComponent(props)') &&
    MyComponent.toString().includes('_super.call(this, props)')
);
```

# --seed--

## --seed-contents--

```jsx
// Change code below this line
```

# --solutions--

```jsx
// Change code below this line
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>My First React Component!</h1>
      </div>
    );
  }
};

ReactDOM.render(<MyComponent />, document.getElementById('challenge-node'));
```
