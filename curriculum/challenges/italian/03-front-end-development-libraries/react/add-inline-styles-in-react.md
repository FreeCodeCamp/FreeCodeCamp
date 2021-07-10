---
id: 5a24c314108439a4d4036182
title: Aggiungere stili in linea in React
challengeType: 6
forumTopicId: 301378
dashedName: add-inline-styles-in-react
---

# --description--

Nell'ultima sfida potresti aver notato che ci sono state diverse altre differenze di sintassi dagli stili HTML inline in aggiunta all'attributo `style` impostato su un oggetto JavaScript. In primo luogo, i nomi di alcune proprietà di stile CSS usano il camel case. Ad esempio, l'ultima sfida imposta la dimensione del carattere con `fontSize` invece di `font-size`. Le parole tratteggiate come `font-size` sono una sintassi non valida per le proprietà dell'oggetto JavaScript, quindi React usa il camel case. Di regola, tutte le proprietà di stile tratteggiate sono scritte utilizzando il camel case in JSX.

Si assume che tutti i valori di lunghezza delle proprietà (come `height`, `width`, e `fontSize`) siano in `px` se non diversamente specificato. Se si desidera utilizzare `em`, ad esempio, dovrai inserire il valore e l'unità di misura tra virgolette, come ad esempio `{fontSize: "4em"}`. Oltre ai valori di lunghezza che hanno un'unità predefinita in `px`, tutti gli altri valori delle proprietà dovrebbero essere inseriti tra virgolette.

# --instructions--

Se hai molti stili, puoi assegnare un `object` style a una costante per mantenere il codice ordinato. Dichiara la tua costante di stile come variabile globale nella parte superiore del file. Inizializza la costante `styles` e assegna un `object` con tre proprietà di stile e i relativi valori ad essa. Dai al `div` un colore `purple`, un font-size di `40`, e un bordo di `2px solid purple`. Quindi imposta l'attributo `style` sulla costante `styles`.

# --hints--

La variabile `styles` dovrebbe essere un `object` con tre proprietà.

```js
assert(Object.keys(styles).length === 3);
```

La variabile `styles` dovrebbe avere una proprietà `color` impostata su un valore `purple`.

```js
assert(styles.color === 'purple');
```

La variabile `styles` dovrebbe avere una proprietà `fontSize` impostata su un valore di `40`.

```js
assert(styles.fontSize === 40);
```

La variabile `styles` dovrebbe avere una proprietà `border` impostata su un valore di `2px solid purple`.

```js
assert(styles.border === '2px solid purple');
```

Il componente dovrebbe presentare un elemento `div`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.shallow(React.createElement(Colorful));
    return mockedComponent.type() === 'div';
  })()
);
```

L'elemento `div` dovrebbe avere i suoi stili definiti dall'oggetto `styles`.

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
