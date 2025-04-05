import { Garage, LoginPage, Expenses } from "../support/poms";
const loginPage = new LoginPage();
const garage = new Garage();
const expenses = new Expenses();

describe('Add Car', () => {
    
    beforeEach(() => {
        cy.visit('', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        });

        loginPage.executeLogin(Cypress.env('defaultUserEmail'), Cypress.env('defaultUserPassword'));
        cy.wait(2000);       
    });

   
    it( 'Add Car', () => {
        garage.addCar('Audi', 'TT', '12');
        garage.selectors.carExist().should('exist');
    });

    it( 'Add Fuel Expenses', () => {

        garage.addCar('Audi', 'TT', '12');

        expenses.addFuelExpenses('13', '15', '30');

        expenses.selectors.fuelExpensesTab().should('have.class', 'btn header-link -active');
        expenses.selectors.expenseCells().eq(1).should('have.text', '13');
        expenses.selectors.expenseCells().eq(2).should('have.text', '15L');

        if (Cypress.env("env") === "prod") {
            expenses.selectors.expenseCells().eq(3).should('have.text', '30 USD');
        } else {
            expenses.selectors.expenseCells().eq(3).should('have.text', '30.00 USD');
        }
    });

    afterEach(() => {
        garage.removeCar();  
    });
});