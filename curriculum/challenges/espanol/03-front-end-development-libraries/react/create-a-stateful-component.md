---
id: 5a24c314108439a4d4036170
title: Crea un componente de estado
challengeType: 6
forumTopicId: 301391
dashedName: create-a-stateful-component
---

# --description--

Uno de los temas más importantes en React es `state`. El estado consiste en cualquier dato que tu aplicación necesite conocer y que pueda cambiar con el tiempo. Quieres que tus aplicaciones respondan a los cambios de estado y presenten una interfaz de usuario actualizada cuando sea necesario. React ofrece una buena solución para el manejo de estado de aplicaciones web modernas.

Creas un estado en un componente de React declarando una propiedad `state` en la clase del componente en su `constructor`. Esto inicializa el componente con `state` cuando se crea. La propiedad `state` debe establecerse en un `object` de JavaScript. Declararlo se ve así:

```jsx
this.state = {

}
```

Tienes acceso al objeto `state` a lo largo de la vida de tu componente. Puedes actualizarlo, renderizarlo en tu interfaz de usuario y pasarlo como propiedades a componentes hijos. El objeto `state` puede ser tan complejo o simple como lo necesites. Ten en cuenta que debes crear un componente de clase heredando `React.Component` para crear un `state` como este.

# --instructions--

Hay un componente en el editor de código que está intentando renderizar una propiedad `name` desde su `state`. Sin embargo, no hay ningún `state` definido. Inicializa el componente con `state` en el `constructor` y asigna tu nombre a una propiedad de `name`.

# --hints--

`StatefulComponent` debe existir y renderizar.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(
      React.createElement(StatefulComponent)
    );
    return mockedComponent.find('StatefulComponent').length === 1;
  })()
);
```

`StatefulComponent` debe renderizar un `div` y un elemento `h1`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(
      React.createElement(StatefulComponent)
    );
    return (
      mockedComponent.find('div').length === 1 &&
      mockedComponent.find('h1').length === 1
    );
  })()
);
```

El estado de `StatefulComponent` debe inicializarse con una propiedad `name` establecida a una cadena.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(
      React.createElement(StatefulComponent)
    );
    const initialState = mockedComponent.state();
    return (
      typeof initialState === 'object' && typeof initialState.name === 'string'
    );
  })()
);
```

La propiedad `name` en el estado de `StatefulComponent` debe renderizarse en el elemento `h1`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(
      React.createElement(StatefulComponent)
    );
    const initialState = mockedComponent.state();
    return mockedComponent.find('h1').text() === initialState.name;
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<StatefulComponent />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    // Only change code below this line

    // Only change code above this line
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```

# --solutions--

```jsx
class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp!'
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```
