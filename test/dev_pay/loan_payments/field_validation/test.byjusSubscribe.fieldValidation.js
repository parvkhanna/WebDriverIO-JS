import { AllureUtil as allure } from '../../../../utils/util.allure';
import ByjusSubscribePage from '../../../../pages/loan_payments_page/byjussubscribe.payment.page';
import { byjusSubscribeData } from '../../../../data/byjusSubscribe.loanform.data';
import { byjusAdvantageData } from '../../../../data/byjusadvantage.loanform.data';
import mongoconnect from '../../../../utils/mongoconnect';
import { dataToMoveTo } from '../../../../data/byjusSubscribe.move.to.particular.page';




describe('Verify field validations for byjus Subscribe payment option', async () => {
    beforeEach('Open payment portal', async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await ByjusSubscribePage.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await ByjusSubscribePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);

    })
    it('Validate error message for invalid revised loan amount', async () => {
        allure.startStep('Fetch previous loan vendor app id');
        let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Enter and customer and loan details with invalid revised loan amount ');
        await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.revisedAmountGreaterThanPrevious, previousAppDetails['appId'])
        allure.startStep('Wait for error message to be displayed ');
        await ByjusSubscribePage.getErrorMsgElement('revisedLoanAmount').waitForDisplayed({ timeout: 10000 })
        allure.startStep('Verify error message for invalid revised loan amount');
        await expect(ByjusSubscribePage.getErrorMsgElement('revisedLoanAmount')).toHaveTextContaining('Revised loan amount cannot be greater than previous loan amount')
        allure.startStep('Open Byjus payment login page');
        await ByjusSubscribePage.openByjusPayPage();
        allure.startStep('Enter and customer and loan details with invalid revised loan amount ');
        await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.revisedAmountLessthan10000, previousAppDetails['appId'])
        allure.startStep('Verify error message for invalid revised loan amount');
        await expect(ByjusSubscribePage.getErrorMsgElement('revisedLoanAmount')).toHaveTextContaining('Revised loan amount cannot be less than 10000')
        allure.endStep()

    });
    it('Validate fields are disabled if loan provider not select', async () => {
        allure.startStep('Click on Byjus Subscribe pay button');
        await ByjusSubscribePage.byjusSubscribepayBtn.click();
        allure.startStep('Verify that first name field is disabled');
        await expect(await ByjusSubscribePage.tfBorrowerFirstName.isClickable()).toEqual(false);
        allure.startStep('Verify that last name field is disabled');
        await expect(await ByjusSubscribePage.tfBorrowerLastName.isClickable()).toEqual(false);
        allure.startStep('Verify that Student name field is disabled');
        await expect(await ByjusSubscribePage.tfStudentName.isClickable()).toEqual(false);
        allure.startStep('Verify that Phone number field is disabled');
        await expect(await ByjusSubscribePage.tfPhoneNumber.isClickable()).toEqual(false);
        allure.startStep('Verify that Next button is disabled');
        await expect(await ByjusSubscribePage.btntfNext.isClickable()).toEqual(false);
        allure.endStep();
    })


    it('Validate field validations when submitted blank', async () => {
        allure.startStep('Click on Byjus Subscribe pay button');
        await ByjusSubscribePage.byjusSubscribepayBtn.click();
        allure.startStep('Click on check box button');
        await ByjusSubscribePage.cbToSendOtp.click();
        allure.startStep('Click on next button');
        await ByjusSubscribePage.btntfNext.click();
        allure.startStep('Wait for an error message for  to appear', true);
        await ByjusSubscribePage.getErrorMsgUsingElementText('Previous Loan Provider is required').waitForDisplayed({ timeout: 6000 });
        allure.startStep('Verify the correct error message is displayed for Invalid loan provider', true);
        await expect(await ByjusSubscribePage.getErrorMsgUsingElementText('Previous Loan Provider is required')).toHaveTextContaining('Previous Loan Provider is required');
        allure.startStep('Verify the correct error message is displayed for previous id', true);
        await expect(await ByjusSubscribePage.getErrorMsgElement('previousAppId')).toHaveTextContaining('Previous AppId is required');
        allure.startStep('Verify the correct error message is displayed for previous amount', true);
        await expect(await ByjusSubscribePage.getErrorMsgElement('previousLoanAmount')).toHaveTextContaining('Previous Loan Amount is required');
        allure.startStep('Verify the correct error message is displayed for applicant first name', true);
        await expect(await ByjusSubscribePage.getErrorMsgElement('applicantFirstName')).toHaveTextContaining('Borrower First Name is required');
        allure.startStep('Verify the correct error message is displayed for applicant last name', true);
        await expect(await ByjusSubscribePage.getErrorMsgElement('applicantLastName')).toHaveTextContaining('Borrower Last Name is required');
        allure.startStep('Verify the correct error message is displayed for student name', true);
        await expect(await ByjusSubscribePage.getErrorMsgElement('studentName')).toHaveTextContaining("Student's Name is required");
        allure.startStep('Verify the correct error message is displayed for telephone number', true);
        await expect(await ByjusSubscribePage.getErrorMsgElement('telephoneNumber')).toHaveTextContaining('Invalid Mobile No');
        allure.startStep('Verify the correct error message is displayed for email address ', true);
        await expect(await ByjusSubscribePage.getErrorMsgElement('emailAddress')).toHaveTextContaining('Invalid Email address');
        allure.startStep('Verify the correct error message is displayed for revised loan amount ', true);
        await expect(await ByjusSubscribePage.getErrorMsgElement('revisedLoanAmount')).toHaveTextContaining('Revised Loan Amount is required');
        allure.startStep('Verify the correct error message is displayed for loan tenure', true);
        await expect(await ByjusSubscribePage.getErrorMsgElement('revisedLoanTenure')).toHaveTextContaining('Revised Loan tenure should be between 1-24 months');
        allure.startStep("Verify that the correct error message for student Birthdate is displayed", true);
        await expect(await ByjusSubscribePage.getErrorMsgUsingElementText("Age should be more than 18 years and less than 65 years").getText()).toEqual("Age should be more than 18 years and less than 65 years");
        allure.endStep();
    })

    it('Validate name and loan amount fetched from previous vendor is uneditable', async () => {
        allure.startStep('Fetch previous loan vendor app id');
        let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Open Order Page Url in new window", true);
        await ByjusSubscribePage.byjusSubscribepayBtn.click();
        allure.startStep('wait for previous loan provider drop down to be clickable', true);
        await ByjusSubscribePage.ddPreviousLoanProvider.waitForClickable({ timeout: 28000 });
        allure.startStep('Click on previous loan provider');
        await ByjusSubscribePage.ddPreviousLoanProvider.click();
        allure.startStep('Select previous loan provider');
        await browser.keys(byjusSubscribeData.byjusSubscribeInvalidData.previousLoanProvider)
        allure.startStep('Enter previous loan id');
        await ByjusSubscribePage.tfPreviousAppId.setValue(previousAppDetails['appId']);
        allure.startStep('Validate name should be autofilled and diabled');
        await expect(ByjusSubscribePage.tfBorrowerFirstName).toBeDisabled();
        allure.startStep('Validate loan amount should be autofilled and disabled');
        await expect(ByjusSubscribePage.tfPreviousLoanAmout).toBeDisabled();
        allure.endStep();
    })

    it('Validate it should displayed popup for existing customer  ', async () => {
        allure.startStep('Fetch previous loan vendor app id');
        let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Enter customer and loan details');
        await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
        allure.startStep('Validate popup with proceed btn displayed');
        await expect(ByjusSubscribePage.btnProceed).toBeClickable();
        allure.startStep('Validate popup with edit details btn displayed');
        await expect(ByjusSubscribePage.btnEditDetails).toBeClickable();
        allure.startStep('Validate popup with edit details btn displayed');
        await expect(ByjusSubscribePage.customerExistingPopup).toBePresent();
        allure.endStep();
    })

    it('Validate fields(IFSC,MICR, city, approved loan) are not editable on account details page', async () => {
        allure.startStep('Fetch previous loan vendor app id');
        let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Enter customer and loan details');
        await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
        allure.startStep('Click on edit details page');
        await ByjusSubscribePage.btnProceed.click();
        allure.startStep('wait for account details page fields to be exist');
        await ByjusSubscribePage.tfIfsc.waitForExist({ timeout: 20000 })
        allure.startStep('Validate IFCS fileds is not editable');
        await expect(ByjusSubscribePage.tfIfsc).toBeDisabled();
        allure.startStep('Validate MICR fileds is not editable');
        await expect(ByjusSubscribePage.tfMicr).toBeDisabled();
        allure.startStep('Validate City fileds is not editable');
        await expect(ByjusSubscribePage.tfCity).toBeDisabled();
        allure.startStep('Validate approved loans fileds is not editable');
        await expect(ByjusSubscribePage.tfApprovedLoanAmount).toBeDisabled();
        allure.endStep();
    })

    it('Validate fields are pre populated on account details page', async () => {
        allure.startStep('Fetch previous loan vendor app id');
        let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Enter customer and loan details');
        await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
        allure.startStep('Click on edit details page');
        await ByjusSubscribePage.btnProceed.click();
        allure.startStep('Validate its back on customer details page');
        await ByjusSubscribePage.tfIfsc.waitForExist({ timeout: 20000 })
        allure.startStep('Validate IFCS fileds is alredy filled');
        await expect(ByjusSubscribePage.tfIfsc).toBeDefined();
        allure.startStep('Validate MICR fileds is alredy filled');
        await expect(ByjusSubscribePage.tfMicr).toBeDefined();
        allure.startStep('Validate City fileds is alredy filled');
        await expect(ByjusSubscribePage.tfCity).toBeDefined();
        allure.startStep('Validate approved loans fileds is alredy filled');
        await expect(ByjusSubscribePage.tfApprovedLoanAmount).toBeDefined();
        allure.startStep('Validate account number fileds is alredy filled');
        await expect(ByjusSubscribePage.tfAccountNumber).toBeDefined();
        allure.startStep('Validate customer name fileds is alredy filled');
        await expect(ByjusSubscribePage.tfCustomerName).toBeDefined();
        allure.startStep('Validate account type fileds is alredy filled');
        await expect(ByjusSubscribePage.tfAccrountType).toBeDefined();
        allure.startStep('Validate bank name fileds is alredy filled');
        await expect(ByjusSubscribePage.tfBankName).toBeDefined();
        allure.endStep();
    })

    it('Validate Resend SMS link on Emandate page is enabled', async () => {
        allure.startStep('Fetch previous loan vendor app id');
        let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Enter customer and loan details');
        await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
        allure.startStep('Click on edit details page');
        await ByjusSubscribePage.btnProceed.click();
        allure.startStep('Validate its back on customer details page');
        await browser.pause(6000);
        allure.startStep('Enter account details page', true);
        await ByjusSubscribePage.enterAccountDetails(byjusSubscribeData.byjusAdvantageAccountValidData);
        allure.startStep('wait for btn continue', true);
        await ByjusSubscribePage.btnContinue.waitForExist({ timeout: 100000 });
        allure.startStep('click on btn continue', true);
        await ByjusSubscribePage.btnContinue.click();
        allure.startStep('wait for resent smd link button to be exist', true);
        await ByjusSubscribePage.btnResendSms.waitForExist({ timeout: 20000 })
        allure.startStep('Validate Resent sms link on emandate page is enabled');
        await expect(ByjusSubscribePage.btnResendSms).toBeEnabled();
        allure.endStep();
    })

    it('Validate mandatory fields when submit blank (Acccount details page)', async () => {
        allure.startStep('Fetch previous loan vendor app id');
        let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Enter customer and loan details');
        await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
        allure.startStep('Click on edit details page');
        await ByjusSubscribePage.btnProceed.click();
        allure.startStep('Wait for continue button to be clickable');
        await ByjusSubscribePage.btnContinue.waitForClickable({ timeout: 20000 })
        allure.startStep('click on continue button');
        await ByjusSubscribePage.btnContinue.click();
        allure.startStep('Validate it shown error message for title');
        await expect(await ByjusSubscribePage.getErrorMsgUsingElementText('Title is')).toHaveTextContaining('Title is required');
        allure.startStep('Validate it shown error message for first EMI');
        await expect(await ByjusSubscribePage.getErrorMsgUsingElementText('First EMI')).toHaveTextContaining('First EMI Date is required.');
        allure.endStep();
    })

    it('Validate error message when click on Upload without choosing file ', async () => {
        allure.startStep('Fetch previous loan vendor app id');
        let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Enter customer and loan details');
        await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
        allure.startStep('Click on edit details page');
        await ByjusSubscribePage.btnProceed.click();
        allure.startStep('Verify and click on resume button', true);
        let appId = await ByjusSubscribePage.navigateAndClickOnResume();
        allure.startStep('Add details to db and move to upload documents page', true)
        await mongoconnect.byjusSubscribeAddDetailsToDb(appId, dataToMoveTo.uploadDocumentsPage)
        allure.startStep('Switch back to previous window ', true)
        await browser.switchWindow('/byjussubscribe');
        allure.startStep('Close the target window ', true)
        await browser.closeWindow()
        allure.startStep('Switch back to target window ', true)
        await browser.switchWindow('/byjussubscribe?');
        allure.startStep('refresh the browser ', true)
        await browser.refresh()
        allure.startStep('Click on continue button to proceed further', true)
        await ByjusSubscribePage.btnContinue.click()
        allure.startStep('Wait for upload document radio button to be displayed ', true)
        await ByjusSubscribePage.rbUploadDocument.waitForDisplayed({ timeout: 10000 })
        allure.startStep('Click on upload document radio button  ', true)
        await ByjusSubscribePage.rbUploadDocument.click()
        allure.startStep('Wait for upload button to be clickable', true)
        await ByjusSubscribePage.btnUploadFile.waitForClickable({ timeout: 10000 })
        allure.startStep('Click on upload button', true)
        await ByjusSubscribePage.btnUploadFile.click()
        allure.startStep('Wait for error message to be displayed', true)
        await ByjusSubscribePage.errorMsgUploadBlank.waitForDisplayed({ timeout: 10000 })
        allure.startStep('Verify correct error message is displayed ', true)
        expect(await ByjusSubscribePage.errorMsgUploadBlank).toHaveTextContaining("You need to click photo first or select file to upload")
        allure.endStep()
    });

    it('Validate the correct app Id is displayed on loan eligibility status page', async () => {
        allure.startStep('Fetch previous loan vendor app id');
        let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Enter customer and loan details');
        await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
        allure.startStep('Click on edit details page');
        await ByjusSubscribePage.btnProceed.click();
        allure.startStep('Verify and click on resume button', true);
        let appId = await ByjusSubscribePage.navigateAndClickOnResume();
        allure.startStep('Add details to db and move to Loan eligibilty status page', true)
        await mongoconnect.byjusSubscribeAddDetailsToDb(appId, dataToMoveTo.loanEligibilityStatusPage)
        allure.startStep('Update status in DB as approval pending ', true);
        await mongoconnect.updateTransactionsCibilStatusApprovalPending(appId)
        allure.startStep('Switch back to previous window ', true)
        await browser.switchWindow('/byjussubscribe');
        allure.startStep('Close the target window ', true)
        await browser.closeWindow()
        allure.startStep('Switch back to target window ', true)
        await browser.switchWindow('/byjussubscribe?');
        allure.startStep('refresh the browser ', true)
        await browser.refresh()
        allure.startStep('Click on continue button to proceed further', true)
        await ByjusSubscribePage.btnContinue.click()
        allure.startStep('wait for app Id to be displayed', true)
        await ByjusSubscribePage.appIdText.waitForDisplayed({ timeout: 5000 })
        allure.startStep('Verify the correct app Id is displayed on loan eligibility status page', true)
        expect(await ByjusSubscribePage.appIdText.getText()).toEqual(`${appId}`)
        allure.endStep()
    });
})