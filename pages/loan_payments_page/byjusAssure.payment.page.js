import BasePage from '../gateway_payments_page/base.page';
import mongoConnect from "../../utils/mongoconnect";
import TLPOrderPage from "./tlp.order.Page"


class ByjusAssurePage extends BasePage {

    get btnSignInWithGoogle() {
        return $("//button[text()=' Sign In With Google']")
    }
    get btnContinueWithGoogle() {
        return $("(//button[@name='googleSignUpButton'])[2]")
    }
    get tfEnterMailAddress() {
        return $("//input[@id='identifierId']")
    }
    get btnNext() {
        return $("//span[text()='Next']/..")
    }
    get tfEnterPassword() {
        return $("//input[@type='password']")
    }
    get btnSubmit() {
        return $("//button[(text()='Submit')]")
    }
    get byjusAssurepayBtn() {
        return $("a[href='/byjusassure']>button")
    }
    //--** School details locators--**//

    get btnLocateSchool() {
        return $("//span[normalize-space()='Locate School']")
    }

    get tfSchoolLocation() {
        return $("//label[contains(text(),'Enter School with school area')]/following-sibling::input")
    }
    get ddSchoolName() {
        return $("//*[contains(text(),'Select School  ')]/../../div")
    }
    get btnConfirmStudentDetails() {
        return $("//button[normalize-space()='Confirm']")
    }
    get ddSchoolFee() {
        return $("//label[@for='School Fee (Rs.)']/../div/div")
    }

    get ddStudentGrade() {
        return $("//label[@for='Student Grade']/../div/div")
    }
    get ddStudentRelation() {
        return $("//label[@for='Student Relation with applicant']/../div/div")
    }
    get cbToSendOtp() {
        return $("input[type='checkbox']")
    }
    get btnSendOtp() {
        return $("//button[@class='btn btn-success']")
    }
    get tfEnterOtp() {
        return $("//input[@name='otp']")
    }
    get tfBorrowerFirstName() {
        return $("//input[@name='applicantFirstName']")
    }
    get tfBorrowerLastName() {
        return $("//input[@name='applicantLastName']")
    }
    get tfStudentName() {
        return $("//input[@name='studentName']")
    }
    get ddSchoolLocation() {
        return $("label[for='School Location']+div")
    }
    get ddSchoolFeeBand() {

        return $("label[for='School Fee Band']+div")
    }
    get tfEmailAddress() {
        return $("//input[@name='emailAddress']")
    }
    get tfPhoneNumber() {
        return $("//input[@name='telephoneNumber']")
    }
    get ddIdProofType() {
        return $("//label[@for='ID Proof Type']/../div[@class='css-1pcexqc-container']")
    }
    get tfIdProofNumber() {
        return $("//input[@name='addressProofNumber']")
    }
    get tfDownPayment() {
        return $("//input[@name='downPayment']")
    }
    get tfEligibleLoanAmount() {
        return $("//input[@name='approvedLoanAmount']")
    }

    get tfEligibleLoanAmountValue() {
        return $("label[for='Eligible Loan Amount']+input")
    }

