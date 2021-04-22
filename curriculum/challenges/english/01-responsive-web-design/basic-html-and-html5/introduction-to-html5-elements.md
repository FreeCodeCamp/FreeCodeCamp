---
id: bad87fee1348bd9aecf08801
title: Introduction to HTML5 Elements
challengeType: 0
videoUrl: 'https://scrimba.com/p/pVMPUv/cBkZGpt7'
forumTopicId: 301097
dashedName: introduction-to-html5-elements
---

# --description--

HTML5 introduces more descriptive HTML tags. These include `main`, `header`, `footer`, `nav`, `video`, `article`, `section` and others.

These tags give a descriptive structure to your HTML, make your HTML easier to read, and help with Search Engine Optimization (SEO) and accessibility. The `main` HTML5 tag helps search engines and other developers find the main content of your page.

Example usage, a `main` element with two child elements nested inside it:

```html
<main> 
  <h1>Hello World</h1>
  <p>Hello Paragraph</p>
</main>
```

**Note:** Many of the new HTML5 tags and their benefits are covered in the Applied Accessibility section.

# --instructions--

Create a second `p` element with the following kitty ipsum text: `Purr jump eat the grass rip the couch scratched sunbathe, shed everywhere rip the couch sleep in the sink fluffy fur catnip scratched.`

Then, create a `main` element and nest only the two `p` elements inside the `main` element.

# --hints--

You should have 2 `p` elements with Kitty Ipsum text.

```js
assert($('p').length > 1);
```

Each of your `p` elements should have a closing tag.

```js
assert(
  code.match(/<\/p>/g) &&
    code.match(/<\/p>/g).length === code.match(/<p/g).length
);
```

Your `p` element should contain the first few words of the provided additional `kitty ipsum text`.

```js
assert.isTrue(/Purr\s+jump\s+eat/gi.test($('p').text()));
```

Your code should have one `main` element.

```js
assert($('main').length === 1);
```

The `main` element should have two paragraph elements as children.

```js
assert($('main').children('p').length === 2);
```

The opening `main` tag should come before the first paragraph tag.

```js
assert(code.match(/<main>\s*?<p>/g));
```

The closing `main` tag should come after the second closing paragraph tag.

```js
assert(code.match(/<\/p>\s*?<\/main>/g));
```

# --seed--

## --seed-contents--

```html
<h2>CatPhotoApp</h2>

<p>Kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff.</p>
```

# --solutions--

```html
<h2>CatPhotoApp</h2>
<main>
  <p>Kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff.</p>
  <p>Purr jump eat the grass rip the couch scratched sunbathe, shed everywhere rip the couch sleep in the sink fluffy fur catnip scratched.</p>
</main>
```
