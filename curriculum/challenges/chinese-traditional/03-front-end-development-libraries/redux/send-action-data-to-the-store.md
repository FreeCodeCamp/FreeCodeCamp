---
id: 5a24c314108439a4d4036155
title: 發送 Action Data 給 Store
challengeType: 6
forumTopicId: 301448
dashedName: send-action-data-to-the-store
---

# --description--

到目前爲止，你已經學會了如何將 action dispatch 給 Redux store，但到目前爲止，這些 action 並未包含除 `type`之外的任何信息。 還可以和 action 一起發送特定數據。 事實上，這是非常常見的，因爲 action 通常源於一些用戶交互，並且往往會攜帶一些數據， Redux store 經常需要知道這些數據。

# --instructions--

在代碼編輯器中定義了一個基礎的 `notesReducer()` 和 `addNoteText()` action creator。 完成 `addNoteText()` 函數的主體，這樣它就會返回一個 `action` 對象。 該對象應該包含一個 `type` 屬性，其值爲 `ADD_NOTE`，還有一個傳入 action creator 的屬性爲 `text` 的 `note` 數據。 當調用 action creator 時，需要傳入可以訪問該對象的特定筆記信息。

接下來，完成在 `notesReducer()` 中編寫的 `switch` 語句。 需要添加一個處理 `addNoteText()` 操作的選項。 如果 action 的類型爲 `ADD_NOTE`，就應該觸發這個 case，並且它應該在傳入的 `action` 上返回 `text` 屬性作爲新的 `state`

這個 action 將在代碼底部發送。 一旦完成後，運行代碼並觀察控制檯。 這就是將特定於 action 的數據發送到 store 並在更新 store `state`時使用它所需的全部內容。

# --hints--

action creator `addNoteText` 應該返回一個包含 `type` 和 `text` 的對象。

```js
assert(
  (function () {
    const addNoteFn = addNoteText('__TEST__NOTE');
    return addNoteFn.type === ADD_NOTE && addNoteFn.text === '__TEST__NOTE';
  })()
);
```

dispatch 一個 action creator 是 `addNoteText` 的action `ADD_NOTE`，應將 `state` 更新爲 action creator 傳遞的字符串。

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
