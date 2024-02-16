import mongoConnect from "../../../../utils/mongoconnect";
import { AllureUtil as allure } from '../../../../utils/util.allure';
import ByjusAssurePage from '../../../../pages/loan_payments_page/byjusAssure.payment.page';
import { byjusAssureData } from '../../../../data/byjusAssure.loanform.data';
import { dataToMoveTo } from "../../../../data/byjusAssure.move.to.particular.page"

describe('Full E2E flow of byjus assure', async function () {
    this.retries(2)
    beforeEach('Open payment portal', async () => {
        await browser.maximizeWindow();
        allure.startStep('Open Byjus payment login page');
        await ByjusAssurePage.openByjusPayPage();
        allure.startStep('Login to the payment page');
        await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.byjusAssureDeleteObjectFromDb(byjusAssureData.byjusAssureValidData.panNumber);
    })
    afterEach("Delete Object from DB", async () => {
        allure.startStep('Delete object from DB if it has some object with same pancard number we are using');
        await mongoConnect.byjusAssureDeleteObjectFromDb(byjusAssureData.byjusAssureValidData.panNumber);
    });
    it("Create Byjus assure loan payment with Valid details ", async () => {
        allure.startStep('Enter valid customer details in Customer and Loan Details form of byjus assure loan & Click on sent OTP');
        let panNumber = await ByjusAssurePage.enterCustomerDetailAndLoanDetails(byjusAssureData.byjusAssureValidData);
        allure.startStep('Open new window of payments page');
        await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
        const handles = await browser.getWindowHandles();
        allure.startStep("Switch to window handles[0]");
        await browser.switchToWindow(handles[0]);
        allure.startStep("Closing verify otp window after opening new window");
        await browser.closeWindow();
        allure.startStep("Switch to window handles[1]");
        await browser.switchToWindow(handles[1]);
        allure.startStep('Login to the payment page');
        await ByjusAssurePage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep('Open byjus assure Unprocessed loan & get appId');
        let appId = await ByjusAssurePage.returnAppId(panNumber);
        allure.startStep('Update status of above appId in transactionscibil collection');
        await mongoConnect.updatetransactionsCibilRecord(appId);
        allure.startStep('click on resume button');
        await ByjusAssurePage.btnResume(appId).click();
        allure.startStep('clicking on pop up continue button');
        await ByjusAssurePage.ClickOnPopUpContinue();
        allure.startStep('Enter valid customer account details');
        await ByjusAssurePage.fillAccountDetails();
        allure.startStep('click on continue button');
        await ByjusAssurePage.btnContinue.click();
        allure.startStep('click on continue button');
        await ByjusAssurePage.btnContinue.click();
        allure.startStep('wait for next button to be exist ');
        await ByjusAssurePage.nextButton.waitForExist({ timeout: 30000 })
        allure.startStep('click on next button');
        await ByjusAssurePage.nextButton.click()
        allure.startStep('click on physical nach radio button');
        await ByjusAssurePage.rbToPhysicalNach.click();
        allure.startStep('click on confirm check box');
        await ByjusAssurePage.cbToSendOtp.click();
        allure.startStep('click on Generate PNACH button');
        await ByjusAssurePage.btnGeneratePNACH.click();
        allure.startStep('wait for an upload document radio button to be clickable ');
        await ByjusAssurePage.rbUploadDocument.waitForClickable({ timeout: 8000 });
        // allure.startStep('click on upload document radio button ');
        // await ByjusAssurePage.rbUploadDocument.click();
        // allure.startStep('upload document 3 photo ');
        // await ByjusAssurePage.uploadDocuments();
        allure.startStep('Update Document in db ');
        await mongoConnect.updateDocumentsInDb(appId, dataToMoveTo.eSignAgreementPage);
        // allure.startStep('Validate visiblity of Send Esign');
        // await ByjusAssurePage.btnSendOtp.waitForClickable({ timeout: 9000 });
        // allure.startStep('Click on Esign button');
        // await ByjusAssurePage.btnSendOtp.click();
        allure.startStep('Updating Esign details in DB');
        await mongoConnect.updateEsignDetailsCibilRecord(appId);
        allure.startStep('Update Esign pdf Document ');
        await mongoConnect.updateEsignPDFDocument(appId);
        allure.startStep('Update status to approval pending ');
        await mongoConnect.updateTransactionsCibilStatusApprovalPending(appId);
        await browser.refresh();
        allure.startStep('Click on continue pop up');
        await ByjusAssurePage.ClickOnPopUpContinue();
        allure.startStep('Go to LMS portal and approve all the documents');
        await ByjusAssurePage.lmsVerifyDocuments(appId);
        allure.startStep('Approve all the documents For fin ops approve');
        await ByjusAssurePage.lmsVerifyDocumentsForFinOpsApproved(appId);
        allure.startStep('Approve all the documents for create loan');
        let txtAppId = await ByjusAssurePage.createLoan(appId);
        allure.addArgument("Loan created", `${txtAppId}`)
        allure.endStep();
    })
})