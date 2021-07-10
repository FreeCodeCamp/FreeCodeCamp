---
id: 5a8b073d06fa14fcfde687aa
title: Exercise Tracker
challengeType: 4
forumTopicId: 301505
dashedName: exercise-tracker
---

# --description--

Build a full stack JavaScript app that is functionally similar to this: <https://exercise-tracker.freecodecamp.rocks/>. Working on this project will involve you writing your code using one of the following methods:

-   Clone [this GitHub repo](https://github.com/freeCodeCamp/boilerplate-project-exercisetracker/) and complete your project locally.
-   Use [our repl.it starter project](https://repl.it/github/freeCodeCamp/boilerplate-project-exercisetracker) to complete your project.
-   Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.

When you are done, make sure a working demo of your project is hosted somewhere public. Then submit the URL to it in the `Solution Link` field. Optionally, also submit a link to your project's source code in the `GitHub Link` field.

# --hints--

You should provide your own project, not the example URL.

```js
(getUserInput) => {
  const url = getUserInput('url');
  assert(
    !/.*\/exercise-tracker\.freecodecamp\.rocks/.test(getUserInput('url'))
  );
};
```

You can `POST` to `/api/exercise/new-user` with form data `username` to create a new user. The returned response will be an object with `username` and `_id` properties.

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/exercise/new-user', {
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

You can make a `GET` request to `api/exercise/users` to get an array of all users. Each element in the array is an object containing a user's `username` and `_id`.

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/exercise/users');
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

You can `POST` to `/api/exercise/add` with form data `userId=_id`, `description`, `duration`, and optionally `date`. If no date is supplied, the current date will be used. The response returned will be the user object with the exercise fields added.

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/exercise/new-user', {
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
    const addRes = await fetch(url + '/api/exercise/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `userId=${_id}&description=${expected.description}&duration=${expected.duration}&date=1990-01-01`
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

You can make a `GET` request to `/api/exercise/log` with a parameter of `userId=_id` to retrieve a full exercise log of any user. The returned response will be the user object with a `log` array of all the exercises added. Each log item has the `description`, `duration`, and `date` properties.

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/exercise/new-user', {
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
    const addRes = await fetch(url + '/api/exercise/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `userId=${_id}&description=${expected.description}&duration=${expected.duration}`
    });
    if (addRes.ok) {
      const logRes = await fetch(url + `/api/exercise/log?userId=${_id}`);
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

A request to a user's log (`/api/exercise/log`) returns an object with a `count` property representing the number of exercises returned.

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/exercise/new-user', {
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
    const addRes = await fetch(url + '/api/exercise/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `userId=${_id}&description=${expected.description}&duration=${expected.duration}`
    });
    if (addRes.ok) {
      const logRes = await fetch(url + `/api/exercise/log?userId=${_id}`);
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

You can add `from`, `to` and `limit` parameters to a `/api/exercise/log` request to retrieve part of the log of any user. `from` and `to` are dates in `yyyy-mm-dd` format. `limit` is an integer of how many logs to send back.

```js
async (getUserInput) => {
  const url = getUserInput('url');
  const res = await fetch(url + '/api/exercise/new-user', {
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
    const addExerciseRes = await fetch(url + '/api/exercise/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `userId=${_id}&description=${expected.description}&duration=${expected.duration}&date=1990-01-01`
    });
    const addExerciseTwoRes = await fetch(url + '/api/exercise/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `userId=${_id}&description=${expected.description}&duration=${expected.duration}&date=1990-01-02`
    });
    if (addExerciseRes.ok && addExerciseTwoRes.ok) {
      const logRes = await fetch(
        url + `/api/exercise/log?userId=${_id}&from=1989-12-31&to=1990-01-03`
      );
      if (logRes.ok) {
        const { log } = await logRes.json();
        assert.isArray(log);
        assert.equal(2, log.length);
      } else {
        throw new Error(`${logRes.status} ${logRes.statusText}`);
      }
      const limitRes = await fetch(
        url + `/api/exercise/log?userId=${_id}&limit=1`
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
