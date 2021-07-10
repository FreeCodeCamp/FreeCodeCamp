---
id: 5a24c314108439a4d403616e
title: Accedere alle proprietà utilizzando this.props
challengeType: 6
forumTopicId: 301375
dashedName: access-props-using-this-props
---

# --description--

Le ultime sfide hanno mostrato i modi fondamentali per passare le proprietà ai componenti figli. Ma cosa succede se il componente figlio a cui stai passando una prop è un componente di classe ES6, piuttosto che un componente funzionale senza stato? Il componente di classe ES6 utilizza una convenzione leggermente diversa per accedere alle proprietà.

Ogni volta che fai riferimento a un componente di classe all'interno di sé stesso, usi la parola chiave `this`. Per accedere alle proprietà all'interno di un componente di classe, premetti `this` al codice che usi per accedervi. Ad esempio, se un componente di classe ES6 ha una prop chiamata `data`, scriverai `{this.props.data}` in JSX.

# --instructions--

Mostra un'istanza del componente `ReturnTempPassword` nel componente padre `ResetPassword`. Qui, dai a `ReturnTempPassword` una prop di `tempPassword` e assegnale un valore stringa di almeno 8 caratteri. All'interno del figlio, `ReturnTempPassword`, accedi alla prop `tempPassword` all'interno dei tag `strong` per assicurarti che l'utente veda la password temporanea.

# --hints--

Il componente `ResetPassword` dovrebbe restituire un singolo elemento `div`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return mockedComponent.children().type() === 'div';
  })()
);
```

Il quarto figlio di `ResetPassword` dovrebbe essere il componente `ReturnTempPassword`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return (
      mockedComponent.children().childAt(3).name() === 'ReturnTempPassword'
    );
  })()
);
```

Il componente `ReturnTempPassword` dovrebbe avere una prop chiamata `tempPassword`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return mockedComponent.find('ReturnTempPassword').props().tempPassword;
  })()
);
```

L'elemento `tempPassword` di `ReturnTempPassword` dovrebbe essere uguale a una stringa di almeno 8 caratteri.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    const temp = mockedComponent.find('ReturnTempPassword').props()
      .tempPassword;
    return typeof temp === 'string' && temp.length >= 8;
  })()
);
```

Il componente `ReturnTempPassword` dovrebbe visualizzare la password che crei come prop `tempPassword` all'interno dei tag `strong`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return (
      mockedComponent.find('strong').text() ===
      mockedComponent.find('ReturnTempPassword').props().tempPassword
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<ResetPassword />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class ReturnTempPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
            { /* Change code below this line */ }
            <p>Your temporary password is: <strong></strong></p>
            { /* Change code above this line */ }
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <h2>Reset Password</h2>
          <h3>We've generated a new temporary password for you.</h3>
          <h3>Please reset this password from your account settings ASAP.</h3>
          { /* Change code below this line */ }

          { /* Change code above this line */ }
        </div>
    );
  }
};
```

# --solutions--

```jsx
class ReturnTempPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
            <p>Your temporary password is: <strong>{this.props.tempPassword}</strong></p>
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <h2>Reset Password</h2>
          <h3>We've generated a new temporary password for you.</h3>
          <h3>Please reset this password from your account settings ASAP.</h3>
          { /* Change code below this line */ }
          <ReturnTempPassword tempPassword="serrPbqrPnzc" />
          { /* Change code above this line */ }
        </div>
    );
  }
};
```
