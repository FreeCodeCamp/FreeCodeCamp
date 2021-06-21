/* global cy */

describe('Help Button', () => {
  it('should be visible', () => {
    cy.visit(
      '/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements'
    );
    cy.get('#get-help-dropdown').scrollIntoView().should('be.visible');
  });

  it('should toggle the dropdown menu', () => {
    cy.get('#get-help-dropdown').scrollIntoView().click();
    cy.get('ul[role="menu"]').should('be.visible');
  });

  it('should render three links when video is available', () => {
    cy.get('ul[role="menu"]').within(() => {
      cy.get('a').should('have.length', 3);
      cy.get('a').eq(0).contains('Get a Hint');
      cy.get('a').eq(1).contains('Watch a Video');
      cy.get('a').eq(2).contains('Ask for Help');
    });
  });

  it('should render two links when video is not available', () => {
    cy.visit(
      '/learn/front-end-libraries/bootstrap/apply-the-default-bootstrap-button-style'
    );
    cy.get('#get-help-dropdown').scrollIntoView().click();
    cy.get('ul[role="menu"]').within(() => {
      cy.get('a').should('have.length', 2);
      cy.get('a').eq(0).contains('Get a Hint');
      cy.get('a').eq(1).contains('Ask for Help');
    });
  });
});
