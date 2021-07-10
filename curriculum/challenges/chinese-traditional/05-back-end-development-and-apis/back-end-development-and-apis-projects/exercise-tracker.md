---
id: 5a8b073d06fa14fcfde687aa
title: Exercise 追蹤器
challengeType: 4
forumTopicId: 301505
dashedName: exercise-tracker
---

# --description--

構建一個 JavaScript 的全棧應用，在功能上與這個應用相似： <https://exercise-tracker.freecodecamp.rocks/>。 可以採用下面的一種方式完成這個挑戰：

-   克隆 [GitHub 倉庫](https://github.com/freeCodeCamp/boilerplate-project-exercisetracker/) 並在本地完成你的項目。
-   使用[我們的 Replit 初始化項目](https://replit.com/github/freeCodeCamp/boilerplate-project-exercisetracker)來完成你的項目。
-   使用你選擇的網站生成器來完成項目， 並確保包含了我們 GitHub 倉庫的所有文件。

當完成本項目，請確認有一個正常運行的 demo 可以公開訪問。 然後將 URL 提交到 `Solution Link` 中。 此外，還可以將項目的源碼提交到 `GitHub Link` 中。

# --hints--

提交自己的項目，而不是示例的 URL。

```js
(getUserInput) => {
  const url = getUserInput('url');
  assert(
    !/.*\/exercise-tracker\.freecodecamp\.rocks/.test(getUserInput('url'))
  );
};
```

可以將表單裏的 `username` 通過 `POST` 請求發送到 `/api/users`，以創建一個新的用戶。 返回的響應內容是一個帶有 `username` 和 `_id` 的對象

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=fcc_test_${Date.now()}`.substr(0, 29)
  });
  if (res.ok) {
    const { _id, username } = await res.json();
    assert.exists(_id);
    assert.exists(username);
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};
```

可以發送 `GET` 請求到 `/api/users`，以獲取一個所有用戶的數組， 數組裏的每個元素都是一個包含 `username` 和 `_id` 的用戶對象。

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/users');
  if (res.ok) {
    const data = await res.json();
    assert.isArray(data);
    assert.isString(data[0].username);
    assert.isString(data[0]._id);
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};
```

你能用表單裏的 `description`、`duration` 和 `date`（可選）發送 `POST` 請求到 `/api/users/:_id/exercises`。 如果沒有傳入 date，默認採用當前日期。 響應內容是包含 exercise 表單內容的 user 對象。

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=fcc_test_${Date.now()}`.substr(0, 29)
  });
  if (res.ok) {
    const { _id, username } = await res.json();
    const expected = {
      username,
      description: 'test',
      duration: 60,
      _id,
      date: 'Mon Jan 01 1990'
    };
    const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `description=${expected.description}&duration=${expected.duration}&date=1990-01-01`
    });
    if (addRes.ok) {
      const actual = await addRes.json();
      assert.deepEqual(actual, expected);
    } else {
      throw new Error(`${addRes.status} ${addRes.statusText}`);
    }
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};
```

可以發送 `GET` 請求到 `/api/users/:_id/logs`，以獲取任何用戶的完整 exercise 日誌。 響應內容是一個 user 對象，它帶有一個 `log` 屬性，該屬性的值是所有被添加的 exercises 表單記錄組成的數組， 每一個 log 數組裏的元素應該是一個含有 `description`、`duration` 和 `date` 等屬性的對象。

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=fcc_test_${Date.now()}`.substr(0, 29)
  });
  if (res.ok) {
    const { _id, username } = await res.json();
    const expected = {
      username,
      description: 'test',
      duration: 60,
      _id,
      date: new Date().toDateString()
    };
    const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `description=${expected.description}&duration=${expected.duration}`
    });
    if (addRes.ok) {
      const logRes = await fetch(url + `/api/users/${_id}/logs`);
      if (logRes.ok) {
        const { log } = await logRes.json();
        assert.isArray(log);
        assert.equal(1, log.length);
      } else {
        throw new Error(`${logRes.status} ${logRes.statusText}`);
      }
    } else {
      throw new Error(`${addRes.status} ${addRes.statusText}`);
    }
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};
```

用戶日誌請求（`/api/users/:_id/logs`）返回一個帶有 `count` 屬性的對象，該屬性反映 exercises 表單的成功提交次數（譯者注：即 log 屬性元素的個數）。

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=fcc_test_${Date.now()}`.substr(0, 29)
  });
  if (res.ok) {
    const { _id, username } = await res.json();
    const expected = {
      username,
      description: 'test',
      duration: 60,
      _id,
      date: new Date().toDateString()
    };
    const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `description=${expected.description}&duration=${expected.duration}`
    });
    if (addRes.ok) {
      const logRes = await fetch(url + `/api/users/${_id}/logs`);
      if (logRes.ok) {
        const { count } = await logRes.json();
        assert(count);
      } else {
        throw new Error(`${logRes.status} ${logRes.statusText}`);
      }
    } else {
      throw new Error(`${addRes.status} ${addRes.statusText}`);
    }
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};
```

可以把 `from`、`to` 和 `limit` 參數添加到一個 `/api/users/:_id/logs` 請求，以查詢該用戶的部分 exercise 表單提交記錄， `from` 和 `to` 是 `yyyy-mm-dd` 形式的日期， `limit` 是希望返回的 log 數量。

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=fcc_test_${Date.now()}`.substr(0, 29)
  });
  if (res.ok) {
    const { _id, username } = await res.json();
    const expected = {
      username,
      description: 'test',
      duration: 60,
      _id,
      date: new Date().toDateString()
    };
    const addExerciseRes = await fetch(url + `/api/users/${_id}/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `description=${expected.description}&duration=${expected.duration}&date=1990-01-01`
    });
    const addExerciseTwoRes = await fetch(url + `/api/users/${_id}/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `description=${expected.description}&duration=${expected.duration}&date=1990-01-02`
    });
    if (addExerciseRes.ok && addExerciseTwoRes.ok) {
      const logRes = await fetch(
        url + `/api/users/${_id}/logs?from=1989-12-31&to=1990-01-03`
      );
      if (logRes.ok) {
        const { log } = await logRes.json();
        assert.isArray(log);
        assert.equal(2, log.length);
      } else {
        throw new Error(`${logRes.status} ${logRes.statusText}`);
      }
      const limitRes = await fetch(
        url + `/api/users/${_id}/logs?limit=1`
      );
      if (limitRes.ok) {
        const { log } = await limitRes.json();
        assert.isArray(log);
        assert.equal(1, log.length);
      } else {
        throw new Error(`${limitRes.status} ${limitRes.statusText}`);
      }
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};
```

# --solutions--

```js
/**
  Backend challenges don't need solutions,
  because they would need to be tested against a full working project.
  Please check our contributing guidelines to learn more.
*/
```
