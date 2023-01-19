describe('My First Test Suite', function () { //Mocha Suite


    


    it('Is my first test', function () { //Mocha test -- skipped
        //cy.visit('http://www.google.co.uk/') //Will error if uncommented as this test would then navigate between "origins"
        //cy.origin('https://www.edgewordstraining.co.uk/',function(){ //Unless you use cy.origin() and a callback function tp perform the steps on the new origin
            console.log("Start of test");
            //cy.pause() //Step through Cypress commands in the browser
            //debugger //No good - Cy commands are async so stepping through in browser wont have desired effect
            cy.log("this is a cypress command and so runs when you might expect from reading");
            cy.visit('https://www.edgewordstraining.co.uk/demo-site'); //Visits a page
            cy.get('#woocommerce-product-search-field-0').type('Cap{enter}');
            cy.contains('Add to cart').click();
            //cy.get('div').debug().click() //Can't click 67 divs - can see the divs passed down chain with debug() in js console

            console.log("End of test"); //Appears in console before test "finishes" as Cy commands are async and run "later"

        //}) //end of cy.origin()
    });

    it('Second test',{tags: ["@RunThis","@AnotherTag"]}, function () { //Another Mocha test
        cy.visit('https://www.edgewordstraining.co.uk/demo-site');
        cy.get('#woocommerce-product-search-field-0').type('Cap{enter}');
        //cy.contains('Add to cart').click();
        //cy.get('.single_add_to_cart_button'); //CY Playground
        //cy.get('#product-29 > div.summary.entry-summary > form > button').click();
        //cy.get("button[name='add-to-cart']"); //Rx Selocity

        //Can chain elements to limit search
        // cy.get('div.summary.entry-summary');
        //     .find("input[name='quantity']").clear().type('2');
            
        // cy.get('div.summary.entry-summary'); //Can find an element
        //     .find("button[name='add-to-cart']").click(); //then search inside
        
        //If you have multiple elements to interact with inside of one parent
        //within() may be more efficient/clean
        cy.get('div.summary.entry-summary').within(function(){
            cy.get("input[name='quantity']").clear().type('2');
            //cy.get("button[name='add-to-cart']").click();
            //cy.contains('input','add to cart',{matchCase: false}).click(); //Limit contains to an element type, and do a case insensitive search
            cy.contains(/^add to.*/i).click(); //Can use RegEx
        });

        //cy.get('div').first().closest('div') //come back to this
        cy.log("Finished")
        cy.log("Yes really")
    });
});




