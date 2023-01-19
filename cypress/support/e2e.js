// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import registerCypressGrep from '@cypress/grep/src/support'
registerCypressGrep()

//Hooks that will apply globally
before(function () {
    cy.log("Runs once before any tests in this file execute");
});

after(function () {
    cy.log("Runs just once after all tests in this file have finished");
});

beforeEach(function () {
    cy.log("Runs before each test");
});

afterEach(function () {
    cy.log("Runs after each test");
});