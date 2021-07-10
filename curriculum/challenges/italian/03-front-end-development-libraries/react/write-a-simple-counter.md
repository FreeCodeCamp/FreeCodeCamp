---
id: 5a24c314108439a4d4036177
title: Scrivere un semplice contatore
challengeType: 6
forumTopicId: 301425
dashedName: write-a-simple-counter
---

# --description--

È possibile progettare un componente stateful più complesso combinando i concetti visti finora. Questi includono l'inizializzazione dello `state`, la scrittura di metodi che impostano lo `state` e l'assegnazione di gestori di click per attivare questi metodi.

# --instructions--

Il componente `Counter` tiene traccia di un valore `count` nello `state`. Ci sono due bottoni che chiamano i metodi `increment()` e `decrement()`. Scrivi questi metodi in modo che il valore del contatore venga incrementato o decrementato di 1 quando viene fatto click sul bottone appropriato. Inoltre, crea un metodo `reset()` in modo che quando si clicca il pulsante reset, il conteggio venga impostato a 0.

**Nota:** Assicurati di non modificare le `className` dei bottoni. Inoltre, ricordati di aggiungere i legami (bindings) necessari ai metodi appena creati nel costruttore.

# --hints--

`Counter` dovrebbe restituire un elemento `div` che contiene tre pulsanti con contenuto di testo nell'ordine: `Increment!`, `Decrement!`, `Reset`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(Counter));
    return (
      mockedComponent.find('.inc').text() === 'Increment!' &&
      mockedComponent.find('.dec').text() === 'Decrement!' &&
      mockedComponent.find('.reset').text() === 'Reset'
    );
  })()
);
```

Lo stato di `Counter` dovrebbe essere inizializzato con una proprietà `count` impostata a `0`.

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
assert(mockedComponent.find('h1').text() === 'Current Count: 0');
```

Cliccando sul bottone di incremento il conteggio dovrebbe aumentare di `1`.

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
mockedComponent.find('.inc').simulate('click');
assert(mockedComponent.find('h1').text() === 'Current Count: 1');
```

Cliccando sul bottone di decremento il conteggio dovrebbe diminuire di `1`.

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
mockedComponent.find('.dec').simulate('click');
assert(mockedComponent.find('h1').text() === 'Current Count: -1');
```

Cliccando sul bottone di reset il conteggio dovrebbe essere reimpostato a `0`.

```js
const mockedComponent = Enzyme.mount(React.createElement(Counter));
mockedComponent.setState({ count: 5 });
const currentCountElement = mockedComponent.find('h1');
assert(currentCountElement.text() === 'Current Count: 5');
mockedComponent.find('.reset').simulate('click');
assert(currentCountElement.text() === 'Current Count: 0');
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<Counter />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    // Change code below this line

    // Change code above this line
  }
  // Change code below this line

  // Change code above this line
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};
```

# --solutions--

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  this.increment = this.increment.bind(this);
 this.decrement = this.decrement.bind(this);
 this.reset = this.reset.bind(this);
 }
  reset() {
    this.setState({
      count: 0
    });
  }
  increment() {
    this.setState(state => ({
      count: state.count + 1
    }));
  }
  decrement() {
    this.setState(state => ({
      count: state.count - 1
    }));
  }
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};
```
