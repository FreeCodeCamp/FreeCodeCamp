---
id: 5a24c314108439a4d4036185
title: Usare && per un condizionale più conciso
challengeType: 6
forumTopicId: 301413
dashedName: use--for-a-more-concise-conditional
---

# --description--

Le istruzioni `if/else` hanno funzionato nell'ultima sfida, ma c'è un modo più conciso per raggiungere lo stesso risultato. Immagina di dover tracciare diverse condizioni in un componente e di volere che elementi differenti siano presentati a seconda di ciascuna di queste condizioni. Se scrivi un sacco di istruzioni `else if` per restituire interfacce utente leggermente diverse, puoi dover ripetere il codice lasciando spazio a degli errori. Puoi invece utilizzare l'operatore logico `&&` per eseguire la logica condizionale in modo più conciso. Questo è possibile perché si desidera controllare se una condizione è `true`, e se è così, restituire qualche markup. Ecco un esempio:

```jsx
{condition && <p>markup</p>}
```

Se la `condition` è `true`, il markup verrà restituito. Se la condizione è `false`, l'operazione restituirà immediatamente `false` dopo aver valutato la `condition` e non restituirà nulla. Puoi includere queste istruzioni direttamente nel tuo JSX e legando più condizioni insieme scrivendo `&&` dopo ognuna. Questo ti permette di gestire una logica condizionale più complessa nel tuo metodo `render()` senza ripetere un sacco di codice.

# --instructions--

Risolvi nuovamente l'esempio precedente, in modo che `h1` venga presentato solo se `display` è `true`, ma usa l'operatore logico `&&` invece di un'istruzione `if/else`.

# --hints--

`MyComponent` dovrebbe esistere ed effettuare il render.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('MyComponent').length;
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
    updated.find('div').length === 1 &&
      updated.find('div').children().length === 2 &&
      updated.find('button').length === 1 &&
      updated.find('h1').length === 1
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
    updated.find('div').length === 1 &&
      updated.find('div').children().length === 1 &&
      updated.find('button').length === 1 &&
      updated.find('h1').length === 0
  );
};
```

Il metodo render dovrebbe utilizzare l'operatore logico `&&` per controllare la condizione di `this.state.display`.

```js
(getUserInput) => assert(getUserInput('index').includes('&&'));
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
    this.setState(state => ({
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
    this.setState(state => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         {this.state.display && <h1>Displayed!</h1>}
       </div>
    );
  }
};
```
