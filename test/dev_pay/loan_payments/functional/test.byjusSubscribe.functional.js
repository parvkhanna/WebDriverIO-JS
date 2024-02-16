import { AllureUtil as allure } from '../../../../utils/util.allure';
import ByjusSubscribePage from '../../../../pages/loan_payments_page/byjussubscribe.payment.page';
import { byjusSubscribeData } from '../../../../data/byjusSubscribe.loanform.data';
import { byjusAdvantageData } from '../../../../data/byjusadvantage.loanform.data';
import mongoconnect from '../../../../utils/mongoconnect';
import { dataToMoveTo } from '../../../../data/byjusSubscribe.move.to.particular.page';

describe('Verify functional validations for byjus Subscribe payment option', async () => {
  beforeEach('Open payment portal', async () => {
    allure.startStep("Maximize the window");
    await browser.maximizeWindow();
    allure.startStep('Open Byjus payment login page');
    await ByjusSubscribePage.openByjusPayPage();
    allure.startStep('Login to the payment page', true);
    await ByjusSubscribePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
  })

  it('Validate previous loan provider drop down on customer and loan details page ', async () => {
    allure.startStep('Click on the byjus subscribe pay button', true);
    await ByjusSubscribePage.byjusSubscribepayBtn.click();
    allure.startStep('wait for previous loan provider drop down to be clickable', true);
    await ByjusSubscribePage.ddPreviousLoanProvider.waitForClickable({ timeout: 28000 });
    allure.startStep('click on previous loan provider drop down', true);
    await ByjusSubscribePage.ddPreviousLoanProvider.click();
    // 3 seconds wait to load loan vendors list 
    await browser.pause(3000)
    allure.startStep('Verify previous loan provider down options to be displayed ', true);
    let loanProviderList = byjusSubscribeData.previousLoanOptions.options.length;
    for (let i = 0; i < loanProviderList; i++) {
      await ByjusSubscribePage.getLoanProviderOptions(0).waitForEnabled();
      await expect(await ByjusSubscribePage.getLoanProviderOptions(i).getText()).toEqual(byjusSubscribeData.previousLoanOptions.options[i]);

    }
    allure.endStep();
  });

  it('Validate error message if APP id is not assosiated with loan vendor', async () => {
    allure.startStep('Click on Byjus Subscribe pay button');
    await ByjusSubscribePage.byjusSubscribepayBtn.click();
    allure.startStep('wait for previous loan provider drop down to be clickable', true);
    await ByjusSubscribePage.ddPreviousLoanProvider.waitForClickable({ timeout: 28000 });
    allure.startStep('Click on previous loan provider');
    await ByjusSubscribePage.ddPreviousLoanProvider.click();
    allure.startStep('Select previous loan provider');
    await browser.keys(byjusSubscribeData.byjusSubscribeInvalidData.previousLoanProvider)
    allure.startStep('Enter previous loan id');
    await ByjusSubscribePage.tfPreviousAppId.setValue(byjusSubscribeData.byjusSubscribeInvalidData.previousAppId);
    allure.startStep('Validate error msg that ByjusSubscribePage app id is assosiated or not');
    await expect(await ByjusSubscribePage.errorMsg.getText()).toEqual('This appId is not associated with any processed BYJUS ADVANTAGE Loan. Please enter valid appId to proceed.');
    allure.endStep();
  })
  it('Validate Next button is disabled when we dont click on I, hereby, confirm checkbox.', async () => {
    allure.startStep('Click on Byjus Subscribe pay button');
    await ByjusSubscribePage.byjusSubscribepayBtn.click();
    allure.startStep('Verify that Next button is disabled');
    await expect(await ByjusSubscribePage.btntfNext.isClickable()).toEqual(false);
    allure.startStep('Click on check box button');
    await ByjusSubscribePage.cbToSendOtp.click();
    allure.startStep('Verify that Next button is enabled');
    await expect(await ByjusSubscribePage.btntfNext.isClickable()).toEqual(true);
    allure.endStep();
  })

  it('Validate autofill values if app id is assosiated with loan vendor', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Open Order Page Url in new window", true);
    await ByjusSubscribePage.byjusSubscribepayBtn.click();
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter previous loan id');
    await ByjusSubscribePage.tfPreviousAppId.setValue(previousAppDetails['appId']);
    allure.startStep('wait for previous loan provider drop down to be clickable', true);
    await ByjusSubscribePage.ddPreviousLoanProvider.waitForClickable({ timeout: 28000 });
    allure.startStep('Click on previous loan provider');
    await ByjusSubscribePage.ddPreviousLoanProvider.click();
    allure.startStep('Select previous loan provider');
    await browser.keys(byjusSubscribeData.byjusSubscribeInvalidData.previousLoanProvider)
    allure.startStep('Verify if the app ID is associated with previous loan ');
    await ByjusSubscribePage.verifyPreviousAppId(byjusSubscribeData.byjusSubscribeValidData)
    allure.startStep('Wait for borrower first name to be displayed');
    await ByjusSubscribePage.tfBorrowerFirstName.waitForDisplayed({ timeout: 20000 })
    allure.startStep('Validate name should be autofilled');
    await expect(await ByjusSubscribePage.tfBorrowerFirstName).toHaveValue(previousAppDetails['firstName'], { ignoreCase: true })
    allure.startStep('Validate loan amount should be autofilled');
    await expect(await ByjusSubscribePage.tfPreviousLoanAmout).toHaveValue(previousAppDetails['loanAmount'], { ignoreCase: true })
    allure.endStep();
  })

  it('Validate click on edit details button it close popup and back to customer details page', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnEditDetails.click();
    allure.startStep('Validate its back on customer details page');
    await expect(ByjusSubscribePage.tfPreviousLoanAmout).toBePresent();
    allure.endStep();
  })

  it('Validate it should navigate to account details page if all details are correct', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account number value to be present');
    await ByjusSubscribePage.tfAccountNumber.waitForExist({ timeout: 20000 })
    allure.startStep('Validate its back on customer details page');
    await expect(await ByjusSubscribePage.tfAccountNumber).toBePresent();
    allure.endStep();
  })

  it('Validate resume functionality working properly for account details page', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('Click on resume button');
    await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('Verify it should navigate back to customer details page', true);
    await expect(await ByjusSubscribePage.tfCustomerName).toBePresent();
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.endStep();
  })

  it('Validate the Account type drop down', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    await browser.pause(6000);
    allure.startStep('wait for account type drop down to be displayed ', true);
    await ByjusSubscribePage.ddAccountType.waitForDisplayed({ timeout: 10000 });
    allure.startStep('click on account type drop down', true);
    await ByjusSubscribePage.ddAccountType.click();
    allure.startStep('wait for an account type drop down elements to be displayed', true);
    await ByjusSubscribePage.getAccountTypeOptions("Savings").waitForDisplayed({ timeout: 20000 });
    allure.startStep('verify drop down options for account type', true);
    let accountTypeList = byjusSubscribeData.accountTypeOptions.options.length;
    for (let i = 0; i < accountTypeList; i++) {
      await expect(await ByjusSubscribePage.getAccountTypeOptions(byjusSubscribeData.accountTypeOptions.options[i])).toBePresent();
    }
    allure.endStep();
  });

  it('Validate the title Drop down in account details page', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await ByjusSubscribePage.titleGender.waitForClickable({ timeout: 30000 });
    allure.startStep('Click on gender drop down field', true);
    await ByjusSubscribePage.titleGender.click();
    allure.startStep('Verify all option in drop down should be appear', true);
    let titleList = byjusSubscribeData.genderOptions.options.length;
    for (let i = 0; i < titleList; i++) {
      await expect(await ByjusSubscribePage.getddAllGender(byjusSubscribeData.genderOptions.options[i])).toBePresent();
    }
    allure.endStep();
  });

  it('Verify valid account details process to next screen', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await browser.pause(6000);
    allure.startStep('Enter account details page', true);
    await ByjusSubscribePage.enterAccountDetails(byjusSubscribeData.byjusAdvantageAccountValidData);
    allure.startStep('wait for loan agreement page', true);
    await ByjusSubscribePage.tLoanAgreementPage.waitForExist({ timeout: 20000 })
    allure.startStep('Verify it moved to agreement page', true);
    await expect(await ByjusSubscribePage.tLoanAgreementPage).toBePresent();
    allure.endStep();
  });

  it.skip('Validate click on continue button to Loan agreement button screen', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await browser.pause(6000);
    allure.startStep('Enter account details page', true);
    await ByjusSubscribePage.enterAccountDetails(byjusSubscribeData.byjusAdvantageAccountValidData);
    allure.startStep('wait for btn continue', true);
    await ByjusSubscribePage.btnContinue.waitForExist({ timeout: 100000 });
    allure.startStep('click on btn continue', true);
    await ByjusSubscribePage.btnContinue.click();
    allure.startStep('Verify it moved to next page', true);
    await expect(await ByjusSubscribePage.headerEmandateLg).toBePresent();
    allure.endStep();
  });

  it.skip('Validate resume functionality working properly for nach mandate page', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await browser.pause(6000);
    allure.startStep('Enter account details page', true);
    await ByjusSubscribePage.enterAccountDetails(byjusSubscribeData.byjusAdvantageAccountValidData);
    allure.startStep('wait for btn continue', true);
    await ByjusSubscribePage.btnContinue.waitForExist({ timeout: 100000 });
    allure.startStep('click on btn continue', true);
    await ByjusSubscribePage.btnContinue.click();
    allure.startStep('Verify and click on resume button', true);
    await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('Verify it moved to next page', true);
    await expect(await ByjusSubscribePage.headerEmandateLg).toBePresent();
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.endStep();
  });

  it('Validate after generating pnach it should move to upload documents page', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await browser.pause(6000);
    allure.startStep('Enter account details page', true);
    await ByjusSubscribePage.enterAccountDetails(byjusSubscribeData.byjusAdvantageAccountValidData);
    allure.startStep('wait for btn continue', true);
    await ByjusSubscribePage.btnContinue.waitForExist({ timeout: 100000 });
    allure.startStep('click on btn continue', true);
    await ByjusSubscribePage.btnContinue.click();
    allure.startStep('Verify and click on resume button', true);
    await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('click on next button', true);
    await ByjusSubscribePage.btntfNext.click();
    allure.startStep('Select the PNACH check box ', true);
    await ByjusSubscribePage.cbToPNACH.click();
    allure.startStep('Click on generate PNACH button', true);
    await ByjusSubscribePage.btnGeneratePNACH.click();
    allure.startStep('Verify it moved to uppload documents page', true);
    await expect(await ByjusSubscribePage.txtUploadDocument).toBePresent();
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.endStep();
  });

  it('Validate if account details correct then only continue button should be enabled.', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await ByjusSubscribePage.ddNameTitle.waitForDisplayed({ timeout: 20000 })
    allure.startStep('Click on title drop down');
    await ByjusSubscribePage.ddNameTitle.click();
    allure.startStep('select the title from drop down');
    await browser.keys(byjusSubscribeData.byjusAdvantageAccountValidData.title);
    allure.startStep('Enter the customer name as Dummy customer name');
    await ByjusSubscribePage.tfCustomerName.setValue(byjusSubscribeData.byjusAdvantageAccountValidData.customerName)
    allure.startStep('wait for EMI drop to be exist');
    await ByjusSubscribePage.ddSelectEmiDate.waitForExist({ timeout: 60000 });
    allure.startStep('Click on select EMI drop down & select the EMI date');
    await ByjusSubscribePage.ddSelectEmiDate.click();
    await browser.keys("Tab");
    allure.startStep('Verify the continue button is enabled after entering correct account details');
    await expect(ByjusSubscribePage.btnContinue).toBeEnabled()
    allure.endStep()
  });

  it('Validate continue button is enabled(Loan agreement page)', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await browser.pause(6000);
    allure.startStep('Enter account details page', true);
    await ByjusSubscribePage.enterAccountDetails(byjusSubscribeData.byjusAdvantageAccountValidData);
    allure.startStep('wait for btn continue', true);
    await ByjusSubscribePage.btnContinue.waitForExist({ timeout: 100000 });
    allure.startStep('Verify continue button is enabled on loan agreement page', true);
    await expect(ByjusSubscribePage.btnContinue).toBeEnabled(false)
    allure.endStep()
  });

  it('Validate borrower bank details is defined in loan agreement page.', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await browser.pause(6000);
    allure.startStep('Enter account details page', true);
    await ByjusSubscribePage.enterAccountDetails(byjusSubscribeData.byjusAdvantageAccountValidData);
    allure.startStep('wait for btn continue', true);
    await ByjusSubscribePage.btnContinue.waitForExist({ timeout: 100000 });
    allure.startStep('verify borrower bank details are defined', true);
    for (let i = 1; i < 9; i++) {
      await expect(await ByjusSubscribePage.getbankDetailsData(i)).toBeDefined();
    }
    allure.endStep();

  });

  it('Validate resume funtionality working on loan agreement page', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await browser.pause(6000);
    allure.startStep('Enter account details page', true);
    await ByjusSubscribePage.enterAccountDetails(byjusSubscribeData.byjusAdvantageAccountValidData);
    allure.startStep('wait for btn continue', true);
    await ByjusSubscribePage.btnContinue.waitForExist({ timeout: 100000 });
    allure.startStep('Verify and click on resume button', true);
    await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('Verify continue button is enabled on loan agreement page', true);
    await expect(ByjusSubscribePage.btnContinue).toBeEnabled(false)
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.endStep()

  });

  it('Validate select branch button to be enabled after selecting bank', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on proceed button');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('Wait for title drop down to be displayed');
    await ByjusSubscribePage.ddNameTitle.waitForDisplayed({ timeout: 10000 })
    allure.startStep('Click on title dropdown');
    await ByjusSubscribePage.ddNameTitle.click()
    allure.startStep('Select the title');
    await browser.keys(byjusSubscribeData.byjusAdvantageAccountValidData.title);
    allure.startStep('Click on bank name drop down');
    await ByjusSubscribePage.ddBankName.click()
    allure.startStep('Select the bank name');
    await browser.keys(byjusSubscribeData.byjusAdvantageAccountValidData.bankName);
    allure.startStep('Wait for bank branch button to be enabled');
    await ByjusSubscribePage.btnBankBranch.waitForEnabled({ timeout: 20000 })
    allure.startStep('Verify the bank branch button is enabled');
    expect(await ByjusSubscribePage.btnBankBranch.isEnabled()).toEqual(true)
    allure.endStep()
  });

  it("Validate Genarate PNACH button is disabled  when we don't click on The Customer's  Signature checkbox", async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('wait for account type drop down to be displayed ', true);
    await browser.pause(6000);
    allure.startStep('Enter account details page', true);
    await ByjusSubscribePage.enterAccountDetails(byjusSubscribeData.byjusAdvantageAccountValidData);
    allure.startStep('wait for btn continue', true);
    await ByjusSubscribePage.btnContinue.waitForExist({ timeout: 100000 });
    allure.startStep('click on btn continue', true);
    await ByjusSubscribePage.btnContinue.click();
    allure.startStep('Verify and click on resume button', true);
    await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('click on next button', true);
    await ByjusSubscribePage.btntfNext.click();
    allure.startStep('Wait for generate pnach button to be displayed', true);
    await ByjusSubscribePage.btnGeneratePNACH.waitForDisplayed({ timeout: 20000 })
    allure.startStep('Verify the button generate pnach is disabled', true);
    expect(await ByjusSubscribePage.btnGeneratePNACH).toBeDisabled()
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.endStep()
  });

  it('Validate after clicking on upload document radio button choose file button should be displayed', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('Verify and click on resume button', true);
    let appId = await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('Add details to db and move to upload documents page', true)
    await mongoconnect.byjusSubscribeAddDetailsToDb(appId, dataToMoveTo.uploadDocumentsPage)
    allure.startStep('Wait 4 seconds to update the document in Db', true)
    await browser.pause(4000)
    allure.startStep('Switch back to previous window ', true)
    await browser.switchWindow('/byjussubscribe');
    allure.startStep('Close the target window ', true)
    await browser.closeWindow()
    allure.startStep('Switch back to target window ', true)
    await browser.switchWindow('/byjussubscribe?');
    allure.startStep('refresh the browser ', true)
    await browser.refresh()
    allure.startStep('Click on continue button to proceed further', true)
    await ByjusSubscribePage.btnContinue.click()
    allure.startStep('Click on upload document document radio button', true)
    await ByjusSubscribePage.rbUploadDocument.click()
    allure.startStep('Wait for choose file button to be displayed ', true)
    await ByjusSubscribePage.btnChooseFile.waitForDisplayed({ timeout: 20000 })
    allure.startStep('Verify the choose file button is displayed after clicking on upload document radio button', true)
    expect(await ByjusSubscribePage.btnChooseFile).toBeDisplayed()
    allure.endStep()
  });

  it('Validate after clicking on take document photo radio button it should display take cancelled cheque or bank statement photo button', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('Verify and click on resume button', true);
    let appId = await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('Add details to db and move to upload documents page', true)
    await mongoconnect.byjusSubscribeAddDetailsToDb(appId, dataToMoveTo.uploadDocumentsPage)
    allure.startStep('Wait 4 seconds to update the document in Db', true)
    await browser.pause(4000)
    allure.startStep('Switch back to previous window ', true)
    await browser.switchWindow('/byjussubscribe');
    allure.startStep('Close the target window ', true)
    await browser.closeWindow()
    allure.startStep('Switch back to target window ', true)
    await browser.switchWindow('/byjussubscribe?');
    allure.startStep('refresh the browser ', true)
    await browser.refresh()
    allure.startStep('Click on continue button to proceed further', true)
    await ByjusSubscribePage.btnContinue.click()
    allure.startStep('Click on take document photo radio button ', true)
    await ByjusSubscribePage.rbTakeDocumentPhoto.click()
    allure.startStep('wait for take cancelled cheque or bank statement source button to be displayed', true)
    await ByjusSubscribePage.btnTakeCancelledCheque.waitForExist({ timeout: 10000 })
    allure.startStep('Verify for take cancelled cheque or bank statement photo button to be present', true)
    await expect(ByjusSubscribePage.btnTakeCancelledCheque).toBePresent()
    allure.endStep()
  });

  it.skip('Validate after uploading bank statement photo proceed button should be dispalyed ', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('Verify and click on resume button', true);
    let appId = await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('Add details to db and move to upload documents page', true)
    await mongoconnect.byjusSubscribeAddDetailsToDb(appId, dataToMoveTo.uploadDocumentsPage)
    allure.startStep('Wait 4 seconds to update the document in Db', true)
    await browser.pause(4000)
    allure.startStep('Switch back to previous window ', true)
    await browser.switchWindow('/byjussubscribe');
    allure.startStep('Close the target window ', true)
    await browser.closeWindow()
    allure.startStep('Switch back to target window ', true)
    await browser.switchWindow('/byjussubscribe?');
    allure.startStep('refresh the browser ', true)
    await browser.refresh()
    allure.startStep('Click on continue button to proceed further', true)
    await ByjusSubscribePage.btnContinue.click()
    allure.startStep('Click on upload document document radio button', true)
    await ByjusSubscribePage.rbUploadDocument.click()
    allure.startStep('Wait for choose file button to be displayed ', true)
    await ByjusSubscribePage.btnChooseFile.waitForDisplayed({ timeout: 20000 })
    allure.startStep('Uplaod the bank statement source image', true)
    try {
      const path = require('path');
      const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
      await ByjusSubscribePage.btnChooseFile.setValue(filePath);
    }
    catch { }
    allure.startStep('Click on upload file button', true)
    await ByjusSubscribePage.btnUploadFile.click();
    allure.startStep('Wait for proceed button to be displayed ', true)
    await ByjusSubscribePage.btnProceed.waitForExist({ timeout: 5000 })
    allure.startStep('Verify for proceed button to be displayed ', true)
    expect(await ByjusSubscribePage.btnProceed.isDisplayed()).toEqual(true)
    allure.endStep()
  });

  it.skip('Validate done button is displayed on loan eligibilty status page after uploading documents ', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('Verify and click on resume button', true);
    let appId = await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('Add details to db and move to upload documents page', true)
    await mongoconnect.byjusSubscribeAddDetailsToDb(appId, dataToMoveTo.uploadDocumentsPage)
    allure.startStep('Wait 4 seconds to update the document in Db', true)
    await browser.pause(4000)
    allure.startStep('Switch back to previous window ', true)
    await browser.switchWindow('/byjussubscribe');
    allure.startStep('Close the target window ', true)
    await browser.closeWindow()
    allure.startStep('Switch back to target window ', true)
    await browser.switchWindow('/byjussubscribe?');
    allure.startStep('refresh the browser ', true)
    await browser.refresh()
    allure.startStep('Click on continue button to proceed further', true)
    await ByjusSubscribePage.btnContinue.click()
    allure.startStep('Uplaod documents to soft approve loan', true)
    await ByjusSubscribePage.uploadDocuments()
    allure.startStep('Wait for done button to be displayd ', true)
    await ByjusSubscribePage.btnDone.waitForDisplayed({ timeout: 10000 })
    allure.startStep('Verify done button is displayed after uploading documents', true)
    expect(await ByjusSubscribePage.btnDone.isDisplayed()).toEqual(true);
    allure.endStep()
  });

  it("Validate after click on done button , it processed to customer and loan details page ", async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('Verify and click on resume button', true);
    let appId = await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('Add details to db and move to Loan eligibilty status page', true)
    await mongoconnect.byjusSubscribeAddDetailsToDb(appId, dataToMoveTo.loanEligibilityStatusPage)
    allure.startStep('Update status in DB as approval pending ', true);
    await mongoconnect.updateTransactionsCibilStatusApprovalPending(appId)
    allure.startStep('Wait 4 seconds to update the document in Db', true)
    await browser.pause(4000)
    allure.startStep('Switch back to previous window ', true)
    await browser.switchWindow('/byjussubscribe');
    allure.startStep('Close the target window ', true)
    await browser.closeWindow()
    allure.startStep('Switch back to target window ', true)
    await browser.switchWindow('/byjussubscribe?');
    allure.startStep('refresh the browser ', true)
    await browser.refresh()
    allure.startStep('Click on continue button to proceed further', true)
    await ByjusSubscribePage.btnContinue.click()
    allure.startStep('Click on done button after soft approval', true)
    await ByjusSubscribePage.btnDone.click()
    allure.startStep('Wait for previous app Id text to be displayed ', true)
    await ByjusSubscribePage.txtPreviousAppId.waitForDisplayed({ timeout: 10000 })
    allure.startStep('Verify previous app Id text to be displayed ', true)
    expect(await ByjusSubscribePage.txtPreviousAppId.isExisting()).toEqual(true)
    allure.endStep()
  });

  it('Validate after approving all documents in LMS portal , green tick logo is displayed ', async () => {
    allure.startStep('Fetch previous loan vendor app id');
    let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
    allure.startStep("Address of window is stored in a variable", true);
    const handles = await browser.getWindowHandles();
    allure.startStep('Switched to window handles[0]', true);
    await browser.switchToWindow(handles[0]);
    allure.startStep('Close the window');
    await browser.closeWindow();
    allure.startStep('Switched to window handles[1]', true);
    await browser.switchToWindow(handles[1]);
    allure.startStep('Enter customer and loan details');
    await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
    allure.startStep('Click on edit details page');
    await ByjusSubscribePage.btnProceed.click();
    allure.startStep('Verify and click on resume button', true);
    let appId = await ByjusSubscribePage.navigateAndClickOnResume();
    allure.startStep('Add details to db and move to Loan eligibilty status page', true)
    await mongoconnect.byjusSubscribeAddDetailsToDb(appId, dataToMoveTo.loanEligibilityStatusPage)
    allure.startStep('Update status in DB as approval pending ', true);
    await mongoconnect.updateTransactionsCibilStatusApprovalPending(appId)
    allure.startStep('Wait 4 seconds to update the document in Db', true)
    await browser.pause(4000)
    allure.startStep('Switch back to previous window ', true)
    await browser.switchWindow('/byjussubscribe');
    allure.startStep('Close the target window ', true)
    await browser.closeWindow()
    allure.startStep('Switch back to target window ', true)
    await browser.switchWindow('/byjussubscribe?');
    allure.startStep('refresh the browser ', true)
    await browser.refresh()
    allure.startStep('Click on continue button to proceed further', true)
    await ByjusSubscribePage.btnContinue.click()
    allure.startStep('Go to LMS portal and approve all the documents', true);
    await ByjusSubscribePage.lmsVerifyDocuments(appId);
    allure.startStep('Wait for documents approved green tick logo is displayed', true)
    await ByjusSubscribePage.logoDocApproved.waitForDisplayed({ timeout: 15000 })
    allure.startStep('Verify documents approved green tick logo is displayed', true)
    expect(await ByjusSubscribePage.logoDocApproved.isDisplayed()).toEqual(true)
    allure.endStep();
  });
})