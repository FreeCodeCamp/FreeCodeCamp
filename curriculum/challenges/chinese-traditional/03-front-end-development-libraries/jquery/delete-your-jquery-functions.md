---
id: bad87fee1348bd9aeda08726
title: 刪除 jQuery 函數
challengeType: 6
forumTopicId: 17561
required:
  - 
    link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.css'
dashedName: delete-your-jquery-functions
---

# --description--

這些動畫開始看起來很酷，但是有時可能會讓用戶分心。

請刪除 `document ready function` 內的三個 jQuery 函數，但保留 `document ready function` 本身。

# --hints--

應該刪除 `document ready function` 中的三個 jQuery 函數。

```js
assert(code.match(/\{\s*\}\);/g));
```

應該保持 `script` 標籤不變。

```js
assert(code.match(/<script>/g));
```

應該保持 `$(document).ready(function() {` 在 `script` 標籤的開頭不變。

```js
assert(code.match(/\$\(document\)\.ready\(function\(\)\s?\{/g));
```

應該保持 `document.ready` function 用 `})` 閉合。

```js
assert(code.match(/.*\s*\}\);/g));
```

應該保持 `script` 標籤閉合。

```js
assert(
  code.match(/<\/script>/g) &&
    code.match(/<script/g) &&
    code.match(/<\/script>/g).length === code.match(/<script/g).length
);
```

# --seed--

## --seed-contents--

```html
<script>
  $(document).ready(function() {
    $("button").addClass("animated bounce");
    $(".well").addClass("animated shake");
    $("#target3").addClass("animated fadeOut");

  });
</script>

<!-- Only change code above this line -->

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
<script>
  $(document).ready(function() {

  });
</script>

<!-- Only change code above this line -->

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
