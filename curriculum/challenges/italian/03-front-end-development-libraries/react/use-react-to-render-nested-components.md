---
id: 5a24c314108439a4d4036165
title: Usare React per presentare i componenti annidati
challengeType: 6
forumTopicId: 301420
dashedName: use-react-to-render-nested-components
---

# --description--

L'ultima sfida ha mostrato un modo semplice per comporre due componenti, ma ci sono molti modi diversi per comporre componenti con React.

La composizione dei componenti è una delle potenti caratteristiche di React. Quando si lavora con React, è importante iniziare a pensare alla tua interfaccia utente in termini di componenti come abbiamo visto nell'App di esempio dell'ultima sfida. Scomponi la tua interfaccia utente nei suoi blocchi di base e quei pezzi diventeranno i componenti. Questo aiuta a separare il codice responsabile dell'interfaccia utente dal codice responsabile della gestione della logica dell'applicazione. Questo può semplificare notevolmente lo sviluppo e il mantenimento di progetti complessi.

# --instructions--

Ci sono due componenti funzionali definiti nell'editor di codice, chiamati `TypesOfFruit` e `Fruits`. Prendi il componente `TypesOfFruit` e componilo o *annidalo* all'interno del componente `Fruits`. Quindi prendi il componente `Fruits` e annidalo all'interno del componente `TypesOfFood`. Il risultato dovrebbe essere un componente figlio, annidato all'interno di un componente genitore, che è annidato all'interno di un componente genitore proprio!

# --hints--

Il componente `TypesOfFood` dovrebbe restituire un singolo elemento `div`.

```js
assert(Enzyme.shallow(React.createElement(TypesOfFood)).type() === 'div');
```

Il componente `TypesOfFood` dovrebbe restituire il componente `Fruits`.

```js
assert(
  Enzyme.shallow(React.createElement(TypesOfFood)).props().children[1].type
    .name === 'Fruits'
);
```

Il componente `Fruits` dovrebbe restituire il componente `TypesOfFruit`.

```js
assert(
  Enzyme.mount(React.createElement(TypesOfFood)).find('h2').html() ===
    '<h2>Fruits:</h2>'
);
```

Il componente `TypesOfFruit` dovrebbe restituire gli elementi `h2` e `ul`.

```js
assert(
  Enzyme.mount(React.createElement(TypesOfFood)).find('ul').text() ===
    'ApplesBlueberriesStrawberriesBananas'
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<TypesOfFood />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const TypesOfFruit = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <ul>
        <li>Apples</li>
        <li>Blueberries</li>
        <li>Strawberries</li>
        <li>Bananas</li>
      </ul>
    </div>
  );
};

const Fruits = () => {
  return (
    <div>
      { /* Change code below this line */ }

      { /* Change code above this line */ }
    </div>
  );
};

class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        { /* Change code below this line */ }

        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
const TypesOfFruit = () => {
  return (
    <div>
      <h2>Fruits:</h2>
      <ul>
        <li>Apples</li>
        <li>Blueberries</li>
        <li>Strawberries</li>
        <li>Bananas</li>
      </ul>
    </div>
  );
};

const Fruits = () => {
  return (
    <div>
      { /* Change code below this line */ }
        <TypesOfFruit />
      { /* Change code above this line */ }
    </div>
  );
};

class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
        { /* Change code below this line */ }
        <Fruits />
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
