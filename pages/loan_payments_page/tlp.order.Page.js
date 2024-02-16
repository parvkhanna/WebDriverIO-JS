import byjusPayPage from "../gateway_payments_page/byjus.pay.page";

const { default: BasePage } = require("../gateway_payments_page/base.page");

class TLPOrderPage extends BasePage {

   get btnTlpHistory() {
      return $("//a[@href='/tl-pay-app/payment-history']/..//button[text()='History']")
   }
   get headerSerachFilter() {
      return $("//div[@class='card search-form']/header")
   }

   get ddWorkFlowStatus() {
      return $("//select[@name='workflowStatus']")
   }

   get btnApplyFilter() {
      return $("//button[normalize-space()='Apply Filter']")
   }

   btnView(appId) {
      return $(`a[href='/tl-pay-app/view?appId=${appId}']`)
   }

   get btnwebAppChangeReq() {
      return $("//button[@title='Web App Change Request']")
   }

   get ddselectreasonforRejection() {
      return $("(//div[@class='css-1hwfws3'])")
   }

   get btnReqWebAppPermit() {
      return $("//button[normalize-space()='Request Web App Permit']")
   }

   get btnManageServiceReq() {
      return $("//a[@href='/manage-service-requests']")
   }

   get TLPayServiceReqTab() {
      return $("//p[normalize-space()='TL Pay Service Requests']")
   }

   get tfAppId() {
      return $("input[name='appId']")
   }

   get ddAppIdFilter() {
      return $("//div[@class='Select-value']")
   }

   get btnAbbTicketSearchBox() {
      return $("//input[@name='searchText']")
   }

   get btnPermitRequest() {
      return $("//button[normalize-space()='Permit Request']")
   }

   btnPay(loanVendor) {
      return $(`//a[@href='/${loanVendor}']/button`)
   }

   get optionAppId() {
      return $("//div[text()='App Id']")
   }

   linkRequestId(appId) {
      return $(`//td[contains(text(),'${appId}')]/./preceding-sibling::td[1]/a`)
   }

   async createTlpObject(appId) {
      await browser.pause(3000)
      await this.btnTlpHistory.waitForClickable({ timeout: 8000 })
      await this.btnTlpHistory.click();
      await this.headerSerachFilter.waitForClickable({ timeout: 8000 });
      await this.headerSerachFilter.click();
      await this.tfAppId.waitForEnabled({ timeout: 10000 })
      await this.tfAppId.setValue(appId)
      await this.btnApplyFilter.waitForClickable({ timeout: 8000 })
      await this.btnApplyFilter.click();
      await this.btnView(appId).scrollIntoView()
      await this.btnView(appId).waitForClickable({ timeout: 25000 })
      await this.btnView(appId).click();
      await this.btnwebAppChangeReq.waitForClickable({ timeout: 8000 });
      await this.btnwebAppChangeReq.click();
      await this.ddselectreasonforRejection.waitForClickable({ timeout: 15000 })
      await this.ddselectreasonforRejection.click()
      await browser.keys(["U", "n", "a", "b", "l", "e", "Tab"])
      await this.btnReqWebAppPermit.waitForClickable({ timeout: 8000 })
      await this.btnReqWebAppPermit.click()

   }

   async updatePermitRequest(appId, KartId) {
      await browser.newWindow(process.env.LMS_BYJUS_PORTAL_URL);
      await byjusPayPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
      const handles = await browser.getWindowHandles();
      await browser.switchToWindow(handles[0]);
      await browser.closeWindow();
      await browser.switchToWindow(handles[1]);
      await browser.pause(5000)
      await this.btnManageServiceReq.waitForEnabled({timeout:30000});
      await browser.execute("arguments[0].click();", await this.btnManageServiceReq);
      await this.TLPayServiceReqTab.waitForClickable({ timeout: 18000 })
      await this.TLPayServiceReqTab.click();
      await this.ddAppIdFilter.waitForEnabled({ timeout: 15000 })
      await this.ddAppIdFilter.click();
      await this.optionAppId.waitForDisplayed({ timeout: 10000 })
      await this.optionAppId.click()
      await this.btnAbbTicketSearchBox.waitForClickable({ timeout: 10000 })
      await this.btnAbbTicketSearchBox.setValue(appId);
      await browser.keys("Enter");
      await this.linkRequestId(appId).waitForClickable({ timeout: 10000 })
      await this.linkRequestId(appId).click()
      try {
         await this.btnPermitRequest.waitForClickable({ timeout: 15000 })
         await this.btnPermitRequest.click()
      }
      catch { }
   }


   async openUrlWithKartId(kartId, loanVendor) {
      await browser.newWindow(process.env.PAY_BYJUS_ORDERS_URL);
      await byjusPayPage.loginPaymentPage(process.env.USER_EMAIL_ACHIEVETESTING, process.env.PWD_ACHIEVETESTING);
      await this.btnPay(loanVendor).waitForClickable({ timeout: 30000 });
      await this.btnPay(loanVendor).click();
      let currentUrl = await browser.getUrl()
      await browser.url(`${currentUrl}?leadId=${kartId}&orgId=byjus`)
      const handles = await browser.getWindowHandles();
      await browser.switchToWindow(handles[0]);
      await browser.closeWindow();
      await browser.switchToWindow(handles[1]);
   }



}

export default new TLPOrderPage();