describe('template spec', () => {
  before(()=> {
    cy.session("user", () => {
      cy.login("cater@gmail.com", "1234567")
    })
      cy.visit('http://localhost:5173/dash-board')
  })

  it('should render the home page with correct data', () => {
    cy.get('[data-testid="uploadfile"]', {timeout: 10000}).should("exist")
    cy.contains("Drop").click()
    // cy.contains("Diagnose Livestock")
  })
})

describe("checks for responsivness", () => {
 before(() => {
  cy.visit('http://localhost:5173/')
 })

 it("should render hamburger on small screen", () => {
  cy.viewport('iphone-xr')
  cy.get('[data-testid="hamburger"]', {timeout: 10000}).should("exist")
  cy.get('[data-testid="hamburger"]').click()
  cy.get('Div [data-testid="MobileMenuChildren"] > *').should('have.length', 6)
  cy.get('[data-testid="hamburgerClose"]').click()
 })

})