export default class Expenses {
    selectors = {
        buttoAddAddEfuelExpenses: () => cy.contains('button','Add fuel expense'),
        inputExpenses: () => cy.get('input#addExpenseLiters'),
        inputTotalCost: () => cy.get('input#addExpenseTotalCost'),
        buttonAdd: () => cy.get('div.modal-footer').find('.btn-primary'),
        inputNewMileage: () => cy.get('input#addExpenseMileage'),
        fuelExpensesTab: () => cy.contains('a','Fuel expenses'),
        expenseCells: () => cy.get('tbody').find('td')        
    }


    addFuelExpenses(newMileage, liters, totalCost) {
        this.selectors.buttoAddAddEfuelExpenses().click();
        this.selectors.inputNewMileage().clear().type(newMileage);
        this.selectors.inputExpenses().type(liters);
        this.selectors.inputTotalCost().type(totalCost);
        this.selectors.buttonAdd().click();
    }
}