import IIFLLoan from '../../../../pages/loan_payments_page/iifl.payment.page';
import { iiflData } from '../../../../data/iifl.loanform.data';
import mongoConnect from '../../../../utils/mongoconnect';
import { AllureUtil as allure } from '../../../../utils/util.allure';
import { dataToMoveTo } from '../../../../data/iifl.move.to.particular.page';

describe('Verify field validation for IIFL Loan payment option', async () => {

   beforeEach('Open payment portal', async () => {
      allure.startStep("Maximize the window");
      await browser.maximizeWindow();
      allure.startStep('Open Byjus payment login page');
      await IIFLLoan.openByjusPayPage();
      allure.startStep('Login to the payment page', true);
      await IIFLLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
      allure.startStep('Deleting object from Db which has pan number we used', true);
      await mongoConnect.iiflDeleteObjectFromDb(iiflData.iiflValidDetails.panNumber, iiflData.iiflValidDetails.phoneNumber);
   })
   afterEach('Delete object from DB', async () => {
      allure.startStep('Deleting object from Db which has pan number we used', true);
      await mongoConnect.iiflDeleteObjectFromDb(iiflData.iiflValidDetails.panNumber, iiflData.iiflValidDetails.phoneNumber);
   });
   it('Validate Age should be more than 21 years and less than 58 years', async () => {
      allure.startStep('Enter invalid age less than 21 years in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflInvalidAgeLessthan21);
      allure.startStep('Wait for the invalid age error message to be displayed', true);
      await IIFLLoan.getErrorMsgDropdownElement('Age should be more than 21 years and less than 58 years').waitForDisplayed({ timeout: 5000 });
      allure.startStep('Verify the correct error message is displayed for the Invalid age less than 21 years', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('Age should be more than 21 years and less than 58 years').getText()).toEqual('Age should be more than 21 years and less than 58 years');
      allure.startStep('Open Byjus payment login page');
      await IIFLLoan.openByjusPayPage();
      allure.startStep('Enter invalid age more than 60 years in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflInvalidAgeMorethan60);
      allure.startStep('Wait for the invalid age error message to be displayed', true);
      await IIFLLoan.getErrorMsgDropdownElement('Age should be more than 21 years and less than 58 years').waitForDisplayed({ timeout: 5000 });
      allure.startStep('Verify the correct error message is displayed for the Invalid age more than 60 years', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('Age should be more than 21 years and less than 58 years').getText()).toEqual('Age should be more than 21 years and less than 58 years');
      allure.endStep();
   })

   it('Validate the Customer Phone should accept 10digits, also check for the error messages for less and more than 10 digits', async () => {
      allure.startStep('Enter invalid mobile number less than 10 digits in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflInvalidMobileNoLessthan10Digits);
      allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
      await IIFLLoan.getErrorMsgTextFieldElement('telephoneNumber').waitForDisplayed({ timeout: 5000 });
      allure.startStep('Verify the correct error message is displayed for the Invalid mobile number less than 10 digits', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement('telephoneNumber').getText()).toEqual('Invalid Mobile No');
      allure.startStep('Open Byjus payment login page');
      await IIFLLoan.openByjusPayPage();
      allure.startStep('Enter invalid mobile number more than 10 digits in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflInvalidMobileNoMorethan10Digits);
      allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
      await IIFLLoan.getErrorMsgTextFieldElement('telephoneNumber').waitForDisplayed({ timeout: 5000 });
      allure.startStep('Verify the correct error message is displayed for the Invalid mobile number more than 10 digits', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement('telephoneNumber').getText()).toEqual('Invalid Mobile No');
      allure.endStep();
   })

   it('Validate correct pan number', async () => {
      allure.startStep('Enter invalid pan number 9 digits in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflInvalidPanNo9digits);
      allure.startStep('Wait for the invalid pan number error message to be displayed', true);
      await IIFLLoan.getErrorMsgTextFieldElement('panNo').waitForDisplayed({ timeout: 5000 });
      allure.startStep('Verify the correct error message is displayed for the Invalid pan number 9 digits', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement('panNo').getText()).toEqual('Invalid PAN Card No');
      allure.endStep();
   })

   it('Validate Loan Amount should be between Rs.18000 and Rs. 120000', async () => {
      allure.startStep('Enter invalid loan amount less than 18000 in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflInvalidLoanAmountLessthan18000);
      allure.startStep('Wait for the invalid loan amount error message to be displayed', true);
      await IIFLLoan.getErrorMsgTextFieldElement('requestedLoanAmount').waitForDisplayed({ timeout: 10000 });
      allure.startStep('Verify the correct error message is displayed for the Invalid loan amount less than 18000', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement('requestedLoanAmount').getText()).toEqual('Amount should be >= Rs.18000 and <= Rs. 120000');
      allure.startStep('Open Byjus payment login page');
      await IIFLLoan.openByjusPayPage();
      allure.startStep('Enter invalid loan amount more than 120000 in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflInvalidLoanAmountMorethan120000);
      allure.startStep('Wait for the invalid loan amount error message to be displayed', true);
      await IIFLLoan.getErrorMsgTextFieldElement('requestedLoanAmount').waitForDisplayed({ timeout: 10000 });
      allure.startStep('Verify the correct error message is displayed for the Invalid loan amount more than 120000', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement('requestedLoanAmount').getText()).toEqual('Amount should be >= Rs.18000 and <= Rs. 120000');
      allure.endStep();
   })

   it('Validate when pincode entered correct city name alligned to that pincode should appear', async () => {
      allure.startStep('Click on IIFL pay button');
      await IIFLLoan.btnIIFLPay.click();
      allure.startStep('Click on skip upload documents button in the pop up', true);
      await IIFLLoan.btnSkipUploadDocument.click();
      allure.startStep('Wait for the element to be clickable', true);
      await IIFLLoan.tfBorrowersPinCode.isClickable({ timeout: 5000 });
      allure.startStep('Enter valid pincode', true);
      await IIFLLoan.tfBorrowersPinCode.setValue("452009");
      allure.startStep('2 seconds wait for city name to be displayed', true);
      await browser.pause(2000);
      allure.startStep('Verify correct city name alligned to the given pincode should appear', true);
      await expect(await IIFLLoan.ddCityName.getText()).toEqual('Indore');
      allure.endStep();
   })

   it('Validate field validations when submitted blank', async () => {
      allure.startStep('Click on IIFL pay button');
      await IIFLLoan.btnIIFLPay.click();
      allure.startStep('Click on skip upload documents button in the pop up', true);
      await IIFLLoan.btnSkipUploadDocument.click();
      allure.startStep('Wait for the Checkbox to be clickable', true);
      await IIFLLoan.cbToSendOtp.isClickable({ timeout: 5000 });
      allure.startStep('Click on checkbox', true);
      await IIFLLoan.cbToSendOtp.click();
      allure.startStep('Click on Send OTP button', true);
      await IIFLLoan.btnSendOtp.click();
      allure.startStep('Wait for the invalid pan number error message to be displayed', true);
      await IIFLLoan.getErrorMsgTextFieldElement('panNo').waitForDisplayed({ timeout: 50000 });
      allure.startStep('Verify the correct error message is displayed for the Invalid Pan number', true);
      let errorMessage = await expect(await IIFLLoan.getErrorMsgTextFieldElement('panNo').getText());
      allure.startStep('Varify correct error message displayed', true);
      if (errorMessage == "Invalid PAN Card No") {
         await expect(errorMessage).toEqual("Invalid PAN Card No");
      }
      else if (errorMessage == "PAN Card No is required") {
         await expect(errorMessage).toEqual("PAN Card No is required");
      }
      allure.startStep('Verify the correct error message is displayed for the  Age', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('Birthdate is required').getText()).toEqual('Birthdate is required');
      allure.startStep('Verify the correct error message is displayed for the  Gender', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('Gender is required').getText()).toEqual('Gender is required');
      allure.startStep('Verify the correct error message is displayed for the  Mobile number', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement('telephoneNumber').getText()).toEqual('Mobile No is required');
      allure.startStep('Verify the correct error message is displayed for the  Email address', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('Email address is required').getText()).toEqual('Email address is required');
      allure.startStep('Verify the correct error message is displayed for the  Borrowers Father Name', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement("fathersName").getText()).toEqual("Borrower's Father Name is required");
      allure.startStep('Verify the correct error message is displayed for the  Borrowers Mother Name', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement("mothersName").getText()).toEqual("Borrower's Mother Name is required.");
      allure.startStep('Verify the correct error message is displayed for the  Qualification', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('Education Qualification is required.').getText()).toEqual('Education Qualification is required.');
      allure.startStep('Verify the correct error message is displayed for the  occupation Type', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('Occupation Type is required.').getText()).toEqual('Occupation Type is required.');
      allure.startStep('Verify the correct error message is displayed for the  address', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement('addressLine1').getText()).toEqual('Address is required');
      allure.startStep('Verify the correct error message is displayed for the  Pincode', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement('pinCode').getText()).toEqual('Pincode is required');
      allure.startStep('Verify the correct error message is displayed for the Invalid State', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('State is required').getText()).toEqual('State is required');
      allure.startStep('Verify the correct error message is displayed for the Invalid City', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('City is required').getText()).toEqual('City is required');
      allure.startStep('Verify the correct error message is displayed for the Invalid Loan amount', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement('requestedLoanAmount').getText()).toEqual('Loan Amount (Rs.) is required');
      allure.startStep('Verify the correct error message is displayed for the Invalid Loan tenure', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('Loan Tenure is required').getText()).toEqual('Loan Tenure is required');
      allure.startStep('Verify the correct error message is displayed for the Invalid Product name', true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement('productName').getText()).toEqual('Product Name is required');
      allure.startStep('Verify the correct error message is displayed for student grade', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('Student Grade is required').getText()).toEqual('Student Grade is required');
      allure.startStep("Verify that the correct error message for martial status is displayed", true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement("Marital Status is required.").getText()).toEqual("Marital Status is required.");
      allure.startStep("Verify that the correct error message for Residence type is displayed", true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement("Residence Type is required.").getText()).toEqual("Residence Type is required.");
      allure.startStep("Verify that the correct error message for student Birthdate is displayed", true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement("Student Date of Birth is required.").getText()).toEqual("Student Date of Birth is required.");
      allure.startStep("Verify that the correct error message for Income  is displayed", true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement("incomeSlab").getText()).toEqual("Income (monthly) is required.");
      allure.startStep("Verify that the correct error message for Alternate mobile no is displayed", true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement("alternateTelephoneNumber").getText()).toEqual("Alternate Mobile No is required.");
      allure.startStep("Verify that the correct error message for Student Name is displayed", true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement("studentName").getText()).toEqual("Student Name is required.");
      allure.endStep();
   })

   it('Validate error message if we click on Continue button without selecting Bank statement source', async () => {
      allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
      allure.startStep('Click on proceed button in pop up');
      await IIFLLoan.clickOnProceedBtn();
      allure.startStep('Open new window of payments page');
      await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
      allure.startStep('Login to the payment page', true);
      await IIFLLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
      allure.startStep('Open IIFL Unprocessed loan & get appId', true);
      let appId = await IIFLLoan.returnAppId(panNumber);
      allure.startStep("Address of window is stored in a variable", true);
      const handles = await browser.getWindowHandles();
      allure.startStep('Switched to window handles[0]', true);
      await browser.switchToWindow(handles[0]);
      allure.startStep('Close the window');
      await browser.closeWindow();
      allure.startStep('Switched to window handles[1]', true);
      await browser.switchToWindow(handles[1]);
      allure.startStep("Update status in db to bypass otp process", true);
      await mongoConnect.updatetransactionsCibilRecord(appId);
      allure.startStep("Refresh page to get the updates visible", true);
      await browser.refresh();
      allure.startStep('clicking on resume button', true);
      await IIFLLoan.btnResume(appId).click();
      allure.startStep('Click on continue button to complete the remaining steps', true);
      await IIFLLoan.btnContinue.click();
      allure.startStep('Waiting for Bank statement radio button to be clickable', true);
      await IIFLLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
      allure.startStep('Click on for Bank statement radio button', true);
      await IIFLLoan.rbBankStatementPassbook.click();
      allure.startStep('Click on checkbox to continue button', true);
      await IIFLLoan.cbToSendOtp.click();
      allure.startStep('Click on continue button', true);
      await IIFLLoan.btnContinue.click();
      allure.startStep('Wait for error message to be displayed', true);
      await IIFLLoan.ErrorMsgBankStatementUpload.waitForDisplayed({ timeout: 5000 })
      allure.startStep('Verify the correct error message is displayed', true);
      await expect(await IIFLLoan.ErrorMsgBankStatementUpload.getText()).toEqual('Please select bank statement source.');
      allure.endStep();
   })

   it('Validate error message when Bank statement source is selected & if we click on Upload button without choosing the file', async () => {
      allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
      allure.startStep('Click on proceed button in pop up');
      await IIFLLoan.clickOnProceedBtn();
      allure.startStep('Open new window of payments page');
      await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
      allure.startStep('Login to the payment page', true);
      await IIFLLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
      allure.startStep('Open IIFL Unprocessed loan & get appId', true);
      let appId = await IIFLLoan.returnAppId(panNumber);
      allure.startStep("Address of window is stored in a variable", true);
      const handles = await browser.getWindowHandles();
      allure.startStep('Switched to window handles[0]', true);
      await browser.switchToWindow(handles[0]);
      allure.startStep('Close the window');
      await browser.closeWindow();
      allure.startStep('Switched to window handles[1]', true);
      await browser.switchToWindow(handles[1]);
      allure.startStep("Update status in db to bypass otp process", true);
      await mongoConnect.updatetransactionsCibilRecord(appId);
      allure.startStep("Refresh page to get the updates visible", true);
      await browser.refresh();
      allure.startStep('clicking on resume button', true);
      await IIFLLoan.btnResume(appId).click();
      allure.startStep('Click on continue button to complete the remaining steps', true);
      await IIFLLoan.btnContinue.click();
      allure.startStep('Waiting for Bank statement radio button to be clickable', true);
      await IIFLLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
      allure.startStep('Click on for Bank statement radio button', true);
      await IIFLLoan.rbBankStatementPassbook.click();
      allure.startStep('Click on for Bank statement source drop down', true);
      await IIFLLoan.ddBankStatementSource.click();
      allure.startStep('Select email as a source for Bank statement', true);
      await browser.keys(["E", "m", "a", "i", "l", "Tab"])
      allure.startStep('Click on upload radio button', true);
      await IIFLLoan.rbUploadDocument.click();
      allure.startStep('Click on upload button', true);
      await IIFLLoan.btnUploadFile.click();
      allure.startStep('Wait for error message to be displayed', true);
      await IIFLLoan.ErrorMsgBankStatementUpload.waitForDisplayed({ timeout: 10000 })
      allure.startStep('Verify the correct error message is displayed', true);
      await expect(await IIFLLoan.ErrorMsgBankStatementUpload.getText()).toEqual('You need to click photo first or select file to upload');
      allure.endStep();
   })

   it('Validate error message when Bank statement source is selected & if we click on Continue button without uploading the Screeshot of Bank statement.', async () => {
      allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
      allure.startStep('Click on proceed button in pop up');
      await IIFLLoan.clickOnProceedBtn();
      allure.startStep('Open new window of payments page');
      await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
      allure.startStep('Login to the payment page', true);
      await IIFLLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
      allure.startStep('Open IIFL Unprocessed loan & get appId', true);
      let appId = await IIFLLoan.returnAppId(panNumber);
      allure.startStep("Address of window is stored in a variable", true);
      const handles = await browser.getWindowHandles();
      allure.startStep('Switched to window handles[0]', true);
      await browser.switchToWindow(handles[0]);
      allure.startStep('Close the window');
      await browser.closeWindow();
      allure.startStep('Switched to window handles[1]', true);
      await browser.switchToWindow(handles[1]);
      allure.startStep("Update status in db to bypass otp process", true);
      await mongoConnect.updatetransactionsCibilRecord(appId);
      allure.startStep("Refresh page to get the updates visible", true);
      await browser.refresh();
      allure.startStep('clicking on resume button', true);
      await IIFLLoan.btnResume(appId).click();
      allure.startStep('Click on continue button to complete the remaining steps', true);
      await IIFLLoan.btnContinue.click();
      allure.startStep('Waiting for Bank statement radio button to be clickable', true);
      await IIFLLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
      allure.startStep('Click on for Bank statement radio button', true);
      await IIFLLoan.rbBankStatementPassbook.click();
      allure.startStep('Click on for Bank statement source drop down', true);
      await IIFLLoan.ddBankStatementSource.click();
      allure.startStep('Select email as a source for Bank statement', true);
      await browser.keys(["E", "m", "a", "i", "l", "Tab"])
      allure.startStep('Click on upload radio button', true);
      await IIFLLoan.rbUploadDocument.click();
      allure.startStep('Click on check box to continue button', true);
      await IIFLLoan.cbToSendOtp.click();
      allure.startStep('Click on continue button', true);
      await IIFLLoan.btnContinue.click();
      allure.startStep('Wait for error message to be displayed', true);
      await IIFLLoan.ErrorMsgBankStatementUpload.waitForDisplayed({ timeout: 10000 })
      allure.startStep('Verify the correct error message is displayed', true);
      await expect(await IIFLLoan.ErrorMsgBankStatementUpload.getText()).toEqual('Please upload a screenshot of the source.');
      allure.endStep();
   })

   it("Validate Account number must be numeric", async () => {
      allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
      allure.startStep("Click on Proceed button", true);
      await IIFLLoan.clickOnProceedBtn();
      allure.startStep("Open Order Page Url in new window", true);
      await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
      allure.startStep("Login to the payment page", true);
      await IIFLLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
      allure.startStep('Open IIFL Unprocessed loan & get appId', true);
      let appId = await IIFLLoan.returnAppId(panNumber);
      allure.startStep("Address of window is stored in a variable", true);
      const handles = await browser.getWindowHandles();
      allure.startStep('Switched to window handles[0]', true);
      await browser.switchToWindow(handles[0]);
      allure.startStep('Close the window');
      await browser.closeWindow();
      allure.startStep('Switched to window handles[1]', true);
      await browser.switchToWindow(handles[1]);
      allure.startStep("Update status in db to bypass otp process", true);
      await mongoConnect.updatetransactionsCibilRecord(appId);
      allure.startStep("Add data to db to move to Account Information page", true);
      await mongoConnect.iiflAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
      allure.startStep("Refresh page to get the updates visible", true);
      await browser.refresh();
      allure.startStep('clicking on resume button', true);
      await IIFLLoan.btnResume(appId).click();
      allure.startStep('Click on continue button to complete the remaining steps', true);
      await IIFLLoan.btnContinue.click();
      allure.startStep("Select Bank statement passbook radio button", true);
      await IIFLLoan.rbBankStatementPassbook.click();
      allure.startStep("Click on name title field", true);
      await IIFLLoan.ddNameTitle.click();
      allure.startStep("Set value to Mr in the drop down", true);
      await browser.keys(["M", "r", "Tab"]);
      allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
      await IIFLLoan.tfCustomerName.setValue("Dummy customer name");
      allure.startStep("Set value to afdctrshyu in the Account Number text field", true);
      await IIFLLoan.tfAccountNumber.setValue("afdctrshyu");
      allure.startStep("Click on continue button", true);
      await IIFLLoan.btnContinue.click();
      allure.startStep("Wait for error message to be displayed", true);
      await IIFLLoan.getErrorMsgTextFieldElement("accountNumber").waitForDisplayed({ timeout: 5000 });
      allure.startStep("Verify the error message for Account Number must be numeric is displayed", true);
      await expect(await IIFLLoan.getErrorMsgTextFieldElement("accountNumber").getText()).toEqual("Account number must be numeric");
      allure.endStep();
   })

   it('Validate error message when submitted blank(LMS portal)', async () => {
      allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
      allure.startStep("Click on Proceed button", true);
      await IIFLLoan.clickOnProceedBtn();
      allure.startStep("Open Order Page Url in new window", true);
      await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
      allure.startStep("Login to the payment page", true);
      await IIFLLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
      allure.startStep('Open IIFL Unprocessed loan & get appId', true);
      let appId = await IIFLLoan.returnAppId(panNumber);
      allure.startStep("Address of window is stored in a variable", true);
      const handles = await browser.getWindowHandles();
      allure.startStep('Switched to window handles[0]', true);
      await browser.switchToWindow(handles[0]);
      allure.startStep('Close the window');
      await browser.closeWindow();
      allure.startStep('Switched to window handles[1]', true);
      await browser.switchToWindow(handles[1]);
      allure.startStep("Update status in db to bypass otp process", true);
      await mongoConnect.updatetransactionsCibilRecord(appId);
      allure.startStep("Add data to db to move to Ops team approval page", true);
      await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
      allure.startStep("Creating new object in Abb assesements collection", true);
      await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
      allure.startStep("Refresh page to get the updates visible", true);
      await browser.refresh();
      allure.startStep('clicking on resume button', true);
      await IIFLLoan.btnResume(appId).click();
      allure.startStep('Click on continue button to complete the remaining steps', true);
      await IIFLLoan.btnContinue.click();
      allure.startStep("Open Lms portal", true);
      await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
      //5 seconds wait for sign in with with google button to be appeared(Tried waitForClickable & waitForDisplayed)
      allure.startStep("5 sec wait for sign in button to be displayed", true);
      await browser.pause(5000);
      allure.startStep("Wait for sign in button to be displayed", true);
      let signInBtn = await IIFLLoan.btnSignInWithGoogle.isDisplayed();
      allure.startStep("Click on Sign in with google button", true);
      await IIFLLoan.btnSignInWithGoogle.click();
      allure.startStep("Click on Continue with google button", true);
      await IIFLLoan.btnContinueWithGoogle.click();
      allure.startStep("Wait for the manage utilities button to be displayed", true);
      await IIFLLoan.btnManageUtilities.waitForExist({ timeout: 30000 });
      allure.startStep("Click on manage utilities google button", true);
      await IIFLLoan.btnManageUtilities.click();
      allure.startStep("Click on Abb ticket button", true);
      await IIFLLoan.btnAbbTicket.click();
      allure.startStep("Enter appID in App Id search box", true);
      await IIFLLoan.btnAbbTicketSearchBox.setValue(appId);
      allure.startStep("Press enter", true);
      await browser.keys("Enter");
      allure.startStep("Wait for appID to be clickable", true);
      await IIFLLoan.btnOpenAppId(appId).waitForClickable();
      allure.startStep("Click on appID", true);
      await IIFLLoan.btnOpenAppId(appId).click();
      allure.startStep("Click on submit button", true);
      await IIFLLoan.btnSubmit.click();
      allure.startStep("Wait for the error message to be displayed", true);
      await IIFLLoan.ErrorMsgLmsPortal.waitForDisplayed({ timeout: 5000 });
      allure.startStep("Verify the correct error message is displayed", true);
      await expect(await IIFLLoan.ErrorMsgLmsPortal.getText()).toEqual("Please enter all required details!");
      allure.startStep("Close the Lms window", true);
      await browser.closeWindow();
      allure.startStep("Switch to window handles[1]", true);
      await browser.switchToWindow(handles[1]);
      allure.endStep();
   })

   it('Validate error message when clicked on Continue button without Selecting first EMI date', async () => {
      allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
      allure.startStep("Click on Proceed button", true);
      await IIFLLoan.clickOnProceedBtn();
      allure.startStep("Open Order Page Url in new window", true);
      await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
      allure.startStep("Login to the payment page", true);
      await IIFLLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
      allure.startStep('Open IIFL Unprocessed loan & get appId', true);
      let appId = await IIFLLoan.returnAppId(panNumber);
      allure.startStep("Address of window is stored in a variable", true);
      const handles = await browser.getWindowHandles();
      allure.startStep('Switched to window handles[0]', true);
      await browser.switchToWindow(handles[0]);
      allure.startStep('Close the window');
      await browser.closeWindow();
      allure.startStep('Switched to window handles[1]', true);
      await browser.switchToWindow(handles[1]);
      allure.startStep("Update status in db to bypass otp process", true);
      await mongoConnect.updatetransactionsCibilRecord(appId);
      allure.startStep("Add data to db to move to Ops team approval page", true);
      await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
      allure.startStep("Creating new object in Abb assesements collection", true);
      await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
      allure.startStep("Refresh page to get the updates visible", true);
      await browser.refresh();
      allure.startStep('clicking on resume button', true);
      await IIFLLoan.btnResume(appId).click();
      allure.startStep('Click on continue button to complete the remaining steps', true);
      await IIFLLoan.btnContinue.click();
      allure.startStep('Go to LMS portal & approve the loan for given appId', true);
      await IIFLLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, iiflData.iiflValidDetails);
      allure.startStep('Close the Lms window', true);
      await browser.closeWindow();
      allure.startStep('Switch to window handles[1]', true);
      await browser.switchToWindow(handles[1]);
      allure.startStep('Wait for Continue button on loan aggrement page is clickable', true);
      await IIFLLoan.btnContinue.waitForEnabled({ timeout: 60000 });
      allure.startStep('Click on Continue button on loan aggrement page', true);
      await IIFLLoan.btnContinue.click();
      allure.startStep('Wait for the error message to be displayed', true);
      await IIFLLoan.getErrorMsgDropdownElement('First EMI Date is required.').waitForDisplayed({ timeout: 10000 });
      allure.startStep('Verify that correct error message is dispalyed', true);
      await expect(await IIFLLoan.getErrorMsgDropdownElement('First EMI Date is required.').getText()).toEqual('First EMI Date is required.');
      allure.endStep();
   })

   it('Validate the error message we get when we click on upload button without choosing the file(Upload documents page)', async () => {
      allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
      let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
      allure.startStep("Click on Proceed button", true);
      await IIFLLoan.clickOnProceedBtn();
      allure.startStep("Open Order Page Url in new window", true);
      await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
      allure.startStep("Login to the payment page", true);
      await IIFLLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
      allure.startStep('Open IIFL Unprocessed loan & get appId', true);
      let appId = await IIFLLoan.returnAppId(panNumber);
      allure.startStep("Address of window is stored in a variable", true);
      const handles = await browser.getWindowHandles();
      allure.startStep('Switched to window handles[0]', true);
      await browser.switchToWindow(handles[0]);
      allure.startStep('Close the window');
      await browser.closeWindow();
      allure.startStep('Switched to window handles[1]', true);
      await browser.switchToWindow(handles[1]);
      allure.startStep("Update status in db to bypass otp process", true);
      await mongoConnect.updatetransactionsCibilRecord(appId);
      allure.startStep("Add data to db to move to Ops team approval page", true);
      await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
      allure.startStep("Creating new object in Abb assesements collection", true);
      await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
      allure.startStep("Refresh page to get the updates visible", true);
      await browser.refresh();
      allure.startStep('clicking on resume button', true);
      await IIFLLoan.btnResume(appId).click();
      allure.startStep('Click on continue button to complete the remaining steps', true);
      await IIFLLoan.btnContinue.click();
      allure.startStep('Go to LMS portal & approve the loan for given appId', true);
      await IIFLLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, iiflData.iiflValidDetails);
      allure.startStep('Close the LMS window', true);
      await browser.closeWindow();
      allure.startStep('Switch to payments window', true);
      await browser.switchToWindow(handles[1]);
      allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
      await IIFLLoan.selectEmiDateAndApproveLoanAgreement(panNumber);
      allure.startStep('Verify OKYC', true);
      await IIFLLoan.verifyOKYC(panNumber);
      allure.startStep('Refresh the window', true);
      await browser.refresh();
      allure.startStep('Click on continue button in the pop up', true);
      await IIFLLoan.btnContinue.click();
      let nonAadharRb = await IIFLLoan.rbNonAadharKyc.isDisplayed();
      if (nonAadharRb) {
         await IIFLLoan.verifyOKYC(data);
      }
      allure.startStep('Wait for the upload file button to be Clickable', true);
      await IIFLLoan.btnUploadFile.waitForClickable({ timeout: 10000 });
      allure.startStep('Click on upload file button', true);
      await IIFLLoan.btnUploadFile.click();
      allure.startStep('Wait for the error message to be displayed', true);
      await IIFLLoan.ErrorMsgBankStatementUpload.waitForDisplayed({ timeout: 5000 })
      allure.startStep('Verify the correct error message is displayed', true);
      await expect(await IIFLLoan.ErrorMsgBankStatementUpload.getText()).toEqual('You need to click photo first or select file to upload');
      allure.endStep();
   })

})
