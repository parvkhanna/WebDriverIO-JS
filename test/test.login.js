const { default: loginPage } = require("../pages/login.Page");

describe('Verify login functionality', async function () {
    //this.retries(2)
    beforeEach("Open login Page", async () => {
        allure.startStep("Maximize the window");
        await browser.maximizeWindow();
        allure.startStep("Open Byjus payment login page");
        await loginPage.openHomePage();
        allure.startStep("Login to the payment page", true);
        await AbflLoan.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
        allure.startStep("Deleting object from DB", true);
        await mongoConnect.abflDeleteObjectFromDb(abflData.abflValidData.panNumber);
    })
})