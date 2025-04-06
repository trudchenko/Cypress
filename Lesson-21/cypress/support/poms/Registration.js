export default class Registration {

    selectors = {
    
        registrationNameField: () => cy.get('#signupName'),
        registrationLastNameField: () => cy.get('#signupLastName'),
        registrationEmailField: () => cy.get('#signupEmail'),
        registrationPasswordField: () => cy.get('#signupPassword'),
        registrationRepeatPasswordField: () => cy.get('#signupRepeatPassword'),
        clickOutsideTheField: () => cy.contains('label','Name'),

        lastNameErrorMessage1:() => cy.get('#signupLastName').siblings('div.invalid-feedback').find('p').eq(0),
        lastNameErrorMessage2:() => cy.get('#signupLastName').siblings('div.invalid-feedback').find('p').eq(1),
        emailErrorMessage: () => cy.get('#signupEmail').siblings('div.invalid-feedback').find('p').eq(0),
        passwordErrorMessage: () => cy.get('#signupPassword').siblings('div.invalid-feedback').find('p').eq(0),
        repeatPasswordErrorMessage: () => cy.get('#signupRepeatPassword').siblings('div.invalid-feedback').find('p').eq(0),
        nameErrorMessage1: () => cy.get('#signupName').siblings('div.invalid-feedback').find('p').eq(0), 
        nameErrorMessage2: () => cy.get('#signupName').siblings('div.invalid-feedback').find('p').eq(1), 

        buttonSignUp: () => cy.get('button.hero-descriptor_btn'),
        buttonRegister: () => cy.get('div.modal-footer').find('.btn-primary'),

        myProfileButton: () => cy.get('button#userNavDropdown')
    }

    fillAllFields(name, lastName, email, password, repeatPassword){

        if (!!name) {
            this.selectors.registrationNameField().type(name);
        }

        if (!!lastName) {
            this.selectors.registrationLastNameField().type(lastName);
        }

        if (!!email) {
            this.selectors.registrationEmailField().type(email);
        }

        if (!!password) {
            this.selectors.registrationPasswordField().type(password, { sensitive: true });
        }

        if (!!repeatPassword) {
            this.selectors.registrationRepeatPasswordField().type(repeatPassword, { sensitive: true });
        }
    }

    clikcRegisterButton() {
        this.selectors.buttonRegister().click(); 
    }

    fillName(name) {
        this.selectors.registrationNameField().click(); 
        if (!!name) {
            this.selectors.registrationNameField().type(name); 
        }
        this.selectors.clickOutsideTheField().click();
    }

    fillLastName(name) {
        this.selectors.registrationLastNameField().click(); 
        if (!!name) {
            this.selectors.registrationLastNameField().type(name); 
        }
        this.selectors.clickOutsideTheField().click();
    }

    fillEmail(email) {
        this.selectors.registrationEmailField().click(); 
        if (!!email) {
            this.selectors.registrationEmailField().type(email); 
        }
        this.selectors.clickOutsideTheField().click();
    }

    fillPassword(password) {
        this.selectors.registrationPasswordField().click(); 
        if (!!password) {
            this.selectors.registrationPasswordField().type(password, { sensitive: true }); 
        }
        this.selectors.clickOutsideTheField().click();
    }

    fillRepeatPassword(password) {
        this.selectors.registrationRepeatPasswordField().click(); 
        if (!!password) {
            this.selectors.registrationRepeatPasswordField().type(password, { sensitive: true }); 
        }
        this.selectors.clickOutsideTheField().click();
    }

    testName(firstName, errorMsg1, errorMsg2) {
        this.fillName(firstName);
        this.selectors.nameErrorMessage1().should('have.text', errorMsg1);
        if (!!errorMsg2) {
            this.selectors.nameErrorMessage2().should('have.text', errorMsg2);
        }
        this.selectors.registrationNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        this.selectors.buttonRegister().should('have.prop', 'disabled', true);
    }

    testLastName(lastName, errorMsg1, errorMsg2) {
        this.fillLastName(lastName);
        this.selectors.lastNameErrorMessage1().should('have.text', errorMsg1);
        if (!!errorMsg2) {
            this.selectors.lastNameErrorMessage2().should('have.text', errorMsg2);
        }
        this.selectors.registrationLastNameField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        this.selectors.buttonRegister().should('have.prop', 'disabled', true);
    }

    testEmail(email, errorMsg) {
        this.fillEmail(email);
        this.selectors.emailErrorMessage().should('have.text', errorMsg);
        this.selectors.registrationEmailField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        this.selectors.buttonRegister().should('have.prop', 'disabled', true);
    }

    testPassword(password, errorMsg) {
        this.fillPassword(password);
        this.selectors.passwordErrorMessage().should('have.text', errorMsg);
        this.selectors.registrationPasswordField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        this.selectors.buttonRegister().should('have.prop', 'disabled', true);
    }

    testRepeatPassword(password, repeatPassword, errorMsg) {
        this.fillPassword(password);
        this.fillRepeatPassword(repeatPassword);
        this.selectors.repeatPasswordErrorMessage().should('have.text', errorMsg);
        this.selectors.registrationRepeatPasswordField().should('have.css', 'border-color', 'rgb(220, 53, 69)');
        this.selectors.buttonRegister().should('have.prop', 'disabled', true);
    }
}