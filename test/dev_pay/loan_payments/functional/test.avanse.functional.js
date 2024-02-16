import AvanseLoan from "../../../../pages/loan_payments_page/avanse.payment.page";
import { AllureUtil as allure } from "../../../../utils/util.allure";
import { avanseData } from "../../../../data/avanse.loanform.data";
import { dataToMoveTo } from "../../../../data/avanse.move.to.particular.page";
import mongoConnect from "../../../../utils/mongoconnect";

describe("Verify functional validation for Avanse payment option", async function () {
    this.retries(2)
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
    });

    it('Validate the Address proof drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await AvanseLoan.createTlpAppId(avanseData.avanceValidData)
        allure.startStep('Wait for Skip upload button to be existed', true);
        await AvanseLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click on Skip Upload Document button", true);
        await AvanseLoan.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await AvanseLoan.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await AvanseLoan.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable");
        await AvanseLoan.btnEnableWebApp.waitForClickable({ timeout: 22000 });
        allure.startStep("click on Enable webApp button");
        await AvanseLoan.btnEnableWebApp.click();
        allure.startStep('wait for Address proof drop down to be displayed', true);
        await AvanseLoan.ddSelectAddressProof.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Address proof  drop down', true);
        await AvanseLoan.ddSelectAddressProof.click();
        allure.startStep('Verify Address proof drop down options to be displayed ', true);
        let addressProofList = avanseData.addressProofOptions.options.length;
        for (let i = 0; i < addressProofList; i++) {
            allure.startStep('Wait for Address proof drop down options to be displayed', true);
            await AvanseLoan.getddAddressproofOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct option for Address proof are displayed', true);
            await expect(await AvanseLoan.getddAddressproofOptions(i).getText()).toEqual(avanseData.addressProofOptions.options[i]);
        }
        allure.endStep();
    });

    it('Validate the Loan tenure drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await AvanseLoan.createTlpAppId(avanseData.avanceValidData)
        allure.startStep("Wait for Skip Upload Document button", true);
        await AvanseLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click on Skip Upload Document button", true);
        await AvanseLoan.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await AvanseLoan.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await AvanseLoan.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable");
        await AvanseLoan.btnEnableWebApp.waitForClickable({ timeout: 22000 });
        allure.startStep("click on Enable webApp button");
        await AvanseLoan.btnEnableWebApp.click();
        allure.startStep('wait for Loan tenure drop down to be displayed', true);
        await AvanseLoan.ddLoanTenure.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Loan tenure drop down', true);
        await AvanseLoan.ddLoanTenure.click();
        allure.startStep('Verify Loan tenure drop down options to be displayed ', true);
        let loanTenureList = avanseData.loanTenureOptions.options.length;
        for (let i = 0; i < loanTenureList; i++) {
            allure.startStep('Wait for the Loan tenure drop down options to be displayed ', true);
            await AvanseLoan.getddLoanTenureOptions(0).waitForClickable({ timeout: 3000 });
            allure.startStep('Validate correct option for the Loan tenure drop down are displayed ', true);
            await expect(await AvanseLoan.getddLoanTenureOptions(i).getText()).toEqual(avanseData.loanTenureOptions.options[i]);
        }
        allure.endStep();
    });

    it('Validate the Occupation type drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await AvanseLoan.createTlpAppId(avanseData.avanceValidData)
        allure.startStep('enter customer details on first page', true);
        await AvanseLoan.customerDetails(avanseData.avanceValidData,appId)
        allure.startStep('wait for Customer Occupation drop down to be displayed', true);
        await AvanseLoan.ddOccupationType.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Customer Occupation drop down', true);
        await AvanseLoan.ddOccupationType.click();
        allure.startStep('Verify Customer Occupation drop down options to be displayed ', true);
        let customerOccupationList = avanseData.customerOccupationOptions.options.length;
        for (let i = 0; i < customerOccupationList; i++) {
            allure.startStep('Wait for Customer Occupation drop down options to be displayed ', true);
            await AvanseLoan.getddOccupationTypeOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct option for Customer Occupation drop down options are displayed ', true);
            await expect(await AvanseLoan.getddOccupationTypeOptions(i).getText()).toEqual(avanseData.customerOccupationOptions.options[i]);
        }
        allure.endStep();
    });

    it("Validate Send OTP button is disabled until I hereby, confirm checkbox is checked", async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await AvanseLoan.createTlpAppId(avanseData.avanceValidData)
        allure.startStep("Wait for Skip Upload Document button", true);
        await AvanseLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click Skip Upload Document button", true);
        await AvanseLoan.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await AvanseLoan.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await AvanseLoan.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable");
        await AvanseLoan.btnEnableWebApp.waitForClickable({ timeout: 22000 });
        allure.startStep("click on Enable webApp button");
        await AvanseLoan.btnEnableWebApp.click();
        allure.startStep("Wait for checkbox to be displayed", true);
        await AvanseLoan.cbToSendOtp.waitForClickable({ timeout: 60000 })
        allure.startStep("Verify that the button is not clickable");
        await expect(await AvanseLoan.btnSendOtp.isClickable()).toEqual(false);
        allure.endStep();
    })

    it('Validate after entering valid details in Customer and loan details page, the next page of Check cibil score should appear', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep('Validate Check cibil score page is displayed');
        await expect(await AvanseLoan.btnCheckCibilScore.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it('Validate after changing the loan status in DB, Upload Bank statement page should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await AvanseLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Validate drop down for Bank statement source is displayed", true);
        await expect(await AvanseLoan.ddBankStatementSource.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it("Validate the continue button to be disabled, until the check box is ticked", async () => {
        allure.startStep("Click on the Avanse pay button and fill details with valid data");
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on continue button", true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Verify Continue button should not be clickable", true)
        await expect(await AvanseLoan.btnContinue.isClickable()).toEqual(false);
        allure.endStep();
    })

    it.skip('Validate after uploading bank statment Account details page should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await AvanseLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Bank Statement source drop down", true);
        await AvanseLoan.ddBankStatementSource.click();
        allure.startStep("Select Email option", true);
        await browser.keys(["E", "m", "a", "i", "l", "Tab"]);
        allure.startStep("Click on Upload Document radio button", true);
        await AvanseLoan.rbUploadDocument.click();
        allure.startStep("Uploading the image", true);
        try {
            const path = require('path');
            const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
            await AvanseLoan.btnChooseFile.setValue(filePath);
        }
        catch { }
        allure.startStep("Click on Upload file button", true);
        await AvanseLoan.btnUploadFile.click();
        allure.startStep("Click on check box to continue button", true);
        await AvanseLoan.cbToSendOtp.click();
        allure.startStep("Click on continue button", true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await AvanseLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Name title drop down to be displayed", true);
        await expect(await AvanseLoan.ddNameTitle.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it('Validate the title Drop down in account details page', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep('wait for Title drop down to be displayed', true);
        await AvanseLoan.ddNameTitle.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Title drop down', true);
        await AvanseLoan.ddNameTitle.click();
        allure.startStep('Verify Title drop down options to be displayed ', true);
        let titleList = avanseData.titleOptions.options.length;
        for (let i = 0; i < titleList; i++) {
            allure.startStep('Wait for Title drop down options to be displayed', true);
            await AvanseLoan.getddTitleOptions(0).waitForDisplayed({ timeout: 10000 });
            allure.startStep('Validate correct option for Title drop down options are displayed ', true);
            await expect(await AvanseLoan.getddTitleOptions(i).getText()).toEqual(avanseData.titleOptions.options[i]);
        }
        allure.endStep();
    })

    it('Validate the Account type Drop down in account details page', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep('wait for Account type drop down to be displayed', true);
        await AvanseLoan.ddAccountType.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Account type drop down', true);
        await AvanseLoan.ddAccountType.click();
        allure.startStep('Verify Account type drop down options to be displayed', true);
        let titleList = avanseData.accountTypeOptions.options.length;
        for (let i = 0; i < titleList; i++) {
            allure.startStep('Wait for Account type drop down options to be displayed ', true);
            await AvanseLoan.getddAccountTypeOptions(0).waitForDisplayed({ timeout: 10000 });
            allure.startStep('Validate correct option for Account type drop down options are displayed', true);
            await expect(await AvanseLoan.getddAccountTypeOptions(i).getText()).toEqual(avanseData.accountTypeOptions.options[i]);
        }
        allure.endStep();
    })

    it('Validate search Branch button is disabled until you select Bank Name', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name tittle field", true);
        await AvanseLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AvanseLoan.tfCustomerName.setValue("Dummy Customer name");
        allure.startStep("Set value in the Account Number text field", true);
        await AvanseLoan.tfAccountNumber.setValue("27358475658");
        allure.startStep("Click on account type drop down", true);
        await AvanseLoan.ddAccountType.click();
        allure.startStep("Select savings option", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Verify for the bank branch button is disabled", true);
        await expect(await AvanseLoan.btnBankBranch.isEnabled()).toEqual(false);
        allure.endStep();
    })

    it('Validate After Selecting Branch rest of the details should be filled and are not editable ', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name tittle field", true);
        await AvanseLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AvanseLoan.tfCustomerName.setValue("Dummy Customer name");
        allure.startStep("Set value in the Account Number text field", true);
        await AvanseLoan.tfAccountNumber.setValue("2735867658");
        allure.startStep("Click on account type drop down", true);
        await AvanseLoan.ddAccountType.click();
        allure.startStep("Select savings option", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank Name type drop down", true);
        await AvanseLoan.ddBankName.click();
        allure.startStep("Select the Bank", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Wait for the Bank Branch button to be clickable", true);
        await AvanseLoan.btnBankBranch.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on  Bank Branch button", true);
        await AvanseLoan.btnBankBranch.click();
        allure.startStep("Click on  Bank Branch radio button", true);
        await AvanseLoan.rbBankBranch.click();
        allure.startStep("Click Select branch button", true);
        await AvanseLoan.btnSelectBranch.click();
        allure.startStep("Validate Ifsc code field is not editable", true);
        await expect(await AvanseLoan.tfIfscCode).toBeDisabled();
        allure.startStep("Validate Micr code field is not editable", true);
        await expect(await AvanseLoan.tfMicrCode).toBeDisabled();
        allure.startStep("Validate Branch city field is not editable", true);
        await expect(await AvanseLoan.tfBranchCity).toBeDisabled();
        allure.endStep();
    })

    it('Validate Continue button is disabled until you fill all the required fields', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name title field", true);
        await AvanseLoan.ddNameTitle.click();
        allure.startStep("Select Mr from drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AvanseLoan.tfCustomerName.setValue("Customer name");
        allure.startStep("Set value to 973584758 in the Account Number text field", true);
        await AvanseLoan.tfAccountNumber.setValue("973584758");
        allure.startStep("Click on Account type field", true);
        await AvanseLoan.ddAccountType.click();
        allure.startStep("Select Savings option from drop down", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank name field", true);
        await AvanseLoan.ddBankName.click();
        allure.startStep("Select Abhyudaya bank from drop down", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Verify continue button is disabled", true);
        await expect(await AvanseLoan.btnContinue.isClickable()).toEqual(false);
        allure.endStep();
    })

    it('Validate after adding Account details page, upload passbook images page should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
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
        await mongoConnect.avanseAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo)
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await AvanseLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name title field", true);
        await AvanseLoan.ddNameTitle.click();
        allure.startStep("Select Mr from drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await AvanseLoan.tfCustomerName.setValue("Dummy Customer name");
        allure.startStep("Set value to 973584758 in the Account Number text field", true);
        await AvanseLoan.tfAccountNumber.setValue("97891284758");
        allure.startStep("Click on Account type field", true);
        await AvanseLoan.ddAccountType.click();
        allure.startStep("Select Savings option from drop down", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank name field", true);
        await AvanseLoan.ddBankName.click();
        allure.startStep("Select Abhyudaya bank from drop down", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Wait for Bank branch button to be clickable", true);
        await AvanseLoan.btnBankBranch.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Bank branch button", true);
        await AvanseLoan.btnBankBranch.click();
        allure.startStep("Select radio button Bank branch", true);
        await AvanseLoan.rbBankBranch.click();
        allure.startStep("Select the Select branch button", true);
        await AvanseLoan.btnSelectBranch.click();
        allure.startStep("Wait for the continue button to be clickable", true);
        await AvanseLoan.btnContinue.waitForClickable({ timeout: 10000 });
        allure.startStep("CLick on continue button", true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for Upload document radio button to be Clickable", true);
        await AvanseLoan.rbUploadDocument.waitForClickable({ timeout: 10000 });
        allure.startStep("Verify that Upload document radio button is displayed", true);
        await expect(await AvanseLoan.rbUploadDocument.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it.skip("Validate after uploading 2 passbook images Next Page button should be displayed", async () => {
        allure.startStep("Click on the Avanse pay button and fill details with valid data");
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep("Add data to db to move to Upload passbook photo page", true);
        await mongoConnect.avanseAddDetailsToUploadPassbookPhoto(appId, dataToMoveTo.UploadPassbookPhoto)
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await AvanseLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await AvanseLoan.rbUploadDocument.click();
        allure.startStep("Upload 2 passbook images", true);
        await AvanseLoan.uploadPassbookImages();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await AvanseLoan.btnNextPage.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await expect(await AvanseLoan.btnNextPage.isDisplayed()).toEqual(true);
        allure.endStep();
    })


    it.skip("Verify that Add More button is displayed after you upload one passbook photo", async () => {
        allure.startStep("Click on the Avanse pay button and fill details with valid data");
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep("Add data to db to move to Upload passbook page", true);
        await mongoConnect.avanseAddDetailsToUploadPassbookPhoto(appId, dataToMoveTo.UploadPassbookPhoto)
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await AvanseLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await AvanseLoan.rbUploadDocument.click();
        allure.startStep("Selecting and uploading the file", true);
        const path = require('path');
        const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
        allure.startStep("Choosing the file", true);
        await AvanseLoan.btnChooseFile.setValue(filePath);
        allure.startStep("Wait for the upload file button to be clickable", true);
        await AvanseLoan.btnUploadFile.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on the upload file button to be clickable", true);
        await AvanseLoan.btnUploadFile.click();
        allure.startStep("Wait untill Add more photo button to be displayed", true);
        await AvanseLoan.btnAddMorePhoto.waitForDisplayed({ timeout: 10000 });
        allure.startStep("Validate Add more photo button is displayed", true);
        await expect(await AvanseLoan.btnAddMorePhoto.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it.skip('Verify after uploading 2 photos and clicking on next button OPS approval timer is started', async () => {
        allure.startStep("Click on the Avanse pay button and fill details with valid data");
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep("Add data to db to move to Upload passbook page", true);
        await mongoConnect.avanseAddDetailsToUploadPassbookPhoto(appId, dataToMoveTo.UploadPassbookPhoto)
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await AvanseLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await AvanseLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await AvanseLoan.rbUploadDocument.click();
        allure.startStep("Upload 2 passbook images", true);
        await AvanseLoan.uploadPassbookImages();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await AvanseLoan.btnNextPage.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await AvanseLoan.btnNextPage.click();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await AvanseLoan.waitForopsTeamApprovalTimer.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await expect(await AvanseLoan.waitForopsTeamApprovalTimer.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it('Verify after approving Abb ticket by filling required details the first EMI drop down should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 15000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await AvanseLoan.btnContinue.waitForClickable({timeout:20000})
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
        allure.startStep('Wait for First emi drop down to be clickable', true);
        await AvanseLoan.ddSelectEmiDate.waitForClickable({ timeout: 30000 });
        allure.startStep('Validate First emi drop down is displayed', true);
        await expect(await AvanseLoan.ddSelectEmiDate.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it('Validate if all the above step are correct than continue button should be enabled on loan details page', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 15000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await AvanseLoan.btnContinue.waitForClickable({timeout:20000})
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AvanseLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, avanseData.avanceValidData);
        allure.startStep('Close the Lms window', true);
        await browser.closeWindow();
        allure.startStep('Switch to window handles', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Click on continue button', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Verify if Continue button on Loan details page is enabled', true);
        await expect(await AvanseLoan.btnContinue.isEnabled()).toEqual(true);
        allure.endStep();
    })

    it("Validate Genarate PNACH button is disabled when we don't click on The Customer's Signature checkbox", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 15000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await AvanseLoan.btnContinue.waitForClickable({timeout:20000})
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AvanseLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, avanseData.avanceValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Wait for the Emi date field to be clickable", true);
        await AvanseLoan.ddSelectEmiDate.waitForClickable({ timeout: 30000 });
        allure.startStep("Wait for the Emi date field to be Existed", true);
        await AvanseLoan.ddSelectEmiDate.waitForExist({ timeout: 30000 });
        allure.startStep("Click on Emi date field", true);
        await AvanseLoan.ddSelectEmiDate.click();
        allure.startStep("Select the Emi field", true);
        await browser.keys("Tab");
        allure.startStep("Click on continue button", true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for continue button on Loan details page to be enabled", true);
        await AvanseLoan.btnContinue.waitForEnabled({ timeout: 3000 });
        allure.startStep("Click on continue button on Loan details page", true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Click on Physical Nach check box", true);
        await AvanseLoan.cbPNach.click();
        allure.startStep("Veirfy that Generate PNACH button is disabled", true);
        await expect(await AvanseLoan.btnGeneratePNACH.isEnabled()).toEqual(false);
        allure.endStep();
    })


    it("Validate after completing the OKYC upload documents page should be displayed", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 15000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await AvanseLoan.btnContinue.waitForClickable({timeout:20000})
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await AvanseLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, avanseData.avanceValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
        await AvanseLoan.selectEmiDateAndApproveLoanAgreement(avanseData.avanceValidData.panNumber);
        allure.startStep('Complete the OKYC steps', true);
        await AvanseLoan.verifyOKYC(avanseData.avanceValidData.panNumber);
        allure.startStep('Wait Upload button present on Upload documents page is displayed', true);
        await AvanseLoan.btnUploadFile.waitForDisplayed({ timeout: 20000 });
        allure.startStep('Validate Upload button present on Upload documents page is displayed', true);
        await expect(await AvanseLoan.btnUploadFile.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it("Validate Send Esign button is clickable", async () => {

        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 15000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await AvanseLoan.btnContinue.waitForClickable({timeout:20000})
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
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await AvanseLoan.btnContinue.click();
        allure.startStep("Wait for Send Esign button to be clickable", true);
        await AvanseLoan.btnSendEsign.waitForClickable({ timeout: 5000 });
        allure.startStep("Verify that Send Esign button is Clickable", true);
        await expect(await AvanseLoan.btnSendEsign.isClickable()).toEqual(true);
        allure.endStep();
    })

    it("Validate Done button is clickable after appId is soft approved", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 15000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await AvanseLoan.btnContinue.waitForClickable({timeout:20000})
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
        allure.startStep('Wait for continue button to be clickable', true);
        await AvanseLoan.btnContinue.waitForClickable({ timeout: 10000 })
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Wait for the Done button to be clickable', true);
        await AvanseLoan.btnDone.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on Done button after status shows soft approved', true);
        await expect(await AvanseLoan.btnDone.isClickable()).toEqual(true);
        allure.endStep();
    })

    it("Validate if all the documents are approved Document Verified pop should be displayed ", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
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
        allure.startStep('Wait for resume button to be clickable', true);
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 15000 })
        allure.startStep('clicking on resume button', true);
        await AvanseLoan.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await AvanseLoan.btnContinue.waitForClickable({timeout:20000})
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
        allure.startStep('Wait for continue button to be clickable', true);
        await AvanseLoan.btnContinue.waitForClickable({ timeout: 10000 })
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await AvanseLoan.btnContinue.click();
        allure.startStep('Go to LMS portal and approve all the documents', true);
        await AvanseLoan.lmsVerifyDocuments(appId);
        allure.startStep('Validate all the documents are verified and for correct appId', true);
        await browser.waitUntil(async () => await AvanseLoan.popUpLoanApproved.getText() === `All documents are verified`,
            {
                timeout: 20000
            })
        allure.endStep();
    })
})
