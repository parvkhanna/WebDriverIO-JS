import FullertonLoan from "../../../../pages/loan_payments_page/fullerton.payment.page";
import { AllureUtil as allure } from "../../../../utils/util.allure";
import { fullertonData } from "../../../../data/fullerton.loanform.data";
import mongoConnect from "../../../../utils/mongoconnect";
import { dataToMoveTo } from "../../../../data/fullerton.move.to.particular.page"


describe("Full E2E flow of Fulerton v3 loan vendor", async function () {
    this.retries(2)
    beforeEach('Open payment portal', async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await FullertonLoan.openByjusPayPage();
        allure.startStep('Login to the payment page', true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Deleting object from Db which has pan number we used', true);
        await mongoConnect.fullertonDeleteObjectFromDb(fullertonData.fullertonValidData.panNumber);
    })

    afterEach('Delete the object from DB ', async () => {
        allure.startStep('Deleting object from Db which has pan number we used', true);
        await mongoConnect.fullertonDeleteObjectFromDb(fullertonData.fullertonValidData.panNumber);
    });

    it('Create Fullerton v3 loan payment with Valid details', async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of fullerton loan & Click on sent OTP');
        let panNumber = await FullertonLoan.enterCustomerAndLoanDetails(fullertonData.fullertonValidData);
        allure.startStep("Open Order Page Url in new window", true);
        await browser.newWindow(`${process.env.PAY_BYJUS_ORDERS_URL}`);
        allure.startStep("Login to the payment page", true);
        await FullertonLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Get app id from unprocessed loan page", true);
        let appId = await FullertonLoan.returnAppId(fullertonData.fullertonValidData.panNumber);
        allure.startStep("Address of window is stored in a variable", true);
        const handles = await browser.getWindowHandles();
        allure.startStep('Switched to window handles[0]', true);
        await browser.switchToWindow(handles[0]);
        allure.startStep('Close the window');
        await browser.closeWindow();
        allure.startStep('Switched to window handles[1]', true);
        await browser.switchToWindow(handles[1]);
        allure.startStep("Update status in db to bypass otp process", true);
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep("Update documents in db  to move to Ops team approval pending page", true);
        await mongoConnect.updateDocumentsInDb(appId, dataToMoveTo.WaitForOpsTeamApproval);
        allure.startStep("Creating new object in Abb assesements collection", true);
        await mongoConnect.lmsAbbAssessmentCollectionObject(appId, "fullertonv3");
        allure.startStep("Refresh page to get the updates visible", true);
        await browser.refresh();
        allure.startStep('clicking on resume button', true);
        await FullertonLoan.btnResume(appId).click();
        allure.startStep('Wait for continue button to be clickable', true);
        await FullertonLoan.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await FullertonLoan.btnContinue.click();
        // allure.startStep('Upload bank statement & enter bank details', true);
        // await FullertonLoan.uploadBankStatement(panNumber);
        allure.startStep('Update status of above appId in transactionscibil collection as Cibil check passed', true);
        await mongoConnect.updatetransactionsCibilRecordCibilCheckPassed(appId);
        allure.startStep('Go to LMS portal & approve the loan for given appId', true);
        await FullertonLoan.lmsAbbTicketApproval(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING, appId, fullertonData.fullertonValidData);
        allure.startStep("Close the Lms window", true);
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]", true);
        await browser.switchToWindow(handles[1]);
        allure.startStep('Refresh the window', true);
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable', true);
        await FullertonLoan.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Select the EMI date & click on continue to accept the loan agreement', true);
        await FullertonLoan.selectEmiDateAndApproveLoanAgreement(panNumber);
        allure.startStep('Verify OKYC', true);
        await FullertonLoan.verifyOKYC(panNumber);
        // allure.startStep('Upload the identity proof documents required', true);
        // await FullertonLoan.uploadPersonalDocuments(fullertonData.fullertonValidData);
        allure.startStep("Update documents in db to move to Send Esign page", true);
        await mongoConnect.updateDocumentsInDb(appId, dataToMoveTo.eSignAgreementPage);
        allure.startStep("Update status in db as approval pending", true);
        await mongoConnect.updateTransactionsCibilStatusApprovalPending(appId);
        allure.startStep('Update Esign details in transactionscibil collection', true);
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf document in transactionscibil collection', true);
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('Refresh the window', true);
        await browser.refresh();
        allure.startStep('Wait for continue button to be clickable', true);
        await FullertonLoan.btnContinue.waitForClickable({ timeout: 60000 });
        allure.startStep('Click on continue button', true);
        await FullertonLoan.btnContinue.click();
        allure.startStep('Wait for the Done button to be clickable', true);
        await FullertonLoan.btnDone.waitForClickable({ timeout: 10000 });
        allure.startStep('Go to LMS portal and approve all the documents', true);
        await FullertonLoan.lmsVerifyDocuments(appId);
        //allure.startStep('Validate all the documents are verified', true);
        // await browser.waitUntil(async () => await FullertonLoan.popUpDocApproved.getText() == `All documents are verified`,
        //       {  timeout: 20000})
        // allure.startStep(' Approve all the documents for fin ops approval');
        // await FullertonLoan.lmsVerifyDocumentsForFinOpsApproved(appId);
        // allure.startStep('Approve all the documents & create loan')
        // await FullertonLoan.createLoan(appId)
        allure.endStep();
    })

})