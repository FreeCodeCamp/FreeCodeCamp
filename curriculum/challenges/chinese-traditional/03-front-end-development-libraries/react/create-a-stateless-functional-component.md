---
id: 5a24c314108439a4d4036162
title: 創建一個無狀態的函數組件
challengeType: 6
forumTopicId: 301392
dashedName: create-a-stateless-functional-component
---

# --description--

組件是 React 的核心。 React 中的所有內容都是一個組件，在這裏將學習如何創建一個組件。

有兩種方法可以創建 React 組件。 第一種方法是使用 JavaScript 函數。 以這種方式定義組件會創建*無狀態功能組件*。 應用程序中的狀態概念將在以後的挑戰中介紹。 目前爲止，可以將無狀態組件視爲能接收數據並對其進行渲染，但不管理或跟蹤該數據的更改的組件。 (我們將下一個挑戰使用中第二種方式創建 React 組件。)

要用函數創建組件，只需編寫一個返回 JSX 或 `null` 的 JavaScript 函數。 需要注意的一點是，React 要求你的函數名以大寫字母開頭。 下面是一個無狀態功能組件的示例，該組件在 JSX 中分配一個 HTML 的 class：

```jsx
const DemoComponent = function() {
  return (
    <div className='customClass' />
  );
};
```

翻譯完成後， `<div>` 將有一個 `customClass` 的 CSS class。

因爲 JSX 組件代表 HTML，所以你可以將幾個組件放在一起以創建更復雜的 HTML 頁面。 這是 React 提供的組件架構的關鍵優勢之一。 它允許用許多獨立的組件組合成 UI。 這使得構建和維護複雜的用戶界面變得更加容易。

# --instructions--

代碼編輯器中有一個名爲 `MyComponent` 的函數。 完成此函數，使其返回包含一些文本字符串的單個`div`元素。

**注意：** 文本被視爲是 `div` 的子元素，因此不能使用自閉合標籤。

# --hints--

`MyComponent` 應該返回 JSX。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.length === 1;
  })()
);
```

`MyComponent` 應該返回一個 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.children().type() === 'div';
  })()
);
```

`div` 元素應該包含一個文本字符串。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('div').text() !== '';
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyComponent />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const MyComponent = function() {
  // Change code below this line



  // Change code above this line
}
```

# --solutions--

```jsx
const MyComponent = function() {
  // Change code below this line
  return (
    <div>
      Demo Solution
    </div>
  );
  // Change code above this line
}
```
