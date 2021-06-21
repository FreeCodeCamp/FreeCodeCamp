/* global cy Cypress */

Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.contains("Get started (it's free)").click({ force: true });
});

Cypress.Commands.add('resetUsername', () => {
  cy.login();
  cy.visit('/settings');

  cy.get('@usernameInput')
    .clear({ force: true })
    .type('developmentuser', { force: true });

  cy.contains('Username is available');

  cy.get('@usernameInput').type('{enter}', { force: true, release: false });

  cy.contains('Account Settings for developmentuser').should('be.visible');
});

Cypress.Commands.add('testChallenges', () => {
  // Test Meta tags
  cy.get('head meta[charset=utf-8]');
  cy.get('head meta[name=description]').should('have.attr', 'content');

  // Test breadcrumbs
  cy.get('.breadcrumb-right').should('have.attr', 'href');
  cy.get('.ellipsis').should('be.visible');
  cy.get('.breadcrumb-left').should('have.attr', 'href');
  cy.get('.breadcrumb-left').should('be.visible', 'href');

  cy.get('body').should('be.visible');

  // Challenge content
  cy.get('.challenge-title').should('be.visible');
  cy.get('#description').should('be.visible');

  // Monaco editor
  cy.get('.react-monaco-editor-container')
    .click()
    .focused()
    .type('<h1> Hello world! </h1>');

  // Ensure that there are test
  cy.get('.challenge-test-suite').children().its('length').should('be.gt', 0);
});

// This command can be used to test projects and back-end challenges
Cypress.Commands.add('testProjectsAndBackend', () => {
  // Test breadcrumbs
  cy.get('.breadcrumb-right').should('have.attr', 'href');
  cy.get('.ellipsis').should('be.visible');
  cy.get('.breadcrumb-left').should('have.attr', 'href');
  cy.get('.breadcrumb-left').should('be.visible', 'href');

  // Challenge content
  cy.get('.challenge-title').should('be.visible');
  cy.get('#description').should('be.visible');

  // Shoud be possible to submit solution
  cy.get('input[name=solution]')
    .click()
    .type('https://codepen.io/foobar/full/RKRbwL');

  cy.get('button[type=submit]').first().click();
});
