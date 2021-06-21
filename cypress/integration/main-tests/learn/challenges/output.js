/* global cy */

const selectors = {
  defaultOutput: '.output-text',
  editor: '.monaco-editor',
  hotkeys: '.default-layout > div',
  runTestsButton: 'button:contains("Run the Tests")'
};

const locations = {
  index:
    '/learn/responsive-web-design/basic-html-and-html5/' +
    'say-hello-to-html-elements'
};

const defaultOutput = `
/**
* Your test output will go here
*/`;

const runningOutput = '// running tests';
const finishedOutput = '// tests completed';

describe('Classic challenge', function () {
  before(() => {
    cy.visit(locations.index);
  });

  it('renders the default output text', () => {
    cy.title().should(
      'eq',
      'Learn Basic HTML and HTML5: Say Hello to HTML Elements |' +
        ' freeCodeCamp.org'
    );
    cy.get(selectors.defaultOutput).contains(defaultOutput);
  });

  it('shows test output when the tests are run', () => {
    // first wait for the editor to load
    cy.get(selectors.editor, { timeout: 15000 });
    cy.get(selectors.runTestsButton)
      .click()
      .then(() => {
        cy.get(selectors.defaultOutput)
          .contains(runningOutput)
          .contains(finishedOutput);
      });
  });

  it('shows test output when the tests are triggered by the keyboard', () => {
    // first wait for the editor to load
    cy.get(selectors.editor, {
      timeout: 15000
    });
    cy.get(selectors.hotkeys)
      .focus()
      .type('{ctrl}{enter}')
      .then(() => {
        cy.get(selectors.defaultOutput)
          .contains(runningOutput)
          .contains(finishedOutput);
      });
  });
});
