
import AbflLoan from "../../../../pages/loan_payments_page/abfl.payment.page";
import { AllureUtil as allure } from "../../../../utils/util.allure";
import { abflData } from "../../../../data/abfl.loanform.data";
import mongoConnect from "../../../../utils/mongoconnect";
import { dataToMoveTo } from "../../../../data/abfl.Move.To.Particular.Page";


describe('Verify functional validation for ABFL payment option', async function () {
    this.retries(2)
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

    it('Validate After filling all valid details of customer check credit bureau score page should be displayed', async function ()  {
        this.retries(2)
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep('Validate Check credit bureau score page is displayed');
        await expect(await AbflLoan.btnCheckCibilScore.isDisplayed()).toEqual(true);
        allure.endStep();
    });
    it('Validate the Loan tenure drop down', async () => {
        allure.startStep('Click on the ABFL pay button', true);
        await AbflLoan.btnAbfl.click();
        allure.startStep("Wait for Skip Upload Document button", true);
        await AbflLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click on Skip Upload Document button", true);
        await AbflLoan.btnSkipUploadDocument.click();
        allure.startStep('wait for Loan tenure drop down to be displayed', true);
        await AbflLoan.ddLoanTenure.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Loan tenure drop down', true);
        await AbflLoan.ddLoanTenure.click();
        allure.startStep('Verify Loan tenure drop down options to be displayed ', true);
        let loanTenureList = abflData.loanTenureOptions.options.length;
        for (let i = 0; i < loanTenureList; i++) {
            allure.startStep('Wait for the Loan tenure drop down options to be displayed ', true);
            await AbflLoan.getddLoanTenureOptions(0).waitForClickable({ timeout: 3000 });
            allure.startStep('Validate correct option for the Loan tenure drop down are displayed ', true);
            await expect(await AbflLoan.getddLoanTenureOptions(i).getText()).toEqual(abflData.loanTenureOptions.options[i]);
        }
        allure.endStep();
    });

    it('Validate the Qualification drop down', async () => {
        allure.startStep("Enter customer details on first page", true);
        await AbflLoan.customerDetails(abflData.abflValidData)
        allure.startStep('wait for Qualification drop down to be displayed', true);
        await AbflLoan.ddQualification.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Qualification drop down', true);
        await AbflLoan.ddQualification.click();
        allure.startStep('Verify Qualification drop down options to be displayed ', true);
        let qualificationList = abflData.qualificationOptions.options.length;
        for (let i = 0; i < qualificationList; i++) {
            allure.startStep('Wait for Qualification drop down options to be displayed ', true);
            await AbflLoan.getddQualificationOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct options for Qualification drop down are displayed ', true);
            await expect(await AbflLoan.getddQualificationOptions(i).getText()).toEqual(abflData.qualificationOptions.options[i]);

        }
        allure.endStep();
    });
    it('Validate the Customer Occupation drop down', async () => {
        allure.startStep("Enter customer details on first page", true);
        await AbflLoan.customerDetails(abflData.abflValidData)
        allure.startStep('wait for occupation type drop down to be displayed', true);
        await AbflLoan.ddOccupationType.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on occupation type drop down', true);
        await AbflLoan.ddOccupationType.click();
        allure.startStep('Verify occupation type drop down options to be displayed ', true);
        let employmentTypeList = abflData.occupationTypeOptions.options.length;
        for (let i = 0; i < employmentTypeList; i++) {
            allure.startStep('Wait for occupation type drop down options to be displayed ', true);
            await AbflLoan.getddCustomerOccupationOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct options for occupation type drop down are displayed ', true);
            await expect(await AbflLoan.getddCustomerOccupationOptions(i).getText()).toEqual(abflData.occupationTypeOptions.options[i]);

        }
        allure.endStep();
    });

    it('Validate Send OTP button is disabled until I hereby, confirm checkbox is checked', async () => {
        allure.startStep("Click on the ABFL pay button");
        await AbflLoan.btnAbfl.click();
        allure.startStep("Wait for Skip Upload Document button", true);
        await AbflLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click Skip Upload Document button", true);
        await AbflLoan.btnSkipUploadDocument.click();
        allure.startStep("Wait for checkbox to be displayed", true);
        await AbflLoan.cbToSendOtp.waitForClickable({ timeout: 60000 })
        allure.startStep("Verify that the button is not clickable");
        await expect(await AbflLoan.btnSendOtp.isClickable()).toEqual(false);
        allure.endStep();
    });

    it('Validate the continue button to be disabled, until the check box is ticked', async () => {
        allure.startStep("Click on the ABFl pay button and fill details with valid data");
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Click on continue button", true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Verify Continue button should not be clickable", true)
        await expect(await AbflLoan.btnContinue.isClickable()).toEqual(false);
        allure.endStep();
    });

    it('Validate after changing the loan status in DB, Upload Bank statement page should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await AbflLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await AbflLoan.rbBankStatementPassbook.click();
        allure.startStep("Validate drop down for Bank statement source is displayed", true);
        await expect(await AbflLoan.ddBankStatementSource.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it('Validate search Branch button is disabled until you select Bank Name', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Click on Name tittle field", true);
        await AbflLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AbflLoan.tfCustomerName.setValue("Dummy Customer name");
        allure.startStep("Set value in the Account Number text field", true);
        await AbflLoan.tfAccountNumber.setValue("27358475658");
        allure.startStep("Click on account type drop down", true);
        await AbflLoan.ddAccountType.click();
        allure.startStep("Select savings option", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Verify for the bank branch button is disabled", true);
        await expect(await AbflLoan.btnBankBranch.isEnabled()).toEqual(false);
        allure.endStep();
    });

    it('Validate Continue button is disabled until you fill all the required fields', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Click on Name title field", true);
        await AbflLoan.ddNameTitle.click();
        allure.startStep("Select Mr from drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AbflLoan.tfCustomerName.setValue("Customer name");
        allure.startStep("Set value to 973584758 in the Account Number text field", true);
        await AbflLoan.tfAccountNumber.setValue("973584758");
        allure.startStep("Click on Account type field", true);
        await AbflLoan.ddAccountType.click();
        allure.startStep("Select Savings option from drop down", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank name field", true);
        await AbflLoan.ddBankName.click();
        allure.startStep("Select Abhyudaya bank from drop down", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Verify continue button is disabled", true);
        await expect(await AbflLoan.btnContinue.isClickable()).toEqual(false);
        allure.endStep();
    });

    it('Validate after uploading bank statement it should take you to account details page', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await AbflLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await AbflLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Bank Statement source drop down", true);
        await AbflLoan.ddBankStatementSource.click();
        allure.startStep("Select Email option", true);
        await browser.keys(["E", "m", "a", "i", "l", "Tab"]);
        allure.startStep("Click on Upload Document radio button", true);
        await AbflLoan.rbUploadDocument.click();
        allure.startStep("Uploading the image", true);
        try {
            const path = require('path');
            const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
            await AbflLoan.btnChooseFile.setValue(filePath);
        }
        catch { }
        allure.startStep("Click on Upload file button", true);
        await AbflLoan.btnUploadFile.click();
        allure.startStep("Click on check box to continue button", true);
        await AbflLoan.cbToSendOtp.click();
        allure.startStep("Click on continue button", true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await AbflLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await AbflLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Name title drop down to be displayed", true);
        await expect(await AbflLoan.ddNameTitle.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it('Verify the title Drop down in account details page', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFl Unprocessed loan & get appId', true);
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
        allure.startStep('wait for Title drop down to be displayed', true);
        await AbflLoan.ddNameTitle.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Title drop down', true);
        await AbflLoan.ddNameTitle.click();
        allure.startStep('Verify Title drop down options to be displayed ', true);
        let titleList = abflData.titleOptions.options.length;
        for (let i = 0; i < titleList; i++) {
            allure.startStep('Wait for Title drop down options to be displayed', true);
            await AbflLoan.getddTitleOptions(0).waitForDisplayed({ timeout: 10000 });
            allure.startStep('Validate correct option for Title drop down options are displayed ', true);
            await expect(await AbflLoan.getddTitleOptions(i).getText()).toEqual(abflData.titleOptions.options[i]);
        }
        allure.endStep();
    });

    it('Verify Account type drop down  in account details page', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep('wait for Account type drop down to be displayed', true);
        await AbflLoan.ddAccountType.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Account type drop down', true);
        await AbflLoan.ddAccountType.click();
        allure.startStep('Verify Account type drop down options to be displayed', true);
        let titleList = abflData.accountTypeOptions.options.length;
        for (let i = 0; i < titleList; i++) {
            allure.startStep('Wait for Account type drop down options to be displayed ', true);
            await AbflLoan.getddAccountTypeOptions(0).waitForDisplayed({ timeout: 10000 });
            allure.startStep('Validate correct option for Account type drop down options are displayed', true);
            await expect(await AbflLoan.getddAccountTypeOptions(i).getText()).toEqual(abflData.accountTypeOptions.options[i]);
        }
        allure.endStep();
    });

    it('Validate After Selecting Branch rest of the details should be filled and are un editable ', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Click on Name title field", true);
        await AbflLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AbflLoan.tfCustomerName.setValue("Dummy Customer name");
        allure.startStep("Set value in the Account Number text field", true);
        await AbflLoan.tfAccountNumber.setValue("2735867658");
        allure.startStep("Click on account type drop down", true);
        await AbflLoan.ddAccountType.click();
        allure.startStep("Select savings option", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank Name type drop down", true);
        await AbflLoan.ddBankName.click();
        allure.startStep("Select the Bank", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Wait for the Bank Branch button to be clickable", true);
        await AbflLoan.btnBankBranch.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on  Bank Branch button", true);
        await AbflLoan.btnBankBranch.click();
        allure.startStep("Click on  Bank Branch radio button", true);
        await AbflLoan.rbBankBranch.click();
        allure.startStep("Click Select branch button", true);
        await AbflLoan.btnSelectBranch.click();
        allure.startStep("Validate Ifsc code field is not editable", true);
        await expect(await AbflLoan.tfIfscCode).toBeDisabled();
        allure.startStep("Validate Micr code field is not editable", true);
        await expect(await AbflLoan.tfMicrCode).toBeDisabled();
        allure.startStep("Validate Branch city field is not editable", true);
        await expect(await AbflLoan.tfBranchCity).toBeDisabled();
        allure.endStep();
    });
    it('Validate after uploading 2 passbook images Next Page button should be displayed', async () => {
        allure.startStep("Click on the ABFL pay button and fill details with valid data");
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Add data to db to move to Upload passbook photo page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.UploadPassbookPhoto)
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AbflLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await AbflLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await AbflLoan.rbUploadDocument.click();
        allure.startStep("Upload 2 passbook images", true);
        await AbflLoan.uploadPassbookImages();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await AbflLoan.btnNextPage.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await expect(await AbflLoan.btnNextPage.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it("Validate that Add More button is displayed after you upload one passbook photo", async () => {
        allure.startStep("Click on the ABFL pay button and fill details with valid data");
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Add data to db to move to Upload passbook page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.UploadPassbookPhoto)
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AbflLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await AbflLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await AbflLoan.rbUploadDocument.click();
        allure.startStep("Selecting and uploading the file", true);
        const path = require('path');
        const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
        allure.startStep("Choosing the file", true);
        await AbflLoan.btnChooseFile.setValue(filePath);
        allure.startStep("Wait for the upload file button to be clickable", true);
        await AbflLoan.btnUploadFile.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on the upload file button to be clickable", true);
        await AbflLoan.btnUploadFile.click();
        allure.startStep("Wait untill Add more photo button to be displayed", true);
        await AbflLoan.btnAddMorePhoto.waitForDisplayed({ timeout: 10000 });
        allure.startStep("Validate Add more photo button is displayed", true);
        await expect(await AbflLoan.btnAddMorePhoto.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it('Validate after uploading 2 photos and clocking on next button OPS approval timer is started', async () => {
        allure.startStep("Click on the ABFL pay button and fill details with valid data");
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Add data to db to move to Upload passbook page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.UploadPassbookPhoto)
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AbflLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await AbflLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await AbflLoan.rbUploadDocument.click();
        allure.startStep("Upload 2 passbook images", true);
        await AbflLoan.uploadPassbookImages();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await AbflLoan.btnNextPage.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await AbflLoan.btnNextPage.click();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await AbflLoan.waitForopsTeamApprovalTimer.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await expect(await AbflLoan.waitForopsTeamApprovalTimer.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it('Validate after approving Abb ticket by filling required details the first EMI drop down should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "abfl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for Resume button to be clickable',true);
        await AbflLoan.btnResume.waitForClickable({timeout:10000});
        allure.startStep('clicking on resume button', true);
        await AbflLoan.btnResume(appId).click();
        allure.startStep('wait for continue button to be clickable',true);
        await AbflLoan.btnContinue.waitForClickable({timeout:10000});
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AbflLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, abflData.abflValidData);
        allure.startStep('Close the Lms window', true);
        await browser.closeWindow();
        allure.startStep('Switch to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Wait for Continue button on loan aggrement page is clickable', true);
        await AbflLoan.btnContinue.waitForEnabled({ timeout: 60000 });
        allure.startStep('Click on Continue button on loan aggrement page', true);
        await AbflLoan.btnContinue.click();
        allure.startStep('Wait for First emi drop down to be clickable', true);
        await AbflLoan.ddSelectEmiDate.waitForClickable({ timeout: 30000 });
        allure.startStep('Validate First emi drop down is displayed', true);
        await expect(await AbflLoan.ddSelectEmiDate.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it('Validate if all the above information are correct than continue button should be enabled', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "abfl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AbflLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, abflData.abflValidData);
        allure.startStep('Close the Lms window', true);
        await browser.closeWindow();
        allure.startStep('Switch to window handles', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Click on continue button', true);
        await AbflLoan.btnContinue.click();
        allure.startStep('Verify if Continue button on Loan details page is enabled', true);
        await expect(await AbflLoan.btnContinue.isEnabled()).toEqual(true);
        allure.endStep();
    });
    it("Validate gender drop down options", async () => {
        allure.startStep("Click on the Abfl pay button", true);
        await AbflLoan.btnAbfl.click();
        allure.startStep("Wait for Skip Extract Page button", true)
        await AbflLoan.btnSkipUploadDocument.waitForDisplayed({ timeout: 10000 });
        allure.startStep("click on Skip Extract Page button", true);
        await AbflLoan.btnSkipUploadDocument.click({ timeout: 50000 });
        allure.startStep('Wait for gender drop down to be displayed'.true);
        await AbflLoan.ddGender.waitForClickable({ timeout: 5000 });
        allure.startStep("click on gender drop down", true)
        await AbflLoan.ddGender.click()
        allure.startStep('Generate gender drop down list ', true);
        let genderList = abflData.genderOptions.options.length
        for (let i = 0; i < genderList; i++) {
            allure.startStep("Wait for Genderdrop down options to be displayed", true)
            await AbflLoan.getddGenderOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Verify correct options from the drop down to be displayed ', true);
            await expect(await AbflLoan.getddGenderOptions(i).getText()).toEqual(abflData.genderOptions.options[i]);
        }
        allure.endStep();
    });

    it('Validate Student Grade drop down options', async () => {
        allure.startStep("Click on the Abfl pay button", true);
        await AbflLoan.btnAbfl.click();
        allure.startStep("Wait for Skip Extract Page button", true)
        await AbflLoan.btnSkipUploadDocument.waitForDisplayed({ timeout: 10000 });
        allure.startStep("click on Skip Extract Page button", true);
        await AbflLoan.btnSkipUploadDocument.click({ timeout: 50000 });
        allure.startStep('Wait for Students grade drop down to be displayed'.true);
        await AbflLoan.ddStudentGrade.waitForClickable({ timeout: 5000 })
        allure.startStep('click on students grade drop down', true)
        await AbflLoan.ddStudentGrade.click();
        allure.startStep('Generate students grade drop down list ', true);
        let studentsGradeList = abflData.StudentsGradeOptions.options.length;
        for (let i = 0; i < studentsGradeList; i++) {
            allure.startStep("Wait for students grade down options to be displayed", true)
            await AbflLoan.getddstudentGradeOptions(1).waitForDisplayed({ timeout: 5000 })
            allure.startStep('Verify correct options from the drop down to be displayed ', true);
            await expect(await AbflLoan.getddstudentGradeOptions(i).getText()).toEqual(abflData.StudentsGradeOptions.options[i]);
        }
        allure.endStep();
    })

    it('Validate Marital Status drop down options', async () => {
        allure.startStep("Enter customer details on first page", true);
        await AbflLoan.customerDetails(abflData.abflValidData)
        allure.startStep("wait for Marital Status drop down to be displayed", true)
        await AbflLoan.ddMartialStatus.waitForClickable({ timeout: 10000 })
        allure.startStep("click on Marital Status drop down", true)
        await AbflLoan.ddMartialStatus.click()
        allure.startStep("create the list of the Marital Status drop down", true)
        let MaritalStatusList = abflData.maritalStatusOptions.options.length
        for (let i = 0; i < MaritalStatusList; i++) {
            allure.startStep("Wait for Marital Status down options to be displayed", true)
            await AbflLoan.getddMaritalStatusOptions(1).waitForDisplayed({ timeout: 5000 })
            allure.startStep('Verify correct options from the drop down to be displayed ', true);
            await expect(await AbflLoan.getddMaritalStatusOptions(i).getText()).toEqual(abflData.maritalStatusOptions.options[i]);
        }
        allure.endStep();
    })

    it('Validate Residence Type drop down options', async () => {
        allure.startStep("Enter customer details on first page", true);
        await AbflLoan.customerDetails(abflData.abflValidData)
        allure.startStep("wait for ResidenceType drop down to be displayed", true)
        await AbflLoan.ddResidenceType.waitForClickable({ timeout: 10000 })
        allure.startStep("click on ResidenceType drop down", true)
        await AbflLoan.ddResidenceType.click();
        allure.startStep("create the list of the ResidenceType drop down", true)
        let ResidenceTypeList = abflData.residenceTypeOptions.options.length
        for (let i = 0; i < ResidenceTypeList; i++) {
            allure.startStep("Wait for ResidenceType down options to be displayed", true)
            await AbflLoan.getddResidenceTypeOptions(1).waitForDisplayed({ timeout: 5000 })
            allure.startStep('Verify correct options from the drop down to be displayed ', true);
            await expect(await AbflLoan.getddResidenceTypeOptions(i).getText()).toEqual(abflData.residenceTypeOptions.options[i]);
        }
        allure.endStep();
    })
    it('Validate after completing the OKYC upload documents page should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL  loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "abfl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AbflLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, abflData.abflValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
        await AbflLoan.selectEmiDateAndApproveLoanAgreement(abflData.abflValidData.panNumber);
        allure.startStep('Complete the OKYC steps', true);
        await AbflLoan.verifyOKYC(abflData.abflValidData.panNumber);
        allure.startStep('Wait Upload button present on Upload documents page is displayed', true);
        await AbflLoan.btnUploadFile.waitForDisplayed({ timeout: 20000 });
        allure.startStep('Validate Upload button present on Upload documents page is displayed', true);
        await expect(await AbflLoan.btnUploadFile.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it("Validate Genarate PNACH button is disabled when we don't click on The Customer's Signature checkbox", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "abfl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AbflLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, abflData.abflValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Wait for the Emi date field to be clickable", true);
        await AbflLoan.ddSelectEmiDate.waitForClickable({ timeout: 30000 });
        allure.startStep("Wait for the Emi date field to be Existed", true);
        await AbflLoan.ddSelectEmiDate.waitForExist({ timeout: 30000 });
        allure.startStep("Click on Emi date field", true);
        await AbflLoan.ddSelectEmiDate.click();
        allure.startStep("Select the Emi field", true);
        await browser.keys("Tab");
        allure.startStep("Click on continue button", true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Wait for continue button on Loan details page to be enabled", true);
        await AbflLoan.btnContinue.waitForEnabled({ timeout: 3000 });
        allure.startStep("Click on continue button on Loan details page", true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Click on Physical Nach check box", true);
        await AbflLoan.cbPNach.click();
        allure.startStep("Veirfy that Generate PNACH button is disabled", true);
        await expect(await AbflLoan.btnGeneratePNACH.isEnabled()).toEqual(false);
        allure.endStep();
    });

    it('Validate after uploading the required documents Send Esign button is Clickable', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "abfl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AbflLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, abflData.abflValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.eSignPage);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await AbflLoan.btnContinue.click();
        allure.startStep("Wait for Send Esign button to be clickable", true);
        await AbflLoan.btnSendEsign.waitForClickable({ timeout: 5000 });
        allure.startStep("Verify that Send Esign button is Clickable", true);
        await expect(await AbflLoan.btnSendEsign.isClickable()).toEqual(true);
        allure.endStep();
    });

    it('Validate Done button is clickable after appId is soft approved', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId', true);
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
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "abfl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await AbflLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AbflLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, abflData.abflValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.abflAddDetailsToDb(appId, dataToMoveTo.eSignPage);
        allure.startStep('Update Esign details in transactionscibil collection', true);
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection', true);
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI', true);
        await browser.pause(5000);
        allure.startStep('Refresh the window', true);
        await browser.refresh();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AbflLoan.btnContinue.click();
        allure.startStep('Wait for the Done button to be clickable', true);
        await AbflLoan.btnDone.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on Done button after status shows soft approved', true);
        await expect(await AbflLoan.btnDone.isClickable()).toEqual(true);
        allure.endStep();
    });
});