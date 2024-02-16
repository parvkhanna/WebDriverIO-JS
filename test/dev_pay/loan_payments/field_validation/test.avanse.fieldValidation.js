import AvanseLoan from "../../../../pages/loan_payments_page/avanse.payment.page";
import { AllureUtil as allure } from "../../../../utils/util.allure";
import { avanseData } from "../../../../data/avanse.loanform.data";
import { dataToMoveTo } from "../../../../data/avanse.move.to.particular.page";
import mongoConnect from "../../../../utils/mongoconnect";

describe("Verify field validation for Avanse payment option", async () => {
    beforeEach("Open payment portal", async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep("Open Byjus payment login page");
        await AvanseLoan.openByjusPayPage();
        allure.startStep("Login to the payment page", true);
        await AvanseLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Deleting object from DB", true);
        await mongoConnect.avanseDeleteObjectFromDb(avanseData.avanceValidData.panNumber, avanseData.avanceValidData.telephoneNumber);
    })
    afterEach("Deleting the object from DB", async () => {
        allure.startStep("Deleting object from DB", true);
        await mongoConnect.avanseDeleteObjectFromDb(avanseData.avanceValidData.panNumber, avanseData.avanceValidData.telephoneNumber);
    })

    it("Validate field validations when submitted blank", async () => {
        allure.startStep("Click on the Avanse pay button");
        await AvanseLoan.btnAvanse.click();
        allure.startStep("Wait for Skip Upload Document button", true);
        await AvanseLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click Skip Upload Document button", true);
        await AvanseLoan.btnSkipUploadDocument.click();
        allure.startStep("Wait for checkbox to be displayed", true);
        await AvanseLoan.cbToSendOtp.waitForClickable({ timeout: 60000 })
        allure.startStep("Tick the sent OTP checkbox", true);
        await AvanseLoan.cbToSendOtp.click();
        allure.startStep("Click on Send OTP button", true);
        await AvanseLoan.btnSendOtp.click();
        allure.startStep('Wait for the invalid pan number error message to be displayed', true);
        await AvanseLoan.getErrorMsgFrom("PAN Card No").waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify that the correct error message for PAN card number is displayed", true);
        let errorMessage = await expect(await AvanseLoan.getErrorMsgFrom("PAN Card No").getText());
        if (errorMessage == "Invalid PAN Card No") {
            await expect(errorMessage).toEqual("Invalid PAN Card No");
        }
        else if (errorMessage == "PAN Card No is required") {
            await expect(errorMessage).toEqual("PAN Card No is required");
        }
        allure.startStep("Verify that the correct error message for address proof type is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Address Proof Type")).toHaveTextContaining("Address Proof Type is required");
        allure.startStep("Verify that the correct error message for address proof number is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Address Proof Number").getText()).toEqual("Address Proof Number is required");
        allure.startStep("Verify that the correct error message for birthday is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Birthdate").getText()).toEqual("Birthdate is required");
        allure.startStep("Verify that the correct error message for grnder is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Gender").getText()).toEqual("Gender is required");
        allure.startStep("Verify that the correct error message for mobile number is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Mobile No").getText()).toEqual("Mobile No is required");
        allure.startStep("Verify that the correct error message for email address is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Email address").getText()).toEqual("Email address is required");
        allure.startStep("Verify that the correct error message for Borrowers Father Name is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Borrower's Father Name").getText()).toEqual("Borrower's Father Name is required");
        allure.startStep("Verify that the correct error message for Borrowers Mother Name is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Borrower's Mother Name").getText()).toEqual("Borrower's Mother Name is required.");
        allure.startStep("Verify that the correct error message for Student Name is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Student Name").getText()).toEqual("Student Name is required.");
        allure.startStep("Verify that the correct error message for Student Date of Birth is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Student Date of Birth").getText()).toEqual("Student Date of Birth is required.");
        allure.startStep("Verify that the correct error message for School Name is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Student Grade").getText()).toEqual("Student Grade is required");
        allure.startStep("Verify that the correct error message for Address is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Address").getText()).toEqual("Address is required");
        allure.startStep("Verify that the correct error message for Pincode is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Pincode").getText()).toEqual("Pincode is required");
        allure.startStep("Verify that the correct error message for State is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("State").getText()).toEqual("State is required");
        allure.startStep("Verify that the correct error message for City is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("City").getText()).toEqual("City is required");
        allure.startStep("Verify that the correct error message for Loan Amount is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Loan Amount (Rs.)").getText()).toEqual("Loan Amount (Rs.) is required");
        allure.startStep("Verify that the correct error message for Loan Tenure is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Loan Tenure").getText()).toEqual("Loan Tenure is required");
        allure.startStep("Verify that the correct error message for Product Name is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Product Name").getText()).toEqual("Product Name is required");
        allure.startStep("Verify that the correct error message for  Occupation type is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Occupation Type").getText()).toEqual("Occupation Type is required.");
        allure.startStep("Verify that the correct error message for education qualification is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Education Qualification").getText()).toEqual("Education Qualification is required.");
        allure.startStep("Verify that the correct error message for martial status is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Marital Status").getText()).toEqual("Marital Status is required.");
        allure.startStep("Verify that the correct error message for Residence type is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Residence Type").getText()).toEqual("Residence Type is required.");
        allure.startStep("Verify that the correct error message for Birthdate is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Birthdate").getText()).toEqual("Birthdate is required");
        allure.startStep("Verify that the correct error message for Income  is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Income (monthly)").getText()).toEqual("Income (monthly) is required.");
        allure.startStep("Verify that the correct error message for Alternate mobile no is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Alternate Mobile No").getText()).toEqual("Alternate Mobile No is required.");
        allure.endStep();
    })

    it("Validate Loan Amount should be between Rs.18000 and Rs.120000", async () => {
        allure.startStep("Click on the Avanse pay button and fill details with invalid amount");
        await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceDataWithAmountLessThan18000);
        allure.startStep("Wait for Loan amount error message", true);
        await AvanseLoan.getErrorMsgFrom("Loan Amount (Rs.)").waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify that the correct error message for Loan amount is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Loan Amount (Rs.)").getText()).toEqual("Amount should be >= Rs.18000 and <= Rs. 120000");
        allure.endStep();
    })

    it("Validate Buyers Age should be between 25 and 59 years", async () => {
        allure.startStep("Click on the Avanse pay button and fill details with age less than 21 years");
        await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceDataWithAgeLessThan25);
        allure.startStep("Wait for Birthdate error message", true);
        await AvanseLoan.getErrorMsgDropdownElement("Birthdate").waitForDisplayed({ timeout: 10000 });
        allure.startStep("Verify that the correct error message for Birthdate is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Birthdate").getText()).toEqual("Age should be more than 21 years and less than 59 years");
        allure.startStep("Move to main page", true);
        await AvanseLoan.openByjusPayPage();
        allure.startStep("Click on the Avanse pay button and fill details with more than 60 years");
        await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceDataWithAgeMoreThan60);
        allure.startStep("Wait for Birthdate error message", true);
        await AvanseLoan.getErrorMsgDropdownElement("Birthdate").waitForDisplayed({ timeout: 10000 });
        allure.startStep("Verify that the correct error message for Birthdate is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Birthdate").getText()).toEqual("Age should be more than 21 years and less than 59 years");
        allure.endStep();
    })

    it("Validate correct pan number and aadhar card number", async () => {
        allure.startStep("Click on the Avanse pay button and fill details with invalid pan and aadhar number");
        await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceDataWithInvalidPanAadhar);
        allure.startStep("Wait for Pan card number error message", true);
        await AvanseLoan.getErrorMsgFrom("Address Proof Number").waitForDisplayed({ timeout: 10000 });
        allure.startStep("Verify that the correct error message for PAN card number is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("PAN Card No").getText()).toEqual("Invalid PAN Card No");
        allure.startStep("Verify that the correct error message for Address Proof Number is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Address Proof Number").getText()).toEqual("Please enter valid last 4 digits of aadhaar");
        allure.endStep();
    })

    it('Validate the Customer Phone should accept 10digits, also check for the error messages for less and more than 10 digits', async () => {
        allure.startStep('Enter invalid mobile number less than 10 digits in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanseInvalidMobileNoLessthan10Digits);
        allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
        await AvanseLoan.getErrorMsgFrom('Mobile No').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message is displayed for the Invalid mobile number less than 10 digits', true);
        await expect(await AvanseLoan.getErrorMsgFrom('Mobile No').getText()).toEqual('Invalid Mobile No');
        allure.startStep('Open Byjus payment login page');
        await AvanseLoan.openByjusPayPage();
        allure.startStep('Enter invalid mobile number more than 10 digits in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanseInvalidMobileNoMorethan10Digits);
        allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
        await AvanseLoan.getErrorMsgFrom('Mobile No').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message is displayed for the Invalid mobile number more than 10 digits', true);
        await expect(await AvanseLoan.getErrorMsgFrom('Mobile No').getText()).toEqual('Invalid Mobile No');
        allure.endStep();
    })

    it('Validate when pincode entered correct city name alligned to that pincode should appear', async () => {
        allure.startStep('Click on Avanse pay button');
        await AvanseLoan.btnAvanse.click();
        allure.startStep('Click on skip upload documents button in the pop up', true);
        await AvanseLoan.btnSkipUploadDocument.click();
        allure.startStep('Wait for the element to be clickable', true);
        await AvanseLoan.tfStudentsPinCode.waitForClickable({ timeout: 5000 });
        allure.startStep('Enter valid pincode', true);
        await AvanseLoan.tfStudentsPinCode.setValue("452009");
        allure.startStep('2 seconds wait for city name to be displayed', true);
        await browser.pause(2000);
        allure.startStep('Verify correct city name alligned to the given pincode should appear', true);
        await expect(await AvanseLoan.ddCityName.getText()).toEqual('INDORE');
        allure.endStep();
    })

    it("Validate field validations when submitted blank (Upload bank statement page)", async () => {
        allure.startStep("Click on the Avanse pay button and fill details with valid data");
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep("Click on Proceed button", true);
        await AvanseLoan.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AvanseLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Avanse Unprocessed loan & get appId', true);
        let appId = await AvanseLoan.returnAppId(panNumber);
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
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Tick the declaration checkbox", true);
        await AvanseLoan.cbToContinue.click();
        allure.startStep("Click on continue button", true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for Select bank statement error message", true);
        await AvanseLoan.divElementErrorMsg.waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify that the correct message for Select bank statement is displayed", true);
        await expect(await AvanseLoan.divElementErrorMsg.getText()).toEqual("Please select bank statement source.");
        allure.endStep();
    })

    it("Validate error without uploading bank statement image", async () => {
        allure.startStep("Click on the Avanse pay button and fill details with valid data");
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep("Click on Proceed button", true);
        await AvanseLoan.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AvanseLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Avanse Unprocessed loan & get appId', true);
        let appId = await AvanseLoan.returnAppId(panNumber);
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
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Bank statement source drop down", true);
        await AvanseLoan.ddBankStatementSource.click();
        allure.startStep("Select Email in the the dropdown list", true);
        await browser.keys(["E", "m", "a", "i", "l", "Tab"]);
        allure.startStep("Tick the declaration checkbox", true);
        await AvanseLoan.cbToContinue.click();
        allure.startStep("Click on continue button", true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for Upload screenshot error message", true);
        await AvanseLoan.divElementErrorMsg.waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify that the correct message for Upload screenshot is displayed", true);
        await expect(await AvanseLoan.divElementErrorMsg.getText()).toEqual("Please upload a screenshot of the source.");
        allure.endStep();
    })

    it("Validate field validations when submitted blank (not working until you enter account number)", async () => {
        allure.startStep("Click on the Avanse pay button and fill details with valid data");
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep("Click on Proceed button", true);
        await AvanseLoan.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AvanseLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Avanse Unprocessed loan & get appId', true);
        let appId = await AvanseLoan.returnAppId(panNumber);
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
        await mongoConnect.avanseAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name title drop down", true);
        await AvanseLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AvanseLoan.tfCustomerName.setValue("Dummy customer name");
        allure.startStep("Set value to 2021156789 in the Account Number text field", true);
        await AvanseLoan.tfAccountNumber.setValue("2021156789");
        allure.startStep("Click on continue button", true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for error message to be displayed", true);
        await AvanseLoan.getErrorMsgDropdownElement("Account Type").waitForDisplayed({ timeout: 9000 });
        allure.startStep("Verify the error message for Account type is required is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Account Type").getText()).toEqual("Account Type is required.");
        allure.startStep("Verify the error message for Bank Name is required is displayed", true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement("Bank Name").getText()).toEqual("Bank Name is required.");
        allure.startStep("Verify the error message for IFSC is required is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("IFSC").getText()).toEqual("IFSC is required.");
        allure.startStep("Verify the error message for MICR is required is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("MICR").getText()).toEqual("MICR is required.");
        allure.startStep("Verify the error message for City is required is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("City").getText()).toEqual("City is required.");
        allure.endStep();
    })

    it("Validate Account number must be numeric", async () => {
        allure.startStep("Click on the Avanse pay button and fill details with valid data");
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep("Click on Proceed button", true);
        await AvanseLoan.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AvanseLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Avanse Unprocessed loan & get appId', true);
        let appId = await AvanseLoan.returnAppId(panNumber);
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
        await mongoConnect.avanseAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name title drop down", true);
        await AvanseLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AvanseLoan.tfCustomerName.setValue("Dummy customer name");
        allure.startStep("Set value to afdctrshyu in the Account Number text field", true);
        await AvanseLoan.tfAccountNumber.setValue("afdctrshyu");
        allure.startStep("Click on continue button", true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for error message to be displayed", true);
        await AvanseLoan.getErrorMsgFrom("Account Number").waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify the error message for Account Number must be numeric is displayed", true);
        await expect(await AvanseLoan.getErrorMsgFrom("Account Number").getText()).toEqual("Account number must be numeric");
        allure.endStep();
    })

    it('Validate error message when clicked on Continue button without Selecting first EMI date', async () => {

        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep("Click on Proceed button", true);
        await AvanseLoan.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AvanseLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Avanse Unprocessed loan & get appId', true);
        let appId = await AvanseLoan.returnAppId(panNumber);
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
        await mongoConnect.avanseAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "avanse");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AvanseLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, avanseData.avanceValidData);
        allure.startStep('Close the Lms window', true);
        await browser.closeWindow();
        allure.startStep('Switch to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Wait for Continue button on loan aggrement page is clickable', true);
        await AvanseLoan.btnContinue.waitForEnabled({ timeout: 60000 });
        allure.startStep('Click on Continue button on loan aggrement page', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Wait for the error message to be displayed', true);
        await AvanseLoan.getErrorMsgDropdownElement('First EMI Date').waitForDisplayed({ timeout: 10000 });
        allure.startStep('Verify that correct error message is dispalyed', true);
        await expect(await AvanseLoan.getErrorMsgDropdownElement('First EMI Date').getText()).toEqual('First EMI Date is required.');
        allure.endStep();
    })

    it("Validate correct AppId is displayed", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep("Click on Proceed button", true);
        await AvanseLoan.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AvanseLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Avanse Unprocessed loan & get appId', true);
        let appId = await AvanseLoan.returnAppId(panNumber);
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
        await mongoConnect.avanseAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "avanse");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AvanseLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, avanseData.avanceValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.avanseAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
        allure.startStep('Update Esign details in transactionscibil collection', true);
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection', true);
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI', true);
        await browser.pause(5000);
        allure.startStep('Refresh the window', true);
        await browser.refresh();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Verify correct AppId is displayed', true);
        await expect(await AvanseLoan.getverifyAppId(appId).getText()).toEqual(appId);
        allure.endStep();
    })

    it('Validate the error message we get when we click on upload button without choosing the file(Upload documents page)', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep("Click on Proceed button", true);
        await AvanseLoan.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AvanseLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Avanse Unprocessed loan & get appId', true);
        let appId = await AvanseLoan.returnAppId(panNumber);
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
        await mongoConnect.avanseAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "avanse");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AvanseLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, avanseData.avanceValidData);
        allure.startStep('Close the LMS window', true);
        await browser.closeWindow();
        allure.startStep('Switch to payments window', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
        await AvanseLoan.selectEmiDateAndApproveLoanAgreement(panNumber);
        allure.startStep('Verify OKYC', true);
        await AvanseLoan.verifyOKYC();
        allure.startStep('Wait for the upload file button to be Clickable', true);
        await AvanseLoan.btnUploadFile.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on upload file button', true);
        await AvanseLoan.btnUploadFile.click();
        allure.startStep('Wait for the error message to be displayed', true);
        await AvanseLoan.divElementErrorMsg.waitForDisplayed({ timeout: 5000 })
        allure.startStep('Verify the correct error message is displayed', true);
        await expect(await AvanseLoan.divElementErrorMsg.getText()).toEqual('You need to click photo first or select file to upload');
        allure.endStep();
    })

})
