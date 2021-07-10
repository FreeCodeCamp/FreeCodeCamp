---
id: 5a24c314108439a4d4036189
title: Cambiare CSS inline condizionalmente in base allo stato dei componenti
challengeType: 6
forumTopicId: 301380
dashedName: change-inline-css-conditionally-based-on-component-state
---

# --description--

A questo punto, hai visto diverse applicazioni del rendering condizionale e l'uso degli stili in linea. Ecco un altro esempio che combina entrambi questi argomenti. Puoi anche fare un render condizionale del CSS in base allo stato di un componente React. Per fare questo si valutare una condizione, e se tale condizione è soddisfatta si modifica l'oggetto styles assegnato agli elementi JSX nel metodo di render.

Questo è un paradigma importante da capire, perché è un grande cambiamento rispetto all'approccio più tradizionale di applicare gli stili modificando direttamente gli elementi del DOM (cosa molto comune con jQuery, per esempio). In quell'approccio, è necessario tenere traccia di quando gli elementi cambiano e anche gestire direttamente la manipolazione effettiva. Può diventare difficile tenere traccia dei cambiamenti, rendendo potenzialmente imprevedibile la tua interfaccia utente. Quando imposti un oggetto di stile in base a una condizione, descrivi l'aspetto dell'interfaccia utente come una funzione dello stato dell'applicazione. Vi è un chiaro flusso di informazioni che si muove in una sola direzione. Questo è il metodo preferito quando si scrivono applicazioni con React.

# --instructions--

L'editor di codice contiene un semplice componente di input controllato con un bordo stilizzato. Vogliamo rendere questo bordo rosso se l'utente digita più di 15 caratteri di testo nella casella di input. Aggiungi una condizione per controllare questo e, se la condizione è valida, imposta lo stile del bordo della casella di input a `3px solid red`. Puoi provarlo inserendo il testo nell'input.

# --hints--

Il componente `GateKeeper` dovrebbe presentare un elemento `div`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(GateKeeper));
    return mockedComponent.find('div').length === 1;
  })()
);
```

Il componente `GateKeeper` dovrebbe essere inizializzato con una chiave di stato `input` impostata su una stringa vuota.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(GateKeeper));
    return mockedComponent.state().input === '';
  })()
);
```

Il componente `GateKeeper` dovrebbe presentare un tag `h3` e un tag `input`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(GateKeeper));
    return (
      mockedComponent.find('h3').length === 1 &&
      mockedComponent.find('input').length === 1
    );
  })()
);
```

Il tag `input` inizialmente dovrebbe avere uno stile di `1px solid black` per la proprietà `border`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(GateKeeper));
    return (
      mockedComponent.find('input').props().style.border === '1px solid black'
    );
  })()
);
```

Il tag `input` dovrebbe essere stilizzato con un bordo di `3px solid red` se il valore di input nello stato è più lungo di 15 caratteri.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const mockedComponent = Enzyme.mount(React.createElement(GateKeeper));
  const simulateChange = (el, value) =>
    el.simulate('change', { target: { value } });
  let initialStyle = mockedComponent.find('input').props().style.border;
  const state_1 = () => {
    mockedComponent.setState({ input: 'this is 15 char' });
    return waitForIt(() => mockedComponent.find('input').props().style.border);
  };
  const state_2 = () => {
    mockedComponent.setState({
      input: 'A very long string longer than 15 characters.'
    });
    return waitForIt(() => mockedComponent.find('input').props().style.border);
  };
  const style_1 = await state_1();
  const style_2 = await state_2();
  assert(
    initialStyle === '1px solid black' &&
      style_1 === '1px solid black' &&
      style_2 === '3px solid red'
  );
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<GateKeeper />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class GateKeeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    let inputStyle = {
      border: '1px solid black'
    };
    // Change code below this line

    // Change code above this line
    return (
      <div>
        <h3>Don't Type Too Much:</h3>
        <input
          type="text"
          style={inputStyle}
          value={this.state.input}
          onChange={this.handleChange} />
      </div>
    );
  }
};
```

# --solutions--

```jsx
class GateKeeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    let inputStyle = {
      border: '1px solid black'
    };
    if (this.state.input.length > 15) {
      inputStyle.border = '3px solid red';
    };
    return (
      <div>
        <h3>Don't Type Too Much:</h3>
        <input
          type="text"
          style={inputStyle}
          value={this.state.input}
          onChange={this.handleChange} />
      </div>
    );
  }
};
```
