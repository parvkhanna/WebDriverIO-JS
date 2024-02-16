import { AllureUtil as allure } from "../../../../utils/util.allure";
import AvanseLoan from "../../../../pages/loan_payments_page/avanse.payment.page"
import ByjusPayPage from "../../../../pages/gateway_payments_page/byjus.pay.page"


describe("Verify Test scenario", async ()=>  
{
    beforeEach("Open payment portal", async () => {
        console.log("inside before each method")
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep("Open Byjus LMS login page");
        await browser.url(`${process.env.LMS_BYJUS_PORTAL_URL}`)
        console.log("after url launched")
        allure.startStep("Login to the LMS page");
        await ByjusPayPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        
    })


    afterEach("Deleting the object from DB", async () => {
        allure.startStep("Deleting object from DB");
       // await mongoConnect.avanseDeleteObjectFromDb(avanseData.avanceValidData.panNumber, avanseData.avanceValidData.telephoneNumber);
    })
    it('Open unprocess Avanse loan view page', async () => {
        console.log("Inside Open unprocess Avanse loan view page");
        await AvanseLoan.btnManageLoan.waitForClickable({timeout:50000});
        await AvanseLoan.btnManageLoan.click();
        await AvanseLoan.btnUnprocessedAvanse.waitForClickable({timeout:5000})
        await AvanseLoan.btnUnprocessedAvanse.click();
        await AvanseLoan.btnAbbTicketSearchBox.setValue("94200590782789");
        await browser.keys("Enter");
        await AvanseLoan.btnDocumentVarificationLink("94200590782789").waitForExist({ timeout: 10000 });
        await AvanseLoan.btnDocumentVarificationLink("94200590782789").click();
        await AvanseLoan.btnApprove.waitForExist({ timeout: 20000 });
        await browser.pause(10000);
        const path = require('path');
        const filePath = path.join(process.cwd(), process.env.PAN_CARD_IMAGE_PATH);
        await AvanseLoan.reuploadDocument.waitForClickable({ timeout: 60000 });
                await AvanseLoan.reuploadDocument.click();
                await browser.pause(10000);
                //await AvanseLoan.btnChooseFile.waitForClickable({ timeout: 60000 });
                await AvanseLoan.reuploaddbtnChooseFile.setValue(filePath);
                await browser.pause(10000);
               // await AvanseLoan.btnUploadFile.waitForClickable({ timeout: 60000 });
                await AvanseLoan.btnUploadFile.click();
                // sometime page takes time to get loaded
                await browser.pause(5000);
    })
})
