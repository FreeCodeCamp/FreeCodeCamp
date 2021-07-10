---
id: 5a24c314108439a4d403616a
title: Passare un Array come proprietà
challengeType: 6
forumTopicId: 301401
dashedName: pass-an-array-as-props
---

# --description--

L'ultima sfida ha mostrato come trasferire le informazioni da un componente genitore a un componente figlio come `props` o proprietà. Questa sfida mostra come gli array possono essere passati come `props`. Per passare un array a un elemento JSX, esso deve essere trattato come JavaScript e avvolto in parentesi graffe.

```jsx
<ParentComponent>
  <ChildComponent colors={["green", "blue", "red"]} />
</ParentComponent>
```

Il componente figlio ha quindi accesso alla proprietà array `colors`. I metodi sugli array come `join()` possono essere utilizzati quando si accede alla proprietà. `const ChildComponent = (props) => <p>{props.colors.join(', ')}</p>` Questo unirà tutti gli elementi `colors` dell'array in una stringa separata da virgole e produrrà: `<p>green, blue, red</p>` Più avanti vedremo altri metodi comuni per fare il rendering di array di dati in React.

# --instructions--

Nell'editor di codice ci sono i componenti `List` e `ToDo`. Quando si esegue il rendering di ogni `List` dal componente `ToDo`, deve essere passata una proprietà `tasks` assegnata a un array di attività da fare, ad esempio `["walk dog", "workout"]`. Quindi accedi a questo array `tasks` nel componente `List`, mostrandone il valore all'interno dell'elemento `p`. Usa `join(", ")` per visualizzare l'array `props.tasks` nell'elemento `p` come lista separata da virgole. L'elenco di oggi (Today) dovrebbe avere almeno 2 task e quella di domani (Tomorrow) dovrebbe avere almeno 3 task.

# --hints--

Il componente `ToDo` dovrebbe restituire un singolo `div` esterno.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.children().first().type() === 'div';
  })()
);
```

Il terzo figlio del componente `ToDo` dovrebbe essere un'istanza del componente `List`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.children().first().childAt(2).name() === 'List';
  })()
);
```

Il quinto figlio del componente `ToDo` dovrebbe essere un'istanza del componente `List`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.children().first().childAt(4).name() === 'List';
  })()
);
```

Entrambe le istanze del componente `List` dovrebbero avere una proprietà chiamata `tasks` e `tasks` dovrebbe essere di tipo array.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return (
      Array.isArray(mockedComponent.find('List').get(0).props.tasks) &&
      Array.isArray(mockedComponent.find('List').get(1).props.tasks)
    );
  })()
);
```

Il primo componente `List`, che rappresenta le attività per oggi, dovrebbe avere 2 o più elementi.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.find('List').get(0).props.tasks.length >= 2;
  })()
);
```

Il secondo componente `List`, che rappresenta le attività per domani, dovrebbe avere 3 o più elementi.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return mockedComponent.find('List').get(1).props.tasks.length >= 3;
  })()
);
```

Il componente `List` dovrebbe presentare nel tag `p` il valore dalla proprietà `tasks`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ToDo));
    return (
      mockedComponent
        .find('p')
        .get(0)
        .props.children.replace(/\s*,\s*/g, ',') ===
        mockedComponent
          .find('List')
          .get(0)
          .props.tasks.join(',')
          .replace(/\s*,\s*/g, ',') &&
      mockedComponent
        .find('p')
        .get(1)
        .props.children.replace(/\s*,\s*/g, ',') ===
        mockedComponent
          .find('List')
          .get(1)
          .props.tasks.join(',')
          .replace(/\s*,\s*/g, ',')
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<ToDo />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const List = (props) => {
  { /* Change code below this line */ }
  return <p>{}</p>
  { /* Change code above this line */ }
};

class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h2>Today</h2>
        { /* Change code below this line */ }
        <List/>
        <h2>Tomorrow</h2>
        <List/>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
const List= (props) => {
  return <p>{props.tasks.join(', ')}</p>
};

class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h2>Today</h2>
        <List tasks={['study', 'exercise']} />
        <h2>Tomorrow</h2>
        <List tasks={['call Sam', 'grocery shopping', 'order tickets']} />
      </div>
    );
  }
};
```
