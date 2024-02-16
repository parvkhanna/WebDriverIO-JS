import mongoConnect from "../../../../utils/mongoconnect";
import { AllureUtil as allure } from '../../../../utils/util.allure';
import byjusNachPage from '../../../../pages/loan_payments_page/byjusnach.payment.page';
import { byjusNachData } from '../../../../data/byjusnach.loanform.data';
import { dataToMoveTo } from '../../../../data/byjusnach.move.to.particular.page';

describe('Full E2E flow of byjus nach', async function () {
    this.retries(2)
    beforeEach('Open payment portal', async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await byjusNachPage.openByjusPayPage();
        allure.startStep('Login to the payment page');
        await byjusNachPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.byjusNachDeleteObjectFromDb(byjusNachData.byjusNachValidData.panNumber);
    })
    afterEach("Delete Object from DB", async () => {
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.byjusNachDeleteObjectFromDb(byjusNachData.byjusNachValidData.panNumber);
    });

    it('Create Byjus Nach loan payment with Valid details', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus nach loan & Click on sent OTP');
        let panNumber = await byjusNachPage.enterCustomerAndLoanDetails(byjusNachData.byjusNachValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page');
        await byjusNachPage.loginPaymentPage();
        allure.startStep('Open byjus nach Unprocessed loan & get appId');
        let appId = await byjusNachPage.returnAppId(panNumber);
        allure.startStep("Address of window is stored in a variable");
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]');
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]');
        await browser.switchToWindow(handles[1]);
        allure.startStep('Refresh the page');
        await browser.refresh();
        allure.startStep('Update status of above appId in transactionscibil collection');
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep("Add data to db to move to Ops team approval page", true);
        await mongoConnect.updateDocumentsInDb(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "byjusdirect");
        allure.startStep('click on resume button');
        await byjusNachPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable');
        await byjusNachPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button');
        await byjusNachPage.btnContinue.click();
        // allure.startStep('Upload bank statement & enter bank details');
        // await byjusNachPage.uploadBankStatement();
        allure.startStep('Go to LMS portal & approve the loan for given appId');
        await byjusNachPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING, appId, byjusNachData.byjusNachValidData);
        allure.startStep('Close the window of LMS portal');
        await browser.closeWindow();
        allure.startStep('Switch to payments window');
        await browser.switchToWindow(handles[1]);
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement');
        await byjusNachPage.selectEmiDateAndApproveLoanAgreement();
        allure.startStep('Select Physical nach and and Generate PNach');
        await byjusNachPage.verifyOKYC();
        // allure.startStep('Upload documents images');
        // await byjusNachPage.uploadDocumentsImages();
        allure.startStep("Add data to db to move to Send Esign page", true);
        await mongoConnect.updateDocumentsInDb(appId, dataToMoveTo.eSignPage);
        allure.startStep('Update Esign details in transactionscibil collection');
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection');
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('3 seconds wait to update the details in DB');
        await browser.pause(3000)
        allure.startStep('Refresh the page');
        await browser.refresh();
        allure.startStep('wait for button continue to be exist ')
        await byjusNachPage.btnContinue.waitForClickable({ timeout: 20000 })
        allure.startStep('Click on continue button');
        await byjusNachPage.btnContinue.click();
        allure.startStep('Go to LMS portal and approve all the documents');
        await byjusNachPage.lmsVerifyDocuments(appId);
        allure.startStep('Approve all the documents For fin ops approve');
        await byjusNachPage.lmsVerifyDocumentsForFinOpsApproved(appId);
        allure.startStep('Approve all the documents for create loan');
        let txtAppId = await byjusNachPage.createLoan(appId);
        allure.addArgument("Loan created", `${txtAppId}`)
        allure.endStep();
    })
});
