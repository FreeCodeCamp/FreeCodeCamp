---
id: 5a24c314108439a4d4036147
title: Connettere Redux a React
challengeType: 6
forumTopicId: 301426
dashedName: connect-redux-to-react
---

# --description--

Ora che hai scritto sia la funzione `mapStateToProps()` che la funzione `mapDispatchToProps()`, puoi utilizzarle per mappare lo `state` e spedirlo (`dispatch`) alle `props` di uno dei tuoi componenti React. Il metodo `connect` può gestire questa attività per passare i dati da React a Redux. Questo metodo richiede due argomenti opzionali, `mapStateToProps()` e `mapDispatchToProps()`. Sono opzionali perché potresti avere un componente che ha bisogno solo di accedere allo `state` ma non ha bisogno di inviare alcuna azione, o viceversa.

Per usare questo metodo, passa le funzioni come argomenti, e chiama immediatamente il risultato con il tuo componente. Questa sintassi è un po' insolita e appare così:

```js
connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

**Nota:** Se vuoi omettere uno degli argomenti del metodo `connect`, passa `null` al loro posto.

# --instructions--

L'editor di codice contiene le funzioni `mapStateToProps()` e `mapDispatchToProps()` e un nuovo componente React chiamato `Presentational`. Collega questo componente a Redux con il metodo `connect` dall'oggetto globale `ReactRedux`, e chiamalo immediatamente sul componente `Presentational`. Assegna il risultato a una nuova `const` chiamata `ConnectedComponent` che rappresenta il componente collegato. Questo è tutto, ora sei connesso a Redux! Prova a impostare uno dei due argomenti di `connect` a `null` e osserva i risultati del test.

# --hints--

Il componente `Presentational` dovrebbe effettuare il render.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(AppWrapper));
    return mockedComponent.find('Presentational').length === 1;
  })()
);
```

Il componente `Presentational` dovrebbe ricevere una prop `messages` via `connect`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(AppWrapper));
    const props = mockedComponent.find('Presentational').props();
    return props.messages === '__INITIAL__STATE__';
  })()
);
```

Il componente `Presentational` dovrebbe ricevere una prop `submitNewMessage` via `connect`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(AppWrapper));
    const props = mockedComponent.find('Presentational').props();
    return typeof props.submitNewMessage === 'function';
  })()
);
```

# --seed--

## --after-user-code--

```jsx
const store = Redux.createStore(
  (state = '__INITIAL__STATE__', action) => state
);
class AppWrapper extends React.Component {
  render() {
    return (
      <ReactRedux.Provider store = {store}>
        <ConnectedComponent/>
      </ReactRedux.Provider>
    );
  }
};
ReactDOM.render(<AppWrapper />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    }
  }
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>
  }
};

const connect = ReactRedux.connect;
// Change code below this line
```

# --solutions--

```jsx
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    }
  }
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>
  }
};

const connect = ReactRedux.connect;
// Change code below this line

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Presentational);
```
