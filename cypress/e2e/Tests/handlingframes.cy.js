describe('Independent', function () {
    it('Dismiss cookies and navigate', function () {
        cy.visit('https://www.independent.co.uk/')
        
        //Cookie agreement button is in an iframe.
        //1)Find the iframe
        //2)iframe is yielded down chain. 
        //3)Using jQuery(!) find the button. 3a)That is cy.wrapped to yield the result to the next command in chain
        //4)cy click it
        // This will likely fail if the iframe loads slowly because jquery doesnt have any of the nice byuilt in cypress waits
        cy.get('iframe#sp_message_iframe_719457')
        .then(iframe => { //This wont be retrying, so will be flakey
          cy.wrap(
            iframe.contents().find('button[aria-label=AGREE]')//this is JQuery, not Cypress
            ) //wrapping the JQuery HTML element will pass it down the chain
          
          //More on iframes:
          //https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
          //https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/blogs__iframes
          //https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/blogs__iframes/cypress/e2e/button-spec.cy.js
    
          // https://www.npmjs.com/package/cypress-iframe
    
        })
        .click() //cy click()s the HTML element passed to it. Although presented over multiple lines (20-34) - this was all "one" statement.
    
        //Lets choose something from the main menu
        //LifeStyle > Shopping - Kind of simulating a real user
        cy.get('#header').contains('Lifestyle') //Find Lifestyle in header
                          .siblings().filter('ul') //the ul is display:none until hovered
                          .invoke('css','display','block') //force the ul drop down menu to show - Cypress can't actually do mouse hovers, so we brute force it with more JQuery
                          .contains('Shopping') //Then go looking for Shopping in child elms
                          .click()
                          //.click({force:true}) //Or if we aren't showing the menu, just force the click to the invisible element anyway
       
        //Or just give up on any pretense of simulating a user, go straight to the link and force click it
        //But then...Why not just directly load the relevant page with cy.visit()...
    
      });
    
      it.only('Shorter comments', function () {
        cy.visit('https://www.independent.co.uk/')
        
        //Handle Cookie Accept - WARNING: will flake
        cy.get('iframe#sp_message_iframe_719457')
        .then(iframe => { 
          cy.wrap(iframe.contents().find('button[aria-label=AGREE]')) //JQuery find button
        }) //wrap passes JQuery HTML elm down command chain
        .click() //45-49 is all one statement
    
        //Cypress can't "hover" so emulating a user like this is a bit silly...
        cy.get('#header').contains('Lifestyle') 
                          .siblings().filter('ul') 
                          .invoke('css','display','block') //force the ul drop down menu to show
                          //Cypress can't actually do mouse hovers, so we brute force the appearance by
                          //finding out how the menu was hidden and setting new CSS styles to override
                          //with more JQuery
                          .contains('Shopping') 
                          .click() //From 52-69 is all one statement (line)
    
        //...arguably no better than just going straight for the hidden link with a
        //cy.get('#header').contains('Shopping').click({force:true}) ...
      });
});