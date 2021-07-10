---
id: 5a24c314108439a4d4036176
title: Usare lo stato per attivare e disattivare un elemento
challengeType: 6
forumTopicId: 301421
dashedName: use-state-to-toggle-an-element
---

# --description--

A volte potrebbe essere necessario conoscere lo stato precedente quando si aggiorna lo stato. Tuttavia, gli aggiornamenti dello stato possono essere asincroni - questo significa che React può raggruppare più chiamate `setState()` in un singolo aggiornamento. Questo significa che non puoi fare affidamento sul valore precedente di `this.state` o di `this.props` quando calcoli il valore successivo. Quindi, non si dovrebbe utilizzare il codice in questo modo:

```jsx
this.setState({
  counter: this.state.counter + this.props.increment
});
```

Invece, dovresti passare a `setState` una funzione che ti permetta di accedere a stato e props. L'utilizzo di una funzione con `setState` garantisce che si sta lavorando con i valori più aggiornati di stato e props. Questo significa che quanto sopra dovrebbe essere riscritto come:

```jsx
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

Puoi anche usare una forma senza `props` se hai bisogno solo dello `state`:

```jsx
this.setState(state => ({
  counter: state.counter + 1
}));
```

Nota che devi avvolgere l'oggetto letterale tra parentesi, altrimenti JavaScript pensa che sia un blocco di codice.

# --instructions--

`MyComponent` ha una proprietà `visibility` che viene inizializzata a `false`. Il metodo render restituisce una vista se il valore di `visibility` è true, e una vista diversa se è false.

Attualmente, non c'è modo di aggiornare la proprietà `visibility` nello `state` del componente. Il valore dovrebbe commutare avanti e indietro tra vero e falso. C'è un gestore di click sul bottone che attiva un metodo di classe chiamato `toggleVisibility()`. Passa una funzione a `setState` per definire questo metodo in modo che lo `state` di `visibility` commuti al valore opposto quando viene chiamato il metodo. Se `visibility` è `false`, il metodo lo imposta a `true`, e viceversa.

Infine, fai click sul pulsante per vedere il rendering condizionale del componente in base al suo `state`.

**Suggerimento:** Non dimenticare di associare la parola chiave `this` al metodo nel `constructor`!

# --hints--

`MyComponent` dovrebbe restituire un elemento `div` che contiene un `button`.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(MyComponent)).find('div').find('button')
    .length,
  1
);
```

Lo stato di `MyComponent` dovrebbe essere inizializzato con una proprietà `visibility` impostata su `false`.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(MyComponent)).state('visibility'),
  false
);
```

Cliccando sul bottone si dovrebbe commutare la proprietà `visibility` nello stato, tra i due valori `true` e `false`.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ visibility: false });
    return mockedComponent.state('visibility');
  };
  const second = () => {
    mockedComponent.find('button').simulate('click');
    return mockedComponent.state('visibility');
  };
  const third = () => {
    mockedComponent.find('button').simulate('click');
    return mockedComponent.state('visibility');
  };
  const firstValue = first();
  const secondValue = second();
  const thirdValue = third();
  assert(!firstValue && secondValue && !thirdValue);
})();
```

Una funzione anonima dovrebbe essere passata a `setState`.

```js
const paramRegex = '[a-zA-Z$_]\\w*(,[a-zA-Z$_]\\w*)?';
assert(
  new RegExp(
    'this\\.setState\\((function\\(' +
      paramRegex +
      '\\){|([a-zA-Z$_]\\w*|\\(' +
      paramRegex +
      '\\))=>)'
  ).test(__helpers.removeWhiteSpace(code))
);
```

`this` non dovrebbe essere usato all'interno di `setState`

```js
assert(!/this\.setState\([^}]*this/.test(code));
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyComponent />, document.getElementById('root'));
```

## --seed-contents--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    // Change code below this line

    // Change code above this line
  }
  // Change code below this line

  // Change code above this line
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
}
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  toggleVisibility() {
    this.setState(state => ({
      visibility: !state.visibility
    }));
  }
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
}
```
