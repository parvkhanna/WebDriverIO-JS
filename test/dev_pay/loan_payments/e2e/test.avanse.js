import AvanseLoan from "../../../../pages/loan_payments_page/avanse.payment.page";
import { AllureUtil as allure } from "../../../../utils/util.allure";
import { avanseData } from "../../../../data/avanse.loanform.data";
import mongoConnect from "../../../../utils/mongoconnect";
import { dataToMoveTo } from "../../../../data/avanse.move.to.particular.page";


describe("Verify E2E test cases for avanse payment option", async function () {
    this.retries(2)
    beforeEach("Open payment portal", async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep("Open Byjus payment login page");
        await AvanseLoan.openByjusPayPage();
        allure.startStep("Login to the payment page");
        await AvanseLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Deleting object from DB");
        await mongoConnect.avanseDeleteObjectFromDb(avanseData.avanceValidData.panNumber);
    })

    afterEach("Deleting the object from DB", async () => {
        allure.startStep("Deleting object from DB");
        await mongoConnect.avanseDeleteObjectFromDb(avanseData.avanceValidData.panNumber);
    })
    it('Create Avanse loan payment with Valid details', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of Avanse loan & Click on sent OTP');
        let panNumber = await AvanseLoan.enterCustomerAndLoanDetails(avanseData.avanceValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        allure.startStep('Login to the payment page');
        await AvanseLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open Avanse Unprocessed loan & get appId');
        let appId = await AvanseLoan.returnAppId(panNumber);
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
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "avanse");
        allure.startStep('5 seconds wait so that DB gets updated & changes reflect at UI');
        await browser.pause(5000);
        allure.startStep("Refresh page to get the updates visible");
        await browser.refresh();
        allure.startStep("wait for resume button to be clickable");
        await AvanseLoan.btnResume(appId).waitForClickable({ timeout: 10000 })
        allure.startStep('clicking on resume button');
        await AvanseLoan.btnResume(appId).click();
        // Uploading Bank statement through mongo DB
        allure.startStep("Add data to db to move to Ops team approval page");
        await mongoConnect.avanseAddDetailsToWaitForOpsTeamApproval(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep('Go to LMS portal & approve the loan for given appId');
        await AvanseLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING, appId, avanseData.avanceValidData);
        allure.startStep('Update status of above appId in transactionscibil collection as Cibil check passed');
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(appId);
        allure.startStep('Close the window of LMS portal');
        await browser.closeWindow();
        allure.startStep('Switch to payments window');
        await browser.switchToWindow(handles[1]);
        allure.startStep('Refresh the window');
        await browser.refresh();
        allure.startStep('Click on continue button to complete the remaining steps');
        await AvanseLoan.btnContinue.click();
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement');
        await AvanseLoan.selectEmiDateAndApproveLoanAgreement(panNumber);
        allure.startStep('Verify OKYC');
        await AvanseLoan.verifyOKYC(panNumber);
        // Uploading required documents through mongo DB
        allure.startStep("Add data to db to move to Send Esign page");
        await mongoConnect.avanseAddDetailsToEsignPage(appId, dataToMoveTo.eSignPage);
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
        await AvanseLoan.btnContinue.click();
        allure.startStep('Go to LMS portal and approve all the documents');
        await AvanseLoan.lmsVerifyDocuments(appId);
        allure.startStep(' Approve all the documents for fin ops approval');
        await AvanseLoan.lmsVerifyDocumentsForFinOpsApproved(appId);
        allure.startStep('Approve all the documents and create loan');
        let txtAppId = await AvanseLoan.createLoan(appId);
        allure.addArgument("Loan created", `${txtAppId}`)
        allure.endStep();
    })
})
