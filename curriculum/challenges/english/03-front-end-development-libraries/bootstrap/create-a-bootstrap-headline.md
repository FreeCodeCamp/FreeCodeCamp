---
id: bad87fee1348bd9aec908846
title: Create a Bootstrap Headline
challengeType: 0
forumTopicId: 16812
dashedName: create-a-bootstrap-headline
---

# --description--

Now let's build something from scratch to practice our HTML, CSS and Bootstrap skills.

We'll build a jQuery playground, which we'll soon put to use in our jQuery challenges.

To start with, create an `h3` element, with the text `jQuery Playground`.

Color your `h3` element with the `text-primary` Bootstrap class, and center it with the `text-center` Bootstrap class.

# --hints--

You should add an `h3` element to your page.

```js
assert($('h3') && $('h3').length > 0);
```

Your `h3` element should have a closing tag.

```js
assert(
  code.match(/<\/h3>/g) &&
    code.match(/<h3/g) &&
    code.match(/<\/h3>/g).length === code.match(/<h3/g).length
);
```

Your `h3` element should be colored by applying the class `text-primary`

```js
assert($('h3').hasClass('text-primary'));
```

Your `h3` element should be centered by applying the class `text-center`

```js
assert($('h3').hasClass('text-center'));
```

Your `h3` element should have the text `jQuery Playground`.

```js
assert.isTrue(/jquery(\s)+playground/gi.test($('h3').text()));
```

# --seed--

## --seed-contents--

```html

```

# --solutions--

```html
<h3 class="text-primary text-center">jQuery Playground</h3>
```
