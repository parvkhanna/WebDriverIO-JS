import BasePage from '../gateway_payments_page/base.page';
import byjusadvantagePage from './byjusadvantage.payment.page'
import mongoconnect from '../../utils/mongoconnect'

class ByjusSubscribePage extends BasePage {

    /* Login page locators */
    get btnSignInWithGoogle() {
        return $("//button[contains(text(),'Sign In With Google')]")
    }
    get btnSignInWithGoogleLms() {
        return $("//button[contains(text(),'  Sign In With Google')]")
    }
    get btnContinueWithGoogle() {
        return $("(//button[@name='googleSignUpButton'])[2]")
    }
    get tfEnterMailAddress() {
        return $("input[id='identifierId']")
    }
    get btnNext() {
        return $("//span[text()='Next']/..")
    }
    get tfEnterPassword() {
        return $("input[type='password']")
    }
    get btnSubmit() {
        return $("//button[contains(text(),'Submit')]")
    }

    /* Customer and loan details locators */
    get byjusSubscribepayBtn() {
        return $("a[href='/byjussubscribe']")
    }
    get tfBorrowerFirstName() {
        return $("input[name='applicantFirstName']")
    }
    get tfBorrowerLastName() {
        return $("input[name='applicantLastName']")
    }
    get tfStudentName() {
        return $("input[name='studentName']")
    }
    get tfEmailAddress() {
        return $("input[name='emailAddress']")
    }
    get tfPhoneNumber() {
        return $("input[name='telephoneNumber']")
    }
    get tfPreviousLoanAmout() {
        return $("input[name='previousLoanAmount']")
    }
    get tfRevisedLoanAmount() {
        return $("input[name='revisedLoanAmount']")
    }
    get tfRevisedLoanTenure() {
        return $("input[name='revisedLoanTenure']")
    }
    get tfDob() {
        return $("input[name='dateOfBirth']")
    }
    get ddDobYear() {
        return $("span[class*='react-datepicker__year-read-view--selected-year']")
    }
    get ddDobMonth() {
        return $("span[class*='react-datepicker__month-read-view--selected-month']")
    }
    ddDobYearSelector(year) {
        return $("//div[text()='" + year + "']")
    }
    ddDobMonthSelector(month) {
        return $("//div[text()='" + month + "']")
    }
    ddDobDaySelector(day) {
        return $("//div[@aria-label='day-" + day + "']")
    }
    getErrorMsgDropdownElement(fieldName) {
        return $(`//label[@for="${fieldName}"]//following-sibling::small[@class='form-text text-danger']`);
    }
    get ddPreviousLoanProvider() {
        return $("//label[@for='Previous Loan Provider']/../div[@class='css-1pcexqc-container']")
    }
    getLoanProviderOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    get ddOccupationType() {
        return $("//label[@for='Occupation Type']/../div/div")
    }
    get ddQualification() {
        return $("//label[@for='Education Qualification']/../div/div")
    }
    get tfIncome() {
        return $("input[name='incomeSlab']")
    }
    get ddMartialStatus() {
        return $("//label[@for='Marital Status']/../div/div")
    }
    get ddResidenceType() {
        return $("//label[@for='Residence Type']/../div/div")
    }
    get tfAlternateMobileNo() {
        return $("input[name='alternateTelephoneNumber']")
    }
    get tfMothersName() {
        return $("input[name='mothersName']")
    }
    get tfStudentsName() {
        return $("(//input[@name='studentName'])[2]")
    }
    get tfStudentsDob() {
        return $("input[name='studentDob']")
    }
    get tfPreviousAppId() {
        return $("input[name='previousAppId']")
    }
    get txtPreviousAppId() {
        return $("label[for='Previous AppId']")
    }

    get ddSchoolLocation() {
        return $("//label[@for='School Location']/../div[@class='css-1pcexqc-container']")
    }

    get ddSchoolName() {
        return $("//label[@for='School Name']/../div[@class='css-1pcexqc-container']")
    }

    get ddSchoolFees() {
        return $("//label[@for='School Fee Band']/../div[@class='css-1pcexqc-container']")
    }

    get cbToSendOtp() {
        return $("input[class*='form-check-input']")
    }
    get btntfNext() {
        return $("button[class*='btn btn-success']")
    }

    get btnProceed() {
        return $("//button[text()='Proceed']")
    }

