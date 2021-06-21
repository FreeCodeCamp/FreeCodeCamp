/* global cy */

const selectors = {
  firstBlock: '.block-ui > .block:nth-child(1) > .map-title'
};

describe('Certification intro page', () => {
  before(() => {
    cy.clearCookies();
    cy.login();
    cy.visit('/learn/responsive-web-design');
  });

  it('Should render', () => {
    cy.title().should(
      'eq',
      'Responsive Web Design Certification | freeCodeCamp.org'
    );
  });

  it('Should have certification intro text', () => {
    cy.contains(
      "In this Responsive Web Design Certification, you'll learn the languages that developers use to build webpages"
    ).should('be.visible');
  });

  it('First block should be expanded', () => {
    cy.contains('Say Hello to HTML Elements').should('be.visible');
  });

  it('Second block should be closed', () => {
    cy.contains('Change the Color of Text').should('not.exist');
  });

  it('Block should handle toggle clicks correctly', () => {
    cy.get(selectors.firstBlock).click();
    cy.contains('Say Hello to HTML Elements').should('not.exist');
    cy.get(selectors.firstBlock).click();
    cy.contains('Say Hello to HTML Elements').should('be.visible');
  });
});
