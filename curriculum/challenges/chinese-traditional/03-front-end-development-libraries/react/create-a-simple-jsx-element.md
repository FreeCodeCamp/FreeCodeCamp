---
id: 587d7dbc367417b2b2512bb1
title: 創建一個簡單的 JSX 元素
challengeType: 6
forumTopicId: 301390
dashedName: create-a-simple-jsx-element
---

# --description--

簡介：React 是由 Facebook 創建和維護的開源視圖庫。 它是渲染現代 Web 應用程序用戶界面（UI）的好工具。

React 使用名爲 JSX 的 JavaScript 語法擴展，可以直接在 JavaScript 中編寫 HTML。 這有幾個好處。 可以在 HTML 中使用 JavaScript 的完整程序功能，並有助於保持代碼的可讀性。 在大多數情況下，JSX 類似於已經學過的 HTML，但是在這些挑戰中將會涉及一些關鍵差異。

例如，因爲 JSX 是 JavaScript 的語法擴展，所以實際上可以直接在 JSX 中編寫 JavaScript。 要做到這一點，只需在花括號中包含希望被視爲 JavaScript 的代碼：`{ 'this is treated as JavaScript code' }`（這被視爲 JavaScript 代碼）。 請牢記這個寫法，將會在接下來的挑戰中使用。

但是，由於瀏覽器不能解析 JSX，因此必須將 JSX 代碼編譯爲 JavaScript。 在這個過程中，轉換器 Babel 是一個很受歡迎的工具。 後續挑戰已經在後臺引入了 Babel，可以直接寫 JSX 代碼。 如果代碼不符合 JSX 語法，那麼挑戰中的第一個測試就不會通過。

值得注意的是，這些挑戰在底層調用 `ReactDOM.render(JSX, document.getElementById('root'))`。 這個函數調用將 JSX 置於 React 自己的輕量級 DOM 中。 然後，React 使用自己的 DOM 快照來實現增量更新。

# --instructions--

當前代碼使用 JSX 將 `div` 元素賦值給常量 `JSX`。 將 `div` 替換爲 `h1` 元素，並在其中添加文本 `Hello JSX!`。

# --hints--

常量 `JSX` 應該返回一個 `h1` 元素。

```js
assert(JSX.type === 'h1');
```

`h1` 標籤應該包含文本 `Hello JSX!`。

```js
assert(Enzyme.shallow(JSX).contains('Hello JSX!'));
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx
const JSX = <div></div>;
```

# --solutions--

```jsx
const JSX = <h1>Hello JSX!</h1>;
```
