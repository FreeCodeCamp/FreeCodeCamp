---
id: bad87fee1348bd9aec908856
title: 給 Bootstrap 按鈕設置標籤
challengeType: 0
forumTopicId: 18222
dashedName: label-bootstrap-buttons
---

# --description--

正如標註了每個 wells 一樣，同樣可以標註每一個按鈕。

爲每個 `button` 元素設置與其 id 選擇器對應的文本。

# --hints--

應給 id 爲 `target1` 的 `button` 元素設置文本爲 `#target1`。

```js
assert(new RegExp('#target1', 'gi').test($('#target1').text()));
```

應給 id 爲 `target2` 的 `button` 元素設置文本爲`#target2`。

```js
assert(new RegExp('#target2', 'gi').test($('#target2').text()));
```

應給 id 爲 `target3` 的 `button` 元素設置文本爲 `#target3`。

```js
assert(new RegExp('#target3', 'gi').test($('#target3').text()));
```

應給 id 爲 `target4` 的 `button` 元素設置文本爲 `#target4`。

```js
assert(new RegExp('#target4', 'gi').test($('#target4').text()));
```

應給 id 爲 `target5` 的 `button` 元素設置文本爲`#target5`。

```js
assert(new RegExp('#target5', 'gi').test($('#target5').text()));
```

應給 id 爲 `target6` 的 `button` 元素設置文本爲`#target6`。

```js
assert(new RegExp('#target6', 'gi').test($('#target6').text()));
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
        <button class="btn btn-default target" id="target1"></button>
        <button class="btn btn-default target" id="target2"></button>
        <button class="btn btn-default target" id="target3"></button>
      </div>
    </div>
    <div class="col-xs-6">
      <h4>#right-well</h4>
      <div class="well" id="right-well">
        <button class="btn btn-default target" id="target4"></button>
        <button class="btn btn-default target" id="target5"></button>
        <button class="btn btn-default target" id="target6"></button>
      </div>
    </div>
  </div>
</div>
```

# --solutions--

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
