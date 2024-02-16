import { AllureUtil as allure } from '../../../../utils/util.allure';
import ByjusSubscribePage from '../../../../pages/loan_payments_page/byjussubscribe.payment.page';
import { byjusSubscribeData } from '../../../../data/byjusSubscribe.loanform.data';
import { byjusAdvantageData } from '../../../../data/byjusadvantage.loanform.data';
import mongoconnect from '../../../../utils/mongoconnect';
import { dataToMoveTo } from '../../../../data/byjusSubscribe.move.to.particular.page';

describe('Full E2E flow of byjus subscribe loan vendor', async function () {
    this.retries(2)
    beforeEach('Open payment portal', async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await ByjusSubscribePage.openByjusPayPage();
        allure.startStep('Login to the payment page');
        await ByjusSubscribePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
    })
    it('Create byjus subscribe loan with Valid details', async () => {
        allure.startStep('Fetch previous loan vendor app id');
        let previousAppDetails = await ByjusSubscribePage.fetchPreviousAppId(byjusAdvantageData);
        allure.startStep("Address of window is stored in a variable");
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]');
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]');
        await browser.switchToWindow(handles[1]);
        allure.startStep('Enter customer and loan details');
        await ByjusSubscribePage.enterCustomerAndLoanDetails(byjusSubscribeData.byjusSubscribeValidData, previousAppDetails['appId'])
        allure.startStep('Click on edit details page');
        await ByjusSubscribePage.btnProceed.click();
        allure.startStep('Enter account details page');
        await ByjusSubscribePage.enterAccountDetails(byjusSubscribeData.byjusAdvantageAccountValidData);
        allure.startStep('wait for btn continue');
        await ByjusSubscribePage.btnContinue.waitForExist({ timeout: 100000 });
        allure.startStep('click on btn continue');
        await ByjusSubscribePage.btnContinue.click();
        allure.startStep('Click on resume button');
        let appId = await ByjusSubscribePage.navigateAndClickOnResume();
        allure.startStep('Switched to window handles[1]');
        await browser.switchToWindow(handles[1]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to parent window');
        await browser.switchWindow(`appId=${appId}`);
        allure.startStep('Add documents to db and move to Loan eligibilty status page')
        await mongoconnect.updateDocumentsInDb(appId, dataToMoveTo.loanEligibilityStatusPage)
        allure.startStep('Update status in DB as approval pending ');
        await mongoconnect.updateTransactionsCibilStatusApprovalPending(appId)
        allure.startStep('refresh the browser ')
        await browser.refresh()
        allure.startStep('wait for button continue to be exist ')
        await ByjusSubscribePage.btnContinue.waitForExist({ timeout: 20000 })
        allure.startStep('Click on continue button to proceed further')
        await ByjusSubscribePage.btnContinue.click()
        // allure.startStep('Uplaod documents to soft approve loan')
        // await ByjusSubscribePage.uploadDocuments()
        allure.startStep('Go to LMS portal and approve all the documents');
        let txtAppId = await ByjusSubscribePage.lmsVerifyDocuments(appId);
        allure.addArgument("Loan created", `${txtAppId}`)
        allure.endStep()
    });

})  