    get btnEditDetails() {
        return $("//button[text()='Edit Details']")
    }

    get customerExistingPopup() {
        return $("//div[@class='text-white' and text() = 'Customer is existing']")
    }

    /* Check OTP screen */
    get tfEnterOtp() {
        return $("input[name='otp']")
    }
    get btnVerifyOtp() {
        return $("//button[normalize-space()='Verify OTP']")
    }
    get otpErrorMsg() {
        return $("div[role='alert'] ul")
    }

    /* home page  */

    get btnByjusSubscribeHistory() {
        return $("//a[@href='/byjussubscribe']/..//button[text()='History']")
    }

    get btnByjusSubscribeHistoryUnprocessed() {
        return $("//a[@href='/byjussubscribe']/..//div/a[text()='Unprocessed']")
    }

    get btnByjusAdvantageHistory() {
        return $("//a[@href='/byjusadvantage']/..//button[text()='History']")
    }

    get btnByjusAdvantageHistoryUnprocessed() {
        return $("//a[@href='/byjusadvantage']/..//div/a[text()='Unprocessed']")
    }

    get btnByjusAdvantageHistoryProcessed() {
        return $("//a[@href='/byjusadvantage']/..//div/a[text()='Processed']")
    }

    get previousAppId() {
        return $("(//span[text()='App ID']//following-sibling::span)[1]")
    }

    get previousName() {
        return $("(//span[@class='col-main'])[4]")
    }

    get headerSerachFilter() {
        return $("//div[@class='card search-form']/header")
    }

    get ddLoanStatus() {
        return $("//select[@name='status']")
    }

    get previousLoanAmount() {
        return $("(//span[text()='Loan Amount']//following-sibling::span)[4]")
    }

    get btnApplyFilter() {
        return $("//button[normalize-space()='Apply Filter']")
    }

    getBtnResume(appId) {
        return $(`//a[contains(@href, '${appId}')]`)
    }

    getAppId() {
        return $("(//span[text()='App ID']//following-sibling::span)[1]")
    }

    get btnContinue() {
        return $("//button[contains(text(),'Continue')]")
    }

    /* Account Details page */
    get ddNameTitle() {
        return $("//label[@for='Title']/../div/div")
    }
    get tfCustomerName() {
        return $("input[name='name']")
    }
    get tfAccountNumber() {
        return $("input[name='accountNumber']")
    }
    get ddAccountType() {
        return $("//label[@for='Account Type']/../div/div")
    }

    get tfAccrountType() {
        return $("input[name='accountType']")
    }

    get tfBankName() {
        return $("input[name='bankName']")
    }
    get ddBankName() {
        return $("//label[@for='Bank Name']/../div/div")
    }
    get btnBankBranch() {
        return $("//button[text()='Search Branch']")
    }

    get errorMsgForPreviousAppId() {
        return $("//div[@class='alert alert-danger fade show']/ul/li")
    }
    get rbBankBranch() {
        return $("//td[text()='ABHY0065001']/..//input")
    }
    get rbBranch() {
        return $("(//input[@type='radio'])[4]")
    }
    get btnselect() {
        return $("//button[normalize-space()='Select']")
    }

    get ddSelectEmiDate() {
        return $("//label[@for='First EMI Date']/../div/div")
    }

    get tfIfsc() {
        return $("input[name='ifsc']")
    }

    get tfMicr() {
        return $("input[name='micr']")
    }

    get tfCity() {
        return $("input[name='city']")
    }

    get tfApprovedLoanAmount() {
        return $("input[name='approvedLoanAmount']")
    }

    getAccountTypeOptions(optionType) {
        return $(`//div[@class='css-11unzgr']//div[contains(text(), ${optionType})]`)
    }

    get titleGender() {
        return $("(//div[@class='css-1hwfws3'])[1]")
    }

    getddAllGender(genderType) {
        return $(`//div[@class='css-11unzgr']//div[contains(text(), ${genderType})]`)
    }

    /* Loan agreement page */

    get tLoanAgreementPage() {
        return $("//div[contains(text(), 'Loan Agreement')]")
    }

    getbankDetailsData(index) {
        return $(`(//div[@class='col-sm-12 col-md-6'])[2]/div[${index}]`)
    }

    /* E-nach page */

