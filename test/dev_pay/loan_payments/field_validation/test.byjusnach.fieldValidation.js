import mongoConnect from "../../../../utils/mongoconnect";
import { AllureUtil as allure } from '../../../../utils/util.allure';
import byjusNachPage from '../../../../pages/loan_payments_page/byjusnach.payment.page';
import { byjusNachData } from '../../../../data/byjusnach.loanform.data';
import { dataToMoveTo } from '../../../../data/byjusnach.move.to.particular.page';



describe('Verify field validation for byjus Nach payment option', async () => {
    beforeEach('Open payment portal', async () => {
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await byjusNachPage.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.byjusNachDeleteObjectFromDb(byjusNachData.byjusNachValidData.panNumber);
    })
    afterEach('Delete object from DB  ', async () => {
        allure.startStep('Delete Pancard  and telephone Number from db after each test case ');
        await mongoConnect.byjusNachDeleteObjectFromDb(byjusNachData.byjusNachValidData.panNumber, byjusNachData.byjusNachValidData.phoneNumber);

    })

    it('Validate field validations when submitted blank', async () => {
        allure.startStep('Click on the byjus Nach pay button');
        await byjusNachPage.byjusNachpayBtn.click();
        allure.startStep('Click on confirmation checkbox without entering any of the details on the page', true);
        await byjusNachPage.cbToSendOtp.click();
        allure.startStep('Click on send OTP button without entering any of the details on the page', true);
        await byjusNachPage.btnSendOtp.click();
        allure.startStep('Wait for an error message for applicant First Name to appear', true);
        await byjusNachPage.getErrorMsgElement('applicantFirstName').waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message is displayed for the invalid Borrower First Name', true);
        await expect(await byjusNachPage.getErrorMsgElement('applicantFirstName')).toHaveTextContaining('Borrower First Name is required');
        allure.startStep('Verify the correct error message is displayed for borrower last name', true);
        await expect(await byjusNachPage.getErrorMsgElement('applicantLastName')).toHaveTextContaining('Borrower Last Name is required');
        allure.startStep('Verify the correct error message is displayed for the Students Name required.', true);
        await expect(await byjusNachPage.getErrorMsgElement('studentName')).toHaveTextContaining("Student's Name is required");
        // allure.startStep('Verify the correct error message is displayed for the School location', true);
        // await expect(await byjusNachPage.getErrorMsgUsingElementText('School Location')).toHaveTextContaining("School Location is required");
        // allure.startStep('Verify the correct error message is displayed for the school name', true);
        // await expect(await byjusNachPage.getErrorMsgUsingElementText('School Name')).toHaveTextContaining("School Name is required");
        // allure.startStep('Verify the correct error message is displayed for the school fee band', true);
        // await expect(await byjusNachPage.getErrorMsgUsingElementText('School Fee Band')).toHaveTextContaining("School Fee Band is required");
        allure.startStep('Verify the correct error message is displayed for Invalid Email address', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('Email address is required')).toHaveTextContaining('Email address is required');
        allure.startStep('Verify the correct error message is displayed for Invalid Mobile No', true);
        await expect(await byjusNachPage.getErrorMsgElement('telephoneNumber')).toHaveTextContaining('Mobile No is required');
        allure.startStep('Verify the correct error message is displayed for ID Proof Type', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('ID Proof Type is required')).toHaveTextContaining('ID Proof Type is required');
        allure.startStep('Verify the correct error message is displayed for ID Proof Number', true);
        await expect(await byjusNachPage.getErrorMsgElement('addressProofNumber')).toHaveTextContaining('ID Proof Number is required');
        allure.startStep('Verify the correct error message is displayed for valid loan ammount', true);
        await expect(await byjusNachPage.getErrorMsgElement('requestedLoanAmount')).toHaveTextContaining('Loan Amount is required');
        allure.startStep('Verify the correct error message is displayed for tenure', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('Tenure is required')).toHaveTextContaining('Tenure is required');
        allure.startStep('Verify the correct error message for valid date of birth', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('Date of Birth is required')).toHaveTextContaining('Date of Birth is required');
        allure.startStep("Verify that the correct error message for  Occupation type is displayed", true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText("Occupation Type is required.").getText()).toEqual("Occupation Type is required.");
        allure.startStep("Verify that the correct error message for education qualification is displayed", true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText("Education Qualification is required.").getText()).toEqual("Education Qualification is required.");
        allure.startStep("Verify that the correct error message for Income Slab is displayed", true);
        await expect(await byjusNachPage.getErrorMsgElement("incomeSlab").getText()).toEqual("Income (monthly) is required.");
        allure.startStep("Verify that the correct error message for Marital Status is displayed", true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText("Marital Status is required.").getText()).toEqual("Marital Status is required.");
        allure.startStep("Verify that the correct error message for Residence Type is displayed", true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText("Residence Type is required.").getText()).toEqual("Residence Type is required.");
        allure.startStep("Verify that the correct error message for Alternate phone number is displayed", true);
        await expect(await byjusNachPage.getErrorMsgElement("alternateTelephoneNumber").getText()).toEqual("Alternate Mobile No is required.");
        allure.startStep("Verify that the correct error message for Mother's Name no is displayed", true);
        await expect(await byjusNachPage.getErrorMsgElement("mothersName").getText()).toEqual("Borrower's Mother Name is required.");
        allure.startStep("Verify that the correct error message for Student's Name  is displayed", true);
        await expect(await byjusNachPage.getErrorMsgElement("studentName").getText()).toEqual("Student's Name is required");
        allure.startStep("Verify that the correct error message for Student Dob is displayed", true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText("Student Date of Birth is required.").getText()).toEqual("Student Date of Birth is required.");
        allure.endStep();
    })

    it.skip('Validate Email address field validations', async () => {
        allure.startStep('Enter customer details with invalid email');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachInvalidEmail);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusNachPage.getErrorMsgUsingElementText('Invalid Email address').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message is displayed for Invalid Email address', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('Invalid Email address')).toHaveTextContaining('Invalid Email address');
        allure.endStep();
    })

    it('Validate amount should be  Amount should be >= Rs.14000 and <= Rs. 100000', async () => {
        allure.startStep('Enter customer details with invalid amount less than 14000');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachInvalidAmountLessThan14000);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusNachPage.getErrorMsgElement('requestedLoanAmount').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message for loan ammount', true);
        await expect(await byjusNachPage.getErrorMsgElement('requestedLoanAmount')).toHaveTextContaining('Amount should be >= Rs.14000 and <= Rs. 100000');
        allure.startStep('Open Byjus payment login page');
        await byjusNachPage.openByjusPayPage();
        allure.startStep('Enter customer details with invalid amount grater than 100000');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachInvalidAmountGreaterThan300000);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusNachPage.getErrorMsgElement('requestedLoanAmount').waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message for valid loan amount', true);
        await expect(await byjusNachPage.getErrorMsgElement('requestedLoanAmount')).toHaveTextContaining('Amount should be >= Rs.14000 and <= Rs. 100000');
        allure.endStep();
    })

    it('Validate mobile number should not accept less than 10 digits and more than 10 digits', async () => {
        allure.startStep('Enter customer details with invaid age');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachInvalidNumberLessThanTenDigits);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusNachPage.getErrorMsgElement('telephoneNumber').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message is displayed for Invalid Mobile No', true);
        await expect(await byjusNachPage.getErrorMsgElement('telephoneNumber')).toHaveTextContaining('Invalid Mobile No');
        allure.startStep('Open Byjus payment login page');
        await byjusNachPage.openByjusPayPage();
        await mongoConnect.byjusNachDeleteObjectFromDb(byjusNachData.byjusNachInvalidNumberGreaterThanTenDigits.panNumber);
        allure.startStep('Enter customer details with invalid mobile number grater than ten digits');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachInvalidNumberGreaterThanTenDigits);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusNachPage.getErrorMsgElement('telephoneNumber').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message is displayed for Invalid Mobile No less than ten digits', true);
        await expect(await byjusNachPage.getErrorMsgElement('telephoneNumber')).toHaveTextContaining('Invalid Mobile No');
        allure.endStep();
    })

    it('Validate age should be more than 18 years and less than 65 years', async () => {
        allure.startStep('Enter customer details with invaid age');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachInvalidAgeAbove65);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusNachPage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years').waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message is displayed for Invalid Mobile No', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years')).toHaveTextContaining('Age should be more than 18 years and less than 65 years');
        allure.startStep('Open Byjus payment login page');
        await byjusNachPage.openByjusPayPage();
        allure.startStep('Delete object from DB if it has some object with pancard number we are using');
        await mongoConnect.byjusNachDeleteObjectFromDb(byjusNachData.byjusNachInvalidAgeBelow18.panNumber);
        allure.startStep('Enter customer details with invalid mobile number grater than ten digits');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachInvalidAgeBelow18);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusNachPage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years').waitForDisplayed({ timeout: 8000 });
        allure.startStep('Verify the correct error message is displayed for Invalid Mobile No less than ten digits', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years')).toHaveTextContaining('Age should be more than 18 years and less than 65 years');
        allure.endStep();
    })

    it('Validate send OTP button is enabled after the consent checkbox is selected', async () => {
        allure.startStep('Enter customer details with invalid data');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
        allure.startStep('validte send OTP button is Enabled', true);
        await byjusNachPage.btnSendOtp.isEnabled();
        allure.endStep();
    })

    it('Validate Address proof number accept numeric value when ID proof is selected adhar.', async () => {
        allure.startStep('Enter customer details with invalid data');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachInvalidAadharNum);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusNachPage.getErrorMsgElementByLabel('Address Proof Number').waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message is displayed for ID Proof Number', true);
        await expect(await byjusNachPage.getErrorMsgElementByLabel('Address Proof Number')).toHaveTextContaining('Please enter valid last 4 digits of aadhaar');
        allure.endStep();
    })

    it("Validate invalid otp error", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
        allure.startStep('Click on proceed button if enable else wait for verify OTP button on next page to be displayed', true);
        await byjusNachPage.clickOnProceedBtn();
        allure.startStep('Enter with invalid OTP', true);
        await byjusNachPage.tfEnterOtp.setValue("123456");
        allure.startStep('clicking on verify OTP button', true);
        await byjusNachPage.btnVerifyOtp.click();
        allure.startStep('Wait for OTP error message to be displayed', true);
        await byjusNachPage.otpErrorMsg.waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message for OTP', true);
        await expect(await byjusNachPage.otpErrorMsg.getText()).toEqual("Invalid OTP");
        allure.endStep();
    })

    it("(Upload bank statement)Validate field when submitted blank", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
        let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
        allure.startStep('Click on proceed button if enable else wait for verify OTP button on next page to be displayed', true);
        await byjusNachPage.clickOnProceedBtn();
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open byjus nach Unprocessed loan & get appId', true);
        let appId = await byjusNachPage.returnAppId(panNumber);
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('Update status of above appId in transactionscibil collection', true);
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep('clicking on resume button', true);
        await byjusNachPage.btnResume(appId).click();
        allure.startStep('clicking on continue button', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep('clicking on upload bank statement 2 photo button', true);
        await byjusNachPage.uploadBankStatement2Photo.click();
        allure.startStep('clicking on upload bank statement radio button', true);
        await byjusNachPage.cbToBankStatement.click();
        allure.startStep('clicking on bank statement continue button', true);
        await byjusNachPage.btnContinueBankStatementPage.click();
        allure.startStep('Wait fot error message to be displayed', true);
        await byjusNachPage.otpErrorMsg.waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify correct error message is displayed', true);
        await expect(await byjusNachPage.otpErrorMsg.getText()).toEqual("Please select bank statement source.");
        allure.endStep();
    })

    it("Validate upload button without uploading screen shot", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
        let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
        allure.startStep('Click on proceed button if enable else wait for verify OTP button on next page to be displayed', true);
        await byjusNachPage.clickOnProceedBtn();
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open byjus nach Unprocessed loan & get appId', true);
        let appId = await byjusNachPage.returnAppId(panNumber);
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('Update status of above appId in transactionscibil collection', true);
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep('clicking on resume button', true);
        await byjusNachPage.btnResume(appId).click();
        allure.startStep('clicking on continue button', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep('clicking on upload bank statement 2 photo button', true);
        await byjusNachPage.uploadBankStatement2Photo.click();
        allure.startStep('clicking on bank statement source', true);
        await byjusNachPage.ddBankStatementSource.click();
        allure.startStep('Selecting Email as source', true);
        await browser.keys(["E", "m", "a", "i", "l", "Tab"]);
        allure.startStep('clicking on upload bank statement radio button', true);
        await byjusNachPage.rbUploadDocuments.click();
        allure.startStep('clicking on upload document button', true);
        await byjusNachPage.btnUploadDocuments.click();
        allure.startStep('clicking on upload bank statement radio button', true);
        await byjusNachPage.cbToBankStatement.click();
        allure.startStep('clicking on continue button', true);
        await byjusNachPage.btnContinueBankStatementPage.click();
        allure.startStep('Wait for the error message to be displayed', true);
        await byjusNachPage.otpErrorMsg.waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message', true);
        await expect(await byjusNachPage.otpErrorMsg.getText()).toEqual("Please upload a screenshot of the source.");
        allure.endStep();
    })

    it("(Account details) Validate all fields when submiting blank (not working until enter account number after filling any thing at account field then all fields showing validations)", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
        let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
        allure.startStep('Click on proceed button if enable else wait for verify OTP button on next page to be displayed', true);
        await byjusNachPage.clickOnProceedBtn();
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open byjus nach Unprocessed loan & get appId', true);
        let appId = await byjusNachPage.returnAppId(panNumber);
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Update status of above appId in transactionscibil collection', true);
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.byjusnachAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await byjusNachPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await byjusNachPage.btnContinue.waitForClickable({ timeout: 10000 });
        allure.startStep('Clicking on continue button', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep('Wait for upload bank statement photo tab to be exist', true);
        await byjusNachPage.uploadBankStatement2Photo.waitForExist({ timeout: 5000 })
        allure.startStep('Click on upload bank statement photo tab', true);
        await byjusNachPage.uploadBankStatement2Photo.click()
        allure.startStep('Setting values to account number field', true);
        await byjusNachPage.tfAccountNumber.setValue("87451236521");
        allure.startStep('Wait for continue button to be clickable', true);
        await byjusNachPage.btnContinue.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on continue button', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep('Wait for correct error msg for title is displayed', true);
        await byjusNachPage.getErrorMsgUsingElementText('Title is required.').waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message is displayed for title', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('Title is required.')).toHaveTextContaining('Title is required.');
        allure.startStep('Verify the correct error message is displayed for Account number', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('Account Type is required.')).toHaveTextContaining('Account Type is required.');
        allure.startStep('Verify the correct error message is displayed for bank required', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('Bank Name is required.')).toHaveTextContaining('Bank Name is required.');
        allure.startStep('Verify the correct error message is displayed for IFSC code', true);
        await expect(await byjusNachPage.getErrorMsgElementByLabel('IFSC').getText()).toEqual('IFSC is required.');
        allure.startStep('Verify the correct error message is displayed for MICR code', true);
        await expect(await byjusNachPage.getErrorMsgElementByLabel('MICR').getText()).toEqual('MICR is required.');
        allure.startStep('Verify the correct error message is displayed for city', true);
        await expect(await byjusNachPage.getErrorMsgElementByLabel('City').getText()).toEqual('City is required.');
        allure.endStep();

    })
    it("(Account details) Validate Account number should be numeric.", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
        let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
        allure.startStep('Click on proceed button if enable else wait for verify OTP button on next page to be displayed', true);
        await byjusNachPage.clickOnProceedBtn();
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open byjus nach Unprocessed loan & get appId', true);
        let appId = await byjusNachPage.returnAppId(panNumber);
        allure.startStep('Address of window is stored in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Update status of above appId in transactionscibil collection', true);
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.byjusnachAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await byjusNachPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep('Wait for upload bank statement photo tab to be exist', true);
        await byjusNachPage.uploadBankStatement2Photo.waitForExist({ timeout: 5000 })
        allure.startStep('Click on upload bank statement photo tab', true);
        await byjusNachPage.uploadBankStatement2Photo.click()
        allure.startStep('setting invalid values to account number field', true);
        await byjusNachPage.tfAccountNumber.setValue("statebank");
        allure.startStep('Wait for continue button to be clickable', true);
        await byjusNachPage.btnContinue.waitForClickable({ timeout: 6000 });
        allure.startStep('clicking on continue button', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep('Wait for an error message for account number to be displayed', true);
        await byjusNachPage.getErrorMsgElement('accountNumber').waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message is displayed for valid account number', true);
        await expect(await byjusNachPage.getErrorMsgElement('accountNumber')).toHaveTextContaining('Account number must be numeric');
        allure.endStep();
    })

    it('Validate error message when submitted blank(LMS portal)', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
        await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
        allure.startStep("Click on Proceed button", true);
        await byjusNachPage.clickOnProceedBtn();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Update status of above appId in transactionscibil collection', true);
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await byjusNachPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep("Open LMS portal", true);
        await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
        allure.startStep("Wait for sign in button to be displayed", true);
        await byjusNachPage.btnSignInWithGoogleLms.waitForExist({ timeout: 30000 });
        allure.startStep("Click on Sign in with google button", true);
        await byjusNachPage.btnSignInWithGoogleLms.click();
        allure.startStep("Click on Continue with google button", true);
        await byjusNachPage.btnContinueWithGoogle.click();
        allure.startStep("Wait for the manage utilities button to be displayed", true);
        await byjusNachPage.btnManageUtilities.waitForExist({ timeout: 30000 });
        allure.startStep("Click on manage utilities google button", true);
        await byjusNachPage.btnManageUtilities.click();
        allure.startStep("Click on Abb ticket button", true);
        await byjusNachPage.btnAbbTicket.click();
        allure.startStep("Enter appID in App Id search box", true);
        await byjusNachPage.btnAbbTicketSearchBox.setValue(appId);
        allure.startStep("Press enter", true);
        await browser.keys("Enter");
        allure.startStep("Wait for appID to be clickable", true);
        await byjusNachPage.btnOpenAppId(appId).waitForClickable();
        allure.startStep("Click on appID", true);
        await byjusNachPage.btnOpenAppId(appId).click();
        allure.startStep("Click on submit button", true);
        await byjusNachPage.btnSubmit.click();
        allure.startStep("Wait for the error message to be displayed", true);
        await byjusNachPage.ErrorMsgLmsPortal.waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify the correct error message is displayed", true);
        await expect(await byjusNachPage.ErrorMsgLmsPortal.getText()).toEqual("Please enter all required details!");
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Validate error message when clicked on Continue button without Selecting first EMI date', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
        let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
        allure.startStep("Click on Proceed button", true);
        await byjusNachPage.clickOnProceedBtn();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('Update status of above appId in transactionscibil collection', true);
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await byjusNachPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
        allure.startStep('Close the Lms window', true);
        await browser.closeWindow();
        allure.startStep('Switch to window handles[0]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Wait for Continue button on loan aggrement page is clickable', true);
        await byjusNachPage.btnContinue.waitForEnabled({ timeout: 60000 });
        allure.startStep('Click on Continue button on loan aggrement page', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep('Wait for the error message to be displayed', true);
        await byjusNachPage.getErrorMsgUsingElementText('First EMI Date is required.').waitForDisplayed({ timeout: 10000 });
        allure.startStep('Verify that correct error message is dispalyed', true);
        await expect(await byjusNachPage.getErrorMsgUsingElementText('First EMI Date is required.').getText()).toEqual('First EMI Date is required.');
        allure.endStep();
    })

    it('Validate correct AppId is displayed on loan eligibility status page', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
        let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
        allure.startStep("Click on Proceed button", true);
        await byjusNachPage.clickOnProceedBtn();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Update status of above appId in transactionscibil collection', true);
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await byjusNachPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
        allure.startStep('Close the LMS portal window', true);
        await browser.closeWindow();
        allure.startStep('Switch to payments window', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.ByjusNachAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
        allure.startStep('Update Esign details in transactionscibil collection', true);
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection', true);
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('Refresh the browser');
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable', true);
        await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await byjusNachPage.btnContinue.click();
        allure.startStep('Wait for done button to be displayed on loan eligibility status page', true);
        await byjusNachPage.btnDone.waitForDisplayed({ timeout: 10000 });
        allure.startStep('Verify the correct app Id is displayed on loan eligibilty status page', true);
        await expect(await byjusNachPage.appIdText.getText()).toEqual(`${appId}`)
        allure.endStep();
    });


})
