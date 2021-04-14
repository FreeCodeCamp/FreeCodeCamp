/* global describe it expect */

import cssTestValues from './__fixtures/curriculum-helpers-css';
import htmlTestValues from './__fixtures/curriculum-helpers-html';
import jsTestValues from './__fixtures/curriculum-helpers-javascript';
/* eslint-disable max-len */
import whiteSpaceTestValues from './__fixtures/curriculum-helpers-remove-white-space';
import __testHelpers from './curriculum-helpers';
/* eslint-enable max-len */

const {
  stringWithWhiteSpaceChars,
  stringWithWhiteSpaceCharsRemoved
} = whiteSpaceTestValues;

const { cssFullExample, cssCodeWithCommentsRemoved } = cssTestValues;

const { htmlFullExample, htmlCodeWithCommentsRemoved } = htmlTestValues;

const {
  jsCodeWithSingleAndMultLineComments,
  jsCodeWithSingleAndMultLineCommentsRemoved,
  jsCodeWithUrl,
  jsCodeWithUrlUnchanged
} = jsTestValues;

describe('removeWhiteSpace', () => {
  const { removeWhiteSpace } = __testHelpers;
  it('returns a string', () => {
    expect(typeof removeWhiteSpace('This should return a string')).toBe(
      'string'
    );
  });

  it('returns a string with no white space characters', () => {
    expect(removeWhiteSpace(stringWithWhiteSpaceChars)).toBe(
      stringWithWhiteSpaceCharsRemoved
    );
  });
});

describe('removeJSComments', () => {
  const { removeJSComments } = __testHelpers;
  it('returns a string', () => {
    expect(typeof removeJSComments('const should = "return a string"')).toBe(
      'string'
    );
  });

  it('returns a string with no single or multi-line comments', () => {
    expect(removeJSComments(jsCodeWithSingleAndMultLineComments)).toBe(
      jsCodeWithSingleAndMultLineCommentsRemoved
    );
  });

  it('does not remove a url found in JS code', () => {
    expect(removeJSComments(jsCodeWithUrl)).toBe(jsCodeWithUrlUnchanged);
  });
});

describe('removeCssComments', () => {
  const { removeCssComments } = __testHelpers;
  it('returns a string', () => {
    expect(typeof removeCssComments('.aClass: { color: red; }')).toBe('string');
  });

  it('returns a CSS string with no single or multi-line comments', () => {
    expect(removeCssComments(cssFullExample)).toBe(cssCodeWithCommentsRemoved);
  });
});

describe('removeHtmlComments', () => {
  const { removeHtmlComments } = __testHelpers;
  it('returns a string', () => {
    expect(
      typeof removeHtmlComments(
        '<h1>hello world</h1><!-- a comment--><h2>h2 element</h2>'
      )
    ).toBe('string');
  });

  it('returns an HTML string with no single or multi-line comments', () => {
    expect(removeHtmlComments(htmlFullExample)).toBe(
      htmlCodeWithCommentsRemoved
    );
  });
});
