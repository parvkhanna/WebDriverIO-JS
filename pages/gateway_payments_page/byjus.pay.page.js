import BasePage from './base.page';

class ByjusPayPage extends BasePage {
    /**
     * btn for button
     * dd for dropdown list
     * tf for text field
     * rb for radio button
     */
    get btnSignInWithGoogle() {
        return $("//button[contains(text(),' Sign In With Google')]")
    }
    get btnContinueWithGoogle() {
        return $("(//button[@name='googleSignUpButton'])[2]")
    }
    get tfEnterMailAddress() {
        return $("//input[@id='identifierId']")
    }
    get btnNext() {
        return $("//span[text()='Next']/..")
    }
    get tfEnterPassword() {
        return $("//input[@type='password']")
    }
    get payBtnPayu() {
        return $("//a[@href='/payu']/button")
    }
    get tfCustomerName() {
        return $("//input[@label='Customer Name']")
    }
    get tfCustomerPhone() {
        return $("//input[@label='Customer Phone']")
    }
    get tfCourseDescription() {
        return $("//input[@label='Course Description']")
    }
    get tfCustomerEmail() {
        return $("//input[@label='Customer Email']")
    }
    get tfPhone() {
        return $("input[name=phone]")
    }
    get tfamount() {
        return $("input[name=amount]")
    }
    get tfProductname() {
        return $("input[name=productinfo]")
    }
    get tfAmount() {
        return $("//input[@label='Amount']")
    }
    get btnSubmit() {
        return $("//button[contains(text(),'Submit')]")
    }
    get btnReset() {
        return $("//button[contains(text(),'Reset')]")
    }
    get btnSendLinkToCustomer() {
        return $("//button[contains(text(),'Send Link To Customer')]")
    }
    get btnCancelTransaction() {
        return $("//button[contains(text(),'Cancel Transaction')]")
    }
    get tfSalesEmail() {
        return $("//input[@name='salesEmail']")
    }
    get tnxId() {
        return $("(//div[@class='history-card'])[1]/p[2]/span[@class='col-value']")
    }
    get notificationNotice() {
        return $('.ant-notification-notice-with-icon')
    }

    get btnSelectByjusAccount() {
        return $("//div[@data-identifier='achievetesting@byjus.com']")
    }
    get descriptionField() {
        return $("//input[@label='Description']")
    }
    get gpayResumeBtn() {
        return $("//button[text()='Resume']")
    }
    get gpaybtn() {
        return $("//a[@href='/gpay']/button")
    }
    get pinelabsBtn() {
        return $("//a[@href='/pinelabs']/button")
    }
    get shopsebtn() {
        return $("//a[@href='/shopse']/button")
    }
    get razorPayBtn() {
        return $("//a[@href='/razorpay']/button")
    }
    get phonePayBtn() {
        return $("//a[@href='/phonepe']/button")
    }

    getErrorMsgElement(fieldName) {
        return $(`//input[@name='${fieldName}']/../div[@class='invalid-feedback']`);
    }

    getErrorMsgEleUsingDispText(fieldName) {
        return $(`//input[@label='${fieldName}']/../div[@class='invalid-feedback']`);
    }

    get btnAvanse() { return $("//a[@href='/avanse']/button") }
    get btnSkipUploadDocument() { return $("//button[text()='Skip Extract Page']") }
    get tfPanNumber() { return $("//input[@name='panNo']") }
    get ddSelectAddressProof() { return $("//div[text()='Select Address Proof']") }


    async loginPaymentPage(username, password) {
        await browser.pause(10000);
        try { await this.btnSignInWithGoogle.waitForDisplayed({ timeout: 30000 }) }
        catch { }
        let googleSignInBtnDisplayed = await this.btnSignInWithGoogle.isDisplayed();
        if (googleSignInBtnDisplayed) {
            await this.btnSignInWithGoogle.click();
            await this.btnContinueWithGoogle.click();
            if (await this.tfEnterMailAddress.isDisplayed({ timeout: 5000 })) {
                await this.tfEnterMailAddress.setValue(username);
                await this.btnNext.click();
                await this.tfEnterPassword.waitForDisplayed({ timeout: 5000 });
                await this.tfEnterPassword.setValue(password);
                await this.btnNext.click();
            }
        }
        //await this.payBtnPayu.waitForExist({timeout: 60000});
    }

