---
id: 5a24c314108439a4d4036174
title: Associare 'this' a un metodo di classe
challengeType: 6
forumTopicId: 301379
dashedName: bind-this-to-a-class-method
---

# --description--

Oltre a impostare e aggiornare lo `state`, puoi anche definire i metodi per la tua classe componente. Un metodo di classe in genere deve usare la parola chiave `this` in modo da poter accedere alle proprietà della classe (come `state` e `props`) all'interno dell'ambito del metodo. Ci sono alcuni modi per consentire ai tuoi metodi di classe di accedere a `this`.

Un modo comune è quello di associare esplicitamente `this` nel costruttore così `this` viene associato ai metodi della classe quando il componente è inizializzato. Potresti aver notato che l'ultima sfida usava `this.handleClick = this.handleClick.bind(this)` per il suo metodo `handleClick` nel costruttore. Quindi, quando chiamerai una funzione come `this.setState()` all'interno del metodo di classe, `this` si riferirà alla classe e non sarà `undefined`.

**Nota:** La parola chiave `this` è uno degli aspetti di JavaScript che confondono di più, ma svolge un ruolo importante in React. Anche se il suo comportamento qui è del tutto normale, queste lezioni non sono il luogo per un esame approfondito di `this` quindi ti consigliamo di fare riferimento ad altre lezioni se quanto visto sopra non ti è chiaro.

# --instructions--

L'editor di codice ha un componente con uno `state` che tiene traccia del testo. Ha anche un metodo che ti permette di impostare il testo su `You clicked!`. Tuttavia, il metodo non funziona perché usa la parola chiave `this` che è indefinita (undefined). Correggi il problema associando esplicitamente `this` al metodo `handleClick()` nel costruttore del componente.

Successivamente, aggiungi un gestore di click all'elemento `button` nel metodo render. Esso dovrebbe attivare il metodo `handleClick()` quando il bottone riceve un evento click. Ricorda che il metodo che passi al gestore `onClick` necessita di parentesi graffe perché dovrebbe essere interpretato direttamente come JavaScript.

Una volta completati i passaggi di cui sopra, dovresti essere in grado di fare clic sul bottone e vedere `You clicked!`.

# --hints--

`MyComponent` dovrebbe restituire un elemento `div` che avvolge due elementi: nell'ordine un bottone e un `h1`.

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).find('div').length === 1 &&
    Enzyme.mount(React.createElement(MyComponent))
      .find('div')
      .childAt(0)
      .type() === 'button' &&
    Enzyme.mount(React.createElement(MyComponent))
      .find('div')
      .childAt(1)
      .type() === 'h1'
);
```

Lo stato di `MyComponent` dovrebbe essere inizializzato con la coppia chiave/valore `{ text: "Hello" }`.

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).state('text') === 'Hello'
);
```

Cliccando sull'elemento `button` dovrebbe essere eseguito il metodo `handleClick` e dovrebbe essere impostare lo stato `text` a `You clicked!`.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ text: 'Hello' });
    return waitForIt(() => mockedComponent.state('text'));
  };
  const second = () => {
    mockedComponent.find('button').simulate('click');
    return waitForIt(() => mockedComponent.state('text'));
  };
  const firstValue = await first();
  const secondValue = await second();
  assert(firstValue === 'Hello' && secondValue === 'You clicked!');
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
      text: "Hello"
    };
    // Change code below this line

    // Change code above this line
  }
  handleClick() {
    this.setState({
      text: "You clicked!"
    });
  }
  render() {
    return (
      <div>
        { /* Change code below this line */ }
        <button>Click Me</button>
        { /* Change code above this line */ }
        <h1>{this.state.text}</h1>
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
      text: "Hello"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      text: "You clicked!"
    });
  }
  render() {
    return (
      <div>
        <button onClick = {this.handleClick}>Click Me</button>
        <h1>{this.state.text}</h1>
      </div>
    );
  }
};
```
