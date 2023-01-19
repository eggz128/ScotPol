describe('handling alerts or confirms', function () {
    it('encounters a confirm', function () {
        cy.visit('/')
        cy.contains('Login to restricted area',{matchCase: false}).click()
        cy.get('#username').type('edgewords')
        cy.get('#password').type('edgewords123');
        cy.contains('Submit').click()
        cy.on('window:confirm',function(msgText){  //If a JS confirm is encountered do the following:
            expect(msgText).to.contain('Secure site')
            return false // to cancel/esc (default is to ok)
        })
        cy.contains('Log Out').click() //Spawns a JS Confirm. Without previos cy.on() Cypress will just log the message and OK
        cy.wait(10000)

    });
});