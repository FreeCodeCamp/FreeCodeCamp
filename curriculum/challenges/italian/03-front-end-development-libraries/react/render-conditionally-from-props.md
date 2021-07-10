---
id: 5a24c314108439a4d4036188
title: Presentare condizionalmente dalle Props
challengeType: 6
forumTopicId: 301405
dashedName: render-conditionally-from-props
---

# --description--

Fino ad ora hai visto come usare `if/else`, `&&`, e l'operatore ternario (`condition ? expressionIfTrue : expressionIfFalse`) per fare decisioni condizionali su cosa e quando presentare. Tuttavia, c'è ancora un argomento importante da discutere che consente di combinare uno o tutti questi concetti con un'altra potente funzionalità di React: le props. Usare le proprietà (props) per presentare il codice condizionalmente è molto comune tra gli sviluppatori di React — cioè essi usano il valore di una determinata proprietà per prendere automaticamente delle decisioni su cosa presentare.

In questa sfida, configurerai un componente figlio per prendere decisioni di rendering basate sulle props. Utilizzerai anche l'operatore ternario, ma puoi vedere come molti degli altri concetti che sono stati trattati nelle ultime sfide potrebbero essere altrettanto utili in questo contesto.

# --instructions--

L'editor di codice ha due componenti che sono parzialmente definiti per te: un genitore chiamato `GameOfChance`, e un figlio chiamato `Results`. Essi sono utilizzati per creare un semplice gioco in cui l'utente preme un bottone per vedere se vince o perde.

In primo luogo, avrai bisogno di una semplice espressione che restituisca casualmente un valore diverso ogni volta che viene eseguita. Puoi usare `Math.random()`. Questo metodo restituisce un valore compreso tra `0` (incluso) e `1` (escluso) ogni volta che viene chiamato. Quindi, per avere delle quote 50/50, usa `Math.random() >= .5` nella tua espressione. Statisticamente parlando, questa espressione restituirà `true` il 50% delle volte, e `false` l'altro 50%. Nel metodo render, sostituisci `null` con l'espressione vista sopra per completare la dichiarazione della variabile.

Ora hai un'espressione che puoi usare per prendere una decisione casuale nel codice. Successivamente dovrai implementarla. Presenta il componente `Results` come figlio di `GameOfChance`, e passagli `expression` come una proprietà chiamata `fiftyFifty`. Nel componente `Results`, scrivi un'espressione ternaria per presentare l'elemento `h1` con il testo `You Win!` o `You Lose!` basato sulla proprietà `fiftyFifty` che viene passata da `GameOfChance`. Infine, assicurati che il metodo `handleClick()` stia contando correttamente ogni turno in modo che l'utente sappia quante volte ha giocato. Questo serve anche a far sapere all'utente che il componente è stato effettivamente aggiornato nel caso in cui vinca o perda due volte di fila.

# --hints--

Il componente `GameOfChance` dovrebbe esistere e essere presentato nella pagina.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).find('GameOfChance').length,
  1
);
```

`GameOfChance` dovrebbe restituire un singolo elemento `button`.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).find('button').length,
  1
);
```

`GameOfChance` dovrebbe restituire una singola istanza del componente `Results`, che ha una proprietà chiamata `fiftyFifty`.

```js
assert(
  Enzyme.mount(React.createElement(GameOfChance)).find('Results').length ===
    1 &&
    Enzyme.mount(React.createElement(GameOfChance))
      .find('Results')
      .props()
      .hasOwnProperty('fiftyFifty') === true
);
```

Lo stato di `GameOfChance` dovrebbe essere inizializzato con una proprietà `counter` impostata su un valore di `1`.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).state().counter,
  1
);
```

Quando il componente `GameOfChance` viene presentato per la prima volta nel DOM, dovrebbe essere restituito un elemento `p` con il testo interno di `Turn: 1`.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).find('p').text(),
  'Turn: 1'
);
```

Ogni volta che viene fatto click sul pulsante, lo stato del contatore deve essere incrementato di un valore di 1, e nel DOM dovrebbe essere presentato un singolo elemento `p` che contiene il testo `Turn: N`, dove `N` è il valore dello stato del contatore.

