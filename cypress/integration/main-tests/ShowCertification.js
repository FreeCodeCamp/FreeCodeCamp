/* global cy */
const certificationUrl = '/certification/developmentuser/responsive-web-design';
const projects = {
  superBlock: 'responsive-web-design',
  block: 'responsive-web-design-projects',
  challenges: [
    {
      slug: 'build-a-tribute-page',
      solution: 'https://codepen.io/moT01/pen/ZpJpKp'
    },
    {
      slug: 'build-a-survey-form',
      solution: 'https://codepen.io/moT01/pen/LrrjGz?editors=1010'
    },
    {
      slug: 'build-a-product-landing-page',
      solution: 'https://codepen.io/moT01/full/qKyKYL/'
    },
    {
      slug: 'build-a-technical-documentation-page',
      solution: 'https://codepen.io/moT01/full/JBvzNL/'
    },
    {
      slug: 'build-a-personal-portfolio-webpage',
      solution: 'https://codepen.io/moT01/pen/vgOaoJ'
    }
  ]
};

describe('A certification,', function () {
  before(() => {
    cy.exec('npm run seed');
    cy.login();

    // submit projects for certificate
    const { superBlock, block, challenges } = projects;
    challenges.forEach(({ slug, solution }) => {
      const url = `/learn/${superBlock}/${block}/${slug}`;
      cy.visit(url);
      cy.get('#dynamic-front-end-form')
        .get('#solution')
        .type(solution, { force: true, delay: 0 });
      cy.contains("I've completed this challenge")
        .should('not.be.disabled')
        .click();
      cy.contains('Submit and go to next challenge').click().wait(1000);
    });
    cy.get('.react-monaco-editor-container', { timeout: 60000 });
    cy.visit('/settings');

    // set user settings to public to claim a cert
    cy.get('label:contains(Public)>input').each(el => {
      if (!/toggle-active/.test(el[0].parentElement.className)) {
        cy.wrap(el).click({ force: true });
        cy.wait(1000);
      }
    });

    // if honest policy not accepted
    cy.get('.honesty-policy button').then(btn => {
      if (btn[0].innerText === 'Agree') {
        btn[0].click({ force: true });
        cy.wait(1000);
      }
    });

    // claim certificate
    cy.get('a[href*="developmentuser/responsive-web-design"]').click({
      force: true
    });
  });

  describe('while viewing your own,', function () {
    before(() => {
      cy.login();
      cy.visit(certificationUrl);
    });

    it('should render a LinkedIn button', function () {
      cy.contains('Add this certification to my LinkedIn profile')
        .should('have.attr', 'href')
        .and(
          'match',
          // eslint-disable-next-line max-len
          /https:\/\/www\.linkedin\.com\/profile\/add\?startTask=CERTIFICATION_NAME&name=Responsive Web Design&organizationId=4831032&issueYear=\d\d\d\d&issueMonth=\d\d?&certUrl=https:\/\/freecodecamp\.org\/certification\/developmentuser\/responsive-web-design/
        );
    });

    it('should render a Twitter button', function () {
      cy.contains('Share this certification on Twitter').should(
        'have.attr',
        'href',
        'https://twitter.com/intent/tweet?text=I just earned the Responsive Web Design certification @freeCodeCamp! Check it out here: https://freecodecamp.org/certification/developmentuser/responsive-web-design'
      );
    });

    it("should be issued with today's date", () => {
      const date = new Date();
      const issued = `Issued\xa0${new Intl.DateTimeFormat('en-US', {
        month: 'long'
      }).format(date)} ${date.getDate()}, ${date.getFullYear()}`;
      cy.get('[data-cy=issue-date]').should('have.text', issued);
    });
  });

  describe("while viewing someone else's,", function () {
    before(() => {
      cy.visit(certificationUrl);
    });

    it('should display certificate', function () {
      cy.contains('has successfully completed the freeCodeCamp.org').should(
        'exist'
      );
      cy.contains('Responsive Web Design').should('exist');
    });

    it('should not render a LinkedIn button', function () {
      cy.contains('Add this certification to my LinkedIn profile').should(
        'not.exist'
      );
    });

    it('should not render a Twitter button', function () {
      cy.contains('Share this certification on Twitter').should('not.exist');
    });
  });
});
