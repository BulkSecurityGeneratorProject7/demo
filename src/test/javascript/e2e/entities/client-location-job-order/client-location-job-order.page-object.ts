import { element, by, ElementFinder } from 'protractor';

export class ClientLocationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-client-location-job-order div table .btn-danger'));
    title = element.all(by.css('jhi-client-location-job-order div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ClientLocationUpdatePage {
    pageTitle = element(by.id('jhi-client-location-job-order-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    streetAddressInput = element(by.id('field_streetAddress'));
    postalCodeInput = element(by.id('field_postalCode'));
    cityInput = element(by.id('field_city'));
    stateProvinceInput = element(by.id('field_stateProvince'));
    clientSelect = element(by.id('field_client'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setStreetAddressInput(streetAddress) {
        await this.streetAddressInput.sendKeys(streetAddress);
    }

    async getStreetAddressInput() {
        return this.streetAddressInput.getAttribute('value');
    }

    async setPostalCodeInput(postalCode) {
        await this.postalCodeInput.sendKeys(postalCode);
    }

    async getPostalCodeInput() {
        return this.postalCodeInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setStateProvinceInput(stateProvince) {
        await this.stateProvinceInput.sendKeys(stateProvince);
    }

    async getStateProvinceInput() {
        return this.stateProvinceInput.getAttribute('value');
    }

    async clientSelectLastOption() {
        await this.clientSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async clientSelectOption(option) {
        await this.clientSelect.sendKeys(option);
    }

    getClientSelect(): ElementFinder {
        return this.clientSelect;
    }

    async getClientSelectedOption() {
        return this.clientSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ClientLocationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-clientLocation-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-clientLocation'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
