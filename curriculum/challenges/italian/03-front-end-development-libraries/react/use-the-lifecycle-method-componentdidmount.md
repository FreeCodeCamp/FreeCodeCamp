---
id: 5a24c314108439a4d403617d
title: Usare il metodo del ciclo di vita componentDidMount
challengeType: 6
forumTopicId: 301422
dashedName: use-the-lifecycle-method-componentdidmount
---

# --description--

La maggior parte degli sviluppatori web, a un certo punto, deve chiamare un'API endpoint per recuperare i dati. Se stai lavorando con React, è importante sapere dove eseguire questa azione.

La migliore pratica con React è quella di effettuare chiamate API o qualsiasi chiamata al server nel metodo del ciclo di vita `componentDidMount()`. Questo metodo viene chiamato dopo che un componente è stato montato nel DOM. Qualsiasi chiamata a `setState()` qui attiverà un re-rendering del tuo componente. Quando chiami un'API in questo metodo, e imposti il tuo stato con i dati che l'API restituisce, si attiverà automaticamente un aggiornamento una volta che i dati saranno ricevuti.

# --instructions--

C'è una chiamata API finta in `componentDidMount()`. Essa imposta lo stato dopo 2.5 secondi per simulare la chiamata a un server per recuperare i dati. Questo esempio richiede il numero di utenti attivi per un sito. Nel metodo render, presenta il valore di `activeUsers` nell'`h1` dopo il testo `Active Users:`. Guarda cosa succede nell'anteprima e sentiti libero di cambiare il timeout per vedere i diversi effetti.

# --hints--

`MyComponent` dovrebbe mostrare un elemento `div` che contiene un tag `h1`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return (
      mockedComponent.find('div').length === 1 &&
      mockedComponent.find('h1').length === 1
    );
  })()
);
```

Lo stato del componente dovrebbe essere aggiornato con una funzione timeout in `componentDidMount`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return new RegExp('setTimeout(.|\n)+setState(.|\n)+activeUsers').test(
      String(mockedComponent.instance().componentDidMount)
    );
  })()
);
```

Il tag `h1` dovrebbe presentare il valore `activeUsers` dallo stato di `MyComponent`.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ activeUsers: 1237 });
    return mockedComponent.find('h1').text();
  };
  const second = () => {
    mockedComponent.setState({ activeUsers: 1000 });
    return mockedComponent.find('h1').text();
  };
  assert(new RegExp('1237').test(first()) && new RegExp('1000').test(second()));
})();
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
      activeUsers: null
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        activeUsers: 1273
      });
    }, 2500);
  }
  render() {
    return (
      <div>
        {/* Change code below this line */}
        <h1>Active Users: </h1>
        {/* Change code above this line */}
      </div>
    );
  }
}
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: null
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        activeUsers: 1273
      });
    }, 2500);
  }
  render() {
    return (
      <div>
        <h1>Active Users: {this.state.activeUsers}</h1>
      </div>
    );
  }
}
```
