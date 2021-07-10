---
id: 5a24c314108439a4d4036182
title: Add Inline Styles in React
challengeType: 6
forumTopicId: 301378
dashedName: add-inline-styles-in-react
---

# --description--

You may have noticed in the last challenge that there were several other syntax differences from HTML inline styles in addition to the `style` attribute set to a JavaScript object. First, the names of certain CSS style properties use camel case. For example, the last challenge set the size of the font with `fontSize` instead of `font-size`. Hyphenated words like `font-size` are invalid syntax for JavaScript object properties, so React uses camel case. As a rule, any hyphenated style properties are written using camel case in JSX.

All property value length units (like `height`, `width`, and `fontSize`) are assumed to be in `px` unless otherwise specified. If you want to use `em`, for example, you wrap the value and the units in quotes, like `{fontSize: "4em"}`. Other than the length values that default to `px`, all other property values should be wrapped in quotes.

# --instructions--

If you have a large set of styles, you can assign a style `object` to a constant to keep your code organized. Declare your styles constant as a global variable at the top of the file. Initialize `styles` constant and assign an `object` with three style properties and their values to it. Give the `div` a color of `purple`, a font-size of `40`, and a border of `2px solid purple`. Then set the `style` attribute equal to the `styles` constant.

# --hints--

The `styles` variable should be an `object` with three properties.

```js
assert(Object.keys(styles).length === 3);
```

The `styles` variable should have a `color` property set to a value of `purple`.

```js
assert(styles.color === 'purple');
```

The `styles` variable should have a `fontSize` property set to a value of `40`.

```js
assert(styles.fontSize === 40);
```

The `styles` variable should have a `border` property set to a value of `2px solid purple`.

```js
assert(styles.border === '2px solid purple');
```

The component should render a `div` element.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.shallow(React.createElement(Colorful));
    return mockedComponent.type() === 'div';
  })()
);
```

The `div` element should have its styles defined by the `styles` object.

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
