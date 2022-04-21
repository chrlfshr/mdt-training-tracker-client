import '@testing-library/cypress/add-commands'

describe('Operator Component', () => {
  before(() => {
    cy.wait(1000).visit('localhost:3000/harold.hutchins.1/operator')
  })
  it('should navigate the user to their operator overview page', () => {
    cy.findByRole('button', {  name: /operator/i }).should('exist');
  })
  it('should visit the Operator page', () => {
    cy.findByRole('button', {  name: /operator/i }).should('exist');
  })
  it('should render a personalized overview', () => {
    cy.findByText('Welcome, Master Sergeant Harold H. Hutchins!').should('exist');
    cy.findByText(/\(harold\.hutchins\.1\)/i).should('contain', 'harold.hutchins.1');
    cy.findByRole('img', {  name: /crew/i}).should('exist');

  })
  it('should show the operator their current modules', () => {
    cy.findByRole('button', {  name: /mdt 101 deadline: 2021\-01\-01t00:00:00\.000z/i}).should('exist');
  })
})



