describe('Testing page', () => {
  it('validates input, submits the form, and reveals the next step', () => {
    cy.visit('/testing');

    cy.window().then((win) => {
      cy.stub(win, 'fetch')
        .as('submitUserData')
        .resolves({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });
    });

    cy.get('input[placeholder="Introduce Yourself"]')
      .type('Alex1')
      .trigger('keydown', { key: 'Enter', code: 'Enter', which: 13, keyCode: 13 });
    cy.contains('Please enter a valid name without numbers or special characters').should('exist');

    cy.get('input[placeholder="Introduce Yourself"]')
      .clear()
      .type('Alex')
      .trigger('keydown', { key: 'Enter', code: 'Enter', which: 13, keyCode: 13 });
    cy.get('input[placeholder="your city name"]').should('be.visible');

    cy.get('input[placeholder="your city name"]')
      .type('Chicago')
      .trigger('keydown', { key: 'Enter', code: 'Enter', which: 13, keyCode: 13 });

    cy.get('@submitUserData').should('have.been.calledOnce');
    cy.get('@submitUserData').then((stub) => {
      const [url, options] = stub.getCall(0).args;

      expect(url).to.eq('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne');
      expect(options.method).to.eq('POST');
      expect(JSON.parse(options.body)).to.deep.eq({
        name: 'Alex',
        location: 'Chicago',
      });
    });

    cy.contains('Thank you!').should('be.visible');
    cy.contains('PROCEED').should('be.visible');
  });
});
