/* global cy */

describe('Legacy redirects', () => {
  it('should redirect from front-end-libraries to front-end-development-libraries', () => {
    cy.visit('learn/front-end-libraries');
    cy.url().should('include', 'learn/front-end-development-libraries');

    cy.visit('learn/front-end-libraries/bootstrap');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        '/learn/front-end-development-libraries/bootstrap'
      );
    });

    cy.visit(
      'learn/front-end-libraries/bootstrap/use-responsive-design-with-bootstrap-fluid-containers'
    );
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        'learn/front-end-development-libraries/bootstrap/use-responsive-design-with-bootstrap-fluid-containers'
      );
    });

    cy.visit('learn/front-end-libraries/front-end-libraries-projects');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        'learn/front-end-development-libraries/front-end-development-libraries-projects'
      );
    });

    cy.visit(
      'learn/front-end-libraries/front-end-libraries-projects/build-a-random-quote-machine'
    );
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        'learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-random-quote-machine'
      );
    });

    cy.visit('certification/certifieduser/front-end-libraries');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        'certification/certifieduser/front-end-development-libraries'
      );
    });
  });

  it('should redirect from /apis-and-microservices to /back-end-development-and-apis', () => {
    cy.visit('learn/apis-and-microservices');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('learn/back-end-development-and-apis');
    });

    cy.visit('learn/apis-and-microservices/managing-packages-with-npm');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        'learn/back-end-development-and-apis/managing-packages-with-npm'
      );
    });

    cy.visit(
      'learn/apis-and-microservices/managing-packages-with-npm/how-to-use-package-json-the-core-of-any-node-js-project-or-npm-package'
    );
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        'learn/back-end-development-and-apis/managing-packages-with-npm/how-to-use-package-json-the-core-of-any-node-js-project-or-npm-package'
      );
    });

    cy.visit('learn/apis-and-microservices/apis-and-microservices-projects');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        'learn/back-end-development-and-apis/back-end-development-and-apis-projects'
      );
    });

    cy.visit(
      'learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice'
    );
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        'learn/back-end-development-and-apis/back-end-development-and-apis-projects/timestamp-microservice'
      );
    });

    cy.visit('certification/certifieduser/apis-and-microservices');
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        'certification/certifieduser/back-end-development-and-apis'
      );
    });
  });
});
