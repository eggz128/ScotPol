

describe('Uses custom commands', function () {
    it('It searches for and orders a product', {tags: "@RunThis"},function () {
        cy.visit('https://www.edgewordstraining.co.uk/demo-site');
        cy.addToCart('Cap'); //Custom command definition is in support/commands.js
        cy.contains('View cart').click();
        cy.get('nosuchelement').click();
    });

    it('It searches for a different product and orders it', function () {
        cy.visit('https://www.edgewordstraining.co.uk/demo-site');
        cy.addToCart('Belt');
        cy.contains('View cart').click();
    });
});