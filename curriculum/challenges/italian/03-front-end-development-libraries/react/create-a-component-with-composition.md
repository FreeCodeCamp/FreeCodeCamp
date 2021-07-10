---
id: 5a24c314108439a4d4036164
title: Creare un componente con una composizione
challengeType: 6
forumTopicId: 301383
dashedName: create-a-component-with-composition
---

# --description--

Ora esamineremo come possiamo mettere insieme più componenti React. Immagina di costruire un'app e di aver creato tre componenti: una `Navbar`, una `Dashboard` e un `Footer`.

Per mettere insieme questi componenti, è possibile creare un componente `App` *genitore* che fa il render di ciascuno di questi tre componenti come *figli*. Per fare il render di un componente come figlio in un componente React, devi includere il nome del componente scritto come tag HTML personalizzato nel file JSX. Ad esempio, nel metodo `render` puoi scrivere:

```jsx
return (
 <App>
  <Navbar />
  <Dashboard />
  <Footer />
 </App>
)
```

Quando React incontra un tag HTML personalizzato che fa riferimento ad un altro componente (un nome componente inserito in `< />` come in questo esempio), visualizza il markup per quel componente nella posizione del tag. Questo dovrebbe illustrare la relazione genitore/figlio tra il componente `App` e la `Navbar`, la `Dashboard`, e il `Footer`.

# --instructions--

Nell'editor di codice, c'è un semplice componente funzionale chiamato `ChildComponent` e un componente di classe chiamato `ParentComponent`. Componi i due insieme facendo il render del `ChildComponent` all'interno del `ParentComponent`. Assicurati di chiudere il tag `ChildComponent` con una barra in avanti (/).

**Nota:** `ChildComponent` è definito con una funzione freccia ES6 perché questa è una pratica molto comune quando si utilizza React. Tuttavia, sappi che questa è solo una funzione. Se non hai familiarità con la sintassi delle funzioni freccia, fai riferimento alla sezione JavaScript.

# --hints--

Il componente React dovrebbe restituire un singolo elemento `div`.

```js
assert(
  (function () {
    var shallowRender = Enzyme.shallow(React.createElement(ParentComponent));
    return shallowRender.type() === 'div';
  })()
);
```

Il componente dovrebbe restituire due elementi annidati.

```js
assert(
  (function () {
    var shallowRender = Enzyme.shallow(React.createElement(ParentComponent));
    return shallowRender.children().length === 2;
  })()
);
```

Il componente dovrebbe restituire il componente `ChildComponent` come secondo figlio.

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
