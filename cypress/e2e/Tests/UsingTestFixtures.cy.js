describe('Uses external test data', function () {

    before(function () {
        // cy.fixture("edgewordslogins").as('testData') //get test data from fixtures folder then alias it for use in following test
        //   could not just use this alias in this method as due to async code it wont be set up until 'later'
        //  .then(theData=>{ //but you could get it in a then() as it is implicitly passed down the chain
        //     cy.log(theData.username)
        // })

        //Alternative (no alias) - put the data on the Mocha (this) object
        cy.fixture("edgewordslogins").then(function(notUsingAlias){
            this.username = notUsingAlias.username;
            this.password = notUsingAlias.password;
        })
        
        
    });

    it('Logs in to the WebDriver2 site', function(){
        cy.visit('/')
        cy.contains('Login to restricted area',{matchCase: false}).click()
        // cy.get('#username').type(this.testData.username, {delay:200}) //using as() alias
        //cy.get('#username').type(this.username); //using Mocha object - note wont work if "it" uses arrow => syntax
        cy.get('#username').type(Cypress.env('username'),{delay:200}) //Read an env var from cypress.config.js or cypress.env.json
        cy.get('#password').type(this.password); //using Mocha object
        cy.contains('Submit').click()
    });
});