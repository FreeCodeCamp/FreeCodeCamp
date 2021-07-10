---
id: 5a24c314108439a4d4036156
title: 使用中間件處理異步操作
challengeType: 6
forumTopicId: 301451
dashedName: use-middleware-to-handle-asynchronous-actions
---

# --description--

目前爲止的挑戰都在避免討論異步操作，但它們是 Web 開發中不可避免的一部分。 在某些時候，需要在 Redux 應用程序中使用異步請求，那麼如何處理這些類型的請求？ Redux 中間件專爲此目的而設計，稱爲 Redux Thunk 中間件。 這裏簡要介紹如何在 Redux 中使用它。

如果要使用 Redux Thunk 中間件，請將其作爲參數傳遞給 `Redux.applyMiddleware()`。 然後將此函數作爲第二個可選參數提供給 `createStore()` 函數， 看一下編輯器底部的代碼。 然後，要創建一個異步的 action，需要在 action creator 中返回一個以 `dispatch` 爲參數的函數。 在這個函數中，可以 dispatch action 並執行異步請求。

在此示例中，使用 `setTimeout()` 模擬異步請求。 通常在執行異步行爲之前 dispatch action，以便應用程序狀態知道正在請求某些數據（例如，這個狀態可以顯示加載圖標）。 然後，一旦收到數據，就會發送另一個 action，該 action 的 data 是請求返回的數據同時也代表 API 操作完成。

請記住，正在將 `dispatch` 作爲參數傳遞給這個特殊的 action creator。 需要 dispatch action 時只需將 action 直接傳遞給 dispatch，中間件就可以處理其餘的部分。

# --instructions--

在 `handleAsync()` 的 action creator 中編寫兩個 dispatch 事件。 在 `setTimeout()`（模擬 API 調用）之前 dispatch `requestingData()`。 然後在收到（模擬）數據後，dispatch `receivedData()` action，傳入這些數據。 現在已經知道如何處理 Redux 中的異步操作， 其他所有操作都繼續像以前一樣。

# --hints--

`requestingData` action creator 應返回類型和值都爲 `REQUESTING_DATA` 的對象。

```js
assert(requestingData().type === REQUESTING_DATA);
```

`receivedData` action creator 應返回類型和值都等於 `RECEIVED_DATA` 的對象。

```js
assert(receivedData('data').type === RECEIVED_DATA);
```

`asyncDataReducer` 必須是個函數。

```js
assert(typeof asyncDataReducer === 'function');
```

分發 `requestingData` 後 action creator 應該將 store 中 `state` 的 fetching 值更新爲 `true`。

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch(requestingData());
    const reqState = store.getState();
    return initialState.fetching === false && reqState.fetching === true;
  })()
);
```

如果要 dispatch `handleAsync` 應先 dispatch 數據請求的 action，然後在收到請求結果後再 dispatch 接收的數據 action。

```js
assert(
  (function () {
    const noWhiteSpace = __helpers.removeWhiteSpace(handleAsync.toString());
    return (
      noWhiteSpace.includes('dispatch(requestingData())') === true &&
      noWhiteSpace.includes('dispatch(receivedData(data))') === true
    );
  })()
);
```

# --seed--

## --seed-contents--

```js
const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

const handleAsync = () => {
  return function(dispatch) {
    // Dispatch request action here

    setTimeout(function() {
      let data = {
        users: ['Jeff', 'William', 'Alice']
      }
      // Dispatch received data action here

    }, 2500);
  }
};

const defaultState = {
  fetching: false,
  users: []
};

const asyncDataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: []
      }
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users
      }
    default:
      return state;
  }
};

const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);
```

# --solutions--

```js
const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

const handleAsync = () => {
  return function(dispatch) {
    dispatch(requestingData());
    setTimeout(function() {
      let data = {
        users: ['Jeff', 'William', 'Alice']
      }
      dispatch(receivedData(data));
    }, 2500);
  }
};

const defaultState = {
  fetching: false,
  users: []
};

const asyncDataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: []
      }
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users
      }
    default:
      return state;
  }
};

const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);
```
