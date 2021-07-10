---
id: 5a24c314108439a4d403616f
title: Ripasso dell'uso delle Props con componenti funzionali senza stato
challengeType: 6
forumTopicId: 301411
dashedName: review-using-props-with-stateless-functional-components
---

# --description--

Fatta eccezione per l'ultima sfida, hai sempre passato le props a componenti funzionali senza stato. Questi componenti agiscono come funzioni pure. Accettano le props come input e restituiscono la stessa vista ogni volta che vengono passate le stesse proprietà. Potresti chiederti cosa sia lo stato e la prossima sfida lo spiegherà con maggiore dettaglio. Prima però, ecco un ripasso della terminologia per i componenti.

Un *componente funzionale senza stato* è una qualsiasi funzione che accetta props e restituisce JSX. Un *componente senza stato*, d'altra parte, è una classe che estende `React.Component`, ma non utilizza lo stato interno (coperto nella prossima sfida). Infine, un *componente stateful* è un componente di classe che mantiene il proprio stato interno. Spesso si fa riferimento ai componenti stateful chiamandoli semplicemente componenti o componenti React.

Un modello comune è quello di cercare di minimizzare l'estensione dello stato e di creare componenti funzionali senza stato, laddove possibile. Questo aiuta a contenere la gestione dello stato in un'area specifica della tua applicazione. A sua volta, questo migliora lo sviluppo e la manutenzione della tua app rendendo più facile seguire come le modifiche allo stato influenzano il suo comportamento.

# --instructions--

L'editor di codice ha un componente `CampSite` che presenta un componente `Camper` come figlio. Definisci il componente `Camper` e assegnagli la proprietà di default `{ name: 'CamperBot' }`. All'interno del componente `Camper`, presenta il codice che vuoi, ma assicurati di avere un elemento `p` che include solo il valore del `name` che viene passato come `prop`. Infine, definisci `propTypes` nel componente `Camper` in modo che richieda che `name` venga fornito come prop verificando che sia di tipo `string`.

# --hints--

Il componente `CampSite` dovrebbe effettuare il render.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(CampSite));
    return mockedComponent.find('CampSite').length === 1;
  })()
);
```

Il componente `Camper` dovrebbe effettuare il render.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(CampSite));
    return mockedComponent.find('Camper').length === 1;
  })()
);
```

Il componente `Camper` dovrebbe includere delle props predefinite che assegnano la stringa `CamperBot` alla chiave `name`.

```js
assert(
  /Camper.defaultProps={name:(['"`])CamperBot\1,?}/.test(
    __helpers.removeWhiteSpace(code)
  )
);
```

Il componente `Camper` dovrebbe includere tipi di prop che richiedono che la proprietà `name` sia di tipo `string`.

```js
assert(
  /Camper.propTypes={name:PropTypes.string.isRequired,?}/.test(
    __helpers.removeWhiteSpace(code)
  )
);
```

Il componente `Camper` dovrebbe contenere un elemento `p` che abbia come unico testo la proprietà `name`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(CampSite));
    return (
      mockedComponent.find('p').text() ===
      mockedComponent.find('Camper').props().name
    );
  })()
);
```

# --seed--

## --before-user-code--

```jsx
var PropTypes = {
   string: { isRequired: true }
};
```

## --after-user-code--

```jsx
ReactDOM.render(<CampSite />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// Change code below this line
```

# --solutions--

```jsx
class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper/>
      </div>
    );
  }
};
// Change code below this line

const Camper = (props) => {
   return (
     <div>
       <p>{props.name}</p>
     </div>
   );
};

Camper.propTypes = {
  name: PropTypes.string.isRequired
};

Camper.defaultProps = {
  name: 'CamperBot'
};
```
