/* global cy */

describe('Username input field', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains("Get started (it's free)").click({ force: true });
    cy.visit('/settings');

    // Setting aliases here
    cy.get('input[name=username-settings]').as('usernameInput');
    cy.get('form#usernameSettings').as('usernameForm');
  });

  it('Should be possible to type', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('twaha', { force: true })
      .should('have.attr', 'value', 'twaha');
  });

  it('Should show message when validating name', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('twaha', { force: true });

    cy.contains('Validating username...')
      .should('have.attr', 'role', 'alert')
      // We are checking for classes here to check for proper styling
      // This will be replaced with Percy in the future
      .should('have.class', 'alert alert-info');
  });

  it('Should show username is available if it is', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('brad', { force: true });

    cy.contains('Username is available')
      .should('be.visible')
      .should('have.attr', 'role', 'alert')
      // We are checking for classes here to check for proper styling
      // This will be replaced with Percy in the future
      .should('have.class', 'alert alert-success');
  });

  it('Should info message if username is available', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('mrugesh', { force: true });

    cy.contains(
      'Please note, changing your username will also change ' +
        'the URL to your profile and your certifications.'
    )
      .should('be.visible')
      .should('have.attr', 'role', 'alert')
      // We are checking for classes here to check for proper styling
      // This will be replaced with Percy in the future
      .should('have.class', 'alert alert-info');
  });

  // eslint-disable-next-line
  it('Should be able to click the `Save` button if username is avalable', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('oliver', { force: true });

    cy.get('@usernameForm').within(() => {
      cy.contains('Save').should('not.be.disabled');
    });
  });

  it('Should show username is unavailable if it is', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('twaha', { force: true });

    cy.contains('Username not available')
      .should('be.visible')
      .should('have.attr', 'role', 'alert')
      // We are checking for classes here to check for proper styling
      // This will be replaced with Percy in the future
      .should('have.class', 'alert alert-warning');
  });

  // eslint-disable-next-line
  it('Should not be possible to click the `Save` button if username is unavailable', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('twaha', { force: true });

    cy.contains('Username is available').should('not.exist');
    cy.contains('Username not available').should('not.exist');
    cy.contains(
      'Please note, changing your username will also change ' +
        'the URL to your profile and your certifications.'
    ).should('not.exist');

    cy.get('@usernameForm').contains('Save').should('be.disabled');
  });

  it('Should not show anything if user types their current name', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('developmentuser', { force: true });

    cy.get('@usernameForm').contains('Save').should('be.disabled');
  });

  // eslint-disable-next-line max-len
  it('Should not be possible to click the `Save` button if user types their current name', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('developmentuser', { force: true });

    cy.get('@usernameForm').contains('Save').should('be.disabled');
  });

  it('Should show warning if username includes invalid character', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('Quincy Larson', { force: true });

    cy.contains('Username "Quincy Larson" contains invalid characters')
      .should('be.visible')
      .should('have.attr', 'role', 'alert')
      // We are checking for classes here to check for proper styling
      // This will be replaced with Percy in the future
      .should('have.class', 'alert alert-danger');
  });

  // eslint-disable-next-line max-len
  it('Should not be able to click the `Save` button if username includes invalid character', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('Quincy Larson', { force: true });

    cy.get('@usernameForm').contains('Save').should('be.disabled');
  });

  it('Should change username if `Save` button is clicked', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('quincy', { force: true });

    cy.contains('Username is available');

    cy.get('@usernameForm').contains('Save').click({ force: true });
    cy.contains('Account Settings for quincy').should('be.visible');

    cy.resetUsername();
  });

  it('Should show flash message showing username has been updated', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('nhcarrigan', { force: true });
    cy.contains('Username is available');
    cy.get('@usernameInput').type('{enter}', { force: true, release: false });

    cy.contains('We have updated your username to nhcarrigan')
      .should('be.visible')
      // We are checking for classes here to check for proper styling
      // This will be replaced with Percy in the future
      .should(
        'have.class',
        'flash-message alert alert-success alert-dismissable'
      );

    cy.resetUsername();
  });

  it('Should be able to close the shown flash message', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('bjorno', { force: true });
    cy.contains('Username is available');
    cy.get('@usernameInput').type('{enter}', { force: true, release: false });

    cy.contains('We have updated your username to bjorno').within(() => {
      cy.get('button').click();
    });

    cy.contains('We have updated your username to bjorno').should('not.exist');

    cy.resetUsername();
  });

  it('Should change username if enter is pressed', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('symbol', { force: true });
    cy.contains('Username is available');

    cy.get('@usernameInput').type('{enter}', { force: true, release: false });

    cy.contains('Account Settings for symbol').should('be.visible');

    cy.resetUsername();
  });
  it('Should show warning if username includes uppercase characters', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('QuincyLarson', { force: true });

    cy.contains('Username "QuincyLarson" must be lowercase')
      .should('be.visible')
      .should('have.attr', 'role', 'alert')
      .should('have.class', 'alert alert-danger');
  });

  it('Should not be able to click the `Save` button if username includes uppercase characters', () => {
    cy.get('@usernameInput')
      .clear({ force: true })
      .type('QuincyLarson', { force: true });

    cy.get('@usernameForm').contains('Save').should('be.disabled');
  });
});
