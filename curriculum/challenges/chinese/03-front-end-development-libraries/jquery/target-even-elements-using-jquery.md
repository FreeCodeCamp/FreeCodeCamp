---
id: bad87fee1348bd9aed008826
title: 使用 jQuery 选择偶数元素
challengeType: 6
forumTopicId: 18318
required:
  - 
    link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.css'
dashedName: target-even-elements-using-jquery
---

# --description--

也可以用基于位置的奇 `:odd` 和偶 `:even` 选择器选取标签。

注意，jQuery 是零索引（zero-indexed）的，这意味着第 1 个标签的位置编号是 0。 这有点混乱和反常——`:odd` 表示选择第 2 个标签（位置编号 1），第 4 个标签（位置编号 3）……等等，以此类推。

下面的代码展示了选取所有 `target` class 元素的奇数元素并设置 sheke 效果：

```js
$(".target:odd").addClass("animated shake");
```

尝试选取所有 `target` class 元素的偶数元素并给它们设置 `animated` 和 `shake` class。 请记住， **偶数**指的是基于零系统的元素的位置。

# --hints--

所有的偶数位置上的 `target` 元素都应该抖动。

```js
assert(
  $('.target:even').hasClass('animated') && $('.target:even').hasClass('shake')
);
```

应该使用 `:even` 选择器修改这些元素。

```js
assert(code.match(/\:even/g));
```

应该仅用 jQuery 给元素添加 class。

```js
assert(
  code.match(/\$\(".target:even"\)/g) ||
    code.match(/\$\('.target:even'\)/g) ||
    code.match(/\$\(".target"\).filter\(":even"\)/g) ||
    code.match(/\$\('.target'\).filter\(':even'\)/g)
);
```

# --seed--

## --seed-contents--

```html
<script>
  $(document).ready(function() {
    $("#target1").css("color", "red");
    $("#target1").prop("disabled", true);
    $("#target4").remove();
    $("#target2").appendTo("#right-well");
    $("#target5").clone().appendTo("#left-well");
    $("#target1").parent().css("background-color", "red");
    $("#right-well").children().css("color", "orange");
    $("#left-well").children().css("color", "green");
    $(".target:nth-child(2)").addClass("animated bounce");

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
    $("#target1").css("color", "red");
    $("#target1").prop("disabled", true);
    $("#target4").remove();
    $("#target2").appendTo("#right-well");
    $("#target5").clone().appendTo("#left-well");
    $("#target1").parent().css("background-color", "red");
    $("#right-well").children().css("color", "orange");
    $("#left-well").children().css("color", "green");
    $(".target:nth-child(2)").addClass("animated bounce");
    $(".target:even").addClass("animated shake");
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
