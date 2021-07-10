---
id: 5a24c314108439a4d4036167
title: Renderiza un componente de clase al DOM
challengeType: 6
forumTopicId: 301404
dashedName: render-a-class-component-to-the-dom
---

# --description--

Puede que recuerdes haber usado la API ReactDOM en un desafío anterior para renderizar elementos JSX al DOM. El proceso para renderizar los componentes de React será muy similar. Los últimos desafíos se centraron en los componentes y la composición, por lo que el renderizado se ha realizado tras bambalinas. Sin embargo, ninguna parte de código de React que escribas se procesará en el DOM sin realizar una llamada a la API de ReactDOM.

Aquí va un recordatorio de la sintaxis: `ReactDOM.render(componentToRender, targetNode)`. El primer argumento es el componente de React que deseas renderizar. El segundo argumento es el nodo del DOM en el que deseas renderizar ese componente.

Los componentes de React se pasan a `ReactDOM.render()` de manera un poco diferente a como se hace con los elementos JSX. Para los elementos JSX, pasas el nombre del elemento que deseas representar. Sin embargo, para los componentes de React, debes usar la misma sintaxis que si estuvieras renderizando un componente anidado, por ejemplo, `ReactDOM.render(<ComponentToRender />, targetNode)`. Se utiliza esta sintaxis tanto para los componentes de clase ES6 como para los componentes funcionales.

# --instructions--

Los componentes `Fruits` y `Vegetables` se definen por ti tras bambalinas. Renderiza ambos componentes como hijos del componente `TypesOfFood`, y luego renderiza `TypesOfFood` al DOM. Hay un `div` con `id='challenge-node'` disponible para que lo uses.

# --hints--

El componente `TypesOfFood` debe devolver un solo elemento `div`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().type() === 'div';
  })()
);
```

El componente `TypesOfFood` debe renderizar el componente `Fruits` después del elemento `h1`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().childAt(1).name() === 'Fruits';
  })()
);
```

El componente `TypesOfFood` debe renderizar el componente `Vegetables` después de `Fruits`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(TypesOfFood));
    return mockedComponent.children().childAt(2).name() === 'Vegetables';
  })()
);
```

El componente `TypesOfFood` debe renderizarse al DOM dentro del `div` con el id `challenge-node`.

```js
assert(
  (function () {
    const html = document.getElementById('challenge-node').childNodes[0]
      .innerHTML;
    return (
      html.includes(
        '<div><h2>Fruits:</h2><h4>Non-Citrus:</h4><ul><li>Apples</li><li>Blueberries</li><li>Strawberries</li><li>Bananas</li></ul><h4>Citrus:</h4><ul><li>Lemon</li><li>Lime</li><li>Orange</li><li>Grapefruit</li></ul></div>'
      ) &&
      html.includes(
        '<div><h2>Vegetables:</h2><ul><li>Brussel Sprouts</li><li>Broccoli</li><li>Squash</li></ul></div>'
      )
    );
  })()
);
```

# --seed--

## --before-user-code--

```jsx
const Fruits = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <h4>Non-Citrus:</h4>
        <ul>
          <li>Apples</li>
          <li>Blueberries</li>
          <li>Strawberries</li>
          <li>Bananas</li>
        </ul>
      <h4>Citrus:</h4>
        <ul>
          <li>Lemon</li>
          <li>Lime</li>
          <li>Orange</li>
          <li>Grapefruit</li>
        </ul>
    </div>
  );
};
const Vegetables = () => {
  return (
    <div>
      <h2>Vegetables:</h2>
      <ul>
        <li>Brussel Sprouts</li>
        <li>Broccoli</li>
        <li>Squash</li>
      </ul>
    </div>
  );
};
```

## --seed-contents--

```jsx
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
};

// Change code below this line
```

# --solutions--

```jsx
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        {/* Change code below this line */}
          <Fruits />
           <Vegetables />
         {/* Change code above this line */}
      </div>
    );
  }
};

// Change code below this line
ReactDOM.render(<TypesOfFood />, document.getElementById('challenge-node'));
```
