// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', {}, (email, password) => { 
    cy.contains('button', 'Sign In').click()
    cy.get('#signinEmail').type(email);
    cy.get('#signinPassword').type(password);
    cy.contains('button', 'Login').click()
});

Cypress.Commands.add('addExpense', {}, (expense) => { 
    return cy.request('POST','api/expenses', expense);
});
   
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      // turn off original log
      options.log = false;
      // create our own log with masked message
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      });
    }
  
    return originalFn(element, text, options);
  });

  Cypress.Commands.overwrite('visit', (originalFn, ...args)  => { 
    originalFn(args[0], {
      auth: {
        username: 'guest',
        password: 'welcome2qauto'
      },
      ...args
    })
  });