    get headerEmandateLg() {
        return $("//span[contains(text(), 'Emandate LG')]")
    }

    get btnResendSms() {
        return $("//button[contains(text(), 'Resend SMS')]")
    }

    get cbToPNACH() {
        return $("input[type='checkbox']")
    }
    get btnGeneratePNACH() {
        return $("//button[text()='Generate PNACH']")
    }

    get tfUpiMandate() {
        return $("input[name='vpa']")
    }
    get txtUploadDocument() {
        return $("//label[normalize-space()='Upload Document']")
    }
    get btnGenerateLink() {
        return $("//button[contains(text(),'Generate Link')]")
    }

    get btnClose() {
        return $("//button[contains(text(),'Close')]")
    }

    get btnENach() {
        return $("//input[@name = 'nach']");
    }


    get softApprovedMsg() {
        return $("//td[contains(text(), 'Soft Approved')]");
    }

    getAppIdMsg(app_id) {
        return $(`//td[contains(text(), '${app_id}')]`);
    }

    get btnSendSign() {
        return $("//button[contains(text(), 'Send Esign')]");

    }

    get btnDone() {
        return $("//button[contains(text(), 'Done')]");
    }

    //** Upload documents page  */
    get rbUploadDocument() {
        return $("//label[normalize-space()='Upload Document']")
    }

    get rbTakeDocumentPhoto() {
        return $("//label[normalize-space()='Take Document Photo']")
    }

    get btnTakeCancelledCheque() {
        return $("button#cancelledChequeOrBankStatement-button")
    }
    get btnChooseFile() {
        return $("#file")
    }
    get btnUploadFile() {
        return $("(//button[@type='button'])[4]")
    }

    get errorMsgUploadBlank() {
        return $("div.alert.alert-danger>ul>li")
    }
    get appIdText() {
        return $("table.table.table-bordered>tbody>tr:nth-of-type(2)>td:nth-of-type(2)")
    }


    /* LMS Page Locators */
    get btnManageLoan() {
        return $("//a[@href='/manage-loan']")
    }
    get btnUnprocessedByjusSubscribe() {
        return $("//a[@href='/manage-loan/unprocessed/byjussubscribe']")
    }
    get btnAbbTicketSearchBox() {
        return $("//input[@name='searchText']")
    }

    get btnExpand() {
        return $("button[title='Expand']>i.fa")
    }
    get btnUnprocessedByjusAdvantage() {
        return $("//a[@href='/manage-loan/unprocessed/byjusadvantage']")
    }
    get btnPreview() {
        return $("//button[contains(text(),'Preview')]")
    }
    get btnApprove() {
        return $("//button[contains(text(),'Approve')]")
    }
    get btnDocVerified() {
        return $("//button[contains(text(),'Doc Verified')]")
    }
    get popUpLoanApproved() {
        return $('div.s-alert-box-inner>span')
    }
    getDocumentsList(list) {
        return $(`(//span[@class='MuiTab-wrapper'])[${list}]`)
    }
    getDocumentsListLMS(list) {
        return $(`(//input[@class='form-check-input'])[${list}]`)
    }
    cbVerify(num) {
        return $("(//input[@type='checkbox'])[" + num + "]")
    }
    btnDocumentVarificationLink(appId) {
        return $(`//a[@href='/manage-loan/unprocessed/byjussubscribe/createLoan/${appId}']`)
    }
    get btnApprovedDocuments() {
        return $("//button[contains(text(),' Approve Documents')]")
    }
    get txtLoanStatus() {
        return $("//div[@class='ant-spin-container']/div/div/p[2]")
    }
    get txtAppId() {
        return $("//div[@class='ant-spin-container']/div/div/p[1]")
    }

    get logoDocApproved() {
        return $("i.fa.fa-check")
    }
    get btnCreateLoan() {
        return $("//button[normalize-space()='Create Loan']")
    }
    /* Error and Success Message */
    getErrorMsgElement(fieldName) {
        return $(`//input[@name='${fieldName}']/../div[@class='invalid-feedback']`);

    }
    getErrorMsgElementByLabel(fieldName) {
        return $(`//label[@for="${fieldName}"]//following-sibling::div[@class='invalid-feedback']`);
    }

