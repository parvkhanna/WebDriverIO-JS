import { getRandomNum } from '../utils/functions.js';
let phoneNumber = getRandomNum();
let randomNum6digits = getRandomNum(6);
let randomNum8digits = getRandomNum(8);
const byjusNachData = {
    byjusNachValidData: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        panNumber: "BQJPG0712T",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "akshay.gaikwad@infobeans.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "29000",
        dobStudentYear: "1990",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        studentMotherName: "Mother Name",
        randomNum6digits: randomNum6digits,
        randomNum8digits: randomNum8digits,
        SchoolLocation: "Delhi,India",
        studentNameNew: "Rahul",
        schoolName: ["S", "O", "U", "T", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        studentsAddress: "125/12 New road"

    },
    byjusNachInvalidEmail: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        panNumber: "{awaiting test data}",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "Xyzgmail.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "29000",
        dobStudentYear: "2020",
        dobStudentMonth: "June",
        dobStudentDate: "10",
    },
    byjusNachInvalidAmountLessThan14000: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        panNumber: "EDBPK2802L",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "akshay.gaikwad@infobeans.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "13999",
        dobStudentYear: "1993",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        studentMotherName: "Mother Name",
        SchoolLocation: "Delhi,India",
        studentNameNew: "Rahul",
        schoolName: ["S", "O", "U", "T", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        studentsAddress: "125/12 New road"
    },
    byjusNachInvalidAmountGreaterThan300000: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        panNumber: "EDBPK2802L",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "akshay.gaikwad@infobeans.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "300001",
        dobStudentYear: "1993",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        studentMotherName: "Mother Name",
        SchoolLocation: "Delhi,India",
        studentNameNew: "Rahul",
        schoolName: ["S", "O", "U", "T", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        studentsAddress: "125/12 New road"
    },
    byjusNachInvalidNumberLessThanTenDigits: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        panNumber: "EDBPK2802L",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: "598214237",
        email: "akshay.gaikwad@infobeans.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "300000",
        dobStudentYear: "1993",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        studentMotherName: "Mother Name",
        SchoolLocation: "Delhi,India",
        studentNameNew: "Rahul",
        schoolName: ["S", "O", "U", "T", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        studentsAddress: "125/12 New road"
    },
    byjusNachInvalidNumberGreaterThanTenDigits: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Rahul",
        borrowerLastName: "Kumar",
        studentName: "Rohan",
        panNumber: "EDBPK2802L",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: "798214237562",
        email: "akshay.gaikwad@infobeans.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "300000",
        dobStudentYear: "1993",
        dobStudentMonth: "June",
        dobStudentDate: "11",
        studentMotherName: "Mother Name",
        SchoolLocation: "Delhi,India",
        studentNameNew: "Rahul",
        schoolName: ["S", "O", "U", "T", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        studentsAddress: "125/12 New road"
    },
    byjusNachInvalidAgeBelow18: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Rahul",
        borrowerLastName: "Kumar",
        studentName: "Rohan",
        panNumber: "EDBPK2802L",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "akshay.gaikwad@infobeans.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "300000",
        dobStudentYear: "2015",
        dobStudentMonth: "June",
        dobStudentDate: "11",
        studentMotherName: "Mother Name",
        SchoolLocation: "Delhi,India",
        studentNameNew: "Rahul",
        schoolName: ["S", "O", "U", "T", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        studentsAddress: "125/12 New road"
    },
    byjusNachInvalidAgeAbove65: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Rahul",
        borrowerLastName: "Kumar",
        studentName: "Rohan",
        panNumber: "EDBPK2802L",
        idProof: ["P", "A", "N", "Tab"],
        phoneNumber: phoneNumber,
        email: "akshay.gaikwad@infobeans.com",
        loanTenure: ["9", "Tab"],
        payableAmount: "300000",
        dobStudentYear: "1955",
        dobStudentMonth: "June",
        dobStudentDate: "11",
        studentMotherName: "Mother Name",
        SchoolLocation: "Delhi,India",
        studentNameNew: "Rahul",
        schoolName: ["S", "O", "U", "T", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        studentsAddress: "125/12 New road"
    },
    byjusNachInvalidAadharNum: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        borrowerFirstName: "Dummy",
        borrowerLastName: "customer name",
        studentName: "Rahul",
        panNumber: "ABCD",
        idProof: ["A", "a", "d", "Tab"],
        phoneNumber: phoneNumber,
        email: "EDBPK2802L",
        loanTenure: ["9", "Tab"],
        payableAmount: "29000",
        dobStudentYear: "2015",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        payableAmount: "300000",
        dobStudentYear: "1993",
        dobStudentMonth: "June",
        dobStudentDate: "11",
        studentMotherName: "Mother Name",
        SchoolLocation: "Delhi,India",
        studentNameNew: "Rahul",
        schoolName: ["S", "O", "U", "T", "Tab"],
        schoolFeeBand: ["5000", "Tab"],
        studentsAddress: "125/12 New road"
    },
    loanTenureOptions: {
        options: ["3 Months", '6 Months', '9 Months', '12 Months']
    },
    idProofTypeOptions: {
        options: ["Aadhaar", 'PAN', 'Driving License', 'Passport', 'Voter Id']
    },
    genderOptions: {
        options: ["Mr.", "Mrs", "Ms."]
    },
    accountTypeOptions: {
        options: ["Savings", 'Current', 'Joint', 'NRE', 'NRO']
    },
    BankBranchDeatils: {
        ifsc: 'ABHY0065001',
        micr: '400065001',
        city: 'GREATER MUMBAI'

    },
};
export { byjusNachData };
