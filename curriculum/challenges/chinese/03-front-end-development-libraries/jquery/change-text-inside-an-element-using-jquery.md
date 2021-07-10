---
id: 564944c91be2204b269d51e3
title: 使用 jQuery 更改元素内部的文本
challengeType: 6
forumTopicId: 16773
dashedName: change-text-inside-an-element-using-jquery
---

# --description--

可以通过 jQuery 改变元素开始和结束标签之间的文本。 甚至改变 HTML 标签。

jQuery 有一个 `.html()` 函数，能用其在标签里添加 HTML 标签和文本， 函数提供的内容将完全替换之前标签的内容。

下面是重写并强调标题文本的代码：

```js
$("h3").html("<em>jQuery Playground</em>");
```

jQuery 还有一个类似的函数 `.text()`，可以在不添加标签的前提下改变标签内的文本。 换句话说，这个函数不会评估传递给它的任何 HTML 标记，而是将其视为要替换现有内容的文本。

给 id 为 `target4` 的按钮的文本添加强调效果。

查看这篇[关于 &lt;em> 的文章](https://www.freecodecamp.org/news/html-elements-explained-what-are-html-tags/#em-element)来了解更多 `<i>` 和 `<em>` 的区别和用法。

注意，`<i>` 标签虽然传统上用来强调文本，但此后常用作图标的标签。 `<em>` 标签作为强调标签现在已被广泛接受。 可以使用任意一种完成这个挑战。

# --hints--

应该通过添加 HTML 标签强调 `target4` 按钮中的文本。

```js
assert.isTrue(
  /<em>|<i>\s*#target4\s*<\/em>|<\/i>/gi.test($('#target4').html())
);
```

文本应该保持不变。

```js
assert($('#target4') && $('#target4').text().trim() === '#target4');
```

不应该改变其它任何文本内容。

```js
assert.isFalse(/<em>|<i>/gi.test($('h3').html()));
```

应该使用 `.html()` 方法而不是 `.text()` 方法。

```js
assert(code.match(/\.html\(/g));
```

应该使用 jQuery 选取 `button id="target4"`。

```js
assert(code.match(/\$\(\s*?(\"|\')#target4(\"|\')\s*?\)\.html\(/));
```

# --seed--

## --seed-contents--

```html
<script>
  $(document).ready(function() {
    $("#target1").css("color", "red");

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
    $("#target4").html('<em>#target4</em>');
  });
</script>

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
