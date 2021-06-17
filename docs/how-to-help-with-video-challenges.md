# How to help with video challenges

Video challenges are a new type of challenge in the freeCodeCamp curriculum.

A video challenge is a small section of a full-length video course on a particular topic. A video challenge page embeds a YouTube video. Each challenge page has a single multiple-choice question related to the video. A user must answer the question correctly before moving on to the next video challenge in the course.

The video challenge pages are created by members of the freeCodeCamp team. YouTube videos are also uploaded by members of the freeCodeCamp team. Many of the video challenges do not yet have questions associated with them.

You can help by creating multiple-choice questions related to video sections and adding the questions to the markdown files for the video challenges.

## Challenge Template

Below is a template of what the challenge markdown files look like.

````md
---
id: Unique identifier (alphanumerical, MongoDB_id)
title: Challenge Title
challengeType: 11
videoId: 'YouTube videoId for video challenge'
forumTopicId: 12345
---

# --description--

Challenge description text, in markdown

```html
<div>example code</div>
```

# --question--

These fields are currently used for the multiple-choice Python challenges.

## --text--

The question text goes here.

## --answers--

Answer 1

---

Answer 2

---

More answers

## --video-solution--

The number for the correct answer goes here.
````

## Creating questions for video challenges

### Access the video challenge markdown files

You can find the markdown files for video challenges at the following locations in the curriculum:

- [Data Analysis with Python Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/08-data-analysis-with-python/data-analysis-with-python-course)
- [TensorFlow 2.0 Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/11-machine-learning-with-python/tensorflow)
- [Numpy Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/08-data-analysis-with-python/numpy)
- [How Neural Networks Work Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/11-machine-learning-with-python/how-neural-networks-work)

Pick a challenge markdown file from the options above.

### Skim through the video associated with the challenge and create a multiple-choice question

First, find the videoId.

For example, in the following code from the header of a video challenge markdown file, the videoId is "nVAaxZ34khk". On GitHub, the information should be laid out in a table format.

```
---
id: 5e9a093a74c4063ca6f7c14d
title: Data Analysis Example A
challengeType: 11
videoId: nVAaxZ34khk
---
```

Next, access the YouTube video with that `videoId`. The URL for the video will be:
https://www.youtube.com/watch?v=[videoId] (replace `videoId` in the URL with the video's ID - without square brackets)

In the example above, the URL is https://www.youtube.com/watch?v=nVAaxZ34khk

Skim the YouTube video with that videoId and think of a multiple-choice question based on the content of the video.

### Add the question to the markdown file

You can add the question locally or using the GitHub interface. To add the question locally, you need to [set up freeCodeCamp locally](how-to-setup-freecodecamp-locally.md). You can also find the file on GitHub and click the edit button to add the question right in your browser.

If a question has not yet been added to a particular video challenge, it will have the following default question:

```md
# --question--

## --text--

Question text

## --answers--

Answer 1

---

Answer 2

---

More answers

## --video-solution--

1
```

Add/Update the question text under the part that shows:

```
# --question--

## --text--
```

Add/Update answers (`Answer 1`, `Answer 2`, and so on) under `## --answers--`. Make sure to update the number under `## --video-solution--` with the correct answer number. You can add more possible answers using the same format. The question and answers can be surrounded with quotation marks.

### Question examples

````md
# --question--

## --text--

What does this JavaScript code log to the console?

```js
console.log('hello world');
```

## --answers--

hello _world_

---

**hello** world

---

hello world

---

## --video-solution--

3
````

````md
# --question--

## --text--

What will print out after running this code:

```py
width = 15
height = 12.0
print(height/3)
```

## --answers--

39

---

4

---

4.0

---

5.0

---

5

## --video-solution--

3
````

For more examples, you can look at the markdown files for the following video course. All the challenges already have questions: [Python for Everybody Course](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/07-scientific-computing-with-python/python-for-everybody)

## Open a pull request

After creating one or more questions, you can commit the changes to a new branch and [open a pull request](how-to-open-a-pull-request.md).
