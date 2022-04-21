import '@testing-library/cypress/add-commands'

describe('App Component', () => {
  before(() => {
    cy.visit('localhost:3000');
  })
  it('should visit the Sign_In page', () => {
    cy.findByRole('textbox', {  name: /user name/i }).should('exist');
  })
  it('should allow a user to enter their username and sign in', () => {
    cy.findByRole('textbox', {  name: /user name/i }).type('harold.hutchins.1');
    cy.findByRole('button').click();
  })
})