---
id: 5a24c314108439a4d4036180
title: Optimiza re-renderizadores con shouldComponentUpdate
challengeType: 6
forumTopicId: 301398
dashedName: optimize-re-renders-with-shouldcomponentupdate
---

# --description--

Hasta ahora, si cualquier componente recibe un nuevo `state` o un nuevo `props`, se vuelve a renderizar a sí mismo y a todos sus hijos. Normalmente, esto está bien. Pero React proporciona un método de ciclo de vida al que puedes llamar cuando los componentes hijos reciben nuevos `state` o `props`, y declarar específicamente si los componentes deben actualizarse o no. El método es `shouldComponentUpdate()`y toma `nextProps` y `nextState` como parámetros.

Este método es una forma útil de optimizar el rendimiento. Por ejemplo, el comportamiento predeterminado es que el componente re-renderiza cuando recibe nuevos `props`, incluso si los `props` no han cambiado. Puedes usar `shouldComponentUpdate()` para evitar esto comparando los `props`. El método debe devolver un valor `boolean` que le diga a React si actualizar o no el componente. Puedes comparar los "props" actuales (`this.props`) a los siguientes "props" (`nextProps`) para determinar si necesita actualizar o no, y devuelve `true` o `false` en consecuencia.

# --instructions--

El método `shouldComponentUpdate()` se añade en un componente llamado `OnlyEvens`. Actualmente, este método devuelve `true`, así que `OnlyEvens` re-renderizar cada vez que recibe nuevos `props`. Modifica el método para que `OnlyEvens` se actualice sólo si el `value` de sus nuevos accesorios es par. Haz clic en el botón `Add` y observa el orden de los eventos en la consola de tu navegador mientras se activan los "hooks" del ciclo de vida.

# --hints--

El componente `Controller` debe renderizar el componente `OnlyEvens` como un componente hijo.

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

El método `shouldComponentUpdate` debe definirse en el componente `OnlyEvens`.

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

El componente `OnlyEvens` debe devolver una etiqueta `h1` que renderiza el valor de `this.props.value`.

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

`OnlyEvens` debe re-renderizar sólo cuando `nextProps.value` sea par.

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
