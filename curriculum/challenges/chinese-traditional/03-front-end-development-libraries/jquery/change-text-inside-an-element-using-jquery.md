---
id: 564944c91be2204b269d51e3
title: 使用 jQuery 更改元素內部的文本
challengeType: 6
forumTopicId: 16773
dashedName: change-text-inside-an-element-using-jquery
---

# --description--

可以通過 jQuery 改變元素開始和結束標籤之間的文本。 甚至改變 HTML 標籤。

jQuery 有一個 `.html()` 函數，能用其在標籤裏添加 HTML 標籤和文本， 函數提供的內容將完全替換之前標籤的內容。

下面是重寫並強調標題文本的代碼：

```js
$("h3").html("<em>jQuery Playground</em>");
```

jQuery 還有一個類似的函數 `.text()`，可以在不添加標籤的前提下改變標籤內的文本。 換句話說，這個函數不會評估傳遞給它的任何 HTML 標記，而是將其視爲要替換現有內容的文本。

給 id 爲 `target4` 的按鈕的文本添加強調效果。

查看這篇[關於 &lt;em> 的文章](https://www.freecodecamp.org/news/html-elements-explained-what-are-html-tags/#em-element)來了解更多 `<i>` 和 `<em>` 的區別和用法。

注意，`<i>` 標籤雖然傳統上用來強調文本，但此後常用作圖標的標籤。 `<em>` 標籤作爲強調標籤現在已被廣泛接受。 可以使用任意一種完成這個挑戰。

# --hints--

應該通過添加 HTML 標籤強調 `target4` 按鈕中的文本。

```js
assert.isTrue(
  /<em>|<i>\s*#target4\s*<\/em>|<\/i>/gi.test($('#target4').html())
);
```

文本應該保持不變。

```js
assert($('#target4') && $('#target4').text().trim() === '#target4');
```

不應該改變其它任何文本內容。

```js
assert.isFalse(/<em>|<i>/gi.test($('h3').html()));
```

應該使用 `.html()` 方法而不是 `.text()` 方法。

```js
assert(code.match(/\.html\(/g));
```

應該使用 jQuery 選取 `button id="target4"`。

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
