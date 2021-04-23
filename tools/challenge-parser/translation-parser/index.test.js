/* global expect jest */
const {
  ENGLISH_CHALLENGE_NO_FILES
} = require('./__fixtures__/challenge-objects');
const { SIMPLE_TRANSLATION } = require('./__mocks__/mock-comments');
const {
  translateComments,
  translateCommentsInChallenge,
  translateGeneric
} = require('.');

let logSpy;

describe('translation parser', () => {
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'warn').mockImplementation();
  });
  afterEach(() => {
    logSpy.mockRestore();
  });

  describe('translateGeneric', () => {
    it('returns an object containing translated text', () => {
      expect.assertions(1);
      const seed = `//  Add your code below this line
      Add your code above this line `;
      const transSeed = `//  (Chinese) Add your code below this line (Chinese)
      Add your code above this line `;
      const knownComments = Object.keys(SIMPLE_TRANSLATION);
      const config = {
        knownComments,
        dict: SIMPLE_TRANSLATION,
        lang: 'chinese'
      };
      const actual = translateGeneric(
        { text: seed, commentCounts: new Map() },
        config,
        '((?<!https?:)//\\s*)',
        '(\\s*$)'
      );
      expect(actual.text).toBe(transSeed);
    });
    it('returns an object containing a count of the replaced comments', () => {
      expect.assertions(1);
      const seed = `//  Add your code below this line
      // Add your code above this line
      // Add your code below this line
      `;
      const expectedCommentCounts = new Map();
      expectedCommentCounts
        .set('(Chinese) Add your code below this line (Chinese)', 2)
        .set('(Chinese) Add your code above this line (Chinese)', 1);
      const knownComments = Object.keys(SIMPLE_TRANSLATION);
      const config = {
        knownComments,
        dict: SIMPLE_TRANSLATION,
        lang: 'chinese'
      };
      const actual = translateGeneric(
        { text: seed, commentCounts: new Map() },
        config,
        '((?<!https?:)//\\s*)',
        '(\\s*$)'
      );
      expect(actual.commentCounts).toEqual(expectedCommentCounts);
    });
  });

  describe('translateCommentsInChallenge', () => {
    it('returns a clone of the challenge if there are no comments', () => {
      expect(
        translateCommentsInChallenge(
          ENGLISH_CHALLENGE_NO_FILES,
          'chinese',
          SIMPLE_TRANSLATION
        )
      ).toEqual(ENGLISH_CHALLENGE_NO_FILES);
    });
  });
  describe('translateComments', () => {
    it('replaces single line English comments with their translations', () => {
      const seed = `//  Add your code below this line
         Add your code above this line `;
      const transSeed = `//  (Chinese) Add your code below this line (Chinese)
         Add your code above this line `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(transSeed);
    });

    it('does not translate urls', () => {
      const seed = `http:// Add your code below this line
      Add your code above this line `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(seed);
      const seedS = `https:// Add your code below this line
      Add your code above this line `;
      expect(
        translateComments(seedS, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(seedS);
    });

    it('replaces inline English comments with their translations', () => {
      const seed = `inline comment //  Add your code below this line
         Add your code above this line `;
      const transSeed = `inline comment //  (Chinese) Add your code below this line (Chinese)
         Add your code above this line `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(transSeed);
    });

    it('replaces multiple English comments with their translations', () => {
      const seed = `inline comment //  Add your code below this line
         // Add your code below this line `;
      const transSeed = `inline comment //  (Chinese) Add your code below this line (Chinese)
         // (Chinese) Add your code below this line (Chinese) `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(transSeed);
    });

    it('replaces multiline English comments with their translations', () => {
      const seed = `multiline comment /*  Add your code below this line */
         /* Add your code above this line */ change code below this line  `;
      const transSeed = `multiline comment /*  (Chinese) Add your code below this line (Chinese) */
         /* (Chinese) Add your code above this line (Chinese) */ change code below this line  `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(transSeed);
    });

    it('replaces repeated multiline comments with their translations', () => {
      const seed = `multiline comment /*  Add your code below this line */
         /* Add your code below this line */ change code below this line  `;
      const transSeed = `multiline comment /*  (Chinese) Add your code below this line (Chinese) */
         /* (Chinese) Add your code below this line (Chinese) */ change code below this line  `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(transSeed);
    });

    it('ignores empty comments', () => {
      expect.assertions(1);
      const seed = '//';
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(seed);
    });

    it('only replaces text inside comments, not between them', () => {
      const seed = `multiline comment /*  Add your code below this line */
         /* Add your code above this line */ Add your code below this line /* */  `;
      const transSeed = `multiline comment /*  (Chinese) Add your code below this line (Chinese) */
         /* (Chinese) Add your code above this line (Chinese) */ Add your code below this line /* */  `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(transSeed);

      const seedTwo = `multiline /* */  Add your code below this line /* */  `;
      expect(
        translateComments(seedTwo, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(seedTwo);
    });

    it('replaces English html comments with their translations', () => {
      const seed = `<div> <!--  Add your code below this line -->
         <!-- Add your code above this line --> <span>change code below this line</span>  `;
      const transSeed = `<div> <!--  (Chinese) Add your code below this line (Chinese) -->
         <!-- (Chinese) Add your code above this line (Chinese) --> <span>change code below this line</span>  `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'html').text
      ).toBe(transSeed);
    });

    it('replaces css comments with their translations', () => {
      const seed = `<style>
        /* Add your code below this line */
      </style>`;
      const transSeed = `<style>
        /* (Chinese) Add your code below this line (Chinese) */
      </style>`;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'html').text
      ).toBe(transSeed);
    });

    it('replaces multiple css comments with their translations', () => {
      const seed = `<style>
        /* Add your code below this line */
        /* Add your code below this line */
      </style>`;
      const transSeed = `<style>
        /* (Chinese) Add your code below this line (Chinese) */
        /* (Chinese) Add your code below this line (Chinese) */
      </style>`;
      const commentCounts = new Map();
      commentCounts.set('(Chinese) Add your code below this line (Chinese)', 2);
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'html')
      ).toEqual({ text: transSeed, commentCounts });
    });

    it('ignores css comments outside style tags', () => {
      const seed = `/* Add your code below this line */`;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'html').text
      ).toBe(seed);
    });

    it('ignores css comments between style tags', () => {
      const seed = `<style>
      </style>
      /* Add your code below this line */
      <style>
      </style>`;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'html').text
      ).toBe(seed);
    });

    it('only replaces inside English html comments', () => {
      const seed = `<div> <!-- -->  Add your code below this line <!-- -->`;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'html').text
      ).toBe(seed);
    });

    it('replaces English JSX comments with their translations', () => {
      const seed = `{ /*  Add your code below this line */ }
      { /* Add your code above this line */ } <span>change code below this line</span>  `;
      const transSeed = `{ /*  (Chinese) Add your code below this line (Chinese) */ }
      { /* (Chinese) Add your code above this line (Chinese) */ } <span>change code below this line</span>  `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'jsx').text
      ).toBe(transSeed);
    });

    it('replaces English script comments with their translations', () => {
      const seed = `<script>
        // Add your code below this line
      </script>`;
      const transSeed = `<script>
        // (Chinese) Add your code below this line (Chinese)
      </script>`;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'html').text
      ).toBe(transSeed);
    });

    it('replaces multiple script comments with their translations', () => {
      const seed = `<script>
        /* Add your code below this line */
        // Add your code below this line
      </script>`;
      const transSeed = `<script>
        /* (Chinese) Add your code below this line (Chinese) */
        // (Chinese) Add your code below this line (Chinese)
      </script>`;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'html').text
      ).toBe(transSeed);
    });

    it('ignores html comments inside JavaScript', () => {
      const seed = `<div> <!--  Add your code below this line
         Add your code above this line --> <span>change code below this line</span>  `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'js').text
      ).toBe(seed);
    });

    it('ignores html comments inside jsx', () => {
      const seed = `<div> <!--  Add your code below this line
         Add your code above this line --> <span>change code below this line</span>  `;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'jsx').text
      ).toBe(seed);
    });

    it('throws if there is not an exact match (js)', () => {
      expect.assertions(2);
      const seedMulti = `/*  Add your code below this line
      Add your code above this line */ <span>change code below this line</span>  `;
      const seedInline = `// Add your code below this line, please`;
      expect(() =>
        translateComments(seedMulti, 'chinese', SIMPLE_TRANSLATION, 'js')
      ).toThrow();
      expect(() =>
        translateComments(seedInline, 'chinese', SIMPLE_TRANSLATION, 'js')
      ).toThrow();
    });

    it('only replaces exact matches (jsx)', () => {
      expect.assertions(1);
      const seedMulti = `{ /*  Add your code below this line
      Add your code above this line */ } <span>change code below this line</span>  `;
      expect(() =>
        translateComments(seedMulti, 'chinese', SIMPLE_TRANSLATION, 'jsx')
      ).toThrow();
    });

    it('only replaces exact matches (html)', () => {
      expect.assertions(1);
      const seed = `<div> <!--  Add your code below this line
       Add your code above this line --> <span>change code below this line</span>  `;

      expect(() =>
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'html')
      ).toThrow();
    });

    it('only translates jsx comments once', () => {
      const seed = `{ /*  Add your code below this line */ }`;
      const transSeed = `{ /*  (Chinese) Add your code below this line (Chinese) */ }`;
      expect(
        translateComments(seed, 'chinese', SIMPLE_TRANSLATION, 'jsx').text
      ).toBe(transSeed);
    });

    it('throws if the comment is not in the dictionary', () => {
      expect.assertions(6);
      const seedJSX = `{ /* this is not a comment */ }`;
      const seedInline = `// this is not a comment `;
      const seedMulti = `/* this is not a comment */`;
      const seedCSS = `<style>
      /* this is not a comment */
    </style>`;
      const seedHTML = `<div> <!--  this is not a comment --> `;
      const seedScript = `<script> // this is not a comment </script>`;

      expect(() =>
        translateComments(seedJSX, 'chinese', SIMPLE_TRANSLATION, 'jsx')
      ).toThrow();
      expect(() =>
        translateComments(seedInline, 'chinese', SIMPLE_TRANSLATION, 'js')
      ).toThrow();
      expect(() =>
        translateComments(seedMulti, 'chinese', SIMPLE_TRANSLATION, 'js')
      ).toThrow();
      expect(() =>
        translateComments(seedCSS, 'chinese', SIMPLE_TRANSLATION, 'html')
      ).toThrow();
      expect(() =>
        translateComments(seedHTML, 'chinese', SIMPLE_TRANSLATION, 'html')
      ).toThrow();
      expect(() =>
        translateComments(seedScript, 'chinese', SIMPLE_TRANSLATION, 'html')
      ).toThrow();
    });
  });
});
