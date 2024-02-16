import BasePage from '../gateway_payments_page/base.page';
import mongoConnect from '../../utils/mongoconnect';
import TLPOrderPage from './tlp.order.Page';
import { iiflData } from '../../data/iifl.loanform.data';



class IIFLLoan extends BasePage {

  get btnIIFLPay() { return $("//a[@href='/iifl']/button") }
  get btnProceed() { return $("//button[text()='Proceed']") }
  get btnResendOtp() { return $("//button[text()='Resend OTP']") }
  get btnSkipUploadDocument() { return $("//button[text()='Skip Extract Page']") }
  get tfTLpInitiatedAppId() {return $("//input[@name='previousAppId']")}
  get btnEnableWebApp() {return $("//button[normalize-space()='Enable Web App']")}
  get tfPanNumber() { return $("input[name='panNo']") }
  get tfAadharNumber() { return $("input[name='aadharNo']") }
  get tfDob() { return $("input[name='dateOfBirth']") }
  get ddDobYear() { return $("span[class*='year-read-view--down']") }
  ddDobYearSelector(year) { return $("//div[text()='" + year + "']") }
  get ddDobMonth() { return $("span[class*='month-read-view--selected']") }
  ddDobMonthSelector(month) { return $("//div[text()='" + month + "']") }
  ddDobDaySelector(day) { return $("//div[@aria-label='day-" + day + "']") }
  get ddGender() { return $("//label[@for='Gender']/../div/div") }
  get tfPhoneNumber() { return $("input[label='Mobile No']") }
  get tfEmailAddress() { return $("input[name='emailAddress']") }
  get tfFathersName() { return $("input[name='fathersName']") }
  get ddOccupationType() { return $("//label[@for='Occupation Type']/../div/div") }
  get ddQualification() { return $("//label[@for='Education Qualification']/../div/div") }
  get tfIncome() { return $("input[name='incomeSlab']") }
  get ddMartialStatus() { return $("//label[@for='Marital Status']/../div/div") }
  get ddResidenceType() { return $("//label[@for='Residence Type']/../div/div") }
  get tfAlternateMobileNo() { return $("input[name='alternateTelephoneNumber']") }
  get tfMothersName() { return $("input[name='mothersName']") }
  get tfStudentsName() { return $("input[name='studentName']") }
  get tfStudentsDob() { return $("input[name='studentDob']") }
  get ddEmployomentType() { return $("//label[@for='Employment Type']/../div/div") }
  get tfBorrowersAddress() { return $("input[name='addressLine1']") }
  get tfBorrowersPinCode() { return $("input[name='pinCode']") }
  get ddCityName() { return $("//label[@for='City']/../div/div") }
  get ddStateName() { return $("//label[@for='State']/../div/div") }
  get tfLoanAmount() { return $("input[name='requestedLoanAmount']") }
  get ddLoanTenure() { return $("//label[@for='Loan Tenure']/../div/div") }
  get tfProductName() { return $("input[name='productName']") }
  get cbToSendOtp() { return $("input[type='checkbox']") }
  get btnSendOtp() { return $("//button[text()='Send OTP']") }
  get nextTab() { return $("(//button[text()='Next'])[1]") }
  get tfBorrowerFirstName() { return $("//input[@name='applicantFirstName']") }
  get tfBorrowerMiddleName() { return $("//input[@name='applicantMiddleName']") }
  get tfBorrowerlastName() { return $("//input[@name='applicantLastName']") }

  get btnCheckCibilScore() { return $("//button[normalize-space()='Check Credit Bureau Score']") }
  get btnIIFLHistory() { return $("//a[@href='/iifl']/..//button[text()='History']") }
  get btnIIFLHistoryUnprocessed() { return $("//a[@href='/iifl']/..//div/a[text()='Unprocessed']") }
  getAppId(panNumber) { return $("(//span[text()='" + panNumber + "']/../../preceding-sibling::p)[2]//span[2]") }

