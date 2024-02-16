import * as config from '../../../config/config.js';
import ByjusPayPage from '../../../pages/gateway_payments_page/byjus.pay.page';
import {AllureUtil as allure} from '../../../utils/util.allure';

describe('Verify field validation for shopse payment option', async () => {
    beforeEach('Open payment portal', async () => {
        allure.startStep('Open Byjus payment login page');
        await ByjusPayPage.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await ByjusPayPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    })
    it('Validate error message when submitted blank', async ()=>{
        allure.startStep('Click on the Shopse pay button');
        await ByjusPayPage.shopsebtn.click();
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Verify that the correct error message for required customer name is displayed', true);
        await ByjusPayPage.getErrorMsgElement('customerPhone').waitForDisplayed({timeout: 5000});
        await expect(await ByjusPayPage.getErrorMsgElement('customerName').getText()).toEqual('Customer Name is required');
        allure.startStep('Verify that the correct error message for required customer phone number is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerPhone').getText()).toEqual('Customer Phone is required');
        allure.startStep('Verify that the correct error message for required amount is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('amount').getText()).toEqual('Amount is required');
        allure.startStep('Verify that the correct error message for required customer email address is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerEmail').getText()).toEqual('Customer Email is required');
        allure.endStep();
    })
    it('Validate email id field is not editable', async ()=>{
        allure.startStep('Click on the Shopse pay button');
        await ByjusPayPage.shopsebtn.click();
        allure.startStep('Verify that sales email element is not editable', true);
        await expect(await ByjusPayPage.tfSalesEmail).toBeDisabled();
        allure.endStep();
    })
    it('Validate customer name accepts min 4 characters', async ()=>{
        allure.startStep('Verify weather customer name accepts min 4 characters');
        await ByjusPayPage.generateShopseTransactionId('Auto', process.env.VALID_MOBILE_NUM_SHOPSE, 'Valid Course', 20000, config.validEmailId);
        allure.endStep();
    })
    it('Validate error message when amount is less than 3000', async ()=>{
        allure.startStep('Click on the Shopse pay button');
        await ByjusPayPage.shopsebtn.click();
        allure.startStep('Enter customer details with amount less than 3000', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('Auto User', process.env.VALID_MOBILE_NUM_SHOPSE, 'Course', 290,config.validEmailId);
        var amountErrorNotificationElement = await ByjusPayPage.notificationNotice;
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the invalid error message for amount between 3000 to 500000 to be displayed', true);
        await amountErrorNotificationElement.waitForDisplayed({timeout: 10000});
        allure.startStep('Verify that the correct error message for amount between 3000 to 500000 is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('amount').getText()).toEqual('please enter amount between 3000 to 500000');
        allure.endStep();
    })
    it('Validate error message when amount exceed 500000', async ()=>{
        allure.startStep('Click on the Shopse pay button');
        await ByjusPayPage.shopsebtn.click();
        allure.startStep('Enter customer details with amount more than 500000', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('Auto User', process.env.VALID_MOBILE_NUM_SHOPSE, 'Course', 5000000,config.validEmailId);
        var amountErrorNotificationElement = await ByjusPayPage.notificationNotice;
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the invalid error message for amount between 3000 to 500000 to be displayed', true);
        await amountErrorNotificationElement.waitForDisplayed({timeout: 10000});
        allure.startStep('Verify that the correct error message for amount between 3000 to 500000 is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('amount').getText()).toEqual('please enter amount between 3000 to 500000');
        allure.endStep();
    })
    it('Create a shopse transcation id with a invalid and valid email address', async ()=>{
        allure.startStep('Click on the Shopse pay button');
        await ByjusPayPage.shopsebtn.click();
        allure.startStep('Enter customer details with invalid email address', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('Auto User', process.env.VALID_MOBILE_NUM_SHOPSE, 'Valid Course', 20000,config.invalidEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        var amountErrorNotificationElement = await ByjusPayPage.notificationNotice;
        allure.startStep('Wait for the error message for invalid email address to be displayed', true);
        await amountErrorNotificationElement.waitForDisplayed({timeout: 10000});
        allure.startStep('Verify that the correct error message for invalid email address is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerEmail').getText()).toEqual('Enter valid Email');
        allure.startStep('Open Byjus payment login page', true);
        await ByjusPayPage.openByjusPayPage();
        allure.startStep('Click on the Shopse pay button', true);
        await ByjusPayPage.shopsebtn.waitForExist({timeout:60000})
        allure.startStep('Verify valid email address is accepted', true);
        await ByjusPayPage.generateShopseTransactionId('Auto User', process.env.VALID_MOBILE_NUM_SHOPSE, 'Valid Course', 20000,config.validEmailId);
        allure.endStep();
    })
    it('Create a shopse transcation id with a invalid and valid phone number', async ()=>{
        allure.startStep('Click on the Shopse pay button');
        await ByjusPayPage.shopsebtn.click();
        allure.startStep('Enter customer details with invalid phone number', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('Auto User', config.invalidMobNumMoreThanTenDigits, 'Valid Course', 20000,config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        var amountErrorNotificationElement = await ByjusPayPage.notificationNotice;
        allure.startStep('Wait for the error message for invalid phone number to be displayed', true);
        await amountErrorNotificationElement.waitForDisplayed({timeout: 10000});
        allure.startStep('Verify that the correct error message for invalid phone number is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerPhone').getText()).toEqual('Enter valid Customer Phone Number');
        allure.startStep('Open Byjus payment login page', true);
        await ByjusPayPage.openByjusPayPage();
        allure.startStep('Click on the Shopse pay button', true);
        await ByjusPayPage.shopsebtn.waitForExist({timeout:60000})
        allure.startStep('Verify valid phone number is accepted', true);
        await ByjusPayPage.generateShopseTransactionId('Auto User', process.env.VALID_MOBILE_NUM_SHOPSE, 'Valid Course', 20000,config.validEmailId);
        allure.endStep();
    })
    it('Check weather Send Link To Customer button working or not', async ()=>{
        allure.startStep('Verify Send Link To Customer button is working');
        let transactionId = await ByjusPayPage.generateShopseTransactionId('Auto', process.env.VALID_MOBILE_NUM_SHOPSE, 'Valid Course', 20000, config.validEmailId);
        allure.endStep();
    })
    it('Check weather Cancel Transaction button working or not', async ()=>{
        allure.startStep('Click on the Shopse pay button');
        await ByjusPayPage.shopsebtn.click();
        allure.startStep('Enter customer details with valid details', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('Auto User', process.env.VALID_MOBILE_NUM_SHOPSE, 'Valid Course', 20000,config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Click on Cancel Transaction button', true);
        await ByjusPayPage.btnCancelTransaction.click();
        await browser.pause(1000);
        allure.startStep('Verify Cancel Transaction button is working');
        await expect(await ByjusPayPage.tfCustomerName.isClickable()).toEqual(true);
        allure.endStep();
    })
    it('Validate the reset button', async ()=>{
        allure.startStep('Click on the Shopse pay button');
        await ByjusPayPage.shopsebtn.click();
        allure.startStep('Enter customer details with valid details', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('Auto User', process.env.VALID_MOBILE_NUM_SHOPSE, 'Valid Course', 20000,config.validEmailId);
        allure.startStep('Click on Reset button', true);
        await ByjusPayPage.btnReset.click();
        allure.startStep('Verify that after click on the reset button the customer name input field is blank', true);
        await expect(await ByjusPayPage.tfCustomerName.getValue()).toEqual('');
        allure.startStep('Verify that after click on the reset button the customer number input field is blank', true);
        await expect(await ByjusPayPage.tfCustomerPhone.getValue()).toEqual('');
        allure.startStep('Verify that after click on the reset button the amount input field is blank', true);
        await expect(await ByjusPayPage.tfAmount.getValue()).toEqual('');
        allure.startStep('Verify that after click on the reset button the courese description field is blank', true);
        await expect(await ByjusPayPage.descriptionField.getValue()).toEqual('');
        allure.startStep('Verify that after click on the reset button the customer email field is blank', true);
        await expect(await ByjusPayPage.tfCustomerEmail.getValue()).toEqual('');
        allure.endStep();
    })
})
