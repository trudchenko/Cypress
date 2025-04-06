export default class Garage {
    selectors = {
        buttoAddCar: () => cy.contains('button','Add car'),
        selectBrand: () => cy.get('#addCarBrand'),
        selectModel: () => cy.get('#addCarModel'),
        inputMileage: () => cy.get('input#addCarMileage'),
        buttonAdd: () => cy.get('div.modal-footer').find('.btn-primary'),
        buttonEdit: () => cy.get('button.car_edit'),
        buttonRemoveCar: () => cy.contains('button','Remove car'),
        carExist: () => cy.get('li.car-item'),
        buttonRemove: () => cy.get('app-remove-car-modal').contains('button','Remove'),
        garageTab: () => cy.contains('a','Garage')
    }

    addCar(brandId, model, mileage) {
        this.selectors.buttoAddCar().click();
        this.selectors.selectBrand().select(brandId);
        this.selectors.selectModel().select(model);
        this.selectors.inputMileage().type(mileage);
        this.selectors.buttonAdd().click();
    }

    removeCar() {
        this.selectors.garageTab().click();
        this.selectors.buttonEdit().eq(0).click();
        this.selectors.buttonRemoveCar().click();
        this.selectors.buttonRemove().click();     
    } 
}