import BasePage from '../gateway_payments_page/base.page';
import mongoConnect from "../../utils/mongoconnect";
import { getRandomNum } from '../../utils/functions';
import TLPOrderPage from "./tlp.order.Page"

class ByjusAdvantagePage extends BasePage {

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
    get btnNextTab() {
        return $("(//button[contains(text(),'Next')])[1]")
    }
    get tfEnterPassword() {
        return $("input[type='password']")
    }
    get btnSubmit() {
        return $("//button[contains(text(),'Submit')]")
    }
    get btnNoTab() {
        return $("//button[normalize-space()='No']")
    }

    get ddSelectReason() {
        return $("(//div[normalize-space()='Select Reason'])[1]")
    }

    /* Customer and loan details locators */
    get byjusAdvantagepayBtn() {
        return $("a[href='/byjusadvantage']")
    }
    get tfBorrowerFirstName() {
        return $("input[name='applicantFirstName']")
    }
    get tfBorrowerLastName() {
        return $("input[name='applicantLastName']")
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
        return $("input[name='studentName']")
    }
    get tfStudentsDob() {
        return $("input[name='studentDob']")
    }

    get tfEmailAddress() {
        return $("input[name='emailAddress']")
    }
    get tfPhoneNumber() {
        return $("input[name='telephoneNumber']")
    }
    get tfLoanAmout() {
        return $("input[name='requestedLoanAmount']")
    }
    get tfDownPayment() {
        return $("input[name='downPayment']")
    }
    get ddLoanTenure() {
        return $("//label[@for='Tenure']/../div[@class='css-1pcexqc-container']")
    }
    get tfDob() {
        return $("input[name='dateOfBirth']")
    }
    get tfApprovalLoanAmount() {
        return $("input[name='approvedLoanAmount']")
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

    get ddAddressProofType() {
        return $("//label[@for='Address Proof Type']/../div[@class='css-1pcexqc-container']")
    }

    get ddIdProofType() {
        return $("//label[@for='Id Proof Type']/../div[@class='css-1pcexqc-container']")
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
    get ddPanValue() {
        return $("//div[@class='css-kj6f9i-menu']")
    }
    get btnPanFile() {
        return $("input[id='poi_pan']")
    }
    get btnPanUploadFile() {
        return $("//input[@id='poi_pan']/../../../..//button")
    }
    get btnApplicantImageFile() {
        return $("input[id='applicant_photo']")
    }
    get btnApplicantImageUploadFile() {
        return $("//input[@id='applicant_photo']/../../../..//button")
    }

    get ddAdharValue() {
        return $("//div[@class='css-11unzgr']/div[contains(text(),'Aadhaar')]")
    }
    get ddAdharFrontFile() {
        return $("input[id='poaFront_aadhaar']")
    }
    get btnAdharFrontUploadFile() {
        return $("//input[@id='poaFront_aadhaar']/../../../..//button")
    }
    get ddAdharBackFile() {
        return $("input[id='poaBack_aadhaar']")
    }
    get btnAdharBackUploadFile() {
        return $("//input[@id='poaBack_aadhaar']/../../../..//button")
    }
    get btnSubmit() {
        return $("//button[(text()='Submit')]")
    }
    get ddVoterIdValue() {
        return $("//div[@class='css-11unzgr']/div[contains(@id,'option-1')]")
    }
    get ddVoterFrontFile() {
        return $("input[id='poaFront_voterId']")
    }
    get btnVoterFrontUploadFile() {
        return $("//input[@id='poaFront_voterId']/../../../..//button")
    }
    get ddVoterBackFile() {
        return $("input[id='poaBack_voterId']")
    }
    get btnVoterBackUploadFile() {
        return $("//input[@id='poaBack_voterId']/../../../..//button")
    }

    get ddPassportValue() {
        return $("//div[@class='css-11unzgr']/div[contains(text(),'Passport')]")
    }
    get ddPassportFrontFile() {
        return $("input[id='poaFront_passport']")
    }
    get btnPassportFrontUploadFile() {
        return $("//input[@id='poaFront_passport']/../../../..//button")
    }
    get ddPassportBackFile() {
        return $("input[id='poaBack_passport']")
    }
    get btnPassportBackUploadFile() {
        return $("//input[@id='poaBack_passport']/../../../..//button")
    }

    get tfIdProofNumber() {
        return $("input[name='idProofNumber']")
    }

    get tfAddressProofNumber() {
        return $("input[name='addressProofNumber']")
    }

    get cbToSendOtp() {
        return $("input[class*='form-check-input']")
    }
    get btnSendOtp() {
        return $("//button[normalize-space()='Send OTP']")
    }
    get btnCheckEmandate() {
        return $("//button[contains(text(),'Check E-Mandate Eligibility')]")
    }
    get btnBankBranch() {
        return $("//input[@name='branch']")
    }
    get rbBankBranch() {
        return $("//td[text()='ABHY0065001']/..//input")
    }
    get btnSelectBranch() {
        return $("//button[text()='Select']")
    }
    get btnConfirmAndContinue() {
        return $("//button[normalize-space()='Confirm and Continue']")
    }
    get ddBankName() {
        return $("//label[@for='Bank Name']/..//div[@class='css-1hwfws3']")
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
    get btnByjusAdvantageHistory() {
        return $("//a[@href='/byjusadvantage']/..//button[text()='History']")
    }

    get btnByjusAdvantageHistoryUnprocessed() {
        return $("//a[@href='/byjusadvantage']/..//div/a[text()='Unprocessed']")
    }

    getBtnResume(appId) {
        return $(`//a[contains(@href, '${appId}')]`)
    }

    getAppId(panNumber) {
        return $("(//span[text()='" + panNumber + "']/../../preceding-sibling::p)[2]//span[2]")
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

    get ddSelectEmiDate() {
        return $("//label[@for='First EMI Date']/../div/div")
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

    /* E-nach page */

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
    get btnProceed() {
        return $("//button[text()='Proceed']")
    }
    /* LMS Page Locators */
    get btnManageLoan() {
        return $("//a[@href='/manage-loan']")
    }
    get btnUnprocessedByjusAdvantage() {
        return $("//a[@href='/manage-loan/unprocessed/byjusadvantage']")
    }

    get btnProcessedByjusAdvantage() {
        return $("//a[@href='/manage-loan/processed/byjusadvantage']")
    }
    get btnApproveTab() {
        return $("//button[normalize-space()='Approve']")
    }
    get btnAbbTicketSearchBox() {
        return $("//input[@name='searchText']")
    }
    btnDocumentVerificationLinkProcessed(appId) {
        return $(`//a[contains(@href,'${appId}')]`)
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
    get btnPreview() {
        return $("//button[contains(text(),'Preview')]")
    }

    getDocumentsListCb(list) {
        return $(`(//input[@class='form-check-input'])[${list}]`)
    }
    get btnApprove() {
        return $("//button[contains(text(),'APPROVE')]")
    }

    get btnDocReceivedAndFinOpsApprove() {
        return $("//button[normalize-space()='Doc Received & Fin Ops Approve']")
    }
    get btnDocVerified() {
        return $("//button[contains(text(),'Doc Verified')]")
    }
    get tfTLpInitiatedAppId() {
        return $("//input[@name='previousAppId']")
    }

    get btnEnableWebApp() {
        return $("//button[normalize-space()='Enable Web App']")
    }
    get txtLoanStatus() {
        return $("//div[@class='ant-spin-container']/div/div/p[2]")
    }
    get txtAppId() {
        return $("//div[@class='ant-spin-container']/div/div/p[1]")
    }
    get popUpLoanApproved() {
        return $('div.s-alert-box-inner>span')
    }
    getDocumentsList(list) {
        return $(`(//span[@class='MuiTab-wrapper'])[${list}]`)
    }
    cbVerify(num) {
        return $("(//input[@type='checkbox'])[" + num + "]")
    }
    btnDocumentVarificationLink(appId) {
        return $("//a[@href='/manage-loan/unprocessed/byjusadvantage/approveLoan/docapproved/" + appId + "']")
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

    get eNachErrorMsg() {
        return $("//div[contains(@class, 'alert-danger')]")
    }

    getExtractData(elementText) {
        return $(`//div[contains(text(), '${elementText}')]`)
    }

    get accountNameMsg() {
        return $("//div[@class='card-footer']//div[contains(text(), 'Applicant Name is not Matching With Bank Details, Account Holder Name: Dummy Customer Name')]")

    }


    async uploadPanImages(fileName = process.env.PAN_CARD_IMAGE_PATH, acceptingError = false) {
        await this.ddIdProofType.click();
        await browser.keys(['P', 'A', 'Tab'])
        await this.uploadFile(fileName, this.btnPanFile, this.btnPanUploadFile);
        await this.uploadFile(fileName, this.btnApplicantImageFile, this.btnApplicantImageUploadFile);
        if (!acceptingError) {
            await this.btnConfirmAndContinue.waitForClickable({ timeout: 20000 });
            await this.btnConfirmAndContinue.click();
        }
    }

    async selectAndUploadAddressProof(acceptingError = false) {
        await this.ddAddressProofType.waitForClickable({ timeout: 20000 });
        await this.ddAddressProofType.click();
        await this.ddAdharValue.waitForDisplayed({ timeout: 15000 });
        await this.ddAdharValue.click();
        await this.ddAdharFrontFile.waitForClickable({ timeout: 20000 })
        await this.uploadFile(process.env.AADHAR_CARD_IMAGE_PATH, this.ddAdharFrontFile, this.btnAdharFrontUploadFile);
        await this.ddAdharBackFile.waitForClickable({ timeout: 60000 })
        await this.uploadFile(process.env.AADHAR_BACK_CARD_IMAGE_PATH, this.ddAdharBackFile, this.btnAdharBackUploadFile);
        if (!acceptingError) {
            await this.btnConfirmAndContinue.waitForClickable({ timeout: 20000 });
            await this.btnConfirmAndContinue.click();
        }
    }

    async selectAndUploadAddressProofPassport(acceptingError = false) {
        await this.ddAddressProofType.click();
        await browser.keys(["P", "a", "s", "Tab"])
        await this.ddPassportFrontFile.waitForClickable({ timeout: 20000 })
        await this.uploadFile(process.env.PASSPORT_FRONT, this.ddPassportFrontFile, this.btnPassportFrontUploadFile);
        await this.ddPassportBackFile.waitForClickable({ timeout: 60000 })
        await this.uploadFile(process.env.PASSPORT_BACK, this.ddPassportBackFile, this.btnPassportBackUploadFile);
        if (!acceptingError) {
            await this.btnConfirmAndContinue.waitForClickable({ timeout: 10000 });
            await this.btnConfirmAndContinue.click();
        }
    }

    async selectAndUploadAddressProofVoterID(acceptingError = false) {
        await this.ddAddressProofType.click();
        await browser.keys(["V", "o", "t", "Tab"])
        await this.ddVoterFrontFile.waitForClickable({ timeout: 20000 })
        await this.uploadFile(process.env.VOTER_ID_CARD_IMAGE_PATH, this.ddVoterFrontFile, this.btnVoterFrontUploadFile);
        await this.ddVoterBackFile.waitForClickable({ timeout: 60000 })
        await this.uploadFile(process.env.VOTER_ID_BACK_CARD_IMAGE_PATH, this.ddVoterBackFile, this.btnVoterBackUploadFile);
        if (!acceptingError) {
            await this.btnConfirmAndContinue.waitForClickable({ timeout: 10000 });
            await this.btnConfirmAndContinue.click();
        }
    }
    async uploadFile(fileName, inputFileLocator, uploadBtnLocator) {
        try {
            const path = require('path');
            const filePath = path.join(process.cwd(), fileName);
            await inputFileLocator.waitForClickable({ timeout: 20000 })
            await inputFileLocator.setValue(filePath);
            await uploadBtnLocator.waitForClickable({ timeout: 20000 });
            await uploadBtnLocator.click();
        }
        catch { }
    }

    async loginPaymentPage(username, password) {
        await browser.pause(5000);
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
        await this.byjusAdvantagepayBtn.waitForExist({ timeout: 60000 });
    }

    async customerDetails(data) {
        await this.tfBorrowerFirstName.setValue(data.borrowerFirstName);
        await this.tfBorrowerLastName.setValue(data.borrowerLastName);
        await this.tfEmailAddress.setValue(data.email);
        await this.tfPhoneNumber.setValue(data.phoneNumber);
        await this.tfDownPayment.setValue(data.downPayment);
        await this.tfLoanAmout.setValue(data.payableAmount);
        await this.ddLoanTenure.waitForClickable({ timeout: 60000 });
        await this.ddLoanTenure.click();
        await browser.keys(data.loanTenure);
        await this.tfDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobStudentYear).click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector(data.dobStudentMonth).click();
        await this.ddDobDaySelector(data.dobStudentDate).waitForClickable({ timeout: 60000 });
        await this.ddDobDaySelector(data.dobStudentDate).click();
        await this.ddStudentGrade.waitForClickable({ timeout: 25000 })
        await this.ddStudentGrade.click()
        await browser.keys(["5", "Tab"])
        await this.cbToSendOtp.click();
        await this.btnNextTab.click()
        await this.clickOnProceedBtn();
    }

    async enterCustomerAndLoanDetails(data) {
        await this.customerDetails(data)
        //Additional details 
        await this.ddOccupationType.waitForClickable({ timeout: 20000 });
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
        await this.tfMothersName.setValue(data.mothersName);
        await this.tfStudentsName.setValue(data.studentName);
        await this.tfStudentsDob.waitForClickable();
        await this.tfStudentsDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobStudentYear).click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector(data.dobStudentMonth).click();
        await this.ddDobDaySelector(data.dobStudentDate).click();
        // School details 
        await this.btnLocateSchool.click()
        await this.tfSchoolLocation.waitForDisplayed({ timeout: 60000 })
        await this.tfSchoolLocation.setValue(data.SchoolLocation)
        await browser.keys("Enter")
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
        await this.btnSubmit.click()
        await this.btnVerifyOtp.waitForExist({ timeout: 36000 });
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
    async enterBankNameAndBranch(bankName = ["ABHY", "", "Tab"], expectredError = false) {
        // await this.byjusAdvantagepayBtn.click();
        await this.ddBankName.scrollIntoView(false);
        await this.ddBankName.click();
        await browser.keys(bankName)
        await this.btnBankBranch.waitForClickable({ timeout: 60000 });
        await this.btnBankBranch.click();
        await this.rbBankBranch.click();
        await this.btnSelectBranch.click();
        await this.btnCheckEmandate.waitForClickable({ timeout: 10000 });
        await this.btnCheckEmandate.click();
        if (!expectredError) {
            await this.enachProcessMsg.waitForDisplayed({ timeout: 50000 });
        }
    }

    async enterAndUploadCustomerDetails(data) {
        let loanVendor = "byjusadvantage"
        let dataId = await mongoConnect.tlPayAppIdCreation(data.panNumber);
        let tlPayappId = dataId[0];
        let kartLeadId = dataId[1];
        await TLPOrderPage.createTlpObject(tlPayappId)
        await TLPOrderPage.updatePermitRequest(tlPayappId, kartLeadId)
        await TLPOrderPage.openUrlWithKartId(kartLeadId, loanVendor)
        await this.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        await this.tfTLpInitiatedAppId.setValue(tlPayappId)
        await this.btnEnableWebApp.waitForClickable({ timeout: 22000 })
        await this.btnEnableWebApp.click()
        await this.enterBankNameAndBranch();
        await this.uploadPanImages();
        await this.selectAndUploadAddressProof();
        await browser.pause(5000);
        let panNumber = await this.tfIdProofNumber.getValue()
        let addressProofNumber = await this.tfAddressProofNumber.getValue()
        await this.enterCustomerAndLoanDetails(data);
        return { "pan": panNumber, "addressProof": addressProofNumber }
    }

    async returnAppId(panNumber) {
        await this.btnByjusAdvantageHistory.click();
        await this.btnByjusAdvantageHistoryUnprocessed.click();
        let appId = await this.getAppId(panNumber).getText();
        return appId;
    }

    async getAccountDetailsPage(data) {
        let custDetails = await this.enterAndUploadCustomerDetails(data);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        await this.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        let appId = await this.returnAppId(custDetails["pan"]);
        custDetails['appId'] = appId;
        await mongoConnect.updatetransactionsCibilRecord(appId);
        // 5 sec wait to update the details in db
        await browser.pause(5000)
        await browser.refresh()
        await this.getBtnResume(appId).waitForClickable({ timeout: 30000 })
        browser.execute("arguments[0].click();", await this.getBtnResume(appId));
        // Apply wait for 5ms because above click event will open in new tab 
        await this.btnContinue.waitForClickable({ timeout: 20000 });
        await this.btnContinue.click();
        return custDetails
    }

    async enterAccountDetails(accountData, field_validation = false) {
        await this.ddNameTitle.click();
        await browser.keys(accountData["title"]);
        await this.tfCustomerName.setValue(accountData["customerName"]);
        await this.tfAccountNumber.setValue(accountData["accountNumber"]);
        await this.ddAccountType.click();
        await browser.keys(accountData["accountType"]);
        await this.ddSelectEmiDate.waitForExist({ timeout: 60000 });
        await this.ddSelectEmiDate.click();
        await browser.keys("Tab");
        if (!field_validation) {
            await this.btnContinue.click();
        }
    }

    async getNachMandatePage(data, accountData) {
        let custDetails = await this.getAccountDetailsPage(data);
        await this.enterAccountDetails(accountData);
        await this.btnContinue.waitForExist({ timeout: 60000 });
        await this.btnContinue.click();
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(custDetails["appId"]);
        return custDetails;
    }

    async lmsVerifyDocuments(appId) {
        await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[0]);
        await browser.closeWindow();
        await browser.switchToWindow(handles[1]);
        let signInBtn = await this.btnSignInWithGoogle.isDisplayed();
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
        await this.btnManageLoan.waitForExist({ timeout: 60000 });
        await this.btnManageLoan.click();
        await this.btnUnprocessedByjusAdvantage.waitForExist({ timeout: 60000 });
        await this.btnUnprocessedByjusAdvantage.click();
        await this.btnDocumentVarificationLink(appId).waitForExist({ timeout: 20000 });
        await this.btnDocumentVarificationLink(appId).click();
        await this.verifyDocuments();
        await this.btnDocVerified.click();
        await this.submitFeedback()
    }
    async lmsVerifyDocumentsForFinOpsApproved(appId) {
        await browser.pause(8000)
        await this.btnManageLoan.waitForExist({ timeout: 30000 });
        await this.btnManageLoan.click();
        await this.btnProcessedByjusAdvantage.waitForDisplayed();
        await this.btnProcessedByjusAdvantage.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await mongoConnect.AddOrderIdByjus(appId)
        await browser.refresh()
        await this.btnDocumentVerificationLinkProcessed(appId).waitForExist({ timeout: 20000 });
        await this.btnDocumentVerificationLinkProcessed(appId).click();
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
        await this.btnProcessedByjusAdvantage.waitForDisplayed();
        await this.btnProcessedByjusAdvantage.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnDocumentVerificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVerificationLinkProcessed(appId).click();
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
    async submitFeedback() {
        await this.btnNoTab.waitForClickable({ timeout: 20000 })
        await this.btnNoTab.click()
        await this.ddSelectReason.waitForClickable({ timeout: 20000 })
        await this.ddSelectReason.click()
        await browser.keys("Tab")
        await this.btnSubmit.waitForClickable({ timeout: 20000 })
        await this.btnSubmit.click()
    }


    async verifyDocuments() {
        //  verify all the documents in LMS portal
        for (let i = 4; i <= 7; i++) {
            await this.getDocumentsList(i).waitForExist({ timeout: 30000 });
            if (this.getDocumentsList(i).isClickable() == false) {
                await this.getDocumentsList(i).scrollIntoView();
                await this.getDocumentsList(i).waitForClickable({ timeout: 30000 })
                await this.getDocumentsList(i).click();
            }
            await this.getDocumentsList(i).click()
            // wait for documents to upload to avoid click intercepted exception
            await browser.pause(6000);
            if (await this.btnApprove.isExisting() == false) {
                await this.btnApprove.scrollIntoView();
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
}
export default new ByjusAdvantagePage();
