---
id: 60b69a66b6ddb80858c515bf
title: Part 81
challengeType: 0
dashedName: part-81
---

# --description--

Select the `guitar-right` `id`, and also set `position` to `absolute`. This time, set `left` to `100px`.

# --hints--

Test 1

```js

```

# --seed--

## --seed-contents--

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>freeCodeCamp Picasso Painting</title>
    <link rel="stylesheet" type="text/css" href="./styles.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
  </head>
  <body>
    <div id="back-wall"></div>
        <div class="characters">
          <div id="offwhite-character">
            <div id="white-hat"></div>
            <div id="black-mask">
              <div class="eyes left"></div>
              <div class="eyes right"></div>
            </div>
            <div id="gray-instrument">
              <div class="black-dot"></div>
              <div class="black-dot"></div>
              <div class="black-dot"></div>
              <div class="black-dot"></div>
              <div class="black-dot"></div>
            </div>
            <div id="tan-table"></div>
          </div>
          <div id="black-character">
            <div id="black-hat"></div>
            <div id="gray-mask">
              <div class="eyes left"></div>
              <div class="eyes right"></div>
            </div>
            <div id="white-paper">
              <i class="fas fa-music"></i>
              <i class="fas fa-music"></i>
              <i class="fas fa-music"></i>
              <i class="fas fa-music"></i>
            </div>
          </div>
          <div class="blue" id="blue-left"></div>
          <div class="blue" id="blue-right"></div>
          <div id="orange-character">
            <div id="black-round-hat"></div>
            <div id="eyes-div">
              <div class="eyes left"></div>
              <div class="eyes right"></div>
            </div>
            <div id="triangles">
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
              <div class="triangle"></div>
            </div>
            <div id="guitar">
              <div class="guitar" id="guitar-left">
                <i class="fas fa-bars"></i>
              </div>
              <div class="guitar" id="guitar-right">
                <i class="fas fa-bars"></i>
              </div>
              <div id="guitar-neck"></div>
            </div>
          </div>
        </div>
  </body>
</html>
```

```css
body {
  background-color: rgb(184, 132, 46);
}

#back-wall {
  background-color: #8B4513;
  width: 100%;
  height: 60%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

#offwhite-character {
  width: 300px;
  height: 550px;
  background-color: GhostWhite;
  position: absolute;
  top: 20%;
  left: 17.5%;
}

#white-hat {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 120px 140px 180px;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: GhostWhite;
  border-left-color: transparent;
  position: absolute;
  top: -140px;
  left: 0;
}

#black-mask {
  width: 100%;
  height: 50px;
  background-color: rgb(45, 31, 19);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

#gray-instrument {
  width: 15%;
  height: 40%;
  background-color: rgb(167, 162, 117);
  position: absolute;
  top: 50px;
  left: 125px;
  z-index: 1;
}

.black-dot {
  width: 10px;
  height: 10px;
  background-color: rgb(45, 31, 19);
  display: block;
  margin: auto;
  margin-top: 65%;
}

#tan-table {
  width: 450px;
  height: 140px;
  background-color: #D2691E;
  position: absolute;
  top: 275px;
  left: 15px;
  z-index: 1;
}

#black-character {
  width: 300px;
  height: 500px;
  background-color: rgb(45, 31, 19);
  position: absolute;
  top: 30%;
  left: 59%;
}

#black-hat {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 150px 0 0 300px;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: rgb(45, 31, 19);
  position: absolute;
  top: -150px;
  left: 0;
}

#gray-mask {
  width: 150px;
  height: 150px;
  background-color: rgb(167, 162, 117);
  position: absolute;
  top: -10px;
  left: 70px;
}

#white-paper {
  width: 400px;
  height: 100px;
  background-color: GhostWhite;
  position: absolute;
  top: 250px;
  left: -150px;
  z-index: 1;
}

.fa-music {
  display: inline-block;
  margin-top: 8%;
  margin-left: 13%;
}

.blue {
  background-color: #1E90FF;
}

#blue-left {
  width: 500px;
  height: 300px;
  position: absolute;
  top: 20%;
  left: 20%;
}

#blue-right {
  width: 400px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 40%;
}

#orange-character {
  width: 250px;
  height: 550px;
  background-color: rgb(240, 78, 42);
  position: absolute;
  top: 25%;
  left: 40%;
}

#black-round-hat {
  width: 180px;
  height: 150px;
  background-color: rgb(45, 31, 19);
  border-radius: 50%;
  position: absolute;
  top: -100px;
  left: 5px;
  z-index: -1;
}

#eyes-div {
  width: 180px;
  height: 50px;
  position: absolute;
  top: -40px;
  left: 20px;
  z-index: 3;
}

#triangles {
  width: 250px;
  height: 550px;
}

.triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 42px 45px 45px 0;
  border-top-color: transparent;
  border-right-color: Gold; /* yellow */
  border-bottom-color: transparent;
  border-left-color: transparent;
  display: inline-block;
}

#guitar {
  width: 100%;
  height: 100px;
  position: absolute;
  top: 120px;
  left: 0px;
  z-index: 3;
}

.guitar {
  width: 150px;
  height: 120px;
  background-color: Goldenrod;
  border-radius: 50%;
}

#guitar-left {
  position: absolute;
  left: 0px;
}

--fcc-editable-region--

--fcc-editable-region--
```
