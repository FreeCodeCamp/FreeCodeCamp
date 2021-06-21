/* global cy */

describe('Certification intro page', () => {
  before(() => {
    cy.clearCookies();
    cy.login();
    cy.visit('/learn/coding-interview-prep');
  });

  it('Should render', () => {
    cy.contains(
      "If you're looking for free coding exercises to prepare for your next job interview, we've got you covered."
    ).should('be.visible');
  });

  it('Title should not include the word "Certification"', () => {
    cy.title().should('eq', 'Coding Interview Prep | freeCodeCamp.org');
  });
});
