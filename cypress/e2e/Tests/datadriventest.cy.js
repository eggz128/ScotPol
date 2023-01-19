const data = require('../../fixtures/datadriven.json')

describe('Login multiple times', function () {

    data.forEach(individualTestDataObject => {
        it('uses fixture data', function () {
            cy.viewport('samsung-s10','portrait')
            cy.visit('https://www.edgewordstraining.co.uk/webdriver2')
            cy.contains('Login to restricted area', {matchCase: false}).click()
            cy.get('#username').type(individualTestDataObject.username)
            cy.get('#password').type(individualTestDataObject.password)
            cy.wait(2000)
            cy.contains('Submit').click()
        });
    });

});