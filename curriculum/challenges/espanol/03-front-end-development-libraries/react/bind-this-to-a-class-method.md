---
id: 5a24c314108439a4d4036174
title: Vincula 'this' a un método de clase
challengeType: 6
forumTopicId: 301379
dashedName: bind-this-to-a-class-method
---

# --description--

Además de configurar y actualizar `state`, también puedes definir métodos para tu componente de clase. Un método de clase normalmente necesita usar la palabra clave `this` para que pueda acceder a propiedades de la clase (como `state` y `props`) dentro del ámbito del método. Hay algunas maneras de permitir que los métodos de tu clase accedan a `this`.

Una forma común es enlazar explícitamente `this` en el constructor para que `this` se vincule a los métodos de clase cuando el componente es inicializado. Habrás notado que el último desafío utilizó `this.handleClick = this.handleClick.bind(this)` para su método `handleClick` en el constructor. Luego, cuando llamas a una función como `this.setState()` dentro de su método de clase, `this` se refiere a la clase y no será `undefined`.

**Nota:** La palabra clave `this` es uno de los aspectos más confusos de JavaScript pero juega un papel importante en React. Aunque su comportamiento aquí es totalmente normal, estas lecciones no son el lugar para una revisión a profundidad de `this`, así que por favor, ¡consulta otras lecciones si lo anterior es confuso!

# --instructions--

El editor de código tiene un componente con un `state` que mantiene un seguimiento del texto. También tiene un método que le permite establecer el texto a `You clicked!`. Sin embargo, el método no funciona porque está utilizando la palabra clave `this` que no está definida. Arréglalo explícitamente ligando `this` al método `handleClick()` en el constructor del componente.

A continuación, añade un click handler al elemento `button` en el método render. Debes activar el método `handleClick()` cuando el botón recibe un evento de clic. Recuerda que el método que pasas al `onClick` handler necesita llaves porque debe ser interpretado directamente como JavaScript.

Una vez que completes los pasos anteriores debes poder hacer clic en el botón y ver `You clicked!`.

# --hints--

`MyComponent` debe devolver un elemento `div` que envuelve dos elementos, un botón y un elemento `h1`, en ese orden.

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

El estado de `MyComponent` debe inicializarse con el par de clave valor `{ text: "Hello" }`.

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).state('text') === 'Hello'
);
```

Al hacer clic en el botón `button` se debe ejecutar el método `handleClick` y establecer el estado `text` en `You clicked!`.

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
