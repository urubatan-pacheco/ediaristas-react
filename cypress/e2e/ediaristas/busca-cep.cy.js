context('ediaristas app - buscar cep', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/encontrar-diarista');
  });

  it('botão desabilitado ou habilitado ao digitar cep inválido ou válido', () => {
    cy.get('button')
      .contains(/buscar/i)
      .should('be.disabled');

    const field = cy.get('#\\:R9jekm\\:');
    field.type('1234567');

    cy.get('button')
      .contains(/buscar/i)
      .should('be.disabled');

    field.clear().type('12345678');
    cy.get('button')
      .contains(/buscar/i)
      .should('be.enabled');
  });

  it('buscando cep válido e existente', () => {
    const field = cy.get('#\\:R9jekm\\:');
    field.type('01001000');

    cy.get('button')
      .contains(/buscar/i)
      .click();

    cy.get('div').contains('Olivia Duarte').should('be.visible');

    cy.get('button')
      .contains(/contratar/i)
      .should('be.enabled');
  });
});
