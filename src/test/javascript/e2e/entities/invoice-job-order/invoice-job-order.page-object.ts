import { element, by, ElementFinder } from 'protractor';

export class InvoiceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-invoice-job-order div table .btn-danger'));
    title = element.all(by.css('jhi-invoice-job-order div h2#page-heading span')).first();

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

export class InvoiceUpdatePage {
    pageTitle = element(by.id('jhi-invoice-job-order-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    amountInput = element(by.id('field_amount'));
    paymentSelect = element(by.id('field_payment'));
    serviceRequestSelect = element(by.id('field_serviceRequest'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setAmountInput(amount) {
        await this.amountInput.sendKeys(amount);
    }

    async getAmountInput() {
        return this.amountInput.getAttribute('value');
    }

    async setPaymentSelect(payment) {
        await this.paymentSelect.sendKeys(payment);
    }

    async getPaymentSelect() {
        return this.paymentSelect.element(by.css('option:checked')).getText();
    }

    async paymentSelectLastOption() {
        await this.paymentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async serviceRequestSelectLastOption() {
        await this.serviceRequestSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async serviceRequestSelectOption(option) {
        await this.serviceRequestSelect.sendKeys(option);
    }

    getServiceRequestSelect(): ElementFinder {
        return this.serviceRequestSelect;
    }

    async getServiceRequestSelectedOption() {
        return this.serviceRequestSelect.element(by.css('option:checked')).getText();
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

export class InvoiceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-invoice-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-invoice'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
