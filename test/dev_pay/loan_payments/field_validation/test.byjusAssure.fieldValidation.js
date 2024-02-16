import mongoConnect from "../../../../utils/mongoconnect";
import { AllureUtil as allure } from '../../../../utils/util.allure';
import ByjusAssurePage from '../../../../pages/loan_payments_page/byjusAssure.payment.page';
import { byjusAssureData } from '../../../../data/byjusAssure.loanform.data';

describe('Verify field validation for byjus Assure EMI payment option', async () => {
  beforeEach('Open payment portal', async () => {
    await browser.maximizeWindow();
    allure.startStep('Open Byjus payment login page');
    await ByjusAssurePage.openByjusPayPage();
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
    await mongoConnect.byjusAssureDeleteObjectFromDb(byjusAssureData.byjusAssureValidData.panNumber);
  })

  afterEach('Delete object from DB  ', async () => {
    allure.startStep('Delete Pancard  and telephone Number from db after each test case ');
    await mongoConnect.byjusAssureDeleteObjectFromDb(byjusAssureData.byjusAssureValidData.panNumber, byjusAssureData.byjusAssureValidData.phoneNumber);
  })

  it('Validate field validations when submitted blank', async () => {
    allure.startStep('Click on the byjus Assure pay button');
    await ByjusAssurePage.byjusAssurepayBtn.click();
    allure.startStep('Click on confirmation checkbox without entering any of the details on the page', true);
    await ByjusAssurePage.cbToSendOtp.click();
    allure.startStep('Click on send OTP button without entering any of the details on the page', true);
    await ByjusAssurePage.btnSendOtp.click();
    allure.startStep('Wait for an error message for applicant First Name to appear', true);
    await ByjusAssurePage.getErrorMsgElement('applicantFirstName').waitForDisplayed({ timeout: 6000 });
    allure.startStep('Verify the correct error message is displayed for the invalid Borrower First Name', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('applicantFirstName')).toHaveTextContaining('Borrower First Name is required');
    allure.startStep('Verify the correct error message is displayed for borrower last name', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('applicantLastName')).toHaveTextContaining('Borrower Last Name is required');
    allure.startStep('Verify the correct error message is displayed for the Students Name required.', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('studentName')).toHaveTextContaining("Student Name is required.");
    allure.startStep('Verify the correct error message is displayed for Invalid Email address', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('Email address is required').getText()).toEqual('Email address is required');
    allure.startStep('Verify the correct error message is displayed for  Mobile No', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('telephoneNumber').getText()).toEqual('Mobile No is required');
    allure.startStep('Verify the correct error message is displayed for ID Proof Type', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('ID Proof Type is required').getText()).toEqual('ID Proof Type is required');
    allure.startStep('Verify the correct error message is displayed for ID Proof Number', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('addressProofNumber').getText()).toEqual('ID Proof Number is required');
    allure.startStep('Verify the correct error message is displayed for down payment', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('downPayment').getText()).toEqual('Down Payment is required');
    allure.startStep('Verify the correct error message is displayed for approved loan ammount', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('approvedLoanAmount').getText()).toEqual('Eligible Loan Amount is required');
    allure.startStep('Verify the correct error message is displayed for valid loan ammount', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('requestedLoanAmount').getText()).toEqual('Loan Amount is required');
    allure.startStep('Verify the correct error message is displayed for tenure', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('Tenure is required').getText()).toEqual('Tenure is required');
    allure.startStep('Verify the correct error message is displayed for address', true);
    await expect(await ByjusAssurePage.getErrorMsgElementByLabel('Address').getText()).toEqual('Address is required');
    allure.startStep('Verify the correct error message for valid date of birth', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('Date of Birth is required').getText()).toEqual('Date of Birth is required');
    allure.startStep('Verify the correct error message is displayed for student grade', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('Student Grade is required').getText()).toEqual('Student Grade is required');
    allure.startStep("Verify that the correct error message for  Occupation type is displayed", true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText("Occupation Type is required.").getText()).toEqual("Occupation Type is required.");
    allure.startStep("Verify that the correct error message for education qualification is displayed", true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText("Education Qualification is required.").getText()).toEqual("Education Qualification is required.");
    allure.startStep("Verify that the correct error message for Income Slab is displayed", true);
    await expect(await ByjusAssurePage.getErrorMsgElement("incomeSlab").getText()).toEqual("Income (monthly) is required.");
    allure.startStep("Verify that the correct error message for Marital Status is displayed", true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText("Marital Status is required.").getText()).toEqual("Marital Status is required.");
    allure.startStep("Verify that the correct error message for Residence Type is displayed", true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText("Residence Type is required.").getText()).toEqual("Residence Type is required.");
    allure.startStep("Verify that the correct error message for Alternate phone number is displayed", true);
    await expect(await ByjusAssurePage.getErrorMsgElement("alternateTelephoneNumber").getText()).toEqual("Alternate Mobile No is required.");
    allure.startStep("Verify that the correct error message for Mother's Name no is displayed", true);
    await expect(await ByjusAssurePage.getErrorMsgElement("mothersName").getText()).toEqual("Borrower's Mother Name is required.");
    allure.startStep("Verify that the correct error message for Student Dob is displayed", true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText("Student Date of Birth is required.").getText()).toEqual("Student Date of Birth is required.");
    allure.endStep();
  })

  it('Validate Email address entered is correct', async () => {
    allure.startStep('Enter customer details with invalid email');
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureInvalidEmail);
    allure.startStep('Wait for an error message to appear for Email address', true);
    await ByjusAssurePage.getErrorMsgUsingElementText('Invalid Email address').waitForDisplayed({ timeout: 6000 });
    allure.startStep('Verify the correct error message is displayed for Invalid Email address', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('Invalid Email address').getText()).toEqual('Invalid Email address');
    allure.endStep();
  })


  it('Validate mobile number should not accept less than 10 digits and more than 10 digits', async () => {
    allure.startStep('Enter customer details with invalid mobile number greater than ten digits');
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureInvalidNumberGreaterThanTenDigits);
    allure.startStep('Wait for an error message for  to appear', true);
    await ByjusAssurePage.getErrorMsgElement('telephoneNumber').waitForDisplayed({ timeout: 5000 });
    allure.startStep('Verify the correct error message is displayed for Invalid Mobile No', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('telephoneNumber').getText()).toEqual('Invalid Mobile No');
    allure.startStep('Open Byjus payment login page');
    await ByjusAssurePage.openByjusPayPage();
    allure.startStep('Delete object from DB if it has some object with same pancard number we are using', true);
    await mongoConnect.byjusAssureDeleteObjectFromDb(byjusAssureData.byjusAssureValidData.panNumber);
    allure.startStep('Enter customer details with invalid mobile number less than ten digits', true);
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureInvalidNumberLessThanTenDigits);
    allure.startStep('Wait for an error message to appear', true);
    await ByjusAssurePage.getErrorMsgElement('telephoneNumber').waitForDisplayed({ timeout: 5000 });
    allure.startStep('Verify the correct error message is displayed for Invalid Mobile No less than ten digits', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('telephoneNumber').getText()).toEqual('Invalid Mobile No');
    allure.endStep();
  })

  it('Validate Address proof number only accept numeric value when ID prof is selected Aadhar.', async () => {
    allure.startStep('Enter customer details with invalid aadhar number');
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureInvalidAadharNum);
    allure.startStep('Wait for an error message to appear', true);
    await ByjusAssurePage.getErrorMsgElementUsingElementText('Please enter valid last 4 digits of aadhaar').waitForDisplayed({ timeout: 9000 });
    allure.startStep('Verify the correct error message is displayed for ID Proof Number', true);
    await expect(await ByjusAssurePage.getErrorMsgElementUsingElementText('Please enter valid last 4 digits of aadhaar')).toHaveTextContaining('Please enter valid last 4 digits of aadhaar');
    allure.endStep();
  })

  it('Validate down payment cannot be less than 10000 ', async () => {
    allure.startStep('Enter customer details with Invalid down payment');
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureInvalidDownPaymentLessThan10000);
    allure.startStep('Wait for an error message to appear', true);
    await ByjusAssurePage.getErrorMsgEleUsingDispText('Down Payment').waitForDisplayed({ timeout: 15000 });
    allure.startStep('Verify the correct error message is displayed for Invalid down payment', true);
    await expect(await ByjusAssurePage.getErrorMsgEleUsingDispText('Down Payment')).toHaveTextContaining('Down payment can not be less than Rs.10000');
    allure.endStep();
  })

  it('Validate loan amount cannot be less than Rs.10000, and not be greater than Eligible Loan Amount', async () => {
    allure.startStep('Enter customer details with invalid loan amount less than 10000');
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureInvalidLoanAmountLessThan10000);
    allure.startStep('Wait for an error message  to appear', true);
    await ByjusAssurePage.getErrorMsgEleUsingDispText('Loan Amount').waitForDisplayed({ timeout: 5000 });
    allure.startStep('Verify the correct error message for loan ammount', true);
    await expect(await ByjusAssurePage.getErrorMsgEleUsingDispText('Loan Amount')).toHaveTextContaining('Loan amount cannot be less than 10000');
    allure.startStep('Open Byjus payment login page');
    await ByjusAssurePage.openByjusPayPage();
    allure.startStep('Delete object from DB if it has some object with same pancard number we are using', true);
    await mongoConnect.byjusAssureDeleteObjectFromDb(byjusAssureData.byjusAssureValidData.panNumber);
    allure.startStep('Enter customer details with invalid loan amount greater than 10000');
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureInvalidLoanAmountGreaterThan100000);
    allure.startStep('Wait for an error message  to appear', true);
    await ByjusAssurePage.getErrorMsgEleUsingDispText('Loan Amount').waitForDisplayed({ timeout: 6000 });
    allure.startStep('Verify the correct error message for valid loan amount', true);
    await expect(await ByjusAssurePage.getErrorMsgEleUsingDispText('Loan Amount')).toHaveTextContaining('Loan amount cannot be greater than eligible loan amount');
    allure.endStep();
  })

  it('Validate age should be more than 18 years and less than 65 years', async () => {

    allure.startStep('Enter customer details with invaid age above 65');
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureInvalidAgeAbove65);
    allure.startStep('Wait for an error message to appear', true);
    await ByjusAssurePage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years').waitForDisplayed({ timeout: 6000 });
    allure.startStep('Verify the correct error message is displayed for Invalid age', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years')).toHaveTextContaining('Age should be more than 18 years and less than 65 years');
    allure.startStep('Open Byjus payment login page');
    await ByjusAssurePage.openByjusPayPage();
    allure.startStep('Delete object from DB if it has some object with same pancard number we are using', true);
    await mongoConnect.byjusAssureDeleteObjectFromDb(byjusAssureData.byjusAssureValidData.panNumber);
    allure.startStep('Enter customer details with invalid age below 18');
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureInvalidAgeBelow18);
    allure.startStep('Wait for an error message to appear', true);
    await ByjusAssurePage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years').waitForDisplayed({ timeout: 6000 });
    allure.startStep('Verify the correct error message is displayed for Invalid age', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years')).toHaveTextContaining('Age should be more than 18 years and less than 65 years');
    allure.endStep();
  })

  it("Validate invalid otp error", async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus Assure loan & Click on sent OTP');
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Click on proceed button if pop up displayed ');
    await ByjusAssurePage.clickOnProceedBtn();
    allure.startStep('wait for an  verify OTP button to be displayed', true);
    await ByjusAssurePage.btnVerifyOtp.waitForDisplayed({ timeout: 30000 });
    allure.startStep('Enter with invalid OTP', true);
    await ByjusAssurePage.tfEnterOtp.setValue("123456");
    allure.startStep('clicking on verify OTP button', true);
    await ByjusAssurePage.btnVerifyOtp.click();
    allure.startStep('wait for an error messege to be displayed', true);
    await ByjusAssurePage.errorMsgForOtp.waitForExist({ timeout: 30000 });
    allure.startStep('Verify the correct error message for OTP', true);
    await expect(await ByjusAssurePage.errorMsgForOtp.getText()).toEqual("Invalid OTP");
    allure.endStep();
  })

  it("Validate error message when click on upload button without uploading a file.", async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus Assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Click on proceed button if pop up displayed ');
    await ByjusAssurePage.clickOnProceedBtn();
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Refresh browser', true);
    await browser.refresh();
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('clicking on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('Enter valid customer account details');
    await ByjusAssurePage.fillAccountDetails();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('wait for next button to be exist ', true);
    await ByjusAssurePage.nextButton.waitForExist({ timeout: 30000 })
    allure.startStep('click on next button', true);
    await ByjusAssurePage.nextButton.click()
    allure.startStep('click on physical nach radio button', true);
    await ByjusAssurePage.rbToPhysicalNach.click();
    allure.startStep('click on check box', true);
    await ByjusAssurePage.cbToSendOtp.click();
    allure.startStep('click on send OTP button', true);
    await ByjusAssurePage.btnSendOtp.click();
    allure.startStep('click on radio button upload document for ID proof', true);
    await ByjusAssurePage.rbUploadDocument.click();
    allure.startStep('click on radio button upload document for passbook first page', true);
    await ByjusAssurePage.btnUpload.waitForClickable({ timeout: 12000 });
    await ByjusAssurePage.btnUpload.click();
    allure.startStep('Wait for an error message when click on upload button without uploading a file. ', true);
    await ByjusAssurePage.errorMsgPhotoUpload.waitForDisplayed({ timeout: 5000 });
    allure.startStep('Verify the correct error message is displayed for without uploading file', true);
    await expect(await ByjusAssurePage.errorMsgPhotoUpload.getText()).toEqual('You need to click photo first or select file to upload');
    allure.endStep();
  })

})
