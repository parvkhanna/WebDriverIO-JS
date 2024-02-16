import BasePage from '../gateway_payments_page/base.page';
import mongoConnect from "../../utils/mongoconnect";
import { kotakData } from '../../data/kotak.loanform.data';
import TLPOrderPage from './tlp.order.Page';
class KotakPage extends BasePage {

    //*-- Customer and loan details page locators--*//
    get btnSignInWithGoogle() { return $("//button[text()=' Sign In With Google']") }
    get btnContinueWithGoogle() { return $("(//button[@name='googleSignUpButton'])[2]") }
    get tfEnterMailAddress() { return $("//input[@id='identifierId']") }
    get btnNext() { return $("//span[text()='Next']/..") }
    get tfEnterPassword() { return $("//input[@type='password']") }
    get btnKotakPay() { return $("a[href='/kotak']>button") }
    get btnSkipUploadDocument() { return $("//button[text()='Skip Extract Page']") }
    get tfTLpInitiatedAppId() {return $("//input[@name='previousAppId']")}
    get btnEnableWebApp() {return $("//button[normalize-space()='Enable Web App']")}
    get borrowerfirstName() { return $("[label='Borrower First Name']") }
    get borrowerlastname() { return $("[label='Borrower Last Name']") }
    get cbToSendOtp() { return $("input[class*='form-check-input']") }
    get btnNextTab() { return $("button.btn.btn-success") }
    geterrorMSGfromFieldElement(fieldText) { return $(`input[name='${fieldText}']+div`) }
    geterrorMSGfromDropDown(errorMSG) { return $(`//small[text()='${errorMSG}']`) }
    getErrorMSGfromLabel(address) { return $(`textarea[name='${address}']+div`) }
    get btnNextpg() { return $("(//button[text()='Next'])[1]") }
    get btnSendOtpTab() { return $("//button[normalize-space()='Send OTP']") }
    get btnVerifyOtp() { return $("//button[normalize-space()='Verify OTP']") }
    get tfPanNumber() { return $('input[name="panNo"]') }
    get ddDobYear() { return $("span[class*=year-read-view--down]") }
    get ddDobMonth() { return $('span[class*=month-read-view--down]') }
    get tfdob() { return $('input[name="dateOfBirth"]') }
    ddDobYearSelector(year) { return $("//div[text()='" + year + "']") }
    ddDobmonthSelector(month) { return $(`//div[text()='${month}']`) }
    ddDobDaySelector(day) { return $(`//div[@aria-label='day-${day}']`) }
    get ddGender() { return $("//label[@for='Gender']/../div/div") }
    getGenderOptions(index) { return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`) }
    get tfmobileNumber() { return $('input[name="telephoneNumber"]') }
    get tfemailAddress() { return $('input[name="emailAddress"]') }
    get tffathername() { return $('input[name="fathersName"]') }
    getEducationOptions(index) { return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`) }
    getEmploymentOptions(index) { return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`) }
    get tfAddress() { return $('input[name="addressLine1"]') }
    get tfLandMark() { return $('input[name="landmark"]') }
    get tfPincode() { return $('input[name="pinCode"]') }
    get ddState() { return $('//label[@for="State"]/../div/div') }
    get ddCity() { return $('//label[@for="City"]/../div/div') }
    get ddLoanTenure() { return $('//label[@for="Loan Tenure"]/../div/div') }
    getLoanTenureOptions(index) { return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`) }
    get tfloanAmount() { return $('input[name="requestedLoanAmount"]') }
    get tfProductName() { return $('input[name="productName"]') }
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
        return $("input[name='studentName']")
    }
    get tfStudentsDob() {
        return $("input[name='studentDob']")
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
    get errorMsgSamePan() { return $('[class="modal-body"]') }
    get btnKotakHistory() { return $("//a[@href='/kotak']/..//button[text()='History']") }
    get btnKotakUnprocessed() { return $("//a[@href='/kotak']/..//div/a[text()='Unprocessed']") }

    //*-- Check cibil score page locators--*//
    get btnProceed() {
        return $("//button[text()='Proceed']")
    }
    get btnResendOtp() {
        return $("//button[text()='Resend OTP']")
    }
    get btnCheckCreditBureauScore() {
        return $("//button[normalize-space()='Check Credit Bureau Score']")
    }
    get tfEnterOtp() {
        return $("//input[@name='otp']")
    }
    get errorMsgForOtp() {
        return $("div[role='alert']>ul>li")
    }

    //*--Kotak loan status page locators--*//

    getAppId(panNumber) {
        return $("(//span[text()='" + panNumber + "']/../../preceding-sibling::p)[2]//span[2]")
    }
    btnResume(appId) {
        return $(`//a[@href='/kotak?appId=${appId}']`)
    }
    get btnContinue() {
        return $("//button[contains(text(),'Continue')]")
    }

    //*--Uploan bank statement page locators--*//

    get uploadBankStatement2Photo() {
        return $("(//input[@name='uploadType'])[3]")
    }
    get rbBankStatementPassbook() {
        return $("//h5[text()='Bank Statement Passbook(2 photos)']")
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
    get btnUploadFile() {
        return $("(//button[@type='button'])[4]")
    }
    get btnUploadPersonalDocument() {
        return $("//button[normalize-space()='Upload']")
    }
    get cbToContinueBankStatement() {
        return $("input[type='checkbox']")
    }
    get cbToBankStatement() {
        return $("(//input[@class='form-check-input'])[6]")
    }
    get btnContinueBankStatementPage() {
        return $("//button[@class='btn btn-success' and contains(text(),' Continue ')]")
    }
    get otpErrorMsg() {
        return $("div[role='alert'] ul")
    }
    get ddNameTitle() {
        return $("//div[@class='css-1hwfws3']")
    }
    getTitlteList(index) {
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
    get btnBankBranch() {
        return $("//button[text()='Search Branch']")
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
    get btnSelectBranch() {
        return $("//button[text()='Select']")
    }
    get rbUploadDocuments() {
        return $("//label[normalize-space()='Upload Document']")
    }
    get btnUploadDocuments() {
        return $("//button[@class='mt-2 btn btn-success']")
    }
    getErrorMsgElement(fieldName) {
        return $(`//input[@name='${fieldName}']/../div[@class='invalid-feedback']`);

    }
    getErrorMsgUsingElementText(elementText) {
        return $(`//small[@class='form-text text-danger' and contains(text(),'${elementText}')]`)
    }
    getErrorMsgElementByLabel(fieldName) {
        return $(`//label[@for="${fieldName}"]//following-sibling::div[@class='invalid-feedback']`);
    }
    get btnNextPage() {
        return $("//button[contains(text(),'Next Page')]")
    }

    get btnAddMorePhoto() {
        return $("button[title='Upload More Documents']")
    }

    //*--Waiting for Ops team approval page locators--*//
    get popUpAbbTicketCreated() {
        return $("div.ant-notification-notice-message")
    }
    //*--LMS page locators--*//

    get btnSignInWithGoogleLms() {
        return $("//button[normalize-space()='Sign In With Google']")
    }

    get btnManageUtilities() {
        return $("a[href='/manage-utilities']")
    }

    get btnAbbTicket() {
        return $("//p[text()='ABB Tickets']")
    }

    get btnAbbTicketSearchBox() {
        return $("//input[@name='searchText']")
    }

    btnOpenAppId(appId) {
        return $("//div[text()='" + appId + "']")
    }

    get tfMinimumBalance() {
        return $("//tr[@role='row']/td[3]/input")
    }
    get tfMaximumBalance() {
        return $("//tr[@role='row']/td[4]/input")
    }

    get btnSaveSheet() {
        return $("//button[text()='Save Sheet']")
    }

    get rbHighRisk() {
        return $("//input[@name='highRisk'  and @value='low']")
    }
    get ddLoanStatus() {
        return $("//label[text()='Loan status']/../div")
    }
    get applicantsResponse(){ return $("(//div[@class='Select-placeholder'])[1]")}

    get btnSubmit() {
        return $("//button[text()='Submit']")
    }

    get waitingTimer() {
        return $("div[id='timer']")
    }
    get ErrorMsgLmsPortal() {
        return $("//span[text()='Please enter all required details!']")
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
    get labelBorrowerFirstName() {
        return $("label[for='Enter Borrower First Name as per selected POI']")
    }



    // **-- Upload documents page --**//

    get tfBorrowerFirstNamePOI() {
        return $("//input[@name='firstName']")
    }

    get tfBorrowerlastNamePOI() {
        return $("//input[@name='lastName']")
    }
    get tfPOINumber() {
        return $("//input[@name='number']")
    }
    get ddPOIType() {
        return $("//div[@class='css-1hwfws3']")
    }
    get txtPOInumber() {
        return $("//label[@for='Enter POA Number']")
    }
    get ddPOAType() {
        return $("//div[@class='css-1hwfws3']")
    }

    //**-- Esign page locators --**//

    get cxTosignAgreementPopup() {
        return $("//div[@id='rcDialogTitle0']")
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

    //**-- LMS portal locators --**//

    get popUpLoanStatus() {
        return $("//p[contains(text(),'Documents Verified')]")
    }
    get popUpApprovalStatus() {
        return $("div.s-alert-box-inner>span")
    }
    get btnManageLoan() {
        return $("//a[@href='/manage-loan']")
    }
    btnDocumentVarificationLink(appId) {
        return $("//a[@href='/manage-loan/unprocessed/kotak/approveLoan/docapproved/" + appId + "']")
    }
    btnDocumentVerificationLinkProcessed(appId) {
        return $(`//a[contains(@href,'${appId}')]`)
    }


    get btnUnprocessedKotak() {
        return $("//a[@href='/manage-loan/unprocessed/kotak']")
    }
    get btnDocVerified() {
        return $("//button[contains(text(),'Doc Verified')]")
    }
    getDocumentsList(list) {
        return $(`(//input[@class='form-check-input'])[${list}]`)
    }
    get btnApprove() {
        return $("//button[normalize-space()='Approve']")
    }

    get ddLmsTitle() {
        return $("div.Select-placeholder")
    }
    get btnPreview() {
        return $("//button[contains(text(),' Preview')]")
    }

    get btnKotakProcessed() {
        return $("a[href='/manage-loan/processed/kotak']")
    }

    get btnClosePopUp() {
        return $("(//button[normalize-space()='Close'])[2]")
    }

    get btnDocVerifyAndFinOpsApprove() {
        return $("//button[normalize-space()='Doc Verify & Fin Ops Approve']")
    }
    get btnPicApprove() {
        return $("//button[normalize-space()='PIC Approve']")
    }
    get btnCreateLoan() {
        return $("//button[normalize-space()='Create Loan']")
    }


    async loginPaymentPage(username, password) {
        //5 seconds Wait till all elements present on page .
        await browser.pause(10000);
        let googleSignInBtnSignIned = await this.btnSignInWithGoogle.isDisplayed({ timeout: 30000 });
        if (googleSignInBtnSignIned) {
            await this.btnSignInWithGoogle.click();
            await this.btnContinueWithGoogle.click();
            if (await this.tfEnterMailAddress.isDisplayed({ timeout: 25000 })) {
                await this.tfEnterMailAddress.setValue(username);
                await this.btnNext.click();
                await this.tfEnterPassword.waitForDisplayed({ timeout: 25000 });
                await this.tfEnterPassword.setValue(password);
                await this.btnNext.click();
            }
        }
    }
    async customerDetails(data,appId) {
        await this.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        await this.btnSkipUploadDocument.click();
        await this.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        await this.tfTLpInitiatedAppId.setValue(appId);
        await this.btnEnableWebApp.waitForClickable({ timeout: 22000 })
        await this.btnEnableWebApp.click()
        await browser.pause(10000)
        await this.borrowerfirstName.setValue(data.borrowerFirstName)
        await this.borrowerlastname.setValue(data.borrowerLastName)
        await this.tfdob.waitForEnabled({ timeout: 60000 })
        await this.tfdob.click()
        await this.ddDobYear.click()
        await this.ddDobYearSelector(data.dobYear).click()
        await this.ddDobMonth.click()
        await this.ddDobmonthSelector(data.dobMonth).click()
        await this.ddDobDaySelector(data.dobDate).click()
        await this.ddGender.click()
        await browser.keys(data.gender)
        await this.tfemailAddress.setValue(data.email)
        await this.tffathername.waitForClickable({ timeout: 20000 })
        await this.tffathername.setValue(data.fathername)
        await this.tfAddress.setValue(data.borrowerAddress)
        await this.tfLandMark.setValue(data.borrowerAddress)
        await this.tfPincode.setValue(data.Pincode)
        await this.tfloanAmount.setValue(data.payableAmount)
        await this.ddLoanTenure.waitForClickable({ timeout: 30000 })
        await this.ddLoanTenure.click()
        await browser.keys(data.loanTenure)
        await this.tfProductName.setValue(data.productName)
        await this.ddStudentGrade.click();
        await browser.keys(["5", "Tab"])
        await this.cbToSendOtp.waitForClickable({timeout:5000})
        await this.cbToSendOtp.click();
        await this.btnNextpg.click();
        await this.clickOnProceedButton();

    }

    async createTlpAppId(data)
    {
        let loanVendor = "kotak"
        let dataId = await mongoConnect.tlPayAppIdCreation(data.panNumber);
        let appId = dataId[0];
        let kartLeadId = dataId[1];
        await TLPOrderPage.createTlpObject(appId);
        await TLPOrderPage.updatePermitRequest(appId, kartLeadId);
        await TLPOrderPage.openUrlWithKartId(kartLeadId, loanVendor);
        return appId;
    }

    async enterCustomerAndLoanDetails(data) {
        let appId = await this.createTlpAppId(kotakData.kotakValidDetails);
        await this.customerDetails(data,appId);
        await this.tfAlternateMobileNo.setValue("8208233456");
        await this.btnSendOtpTab.waitForClickable({timeout:15000});
        await this.btnSendOtpTab.click();
        await this.updateAlternateNumberOtp(kotakData.kotakValidDetails)
        await this.ddOccupationType.waitForClickable({ timeout: 30000 })
        await this.ddOccupationType.click();
        await browser.keys(["S", "t", "Tab"]);
        await this.ddQualification.click();
        await browser.keys(["G", "r", "a", "Tab"]);
        await this.tfIncome.setValue("20000");
        await this.ddMartialStatus.click();
        await browser.keys(["S", "Tab"])
        await this.ddResidenceType.click()
        await browser.keys(["O", "w", "Tab"])
        await this.tfStudentsName.setValue(data.studentsName);
        await this.tfMothersName.setValue(data.motherName);
        await this.tfStudentsDob.waitForClickable();
        await this.tfStudentsDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobYear).click();
        await this.ddDobMonth.click();
        await this.ddDobmonthSelector(data.dobMonth).click();
        await this.ddDobDaySelector(data.dobDate).click();
        await this.btnLocateSchool.click()
        await this.tfSchoolLocation.waitForDisplayed({ timeout: 20000 })
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
        await browser.keys(["F", "a", "Tab"])
        await this.cbToSendOtp.click();
        await this.btnSubmit.click();
        await this.btnResendOtp.waitForDisplayed({ timeout: 60000 })
        return data.panNumber;
    }
    async clickOnProceedButton() {
        // Try catch is implemented due to unexpected behaviour of proceed button i.e. sometimes the button appears sometime it dosen't
        try { await this.btnProceed.waitForDisplayed({ timeout: 15000 }) }
        catch { }
        if (await this.btnProceed.isDisplayed()) {
            await this.btnProceed.waitForClickable({ timeout: 20000 })
            await this.btnProceed.click();
            await this.tfMothersName.waitForExist({ timeout: 60000 })
        }
        else {
            await this.tfMothersName.waitForExist({ timeout: 60000 })

        }

    }

    async updateAlternateNumberOtp(data) {
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        await this.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        let appId = await this.returnAppId(data.panNumber);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[0]);
        await browser.closeWindow();
        await browser.switchToWindow(handles[1]);
        await mongoConnect.updateAlternateNumberOtp(appId);
        await browser.refresh();
        await this.btnResume(appId).click();
        await this.btnContinue.waitForClickable({ timeout: 60000 })
        await this.btnContinue.click({ timeout: 15000 })
    }
    async returnAppId(panNumber) {

        await this.btnKotakHistory.waitForClickable({timeout:20000});
        await this.btnKotakHistory.click();
        await this.btnKotakUnprocessed.waitForClickable({timeout:20000})
        await this.btnKotakUnprocessed.click();
        await browser.refresh();
        let appId = await this.getAppId(panNumber).getText();
        return appId;

    }
    async verifyDocuments() {
        //  verify all the documents in LMS portal
        for (let i = 1; i <= 10; i++) {

            await this.getDocumentsList(i).waitForDisplayed({ timeout: 30000 });
            if (this.getDocumentsList(i).isClickable() == false) {
                await this.getDocumentsList(i).scrollIntoView();
                await this.getDocumentsList(i).waitForClickable({ timeout: 30000 })
                await this.getDocumentsList(i).click();
            }
            await this.getDocumentsList(i).click()
            // wait for documents to upload to avoid click intercepted exception
            await browser.pause(2000);
        }
        await this.btnApprove.waitForExist({ timeout: 20000 })
        await this.btnApprove.waitForClickable({ timeout: 20000 })
        await this.btnApprove.click()

    }
    async uploadPassbookImages() {
        // uploading one pancard image three times for bank passbook images
        for (let i = 0; i < 3; i++) {
            try {
                const path = require('path');
                const filePath = path.join(process.cwd(), process.env.VOTER_ID_CARD_IMAGE_PATH);
                await this.btnChooseFile.waitForDisplayed({ timeout: 10000 })
                await this.btnChooseFile.setValue(filePath);
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
    async uploadBankStatement() {
        await this.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        await this.rbBankStatementPassbook.click();
        await this.ddBankStatementSource.click();
        await browser.keys(["E", "m", "a", "i", "l", "Tab"])
        await this.rbUploadDocument.click();
        try {
            const path = require('path');
            const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
            await this.btnChooseFile.setValue(filePath);
        }
        catch { }
        await this.btnUploadFile.click();
        await this.cbToContinueBankStatement.click();
        await this.btnContinue.click();
        await this.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        await this.rbBankStatementPassbook.click();
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
        await this.rbUploadDocument.waitForClickable({ timeout: 10000 });
        await this.rbUploadDocument.click();
        await this.uploadPassbookImages();
        await this.btnNextPage.click();
    }
    async lmsAbbTicketApproval(username, password, appId, data) {
        await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
        // Takes to time load LMS login portal .
        await browser.pause(10000);
        try { await this.btnSignInWithGoogleLms.waitForExist({ timeout: 40000 }) }
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
        await this.applicantsResponse.waitForClickable({timeout:10000})
        await this.applicantsResponse.click()
        await browser.keys(["A","g","r","e","e","Tab"]);
        await this.ddLoanStatus.waitForClickable({ timeout: 20000 });
        await this.ddLoanStatus.click();
        await browser.keys(["A", "p", "p", "Tab"]);
        if (await this.rbHighRisk.isClickable() == false) {
            await this.ddLoanStatus.click();
            await browser.keys(["A", "p", "p", "Tab"]);
        }
        await this.btnSubmit.click();
        //2 seconds wait for Abb ticket status to be changed as approved 
        await browser.pause(3000);
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
        await this.rbPhysicalNach.click();
        await this.cbToPNACH.click();
        await this.btnGeneratePNACH.click();
    }
    async uploadPersonalDocuments(data) {
        let visibilityStatusPOI
        let visibilityStatusPOA
        for (let i = 0; i <= 4; i++) {

            const path = require('path')
            const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
            try { await this.tfBorrowerFirstNamePOI.waitForExist({ timeout: 5000 }) }
            catch { }
            visibilityStatusPOI = await this.tfBorrowerFirstNamePOI.isDisplayed();
            visibilityStatusPOA = await this.txtPOInumber.isDisplayed();

            if (visibilityStatusPOI == true) {
                await this.ddPOIType.waitForExist({ timeout: 6000 })
                await this.ddPOIType.click()
                await browser.keys(data.poiType)
                await this.tfBorrowerFirstNamePOI.setValue(data.borrowerFirstName);
                await this.tfBorrowerlastNamePOI.setValue(data.borrowerLastName);
                await this.tfPOINumber.setValue(data.panNumber);
            }

            else if (visibilityStatusPOA == true) {
                await this.ddPOAType.waitForExist({ timeout: 6000 })
                await this.ddPOAType.click();
                await browser.keys(data.poaType);
                await this.tfPOINumber.setValue(data.aadharNumber);
            }

            await this.rbUploadDocument.waitForClickable({ timeout: 60000 });
            await this.rbUploadDocument.click();
            await this.btnChooseFile.waitForClickable({ timeout: 60000 });
            await this.btnChooseFile.setValue(filePath);
            await this.btnUploadPersonalDocument.waitForClickable({ timeout: 60000 });
            await this.btnUploadPersonalDocument.click();
            // sometime page takes time to get loaded
            await browser.pause(3000);

        }
    }
    async lmsVerifyDocuments(appId) {
        await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[0]);
        await browser.closeWindow();
        await browser.switchToWindow(handles[1]);
        let signInBtn = await this.btnSignInWithGoogle.isDisplayed();
        if (signInBtn) {
            await this.btnSignInWithGoogle.click();
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
        await this.btnUnprocessedKotak.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        if (await this.btnDocumentVarificationLink(appId).isDisplayed() == false) {
            await browser.refresh();
        }
        await this.btnDocumentVarificationLink(appId).waitForExist({ timeout: 30000 });
        await this.btnDocumentVarificationLink(appId).click();
        await this.ddLmsTitle.click()
        await browser.keys(["M", "r", "Tab"])
        await this.btnPreview.waitForClickable({ timeout: 20000 })
        await this.btnPreview.click()
        await this.verifyDocuments();
        await this.btnDocVerified.waitForExist({ timeout: 600000 })
        await this.btnDocVerified.click();
        await browser.waitUntil(async () => await this.popUpLoanStatus.getText() == "Loan Status : Documents Verified",
            { timeout: 10000 })
    }

    async lmsVerifyDocumentsForFinOpsApproved(appId) {
        await browser.pause(8000)
        await this.btnClosePopUp.click()
        await this.btnManageLoan.waitForExist({ timeout: 30000 });
        await this.btnManageLoan.click();
        await this.btnKotakProcessed.waitForDisplayed();
        await this.btnKotakProcessed.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await mongoConnect.kotakAddOrderId(appId)
        await browser.refresh()
        await this.btnDocumentVerificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVerificationLinkProcessed(appId).click();
        await this.btnPreview.waitForClickable({ timeout: 20000 })
        await this.btnPreview.click()
        await this.verifyDocuments();
        await this.btnDocVerifyAndFinOpsApprove.click()
        await browser.waitUntil(async () => await this.popUpApprovalStatus.getText() == "AppId : " + appId + " Doc Verify & Fin Ops Approve successfully",
            { timeout: 10000 })
    }

    async lmsVerifyDocumentsForPICApprove(appId) {
        await browser.pause(5000)
        await this.btnManageLoan.waitForExist({ timeout: 30000 });
        await this.btnManageLoan.click();
        await this.btnKotakProcessed.waitForDisplayed();
        await this.btnKotakProcessed.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnDocumentVerificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVerificationLinkProcessed(appId).click();
        await this.btnPreview.waitForClickable({ timeout: 20000 })
        await this.btnPreview.click()
        await this.verifyDocuments();
        await this.btnPicApprove.click()
        await browser.waitUntil(async () => await this.popUpApprovalStatus.getText() == "AppId : " + appId + " PIC Approve successfully",
            {
                timeout: 130000
            })
    }
    async createLoan(appId) {
        await browser.pause(5000)
        await this.btnManageLoan.waitForExist({ timeout: 30000 });
        await this.btnManageLoan.click();
        await this.btnKotakProcessed.waitForDisplayed();
        await this.btnKotakProcessed.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnDocumentVerificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVerificationLinkProcessed(appId).click();
        await this.btnPreview.waitForClickable({ timeout: 20000 })
        await this.btnPreview.click()
        await this.verifyDocuments();
        await this.btnCreateLoan.click()
        await browser.waitUntil(async () => await this.popUpApprovalStatus.isDisplayed() == true,
            {
                timeout: 130000
            })
        let appIdText = await this.popUpApprovalStatus.getText()
        return appIdText;
    }
}
export default new KotakPage()