/* global cy */

describe('Report User', () => {
  beforeEach(() => {
    cy.exec('npm run seed');
    cy.login();
  });
  it('should be possible to report a user from their profile page', () => {
    // Since going to a user page intially generates a 404, we have to ignore
    // status codes on that request
    cy.visit('/twaha', { failOnStatusCode: false });
    // The following line is only required if you want to test it in development
    // cy.contains('Preview custom 404 page').click();
    cy.contains("Flag This User's Account for Abuse").click();
    cy.contains("Do you want to report twaha's portfolio for abuse?");
    cy.get('[id=report-user-textarea]').type('Some details');
    cy.contains('Submit the report').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/learn');
    });
    cy.contains('A report was sent to the team with foo@bar.com in copy');
  });
});

// A report was sent to the team with foo@bar.com in copy
