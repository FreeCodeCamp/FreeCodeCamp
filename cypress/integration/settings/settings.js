/* global cy */

describe('Settings', () => {
  beforeEach(() => {
    cy.visit('/learn');
    // check we've arrived
    cy.contains('Please slow down and read this.');
    cy.login();
    cy.contains('Menu').click();
    cy.contains('Sign out').click();
    // check we've arrived
    cy.contains("Get started (it's free)");
  });
  it('should be possible to reset your progress', () => {
    cy.visit('/settings');
    cy.contains('Reset all of my progress').click();
    cy.contains('Reset everything. I want to start from the beginning').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/');
    });
    cy.contains('Your progress has been reset');
  });
  it('should automatically log you in when you navigate to /settings', () => {
    cy.visit('/settings');
    cy.url().should('match', /settings/);
    cy.contains('Account Settings');
  });
});
