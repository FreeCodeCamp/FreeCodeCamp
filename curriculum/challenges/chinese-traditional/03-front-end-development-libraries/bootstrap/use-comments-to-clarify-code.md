---
id: bad87fee1348bd9aec908857
title: 使用註釋來說明代碼
challengeType: 0
forumTopicId: 18347
dashedName: use-comments-to-clarify-code
---

# --description--

使用 jQuery 時，修改 HTML 元素時並不需要直接修改 HTML 代碼。

必須確保讓每個人都知道不應該直接修改此頁面上的這些代碼。

記住，可以在 `<!--` 爲開始，`-->` 爲結束的地方進行評論註釋。

請你在 HTML 頂部加如下一段註釋： `Code below this line should not be changed` 。

# --hints--

應該在 HTML 頂部增加此代碼 `<!--` 以開始註釋。

```js
assert(code.match(/^\s*<!--/));
```

註釋內容應該爲 `Code below this line should not be changed`。

```js
assert(code.match(/<!--(?!(>|->|.*-->.*this line))\s*.*this line.*\s*-->/gi));
```

註釋應該用 `-->` 進行閉合。

```js
assert(code.match(/-->.*\n+.+/g));
```

注意，註釋的開始標籤和閉合標籤數量應該一一對應，保持數量一致。

```js
assert(code.match(/<!--/g).length === code.match(/-->/g).length);
```

# --seed--

## --seed-contents--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <h4>#left-well</h4>
      <div class="well" id="left-well">
        <button class="btn btn-default target" id="target1">#target1</button>
        <button class="btn btn-default target" id="target2">#target2</button>
        <button class="btn btn-default target" id="target3">#target3</button>
      </div>
    </div>
    <div class="col-xs-6">
      <h4>#right-well</h4>
      <div class="well" id="right-well">
        <button class="btn btn-default target" id="target4">#target4</button>
        <button class="btn btn-default target" id="target5">#target5</button>
        <button class="btn btn-default target" id="target6">#target6</button>
      </div>
    </div>
  </div>
</div>
```

# --solutions--

```html
<!-- Code below this line should not be changed -->
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <h4>#left-well</h4>
      <div class="well" id="left-well">
        <button class="btn btn-default target" id="target1">#target1</button>
        <button class="btn btn-default target" id="target2">#target2</button>
        <button class="btn btn-default target" id="target3">#target3</button>
      </div>
    </div>
    <div class="col-xs-6">
      <h4>#right-well</h4>
      <div class="well" id="right-well">
        <button class="btn btn-default target" id="target4">#target4</button>
        <button class="btn btn-default target" id="target5">#target5</button>
        <button class="btn btn-default target" id="target6">#target6</button>
      </div>
    </div>
  </div>
</div>
```
