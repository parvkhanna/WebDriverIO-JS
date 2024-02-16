import mongoConnect from "../../../../utils/mongoconnect";
import { AllureUtil as allure } from '../../../../utils/util.allure';
import ByjusAssurePage from '../../../../pages/loan_payments_page/byjusAssure.payment.page';
import { byjusAssureData } from '../../../../data/byjusAssure.loanform.data';

describe('Verify functional validation for byjus Assure EMI payment option', async function () {
  this.retries(2)
  beforeEach('Open payment portal', async () => {
    await browser.maximizeWindow();
    allure.startStep('Open Byjus payment login page');
    await ByjusAssurePage.openByjusPayPage();
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
    await mongoConnect.byjusAssureDeleteObjectFromDb(byjusAssureData.byjusAssureValidData.panNumber, byjusAssureData.byjusAssureValidData.phoneNumber);
  })
  afterEach('Delete object from DB  ', async () => {
    allure.startStep('Delete Pancard  and telephone Number from db after each test case ');
    await mongoConnect.byjusAssureDeleteObjectFromDb(byjusAssureData.byjusAssureValidData.panNumber, byjusAssureData.byjusAssureValidData.phoneNumber);
  })

  it("Validate Send OTP button is disabled until I hereby, confirm checkbox is checked", async () => {
    allure.startStep("Click on the Byjus assure pay button");
    await ByjusAssurePage.byjusAssurepayBtn.click();
    allure.startStep("Wait for checkbox to be displayed", true);
    await ByjusAssurePage.cbToSendOtp.waitForClickable({ timeout: 60000 })
    allure.startStep("Verify that the button is not clickable", true);
    await expect(await ByjusAssurePage.btnSendOtp.isClickable()).toEqual(false);
    allure.endStep();
  })

  it('Validate After filling all valid details of customer check otp page should be displayed.', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus Assure loan & Click on sent OTP');
    await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('wait for an  verify OTP button to be displayed', true);
    await ByjusAssurePage.btnVerifyOtp.waitForExist({ timeout: 14000 });
    allure.startStep('Verify Otp button is displayed on check  otp Page', true);
    await expect(await ByjusAssurePage.btnVerifyOtp.isDisplayed()).toEqual(true);
    allure.endStep();
  });

  it('Validate loan tenure drop down', async () => {
    allure.startStep('Click on the byjus Assure pay button', true);
    await ByjusAssurePage.byjusAssurepayBtn.click();
    allure.startStep('wait for tenure drop down to be displayed', true);
    await ByjusAssurePage.ddLoanTenure.waitForClickable({ timeout: 8000 });
    allure.startStep('click on loan tenure drop down', true);
    await ByjusAssurePage.ddLoanTenure.click();
    allure.startStep('Verify loan tenure drop down options to be displayed ', true);
    let loanTenureList = byjusAssureData.loanTenureOptions.options.length;
    for (let i = 0; i < loanTenureList; i++) {
      await ByjusAssurePage.getLoanTenureOptions(0).waitForDisplayed({ timeout: 3000 });
      await expect(await ByjusAssurePage.getLoanTenureOptions(i).getText()).toEqual(byjusAssureData.loanTenureOptions.options[i]);

    }
    allure.endStep();
  });

  it("(Account details) Validate all fields when submiting blank", async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus Assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus Assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Refresh browser', true);
    await browser.refresh();
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('clicking on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('setting values to account number field', true);
    await ByjusAssurePage.tfAccountNumber.setValue("87451236521");
    allure.startStep('wait for continue button to be clickable', true);
    await ByjusAssurePage.btnContinue.waitForClickable({ timeout: 6000 });
    allure.startStep('clicking on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('waiting for correct error message for title', true);
    await ByjusAssurePage.getErrorMsgUsingElementText('Title is required.').waitForDisplayed({ timeout: 6000 });
    allure.startStep('Verify the correct error message is displayed for title', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('Title is required.')).toHaveTextContaining('Title is required.');
    allure.startStep('Verify the correct error message is displayed for account type', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('Account Type is required.')).toHaveTextContaining('Account Type is required.');
    allure.startStep('Verify the correct error message is displayed for bank required', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('Bank Name is required.')).toHaveTextContaining('Bank Name is required.');
    allure.startStep('Verify the correct error message is displayed for IFSC code', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('ifsc').getText()).toEqual('IFSC is required.');
    allure.startStep('Verify the correct error message is displayed for city', true);
    await expect(await ByjusAssurePage.getErrorMsgElement('city').getText()).toEqual('City is required.');
    allure.startStep('Verify the correct error message is displayed for first EMI date', true);
    await expect(await ByjusAssurePage.getErrorMsgUsingElementText('First EMI Date is required.').getText()).toEqual('First EMI Date is required.');
    allure.endStep();
  })

  it("(Account details) Validate Account number should be numeric.", async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus Assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('clicking on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('setting invalid values to account number field', true);
    await ByjusAssurePage.tfAccountNumber.setValue("statebank");
    allure.startStep('clicking on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('Wait for an error message for account number to appear', true);
    await ByjusAssurePage.getErrorMsgEleUsingDispText('Account Number').waitForDisplayed({ timeout: 5000 });
    allure.startStep('Verify the correct error message is displayed for valid account number', true);
    await expect(await ByjusAssurePage.getErrorMsgEleUsingDispText('Account Number')).toHaveTextContaining('Account number must be numeric');
    allure.endStep();
  })

  it('Validate search Branch button is disabled until you select Bank Name', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus nach Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep("Click on Name title field", true);
    await ByjusAssurePage.titleGender.click();
    allure.startStep("Set value to Mr in the drop down", true);
    await browser.keys(["M", "r", "Tab"]);
    allure.startStep("Set value to Dummy customer name in the Customer Name text field", true);
    await ByjusAssurePage.tfCustomerName.setValue("Dummy Customer name");
    allure.startStep("Set value to random account number in the Account Number text field", true);
    await ByjusAssurePage.tfAccountNumber.setValue("27358475658");
    allure.startStep("Click on account type drop down", true);
    await ByjusAssurePage.ddAccountType.click();
    allure.startStep("Select saving account option", true);
    await browser.keys(["S", "a", "v", "Tab"]);
    allure.startStep("Verify that search  branch button is disabled", true);
    await expect(await ByjusAssurePage.btnBranch.isClickable()).toEqual(false);
    allure.endStep();
  })

  it('Validate if account details correct then continue button should be enabled', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus Assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Refresh browser', true);
    await browser.refresh();
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('Enter valid customer account details');
    await ByjusAssurePage.fillAccountDetails();
    // 2 sec hard wait for the element to eb clickable (tried waitForClickable and waitforDisplayed)
    allure.startStep('2 sec wait', true);
    await browser.pause(2000);
    allure.startStep('Verify that Continue button is enabled', true);
    await expect(await ByjusAssurePage.btnContinue.isClickable()).toEqual(true);
    allure.endStep();
  });

  it('Validate eligible Loan Amount field should not be editable', async () => {
    allure.startStep('Click on the byjus Assure pay button', true);
    await ByjusAssurePage.byjusAssurepayBtn.click();
    allure.startStep('wait for down Payment field to be displayed', true);
    await ByjusAssurePage.tfDownPayment.waitForDisplayed({ timeout: 8000 });
    allure.startStep('Enter down Payment value', true);
    await ByjusAssurePage.tfDownPayment.setValue('20000');
    allure.startStep('Verify the eligible loan amount value is entering in field', true);
    await expect(await ByjusAssurePage.tfEligibleLoanAmountValue.getAttribute("value")).toEqual('50000');
    allure.startStep('Veify the loan amount field is disabled and not editable', true);
    await expect(await ByjusAssurePage.tfEligibleLoanAmountValue.isEnabled()).toEqual(false);
    allure.endStep();
  });

  it('Verify Account type drop down', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecordByjusAssure(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await ByjusAssurePage.ddAccountType.waitForDisplayed({ timeout: 10000 });
    allure.startStep('click on account type drop down', true);
    await ByjusAssurePage.ddAccountType.click();
    allure.startStep('wait for an account type drop down elements to be displayed', true);
    await ByjusAssurePage.getAccountTypeOptions(0).waitForDisplayed({ timeout: 20000 });
    allure.startStep('verify drop down options for account type', true);
    let accountTypeList = byjusAssureData.accountTypeOptions.options.length;
    for (let i = 0; i < accountTypeList; i++) {
      await expect(await ByjusAssurePage.getAccountTypeOptions(i).getText()).toEqual(byjusAssureData.accountTypeOptions.options[i]);
    }
    allure.endStep();
  });

  it('Verify the title Drop down in account details page', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecordByjusAssure(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('Click on gender drop down field', true);
    await ByjusAssurePage.titleGender.click();
    allure.startStep('Verify all option in drop down should be appear', true);
    let titleList = byjusAssureData.genderOptions.options.length;
    for (let i = 0; i < titleList; i++) {
      await ByjusAssurePage.getddAllGender(0).waitForDisplayed({ timeout: 3000 });
      await expect(await ByjusAssurePage.getddAllGender(i).getText()).toEqual(byjusAssureData.genderOptions.options[i]);
    }
    allure.endStep();
  });

  it.skip("Validate visiblity of Send Esign button after uploading all the documents", async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus nach Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('Refresh browser', true);
    await browser.refresh();
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('Enter valid customer account details');
    await ByjusAssurePage.fillAccountDetails();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('wait for next button to be exist ', true);
    await ByjusAssurePage.nextButton.waitForExist({ timeout: 30000 })
    allure.startStep('click on next button', true);
    await ByjusAssurePage.nextButton.click()
    allure.startStep('click on physical nach radio button', true);
    await ByjusAssurePage.rbToPhysicalNach.click();
    allure.startStep('click on confirm check box', true);
    await ByjusAssurePage.cbToSendOtp.click();
    allure.startStep('click on Generate PNACH button', true);
    await ByjusAssurePage.btnGeneratePNACH.click();
    allure.startStep('click on upload document radio button ', true);
    await ByjusAssurePage.rbUploadDocument.click();
    allure.startStep('upload document 3 photo ', true);
    await ByjusAssurePage.uploadDocuments();
    allure.startStep('wait for Esign button displayed');
    await ByjusAssurePage.btnSendOtp.waitForDisplayed({ timeout: 10000 });
    allure.startStep('Verify visiblity of Send Esign', true);
    await expect(await ByjusAssurePage.btnSendOtp.isDisplayed()).toEqual(true);
    allure.endStep();
  })

  it('Validate for OTP entered is redirecting user to account details page', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecordByjusAssure(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('wait for account number label to be displayed', true);
    await ByjusAssurePage.labelAccountNumber.waitForDisplayed();
    allure.startStep('validate the account number label is displayed', true);
    await expect(await ByjusAssurePage.labelAccountNumber.isDisplayed()).toEqual(true);
    allure.endStep();
  });

  it('Validate After Selecting Branch rest of the details should be filled and are un editable ', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecordByjusAssure(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('wait for bank  drop down element to be present', true);
    await ByjusAssurePage.ddBankName.waitForClickable({ timeout: 7000 });
    allure.startStep('click on bank drop down', true);
    await ByjusAssurePage.ddBankName.click();
    allure.startStep('Select the bank from drop down', true);
    await browser.keys(["A", "B", "h", "Y", "Tab"]);
    allure.startStep('click on branch button', true);
    await ByjusAssurePage.btnBranch.click();
    allure.startStep('select the bank branch radio buton', true);
    await ByjusAssurePage.rbBranch.click();
    allure.startStep('select the bank branch ', true);
    await ByjusAssurePage.btnselect.click();
    allure.startStep('Specify locator according to bank branch details', true);
    const ifsc = await ByjusAssurePage.getbankDetails(1);
    const micr = await ByjusAssurePage.getbankDetails(2);
    const city = await ByjusAssurePage.getbankDetails(3);
    allure.startStep('Verify the value of ifsc', true);
    await expect(await ifsc.getAttribute("value")).toEqual(byjusAssureData.BankBranchDeatils.ifsc);
    allure.startStep('Verify the ifsc field is disabled', true);
    await expect(await ifsc.isEnabled()).toEqual(false);
    allure.startStep('Verify the value of micr', true);
    await expect(await micr.getAttribute("value")).toEqual(byjusAssureData.BankBranchDeatils.micr);
    allure.startStep('Verify the micr field is disabled', true);
    await expect(await micr.isEnabled()).toEqual(false);
    allure.startStep('Verify the value of city', true);
    await expect(await city.getAttribute("value")).toEqual(byjusAssureData.BankBranchDeatils.city);
    allure.startStep('Verify the city field is disabled', true);
    await expect(await city.isEnabled()).toEqual(false);
    allure.endStep();
  });

  it('Validate P-nach generation pop is displayed after generating Pnach', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecordByjusAssure(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('Enter valid customer account details');
    await ByjusAssurePage.fillAccountDetails();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('wait for next button to be exist ', true);
    await ByjusAssurePage.nextButton.waitForExist({ timeout: 30000 })
    allure.startStep('click on next button', true);
    await ByjusAssurePage.nextButton.click()
    allure.startStep('click on physical nach radio button', true);
    await ByjusAssurePage.rbToPhysicalNach.click();
    allure.startStep('click on confirm check box', true);
    await ByjusAssurePage.cbToSendOtp.click();
    allure.startStep('click on Generate PNACH button', true);
    await ByjusAssurePage.btnGeneratePNACH.click();
    await browser.waitUntil(async () => await ByjusAssurePage.popUpGeneratedPnach.getText() === 'P-NACH Auto Generation',
      {
        timeout: 30000,
        timeoutMsg: 'Expected pop up is not visible'
      })
    allure.endStep();
  });

  it('Validate after entering account details it should take us to loan details page.', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('Enter valid customer account details');
    await ByjusAssurePage.fillAccountDetails();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('wait for loan agreement text to be displayed', true);
    await ByjusAssurePage.loanAgreementText.waitForDisplayed({ timeout: 10000 });
    allure.startStep('Verify the borrower on loan agreement page', true);
    await expect(await ByjusAssurePage.loanAgreementText.getText()).toEqual('Data for filling Loan Agreement');
    allure.startStep('Verify the borrower bank details text on loan agreement page ', true);
    await expect(await ByjusAssurePage.borrowerbankDetailsText.getText()).toEqual('Borrower Bank Details');
    allure.endStep();
  });

  it('Verify borrower bank details in loan agreement page.', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('Enter valid customer account details');
    await ByjusAssurePage.fillAccountDetails();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('wait for loan agreement text to be displayed', true);
    await ByjusAssurePage.loanAgreementText.waitForDisplayed({ timeout: 10000 });
    allure.startStep('verify borrower bank details', true);
    for (let i = 1, h = 0; i < 9, h < byjusAssureData.borrowerBankDetails.options.length; i++, h++) {
      await expect(await ByjusAssurePage.getbankDetailsData(i).getText()).toEqual(byjusAssureData.borrowerBankDetails.options[h]);
    }
    allure.endStep();
  });

  it('Validate when user click on continue button in loan agreement page it should navigate to nach mandate page', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('Enter valid customer account details');
    await ByjusAssurePage.fillAccountDetails();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('wait for next button to be exist ');
    await ByjusAssurePage.nextButton.waitForExist({ timeout: 30000 })
    allure.startStep('click on next button');
    await ByjusAssurePage.nextButton.click()
    allure.startStep('wait for Enach mandate text to be displayed', true);
    await ByjusAssurePage.EnachMandateText.waitForDisplayed({ timeout: 6000 })
    allure.startStep('verify Enach mandate text on nach mandate page', true);
    await expect(await ByjusAssurePage.EnachMandateText.getText()).toEqual("E-NACH (Recommended)")
    allure.endStep();
  });

  it.skip('Validate cx to sign agreement pop up for Esign status', async () => {
    allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
    let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
    allure.startStep('Open new window of payments page');
    await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
    const handles = await browser.getWindowHandles();
    allure.startStep("Switch to window handles[0]", true);
    await browser.switchToWindow(handles[0]);
    allure.startStep("Closing verify otp window after opening new window", true);
    await browser.closeWindow();
    allure.startStep("Switch to window handles[1]", true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Login to the payment page', true);
    await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    allure.startStep('Open byjus assure Unprocessed loan & get appId', true);
    let appId = await ByjusAssurePage.returnAppId(panNumber);
    allure.startStep('Update status of above appId in transactionscibil collection', true);
    await mongoConnect.updatetransactionsCibilRecord(appId);
    allure.startStep('click on resume button', true);
    await ByjusAssurePage.btnResume(appId).click();
    allure.startStep('clicking on pop up continue button', true);
    await ByjusAssurePage.ClickOnPopUpContinue();
    allure.startStep('Enter valid customer account details');
    await ByjusAssurePage.fillAccountDetails();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('click on continue button', true);
    await ByjusAssurePage.btnContinue.click();
    allure.startStep('wait for next button to be exist ', true);
    await ByjusAssurePage.nextButton.waitForExist({ timeout: 30000 })
    allure.startStep('click on next button', true);
    await ByjusAssurePage.nextButton.click()
    allure.startStep('click on physical nach radio button', true);
    await ByjusAssurePage.rbToPhysicalNach.click();
    allure.startStep('click on confirm check box', true);
    await ByjusAssurePage.cbToSendOtp.click();
    allure.startStep('click on Generate PNACH button', true);
    await ByjusAssurePage.btnGeneratePNACH.click();
    allure.startStep('wait for an upload document radio button to be clickable ', true);
    await ByjusAssurePage.rbUploadDocument.waitForClickable({ timeout: 30000 });
    allure.startStep('click on upload document radio button ', true);
    await ByjusAssurePage.rbUploadDocument.click();
    allure.startStep('upload document 3 photo ', true);
    await ByjusAssurePage.uploadDocuments();
    allure.startStep('Validate visiblity of Send Esign', true);
    await ByjusAssurePage.btnSendOtp.waitForClickable({ timeout: 9000 });
    allure.startStep('Click on Esign button', true);
    await ByjusAssurePage.btnSendOtp.click();
    allure.startStep("wait for cx to sign agreement pop up ", true);
    await ByjusAssurePage.cxTosignAgreementPopup.waitForDisplayed({ timeout: 20000 })
    allure.startStep("verify 'waiting for cx to sign agreement' pop up on Esign page", true);
    await expect(await ByjusAssurePage.cxTosignAgreementPopup.getText()).toEqual('Waiting for CX to Sign Agreement.')
    allure.endStep();
  });

})
