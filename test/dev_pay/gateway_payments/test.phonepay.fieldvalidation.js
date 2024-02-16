import * as config from '../../../config/config.js';
import ByjusPayPage from '../../../pages/gateway_payments_page/byjus.pay.page';
import {AllureUtil as allure} from '../../../utils/util.allure';

describe('Verify field validation for phonepay payment option', async () => {
    beforeEach('Open payment portal', async () => {
        allure.startStep('Open Byjus payment login page');
        await ByjusPayPage.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await ByjusPayPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    })
    it('Validate field validations when submitted blank', async ()=>{
        allure.startStep('Click on the Phonepay button pay button');
        await ByjusPayPage.phonePayBtn.click();
        allure.startStep('Click on submit button without entering any of the details on the page', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for an error message for Customer Name to appear', true);
        await ByjusPayPage.getErrorMsgEleUsingDispText('Customer Name').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify the correct error message is displayed for the invalid Customer Name', true);
        await expect(await ByjusPayPage.getErrorMsgEleUsingDispText('Customer Name').getText()).toEqual('Customer Name is required');
        allure.startStep('Verify the correct error message is displayed for the invalid Customer Phone', true);
        await expect(await ByjusPayPage.getErrorMsgEleUsingDispText('Customer Phone').getText()).toEqual('Customer Phone is required');
        allure.startStep('Verify the correct error message is displayed for Amount', true);
        await expect(await ByjusPayPage.getErrorMsgEleUsingDispText('Amount').getText()).toEqual('Amount is required');
        allure.startStep('Verify the correct error message is displayed for Course description', true);
        await expect(await ByjusPayPage.getErrorMsgEleUsingDispText('Description').getText()).toEqual('Description is required');
        allure.endStep();
    })
    it('Validate email id field is not editable', async ()=>{
        allure.startStep('Click on the Phonepay button');
        await ByjusPayPage.phonePayBtn.click();
        allure.startStep('Verify that the sales email field is not editable', true);
        await expect(await ByjusPayPage.tfSalesEmail).toBeDisabled();
        allure.endStep();
    })
    it('Validate customer name accepts min 4 characters', async ()=>{
        allure.startStep('Verify if phonepay transaction id is generated with a valid 4 character customer name');
        await ByjusPayPage.generatePhonepayTransactionId('Auto', process.env.VALID_MOBILE_NUM_PHONEPE, 'Valid Course', 20000);
        allure.endStep();
    })
    it('Validate the Customer Phone should accept 10 digits', async ()=>{
        allure.startStep('Click on the Phonepay button');
        await ByjusPayPage.phonePayBtn.click();
        allure.startStep('Enter customer details with an valid 10 digit mobile number', true);
        await ByjusPayPage.enterDetailsToCompleteGpayPhonepayPayment('Auto User', process.env.VALID_MOBILE_NUM_PHONEPE, 'Valid Course', 30000);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.endStep();
    })
    it('Validate error messages for greater than 10 digits', async ()=>{
        allure.startStep('Click on the Phonepay button');
        await ByjusPayPage.phonePayBtn.click();
        allure.startStep('Enter customer details with an invalid grater than 10 digit mobile number', true);
        await ByjusPayPage.enterDetailsToCompleteGpayPhonepayPayment('Auto User', config.invalidMobNumMoreThanTenDigits, 'Valid Course', 30000);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
        await ByjusPayPage.getErrorMsgEleUsingDispText('Customer Phone').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify that the correct error message for invalid mobile number entered is displayed', true);
        await expect('Enter valid Customer Phone Number').toEqual(await ByjusPayPage.getErrorMsgEleUsingDispText('Customer Phone').getText());
        allure.endStep();
    })
    it('Validate error messages for less than 10 digits', async ()=>{
        allure.startStep('Click on the Phonepay button');
        await ByjusPayPage.phonePayBtn.click();
        allure.startStep('Enter customer details with an invalid less than 10 digits mobile number', true);
        await ByjusPayPage.enterDetailsToCompleteGpayPhonepayPayment('Auto User', config.invalidMobNumLessThanTenDigits, 'Valid Course', 30000);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
        await ByjusPayPage.getErrorMsgEleUsingDispText('Customer Phone').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify that the correct error message for invalid mobile number entered is displayed', true);
        await expect('Enter valid Customer Phone Number').toEqual(await ByjusPayPage.getErrorMsgEleUsingDispText('Customer Phone').getText());
        allure.endStep();
    })
    it('Validate desciption field accepts min 5 characters', async ()=>{
        allure.startStep('Verify if Phonepay transaction id is generated with a valid 5 character course description');
        await ByjusPayPage.generatePhonepayTransactionId('Auto User', process.env.VALID_MOBILE_NUM_PHONEPE, 'Valid', 15000);
        allure.endStep();
    })

})
