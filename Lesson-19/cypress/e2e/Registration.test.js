import { Registration } from "../support/poms";
const registration = new Registration();

describe('Registration page tests', () => {
  
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                 username: 'guest',
                 password: 'welcome2qauto'
            }
        });
        cy.get('button.hero-descriptor_btn').click();
    });

    it('Test Name Field', () => {
        registration.testName('', 'Name required');
        registration.testName(' ', 'Name is invalid', 'Name has to be from 2 to 20 characters long');
        registration.testName('Theodosiana-Ferdinandetta', 'Name is invalid', 'Name has to be from 2 to 20 characters long');
    });

    it('Test Last Name Field', () => {
        registration.testLastName('', 'Last name required');
        registration.testLastName(' ', 'Last name is invalid', 'Last name has to be from 2 to 20 characters long');
        registration.testLastName('Theodosiana-Ferdinandetta', 'Last name is invalid', 'Last name has to be from 2 to 20 characters long');
    });

    it('Test Email Field', () => {
        registration.testEmail('', 'Email required');
        registration.testEmail('Myemal', 'Email is incorrect');
    });

    it('Test Password Field', () => {
        registration.testPassword('', 'Password required');
        registration.testPassword('Th1', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        registration.testPassword('Theodosiana-Ferdinandetta', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        registration.testPassword('Theodosiana', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        registration.testPassword('theodosiana1', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        registration.testPassword('PASSWORD1', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });
    
    it('Test Re-enter Password Field', () => {
        registration.testRepeatPassword('', '', 'Re-enter password required');
        registration.testRepeatPassword('Theodosiana1', 'Theodosiana2', 'Passwords do not match');
    });

    it('Test All Fields Empty', () => {
        registration.selectors.buttonRegister().should('have.prop', 'disabled', true);
    });

    it('Test Name Filed is Required', () => {
        registration.fillAllFields('','Rudchenko','rudchenkosumy+1@gmail.com','Theodosiana1','Theodosiana1');
        registration.selectors.buttonRegister().should('have.prop', 'disabled', true);
    });

    it('Test Last Name Field is Required', () => {
        registration.fillAllFields('Tetiana','','rudchenkosumy+1@gmail.com','Theodosiana1','Theodosiana1');
        registration.selectors.buttonRegister().should('have.prop', 'disabled', true);
    });

    it('Test Email Field is Required', () => {
        registration.fillAllFields('Tetiana','Rudchenko','','Theodosiana1','Theodosiana1');
        registration.selectors.buttonRegister().should('have.prop', 'disabled', true);
    });

    it('Test Password Field is Required', () => {
        registration.fillAllFields('Tetiana','Rudchenko','rudchenkosumy+1@gmail.com','','Theodosiana1');
        registration.selectors.buttonRegister().should('have.prop', 'disabled', true);
    });

    it('Test Repeat Password Field is Required', () => {
        registration.fillAllFields('Tetiana','Rudchenko','rudchenkosumy+1@gmail.com','Theodosiana1','');
        registration.selectors.buttonRegister().should('have.prop', 'disabled', true);
    });

    it('Test Successfull Registration', () => {
        const email = 'rudchenkosumy+' + Math.floor(Math.random() * 1000) + '@gmail.com';
        registration.fillAllFields('Tetiana','Rudchenko',email,'Theodosiana1','Theodosiana1');
        registration.clikcRegisterButton();
        registration.selectors.myProfileButton().should('exist');
    });
});