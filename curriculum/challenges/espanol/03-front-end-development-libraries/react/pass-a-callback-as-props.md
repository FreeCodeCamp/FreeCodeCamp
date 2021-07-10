---
id: 5a24c314108439a4d403617b
title: Pasa un callback como "props"
challengeType: 6
forumTopicId: 301400
dashedName: pass-a-callback-as-props
---

# --description--

Puedes pasar `state` como "props" a los componentes hijos, pero no estás limitado a pasar datos. También puedes pasar funciones manejadoras o cualquier método que se defina en un componente React a un componente hijo. Así es como tú permites que los componentes hijos interactúen con sus componentes padres. Pasas métodos a un hijo igual que un "prop" normal. Se le asigna un nombre y tienes acceso a ese nombre de método en `this.props` en el componente hijo.

# --instructions--

Hay tres componentes descritos en el editor de código. El componente `MyApp` es el padre que renderizará los componentes hijos `GetInput` y `RenderInput`. Añade el componente `GetInput` al método de renderizar en `MyApp`, luego pásale un "prop" llamado `input` asignado a `inputValue` desde el estado `state` de `MyApp`. También crea un "prop" llamado `handleChange` y pasa el controlador de entrada `handleChange` a este.

A continuación, añade `RenderInput` al método de renderizar en `MyApp`, luego crea un "prop" llamado `input` y pasa él `inputValue` desde el estado `state` a este. Una vez que hayas terminado podrás escribir en el campo `input` en el componente `GetInput`, que luego llama al método manejador en su padre a través de "props". Esto actualiza la entrada en el `state` del padre, que se pasa como "props" a ambos hijos. Observa cómo fluyen los datos entre los componentes y cómo la única fuente de verdad sigue siendo el `state` del componente padre. Es cierto que este ejemplo es un poco inventado, pero debe servir para ilustrar cómo los datos y los callbacks pueden ser pasados entre componentes React.

# --hints--

El componente `MyApp` debe renderizarse.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('MyApp').length === 1;
  })()
);
```

El componente `GetInput` debe renderizarse.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('GetInput').length === 1;
  })()
);
```

El componente `RenderInput` debe renderizarse.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('RenderInput').length === 1;
  })()
);
```

El componente `GetInput` debe recibir la propiedad de estado `MyApp` `inputValue` como "props" y contener un elemento `input` que modifica el estado de `MyApp`.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const state_1 = () => {
    mockedComponent.setState({ inputValue: '' });
    return waitForIt(() => mockedComponent.state());
  };
  const state_2 = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'TestInput' } });
    return waitForIt(() => mockedComponent.state());
  };
  const updated_1 = await state_1();
  const updated_2 = await state_2();
  assert(updated_1.inputValue === '' && updated_2.inputValue === 'TestInput');
};
```

El componente `RenderInput` debe recibir la propiedad de estado `MyApp` `inputValue` como "props".

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const state_1 = () => {
    mockedComponent.setState({ inputValue: 'TestName' });
    return waitForIt(() => mockedComponent);
  };
  const updated_1 = await state_1();
  assert(updated_1.find('p').text().includes('TestName'));
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyApp />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  render() {
    return (
       <div>
        { /* Change code below this line */ }

        { /* Change code above this line */ }
       </div>
    );
  }
};

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Get Input:</h3>
        <input
          value={this.props.input}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Input Render:</h3>
        <p>{this.props.input}</p>
      </div>
    );
  }
};
```

# --solutions--

```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
  this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  render() {
    return (
       <div>
         <GetInput
           input={this.state.inputValue}
           handleChange={this.handleChange}/>
         <RenderInput
           input={this.state.inputValue}/>
       </div>
    );
  }
};

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Get Input:</h3>
        <input
          value={this.props.input}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Input Render:</h3>
        <p>{this.props.input}</p>
      </div>
    );
  }
};
```
