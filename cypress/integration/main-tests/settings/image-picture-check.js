/* global cy */

describe('Picture input field', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/settings');
    // Setting aliases here
    cy.get('input#about-picture').as('pictureInput');
  });

  it('Should be possible to type', () => {
    cy.get('@pictureInput')
      .clear({ force: true })
      .type('twaha', { force: true })
      .should('have.attr', 'value', 'twaha');
  });
  it('Show an error message if an incorrect url was submitted', () => {
    cy.get('@pictureInput')
      .clear({ force: true })
      .type('https://s3.amazonaws.com/freecodecamp/camper-image', {
        force: true
      })
      .then(() => {
        cy.contains('URL must link directly to an image file');
      });
  });
  it('Can submit a correct URL', () => {
    cy.get('@pictureInput')
      .clear({ force: true })
      .type(
        'https://s3.amazonaws.com/freecodecamp/camper-image-placeholder.png',
        {
          force: true
        }
      );
    cy.wait(500);
    cy.get('#camper-identity > .btn').should('not.be.disabled');
  });
});
