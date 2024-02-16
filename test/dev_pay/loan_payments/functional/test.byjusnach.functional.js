import mongoConnect from "../../../../utils/mongoconnect";
import { AllureUtil as allure } from '../../../../utils/util.allure';
import byjusNachPage from '../../../../pages/loan_payments_page/byjusnach.payment.page';
import { byjusNachData } from '../../../../data/byjusnach.loanform.data';
import { dataToMoveTo } from '../../../../data/byjusnach.move.to.particular.page';



describe('Verify functional validation for byjus Nach payment option', async function () {
  this.retries(2)
  beforeEach('Open payment portal', async () => {
    await browser.maximizeWindow();
    allure.startStep('Open Byjus payment login page');
    await byjusNachPage.openByjusPayPage();
    allure.startStep('Login to the payment page', true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
    await mongoConnect.byjusNachDeleteObjectFromDb(byjusNachData.byjusNachValidData.panNumber, byjusNachData.byjusNachValidData.phoneNumber);
  })

  afterEach('Delete object from DB  ', async () => {
    allure.startStep('Delete Pancard  and telephone Number from db after each test case ');
    await mongoConnect.byjusNachDeleteObjectFromDb(byjusNachData.byjusNachValidData.panNumber, byjusNachData.byjusNachValidData.phoneNumber);

  })

  it('Validate Continue button is disabled until we click on I, hereby, confirm checkbox(Upload bank statement page)', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    allure.startStep('Login to the payment page', true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open nach Unprocessed loan & get appId', true);
    let appId = await byjusNachPage.returnAppId(panNumber);
    allure.startStep('Address of window is stoted in a variable');
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Refresh browser', true);
    await browser.refresh();
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('clicking on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Waiting for Bank statement radio button to be clickable', true);
    await byjusNachPage.uploadBankStatement2Photo.waitForClickable({ timeout: 10000 });
    allure.startStep('Click on for Bank statement radio button', true);
    await byjusNachPage.uploadBankStatement2Photo.click();
    allure.startStep('Checking is Continue button is disabled or not', true);
    await expect(await byjusNachPage.btnContinue.isClickable()).toEqual(false);
    allure.endStep();
  })

  it('Validate search Branch button is disabled until you select Bank Name', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusnachAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
    allure.startStep("Refresh the page", true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep("Select Bank statement passbook radio button", true);
    await byjusNachPage.uploadBankStatement2Photo.click();
    allure.startStep("Click on Name title field", true);
    await byjusNachPage.ddNameTitle.click();
    allure.startStep("Set value to Mr in the drop down", true);
    await browser.keys(["M", "r", "Tab"]);
    allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
    await byjusNachPage.tfCustomerName.setValue("Dummy Customer name");
    allure.startStep("Set value to random account number in the Account Number text field", true);
    await byjusNachPage.tfAccountNumber.setValue("27358475658");
    allure.startStep("Click on account type drop down", true);
    await byjusNachPage.ddAccountType.click();
    allure.startStep("Select saving account option", true);
    await browser.keys(["S", "a", "v", "Tab"]);
    allure.startStep("Verify that search  branch button is disabled", true);
    await expect(await byjusNachPage.btnBranch.isClickable()).toEqual(false);
    allure.endStep();
  })

  it('Validate Continue button is disabled until you fill all the required fields', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusnachAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
    allure.startStep("Refresh the page", true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep("Select Bank statement passbook radio button", true);
    await byjusNachPage.uploadBankStatement2Photo.click();
    allure.startStep("Click on Name title field", true);
    await byjusNachPage.ddNameTitle.click();
    allure.startStep("Select Mr from drop down", true);
    await browser.keys(["M", "r", "Tab"]);
    allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
    await byjusNachPage.tfCustomerName.setValue("Customer name");
    allure.startStep("Set value to 973584758 in the Account Number text field", true);
    await byjusNachPage.tfAccountNumber.setValue("973584758");
    allure.startStep("Click on Account type field", true);
    await byjusNachPage.ddAccountType.click();
    allure.startStep("Select Savings option from drop down", true);
    await browser.keys(["S", "a", "v", "Tab"]);
    allure.startStep("Click on Bank name field", true);
    await byjusNachPage.ddBankName.click();
    allure.startStep("Select Abhyudaya bank from drop down", true);
    await browser.keys(["A", "B", "H", "Y", "", "Tab"]);
    allure.startStep("Verify continue button is disabled", true);
    await expect(await byjusNachPage.btnContinue.isClickable()).toEqual(false);
    allure.endStep();
  })

  it('Validate if all the above step are correct than continue button should be enabled', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
    allure.startStep("Creating new object in Abb assesements collection", true);
    await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Go to LMS portal & approve the loan for given appId', true);
    await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
    allure.startStep('Close the Lms window', true);
    await browser.closeWindow();
    allure.startStep('Switch to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Wait for the First EMI drop drown to be clickable', true);
    await byjusNachPage.ddfirstEmiDate.waitForClickable({ timeout: 30000 });
    allure.startStep('Wait for the First EMI drop drown to be exist', true);
    await byjusNachPage.ddfirstEmiDate.waitForExist({ timeout: 30000 });
    allure.startStep('Click on First EMI drop down', true);
    await byjusNachPage.ddfirstEmiDate.click();
    allure.startStep('Select the EMI date', true);
    await browser.keys("Tab");
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    // 2 sec hard wait for the element to eb clickable (tried waitForClickable and waitforDisplayed)
    allure.startStep('2 sec wait', true);
    await browser.pause(2000);
    allure.startStep('Verify that Continue button is enabled', true);
    await expect(await byjusNachPage.btnContinue.isClickable()).toEqual(true);
    allure.endStep();
  })

  it('Validate the error message we get when we click on upload button without choosing the file(Upload documents page)', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
    allure.startStep("Creating new object in Abb assesements collection", true);
    await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Go to LMS portal & approve the loan for given appId', true);
    await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
    allure.startStep('Close the LMS portal window', true);
    await browser.closeWindow();
    allure.startStep('Switch to payments window', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
    await byjusNachPage.selectEmiDateAndApproveLoanAgreement(panNumber);
    allure.startStep('Verofy OKYC', true);
    await byjusNachPage.verifyOKYC();
    allure.startStep('Wait for the upload file button to be Clickable', true);
    await byjusNachPage.btnUploadFile.waitForClickable({ timeout: 10000 });
    allure.startStep('Click on upload file button', true);
    await byjusNachPage.btnUploadFile.click();
    allure.startStep('Wait for the error message to be displayed', true);
    await byjusNachPage.ErrorMsgBankStatementUpload.waitForDisplayed({ timeout: 5000 })
    allure.startStep('Verify the correct error message is displayed', true);
    await expect(await byjusNachPage.ErrorMsgBankStatementUpload.getText()).toEqual('You need to click photo first or select file to upload');
    allure.endStep();
  })

  it('Validate loan tenure drop down', async () => {
    allure.startStep('Click on the byjus nach pay button', true);
    await byjusNachPage.byjusNachpayBtn.click();
    allure.startStep('wait for tenure drop down to be displayed', true);
    await byjusNachPage.ddLoanTenure.waitForClickable({ timeout: 8000 });
    allure.startStep('click on loan tenure drop down', true);
    await byjusNachPage.ddLoanTenure.click();
    allure.startStep('Verify loan tenure drop down options to be displayed ', true);
    let loanTenureList = byjusNachData.loanTenureOptions.options.length;
    for (let i = 0; i < loanTenureList; i++) {
      await byjusNachPage.getLoanTenureOptions(0).waitForDisplayed({ timeout: 3000 });
      await expect(await byjusNachPage.getLoanTenureOptions(i).getText()).toEqual(byjusNachData.loanTenureOptions.options[i]);

    }
    allure.endStep();
  });

  it('Verify the ID proof type drop down ', async () => {
    allure.startStep('Click on the byjus nach pay button', true);
    await byjusNachPage.byjusNachpayBtn.click();
    allure.startStep('wait for tenure drop down to be displayed', true);
    await byjusNachPage.ddIdProofType.waitForClickable({ timeout: 8000 });
    allure.startStep('click on loan tenure drop down', true);
    await byjusNachPage.ddIdProofType.click();
    allure.startStep('Verify loan tenure drop down options to be displayed ', true);
    let idProoftypeList = byjusNachData.idProofTypeOptions.options.length;
    for (let i = 0; i < idProoftypeList; i++) {
      await byjusNachPage.getIdProofOptions(0).waitForDisplayed({ timeout: 3000 });
      await expect(await byjusNachPage.getIdProofOptions(i).getText()).toEqual(byjusNachData.idProofTypeOptions.options[i]);

    }
    allure.endStep();
  });

  it('Validate After filling all valid details of customer check otp page should be displayed', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep('wait for an  verify OTP button to be displayed', true);
    await byjusNachPage.btnVerifyOtp.waitForExist({ timeout: 14000 });
    allure.startStep('Verify Otp button is displayed on check  otp Page', true);
    await expect(await byjusNachPage.btnVerifyOtp.isDisplayed()).toEqual(true);
    allure.endStep();

  });

  it.skip('Validate Abb ticket created successfully pop up after uploading bank statement', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    allure.startStep('Login to the payment page', true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus nach Unprocessed loan & get appId', true);
    let appId = await byjusNachPage.returnAppId(panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('click on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Upload bank statement & enter bank details', true);
    await byjusNachPage.uploadBankStatement();
    allure.startStep('Verify abb ticket created successfully pop up', true);
    await browser.waitUntil(async () => await byjusNachPage.popUpAbbTicketCreated.getText() == "Ticket created successfully", {
      timeout: 15000
    })
    allure.endStep();

  });

  it('Verify after uploading bank statement it should take you to account details page', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
    allure.startStep("Creating new object in Abb assesements collection", true);
    await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Go to LMS portal & approve the loan for given appId', true);
    await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
    allure.startStep('Close the Lms window', true);
    await browser.closeWindow();
    allure.startStep('Switch to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('wait for account number text to be displayed', true);
    await byjusNachPage.accountNumberText.waitForDisplayed({ timeout: 20000 })
    allure.startStep('verify account number text on account details page', true);
    await expect(await byjusNachPage.accountNumberText.getText()).toEqual("Account Number *");
    allure.endStep();
  });

  it('Verify the title Drop down in account details page', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusnachAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
    allure.startStep("Refresh the page", true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep("Select Bank statement passbook radio button", true);
    await byjusNachPage.uploadBankStatement2Photo.click();
    allure.startStep("Click on Name title field", true);
    await byjusNachPage.ddNameTitle.click();
    allure.startStep('Verify all option in Title drop down should be appear', true);
    let titleList = byjusNachData.genderOptions.options.length;
    for (let i = 0; i < titleList; i++) {
      await byjusNachPage.getddAllGender(0).waitForDisplayed({ timeout: 3000 });
      await expect(await byjusNachPage.getddAllGender(i).getText()).toEqual(byjusNachData.genderOptions.options[i]);
    }
    allure.endStep();
  });

  it('Verify Account type drop down in account details page', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusnachAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
    allure.startStep("Refresh the page", true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep("Select Bank statement passbook radio button", true);
    await byjusNachPage.uploadBankStatement2Photo.click();
    allure.startStep("Click on account type drop down", true);
    await byjusNachPage.ddAccountType.click();
    allure.startStep('wait for an account type drop down elements to be displayed', true);
    await byjusNachPage.getAccountTypeOptions(0).waitForDisplayed({ timeout: 20000 });
    allure.startStep('verify drop down options for account type', true);
    let accountTypeList = byjusNachData.accountTypeOptions.options.length;
    for (let i = 0; i < accountTypeList; i++) {
      await expect(await byjusNachPage.getAccountTypeOptions(i).getText()).toEqual(byjusNachData.accountTypeOptions.options[i]);
    }
    allure.endStep();
  });

  it('Validate After Selecting Branch rest of the details should be filled and are un editable ', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusnachAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
    allure.startStep("Refresh the page", true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep("Select Bank statement passbook radio button", true);
    await byjusNachPage.uploadBankStatement2Photo.click();
    allure.startStep('click on bank drop down', true);
    await byjusNachPage.ddBankName.click();
    allure.startStep('Select the bank from drop down', true);
    await browser.keys(["A", "B", "h", "Y", "Tab"]);
    allure.startStep('click on branch button', true);
    await byjusNachPage.btnBranch.click();
    allure.startStep('select the bank branch radio buton', true);
    await byjusNachPage.rbBranch.click();
    allure.startStep('select the bank branch ', true);
    await byjusNachPage.btnselect.click();
    allure.startStep('Specify locator according to bank branch details', true);
    const ifsc = await byjusNachPage.getbankDetails(1);
    const micr = await byjusNachPage.getbankDetails(2);
    const city = await byjusNachPage.getbankDetails(3);
    allure.startStep('Verify the value of ifsc', true);
    await expect(await ifsc.getAttribute("value")).toEqual(byjusNachData.BankBranchDeatils.ifsc);
    allure.startStep('Verify the ifsc field is disabled', true);
    await expect(await ifsc.isEnabled()).toEqual(false);
    allure.startStep('Verify the value of micr', true);
    await expect(await micr.getAttribute("value")).toEqual(byjusNachData.BankBranchDeatils.micr);
    allure.startStep('Verify the micr field is disabled', true);
    await expect(await micr.isEnabled()).toEqual(false);
    allure.startStep('Verify the value of city', true);
    await expect(await city.getAttribute("value")).toEqual(byjusNachData.BankBranchDeatils.city);
    allure.startStep('Verify the city field is disabled', true);
    await expect(await city.isEnabled()).toEqual(false);
    allure.endStep();
  });

  it.skip('Validate after uploading 2 passbook images Next Page button should be displayed', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusnachAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
    allure.startStep("Refresh the page", true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Wait for upload bank statement photo tab to be exist', true);
    await byjusNachPage.uploadBankStatement2Photo.waitForExist({ timeout: 5000 })
    allure.startStep('Click on upload bank statement photo tab', true);
    await byjusNachPage.uploadBankStatement2Photo.click()
    allure.startStep('Fill account details', true);
    await byjusNachPage.fillAccountDetails();
    allure.startStep('Wait for upload document button to be clickable', true);
    await byjusNachPage.rbUploadDocument.waitForClickable({ timeout: 10000 });
    allure.startStep('Click on  upload document radio button', true);
    await byjusNachPage.rbUploadDocument.click();
    allure.startStep('Upload passbook images', true);
    await byjusNachPage.uploadPassbookImages();
    allure.startStep('Verify next page button after uploading 2 passbook images.', true);
    await expect(await byjusNachPage.btnNextPage.getText()).toEqual("Next Page");
    allure.endStep();
  });

  it.skip('Validate that  Add More button is displayed on after you upload one passbook photo', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);

    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusnachAddDetailsToAccountInfo(appId, dataToMoveTo.AccountInfo);
    allure.startStep("Refresh the page", true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Wait for upload bank statement photo tab to be exist', true);
    await byjusNachPage.uploadBankStatement2Photo.waitForExist({ timeout: 5000 })
    allure.startStep('Click on upload bank statement photo tab', true);
    await byjusNachPage.uploadBankStatement2Photo.click()
    allure.startStep('Fill account details', true);
    await byjusNachPage.fillAccountDetails();
    allure.startStep('Wait for upload document button to be clickable', true);
    await byjusNachPage.rbUploadDocument.waitForClickable({ timeout: 10000 });
    allure.startStep('Click on  upload document radio button', true);
    await byjusNachPage.rbUploadDocument.click();
    allure.startStep('Create FilePtah for uploading passbook image', true);
    const path = require('path');
    const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
    allure.startStep('Wait for choose file button to be displayed', true);
    await byjusNachPage.btnChooseFile.waitForDisplayed({ timeout: 10000 })
    allure.startStep('Set filepath and upload passbook image', true);
    await byjusNachPage.btnChooseFile.setValue(filePath);
    allure.startStep('wait for Upload File button to be displayed', true);
    await byjusNachPage.btnUploadFile.waitForClickable({ timeout: 10000 });
    allure.startStep('Click on  upload file button', true);
    await byjusNachPage.btnUploadFile.click();
    allure.startStep('Wait for add more button to be displayed', true);
    await byjusNachPage.btnAddMorePhoto.waitForDisplayed({ timeout: 10000 })
    allure.startStep('Verify add more button exist after uploading image', true);
    await expect(await byjusNachPage.btnAddMorePhoto.isExisting()).toEqual(true);
    allure.endStep();

  });

  it.skip('Verify after uploding 2 photos and clicking on next button OPS approval timer is started', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);

    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    allure.startStep('Login to the payment page', true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus nach Unprocessed loan & get appId', true);
    let appId = await byjusNachPage.returnAppId(panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('click on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Upload bank statement & enter bank details', true);
    await byjusNachPage.uploadBankStatement();
    allure.startStep('wait for tmer to be displayed', true);
    await byjusNachPage.waitingTimer.waitForDisplayed({ timeout: 10000 })
    allure.startStep('Verify timer is displayed', true);
    await expect(await byjusNachPage.waitingTimer.isDisplayed()).toEqual(true);
    allure.endStep();

  });


  it('Verify after approving Abb ticket by filling required details the first EMI drop down should be displayed', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
    allure.startStep("Creating new object in Abb assesements collection", true);
    await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Go to LMS portal & approve the loan for given appId', true);
    await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
    allure.startStep('Close the LMS portal window', true);
    await browser.closeWindow();
    allure.startStep('Switch to payments window', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('wait for for EMI date to be displayed', true);
    await byjusNachPage.ddfirstEmiDate.waitForExist({ timeout: 30000 });
    allure.startStep('Verify first EMI date drop down is visible', true);
    await expect(await byjusNachPage.ddfirstEmiDate.isDisplayed()).toEqual(true);
    allure.endStep();

  });

  it('Validate after completing nach mandate upload documents page should be displayed', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
    allure.startStep("Creating new object in Abb assesements collection", true);
    await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Go to LMS portal & approve the loan for given appId', true);
    await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
    allure.startStep('Close the LMS portal window', true);
    await browser.closeWindow();
    allure.startStep('Switch to payments window', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
    await byjusNachPage.selectEmiDateAndApproveLoanAgreement(panNumber);
    allure.startStep('Verofy OKYC', true);
    await byjusNachPage.verifyOKYC();
    allure.startStep('Wait for the upload file button to be exist', true);
    await byjusNachPage.btnUploadFile.waitForExist({ timeout: 10000 });
    allure.startStep('verify upload file button is exist on upload documents page', true);
    await expect(await byjusNachPage.btnUploadFile.isExisting()).toEqual(true)
    allure.endStep();
  });

  it('Validate after uploading the required documents Send Esign button is Clickable', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
    allure.startStep("Creating new object in Abb assesements collection", true);
    await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Go to LMS portal & approve the loan for given appId', true);
    await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
    allure.startStep('Close the LMS portal window', true);
    await browser.closeWindow();
    allure.startStep('Switch to payments window', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep("Add data to db to move to Send Esign page", true);
    await mongoConnect.ByjusNachAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
    allure.startStep('Refresh the browser');
    await browser.refresh();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('wait for send esign button to be clickable', true);
    await byjusNachPage.btnEsign.waitForClickable({ timeout: 20000 });
    allure.startStep('verify Esign button is clickable', true);
    await expect(await byjusNachPage.btnEsign.isClickable()).toEqual(true);
    allure.endStep();
  });

  it('Validate Done button is displayed on loan eligibility status after appId is soft approved', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
    allure.startStep("Creating new object in Abb assesements collection", true);
    await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Go to LMS portal & approve the loan for given appId', true);
    await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
    allure.startStep('Close the LMS portal window', true);
    await browser.closeWindow();
    allure.startStep('Switch to payments window', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep("Add data to db to move to Send Esign page", true);
    await mongoConnect.ByjusNachAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
    allure.startStep('Update Esign details in transactionscibil collection', true);
    await mongoConnect.updateEsignDetailsCibilRecord(appId);
    allure.startStep('Update Esign pdf document in transactionscibil collection', true);
    await mongoConnect.updateEsignPDFDocument(appId);
    allure.startStep('Refresh the browser');
    await browser.refresh();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Wait for done button to be displayed on application status page', true);
    await byjusNachPage.btnDone.waitForDisplayed({ timeout: 10000 });
    allure.startStep('Verify done button is displayed on application status page after app ID soft approved', true);
    await expect(await byjusNachPage.btnDone.getText()).toEqual("Done");
    allure.endStep();

  });
  it('Validate Genarate PNACH button is disabled when we dont click on The Customers Signature checkbox', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.byjusNachAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
    allure.startStep("Creating new object in Abb assesements collection", true);
    await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Go to LMS portal & approve the loan for given appId', true);
    await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
    allure.startStep('Close the LMS portal window', true);
    await browser.closeWindow();
    allure.startStep('Switch to payments window', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
    await byjusNachPage.selectEmiDateAndApproveLoanAgreement(panNumber);
    allure.startStep('wait for next button to be exist ', true);
    await byjusNachPage.nextButton.waitForExist({ timeout: 30000 })
    allure.startStep('click on next button', true);
    await byjusNachPage.nextButton.click()
    allure.startStep('Click on physical nach option', true);
    await byjusNachPage.rbPhysicalNach.click();
    allure.startStep('Wait for generate PNACH button to be displayed', true);
    await byjusNachPage.btnGeneratePNACH.waitForDisplayed({ timeout: 10000 })
    allure.startStep('Verify generate PNACH button is disabled', true);
    await expect(await byjusNachPage.btnGeneratePNACH.isEnabled()).toEqual(false)
    allure.endStep();
  });

  it('Validate if all the documents are approved Document Verified pop should be displayed and have correct  AppId', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
    let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
    allure.startStep("Open Order Page Url in new window", true);
    await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
    allure.startStep("Login to the payment page", true);
    await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep("Get app id from unprocessed loan page", true);
    let appId = await byjusNachPage.returnAppId(byjusNachData.byjusNachValidData.panNumber);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep("Add data to db to move to Ops team approval page", true);
    await mongoConnect.updateDocumentsInDb(appId, dataToMoveTo.WaitForOpsTeamApproval);
    allure.startStep("Creating new object in Abb assesements collection", true);
    await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
    allure.startStep('Refresh the page', true);
    await browser.refresh();
    allure.startStep('clicking on resume button', true);
    await byjusNachPage.btnResume(appId).click();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Go to LMS portal & approve the loan for given appId', true);
    await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTIN, appId, byjusNachData.byjusNachValidData);
    allure.startStep('Close the LMS portal window', true);
    await browser.closeWindow();
    allure.startStep('Switch to payments window', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep("Add data to db to move to Send Esign page", true);
    await mongoConnect.ByjusNachAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
    allure.startStep('Update Esign details in transactionscibil collection', true);
    await mongoConnect.updateEsignDetailsCibilRecord(appId);
    allure.startStep('Update Esign pdf document in transactionscibil collection', true);
    await mongoConnect.updateEsignPDFDocument(appId);
    allure.startStep('Refresh the browser');
    await browser.refresh();
    allure.startStep('Wait for continue button to be clickable', true);
    await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
    allure.startStep('Click on continue button', true);
    await byjusNachPage.btnContinue.click();
    allure.startStep('Go to LMS portal and approve all the documents', true);
    await byjusNachPage.lmsVerifyDocuments(appId);
    allure.startStep('Verify the pop for all documents are approved', true);
    await browser.waitUntil(async () => await byjusNachPage.popUpDocApproved.getText() == `All documents are verified`,
      {
        timeout: 20000
      })

    allure.endStep();
  });

})
