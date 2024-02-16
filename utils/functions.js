export function getRandomNum(lengthOfString=10) {
    let d = new Date();
    let n = d.getTime();
    n=n.toString();
    let len = n.length;
    len = len-lengthOfString;
    n = parseInt( '9'+n.slice(len+1));
    return n;
    }
export function getValidityYear(validity) {
    let currentYear=new Date().getFullYear();
    let validityYear = parseInt(currentYear)+parseInt(validity)
    console.log(validityYear);
    if (validityYear<=currentYear+15){
      return validityYear;
    }
    else{
        return currentYear+1
    } 
}

export function getRandomString(length) {
    // declare all characters
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = ' ';
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
