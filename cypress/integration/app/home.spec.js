describe('Home page', () => {
  it('renders the landing content and opens the testing flow', () => {
    cy.visit('/');

    cy.contains('SKINSTRIC').should('be.visible');
    cy.contains('Sophisticated').should('be.visible');
    cy.contains('ENTER EXPERIENCE').click();

    cy.url().should('include', '/testing');
    cy.contains('TO START ANALYSIS').should('be.visible');
  });
});
