---
id: 5a24c314108439a4d4036184
title: Presentare con una condizione If-Else
challengeType: 6
forumTopicId: 301410
dashedName: render-with-an-if-else-condition
---

# --description--

Un'altra applicazione dell'uso di JavaScript per controllare la vista presentata è quella di legare gli elementi che sono presentati ad una condizione. Quando la condizione è vera, una vista viene presentata. Quando è falsa, viene presentata una vista diversa. Puoi farlo con un comando `if/else` standard nel metodo `render()` di un componente React.

# --instructions--

MyComponent contiene un `boolean` nel suo stato che traccia se si desidera o meno visualizzare qualche elemento nell'interfaccia utente. Il `button` commuta lo stato di questo valore. Attualmente, esso presenta la stessa interfaccia utente ogni volta. Riscrivi il metodo `render()` con un'istruzione `if/else` in modo che se `display` è `true`, restituisca il markup corrente. Altrimenti, restituisci il markup senza l'elemento `h1`.

**Nota:** Devi scrivere un `if/else` per superare i test. L'uso dell'operatore ternario non supererà i test qui, anche se sarebbe corretto.

# --hints--

`MyComponent` dovrebbe esistere ed effettuare il render.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('MyComponent').length === 1;
  })()
);
```

Quando `display` è impostato a `true`, dovrebbero essere presentati un `div`, un `button` e un `h1`.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const state_1 = () => {
    mockedComponent.setState({ display: true });
    return waitForIt(() => mockedComponent);
  };
  const updated = await state_1();
  assert(
    mockedComponent.find('div').length === 1 &&
      mockedComponent.find('div').children().length === 2 &&
      mockedComponent.find('button').length === 1 &&
      mockedComponent.find('h1').length === 1
  );
};
```

Quando `display` è impostato su `false`, dovrebbero essere presentati solo un `div` e un `button`.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const state_1 = () => {
    mockedComponent.setState({ display: false });
    return waitForIt(() => mockedComponent);
  };
  const updated = await state_1();
  assert(
    mockedComponent.find('div').length === 1 &&
      mockedComponent.find('div').children().length === 1 &&
      mockedComponent.find('button').length === 1 &&
      mockedComponent.find('h1').length === 0
  );
};
```

Il metodo render dovrebbe utilizzare un'istruzione `if/else` per controllare la condizione di `this.state.display`.

```js
(getUserInput) =>
  assert(
    getUserInput('index').includes('if') &&
      getUserInput('index').includes('else')
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
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState((state) => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line

    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         <h1>Displayed!</h1>
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
      display: true
    }
 this.toggleDisplay = this.toggleDisplay.bind(this);
 }
  toggleDisplay() {
    this.setState((state) => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line
    if (this.state.display) {
      return (
         <div>
           <button onClick={this.toggleDisplay}>Toggle Display</button>
           <h1>Displayed!</h1>
         </div>
      );
    } else {
      return (
        <div>
           <button onClick={this.toggleDisplay}>Toggle Display</button>
         </div>
      );
    }
  }
};
```
