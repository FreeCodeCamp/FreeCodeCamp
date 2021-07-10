---
id: 5a24c314108439a4d403618d
title: Renderiza React en el servidor con renderToString
challengeType: 6
forumTopicId: 301407
dashedName: render-react-on-the-server-with-rendertostring
---

# --description--

Hasta ahora, has estado renderizando componentes React en el cliente. Normalmente, esto es lo que siempre harás. Sin embargo, hay algunos casos de uso donde tiene sentido renderizar un componente React en el servidor. Dado que React es una biblioteca de vistas de JavaScript y se puede ejecutar JavaScript en el servidor con Node, esto es posible. De hecho, React proporciona un método `renderToString()` que puedes usar para este propósito.

Hay dos razones clave por las que el renderizado en el servidor puede ser usado en una aplicación del mundo real. Primero, sin hacer esto, tus aplicaciones de React consistirían en un archivo HTML relativamente vacío y un gran paquete de JavaScript cuando se carga inicialmente en el navegador. Esto puede no ser ideal para motores de búsqueda que intentan indexar el contenido de tus páginas para que la gente pueda encontrarte. Si renderizas el código HTML inicial en el servidor y lo envía al cliente, la carga de la página inicial contiene todo el código de la página que los motores de búsqueda pueden rastrear. Segundo, esto crea una experiencia de carga de página inicial más rápida porque el HTML renderizado es más pequeño que el código JavaScript de toda la aplicación. React aún podrá reconocer tu aplicación y administrarla después de la carga inicial.

# --instructions--

El método `renderToString()` se proporciona en `ReactDOMServer`, el cual está disponible aquí como un objeto global. El método toma un argumento que es un elemento React. Usa esto para renderizar `App` a una cadena.

# --hints--

El componente `App` debe renderizar a una cadena usando `ReactDOMServer.renderToString`.

```js
(getUserInput) =>
  assert(
    getUserInput('index')
      .replace(/ /g, '')
      .includes('ReactDOMServer.renderToString(<App/>)') &&
      Enzyme.mount(React.createElement(App)).children().name() === 'div'
  );
```

# --seed--

## --before-user-code--

```jsx
var ReactDOMServer = { renderToString(x) { return null; } };
```

## --after-user-code--

```jsx
ReactDOM.render(<App />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div/>
  }
};

// Change code below this line
```

# --solutions--

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div/>
  }
};

// Change code below this line
ReactDOMServer.renderToString(<App/>);
```
