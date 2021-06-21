/* global cy */

const locations = {
  chalSuper: '/challenges/responsive-web-design/',
  chalBlock: '/challenges/responsive-web-design/basic-html-and-html5',
  chalChallenge:
    // eslint-disable-next-line max-len
    '/challenges/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements',
  learnSuper: '/learn/responsive-web-design',
  learnBlock: '/learn/responsive-web-design/basic-html-and-html5',
  learnChallenge:
    // eslint-disable-next-line max-len
    '/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements'
};

describe('challenges/superblock redirect', function () {
  it('redirects to learn/superblock', () => {
    cy.visit(locations.chalSuper);

    cy.title().should(
      'eq',
      'Responsive Web Design Certification | freeCodeCamp.org'
    );
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(locations.learnSuper);
    });
  });
});

describe('challenges/superblock/block redirect', function () {
  it('redirects to learn/superblock/block', () => {
    cy.visit(locations.chalBlock);

    cy.title().should('eq', 'Basic HTML and HTML5 | freeCodeCamp.org');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(locations.learnBlock);
    });
  });
});

describe('challenges/superblock/block/challenge redirect', function () {
  it('redirects to learn/superblock/block/challenge', () => {
    cy.visit(locations.chalChallenge);

    cy.title().should(
      'eq',
      // eslint-disable-next-line max-len
      'Learn Basic HTML and HTML5: Say Hello to HTML Elements | freeCodeCamp.org'
    );
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(locations.learnChallenge);
    });
  });
});
