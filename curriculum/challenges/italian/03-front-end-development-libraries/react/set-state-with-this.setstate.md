---
id: 5a24c314108439a4d4036173
title: Impostare lo stato con this.setState
challengeType: 6
forumTopicId: 301412
dashedName: set-state-with-this-setstate
---

# --description--

Le sfide precedenti riguardavano il componente `state` e come inizializzare lo stato nel `constructor`. C'è anche un modo per cambiare lo `state` del componente. React fornisce un metodo per l'aggiornamento dello `state` del componente chiamato `setState`. Chiamerai il metodo `setState` all'interno della classe component in questo modo: `this.setState()`, passandogli un oggetto con coppie chiave-valore. Le chiavi sono le proprietà dello stato e i valori sono i dati dello stato aggiornato. Per esempio, se stessimo memorizzando uno `username` nello stato e volessimo aggiornarlo, potremmo fare così:

```jsx
this.setState({
  username: 'Lewis'
});
```

React si aspetta che tu non modifichi mai lo `state` direttamente: usa sempre `this.setState()` quando si verificano cambiamenti di stato. Inoltre, dovresti notare che React può raggruppare più aggiornamenti di stato al fine di migliorare le prestazioni. Ciò significa che gli aggiornamenti di stato attraverso il metodo `setState` possono essere asincroni. C'è una sintassi alternativa per il metodo `setState` che fornisce un modo per aggirare questo problema. Questo raramente è necessario, ma è bene tenerlo in mente! Consulta la [Documentazione di React](https://facebook.github.io/react/docs/state-and-lifecycle.html) per ulteriori dettagli.

# --instructions--

C'è un elemento `button` nell'editor di codice che ha un gestore `onClick()`. Questo gestore viene attivato quando il `button` riceve un evento click nel browser, ed esegue il metodo `handleClick` definito in `MyComponent`. All'interno del metodo `handleClick`, aggiorna lo `state` del componente usando `this.setState()`. Imposta la proprietà `name` in `state` in modo che sia uguale alla stringa `React Rocks!`.

Fai clic sul bottone e guarda l'aggiornamento della presentazione dello stato. Non preoccuparti se ancora non capisci completamente come funziona il codice di gestione del click. Lo vedremo nelle prossime sfide.

# --hints--

Lo stato di `MyComponent` dovrebbe essere inizializzato con la coppia chiave/valore `{ name: Initial State }`.

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).state('name') ===
    'Initial State'
);
```

`MyComponent` dovrebbe presentare un'intestazione `h1`.

```js
assert(Enzyme.mount(React.createElement(MyComponent)).find('h1').length === 1);
```

L'intestazione `h1` dovrebbe contenere testo presentato dallo stato del componente.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ name: 'TestName' });
    return waitForIt(() => mockedComponent.html());
  };
  const firstValue = await first();
  assert(/<h1>TestName<\/h1>/.test(firstValue));
};
```

Chiamando il metodo `handleClick` su `MyComponent` si dovrebbe impostare la proprietà name nello stato sulla stringa `React Rocks!`.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ name: 'Before' });
    return waitForIt(() => mockedComponent.state('name'));
  };
  const second = () => {
    mockedComponent.instance().handleClick();
    return waitForIt(() => mockedComponent.state('name'));
  };
  const firstValue = await first();
  const secondValue = await second();
  assert(firstValue === 'Before' && secondValue === 'React Rocks!');
};
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
    this.state = {
      name: 'Initial State'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // Change code below this line

    // Change code above this line
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Initial State'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
     // Change code below this line
    this.setState({
      name: 'React Rocks!'
    });
    // Change code above this line
  }
  render() {
    return (
      <div>
        <button onClick = {this.handleClick}>Click Me</button>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```
