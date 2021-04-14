/* global describe it expect */
// eslint-disable-next-line max-len
const incorrectMarkersAST = require('../__fixtures__/ast-incorrect-markers.json');
const realisticAST = require('../__fixtures__/ast-realistic.json');
const mockAST = require('../__fixtures__/ast-simple.json');
const addText = require('./add-text');

describe('add-text', () => {
  const descriptionId = 'description';
  const instructionsId = 'instructions';
  // const unexpectedField = 'does-not-exist';
  let file = { data: {} };

  beforeEach(() => {
    file = { data: {} };
  });

  it('should return a function', () => {
    const plugin = addText(['section']);

    expect(typeof plugin).toEqual('function');
  });

  it('throws when no argument or the incorrect argument is supplied', () => {
    expect.assertions(5);
    const expectedError = 'addText must have an array of section ids supplied';
    expect(() => {
      addText();
    }).toThrow(expectedError);
    expect(() => {
      addText('');
    }).toThrow(expectedError);
    expect(() => {
      addText({});
    }).toThrow(expectedError);
    expect(() => {
      addText(1);
    }).toThrow(expectedError);
    expect(() => {
      addText([]);
    }).toThrow(expectedError);
  });

  it('should add a string relating to the section id to `file.data`', () => {
    const plugin = addText([descriptionId]);
    plugin(mockAST, file);
    const expectedText = 'Paragraph 1';
    expect(file.data[descriptionId]).toEqual(
      expect.stringContaining(expectedText)
    );
  });

  it('should not add a string relating a different id to `file.data`', () => {
    const plugin = addText([descriptionId]);
    plugin(mockAST, file);
    // the following text is in the AST, but is associated with a different
    // marker (instructions)
    const expectedText = 'Paragraph 0';
    expect(file.data[descriptionId]).not.toEqual(
      expect.stringContaining(expectedText)
    );
  });

  // TODO: do we need to add the ids to the section tags? Why not just have
  // <section>?
  it('should embed the text in sections with appropriate ids', () => {
    const plugin = addText([descriptionId, instructionsId]);
    plugin(mockAST, file);
    // the following text is in the AST, but is associated with a different
    // marker (instructions)
    const descriptionSectionText = `<section id="description">
<p>Paragraph 1</p>
<pre><code class="language-html">code example
</code></pre>
</section>`;
    expect(file.data[descriptionId]).toEqual(descriptionSectionText);
    const instructionsSectionText = `<section id="instructions">
<p>Paragraph 0</p>
<pre><code class="language-html">code example 0
</code></pre>
</section>`;
    expect(file.data[instructionsId]).toBe(instructionsSectionText);
  });

  // eslint-disable-next-line max-len
  it('should add nothing if a section id does not appear in the md', () => {
    const plugin = addText([descriptionId]);
    plugin(incorrectMarkersAST, file);
    expect(file.data[descriptionId]).toBeUndefined();
  });

  it('should not escape html', () => {
    const plugin = addText([descriptionId]);
    plugin(realisticAST, file);
    const expected = `last <code>h2</code> element`;
    expect(file.data[descriptionId]).toEqual(expect.stringContaining(expected));
  });

  it('should preserve nested html', () => {
    const plugin = addText([descriptionId]);
    plugin(realisticAST, file);
    const expected = `<blockquote>
  <p>Some text in a blockquote</p>
  <p>
    Some text in a blockquote, with <code>code</code>
  </p>
</blockquote>`;
    expect(file.data[descriptionId]).toEqual(expect.stringContaining(expected));
  });

  // eslint-disable-next-line max-len
  it('should not add paragraphs when html elements are separated by whitespace', () => {
    const plugin = addText([instructionsId]);
    plugin(realisticAST, file);
    const expectedText1 = `<code>code</code> <tag>with more after a space</tag>`;
    const expectedText2 = `another pair of <strong>elements</strong> <em>with a space</em>`;
    expect(file.data[instructionsId]).toEqual(
      expect.stringContaining(expectedText1)
    );
    expect(file.data[instructionsId]).toEqual(
      expect.stringContaining(expectedText2)
    );
  });

  it('should have an output to match the snapshot', () => {
    const plugin = addText([descriptionId, instructionsId]);
    plugin(mockAST, file);
    expect(file.data).toMatchSnapshot();
  });
});
