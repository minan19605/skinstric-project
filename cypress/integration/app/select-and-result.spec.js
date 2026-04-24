describe('/select page', () => {
  it('shows the analysis options and opens the demographics summary', () => {
    cy.visit('/select');

    cy.contains('A.I. ANALYSIS').should('be.visible');
    cy.contains('DEMOGRAPHICS').click();
    cy.url().should('include', '/summary');
  });

  it('renders the footer navigation actions', () => {
    cy.visit('/select');

    cy.contains('BACK').should('be.visible');
    cy.contains('GET SUMMARY').should('be.visible');
  });
});

describe('/result page', () => {
  it('opens and dismisses the camera permission modal', () => {
    cy.visit('/result');

    cy.contains('ALLOW A.I. TO ACCESS YOUR CAMERA').should('not.exist');
    cy.get('button').eq(1).click({ force: true });
    cy.contains('ALLOW A.I. TO ACCESS YOUR CAMERA').should('be.visible');
    cy.contains('DENY').click();
    cy.contains('ALLOW A.I. TO ACCESS YOUR CAMERA').should('not.exist');
  });

  it('routes to the camera flow when access is allowed', () => {
    cy.visit('/result');

    cy.get('button').eq(1).click({ force: true });
    cy.contains('ALLOW').click();

    cy.url().should('include', '/camera');
    cy.contains('TO GET BETTER RESULTS MAKE SURE TO HAVE').should('be.visible');
  });
});
