/* global cy */

describe('Donate page', () => {
  before(() => {
    cy.clearCookies();
    cy.exec('npm run seed');
    cy.login();
  });

  after(() => {
    cy.exec('npm run seed');
  });

  const projects = [
    'tribute-page',
    'survey-form',
    'product-landing-page',
    'technical-documentation-page',
    'personal-portfolio-webpage'
  ];

  it('Should be able to submit projects', () => {
    const submitProject = str => {
      cy.visit(
        `/learn/responsive-web-design/responsive-web-design-projects/build-a-${str}`
      );
      cy.get('#dynamic-front-end-form')
        .get('#solution')
        .type('https://codepen.io/camperbot/full/oNvPqqo', {
          force: true
        });

      cy.contains("I've completed this challenge").click();
      cy.contains('Submit and go to next challenge').click();
    };

    projects.forEach(project => submitProject(project));
  });

  it('Should have a pop up modal', () => {
    cy.contains(
      'Nicely done. You just completed Responsive Web Design Projects.'
    );
  });
});
