/* global cy */

import '@testing-library/cypress/add-commands';

describe('Settings certifications area', () => {
  before(() => {
    cy.exec('npm run seed');
    cy.login();
    cy.visit('/settings');
  });

  describe('initially', () => {
    it('Should render 15 "Claim Certification" buttons', () => {
      cy.findAllByText('Claim Certification').should($btns => {
        expect($btns).to.have.length(15);
      });
    });

    it('Should render zero "Show Certification" buttons', () => {
      cy.contains('Show Certification').should('not.exist');
    });

    it('Should render one "Agree" button', () => {
      cy.contains('Agree').should('exist');
    });

    describe('before isHonest', () => {
      it('Should show "must agree" message when trying to claim a cert', () => {
        cy.contains('Claim Certification').click();
        cy.contains(
          'To claim a certification, you must first accept our academic honesty policy'
        ).should('exist');
      });
    });

    describe('after isHonest', () => {
      beforeEach(() => {
        cy.visit('/');
        cy.login();
        cy.visit('/settings');
      });

      it('Should render "You have accepted our Academic Honesty Policy." button after clicking "Agree"', () => {
        cy.contains('Agree').click({ force: true });
        cy.contains('You have accepted our Academic Honesty Policy.').should(
          'exist'
        );
      });

      it('Should show "incompleted projects" message when clicking "Claim Certification"', () => {
        cy.contains('Claim Certification').click({ force: true });

        cy.contains(
          'It looks like you have not completed the necessary steps. Please complete the required projects to claim the Responsive Web Design Certification'
        ).should('exist');
      });
    });
  });
});