```js
(() => {
  const comp = Enzyme.mount(React.createElement(GameOfChance));
  const simulate = () => {
    comp.find('button').simulate('click');
  };
  const result = () => ({
    count: comp.state('counter'),
    text: comp.find('p').text()
  });
  const _1 = () => {
    simulate();
    return result();
  };
  const _2 = () => {
    simulate();
    return result();
  };
  const _3 = () => {
    simulate();
    return result();
  };
  const _4 = () => {
    simulate();
    return result();
  };
  const _5 = () => {
    simulate();
    return result();
  };
  const _1_val = _1();
  const _2_val = _2();
  const _3_val = _3();
  const _4_val = _4();
  const _5_val = _5();
  assert(
    _1_val.count === 2 &&
      _1_val.text === 'Turn: 2' &&
      _2_val.count === 3 &&
      _2_val.text === 'Turn: 3' &&
      _3_val.count === 4 &&
      _3_val.text === 'Turn: 4' &&
      _4_val.count === 5 &&
      _4_val.text === 'Turn: 5' &&
      _5_val.count === 6 &&
      _5_val.text === 'Turn: 6'
  );
})();
```

Quando il componente `GameOfChance` viene montato per la prima volta nel DOM e ogni volta che il bottone viene cliccato successivamente, dovrebbe essere restituito un singolo elemento `h1` che scrive casualmente `You Win!` o `You Lose!`.

```js
(() => {
  const comp = Enzyme.mount(React.createElement(GameOfChance));
  const simulate = () => {
    comp.find('button').simulate('click');
  };
  const result = () => ({
    h1: comp.find('h1').length,
    text: comp.find('h1').text()
  });
  const _1 = result();
  const _2 = () => {
    simulate();
    return result();
  };
  const _3 = () => {
    simulate();
    return result();
  };
  const _4 = () => {
    simulate();
    return result();
  };
  const _5 = () => {
    simulate();
    return result();
  };
  const _6 = () => {
    simulate();
    return result();
  };
  const _7 = () => {
    simulate();
    return result();
  };
  const _8 = () => {
    simulate();
    return result();
  };
  const _9 = () => {
    simulate();
    return result();
  };
  const _10 = () => {
    simulate();
    return result();
  };
  const _2_val = _2();
  const _3_val = _3();
  const _4_val = _4();
  const _5_val = _5();
  const _6_val = _6();
  const _7_val = _7();
  const _8_val = _8();
  const _9_val = _9();
  const _10_val = _10();
  const __text = new Set([
    _1.text,
    _2_val.text,
    _3_val.text,
    _4_val.text,
    _5_val.text,
    _6_val.text,
    _7_val.text,
    _8_val.text,
    _9_val.text,
    _10_val.text
  ]);
  const __h1 = new Set([
    _1.h1,
    _2_val.h1,
    _3_val.h1,
    _4_val.h1,
    _5_val.h1,
    _6_val.h1,
    _7_val.h1,
    _8_val.h1,
    _9_val.h1,
    _10_val.h1
  ]);
  assert(__text.size === 2 && __h1.size === 1);
})();
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<GameOfChance />, document.getElementById('root'));
```

## --seed-contents--

```jsx
class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    {/* Change code below this line */}
    return <h1></h1>;
    {/* Change code above this line */}
  }
}

class GameOfChance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => {
      // Complete the return statement:
      return {
        counter: prevState
      }
    });
  }
  render() {
    const expression = null; // Change this line
    return (
      <div>
        <button onClick={this.handleClick}>Play Again</button>
        {/* Change code below this line */}

        {/* Change code above this line */}
        <p>{'Turn: ' + this.state.counter}</p>
      </div>
    );
  }
}
```

# --solutions--

```jsx
class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>{this.props.fiftyFifty ? 'You Win!' : 'You Lose!'}</h1>;
  }
}

class GameOfChance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => {
      return {
        counter: prevState.counter + 1
      }
    });
  }
  render() {
    const expression = Math.random() >= 0.5;
    return (
      <div>
        <button onClick={this.handleClick}>Play Again</button>
        <Results fiftyFifty={expression} />
        <p>{'Turn: ' + this.state.counter}</p>
      </div>
    );
  }
}
```
