import { AllureUtil as allure } from '../../../../utils/util.allure';
import byjusadvantagePage from '../../../../pages/loan_payments_page/byjusadvantage.payment.page';
import { byjusAdvantageData } from '../../../../data/byjusadvantage.loanform.data';
import mongoConnect from "../../../../utils/mongoconnect";


describe('Verify functional validations for byjus advantage payment option', async () => {
    beforeEach('Open payment portal', async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await byjusadvantagePage.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await byjusadvantagePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.byjusAdvantageDeleteObjectFromDb(byjusAdvantageData.byjusAdvantageValidData.panNumber, byjusAdvantageData.byjusAdvantageValidData.phoneNumber);
    })

    afterEach('Delete object from db after each test', async () => {
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.byjusAdvantageDeleteObjectFromDb(byjusAdvantageData.byjusAdvantageValidData.panNumber, byjusAdvantageData.byjusAdvantageValidData.phoneNumber);
    });

    it('Validate all fields are disabled if bank branch do not have e-mandate', async () => {
        allure.startStep('Click on Byjus advantage pay button');
        await byjusadvantagePage.enterBankNameAndBranch(["KARNATAKA Gramin", "", "Tab"], true);
        allure.startStep('It should display error message that emandate process is npt for this bank');
        await expect(await byjusadvantagePage.eNachErrorMsg).toHaveTextContaining('is not having E-Mandate process');
        allure.startStep('Verify that first name field is disabled');
        await expect(await byjusadvantagePage.tfBorrowerFirstName.isClickable()).toEqual(false);
        allure.startStep('Verify that Id proof field is disabled');
        await expect(await byjusadvantagePage.ddIdProofType.isClickable()).toEqual(false);
        allure.startStep('Verify that Address proof field is disabled');
        await expect(await byjusadvantagePage.ddAddressProofType.isClickable()).toEqual(false);
        allure.startStep('Verify that Phone number field is disabled');
        await expect(await byjusadvantagePage.tfPhoneNumber.isClickable()).toEqual(false);
        allure.startStep('Verify that Loan amount field is disabled');
        await expect(await byjusadvantagePage.tfLoanAmout.isClickable()).toEqual(false);
        allure.startStep('Verify that tenure field is disabled');
        await expect(await byjusadvantagePage.ddLoanTenure.isClickable()).toEqual(false);
        allure.endStep();
    })

    it('Validate for check E-Mandate eligibility', async () => {
        allure.startStep('Enter Bank name and select branch');
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Get Enach process message');
        await expect(await byjusadvantagePage.enachProcessMsg).toHaveTextContaining('has E-Nach process');
        allure.endStep();
    })

    it('Validate to upload PAN should extract data from PAN', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Upload pan images');
        await byjusadvantagePage.uploadPanImages();
        allure.startStep('Verify after successfully upload image it redirect to customer page');
        await expect(await byjusadvantagePage.enachProcessMsg).toHaveTextContaining('has E-Nach process');
        allure.endStep();
    })

    it('Validate to upload Adhar should extract data from Adhar', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Upload Adhar front anf back images');
        await byjusadvantagePage.selectAndUploadAddressProof("aadhar", true);
        allure.startStep('Verify upload Aadhar card extract data properly');
        await expect(await byjusadvantagePage.getExtractData('Aadhaar Front')).toHaveTextContaining('Aadhaar Front');
        allure.startStep('Verify upload Aadhar back image extract data properly');
        await expect(await byjusadvantagePage.getExtractData('Aadhaar Back')).toHaveTextContaining('Aadhaar Back');
        allure.endStep();
    })
    it('Validate to upload Passport should extract data from Passport', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Upload Passport front anf back images');
        await byjusadvantagePage.selectAndUploadAddressProofPassport()
        allure.startStep('Verify upload Passport card extract data properly');
        await expect(await byjusadvantagePage.getExtractData('Passport Front')).toHaveTextContaining('Passport Front');
        allure.startStep('Verify upload Passport back image extract data properly');
        await expect(await byjusadvantagePage.getExtractData('Passport Back')).toHaveTextContaining('Passport Back');
        allure.endStep();
    })
    it('Validate to upload voter id should extract data from Voter Id', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Upload voter id front anf back images');
        await byjusadvantagePage.selectAndUploadAddressProofVoterID();
        allure.startStep('Verify upload voter id card extract data properly');
        await expect(await byjusadvantagePage.getExtractData('VoterId Front')).toHaveTextContaining('VoterId Front');
        allure.startStep('Verify upload voter id back image extract data properly');
        await expect(await byjusadvantagePage.getExtractData('VoterId Back')).toHaveTextContaining('VoterId Back');
        allure.endStep();
    })

    it('Create a Byjus Advantage loan with valid details.', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let panNumber = await byjusadvantagePage.enterAndUploadCustomerDetails(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep('Verify customer details entered properly and it redirect to otp verfiy page');
        await expect(await byjusadvantagePage.btnVerifyOtp).toBePresent();
        allure.endStep();
    })

    it('Validate invalid OTP should send error message', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let panNumber = await byjusadvantagePage.enterAndUploadCustomerDetails(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep('Enter with invalid OTP', true);
        await byjusadvantagePage.tfEnterOtp.setValue("123456");
        allure.startStep('clicking on verify OTP button', true);
        await byjusadvantagePage.btnVerifyOtp.click();
        allure.startStep('Wait for OTP error message to be displayed', true);
        await byjusadvantagePage.otpErrorMsg.waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message for OTP', true);
        await expect(await byjusadvantagePage.otpErrorMsg.getText()).toEqual("Invalid OTP");
        allure.endStep();
    })

    it('Validate valid OTP will move to another screen', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let custDetails = await byjusadvantagePage.getAccountDetailsPage(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep('Verify it should navigate to other page', true);
        await expect(await byjusadvantagePage.ddNameTitle).toBePresent();
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Validate Resume button will resume process on OTP page', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let custDetails = await byjusadvantagePage.enterAndUploadCustomerDetails(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await byjusadvantagePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await byjusadvantagePage.returnAppId(custDetails.pan);
        allure.startStep("Update status in db to bypass otp process", true);
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep('Refresh the browser');
        await browser.refresh()
        await byjusadvantagePage.getBtnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('Address of window is stored in a variable');
        browser.execute("arguments[0].click();", await byjusadvantagePage.getBtnResume(appId));
        await browser.pause(5000)
        allure.startStep('Verify it should navigate back to OTP page', true);
        await expect(await byjusadvantagePage.btnContinue).toBePresent();
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Validate if account details correct then only continue button should be enabled.', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let custDetails = await byjusadvantagePage.getAccountDetailsPage(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep("Click on Name title drop down", true);
        await byjusadvantagePage.enterAccountDetails(byjusAdvantageData.byjusAdvantageAccountValidData, true);
        allure.startStep('Verify Account name only accept Dummy customer name', true);
        await expect(await byjusadvantagePage.btnContinue.isClickable()).toEqual(true);
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Validate it should redirect to account details when click on resume', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let custDetails = await byjusadvantagePage.getAccountDetailsPage(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep('Verify user is on accoount details page');
        await expect(await byjusadvantagePage.tfCustomerName).toBePresent();
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Validate resume functionality working properly for emandate - details page', async () => {
        allure.startStep('Get basic steps done till e nach link generation');
        let custDetails = await byjusadvantagePage.getNachMandatePage(
            byjusAdvantageData.byjusAdvantageValidData, byjusAdvantageData.byjusAdvantageAccountValidData);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('wait for continue button, as page is refreshed so it took time to load it', true);
        await byjusadvantagePage.btnContinue.waitForExist({ timeout: 100000 });
        allure.startStep('Validate it navigates to page after click on resume', true);
        await expect(byjusadvantagePage.btnContinue).toBePresent();
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Validate after click on generate link enach link generated and its should proceed to esign agreement screen', async () => {
        allure.startStep('Get basic steps done till e nach link generation');
        let custDetails = await byjusadvantagePage.getNachMandatePage(
            byjusAdvantageData.byjusAdvantageValidData, byjusAdvantageData.byjusAdvantageAccountValidData);
        allure.startStep('Update emandate details in database', true);
        await mongoConnect.updateEmandateDetailsCibilRecord(custDetails["appId"], 30000);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('wait for continue button, as page is refreshed so it took time to load it', true);
        await byjusadvantagePage.btnContinue.waitForExist({ timeout: 100000 });
        allure.startStep('Click on continue button', true);
        await byjusadvantagePage.btnContinue.click();
        allure.startStep('Validate it navigates to e-sign page after emandate details page', true);
        await expect(byjusadvantagePage.btnSendSign).toBePresent();
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Validate resume functionality working properly for e-sign page', async () => {
        allure.startStep('Get basic steps done till e nach link generation');
        let custDetails = await byjusadvantagePage.getNachMandatePage(
            byjusAdvantageData.byjusAdvantageValidData, byjusAdvantageData.byjusAdvantageAccountValidData);
        allure.startStep('Update emandate details in database', true);
        await mongoConnect.updateEmandateDetailsCibilRecord(custDetails["appId"], 30000);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable', true);
        await byjusadvantagePage.btnContinue.waitForClickable({ timeout: 20000 })
        allure.startStep('Verify it should navigate back to E-send page', true);
        await expect(await byjusadvantagePage.btnContinue).toBePresent();
        allure.startStep('click on continue button', true);
        await byjusadvantagePage.btnContinue.click()
        allure.startStep('Validate it navigates to e-sign page after emandate details page', true);
        await expect(byjusadvantagePage.btnSendSign).toBePresent();
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Validate if document is signed it proceed further"', async () => {
        allure.startStep('Get basic steps done till e nach link generation');
        let custDetails = await byjusadvantagePage.getNachMandatePage(
            byjusAdvantageData.byjusAdvantageValidData, byjusAdvantageData.byjusAdvantageAccountValidData);
        allure.startStep('Update emandate details in database', true);
        await mongoConnect.updateEmandateDetailsCibilRecord(custDetails["appId"], 30000);
        allure.startStep('Update e-sign details in database', true);
        await mongoConnect.updateEsignDetailsCibilRecord(custDetails["appId"]);
        allure.startStep('Update status in database', true);
        await mongoConnect.updateTransactionsCibilStatusApprovalPending(custDetails["appId"]);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('wait for continue button, as page is refreshed so it took time to load it', true);
        await byjusadvantagePage.btnContinue.waitForExist({ timeout: 100000 });
        allure.startStep('Click on continue button', true);
        await byjusadvantagePage.btnContinue.click();
        allure.startStep('Validate it navigates to next page and soft approved message is visible', true);
        await expect(byjusadvantagePage.softApprovedMsg).toBePresent();
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Validate resume functionality working properly for Loan eligibility status page', async () => {
        allure.startStep('Get basic steps done till e nach link generation');
        let custDetails = await byjusadvantagePage.getNachMandatePage(
            byjusAdvantageData.byjusAdvantageValidData, byjusAdvantageData.byjusAdvantageAccountValidData);
        allure.startStep('Update emandate details in database', true);
        await mongoConnect.updateEmandateDetailsCibilRecord(custDetails["appId"], 30000);
        allure.startStep('Update e-sign details in database', true);
        await mongoConnect.updateEsignDetailsCibilRecord(custDetails["appId"]);
        allure.startStep('Update status in database', true);
        await mongoConnect.updateTransactionsCibilStatusApprovalPending(custDetails["appId"]);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('wait for continue button, as page is refreshed so it took time to load it', true);
        await byjusadvantagePage.btnContinue.waitForExist({ timeout: 100000 });
        allure.startStep('Verify it should navigate back to E-send page', true);
        await expect(await byjusadvantagePage.btnContinue).toBePresent();
        allure.startStep('click on continue button', true);
        await byjusadvantagePage.btnContinue.click()
        allure.startStep('Validate it navigates to next page and Loan eligibility status button is enabled ', true);
        await expect(byjusadvantagePage.btnDone).toBeClickable();
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Validate click on done it processed properly', async () => {
        allure.startStep('Get basic steps done till e nach link generation');
        let custDetails = await byjusadvantagePage.getNachMandatePage(
            byjusAdvantageData.byjusAdvantageValidData, byjusAdvantageData.byjusAdvantageAccountValidData);
        allure.startStep('Update emandate details in database', true);
        await mongoConnect.updateEmandateDetailsCibilRecord(custDetails["appId"], 30000);
        allure.startStep('Update e-sign details in database', true);
        await mongoConnect.updateEsignDetailsCibilRecord(custDetails["appId"]);
        allure.startStep('Update status in database', true);
        await mongoConnect.updateTransactionsCibilStatusApprovalPending(custDetails["appId"]);
        allure.startStep('Refresh browser', true);
        await browser.refresh();
        allure.startStep('wait for continue button, as page is refreshed so it took time to load it', true);
        await byjusadvantagePage.btnContinue.waitForExist({ timeout: 100000 });
        allure.startStep('Verify it should navigate back to E-send page', true);
        await expect(await byjusadvantagePage.btnContinue).toBePresent();
        allure.startStep('click on continue button', true);
        await byjusadvantagePage.btnContinue.click()
        allure.startStep('click on donw button', true);
        await byjusadvantagePage.btnDone.click();
        allure.startStep('Validate after click on done loan process completed and it start with new loan', true);
        await expect(byjusadvantagePage.ddBankName).toBePresent();
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    })

    it('Verify Account type drop down', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let custDetails = await byjusadvantagePage.getAccountDetailsPage(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep('wait for account type drop down to be displayed ', true);
        await byjusadvantagePage.ddAccountType.waitForDisplayed({ timeout: 10000 });
        allure.startStep('click on account type drop down', true);
        await byjusadvantagePage.ddAccountType.click();
        allure.startStep('wait for an account type drop down elements to be displayed', true);
        await byjusadvantagePage.getAccountTypeOptions("Savings").waitForDisplayed({ timeout: 20000 });
        allure.startStep('verify drop down options for account type', true);
        let accountTypeList = byjusAdvantageData.accountTypeOptions.options.length;
        for (let i = 0; i < accountTypeList; i++) {
            await expect(await byjusadvantagePage.getAccountTypeOptions(byjusAdvantageData.accountTypeOptions.options[i])).toBePresent();
        }
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    });

    it('Verify the title Drop down in account details page', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let custDetails = await byjusadvantagePage.getAccountDetailsPage(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep('wait for account type drop down to be displayed ', true);
        await byjusadvantagePage.titleGender.waitForDisplayed({ timeout: 10000 });
        allure.startStep('Click on gender drop down field', true);
        await byjusadvantagePage.titleGender.click();
        allure.startStep('Verify all option in drop down should be appear', true);
        let titleList = byjusAdvantageData.genderOptions.options.length;
        for (let i = 0; i < titleList; i++) {
            await expect(await byjusadvantagePage.getddAllGender(byjusAdvantageData.genderOptions.options[i])).toBePresent();
        }
        allure.startStep('Address of window is stoted in a variable');
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.endStep();
    });

})