    getErrorMsgUsingElementText(elementText) {
        return $(`//small[@class='form-text text-danger' and contains(text(),'${elementText}')]`)
    }
    getErrorMsgLmsPortal() {
        return $("//span[text()='Please enter all required details!']")
    }
    getErrorMsgUpload() {
        return $("//div[@role='alert']//li")
    }
    get enachProcessMsg() {
        return $("//div[contains(@class, 'alert-success')]")
    }

    get errorMsg() {
        return $("//div[contains(@class, 'alert-danger')]/ul/li")
    }

    getExtractData(elementText) {
        return $(`//div[contains(text(), '${elementText}')]`)
    }

    get accountNameMsg() {
        return $("//div[@class='card-footer']//div[contains(text(), 'Applicant Name is not Matching With Bank Details, Account Holder Name: Dummy Customer Name')]")

    }




    async loginPaymentPage(username, password) {
        await browser.pause(5000)
        let googleSignInBtnDisplayed = await this.btnSignInWithGoogle.isDisplayed({ timeout: 5000 });
        if (googleSignInBtnDisplayed) {
            await this.btnSignInWithGoogle.click();
            await this.btnContinueWithGoogle.click();
            if (await this.tfEnterMailAddress.isDisplayed({ timeout: 5000 })) {
                await this.tfEnterMailAddress.setValue(username);
                await this.btnNext.click();
                await this.tfEnterPassword.waitForDisplayed({ timeout: 5000 });
                await this.tfEnterPassword.setValue(password);
                await this.btnNext.click();
            }
        }
        await this.byjusSubscribepayBtn.waitForExist({ timeout: 60000 });
    }

    async fetchPreviousAppId(data) {
        await this.btnByjusAdvantageHistory.click();
        await this.btnByjusAdvantageHistoryProcessed.waitForExist({ timeout: 60000 });
        await this.btnByjusAdvantageHistoryProcessed.click();
        await this.headerSerachFilter.waitForClickable({ timeout: 30000 })
        await this.headerSerachFilter.click()
        await this.ddLoanStatus.waitForDisplayed({ timeout: 20000 })
        await this.ddLoanStatus.selectByVisibleText("Doc Approved")
        await this.btnApplyFilter.waitForClickable({ timeout: 20000 })
        await this.btnApplyFilter.click()
        await this.previousAppId.waitForDisplayed({ timeout: 20000 })
        let previousAppID = await this.previousAppId.getText();
        let firstName = await this.previousName.getText();
        let loanAmount = await this.previousLoanAmount.getText();
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        await this.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        return { 'appId': previousAppID, 'firstName': firstName, 'loanAmount': loanAmount.split(' ')[1] };
    }

    async verifyPreviousAppId(data) {
        try {
            await this.errorMsg.waitForDisplayed({ timeout: 10000 })
        } catch { }
        let errorStatus = await this.errorMsg.isDisplayed()
        if (errorStatus) {
            let previousAppId = await this.errorMsg.getText()
            let id = previousAppId.slice(-14)
            await mongoconnect.deleteActiveLoanAppId(id)
            await browser.pause(3000)
        }
        await this.ddPreviousLoanProvider.waitForClickable();
        await this.ddPreviousLoanProvider.click();
        await browser.keys(data.previousLoanProvider);
    }

