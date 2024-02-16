import * as config from '../../../config/config.js';
import ByjusPayPage from '../../../pages/gateway_payments_page/byjus.pay.page';
import {AllureUtil as allure} from '../../../utils/util.allure';

describe ('Verify field validation for payu payment option', async () =>{

   beforeEach('Open payment portal', async () => {
       allure.startStep('Open Byjus payment login page');
       await ByjusPayPage.openByjusPayPage();
       allure.startStep('Login to the payment page', true);
       await ByjusPayPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);   
    })
    
   it('Create a payu transcation id with a valid mobile number', async () => {
       allure.startStep('Verify if payu transaction id is generated with a valid mobile number');
       await ByjusPayPage.generatePayuTransactionId('Auto User', process.env.VALID_MOBILE_NUM_PAYU, 'Valid Course', 25000);
       allure.endStep();
   })

   it('Validate error message for invalid mobile number ', async () => {
       allure.startStep('Click on the payu pay button');
       await ByjusPayPage.payBtnPayu.click();
       allure.startStep('Enter customer details with an invalid mobile number', true);
       await ByjusPayPage.enterDetailsToCompletePayuPayment('Auto User', config.invalidMobNumMoreThanTenDigits, 'Valid Course', 20000);
       allure.startStep('Click on submit button', true);
       await ByjusPayPage.btnSubmit.click();
       allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
       await ByjusPayPage.getErrorMsgElement('phone').waitForDisplayed({timeout: 5000});
       allure.startStep('Verify that the correct error message for invalid mobile number entered is displayed', true);
       await expect(await ByjusPayPage.getErrorMsgElement('phone').getText()).toEqual('Enter valid Customer Phone Number');
       allure.endStep();
   })
   
   it('Validate email id field is not editable', async () => {
       allure.startStep('Click on the payu pay button');
       await ByjusPayPage.payBtnPayu.click();
       allure.startStep('Verify that the sales email field is not editable', true);
       await expect(await ByjusPayPage.tfSalesEmail).toBeDisabled();
       allure.endStep();
   })

   it('Create payu transaction with duplicate mobile number and verify no error displayed', async ()=>{
       allure.startStep('Verify if payu transaction id is generated with a valid mobile number');
       await ByjusPayPage.generatePayuTransactionId('Auto User', process.env.VALID_MOBILE_NUM_PAYU, 'Valid Course', 20000);
       allure.startStep('Open Byjus payment home page', true);
       await ByjusPayPage.openByjusPayPage();
       allure.startStep('Verify if payu transaction id is generated with the same valid mobile number used above', true);
       await ByjusPayPage.generatePayuTransactionId('Auto User Duplicate Number', process.env.VALID_MOBILE_NUM_PAYU, 'Valid Course', 30000);
       allure.endStep();
   })

   it('Validate error message when submitted blank', async ()=>{
       allure.startStep('Click on the payu pay button');
       await ByjusPayPage.payBtnPayu.click();
       allure.startStep('Click on submit button without entering any of the details on the page', true);
       await ByjusPayPage.btnSubmit.click();
       allure.startStep('Wait for an error message for Customer name to appear', true);
       await ByjusPayPage.getErrorMsgElement('firstname').waitForDisplayed({timeout: 5000});
       allure.startStep('Verify the correct error message is displayed when Customer Name field is submitted blank', true);
       await expect(await ByjusPayPage.getErrorMsgElement('firstname').getText()).toEqual('Customer Name is required.');
       allure.startStep('Verify the correct error message is displayed when Customer phone field is submitted blank', true);
       await expect(await ByjusPayPage.getErrorMsgElement('phone').getText()).toEqual('Customer Phone is required.');
       allure.startStep('Verify the correct error message is displayed when Course Description field is submitted blank', true);
       await expect(await ByjusPayPage.getErrorMsgElement('productinfo').getText()).toEqual('Course Description is required.');
       allure.startStep('Verify the correct error message is displayed when Amount field is submitted blank', true);
       await expect(await ByjusPayPage.getErrorMsgElement('amount').getText()).toEqual('Amount is required.');
       allure.endStep();
   })

   it('Validate error message for invalid data entered', async ()=>{
       allure.startStep('Click on the payu pay button');
       await ByjusPayPage.payBtnPayu.click();
       allure.startStep('Enter alphanumeric customer name and invalid mobile number on the customer details page', true);
       await ByjusPayPage.enterDetailsToCompletePayuPayment('Test123', config.invalidMobNumMoreThanTenDigits, 'Valid Course', 30000);
       allure.startStep('Click on the submit button', true);
       await ByjusPayPage.btnSubmit.click();
       allure.startStep('Wait for an error message for invalid mobile number to appear', true);
       await ByjusPayPage.getErrorMsgElement('phone').waitForDisplayed({timeout: 5000});
       allure.startStep('Verify the correct error message is displayed for the invalid Customer Phone', true);
       await expect(await ByjusPayPage.getErrorMsgElement('phone').getText()).toEqual('Enter valid Customer Phone Number');
       allure.startStep('Verify the correct error message is displayed for the invalid Customer Name', true);
       await expect(await ByjusPayPage.getErrorMsgElement('firstname').getText()).toEqual('Enter valid min 5 characters Customer Name');
       allure.endStep();
      })  
})
