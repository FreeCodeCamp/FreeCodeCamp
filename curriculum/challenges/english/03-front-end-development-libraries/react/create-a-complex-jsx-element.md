---
id: 5a24bbe0dba28a8d3cbd4c5d
title: Create a Complex JSX Element
challengeType: 6
forumTopicId: 301382
dashedName: create-a-complex-jsx-element
---

# --description--

The last challenge was a simple example of JSX, but JSX can represent more complex HTML as well.

One important thing to know about nested JSX is that it must return a single element.

This one parent element would wrap all of the other levels of nested elements.

For instance, several JSX elements written as siblings with no parent wrapper element will not transpile.

Here's an example:

**Valid JSX:**

```jsx
<div>
  <p>Paragraph One</p>
  <p>Paragraph Two</p>
  <p>Paragraph Three</p>
</div>
```

**Invalid JSX:**

```jsx
<p>Paragraph One</p>
<p>Paragraph Two</p>
<p>Paragraph Three</p>
```

# --instructions--

Define a new constant `JSX` that renders a `div` which contains the following elements in order:

An `h1`, a `p`, and an unordered list that contains three `li` items. You can include any text you want within each element.

**Note:** When rendering multiple elements like this, you can wrap them all in parentheses, but it's not strictly required. Also notice this challenge uses a `div` tag to wrap all the child elements within a single parent element. If you remove the `div`, the JSX will no longer transpile. Keep this in mind, since it will also apply when you return JSX elements in React components.

# --hints--

The constant `JSX` should return a `div` element.

```js
assert(JSX.type === 'div');
```

The `div` should contain an `h1` tag as the first element.

```js
assert(JSX.props.children[0].type === 'h1');
```

The `div` should contain a `p` tag as the second element.

```js
assert(JSX.props.children[1].type === 'p');
```

The `div` should contain a `ul` tag as the third element.

```js
assert(JSX.props.children[2].type === 'ul');
```

The `ul` should contain three `li` elements.

```js
assert(
  JSX.props.children
    .filter((ele) => ele.type === 'ul')[0]
    .props.children.filter((ele) => ele.type === 'li').length === 3
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx

```

# --solutions--

```jsx
const JSX = (
<div>
  <h1>Hello JSX!</h1>
  <p>Some info</p>
  <ul>
    <li>An item</li>
    <li>Another item</li>
    <li>A third item</li>
  </ul>
</div>);
```
