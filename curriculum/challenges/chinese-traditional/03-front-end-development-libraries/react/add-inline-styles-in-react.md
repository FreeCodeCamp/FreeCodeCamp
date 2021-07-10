---
id: 5a24c314108439a4d4036182
title: 在 React 中添加內聯樣式
challengeType: 6
forumTopicId: 301378
dashedName: add-inline-styles-in-react
---

# --description--

在上一次挑戰中，你可能已經注意到，除了設置爲 JavaScript 對象的 `style` 屬性之外，與 HTML 內聯樣式相比，React 的內聯樣式還有其他幾個語法差異。 首先，某些 CSS 樣式屬性的名稱使用駝峯式命名。 例如，最後一個挑戰用 `fontSize` 而不是 `font-size` 來設置字體的大小。 對於 JavaScript 對象屬性來說，像 `font-size` 這樣的連字符命名是無效的語法，所以 React 使用駝峯式命名。 通常，任何連字符的 style 屬性在 JSX 中都是使用駝峯式命名的。

除非另有規定，否則所有屬性值的 length（如`height`、`width` 和 `fontSize`）其單位都假定爲 `px`。 例如，如果要使用 `em`，可以用引號將值和單位括起來，例如 `{fontSize: "4em"}`。 除了默認爲 `px` 的 length 值之外，所有其他屬性值都應該用引號括起來。

# --instructions--

如果你有大量樣式，你可以將樣式 `object`（對象）分配給一個常量，以保持代碼的組織有序。 在文件頂部將你的樣式聲明爲全局變量。 定義一個 `styles` 常量，並將其聲明爲具有三個樣式屬性及對應值的 `object`（對象）。 使 `div` 的文字顏色爲 `purple`、字號爲 `40`、邊框爲 `2px solid purple`。 然後設置 `style` 屬性，使其等於 `styles` 常量。

# --hints--

`styles` 變量應該是具有三個屬性的 `object`（對象）。

```js
assert(Object.keys(styles).length === 3);
```

`styles` 變量的 `color` 屬性應該設置爲 `purple`。

```js
assert(styles.color === 'purple');
```

`styles` 變量應該將 `fontSize` 屬性設置爲 `40`。

```js
assert(styles.fontSize === 40);
```

`styles` 變量的 `border` 屬性應該設置爲 `2px solid purple`。

```js
assert(styles.border === '2px solid purple');
```

組件應該渲染一個 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.shallow(React.createElement(Colorful));
    return mockedComponent.type() === 'div';
  })()
);
```

`div` 元素的樣式應該由 `styles` 對象定義。

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
