import { getRandomNum } from '../utils/functions.js';
let phoneNumber = getRandomNum();
let randomNum6digits = getRandomNum(6);
let randomNum7digits = getRandomNum(7);

const iiflData = {
    iiflValidDetails: {
        BorrowersFirstName: "Parv",
        BorrowersMiddleName: "S",
        BorrowersLastName: "Khanna",
        panNumber: "BDZPK0712Y",
        AadharNumber: "7407",
        dobYear: "1990",
        dobMonth: "June",
        dobDate: "10",
        gender: ["M", "a", "Tab"],
        phoneNumber: phoneNumber,
        email: "pranshu.dubey@infobeans.com",
        fathersName: "Pranshu D",
        mothersName: "Mother Name",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        borrowersAddress: "1234 Main road",
        borrowersPinCode: "452009",
        stateName: ["M", "a", "d", "h", "y", "Tab"],
        cityName: ["U", "j", "j", "a", "i", "Tab"],
        payableAmount: "30000",
        loanTenure: ["9", "Tab"],
        productName: "Product name",
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        studentsName: "Rohan",
        schoolName: ["Tab"],
        studnetaddress: "student address",
        randomNum6digits: randomNum6digits,
        randomNum7digits: randomNum7digits,
    },

    iiflInvalidPanNo9digits: {
        panNumber: "DGLPK3432G9",
        AadharNumber: "7407",
        dobYear: "1990",
        dobMonth: "June",
        dobDate: "10",
        gender: ["M", "a", "Tab"],
        phoneNumber: "0007654312",
        email: "byyjusllearningg@gmail.com",
        fathersName: "Borrower's Father Name",
        mothersName: "Borrower's Mother Name",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        borrowersAddress: "1234 Main road",
        borrowersPinCode: "452009",
        payableAmount: "20000",
        loanTenure: ["9", "Tab"],
        productName: "Product name",
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        studentsName: "Rohan",
        schoolName: ["Tab"],
        studnetaddress: "student address"
    },

    iiflInvalidAgeLessthan21: {
        panNumber: "DGLPK3432G",
        AadharNumber: "7407",
        dobYear: "2012",
        dobMonth: "June",
        dobDate: "10",
        gender: ["M", "a", "Tab"],
        phoneNumber: "0007654323",
        email: "byyjusllearningg@gmail.com",
        fathersName: "Borrower's Father Name",
        mothersName: "Borrower's Mother Name",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        borrowersAddress: "1234 Main road",
        borrowersPinCode: "452009",
        payableAmount: "40000",
        loanTenure: ["9", "Tab"],
        productName: "Product name",
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        studentsName: "Rohan",
        schoolName: ["Tab"],
        studnetaddress: "student address"
    },

    iiflInvalidAgeMorethan60: {
        panNumber: "DGLPK3432G",
        AadharNumber: "7407",
        dobYear: "1955",
        dobMonth: "June",
        dobDate: "10",
        gender: ["M", "a", "Tab"],
        phoneNumber: "0006554322",
        email: "byyjusllearningg@gmail.com",
        fathersName: "Borrower's Father Name",
        mothersName: "Borrower's Mother Name",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        borrowersAddress: "1234 Main road",
        borrowersPinCode: "452009",
        payableAmount: "35000",
        loanTenure: ["9", "Tab"],
        productName: "Product name",
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        studentsName: "Rohan",
        schoolName: ["Tab"],
        studnetaddress: "student address"

    },

    iiflInvalidMobileNoLessthan10Digits: {
        panNumber: "DGLPK3432G",
        AadharNumber: "7407",
        dobYear: "1990",
        dobMonth: "June",
        dobDate: "10",
        gender: ["M", "a", "Tab"],
        phoneNumber: "987656543",
        email: "byyjusllearningg@gmail.com",
        fathersName: "Borrower's Father Name",
        mothersName: "Borrower's Mother Name",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        borrowersAddress: "1234 Main road",
        borrowersPinCode: "452009",
        payableAmount: "30000",
        loanTenure: ["9", "Tab"],
        productName: "Product name",
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        studentsName: "Rohan",
        schoolName: ["Tab"],
        studnetaddress: "student address"
    },

    iiflInvalidMobileNoMorethan10Digits: {
        panNumber: "DGLPK3432G",
        AadharNumber: "7407",
        dobYear: "1990",
        dobMonth: "June",
        dobDate: "10",
        gender: ["M", "a", "Tab"],
        phoneNumber: "98765654356",
        email: "byyjusllearningg@gmail.com",
        fathersName: "Borrower's Father Name",
        mothersName: "Borrower's Mother Name",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        borrowersAddress: "1234 Main road",
        borrowersPinCode: "452009",
        payableAmount: "25000",
        loanTenure: ["9", "Tab"],
        productName: "Product name",
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        studentsName: "Rohan",
        schoolName: ["Tab"],
        studnetaddress: "student address"
    },

    iiflInvalidLoanAmountLessthan18000: {
        panNumber: "DGLPK3432G",
        AadharNumber: "7407",
        dobYear: "1990",
        dobMonth: "June",
        dobDate: "10",
        gender: ["M", "a", "Tab"],
        phoneNumber: "0009765432",
        email: "byyjusllearningg@gmail.com",
        fathersName: "Borrower's Father Name",
        mothersName: "Borrower's Mother Name",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        borrowersAddress: "1234 Main road",
        borrowersPinCode: "452009",
        payableAmount: "12000",
        loanTenure: ["9", "Tab"],
        productName: "Product name",
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        studentsName: "Rohan",
        schoolName: ["Tab"],
        studnetaddress: "student address"
    },

    iiflInvalidLoanAmountMorethan120000: {
        panNumber: "DGLPK3432G",
        AadharNumber: "7407",
        dobYear: "1990",
        dobMonth: "June",
        dobDate: "10",
        gender: ["M", "a", "Tab"],
        phoneNumber: "0008965434",
        email: "byyjusllearningg@gmail.com",
        fathersName: "Borrower's Father Name",
        mothersName: "Borrower's Mother Name",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        borrowersAddress: "1234 Main road",
        borrowersPinCode: "452009",
        payableAmount: "132000",
        loanTenure: ["9", "Tab"],
        productName: "Product name",
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        studentsName: "Rohan",
        schoolName: ["Tab"],
        studnetaddress: "student address"
    },
    genderOptions: {
        options: ["Male", "Female", "Other"]
    },

    qualificationOptions: {
        options: ["Doctorate", "Post Graduate", "Graduate", "Under Graduate", "12th Grade", "Vocational", "Illiterate"]
    },

    occupationTypeOptions: {
        options: ["Student", "Homemaker", "Salaried", "Self Employed"]
    },

    loanTenureOptions: {
        options: ["9 months", "12 months"]
    },

    titleOptions: {
        options: ["Mr.", "Mrs", "Ms."]
    },

    accountTypeOptions: {
        options: ["Savings", "Current", "Joint", "NRE", "NRO"]
    },


};
export { iiflData };
