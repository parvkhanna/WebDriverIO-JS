const { default: BasePage } = require("./gateway_payments_page/base.page");

class LoginPage extends BasePage
{
    get tfEnterPassword() {
        return $("input[type='password']")
    }


}

export default new LoginPage();