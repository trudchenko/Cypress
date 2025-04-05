describe('Selectors tests', () => {
  
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                 username: 'guest',
                 password: 'welcome2qauto'
            }
        });
        registration.buttonSignUp.click();
    });

    it('Test Name Field', () => {

        cy.get('#signupName').click();
        cy.contains('Name').click();
        const errMsg = cy.get('#signupName').siblings('div.invalid-feedback').find('p').eq(0);
        errMsg.should('have.text', 'Name required');
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);

        cy.get('#signupName').type(' ');
        cy.contains('Name').click();
        const errMsg1 = cy.get('#signupName').siblings('div.invalid-feedback').find('p').eq(0);
        errMsg1.should('have.text', 'Name is invalid');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);
        
        const errMsg2 = cy.get('#signupName').siblings('div.invalid-feedback').find('p').eq(1);
        errMsg2.should('have.text', 'Name has to be from 2 to 20 characters long');
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);

        cy.get('#signupName').type('Theodosiana-Ferdinandetta');
        cy.contains('Name').click();
        const errMsg3 = cy.get('#signupName').siblings('div.invalid-feedback').find('p').eq(1);
        errMsg3.should('have.text', 'Name has to be from 2 to 20 characters long'); 
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);
    });

    it('Test Email Field', () => {

        cy.get('#signupEmail').click();
        cy.contains('Name').click();
        const errMsg = cy.get('#signupEmail').siblings('div.invalid-feedback').find('p').eq(0);
        errMsg.should('have.text', 'Email required');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);

        cy.get('#signupEmail').type('Myemal');
        cy.contains('Name').click();
        const errMsg1 = cy.get('#signupEmail').siblings('div.invalid-feedback').find('p').eq(0);
        errMsg1.should('have.text', 'Email is incorrect');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');   
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true); 

    });

    it('Test Password Field', () => {

        cy.get('#signupPassword').click();
        cy.contains('Name').click();
        const errMsgRequired = cy.get('#signupPassword').siblings('div.invalid-feedback').find('p').eq(0);
        errMsgRequired.should('have.text', 'Password required');
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true)

        cy.get('#signupPassword').type('Th1');
        cy.contains('Name').click();
        const errMsgLessThan = cy.get('#signupPassword').siblings('div.invalid-feedback').find('p').eq(0);
        errMsgLessThan.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');    
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);

        cy.get('#signupPassword').type('Theodosiana-Ferdinandetta');
        cy.contains('Name').click();
        const errMsgMoreThen = cy.get('#signupPassword').siblings('div.invalid-feedback').find('p').eq(0);
        errMsgMoreThen.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);

        cy.get('#signupPassword').type('Theodosiana');
        cy.contains('Name').click();
        const errMsgOneInteger = cy.get('#signupPassword').siblings('div.invalid-feedback').find('p').eq(0);
        errMsgOneInteger.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);

        cy.get('#signupPassword').type('theodosiana1');
        cy.contains('Name').click();
        const errMsgOneCapital = cy.get('#signupPassword').siblings('div.invalid-feedback').find('p').eq(0);
        errMsgOneCapital.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);

        cy.get('#signupPassword').type('PASSWORD1');
        cy.contains('Name').click();
        const errMsgOneSmallLetter = cy.get('#signupPassword').siblings('div.invalid-feedback').find('p').eq(0);
        errMsgOneSmallLetter.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);
    });

    it('Test Re-enter Password Field', () => {

        cy.get('#signupRepeatPassword').click();
        cy.contains('Name').click();
        const errMsgRequired = cy.get('#signupRepeatPassword').siblings('div.invalid-feedback').find('p').eq(0);
        errMsgRequired.should('have.text', 'Re-enter password required');
        cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);

        cy.get('#signupPassword').type('Theodosiana1');
        cy.get('#signupRepeatPassword').type('Theodosiana2');
        cy.contains('Name').click();
        const errMsgPasswordMatch = cy.get('#signupRepeatPassword').siblings('div.invalid-feedback').find('p').eq(0);
        errMsgPasswordMatch.should('have.text', 'Passwords do not match');
        cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);
    });

    it('Test All Fields Empty', () => {
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);
    });

    it('Test Name Field is Required', () => {
        
        cy.get('#signupLastName').type('Rudchenko');
        cy.get('#signupEmail').type('rudchenkosumy+1@gmail.com');
        cy.get('#signupPassword').type('Theodosiana1');
        cy.get('#signupRepeatPassword').type('Theodosiana1');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);
    });

    it('Test Last Name Field is Required', () => {

        cy.get('#signupName').type('Tetiana');
        cy.get('#signupEmail').type('rudchenkosumy+1@gmail.com');
        cy.get('#signupPassword').type('Theodosiana1');
        cy.get('#signupRepeatPassword').type('Theodosiana1');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);
    });

    it('Test Email Field is Required', () => {

        cy.get('#signupName').type('Tetiana');
        cy.get('#signupLastName').type('Rudchenko');
        cy.get('#signupPassword').type('Theodosiana1');
        cy.get('#signupRepeatPassword').type('Theodosiana1');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);
    });

    it('Test Password Field is Required', () => {

        cy.get('#signupName').type('Tetiana');
        cy.get('#signupLastName').type('Rudchenko');
        cy.get('#signupEmail').type('rudchenkosumy+1@gmail.com');
        cy.get('#signupRepeatPassword').type('Theodosiana1');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);
    });

    it('Test Repeat Password Field is Required', () => {

        cy.get('#signupName').type('Tetiana');
        cy.get('#signupLastName').type('Rudchenko');
        cy.get('#signupEmail').type('rudchenkosumy+1@gmail.com');
        cy.get('#signupPassword').type('Theodosiana1');
        cy.get('div.modal-footer').find('.btn-primary').should('have.prop', 'disabled', true);
    });

    it('Test Successfull Registration', () => {
        
        cy.get('#signupName').type('Tetiana');
        cy.get('#signupLastName').type('Rudchenko');
        cy.get('#signupEmail').type('rudchenkosumy+1@gmail.com');
        cy.get('#signupPassword').type('Theodosiana1');
        cy.get('#signupRepeatPassword').type('Theodosiana1');
        cy.get('div.modal-footer').find('.btn-primary').click();
    });
});