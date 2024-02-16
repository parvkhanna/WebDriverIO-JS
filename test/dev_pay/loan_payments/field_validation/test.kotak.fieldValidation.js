import mongoConnect from "../../../../utils/mongoconnect";
import { AllureUtil as allure, AllureUtil } from '../../../../utils/util.allure';
import KotakPage from '../../../../pages/loan_payments_page/kotak.payment.page';
import { kotakData } from '../../../../data/kotak.loanform.data';
import { dataToMoveTo } from '../../../../data/kotak.move.to.particular.page'


describe('Verify field validation for kotak EMI payment option', async () => {

    beforeEach("Open payment portal", async () => {
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await KotakPage.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.kotakDeleteObjectFromDb(kotakData.kotakValidDetails.panNumber, kotakData.kotakValidDetails.phoneNumber);
    });

    afterEach('Delete object from DB  ', async () => {
        allure.startStep('Delete Pancard  and telephone Number from db after each test case ');
        await mongoConnect.kotakDeleteObjectFromDb(kotakData.kotakValidDetails.panNumber, kotakData.kotakValidDetails.phoneNumber);

    })

    it('Validate field validations when submitted blank', async () => {
        allure.startStep('Click on kotak pay button', true);
        await KotakPage.btnKotakPay.click();
        allure.startStep("Wait for Skip Upload Document button", true);
        await KotakPage.btnSkipUploadDocument.waitForDisplayed({ timeout: 10000 });
        allure.startStep("Click Skip Upload Document button", true);
        await KotakPage.btnSkipUploadDocument.click();
        allure.startStep("Wait for checkbox to be displayed", true);
        await KotakPage.cbToSendOtp.waitForClickable({ timeout: 60000 })
        allure.startStep("Tick the sent OTP checkbox", true);
        await KotakPage.cbToSendOtp.click();
        allure.startStep("Click on Send OTP button", true);
        await KotakPage.btnSendOtp.click();
        allure.startStep('Wait for the applicant first name  error message to be displayed', true);
        await KotakPage.geterrorMSGfromFieldElement('applicantFirstName').waitForDisplayed({ timeout: 5000 })
        allure.startStep("Verify that the correct error message for aplicant first name is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('applicantFirstName').getText()).toEqual('Borrower First Name is required')
        allure.startStep("Verify that the correct error message for applicant last name  is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('applicantLastName').getText()).toEqual('Borrower Last Name is required')
        allure.startStep("Verify that the correct error message for pan No is displayed", true);
        const errorMsg = await KotakPage.geterrorMSGfromFieldElement('panNo').getText()
        if (errorMsg === 'Invalid PAN Card No') {
            expect(errorMsg).toEqual('Invalid PAN Card No')
        }

        else if (errorMsg === 'PAN Card No is required') {
            expect(errorMsg).toEqual('PAN Card No is required')
        }
        allure.startStep("Verify that the correct error message for birthdate is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('Birthdate is required').getText()).toEqual('Birthdate is required')
        allure.startStep("Verify that the correct error message for gender is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('Gender is required').getText()).toEqual('Gender is required')
        allure.startStep("Verify that the correct error message for mobile No is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('telephoneNumber').getText()).toEqual('Mobile No is required')
        allure.startStep("Verify that the correct error message for alternate mobile No is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('alternateTelephoneNumber').getText()).toEqual('Alternate Mobile No is required.')
        allure.startStep("Verify that the correct error message for email address is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('Email address is required').getText()).toEqual('Email address is required')
        allure.startStep("Verify that the correct error message for fathername is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('fathersName').getText()).toEqual("Borrower's Father Name is required")
        allure.startStep("Verify that the correct error message for mothername is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('mothersName').getText()).toEqual("Borrower's Mother Name is required.")
        allure.startStep("Verify that the correct error message for marital status is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('Marital Status is required.').getText()).toEqual('Marital Status is required.')
        allure.startStep("Verify that the correct error message for education is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('Education Qualification is required.').getText()).toEqual('Education Qualification is required.')
        allure.startStep("Verify that the correct error message for occupation is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('Occupation Type is required.').getText()).toEqual('Occupation Type is required.')
        allure.startStep("Verify that the correct error message for address line is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('addressLine1').getText()).toEqual("Address is required")
        allure.startStep("Verify that the correct error message for landmark is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('landmark').getText()).toEqual("LandMark is required")
        allure.startStep("Verify that the correct error message for residence type is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('Residence Type is required.').getText()).toEqual('Residence Type is required.')
        allure.startStep("Verify that the correct error message for pincode is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('pinCode').getText()).toEqual("Pincode is required")
        allure.startStep("Verify that the correct error message for state is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('State is required').getText()).toEqual('State is required')
        allure.startStep("Verify that the correct error message for city is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('City is required').getText()).toEqual('City is required')
        allure.startStep("Verify that the correct error message for loan tenure is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('Loan Tenure is required').getText()).toEqual('Loan Tenure is required')
        allure.startStep("Verify that the correct error message for requested amount is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('requestedLoanAmount').getText()).toEqual('Loan Amount (Rs.) is required')
        allure.startStep("Verify that the correct error message for product Name is displayed", true);
        expect(await KotakPage.geterrorMSGfromFieldElement('productName').getText()).toEqual('Product Name is required')
        allure.startStep('Verify the correct error message is displayed for student grade', true);
        await expect(await KotakPage.getErrorMsgUsingElementText('Student Grade is required').getText()).toEqual('Student Grade is required');
        allure.startStep("Verify that the correct error message for student DOB is displayed", true);
        expect(await KotakPage.geterrorMSGfromDropDown('Student Date of Birth is required.').getText()).toEqual('Student Date of Birth is required.')
        allure.startStep("Verify that the correct error message for Student Name is displayed", true);
        await expect(await KotakPage.geterrorMSGfromFieldElement("studentName").getText()).toEqual("Student Name is required.");
        allure.endStep();
    });

    it('Validate if incorrect email address is entered', async () => {
        allure.startStep('Enter customer and loan details with invalid email address', true);
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakInvalidemail)
        allure.startStep('Wait for an error message to appear', true);
        await KotakPage.geterrorMSGfromDropDown('Invalid Email address').waitForDisplayed({ timeout: 10000 });
        allure.startStep('Verify the correct error messege is displayed for invalid email address', true);
        await expect(await KotakPage.geterrorMSGfromDropDown('Invalid Email address').getText()).toEqual('Invalid Email address')
        allure.endStep();
    });

    it('Validate Age should be more than 21 years and less than 59 years.', async () => {
        allure.startStep('Enter customer details with invaid age above 65', true);
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakInvalidAgeMoreThan65);
        allure.startStep('Wait for an error message to appear', true);
        await KotakPage.geterrorMSGfromDropDown('Age should be more than 21 years and less than 59 years').waitForDisplayed({ timeout: 20000 })
        allure.startStep('Verify the correct error message is displayed for Invalid age', true);
        expect(await KotakPage.geterrorMSGfromDropDown('Age should be more than 21 years and less than 59 years').getText()).toEqual('Age should be more than 21 years and less than 59 years')
        allure.startStep('Open Byjus payment login page');
        await KotakPage.openByjusPayPage();
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using', true);
        await mongoConnect.kotakDeleteObjectFromDb(kotakData.kotakValidDetails.panNumber);
        allure.startStep('Enter customer details with invalid age below 21');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakInvalidAgeLessThan21);
        allure.startStep('Wait for an error message to appear', true);
        await KotakPage.geterrorMSGfromDropDown('Age should be more than 21 years and less than 59 years').waitForDisplayed({ timeout: 20000 });
        allure.startStep('Verify the correct error message is displayed for Invalid age', true);
        await expect(await KotakPage.geterrorMSGfromDropDown('Age should be more than 21 years and less than 59 years').getText()).toEqual('Age should be more than 21 years and less than 59 years');
        allure.endStep();
    });

    it('Validate the Customer Phone should accept 10digits, also check for the error messages for less/greater than 10 digits', async () => {
        allure.startStep('Enter customer details with invaid mobile no less than 10 digits', true);
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakInvalidMobileNoLessthan10Digits);
        allure.startStep('Wait for an error message to appear', true);
        await KotakPage.geterrorMSGfromFieldElement('telephoneNumber').waitForDisplayed({ timeout: 6000 })
        allure.startStep('Verify the correct error message is displayed for Invalid mobile no', true);
        await expect(await KotakPage.geterrorMSGfromFieldElement('telephoneNumber').getText()).toEqual('Invalid Mobile No');
        allure.startStep('Open Byjus payment login page');
        await KotakPage.openByjusPayPage();
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using', true);
        await mongoConnect.kotakDeleteObjectFromDb(kotakData.kotakValidDetails.panNumber);
        allure.startStep('Enter customer details with invaid mobile no more than 10 digits', true);
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakInvalidMobileNoMorethan10Digits);
        allure.startStep('Wait for an error message to appear', true);
        await KotakPage.geterrorMSGfromFieldElement('telephoneNumber').waitForDisplayed({ timeout: 6000 })
        allure.startStep('Verify the correct error message is displayed for Invalid mobile no', true);
        await expect(await KotakPage.geterrorMSGfromFieldElement('telephoneNumber').getText()).toEqual('Invalid Mobile No');
        allure.endStep();
    });
    it.skip('Valiate mobile no should not be same as alternate mobile no', async () => {
        allure.startStep('Enter customer details with same mobile no as alternate no', true);
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakSameMobileNoAsAlternateNo);
        allure.startStep('Wait for an error message to appear', true);
        await KotakPage.geterrorMSGfromFieldElement('alternateTelephoneNumber').waitForDisplayed({ timeout: 25000 })
        allure.startStep('Verify the correct error message is displayed for alternate mobile no', true);
        await expect(await KotakPage.geterrorMSGfromFieldElement('alternateTelephoneNumber').getText()).toEqual('Alternate Mobile No cannot be same as Mobile No')
        allure.endStep();
    });


    it('Validate loan Amount should be >= Rs.18000 and <= Rs. 120000', async () => {
        allure.startStep('Enter customer details with invalid loan amount less than 18000', true);
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakInvalidLoanAmountLessThan18000);
        allure.startStep('Wait for an error message to appear', true);
        await KotakPage.geterrorMSGfromFieldElement("requestedLoanAmount").waitForDisplayed({ timeout: 5000 })
        allure.startStep('Verify the correct error message is displayed for invalid loan amount', true);
        await expect(await KotakPage.geterrorMSGfromFieldElement("requestedLoanAmount").getText()).toEqual("Amount should be >= Rs.18000 and <= Rs. 120000")
        allure.startStep('Open Byjus payment login page');
        await KotakPage.openByjusPayPage();
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using', true);
        await mongoConnect.kotakDeleteObjectFromDb(kotakData.kotakValidDetails.panNumber);
        allure.startStep('Enter customer details with invalid loan amount more than 120000', true);
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakInvalidLoanAmountMoreThan120000);
        allure.startStep('Wait for an error message to appear', true);
        await KotakPage.geterrorMSGfromFieldElement("requestedLoanAmount").waitForDisplayed({ timeout: 5000 })
        allure.startStep('Verify the correct error message is displayed for invalid loan amount', true);
        await expect(await KotakPage.geterrorMSGfromFieldElement("requestedLoanAmount").getText()).toEqual("Amount should be >= Rs.18000 and <= Rs. 120000")
        allure.endStep();

    });
    it('Validate error message if incorrect pancard number is entered', async () => {
        allure.startStep('Enter customer details with invalid pancard number', true);
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakInvalidPanDetails);
        allure.startStep('Wait for an error message to appear', true);
        await KotakPage.geterrorMSGfromFieldElement('panNo').waitForDisplayed({ timeout: 5000 })
        allure.startStep('Verify the correct error message is displayed for invalid pancard number', true);
        await expect(await KotakPage.geterrorMSGfromFieldElement('panNo').getText()).toEqual('Invalid PAN Card No')
        allure.endStep();
    });

    it('Validate invalid otp error ', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep('Click on proceed button if pop up displayed ');
        await KotakPage.clickOnProceedButton();
        allure.startStep('Enter with invalid OTP', true);
        await KotakPage.tfEnterOtp.setValue("123456");
        allure.startStep('wait for verify OTP button to be clickable', true);
        await KotakPage.btnVerifyOtp.waitForClickable({ timeout: 20000 });
        allure.startStep('clicking on verify OTP button', true);
        await KotakPage.btnVerifyOtp.click();
        allure.startStep('wait for an error messege to be displayed', true);
        await KotakPage.errorMsgForOtp.waitForExist({ timeout: 26000 });
        allure.startStep('Verify the correct error message for OTP', true);
        await expect(await KotakPage.errorMsgForOtp.getText()).toEqual("Invalid OTP");
        allure.endStep();

    });
    it("Validate field when submitted blank(Upload bank statement)", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep('Click on proceed button if enable else wait for verify OTP button on next page to be displayed', true);
        await KotakPage.clickOnProceedButton();
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open kotak Unprocessed loan & get appId', true);
        let appId = await KotakPage.returnAppId(panNumber);
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
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('clicking on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('clicking on upload bank statement 2 photo button', true);
        await KotakPage.uploadBankStatement2Photo.click();
        allure.startStep('clicking on upload bank statement radio button', true);
        await KotakPage.cbToBankStatement.click();
        allure.startStep('clicking on bank statement continue button', true);
        await KotakPage.btnContinueBankStatementPage.click();
        allure.startStep('Wait fot error message to be displayed', true);
        await KotakPage.otpErrorMsg.waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify correct error message is displayed', true);
        await expect(await KotakPage.otpErrorMsg.getText()).toEqual("Please select bank statement source.");
        allure.endStep();
    })
    it('Validate error message without uploading bank statement image', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep('Click on proceed button if enable else wait for verify OTP button on next page to be displayed', true);
        await KotakPage.clickOnProceedButton();
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open kotak Unprocessed loan & get appId', true);
        let appId = await KotakPage.returnAppId(panNumber);
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
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('clicking on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('clicking on upload bank statement 2 photo button', true);
        await KotakPage.uploadBankStatement2Photo.click();
        allure.startStep('clicking on bank statement source', true);
        await KotakPage.ddBankStatementSource.click();
        allure.startStep('Selecting Email as source', true);
        await browser.keys(["E", "m", "a", "i", "l", "Tab"]);
        allure.startStep('clicking on upload bank statement radio button', true);
        await KotakPage.rbUploadDocuments.click();
        allure.startStep('clicking on upload document button', true);
        await KotakPage.btnUploadDocuments.click();
        allure.startStep('clicking on upload bank statement radio button', true);
        await KotakPage.cbToBankStatement.click();
        allure.startStep('clicking on continue button', true);
        await KotakPage.btnContinueBankStatementPage.click();
        allure.startStep('Wait for the error message to be displayed', true);
        await KotakPage.otpErrorMsg.waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message', true);
        await expect(await KotakPage.otpErrorMsg.getText()).toEqual("Please upload a screenshot of the source.");
        allure.endStep();

    });

    it('(Account Details) Validate Account number must be numeric', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep('Click on proceed button if enable else wait for verify OTP button on next page to be displayed', true);
        await KotakPage.clickOnProceedButton();
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open kotak Unprocessed loan & get appId', true);
        let appId = await KotakPage.returnAppId(panNumber);
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
        await mongoConnect.kotakAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Wait for upload bank statement photo tab to be exist', true);
        await KotakPage.uploadBankStatement2Photo.waitForExist({ timeout: 5000 })
        allure.startStep('Click on upload bank statement photo tab', true);
        await KotakPage.uploadBankStatement2Photo.click()
        allure.startStep('setting invalid values to account number field', true);
        await KotakPage.tfAccountNumber.setValue("statebank");
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 6000 });
        allure.startStep('clicking on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Wait for an error message for account number to be displayed', true);
        await KotakPage.getErrorMsgElement('accountNumber').waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message is displayed for valid account number', true);
        await expect(await KotakPage.getErrorMsgElement('accountNumber').getText()).toEqual('Account number must be numeric');
        allure.endStep();

    });

    it('Validate field validations when submitted blank (not working until you enter account number)', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep('Click on proceed button if enable else wait for verify OTP button on next page to be displayed', true);
        await KotakPage.clickOnProceedButton();
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open kotak Unprocessed loan & get appId', true);
        let appId = await KotakPage.returnAppId(panNumber);
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
        allure.startStep("Add data to db to move to account details page", true);
        await mongoConnect.kotakAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 10000 });
        allure.startStep('Clicking on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Wait for upload bank statement photo tab to be exist', true);
        await KotakPage.uploadBankStatement2Photo.waitForExist({ timeout: 5000 })
        allure.startStep('Click on upload bank statement photo tab', true);
        await KotakPage.uploadBankStatement2Photo.click()
        allure.startStep('Setting values to account number field', true);
        await KotakPage.tfAccountNumber.setValue("87451236521");
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Wait for correct error msg for title is displayed', true);
        await KotakPage.getErrorMsgUsingElementText('Title is required.').waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message is displayed for title', true);
        await expect(await KotakPage.getErrorMsgUsingElementText('Title is required.')).toHaveTextContaining('Title is required.');
        allure.startStep('Verify the correct error message is displayed for Account number', true);
        await expect(await KotakPage.getErrorMsgUsingElementText('Account Type is required.')).toHaveTextContaining('Account Type is required.');
        allure.startStep('Verify the correct error message is displayed for bank required', true);
        await expect(await KotakPage.getErrorMsgUsingElementText('Bank Name is required.')).toHaveTextContaining('Bank Name is required.');
        allure.startStep('Verify the correct error message is displayed for IFSC code', true);
        await expect(await KotakPage.getErrorMsgElementByLabel('IFSC').getText()).toEqual('IFSC is required.');
        allure.startStep('Verify the correct error message is displayed for MICR code', true);
        await expect(await KotakPage.getErrorMsgElementByLabel('MICR').getText()).toEqual('MICR is required.');
        allure.startStep('Verify the correct error message is displayed for city', true);
        await expect(await KotakPage.getErrorMsgElementByLabel('City').getText()).toEqual('City is required.');
        allure.endStep();
    });

    it('Validate error message when submitted blank(LMS portal)', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep("Click on Proceed button", true);
        await KotakPage.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await KotakPage.returnAppId(kotakData.kotakValidDetails.panNumber);
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
        await mongoConnect.kotakAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "kotak");
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep("Open LMS portal", true);
        await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
        allure.startStep("Wait for sign in button to be displayed", true);
        await KotakPage.btnSignInWithGoogleLms.waitForExist({ timeout: 30000 });
        allure.startStep("Click on Sign in with google button", true);
        await KotakPage.btnSignInWithGoogleLms.click();
        allure.startStep("Click on Continue with google button", true);
        await KotakPage.btnContinueWithGoogle.click();
        allure.startStep("Wait for the manage utilities button to be displayed", true);
        await KotakPage.btnManageUtilities.waitForExist({ timeout: 30000 });
        allure.startStep("Click on manage utilities google button", true);
        await KotakPage.btnManageUtilities.click();
        allure.startStep("Click on Abb ticket button", true);
        await KotakPage.btnAbbTicket.click();
        allure.startStep("Enter appID in App Id search box", true);
        await KotakPage.btnAbbTicketSearchBox.setValue(appId);
        allure.startStep("Press enter", true);
        await browser.keys("Enter");
        allure.startStep("Wait for appID to be clickable", true);
        await KotakPage.btnOpenAppId(appId).waitForClickable();
        allure.startStep("Click on appID", true);
        await KotakPage.btnOpenAppId(appId).click();
        allure.startStep("Click on submit button", true);
        await KotakPage.btnSubmit.click();
        allure.startStep("Wait for the error message to be displayed", true);
        await KotakPage.ErrorMsgLmsPortal.waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify the correct error message is displayed", true);
        await expect(await KotakPage.ErrorMsgLmsPortal.getText()).toEqual("Please enter all required details!");
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    });
    it('Validate error message when clicked on Continue button without Selecting first EMI date', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep("Click on Proceed button", true);
        await KotakPage.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await KotakPage.returnAppId(kotakData.kotakValidDetails.panNumber);
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
        await mongoConnect.kotakAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await KotakPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, kotakData.kotakValidDetails);
        allure.startStep('Close the Lms window', true);
        await browser.closeWindow();
        allure.startStep('Switch to window handles[0]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Wait for Continue button on loan aggrement page is clickable', true);
        await KotakPage.btnContinue.waitForEnabled({ timeout: 60000 });
        allure.startStep('Click on Continue button on loan aggrement page', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Wait for the error message to be displayed', true);
        await KotakPage.getErrorMsgUsingElementText('First EMI Date is required.').waitForDisplayed({ timeout: 10000 });
        allure.startStep('Verify that correct error message is dispalyed', true);
        await expect(await KotakPage.getErrorMsgUsingElementText('First EMI Date is required.').getText()).toEqual('First EMI Date is required.');
        allure.endStep();
    });

    it('Validate the error message  when we click on  upload button without choosing the file (Upload documents page)', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep("Click on Proceed button", true);
        await KotakPage.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await KotakPage.returnAppId(kotakData.kotakValidDetails.panNumber);
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
        await mongoConnect.kotakAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "kotak");
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await KotakPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, kotakData.kotakValidDetails);
        allure.startStep('Close the LMS portal window', true);
        await browser.closeWindow();
        allure.startStep('Switch to payments window', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('select Emi Date And Approve LoanAgreement', true);
        await KotakPage.selectEmiDateAndApproveLoanAgreement()
        allure.startStep('Select Physical nach radio button and generate Pnach', true);
        await KotakPage.verifyOKYC()
        allure.startStep('wait for radio button to be clickable', true);
        await KotakPage.rbUploadDocument.waitForClickable({ timeout: 5000 })
        allure.startStep('click on upload document radio button', true);
        await KotakPage.rbUploadDocument.click()
        allure.startStep('click on upload document button', true);
        await KotakPage.btnUploadPersonalDocument.click()
        allure.startStep('wait for error message to be displayed ', true);
        await KotakPage.geterrorMSGfromFieldElement("firstName").waitForDisplayed({ timeout: 5000 })
        allure.startStep('verify error message for firstname', true);
        await expect(await KotakPage.geterrorMSGfromFieldElement("firstName").getText()).toEqual('Enter Borrower First Name as per selected POI is required.')
        allure.startStep('verify error message for lastname', true);
        await expect(await KotakPage.geterrorMSGfromFieldElement("lastName").getText()).toEqual('Enter Borrower Last Name as per selected POI is required.')
        allure.startStep('verify error message for number', true);
        await expect(await KotakPage.geterrorMSGfromFieldElement("number").getText()).toEqual('Enter POA Number is required.')
        allure.endStep();
    });

    it('Validate correct AppId is displayed on loan eligibility status', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep("Click on Proceed button", true);
        await KotakPage.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await KotakPage.returnAppId(panNumber);
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
        await mongoConnect.kotakAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "kotak");
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await KotakPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, kotakData.kotakValidDetails);
        allure.startStep('Close the LMS portal window', true);
        await browser.closeWindow();
        allure.startStep('Switch to payments window', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to esign agreement page", true);
        await mongoConnect.kotakAddDetailsToDb(appId, dataToMoveTo.eSignAgreementPage)
        allure.startStep('Update Esign details in transactionscibil collection', true);
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection', true);
        await mongoConnect.updateEsignPDFDocument(appId);
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Wait for done button to be displayed on loan eligibility status page', true);
        await KotakPage.btnDone.waitForDisplayed({ timeout: 10000 });
        allure.startStep('Verify the correct app Id is displayed on loan eligibilty status page', true);
        await expect(await KotakPage.appIdText.getText()).toEqual(`${appId}`)
        allure.endStep();
    });

});