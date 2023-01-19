describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Place order', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('www.edgewordstraining.co.uk/demo-site/');
    cy.get('#woocommerce-product-search-field-0').clear('c');
    cy.get('#woocommerce-product-search-field-0').type('cap{enter}');
    //cy.get(':nth-child(1) > .site-search > .widget > .woocommerce-product-search > button').click();
    cy.get('.single_add_to_cart_button').click();
    cy.get('.woocommerce-message > .button').click();
    cy.get('.woocommerce-cart-form__cart-item > .product-subtotal').click();
    cy.get('.product-subtotal > .woocommerce-Price-amount > bdi').should('have.text', '£16.00');
    /* ==== End Cypress Studio ==== */
  });
})