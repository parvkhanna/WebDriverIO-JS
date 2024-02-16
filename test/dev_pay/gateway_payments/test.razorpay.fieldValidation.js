import * as config from '../../../config/config.js';
import ByjusPayPage from '../../../pages/gateway_payments_page/byjus.pay.page';
import {AllureUtil as allure} from '../../../utils/util.allure';



describe('Verify field validation for razor pay payment option', async () => {
    beforeEach('Open payment portal', async () => {
        allure.startStep('Open Byjus payment login page');
        await ByjusPayPage.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await ByjusPayPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    })
    it('Validate error message when submitted blank', async ()=>{
        allure.startStep('Click on the Razon pay button');
        await ByjusPayPage.razorPayBtn.click();
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for an error message for customer name to appear', true);
        await ByjusPayPage.getErrorMsgElement('customerName').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify the correct error message is displayed for the invalid Customer Name', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerName').getText()).toEqual('Customer Name is required');
        allure.startStep('Verify the correct error message is displayed for the invalid Customer Phone', true);
        await expect(await ByjusPayPage.getErrorMsgElement('phone').getText()).toEqual('Customer Phone is required');
        allure.startStep('Verify the correct error message is displayed for the invalid Amount', true);
        await expect(await ByjusPayPage.getErrorMsgElement('amount').getText()).toEqual('Amount is required');
        allure.startStep('Verify the correct error message is displayed for the invalid Course Descrption', true);
        await expect(await ByjusPayPage.getErrorMsgElement('course').getText()).toEqual('Description is required');
        allure.startStep('Verify the correct error message is displayed for the invalid Customer Email', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerEmail').getText()).toEqual('Customer Email is required');
        allure.endStep();
    })
    it('Validate sales email id field is not editable', async ()=>{
        allure.startStep('Click on the Razon pay button');
        await ByjusPayPage.razorPayBtn.click();
        allure.startStep('Verify that the sales email field is not editable', true);
        await expect(await ByjusPayPage.tfSalesEmail).toBeDisabled();
        allure.endStep();
    })
    it('Validate the Customer Name field should accept min 5 characters', async ()=>{
        allure.startStep('Click on the Razon pay button');
        await ByjusPayPage.razorPayBtn.click();
        allure.startStep('Enter min 5 charactors customer name and other details on customer details page', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('Test', process.env.VALID_MOBILE_NUM_RAZORPAY, 'Valid Course', 30000, config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for an error message for customer name to appear', true);
        await ByjusPayPage.getErrorMsgElement('customerName').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify the correct error message is displayed for the invalid Customer Name', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerName').getText()).toEqual('Enter valid min 5 characters Customer Name');
        allure.endStep();
    })
    it('Validate the amount field, It should not accept the 0', async ()=>{
        allure.startStep('Click on the Razon pay button');
        await ByjusPayPage.razorPayBtn.click();
        allure.startStep('Enter 0 amount and other details on customer details page', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('TestAuto', process.env.VALID_MOBILE_NUM_RAZORPAY, 'Valid Course', 0, config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for an error message for amount to appear', true);
        await ByjusPayPage.getErrorMsgElement('amount').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify the correct error message is displayed for the invalid Amount', true);
        await expect(await ByjusPayPage.getErrorMsgElement('amount').getText()).toEqual('Enter valid Amount');
        allure.endStep();
    })
    it('Validate the Customer Email field has no validations', async ()=>{
        allure.startStep('Verify if gpay transaction id is generated with a valid 5 character course description');
        await ByjusPayPage.generateRazorPayTransactionId('TestAuto', process.env.VALID_MOBILE_NUM_RAZORPAY, 'Valid Course', 3000, config.validEmailId);
        allure.endStep();
    })
    it('Validate the Customer Phone should accept 10 digits', async ()=>{
        allure.startStep('Click on the Razon pay button');
        await ByjusPayPage.razorPayBtn.click();
        allure.startStep('Enter 10 digit mobile number and other details on customer details page', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('TestAuto', process.env.VALID_MOBILE_NUM_RAZORPAY, 'Valid Course', 3000, config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.endStep();
    })
    it('Validate error messages for greater than 10 digits', async ()=>{
        allure.startStep('Click on the Razon pay button');
        await ByjusPayPage.razorPayBtn.click();
        allure.startStep('Enter greater than 10 digit mobile number and other details on customer details page', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('TestAuto', config.invalidMobNumMoreThanTenDigits, 'Valid Course', 3000, config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for an error message for phone to appear', true);
        await ByjusPayPage.getErrorMsgElement('phone').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify the correct error message is displayed for the invalid Mobile number', true);
        await expect(await ByjusPayPage.getErrorMsgElement('phone').getText()).toEqual('Enter valid Customer Phone Number');
        allure.endStep();
    })
    it('Validate error messages for less than 10 digits', async ()=>{
        allure.startStep('Click on the Razon pay button');
        await ByjusPayPage.razorPayBtn.click();
        allure.startStep('Enter less than 10 digit mobile number and other details on customer details page', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('TestAuto', config.invalidMobNumLessThanTenDigits, 'Valid Course', 0, config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for an error message for phone to appear', true);
        await ByjusPayPage.getErrorMsgElement('phone').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify the correct error message is displayed for the invalid Mobile number', true);
        await expect(await ByjusPayPage.getErrorMsgElement('phone').getText()).toEqual('Enter valid Customer Phone Number');
        allure.endStep();
    })
    it('Validate course Description should have at least 5 characters', async ()=>{
        allure.startStep('Click on the Razon pay button');
        await ByjusPayPage.razorPayBtn.click();
        allure.startStep('Enter less than 10 digit mobile number and other details on customer details page', true);
        await ByjusPayPage.enterDetailsToCompleteRazorPayShopsePayment('TestAuto', process.env.VALID_MOBILE_NUM_RAZORPAY, 'Test', 30000, config.validEmailId);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for an error message for course to appear', true);
        await ByjusPayPage.getErrorMsgElement('course').waitForDisplayed({timeout: 5000});
        allure.startStep('Verify the correct error message is displayed for the invalid Course Description', true);
        await expect(await ByjusPayPage.getErrorMsgElement('course').getText()).toEqual('Course Description should have at least 5 characters');
        allure.endStep();
    })
})
