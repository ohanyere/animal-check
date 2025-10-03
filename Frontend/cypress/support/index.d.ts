// cypress/support/index.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Logs a user in using UI or API
     * @example cy.login('me@example.com', 'password123')
     */
    login(email: string, password: string): Chainable<Subject>;
  }
}
