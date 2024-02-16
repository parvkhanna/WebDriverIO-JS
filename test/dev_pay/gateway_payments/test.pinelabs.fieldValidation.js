import * as config from '../../../config/config.js';
import ByjusPayPage from '../../../pages/gateway_payments_page/byjus.pay.page';
import {AllureUtil as allure} from '../../../utils/util.allure';

describe ('Verify field validation for pinelabs payment option', async () => {

    beforeEach('Open payment portal', async () => {
       allure.startStep('Open Byjus payment login page');
       await ByjusPayPage.openByjusPayPage();
       allure.startStep('Login to the payment page', true);
       await ByjusPayPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    })

    it('Validate field validations when submitted blank', async () => {
        allure.startStep('Click on the Pinelabs pay button');
        await ByjusPayPage.pinelabsBtn.click();
        allure.startStep('Click on submit button without entering any of the details', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the error message of customer name field to be displayed', true);
        await ByjusPayPage.getErrorMsgElement('customerName').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify the correct error message is displayed when Customer Name is submitted blank', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerName').getText()).toEqual('Customer Name is required');
        allure.startStep('Verify the correct error message is displayed when Customer phone is submitted blank', true);
        await expect(await ByjusPayPage.getErrorMsgElement('phone').getText()).toEqual('Mobile No is required');
        allure.startStep('Verify the correct error message is displayed when Amount field is submitted blank', true);
        await expect(await ByjusPayPage.getErrorMsgElement('amount').getText()).toEqual('Amount (Rs.) is required');
        allure.startStep('Verify the correct error message is displayed when Product name field is submitted blank', true);
        await expect(await ByjusPayPage.getErrorMsgElement('productinfo').getText()).toEqual('Product Name is required');
        allure.endStep();
     })

    it('Validate sales email id field is not editable', async () =>{
       allure.startStep('Click on the Pinelabs pay button');
       await ByjusPayPage.pinelabsBtn.click();
       allure.startStep('Verify that the email id field is not editable', true);
       await expect(await ByjusPayPage.tfSalesEmail).toBeDisabled();
       allure.endStep();
    })

    it('Validate the error message when mobile number entered is less than 10 digits', async () => {
       allure.startStep('Click on the Pinelabs pay button');
       await ByjusPayPage.pinelabsBtn.click();
       allure.startStep('Enter customer details with an mobile number less then 10 digits', true);
       await ByjusPayPage.enterDetailsToCompletePinelabsPayment('Auto User', config.invalidMobNumLessThanTenDigits, 45000 , 'Valid Product Name' , config.validEmailId);
       allure.startStep('Click on submit button', true);
       await ByjusPayPage.btnSubmit.click();
       allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
       await ByjusPayPage.getErrorMsgElement('phone').waitForDisplayed({timeout: 5000});
       allure.startStep('Verify that the correct error message for invalid mobile number is displayed', true);
       await expect(await ByjusPayPage.getErrorMsgElement('phone').getText()).toEqual('Enter valid phone number');
       allure.endStep();
    })

    it('Validate the error message when mobile number entered is greater than 10 digits', async () => {
        allure.startStep('Click on the Pinelabs pay button');
        await ByjusPayPage.pinelabsBtn.click();
        allure.startStep('Enter customer details with an mobile number greater then 10 digits', true);
        await ByjusPayPage.enterDetailsToCompletePinelabsPayment('Auto User', config.invalidMobNumMoreThanTenDigits, 45000 , 'Valid Product Name' , config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
        await ByjusPayPage.getErrorMsgElement('phone').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify that the correct error message for invalid mobile number is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('phone').getText()).toEqual('Enter valid phone number');
        allure.endStep();
    })

    it('Validate error message when amount field submitted blank', async () => {
        allure.startStep('Click on the Pinelabs pay button');
        await ByjusPayPage.pinelabsBtn.click();
        allure.startStep('Enter customer details with amount field submitted blank', true);
        await ByjusPayPage.enterDetailsToCompletePinelabsPayment('Auto User', process.env.VALID_MOBILE_NUM_PINELABS, '' , 'Valid Product Name' , config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the error message of amount field when submitted blank to be displayed', true);
        await ByjusPayPage.getErrorMsgElement('amount').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify that the correct error message of amount field is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('amount').getText()).toEqual('Amount (Rs.) is required');
        allure.endStep();
    })

    it('Validate product name field should have atleast 5 characters', async () => {
        allure.startStep('Click on the Pinelabs pay button');
        await ByjusPayPage.pinelabsBtn.click();
        allure.startStep('Enter customer details in which product name field has less then 5 characters ', true);
        await ByjusPayPage.enterDetailsToCompletePinelabsPayment('Auto User', process.env.VALID_MOBILE_NUM_PINELABS, 38000 , 'Prod' , config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the error message of product name field when submitted with less then 5 characters to be displayed', true);
        await ByjusPayPage.getErrorMsgElement('productinfo').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify that the correct error message of product name field is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('productinfo').getText()).toEqual('Please enter the valid min 5 digit productinfo description');
        allure.endStep();
    })

    it('Validate error message when product name field submitted blank', async () => {
        allure.startStep('Click on the Pinelabs pay button');
        await ByjusPayPage.pinelabsBtn.click();
        allure.startStep('Enter customer details with product name field submitted blank', true);
        await ByjusPayPage.enterDetailsToCompletePinelabsPayment('Auto User', process.env.VALID_MOBILE_NUM_PINELABS, 40000 , '' , config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the error message of product name field when submitted blank to be displayed', true);
        await ByjusPayPage.getErrorMsgElement('productinfo').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify that the correct error message of product name field is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('productinfo').getText()).toEqual('Product Name is required');
        allure.endStep();
    })
})