    async enterCustomerAndLoanDetails(data, previousAppId) {
        await this.byjusSubscribepayBtn.click();
        await this.tfPreviousAppId.setValue(previousAppId);
        await this.ddPreviousLoanProvider.waitForClickable();
        await this.ddPreviousLoanProvider.click();
        await browser.keys(data.previousLoanProvider);
        await this.verifyPreviousAppId(data)
        await this.tfRevisedLoanAmount.setValue(data.revisedLoanAmount);
        await this.tfRevisedLoanTenure.setValue(data.revisedLoanTenure);
        await this.tfDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobStudentYear).click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector(data.dobStudentMonth).click();
        await this.ddDobDaySelector(data.dobStudentDate).waitForClickable({ timeout: 60000 });
        await this.ddDobDaySelector(data.dobStudentDate).click();
        await this.cbToSendOtp.click();
        await this.btntfNext.waitForClickable({ timeout: 6000 });
        await this.btntfNext.click();
    }

    async navigateAndClickOnResume() {
        await browser.pause(6000);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        await this.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        let appId = await this.returnAppId();
        browser.execute("arguments[0].click();", await this.getBtnResume(appId));
        await this.btnContinue.waitForClickable({ timeout: 20000 })
        await this.btnContinue.click()
        return appId;
    }
    async clickOnProceedButton() {
        // Try catch is implemented due to unexpected behaviour of proceed button i.e. sometimes the button appears sometime it dosen't
        try { await this.btnProceed.waitForDisplayed({ timeout: 20000 }) }
        catch { }
        if (await this.btnProceed.isDisplayed()) {
            await this.btnProceed.waitForExist({ timeout: 10000 })
            await this.btnProceed.click();
            await this.ddNameTitle.waitForExist({ timeout: 20000 });
        }
        else {
            await this.ddNameTitle.waitForExist({ timeout: 20000 });

        }

    }

    async returnAppId() {
        await this.btnByjusSubscribeHistory.click();
        await this.btnByjusSubscribeHistoryUnprocessed.click();
        let appId = await this.getAppId().getText();
        return appId;
    }
    async verifyDocuments() {
        //  verify all the documents in LMS portal
        for (let i = 1; i <= 3; i++) {

            await this.getDocumentsListLMS(i).waitForDisplayed({ timeout: 30000 });
            if (this.getDocumentsListLMS(i).isClickable() == false) {
                await this.getDocumentsListLMS(i).scrollIntoView();
                await this.getDocumentsListLMS(i).waitForClickable({ timeout: 30000 })
                await this.getDocumentsListLMS(i).click();
            }
            await this.getDocumentsListLMS(i).click()
            // wait for documents to upload to avoid click intercepted exception
            await browser.pause(2000);
        }
        await this.btnApprove.waitForExist({ timeout: 20000 })
        await this.btnApprove.click()

    }

    async uploadDocuments() {
        for (let i = 0; i < 2; i++) {
            await this.rbUploadDocument.click()
            await this.btnChooseFile.waitForDisplayed({ timeout: 20000 })
            try {
                const path = require('path');
                const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
                await this.btnChooseFile.setValue(filePath);
            }
            catch { }
            await this.btnUploadFile.click();

        }
    }

    async enterAccountDetails(accountData, field_validation = false) {
        await this.ddNameTitle.click();
        await browser.keys(accountData["title"]);
        await this.tfCustomerName.setValue("Dummy customer name");
        await this.ddSelectEmiDate.waitForExist({ timeout: 60000 });
        await this.ddSelectEmiDate.click();
        await browser.keys("Tab");
        if (!field_validation) {
            await this.btnContinue.click();
        }
    }
    async lmsVerifyDocuments(appId) {
        await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[0]);
        await browser.closeWindow();
        await browser.switchToWindow(handles[1]);
        await this.btnSignInWithGoogleLms.waitForDisplayed({ timeout: 20000 });
        let signInBtn = await this.btnSignInWithGoogleLms.isDisplayed();
        if (signInBtn) {
            await this.btnSignInWithGoogleLms.click();
            await this.btnContinueWithGoogle.click();
            if (await this.tfEnterMailAddress.isDisplayed({ timeout: 5000 })) {
                await this.tfEnterMailAddress.setValue(process.env.USER_EMAIL_ACHIEVETESTING);
                await this.btnNext.click();
                await this.tfEnterPassword.waitForDisplayed({ timeout: 5000 });
                await this.tfEnterPassword.setValue(process.env.PWD_ACHIEVETESTING);
                await this.btnNext.click();
            }
        }
        await this.btnManageLoan.waitForExist({ timeout: 30000 });
        await this.btnManageLoan.click();
        await this.btnUnprocessedByjusSubscribe.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnDocumentVarificationLink(appId).waitForExist({ timeout: 30000 });
        await this.btnDocumentVarificationLink(appId).click();
        if (await this.btnDocumentVarificationLink(appId).isDisplayed() == false) {
            await browser.refresh();
        }
        await this.btnApprovedDocuments.waitForEnabled({ timeout: 10000 })
        await this.btnApprovedDocuments.click()
        await this.verifyDocuments();
        await this.btnCreateLoan.click()
        await browser.waitUntil(async () => await this.txtLoanStatus.getText() == `Loan Status : Loan Created`,
            {
                timeout: 130000,
                timeoutMsg: 'Loan is not created'
            })
        let appIdText = await this.txtAppId.getText()
        return appIdText
    }
}

export default new ByjusSubscribePage();