---
id: 5a24c314108439a4d4036182
title: Agrega inline styles en React
challengeType: 6
forumTopicId: 301378
dashedName: add-inline-styles-in-react
---

# --description--

Es posible que hayas notado en el último desafío que había otras diferencias de sintaxis con respecto a los "inline styles" de HTML, además del atributo `style` establecido en un objeto de JavaScript. En primer lugar, los nombres de ciertas propiedades de estilo CSS utilizan camel case. Por ejemplo, el último desafío establece el tamaño de la fuente con `fontSize` en lugar de `font-size`. Palabras que incluyen guion como `font-size` son sintaxis inválidas para propiedades de objetos de JavaScript, por lo que React utiliza camel case. Como regla, cualquier propiedad de estilo que usa guion se escribe usando camel case en JSX.

Todas las unidades de longitud del valor de la propiedad (como `height`, `width`, y `fontSize`) se supone que están en `px` a menos que se especifique lo contrario. Si quieres utilizar `em`, por ejemplo, debes envolver el valor y las unidades entre comillas, como `{fontSize: "4em"}`. Aparte de los valores de longitud que por defecto son `px`, todos los demás valores de las propiedades deben estar envueltos entre comillas.

# --instructions--

Si tienes una gran cantidad de estilos, puedes asignar un `object` de estilos a una constante para mantener tu código organizado. Declara tu constante "styles" como una variable global al principio del archivo. Inicializa la constante `styles` y asígnale un `object` con tres propiedades de estilo y sus valores. Dale al `div` un color `purple`, un tamaño de fuente de `40` y un borde `2px solid purple`. Luego asigna al atributo `style` la constante `styles`.

# --hints--

La variable `styles` debe ser un `object` con tres propiedades.

```js
assert(Object.keys(styles).length === 3);
```

La variable `styles` debe contener una propiedad `color` con el valor de `purple`.

```js
assert(styles.color === 'purple');
```

La variable `styles` debe contener una propiedad `fontSize` con el valor de `40`.

```js
assert(styles.fontSize === 40);
```

La variable `styles` debe contener una propiedad `border` con el valor de `2px solid purple`.

```js
assert(styles.border === '2px solid purple');
```

El componente debe renderizar un elemento `div`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.shallow(React.createElement(Colorful));
    return mockedComponent.type() === 'div';
  })()
);
```

El elemento `div` debe tener sus estilos definidos en el objeto `styles`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.shallow(React.createElement(Colorful));
    return (
      mockedComponent.props().style.color === 'purple' &&
      mockedComponent.props().style.fontSize === 40 &&
      mockedComponent.props().style.border === '2px solid purple'
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<Colorful />, document.getElementById('root'))
```

## --seed-contents--

```jsx
// Change code above this line
class Colorful extends React.Component {
  render() {
    // Change code below this line
    return (
      <div style={{color: "yellow", fontSize: 24}}>Style Me!</div>
    );
    // Change code above this line
  }
};
```

# --solutions--

```jsx
const styles = {
  color: "purple",
  fontSize: 40,
  border: "2px solid purple"
};
// Change code above this line
class Colorful extends React.Component {
  render() {
    // Change code below this line
    return (
      <div style={styles}>Style Me!</div>
    );
    // Change code above this line
  }
};
```
