import BasePage from '../gateway_payments_page/base.page';
import mongoConnect from '../../utils/mongoconnect';
import TLPOrderPage from "./tlp.order.Page";
import { fullertonData } from '../../data/fullerton.loanform.data';

class FullertonLoan extends BasePage {

    get btnSignInWithGoogle() {
        return $("//button[contains(text(),' Sign In With Google')]")
    }
    get btnContinueWithGoogle() {
        return $("(//button[@name='googleSignUpButton'])[2]")
    }
    get tfEnterMailAddress() {
        return $("#identifierId")
    }
    get btnNext() {
        return $("//span[text()='Next']/..")
    }
    get tfEnterPassword() {
        return $("input[type='password']")
    }
    get btnFullertonpay() {
        return $("//a[@href='/fullertonv3']/button")
    }
    get btnSkipUploadDocument() {
        return $("//button[text()='Skip Extract Page']")
    }
    get tfTLpInitiatedAppId() {
        return $("//input[@name='previousAppId']")
    }

    get btnEnableWebApp() {
        return $("//button[normalize-space()='Enable Web App']")
    }

    get tfBorrowerFirstName() {
        return $("input[name='applicantFirstName']")
    }
    get tfBorrowerlastName() {
        return $("input[name='applicantLastName']")
    }
    get tfPanNumber() {
        return $("input[name='panNo']")
    }
    get tfDob() {
        return $("input[name='dateOfBirth']")
    }
    get ddDobYear() {
        return $(".react-datepicker__year-read-view--selected-year")
    }
    ddDobYearSelector(year) {
        return $("//div[text()='" + year + "']")
    }
    get ddDobMonth() {
        return $(".react-datepicker__month-read-view--selected-month")
    }
    ddDobMonthSelector(month) {
        return $("//div[text()='" + month + "']")
    }
    ddDobDaySelector(day) {
        return $("//div[@aria-label='day-" + day + "']")
    }
    get tfAddressProofNumber() {
        return $("input[name='aadharNo']")
    }
    get ddGender() {
        return $("//label[@for='Gender']/../div/div")
    }
    get tfPhoneNumber() {
        return $("input[name='telephoneNumber']")
    }
    get tfEmailAddress() {
        return $("input[name='emailAddress']")
    }
    get tfFathersName() {
        return $("input[name='fathersName']")
    }

    get tfCompanyName() {
        return $("input[name='companyName']")
    }
    get btnupdate()
    {
        return $("//button[normalize-space()='Update']")
    }
    get tfBorrowersAddress() {
        return $("input[name='addressLine1']")
    }
    get tfLandmark() {
        return $("input[name='landmark']")
    }
    get ddPropertyType() {
        return $("//label[@for='Property Type']/../div/div")
    }
    get tfBorrowersPinCode() {
        return $("input[name='pinCode']")
    }
    get ddStateName() {
        return $("//label[@for='State']/../div/div")
    }
    get ddCityName() {
        return $("//label[@for='City']/../div/div")
    }
    get tfLoanAmount() {
        return $("input[name='requestedLoanAmount']")
    }
    get ddLoanTenure() {
        return $("//label[@for='Loan Tenure']/../div/div")
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
        return $("//button[text()='Send OTP']")
    }
    get btnFullertonHistory() {
        return $("//a[@href='/fullertonv3']/..//button[text()='History']")
    }
    get btnProceed() {
        return $("//button[text()='Proceed']")
    }
    get btnResendOtp() {
        return $("//button[text()='Resend OTP']")
    }
    get btnFullertonHistoryUnprocessed() {
        return $("//a[@href='/fullertonv3']/..//div/a[text()='Unprocessed']")
    }
    getAppId(panNumber) {
        return $("(//span[text()='" + panNumber + "']/../../preceding-sibling::p)[2]//span[2]")
    }
    btnResume(appId) {
        return $(`//a[@href='/fullertonv3?appId=${appId}']`)
    }
    get btnContinue() {
        return $("//button[contains(text(),'Continue')]")
    }

