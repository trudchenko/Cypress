import { LoginPage } from "../support/poms";
const loginPage = new LoginPage();

describe('Login checks', () => {
    
    beforeEach(() => {
        cy.visit('', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        
        })
    });

    it('Login', () => {
        loginPage.executeLogin('rudchenkosumy+276@gmail.com', 'Theodosiana1');
        loginPage.myProfileButton.should('exist');
    });

    it('Login Custom Command', () => {
        loginPage.executeLoginCustomCommand('rudchenkosumy+276@gmail.com', 'Theodosiana1');
        loginPage.myProfileButton.should('exist');
    });
});