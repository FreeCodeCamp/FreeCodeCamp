---
id: 5a24c314108439a4d403618a
title: Usare Array.map() per presentare dinamicamente gli elementi
challengeType: 6
forumTopicId: 301417
dashedName: use-array-map-to-dynamically-render-elements
---

# --description--

Il rendering condizionale è utile, ma potresti aver bisogno che i tuoi componenti presentino un numero sconosciuto di elementi. Spesso nella programmazione reattiva, un programmatore non ha modo di sapere qual è lo stato di un'applicazione fino al runtime, perché molto dipende dall'interazione di un utente con quel programma. I programmatori devono quindi scrivere il loro codice per gestire correttamente quello stato sconosciuto prima di conoscerlo. L'uso di `Array.map()` in React illustra questo concetto.

Creiamo ad esempio una semplice app "To Do List". Come programmatore, non hai modo di sapere quanti elementi un utente potrebbe avere nella sua lista. È necessario impostare il componente per presentare dinamicamente il numero corretto di elementi della lista molto prima che qualcuno che utilizza il programma decida che oggi è giorno di bucato.

# --instructions--

Nell'editor di codice troverai il componente `MyToDoList` quasi completamente configurato. Alcune parti di questo codice dovrebbero esserti familiari se hai completato la sfida del modulo controllato. Noterai una `textarea` e un `button`, insieme a un paio di metodi che tracciano i loro stati, ma per il momento niente è ancora presentato nella pagina.

All'interno del `constructor`, crea un oggetto `this.state` e definisci due stati: `userInput` dovrebbe essere inizializzato con una stringa vuota, e `toDoList` dovrebbe essere inizializzato con un array vuoto. Successivamente, elimina il commento nel metodo `render()` accanto alla variabile `items`. Al suo posto, mappa l'array `toDoList` memorizzato nello stato interno del componente e presenta dinamicamente un `li` per ogni elemento. Prova ad inserire la stringa `eat, code, sleep, repeat` nella `textarea`, quindi fai clic sul bottone per vedere cosa succede.

**Nota:** Forse sai già che tutti gli elementi figli (e fratelli tra loro) creati da un'operazione di mappatura come questa devono essere forniti con un attributo `key` univoco. Non ti preoccupare, questo è il tema della prossima sfida.

# --hints--

Il componente MyToDoList dovrebbe esistere ed essere presentato nella pagina.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    return mockedComponent.find('MyToDoList').length === 1;
  })()
);
```

Il primo figlio di `MyToDoList` dovrebbe essere un elemento `textarea`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    return (
      mockedComponent.find('MyToDoList').children().childAt(0).type() ===
      'textarea'
    );
  })()
);
```

Il secondo figlio di `MyToDoList` dovrebbe essere un elemento `br`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    return (
      mockedComponent.find('MyToDoList').children().childAt(1).type() === 'br'
    );
  })()
);
```

Il terzo figlio di `MyToDoList` dovrebbe essere un elemento `button`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    return (
      mockedComponent.find('MyToDoList').children().childAt(2).type() ===
      'button'
    );
  })()
);
```

Lo stato di `MyToDoList` dovrebbe essere inizializzato con `toDoList` come un array vuoto.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    const initialState = mockedComponent.state();
    return (
      Array.isArray(initialState.toDoList) === true &&
      initialState.toDoList.length === 0
    );
  })()
);
```

Lo stato di `MyToDoList` dovrebbe essere inizializzato con `userInput` come una stringa vuota.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
    const initialState = mockedComponent.state();
    return (
      typeof initialState.userInput === 'string' &&
      initialState.userInput.length === 0
    );
  })()
);
```

Quando viene cliccato il bottone `Create List`, il componente `MyToDoList` dovrebbe restituire dinamicamente una lista non ordinata che contiene un li (list item) per ogni elemento di una lista separata da virgole inserito nell'elemento `textarea`.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyToDoList));
  const simulateChange = (el, value) =>
    el.simulate('change', { target: { value } });
  const state_1 = () => {
    return mockedComponent.find('ul').find('li');
  };
  const setInput = () => {
    return simulateChange(
      mockedComponent.find('textarea'),
      'testA, testB, testC'
    );
  };
  const click = () => {
    return mockedComponent.find('button').simulate('click');
  };
  const state_2 = () => {
    const nodes = mockedComponent.find('ul').find('li');
    return { nodes, text: nodes.reduce((t, n) => t + n.text().trim(), '') };
  };
  const setInput_2 = () => {
    return simulateChange(
      mockedComponent.find('textarea'),
      't1, t2, t3, t4, t5, t6'
    );
  };
  const click_1 = () => {
    return mockedComponent.find('button').simulate('click');
  };
  const state_3 = () => {
    const nodes = mockedComponent.find('ul').find('li');
    return { nodes, text: nodes.reduce((t, n) => t + n.text().trim(), '') };
  };
  const awaited_state_1 = state_1();
  const awaited_setInput = setInput();
  const awaited_click = click();
  const awaited_state_2 = state_2();
  const awaited_setInput_2 = setInput_2();
  const awaited_click_1 = click_1();
  const awaited_state_3 = state_3();
  assert(
    awaited_state_1.length === 0 &&
      awaited_state_2.nodes.length === 3 &&
      awaited_state_3.nodes.length === 6 &&
      awaited_state_2.text === 'testAtestBtestC' &&
      awaited_state_3.text === 't1t2t3t4t5t6'
  );
})();
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyToDoList />, document.getElementById('root'));
```

## --seed-contents--

```jsx
const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    // Change code below this line

    // Change code above this line
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    const items = null; // Change this line
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder='Separate Items With Commas'
        />
        <br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>{items}</ul>
      </div>
    );
  }
}
```

# --solutions--

```jsx
const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      userInput: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    const items = this.state.toDoList.map((item, i) => {
      return <li key={i}>{item}</li>;
    });
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder='Separate Items With Commas'
        />
        <br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>{items}</ul>
      </div>
    );
  }
}
```
