---
id: 5a24c314108439a4d4036180
title: Ottimizzare il re-rendering con shouldComponentUpdate
challengeType: 6
forumTopicId: 301398
dashedName: optimize-re-renders-with-shouldcomponentupdate
---

# --description--

Finora, se un componente riceve un nuovo `state` o nuove `props`, avvia un re-rendering di sé stesso e di tutti i suoi figli. Questo normalmente va bene. Ma React fornisce un metodo per il ciclo di vita che puoi chiamare quando i componenti figli ricevono un nuovo `state` o `props`, e dichiarare specificamente se i componenti devono essere aggiornati o meno. Il metodo è `shouldComponentUpdate()`, e richiede `nextProps` e `nextState` come parametri.

Questo metodo è un modo utile per ottimizzare le prestazioni. Ad esempio, il comportamento predefinito è che il tuo componente rifà il render quando riceve nuove `props`, anche se le `props` non sono cambiate. È possibile utilizzare `shouldComponentUpdate()` per evitarlo confrontando le `props`. Il metodo deve restituire un valore `boolean` che dice a React se aggiornare o meno il componente. Puoi confrontare gli elementi attuali (`this.props`) con le nuove props (`nextProps`) per determinare se è necessario aggiornare o meno, e restituire `true` o `false` di conseguenza.

# --instructions--

Il metodo `shouldComponentUpdate()` viene aggiunto in un componente chiamato `OnlyEvens`. Attualmente, questo metodo restituisce `true` così `OnlyEvens` rifà il render ogni volta che riceve nuove `props`. Modifica il metodo in modo che `OnlyEvens` aggiorni solo se il `value` delle sue nuove props è pari. Fai clic sul pulsante `Add` e guarda l'ordine degli eventi nella console del browser mano a mano che vengono attivati durante il ciclo di vita.

# --hints--

Il componente `Controller` dovrebbe fare il rendering del componente figlio `OnlyEvens`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(Controller));
    return (
      mockedComponent.find('Controller').length === 1 &&
      mockedComponent.find('OnlyEvens').length === 1
    );
  })()
);
```

Il metodo `shouldComponentUpdate` dovrebbe essere definito sul componente `OnlyEvens`.

```js
assert(
  (() => {
    const child = React.createElement(OnlyEvens)
      .type.prototype.shouldComponentUpdate.toString()
      .replace(/s/g, '');
    return child !== 'undefined';
  })()
);
```

Il componente `OnlyEvens` dovrebbe restituire un tag `h1` che presenta il valore di `this.props.value`.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(Controller));
  const first = () => {
    mockedComponent.setState({ value: 1000 });
    return mockedComponent.find('h1').html();
  };
  const second = () => {
    mockedComponent.setState({ value: 10 });
    return mockedComponent.find('h1').html();
  };
  const firstValue = first();
  const secondValue = second();
  assert(firstValue === '<h1>1000</h1>' && secondValue === '<h1>10</h1>');
})();
```

`OnlyEvens` dovrebbe rifare il render solo quando `nextProps.value` è pari.

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(Controller));
  const first = () => {
    mockedComponent.setState({ value: 8 });
    return mockedComponent.find('h1').text();
  };
  const second = () => {
    mockedComponent.setState({ value: 7 });
    return mockedComponent.find('h1').text();
  };
  const third = () => {
    mockedComponent.setState({ value: 42 });
    return mockedComponent.find('h1').text();
  };
  const firstValue = first();
  const secondValue = second();
  const thirdValue = third();
  assert(firstValue === '8' && secondValue === '8' && thirdValue === '42');
})();
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<Controller />, document.getElementById('root'));
```

## --seed-contents--

```jsx
class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    // Change code below this line
    return true;
    // Change code above this line
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>;
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState(state => ({
      value: state.value + 1
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value} />
      </div>
    );
  }
}
```

# --solutions--

```jsx
class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    // Change code below this line
    return nextProps.value % 2 === 0;
    // Change code above this line
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>;
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState(state => ({
      value: state.value + 1
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value} />
      </div>
    );
  }
}
```
