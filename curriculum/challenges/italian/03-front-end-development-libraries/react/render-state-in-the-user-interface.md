---
id: 5a24c314108439a4d4036171
title: Presentare lo stato nell'interfaccia utente
challengeType: 6
forumTopicId: 301409
dashedName: render-state-in-the-user-interface
---

# --description--

Una volta definito lo stato iniziale di un componente, è possibile visualizzarne qualsiasi parte nell'interfaccia utente che viene presentata. Se un componente è stateful, avrà sempre accesso ai dati dello `state` nel suo metodo `render()`. È possibile accedere ai dati con `this.state`.

Se desideri accedere a un valore di stato all'interno del `return` del metodo render, devi racchiudere il valore in parentesi graffe.

`state` è una delle caratteristiche più potenti dei componenti di React. Ti permette di tracciare dati importanti nella tua app e presentare un'interfaccia utente in risposta alle modifiche di questi dati. Se i tuoi dati cambiano, la tua interfaccia utente cambierà. React utilizza quello che viene chiamato un DOM (Document Object Model) virtuale, per tenere traccia dei cambiamenti dietro le quinte. Quando lo stato dei dati si aggiorna, si attiva un re-render dei componenti che utilizzano tali dati - compresi i componenti figli che hanno ricevuto i dati come proprietà. React aggiorna il DOM, ma solo se necessario. Questo significa che non devi preoccuparti di cambiare il DOM. Semplicemente dichiari come dovrebbe apparire l'interfaccia utente.

Nota che se fai un componente stateful, nessun altro componente è a conoscenza del suo `state`. Il suo `state` è completamente incapsulato, o locale a quel componente, a meno che non passi i dati di stato a un componente figlio come `props`. Questa nozione di `state` incapsulato è molto importante perché permette di scrivere una certa logica, e poi di avere quella logica contenuta e isolata in un unico punto del tuo codice.

# --instructions--

Nell'editor di codice, `MyComponent` è già stateful. Definisci un tag `h1` nel metodo render del componente che presenta il valore di `name` prendendolo dallo stato del componente.

**Nota:** L'elemento `h1` dovrebbe presentare solo il valore dallo `state` e nient'altro. In JSX, qualsiasi codice che scrivi tra parentesi graffe `{ }` sarà trattato come JavaScript. Quindi, per accedere al valore dallo `state` basta racchiudere il riferimento nelle parentesi graffe.

# --hints--

`MyComponent` dovrebbe avere una chiave `name` con valore `freeCodeCamp` memorizzato nel suo stato.

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).state('name') ===
    'freeCodeCamp'
);
```

`MyComponent` dovrebbe presentare un'intestazione `h1` racchiusa in un singolo `div`.

```js
assert(
  /<div><h1>.*<\/h1><\/div>/.test(
    Enzyme.mount(React.createElement(MyComponent)).html()
  )
);
```

L'intestazione `h1` dovrebbe contenere solo testo presentato dallo stato del componente.

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
  const getValue = firstValue.replace(/\s/g, '');
  assert(getValue === '<div><h1>TestName</h1></div>');
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
      name: 'freeCodeCamp'
    }
  }
  render() {
    return (
      <div>
        { /* Change code below this line */ }

        { /* Change code above this line */ }
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
      name: 'freeCodeCamp'
    }
  }
  render() {
    return (
      <div>
        { /* Change code below this line */ }
        <h1>{this.state.name}</h1>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
