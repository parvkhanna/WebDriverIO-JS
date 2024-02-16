import { getRandomNum } from '../utils/functions.js';
let phoneNumber = getRandomNum();
const byjusAssureData = {

  byjusAssureValidData: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    borrowerFirstName: "Dummy",
    borrowerLastName: "customer name",
    studentsName: "Rahul",
    email: "akshay.gaikwad@infobeans.com",
    phoneNumber: phoneNumber,
    idProof: ["P", "A", "N", "Tab"],
    panNumber: "EDBPK2802L",
    downPayment: "10000",
    eligableLoanAmount: "200000",
    loanAmount: "29000",
    loanTenure: ["9", "Tab"],
    address: "bhopal",
    dobStudentYear: "1990",
    dobStudentMonth: "June",
    dobStudentDate: "10",
    schoolFeeBand: ["5000", "Tab"],
    SchoolLocation: "Delhi,India",
    schoolName: ["S", "O", "U", "T", "Tab"],
    studentMotherName:"Mother Name"
  },
  byjusAssureInvalidEmail: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    borrowerFirstName: "Dummy",
    borrowerLastName: "customer name",
    studentsName: "Rahul",
    email: "arsalan_kfobeans.com",
    phoneNumber: phoneNumber,
    idProof: ["P", "A", "N", "Tab"],
    panNumber: "EDBPK2802L",
    downPayment: "10000",
    eligableLoanAmount: "200000",
    loanAmount: "29000",
    loanTenure: ["9", "Tab"],
    address: "bhopal (MP)",
    dobStudentYear: "1990",
    dobStudentMonth: "June",
    dobStudentDate: "10",
    schoolFeeBand: ["5000", "Tab"],
    SchoolLocation: "Delhi,India",
    schoolName: ["M", "A", "T", "E", "Tab"],
    studentMotherName:"Mother Name"

  },
  byjusAssureInvalidNumberGreaterThanTenDigits: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    borrowerFirstName: "Dummy",
    borrowerLastName: "customer name",
    studentsName: "Rahul",
    email: "akshay.gaikwad@infobeans.com",
    phoneNumber: "598214237586",
    idProof: ["P", "A", "N", "Tab"],
    panNumber: "EDBPK2802L",
    downPayment: "10000",
    eligableLoanAmount: "200000",
    loanAmount: "29000",
    loanTenure: ["9", "Tab"],
    address: "bhopal (MP)",
    dobStudentYear: "1990",
    dobStudentMonth: "June",
    dobStudentDate: "10",
    schoolFeeBand: ["5000", "Tab"],
    SchoolLocation: "Delhi,India",
    schoolName: ["S", "O", "U", "T", "Tab"],
    studentMotherName:"Mother Name"

  },
  byjusAssureInvalidNumberLessThanTenDigits: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    borrowerFirstName: "Dummy",
    borrowerLastName: "customer name",
    studentsName: "Rahul",
    email: "akshay.gaikwad@infobeans.com",
    phoneNumber: "598214237",
    idProof: ["P", "A", "N", "Tab"],
    panNumber: "EDBPK2802L",
    downPayment: "10000",
    eligableLoanAmount: "200000",
    loanAmount: "29000",
    loanTenure: ["9", "Tab"],
    address: "bhopal (MP)",
    dobStudentYear: "1990",
    dobStudentMonth: "June",
    dobStudentDate: "10",
    schoolFeeBand: ["5000", "Tab"],
    SchoolLocation: "Delhi,India",
    schoolName: ["S", "O", "U", "T", "Tab"],
    studentMotherName:"Mother Name"

  },
  byjusAssureInvalidDownPaymentLessThan10000: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    borrowerFirstName: "Dummy",
    borrowerLastName: "customer name",
    studentsName: "Rahul",
    email: "akshay.gaikwad@infobeans.com",
    phoneNumber: phoneNumber,
    idProof: ["P", "A", "N", "Tab"],
    panNumber: "EDBPK2802L",
    downPayment: "1000",
    eligableLoanAmount: "200000",
    loanAmount: "29000",
    loanTenure: ["9", "Tab"],
    address: "bhopal",
    dobStudentYear: "1990",
    dobStudentMonth: "June",
    dobStudentDate: "10",
    schoolFeeBand: ["5000", "Tab"],
    SchoolLocation: "Delhi,India",
    schoolName: ["S", "O", "U", "T", "Tab"],
    studentMotherName:"Mother Name"

  },
  byjusAssureInvalidLoanAmountGreaterThan100000: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    borrowerFirstName: "Dummy",
    borrowerLastName: "customer name",
    studentsName: "Rahul",
    email: "akshay.gaikwad@infobeans.com",
    phoneNumber: phoneNumber,
    idProof: ["P", "A", "N", "Tab"],
    panNumber: "EDBPK2802L",
    downPayment: "10000",
    loanAmount: "100000",
    loanTenure: ["9", "Tab"],
    address: "bhopal",
    dobStudentYear: "1990",
    dobStudentMonth: "June",
    dobStudentDate: "10",
    schoolFeeBand: ["5000", "Tab"],
    SchoolLocation: "Delhi,India",
    schoolName: ["S", "O", "U", "T", "Tab"],
    studentMotherName:"Mother Name"

  },
  byjusAssureInvalidLoanAmountLessThan10000: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    borrowerFirstName: "Dummy",
    borrowerLastName: "customer name",
    studentsName: "Rahul",
    email: "akshay.gaikwad@infobeans.com",
    phoneNumber: phoneNumber,
    idProof: ["P", "A", "N", "Tab"],
    panNumber: "EDBPK2802L",
    downPayment: "10000",
    loanAmount: "1000",
    loanTenure: ["9", "Tab"],
    address: "bhopal",
    dobStudentYear: "1990",
    dobStudentMonth: "June",
    dobStudentDate: "10",
    schoolFeeBand: ["5000", "Tab"],
    SchoolLocation: "Delhi,India",
    schoolName: ["S", "O", "U", "T", "Tab"],
    studentMotherName:"Mother Name"

  },
  byjusAssureInvalidAgeBelow18: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    borrowerFirstName: "Dummy",
    borrowerLastName: "customer name",
    studentsName: "Rahul",
    email: "akshay.gaikwad@infobeans.com",
    phoneNumber: phoneNumber,
    idProof: ["P", "A", "N", "Tab"],
    panNumber: "EDBPK2802L",
    downPayment: "10000",
    loanAmount: "1000",
    loanTenure: ["9", "Tab"],
    address: "bhopal",
    dobStudentYear: "2018",
    dobStudentMonth: "June",
    dobStudentDate: "11",
    schoolFeeBand: ["5000", "Tab"],
    SchoolLocation: "Delhi,India",
    schoolName: ["S", "O", "U", "T", "Tab"],
    studentMotherName:"Mother Name"

  },
  byjusAssureInvalidAgeAbove65: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    borrowerFirstName: "Dummy",
    borrowerLastName: "customer name",
    studentsName: "Rahul",
    email: "akshay.gaikwad@infobeans.com",
    phoneNumber: phoneNumber,
    idProof: ["P", "A", "N", "Tab"],
    panNumber: "EDBPK2802L",
    downPayment: "10000",
    loanAmount: "1000",
    loanTenure: ["9", "Tab"],
    address: "bhopal",
    dobStudentYear: "1955",
    dobStudentMonth: "June",
    dobStudentDate: "11",
    schoolFeeBand: ["5000", "Tab"],
    SchoolLocation: "Delhi,India",
    schoolName: ["S", "O", "U", "T", "Tab"],
    studentMotherName:"Mother Name"

  },
  byjusAssureInvalidAadharNum: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    borrowerFirstName: "Dummy",
    borrowerLastName: "customer name",
    studentsName: "Rahul",
    email: "akshay.gaikwad@infobeans.com",
    phoneNumber: phoneNumber,
    idProof: ["A", "a", "d", "Tab"],
    panNumber: "EDBPK2802L",
    downPayment: "10000",
    loanAmount: "29000",
    loanTenure: ["9", "Tab"],
    address: "bhopal",
    dobStudentYear: "1990",
    dobStudentMonth: "June",
    dobStudentDate: "10",
    schoolFeeBand: ["5000", "Tab"],
    SchoolLocation: "Delhi,India",
    schoolName: ["S", "O", "U", "T", "Tab"],
    studentMotherName:"Mother Name"

  },

  fillAccountDetailsData: {
    //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
    gender: ["M", "r", "Tab"],
    accountNumber: "34051569355",
    accountTypesaving: ["S", "a", "v", "Tab"],
    banckNameAbhyu: ["A", "B", "H", "Y", "Tab"],
    idProof: ["A", "a", "d", "Tab"],
    phoneNumber: phoneNumber,
    email: "akshay.gaikwad@infobeans.com",
    loanTenure: ["9", "Tab"],
    payableAmount: "29000",
    dobStudntYear: "2020",
    dobStudntMonth: "June",
    dobStudntDate: "10",
  },

  BankBranchDeatils: {
    ifsc: 'ABHY0065001',
    micr: '400065001',
    city: 'GREATER MUMBAI'

  },
  genderOptions: {
    options: ["Mr.", "Mrs", "Ms."]
  },
  loanTenureOptions: {
    options: ["3 Months", '6 Months', '9 Months', '12 Months']
  },
  accountTypeOptions: {
    options: ["Savings", 'Current', 'Joint', 'NRE', 'NRO']
  },
  borrowerBankDetails: {
    options: ["Bank: ABHYUDAYA COOPERATIVE BANK LIMITED",
      "Account Number: 34051569387",
      "Account Holder Name: Dummy customer name",
      "Account Type: savings",
      "IFSC: ABHY0065001",
      "MICR: 400065001",
      "Branch: RTGS-HO",
      "City: GREATER MUMBAI"
    ]
  }

};
export { byjusAssureData, };
