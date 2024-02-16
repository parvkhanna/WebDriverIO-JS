import { AllureUtil as allure } from '../../../../utils/util.allure';
import byjusadvantagePage from '../../../../pages/loan_payments_page/byjusadvantage.payment.page';
import { byjusAdvantageData } from '../../../../data/byjusadvantage.loanform.data';
import mongoConnect from "../../../../utils/mongoconnect";



describe('Verify field validation for byjus advantage payment option', async () => {
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


    it('Validate Send OTP button is disabled until we click on I, hereby, confirm checkbox', async () => {
        allure.startStep('Click on Byjus advantage pay button');
        await byjusadvantagePage.byjusAdvantagepayBtn.click();
        allure.startStep('Verify that Send OTP button is disabled');
        await expect(await byjusadvantagePage.btnSendOtp.isClickable()).toEqual(false);
        allure.endStep();
    })

    it('Validate all fields are disabled until e-mandate is not verify', async () => {
        allure.startStep('Click on Byjus advantage pay button');
        await byjusadvantagePage.byjusAdvantagepayBtn.click();
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

    it('Validate mobile number should not accept less than 10 digits and more than 10 digits', async () => {
        allure.startStep('Enter Bank name and select branch');
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Enter customer details with invaid age');
        await byjusadvantagePage.enterCustomerAndLoanDetails(byjusAdvantageData.byjusAdvantageInvalidNumberLessThanTenDigits);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusadvantagePage.getErrorMsgElement('telephoneNumber').waitForDisplayed({ timeout: 25000 });
        allure.startStep('Verify the correct error message is displayed for Invalid Mobile No', true);
        await expect(await byjusadvantagePage.getErrorMsgElement('telephoneNumber')).toHaveTextContaining('Invalid Mobile No');
        allure.startStep('Open Byjus payment login page');
        await byjusadvantagePage.openByjusPayPage();
        allure.startStep('Enter Bank name and select branch');
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Enter customer details with invalid mobile number grater than ten digits');
        await byjusadvantagePage.enterCustomerAndLoanDetails(byjusAdvantageData.byjusAdvantageInvalidNumberGreaterThanTenDigits);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusadvantagePage.getErrorMsgElement('telephoneNumber').waitForDisplayed({ timeout: 25000 });
        allure.startStep('Verify the correct error message is displayed for Invalid Mobile No less than ten digits', true);
        await expect(await byjusadvantagePage.getErrorMsgElement('telephoneNumber')).toHaveTextContaining('Invalid Mobile No');
        allure.endStep();
    })

    it('Validate age should be more than 18 years and less than 65 years', async () => {
        allure.startStep('Enter Bank name and select branch');
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Enter customer details with invaid age');
        await byjusadvantagePage.enterCustomerAndLoanDetails(byjusAdvantageData.byjusAdvantageInvalidAgeAbove65);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusadvantagePage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years').waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message is displayed for Invalid Mobile No', true);
        await expect(await byjusadvantagePage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years')).toHaveTextContaining('Age should be more than 18 years and less than 65 years');
        allure.startStep('Open Byjus payment login page');
        await byjusadvantagePage.openByjusPayPage();
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Enter customer details with invalid mobile number grater than ten digits');
        await byjusadvantagePage.enterCustomerAndLoanDetails(byjusAdvantageData.byjusAdvantageInvalidAgeBelow18);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusadvantagePage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years').waitForDisplayed({ timeout: 8000 });
        allure.startStep('Verify the correct error message is displayed for Invalid Mobile No less than ten digits', true);
        await expect(await byjusadvantagePage.getErrorMsgUsingElementText('Age should be more than 18 years and less than 65 years')).toHaveTextContaining('Age should be more than 18 years and less than 65 years');
        allure.endStep();
    })

    it('Validate loan amount should be >= Rs.15000', async () => {
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Enter customer details with invalid amount less than 15000');
        await byjusadvantagePage.enterCustomerAndLoanDetails(byjusAdvantageData.byjusAdvantageInvalidAmountLessThan14000);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusadvantagePage.getErrorMsgElement('requestedLoanAmount').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message for loan ammount', true);
        await expect(await byjusadvantagePage.getErrorMsgElement('requestedLoanAmount').getText()).toEqual('Loan amount cannot be less than 15000');
        allure.endStep();
    })

    it('Validate Down payment field should not accept less than Rs.15000.', async () => {
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Enter customer details with invalid amount less than 15000');
        await byjusadvantagePage.enterCustomerAndLoanDetails(byjusAdvantageData.byjusAdvantageInvalidDownPayment);
        allure.startStep('Wait for an error message for  to appear', true);
        await byjusadvantagePage.getErrorMsgElement('downPayment').waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify the correct error message for loan ammount', true);
        await expect(await byjusadvantagePage.getErrorMsgElement('downPayment')).toHaveTextContaining('Down payment can not be less than Rs.15000');
        allure.endStep();
    })
    it('Validate eligible Loan Amount field should not be editable.', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Enter customer details with valid details');
        await byjusadvantagePage.enterCustomerAndLoanDetails(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep('Verify eligible loan amount field is disable');
        await expect(await byjusadvantagePage.tfApprovalLoanAmount.isClickable()).toEqual(false);
        allure.startStep('Verify eligible loan anount field is pre calculated');
        await expect(await byjusadvantagePage.tfApprovalLoanAmount).toHaveAttribute('value', '70000');
        allure.endStep();
    })
    it('Validate to upload PAN shows an "Error in the file uploading"', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        await byjusadvantagePage.enterBankNameAndBranch();
        allure.startStep('Upload pan images with invalid pan card');
        await byjusadvantagePage.uploadPanImages(process.env.INVALID_PAN_CARD_IMAGE_PATH, true);
        allure.startStep('Wait till the error message displayed');
        await byjusadvantagePage.getErrorMsgUpload().waitForDisplayed({ timeout: 5000 });
        allure.startStep('Verify correct message displayed while upload pan card image');
        await expect(await byjusadvantagePage.getErrorMsgUpload()).toHaveTextContaining('Error while fetching the Details');
        allure.endStep();
    })

    it('Validate search Branch and Bank Name button is disabled', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let custDetails = await byjusadvantagePage.getAccountDetailsPage(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep('Verify bank name is disabled', true);
        await expect(await byjusadvantagePage.ddBankName.isClickable()).toEqual(false);
        allure.startStep('Verify branch name is disabled and autofilled', true);
        await expect(await byjusadvantagePage.btnBankBranch.isClickable()).toEqual(false);
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

    it('Validate Continue button is disabled until you fill all the required fields', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let custDetails = await byjusadvantagePage.getAccountDetailsPage(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep('Verify bank name is disabled', true);
        await expect(await byjusadvantagePage.btnContinue.isClickable()).toEqual(false);
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

    it('Validate Customer name filled should not accept anything except "Dummy Customer Name" as input.', async () => {
        allure.startStep('Enter bank name and branch and check emandate');
        let custDetails = await byjusadvantagePage.getAccountDetailsPage(byjusAdvantageData.byjusAdvantageValidData);
        allure.startStep("Click on Name title drop down", true);
        await byjusadvantagePage.enterAccountDetails(byjusAdvantageData.byjusAdvantageAccountInvalidData);
        allure.startStep('Verify Account name only accepr Dummy customer name', true);
        await expect(await byjusadvantagePage.accountNameMsg).toHaveTextContaining('Applicant Name is not Matching With Bank Details, Account Holder Name: Dummy Customer Name');
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

    it('Validate after click on E-nach link generation pop up should display with generate and close btn.', async () => {
        allure.startStep('Get basic steps done till e nach link generation');
        let custDetails = await byjusadvantagePage.getNachMandatePage(
            byjusAdvantageData.byjusAdvantageValidData, byjusAdvantageData.byjusAdvantageAccountValidData);
        allure.startStep("Wait for e nach btn", true);
        await byjusadvantagePage.btnENach.waitForDisplayed({ timeout: 60000 });
        allure.startStep("Click on e nach btn", true);
        await byjusadvantagePage.btnENach.click();
        allure.startStep("Wait till the generate link popup not opened", true);
        await byjusadvantagePage.btnGenerateLink.waitForDisplayed({ timeout: 60000 });
        allure.startStep("Verify generate btn and close link is properly displaying", true);
        await expect(await byjusadvantagePage.btnGenerateLink).toBePresent();
        await expect(await byjusadvantagePage.btnClose).toBePresent();
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
    it('Validate after we click on close button popup should disappear.', async () => {
        allure.startStep('Get basic steps done till e nach link generation');
        let custDetails = await byjusadvantagePage.getNachMandatePage(
            byjusAdvantageData.byjusAdvantageValidData, byjusAdvantageData.byjusAdvantageAccountValidData);
        allure.startStep("Wait for e nach btn", true);
        await byjusadvantagePage.btnENach.waitForDisplayed({ timeout: 60000 });
        allure.startStep("Click on e nach btn", true);
        await byjusadvantagePage.btnENach.click();
        allure.startStep("Wait for close btn", true);
        await byjusadvantagePage.btnClose.waitForDisplayed({ timeout: 60000 });
        allure.startStep("click close btn", true);
        await byjusadvantagePage.btnClose.click();
        allure.startStep("Verify after we click on close btn popup should disappear", true);
        await expect(await byjusadvantagePage.btnENach).toBePresent();
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

    it('Validate Send e-sign button is enable', async () => {
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
        allure.startStep('Validate e-sign btn is enable', true);
        await expect(await byjusadvantagePage.btnSendSign).toBeClickable();
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

    it('Validate App Id and loan status is displayed', async () => {
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
        await expect(byjusadvantagePage.getAppIdMsg(custDetails["appId"])).toBePresent();
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

    it('Validate Done button is displayed', async () => {
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
        allure.startStep('Validate it navigates to next page and done button is enabled ', true);
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
})

