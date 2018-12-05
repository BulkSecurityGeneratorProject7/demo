import { element, by, ElementFinder } from 'protractor';

export class ServiceRequestComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-service-request-job-order div table .btn-danger'));
    title = element.all(by.css('jhi-service-request-job-order div h2#page-heading span')).first();

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

export class ServiceRequestUpdatePage {
    pageTitle = element(by.id('jhi-service-request-job-order-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    serviceSelect = element(by.id('field_service'));
    amountInput = element(by.id('field_amount'));
    startTimeInput = element(by.id('field_startTime'));
    endTimeInput = element(by.id('field_endTime'));
    invoiceSelect = element(by.id('field_invoice'));
    jobOrderSelect = element(by.id('field_jobOrder'));
    clientLocationSelect = element(by.id('field_clientLocation'));
    cartNoSelect = element(by.id('field_cartNo'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setServiceSelect(service) {
        await this.serviceSelect.sendKeys(service);
    }

    async getServiceSelect() {
        return this.serviceSelect.element(by.css('option:checked')).getText();
    }

    async serviceSelectLastOption() {
        await this.serviceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setAmountInput(amount) {
        await this.amountInput.sendKeys(amount);
    }

    async getAmountInput() {
        return this.amountInput.getAttribute('value');
    }

    async setStartTimeInput(startTime) {
        await this.startTimeInput.sendKeys(startTime);
    }

    async getStartTimeInput() {
        return this.startTimeInput.getAttribute('value');
    }

    async setEndTimeInput(endTime) {
        await this.endTimeInput.sendKeys(endTime);
    }

    async getEndTimeInput() {
        return this.endTimeInput.getAttribute('value');
    }

    async invoiceSelectLastOption() {
        await this.invoiceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async invoiceSelectOption(option) {
        await this.invoiceSelect.sendKeys(option);
    }

    getInvoiceSelect(): ElementFinder {
        return this.invoiceSelect;
    }

    async getInvoiceSelectedOption() {
        return this.invoiceSelect.element(by.css('option:checked')).getText();
    }

    async jobOrderSelectLastOption() {
        await this.jobOrderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async jobOrderSelectOption(option) {
        await this.jobOrderSelect.sendKeys(option);
    }

    getJobOrderSelect(): ElementFinder {
        return this.jobOrderSelect;
    }

    async getJobOrderSelectedOption() {
        return this.jobOrderSelect.element(by.css('option:checked')).getText();
    }

    async clientLocationSelectLastOption() {
        await this.clientLocationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async clientLocationSelectOption(option) {
        await this.clientLocationSelect.sendKeys(option);
    }

    getClientLocationSelect(): ElementFinder {
        return this.clientLocationSelect;
    }

    async getClientLocationSelectedOption() {
        return this.clientLocationSelect.element(by.css('option:checked')).getText();
    }

    async cartNoSelectLastOption() {
        await this.cartNoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async cartNoSelectOption(option) {
        await this.cartNoSelect.sendKeys(option);
    }

    getCartNoSelect(): ElementFinder {
        return this.cartNoSelect;
    }

    async getCartNoSelectedOption() {
        return this.cartNoSelect.element(by.css('option:checked')).getText();
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

export class ServiceRequestDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-serviceRequest-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-serviceRequest'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
