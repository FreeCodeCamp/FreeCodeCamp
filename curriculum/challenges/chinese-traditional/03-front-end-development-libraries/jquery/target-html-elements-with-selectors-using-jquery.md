---
id: bad87fee1348bd9bedc08826
title: 使用 jQuery 選擇器選擇元素
challengeType: 6
forumTopicId: 18319
required:
  - 
    link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.css'
dashedName: target-html-elements-with-selectors-using-jquery
---

# --description--

現在已經有了 `document ready function`。

首先，完成第一個 jQuery 語句。 所有的 jQuery 函數都以 `$` 開頭，這個符號通常被稱爲美元符號（dollar sign operator）或 bling。

jQuery 通常選取並操作帶有<dfn>選擇器（selector）</dfn>的 HTML 標籤。

比如，想要給 `button` 元素添加跳躍效果。 只需要在 document ready 函數內添加如下代碼：

```js
$("button").addClass("animated bounce");
```

請注意，我們已經在後臺引入了 jQuery 庫和 Animate.css 庫，所以你可以在編輯器裏直接使用它們。 你將使用 jQuery 將 Animate.css `bounce` class 應用於 `button` 元素。

# --hints--

應該用 jQuery 的 `addClass()` 函數給 `button` 元素添加 `animated` 和 `bounce` class。

```js
assert($('button').hasClass('animated') && $('button').hasClass('bounce'));
```

應該僅用 jQuery 給元素添加 class。

```js
assert(!code.match(/class.*animated/g));
```

jQuery 代碼應該放在 `$(document).ready();` 函數裏。

```js
assert(
  code.replace(/\s/g, '').match(/\$\(document\)\.ready\(function\(\)\{\$/g)
);
```

# --seed--

## --seed-contents--

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

# --solutions--

```html
<script>
  $(document).ready(function() {
    $("button").addClass("animated bounce");
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
