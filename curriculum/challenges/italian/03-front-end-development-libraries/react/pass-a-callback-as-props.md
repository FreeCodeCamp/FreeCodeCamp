---
id: 5a24c314108439a4d403617b
title: Passare una Callback come proprietà
challengeType: 6
forumTopicId: 301400
dashedName: pass-a-callback-as-props
---

# --description--

Puoi passare lo `state` come proprietà ai componenti figli, ma non sei limitato al passaggio dei dati. Puoi anche passare a un componente figlio delle funzioni di gestione o qualsiasi metodo definito su un componente React. In questo modo permetti ai componenti figli di interagire con i loro componenti genitori. Passi dei metodi a un figlio proprio come delle normali proprietà. Verrà assegnato un nome e potrai accedere a quel nome di metodo da `this.props` nel componente figlio.

# --instructions--

Ci sono tre componenti delineati nell'editor di codice. Il componente `MyApp` è il genitore che presenterà i componenti figli `GetInput` e `RenderInput`. Aggiungi il componente `GetInput` al metodo render in `MyApp`, poi passagli una proprietà chiamata `input` assegnata a `inputValue` dallo `state` di `MyApp`. Crea anche una proprietà chiamata `handleChange` e passale il gestore di input `handleChange`.

Successivamente, aggiungi `RenderInput` al metodo render in `MyApp`, quindi crea una proprietà chiamata `input` e passale l'`inputValue` dallo `state`. Una volta terminato, potrai digitare nel campo `input` nel componente `GetInput`, che poi chiamerà il metodo di gestione nel suo genitore tramite le props. Questo aggiorna l'input nello `state` del genitore, che viene passato come proprietà ad entrambi i figli. Osserva come i dati scorrono tra i componenti e come l'unica fonte di verità rimane lo `state` del componente genitore. Certamente questo esempio è un po' limitato, ma dovrebbe bastare a illustrare come i dati e le callback possono essere passati tra i componenti di React.

# --hints--

Il componente `MyApp` dovrebbe effettuare il render.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('MyApp').length === 1;
  })()
);
```

Il componente `GetInput` dovrebbe effettuare il render.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('GetInput').length === 1;
  })()
);
```

Il componente `RenderInput` dovrebbe effettuare il render.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('RenderInput').length === 1;
  })()
);
```

Il componente `GetInput` dovrebbe ricevere la proprietà `inputValue` dello stato di `MyApp` e contenere un elemento `input` che modifica lo stato di `MyApp`.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const state_1 = () => {
    mockedComponent.setState({ inputValue: '' });
    return waitForIt(() => mockedComponent.state());
  };
  const state_2 = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'TestInput' } });
    return waitForIt(() => mockedComponent.state());
  };
  const updated_1 = await state_1();
  const updated_2 = await state_2();
  assert(updated_1.inputValue === '' && updated_2.inputValue === 'TestInput');
};
```

Il componente `RenderInput` dovrebbe ricevere la proprietà `inputValue` dello stato di `MyApp`.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const state_1 = () => {
    mockedComponent.setState({ inputValue: 'TestName' });
    return waitForIt(() => mockedComponent);
  };
  const updated_1 = await state_1();
  assert(updated_1.find('p').text().includes('TestName'));
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyApp />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
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

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Get Input:</h3>
        <input
          value={this.props.input}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Input Render:</h3>
        <p>{this.props.input}</p>
      </div>
    );
  }
};
```

# --solutions--

```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
  this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  render() {
    return (
       <div>
         <GetInput
           input={this.state.inputValue}
           handleChange={this.handleChange}/>
         <RenderInput
           input={this.state.inputValue}/>
       </div>
    );
  }
};

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Get Input:</h3>
        <input
          value={this.props.input}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Input Render:</h3>
        <p>{this.props.input}</p>
      </div>
    );
  }
};
```
