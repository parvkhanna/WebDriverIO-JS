import BasePage from '../gateway_payments_page/base.page';
import mongoConnect from "../../utils/mongoconnect";


class ByjusNachPage extends BasePage {

    get btnSignInWithGoogle() {
        return $("//button[text()=' Sign In With Google']")
    }
    get btnContinueWithGoogle() {
        return $("(//span[text()='Continue with Google'])[2]")
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
    get byjusNachpayBtn() {
        return $("a[href='/byjusdirect']")
    }
    get tfBorrowerFirstName() {
        return $("input[name='applicantFirstName']")
    }
    get tfBorrowerLastName() {
        return $("input[name='applicantLastName']")
    }
    get tfStudentName() {
        return $("(//input[@name='studentName'])[1]")
    }
    get ddSchoolLocation() {
        return $("label[for='School Location']+div")
    }
    get ddSchoolName() {
        return $("label[for='School Name']+div")
    }
    get ddSchoolFeeBand() {

        return $("label[for='School Fee Band']+div")
    }
    get tfEmailAddress() {
        return $("input[name='emailAddress']")
    }
    get tfPhoneNumber() {
        return $("input[name='telephoneNumber']")
    }
    get ddIdProofType() {
        return $("//label[@for='ID Proof Type']/../div[@class='css-1pcexqc-container']")
    }
    getIdProofOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    get tfIdProofNumber() {
        return $("input[name='addressProofNumber']")
    }
    get tfLoanAmout() {
        return $("input[name='requestedLoanAmount']")
    }
    get ddLoanTenure() {
        return $("//label[@for='Tenure']/../div[@class='css-1pcexqc-container']")
    }
    getLoanTenureOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    //--** School details locators--**//

    get btnLocateSchool() {
        return $("//span[normalize-space()='Locate School']")
    }

    get tfSchoolLocation() {
        return $("input[placeholder^='Type School']")
    }
    get ddSchoolName() {
        return $("//div[contains(text(),'Select school')]/..")
    }
    get btnConfirmStudentDetails() {
        return $("//button[normalize-space()='Confirm']")
    }
    get ddSchoolFee() {
        return $("//label[@for='School Fee']/../div/div")
    }

    get ddStudentGrade() {
        return $("//label[@for='Student Grade']/../div/div")
    }

    get tfStudentsDob() {
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
    get btnbyjusNachHistory() {
        return $("//a[@href='/byjusdirect']/..//button[text()='History']")
    }
    get btnbyjusNachUnprocessed() {
        return $("//a[@href='/byjusdirect/unprocessed-applications']")
    }
    get btnProceed() {
        return $("//button[text()='Proceed']")
    }
    get btnNextTab() {
        return $("button.btn.btn-success")
    }
    get cbToSendOtp() {
        return $("input[class*='form-check-input']")
    }
    get btnSendOtp() {
        return $("//button[text()='Send OTP']")
    }
    get tfEnterOtp() {
        return $("input[name='otp']")
    }
    get btnSubmit() {
        return $("//button[contains(text(),'Submit')]")
    }
    get btnVerifyOtp() {
        return $("//button[normalize-space()='Verify OTP']")
    }
    get btnContinue() {
        return $("//button[contains(text(),'Continue')]")
    }
    get uploadBankStatement2Photo() {
        return $("(//input[@name='uploadType'])[3]")
    }
    get rbBankStatementPassbook() {
        return $("//h5[text()='Bank Statement Passbook(2 photos)']")
    }
    get btnBankBranch() {
        return $("//button[text()='Search Branch']")
    }
    get rbBranch() {
        return $("(//input[@type='radio'])[4]")
    }
    get btnselect() {
        return $("//button[normalize-space()='Select']")
    }
    get rbBankBranch() {
        return $("//td[text()='ABHY0065001']/..//input")
    }
    get btnSelectBranch() {
        return $("//button[text()='Select']")
    }
    get otpErrorMsg() {
        return $("div[role='alert'] ul")
    }
    get cbToBankStatement() {
        return $("(//input[@class='form-check-input'])[6]")
    }
    get btnContinueBankStatementPage() {
        return $("//button[@class='btn btn-success' and contains(text(),' Continue ')]")
    }
    get ddBankStatementSource() {
        return $("div[class*='css-1hwfws3']")
    }
    get rbUploadDocument() {
        return $("//label[text()='Upload Document']")
    }
    get btnChooseFile() {
        return $("#file")
    }
    get cbToContinueBankStatement() {
        return $("input[type='checkbox']")
    }
    get rbUploadDocuments() {
        return $("//label[normalize-space()='Upload Document']")
    }
    get btnUploadDocuments() {
        return $("//button[@class='mt-2 btn btn-success']")
    }
    get btnAddMorePhoto() {
        return $("button[title='Upload More Documents']")
    }
    get btnNextPage() {
        return $("//button[contains(text(),'Next Page')]")
    }
    get ddNameTitle() {
        return $("//div[@class='css-1hwfws3']")
    }
    getddAllGender(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    get tfCustomerName() {
        return $("input[name='name']")
    }
    get ddAccountType() {
        return $("(//div[@class='css-1hwfws3'])[2]")
    }
    getAccountTypeOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    get tfAccountNumber() {
        return $("input[name='accountNumber']")
    }
    get accountNumberText() {
        return $("label[for='Account Number']")
    }
    get btnBranch() {
        return $("button[name='branch']")
    }
    getbankDetails(index) {
        return $(`(//div[@class='row'][3]/div)[${index}]/div/label/following::input[1]`)
    }

    get ddBankName() {
        return $("//label[@for='Bank Name']/../div/div")
    }
    get btnSelect() {
        return $("//button[normalize-space()='Select']")
    }

    get ddfirstEmiDate() {
        return $("//label[@for='First EMI Date']/../div/div")
    }
    get rbPhysicalNach() {
        return $("input[name='physicalNach']")
    }
    get cbToPNACH() {
        return $("input[type='checkbox']")
    }
    get btnGeneratePNACH() {
        return $("//button[text()='Generate PNACH']")
    }
    get btnUploadFile() {
        return $("(//button[@type='button'])[4]")
    }
    get btnManageUtilities() {
        return $("a[href='/manage-utilities']")
    }
    get btnAbbTicket() {
        return $("//p[text()='ABB Tickets']")
    }
    get waitingTimer() {
        return $("div[id='timer']")
    }
    btnOpenAppId(appId) {
        return $("//div[text()='" + appId + "']")
    }
    get popUpAbbTicketCreated() {
        return $("div.ant-notification-notice-message")
    }
    get btnAbbTicketSearchBox() {
        return $("//input[@name='searchText']")
    }
    get tfMinimumBalance() {
        return $("//tr[@role='row']/td[3]/input")
    }
    get tfMaximumBalance() {
        return $("//tr[@role='row']/td[4]/input")
    }
    get rbHighRisk() {
        return $("//input[@name='highRisk'  and @value='low']")
    }
    get ddLoanStatus() {
        return $("//label[text()='Loan status']/../div")
    }
    get btnSubmitTab() {
        return $("//button[text()='Submit']")
    }
    get btnResendOtp() {
        return $("//button[text()='Resend OTP']")
    }
    get btnSaveSheet() {
        return $("//button[text()='Save Sheet']")
    }
    get btnGeneratePNACH() {
        return $("//button[text()='Generate PNACH']")
    }
    get btnManageLoan() {
        return $("//a[@href='/manage-loan']")
    }
    get btnUnprocessedByjusnach() {
        return $("//a[@href='/manage-loan/unprocessed/byjusdirect']")
    }
    get btnprocessedByjusnach() {
        return $("//a[@href='/manage-loan/processed/byjusdirect']")
    }
    btnDocumentVarificationLink(appId) {
        return $("//a[@href='/manage-loan/unprocessed/byjusdirect/approveLoan/docapproved/" + appId + "']")
    }
    btnDocumentVarificationLinkProcessed(appId) {
        return $(`//a[contains(@href,'${appId}')]`)
    }
    getDocumentsList(list) {
        return $(`(//span[@class='MuiTab-wrapper'])[${list}]`)
    }
    getDocumentsListCb(list) {
        return $(`(//input[@class='form-check-input'])[${list}]`)
    }
    get btnPreview() {
        return $("//button[contains(text(),'Preview')]")
    }
    get btnEsign() {
        return $("//button[normalize-space()='Send Esign']")
    }
    get btnDone() {
        return $("//button[normalize-space()='Done']")
    }
    get appIdText() {
        return $("table.table.table-bordered>tbody>tr:nth-of-type(2)>td:nth-of-type(2)")
    }
    cbVerify(num) {
        return $("(//input[@type='checkbox'])[" + num + "]")
    }
    get btnApproveDocuments() {
        return $("//button[contains(text(),'Approve Documents')]")
    }
    get btnApproveTab() {
        return $("//button[normalize-space()='Approve']")
    }
    get btnCreateLoan() {
        return $("//button[normalize-space()='Create Loan']")
    }
    get btnApprove() {
        return $("//button[normalize-space()='APPROVE']")
    }
    get btnDocReceivedAndFinOpsApprove() {
        return $("//button[normalize-space()='Doc Received & Fin Ops Approve']")
    }
    get txtLoanStatus() {
        return $("//div[@class='ant-spin-container']/div/div/p[2]")
    }
    get txtAppId() {
        return $("//div[@class='ant-spin-container']/div/div/p[1]")
    }

    get btnClosePopUp() {
        return $("(//button[normalize-space()='Close'])[2]")
    }
    get btnDocVerified() {
        return $("//button[contains(text(),'Doc Verified')]")
    }
    getAppId(panNumber) {
        return $("(//span[text()='" + panNumber + "']/../../preceding-sibling::p)[2]//span[2]")
    }
    btnResume(appId) {
        return $("//a[@href='/byjusdirect?appId=" + appId + "']")
    }

    getErrorMsgElement(fieldName) {
        return $(`//input[@name='${fieldName}']/../div[@class='invalid-feedback']`);

    }
    getErrorMsgElementByLabel(fieldName) {
        return $(`//label[@for="${fieldName}"]//following-sibling::div[@class='invalid-feedback']`);
    }

    getErrorMsgUsingElementText(elementText) {
        return $(`//small[@class='form-text text-danger' and contains(text(),'${elementText}')]`)
    }
    get btnSignInWithGoogleLms() {
        return $("//button[normalize-space()='Sign In With Google']")
    }
    get ErrorMsgLmsPortal() {
        return $("//span[text()='Please enter all required details!']")
    }
    get ErrorMsgBankStatementUpload() {
        return $("//div[@role='alert']//li")
    }
    get popUpLoanApproved() {
        return $('div.s-alert-box-inner>span')
    }
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
    get tfAddressField() {
        return $("input[name='addressLine1']")
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
    get popUpDocApproved() {
        return $("//*[contains(text(),'All documents are verified')]")
    }
    get nextButton() {
        return $("//button[@class='btn btn-primary'][normalize-space()='Next']")
    }
    get btnNoTab() {
        return $("//button[normalize-space()='No']")
    }

    get ddSelectReason() {
        return $("(//div[normalize-space()='Select Reason'])[1]")
    }




    async uploadPassbookImages() {
        // uploading one pancard image three times for bank passbook images
        for (let i = 0; i < 3; i++) {
            try {
                const path = require('path');
                await this.btnChooseFile.waitForDisplayed({ timeout: 10000 })
                const filePath1 = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH)
                await this.btnChooseFile.waitForExist({ timeout: 60000 })
                await this.btnChooseFile.setValue(filePath1);
                await this.btnUploadFile.waitForClickable({ timeout: 10000 });
                await this.btnUploadFile.click();
                if (i < 2) {
                    await this.btnAddMorePhoto.waitForClickable({ timeout: 20000 });
                    await this.btnAddMorePhoto.click();
                }
            }
            catch { }
        }

    }
    async uploadDocumentsImages() {
        // uploading one pancard image seven times for all the documents required
        for (let i = 0; i < 3; i++) {
            await this.rbUploadDocument.waitForDisplayed({ timeout: 20000 })
            let uploadRb = await this.rbUploadDocument.isDisplayed();
            if (uploadRb == true) {
                await this.rbUploadDocument.waitForClickable({ timeout: 60000 });
                await this.rbUploadDocument.click();
                await this.btnChooseFile.waitForClickable({ timeout: 60000 });
                const path = require('path');
                const filePath1 = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH)
                await this.btnChooseFile.waitForExist({ timeout: 60000 })
                await this.btnChooseFile.setValue(filePath1);
                await this.btnUploadFile.waitForClickable({ timeout: 60000 });
                await this.btnUploadFile.click();
                //3 seconds wait for documents to get saved in DB & changes reflects on UI
                await browser.pause(3000);
            }
        }

    }

    async verifyDocuments() {
        //  verify all the documents in LMS portal
        for (let i = 5; i <= 11; i++) {

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
        for (let i = 1; i <= 8; i++) {

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
    async loginPaymentPage(username, password) {
        await browser.pause(5000);
        let googleSignInBtnDisplayed = await this.btnSignInWithGoogle.isDisplayed({ timeout: 5000 });
        if (googleSignInBtnDisplayed) {
            await this.btnSignInWithGoogle.click();
            await this.btnContinueWithGoogle.waitForClickable({ timeout: 60000 })
            await this.btnContinueWithGoogle.click();
            if (await this.tfEnterMailAddress.isDisplayed({ timeout: 60000 })) {
                await this.tfEnterMailAddress.setValue(username);
                await this.btnNext.click();
                await this.tfEnterPassword.waitForDisplayed({ timeout: 60000 });
                await this.tfEnterPassword.setValue(password);
                await this.btnNext.click();
            }
        }
        await this.byjusNachpayBtn.waitForDisplayed({ timeout: 60000 });
    }

    async customerDetails(data) {
        await this.byjusNachpayBtn.click();
        await this.tfBorrowerFirstName.setValue(data.borrowerFirstName);
        await this.tfBorrowerLastName.setValue(data.borrowerLastName);
        await this.tfEmailAddress.setValue(data.email);
        await this.tfPhoneNumber.setValue(data.phoneNumber);
        await this.ddIdProofType.click();
        await browser.keys(data.idProof);
        await this.tfIdProofNumber.setValue(data.panNumber);
        await this.tfLoanAmout.setValue(data.payableAmount);
        await this.ddLoanTenure.waitForClickable({ timeout: 60000 });
        await this.ddLoanTenure.click();
        await browser.keys(data.loanTenure);
        await this.tfStudentsDob.waitForClickable();
        await this.tfStudentsDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobStudentYear).click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector(data.dobStudentMonth).click();
        await this.ddDobDaySelector(data.dobStudentDate).click();
        await this.ddStudentGrade.click()
        await browser.keys(["5", "Tab"])
        await this.cbToSendOtp.click();
        await this.btnNextTab.click()
        await this.clickOnProceedBtn();
    }

    async enterCustomerAndLoanDetails(data) {
        await this.customerDetails(data)
        //additional details 
        await this.ddOccupationType.waitForClickable({ timeout: 10000 });
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
        await this.tfMothersName.setValue(data.studentMotherName);
        await this.tfStudentName.setValue(data.studentName);
        await this.ddDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobStudentYear).click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector(data.dobStudentMonth).click();
        await this.ddDobDaySelector(data.dobStudentDate).waitForClickable({ timeout: 60000 });
        await this.ddDobDaySelector(data.dobStudentDate).click();
        // School details 
        await this.btnLocateSchool.click()
        await browser.pause(5000)
        await this.tfSchoolLocation.waitForDisplayed({ timeout: 20000 })
        await this.tfSchoolLocation.waitForExist({ timeout: 30000 })
        await this.tfSchoolLocation.setValue(data.SchoolLocation)
        await browser.keys("Enter")
        // 2 seconds wait to load school names
        await browser.pause(2000)
        await this.ddSchoolName.waitForExist({ timeout: 20000 })
        await this.ddSchoolName.click()
        await browser.keys("Tab")
        await this.btnConfirmStudentDetails.waitForDisplayed({ timeout: 10000 })
        await this.btnConfirmStudentDetails.click()
        await this.ddSchoolFee.waitForExist({ timeout: 10000 })
        await this.ddSchoolFee.click()
        await browser.keys(data.schoolFeeBand);
        await this.ddStudentRelation.click()
        await browser.keys(["F", "a", "Tab"]);
        await this.cbToSendOtp.click();
        await this.btnSubmitTab.waitForClickable({ timeout: 6000 });
        await this.btnSubmitTab.click();
        await this.btnResendOtp.waitForDisplayed({ timeout: 30000 })
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

    async returnAppId(panNumber) {
        await this.btnbyjusNachHistory.click();
        await this.btnbyjusNachUnprocessed.click();
        await browser.refresh();
        let appId = await this.getAppId(panNumber).getText();
        return appId;

    }

    async uploadBankStatement() {
        await this.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        await this.rbBankStatementPassbook.click();
        await this.ddBankStatementSource.click();
        await browser.keys(["E", "m", "a", "i", "l", "Tab"])
        await this.rbUploadDocument.waitForClickable({ timeout: 10000 });
        await this.rbUploadDocument.click();
        try {
            const path = require('path');
            const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
            console.log(">>>>>File path " + filePath + "");
            /* Uploading files with Webdriver.io
             var filePath = path.join('/path/to/file/on/machine/which/runs/tests');
             var remoteFilePath = browser.uploadFile(filePath);
             $("input[type='file']").setValue(remoteFilePath); */
            var remoteFilePath = await browser.uploadFile(filePath);
            await this.btnChooseFile.setValue(remoteFilePath);
            //await this.btnChooseFile.setValue(filePath);
            console.log(">>>>>File choosen");
        }
        catch { }
        await this.btnUploadFile.waitForClickable({ timeout: 10000 });
        await this.btnUploadFile.click();
        console.log(`>>>>>File Uploaded`);
        await this.cbToContinueBankStatement.click();
        await this.btnContinue.click();
        await this.ddNameTitle.waitForClickable({ timeout: 20000 });
        await this.ddNameTitle.click();
        await browser.keys(["M", "r", "Tab"]);
        await this.tfCustomerName.waitForClickable({ timeout: 20000 });
        await this.tfCustomerName.setValue("Dummy customer name");
        await this.tfAccountNumber.setValue("429678591535");
        await this.ddAccountType.click();
        await browser.keys(["S", "a", "v", "Tab"]);
        await this.ddBankName.click();
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        await this.btnBankBranch.waitForDisplayed({ timeout: 60000 });
        await this.btnBankBranch.waitForClickable({ timeout: 60000 });
        await this.btnBankBranch.click();
        await this.rbBankBranch.click();
        await this.btnSelectBranch.click();
        await this.btnContinue.waitForClickable({ timeout: 10000 });
        await this.btnContinue.click();
        await this.rbUploadDocument.waitForClickable({ timeout: 10000 });
        await this.rbUploadDocument.click();
        await this.uploadPassbookImages();
        await this.btnNextPage.click();
    }

    async fillAccountDetails() {
        await this.ddNameTitle.click();
        await browser.keys(["M", "r", "Tab"]);
        await this.tfCustomerName.setValue("Dummy customer name");
        await this.tfAccountNumber.setValue("429678591535");
        await this.ddAccountType.click();
        await browser.keys(["S", "a", "v", "Tab"]);
        await this.ddBankName.click();
        await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
        await this.btnBankBranch.waitForClickable({ timeout: 60000 });
        await this.btnBankBranch.click();
        await this.rbBankBranch.click();
        await this.btnSelectBranch.click();
        await this.btnContinue.waitForClickable({ timeout: 10000 });
        await this.btnContinue.click();

    }

    async lmsAbbTicketApproval(username, password, appId, data) {
        await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
        // Takes to time load LMS login portal .
        await browser.pause(8000);
        try { await this.btnSignInWithGoogleLms.waitForExist({ timeout: 60000 }) }
        catch { }
        let signInBtn = await this.btnSignInWithGoogleLms.isDisplayed();
        if (signInBtn) {
            await this.btnSignInWithGoogleLms.click();
            await this.btnContinueWithGoogle.click();
            if (await this.tfEnterMailAddress.isDisplayed({ timeout: 5000 })) {
                await this.tfEnterMailAddress.setValue(username);
                await this.btnNext.click();
                await this.tfEnterPassword.waitForDisplayed({ timeout: 5000 });
                await this.tfEnterPassword.setValue(password);
                await this.btnNext.click();
            }
        }
        await this.btnManageUtilities.waitForExist({ timeout: 30000 });
        await this.btnManageUtilities.click();
        await this.btnAbbTicket.click();
        await this.btnAbbTicketSearchBox.waitForExist({ timeout: 10000 })
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnOpenAppId(appId).waitForClickable();
        await this.btnOpenAppId(appId).click();
        await this.tfMinimumBalance.waitForExist({ timeout: 10000 });
        await this.tfMinimumBalance.setValue(data.randomNum6digits);
        await this.tfMaximumBalance.setValue(data.randomNum8digits);
        await browser.keys("Tab");
        await this.btnSaveSheet.waitForClickable({ timeout: 90000 });
        await this.btnSaveSheet.click();
        await browser.pause(5000)
        await this.ddLoanStatus.waitForDisplayed({ timeout: 30000 })
        await this.ddLoanStatus.click();
        await browser.keys(["A", "p", "p", "Tab"]);
        if (await this.rbHighRisk.isClickable() == false) {
            await this.ddLoanStatus.click();
            await browser.keys(["A", "p", "p", "Tab"]);
        }
        await this.rbHighRisk.click();
        await this.btnSubmit.click();
        //2 seconds wait for Abb ticket status to be changed as approved 
        await browser.pause(2000);
    }

    async selectEmiDateAndApproveLoanAgreement() {
        await this.ddfirstEmiDate.waitForClickable({ timeout: 30000 });
        await this.ddfirstEmiDate.waitForExist({ timeout: 30000 });
        await this.ddfirstEmiDate.click();
        await browser.keys("Tab");
        await this.btnContinue.click();
        await this.btnContinue.waitForEnabled({ timeout: 3000 });
        await this.btnContinue.click();
    }

    async verifyOKYC() {
        await this.nextButton.waitForExist({ timeout: 30000 })
        await this.nextButton.click()
        await this.rbPhysicalNach.click();
        await this.cbToPNACH.click();
        await this.btnGeneratePNACH.click();
    }
    async submitFeedback() {
        await this.btnNoTab.waitForClickable({ timeout: 20000 })
        await this.btnNoTab.click()
        await this.ddSelectReason.waitForClickable({ timeout: 20000 })
        await this.ddSelectReason.click()
        await browser.keys(["O", "t", "h", "Tab"])
        await this.btnSubmitTab.waitForClickable({ timeout: 20000 })
        await this.btnSubmitTab.click()
    }
    async lmsVerifyDocuments(appId) {
        await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
        try { await this.btnSignInWithGoogleLms.waitForExist({ timeout: 30000 }) }
        catch { }
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
        await this.btnUnprocessedByjusnach.click();
        if (await this.btnDocumentVarificationLink(appId).isDisplayed() == false) {
            await browser.refresh();
        }
        await this.btnDocumentVarificationLink(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVarificationLink(appId).click();
        await this.verifyDocuments();
        await this.btnDocVerified.click();
        await this.submitFeedback()
    }
    async lmsVerifyDocumentsForFinOpsApproved(appId) {
        await browser.pause(8000)
        await this.btnManageLoan.waitForExist({ timeout: 30000 });
        await this.btnManageLoan.click();
        await this.btnprocessedByjusnach.waitForDisplayed();
        await this.btnprocessedByjusnach.click();
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
        await this.btnprocessedByjusnach.waitForDisplayed();
        await this.btnprocessedByjusnach.click();
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
}
export default new ByjusNachPage();