    get rbBankStatementPassbook() {
        return $("//h5[text()='Bank Statement Passbook(2 photos)']")
    }
    get ddBankStatementSource() {
        return $("//label[@for='bankStatementSource']/../div/div")
    }
    get cbToContinue() {
        return $("input[type='checkbox']")
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
    get ddBankName() {
        return $("//label[@for='Bank Name']/../div/div")
    }
    get btnBankBranch() {
        return $("//button[text()='Search Branch']")
    }
    get rbBankBranch() {
        return $("//td[text()='ABHY0065001']/..//input")
    }
    get btnSelectBranch() {
        return $("//button[text()='Select']")
    }
    get tfIfscCode() {
        return $("//input[@name='ifsc']")
    }
    get tfMicrCode() {
        return $("//input[@name='micr']")
    }
    get tfBranchCity() {
        return $("//input[@name='city']")
    }
    get btnAddMorePhoto() {
        return $("//button[contains(text(),' Add More')]")
    }
    get btnNextPage() {
        return $("//button[contains(text(),'Next Page')]")
    }

    get btnNextpg() {
        return $(`//button[@class="btn btn-success"]`)
    }
    get btnProcessedFullerton() { return $("//a[@href='/manage-loan/processed/fullertonV3']") }

    get btnNoTab() {
        return $("//button[normalize-space()='No']")
    }

    get ddSelectReason() {
        return $("(//div[normalize-space()='Select Reason'])[1]")
    }
    get btnSubmit1() { return $("(//button[contains(text(),'Submit')])[2]") }
    get btnDocReceivedAndFinOpsApprove() { return $("//button[text()='Doc Received & Fin Ops Approve']") }

    get btnclose() { return $(`//button[normalize-space()='Close']`) }

    btnDocumentVerificationLinkProcessed(appId) { return $(`//a[contains(@href,'${appId}')]`) }

    get btnCreateLoan() { return $("//button[text()='Create Loan']") }

    get popUpLoanApproved() { return $('div.s-alert-box-inner>span') }


    get waitForopsTeamApprovalTimer() {
        return $("//div[@id='timer']")
    }
    get ddLoanStatus() {
        return $("//label[text()='Loan status']/../div")
    }
    get applicantsResponse(){ 
        return $("(//div[@class='Select-placeholder'])[1]")
    }
    get rbHighRisk() {
        return $("//input[@name='highRisk'  and @value='low']")
    }
    get btnSubmit() {
        return $("//button[contains(text(),'Submit')]")
    }

    get btnManageUtilities() {
        return $("//a[@href='/manage-utilities']")
    }
    get btnAbbTicket() {
        return $("//p[text()='ABB Tickets']")
    }
    btnOpenAppId(appId) {
        return $("//div[text()='" + appId + "']")
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
    get btnSaveSheet() {
        return $("//button[text()='Save Sheet']")
    }
    get ddSelectEmiDate() {
        return $("//label[@for='First EMI Date']/../div/div")
    }
    get rbNonAadharKyc() {
        return $("//h6[text()='Non Aadhaar OTP Based KYC']/../input")
    }

    get cbPNach() {
        return $("input[name='physicalNach']")
    }
    get cbToPNACH() {
        return $("input[type='checkbox']")
    }
    get btnGeneratePNACH() {
        return $("//button[text()='Generate PNACH']")
    }
    get rbosvKyc() {
        return $("input[name='osvType']")
    }
    get btnNextKycPage() {
        return $("//button[contains(text(),'Next')]")
    }
    get rbUploadDocument() {
        return $("//label[text()='Upload Document']")
    }
    get tfBorrowerFirstNamePOI() {
        return $("input[name='firstName']")
    }
    get tfBorrowerlastNamePOI() {
        return $("input[name='lastName']")
    }
    get tfPOINumber() {
        return $("input[name='number']")
    }
    get ddPOAType() {
        return $("//label[@for='Select POA type']/../div/div")
    }
    get tfPOANumber() {
        return $("input[name='lastName']")
    }

    get btnSendEsign() {
        return $("//button[text()='Send Esign']")
    }
    get btnManageLoan() {
        return $("//a[@href='/manage-loan']")
    }
    get btnUnprocessedFullerton() {
        return $("//a[@href='/manage-loan/unprocessed/fullertonV3']")
    }
    btnDocumentVarificationLink(appId) {
        return $("//a[@href='/manage-loan/unprocessed/fullertonV3/approveLoan/docapproved/" + appId + "']")
    }
    cbVerify(num) {
        return $("(//input[@type='checkbox'])[" + num + "]")
    }
    get btnApproveDocuments() {
        return $("//button[contains(text(),'Approve Documents')]")
    }
    get btnApprove() {
        return $("//button[normalize-space()='APPROVE']")
    }
    get btnDocVerified() {
        return $("//button[contains(text(),'Doc Verified')]")
    }
    get btnDone() {
        return $("//button[text()='Done']")
    }
    getpopUpLoanApproved(appId) {
        return $("//p[text()='" + appId + "']")
    }
    getddMaritalStatusOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    getddEducationOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    getddEmployementOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    getddIncomeSlabOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    getddPropertyTypeOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    getddLoanTenureOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    getddTitleOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    getddAccountTypeOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    getErrorMsgDropdownElement(fieldText) {
        return $(`//small[text()='${fieldText}']`)
    }
    getErrorMsgTextFieldElement(fieldName) {
        return $(`//input[@name='${fieldName}']/../div[@class='invalid-feedback']`)
    }
    get ErrorMsgBankStatementUpload() {
        return $("//div[@role='alert']//li")
    }
    getErrorMsgFrom(fieldName) {
        return $(`//label[@for="${fieldName}"]//following-sibling::div[@class='invalid-feedback']`);
    }
    get btneditAddionalDetails()
    {
        return $('(//i[@class="fa fa-pencil"])[3]')
    }
    getDocumentsList(list) {
        return $(`(//span[@class='MuiTab-wrapper'])[${list}]`)
    }
    get popUpDocApproved() {
        return $("//*[contains(text(),'All documents are verified')]")
    }
    get popUpDocsVerified()
    {
        return $("//div[@class='s-alert-box-inner']")
    }
    get btnExpand() {
        return $("button[title='Expand']>i.fa")
    }


    async loginPaymentPage(username, password) {
        // while method called after using new window function it requirs time to load the page
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
    }

    async customerDetails(data,appId) {
        await this.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        await this.btnSkipUploadDocument.click();
        await this.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        await this.tfTLpInitiatedAppId.setValue(appId)
        await this.btnEnableWebApp.waitForClickable({ timeout: 22000 })
        await this.btnEnableWebApp.click();
        await this.tfBorrowerFirstName.waitForEnabled({timeout:15000})
        await this.tfBorrowerFirstName.setValue(data.borrowerFirstName);
        await this.tfBorrowerlastName.setValue(data.borrowerLastName);
        await this.tfDob.waitForClickable({ timeout: 60000 });
        await this.tfDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobYear).click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector(data.dobMonth).click();
        await this.ddDobDaySelector(data.dobDate).click();
        await this.tfAddressProofNumber.setValue(data.aadharNumber);
        await this.ddGender.click();
        await browser.keys(data.gender);
        await this.tfEmailAddress.setValue(data.email);
        await this.tfFathersName.setValue(data.fathersName);
        await this.tfBorrowersAddress.setValue(data.address);
        await this.tfLandmark.setValue(data.landmark);
        await this.tfBorrowersPinCode.setValue(data.pinCode);
        await this.tfLoanAmount.setValue(data.payableAmount);
        await this.ddLoanTenure.waitForClickable({ timeout: 20000 });
        await this.ddLoanTenure.click();
        await browser.keys(data.loanTenure);
        await this.ddStudentGrade.click()
        await browser.keys(["5", "Tab"])
        await this.cbToSendOtp.click();
        await this.btnNextpg.waitForClickable({ timeout: 10000 })
        await this.btnNextpg.click()
        await this.clickOnProceedButton()

    }

    async createTlpAppId(data)
    {
        let loanVendor = "fullertonv3"
        let dataId = await mongoConnect.tlPayAppIdCreation(data.panNumber);
        let appId = dataId[0];
        let kartLeadId = dataId[1];
        await TLPOrderPage.createTlpObject(appId);
        await TLPOrderPage.updatePermitRequest(appId, kartLeadId);
        await TLPOrderPage.openUrlWithKartId(kartLeadId, loanVendor);
        return appId;
    }

    async enterCustomerAndLoanDetails(data)
    {
        let appId = await this.createTlpAppId(fullertonData.fullertonValidData)
        await this.customerDetails(data,appId);
        await this.ddOccupationType.waitForClickable({timeout:80000});
        await this.ddOccupationType.click();
        await browser.keys(["S", "t", "Tab"]);
        await this.ddQualification.click()
        await browser.keys(["G", "r", "a", "Tab"]);
        await this.tfIncome.setValue("20000")
        await this.ddMartialStatus.click()
        await browser.keys(["S", "Tab"])
        await this.ddResidenceType.click()
        await browser.keys(["O", "w", "Tab"])
        await this.tfMothersName.setValue(data.mothersName);
        await this.tfStudentsName.setValue(data.studentsName);
        await this.tfStudentsDob.waitForClickable();
        await this.tfStudentsDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobYear).click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector(data.dobMonth).click();
        await this.ddDobDaySelector(data.dobDate).click();
        await this.tfAlternateMobileNo.setValue("9867885466");
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
        try { await this.btnProceed.waitForDisplayed({ timeout: 10000 }) }
        catch { }
        if (await this.btnProceed.isDisplayed()) {
            await this.btnProceed.waitForExist({ timeout: 10000 })
            await this.btnProceed.click();
            await this.tfMothersName.waitForExist({ timeout: 60000 })
        }
        else {
            await this.tfMothersName.waitForExist({ timeout: 60000 })

        }

    }
    async returnAppId(panNumber) {
        await this.btnFullertonHistory.click();
        await this.btnFullertonHistoryUnprocessed.click();
        let appId = await this.getAppId(panNumber).getText();
        return appId;
    }
    async uploadBankStatement(data) {
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
        await this.cbToSendOtp.click();
        await this.btnContinue.waitForClickable({timeout:10000})
        await this.btnContinue.click();
        await this.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        await this.rbBankStatementPassbook.click();
        await this.ddNameTitle.click();
        await browser.keys(["M", "r", "Tab"]);
        await this.tfCustomerName.setValue("Dummy customer name");
        await this.tfAccountNumber.setValue("42942349153");
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


    async uploadPassbookImages(count = 2) {

        for (let i = 0; i < count; i++) {
            const path = require('path');
            const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
            await this.btnChooseFile.setValue(filePath);
            await this.btnUploadFile.waitForClickable({ timeout: 60000 });
            await this.btnUploadFile.click();
            if (i < count - 1) {
                await this.btnAddMorePhoto.waitForClickable({ timeout: 60000 });
                await this.btnAddMorePhoto.click();
            }
        }
    }
    async uploadPersonalDocuments(data) {
        let visibilityStatusPOI
        let visibilityStatusPOA
        for (let i = 0; i < 5; i++) {
            const path = require('path');
            const filePath = path.join(process.cwd(), process.env.VOTER_ID_CARD_IMAGE_PATH);
            try { await this.tfBorrowerFirstNamePOI.waitForExist({ timeout: 5000 }) }
            catch { }
            visibilityStatusPOI = await this.tfBorrowerFirstNamePOI.isDisplayed();
            visibilityStatusPOA = await this.ddPOAType.isDisplayed();

            if (visibilityStatusPOI == true) {
                await this.tfBorrowerFirstNamePOI.setValue(data.borrowerFirstName);
                await this.tfBorrowerlastNamePOI.setValue(data.borrowerLastName);
                await this.tfPOINumber.setValue(data.panNumber);
            }

            if (visibilityStatusPOA == true) {
                await this.ddPOAType.click();
                await browser.keys(data.poaType);
                await this.tfPOINumber.setValue(data.aadharNumber);
            }

            await this.rbUploadDocument.waitForClickable({ timeout: 60000 });
            await this.rbUploadDocument.click();
            await this.btnChooseFile.waitForClickable({ timeout: 60000 });
            await this.btnChooseFile.setValue(filePath);
            await this.btnUploadFile.waitForClickable({ timeout: 60000 });
            await this.btnUploadFile.click();
            // sometime page takes time to get loaded
            await browser.pause(3000);

        }

    }


    async lmsAbbTicketApproval(username, password, appId, data) {
        await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
        // takes time to load when open a new tab
        await browser.pause(8000);
        let googleSignInBtnDisplayed = await this.btnSignInWithGoogle.isDisplayed({ timeout: 15000 });
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
        await this.btnManageUtilities.waitForExist({ timeout: 50000 });
        await this.btnManageUtilities.click();
        await this.btnAbbTicket.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnOpenAppId(appId).waitForClickable();
        await this.btnOpenAppId(appId).click();
        await this.tfMinimumBalance.waitForExist({ timeout: 10000 });
        await this.tfMinimumBalance.setValue(data.randomNum6digits);
        await this.tfMaximumBalance.setValue(data.randomNum7digits);
        await browser.keys("Tab");
        await this.btnSaveSheet.waitForClickable({ timeout: 90000 });
        await this.btnSaveSheet.click();
        await this.applicantsResponse.waitForClickable({timeout:10000})
        await this.applicantsResponse.click()
        await browser.keys(["A","g","r","e","e","Tab"]);
        await this.ddLoanStatus.waitForClickable({ timeout: 10000 })
        await this.ddLoanStatus.click();
        await browser.keys(["A", "p", "p", "Tab"]);
        if (await this.rbHighRisk.isClickable() == false) {
            await this.ddLoanStatus.click();
            await browser.keys(["A", "p", "p", "Tab"]);
        }
        //await this.rbHighRisk.click();
        await this.btnSubmit.click();

        // sometime the page takes time to get loaded
        await browser.pause(3000);
    }


    async selectEmiDateAndApproveLoanAgreement(data) {
        await this.ddSelectEmiDate.waitForClickable({ timeout: 30000 });
        await this.ddSelectEmiDate.waitForExist({ timeout: 30000 });
        let selectEmiDateVisibilityStatus = await this.ddSelectEmiDate.isDisplayed();
        while (selectEmiDateVisibilityStatus == false) {
            await browser.refresh();
            await this.btnSkipUploadDocument.click();
            await this.tfPanNumber.setValue(data);
            await this.btnContinue.waitForClickable({timeout:10000});
            await this.btnContinue.click();
            selectEmiDateVisibilityStatus = await this.ddSelectEmiDate.isDisplayed();
        }
        await this.ddSelectEmiDate.click();
        await browser.keys("Tab");
        await this.btnContinue.click();
        // sometime page takes time to get loaded
        await browser.pause(1500);
        await this.btnContinue.click();

    }

    async verifyOKYC() {
        
        await this.cbPNach.waitForClickable({ timeout: 60000 });
        await this.cbPNach.click();
        await this.cbToPNACH.click();
        await this.btnGeneratePNACH.click();
        await this.rbosvKyc.waitForExist({ timeout: 20000 });
        await this.rbosvKyc.waitForClickable({ timeout: 20000 });
        await this.rbosvKyc.click();
    }
    async verifyDocuments() {
        //  verify all the documents in LMS portal
        for (let i = 4; i <= 11; i++) {

            await this.getDocumentsList(i).waitForDisplayed({ timeout: 30000 });
            if (this.getDocumentsList(i).isClickable() == false) {
                await this.getDocumentsList(i).scrollIntoView();
                await this.getDocumentsList(i).waitForClickable({ timeout: 10000 })
                await this.getDocumentsList(i).click();
            }
            await this.getDocumentsList(i).click()
            // wait for documents to upload to avoid click intercepted exception
            await browser.pause(6000);
            try {
                await this.btnApprove.waitForExist({ timeout: 10000 })
            }
            catch (e) {
                await this.getDocumentsList(i).click()
                //await this.btnApprove.waitForExist({ timeout: 10000 })
            }
            if (await this.btnApprove.isDisplayed()) {
                await this.btnApprove.waitForExist({ timeout: 10000 })
                await this.btnApprove.click();
            }
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
        await this.btnUnprocessedFullerton.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnDocumentVarificationLink(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVarificationLink(appId).click();
        if (await this.btnDocumentVarificationLink(appId).isDisplayed() == false) {
            await browser.refresh();
        }
        await this.btnDocumentVarificationLink(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVarificationLink(appId).click();
        await this.btnExpand.waitForExist({ timeout: 10000 });
        await this.btnExpand.click();
        await this.btneditAddionalDetails.waitForClickable({timeout:15000});
        await this.btneditAddionalDetails.click();
        await this.tfCompanyName.waitForClickable({timeout:10000});
        await this.tfCompanyName.setValue("CompanyName");
        await this.btnupdate.waitForClickable({timeout:15000});
        await this.btnupdate.click();
        await this.verifyDocuments();
        await this.btnDocVerified.click();

    }

    async submitFeedback() {
        await this.btnNoTab.waitForClickable({ timeout: 20000 })
        await this.btnNoTab.click()
        await this.ddSelectReason.waitForClickable({ timeout: 20000 })
        await this.ddSelectReason.click()
        await browser.keys(["O", "t", "h", "Tab"])
        await this.btnSubmit1.waitForClickable({ timeout: 10000 })
        await this.btnSubmit1.click()
    }

    async lmsVerifyDocumentsForFinOpsApproved(appId) {
        await browser.pause(9000)
        await this.btnManageLoan.waitForExist({ timeout: 30000 });
        await this.btnManageLoan.click();
        await this.btnProcessedFullerton.waitForDisplayed()
        await this.btnProcessedFullerton.click()
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await mongoConnect.fullertonAddOrderId(appId)
        await browser.refresh()
        await this.btnDocumentVerificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVerificationLinkProcessed(appId).click();
        await this.btnApprove.waitForExist({ timeout: 20000 });
        await this.verifyDocuments()
        await this.btnDocReceivedAndFinOpsApprove.click();
        await this.btnclose.waitForClickable({ timeout: 20000 })
        await this.btnclose.click();

    }
    async createLoan(appId) {
        await browser.pause(5000)
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnDocumentVerificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVerificationLinkProcessed(appId).click();
        await this.btnApprove.waitForExist({ timeout: 20000 });
        await this.verifyDocumentsFA();
        await this.btnCreateLoan.click()
        await browser.waitUntil(async () => await this.popUpLoanApproved.isDisplayed() == true,
            {
                timeout: 130000,
                timeoutMsg: 'Loan is not created'
            })
        await this.btnclose.waitForClickable({ timeout: 20000 })
        await this.btnclose.click();
    }

}


export default new FullertonLoan();