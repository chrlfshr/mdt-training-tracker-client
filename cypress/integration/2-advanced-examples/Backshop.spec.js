import '@testing-library/cypress/add-commands'

describe('Backshop Component', () => {
  before(() => {
    cy.wait(1000).visit('localhost:3000/harold.hutchins.1/operator')
    cy.findByRole('button', {  name: /operator/i }).click();
    cy.findByRole('option', {  name: /backshop/i }).click();
  })
  it('should visit the Backshop page', () => {
    cy.findByRole('button', {  name: /backshop/i }).should('exist');
  })
  it('should render links to \'Manage Modules\', \'Manage Users\', \'Manage Crews\'', () => {
    cy.findByRole('link', {  name: /manage modules/i }).should('exist');
    cy.findByRole('link', {  name: /manage users/i }).should('exist');
    cy.findByRole('link', {  name: /manage crews/i }).should('exist');
  })
  it('should navigate to the \'Manage Modules\' page, and display all modules', () => {
    cy.findByRole('link', {  name: /manage modules/i }).click();
    cy.findByRole('cell', {  name: /mdt 102/i }).should('exist');
    cy.findByRole('cell', {  name: /mdt 200/i }).should('exist');
    cy.findByRole('cell', {  name: /mdt 300/i }).should('exist');
    cy.findByRole('cell', {  name: /mdt 101/i }).should('exist');
  })
})

  describe('Backshop Component', () => {
    before(() => {
      cy.wait(1000).visit('localhost:3000/harold.hutchins.1/operator')
      cy.findByRole('button', {  name: /operator/i }).click();
      cy.findByRole('option', {  name: /backshop/i }).click();
    })
    it('should visit the Backshop page', () => {
      cy.findByRole('button', {  name: /backshop/i }).should('exist');
    })
    it('should render links to \'Manage Modules\', \'Manage Users\', \'Manage Crews\'', () => {
      cy.findByRole('link', {  name: /manage modules/i }).should('exist');
      cy.findByRole('link', {  name: /manage users/i }).should('exist');
      cy.findByRole('link', {  name: /manage crews/i }).should('exist');
    })
    it('should navigate to the \'Manage Modules\' page, and display all modules', () => {
      cy.findByRole('link', {  name: /manage crews/i }).click();
    })
  })

    describe('Backshop Component', () => {
      before(() => {
        cy.wait(1000).visit('localhost:3000/harold.hutchins.1/operator')
        cy.findByRole('button', {  name: /operator/i }).click();
        cy.findByRole('option', {  name: /backshop/i }).click();
      })
      it('should visit the Backshop page', () => {
        cy.findByRole('button', {  name: /backshop/i }).should('exist');
      })
      it('should render links to \'Manage Modules\', \'Manage Users\', \'Manage Crews\'', () => {
        cy.findByRole('link', {  name: /manage modules/i }).should('exist');
        cy.findByRole('link', {  name: /manage users/i }).should('exist');
        cy.findByRole('link', {  name: /manage crews/i }).should('exist');
      })
      it('should navigate to the \'Manage Modules\' page, and display all modules', () => {
        cy.findByRole('link', {  name: /manage users/i }).click();
      })
    })