  get btnContinue() { return $("//button[contains(text(),'Continue')]") }
  get rbBankStatementPassbook() { return $("//h5[text()='Bank Statement Passbook(2 photos)']") }
  get ddBankStatementSource() { return $("//label[@for='bankStatementSource']/../div/div") }
  get rbUploadDocument() { return $("//label[text()='Upload Document']") }
  get btnChooseFile() { return $("#file") }
  get btnUploadFile() { return $("(//button[@type='button'])[4]") }

  get ddNameTitle() { return $("//label[@for='Title']/../div/div") }
  get tfCustomerName() { return $("input[name='name']") }
  get tfAccountNumber() { return $("input[name='accountNumber']") }
  get ddAccountType() { return $("//label[@for='Account Type']/../div/div") }
  get ddBankName() { return $("//label[@for='Bank Name']/../div/div") }
  get btnBankBranch() { return $("//button[text()='Search Branch']") }
  get rbBankBranch() { return $("//td[text()='ABHY0065001']/..//input") }
  get btnSelectBranch() { return $("//button[text()='Select']") }
  get btnContinue() { return $("//button[contains(text(),'Continue')]") }
  get btnAddMorePhoto() { return $("//button[contains(text(),' Add More')]") }
  get btnNextPage() { return $("//button[contains(text(),'Next Page')]") }
  btnResume(appId) { return $(`//a[@href='/iifl?appId=${appId}']`) }
  get btnSignInWithGoogle() { return $("//button[contains(text(),'Sign In With Google')]") }
  get btnContinueWithGoogle() { return $("(//button[@name='googleSignUpButton'])[2]") }
  get tfEnterMailAddress() { return $("input[id='identifierId']") }
  get btnNext() { return $("//span[text()='Next']/..") }
  get tfEnterPassword() { return $("input[type='password']") }
  get payBtnPayu() { return $("//a[@href='/payu']/button") }
  get btnManageUtilities() { return $("a[href='/manage-utilities']") }
  get btnAbbTicket() { return $("//p[text()='ABB Tickets']") }
  btnOpenAppId(appId) { return $("//div[text()='" + appId + "']") }
  get tfMinimumBalance() { return $("//tr[@role='row']/td[3]/input") }
  get tfMaximumBalance() { return $("//tr[@role='row']/td[4]/input") }
  get rbHighRisk() { return $("//input[@name='highRisk'  and @value='low']") }
  get ddLoanStatus() { return $("//label[text()='Loan status']/../div") }
  get applicantsResponse(){ return $("(//div[@class='Select-placeholder'])[1]")}
  get btnSubmit() { return $("//button[text()='Submit']") }
  get btnSaveSheet() { return $("//button[text()='Save Sheet']") }

  get ddSelectEmiDate() { return $("//label[@for='First EMI Date']/../div/div") }

  get cbToPNACH() { return $("input[type='checkbox']") }
  get btnGeneratePNACH() { return $("//button[text()='Generate PNACH']") }
  get rbNonAadharKyc() { return $("//h6[text()='Non Aadhaar OTP Based KYC']/../input") }
  get btnNextKycPage() { return $("//button[contains(text(),'Next')]") }
  get btnDone() { return $("//button[text()='Done']") }

  get btnManageLoan() { return $("//a[@href='/manage-loan']") }
  get btnUnprocessedIIFL() { return $("//a[@href='/manage-loan/unprocessed/iifl']") }
  btnDocumentVarificationLink(appId) { return $("//a[@href='/manage-loan/unprocessed/iifl/approveLoan/docapproved/" + appId + "']") }
  get btnPreview() { return $("//button[contains(text(),'Preview')]") }
  cbVerify(num) { return $("(//input[@type='checkbox'])[" + num + "]") }
  get cbPNach() { return $("input[name='physicalNach']") }
  get btnApproveDocuments() { return $("//button[contains(text(),'Approve Documents')]") }
  get btnApprove() { return $("//button[contains(text(),'APPROVE')]") }
  get tfEmailAddressLMS() { return $("input[name='emailAddress']") }
  get btnDocVerified() { return $("//button[contains(text(),'Doc Verified')]") }
  get btnDocReceivedAndFinOpsApprove() { return $("//button[text()='Doc Received & Fin Ops Approve']") }

