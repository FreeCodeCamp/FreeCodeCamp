---
id: 5a24c314108439a4d4036142
title: Gestire prima lo stato locale
challengeType: 6
forumTopicId: 301431
dashedName: manage-state-locally-first
---

# --description--

Qui finirai di creare il componente `DisplayMessages`.

# --instructions--

In primo luogo, nel metodo `render()`, fai in modo che sia presentato un elemento `input`, un `button` e un `ul`. Quando l'elemento `input` cambia, dovrebbe attivare un metodo `handleChange()`. Inoltre, l'elemento `input` dovrebbe presentare il valore di `input` che è nello stato del componente. L'elemento `button` dovrebbe attivare un metodo `submitMessage()` quando viene cliccato.

In secondo luogo, scrivi questi due metodi. Il metodo `handleChange()` dovrebbe aggiornare l'`input` con quello che l'utente sta digitando. Il metodo `submitMessage()` dovrebbe concatenare il messaggio corrente (memorizzato in `input`) all'array `messages` nello stato locale, e cancellare il valore dell'`input`.

Infine, usa `ul` per mappare l'array `messages` e presentarlo sullo schermo come un elenco di elementi `li`.

# --hints--

Il componente `DisplayMessages` dovrebbe inizializzare con uno stato uguale a `{ input: "", messages: [] }`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
    const initialState = mockedComponent.state();
    return (
      typeof initialState === 'object' &&
      initialState.input === '' &&
      initialState.messages.length === 0
    );
  })()
);
```

Il componente `DisplayMessages` dovrebbe rendere un `div` contenente un elemento `h2`, un elemento `button`, un elemento `ul`, e degli elementi `li` come figli.

```js
async () => {
  const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const state = () => {
    mockedComponent.setState({ messages: ['__TEST__MESSAGE'] });
    return waitForIt(() => mockedComponent);
  };
  const updated = await state();
  assert(
    updated.find('div').length === 1 &&
      updated.find('h2').length === 1 &&
      updated.find('button').length === 1 &&
      updated.find('ul').length === 1 &&
      updated.find('li').length > 0
  );
};
```

`.map` dovrebbe essere utilizzato nell'array `messages`.

```js
assert(code.match(/this\.state\.messages\.map/g));
```

L'elemento `input` dovrebbe presentare il valore di `input` nello stato locale.

```js
async () => {
  const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const causeChange = (c, v) =>
    c.find('input').simulate('change', { target: { value: v } });
  const testValue = '__TEST__EVENT__INPUT';
  const changed = () => {
    causeChange(mockedComponent, testValue);
    return waitForIt(() => mockedComponent);
  };
  const updated = await changed();
  assert(updated.find('input').props().value === testValue);
};
```

Chiamare il metodo `handleChange` dovrebbe aggiornare il valore `input` nello stato in base all'input corrente.

```js
async () => {
  const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const causeChange = (c, v) =>
    c.find('input').simulate('change', { target: { value: v } });
  const initialState = mockedComponent.state();
  const testMessage = '__TEST__EVENT__MESSAGE__';
  const changed = () => {
    causeChange(mockedComponent, testMessage);
    return waitForIt(() => mockedComponent);
  };
  const afterInput = await changed();
  assert(
    initialState.input === '' &&
      afterInput.state().input === '__TEST__EVENT__MESSAGE__'
  );
};
```

Fare clic sul pulsante `Add message` dovrebbe chiamare il metodo `submitMessage` che dovrebbe aggiungere l'`input` corrente all'array `messages` nello stato.

```js
async () => {
  const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const causeChange = (c, v) =>
    c.find('input').simulate('change', { target: { value: v } });
  const initialState = mockedComponent.state();
  const testMessage_1 = '__FIRST__MESSAGE__';
  const firstChange = () => {
    causeChange(mockedComponent, testMessage_1);
    return waitForIt(() => mockedComponent);
  };
  const firstResult = await firstChange();
  const firstSubmit = () => {
    mockedComponent.find('button').simulate('click');
    return waitForIt(() => mockedComponent);
  };
  const afterSubmit_1 = await firstSubmit();
  const submitState_1 = afterSubmit_1.state();
  const testMessage_2 = '__SECOND__MESSAGE__';
  const secondChange = () => {
    causeChange(mockedComponent, testMessage_2);
    return waitForIt(() => mockedComponent);
  };
  const secondResult = await secondChange();
  const secondSubmit = () => {
    mockedComponent.find('button').simulate('click');
    return waitForIt(() => mockedComponent);
  };
  const afterSubmit_2 = await secondSubmit();
  const submitState_2 = afterSubmit_2.state();
  assert(
    initialState.messages.length === 0 &&
      submitState_1.messages.length === 1 &&
      submitState_2.messages.length === 2 &&
      submitState_2.messages[1] === testMessage_2
  );
};
```

Il metodo `submitMessage` dovrebbe cancellare l'input corrente.

```js
async () => {
  const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const causeChange = (c, v) =>
    c.find('input').simulate('change', { target: { value: v } });
  const initialState = mockedComponent.state();
  const testMessage = '__FIRST__MESSAGE__';
  const firstChange = () => {
    causeChange(mockedComponent, testMessage);
    return waitForIt(() => mockedComponent);
  };
  const firstResult = await firstChange();
  const firstState = firstResult.state();
  const firstSubmit = () => {
    mockedComponent.find('button').simulate('click');
    return waitForIt(() => mockedComponent);
  };
  const afterSubmit = await firstSubmit();
  const submitState = afterSubmit.state();
  assert(firstState.input === testMessage && submitState.input === '');
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<DisplayMessages />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
  }
  // Add handleChange() and submitMessage() methods here

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* Render an input, button, and ul below this line */ }

        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
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
```
