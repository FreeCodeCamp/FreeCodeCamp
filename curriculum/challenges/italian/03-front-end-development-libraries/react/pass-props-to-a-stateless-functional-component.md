---
id: 5a24c314108439a4d4036169
title: Passare proprietà a un componente funzionale senza stato
challengeType: 6
forumTopicId: 301402
dashedName: pass-props-to-a-stateless-functional-component
---

# --description--

Le sfide precedenti riguardavano la creazione e la composizione di elementi JSX, componenti funzionali e componenti ES6 di classe style in React. Con queste fondamenta, è il momento di guardare un'altra caratteristica molto comune in React: le **props**. In React, puoi passare props, o proprietà, a componenti figli. Diciamo che tu abbia un componente `App` che presenta un componente figlio chiamato `Welcome` che è un componente funzionale senza stato. Puoi passare a `Welcome` una proprietà `user` scrivendo:

```jsx
<App>
  <Welcome user='Mark' />
</App>
```

Utilizzi degli **attributi HTML personalizzati** creati da te e passati da React al componente. In questo caso, la proprietà `user` che hai creato viene passata al componente `Welcome`. Dal momento che `Welcome` è un componente funzionale senza stato, ha accesso a questo valore in questo modo:

```jsx
const Welcome = (props) => <h1>Hello, {props.user}!</h1>
```

È comune chiamare questo valore `props` e quando si tratta di componenti funzionali senza stato, lo consideri fondamentalmente come un argomento per una funzione che restituisce JSX. Puoi accedere al valore dell'argomento nel corpo della funzione. Con i componenti di classe, vedrai che questo è un po' diverso.

# --instructions--

Nell'editor di codice ci sono i componenti `Calendar` e `CurrentDate`. Quando fai il rendering di `CurrentDate` dal componente `Calendar`, passagli una proprietà `date` assegnata alla data corrente dall'oggetto `Date` di JavaScript. Quindi accedi a questa `prop` nel componente `CurrentDate`, mostrandone il valore all'interno dei tag `p`. Nota che affinché i valori `prop` siano valutati come JavaScript, devono essere racchiusi tra parentesi graffe, ad esempio `date={Date()}`.

# --hints--

Il componente `Calendar` dovrebbe restituire un singolo elemento `div`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(Calendar));
    return mockedComponent.children().type() === 'div';
  })()
);
```

Il secondo figlio del componente `Calendar` dovrebbe essere il componente `CurrentDate`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(Calendar));
    return mockedComponent.children().childAt(1).name() === 'CurrentDate';
  })()
);
```

Il componente `CurrentDate` dovrebbe avere una prop chiamata `date`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(Calendar));
    return mockedComponent.children().childAt(1).props().date;
  })()
);
```

La proprietà `date` di `CurrentDate` dovrebbe contenere una stringa di testo.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(Calendar));
    const prop = mockedComponent.children().childAt(1).props().date;
    return typeof prop === 'string' && prop.length > 0;
  })()
);
```

La proprietà `date` dovrebbe essere generata chiamando `Date()`

```js
assert(/<CurrentDatedate={Date\(\)}\/>/.test(__helpers.removeWhiteSpace(code)));
```

Il componente `CurrentDate` dovrebbe presentare nel tag `p` il valore della proprietà `date`.

```js
let date = 'dummy date';
assert(
  (function () {
    const mockedComponent = Enzyme.mount(
      React.createElement(CurrentDate, { date })
    );
    return mockedComponent.find('p').html().includes(date);
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<Calendar />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const CurrentDate = (props) => {
  return (
    <div>
      { /* Change code below this line */ }
      <p>The current date is: </p>
      { /* Change code above this line */ }
    </div>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>What date is it?</h3>
        { /* Change code below this line */ }
        <CurrentDate />
        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
const CurrentDate = (props) => {
  return (
    <div>
      { /* Change code below this line */ }
      <p>The current date is: {props.date}</p>
      { /* Change code above this line */ }
    </div>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>What date is it?</h3>
        { /* Change code below this line */ }
        <CurrentDate date={Date()} />
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