  get btnclose() { return $(`//button[normalize-space()='Close']`) }

  get btnProcessedIIFL() { return $("//a[@href='/manage-loan/processed/iifl']") }

  btnDocumentVerificationLinkProcessed(appId) { return $(`//a[contains(@href,'${appId}')]`) }

  get btnCreateLoan() { return $("//button[text()='Create Loan']") }

  getErrorMsgDropdownElement(fieldText) { return $(`//small[text()='${fieldText}']`) }
  getErrorMsgTextFieldElement(fieldName) { return $(`//input[@name='${fieldName}']/../div[@class='invalid-feedback']`) }
  get ErrorMsgBankStatementUpload() { return $("//div[@role='alert']//li") }
  get ErrorMsgLmsPortal() { return $("//span[text()='Please enter all required details!']") }

  get btnAbbTicketSearchBox() { return $("//input[@name='searchText']") }
  get tfIfscCode() { return $("//input[@name='ifsc']") }
  get tfMicrCode() { return $("//input[@name='micr']") }
  get tfBranchCity() { return $("//input[@name='city']") }
  get waitForopsTeamApprovalTimer() { return $("//div[@id='timer']") }
  get btnSendEsign() { return $("//button[text()='Send Esign']") }
  get ErrorMsgLmsPortal() { return $("//span[text()='Please enter all required details!']") }

  lmsVerifyingDocuments(fieldName) { return $("//span[@class='MuiTab-wrapper']/./span[text()='" + fieldName + "']") }
  getverifyAppId(appId) { return $("//td[text()='" + appId + "']") }
  getDocumentsList(list) { return $(`(//span[@class='MuiTab-wrapper'])[${list}]`) }
  get popUpLoanApproved() { return $('div.s-alert-box-inner>span') }

  get loanstatus() { return $('//div[@class="modal-body"]//p[2]') }

