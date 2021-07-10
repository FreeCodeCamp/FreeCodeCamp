---
id: 5a24c314108439a4d403618b
title: 給同級元素一個唯一的鍵屬性
challengeType: 6
forumTopicId: 301394
dashedName: give-sibling-elements-a-unique-key-attribute
---

# --description--

上一個挑戰展示瞭如何使用 `map` 方法根據用戶輸入動態渲染多個元素。 然而，這個例子中缺少一個重要的部分。 創建元素數組時，每個元素都需要一個設置爲唯一值的 `key` 屬性。 React 使用這些鍵來跟蹤哪些項目被添加、更改或刪除。 這有助於在以任何方式修改列表時提高重新渲染過程的效率。

**注意：** 鍵只需要在兄弟元素之間是唯一的，它們不需要在應用程序中是全局唯一的。

# --instructions--

代碼編輯器有一個數組，它包含一些前端框架和一個名爲 `Frameworks()` 的無狀態函數組件。 `Frameworks()` 需要將數組映射到無序列表，就像上一個挑戰一樣。 完成 `map` 回調，爲 `frontEndFrameworks` 數組中的每個框架返回一個 `li` 元素。 這次，確保給每個 `li` 的 `key` 屬性設置一個唯一的值。 `li` 元素還應該包含來自 `frontEndFrameworks` 的文本。

通常，希望使 key 能唯一標識要渲染的元素。 數組索引可以是最後的選擇，但通常你應該嘗試使用唯一標識。

# --hints--

`Frameworks` 組件應該存在並渲染到頁面。

```js
assert(
  Enzyme.mount(React.createElement(Frameworks)).find('Frameworks').length === 1
);
```

`Frameworks` 應該渲染一個 `h1` 元素。

```js
assert(Enzyme.mount(React.createElement(Frameworks)).find('h1').length === 1);
```

`Frameworks` 應該渲染一個 `ul` 元素。

```js
assert(Enzyme.mount(React.createElement(Frameworks)).find('ul').length === 1);
```

`ul` 標籤應該渲染 6 個子 `li` 元素。

```js
assert(
  Enzyme.mount(React.createElement(Frameworks)).find('ul').children().length ===
    6 &&
    Enzyme.mount(React.createElement(Frameworks))
      .find('ul')
      .childAt(0)
      .name() === 'li' &&
    Enzyme.mount(React.createElement(Frameworks)).find('li').length === 6
);
```

每個列表項元素應該具有唯一的 `key` 屬性。

```js
assert(
  (() => {
    const ul = Enzyme.mount(React.createElement(Frameworks)).find('ul');
    const keys = new Set([
      ul.childAt(0).key(),
      ul.childAt(1).key(),
      ul.childAt(2).key(),
      ul.childAt(3).key(),
      ul.childAt(4).key(),
      ul.childAt(5).key()
    ]);
    return keys.size === 6;
  })()
);
```

每個列表項元素應該包含來自 `frontEndFrameworks` 的文本。

```js
assert(
  (() => {
    const li = Enzyme.mount(React.createElement(Frameworks))
      .find('ul')
      .children();
    return [...Array(5)].every((_, i) =>
      frontEndFrameworks.includes(li.at(i).text())
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<Frameworks />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = null; // Change this line
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};
```

# --solutions--

```jsx
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = frontEndFrameworks.map((fw, i) => <li key={i}>{fw}</li>);
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};
```
