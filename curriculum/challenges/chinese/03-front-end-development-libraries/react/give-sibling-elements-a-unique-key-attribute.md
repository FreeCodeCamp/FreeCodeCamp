---
id: 5a24c314108439a4d403618b
title: 给同级元素一个唯一的键属性
challengeType: 6
forumTopicId: 301394
dashedName: give-sibling-elements-a-unique-key-attribute
---

# --description--

上一个挑战展示了如何使用 `map` 方法根据用户输入动态渲染多个元素。 然而，这个例子中缺少一个重要的部分。 创建元素数组时，每个元素都需要一个设置为唯一值的 `key` 属性。 React 使用这些键来跟踪哪些项目被添加、更改或删除。 这有助于在以任何方式修改列表时提高重新渲染过程的效率。

**注意：** 键只需要在兄弟元素之间是唯一的，它们不需要在应用程序中是全局唯一的。

# --instructions--

代码编辑器有一个数组，它包含一些前端框架和一个名为 `Frameworks()` 的无状态函数组件。 `Frameworks()` 需要将数组映射到无序列表，就像上一个挑战一样。 完成 `map` 回调，为 `frontEndFrameworks` 数组中的每个框架返回一个 `li` 元素。 这次，确保给每个 `li` 的 `key` 属性设置一个唯一的值。 `li` 元素还应该包含来自 `frontEndFrameworks` 的文本。

通常，希望使 key 能唯一标识要渲染的元素。 数组索引可以是最后的选择，但通常你应该尝试使用唯一标识。

# --hints--

`Frameworks` 组件应该存在并渲染到页面。

```js
assert(
  Enzyme.mount(React.createElement(Frameworks)).find('Frameworks').length === 1
);
```

`Frameworks` 应该渲染一个 `h1` 元素。

```js
assert(Enzyme.mount(React.createElement(Frameworks)).find('h1').length === 1);
```

`Frameworks` 应该渲染一个 `ul` 元素。

```js
assert(Enzyme.mount(React.createElement(Frameworks)).find('ul').length === 1);
```

`ul` 标签应该渲染 6 个子 `li` 元素。

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

每个列表项元素应该具有唯一的 `key` 属性。

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

每个列表项元素应该包含来自 `frontEndFrameworks` 的文本。

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
