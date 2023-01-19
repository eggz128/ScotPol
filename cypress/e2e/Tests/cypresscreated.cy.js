describe('template spec', () => { //When Cypress creates cy.js spec files it uses arrow => notation for functions. This is *usually* ok.
  before(function () {
    cy.log("You can also have local hooks as well as global")
  });


  //Cypress.config('defaultCommandTimeout',15000);
  it('interacts with form elements', () => {
    cy.visit('https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html');
    //cy.get('input[type=radio]').click({ multiple: true }); //Would fail without the options object as click() can by default only work on one element and 3 are yeilded.
    cy.get('input[type=radio]').each(function(elm, index, $list){
      if(index===1){ //limit to second item
        cy.wrap(elm).click() //elm is a JQuery element, must wrap() it to Cypress click it
      }
    })

    cy.get('input[type=radio]') //yeilds 3 elements down the chain
      .eq(2) //Get the last element (counting from 0). Yeild that down the chain
      .click() //Click the one element


    //Request an element that is not on the page
    cy.wait(5000);
    cy.get('#doesnotexist').click();
    cy.get('#doesnotexist',{timeout: 10000}).click();

    cy.get('#textInput').type('{shift}HELLO{shift} World',{delay: 200});

    cy.get('#checkbox').click()
    cy.get('#checkbox').click() //Toggle state
    cy.get('#checkbox').check() //Set state
    cy.get('#checkbox').uncheck() //Set state

    cy.get('input[type=radio]') //Yeilds three items
      .check(['One','Three']) //Check each item in array in turn

    cy.get('#select').select(2) //Select by index, or select 'ByText' e.g. .select('Selection Two')


    cy.log ('Login Successful')
    cy.log('normal')
    cy.log('**bold**')
    cy.log('_italic_')
    cy.log('[The Text](http://example.com)')
    //Including a picture in the log no longer seems to work.
    cy.log('![Logo](https://www.edgewordstraining.co.uk/training-site/images/site_logo.gif)')

    cy.screenshot('my-image') //full page
    cy.get('#textInput').screenshot('text-box') //screenshot yeilded element
      .then(function(){ //Once screenshot is done...then...
      console.log("Finished") //console.log runs last
    })
    
  })

  it('Captures and sserts on things', function () {

    cy.visit('https://www.edgewordstraining.co.uk/webdriver2/docs/forms.html');

    cy.get('#right-column > h1').should('have.text','Forms');
    cy.get('#right-column > h1').should('contain', 'or');
    cy.get('#right-column > h1').invoke('text').should('match',/^For/); //If matching RegEx capture the text using invoke/jquery and pass down the chain.
    cy.get('#right-column > h1').invoke('text').then(function(theText){ //Explicitly capture the text then() assert on it.
      cy.log("Assert on an explicitly captured subject")
      expect(theText).to.eq('Forms');
    })
    cy.get('#right-column > h1').invoke('text').should(theText=>{ //Arrow syntax is fine as we dont need/use the JS 'this' keyword in here.
      
      expect(theText).to.eq('Forms123');
    })

    cy.get('#textInput').type('Hello World').should('have.value','Hello World'); //Inputs (and textareas!) don't have inner text. Capture the 'value'
    //cy.get('#textInput').should('have.text','Hello World'); //Inputs do not have inner text
    cy.get('#textInput').should('have.value','Hello World');
    cy.get('#textInput').invoke('val').should('match',/^Hello/);


    cy.get('input[type=radio]').should('have.length','3'); //There are 3 radio buttons
    cy.get('input[type=radio]').should('have.length.at.least',2)
  });

  it.only('Uses the cart drop down', function () {
    cy.visit('https://www.edgewordstraining.co.uk/demo-site/');
    cy.get('#woocommerce-product-search-field-0').type('CAp{enter}');
    cy.contains('Add to cart').click();
    //cy.get('#site-header-cart > li:nth-child(2) > div > div > p.woocommerce-mini-cart__buttons.buttons > a:nth-child(1)').click({force: true});
    cy.get('#site-header-cart > li:nth-child(1) > a > span.count').trigger('mouseover') //Doesnt work - only fires the 'js event' - doesnt actually hover
    cy.get('.widget_shopping_cart').invoke('css','left','0px')
    
    cy.get('#site-header-cart > li:nth-child(2) > div > div > p.woocommerce-mini-cart__buttons.buttons > a:nth-child(1)').click()
    //Capture and compare values
    //Wont work due to async code
    // let lineTotal = cy.get('.product-subtotal > .woocommerce-Price-amount > bdi').invoke('text');
    // let subTotal = cy.get('.cart-subtotal > td > .woocommerce-Price-amount > bdi').invoke('text')
    // expect(lineTotal).to.equal(subTotal);

    //Instead capture and nest
    cy.get('.product-subtotal > .woocommerce-Price-amount > bdi').invoke('text').then(lineTotal=>{
      cy.log("We have the lineTotal:"+lineTotal)
      cy.get('.cart-subtotal > td > .woocommerce-Price-amount > bdi').invoke('text').then(subTotal=>{
        cy.log("We still have the lineTotal:"+lineTotal)
        cy.log("We have the subTotal:"+subTotal)
        expect(lineTotal).to.equal(subTotal)
      })
    }); //This 'single statement' started on line 98
    
  });
})