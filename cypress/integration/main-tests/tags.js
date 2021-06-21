/* global cy */
describe('The Document Metadata', () => {
  before(() => {
    cy.visit('/');
    cy.document();
  });

  const social = {
    description: 'Learn to Code — For Free'
  };

  const challengs = {
    responsiveWebDesign:
      '/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements',
    rosetaCode: '/learn/coding-interview-prep/rosetta-code/100-doors',
    projectEuler:
      '/learn/coding-interview-prep/project-euler/problem-1-multiples-of-3-and-5'
  };

  const scripts = {
    mathjax: {
      selector: 'body script[id="mathjax"]',
      src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML'
    }
  };
  it('landing page has correct <meta> for description', () => {
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'Learn to Code — For Free'
    );
  });
  it('landing page has correct <meta> for og title', () => {
    cy.get('head meta[name="og:title"]').should(
      'have.attr',
      'content',
      'freeCodeCamp.org'
    );
  });
  it('landing page has correct <meta> for og description', () => {
    cy.get('head meta[name="og:description"]').should(
      'have.attr',
      'content',
      social.description
    );
  });
  it('landing page has correct <meta> for twitter title', () => {
    cy.get('head meta[name="twitter:title"]').should(
      'have.attr',
      'content',
      'freeCodeCamp.org'
    );
  });
  it('landing page has correct <meta>for twitter description', () => {
    cy.get('head meta[name="twitter:description"]').should(
      'have.attr',
      'content',
      social.description
    );
  });
  it('landing page should not have mathjax body script', () => {
    cy.reload();
    cy.get(scripts.mathjax.selector).should('not.exist');
  });
  it('responsive webdesign challenges should not have mathjax body script', () => {
    cy.visit(challengs.responsiveWebDesign);
    cy.reload();
    cy.get(scripts.mathjax.selector).should('not.exist');
  });
  it('project euler challenges should have mathjax body script', () => {
    cy.visit(challengs.projectEuler);
    cy.reload();
    cy.get(scripts.mathjax.selector).should(
      'have.attr',
      'src',
      scripts.mathjax.src
    );
  });
  it('rosetta code challenges should have mathjax body script', () => {
    cy.visit(challengs.projectEuler);
    cy.reload();
    cy.get(scripts.mathjax.selector).should(
      'have.attr',
      'src',
      scripts.mathjax.src
    );
  });
});
