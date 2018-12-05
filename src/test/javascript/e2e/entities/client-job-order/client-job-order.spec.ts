/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClientComponentsPage, ClientDeleteDialog, ClientUpdatePage } from './client-job-order.page-object';

const expect = chai.expect;

describe('Client e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let clientUpdatePage: ClientUpdatePage;
    let clientComponentsPage: ClientComponentsPage;
    let clientDeleteDialog: ClientDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Clients', async () => {
        await navBarPage.goToEntity('client-job-order');
        clientComponentsPage = new ClientComponentsPage();
        expect(await clientComponentsPage.getTitle()).to.eq('prestozoomApp.client.home.title');
    });

    it('should load create Client page', async () => {
        await clientComponentsPage.clickOnCreateButton();
        clientUpdatePage = new ClientUpdatePage();
        expect(await clientUpdatePage.getPageTitle()).to.eq('prestozoomApp.client.home.createOrEditLabel');
        await clientUpdatePage.cancel();
    });

    it('should create and save Clients', async () => {
        const nbButtonsBeforeCreate = await clientComponentsPage.countDeleteButtons();

        await clientComponentsPage.clickOnCreateButton();
        await promise.all([
            clientUpdatePage.setFirstNameInput('firstName'),
            clientUpdatePage.setLastNameInput('lastName'),
            clientUpdatePage.setEmailInput('email'),
            clientUpdatePage.setPhoneNumberInput('phoneNumber')
        ]);
        expect(await clientUpdatePage.getFirstNameInput()).to.eq('firstName');
        expect(await clientUpdatePage.getLastNameInput()).to.eq('lastName');
        expect(await clientUpdatePage.getEmailInput()).to.eq('email');
        expect(await clientUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber');
        await clientUpdatePage.save();
        expect(await clientUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Client', async () => {
        const nbButtonsBeforeDelete = await clientComponentsPage.countDeleteButtons();
        await clientComponentsPage.clickOnLastDeleteButton();

        clientDeleteDialog = new ClientDeleteDialog();
        expect(await clientDeleteDialog.getDialogTitle()).to.eq('prestozoomApp.client.delete.question');
        await clientDeleteDialog.clickOnConfirmButton();

        expect(await clientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
