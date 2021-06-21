/* global cy */

describe('Settings', () => {
  it('should be possible to reset your progress', () => {
    cy.visit('/');
    cy.contains("Get started (it's free)").click();
    cy.visit('/settings');
    cy.contains('Reset all of my progress').click();
    cy.contains('Reset everything. I want to start from the beginning').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/');
    });
    cy.contains('Your progress has been reset');
  });
});
