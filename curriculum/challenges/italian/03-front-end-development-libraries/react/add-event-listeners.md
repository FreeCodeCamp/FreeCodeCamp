---
id: 5a24c314108439a4d403617e
title: Aggiungere listener di eventi
challengeType: 6
forumTopicId: 301377
dashedName: add-event-listeners
---

# --description--

Il metodo `componentDidMount()` è anche il posto migliore per allegare i listener di eventi di cui hai bisogno per aggiungere funzionalità specifiche. React fornisce un sistema di eventi sintetico che avvolge il sistema nativo di eventi presente nei browser. Questo significa che il sistema di eventi sintetico si comporta esattamente allo stesso modo indipendentemente dal browser dell'utente - anche se gli eventi nativi possono comportarsi in modo diverso tra i diversi browser.

Hai già utilizzato alcuni di questi gestori di eventi sintetici come `onClick()`. Il sistema di eventi sintetici di React è ottimo da utilizzare per la maggior parte delle interazioni che gestirai su elementi del DOM. Tuttavia, se desideri collegare un gestore di eventi agli oggetti document o window, è necessario farlo direttamente.

# --instructions--

Collega un listener (ascoltatore) di eventi nel metodo `componentDidMount()` per gli eventi `keydown` e fai sì che questi eventi attivino la callback `handleKeyPress()`. È possibile utilizzare `document.addEventListener()` che riceve l'evento (tra virgolette) come primo argomento e la callback come secondo argomento.

Poi, in `componentWillUnmount()`, rimuovi questo stesso listener di eventi. Puoi passare gli stessi argomenti a `document.removeEventListener()`. È buona pratica utilizzare questo metodo del ciclo di vita per fare qualsiasi pulizia di componenti React prima che siano smontati e distrutti. Rimuovere i listener di eventi è un esempio di questa azione di pulizia.

# --hints--

`MyComponent` dovrebbe mostrare un elemento `div` che contiene un tag `h1`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('div').children().find('h1').length === 1;
  })()
);
```

Un listener `keydown` dovrebbe essere collegato al documento in `componentDidMount`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    const didMountString = mockedComponent
      .instance()
      .componentDidMount.toString();
    return new RegExp(
      'document.addEventListener(.|\n|\r)+keydown(.|\n|\r)+this.handleKeyPress'
    ).test(didMountString);
  })()
);
```

Il listener `keydown` dovrebbe essere rimosso dal documento in `componentWillUnmount`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    const willUnmountString = mockedComponent
      .instance()
      .componentWillUnmount.toString();
    return new RegExp(
      'document.removeEventListener(.|\n|\r)+keydown(.|\n|\r)+this.handleKeyPress'
    ).test(willUnmountString);
  })()
);
```

Una volta che il componente è montato, premendo `enter` si dovrebbe aggiornare il suo stato e il tag `h1` visualizzato.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const beforeState = mockedComponent.state('message');
  const beforeText = mockedComponent.find('h1').text();
  const pressEnterKey = () => {
    mockedComponent.instance().handleKeyPress({ keyCode: 13 });
    return waitForIt(() => {
      mockedComponent.update();
      return {
        state: mockedComponent.state('message'),
        text: mockedComponent.find('h1').text()
      };
    });
  };
  const afterKeyPress = await pressEnterKey();
  assert(
    beforeState !== afterKeyPress.state && beforeText !== afterKeyPress.text
  );
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
      message: ''
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  // Change code below this line
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  // Change code above this line
  handleEnter() {
    this.setState((state) => ({
      message: state.message + 'You pressed the enter key! '
    }));
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
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
      message: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleEnter = this.handleEnter.bind(this);  }
  componentDidMount() {
    // Change code below this line
    document.addEventListener('keydown', this.handleKeyPress);
    // Change code above this line
  }
  componentWillUnmount() {
    // Change code below this line
    document.removeEventListener('keydown', this.handleKeyPress);
    // Change code above this line
  }
  handleEnter() {
    this.setState((state) => ({
      message: state.message + 'You pressed the enter key! '
    }));
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
};
```
