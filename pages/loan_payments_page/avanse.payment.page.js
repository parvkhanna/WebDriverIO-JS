import BasePage from '../gateway_payments_page/base.page';
import mongoConnect from "../../utils/mongoconnect";
import { avanseData } from "../../data/avanse.loanform.data";
import TLPOrderPage from "./tlp.order.Page"


class AvanseLoan extends BasePage {

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
    get btnNextpg() {
        return $("(//button[contains(text(),'Next')])[1]")
    }

    get btnNextTab() {
        return $("button.btn.btn-success")
    }
    get tfEnterPassword() {
        return $("input[type='password']")
    }
    get btnAvanse() {
        return $("//a[@href='/avanse']/button")
    }
    get btnSkipUploadDocument() {
        return $("//button[text()='Skip Extract Page']")
    }
    get tfPanNumber() {
        return $("input[name='panNo']")
    }
    get ddSelectAddressProof() {
        //return $("//div[text()='Select Address Proof']")
        return $("(//div[@class='css-bg1rzq-control'])[1]")
    }

    get tfTLpInitiatedAppId() {
        return $("//input[@name='previousAppId']")
    }

    get btnEnableWebApp() {
        return $("//button[normalize-space()='Enable Web App']")
    }

    get tfAddressProofNumber() {
        return $("input[name='addressProofNumber']")
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

    get tfAddressField() {
        return $("input[name='addressLine1']")
    }

    get tfStudentsPinCode() {
        return $("//input[@name='pinCode']")
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
    get tfProductName() {
        return $("input[name='productName']")
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
    get cbToSendOtp() {
        return $("input[type='checkbox']")
    }
    get btnSendOtp() {
        return $("//button[text()='Send OTP']")
    }
    get tfBorrowerFirstName() {
        return $("input[name='applicantFirstName']")
    }
    get tfBorrowerlastName() {
        return $("input[name='applicantLastName']")
    }

    get tfEnterOtp() {
        return $("input[name='otp']")
    }
    get btnCheckCibilScore() {
        return $("//button[normalize-space()='Check Credit Bureau Score']")
    }
    get btnAvanseHistory() {
        return $("//a[@href='/avanse']/..//button[text()='History']")
    }
    get btnProceed() {
        return $("//button[text()='Proceed']")
    }
    get btnResendOtp() {
        return $("//button[text()='Resend OTP']")
    }
    get btnAvanseHistoryUnprocessed() {
        return $("//a[@href='/avanse']/..//div/a[text()='Unprocessed']")
    }
    getAppId(panNumber) {
        return $("(//span[text()='" + panNumber + "']/../../preceding-sibling::p)[2]//span[2]")
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
    get waitForopsTeamApprovalTimer() {
        return $("//div[@id='timer']")
    }
    get btnContinue() {
        return $("//button[contains(text(),'Continue')]")
    }
    get ddLoanStatus() {
        return $("//label[text()='Loan status']/../div")
    }
    get applicantsResponse(){ return $("(//div[@class='Select-placeholder'])[1]")}
    get rbHighRisk() {
        return $("//input[@name='highRisk'  and @value='low']")
    }
    get btnSubmit() {
        return $("//button[(text()='Submit')]")
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
    btnResume(appId) {
        return $(`//a[@href='/avanse?appId=${appId}']`)
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
    get cbPNach() {
        return $("input[name='physicalNach']")
    }
    get cbToPNACH() {
        return $("input[type='checkbox']")
    }
    get btnGeneratePNACH() {
        return $("//button[text()='Generate PNACH']")
    }
    get rbNonAadharKyc() {
        return $("//h6[text()='Non Aadhaar OTP Based KYC']/../input")
    }
    get btnNextKycPage() {
        return $("//button[contains(text(),'Next')]")
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
    get btnEsign() {
        return $("//button[text()='Send Esign']")
    }
    get btnManageLoan() {
        return $("//a[@href='/manage-loan']")
    }
    get btnUnprocessedAvanse() {
        return $("//a[@href='/manage-loan/unprocessed/avanse']")
    }

    get btnProcessedAvanse() {
        return $("a[href='/manage-loan/processed/avanse']")
    }
    btnDocumentVarificationLink(appId) {
        return $("//a[@href='/manage-loan/unprocessed/avanse/approveLoan/docapproved/" + appId + "']")
    }
    btnDocumentVarificationLinkProcessed(appId) {
        return $(`//a[contains(@href,'${appId}')]`)
    }
    get btnPreview() {
        return $("//button[contains(text(),'Preview')]")
    }
    get btnDone() {
        return $("//button[text()='Done']")
    }

    get btnSendEsign() {
        return $("//button[text()='Send Esign']")
    }
    cbVerify(num) {
        return $("(//input[@type='checkbox'])[" + num + "]")
    }
    get btnApprove() {
        return $("//button[contains(text(),'APPROVE')]")
    }
    get btnDocVerified() {
        return $("//button[contains(text(),'Doc Verified')]")
    }

    get btnDocReceivedAndFinOpsApprove() {
        return $("//button[normalize-space()='Doc Received & Fin Ops Approve']")
    }
    get loadingPage() {
        return $('//main/div[@class="loading"]')
    }

    get btnNoTab() {
        return $("//button[normalize-space()='No']")
    }

    get ddSelectReason() {
        return $("(//div[normalize-space()='Select Reason'])[1]")
    }

    get btnCreateLoan() {
        return $("//button[normalize-space()='Create Loan']")
    }
    getErrorMsgFrom(fieldName) {
        return $(`//label[@for="${fieldName}"]//following-sibling::div[@class='invalid-feedback']`);
    }
    getErrorMsgDropdownElement(fieldName) {
        return $(`//label[@for="${fieldName}"]//following-sibling::small[@class='form-text text-danger']`);
    }
    get divElementErrorMsg() {
        return $("//div[@role='alert']//li");
    }

    get ErrorMsgLmsPortal() {
        return $("//span[text()='Please enter all required details!']")
    }
    get btnAbbTicketSearchBox() {
        return $("//input[@name='searchText']")
    }
    lmsVerifyingDocuments(fieldName) {
        return $("//span[@class='MuiTab-wrapper']/./span[text()='" + fieldName + "']")
    }
    getverifyAppId(appId) {
        return $("//td[text()='" + appId + "']")
    }
    getDocumentsList(list) {
        return $(`(//span[@class='MuiTab-wrapper'])[${list}]`)
    }

    get popUpLoanApproved() {
        return $('div.s-alert-box-inner>span')
    }
    getddAddressproofOptions(index) {
        return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`)
    }
    getddOccupationTypeOptions(index) {
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

    async uploadSevenDocuments() {
        let visibilityStatus
        const path = require('path');
        const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
        for (let i = 0; i <= 5; i++) {
            await this.rbUploadDocument.waitForDisplayed({ timeout: 60000 });
            visibilityStatus = await this.rbUploadDocument.isDisplayed();
            if (visibilityStatus == true) {
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
    }

    async verifyDocuments() {
        //  verify all the documents in LMS portal
        for (let i = 4; i <= 12; i++) {

            await this.getDocumentsList(i).waitForExist({ timeout: 30000 });
            if (this.getDocumentsList(i).isClickable() == false) {
                await this.getDocumentsList(i).scrollIntoView();
                await this.getDocumentsList(i).waitForClickable({ timeout: 30000 });
            }
            await this.getDocumentsList(i).click()
            try {
                if (await this.btnApprove.isExisting() == false) {
                    await this.btnApprove.waitForExist({ timeout: 15000 })
                }
            }
            catch { }
            try {
                await this.btnApprove.waitForExist({ timeout: 2000 })
                await this.btnApprove.click();
            } catch { }

            // wait for documents to upload to avoid click intercepted exception
            await browser.pause(2000);

        }

    }

    async loginPaymentPage(username, password) {
        // while method called after using new window function it requirs time to load the page
        await browser.pause(10000);
        let googleSignInBtnDisplayed = await this.btnSignInWithGoogle.isDisplayed({ timeout: 30000 });
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
        await this.btnAvanse.waitForExist({ timeout: 60000 });
    }

    async customerDetails(data, appId) {
        try{
        await this.btnSkipUploadDocument.waitForExist({ timeout: 40000 })
        await this.btnSkipUploadDocument.click();
        }
        catch{}
        await this.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
        await this.tfTLpInitiatedAppId.setValue(appId)
        await this.btnEnableWebApp.waitForClickable({ timeout: 22000 })
        await this.btnEnableWebApp.click()
        await this.ddSelectAddressProof.waitForClickable({ timeout: 15000 });
        await this.ddSelectAddressProof.click();
        await browser.keys(data.addressProof);
        await this.tfAddressProofNumber.setValue(data.aadharNumber);
        await this.tfDob.click();
        await this.ddDobYear.click();
        await this.ddDobYearSelector(data.dobYear).click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector(data.dobMonth).click();
        await this.ddDobDaySelector(data.dobDay).click();
        await this.ddGender.click();
        await browser.keys(data.gender);
        await this.loadingPage.waitForExist({ timeout: 20000, reverse: true });
        await this.tfEmailAddress.setValue(data.email);
        await this.tfFathersName.setValue(data.fathersName);
        await this.ddStudentGrade.waitForClickable()
        await this.ddStudentGrade.click()
        await browser.keys(["5", "Tab"])
        await this.tfAddressField.setValue(data.studentsAddress);
        await this.tfStudentsPinCode.setValue(data.studentPinCode);
        await this.tfLoanAmount.waitForClickable({ timeout: 50000 });
        await this.tfLoanAmount.setValue(data.payableAmount);
        await this.ddLoanTenure.click();
        await browser.keys(data.loanTenure);
        await this.tfProductName.setValue(data.productname);
        await this.cbToSendOtp.click();
        await this.btnNextpg.click();
        try { await this.tfBorrowerFirstName.waitForDisplayed({ timeout: 10000 }) }
        catch { }
        if (await this.tfBorrowerFirstName.isDisplayed()) {
            await this.tfBorrowerFirstName.setValue(data.fathersName);
            await this.tfBorrowerlastName.setValue("s");
            await this.btnNextTab.click()
        }
        else if (await this.tfBorrowerFirstName.isDisplayed() == false) { }
        await this.clickOnProceedButton();

    }

    async createTlpAppId(data)
    {
      let loanVendor = "avanse"
        let dataId = await mongoConnect.tlPayAppIdCreation(data.panNumber);
        let appId = dataId[0];
        let kartLeadId = dataId[1];
        await TLPOrderPage.createTlpObject(appId);
        await TLPOrderPage.updatePermitRequest(appId, kartLeadId)
        await TLPOrderPage.openUrlWithKartId(kartLeadId, loanVendor)
        return appId;
    }

    async enterCustomerAndLoanDetails(data) {
        let appId = await this.createTlpAppId(avanseData.avanceValidData)
        await this.customerDetails(data, appId)
        // Additional Details
        await this.ddOccupationType.waitForClickable({ timeout: 10000 });
        await this.ddOccupationType.click();
        await browser.keys(data.customerOccupation);
        await this.ddQualification.click()
        await browser.keys(["G", "r", "a", "Tab"])
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
        await this.ddDobYearSelector("2010").click();
        await this.ddDobMonth.click();
        await this.ddDobMonthSelector("June").click();
        await this.ddDobDaySelector("28").click();
        await this.tfAlternateMobileNo.setValue("9867885466");
        // Student details 
        await this.btnLocateSchool.click()
        // 5 seconds wait to load school details pop up 
        await browser.pause(5000)
        await this.tfSchoolLocation.waitForDisplayed({ timeout: 30000 });
        await this.tfSchoolLocation.waitForExist({ timeout: 30000 })
        await this.tfSchoolLocation.setValue(data.SchoolLocation)
        await browser.keys("Enter")
        // 2 seconds wait to load school names
        await browser.pause(2000)
        await this.ddSchoolName.waitForEnabled({ timeout: 20000 })
        await this.ddSchoolName.click()
        await browser.keys("Tab")
        await this.btnConfirmStudentDetails.waitForDisplayed({ timeout: 20000 })
        await this.btnConfirmStudentDetails.click()
        await this.ddSchoolFee.waitForEnabled({ timeout: 10000 })
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
        try { await this.btnProceed.waitForDisplayed({ timeout: 13000 }) }
        catch { }
        if (await this.btnProceed.isDisplayed()) {
            await this.btnProceed.waitForExist({ timeout: 10000 })
            await this.btnProceed.click();
            await this.tfMothersName.waitForExist({ timeout: 80000 })
        }
        else {
            await this.tfMothersName.waitForExist({ timeout: 80000 })

        }

    }
    async returnAppId(panNumber) {
        await this.btnAvanseHistory.click();
        await this.btnAvanseHistoryUnprocessed.click();
        let appId = await this.getAppId(panNumber).getText();
        return appId;
    }

    async uploadBankStatement(data) {
        await browser.refresh();
        await this.btnContinue.click();
        await this.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        await this.rbBankStatementPassbook.click();
        await this.ddBankStatementSource.click();
        await browser.keys(["E", "m", "a", "i", "l", "Tab"]);
        await this.rbUploadDocument.click();
        try {
            const path = require('path');
            const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
            await this.btnChooseFile.setValue(filePath);
        }
        catch { }
        await this.btnUploadFile.click();
        await this.cbToSendOtp.click();
        await this.btnContinue.click();
        await this.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
        await this.rbBankStatementPassbook.click();
        await this.ddNameTitle.click();
        await browser.keys(["M", "r", "Tab"]);
        await this.tfCustomerName.setValue("Dummy customer name");
        await this.tfAccountNumber.setValue("429679153");
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
        // takes time to load when open a new tab
        await browser.pause(10000);
        let googleSignInBtnDisplayed = await this.btnSignInWithGoogle.isDisplayed({ timeout: 30000 });
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
        await this.btnManageUtilities.waitForExist({ timeout: 30000 });
        await this.btnManageUtilities.click();
        await this.btnAbbTicket.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        // 5 seconds wait to fetch App Id
        await browser.pause(5000)
        await this.btnOpenAppId(appId).waitForDisplayed({ timeout: 60000 });
        await this.btnOpenAppId(appId).waitForClickable({ timeout: 60000 });
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
        await this.ddLoanStatus.waitForClickable({ timeout: 20000 })
        await this.ddLoanStatus.click();
        await browser.keys(["A", "p", "p", "Tab"]);
        if (await this.rbHighRisk.isClickable() == false) {
            await this.ddLoanStatus.click();
            await browser.keys(["A", "p", "p", "Tab"]);
        }
        // await this.rbHighRisk.click();
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
            await this.btnContinue.click();
            selectEmiDateVisibilityStatus = await this.ddSelectEmiDate.isDisplayed();
        }
        await this.ddSelectEmiDate.waitForExist({ timeout: 60000 });
        await this.ddSelectEmiDate.click();
        await browser.keys("Tab");
        await this.btnContinue.click();
        // sometime page takes time to get loaded
        await browser.pause(1500);
        await this.btnContinue.click();

    }

    async verifyOKYC(data) {
        await this.cbPNach.click();
        await this.cbToPNACH.click();
        await this.btnGeneratePNACH.click();
        await this.rbNonAadharKyc.waitForExist({ timeout: 20000 });
        await this.rbNonAadharKyc.waitForClickable({ timeout: 20000 });
        await this.rbNonAadharKyc.click();
        await this.btnNextKycPage.click();

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

    async uploadDocuments(data) {
        await this.uploadSevenDocuments();
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
        await this.btnUnprocessedAvanse.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnDocumentVarificationLink(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVarificationLink(appId).click();
        await this.btnApprove.waitForExist({ timeout: 20000 });
        await this.verifyDocuments();
        await this.btnDocVerified.click();
        await this.submitFeedback()
    }

    async lmsVerifyDocumentsForFinOpsApproved(appId) {
        await browser.pause(8000)
        await this.btnManageLoan.waitForExist({ timeout: 30000 });
        await this.btnManageLoan.click();
        await this.btnProcessedAvanse.waitForDisplayed();
        await this.btnProcessedAvanse.click();
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await mongoConnect.avanseAddOrderId(appId)
        await browser.refresh()
        await this.btnDocumentVarificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVarificationLinkProcessed(appId).click();
        await this.btnApprove.waitForExist({ timeout: 20000 });
        await this.verifyDocuments();
        await this.btnDocReceivedAndFinOpsApprove.click();
        await browser.waitUntil(async () => await this.popUpLoanApproved.getText() == `AppId : ${appId} Fin Ops Approved successfully`,
            {
                timeout: 30000,
                timeoutMsg: 'Fin ops is not approved '
            })
    }

    async createLoan(appId) {
        await browser.pause(5000)
        await this.btnAbbTicketSearchBox.setValue(appId);
        await browser.keys("Enter");
        await this.btnDocumentVarificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
        await this.btnDocumentVarificationLinkProcessed(appId).click();
        await this.btnApprove.waitForExist({ timeout: 20000 });
        await this.verifyDocuments();
        await this.btnCreateLoan.click()
        await browser.waitUntil(async () => await this.popUpLoanApproved.isDisplayed() == true,
            {
                timeout: 130000,
                timeoutMsg: 'Loan is not created'
            })
        let appIdText = await this.popUpLoanApproved.getText()
        return appIdText;
    }
}

export default new AvanseLoan();
