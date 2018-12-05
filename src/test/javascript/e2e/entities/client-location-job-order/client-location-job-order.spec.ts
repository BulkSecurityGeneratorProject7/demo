/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    ClientLocationComponentsPage,
    ClientLocationDeleteDialog,
    ClientLocationUpdatePage
} from './client-location-job-order.page-object';

const expect = chai.expect;

describe('ClientLocation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let clientLocationUpdatePage: ClientLocationUpdatePage;
    let clientLocationComponentsPage: ClientLocationComponentsPage;
    let clientLocationDeleteDialog: ClientLocationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ClientLocations', async () => {
        await navBarPage.goToEntity('client-location-job-order');
        clientLocationComponentsPage = new ClientLocationComponentsPage();
        expect(await clientLocationComponentsPage.getTitle()).to.eq('prestozoomApp.clientLocation.home.title');
    });

    it('should load create ClientLocation page', async () => {
        await clientLocationComponentsPage.clickOnCreateButton();
        clientLocationUpdatePage = new ClientLocationUpdatePage();
        expect(await clientLocationUpdatePage.getPageTitle()).to.eq('prestozoomApp.clientLocation.home.createOrEditLabel');
        await clientLocationUpdatePage.cancel();
    });

    it('should create and save ClientLocations', async () => {
        const nbButtonsBeforeCreate = await clientLocationComponentsPage.countDeleteButtons();

        await clientLocationComponentsPage.clickOnCreateButton();
        await promise.all([
            clientLocationUpdatePage.setStreetAddressInput('streetAddress'),
            clientLocationUpdatePage.setPostalCodeInput('postalCode'),
            clientLocationUpdatePage.setCityInput('city'),
            clientLocationUpdatePage.setStateProvinceInput('stateProvince'),
            clientLocationUpdatePage.clientSelectLastOption()
        ]);
        expect(await clientLocationUpdatePage.getStreetAddressInput()).to.eq('streetAddress');
        expect(await clientLocationUpdatePage.getPostalCodeInput()).to.eq('postalCode');
        expect(await clientLocationUpdatePage.getCityInput()).to.eq('city');
        expect(await clientLocationUpdatePage.getStateProvinceInput()).to.eq('stateProvince');
        await clientLocationUpdatePage.save();
        expect(await clientLocationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await clientLocationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ClientLocation', async () => {
        const nbButtonsBeforeDelete = await clientLocationComponentsPage.countDeleteButtons();
        await clientLocationComponentsPage.clickOnLastDeleteButton();

        clientLocationDeleteDialog = new ClientLocationDeleteDialog();
        expect(await clientLocationDeleteDialog.getDialogTitle()).to.eq('prestozoomApp.clientLocation.delete.question');
        await clientLocationDeleteDialog.clickOnConfirmButton();

        expect(await clientLocationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
