---
id: 5a24c314108439a4d4036155
title: 发送 Action Data 给 Store
challengeType: 6
forumTopicId: 301448
dashedName: send-action-data-to-the-store
---

# --description--

到目前为止，你已经学会了如何将 action dispatch 给 Redux store，但到目前为止，这些 action 并未包含除 `type`之外的任何信息。 还可以和 action 一起发送特定数据。 事实上，这是非常常见的，因为 action 通常源于一些用户交互，并且往往会携带一些数据， Redux store 经常需要知道这些数据。

# --instructions--

在代码编辑器中定义了一个基础的 `notesReducer()` 和 `addNoteText()` action creator。 完成 `addNoteText()` 函数的主体，这样它就会返回一个 `action` 对象。 该对象应该包含一个 `type` 属性，其值为 `ADD_NOTE`，还有一个传入 action creator 的属性为 `text` 的 `note` 数据。 当调用 action creator 时，需要传入可以访问该对象的特定笔记信息。

接下来，完成在 `notesReducer()` 中编写的 `switch` 语句。 需要添加一个处理 `addNoteText()` 操作的选项。 如果 action 的类型为 `ADD_NOTE`，就应该触发这个 case，并且它应该在传入的 `action` 上返回 `text` 属性作为新的 `state`

这个 action 将在代码底部发送。 一旦完成后，运行代码并观察控制台。 这就是将特定于 action 的数据发送到 store 并在更新 store `state`时使用它所需的全部内容。

# --hints--

action creator `addNoteText` 应该返回一个包含 `type` 和 `text` 的对象。

```js
assert(
  (function () {
    const addNoteFn = addNoteText('__TEST__NOTE');
    return addNoteFn.type === ADD_NOTE && addNoteFn.text === '__TEST__NOTE';
  })()
);
```

dispatch 一个 action creator 是 `addNoteText` 的action `ADD_NOTE`，应将 `state` 更新为 action creator 传递的字符串。

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch(addNoteText('__TEST__NOTE'));
    const newState = store.getState();
    return initialState !== newState && newState === '__TEST__NOTE';
  })()
);
```

# --seed--

## --seed-contents--

```js
const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    // Change code below this line

    // Change code above this line
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // Change code below this line

  // Change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello!'));
console.log(store.getState());
```

# --solutions--

```js
const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    // Change code below this line
    case ADD_NOTE:
      return action.text;
    // Change code above this line
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // Change code below this line
  return {
    type: ADD_NOTE,
    text: note
  }
  // Change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello Redux!'));
console.log(store.getState());
```
