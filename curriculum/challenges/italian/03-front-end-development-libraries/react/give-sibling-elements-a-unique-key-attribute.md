---
id: 5a24c314108439a4d403618b
title: Dare agli elementi fratelli un attributo chiave univoco
challengeType: 6
forumTopicId: 301394
dashedName: give-sibling-elements-a-unique-key-attribute
---

# --description--

L'ultima sfida ha mostrato come viene utilizzato il metodo `map` per rendere dinamicamente un certo numero di elementi basati sull'input dell'utente. Tuttavia in quell'esempio mancava una parte importante. Quando crei un array di elementi, ognuno ha bisogno di un attributo `key` impostato su un valore univoco. React utilizza queste chiavi per tenere traccia degli elementi aggiunti, modificati o rimossi. Questo aiuta a rendere il processo di ri-rendering più efficiente quando l'elenco viene modificato in qualsiasi modo.

**Nota:** Le chiavi devono essere uniche solo tra gli elementi fratelli: non c'è bisogno che siano uniche a livello globale nella tua applicazione.

# --instructions--

L'editor di codice ha un array con alcuni framework di front-end e un componente funzionale senza stato chiamato `Frameworks()`. `Frameworks()` ha bisogno di mappare l'array in una lista non ordinata, molto simile a quella dell'ultima sfida. Termina la scrittura della callback di `map` per restituire un elemento `li` per ogni framework nell'array `frontEndFrameworks`. Questa volta, assicurati di dare ad ogni attributo `li` un attributo `key` impostato su un valore univoco. Gli elementi `li` dovrebbero contenere anche del testo preso da `frontEndFrameworks`.

Normalmente, si desidera costruire la chiave con qualcosa che identifica univocamente l'elemento che viene presentato. Come ultima risorsa può essere utilizzato l'indice dell'array, ma in generale dovresti provare a usare un'identificazione univoca.

# --hints--

Il componente `Frameworks` dovrebbe esistere ed essere presentato nella pagina.

```js
assert(
  Enzyme.mount(React.createElement(Frameworks)).find('Frameworks').length === 1
);
```

`Frameworks` dovrebbe effetturare il rendering di un elemento `h1`.

```js
assert(Enzyme.mount(React.createElement(Frameworks)).find('h1').length === 1);
```

`Frameworks` dovrebbe effetturare il rendering di un elemento `ul`.

```js
assert(Enzyme.mount(React.createElement(Frameworks)).find('ul').length === 1);
```

Il tag `ul` dovrebbe fare il rendering di 6 elementi figli `li`.

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

Ogni elemento della lista dovrebbe avere un attributo `key` univoco.

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

Ogni elemento della lista dovrebbe contenere del testo preso da `frontEndFrameworks`.

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
