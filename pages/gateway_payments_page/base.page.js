/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
import * as config from '../../config/config.js';

export default class BasePage {
    
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`${config.baseUrl}${path}`)
    }
    openByjusPayPage(){
        return browser.url(`${process.env.PAY_BYJUS_ORDERS_URL}`)
    }
    openHomePage(){
        return browser.url(`${config.baseUrl}${path}`)
    }
}