  getddGenderOptions(index) { return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`) }
  getddQualificationOptions(index) { return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`) }
  getddEmploymentTypeOptions(index) { return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`) }
  getddLoanTenureOptions(index) { return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`) }
  getddTitleOptions(index) { return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`) }
  getddAccountTypeOptions(index) { return $(`//div[@class='css-11unzgr']/div[contains(@id,"option-${index}")]`) }

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
  get tfAddressField() {
    return $("input[name='addressLine1']")
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
        const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
        await this.btnChooseFile.setValue(filePath);
        await this.btnUploadFile.waitForClickable({ timeout: 10000 });
        await this.btnUploadFile.click();
        if (i < 2) {
          await this.btnAddMorePhoto.waitForClickable({ timeout: 10000 });
          await this.btnAddMorePhoto.click();
        }
      }
      catch { }
    }

  }

  async uploadDocumentsImages() {
    // uploading one pancard image seven times for all the documents required
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
    for (let i = 4; i <= 11; i++) {

      await this.getDocumentsList(i).waitForExist({ timeout: 30000 });
      if (this.getDocumentsList(i).isClickable() == false) {
        await this.getDocumentsList(i).scrollIntoView();
        await this.getDocumentsList(i).waitForClickable({ timeout: 30000 });
      }
      await this.getDocumentsList(i).click()
      try {
        if (await this.btnApprove.isExisting() == false) {
          await this.btnApprove.waitForExist({ timeout: 30000 })
        }
      }
      catch { }

      try {
        await this.btnApprove.waitForExist({ timeout: 2000 })
        await this.btnApprove.click();
      }
      catch { }
      // wait for documents to upload to avoid click intercepted exception
      await browser.pause(3000);
    }
  }
  async loginPaymentPage(username, password) {
    await browser.pause(10000);
    let googleSignInBtnDisplayed = await this.btnSignInWithGoogle.isDisplayed({ timeout: 40000 });
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
    await this.btnIIFLPay.waitForExist({ timeout: 600000 });
  }

  async customerDetails(data,appId) {
    await this.btnSkipUploadDocument.waitForExist({ timeout: 10000 })
    await this.btnSkipUploadDocument.click();
    await this.tfTLpInitiatedAppId.waitForClickable({ timeout: 15000 })
    await this.tfTLpInitiatedAppId.setValue(appId)
    await this.btnEnableWebApp.waitForClickable({ timeout: 22000 })
    await this.btnEnableWebApp.click()
    await this.tfAadharNumber.waitForClickable({ timeout: 15000 });
    await this.tfAadharNumber.setValue(data.AadharNumber);
    await this.tfDob.waitForClickable({ timeout: 60000 });
    await this.tfDob.click();
    await this.ddDobYear.click();
    await this.ddDobYearSelector(data.dobYear).click();
    await this.ddDobMonth.click();
    await this.ddDobMonthSelector(data.dobMonth).click();
    await this.ddDobDaySelector(data.dobDate).click();
    await this.ddGender.click();
    await browser.keys(data.gender);
    await this.tfEmailAddress.setValue(data.email);
    await this.tfFathersName.setValue(data.fathersName);
    await this.tfBorrowersAddress.waitForClickable();
    await this.tfBorrowersAddress.click()
    await this.tfBorrowersAddress.setValue(data.borrowersAddress);
    await this.tfBorrowersPinCode.setValue(data.borrowersPinCode);
    await this.tfLoanAmount.setValue(data.payableAmount);
    await this.ddLoanTenure.waitForClickable({ timeout: 60000 });
    await this.ddLoanTenure.click();
    await browser.keys(data.loanTenure);
    await this.tfProductName.setValue(data.productName);
    await this.ddStudentGrade.click()
    await browser.keys(["5", "Tab"])
    await this.cbToSendOtp.click();
    await this.nextTab.click();
    try { await this.tfBorrowerFirstName.waitForDisplayed({ timeout: 20000 }) }
    catch { }
    if (await this.tfBorrowerFirstName.isDisplayed({ timeout: 4000 })) {
      await this.tfBorrowerFirstName.setValue(data.fathersName);
      await this.tfBorrowerMiddleName.setValue("S")
      await this.tfBorrowerlastName.setValue("Lastname");
      await this.nextTab.click();
    }
    else { }

    await this.clickOnProceedBtn()
  }

  async createTlpAppId(data)
    {
      let loanVendor = "iifl"
        let dataId = await mongoConnect.tlPayAppIdCreation(data.panNumber);
        let appId = dataId[0];
        let kartLeadId = dataId[1];
        await TLPOrderPage.createTlpObject(appId);
        await TLPOrderPage.updatePermitRequest(appId, kartLeadId)
        await TLPOrderPage.openUrlWithKartId(kartLeadId, loanVendor)
        return appId;
    }

  async enterCustomerAndLoanDetails(data)
  {
    let appId = await this.createTlpAppId(iiflData.iiflValidDetails)
    await this.customerDetails(data,appId)
    //Additional Details tab
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
    await this.tfMothersName.setValue(data.mothersName);
    await this.tfAlternateMobileNo.setValue("9867885466");
    await this.tfStudentsName.setValue(data.studentsName);
    await this.tfStudentsDob.waitForClickable();
    await this.tfStudentsDob.click();
    await this.ddDobYear.click();
    await this.ddDobYearSelector(data.dobYear).click();
    await this.ddDobMonth.click();
    await this.ddDobMonthSelector(data.dobMonth).click();
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

  async clickOnProceedBtn() {
    //when test cases are executed in bulk sometimes proceed button pop up appears and sometimes it doesn't 
    try { await this.btnProceed.waitForDisplayed({ timeout: 15000 }) }
    catch { }
    if (await this.btnProceed.isDisplayed()) {
      await this.btnProceed.waitForExist({ timeout: 10000 })
      await this.btnProceed.click();
      //await this.tfMothersName.waitForExist({ timeout: 70000 })
    }
    else {

    }
  }

  async returnAppId(panNumber) {
    await this.btnIIFLHistory.click();
    await this.btnIIFLHistoryUnprocessed.click();
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
    await this.btnContinue.click();
    await this.rbBankStatementPassbook.waitForClickable({ timeout: 10000 });
    await this.rbBankStatementPassbook.click();
    await this.ddNameTitle.click();
    await browser.keys(["M", "r", "Tab"]);
    await this.tfCustomerName.setValue("Dummy customer name");
    await this.tfAccountNumber.setValue("3255637699");
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
    let googleSignInBtnDisplayed = await this.btnSignInWithGoogle.isDisplayed({ timeout:30000 });
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
    await this.ddLoanStatus.waitForClickable({ timeout: 20000 })
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

  async selectEmiDateAndApproveLoanAgreement(data) {
    await this.ddSelectEmiDate.waitForClickable({ timeout: 40000 });
    await this.ddSelectEmiDate.waitForExist({ timeout: 40000 });
    await this.ddSelectEmiDate.click();
    await browser.keys("Tab");
    await this.btnContinue.click();
    await this.btnContinue.waitForEnabled({ timeout: 3000 });
    await this.btnContinue.click();
  }

  async verifyOKYC(data) {
    await this.cbPNach.click();
    await this.cbToPNACH.click();
    await this.btnGeneratePNACH.click();
    await this.rbNonAadharKyc.waitForExist({ timeout: 60000 });
    await this.rbNonAadharKyc.waitForClickable({ timeout: 20000 });
    await this.rbNonAadharKyc.click();
    await this.btnNextKycPage.click();
  }

  async uploadDocuments(data) {
    await this.uploadDocumentsImages();
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
    await this.btnUnprocessedIIFL.click();
    await this.btnAbbTicketSearchBox.setValue(appId);
    await browser.keys("Enter");
    await this.btnDocumentVarificationLink(appId).waitForExist({ timeout: 10000 });
    await this.btnDocumentVarificationLink(appId).click();
    await this.btnApprove.waitForExist({ timeout: 20000 });
    await this.verifyDocuments();
    await this.btnDocVerified.click();
    await this.submitFeedback()
  }

  async submitFeedback() {
    await this.btnNoTab.waitForClickable({ timeout: 20000 })
    await this.btnNoTab.click()
    await this.ddSelectReason.waitForClickable({ timeout: 20000 })
    await this.ddSelectReason.click()
    await browser.keys(["N","o" ,"Tab"])
    await this.btnSubmit.waitForClickable({ timeout: 20000 })
    await this.btnSubmit.click()
  }

  async lmsVerifyDocumentsForFinOpsApproved(appId) {
    await browser.pause(8000)
    await this.btnManageLoan.waitForExist({ timeout: 30000 });
    await this.btnManageLoan.click();
    await this.btnProcessedIIFL.waitForDisplayed();
    await this.btnProcessedIIFL.click();
    await this.btnAbbTicketSearchBox.setValue(appId);
    await browser.keys("Enter");
    await mongoConnect.iiflAddOrderId(appId)
    await browser.refresh()
    await this.btnDocumentVerificationLinkProcessed(appId).waitForExist({ timeout: 10000 });
    await this.btnDocumentVerificationLinkProcessed(appId).click();
    await this.btnApprove.waitForExist({ timeout: 20000 });
    await this.verifyDocuments();
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

export default new IIFLLoan();