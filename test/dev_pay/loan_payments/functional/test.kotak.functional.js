import mongoConnect from "../../../../utils/mongoconnect";
import { AllureUtil as allure } from '../../../../utils/util.allure';
import KotakPage from '../../../../pages/loan_payments_page/kotak.payment.page';
import { kotakData } from '../../../../data/kotak.loanform.data';
import { dataToMoveTo } from '../../../../data/kotak.move.to.particular.page';

describe('Verify functional validation for kotak EMI payment option', async function () {
    this.retries(2)

    beforeEach("Open payment portal", async () => {
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await KotakPage.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.kotakDeleteObjectFromDb(kotakData.kotakValidDetails.panNumber);
    });
    afterEach('Delete object from DB  ', async () => {
        allure.startStep('Delete Pancard  and telephone Number from db after each test case ');
        await mongoConnect.kotakDeleteObjectFromDb(kotakData.kotakValidDetails.panNumber);

    })

    it('Validate send OTP button is enabled after the consent checkbox is selected', async () => {
        console.log("Validate send OTP button is enabled after the consent checkbox is selected")
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await KotakPage.createTlpAppId(kotakData.kotakValidDetails);
        allure.startStep("Wait for Skip Upload Document button", true);
        await KotakPage.btnSkipUploadDocument.waitForDisplayed({ timeout: 30000 });
        allure.startStep("Click Skip Upload Document button", true);
        await KotakPage.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await KotakPage.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await KotakPage.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable")
        await KotakPage.btnEnableWebApp.waitForClickable({ timeout: 22000 })
        allure.startStep("click on Enable webApp button")
        await KotakPage.btnEnableWebApp.click()
        allure.startStep("Wait for checkbox to be displayed", true);
        await KotakPage.cbToSendOtp.waitForClickable({ timeout: 60000 })
        allure.startStep("Tick the sent OTP checkbox", true);
        await KotakPage.cbToSendOtp.click();
        allure.startStep("Verify send otp button is enabled", true);
        await expect(await KotakPage.btnNextpg.isEnabled()).toEqual(true)
        allure.endStep();
    });

    it('Validate loan tenure  drop down on customer and loan details page', async () => {
        console.log("Validate loan tenure  drop down on customer and loan details page")
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await KotakPage.createTlpAppId(kotakData.kotakValidDetails);
        allure.startStep("Wait for Skip Upload Document button", true);
        await KotakPage.btnSkipUploadDocument.waitForDisplayed({ timeout: 30000 });
        allure.startStep("Click Skip Upload Document button", true);
        await KotakPage.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await KotakPage.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await KotakPage.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable");
        await KotakPage.btnEnableWebApp.waitForClickable({ timeout: 22000 });
        allure.startStep("click on Enable webApp button");
        await KotakPage.btnEnableWebApp.click();
        allure.startStep('wait for loan tenure drop down to be clickable', true);
        await KotakPage.ddLoanTenure.waitForClickable({ timeout: 20000 });
        allure.startStep('click on loan tenure drop down', true);
        await KotakPage.ddLoanTenure.click();
        allure.startStep('Verify loan tenure drop down options to be displayed ', true);
        let loanTenureList = kotakData.loanTenureOptions.options.length;
        for (let i = 0; i < loanTenureList; i++) {
            await KotakPage.getLoanTenureOptions(0).waitForDisplayed({ timeout: 3000 });
            await expect(await KotakPage.getLoanTenureOptions(i).getText()).toEqual(kotakData.loanTenureOptions.options[i]);
        }
        allure.endStep();

    });

    it('Validate gender drop down on customer and loan details page', async () => {
        console.log("Validate gender drop down on customer and loan details page")
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await KotakPage.createTlpAppId(kotakData.kotakValidDetails);
        allure.startStep("Wait for Skip Upload Document button", true);
        await KotakPage.btnSkipUploadDocument.waitForDisplayed({ timeout: 30000 });
        allure.startStep("Click Skip Upload Document button", true);
        await KotakPage.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await KotakPage.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await KotakPage.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable");
        await KotakPage.btnEnableWebApp.waitForClickable({ timeout: 22000 });
        allure.startStep("click on Enable webApp button");
        await KotakPage.btnEnableWebApp.click();
        allure.startStep('wait for gender drop down to be displayed', true);
        await KotakPage.ddGender.waitForDisplayed({ timeout: 15000 });
        allure.startStep('click on gender drop down', true);
        await KotakPage.ddGender.click();
        allure.startStep('Verify gender drop down options to be displayed ', true);
        let genderList = kotakData.genderOptions.options.length;
        for (let i = 0; i < genderList; i++) {
            await KotakPage.getGenderOptions(0).waitForDisplayed({ timeout: 3000 });
            await expect(await KotakPage.getGenderOptions(i).getText()).toEqual(kotakData.genderOptions.options[i]);
        }
        allure.endStep();
    });

    it('Validate education drop down on customer and loan details page', async () => {
        console.log("Validate education drop down on customer and loan details page")
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await KotakPage.createTlpAppId(kotakData.kotakValidDetails);
        allure.startStep('Enter customer details on the first page', true);
        await KotakPage.customerDetails(kotakData.kotakValidDetails,appId);
        allure.startStep('wait for education drop down to be clickable', true);
        await KotakPage.ddQualification.waitForClickable({ timeout: 15000 });
        allure.startStep('click on education drop down', true);
        await KotakPage.ddQualification.click();
        allure.startStep('Verify education drop down options to be displayed ', true);
        let qualificationList = kotakData.qualificationOptions.options.length;
        for (let i = 0; i < qualificationList; i++) {
            await KotakPage.getEducationOptions(0).waitForDisplayed({ timeout: 3000 });
            await expect(await KotakPage.getEducationOptions(i).getText()).toEqual(kotakData.qualificationOptions.options[i]);
        }
        allure.endStep();
    });

    it('Validate employment drop down on customer and loan details page . ', async () => {
        console.log("Validate employment drop down on customer and loan details page")
        allure.startStep("Create TLPay initiated appId to enable webApp");
        let appId = await KotakPage.createTlpAppId(kotakData.kotakValidDetails);
        allure.startStep('Enter customer details on the first page', true);
        await KotakPage.customerDetails(kotakData.kotakValidDetails,appId);
        allure.startStep('wait for employment drop down to be clickable', true);
        await KotakPage.ddOccupationType.waitForClickable({ timeout: 15000 });
        allure.startStep('click on employment type drop down', true);
        await KotakPage.ddOccupationType.click();
        allure.startStep('Verify employment drop down options to be displayed ', true);
        let occupationList = kotakData.occupationTypeOptions.options.length;
        for (let i = 0; i < occupationList; i++) {
            await KotakPage.getEmploymentOptions(0).waitForDisplayed({ timeout: 3000 });
            await expect(await KotakPage.getEmploymentOptions(i).getText()).toEqual(kotakData.occupationTypeOptions.options[i]);
        }
        allure.endStep();
    });

    it('Validate After filling all valid details of customer Verify OTP page should be displayed', async () => {
        console.log("Validate After filling all valid details of customer Verify OTP page should be displayed")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep('Verify Resend OTP button is displayed', true);
        await expect(await KotakPage.btnResendOtp.isDisplayed()).toEqual(true)
        allure.endStep();
    });

    it('Validate Continue button is disabled until we click on I, hereby, confirm checkbox(Upload bank statement page)', async () => {
        console.log("Validate Continue button is disabled until we click on I, hereby, confirm checkbox(Upload bank statement page)")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('Update status of above appId in transactionscibil collection', true);
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('clicking on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Waiting for Bank statement radio button to be clickable', true);
        await KotakPage.uploadBankStatement2Photo.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on for Bank statement radio button', true);
        await KotakPage.uploadBankStatement2Photo.click();
        allure.startStep('Checking is Continue button is disabled or not', true);
        await expect(await KotakPage.btnContinue.isClickable()).toEqual(false);
        allure.endStep();

    });

    it.skip('Validate Abb ticket created successfully pop up after uploading bank statement', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open kotak Unprocessed loan & get appId', true);
        let appId = await KotakPage.returnAppId(panNumber);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
        allure.startStep('click on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Upload bank statement & enter bank details', true);
        await KotakPage.uploadBankStatement();
        allure.startStep('Verify abb ticket created successfully pop up', true);
        await browser.waitUntil(async () => await KotakPage.popUpAbbTicketCreated.getText() == "Ticket created successfully", {
            timeout: 15000
        })
        allure.endStep();

    });

    it('Validate search Branch button is disabled until you select Bank Name', async () => {
        console.log("Validate search Branch button is disabled until you select Bank Name")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep("Add data to db to move to account info", true);
        await mongoConnect.kotakAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh the page", true);
        await browser.refresh();
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
        allure.startStep('click on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await KotakPage.uploadBankStatement2Photo.click();
        allure.startStep("Click on Name title field", true);
        await KotakPage.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await KotakPage.tfCustomerName.setValue("Dummy Customer name");
        allure.startStep("Set value to random account number in the Account Number text field", true);
        await KotakPage.tfAccountNumber.setValue("27358475658");
        allure.startStep("Click on account type drop down", true);
        await KotakPage.ddAccountType.click();
        allure.startStep("Select saving account option", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Verify that search  branch button is disabled", true);
        await expect(await KotakPage.btnBranch.isClickable()).toEqual(false);
        allure.endStep();
    });

    it('Validate when pincode entered correct city name alligned to that pincode should appear', async () => {
        console.log("Validate when pincode entered correct city name alligned to that pincode should appear")
        allure.startStep("Create TLPay initiated appId to enable webApp")
        let appId = await KotakPage.createTlpAppId(kotakData.kotakValidDetails);
        allure.startStep('Click on skip upload documents button in the pop up', true);
        await KotakPage.btnSkipUploadDocument.click();
        allure.startStep("wait for AppId text field to br clickable")
        await KotakPage.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        allure.startStep("enter app Id in the text field")
        await KotakPage.tfTLpInitiatedAppId.setValue(appId);
        allure.startStep("wait for Enable webApp button to enable")
        await KotakPage.btnEnableWebApp.waitForClickable({ timeout: 22000 })
        allure.startStep("click on Enable webApp button")
        await KotakPage.btnEnableWebApp.click()
        allure.startStep('Wait for the element to be clickable', true);
        await KotakPage.tfPincode.waitForClickable({ timeout: 10000 });
        allure.startStep('Enter valid pincode', true);
        await KotakPage.tfPincode.setValue("452009");
        allure.startStep('2 seconds wait for city name to be displayed', true);
        await browser.pause(9000);
        allure.startStep('Verify correct city name alligned to the given pincode should appear', true);
        await expect(await KotakPage.ddCity.getText()).toEqual('Indore');
        allure.endStep();
    })

    it('Validate Continue button is disabled until you fill all the required fields', async () => {
        console.log("Validate Continue button is disabled until you fill all the required fields")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep("Add data to db to move to account info", true);
        await mongoConnect.kotakAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh the page", true);
        await browser.refresh();
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForClickable({ timeout: 20000 })
        allure.startStep('click on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await KotakPage.uploadBankStatement2Photo.click();
        allure.startStep("Click on Name title field", true);
        await KotakPage.ddNameTitle.waitForClickable({timeout:15000})
        await KotakPage.ddNameTitle.click();
        allure.startStep("Set value to Mr in the drop down", true);
        await browser.keys(["M", "r", "Tab"]);
        allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
        await KotakPage.tfCustomerName.setValue("Dummy Customer name");
        allure.startStep("Set value to random account number in the Account Number text field", true);
        await KotakPage.tfAccountNumber.setValue("27358475658");
        allure.startStep("Click on account type drop down", true);
        await KotakPage.ddAccountType.click();
        allure.startStep("Select saving account option", true);
        await browser.keys(["S", "a", "v", "Tab"]);
        allure.startStep("Click on Bank name field", true);
        await KotakPage.ddBankName.click();
        allure.startStep("Select Abhyudaya bank from drop down", true);
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        allure.startStep("Verify continue button is disabled", true);
        await expect(await KotakPage.btnContinue.isClickable()).toEqual(false);
        allure.endStep();
    });
    it('Validate after uploading bank statement it should take you to account details page', async () => {
        console.log("Validate after uploading bank statement it should take you to account details page")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('Switch to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('wait for account number text to be displayed', true);
        await KotakPage.accountNumberText.waitForDisplayed({ timeout: 20000 })
        allure.startStep('verify account number text on account details page', true);
        await expect(await KotakPage.accountNumberText.getText()).toEqual("Account Number *");
        allure.endStep();
    });

    it('Verify the title Drop down in account details page', async () => {
        console.log("Verify the title Drop down in account details page")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep("Add data to db to move to account details page", true);
        await mongoConnect.kotakAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh the page", true);
        await browser.refresh();
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await KotakPage.uploadBankStatement2Photo.click();
        allure.startStep("Click on Name title field", true);
        await KotakPage.ddNameTitle.click();
        allure.startStep('Verify all option in Title drop down should be appear', true);
        let titleList = kotakData.titleListOptions.options.length;
        for (let i = 0; i < titleList; i++) {
            await KotakPage.getTitlteList(0).waitForDisplayed({ timeout: 3000 });
            await expect(await KotakPage.getTitlteList(i).getText()).toEqual(kotakData.titleListOptions.options[i]);
        }
        allure.endStep();

    });

    it('Verify Account type drop down in account details page', async () => {
        console.log("Verify Account type drop down in account details page")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep("Add data to db to move to account details page", true);
        await mongoConnect.kotakAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh the page", true);
        await browser.refresh();
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await KotakPage.uploadBankStatement2Photo.click();
        allure.startStep("Click on account type drop down", true);
        await KotakPage.ddAccountType.click();
        allure.startStep('wait for an account type drop down elements to be displayed', true);
        await KotakPage.getAccountTypeOptions(0).waitForDisplayed({ timeout: 20000 });
        allure.startStep('verify drop down options for account type', true);
        let accountTypeList = kotakData.accountTypeOptions.options.length;
        for (let i = 0; i < accountTypeList; i++) {
            await expect(await KotakPage.getAccountTypeOptions(i).getText()).toEqual(kotakData.accountTypeOptions.options[i]);
        }
        allure.endStep();

    });

    it('Validate After Selecting Branch rest of the details should be filled and are un editable ', async () => {
        console.log("Validate After Selecting Branch rest of the details should be filled and are un editable")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep("Add data to db to move to account details page", true);
        await mongoConnect.kotakAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh the page", true);
        await browser.refresh();
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
        allure.startStep('clicking on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep("Select Bank statement passbook radio button", true);
        await KotakPage.uploadBankStatement2Photo.click();
        allure.startStep('click on bank drop down', true);
        await KotakPage.ddBankName.click();
        allure.startStep('Select the bank from drop down', true);
        await browser.keys(["A", "B", "h", "Y", "Tab"]);
        allure.startStep('click on branch button', true);
        await KotakPage.btnBranch.click();
        allure.startStep('select the bank branch radio buton', true);
        await KotakPage.rbBranch.click();
        allure.startStep('select the bank branch ', true);
        await KotakPage.btnselect.click();
        allure.startStep('Specify locator according to bank branch details', true);
        const ifsc = await KotakPage.getbankDetails(1);
        const micr = await KotakPage.getbankDetails(2);
        const city = await KotakPage.getbankDetails(3);
        allure.startStep('Verify the value of ifsc', true);
        await expect(await ifsc.getAttribute("value")).toEqual(kotakData.BankBranchDeatils.ifsc);
        allure.startStep('Verify the ifsc field is disabled', true);
        await expect(await ifsc.isEnabled()).toEqual(false);
        allure.startStep('Verify the value of micr', true);
        await expect(await micr.getAttribute("value")).toEqual(kotakData.BankBranchDeatils.micr);
        allure.startStep('Verify the micr field is disabled', true);
        await expect(await micr.isEnabled()).toEqual(false);
        allure.startStep('Verify the value of city', true);
        await expect(await city.getAttribute("value")).toEqual(kotakData.BankBranchDeatils.city);
        allure.startStep('Verify the city field is disabled', true);
        await expect(await city.isEnabled()).toEqual(false);
        allure.endStep();

    });

    it.skip('Validate after uploading 2 passbook images Next Page button should be displayed', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep("Add data to db to move to account details page", true);
        await mongoConnect.kotakAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh the page", true);
        await browser.refresh();
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('Fill account details', true);
        await KotakPage.fillAccountDetails();
        allure.startStep('Wait for upload document button to be clickable', true);
        await KotakPage.rbUploadDocument.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on  upload document radio button', true);
        await KotakPage.rbUploadDocument.click();
        allure.startStep('Upload passbook images', true);
        await KotakPage.uploadPassbookImages();
        allure.startStep('Verify next page button after uploading 2 passbook images.', true);
        await expect(await KotakPage.btnNextPage.getText()).toEqual("Next Page");
        allure.endStep();
    });

    it.skip('Validate that after Add More button is displayed on  after you upload one passbook photo', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep("Add data to db to move account details approval page", true);
        await mongoConnect.kotakAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
        allure.startStep("Refresh the page", true);
        await browser.refresh();
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('Fill account details', true);
        await KotakPage.fillAccountDetails();
        allure.startStep('Wait for upload document button to be clickable', true);
        await KotakPage.rbUploadDocument.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on  upload document radio button', true);
        await KotakPage.rbUploadDocument.click();
        allure.startStep('Create FilePtah for uploading passbook image', true);
        const path = require('path');
        const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
        allure.startStep('Wait for choose file button to be displayed', true);
        await KotakPage.btnChooseFile.waitForDisplayed({ timeout: 10000 })
        allure.startStep('Set filepath and upload passbook image', true);
        await KotakPage.btnChooseFile.setValue(filePath);
        allure.startStep('wait for Upload File button to be displayed', true);
        await KotakPage.btnUploadFile.waitForClickable({ timeout: 10000 });
        allure.startStep('Click on  upload file button', true);
        await KotakPage.btnUploadFile.click();
        allure.startStep('Wait for add more button to be displayed', true);
        await KotakPage.btnAddMorePhoto.waitForDisplayed({ timeout: 10000 })
        allure.startStep('Verify add more button exist after uploading image', true);
        await expect(await KotakPage.btnAddMorePhoto.isExisting()).toEqual(true);
        allure.endStep();
    });

    it.skip('Validate after uploding 2 photos and clicking on next button OPS approval timer is started', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page', true);
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open kotak Unprocessed loan & get appId', true);
        let appId = await KotakPage.returnAppId(panNumber);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
        allure.startStep('click on resume button', true);
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Upload bank statement & enter bank details', true);
        await KotakPage.uploadBankStatement();
        allure.startStep('wait for tmer to be displayed', true);
        await KotakPage.waitingTimer.waitForDisplayed({ timeout: 10000 })
        allure.startStep('Verify timer is displayed', true);
        await expect(await KotakPage.waitingTimer.isDisplayed()).toEqual(true);
        allure.endStep();
    });
    
    it('Verify after approving Abb ticket by filling required details the first EMI drop down should be displayed', async () => {
        console.log("Verify after approving Abb ticket by filling required details the first EMI drop down should be displayed")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('wait for for EMI date to be displayed', true);
        await KotakPage.ddfirstEmiDate.waitForExist({ timeout: 30000 });
        allure.startStep('Verify first EMI date drop down is visible', true);
        await expect(await KotakPage.ddfirstEmiDate.isDisplayed()).toEqual(true);
        allure.endStep();
    });

    it('Validate if all the above step are correct than continue button should be enabled', async () => {
        console.log("Validate if all the above step are correct than continue button should be enabled")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('Switch to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Wait for the First EMI drop drown to be clickable', true);
        await KotakPage.ddfirstEmiDate.waitForClickable({ timeout: 30000 });
        allure.startStep('Wait for the First EMI drop drown to be exist', true);
        await KotakPage.ddfirstEmiDate.waitForExist({ timeout: 30000 });
        allure.startStep('Click on First EMI drop down', true);
        await KotakPage.ddfirstEmiDate.click();
        allure.startStep('Select the EMI date', true);
        await browser.keys("Tab");
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        // 2 sec hard wait for the element to eb clickable (tried waitForClickable and waitforDisplayed)
        allure.startStep('2 sec wait', true);
        await browser.pause(2000);
        allure.startStep('Verify that Continue button is enabled', true);
        await expect(await KotakPage.btnContinue.isClickable()).toEqual(true);
        allure.endStep();
    });

    it('Validate after completing nach mandate upload documents page should be displayed', async () => {
        console.log("Validate after completing nach mandate upload documents page should be displayed")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
        await KotakPage.selectEmiDateAndApproveLoanAgreement(panNumber);
        allure.startStep('Click on Physical nach and generate Pnach', true);
        await KotakPage.verifyOKYC();
        allure.startStep('Wait for the borrower first name label to be displayed', true);
        await KotakPage.labelBorrowerFirstName.waitForExist({ timeout: 10000 });
        allure.startStep('verify user is on upload documents page', true);
        await expect(await KotakPage.labelBorrowerFirstName).toHaveTextContaining("Enter Borrower First Name as per selected POI")
        allure.endStep();
    });

    it("Validate Genarate PNACH button is disabled when we dont click on The Customer's Signature checkbox", async () => {
        console.log("Validate Genarate PNACH button is disabled when we dont click on The Customer's Signature checkbox")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
        await KotakPage.selectEmiDateAndApproveLoanAgreement(panNumber);
        allure.startStep('Click on physical nach option', true);
        await KotakPage.rbPhysicalNach.click();
        allure.startStep('Wait for generate PNACH button to be displayed', true);
        await KotakPage.btnGeneratePNACH.waitForDisplayed({ timeout: 10000 })
        allure.startStep('Verify generate PNACH button is disabled', true);
        await expect(await KotakPage.btnGeneratePNACH.isEnabled()).toEqual(false)
        allure.endStep();
    });

    it.skip('Validate after uploading the required documents Send Esign button is Clickable', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('Upload all personal documents on upload documents page', true);
        await KotakPage.uploadPersonalDocuments(kotakData.kotakValidDetails)
        allure.startStep('wait for Send Esign button to be exist', true);
        await KotakPage.btnEsign.waitForClickable({ timeout: 30000 })
        allure.startStep('Verify Send Esign button is clickable ', true);
        await expect(await KotakPage.btnEsign.isClickable()).toEqual(true)
        allure.endStep();
    });

    it('Validate cx to sign agreement pop up for Esign status ', async () => {
        console.log("Validate cx to sign agreement pop up for Esign status")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('Refresh the page', true);
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable', true);
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await KotakPage.btnContinue.click();
        allure.startStep('Validate visiblity of Send Esign', true);
        await KotakPage.btnEsign.waitForClickable({ timeout: 9000 });
        allure.startStep('Click on Esign button', true);
        await KotakPage.btnEsign.click();
        allure.startStep("wait for cx to sign agreement pop up ", true);
        await KotakPage.cxTosignAgreementPopup.waitForDisplayed({ timeout: 35000 })
        allure.startStep("verify 'waiting for cx to sign agreement' pop up on Esign page", true);
        await expect(await KotakPage.cxTosignAgreementPopup.getText()).toEqual('Waiting for CX to Sign Agreement.')
        allure.endStep();
    });

    it('Validate Done button is clickable after appId is soft approved', async () => {
        console.log("Validate Done button is clickable after appId is soft approved")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('Wait for done button to be clickable on loan eligibility status page', true);
        await KotakPage.btnDone.waitForClickable({ timeout: 20000 });
        allure.startStep('Verify done button is clickable on loan eligibility status page after app ID soft approved', true);
        await expect(await KotakPage.btnDone.isClickable()).toEqual(true)
        allure.endStep();
    });

    it('Validate if all the documents are approved , Document Verified pop should be displayed', async () => {
        console.log("Validate if all the documents are approved , Document Verified pop should be displayed")
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
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
        allure.startStep('wait for resume button to be exist ', true);
        await KotakPage.btnResume(appId).waitForExist({ timeout: 20000 })
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
        allure.startStep('Go to LMS portal and approve all the documents', true);
        await KotakPage.lmsVerifyDocuments(appId);
        allure.startStep('Wait for loan status pop to be displayed', true);
        await KotakPage.popUpLoanStatus.waitForDisplayed({ timeout: 20000 })
        allure.startStep('Verify loan status pop up should be displayed and has documents verified message', true);
        await expect(await KotakPage.popUpLoanStatus.getText()).toEqual("Loan Status : Documents Verified")
        allure.endStep();
    });

})