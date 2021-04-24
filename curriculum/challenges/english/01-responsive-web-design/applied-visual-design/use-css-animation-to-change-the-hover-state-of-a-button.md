---
id: 587d78a7367417b2b2512ae0
title: Use CSS Animation to Change the Hover State of a Button
challengeType: 0
videoUrl: 'https://scrimba.com/c/cg4vZAa'
forumTopicId: 301073
dashedName: use-css-animation-to-change-the-hover-state-of-a-button
---

# --description--

You can use CSS `@keyframes` to change the color of a button in its hover state.

Here's an example of changing the width of an image on hover:

```html
<style>
  img:hover {
    animation-name: width;
    animation-duration: 500ms;
  }

  @keyframes width {
    100% {
      width: 40px;
    }
  }
</style>

<img src="https://freecodecamp.s3.amazonaws.com/google-logo.png" alt="Google's Logo" />
```

# --instructions--

Note that `ms` stands for milliseconds, where 1000ms is equal to 1s.

Use CSS `@keyframes` to change the `background-color` of the `button` element so it becomes `#4791d0` when a user hovers over it. The `@keyframes` rule should only have an entry for `100%`.

# --hints--

The @keyframes rule should use the `animation-name` background-color.

```js
assert(code.match(/@keyframes\s+?background-color\s*?{/g));
```

There should be one rule under `@keyframes` that changes the `background-color` to `#4791d0` at 100%.

```js
assert(code.match(/100%\s*?{\s*?background-color:\s*?#4791d0;\s*?}/gi));
```

# --seed--

## --seed-contents--

```html
<style>
  button {
    border-radius: 5px;
    color: white;
    background-color: #0F5897;
    padding: 5px 10px 8px 10px;
  }

  button:hover {
    animation-name: background-color;
    animation-duration: 500ms;
  }


</style>

<button>Register</button>
```

# --solutions--

```html
<style>
  button {
    border-radius: 5px;
    color: white;
    background-color: #0F5897;
    padding: 5px 10px 8px 10px;
  }

  button:hover {
    animation-name: background-color;
    animation-duration: 500ms;
  }

  @keyframes background-color {
    100% {
      background-color: #4791d0;
    }
  }
</style>
<button>Register</button>
```
