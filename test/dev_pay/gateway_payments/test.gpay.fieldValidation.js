import * as config from '../../../config/config.js';
import ByjusPayPage from '../../../pages/gateway_payments_page/byjus.pay.page';
import {AllureUtil as allure} from '../../../utils/util.allure';

describe('Verify field validation for gpay payment option', async () => {
    beforeEach('Open payment portal', async () => {
        allure.startStep('Open Byjus payment login page');
        await ByjusPayPage.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await ByjusPayPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    })

    it('Create a gpay transcation id with a valid mobile number', async () => {
        allure.startStep('Verify if gpay transaction id is generated with a valid mobile number');
        await ByjusPayPage.generateGpayTransactionId('Auto User', process.env.VALID_MOBILE_NUM_GPAY, 'Valid Course', 20000);
        allure.endStep();
    })

    it('Validate error message for invalid mobile number', async () => {
        allure.startStep('Click on the Gpay pay button');
        await ByjusPayPage.gpaybtn.click();
        allure.startStep('Enter customer details with an invalid mobile number', true);
        await ByjusPayPage.enterDetailsToCompleteGpayPhonepayPayment('Auto User', config.invalidMobNumMoreThanTenDigits, 'Valid Course', 30000);
        allure.startStep('Click on submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
        await ByjusPayPage.getErrorMsgElement('customerPhone').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify that the correct error message for invalid mobile number entered is displayed', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerPhone').getText()).toEqual('Enter valid Customer Phone Number');
        allure.endStep();
    })  

    it('Create gpay transaction with duplicate mobile number and verify no error displayed', async () => {
        allure.startStep('Verify if gpay transaction id is generated with a valid mobile number');
        await ByjusPayPage.generateGpayTransactionId('Auto User', process.env.VALID_MOBILE_NUM_GPAY, 'Valid Course', 20000);
        allure.startStep('Open Byjus payment home page', true);
        await ByjusPayPage.openByjusPayPage();
        allure.startStep('Verify if gpay transaction id is generated with the same valid mobile number used above', true);
        await ByjusPayPage.generateGpayTransactionId('Auto User Duplicate Number', process.env.VALID_MOBILE_NUM_GPAY, 'Valid Course', 25000);
        allure.endStep();
    })

    it('Validate email id field is not editable', async () => {
        allure.startStep('Click on the Gpay pay button');
        await ByjusPayPage.gpaybtn.click();
        allure.startStep('Verify that the sales email field is not editable', true);
        await expect(await ByjusPayPage.tfSalesEmail).toBeDisabled();
        allure.endStep();
    })

    it('Validate error message when submitted blank', async () => {
        allure.startStep('Click on the Gpay pay button');
        await ByjusPayPage.gpaybtn.click();
        allure.startStep('Click on submit button without entering any of the details on the page', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for an error message for mobile number to appear', true);
        await ByjusPayPage.getErrorMsgElement('customerPhone').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message is displayed for the invalid Customer Name', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerName').getText()).toEqual('Customer Name is required');
        allure.startStep('Verify the correct error message is displayed for the invalid Customer Phone', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerPhone').getText()).toEqual('Customer Phone is required');
        allure.startStep('Verify the correct error message is displayed for Amout', true);
        await expect(await ByjusPayPage.getErrorMsgElement('amount').getText()).toEqual('Amount is required');
        allure.startStep('Verify the correct error message is displayed for Course description', true);
        await expect(await ByjusPayPage.getErrorMsgElement('courseDescription').getText()).toEqual('Description is required');
        allure.endStep();
    })

    it('Validate error message for invalid data entered', async () => {
        allure.startStep('Click on the Gpay pay button');
        await ByjusPayPage.gpaybtn.click();
        allure.startStep('Enter alphanumeric customer name and invalid mobile number on the customer details page', true);
        await ByjusPayPage.enterDetailsToCompleteGpayPhonepayPayment('Test123', config.invalidMobNumMoreThanTenDigits, 'Valid Course', 30000);
        allure.startStep('Click on the submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for an error message for invalid mobile number to appear', true);
        await ByjusPayPage.getErrorMsgElement('customerPhone').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message is displayed for the invalid Customer Phone', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerPhone').getText()).toEqual('Enter valid Customer Phone Number');
        allure.startStep('Verify the correct error message is displayed for the invalid Customer Name', true);
        await expect(await ByjusPayPage.getErrorMsgElement('customerName').getText()).toEqual('Enter valid min 4 characters Customer Name');
        allure.endStep();
    })

    it('Validate customer name accepts min 4 characters', async () => {
        allure.startStep('Verify if gpay transaction id is generated with a valid 4 character customer name');
        await ByjusPayPage.generateGpayTransactionId('Auto', process.env.VALID_MOBILE_NUM_GPAY, 'Valid Course', 20000);
        allure.endStep();
    })

    it('Validate desciption field accepts min 5 characters', async () => {
        allure.startStep('Verify if gpay transaction id is generated with a valid 5 character course description');
        await ByjusPayPage.generateGpayTransactionId('Auto User', process.env.VALID_MOBILE_NUM_GPAY, 'Valid', 15000);
        allure.endStep();
    })

    it('Validate error message when amount exceed 10^12', async () => {
        allure.startStep('Click on the Gpay pay button');
        await ByjusPayPage.gpaybtn.click();
        allure.startStep('Enter customer details with amount that has more that 10^12 digits', true);
        await ByjusPayPage.enterDetailsToCompleteGpayPhonepayPayment('Auto User', process.env.VALID_MOBILE_NUM_GPAY, 'Course', 1000000000000);
        allure.startStep('Click on the submit button', true);
        await ByjusPayPage.btnSubmit.click();
        allure.startStep('Wait for the error notification to appear', true);
        var amountErrorNotificationElement = await ByjusPayPage.notificationNotice;
        await amountErrorNotificationElement.waitForDisplayed({ timeout: 10000 });
        allure.startStep('Verify that the correct error notification is displayed for the amount entered', true);
        await expect(await amountErrorNotificationElement.getText()).toEqual('Error\nMoney units should be less than 10^12.');
        allure.endStep();
    })
    
    it('Validate the reset button', async () => {
        allure.startStep('Click on the Gpay pay button');
        await ByjusPayPage.gpaybtn.click();
        allure.startStep('Fill the customer details input fields', true);
        await ByjusPayPage.enterDetailsToCompleteGpayPhonepayPayment('Test123', process.env.VALID_MOBILE_NUM_GPAY, 'Valid Course', 30000);
        allure.startStep('Click on the reset button', true);
        await ByjusPayPage.btnReset.click();
        allure.startStep('Verify that after click on the reset button the customer name input field is blank', true);
        await expect(await ByjusPayPage.tfCustomerName.getValue()).toEqual('')
        allure.startStep('Verify that after click on the reset button the customer number input field is blank', true);
        await expect(await ByjusPayPage.tfCustomerPhone.getValue()).toEqual('')
        allure.startStep('Verify that after click on the reset button the amount input field is blank', true);
        await expect(await ByjusPayPage.tfAmount.getValue()).toEqual('')
        allure.startStep('Verify that after click on the reset button the courese description field is blank', true);
        await expect(await ByjusPayPage.descriptionField.getValue()).toEqual('');
        allure.endStep();
    })
})
