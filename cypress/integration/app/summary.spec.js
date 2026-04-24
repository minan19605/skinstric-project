describe('Summary page', () => {
  const serverData = {
    race: { white: 0.21, asian: 0.79 },
    age: { '42': 0.33, '35': 0.67 },
    gender: { female: 0.4, male: 0.6 },
  };

  it('renders stored demographics data and lets the user switch categories', () => {
    cy.visit('/summary');
    cy.window().then((win) => {
      win.sessionStorage.setItem('serverData', JSON.stringify(serverData));
    });
    cy.reload();

    cy.contains('DEMOGRAPHICS').should('be.visible');
    cy.contains('Asian').should('be.visible');
    cy.contains('79%').should('be.visible');

    cy.contains('AGE').click();
    cy.contains('35 y.o.').should('be.visible');
    cy.contains('67%').should('be.visible');

    cy.contains('42').click();
    cy.contains('42 y.o.').should('be.visible');

    cy.contains('SEX').click();
    cy.contains('MALE').should('be.visible');
    cy.contains('60%').should('be.visible');
  });
});
