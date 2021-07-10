---
id: 5a24c314108439a4d4036172
title: Presentare lo stato nell'interfaccia utente in un altro modo
challengeType: 6
forumTopicId: 301408
dashedName: render-state-in-the-user-interface-another-way
---

# --description--

C'è un altro modo per accedere allo `state` in un componente. Nel metodo `render()`, prima dell'istruzione `return`, è possibile scrivere direttamente del JavaScript. Ad esempio, è possibile dichiarare funzioni, accedere ai dati da `state` o `props`, eseguire calcoli su questi dati, e così via. Poi, puoi assegnare qualsiasi dato alle variabili a cui hai accesso nell'istruzione `return`.

# --instructions--

Nel metodo di rendering `MyComponent`, definisci una `const` chiamata `name` e impostala al valore di name nello `state` del componente. Poiché in questa parte del codice è possibile scrivere direttamente in JavaScript, non è necessario racchiudere questo riferimento tra parentesi graffe.

Successivamente, nell'istruzione return, presenta questo valore in un tag `h1` utilizzando la variabile `name`. Ricorda però che nell'istruzione return dovrai utilizzare la sintassi JSX (parentesi graffe per il JavaScript).

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

Il tag `h1` presentato dovrebbe includere un riferimento a `{name}`.

```js
(getUserInput) =>
  assert(/<h1>\n*\s*\{\s*name\s*\}\s*\n*<\/h1>/.test(getUserInput('index')));
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
  assert(firstValue === '<div><h1>TestName</h1></div>');
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
    // Change code below this line

    // Change code above this line
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
    // Change code below this line
    const name = this.state.name;
    // Change code above this line
    return (
      <div>
        { /* Change code below this line */ }
        <h1>{name}</h1>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
