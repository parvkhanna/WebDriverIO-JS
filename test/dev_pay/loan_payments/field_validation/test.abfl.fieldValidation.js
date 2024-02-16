import AbflLoan from "../../../../pages/loan_payments_page/abfl.payment.page";
import { AllureUtil as allure } from "../../../../utils/util.allure";
import { abflData } from "../../../../data/abfl.loanform.data";
import mongoConnect from "../../../../utils/mongoconnect";
import { dataToMoveTo } from "../../../../data/abfl.Move.To.Particular.Page";


describe("Verify field validation for Abfl payment option", async () => {
    beforeEach("Open payment portal", async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep("Open Byjus payment login page");
        await AbflLoan.openByjusPayPage();
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Deleting object from DB", true);
        await mongoConnect.abflDeleteObjectFromDb(abflData.abflValidData.panNumber, abflData.abflValidData.telephoneNumber);
    })

    it("Validate field when submitted blank", async () => {
        allure.startStep("Click on the Abfl pay button");
        await AbflLoan.btnAbfl.click();
        allure.startStep("Wait for Skip Upload Document button", true);
        await AbflLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click Skip Upload Document button", true);
        await AbflLoan.btnSkipUploadDocument.click();
        allure.startStep("Wait for checkbox to be displayed", true);
        await AbflLoan.cbToSendOtp.waitForClickable({ timeout: 60000 })
        allure.startStep("Tick the sent OTP checkbox", true);
        await AbflLoan.cbToSendOtp.click();
        allure.startStep("Click on Send OTP button", true);
        await AbflLoan.btnSendOtp.click();
        allure.startStep('Wait for the invalid pan number error message to be displayed', true);
        await AbflLoan.getErrorMsgFrom("PAN Card No").waitForDisplayed({ timeout: 5000 });
        let errorMessage = (await AbflLoan.getErrorMsgFrom("PAN Card No").getText());
        if (errorMessage == "Invalid PAN Card No") {
            //await expect(errorMessage).toEqual("Invalid PAN Card No");
            await expect(errorMessage).toEqual("Invalid Pan Card No");
        }
        else if (errorMessage == "PAN Card No is required") {
            await expect(errorMessage).toEqual("PAN Card No is required");
        }

        allure.startStep("Verify that the correct error message for birthday is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Birthdate").getText()).toEqual("Birthdate is required");
        allure.startStep("Verify that the correct error message for gender is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Gender").getText()).toEqual("Gender is required");
        allure.startStep("Verify that the correct error message for mobile number is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("Mobile No").getText()).toEqual("Mobile No is required");
        allure.startStep("Verify that the correct error message for email address is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Email address").getText()).toEqual("Email address is required");
        allure.startStep("Verify that the correct error message for Address is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("Address").getText()).toEqual("Address is required");
        allure.startStep("Verify that the correct error message for Pincode is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("Pincode").getText()).toEqual("Pincode is required");
        allure.startStep("Verify that the correct error message for State is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("State").getText()).toEqual("State is required");
        allure.startStep("Verify that the correct error message for City is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("City").getText()).toEqual("City is required");
        allure.startStep("Verify that the correct error message for Loan Amount is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("Loan Amount (Rs.)").getText()).toEqual("Loan Amount (Rs.) is required");
        allure.startStep("Verify that the correct error message for Loan Tenure is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Loan Tenure").getText()).toEqual("Loan Tenure is required");
        allure.startStep("Verify that the correct error message for School Name is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Student Grade").getText()).toEqual("Student Grade is required");
        allure.startStep("Verify that the correct error message for  Occupation type is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Occupation Type").getText()).toEqual("Occupation Type is required.");
        allure.startStep("Verify that the correct error message for education qualification is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Education Qualification").getText()).toEqual("Education Qualification is required.");
        allure.startStep("Verify that the correct error message for martial status is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Marital Status").getText()).toEqual("Marital Status is required.");
        allure.startStep("Verify that the correct error message for Residence type is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Residence Type").getText()).toEqual("Residence Type is required.");
        allure.startStep("Verify that the correct error message for Student Date of Birth is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Student Date of Birth").getText()).toEqual("Student Date of Birth is required.");
        allure.startStep("Verify that the correct error message for Income  is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("Income (monthly)").getText()).toEqual("Income (monthly) is required.");
        allure.startStep("Verify that the correct error message for Alternate mobile no is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("Alternate Mobile No").getText()).toEqual("Alternate Mobile No is required.");
        allure.startStep("Verify that the correct error message for Borrowers Mother Name is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("Borrower's Mother Name").getText()).toEqual("Borrower's Mother Name is required.");
        allure.startStep("Verify that the correct error message for Student Name is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("Student Name").getText()).toEqual("Student Name is required.");
        allure.endStep();
    })

    it("Validate Loan Amount should be between Rs.25000 and Rs.100000", async () => {
        allure.startStep("Click on the Abfl pay button and fill details with invalid amount");
        await AbflLoan.enterCustomerAndLoanDetails(abflData.abflDataWithAmountLessThan25000);
        allure.startStep("Wait for Loan amount error message", true);
        await AbflLoan.getErrorMsgFrom("Loan Amount (Rs.)").waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify that the correct error message for Loan amount is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("Loan Amount (Rs.)").getText()).toEqual("Amount should be >= Rs.25000 and <= Rs. 100000");
        allure.endStep();
    })

    it("Validate Buyers Age should be between 21 and 58 years", async () => {
        allure.startStep("Click on the Abfl pay button and fill details with age less than 21 years");
        await AbflLoan.enterCustomerAndLoanDetails(abflData.abflDataWithAgeLessThan25);
        allure.startStep("Wait for Birthdate error message", true);
        await AbflLoan.getErrorMsgDropdownElement("Birthdate").waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify that the correct error message for Birthdate is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Birthdate").getText()).toEqual("Age should be more than 21 years and less than 58 years");
        allure.startStep("Move to main page", true);
        await AbflLoan.openByjusPayPage();
        allure.startStep("Click on the Abfl pay button and fill details with more than 58 years");
        await AbflLoan.enterCustomerAndLoanDetails(abflData.abflDataWithAgeMoreThan60);
        allure.startStep("Wait for Birthdate error message", true);
        await AbflLoan.getErrorMsgDropdownElement("Birthdate").waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify that the correct error message for Birthdate is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Birthdate").getText()).toEqual("Age should be more than 21 years and less than 58 years");
        allure.endStep();
    })

    it("Validate correct pan number", async () => {
        allure.startStep("Click on the Abfl pay button and fill details with invalid pan");
        await AbflLoan.enterCustomerAndLoanDetails(abflData.abflDataWithInvalidPan);
        allure.startStep("Wait for Pan card number error message", true);
        await AbflLoan.getErrorMsgFrom("PAN Card No").waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify that the correct error message for PAN card number is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("PAN Card No").getText()).toEqual("Invalid PAN Card No");
        allure.endStep();
    })

    it('Validate the Customer Phone should accept 10digits, also check for the error messages for less and more than 10 digits', async () => {
        allure.startStep('Enter invalid mobile number less than 10 digits in Customer and Loan Details form of Abfl loan & Click on sent OTP');
        await AbflLoan.enterCustomerAndLoanDetails(abflData.abflInvalidMobileNoLessthan10Digits);
        allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
        await AbflLoan.getErrorMsgFrom('Mobile No').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message is displayed for the Invalid mobile number less than 10 digits', true);
        await expect(await AbflLoan.getErrorMsgFrom('Mobile No').getText()).toEqual('Invalid Mobile No');
        allure.startStep('Open Byjus payment login page');
        await AbflLoan.openByjusPayPage();
        allure.startStep('Enter invalid mobile number more than 10 digits in Customer and Loan Details form of Abfl loan & Click on sent OTP');
        await AbflLoan.enterCustomerAndLoanDetails(abflData.abflInvalidMobileNoMorethan10Digits);
        allure.startStep('Wait for the invalid mobile number error message to be displayed', true);
        await AbflLoan.getErrorMsgFrom('Mobile No').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message is displayed for the Invalid mobile number more than 10 digits', true);
        await expect(await AbflLoan.getErrorMsgFrom('Mobile No').getText()).toEqual('Invalid Mobile No');
        allure.endStep();
    })

    it('Validate when pincode entered correct city name alligned to that pincode should appear', async () => {
        allure.startStep('Click on Abfl pay button');
        await AbflLoan.btnAbfl.click();
        allure.startStep('Click on skip upload documents button in the pop up', true);
        await AbflLoan.btnSkipUploadDocument.click();
        allure.startStep('Wait for the element to be clickable', true);
        await AbflLoan.tfBorrowersPinCode.waitForClickable({ timeout: 10000 });;
        allure.startStep('Enter valid pincode', true);
        await AbflLoan.tfStudentsPinCode.setValue("452009");
        allure.startStep('2 seconds wait for city name to be displayed', true);
        await browser.pause(2000);
        allure.startStep('Verify correct city name alligned to the given pincode should appear', true);
        await expect(await AbflLoan.ddCityName.getText()).toEqual('INDORE');
        allure.endStep();
    })

    it('Validate Account number must be numeric', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Click on Proceed button", true);
        await AbflLoan.clickOnProceedButton();
        await browser.pause(20000)
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await AbflLoan.returnAppId(panNumber);
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
        await AbflLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to Account Information page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AbflLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on name title field", true);
        await AbflLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AbflLoan.tfCustomerName.setValue("Dummy customer name");
        allure.startStep("Set random text value in the Account Number text field", true);
        await AbflLoan.tfAccountNumber.setValue("afdctrshyu");
        allure.startStep("Click on continue button", true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Wait for error message to be displayed", true);
        await AbflLoan.getErrorMsgFrom("Account Number").waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify the error message for Account Number must be numeric is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("Account Number").getText()).toEqual("Account number must be numeric");
        allure.endStep();
    });

    it("Validate field when submitted blank (Upload bank statement page)", async () => {
        allure.startStep("Click on the Abfl pay button and fill details with valid data");
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Click on Proceed button", true);
        await AbflLoan.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Abfl Unprocessed loan & get appId', true);
        let appId = await AbflLoan.returnAppId(panNumber);
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
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AbflLoan.rbBankStatementPassbook.click();
        allure.startStep("Tick the declaration checkbox", true);
        await AbflLoan.cbToContinue.click();
        allure.startStep("Click on continue button", true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Wait for Select bank statement error message", true);
        await AbflLoan.divElementErrorMsg.waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify that the correct message for Select bank statement is displayed", true);
        await expect(await AbflLoan.divElementErrorMsg.getText()).toEqual("Please select bank statement source.");
        allure.endStep();
    })

    it("Validate error without uploading bank statement image (Upload Bank statement page)", async () => {
        allure.startStep("Click on the Abfl pay button and fill details with valid data");
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Click on Proceed button", true);
        await AbflLoan.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Abfl Unprocessed loan & get appId', true);
        let appId = await AbflLoan.returnAppId(panNumber);
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
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AbflLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Bank statement source drop down", true);
        await AbflLoan.ddBankStatementSource.click();
        allure.startStep("Select Email in the the dropdown list", true);
        await browser.keys(["E", "m", "a", "i", "l", "Tab"]);
        allure.startStep("Tick the declaration checkbox", true);
        await AbflLoan.cbToContinue.click();
        allure.startStep("Click on continue button", true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Wait for Upload screenshot error message", true);
        await AbflLoan.divElementErrorMsg.waitForDisplayed({ timeout: 5000 });
        allure.startStep("Verify that the correct message for Upload screenshot is displayed", true);
        await expect(await AbflLoan.divElementErrorMsg.getText()).toEqual("Please upload a screenshot of the source.");
        allure.endStep();
    })

    it("Validate field when submitted blank (not working until you enter account number)", async () => {
        allure.startStep("Click on the Abfl pay button and fill details with valid data");
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Click on Proceed button", true);
        await AbflLoan.clickOnProceedButton();
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Abfl Unprocessed loan & get appId', true);
        let appId = await AbflLoan.returnAppId(panNumber);
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
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AbflLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name title drop down", true);
        await AbflLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AbflLoan.tfCustomerName.setValue("Dummy customer name");
        allure.startStep("Set value to 2021156789 in the Account Number text field", true);
        await AbflLoan.tfAccountNumber.setValue("2021156789");
        allure.startStep("Click on continue button", true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Wait for error message to be displayed", true);
        await AbflLoan.getErrorMsgDropdownElement("Account Type").waitForDisplayed({ timeout: 9000 });
        allure.startStep("Verify the error message for Account type is required is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Account Type").getText()).toEqual("Account Type is required.");
        allure.startStep("Verify the error message for Bank Name is required is displayed", true);
        await expect(await AbflLoan.getErrorMsgDropdownElement("Bank Name").getText()).toEqual("Bank Name is required.");
        allure.startStep("Verify the error message for IFSC is required is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("IFSC").getText()).toEqual("IFSC is required.");
        allure.startStep("Verify the error message for MICR is required is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("MICR").getText()).toEqual("MICR is required.");
        allure.startStep("Verify the error message for City is required is displayed", true);
        await expect(await AbflLoan.getErrorMsgFrom("City").getText()).toEqual("City is required.");
        allure.endStep();
    })


})

