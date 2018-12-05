/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    ServiceRequestComponentsPage,
    ServiceRequestDeleteDialog,
    ServiceRequestUpdatePage
} from './service-request-job-order.page-object';

const expect = chai.expect;

describe('ServiceRequest e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let serviceRequestUpdatePage: ServiceRequestUpdatePage;
    let serviceRequestComponentsPage: ServiceRequestComponentsPage;
    let serviceRequestDeleteDialog: ServiceRequestDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ServiceRequests', async () => {
        await navBarPage.goToEntity('service-request-job-order');
        serviceRequestComponentsPage = new ServiceRequestComponentsPage();
        expect(await serviceRequestComponentsPage.getTitle()).to.eq('prestozoomApp.serviceRequest.home.title');
    });

    it('should load create ServiceRequest page', async () => {
        await serviceRequestComponentsPage.clickOnCreateButton();
        serviceRequestUpdatePage = new ServiceRequestUpdatePage();
        expect(await serviceRequestUpdatePage.getPageTitle()).to.eq('prestozoomApp.serviceRequest.home.createOrEditLabel');
        await serviceRequestUpdatePage.cancel();
    });

    it('should create and save ServiceRequests', async () => {
        const nbButtonsBeforeCreate = await serviceRequestComponentsPage.countDeleteButtons();

        await serviceRequestComponentsPage.clickOnCreateButton();
        await promise.all([
            serviceRequestUpdatePage.serviceSelectLastOption(),
            serviceRequestUpdatePage.setAmountInput('5'),
            serviceRequestUpdatePage.setStartTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            serviceRequestUpdatePage.setEndTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            serviceRequestUpdatePage.invoiceSelectLastOption(),
            serviceRequestUpdatePage.jobOrderSelectLastOption(),
            serviceRequestUpdatePage.clientLocationSelectLastOption(),
            serviceRequestUpdatePage.cartNoSelectLastOption()
        ]);
        expect(await serviceRequestUpdatePage.getAmountInput()).to.eq('5');
        expect(await serviceRequestUpdatePage.getStartTimeInput()).to.contain('2001-01-01T02:30');
        expect(await serviceRequestUpdatePage.getEndTimeInput()).to.contain('2001-01-01T02:30');
        await serviceRequestUpdatePage.save();
        expect(await serviceRequestUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await serviceRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ServiceRequest', async () => {
        const nbButtonsBeforeDelete = await serviceRequestComponentsPage.countDeleteButtons();
        await serviceRequestComponentsPage.clickOnLastDeleteButton();

        serviceRequestDeleteDialog = new ServiceRequestDeleteDialog();
        expect(await serviceRequestDeleteDialog.getDialogTitle()).to.eq('prestozoomApp.serviceRequest.delete.question');
        await serviceRequestDeleteDialog.clickOnConfirmButton();

        expect(await serviceRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
