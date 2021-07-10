---
id: 5a24c314108439a4d4036178
title: Crea una entrada controlada
challengeType: 6
forumTopicId: 301385
dashedName: create-a-controlled-input
---

# --description--

Tu aplicación puede tener interacciones más complejas entre `state` y la interfaz de usuario renderizada. Por ejemplo, elementos de control de formulario para la entrada de texto, tales como `input` y `textarea`, mantienen su propio estado en el DOM como los tipos de usuario. Con React, puedes mover este estado mutable hacia el `state` de un componente de React. La entrada del usuario se convierte en parte del `state` de la aplicación, así que React controla el valor de ese campo de entrada. Por lo general, si tienes componentes de React con campos de entrada en los que el usuario puede escribir, será un formulario de entrada controlado.

# --instructions--

El editor de código tiene el esqueleto de un componente llamado `ControlledInput` para crear un elemento `input` controlado. El `state` del componente ya está inicializado con una propiedad `input` que contiene una cadena vacía. Este valor representa el texto que un usuario escribe en el campo `input`.

Primero, crea un método llamado `handleChange()` que tiene un parámetro llamado `event`. Cuando el método es llamado, este recibe un objeto `event` que contiene una cadena de texto del elemento `input`. Puedes acceder a esta cadena con `event.target.value` dentro del método. Actualiza la propiedad `input` del `state` del componente con esta nueva cadena.

En el método `render`, crea el elemento `input` encima de la etiqueta `h4`. Añade un atributo `value` que es igual a la propiedad `input` del `state` del componente. Luego añade un manejador de eventos `onChange()` establecido al método `handleChange()`.

Cuando escribes en el cuadro de entrada, ese texto es procesado por el método `handleChange()`, establecido como la propiedad `input` en el `state` local, y renderizado como el valor en el cuadro `input` de la página. El `state` del componente es la única fuente de verdad con respecto a los datos de entrada.

Por último, pero no menos importante, no olvides añadir los enlaces necesarios en el constructor.

# --hints--

`ControlledInput` debe devolver un elemento `div` que contiene un `input` y una etiqueta `p`.

```js
assert(
  Enzyme.mount(React.createElement(ControlledInput))
    .find('div')
    .children()
    .find('input').length === 1 &&
    Enzyme.mount(React.createElement(ControlledInput))
      .find('div')
      .children()
      .find('p').length === 1
);
```

El estado de `ControlledInput` debe inicializarse con una propiedad `input` establecida a una cadena vacía.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(ControlledInput)).state('input'),
  ''
);
```

Escribir en el elemento de entrada debe actualizar el estado y el valor de la entrada, y el elemento `p` debe renderizar este estado a medida que escribas.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(ControlledInput));
  const _1 = () => {
    mockedComponent.setState({ input: '' });
    return waitForIt(() => mockedComponent.state('input'));
  };
  const _2 = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'TestInput' } });
    return waitForIt(() => ({
      state: mockedComponent.state('input'),
      text: mockedComponent.find('p').text(),
      inputVal: mockedComponent.find('input').props().value
    }));
  };
  const before = await _1();
  const after = await _2();
  assert(
    before === '' &&
      after.state === 'TestInput' &&
      after.text === 'TestInput' &&
      after.inputVal === 'TestInput'
  );
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<ControlledInput />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    // Change code below this line

    // Change code above this line
  }
  // Change code below this line

  // Change code above this line
  render() {
    return (
      <div>
        { /* Change code below this line */}

        { /* Change code above this line */}
        <h4>Controlled Input:</h4>
        <p>{this.state.input}</p>
      </div>
    );
  }
};
```

# --solutions--

```jsx
class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  render() {
    return (
      <div>
        <input
          value={this.state.input}
          onChange={this.handleChange} />
        <h4>Controlled Input:</h4>

        <p>{this.state.input}</p>
      </div>
    );
  }
};
```
