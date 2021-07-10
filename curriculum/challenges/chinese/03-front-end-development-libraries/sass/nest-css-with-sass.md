---
id: 587d7dbd367417b2b2512bb5
title: 用 Sass 嵌套 CSS
challengeType: 0
forumTopicId: 301457
dashedName: nest-css-with-sass
---

# --description--

Sass 允许 CSS 规则的嵌套，这在组织样式表的时候会很有用。

在 CSS 里，每个元素的样式都需要写在独立的代码块中，如下所示：

```scss
nav {
  background-color: red;
}

nav ul {
  list-style: none;
}

nav ul li {
  display: inline-block;
}
```

对于一个大型项目，CSS 规则会很复杂。 这时，引入嵌套功能（即在对应的父元素中写子元素的样式）可以有效地简化代码：

```scss
nav {
  background-color: red;

  ul {
    list-style: none;

    li {
      display: inline-block;
    }
  }
}

```

# --instructions--

根据上面关于嵌套的例子，来简化 `.blog-post` 中两个子元素的 CSS 代码。 为了通过测试，`h1` 应该出现在 `p` 元素之前。

# --hints--

应重新组织 CSS 规则，以便 `h1` 和 `p` 嵌套在 `.blog-post` 父元素中。

```js
assert(
  code.match(
    /\.blog-post\s*?{\s*?h1\s*?{\s*?text-align:\s*?center;\s*?color:\s*?blue;\s*?}\s*?p\s*?{\s*?font-size:\s*?20px;\s*?}\s*?}/gi
  )
);
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>
  .blog-post {

  }
  h1 {
    text-align: center;
    color: blue;
  }
  p {
    font-size: 20px;
  }
</style>

<div class="blog-post">
  <h1>Blog Title</h1>
  <p>This is a paragraph</p>
</div>
```

# --solutions--

```html
<style type='text/scss'>
  .blog-post {
    h1 {
      text-align: center;
      color: blue;
    }
    p {
      font-size: 20px;
    }
  }
</style>

<div class="blog-post">
  <h1>Blog Title</h1>
  <p>This is a paragraph</p>
</div>
```
