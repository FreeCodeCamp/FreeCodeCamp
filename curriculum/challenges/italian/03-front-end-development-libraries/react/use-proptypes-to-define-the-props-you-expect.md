---
id: 5a24c314108439a4d403616d
title: Usare i PropTypes per definire le Prop attese
challengeType: 6
forumTopicId: 301419
dashedName: use-proptypes-to-define-the-props-you-expect
---

# --description--

React fornisce utili funzioni di verifica del tipo per verificare che i componenti ricevano proprietà del tipo corretto. Ad esempio, la tua applicazione effettua una chiamata API per recuperare dei dati che ti aspetti essere in un array, che viene poi passato a un componente come proprietà. Puoi impostare `propTypes` sul tuo componente per richiedere che i dati siano di tipo `array`. Questo generà un avviso utile quando i dati saranno di qualsiasi altro tipo.

È considerata una buona pratica impostare `propTypes` quando si conosce il tipo di una prop in anticipo. Puoi definire una proprietà `propTypes` per un componente nello stesso modo in cui hai definito `defaultProps`. In questo modo si verificherà che la prop con una data chiave sia presenti con un dato tipo. Ecco un esempio per richiedere il tipo `function` per una prop chiamata `handleClick`:

```js
MyComponent.propTypes = { handleClick: PropTypes.func.isRequired }
```

Nell'esempio sopra, la parte `PropTypes.func` controlla che `handleClick` sia una funzione. Aggiungendo `isRequired` si dice a React che `handleClick` è una proprietà richiesta per quel componente. Se quella prop non è fornita vedrai un avviso. Nota anche che `func` rappresenta `function`. Tra i sette tipi primitivi JavaScript, `function` e `boolean` (scritto come `bool`) sono gli unici che usano un'ortografia insolita. Oltre ai tipi primitivi, ci sono altri tipi disponibili. Ad esempio, puoi controllare che una prop sia un elemento React. Fai riferimento alla [documentazione](https://reactjs.org/docs/jsx-in-depth.html#specifying-the-react-element-type) per tutte le opzioni.

**Nota:** A partire da React v15.5.0, `PropTypes` viene importato indipendentemente da React, in questo modo: `import PropTypes from 'prop-types';`

# --instructions--

Definisci `propTypes` in modo che il componente `Items` richieda `quantity` come prop e verifica che sia di tipo `number`.

# --hints--

Il componente `ShoppingCart` dovrebbe essere presentato.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('ShoppingCart').length === 1;
  })()
);
```

Il componente `Items` dovrebbe essere presentato.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('Items').length === 1;
  })()
);
```

Il componente `Items` dovrebbe includere un controllo di `propTypes` per richiedere un valore per `quantity` e assicurarsi che il suo valore sia un numero.

```js
(getUserInput) =>
  assert(
    (function () {
      const noWhiteSpace = __helpers.removeWhiteSpace(getUserInput('index'));
      return (
        noWhiteSpace.includes('quantity:PropTypes.number.isRequired') &&
        noWhiteSpace.includes('Items.propTypes=')
      );
    })()
  );
```

# --seed--

## --before-user-code--

```jsx
var PropTypes = {
  number: { isRequired: true }
};
```

## --after-user-code--

```jsx
ReactDOM.render(<ShoppingCart />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

// Change code below this line

// Change code above this line

Items.defaultProps = {
  quantity: 0
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Items />
  }
};
```

# --solutions--

```jsx
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

// Change code below this line
Items.propTypes = {
  quantity: PropTypes.number.isRequired
};
// Change code above this line

Items.defaultProps = {
  quantity: 0
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Items />
  }
};
```
