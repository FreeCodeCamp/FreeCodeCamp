---
id: 5a24c314108439a4d403617c
title: Usare il metodo del ciclo di vita componentWillMount
challengeType: 6
forumTopicId: 301423
dashedName: use-the-lifecycle-method-componentwillmount
---

# --description--

I componenti React hanno diversi metodi speciali che offrono l'opportunità di eseguire azioni in punti specifici del ciclo di vita di un componente. Questi sono chiamati metodi del ciclo di vita, o hooks (ganci) del ciclo di vita, e consentono di intercettare i componenti in determinati istanti. Ad esempio prima che sia fatto il render del componente, prima di aggiornarlo, prima di ricevere le prop, prima di smontarlo, e così via. Ecco un elenco di alcuni dei principali metodi del ciclo di vita: `componentWillMount()` `componentDidMount()` `shouldComponentUpdate()` `componentDidUpdate()` `componentWillUnmount()` Le prossime lezioni copriranno alcuni dei casi di base per questi metodi del ciclo di vita.

**Nota:** Il metodo del ciclo di vita `componentWillMount` sarà deprecato in una versione futura di 16.X e rimosso nella versione 17. [(Fonte)](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html)

# --instructions--

Il metodo `componentWillMount()` viene chiamato prima del metodo `render()` quando un componente viene montato sul DOM. Scrivi qualcosa nella console all'interno di `componentWillMount()` - potresti aprire la console del browser per vedere l'output.

# --hints--

`MyComponent` dovrebbe presentare un elemento `div`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('div').length === 1;
  })()
);
```

`console.log` dovrebbe essere chiamato in `componentWillMount`.

```js
assert(
  (function () {
    const lifecycle = React.createElement(MyComponent)
      .type.prototype.componentWillMount.toString()
      .replace(/ /g, '');
    return lifecycle.includes('console.log(');
  })()
);
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
  }
  componentWillMount() {
    // Change code below this line

    // Change code above this line
  }
  render() {
    return <div />
  }
};
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // Change code below this line
    console.log('Component is mounting...');
    // Change code above this line
  }
  render() {
    return <div />
  }
};
```
