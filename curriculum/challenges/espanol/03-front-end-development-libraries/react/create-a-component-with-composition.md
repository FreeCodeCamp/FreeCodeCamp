---
id: 5a24c314108439a4d4036164
title: Crear un componente con composición
challengeType: 6
forumTopicId: 301383
dashedName: create-a-component-with-composition
---

# --description--

Ahora veremos cómo podemos componer múltiples componentes de React juntos. Imagina que estás construyendo una aplicación y has creado tres componentes: un `Navbar`, `Dashboard` y `Footer`.

Para componer estos componentes juntos, se podría crear un componente `App` *parent* que renderiza cada uno de estos tres componentes como *children*. Para renderizar un componente como hijo en un componente React, se incluye el nombre del componente escrito como una etiqueta HTML personalizada en el JSX. Por ejemplo, en el método `render` se puede escribir:

```jsx
return (
 <App>
  <Navbar />
  <Dashboard />
  <Footer />
 </App>
)
```

Cuando React encuentra una etiqueta HTML personalizada que hace referencia a otro componente (un nombre de componente envuelto en `< />` como en este ejemplo), renderiza el marcado de ese componente en la ubicación de la etiqueta. Esto debería ilustrar la relación padre/hijo entre el componente `App` y `Navbar`, `Dashboard`, y `Footer`.

# --instructions--

En el editor de código, hay un componente funcional simple llamado `ChildComponent` y un componente de clase llamado `ParentComponent`. Compón los dos juntos renderizando el `ChildComponent` dentro del `ParentComponent`. Asegúrate de cerrar la etiqueta `ChildComponent` con una barra diagonal.

**Nota:** `ChildComponent` se define con una función de flecha ES6 porque es una práctica muy común al usar React. Sin embargo, has de saber que se trata de una función simple. Si no estás familiarizado con la sintaxis de la función flecha, consulta la sección de JavaScript.

# --hints--

El componente React debe devolver un único elemento `div`.

```js
assert(
  (function () {
    var shallowRender = Enzyme.shallow(React.createElement(ParentComponent));
    return shallowRender.type() === 'div';
  })()
);
```

El componente debe devolver dos elementos anidados.

```js
assert(
  (function () {
    var shallowRender = Enzyme.shallow(React.createElement(ParentComponent));
    return shallowRender.children().length === 2;
  })()
);
```

El componente debe devolver el `ChildComponent` como un segundo hijo.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ParentComponent));
    return (
      mockedComponent.find('ParentComponent').find('ChildComponent').length ===
      1
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<ParentComponent />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        { /* Change code below this line */ }


        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        { /* Change code below this line */ }
        <ChildComponent />
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
