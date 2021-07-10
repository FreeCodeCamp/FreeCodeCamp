---
id: 5a24c314108439a4d4036144
title: Usare il Provider per connettere Redux a React
challengeType: 6
forumTopicId: 301435
dashedName: use-provider-to-connect-redux-to-react
---

# --description--

Nell'ultima sfida, hai creato uno store Redux per gestire l'array dei messaggi e hai creato un'azione per aggiungere nuovi messaggi. Il passo successivo è quello di fornire a React l'accesso allo store di Redux e le azioni di cui ha bisogno per inviare aggiornamenti. React Redux fornisce il suo pacchetto `react-redux` per aiutare a realizzare questi compiti.

React Redux fornisce una piccola API con due caratteristiche chiave: `Provider` e `connect`. Un'altra sfida riguarda `connect`. Il `Provider` è un componente wrapper di React Redux che racchiude la tua app React. Questo wrapper consente quindi di accedere alle funzioni dello `store` di Redux e al metodo `dispatch` da tutto il tuo albero dei componenti. `Provider` richiede due proprietà, lo store di Redux e i componenti figli della tua app. La definizione del `Provider` per un componente dell'App potrebbe assomigliare a questa:

```jsx
<Provider store={store}>
  <App/>
</Provider>
```

# --instructions--

L'editor di codice ora mostra tutto il tuo codice Redux e React dalle sfide precedenti. Include lo store di Redux, le azioni e il componente `DisplayMessages`. L'unico elemento nuovo è il componente `AppWrapper` in basso. Utilizza questo componente di primo livello per presentare il `Provider` da `ReactRedux`, e passare lo store di Redux come proprietà. Quindi presenta il componente `DisplayMessages` come figlio. Una volta che hai finito, dovresti vedere il tuo componente React presentato nella pagina.

**Nota:** React Redux è disponibile come variabile globale qui, in modo da poter accedere al Provider con la notazione a punti. Il codice nell'editor sfrutta questa caratteristica e lo imposta a una costante `Provider` da utilizzare nel metodo render di `AppWrapper`.

# --hints--

Dovrebbe essere avviato il rendering di `AppWrapper`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(AppWrapper));
    return mockedComponent.find('AppWrapper').length === 1;
  })()
);
```

Il componente wrapper `Provider` dovrebbe avere una prop `store` passata ad esso, uguale allo store di Redux.

```js
(getUserInput) =>
  assert(
    (function () {
      const mockedComponent = Enzyme.mount(React.createElement(AppWrapper));
      return __helpers
        .removeWhiteSpace(getUserInput('index'))
        .includes('<Providerstore={store}>');
    })()
  );
```

`DisplayMessages` dovrebbe essere presentato come figlio di `AppWrapper`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(AppWrapper));
    return (
      mockedComponent.find('AppWrapper').find('DisplayMessages').length === 1
    );
  })()
);
```

Il componente `DisplayMessages` dovrebbe presentare gli elementi `h2`, `input`, `button`e `ul`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(AppWrapper));
    return (
      mockedComponent.find('div').length === 1 &&
      mockedComponent.find('h2').length === 1 &&
      mockedComponent.find('button').length === 1 &&
      mockedComponent.find('ul').length === 1
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<AppWrapper />, document.getElementById('root'))
```

## --seed-contents--

```jsx
// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};



const store = Redux.createStore(messageReducer);

// React:

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {  
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // Render the Provider below this line

  // Change code above this line
};
```

# --solutions--

```jsx
// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React:

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
 this.handleChange = this.handleChange.bind(this);
 this.submitMessage = this.submitMessage.bind(this);
 }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };  
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // Change code below this line
  render() {
    return (
      <Provider store = {store}>
        <DisplayMessages/>
      </Provider>
    );
  }
  // Change code above this line
};
```
