/* global cy */

const selectors = {
  donateAlert: {
    firstText: '.alert-info p:first-child',
    secondText: '.alert-info p:last-child',
    link: '.alert-info a'
  }
};

describe('Donate page', () => {
  before(() => {
    cy.clearCookies();
    cy.exec('npm run seed -- --donor');
    cy.login();
    cy.visit('/donate');
  });

  after(() => {
    cy.exec('npm run seed');
  });

  it('Donor alert should be visible for donor', () => {
    cy.get('.alert-info').should('be.visible');
  });

  it('Donor should see alert message', () => {
    cy.contains(
      selectors.donateAlert.firstText,
      'Thank you for being a supporter of freeCodeCamp. You currently have a recurring donation.'
    );
    cy.contains(
      selectors.donateAlert.lastText,
      "Want to make a bigger one-time donation, mail us a check, or give in other ways? Here are many other ways you can support our non-profit's mission."
    );
  });

  it('Donor alert section should have donation link', () => {
    cy.get(selectors.donateAlert.link).should(
      'have.attr',
      'href',
      'https://www.freecodecamp.org/news/how-to-donate-to-free-code-camp'
    );
  });
});
