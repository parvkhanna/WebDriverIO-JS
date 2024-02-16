import FullertonLoan from "../../../../pages/loan_payments_page/fullerton.payment.page";
import { AllureUtil as allure } from "../../../../utils/util.allure";
import { fullertonData } from "../../../../data/fullerton.loanform.data";
import { dataToMoveTo } from "../../../../data/fullerton.move.to.particular.page"
import mongoConnect from "../../../../utils/mongoconnect";
import fullertonPaymentPage from "../../../../pages/loan_payments_page/fullerton.payment.page";

describe("Verify functional validation for Fullerton V3 payment option", async function () {
     this.retries(2)
    beforeEach('Open payment portal', async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await FullertonLoan.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Deleting object from Db which has pan number we used', true);
        await mongoConnect.fullertonDeleteObjectFromDb(fullertonData.fullertonValidData.panNumber);
    })

    afterEach('Delete object from DB  ', async () => {
        allure.startStep('Delete Pancard  and telephone Number from db after each test case ');
        await mongoConnect.fullertonDeleteObjectFromDb(fullertonData.fullertonValidData.panNumber);

    })
    it('Validate after entering valid details in Customer and loan details page, the next page of Check cibil score should appear', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Fullerton loan & Click on sent OTP');
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Wait for resend otp button to be displayed", true);
        await FullertonLoan.btnResendOtp.waitForDisplayed({timeout:10000})
        allure.startStep('Validate Check cibil score page is displayed');
        await expect(await FullertonLoan.btnResendOtp.isDisplayed()).toEqual(true);
        allure.endStep();
    })
    

    it('Validate the Marital status drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await FullertonLoan.createTlpAppId(fullertonData.fullertonValidData)
        allure.startStep("Enter customer details on first page", true);
        await FullertonLoan.customerDetails(fullertonData.fullertonValidData,appId)
        allure.startStep('Wait for Marital status drop down to be displayed', true);
        await FullertonLoan.ddMartialStatus.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Marital status drop down', true);
        await FullertonLoan.ddMartialStatus.click();
        allure.startStep('Verify Marital status drop down options to be displayed ', true);
        let maritalStatusList = fullertonData.maritalStatusOptions.options.length;
        for (let i = 0; i < maritalStatusList; i++) {
            allure.startStep('Wait for Marital status drop down options to be displayed', true);
            await FullertonLoan.getddMaritalStatusOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct option for Marital status are displayed', true);
            await expect(await FullertonLoan.getddMaritalStatusOptions(i).getText()).toEqual(fullertonData.maritalStatusOptions.options[i]);
        }
        allure.endStep();
    })

    it('Validate the Education qualification drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await FullertonLoan.createTlpAppId(fullertonData.fullertonValidData)
        allure.startStep("Enter customer details on first page", true);
        await FullertonLoan.customerDetails(fullertonData.fullertonValidData,appId)
        allure.startStep('Wait for Education drop down to be displayed', true);
        await FullertonLoan.ddQualification.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Education drop down', true);
        await FullertonLoan.ddQualification.click();
        allure.startStep('Verify Education drop down options to be displayed ', true);
        let educationList = fullertonData.educationOptions.options.length;
        for (let i = 0; i < educationList; i++) {
            allure.startStep('Wait for Education drop down options to be displayed', true);
            await FullertonLoan.getddEducationOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct option for Education are displayed', true);
            await expect(await FullertonLoan.getddEducationOptions(i).getText()).toEqual(fullertonData.educationOptions.options[i]);
        }
        allure.endStep();
    })

    it('Validate the occupation type drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await FullertonLoan.createTlpAppId(fullertonData.fullertonValidData)
        allure.startStep("Enter customer details on first page", true);
        await FullertonLoan.customerDetails(fullertonData.fullertonValidData,appId)
        allure.startStep('Wait for Employment drop down to be displayed', true);
        await FullertonLoan.ddOccupationType.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Employment drop down', true);
        await FullertonLoan.ddOccupationType.click();
        allure.startStep('Verify Employment drop down options to be displayed ', true);
        let employementList = fullertonData.occupationTypeOptions.options.length;
        for (let i = 0; i < employementList; i++) {
            allure.startStep('Wait for Employment drop down options to be displayed', true);
            await FullertonLoan.getddEmployementOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct option for Employment are displayed', true);
            await expect(await FullertonLoan.getddEmployementOptions(i).getText()).toEqual(fullertonData.occupationTypeOptions.options[i]);
        }
        allure.endStep();
    })


    it('Validate the residence type drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await FullertonLoan.createTlpAppId(fullertonData.fullertonValidData)
        allure.startStep("Enter customer details on first page", true);
        await FullertonLoan.customerDetails(fullertonData.fullertonValidData,appId)
        allure.startStep('Wait for residence type drop down to be displayed', true);
        await FullertonLoan.ddResidenceType.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on residence type drop down', true);
        await FullertonLoan.ddResidenceType.click();
        allure.startStep('Verify residence type drop down options to be displayed ', true);
        let residenceTypeList = fullertonData.residenceTypeOptions.options.length;
        for (let i = 0; i < residenceTypeList; i++) {
            allure.startStep('Wait for Property type drop down options to be displayed', true);
            await FullertonLoan.getddPropertyTypeOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct option for Property type are displayed', true);
            await expect(await FullertonLoan.getddPropertyTypeOptions(i).getText()).toEqual(fullertonData.residenceTypeOptions.options[i]);
        }
        allure.endStep();
    })

    it('Validate the Loan tenure drop down', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await FullertonLoan.createTlpAppId(fullertonData.fullertonValidData);
        allure.startStep('Wait for Skip upload button to be existed', true);
        await FullertonLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep("Click on Skip Upload Document button", true);
        await FullertonLoan.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await FullertonLoan.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await FullertonLoan.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable")
        await FullertonLoan.btnEnableWebApp.waitForClickable({ timeout: 22000 })
        allure.startStep("click on Enable webApp button")
        await FullertonLoan.btnEnableWebApp.click()
        allure.startStep('Wait for Loan tenure drop down to be displayed', true);
        await FullertonLoan.ddLoanTenure.waitForClickable({ timeout: 20000 });
        allure.startStep('Click on Loan tenure drop down', true);
        await FullertonLoan.ddLoanTenure.click();
        allure.startStep('Verify Loan tenure drop down options to be displayed ', true);
        let loanTunureList = fullertonData.loanTenureOptions.options.length;
        for (let i = 0; i < loanTunureList; i++) {
            allure.startStep('Wait for Loan tenure drop down options to be displayed', true);
            await FullertonLoan.getddLoanTenureOptions(0).waitForDisplayed({ timeout: 3000 });
            allure.startStep('Validate correct option for Loan tenure are displayed', true);
            await expect(await FullertonLoan.getddLoanTenureOptions(i).getText()).toEqual(fullertonData.loanTenureOptions.options[i]);
        }
        allure.endStep();
    })

    it('Validate when pincode entered correct city name alligned to that pincode should appear', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await FullertonLoan.createTlpAppId(fullertonData.fullertonValidData)
        allure.startStep('Wait for Skip upload button to be existed', true);
        await FullertonLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep('Click on skip upload documents button in the pop up', true);
        await FullertonLoan.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await FullertonLoan.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await FullertonLoan.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable")
        await FullertonLoan.btnEnableWebApp.waitForClickable({ timeout: 22000 })
        allure.startStep("click on Enable webApp button")
        await FullertonLoan.btnEnableWebApp.click();
        allure.startStep('Wait for the element to be clickable', true);
        await FullertonLoan.tfBorrowersPinCode.waitForClickable({ timeout: 5000 });
        allure.startStep('Enter valid pincode', true);
        await FullertonLoan.tfBorrowersPinCode.setValue("452009");
        allure.startStep('2 seconds wait for city name to be displayed', true);
        await browser.pause(2000);
        allure.startStep('Verify correct city name alligned to the given pincode should appear', true);
        await expect(await FullertonLoan.ddCityName.getText()).toEqual('Indore');
        allure.endStep();
    });

    it('Validate Send OTP button is disabled until I hereby, confirm checkbox is checked.', async () => {
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await FullertonLoan.createTlpAppId(fullertonData.fullertonValidData);
        allure.startStep('Wait for Skip upload button to be existed', true);
        await FullertonLoan.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        allure.startStep('Click on skip upload documents button in the pop up', true);
        await FullertonLoan.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await FullertonLoan.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await FullertonLoan.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable")
        await FullertonLoan.btnEnableWebApp.waitForClickable({ timeout: 22000 })
        allure.startStep("click on Enable webApp button")
        await FullertonLoan.btnEnableWebApp.click()
        allure.startStep("wait for check box to be clickable", true)
        await FullertonLoan.cbToSendOtp.waitForClickable({ timeout: 10000 })
        allure.startStep("Verify send OTP button should not be clickable", true)
        await expect(await FullertonLoan.btnSendOtp.isClickable()).toEqual(false)
        allure.endStep();
    });

    it('Validate after changing the loan status in DB, Upload Bank statement page should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Fullerton loan & Click on sent OTP');
        let panNumber = await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep('Login to the payment page', true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open fullerton Unprocessed loan & get appId', true);
        let appId = await FullertonLoan.returnAppId(panNumber);
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
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await FullertonLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Validate drop down for Bank statement source is displayed", true);
        await expect(await FullertonLoan.ddBankStatementSource.isDisplayed()).toEqual(true);
        allure.endStep();
    })
    it("Validate the continue button to be disabled, until the check box is ticked( Upload bank statement )", async () => {
        allure.startStep("Click on the Fullerton pay button and fill details with valid data");
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Verify Continue button should not be clickable", true)
        await expect(await FullertonLoan.btnContinue.isClickable()).toEqual(false);
        allure.endStep();
    })

    it('Validate search Branch button is disabled until you select Bank Name', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Fullerton loan & Click on sent OTP');
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to Account Information page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name title field", true);
        await FullertonLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await FullertonLoan.tfCustomerName.setValue("Customer name");
        allure.startStep("Set value to afdctrshyu in the Account Number text field", true);
        await FullertonLoan.tfAccountNumber.setValue("27358475658");
        allure.startStep("Click on account type drop down", true);
        await FullertonLoan.ddAccountType.click();
        allure.startStep("Select saving account option", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Verify that search  branch button is disabled", true);
        await expect(await FullertonLoan.btnBankBranch.isClickable()).toEqual(false);
        allure.endStep();
    });

    it('Validate Continue button is disabled until you fill all the required fields', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Fullerton loan & Click on sent OTP');
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to Account Information page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name title field", true);
        await FullertonLoan.ddNameTitle.click();
        allure.startStep("Select Mr from drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await FullertonLoan.tfCustomerName.setValue("Customer name");
        allure.startStep("Set value to 973584758 in the Account Number text field", true);
        await FullertonLoan.tfAccountNumber.setValue("973584758");
        allure.startStep("Click on Account type field", true);
        await FullertonLoan.ddAccountType.click();
        allure.startStep("Select Savings option from drop down", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank name field", true);
        await FullertonLoan.ddBankName.click();
        allure.startStep("Select Abhyudaya bank from drop down", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Verify continue button is disabled", true);
        await expect(await FullertonLoan.btnContinue.isClickable()).toEqual(false);
        allure.endStep();
    });

    it.skip('Validate after uploading bank statement it should take you to account details page', async () => {

        allure.startStep('Enter valid customer details in Customer and Loan Details form of Fullerton loan & Click on sent OTP');
        let panNumber = await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await FullertonLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Bank Statement source drop down", true);
        await FullertonLoan.ddBankStatementSource.click();
        allure.startStep("Select Email option", true);
        await browser.keys(["E", "m", "a", "i", "l", "Tab"]);
        allure.startStep("Click on Upload Document radio button", true);
        await FullertonLoan.rbUploadDocument.click();
        allure.startStep("Uploading the image", true);
        try {
            const path = require('path');
            const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
            await FullertonLoan.btnChooseFile.setValue(filePath);
        }
        catch { }
        allure.startStep("Click on Upload file button", true);
        await FullertonLoan.btnUploadFile.click();
        allure.startStep("Click on check box to continue button", true);
        await FullertonLoan.cbToSendOtp.click();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await FullertonLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Name title drop down to be displayed", true);
        await expect(await FullertonLoan.ddNameTitle.isDisplayed()).toEqual(true);
        allure.endStep();

    });

    it('Validate After Selecting Branch rest of the details should be filled and are un editable ', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Fullerton loan & Click on sent OTP');
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to Account Information page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name tittle field", true);
        await FullertonLoan.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await FullertonLoan.tfCustomerName.setValue("Dummy Customer name");
        allure.startStep("Set value in the Account Number text field", true);
        await FullertonLoan.tfAccountNumber.setValue("2735867658");
        allure.startStep("Click on account type drop down", true);
        await FullertonLoan.ddAccountType.click();
        allure.startStep("Select savings option", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank Name type drop down", true);
        await FullertonLoan.ddBankName.click();
        allure.startStep("Select the Bank", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Wait for the Bank Branch button to be clickable", true);
        await FullertonLoan.btnBankBranch.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on  Bank Branch button", true);
        await FullertonLoan.btnBankBranch.click();
        allure.startStep("Click on  Bank Branch radio button", true);
        await FullertonLoan.rbBankBranch.click();
        allure.startStep("Click Select branch button", true);
        await FullertonLoan.btnSelectBranch.click();
        allure.startStep("Validate Ifsc code field is not editable", true);
        await expect(await FullertonLoan.tfIfscCode).toBeDisabled();
        allure.startStep("Validate Micr code field is not editable", true);
        await expect(await FullertonLoan.tfMicrCode).toBeDisabled();
        allure.startStep("Validate Branch city field is not editable", true);
        await expect(await FullertonLoan.tfBranchCity).toBeDisabled();
        allure.endStep();
    });

    it.skip('Validate after uploading 2 passbook images Next Page button should be displayed', async () => {
        allure.startStep("Click on the fullerton pay button and fill details with valid data");
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to Update Passbook Photo page", true);
        await mongoConnect.fulleronAddDetailsToUploadPassbookPhoto(appId, dataToMoveTo.UploadPassbookPhoto);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await FullertonLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await FullertonLoan.rbUploadDocument.click();
        allure.startStep("Upload 2 passbook images", true);
        await FullertonLoan.uploadPassbookImages();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await FullertonLoan.btnNextPage.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await expect(await FullertonLoan.btnNextPage.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it.skip('Verify that  Add More button is displayed after you upload one passbook photo', async () => {
        allure.startStep("Click on the fullerton pay button and fill details with valid data");
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to Update Passbook Photo page", true);
        await mongoConnect.fulleronAddDetailsToUploadPassbookPhoto(appId, dataToMoveTo.UploadPassbookPhoto);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await FullertonLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await FullertonLoan.rbUploadDocument.click();
        allure.startStep("Selecting and uploading the file", true);
        const path = require('path');
        const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
        allure.startStep("Choosing the file", true);
        await FullertonLoan.btnChooseFile.setValue(filePath);
        allure.startStep("Wait for the upload file button to be clickable", true);
        await FullertonLoan.btnUploadFile.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on the upload file button to be clickable", true);
        await FullertonLoan.btnUploadFile.click();
        allure.startStep("Wait untill Add more photo button to be displayed", true);
        await FullertonLoan.btnAddMorePhoto.waitForDisplayed({ timeout: 10000 });
        allure.startStep("Validate Add more photo button is displayed", true);
        await expect(await FullertonLoan.btnAddMorePhoto.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it('Validate after adding bank details upload passbook photo page should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of fullerton loan & Click on sent OTP');
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to Account Information page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Wait for the Bank Statement Passbook radio button to be clickable", true);
        await FullertonLoan.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        allure.startStep("Click on Bank Statement Passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Click on Name title field", true);
        await FullertonLoan.ddNameTitle.click();
        allure.startStep("Select Mr from drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await FullertonLoan.tfCustomerName.setValue("Dummy Customer name");
        allure.startStep("Set value to 973584758 in the Account Number text field", true);
        await FullertonLoan.tfAccountNumber.setValue("97891284758");
        allure.startStep("Click on Account type field", true);
        await FullertonLoan.ddAccountType.click();
        allure.startStep("Select Savings option from drop down", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank name field", true);
        await FullertonLoan.ddBankName.click();
        allure.startStep("Select Abhyudaya bank from drop down", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Wait for Bank branch button to be clickable", true);
        await FullertonLoan.btnBankBranch.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Bank branch button", true);
        await FullertonLoan.btnBankBranch.click();
        allure.startStep("Select radio button Bank branch", true);
        await FullertonLoan.rbBankBranch.click();
        allure.startStep("Select the Select branch button", true);
        await FullertonLoan.btnSelectBranch.click();
        allure.startStep("Wait for the continue button to be clickable", true);
        await FullertonLoan.btnContinue.waitForClickable({ timeout: 10000 });
        allure.startStep("CLick on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Wait for Upload document radio button to be Clickable", true);
        await FullertonLoan.rbUploadDocument.waitForClickable({ timeout: 10000 });
        allure.startStep("Verify that Upload document radio button is displayed", true);
        await expect(await FullertonLoan.rbUploadDocument.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it.skip('Validate after uploading 2 photos and clicking on next button OPS approval timer is started', async () => {
        allure.startStep("Click on the fullerton pay button and fill details with valid data");
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to Upload passbook photo page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.UploadPassbookPhoto);
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await FullertonLoan.rbBankStatementPassbook.click();
        allure.startStep("Wait for Update Document button", true);
        await FullertonLoan.rbUploadDocument.waitForClickable({ timeout: 60000 });
        allure.startStep("Click on Upload Document button", true);
        await FullertonLoan.rbUploadDocument.click();
        allure.startStep("Upload 2 passbook images", true);
        await FullertonLoan.uploadPassbookImages();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await FullertonLoan.btnNextPage.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await FullertonLoan.btnNextPage.click();
        allure.startStep("Wait till Next Page button to be displayed", true);
        await FullertonLoan.waitForopsTeamApprovalTimer.waitForDisplayed({ timeout: 15000 });
        allure.startStep("Verify Next Page button is displayed", true);
        await expect(await FullertonLoan.waitForopsTeamApprovalTimer.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it('Validate after approving Abb ticket by filling required details the first EMI drop down should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of fullerton loan & Click on sent OTP');
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to wait for Ops team approval page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "fullertonv3");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("wait for continue button to be clickable", true);
        await FullertonLoan.btnContinue.waitForClickable({timeout:15000})
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Update status of above appId in transactionscibil collection as Cibil check passed', true);
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(appId);
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await FullertonLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, fullertonData.fullertonValidData);
        allure.startStep('Close the Lms window', true);
        await browser.closeWindow();
        allure.startStep('Switch to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Wait for First emi drop down to be clickable', true);
        await FullertonLoan.ddSelectEmiDate.waitForClickable({ timeout: 30000 });
        allure.startStep('Validate First emi drop down is displayed', true);
        await expect(await FullertonLoan.ddSelectEmiDate.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it('Validate if all the above information are correct than continue button should be enabled', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of fullerton loan & Click on sent OTP');
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to wait for Ops team approval page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "fullertonv3");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("wait for continue button to be clickable", true);
        await FullertonLoan.btnContinue.waitForClickable({timeout:15000})
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Update status of above appId in transactionscibil collection as Cibil check passed', true);
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(appId);
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await FullertonLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, fullertonData.fullertonValidData);
        allure.startStep('Close the Lms window', true);
        await browser.closeWindow();
        allure.startStep('Switch to window handles', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Wait for Continue button on Loan details page is enabled', true);
        await FullertonLoan.btnContinue.waitForEnabled({ timeout: 60000 });
        allure.startStep('Verify if Continue button on Loan details page is enabled', true);
        await expect(await FullertonLoan.btnContinue.isEnabled()).toEqual(true)
        allure.endStep();
    });
    it('Validate after completing the OKYC upload documents page should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of fullerton loan & Click on sent OTP');
        let panNumber = await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to wait for Ops team approval page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "fullertonv3");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("wait for continue button to be clickable", true);
        await FullertonLoan.btnContinue.waitForClickable({timeout:15000})
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Update status of above appId in transactionscibil collection as Cibil check passed', true);
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(appId);
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await FullertonLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, fullertonData.fullertonValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
        await FullertonLoan.selectEmiDateAndApproveLoanAgreement(panNumber);
        allure.startStep('Complete the OKYC steps', true);
        await FullertonLoan.verifyOKYC(panNumber);
        allure.startStep('Wait Upload button present on Upload documents page is displayed', true);
        await FullertonLoan.btnUploadFile.waitForDisplayed({ timeout: 20000 });
        allure.startStep('Validate Upload button present on Upload documents page is displayed', true);
        await expect(await FullertonLoan.btnUploadFile.isDisplayed()).toEqual(true);
        allure.endStep();
    });
    it("Validate Genarate PNACH button is disabled when we don't click on The Customer's Signature checkbox", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of fullerton loan & Click on sent OTP');
        let panNumber = await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to wait for Ops team approval page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "fullertonv3");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("wait for continue button to be clickable", true);
        await FullertonLoan.btnContinue.waitForClickable({timeout:15000})
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Update status of above appId in transactionscibil collection as Cibil check passed', true);
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(appId);
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await FullertonLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, fullertonData.fullertonValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Wait for the Emi date field to be clickable", true);
        await FullertonLoan.ddSelectEmiDate.waitForClickable({ timeout: 30000 });
        allure.startStep("Wait for the Emi date field to be Existed", true);
        await FullertonLoan.ddSelectEmiDate.waitForExist({ timeout: 30000 });
        allure.startStep("Click on Emi date field", true);
        await FullertonLoan.ddSelectEmiDate.click();
        allure.startStep("Select the Emi field", true);
        await browser.keys("Tab");
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Wait for continue button on Loan details page to be enabled", true);
        await FullertonLoan.btnContinue.waitForEnabled({ timeout: 3000 });
        allure.startStep("Click on continue button on Loan details page", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Click on Physical Nach check box", true);
        await FullertonLoan.cbPNach.click();
        allure.startStep("Veirfy that Generate PNACH button is disabled", true);
        await expect(await FullertonLoan.btnGeneratePNACH.isEnabled()).toEqual(false);
        allure.endStep();
    });

    it('Validate after uploading the required documents Send Esign button is Clickable', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of fullerton loan & Click on sent OTP');
        let panNumber = await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to wait for Ops team approval page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "fullertonv3");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("wait for continue button to be clickable", true);
        await FullertonLoan.btnContinue.waitForClickable({timeout:15000})
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Update status of above appId in transactionscibil collection as Cibil check passed', true);
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(appId);
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await FullertonLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, fullertonData.fullertonValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to upload documents page", true);
        await mongoConnect.fullertonAddDetailsToEsignPage(appId, dataToMoveTo.eSignAgreementPage)
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable', true);
        await FullertonLoan.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await FullertonLoan.btnContinue.click();
        allure.startStep("Wait for Send Esign button to be clickable", true);
        await FullertonLoan.btnSendEsign.waitForClickable({ timeout: 5000 });
        allure.startStep("Verify that Send Esign button is Clickable", true);
        await expect(await FullertonLoan.btnSendEsign.isClickable()).toEqual(true);
        allure.endStep();
    });

    it('Validate Done button is clickable after appId is soft approved', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of fullerton loan & Click on sent OTP');
        let panNumber = await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to wait for Ops team approval page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "fullertonv3");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("wait for continue button to be clickable", true);
        await FullertonLoan.btnContinue.waitForClickable({timeout:15000})
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Update status of above appId in transactionscibil collection as Cibil check passed', true);
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(appId);
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await FullertonLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, fullertonData.fullertonValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.fullertonAddDetailsToEsignPage(appId, dataToMoveTo.eSignAgreementPage);
        allure.startStep("Update status in db as approval pending", true);
        await mongoConnect.updateTransactionsCibilStatusApprovalPending(appId);
        allure.startStep('Update Esign details in transactionscibil collection', true);
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection', true);
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI', true);
        await browser.pause(5000);
        allure.startStep('Refresh the window', true);
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable', true);
        await FullertonLoan.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Wait for the Done button to be clickable', true);
        await FullertonLoan.btnDone.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on Done button after status shows soft approved', true);
        await expect(await FullertonLoan.btnDone.isClickable()).toEqual(true)
        allure.endStep();
    });

    it('Validate if all the documents are approved Document Verified pop should be displayed and  have correct AppId', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of fullerton loan & Click on sent OTP');
        await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
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
        await FullertonLoan.btnResume(appId).click();
        allure.startStep("Add data to db to move to wait for Ops team approval page", true);
        await mongoConnect.fullertonAddDetailsToAccountInfo(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "fullertonv3");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep("wait for continue button to be clickable", true);
        await FullertonLoan.btnContinue.waitForClickable({timeout:15000})
        allure.startStep("Click on continue button", true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Update status of above appId in transactionscibil collection as Cibil check passed', true);
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(appId);
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await FullertonLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, fullertonData.fullertonValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.fullertonAddDetailsToEsignPage(appId, dataToMoveTo.eSignAgreementPage);
        allure.startStep("Update status in db as approval pending", true);
        await mongoConnect.updateTransactionsCibilStatusApprovalPending(appId);
        allure.startStep('Update Esign details in transactionscibil collection', true);
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection', true);
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI', true);
        await browser.pause(5000);
        allure.startStep('Refresh the window', true);
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable', true);
        await FullertonLoan.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Wait for the Done button to be clickable', true);
        await FullertonLoan.btnDone.waitForClickable({ timeout: 10000 });
        allure.startStep('Go to LMS portal and approve all the documents', true);
        await FullertonLoan.lmsVerifyDocuments(appId);
        allure.startStep('Validate all the documents are verified', true);
        await browser.waitUntil(async () => await FullertonLoan.popUpDocApproved.getText() == `All documents are verified`,
            {
                timeout: 20000
            })
            allure.endStep();
    });
})
