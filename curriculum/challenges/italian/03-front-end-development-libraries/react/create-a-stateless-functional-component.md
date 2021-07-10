---
id: 5a24c314108439a4d4036162
title: Creare un componente funzionale senza stato
challengeType: 6
forumTopicId: 301392
dashedName: create-a-stateless-functional-component
---

# --description--

I componenti sono il nucleo di React. Tutto in React è un componente e qui imparerai a crearne uno.

Ci sono due modi per creare un componente React. Il primo modo è quello di utilizzare una funzione JavaScript. Definendo un componente in questo modo si crea un *componente funzionale senza stato*. Il concetto di stato in un'applicazione sarà affrontato nelle sfide successive. Per ora, pensa a un componente senza stato (stateless) come a uno che può ricevere i dati e farne il rendering, ma non gestisce o tiene traccia delle modifiche a tali dati. (Copriremo il secondo modo per creare un componente React nella prossima sfida.)

Per creare un componente con una funzione, basta scrivere una funzione JavaScript che restituisce JSX o `null`. Una cosa importante da notare è che React richiede che il nome della funzione inizi con una lettera maiuscola. Ecco un esempio di componente funzionale senza stato che assegna una classe HTML in JSX:

```jsx
const DemoComponent = function() {
  return (
    <div className='customClass' />
  );
};
```

Dopo essere stato transcodificato, il `<div>` avrà una classe CSS di `customClass`.

Poiché un componente JSX rappresenta dell'HTML, è possibile mettere insieme diversi componenti per creare una pagina HTML più complessa. Questo è uno dei vantaggi principali dell'architettura a componente fornita da React. Ti permette di comporre la tua interfaccia utente partendo da molti componenti separati e isolati. Questo rende più facile costruire e mantenere interfacce utente complesse.

# --instructions--

L'editor di codice ha una funzione chiamata `MyComponent`. Completa questa funzione in modo che restituisca un singolo elemento `div` che contiene una stringa di testo.

**Nota:** Il testo è considerato un figlio dell'elemento `div`, quindi non sarai in grado di utilizzare un tag autoconcludente.

# --hints--

`MyComponent` dovrebbe restituire JSX.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.length === 1;
  })()
);
```

`MyComponent` dovrebbe restituire un elemento `div`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.children().type() === 'div';
  })()
);
```

L'elemento `div` dovrebbe contenere una stringa di testo.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('div').text() !== '';
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyComponent />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const MyComponent = function() {
  // Change code below this line



  // Change code above this line
}
```

# --solutions--

```jsx
const MyComponent = function() {
  // Change code below this line
  return (
    <div>
      Demo Solution
    </div>
  );
  // Change code above this line
}
```
