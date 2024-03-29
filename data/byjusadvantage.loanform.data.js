import { getRandomNum } from '../utils/functions.js';
let phoneNumber = getRandomNum();
let randomNum6digits = getRandomNum(6);
let randomNum7digits = getRandomNum(7);
let accountNumber = getRandomNum(11);
const byjusAdvantageData = {
    byjusAdvantageValidData: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        mothersName: "Rashmi",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        panNumber: "ANRPM2537J",
        email: "sapna.tomar@infobeans.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "29000",
        downPayment: "15000",
        dobStudentYear: "1990",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        randomNum6digits: randomNum6digits,
        randomNum7digits: randomNum7digits,
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        schoolName: ["S", "O", "U", "T", "Tab"]
    },
    byjusAdvantageInvalidEmail: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        mothersName: "Rashmi",
        panNumber: "{awaiting test data}",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "Xyzgmail.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "29000",
        downPayment: "15000",
        dobStudentYear: "2020",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        schoolName: ["S", "O", "U", "T", "Tab"]
    },
    byjusAdvantageInvalidAmountLessThan14000: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        mothersName: "Rashmi",
        panNumber: "{awaiting test data}",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "byyjusllearningg@gmail.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "13999",
        downPayment: "15000",
        dobStudentYear: "1993",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        schoolName: ["S", "O", "U", "T", "Tab"]
    },
    byjusAdvantageInvalidAmountGreaterThan300000: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        mothersName: "Rashmi",
        panNumber: "{awaiting test data}",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "byyjusllearningg@gmail.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "300001",
        downPayment: "15000",
        dobStudentYear: "1993",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        schoolName: ["S", "O", "U", "T", "Tab"]
    },
    byjusAdvantageInvalidNumberLessThanTenDigits: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        mothersName: "Rashmi",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: "98778766",
        email: "sapna.tomar@infobeans.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "29000",
        downPayment: "15000",
        dobStudentYear: "1990",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        randomNum6digits: randomNum6digits,
        randomNum7digits: randomNum7digits,
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        schoolName: ["S", "O", "U", "T", "Tab"]
    },
    byjusAdvantageInvalidDownPayment: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        mothersName: "Rashmi",
        panNumber: "{awaiting test data}",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "byyjusllearningg@gmail.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "13999",
        downPayment: "14000",
        dobStudentYear: "1993",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        schoolName: ["S", "O", "U", "T", "Tab"]
    },
    byjusAdvantageInvalidNumberGreaterThanTenDigits: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Rahul",
        borrowerLastName: "Kumar",
        studentName: "Rohan",
        mothersName: "Rashmi",
        panNumber: "{awaiting test data}",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: "798214237562",
        email: "byyjusllearningg@gmail.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "300000",
        downPayment: "15000",
        dobStudentYear: "1993",
        dobStudentMonth: "June",
        dobStudentDate: "11",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        schoolName: ["S", "O", "U", "T", "Tab"]
    },
    byjusAdvantageInvalidAgeBelow18: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Rahul",
        borrowerLastName: "Kumar",
        studentName: "Rohan",
        mothersName: "Rashmi",
        panNumber: "{awaiting test data}",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "byyjusllearningg@gmail.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "300000",
        downPayment: "15000",
        dobStudentYear: "2012",
        dobStudentMonth: "June",
        dobStudentDate: "11",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        schoolName: ["S", "O", "U", "T", "Tab"]
    },
    byjusAdvantageInvalidAgeAbove65: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Rahul",
        borrowerLastName: "Kumar",
        studentName: "Rohan",
        mothersName: "Rashmi",
        panNumber: "{awaiting test data}",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "byyjusllearningg@gmail.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "300000",
        downPayment: "15000",
        dobStudentYear: "1955",
        dobStudentMonth: "June",
        dobStudentDate: "11",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        schoolName: ["S", "O", "U", "T", "Tab"]
    },
    byjusAdvantageInvalidAadharNum: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        mothersName: "Rashmi",
        panNumber: "ABCD",
        idProof: ["A", "a", "d", "Tab"],
        phoneNumber: phoneNumber,
        email: "byyjusllearningg@gmail.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "29000",
        downPayment: "15000",
        dobStudentYear: "2020",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        qualification: ["P", "o", "s", "t", "Tab"],
        employementType: ["S", "a", "l", "a", "r", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        SchoolLocation: "Delhi,India",
        schoolName: ["S", "O", "U", "T", "Tab"]
    },
    byjusAdvantageAccountInvalidData: {
        title: ["M", "r", "Tab"],
        customerName: "Test customer wrong",
        accountNumber: accountNumber,
        accountType: ["S", "a", "v", "Tab"]
    },
    byjusAdvantageAccountValidData: {
        title: ["M", "r", "Tab"],
        customerName: "Dummy customer name",
        accountNumber: accountNumber,
        accountType: ["S", "a", "v", "Tab"]
    },
    loanTenureOptions: {
        options: ["3 Months", '6 Months', '9 Months', '12 Months']
    },
    accountTypeOptions: {
        options: ["Savings", 'Current', 'Joint', 'NRE', 'NRO']
    },
    genderOptions: {
        options: ["Mr.", "Mrs", "Ms."]
    },
};
export { byjusAdvantageData };
