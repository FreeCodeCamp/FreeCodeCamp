/* global expect*/
const leadingInlineHTMLNode = require('./__fixtures__/leading-html-node.json');
const mdastMixedNodes = require('./__fixtures__/mdast-mixed-nodes.json');
const mdastWithEmNode = require('./__fixtures__/mdast-with-em.json');
const singleNode = require('./__fixtures__/non-id-node.json');
const mdastToHTML = require('./mdast-to-html');

describe('mdast-to-html', () => {
  it('should return a string', () => {
    expect.assertions(1);
    const actual = mdastToHTML(mdastMixedNodes);
    expect(typeof actual).toBe('string');
  });

  it('throws if it is not passed an array', () => {
    expect.assertions(1);
    expect(() => mdastToHTML(singleNode)).toThrow(
      'mdastToHTML expects an array argument'
    );
  });

  it('should convert markdown nodes into html', () => {
    const actual = mdastToHTML([mdastWithEmNode]);
    expect(actual).toBe(
      '<p>Just some <em>emphasis</em> and a bit of <strong>bold</strong></p>'
    );
  });

  it('should not escape html', () => {
    const actual = mdastToHTML(mdastMixedNodes);
    expect(actual).toBe(`<p>Paragraph 1</p>
<p>Third <em>hint</em> with <code>code</code> and <code>inline code</code></p>`);
  });

  it('should put inline html inside the enclosing paragraph', () => {
    const actual = mdastToHTML([leadingInlineHTMLNode]);
    expect(actual).toBe(
      '<p><code> code in </code> code tags <em>emphasis</em> followed' +
        ' by <div><span>some nested html </span></div></p>'
    );
  });
});
