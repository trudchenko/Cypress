export default class LoginPage {

    get signInButton() {
        return cy.get('button.header_signin');
    }

    get signInFormEmailInput() {
        return cy.get('#signinEmail');
    }

    get signInFormPasswordInput() {
        return cy.get('#signinPassword');
    }

    get signInFormSignInButton() {
        return cy.contains('button', 'Login');
    }

    get myProfileButton() {
        return cy.get('button#userNavDropdown');
    }

    executeLogin(email, password) {
        this.signInButton.click();
        this.signInFormEmailInput.type(email);
        this.signInFormPasswordInput.type(password, { sensitive: true });
        this.signInFormSignInButton.click();
    }

    executeLoginCustomCommand(email, password) {
        cy.login(email, password);
    }
}