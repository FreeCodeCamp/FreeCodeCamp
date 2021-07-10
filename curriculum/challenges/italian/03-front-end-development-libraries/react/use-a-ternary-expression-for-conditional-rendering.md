---
id: 5a24c314108439a4d4036187
title: Usare un'espressione ternaria per il rendering condizionale
challengeType: 6
forumTopicId: 301414
dashedName: use-a-ternary-expression-for-conditional-rendering
---

# --description--

Prima di passare alle tecniche di rendering dinamiche, c'è un ultimo modo per utilizzare le condizionali JavaScript integrate per presentare quello che vuoi: l'<dfn>operatore ternario</dfn>. L'operatore ternario è spesso utilizzato come scorciatoia per le istruzioni `if/else` in JavaScript. Non è robusto come le tradizionali istruzioni `if/else`, ma è molto popolare tra gli sviluppatori React. Uno dei motivi è che per come JSX è compilato, le istruzioni `if/else` non possono essere inserite direttamente nel codice JSX. Potresti averlo notato un paio di sfide fa — quando era richiesta un'istruzione `if/else`, era sempre inserita *fuori* dall'istruzione `return`. Le espressioni ternarie possono essere un'ottima alternativa se vuoi implementare una logica condizionale all'interno del tuo JSX. Ricordiamo che un operatore ternario ha tre parti, ma è possibile combinare diverse espressioni ternarie insieme. Ecco la sintassi di base:

```jsx
condition ? expressionIfTrue : expressionIfFalse;
```

# --instructions--

L'editor di codice ha tre costanti definite nel metodo `render()` del componente `CheckUserAge`. Si chiamano `buttonOne`, `buttonTwo`e `buttonThree`. Ad ognuno di questi viene assegnata una semplice espressione JSX che rappresenta un elemento button. Innanzitutto, inizializza lo stato di `CheckUserAge` con `input` e `userAge` entrambi impostati su una stringa vuota.

Una volta che il componente sta presentando delle informazioni sulla pagina, gli utenti dovrebbero avere un modo per interagire con esso. All'interno dell'istruzione `return` del componente, imposta un'espressione ternaria che implementa la seguente logica: quando la pagina viene caricata inizialmente, presenta il pulsante di invio, `buttonOne`, sulla pagina. Poi, quando un utente inserisce la sua età e fa click sul bottone, presenta un pulsante diverso in base all'età. Se un utente inserisce un numero inferiore a `18`, presenta `buttonThree`. Se un utente inserisce un numero maggiore o uguale a `18`, presenta `buttonTwo`.

# --hints--

Il componente `CheckUserAge` dovrebbe presentare un singolo elemento `input` e un singolo elemento `button`.

```js
assert(
  Enzyme.mount(React.createElement(CheckUserAge)).find('div').find('input')
    .length === 1 &&
    Enzyme.mount(React.createElement(CheckUserAge)).find('div').find('button')
      .length === 1
);
```

Lo stato del componente `CheckUserAge` dovrebbe essere inizializzato con una proprietà di `userAge` e una proprietà `input`, entrambe impostate sul valore di una stringa vuota.

```js
assert(
  Enzyme.mount(React.createElement(CheckUserAge)).state().input === '' &&
    Enzyme.mount(React.createElement(CheckUserAge)).state().userAge === ''
);
```

Quando il componente `CheckUserAge` viene presentato per la prima volta nel DOM, il testo interno del `button` dovrebbe essere Submit.

```js
assert(
  Enzyme.mount(React.createElement(CheckUserAge)).find('button').text() ===
    'Submit'
);
```

Quando viene inserito un numero inferiore a 18 nell'elemento `input` e viene cliccato il `button`, il testo all'interno del `button` dovrebbe essere `You Shall Not Pass`.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(CheckUserAge));
  const initialButton = mockedComponent.find('button').text();
  const enter3AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '3' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const enter17AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '17' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const userAge3 = enter3AndClickButton();
  const userAge17 = enter17AndClickButton();
  assert(
    initialButton === 'Submit' &&
      userAge3 === 'You Shall Not Pass' &&
      userAge17 === 'You Shall Not Pass'
  );
})();
```

Quando un numero maggiore o uguale a 18 viene inserito nell'elemento `input` e il `button` viene cliccato, il testo interno del `button` dovrebbe essere `You May Enter`.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(CheckUserAge));
  const initialButton = mockedComponent.find('button').text();
  const enter18AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '18' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const enter35AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '35' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const userAge18 = enter18AndClickButton();
  const userAge35 = enter35AndClickButton();
  assert(
    initialButton === 'Submit' &&
      userAge18 === 'You May Enter' &&
      userAge35 === 'You May Enter'
  );
})();
```

Una volta che un numero è stato inviato, e il valore dell'`input` è cambiato ancora una volta, il `button` dovrebbe tornare al testo `Submit`.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(CheckUserAge));
  const enter18AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '18' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const changeInputDontClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '5' } });
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const enter10AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '10' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const userAge18 = enter18AndClickButton();
  const changeInput1 = changeInputDontClickButton();
  const userAge10 = enter10AndClickButton();
  const changeInput2 = changeInputDontClickButton();
  assert(
    userAge18 === 'You May Enter' &&
      changeInput1 === 'Submit' &&
      userAge10 === 'You Shall Not Pass' &&
      changeInput2 === 'Submit'
  );
})();
```

Il tuo codice non dovrebbe contenere alcuna istruzione `if/else`.

```js
assert(
  new RegExp(/(\s|;)if(\s|\()/).test(
    Enzyme.mount(React.createElement(CheckUserAge)).instance().render.toString()
  ) === false
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<CheckUserAge />, document.getElementById('root'));
```

## --seed-contents--

```jsx
const inputStyle = {
  width: 235,
  margin: 5
};

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    // Change code below this line

    // Change code above this line
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
}
```

# --solutions--

```jsx
const inputStyle = {
  width: 235,
  margin: 5
};

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAge: '',
      input: ''
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {this.state.userAge === ''
          ? buttonOne
          : this.state.userAge >= 18
          ? buttonTwo
          : buttonThree}
      </div>
    );
  }
}
```
