---
id: 587d7fb6367417b2b2512c06
title: 安裝和設置 Mongoose
challengeType: 2
forumTopicId: 301540
dashedName: install-and-set-up-mongoose
---

# --description--

可以採用下面的任意一種方式完成這些挑戰：

- 克隆 [GitHub repo](https://github.com/freeCodeCamp/boilerplate-mongomongoose/) 並在本地完成項目。
- 使用[我們的 Replit 上的初始化項目](https://replit.com/github/freeCodeCamp/boilerplate-mongomongoose)來完成項目。
- 使用你選擇的網站生成器來完成項目， 並確保包含了我們 GitHub 倉庫的所有文件。

當完成本項目，請確認有一個正常運行的 demo 可以公開訪問。 然後將 URL 提交到 `Solution Link` 中。

在這個挑戰中，你將建立一個 MongoDB Atlas 數據庫並導入連接到它所需的軟件包。

按照<a href='https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/' rel='noopener noreferrer' target='_blank'>這篇教程</a>在 MongoDB Atlas 創建一個託管數據庫。

# --instructions--

將 `mongodb` 和 `mongoose` 添加到項目的 `package.json` 文件中。 然後，在 `myApp.js` 文件中請求 `mongoose`。 創建一個 `.env` 文件，給它添加一個 `MONGO_URI` 變量。 變量的值爲你的 MongoDB Atlas 數據庫 URI。 應用單引號或雙引號包裹 URI。請記住，環境變量 `=` 兩邊不能有空格。 例如，`MONGO_URI='VALUE'`。 完成後，使用下面的代碼來連接數據庫。

```js
mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true });
```

# --hints--

“mongodb” 應在 package.json 中作爲依賴項定義。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/file/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.property(packJson.dependencies, 'mongodb');
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

“mongoose” 應在 package.json 中作爲依賴項定義。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/file/package.json').then(
    (data) => {
      var packJson = JSON.parse(data);
      assert.property(packJson.dependencies, 'mongoose');
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

應使用 “mongoose” 連接數據庫。

```js
(getUserInput) =>
  $.get(getUserInput('url') + '/_api/is-mongoose-ok').then(
    (data) => {
      assert.isTrue(data.isMongooseOk, 'mongoose is not connected');
    },
    (xhr) => {
      throw new Error(xhr.responseText);
    }
  );
```

# --solutions--

```js
/**
  Backend challenges don't need solutions, 
  because they would need to be tested against a full working project. 
  Please check our contributing guidelines to learn more.
*/
```
