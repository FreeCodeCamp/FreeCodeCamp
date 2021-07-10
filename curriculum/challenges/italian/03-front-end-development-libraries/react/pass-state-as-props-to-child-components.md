---
id: 5a24c314108439a4d403617a
title: Passare State come Props ai componenti figli
challengeType: 6
forumTopicId: 301403
dashedName: pass-state-as-props-to-child-components
---

# --description--

Hai visto un sacco di esempi che hanno passato le proprietà a elementi JSX figli e a componenti React figli nelle sfide precedenti. Potresti chiederti da dove provengono quelle proprietà. Un modello comune è quello di avere un componente stateful contenente lo `state` importante per la tua app, che poi presenta i componenti figli. Vuoi che questi componenti abbiano accesso ad alcune parti di quello `state`che viene passato come props (proprietà).

Ad esempio, forse hai un componente `App` che presenta una `Navbar`, tra gli altri componenti. Nella tua `App` hai `state` che contiene molte informazioni dell'utente, ma la `Navbar` ha solo bisogno di accedere al nome utente dell'utente in modo da visualizzarlo. Passa quel pezzo di `state` al componente `Navbar` come una prop.

Questo modello illustra alcuni paradigmi importanti in React. Il primo è il *flusso di dati unidirezionale*. Lo stato scorre in una direzione lungo l'albero dei componenti della tua applicazione, dal componente genitore stateful ai componenti figli. I componenti figlio ricevono solo i dati di stato di cui hanno bisogno. Il secondo è che complesse app stateful possono essere suddivise in alcuni, o anche un singolo componente stateful. Il resto dei tuoi componenti semplicemente riceve lo stato dal genitore come props, e presenta un'interfaccia utente da quello stato. Si comincia col creare una separazione in cui la gestione dello stato viene gestita in una parte del codice e il rendering dell'interfaccia utente in un'altra. Questo principio di separazione della logica dello stato dalla logica dell'interfaccia utente è uno dei principi chiave di React. Quando viene utilizzato correttamente, rende la progettazione di applicazioni stateful complesse molto più facile da gestire.

# --instructions--

Il componente `MyApp` è stateful e presenta un componente `Navbar` come figlio. Passa la proprietà `name` del suo `state` al componente figlio, poi mostra il `name` nel tag `h1` che fa parte del metodo render di `Navbar`. `name` dovrebbe apparire dopo il testo `Hello, my name is:`.

# --hints--

Il componente `MyApp` dovrebbe eseguire il render con un componente `Navbar` al suo interno.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return (
      mockedComponent.find('MyApp').length === 1 &&
      mockedComponent.find('Navbar').length === 1
    );
  })()
);
```

Il componente `Navbar` dovrebbe ricevere la proprietà `name` dello stato di `MyApp` come proprietà.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const setState = () => {
    mockedComponent.setState({ name: 'TestName' });
    return waitForIt(() => mockedComponent.find('Navbar').props());
  };
  const navProps = await setState();
  assert(navProps.name === 'TestName');
};
```

L'elemento `h1` in `Navbar` dovrebbe presentare la proprietà `name`.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const navH1Before = mockedComponent.find('Navbar').find('h1').text();
  const setState = () => {
    mockedComponent.setState({ name: 'TestName' });
    return waitForIt(() => mockedComponent.find('Navbar').find('h1').text());
  };
  const navH1After = await setState();
  assert(new RegExp('TestName').test(navH1After) && navH1After !== navH1Before);
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
      name: 'CamperBot'
    }
  }
  render() {
    return (
       <div>
         {/* Change code below this line */}
         <Navbar />
         {/* Change code above this line */}
       </div>
    );
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      {/* Change code below this line */}
      <h1>Hello, my name is: </h1>
      {/* Change code above this line */}
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
      name: 'CamperBot'
    }
  }
  render() {
    return (
       <div>
         <Navbar name={this.state.name}/>
       </div>
    );
  }
};
class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <h1>Hello, my name is: {this.props.name}</h1>
    </div>
    );
  }
};
```
