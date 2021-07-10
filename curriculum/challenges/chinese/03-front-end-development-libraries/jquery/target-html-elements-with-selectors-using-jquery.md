---
id: bad87fee1348bd9bedc08826
title: 使用 jQuery 选择器选择元素
challengeType: 6
forumTopicId: 18319
required:
  - 
    link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.css'
dashedName: target-html-elements-with-selectors-using-jquery
---

# --description--

现在已经有了 `document ready function`。

首先，完成第一个 jQuery 语句。 所有的 jQuery 函数都以 `$` 开头，这个符号通常被称为美元符号（dollar sign operator）或 bling。

jQuery 通常选取并操作带有<dfn>选择器（selector）</dfn>的 HTML 标签。

比如，想要给 `button` 元素添加跳跃效果。 只需要在 document ready 函数内添加如下代码：

```js
$("button").addClass("animated bounce");
```

请注意，我们已经在后台引入了 jQuery 库和 Animate.css 库，所以你可以在编辑器里直接使用它们。 你将使用 jQuery 将 Animate.css `bounce` class 应用于 `button` 元素。

# --hints--

应该用 jQuery 的 `addClass()` 函数给 `button` 元素添加 `animated` 和 `bounce` class。

```js
assert($('button').hasClass('animated') && $('button').hasClass('bounce'));
```

应该仅用 jQuery 给元素添加 class。

```js
assert(!code.match(/class.*animated/g));
```

jQuery 代码应该放在 `$(document).ready();` 函数里。

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
