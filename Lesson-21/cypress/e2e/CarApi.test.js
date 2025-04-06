import { Garage, LoginPage, Expenses } from "../support/poms";
const loginPage = new LoginPage();
const garage = new Garage();
const expenses = new Expenses();

const myCar = {
    "id": null,
    "mileage": 12,
    "brand": "BMW",
    "model": "3"
};
const myExpense = {
    "carId": null,
    "reportedAt": "2025-04-06T00:00:00.000Z",
    "mileage": 15,
    "liters": 11,
    "totalCost": 22
};
  
describe('Car Api', () => {
      
    beforeEach(() => {
        cy.visit('');

        cy.intercept('POST', '/api/auth/signin').as('loginRequest');
        loginPage.executeLogin(Cypress.env('defaultUserEmail'), Cypress.env('defaultUserPassword'));
        cy.wait('@loginRequest');
    });

    it('Add car and catch response', function () {
        cy.intercept('POST', '/api/cars').as('createCar');
        garage.addCar(myCar.brand, myCar.model, myCar.mileage);
        cy.wait('@createCar').then(interceptedRequest => {
            myCar.id = interceptedRequest.response.body.data.id;
            cy.wrap(interceptedRequest.response.statusCode).as('responseStatusCode');
        });
        cy.get('@responseStatusCode').should('equal', 201);
        // console.log(this.responseStatusCode);
    });

    it('All cars contains created car', function () {
    
        cy.request('api/cars').then(response => {
            let carArray = response.body.data;
            let carFound = false;
            
            for (let i=0; i < carArray.length; i++) {
                if (carArray[i].id === myCar.id){
                    carFound = true;
                    break;
                }
            }

            expect(carFound).to.be.true;
        });

    });

    it('Add Expense via API', function () {
        myExpense.carId = myCar.id;
        cy.addExpense(myExpense).then(response => {
            expect(response.status).to.equal(200);
            const responseExpense = response.body.data;
            
            expect(responseExpense.carId).to.equal(myExpense.carId);
            expect(responseExpense.liters).to.equal(myExpense.liters);
            expect(responseExpense.mileage).to.equal(myExpense.mileage);
            expect(responseExpense.reportedAt).to.equal(myExpense.reportedAt);
            expect(responseExpense.totalCost).to.equal(myExpense.totalCost);
        });
    });

    it('Test expense in UI', function () {

        cy.visit(`/panel/expenses?carId=${myCar.id}`);

        expenses.selectors.expenseCells().eq(1).should('have.text', myExpense.mileage);
        expenses.selectors.expenseCells().eq(2).should('have.text', myExpense.liters+'L');
        expenses.selectors.expenseCells().eq(3).should('have.text', Number(myExpense.totalCost).toFixed(2)+' USD');
    });

        // it.skip('Get IDs of all cars in UI', function() {
        //     garage.selectors.carExist()
        //         .its('length')
        //         .then(count => {
        //           for (let index = 0; index < count; index++) {
        //             garage.selectors.carExist().eq(index).then(r => {
        //                 const carId = r.get(0).__ngContext__[22].id;
        //                 console.log(carId);
        //             })
                    
        //           }
        //         })

        // });
           
    after(() => {
        cy.request('api/cars').then(response => {
            let carArray = response.body.data;
            
            for (let i=0; i < carArray.length; i++) {
                cy.request('DELETE', 'api/cars/'+carArray[i].id);
            }
        }); 
    });
});