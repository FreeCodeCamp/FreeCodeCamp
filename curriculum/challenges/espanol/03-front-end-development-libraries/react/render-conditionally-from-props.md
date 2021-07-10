---
id: 5a24c314108439a4d4036188
title: Renderiza condicionalmente a partir de "props"
challengeType: 6
forumTopicId: 301405
dashedName: render-conditionally-from-props
---

# --description--

Hasta ahora, has visto cómo utilizar `if/else`, `&&`, y el operador ternario (`condition ? expressionIfTrue : expressionIfFalse`) para tomar decisiones condicionales sobre qué renderizar y cuándo. Sin embargo, queda un tema importante por discutir que te permite combinar cualquier o todos estos conceptos con otra poderosa característica de React: los props. El uso de props para renderizar condicionalmente el código es muy común entre los desarrolladores de React, es decir, utilizan el valor de una prop dada para automáticamente tomar decisiones sobre qué renderizar.

En este desafío, configurarás un componente hijo para tomar decisiones de renderizado basadas en props. También usarás el operador ternario, pero puedes ver cómo varios de los otros conceptos que se cubrieron en los últimos desafíos podrían ser igual de útiles en este contexto.

# --instructions--

El editor de código tiene dos componentes que están parcialmente definidos para ti: un padre llamado `GameOfChance`, y un hijo llamado `Results`. Se utilizan para crear un juego sencillo en el que el usuario presiona un botón para ver si gana o pierde.

Primero, necesitarás una expresión simple que devuelva al azar un valor diferente cada vez que se ejecute. Puedes usar `Math.random()`. Este método devuelve un valor entre `0` (inclusivo) y `1` (exclusivo) cada vez que se llama. Así que para las probabilidades de 50/50, usa `Math.random() >= .5` en tu expresión. Estadísticamente hablando, esta expresión devolverá `true` 50% de las veces, y `false` el otro 50%. En el método de renderizado, reemplaza `null` con la expresión anterior para completar la declaración de variables.

Ahora tienes una expresión que puedes usar para tomar una decisión aleatoria en el código. A continuación, debes implementar esto. Renderiza el componente `Results` como hijo de `GameOfChance`, y pásalo a `expression` como un prop llamado `fiftyFifty`. En el componente `Results`, escribe una expresión ternaria para renderizar el elemento `h1` con el texto `You Win!` o `You Lose!` basado en el prop `fiftyFifty` que está siendo pasado desde `GameOfChance`. Finalmente, asegúrate de que el método `handleClick()` está contando correctamente cada turno para que el usuario sepa cuántas veces ha jugado. Esto también sirve para que el usuario sepa que el componente se ha actualizado en caso de que gane o pierda dos veces seguidas.

# --hints--

El componente `GameOfChance` debe existir y renderizarse en la página.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).find('GameOfChance').length,
  1
);
```

`GameOfChance` debe devolver un solo elemento `button`.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).find('button').length,
  1
);
```

`GameOfChance` debe devolver una sola instancia del componente `Results`, que tiene un prop llamado `fiftyFifty`.

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

El estado de `GameOfChance` debe inicializarse con la propiedad `counter` establecida en valor `1`.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).state().counter,
  1
);
```

Cuando el componente `GameOfChance` es renderizado por primera vez en el DOM, un elemento `p` debe ser devuelto con el texto interno `Turn: 1`.

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(GameOfChance)).find('p').text(),
  'Turn: 1'
);
```

Cada vez que se hace clic en el botón, el contador debe incrementarse por un valor de 1, y un único elemento `p` debe ser renderizado al DOM que contiene el texto `Turn: N`, donde `N` es el valor del contador.

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

Cuando el componente `GameOfChance` se monta por primera vez en el DOM y cada vez que se hace clic en el botón, un solo elemento `h1` debe ser devuelto, el cual renderiza aleatoriamente `You Win!` o `You Lose!`.

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
