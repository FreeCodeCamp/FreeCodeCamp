---
id: 5a24c314108439a4d4036181
title: 介紹內聯樣式
challengeType: 6
forumTopicId: 301395
dashedName: introducing-inline-styles
---

# --description--

還有其他複雜的概念可以爲 React 代碼增加強大的功能。 但是，你可能會想知道更簡單的問題，比如：如何對在 React 中創建的 JSX 元素添加樣式。 你可能知道，由於[將 class 應用於 JSX 元素的方式](/learn/front-end-development-libraries/react/define-an-html-class-in-jsx)與 HTML 中的使用並不完全相同。

如果從樣式表導入樣式，它就沒有太大的不同。 使用 `className` 屬性將 class 應用於 JSX 元素，並將樣式應用於樣式表中的 class。 另一種選擇是使用內聯樣式，這在 ReactJS 開發中非常常見。

將內聯樣式應用於 JSX 元素，類似於在 HTML 中的操作方式，但有一些 JSX 差異。 以下是 HTML 中內聯樣式的示例：

```jsx
<div style="color: yellow; font-size: 16px">Mellow Yellow</div>
```

JSX 元素使用 `style` 屬性，但是鑑於 JSX 的編譯方式，不能將值設置爲 `string`（字符串）。 相反，你應該將其設置爲等於JavaScript `object` 。 如下所示：

```jsx
<div style={{color: "yellow", fontSize: 16}}>Mellow Yellow</div>
```

注意到如何駝峯拼寫 `fontSize` 屬性了嗎？ 這是因爲 React 不接受樣式對象中的 kebab-case 鍵。 React 將在 HTML 中爲應用正確的屬性名稱。

# --instructions--

在代碼編輯器中給 `div` 添加一個 `style` 屬性，將文本顏色設置爲紅色，字體大小設置爲 `72px`。

請注意，可以選擇將字體大小設置爲數字，省略單位 `px`，或者將其寫爲 `72px`。

# --hints--

組件應該渲染一個 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(Colorful));
    return mockedComponent.children().type() === 'div';
  })()
);
```

`div` 元素的顏色應該是 `red`（紅色）。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(Colorful));
    return mockedComponent.children().props().style.color === 'red';
  })()
);
```

`div` 元素的字體大小應爲 `72px`。

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
