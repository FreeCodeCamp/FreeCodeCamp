---
id: 5a24c314108439a4d403618b
title: Proporciona a los elementos hermanos un atributo de clave única
challengeType: 6
forumTopicId: 301394
dashedName: give-sibling-elements-a-unique-key-attribute
---

# --description--

El último desafío mostró cómo el método `map` es usado para representar dinámicamente un número de elementos según la entrada del usuario. Sin embargo, faltaba una pieza importante de ese ejemplo. Cuando creas un arreglo de elementos, cada uno necesita un atributo `key` establecido en un valor único. React usa estas claves para realizar un seguimiento de los elementos que se agregan, cambian o eliminan. Esto ayuda a que el proceso de re-renderización sea más eficiente cuando la lista se modifica de alguna manera.

**Nota:** Las claves solo necesitan ser únicas entre elementos hermanos, no es necesario que sean únicas globalmente en tu aplicación.

# --instructions--

El editor de código tiene un arreglo con algunos frameworks frontend y un componente funcional sin estado llamado `Frameworks()`. `Frameworks()` necesita mapear el arreglo a una lista desordenada, como en el último desafío. Finaliza la escritura del callback `map` para devolver un elemento `li` por cada framework en el arreglo `frontEndFrameworks`. Esta vez, debes asegurarte de dar a cada elemento `li` un atributo `key`, establecido a un valor único. Los elementos `li` también deben contener texto de `frontEndFrameworks`.

Normalmente, deseas hacer que la clave sea algo que identifique de manera única el elemento que se está procesando. Como último recurso se puede utilizar el índice del arreglo, pero normalmente se debe intentar usar una identificación única.

# --hints--

El componente `Frameworks` debe de existir y renderizar a la página.

```js
assert(
  Enzyme.mount(React.createElement(Frameworks)).find('Frameworks').length === 1
);
```

`Frameworks` debe renderizar un elemento `h1`.

```js
assert(Enzyme.mount(React.createElement(Frameworks)).find('h1').length === 1);
```

`Frameworks` debe renderizar un elemento `ul`.

```js
assert(Enzyme.mount(React.createElement(Frameworks)).find('ul').length === 1);
```

La etiqueta `ul` debe renderizar 6 elementos hijos `li`.

```js
assert(
  Enzyme.mount(React.createElement(Frameworks)).find('ul').children().length ===
    6 &&
    Enzyme.mount(React.createElement(Frameworks))
      .find('ul')
      .childAt(0)
      .name() === 'li' &&
    Enzyme.mount(React.createElement(Frameworks)).find('li').length === 6
);
```

Cada elemento de la lista de elementos debe tener un atributo `key` único.

```js
assert(
  (() => {
    const ul = Enzyme.mount(React.createElement(Frameworks)).find('ul');
    const keys = new Set([
      ul.childAt(0).key(),
      ul.childAt(1).key(),
      ul.childAt(2).key(),
      ul.childAt(3).key(),
      ul.childAt(4).key(),
      ul.childAt(5).key()
    ]);
    return keys.size === 6;
  })()
);
```

Cada elemento de la lista de elementos debe contener un texto de `frontEndFrameworks`.

```js
assert(
  (() => {
    const li = Enzyme.mount(React.createElement(Frameworks))
      .find('ul')
      .children();
    return [...Array(5)].every((_, i) =>
      frontEndFrameworks.includes(li.at(i).text())
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<Frameworks />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = null; // Change this line
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};
```

# --solutions--

```jsx
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = frontEndFrameworks.map((fw, i) => <li key={i}>{fw}</li>);
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};
```
