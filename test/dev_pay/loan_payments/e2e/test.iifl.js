import IIFLLoan from '../../../../pages/loan_payments_page/iifl.payment.page';
import { iiflData } from '../../../../data/iifl.loanform.data';
import mongoConnect from '../../../../utils/mongoconnect';
import { AllureUtil as allure } from '../../../../utils/util.allure';
import { dataToMoveTo } from '../../../../data/iifl.move.to.particular.page';


describe('Verify E2E test case for IIFL payment option', async function () {
    this.retries(2)
    beforeEach("Open payment portal", async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await IIFLLoan.openByjusPayPage();
        allure.startStep('Login to the payment page');
        await IIFLLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Deleting object from Db which has pan number we used');
        await mongoConnect.iiflDeleteObjectFromDb(iiflData.iiflValidDetails.panNumber);
    })
    afterEach('Delete object from DB', async () => {
        allure.startStep('Deleting object from Db which has pan number we used');
        await mongoConnect.iiflDeleteObjectFromDb(iiflData.iiflValidDetails.panNumber);
    });

    it('Create IIFL loan payment with Valid details', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of IIFL loan & Click on sent OTP');
        let panNumber = await IIFLLoan.enterCustomerAndLoanDetails(iiflData.iiflValidDetails);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page');
        await IIFLLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Avanse Unprocessed loan & get appId');
        let appId = await IIFLLoan.returnAppId(panNumber);
        allure.startStep("Address of window is stored in a variable");
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]');
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]');
        await browser.switchToWindow(handles[1]);
        allure.startStep("Update status in db to bypass otp process");
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep("Update documents in db  to move to Ops team approval pending page");
        await mongoConnect.updateDocumentsInDb(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection");
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "iifl");
        allure.startStep("Refresh page to get the updates visible");
        await browser.refresh();
        allure.startStep('clicking on resume button');
        await IIFLLoan.btnResume(appId).click();
        allure.startStep('Click on continue button to complete the remaining steps');
        await IIFLLoan.btnContinue.click();
        allure.startStep('Go to LMS portal & approve the loan for given appId');
        await IIFLLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING, appId, iiflData.iiflValidDetails);
        allure.startStep('Close the window of LMS portal');
        await browser.closeWindow();
        allure.startStep('Switch to payments window');
        await browser.switchToWindow(handles[1]);
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement');
        await IIFLLoan.selectEmiDateAndApproveLoanAgreement(panNumber);
        allure.startStep('Verify OKYC');
        await IIFLLoan.verifyOKYC(panNumber);
        allure.startStep("Update documents in db to move to Send Esign page");
        await mongoConnect.updateDocumentsInDb(appId, dataToMoveTo.eSignPage);
        allure.startStep('Update Esign details in transactionscibil collection');
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection');
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI');
        await browser.pause(5000);
        allure.startStep('Refresh the window');
        await browser.refresh();
        allure.startStep('Click on continue button to complete the remaining steps');
        await IIFLLoan.btnContinue.click();
        allure.startStep('Go to LMS portal and approve all the documents');
        await IIFLLoan.lmsVerifyDocuments(appId);
        allure.startStep(' Approve all the documents for fin ops approval');
        await IIFLLoan.lmsVerifyDocumentsForFinOpsApproved(appId);
        allure.startStep('Approve all the documents and create loan');
        let txtAppId = await IIFLLoan.createLoan(appId);
        allure.addArgument("Loan created", `${txtAppId}:${appId}`)
        allure.endStep();
    })
})