    async enterDetailsToCompleteGpayPhonepayPayment(customerName, phoneNumber, courseDescription, payableAmount) {
        await this.tfCustomerName.setValue(customerName);
        await this.tfCustomerPhone.setValue(phoneNumber);
        await this.descriptionField.setValue(courseDescription);
        await this.tfAmount.setValue(payableAmount);
    }

    async enterDetailsToCompletePayuPayment(customerName, phoneNumber, courseDescription, payableAmount) {
        await this.tfCustomerName.setValue(customerName);
        await this.tfCustomerPhone.setValue(phoneNumber);
        await this.tfCourseDescription.setValue(courseDescription);
        await this.tfAmount.setValue(payableAmount);
    }

    async enterDetailsToCompleteRazorPayShopsePayment(customerName, phoneNumber, courseDescription, payableAmount, customerEmail) {
        await this.tfCustomerName.setValue(customerName);
        await this.tfCustomerPhone.setValue(phoneNumber);
        await this.descriptionField.setValue(courseDescription);
        await this.tfAmount.setValue(payableAmount);
        await this.tfCustomerEmail.setValue(customerEmail);
    }

    async generatePayuTransactionId(customerName, phoneNumbre, courseDescription, payableAmount) {
        await this.payBtnPayu.click();
        await this.enterDetailsToCompletePayuPayment(customerName, phoneNumbre, courseDescription, payableAmount);
        await this.btnSubmit.click();
        await this.tnxId.waitForExist({ timeout: 20000 });
        let tnxId = await this.tnxId.getText();
        return tnxId;
    }

    async generateGpayTransactionId(customerName, phoneNumber, courseDescription, payableAmount) {
        await this.gpaybtn.click();
        await this.enterDetailsToCompleteGpayPhonepayPayment(customerName, phoneNumber, courseDescription, payableAmount);
        await this.btnSubmit.click();
        await this.tnxId.waitForExist({ timeout: 20000 });
        let tnxId = await this.tnxId.getText();
        return tnxId;
    }

    async generateShopseTransactionId(customerName, phoneNumber, courseDescription, payableAmount, customerEmail) {
        await this.shopsebtn.click();
        await this.enterDetailsToCompleteRazorPayShopsePayment(customerName, phoneNumber, courseDescription, payableAmount, customerEmail);
        await this.btnSubmit.click();
        await this.btnSendLinkToCustomer.click();
        await this.tnxId.waitForExist({ timeout: 20000 });
        let tnxId = await this.tnxId.getText();
        return tnxId;
    }

    async enterDetailsToCompletePinelabsPayment(customerName, phoneNumber, payableAmount, productname, customerEmail) {
        await this.tfCustomerName.setValue(customerName);
        await this.tfPhone.setValue(phoneNumber);
        await this.tfamount.setValue(payableAmount);
        await this.tfProductname.setValue(productname);
        await this.tfCustomerEmail.setValue(customerEmail);

    }

    async generateRazorPayTransactionId(customerName, phoneNumbre, courseDescription, payableAmount, customerEmail) {
        await this.razorPayBtn.click();
        await this.enterDetailsToCompleteRazorPayShopsePayment(customerName, phoneNumbre, courseDescription, payableAmount, customerEmail);
        await this.btnSubmit.click();
        await this.tnxId.waitForExist({ timeout: 20000 });
        let tnxId = await this.tnxId.getText();
        return tnxId;
    }
    async generatePhonepayTransactionId(customerName, phoneNumber, courseDescription, payableAmount) {
        await this.phonePayBtn.click();
        await this.enterDetailsToCompleteGpayPhonepayPayment(customerName, phoneNumber, courseDescription, payableAmount);
        await this.btnSubmit.click();
        await this.tnxId.waitForExist({ timeout: 20000 });
        let tnxId = await this.tnxId.getText();
        return tnxId;
    }

    async emiTransaction() {
        await this.btnAvanse.click();
        await this.btnSkipUploadDocument.waitForExist({ timeout: 60000 })
        await this.btnSkipUploadDocument.click();
        await this.tfPanNumber.setValue("ashy1235465");
        await this.ddSelectAddressProof.click();
        await browser.keys(["A", "a", "Tab"]);


    }
}

export default new ByjusPayPage();
