/* global cy */

const selectors = {
  footer: '.site-footer'
};

describe('Footer', () => {
  it('Should render on landing page', () => {
    cy.visit('/');
    cy.get(selectors.footer).should('be.visible');
  });

  it('Should render on learn page', () => {
    cy.visit('/learn');
    cy.get(selectors.footer).should('be.visible');
    cy.visit('/learn/');
    cy.get(selectors.footer).should('be.visible');
  });

  it('Should render on superblock page', () => {
    cy.visit('/learn/responsive-web-design/');
    cy.get(selectors.footer).should('be.visible');
  });

  it('Should not render on challenge page', () => {
    cy.visit(
      '/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements'
    );
    cy.get(selectors.footer).should('not.exist');
  });
});