    get tfLoanAmout() {
        return $("//input[@name='requestedLoanAmount']")
    }
    get ddLoanTenure() {
        return $("//label[@for='Tenure']/../div/div")
    }
    getLoanTenureOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    get tfAddress() {
        return $("//textarea[@name='addressLine1']")
    }
    get tfStudentsDob() {
        return $("//input[@name='dateOfBirth']")
    }
    get calendar() {
        return $('div.react-datepicker__month-container')
    }
    get ddDobYear() {
        return $("//span[@class='react-datepicker__year-read-view--selected-year']")
    }
    get ddDobMonth() {
        return $("//span[@class='react-datepicker__month-read-view--selected-month']")
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

    get btnbyjusAssureHistory() {
        return $("//a[@href='/byjusassure']/..//button[text()='History']")
    }
    get btnbyjusAssureUnprocessed() {
        return $("//a[@href='/byjusassure/unprocessed-applications']")
    }

    get btnProceed() {
        return $("//button[text()='Proceed']")
    }

    get btnResendOtp() { return $("//button[normalize-space()='Resend OTP']") }

    get btnVerifyOtp() {
        return $("//button[normalize-space()='Verify OTP']")
    }
    get btnContinue() {
        return $("//button[text()='Continue']")
    }
    get btnPopUpContinue() {
        return $("//button[@class='btn btn-primary']")
    }
    get nextButton() {
        return $("//button[@class='btn btn-primary'][normalize-space()='Next']")
    }
    //-- Upload bank statement Locators---//

    get uploadBankStatement2Photo() {
        return $("(//input[@name='uploadType'])[3]")
    }
    get errorMsgForOtp() {
        return $("div[role='alert'] ul")
    }
    get cbBankStatement() {
        return $("//input[@type='checkbox']")
    }
    get ddBankStatementSource() {
        return $("//div[@class='css-1hwfws3']")
    }
    get btnRadioUploadDocuments() {
        return $("//label[normalize-space()='Upload Document']")
    }
    get btnUploadDocuments() {
        return $("//button[@class='mt-2 btn btn-success']")
    }


    //--Account details page Locators--//

    get errorMsgTitleRequired() {
        return $("//small[normalize-space()='Title is required.']")
    }
    get titleGender() {
        return $("(//div[@class='css-1hwfws3'])[1]")
    }

    getddAllGender(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }

    getbankDetails(index) {
        return $(`(//div[@class='row'][3]/div)[${index}]/div/label/following::input[1]`)
    }

    getAccountTypeOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    get tfCustomerName() {
        return $("input[name='name']")
    }
    get ddAccountType() {
        return $("(//div[@class='css-1hwfws3'])[2]")
    }
    get bankStatement() {
        return $("(//div[@class='css-1hwfws3'])[3]")
    }
    get tfAccountNumber() {
        return $("//input[@name='accountNumber']")
    }
    get btnBranch() {
        return $("//button[@name='branch']")
    }

    get labelAccountNumber() {
        return $("//label[@for='Account Number']")
    }
    get tfIfscCode() {
        return $("//input[@name='ifsc']")
    }
    get tfMicrCode() {
        return $("//input[@name='micr']")
    }
    get city() {
        return $("//input[@name='city']")
    }
    get ddBankName() {
        return $("(//div[@class='css-1hwfws3'])[3]")
    }
    get btnselect() {
        return $("//button[normalize-space()='Select']")
    }
    get rbBranch() {
        return $("(//input[@type='radio'])[1]")
    }
    get ddfirstEmiDate() {
        return $("(//div[@class='css-1hwfws3'])[4]")
    }
    get btnNextTab() {
        return $("(//button[contains(text(),'Next')])[1]")
    }

    // --Loan agreement page locators --//

    get loanAgreementText() {
        return $("//div[normalize-space()='Data for filling Loan Agreement']/h5")
    }
    get borrowerbankDetailsText() { return $("//h5[normalize-space()='Borrower Bank Details']") }

    get rbToPhysicalNach() {
        return $("//input[@name='physicalNach']")
    }
    getbankDetailsData(index) {
        return $(`(//div[@class='col-sm-12 col-md-6'])[2]/div[${index}]`)
    }
    get accountNumberText() {
        return $("(//div[@class='col-sm-12 col-md-6'])[2]/div[2]")
    }
    get accountHoldername() {
        return $("(//div[@class='col-sm-12 col-md-6'])[2]/div[3]")
    }
    // --Nach Mandate page locators --//

    get EnachMandateText() {
        return $("(//h5[@class='card-title'])[1]")
    }
    // --Upload documents page locators --//

    get rbUploadDocument() {
        return $("(//input[@type='radio'])[1]")
    }
    get btnChooseFile() {
        return $('#file')
    }
    get btnUpload() {
        return $("//button[normalize-space()='Upload']")
    }
    // --Esign page locators -- //

    get cxTosignAgreementPopup() {
        return $("//div[@id='rcDialogTitle0']")
    }
    //---LMS portal locators----//

    get btnManageLoan() {
        return $("//a[@href='/manage-loan']")
    }

    get btnUnprocessedByjusAssure() {
        return $("//a[@href='/manage-loan/unprocessed/byjusassure']")
    }

    get btnProcessedByjusAssure() {
        return $("//a[@href='/manage-loan/processed/byjusassure']")
    }

    btnDocumentVerificationLink(appId) {
        return $("//a[@href='/manage-loan/unprocessed/byjusassure/approveLoan/docapproved/" + appId + "']")
    }
    btnDocumentVarificationLinkProcessed(appId) {
        return $(`//a[contains(@href,'${appId}')]`)
    }

    get btnDocReceivedAndFinOpsApprove() {
        return $("//button[normalize-space()='Doc Received & Fin Ops Approve']")
    }
    get btnPreview() {
        return $("//button[contains(text(),'Preview')]")
    }

    get btnApprove() {
        return $("//button[normalize-space()='APPROVE']")
    }
    get btnApproveTab() {
        return $("//button[normalize-space()='Approve']")
    }

    get btnDocVerified() {
        return $("//button[contains(text(),'Doc Verified')]")
    }

    get ddAll() {
        return $("//button[contains(@role,'menuitem')][normalize-space()='All']")
    }
    get btnSignInWithGoogleLms() {
        return $("//button[normalize-space()='Sign In With Google']")
    }
    get btnSoftApproved() {
        return $("//button[contains(@class,'dropdown-toggle btn btn-secondary btn-sm')][normalize-space()='Soft Approved']")
    }
    get errorMsgPhotoUpload() {
        return $("//li[contains(text(),'You need to click photo first or select file to up')]")
    }
    get btnGeneratePNACH() {
        return $("//button[normalize-space()='Generate PNACH']")
    }
    get popUpGeneratedPnach() {
        return $("div.ant-notification-notice-message")
    }
    get btnSyncEsign() {
        return $("(//*[text()='Sync Esign'])[1]")
    }

    get popUpLoanApproved() {
        return $('div.s-alert-box-inner>span')
    }
    lmsVerifyingDocuments(fieldName) {
        return $("//span[@class='MuiTab-wrapper']/./span[contains(text(),'" + fieldName + "')]")
    }

    get txtLoanStatus() {
        return $("//div[@class='ant-spin-container']/div/div/p[2]")
    }
    get txtAppId() {
        return $("//div[@class='ant-spin-container']/div/div/p[1]")
    }

    getDocumentsList(list) {
        return $(`(//span[@class='MuiTab-wrapper'])[${list}]`)
    }
    getDocumentsListCb(list) {
        return $(`(//input[@class='form-check-input'])[${list}]`)
    }
    get btnAbbTicketSearchBox() {
        return $("//input[@name='searchText']")
    }
    getAppId(panNumber) {
        return $("(//span[text()='" + panNumber + "']/../../preceding-sibling::p)[2]//span[2]")
    }

    btnResume(appId) {
        return $("//a[@href='/byjusassure?appId=" + appId + "']")
    }

    getErrorMsgElement(fieldText) {
        return $(`input[name='${fieldText}']+div`)
    }

    getErrorMsgElementByLabel(address) {
        return $(`textarea[name='${address}']+div`);
    }
    getErrorMsgUsingElementText(elementText) {
        return $(`//small[text()='${elementText}']`)
    }

    getErrorMsgEleUsingDispText(fieldName) {
        return $(`//input[@label='${fieldName}']/../div[@class='invalid-feedback']`);
    }
    getErrorMsgElementUsingElementText(elementText) {
        return $(`//div[@class='invalid-feedback' and contains(text(),'${elementText}')]`);
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
    get ddDob() {
        return $("input[name='studentDob']")
    }
    get tfTLpInitiatedAppId() {
        return $("//input[@name='previousAppId']")
    }

    get btnEnableWebApp() {
        return $("//button[normalize-space()='Enable Web App']")
    }
    get btnNoTab() {
        return $("//button[normalize-space()='No']")
    }

    get ddSelectReason() {
        return $("(//div[normalize-space()='Select Reason'])[1]")
    }

    get btnClosePopUp() {
        return $("(//button[normalize-space()='Close'])[2]")
    }

    get btnApproveDocuments() {
        return $("//button[normalize-space()='Approve Documents']")
    }
    get btnCreateLoan() {
        return $("//button[normalize-space()='Create Loan']")
    }
    async verifyDocuments() {
        //  verify all the documents in LMS portal
        for (let i = 4; i <= 8; i++) {

            await this.getDocumentsList(i).waitForDisplayed({ timeout: 30000 });
            if (this.getDocumentsList(i).isClickable() == false) {
                await this.getDocumentsList(i).scrollIntoView();
                await this.getDocumentsList(i).waitForClickable({ timeout: 30000 })
                await this.getDocumentsList(i).click();
            }
            await this.getDocumentsList(i).click()
            // wait for documents to upload to avoid click intercepted exception
            await browser.pause(6000);
            try {
                await this.btnApprove.waitForExist({ timeout: 20000 })
            }
            catch (e) {
                await this.getDocumentsList(i).click()
                await this.btnApprove.waitForExist({ timeout: 30000 })
            }
            await this.btnApprove.click();
        }
    }
    async verifyDocumentsForFinOpsAndCrerateLoan() {
        //  verify all the documents in LMS portal
        for (let i = 1; i <= 5; i++) {

            await this.getDocumentsListCb(i).waitForDisplayed({ timeout: 30000 });
            if (this.getDocumentsListCb(i).isClickable() == false) {
                await this.getDocumentsListCb(i).scrollIntoView();
                await this.getDocumentsListCb(i).waitForClickable({ timeout: 30000 })
                await this.getDocumentsListCb(i).click();
            }
            await this.getDocumentsListCb(i).click()
            // wait for documents to upload to avoid click intercepted exception
            await browser.pause(2000);
        }
        await this.btnApproveTab.waitForExist({ timeout: 20000 })
        await this.btnApproveTab.waitForClickable({ timeout: 20000 })
        await this.btnApproveTab.click()

    }
    async uploadDocuments() {
        let radio
        for (let i = 0; i < 3; i++) {
            radio = await this.rbUploadDocument.isDisplayed();
            if (radio == true) {
                await this.rbUploadDocument.waitForClickable({ timeout: 60000 });
                await this.rbUploadDocument.click();
                const path = require('path');
                const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
                await this.btnChooseFile.waitForClickable({ timeout: 60000 });
                await this.btnChooseFile.setValue(filePath);
                await this.btnUpload.waitForClickable({ timeout: 60000 });
                await this.btnUpload.click();

            }
        }
    }


    async loginPaymentPage(username, password) {
        //5 seconds Wait till all elements present on page .
        await browser.pause(5000);
        let googleSignInBtnSignIned = await this.btnSignInWithGoogle.isDisplayed({ timeout: 5000 });
        if (googleSignInBtnSignIned) {
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
        await this.byjusAssurepayBtn.waitForDisplayed({ timeout: 60000 });
    }

    async customerDetails(data, appId) {
        // await this.byjusAssurepayBtn.click();
        await this.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        await this.tfTLpInitiatedAppId.setValue(appId)
        await this.btnEnableWebApp.waitForClickable({ timeout: 22000 })
        await this.btnEnableWebApp.click()
        await this.tfBorrowerFirstName.waitForEnabled({ timeout: 10000 })
        await this.tfBorrowerFirstName.setValue(data.borrowerFirstName);
        await this.tfBorrowerLastName.setValue(data.borrowerLastName);
        await this.tfEmailAddress.setValue(data.email);
        await this.ddIdProofType.click();
        await browser.keys(data.idProof);
        await this.tfIdProofNumber.setValue(data.panNumber);
        await this.tfDownPayment.setValue(data.downPayment);
        await this.tfLoanAmout.setValue(data.loanAmount);
        await this.ddLoanTenure.waitForClickable({ timeout: 8000 });
        await this.ddLoanTenure.click();
        await browser.keys(data.loanTenure);
        await this.tfAddress.setValue(data.address);
        await this.tfStudentsDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobStudentYear).click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector(data.dobStudentMonth).click();
        await this.ddDobDaySelector(data.dobStudentDate).waitForClickable({ timeout: 60000 });
        await this.ddDobDaySelector(data.dobStudentDate).click();
        await this.ddStudentGrade.click();
        await browser.keys(["5", "Tab"]);
        await this.cbToSendOtp.click();
        await this.btnNextTab.click()
        await this.clickOnProceedBtn();
    }
    async enterCustomerDetailAndLoanDetails(data) {
        let loanVendor = "byjusassure"
        let dataId = await mongoConnect.tlPayAppIdCreation(data.panNumber);
        let appId = dataId[0];
        let kartLeadId = dataId[1];
        await TLPOrderPage.createTlpObject(appId)
        await TLPOrderPage.updatePermitRequest(appId, kartLeadId)
        await TLPOrderPage.openUrlWithKartId(kartLeadId, loanVendor)
        await this.customerDetails(data, appId)
        //Additional details 
        await this.ddOccupationType.waitForClickable({ timeout: 60000 });
        await this.ddOccupationType.click();
        await browser.keys(["S", "t", "Tab"]);
        await this.ddQualification.click()
        await browser.keys(["G", "r", "a", "Tab"])
        await this.tfIncome.setValue("20000")
        await this.ddMartialStatus.click()
        await browser.keys(["S", "Tab"])
        await this.ddResidenceType.click()
        await browser.keys(["O", "w", "Tab"])
        await this.tfAlternateMobileNo.setValue("9867885466");
        await this.tfStudentName.setValue(data.studentsName);
        await this.tfMothersName.setValue(data.studentMotherName);
        await this.ddDob.waitForClickable();
        await this.ddDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobStudentYear).click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector(data.dobStudentMonth).click();
        await this.ddDobDaySelector(data.dobStudentDate).click();
        await this.btnLocateSchool.click()
        await browser.pause(5000);
        await this.tfSchoolLocation.waitForDisplayed({ timeout: 20000 })
        await this.tfSchoolLocation.waitForExist({ timeout: 30000 })
        await this.tfSchoolLocation.setValue(data.SchoolLocation)
        await browser.keys("Enter")
        await this.ddSchoolName.waitForClickable({ timeout: 20000 })
        await this.ddSchoolName.click()
        await browser.pause(2000)
        await browser.keys("Tab")
        await this.btnConfirmStudentDetails.waitForDisplayed({ timeout: 10000 })
        await this.btnConfirmStudentDetails.click()
        await this.ddSchoolFee.waitForExist({ timeout: 10000 })
        await this.ddSchoolFee.click()
        await browser.keys(data.schoolFeeBand);
        await this.ddStudentRelation.click()
        await browser.keys(["F", "a", "Tab"])
        await this.cbToSendOtp.click();
        await this.btnSendOtp.waitForClickable({ timeout: 6000 });
        await this.btnSendOtp.click();
        return data.panNumber;
    }
    async clickOnProceedBtn() {
        //when test cases are executed in bulk sometimes proceed button pop up appears and sometimes it doesn't 
        try { await this.btnProceed.waitForDisplayed({ timeout: 15000 }) }
        catch { }
        if (await this.btnProceed.isDisplayed()) {
            await this.btnProceed.waitForExist({ timeout: 10000 })
            await this.btnProceed.click();
            await this.tfMothersName.waitForExist({ timeout: 90000 })
        }
        else {
            await this.tfMothersName.waitForExist({ timeout: 90000 })

        }
    }
    async submitFeedback() {
        await this.btnNoTab.waitForClickable({ timeout: 20000 })
        await this.btnNoTab.click()
        await this.ddSelectReason.waitForClickable({ timeout: 20000 })
        await this.ddSelectReason.click()
        await browser.keys("Tab")
        await this.btnSubmit.waitForClickable({ timeout: 20000 })
        await this.btnSubmit.click()
    }

    async returnAppId(panNumber) {
        await this.btnbyjusAssureHistory.click();
        await this.btnbyjusAssureUnprocessed.click();
        await browser.refresh();
        let appId = await this.getAppId(panNumber).getText();
        return appId;
    }

    async fillAccountDetails() {
        await this.titleGender.click();
        await browser.keys(["M", "r", "Tab"]);
        await this.tfAccountNumber.setValue("34051569387");
        await this.ddAccountType.click();
        await browser.keys(["S", "a", "v", "Tab"]);
        await this.ddBankName.waitForClickable({ timeout: 7000 });
        await this.ddBankName.click();
        await browser.keys(["A", "B", "h", "Y", "Tab"]);
        await this.btnBranch.click();
        await this.rbBranch.waitForClickable({ timeout: 30000 });
        await this.rbBranch.click();
        await this.btnselect.click();
        await this.ddfirstEmiDate.click();
        await browser.keys("Tab");
    }

    async ClickOnPopUpContinue() {

        await this.btnPopUpContinue.waitForDisplayed({ timeout: 12000 });
        await this.btnPopUpContinue.waitForClickable({ timeout: 12000 });
        await this.btnPopUpContinue.click();
    }
    async lmsVerifyDocumentsForFinOpsApproved(appId) {
        await browser.pause(8000)
        await this.btnManageLoan.waitForExist({ timeout: 30000 });
        await this.btnManageLoan.click();
        await this.btnProcessedByjusAssure.waitForDisplayed();
        await this.btnProcessedByjusAssure.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await mongoConnect.AddOrderIdByjus(appId)
        await browser.refresh()
        await this.btnDocumentVarificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVarificationLinkProcessed(appId).click();
        await this.btnApproveDocuments.waitForExist({ timeout: 20000 })
        await this.btnApproveDocuments.click()
        await this.btnApproveTab.waitForExist({ timeout: 20000 });
        await this.verifyDocumentsForFinOpsAndCrerateLoan();
        await this.btnDocReceivedAndFinOpsApprove.click();
        await browser.waitUntil(async () => await this.txtLoanStatus.getText() == `Loan Status : Fin Ops Approved`,
            {
                timeout: 30000,
                timeoutMsg: 'Fin ops is not approved '
            })
        await this.btnClosePopUp.waitForClickable({ timeout: 20000 })
        await this.btnClosePopUp.click()
    }
    async createLoan(appId) {
        await this.btnManageLoan.waitForExist({ timeout: 30000 });
        await this.btnManageLoan.click();
        await this.btnProcessedByjusAssure.waitForDisplayed();
        await this.btnProcessedByjusAssure.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnDocumentVarificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVarificationLinkProcessed(appId).click();
        await mongoConnect.updateNachStatusForCreateLoan(appId)
        await browser.refresh()
        await this.btnApproveDocuments.waitForExist({ timeout: 20000 })
        await this.btnApproveDocuments.click()
        await this.btnApproveTab.waitForExist({ timeout: 20000 });
        await this.verifyDocumentsForFinOpsAndCrerateLoan();
        await this.btnCreateLoan.click()
        await browser.waitUntil(async () => await this.txtLoanStatus.getText() == `Loan Status : Loan Created`,
            {
                timeout: 130000,
                timeoutMsg: 'Loan is not created'
            })
        let appIdText = await this.txtAppId.getText()
        return appIdText
    }

    async lmsVerifyDocuments(appId) {
        await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[0]);
        await browser.closeWindow();
        await browser.switchToWindow(handles[1]);
        try { await this.btnSignInWithGoogleLms.waitForExist({ timeout: 30000 }); }
        catch { }
        let btnSignIn = await this.btnSignInWithGoogleLms.isDisplayed({ timeout: 60000 });
        if (btnSignIn) {
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
        await this.btnManageLoan.waitForExist({ timeout: 60000 });
        await this.btnManageLoan.click();
        await this.btnUnprocessedByjusAssure.waitForDisplayed({ timeout: 50000 });
        await this.btnUnprocessedByjusAssure.click();
        await this.btnSoftApproved.waitForDisplayed({ timeout: 50000 });
        await this.btnSoftApproved.click();
        await this.ddAll.click();

        if (await this.btnDocumentVerificationLink(appId).isDisplayed() == false) {
            await browser.refresh();
        }
        await this.btnDocumentVerificationLink(appId).waitForExist({ timeout: 20000 });
        await this.btnDocumentVerificationLink(appId).click();
        await this.verifyDocuments();
        await this.btnDocVerified.click();
        await this.submitFeedback()

    }
}
export default new ByjusAssurePage();
