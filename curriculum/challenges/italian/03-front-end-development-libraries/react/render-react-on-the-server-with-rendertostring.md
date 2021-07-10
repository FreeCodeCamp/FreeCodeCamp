---
id: 5a24c314108439a4d403618d
title: Presentare React nel server con renderToString
challengeType: 6
forumTopicId: 301407
dashedName: render-react-on-the-server-with-rendertostring
---

# --description--

Finora, hai presentato i componenti React sul client. Questo è quello che farai normalmente. Tuttavia, ci sono alcuni casi di utilizzo in cui ha senso presentare un componente React sul server. Dato che React è una libreria di visualizzazione JavaScript ed è possibile eseguire JavaScript sul server con Node, questo è possibile. Infatti, React fornisce un metodo `renderToString()` che puoi usare a questo scopo.

Ci sono due ragioni chiave per cui il rendering sul server può essere utilizzato in un'app del mondo reale. In primo luogo, senza fare questo, le tue applicazioni React consisterebbero in un file HTML relativamente vuoto e in un grande pacchetto di JavaScript da caricare inizialmente sul browser. Questo potrebbe non essere ideale per i motori di ricerca che stanno cercando di indicizzare il contenuto delle tue pagine in modo che le persone possano trovarti. Se si esegue il rendering del markup HTML iniziale sul server e lo si invia al client, il caricamento iniziale della pagina conterrà tutti i markup della pagina che possono essere letti dai motori di ricerca. In secondo luogo, questo crea un'esperienza di caricamento iniziale della pagina più veloce perché l'HTML presentato è più piccolo del codice JavaScript dell'intera app. React sarà comunque in grado di riconoscere la tua app e gestirla dopo il caricamento iniziale.

# --instructions--

Il metodo `renderToString()` è fornito su `ReactDOMServer`, disponibile qui come oggetto globale. Il metodo richiede un argomento che è un elemento di React. Usa questo per presentare `App` in una stringa.

# --hints--

Il componente `App` dovrebbe fare il rendering in una stringa usando `ReactDOMServer.renderToString`.

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
