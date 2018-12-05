/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    ServiceRequestCartComponentsPage,
    ServiceRequestCartDeleteDialog,
    ServiceRequestCartUpdatePage
} from './service-request-cart-job-order.page-object';

const expect = chai.expect;

describe('ServiceRequestCart e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let serviceRequestCartUpdatePage: ServiceRequestCartUpdatePage;
    let serviceRequestCartComponentsPage: ServiceRequestCartComponentsPage;
    let serviceRequestCartDeleteDialog: ServiceRequestCartDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ServiceRequestCarts', async () => {
        await navBarPage.goToEntity('service-request-cart-job-order');
        serviceRequestCartComponentsPage = new ServiceRequestCartComponentsPage();
        expect(await serviceRequestCartComponentsPage.getTitle()).to.eq('prestozoomApp.serviceRequestCart.home.title');
    });

    it('should load create ServiceRequestCart page', async () => {
        await serviceRequestCartComponentsPage.clickOnCreateButton();
        serviceRequestCartUpdatePage = new ServiceRequestCartUpdatePage();
        expect(await serviceRequestCartUpdatePage.getPageTitle()).to.eq('prestozoomApp.serviceRequestCart.home.createOrEditLabel');
        await serviceRequestCartUpdatePage.cancel();
    });

    it('should create and save ServiceRequestCarts', async () => {
        const nbButtonsBeforeCreate = await serviceRequestCartComponentsPage.countDeleteButtons();

        await serviceRequestCartComponentsPage.clickOnCreateButton();
        await promise.all([
            serviceRequestCartUpdatePage.setDescriptionInput('description'),
            serviceRequestCartUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
        ]);
        expect(await serviceRequestCartUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await serviceRequestCartUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        await serviceRequestCartUpdatePage.save();
        expect(await serviceRequestCartUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await serviceRequestCartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ServiceRequestCart', async () => {
        const nbButtonsBeforeDelete = await serviceRequestCartComponentsPage.countDeleteButtons();
        await serviceRequestCartComponentsPage.clickOnLastDeleteButton();

        serviceRequestCartDeleteDialog = new ServiceRequestCartDeleteDialog();
        expect(await serviceRequestCartDeleteDialog.getDialogTitle()).to.eq('prestozoomApp.serviceRequestCart.delete.question');
        await serviceRequestCartDeleteDialog.clickOnConfirmButton();

        expect(await serviceRequestCartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
