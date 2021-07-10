---
id: 5a24c314108439a4d403617e
title: Agrega detector de eventos (Event Listeners)
challengeType: 6
forumTopicId: 301377
dashedName: add-event-listeners
---

# --description--

El método `componentDidMount()` es también el mejor lugar para adjuntar cualquier detector de eventos que necesites agregar para una funcionalidad específica. React proporciona un sistema de eventos sintético que envuelve el sistema de eventos nativo presente en los navegadores. Esto significa que el sistema de eventos sintético se comporta exactamente igual independientemente del navegador del usuario, incluso si los eventos nativos se comportan diferentes entre diferentes navegadores.

Ya has estado usando algunos de estos controladores de eventos sintéticos como `onClick()`. El sistema de eventos sintéticos de React es excelente para usar en la mayoría de las interacciones que administrarás en elementos DOM. Sin embargo, si quieres adjuntar un controlador de eventos al documento o objetos de la ventana, debes hacerlo directamente.

# --instructions--

Agrega un detector de eventos en el método `componentDidMount()` para los eventos `keydown` y haz que estos eventos ejecuten el callback `handleKeyPress()`. Puedes usar `document.addEventListener()` el cual toma el evento (en comillas) como primer argumento y el callback como segundo argumento.

Posteriormente, en `componentWillUnmount()`, remueve este mismo detector de eventos. Puedes pasar los mismos argumentos al `document.removeEventListener()`. Es buena práctica usar este método del ciclo de vida para hacer cualquier limpieza en un componente de React antes de que estos sean desmontados y destruidos. Removiendo los detectores de eventos es un ejemplo de una limpieza de este tipo.

# --hints--

`MyComponent` debe mostrar un elemento `div` el cual envuelva una etiqueta `h1`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('div').children().find('h1').length === 1;
  })()
);
```

Un detector `keydown` debe ser agregado al documento en `componentDidMount`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    const didMountString = mockedComponent
      .instance()
      .componentDidMount.toString();
    return new RegExp(
      'document.addEventListener(.|\n|\r)+keydown(.|\n|\r)+this.handleKeyPress'
    ).test(didMountString);
  })()
);
```

Un detector `keydown` debe ser removido del documento en `componentWillUnmount`.

```js
assert(
  (() => {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    const willUnmountString = mockedComponent
      .instance()
      .componentWillUnmount.toString();
    return new RegExp(
      'document.removeEventListener(.|\n|\r)+keydown(.|\n|\r)+this.handleKeyPress'
    ).test(willUnmountString);
  })()
);
```

Una vez que el componente se ha montado, pulsando `enter` debe actualizar el estado y renderizar la etiqueta `h1`.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const beforeState = mockedComponent.state('message');
  const beforeText = mockedComponent.find('h1').text();
  const pressEnterKey = () => {
    mockedComponent.instance().handleKeyPress({ keyCode: 13 });
    return waitForIt(() => {
      mockedComponent.update();
      return {
        state: mockedComponent.state('message'),
        text: mockedComponent.find('h1').text()
      };
    });
  };
  const afterKeyPress = await pressEnterKey();
  assert(
    beforeState !== afterKeyPress.state && beforeText !== afterKeyPress.text
  );
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
      message: ''
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  // Change code below this line
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  // Change code above this line
  handleEnter() {
    this.setState((state) => ({
      message: state.message + 'You pressed the enter key! '
    }));
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
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
      message: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleEnter = this.handleEnter.bind(this);  }
  componentDidMount() {
    // Change code below this line
    document.addEventListener('keydown', this.handleKeyPress);
    // Change code above this line
  }
  componentWillUnmount() {
    // Change code below this line
    document.removeEventListener('keydown', this.handleKeyPress);
    // Change code above this line
  }
  handleEnter() {
    this.setState((state) => ({
      message: state.message + 'You pressed the enter key! '
    }));
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
};
```
