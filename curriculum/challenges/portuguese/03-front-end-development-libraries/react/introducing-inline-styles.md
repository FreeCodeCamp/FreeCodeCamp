---
id: 5a24c314108439a4d4036181
title: Introducing Inline Styles
challengeType: 6
forumTopicId: 301395
dashedName: introducing-inline-styles
---

# --description--

There are other complex concepts that add powerful capabilities to your React code. But you may be wondering about the more simple problem of how to style those JSX elements you create in React. You likely know that it won't be exactly the same as working with HTML because of [the way you apply classes to JSX elements](/learn/front-end-development-libraries/react/define-an-html-class-in-jsx).

If you import styles from a stylesheet, it isn't much different at all. You apply a class to your JSX element using the `className` attribute, and apply styles to the class in your stylesheet. Another option is to apply inline styles, which are very common in ReactJS development.

You apply inline styles to JSX elements similar to how you do it in HTML, but with a few JSX differences. Here's an example of an inline style in HTML:

```jsx
<div style="color: yellow; font-size: 16px">Mellow Yellow</div>
```

JSX elements use the `style` attribute, but because of the way JSX is transpiled, you can't set the value to a `string`. Instead, you set it equal to a JavaScript `object`. Here's an example:

```jsx
<div style={{color: "yellow", fontSize: 16}}>Mellow Yellow</div>
```

Notice how we camelCase the `fontSize` property? This is because React will not accept kebab-case keys in the style object. React will apply the correct property name for us in the HTML.

# --instructions--

Add a `style` attribute to the `div` in the code editor to give the text a color of red and font size of `72px`.

Note that you can optionally set the font size to be a number, omitting the units `px`, or write it as `72px`.

# --hints--

The component should render a `div` element.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(Colorful));
    return mockedComponent.children().type() === 'div';
  })()
);
```

The `div` element should have a color of `red`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(Colorful));
    return mockedComponent.children().props().style.color === 'red';
  })()
);
```

The `div` element should have a font size of `72px`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(Colorful));
    return (
      mockedComponent.children().props().style.fontSize === 72 ||
      mockedComponent.children().props().style.fontSize === '72' ||
      mockedComponent.children().props().style.fontSize === '72px'
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
class Colorful extends React.Component {
  render() {
    return (
      <div>Big Red</div>
    );
  }
};
```

# --solutions--

```jsx
class Colorful extends React.Component {
  render() {
    return (
      <div style={{color: "red", fontSize: 72}}>Big Red</div>
    );
  }
};
```
