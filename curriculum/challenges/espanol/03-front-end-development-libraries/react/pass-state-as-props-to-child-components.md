---
id: 5a24c314108439a4d403617a
title: Pasa el estado como "props" a componentes hijos
challengeType: 6
forumTopicId: 301403
dashedName: pass-state-as-props-to-child-components
---

# --description--

Has visto varios ejemplos de como pasar props a elementos JSX hijos y a componentes React hijos en desafíos anteriores. Te preguntarás de dónde vienen esos props. Un patrón común es tener un componente con estado que contenga el `state` importante para tu aplicación, que luego renderiza los componentes hijos. Quieres que estos componentes tengan acceso a algunas partes de ese `state`, el cual se pasa como props.

Por ejemplo, tal vez tengas un componente `App` que renderiza una `Navbar`, entre otros componentes. En tu `App`, tienes un `state` que contiene mucha información del usuario, pero la `Navbar` sólo necesita acceder al nombre de usuario para poder mostrarlo. Pasas esa parte del `state` al componente `Navbar` como prop.

Este patrón ilustra algunos paradigmas importantes en React. El primero es *unidirectional data flow*. El componente de estado fluye en una sola dirección descendiendo en el árbol de componentes de tu aplicación, desde el componente padre hasta los componentes hijos. Los componentes hijos únicamente reciben los datos del componente de estado que ellos necesitan. La segunda es que las aplicaciones con estado pueden ser divididas en solo algunos, o tal vez un solo, componente con estado. El resto de tus componentes simplemente reciben el estado del padre como props, y renderizan la interfaz de usuario a partir de ese estado. Esto comienza a crear una separación donde la administración de estado es manejada en una parte del código y la renderización de la interfaz de usuario en otra. Este principio de separar la lógica de estado de la lógica de la interfaz de usuario es uno de los principios clave de React. Cuando se utiliza correctamente, hace que el diseño de aplicaciones complejas y de estado sea mucho más fácil de gestionar.

# --instructions--

El componente `MyApp` es de estado y renderiza un componente `Navbar` como un componente hijo. Pasa la propiedad `name` en su `state` al componente hijo, luego muestra el `name` en la etiqueta `h1` que es parte del método de renderizado de `Navbar`. `name` debe aparecer luego del texto `Hello, my name is:`.

# --hints--

El componente `MyApp` debe renderizare con un componente `Navbar` dentro.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return (
      mockedComponent.find('MyApp').length === 1 &&
      mockedComponent.find('Navbar').length === 1
    );
  })()
);
```

El componente `Navbar` debe recibir la propiedad de estado `name` de `MyApp` como props.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const setState = () => {
    mockedComponent.setState({ name: 'TestName' });
    return waitForIt(() => mockedComponent.find('Navbar').props());
  };
  const navProps = await setState();
  assert(navProps.name === 'TestName');
};
```

El elemento `h1` en `Navbar` debe renderizar el prop `name`.

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const navH1Before = mockedComponent.find('Navbar').find('h1').text();
  const setState = () => {
    mockedComponent.setState({ name: 'TestName' });
    return waitForIt(() => mockedComponent.find('Navbar').find('h1').text());
  };
  const navH1After = await setState();
  assert(new RegExp('TestName').test(navH1After) && navH1After !== navH1Before);
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
      name: 'CamperBot'
    }
  }
  render() {
    return (
       <div>
         {/* Change code below this line */}
         <Navbar />
         {/* Change code above this line */}
       </div>
    );
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      {/* Change code below this line */}
      <h1>Hello, my name is: </h1>
      {/* Change code above this line */}
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
      name: 'CamperBot'
    }
  }
  render() {
    return (
       <div>
         <Navbar name={this.state.name}/>
       </div>
    );
  }
};
class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <h1>Hello, my name is: {this.props.name}</h1>
    </div>
    );
  }
};
```
