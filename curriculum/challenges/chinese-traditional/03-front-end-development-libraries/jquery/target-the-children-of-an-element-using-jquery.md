---
id: bad87fee1348bd9aed208826
title: 使用 jQuery 選擇元素的子元素
challengeType: 6
forumTopicId: 18320
dashedName: target-the-children-of-an-element-using-jquery
---

# --description--

把 HTML 標籤放到另一個級別的標籤裏，這些 HTML 標籤被稱爲該標籤的<dfn>子標籤（children element）</dfn>。 例如，本次挑戰中文本爲 `#target1`、`#target2` 和 `#target3` 的按鈕都是 `<div class="well" id="left-well">` 標籤的子標籤。

jQuery 有一個 `children()` 方法，可以訪問被選取標籤的子標籤。

下面的代碼展示了用 `children()` 方法把 `left-well` 標籤的子標籤的顏色設置成 `blue`（藍色）：

```js
$("#left-well").children().css("color", "blue")
```

# --instructions--

將 `right-well` 元素的所有子元素設置爲橙色（orange）。

# --hints--

`#right-well` 的所有子元素應該有橙色文本。

```js
assert($('#right-well').children().css('color') === 'rgb(255, 165, 0)');
```

應該用 `children()` 函數修改這些元素。

```js
assert(code.match(/\.children\(\)\.css/g));
```

應該僅用 jQuery 給標籤添加 class。

```js
assert(code.match(/<div class="well" id="right-well">/g));
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
