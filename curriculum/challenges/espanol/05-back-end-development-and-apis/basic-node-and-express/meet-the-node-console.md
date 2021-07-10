---
id: 587d7fb0367417b2b2512bed
title: Meet the Node console
challengeType: 2
forumTopicId: 301515
dashedName: meet-the-node-console
---

# --description--

During the development process, it is important to be able to check what’s going on in your code.

Node is just a JavaScript environment. Like client side JavaScript, you can use the console to display useful debug information. On your local machine, you would see console output in a terminal. On Repl.it, a terminal is open in the right pane by default.

We recommend to keep the terminal open while working at these challenges. By reading the output in the terminal, you can see any errors that may occur.

# --instructions--

If you have not already done so, please read the instructions in [the introduction](/learn/back-end-development-and-apis/basic-node-and-express/) and start a new project on Repl.it using [this link](https://repl.it/github/freeCodeCamp/boilerplate-express).

Modify the `myApp.js` file to log "Hello World" to the console.

# --hints--

`"Hello World"` should be in the console

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/hello-console').then(
    (data) => {
      assert.isTrue(data.passed, '"Hello World" is not in the server console');
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

# --solutions--

```js
/**
  Backend challenges don't need solutions, 
  because they would need to be tested against a full working project. 
  Please check our contributing guidelines to learn more.
*/
```
