---
id: bad87fee1348bd9aedc08826
title: 使用 jQuery class 选择器选择元素
challengeType: 6
forumTopicId: 18316
required:
  - 
    link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.css'
dashedName: target-elements-by-class-using-jquery
---

# --description--

如何使所有的 `button` 标签都有弹跳的动画效果？ 用 `$("button")` 选取所有的 button 标签，并用 `.addClass("animated bounce");` 给其添加一些 CSS 属性。

jQuery 的 `.addClass()` 方法用来给标签添加类。

首先，使用 `$(".well")` 选取类为 `well` 的 `div` 标签。

值得注意的是，和 CSS 声明一样，在类名前需要添加 `.`。

然后，用 jQuery 的 `.addClass()` 方法添加 `animated` 和 `shake` class。

例如，在 `document ready function` 中添加下面的代码，使所有类为 `text-primary` 的标签抖动：

```js
$(".text-primary").addClass("animated shake");
```

# --hints--

应该用 jQuery 的 `addClass()` 方法给所有 class 为 `well` 的元素添加 `animated` 和 `shake` class。

```js
assert($('.well').hasClass('animated') && $('.well').hasClass('shake'));
```

应该仅用 jQuery 给元素添加这些 class。

```js
assert(!code.match(/class\.\*animated/g));
```

# --seed--

## --seed-contents--

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

# --solutions--

```html
<script>
  $(document).ready(function() {
    $("button").addClass("animated bounce");
    $(".well").addClass("animated shake");
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
