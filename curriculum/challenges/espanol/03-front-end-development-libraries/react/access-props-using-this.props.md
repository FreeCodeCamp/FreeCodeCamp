---
id: 5a24c314108439a4d403616e
title: Accede a propiedades "props" usando this.props
challengeType: 6
forumTopicId: 301375
dashedName: access-props-using-this-props
---

# --description--

Los últimos desafíos cubrieron las formas básicas de pasar propiedades a un componente hijo. Pero, ¿qué pasa si el componente hijo al que se le pasa una propiedad es un componente de clase ES6, en lugar de un componente funcional sin estado? Los componentes de clase ES6 usan una convención un poco diferente para acceder a las propiedades.

Cada vez que se hace referencia a un componente de clase en sí mismo, se utiliza la palabra clave `this`. Para acceder a las propiedades dentro de un componente de clase, se antepone al código que se utiliza para acceder a él con `this`. Por ejemplo, si un componente de clase de ES6 tiene una propiedad llamada `data`, se escribirá `{this.props.data}` en JSX.

# --instructions--

Renderiza una instancia del componente `ReturnTempPassword` en el componente padre `ResetPassword`. Aquí, dale a `ReturnTempPassword` una propiedad de `tempPassword` y asígnale un valor de una cadena que tenga al menos 8 caracteres. Dentro del componente hijo, `ReturnTempPassword`, accede a la propiedad `tempPassword` dentro de las etiquetas `strong` para asegurarte que el usuario vea una contraseña temporal.

# --hints--

El componente `ResetPassword` debe devolver un único elemento `div`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return mockedComponent.children().type() === 'div';
  })()
);
```

El cuarto componente hijo de `ResetPassword` debe ser el componente `ReturnTempPassword`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return (
      mockedComponent.children().childAt(3).name() === 'ReturnTempPassword'
    );
  })()
);
```

El componente `ReturnTempPassword` debe tener una propiedad llamada `tempPassword`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return mockedComponent.find('ReturnTempPassword').props().tempPassword;
  })()
);
```

La propiedad `tempPassword` de `ReturnTempPassword` debe ser igual a una cadena de al menos 8 caracteres.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    const temp = mockedComponent.find('ReturnTempPassword').props()
      .tempPassword;
    return typeof temp === 'string' && temp.length >= 8;
  })()
);
```

El componente `ReturnTempPassword` debe mostrar la contraseña creada en la propiedad `tempPassword` dentro de las etiquetas `strong`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return (
      mockedComponent.find('strong').text() ===
      mockedComponent.find('ReturnTempPassword').props().tempPassword
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<ResetPassword />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class ReturnTempPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
            { /* Change code below this line */ }
            <p>Your temporary password is: <strong></strong></p>
            { /* Change code above this line */ }
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <h2>Reset Password</h2>
          <h3>We've generated a new temporary password for you.</h3>
          <h3>Please reset this password from your account settings ASAP.</h3>
          { /* Change code below this line */ }

          { /* Change code above this line */ }
        </div>
    );
  }
};
```

# --solutions--

```jsx
class ReturnTempPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
            <p>Your temporary password is: <strong>{this.props.tempPassword}</strong></p>
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <h2>Reset Password</h2>
          <h3>We've generated a new temporary password for you.</h3>
          <h3>Please reset this password from your account settings ASAP.</h3>
          { /* Change code below this line */ }
          <ReturnTempPassword tempPassword="serrPbqrPnzc" />
          { /* Change code above this line */ }
        </div>
    );
  }
};
```
