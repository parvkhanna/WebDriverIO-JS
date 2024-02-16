import AbflLoan from "../../../../pages/loan_payments_page/abfl.payment.page";
import { AllureUtil as allure } from "../../../../utils/util.allure";
import { abflData } from "../../../../data/abfl.loanform.data";
import mongoConnect from "../../../../utils/mongoconnect";
import { dataToMoveTo } from "../../../../data/abfl.Move.To.Particular.Page";

describe('Verify functional validation for ABFL payment option', async function () {
    //this.retries(2)
    beforeEach("Open payment portal", async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep("Open Byjus payment login page");
        await AbflLoan.openByjusPayPage();
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Deleting object from DB", true);
        await mongoConnect.abflDeleteObjectFromDb(abflData.abflValidData.panNumber);
    })
    afterEach("Deleting the object from DB", async () => {
        allure.startStep("Deleting object from DB");
        await mongoConnect.abflDeleteObjectFromDb(abflData.abflValidData.panNumber);
    })

    it('Create ABFL loan payment with Valid details', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of ABFL loan & Click on sent OTP');
        let panNumber = await AbflLoan.enterCustomerAndLoanDetails(abflData.abflValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page');
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open ABFL Unprocessed loan & get appId');
        let appId = await AbflLoan.returnAppId(panNumber);
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
        allure.startStep("Creating new object in Abb assesements collection");
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "abfl");
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI');
        await browser.pause(5000);
        allure.startStep("Refresh page to get the updates visible");
        await browser.refresh();
        allure.startStep("wait for resume button to be clickable");
        await AbflLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button');
        await AbflLoan.btnResume(appId).click();
        // Uploading Bank statement through mongo DB
        allure.startStep("Add data to db to move to Ops team approval page");
        await mongoConnect.abflAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep('Go to LMS portal & approve the loan for given appId');
        await AbflLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING, appId, abflData.abflValidData);
        allure.startStep('Update status of above appId in transactionscibil collection as Cibil check passed');
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(appId);
        allure.startStep('Close the window of LMS portal');
        await browser.closeWindow();
        allure.startStep('Switch to payments window');
        await browser.switchToWindow(handles[1]);
        allure.startStep('Refresh the window');
        await browser.refresh();
        allure.startStep('Click on continue button to complete the remaining steps');
        await AbflLoan.btnContinue.click();
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement');
        await AbflLoan.selectEmiDateAndApproveLoanAgreement(panNumber);
        allure.startStep('Verify OKYC');
        await AbflLoan.verifyOKYC(panNumber);
        // Uploading required documents through mongo DB
        allure.startStep("Add data to db to move to Send Esign page");
        await mongoConnect.abflAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
        allure.startStep("Update status in db as approval pending");
        await mongoConnect.updateTransactionsCibilStatusApprovalPending(appId);
        allure.startStep('Update Esign details in transactionscibil collection');
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection');
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI');
        await browser.pause(5000);
        allure.startStep('Refresh the window');
        await browser.refresh();
        allure.startStep('Click on continue button to complete the remaining steps');
        await AbflLoan.btnContinue.click();
        allure.startStep('Go to LMS portal and approve all the documents');
        await AbflLoan.lmsVerifyDocuments(appId);
        /*allure.startStep(' Approve all the documents for fin ops approval');
        await AbflLoan.lmsVerifyDocumentsForFinOpsApproved(appId);
        allure.startStep('Approve all the documents and create loan');
        let txtAppId = await AbflLoan.createLoan(appId);
        allure.addArgument("Loan created", `${txtAppId}`)
        allure.endStep();
        */
    })
})