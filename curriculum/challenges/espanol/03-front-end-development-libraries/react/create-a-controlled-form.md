---
id: 5a24c314108439a4d4036179
title: Crea un formulario controlado
challengeType: 6
forumTopicId: 301384
dashedName: create-a-controlled-form
---

# --description--

El último desafío mostró que React puede controlar el estado interno de ciertos elementos como `input` y `textarea`, lo que los hace componentes controlados. Esto también se aplica a otros elementos del formulario, incluyendo el elemento regular HTML `form`.

# --instructions--

El componente `MyForm` está configurado con un `form` vacío, con un manejador de envío. El manejador de envío será llamado cuando se envíe el formulario.

Hemos añadido un botón que envía el formulario. Puedes ver que tiene el `type` establecido en `submit` indicando que es el botón que controla el formulario. Añade el elemento `input` en el formulario `form` y establece sus atributos `value` y `onChange()` como el último desafío. A continuación, debes completar el método `handleSubmit` para que establezca la propiedad de estado del componente `submit` al valor de entrada actual en el `state` local.

**Nota:** También debes llamar a `event.preventDefault()` en el controlador de envío, para evitar el comportamiento predeterminado de envío de formulario que actualizará la página web. Para la comodidad de los campistas, el comportamiento predeterminado se ha desactivado aquí para evitar que las actualizaciones restablezcan el código de desafío.

Por último, crea una etiqueta `h1` después del `form` que renderiza el valor de `submit` del `state` del componente. A continuación, puedes escribir en el formulario y hacer clic en el botón (o pulsar intro), y deberías ver tu entrada renderizada en la página.

# --hints--

`MyForm` debe retornar un elemento `div` que contiene un `form` y una etiqueta `h1`. El formulario debe incluir un `input` y un `button`.

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

El estado de `MyForm` debe inicializar con propiedades `input` y `submit`, ambos establecidos a cadenas vacías.

```js
assert(
  Enzyme.mount(React.createElement(MyForm)).state('input') === '' &&
    Enzyme.mount(React.createElement(MyForm)).state('submit') === ''
);
```

Escribir en el elemento `input` debe actualizar la propiedad `input` del estado del componente.

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

El envío del formulario debe ejecutar `handleSubmit`, el cual debe establecer la propiedad `submit` en estado igual a la entrada actual.

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

`handleSubmit` debe llamar a `event.preventDefault`

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

El encabezado `h1` debe renderizar el valor del campo `submit` del estado del componente.

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
