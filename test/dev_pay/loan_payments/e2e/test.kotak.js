import mongoConnect from "../../../../utils/mongoconnect";
import { AllureUtil as allure } from '../../../../utils/util.allure';
import KotakPage from '../../../../pages/loan_payments_page/kotak.payment.page';
import { kotakData } from '../../../../data/kotak.loanform.data';
import { dataToMoveTo } from '../../../../data/kotak.move.to.particular.page'

describe('Full E2E flow of kotak', async function () {
    this.retries(2)
    beforeEach("Open payment portal", async () => {
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await KotakPage.openByjusPayPage();
        allure.startStep('Login to the payment page');
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.kotakDeleteObjectFromDb(kotakData.kotakValidDetails.panNumber);
    });

    afterEach("Delete object from DB", async () => {
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.kotakDeleteObjectFromDb(kotakData.kotakValidDetails.panNumber);
    });
    it('Create kotak loan payment with Valid details', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of kotak loan & Click on sent OTP');
        let panNumber = await KotakPage.enterCustomerAndLoanDetails(kotakData.kotakValidDetails);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page');
        await KotakPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open byjus nach Unprocessed loan & get appId');
        let appId = await KotakPage.returnAppId(panNumber);
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
        allure.startStep("Add data to db to move to Ops team approval page");
        await mongoConnect.kotakAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection");
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "kotak");
        allure.startStep('click on resume button');
        await KotakPage.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable');
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button');
        await KotakPage.btnContinue.click();
        // allure.startStep('Upload bank statement & enter bank details');
        // await KotakPage.uploadBankStatement();
        allure.startStep('Go to LMS portal & approve the loan for given appId');
        await KotakPage.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING, appId, kotakData.kotakValidDetails);
        allure.startStep('Close the window of LMS portal');
        await browser.closeWindow();
        allure.startStep('Switch to payments window');
        await browser.switchToWindow(handles[1]);
        allure.startStep('Refresh the window');
        await browser.refresh();
        allure.startStep('Click on continue button to complete the remaining steps');
        await KotakPage.btnContinue.click();
        allure.startStep('select Emi Date And Approve LoanAgreement');
        await KotakPage.selectEmiDateAndApproveLoanAgreement()
        allure.startStep('Select Physical nach radio button and generate Pnach');
        await KotakPage.verifyOKYC()
        allure.startStep("Add data to db to move to esign agreement page");
        await mongoConnect.kotakAddDetailsToDb(appId, dataToMoveTo.eSignAgreementPage)
        // allure.startStep('Upload all personal documents on upload documents page');
        // await KotakPage.uploadPersonalDocuments(kotakData.kotakValidDetails)
        allure.startStep('Update Esign details in transactionscibil collection');
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection');
        await mongoConnect.updateEsignPDFDocument(appId);
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable');
        await KotakPage.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button');
        await KotakPage.btnContinue.click();
        allure.startStep('Go to LMS portal and approve all the documents');
        await KotakPage.lmsVerifyDocuments(appId);
        allure.startStep('Approve all the documents for Fin ops approve');
        await KotakPage.lmsVerifyDocumentsForFinOpsApproved(appId)
        allure.startStep('Approve all the documents for PIC  approve');
        await KotakPage.lmsVerifyDocumentsForPICApprove(appId)
        allure.startStep('Approve all the documents and create loan');
        let txtAppId = await KotakPage.createLoan(appId)
        allure.addArgument("Loan created", `${txtAppId}:${appId}`)
        allure.endStep();
    });
});