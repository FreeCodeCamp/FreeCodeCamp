/* global cy */

const selectors = {
  donateSupport: {
    firstTitle: '.donate-support h4:first-of-type b',
    secondTitle: '.donate-support h4:last-of-type b',
    firstText: '.donate-support p:first-of-type',
    secondText: '.donate-support p:last-of-type',
    link: '.donate-support a'
  }
};

describe('Donate page', () => {
  before(() => {
    cy.clearCookies();
    cy.exec('npm run seed');
    cy.login();
    cy.visit('/donate');
  });

  it('Should render', () => {
    cy.title().should('eq', 'Support our nonprofit | freeCodeCamp.org');
  });

  it('Should display default amount and duration', () => {
    cy.contains('Confirm your donation of $5 / month:').should('be.visible');
  });

  it('Should have support section', () => {
    cy.contains(
      'Want to make a bigger one-time donation, mail us a check, or give in other ways?'
    ).should('be.visible');
  });

  it('Support section should have support text', () => {
    cy.contains(
      selectors.donateSupport.firstTitle,
      'Want to make a bigger one-time donation, mail us a check, or give in other ways?'
    );
    cy.contains(
      selectors.donateSupport.secondTitle,
      'Need help with your current or past donations?'
    );
    cy.contains(
      selectors.donateSupport.firstText,
      "Here are many other ways you can support our non-profit's mission."
    );
    cy.contains(
      selectors.donateSupport.secondText,
      'Forward a copy of your donation receipt to donors@freecodecamp.org and tell us how we can help.'
    );
  });

  it('Support section should have donation link', () => {
    cy.get(selectors.donateSupport.link).should(
      'have.attr',
      'href',
      'https://www.freecodecamp.org/news/how-to-donate-to-free-code-camp'
    );
  });

  it('Donor alert should not be visible for non-donor', () => {
    cy.get('.alert-info').should('not.exist');
  });
});
