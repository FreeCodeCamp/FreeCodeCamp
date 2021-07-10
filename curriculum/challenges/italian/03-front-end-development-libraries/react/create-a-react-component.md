---
id: 5a24c314108439a4d4036163
title: Creare un componente React
challengeType: 6
forumTopicId: 301386
dashedName: create-a-react-component
---

# --description--

L'altro modo per definire un componente React è con la sintassi ES6 `class`. Nell'esempio seguente, `Kitten` estende `React.Component`:

```jsx
class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hi</h1>
    );
  }
}
```

Questo crea una classe ES6 `Kitten` che estende la classe `React.Component`. Così la classe `Kitten` ora ha accesso a molte funzionalità React utili, come lo stato locale e gli agganci del ciclo di vita. Non preoccuparti se non hai ancora familiarità con questi termini, saranno coperti in maggior dettaglio nelle sfide successive. Nota anche che la classe `Kitten` ha un `constructor` definito al suo interno che chiama `super()`. Esso usa `super()` per chiamare il costruttore della classe padre, in questo caso `React.Component`. Il costruttore è un metodo speciale usato durante l'inizializzazione degli oggetti creati con la parola chiave `class`. È buona pratica chiamare il `constructor` di un componente con `super` e passare le `props` ad entrambi. Questo assicura che il componente sia inizializzato correttamente. Per adesso, sappi che è uno standard includere questo codice. Presto vedrai altri usi per il costruttore e le `props`.

# --instructions--

`MyComponent` è definito nell'editor di codice usando la sintassi di classe. Termina la scrittura del metodo `render` in modo che restituisca un elemento `div` che contiene un `h1` con il testo `Hello React!`.

# --hints--

Il componente React dovrebbe restituire un elemento `div`.

```js
assert(Enzyme.shallow(React.createElement(MyComponent)).type() === 'div');
```

Il `div` restituito dovrebbe fare il render di un header `h1` al suo interno.

```js
assert(
  /<div><h1>.*<\/h1><\/div>/.test(
    Enzyme.shallow(React.createElement(MyComponent)).html()
  )
);
```

L'intestazione `h1` dovrebbe contenere la stringa `Hello React!`.

```js
assert(
  Enzyme.shallow(React.createElement(MyComponent)).html() ===
    '<div><h1>Hello React!</h1></div>'
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyComponent />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Change code below this line



    // Change code above this line
  }
};
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Change code below this line
    return (
      <div>
        <h1>Hello React!</h1>
      </div>
    );
    // Change code above this line
  }
};
```
