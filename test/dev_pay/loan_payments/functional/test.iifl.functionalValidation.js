import IIFLLoan from '../../../../pages/loan_payments_page/iifl.payment.page';
import { iiflData } from '../../../../data/iifl.loanform.data';
import mongoConnect from '../../../../utils/mongoconnect';
import { AllureUtil as allure } from '../../../../utils/util.allure';
import { dataToMoveTo } from '../../../../data/iifl.move.to.particular.page';

describe('Verify functional validation for IIFL Loan payment option', async function () {
    this.retries(2)
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

    it('Validate after entering valid details in Customer and loan details page, the next page of Check cibil score should appear', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
        allure.startStep('Validate Check cibil score page is displayed');
        expect(await IIFLLoan.btnCheckCibilScore.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it('Validate the Gender drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await IIFLLoan.createTlpAppId(iiflData.iiflValidDetails)
        allure.startStep("Wait for Skip Upload Document button", true);
        await IIFLLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click on Skip Upload Document button", true);
        await IIFLLoan.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await IIFLLoan.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await IIFLLoan.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable");
        await IIFLLoan.btnEnableWebApp.waitForClickable({ timeout: 22000 });
        allure.startStep("click on Enable webApp button");
        await IIFLLoan.btnEnableWebApp.click();
        allure.startStep('wait for gender drop down to be displayed', true);
        await IIFLLoan.ddGender.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on gender drop down', true);
        await IIFLLoan.ddGender.click();
        allure.startStep('Verify gender drop down options to be displayed ', true);
        let genderList = iiflData.genderOptions.options.length;
        for (let i = 0; i < genderList; i++) {
            allure.startStep('Wait for gender drop down options to be displayed ', true);
            await IIFLLoan.getddGenderOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct option for gender drop down options are displayed ', true);
            await expect(await IIFLLoan.getddGenderOptions(i).getText()).toEqual(iiflData.genderOptions.options[i]);
        }
        allure.endStep();
    });
    it('Validate the Qualification drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await IIFLLoan.createTlpAppId(iiflData.iiflValidDetails)
        allure.startStep("Enter customer details on first page", true);
        await IIFLLoan.customerDetails(iiflData.iiflValidDetails,appId)
        allure.startStep('wait for Qualification drop down to be displayed', true);
        await IIFLLoan.ddQualification.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Qualification drop down', true);
        await IIFLLoan.ddQualification.click();
        allure.startStep('Verify Qualification drop down options to be displayed ', true);
        let qualificationList = iiflData.qualificationOptions.options.length;
        for (let i = 0; i < qualificationList; i++) {
            allure.startStep('Wait for Qualification drop down options to be displayed ', true);
            await IIFLLoan.getddQualificationOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct options for Qualification drop down are displayed ', true);
            await expect(await IIFLLoan.getddQualificationOptions(i).getText()).toEqual(iiflData.qualificationOptions.options[i]);

        }
        allure.endStep();
    });


    it('Validate the occupation type drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await IIFLLoan.createTlpAppId(iiflData.iiflValidDetails)
        allure.startStep("Enter customer details on first page", true);
        await IIFLLoan.customerDetails(iiflData.iiflValidDetails,appId)
        allure.startStep('wait for occupation type drop down to be displayed', true);
        await IIFLLoan.ddOccupationType.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on occupation type drop down', true);
        await IIFLLoan.ddOccupationType.click();
        allure.startStep('Verify occupation type drop down options to be displayed ', true);
        let employmentTypeList = iiflData.occupationTypeOptions.options.length;
        for (let i = 0; i < employmentTypeList; i++) {
            allure.startStep('Wait for occupation type drop down options to be displayed ', true);
            await IIFLLoan.getddEmploymentTypeOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct options for occupation type drop down are displayed ', true);
            await expect(await IIFLLoan.getddEmploymentTypeOptions(i).getText()).toEqual(iiflData.occupationTypeOptions.options[i]);

        }
        allure.endStep();
    });

    it('Validate the Loan tenure drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await IIFLLoan.createTlpAppId(iiflData.iiflValidDetails)
        allure.startStep("Wait for Skip Upload Document button", true);
        await IIFLLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click on Skip Upload Document button", true);
        await IIFLLoan.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await IIFLLoan.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await IIFLLoan.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable");
        await IIFLLoan.btnEnableWebApp.waitForClickable({ timeout: 22000 });
        allure.startStep("click on Enable webApp button");
        await IIFLLoan.btnEnableWebApp.click();
        allure.startStep('wait for Loan tenure drop down to be displayed', true);
        await IIFLLoan.ddLoanTenure.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Loan tenure drop down', true);
        await IIFLLoan.ddLoanTenure.click();
        allure.startStep('Verify Loan tenure drop down options to be displayed ', true);
        let loanTenureList = iiflData.loanTenureOptions.options.length;
        for (let i = 0; i < loanTenureList; i++) {
            allure.startStep('Wait for the Loan tenure drop down options to be displayed ', true);
            await IIFLLoan.getddLoanTenureOptions(0).waitForClickable({ timeout: 5000 });
            allure.startStep('Validate correct option for the Loan tenure drop down are displayed ', true);
            await expect(await IIFLLoan.getddLoanTenureOptions(i).getText()).toEqual(iiflData.loanTenureOptions.options[i]);
        }
        allure.endStep();
    });

    it('Validate Send OTP button is disabled until we click on I, hereby, confirm checkbox', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await IIFLLoan.createTlpAppId(iiflData.iiflValidDetails)
        allure.startStep("Wait for Skip Upload Document button", true);
        await IIFLLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click on Skip Upload Document button", true);
        await IIFLLoan.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await IIFLLoan.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await IIFLLoan.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable");
        await IIFLLoan.btnEnableWebApp.waitForClickable({ timeout: 22000 });
        allure.startStep("click on Enable webApp button");
        await IIFLLoan.btnEnableWebApp.click();
        allure.startStep('Verify that Send OTP button is disabled');
        await expect(await IIFLLoan.btnSendOtp.isClickable()).toEqual(false);
        allure.endStep();
    })

    it('Validate after changing the loan status in DB, Upload Bank statement page should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await IIFLLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await IIFLLoan.rbBankStatementPassbook.click();
        allure.startStep("Validate drop down for Bank statement source is displayed", true);
        await expect(await IIFLLoan.ddBankStatementSource.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it('Validate Continue button is disabled until we click on I, hereby, confirm checkbox', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep('Checking is Continue button is disabled or not', true);
        await expect(await IIFLLoan.btnContinue.isClickable()).toEqual(false);
        allure.endStep();
    })

    it('Validate search Branch button is disabled until you select Bank Name', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Click on Name tittle field", true);
        await IIFLLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await IIFLLoan.tfCustomerName.setValue("Customer name");
        allure.startStep("Set value to afdctrshyu in the Account Number text field", true);
        await IIFLLoan.tfAccountNumber.setValue("27358475658");
        allure.startStep("Click on account type drop down", true);
        await IIFLLoan.ddAccountType.click();
        allure.startStep("Select saving account option", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Verify that search  branch button is disabled", true);
        await expect(await IIFLLoan.btnBankBranch.isClickable()).toEqual(false);
        allure.endStep();
    })

    it('Validate Continue button is disabled until you fill all the required fields', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Click on Name title field", true);
        await IIFLLoan.ddNameTitle.click();
        allure.startStep("Select Mr from drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await IIFLLoan.tfCustomerName.setValue("Customer name");
        allure.startStep("Set value to 973584758 in the Account Number text field", true);
        await IIFLLoan.tfAccountNumber.setValue("973584758");
        allure.startStep("Click on Account type field", true);
        await IIFLLoan.ddAccountType.click();
        allure.startStep("Select Savings option from drop down", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank name field", true);
        await IIFLLoan.ddBankName.click();
        allure.startStep("Select Abhyudaya bank from drop down", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Verify continue button is disabled", true);
        await expect(await IIFLLoan.btnContinue.isClickable()).toEqual(false);
        allure.endStep();
    })

    it.skip('Validate after uploading bank statment Account details page should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await IIFLLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await IIFLLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Bank Statement source drop down", true);
        await IIFLLoan.ddBankStatementSource.click();
        allure.startStep("Select Email option", true);
        await browser.keys(["E", "m", "a", "i", "l", "Tab"]);
        allure.startStep("Click on Upload Document radio button", true);
        await IIFLLoan.rbUploadDocument.click();
        allure.startStep("Uploading the image", true);
        try {
            const path = require('path');
            const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
            await IIFLLoan.btnChooseFile.setValue(filePath);
        }
        catch { }
        allure.startStep("Click on Upload file button", true);
        await IIFLLoan.btnUploadFile.click();
        allure.startStep("Click on check box to continue button", true);
        await IIFLLoan.cbToSendOtp.click();
        allure.startStep("Click on continue button", true);
        await IIFLLoan.btnContinue.click();
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await IIFLLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await IIFLLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Name title drop down to be displayed", true);
        await expect(await IIFLLoan.ddNameTitle.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it('Validate After Selecting Branch rest of the details should be filled and are not editable ', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Click on Name tittle field", true);
        await IIFLLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await IIFLLoan.tfCustomerName.setValue("Dummy Customer name");
        allure.startStep("Set value in the Account Number text field", true);
        await IIFLLoan.tfAccountNumber.setValue("2735867658");
        allure.startStep("Click on account type drop down", true);
        await IIFLLoan.ddAccountType.click();
        allure.startStep("Select savings option", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank Name type drop down", true);
        await IIFLLoan.ddBankName.click();
        allure.startStep("Select the Bank", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Wait for the Bank Branch button to be clickable", true);
        await IIFLLoan.btnBankBranch.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on  Bank Branch button", true);
        await IIFLLoan.btnBankBranch.click();
        allure.startStep("Click on  Bank Branch radio button", true);
        await IIFLLoan.rbBankBranch.click();
        allure.startStep("Click Select branch button", true);
        await IIFLLoan.btnSelectBranch.click();
        allure.startStep("Validate Ifsc code field is not editable", true);
        await expect(await IIFLLoan.tfIfscCode).toBeDisabled();
        allure.startStep("Validate Micr code field is not editable", true);
        await expect(await IIFLLoan.tfMicrCode).toBeDisabled();
        allure.startStep("Validate Branch city field is not editable", true);
        await expect(await IIFLLoan.tfBranchCity).toBeDisabled();
        allure.endStep();
    })

    it.skip("Verify that Add More button is displayed after you upload one passbook photo", async () => {
        allure.startStep("Click on the IIFL pay button and fill details with valid data");
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Update Passbook Photo page", true);
        await mongoConnect.iiflAddDetailsToUploadPassbookPhoto(appId, dataToMoveTo.UploadPassbookPhoto);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await IIFLLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await IIFLLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await IIFLLoan.rbUploadDocument.click();
        allure.startStep("Selecting and uploading the file", true);
        const path = require('path');
        const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
        allure.startStep("Choosing the file", true);
        await IIFLLoan.btnChooseFile.setValue(filePath);
        allure.startStep("Wait for the upload file button to be clickable", true);
        await IIFLLoan.btnUploadFile.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on the upload file button to be clickable", true);
        await IIFLLoan.btnUploadFile.click();
        allure.startStep("Wait untill Add more photo button to be displayed", true);
        await IIFLLoan.btnAddMorePhoto.waitForDisplayed({ timeout: 20000 });
        allure.startStep("Validate Add more photo button is displayed", true);
        await expect(await IIFLLoan.btnAddMorePhoto.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it.skip("Validate after uploading 2 passbook images Next Page button should be displayed", async () => {
        allure.startStep("Click on the IIFL pay button and fill details with valid data");
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Update Passbook Photo page", true);
        await mongoConnect.iiflAddDetailsToUploadPassbookPhoto(appId, dataToMoveTo.UploadPassbookPhoto);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await IIFLLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await IIFLLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await IIFLLoan.rbUploadDocument.click();
        allure.startStep("Upload 2 passbook images", true);
        await IIFLLoan.uploadPassbookImages();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await IIFLLoan.btnNextPage.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await expect(await IIFLLoan.btnNextPage.isDisplayed()).toEqual(true);
        allure.startStep('Deleting the object from DB');
        await mongoConnect.iiflDeleteObjectFromDb(iiflData.iiflValidDetails.panNumber);
        allure.endStep();
    })

    it.skip('Verify after uploading 2 photos and clicking on next button OPS approval timer is started', async () => {
        allure.startStep("Click on the IIFL pay button and fill details with valid data");
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Update Passbook Photo page", true);
        await mongoConnect.iiflAddDetailsToUploadPassbookPhoto(appId, dataToMoveTo.UploadPassbookPhoto);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await IIFLLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await IIFLLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await IIFLLoan.rbUploadDocument.click();
        allure.startStep("Upload 2 passbook images", true);
        await IIFLLoan.uploadPassbookImages();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await IIFLLoan.btnNextPage.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await IIFLLoan.btnNextPage.click();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await IIFLLoan.waitForopsTeamApprovalTimer.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await expect(await IIFLLoan.waitForopsTeamApprovalTimer.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it('Verify after approving Abb ticket by filling required details the first EMI drop down should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Ops team approval pending page", true);
        await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for Resume button to be clickable',true);
        await IIFLLoan.btnResume.waitForClickable({timeout:10000});
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('wait for continue button to be clickable',true);
        await IIFLLoan.btnContinue.waitForClickable({timeout:10000});
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
        allure.startStep('Wait for First emi drop down to be clickable', true);
        await IIFLLoan.ddSelectEmiDate.waitForClickable({ timeout: 30000 });
        allure.startStep('Validate First emi drop down is displayed', true);
        await expect(await IIFLLoan.ddSelectEmiDate.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it('Validate if all the above step are correct than continue button should be enabled', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Ops team approval pending page", true);
        await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for Resume button to be clickable',true);
        await IIFLLoan.btnResume.waitForClickable({timeout:10000});
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('wait for continue button to be clickable',true);
        await IIFLLoan.btnContinue.waitForClickable({timeout:10000});;
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await IIFLLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, iiflData.iiflValidDetails);
        allure.startStep('Close the Lms window', true);
        await browser.closeWindow();
        allure.startStep('Switch to window handles', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Verify if Continue button on Loan details page is enabled', true);
        await IIFLLoan.btnContinue.waitForEnabled({ timeout: 60000 });
        allure.endStep();
    })

    it("Validate after completing the OKYC upload documents page should be displayed", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Ops team approval pending page", true);
        await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for Resume button to be clickable',true);
        await IIFLLoan.btnResume.waitForClickable({timeout:10000});
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('wait for continue button to be clickable',true);
        await IIFLLoan.btnContinue.waitForClickable({timeout:10000});
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await IIFLLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, iiflData.iiflValidDetails);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
        await IIFLLoan.selectEmiDateAndApproveLoanAgreement(iiflData.iiflValidDetails.panNumber);
        allure.startStep('Complete the OKYC steps', true);
        await IIFLLoan.verifyOKYC();
        allure.startStep('Wait Upload button present on Upload documents page is displayed', true);
        await IIFLLoan.btnUploadFile.waitForDisplayed({ timeout: 20000 });
        allure.startStep('Validate Upload button present on Upload documents page is displayed', true);
        await expect(await IIFLLoan.btnUploadFile.isDisplayed()).toEqual(true);
        allure.endStep();
    })

    it("Validate Genarate PNACH button is disabled when we don't click on The Customer's Signature checkbox", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Ops team approval pending page", true);
        await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for Resume button to be clickable',true);
        await IIFLLoan.btnResume.waitForClickable({timeout:10000});
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('wait for continue button to be clickable',true);
        await IIFLLoan.btnContinue.waitForClickable({timeout:10000});;
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await IIFLLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, iiflData.iiflValidDetails);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Wait for the Emi date field to be clickable", true);
        await IIFLLoan.ddSelectEmiDate.waitForClickable({ timeout: 30000 });
        allure.startStep("Wait for the Emi date field to be Existed", true);
        await IIFLLoan.ddSelectEmiDate.waitForExist({ timeout: 30000 });
        allure.startStep("Click on Emi date field", true);
        await IIFLLoan.ddSelectEmiDate.click();
        allure.startStep("Select the Emi field", true);
        await browser.keys("Tab");
        allure.startStep("Click on continue button", true);
        await IIFLLoan.btnContinue.click();
        allure.startStep("Wait for continue button on Loan details page to be enabled", true);
        await IIFLLoan.btnContinue.waitForEnabled({ timeout: 3000 });
        allure.startStep("Click on continue button on Loan details page", true);
        await IIFLLoan.btnContinue.click();
        allure.startStep("Click on Pnach radio button", true);
        await IIFLLoan.cbPNach.click();
        allure.startStep("Veirfy that Generate PNACH button is disabled", true);
        await expect(await IIFLLoan.btnGeneratePNACH.isEnabled()).toEqual(false);
        allure.endStep();
    })

    it("Validate Send Esign button is clickable", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Ops team approval pending page", true);
        await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for Resume button to be clickable',true);
        await IIFLLoan.btnResume.waitForClickable({timeout:10000});
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('wait for continue button to be clickable',true);
        await IIFLLoan.btnContinue.waitForClickable({timeout:10000});
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await IIFLLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, iiflData.iiflValidDetails);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.iiflAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await IIFLLoan.btnContinue.click();
        allure.startStep("Wait for Send Esign button to be clickable", true);
        await IIFLLoan.btnSendEsign.waitForClickable({ timeout: 50000 });
        allure.startStep("Verify that Send Esign button is Clickable", true);
        await expect(await IIFLLoan.btnSendEsign.isClickable()).toEqual(true);
        allure.endStep();
    })

    it("Validate Done button is clickable after appId is soft approved", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Ops team approval pending page", true);
        await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for Resume button to be clickable',true);
        await IIFLLoan.btnResume.waitForClickable({timeout:10000});
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('wait for continue button to be clickable',true);
        await IIFLLoan.btnContinue.waitForClickable({timeout:10000});
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await IIFLLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, iiflData.iiflValidDetails);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.iiflAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
        allure.startStep('Update Esign details in transactionscibil collection', true);
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection', true);
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI', true);
        await browser.pause(5000);
        allure.startStep('Refresh the window', true);
        await browser.refresh();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep('Wait for the Done button to be clickable', true);
        await IIFLLoan.btnDone.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on Done button after status shows soft approved', true);
        await expect(await IIFLLoan.btnDone.isClickable()).toEqual(true);
        allure.endStep();
    })

    it("Validate correct AppId is displayed", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Ops team approval pending page", true);
        await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for Resume button to be clickable',true);
        await IIFLLoan.btnResume.waitForClickable({timeout:10000});
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('wait for continue button to be clickable',true);
        await IIFLLoan.btnContinue.waitForClickable({timeout:10000});
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await IIFLLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, iiflData.iiflValidDetails);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.iiflAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
        allure.startStep('Update Esign details in transactionscibil collection', true);
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection', true);
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI', true);
        await browser.pause(5000);
        allure.startStep('Refresh the window', true);
        await browser.refresh();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep('Verify correct AppId is displayed', true);
        await expect(await IIFLLoan.getverifyAppId(appId).getText()).toEqual(appId);
        allure.endStep();
    })

    it("Validate if all the documents are approved Document Verified pop should be displayed and have correct AppId", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
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
        allure.startStep("Add data to db to move to Ops team approval pending page", true);
        await mongoConnect.iiflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('Wait for Resume button to be clickable',true);
        await IIFLLoan.btnResume.waitForClickable({timeout:10000});
        allure.startStep('clicking on resume button', true);
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('wait for continue button to be clickable',true);
        await IIFLLoan.btnContinue.waitForClickable({timeout:10000});
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await IIFLLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, iiflData.iiflValidDetails);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.iiflAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
        allure.startStep('Update Esign details in transactionscibil collection', true);
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection', true);
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI', true);
        await browser.pause(5000);
        allure.startStep('Refresh the window', true);
        await browser.refresh();
        allure.startStep('Click on continue button to complete the remaining steps', true);
        await IIFLLoan.btnContinue.click();
        allure.startStep('Go to LMS portal and approve all the documents', true);
        await IIFLLoan.lmsVerifyDocuments(appId);
        allure.startStep('Validate all the documents are verified and for correct appId', true);
        await browser.waitUntil(async () => await IIFLLoan.popUpLoanApproved.getText() === `All documents are verified`,
            {
                timeout: 20000
            })
        allure.endStep();
    })

})
