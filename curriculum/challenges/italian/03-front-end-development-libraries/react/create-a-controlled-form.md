---
id: 5a24c314108439a4d4036179
title: Creare un modulo controllato
challengeType: 6
forumTopicId: 301384
dashedName: create-a-controlled-form
---

# --description--

L'ultima sfida ha mostrato che React può controllare lo stato interno di alcuni elementi come `input` e `textarea`, il che li rende componenti controllati. Questo vale anche per altri elementi dei moduli, tra cui il normale elemento HTML `form`.

# --instructions--

Il componente `MyForm` è impostato con un `form` vuoto con un gestore di invio. Il gestore di invio verrà chiamato al momento dell'invio del modulo.

Abbiamo aggiunto un bottone che invia il modulo. Puoi vedere che il `type` è impostato su `submit` indicando che è il bottone che controlla il modulo. Aggiungi l'elemento `input` nel `form` e imposta i suoi attributi `value` e `onChange()` come nell'ultima sfida. Dovresti quindi completare il metodo `handleSubmit` in modo che imposti la proprietà di stato del componente `submit` al valore corrente dell'input nello `state` locale.

**Nota:** Devi anche chiamare `event.preventDefault()` nel gestore di invio, per evitare il comportamento predefinito di invio del modulo che ricaricherà la pagina web. Per comodità, il comportamento predefinito è stato disabilitato qui per evitare che gli aggiornamenti reimpostino il codice della sfida.

Infine, crea un tag `h1` dopo il `form` che mostri il valore `submit` dallo `state` del componente. Puoi quindi digitare nel modulo e fare clic sul bottone (o premere invio), e dovresti vedere il tuo input presentato nella pagina.

# --hints--

`MyForm` dovrebbe restituire un elemento `div` che contiene un `form` e un tag `h1`. Il modulo dovrebbe includere un `input` e un `button`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyForm));
    return (
      mockedComponent.find('div').children().find('form').length === 1 &&
      mockedComponent.find('div').children().find('h1').length === 1 &&
      mockedComponent.find('form').children().find('input').length === 1 &&
      mockedComponent.find('form').children().find('button').length === 1
    );
  })()
);
```

Lo stato di `MyForm` dovrebbe essere inizializzato con le proprietà `input` e `submit`, entrambe impostate su stringhe vuote.

```js
assert(
  Enzyme.mount(React.createElement(MyForm)).state('input') === '' &&
    Enzyme.mount(React.createElement(MyForm)).state('submit') === ''
);
```

Scrivendo dentro all'elemento `input` si dovrebbe aggiornare la proprietà `input` dello stato del componente.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyForm));
  const _1 = () => {
    mockedComponent.setState({ input: '' });
    return mockedComponent.state('input');
  };
  const _2 = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'TestInput' } });
    return {
      state: mockedComponent.state('input'),
      inputVal: mockedComponent.find('input').props().value
    };
  };
  const before = _1();
  const after = _2();
  assert(
    before === '' &&
      after.state === 'TestInput' &&
      after.inputVal === 'TestInput'
  );
})();
```

L'invio del modulo dovrebbe eseguire `handleSubmit` che dovrebbe impostare la proprietà `submit` nello stato in modo che sia uguale all'input corrente.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyForm));
  const _1 = () => {
    mockedComponent.setState({ input: '' });
    mockedComponent.setState({ submit: '' });
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'SubmitInput' } });
    return mockedComponent.state('submit');
  };
  const _2 = () => {
    mockedComponent.find('form').simulate('submit');
    return mockedComponent.state('submit');
  };
  const before = _1();
  const after = _2();
  assert(before === '' && after === 'SubmitInput');
})();
```

`handleSubmit` dovrebbe chiamare `event.preventDefault`

```js
const handleSubmit = MyForm.prototype.handleSubmit.toString();
const allMatches = handleSubmit.match(/\bevent\.preventDefault\(\s*?\)/g) ?? [];
const blockCommented = handleSubmit.match(
  /\/\*.*?\bevent\.preventDefault\(\s*?\).*?\*\//gs
);
const lineCommented = handleSubmit.match(
  /\/\/.*?\bevent\.preventDefault\(\s*?\)/g
);
const commentedMatches = [...(blockCommented ?? []), ...(lineCommented ?? [])];

assert(
  // At least one event.preventDefault() call exists and is not commented out
  allMatches.length > commentedMatches.length
);
```

L'intestazione `h1` dovrebbe fare il render del valore del campo `submit` prendendolo dallo stato del componente.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(MyForm));
  const _1 = () => {
    mockedComponent.setState({ input: '' });
    mockedComponent.setState({ submit: '' });
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'TestInput' } });
    return mockedComponent.find('h1').text();
  };
  const _2 = () => {
    mockedComponent.find('form').simulate('submit');
    return mockedComponent.find('h1').text();
  };
  const before = _1();
  const after = _2();
  assert(before === '' && after === 'TestInput');
})();
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyForm />, document.getElementById('root'));
```

## --seed-contents--

```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    // Change code below this line

    // Change code above this line
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* Change code below this line */}

          {/* Change code above this line */}
          <button type='submit'>Submit!</button>
        </form>
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
}
```

# --solutions--

```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState(state => ({
      submit: state.input
    }));
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.input} onChange={this.handleChange} />
          <button type='submit'>Submit!</button>
        </form>
        <h1>{this.state.submit}</h1>
      </div>
    );
  }
}
```
