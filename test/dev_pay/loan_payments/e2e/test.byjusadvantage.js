import { AllureUtil as allure } from '../../../../utils/util.allure';
import byjusadvantagePage from '../../../../pages/loan_payments_page/byjusadvantage.payment.page';
import { byjusAdvantageData } from '../../../../data/byjusadvantage.loanform.data';
import mongoConnect from "../../../../utils/mongoconnect";


describe('Verify E2E test cases for byjus advantage payment option', async function () {
    this.retries(2)
    beforeEach('Open payment portal', async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await byjusadvantagePage.openByjusPayPage();
        allure.startStep('Login to the payment page');
        await byjusadvantagePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.byjusAdvantageDeleteObjectFromDb(byjusAdvantageData.byjusAdvantageValidData.panNumber);
    })
    afterEach("Delete Object From Db", async () => {
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.byjusAdvantageDeleteObjectFromDb(byjusAdvantageData.byjusAdvantageValidData.panNumber);
    });
    it('Validate E2E test case for byjus advantage ', async () => {
        allure.startStep('Get basic steps done till e nach link generation');
        let custDetails = await byjusadvantagePage.getNachMandatePage(
            byjusAdvantageData.byjusAdvantageValidData, byjusAdvantageData.byjusAdvantageAccountValidData);
        allure.startStep('Update emandate details in database');
        await mongoConnect.updateEmandateDetailsCibilRecord(custDetails["appId"], 30000);
        allure.startStep('Update e-sign details in database');
        await mongoConnect.updateEsignDetailsCibilRecord(custDetails["appId"]);
        allure.startStep('Update Esign pdf Document ');
        await mongoConnect.updateEsignPDFDocument(custDetails["appId"]);
        allure.startStep('Update status in database');
        await mongoConnect.updateTransactionsCibilStatusApprovalPending(custDetails["appId"]);
        allure.startStep('Refresh browser');
        await browser.refresh();
        allure.startStep('wait for continue button, as page is refreshed so it took time to load it');
        await byjusadvantagePage.btnContinue.waitForExist({ timeout: 100000 });
        allure.startStep('Verify it should navigate back to E-send page');
        await expect(await byjusadvantagePage.btnContinue).toBePresent();
        allure.startStep('click on continue button');
        await byjusadvantagePage.btnContinue.click()
        allure.startStep("Address of window is stored in a variable");
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]');
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]');
        await browser.switchToWindow(handles[1]);
        allure.startStep('Go to LMS portal and approve all the documents');
        await byjusadvantagePage.lmsVerifyDocuments(custDetails["appId"]);
        allure.startStep('Approve all the documents For fin ops approve');
        await byjusadvantagePage.lmsVerifyDocumentsForFinOpsApproved(custDetails["appId"]);
        allure.startStep('Approve all the documents for create loan');
        let txtAppId = await byjusadvantagePage.createLoan(custDetails["appId"]);
        allure.addArgument("Loan created", `${txtAppId}`)
        allure.endStep();
    })
})
