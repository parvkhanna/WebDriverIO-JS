const byjusSubscribeData = {
    byjusSubscribeValidData: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        previousLoanProvider: ["Byjus adv", "Tab"],
        previousAppId: "12121212",
        email: "akshay.gaikwad@infobeans.com",
        revisedLoanAmount: "14000",
        revisedLoanTenure: "9",
        dobStudentYear: "2000",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        schoolLocation: ["Indore", "Tab"],
        schoolName: ["New era", "Tab"],
        schoolFees: ["5000", "Tab"],
        motherName: 'Borrowers mother Name',
        studentsName: "Rahul",
    },
    byjusSubscribeInvalidData: {
        //Account details page accepts only Dummy customer name & it fetches data from Customer and loan details page
        previousLoanProvider: ["Byjus adv", "Tab"],
        previousAppId: "12121212",
        email: "Xyzgmail.com",
        loanTenure: "9",
        dobStudentYear: "2020",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        schoolLocation: ["Indore", "Tab"],
        schoolName: ["New era", "Tab"],
        schoolFees: ["5000", "Tab"],
        motherName: 'Borrowers mother Name',
        studentsName: "Rahul",
    },
    revisedAmountGreaterThanPrevious: {
        previousLoanProvider: ["Byjus adv", "Tab"],
        previousAppId: "12121212",
        email: "{awaiting test data}",
        revisedLoanAmount: "20000000",
        revisedLoanTenure: "9",
        dobStudentYear: "2000",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        schoolLocation: ["Indore", "Tab"],
        schoolName: ["New era", "Tab"],
        schoolFees: ["5000", "Tab"],
        motherName: 'Borrowers mother Name',
        studentsName: "Rahul",
    },
    revisedAmountLessthan10000: {
        previousLoanProvider: ["Byjus adv", "Tab"],
        previousAppId: "12121212",
        email: "{awaiting test data}",
        revisedLoanAmount: "2000",
        revisedLoanTenure: "9",
        dobStudentYear: "2000",
        dobStudentMonth: "June",
        dobStudentDate: "10",
        schoolLocation: ["Indore", "Tab"],
        schoolName: ["New era", "Tab"],
        schoolFees: ["5000", "Tab"],
        motherName: 'Borrowers mother Name',
        studentsName: "Rahul",
    },
    accountTypeOptions: {
        options: ["Savings", 'Current', 'Joint', 'NRE', 'NRO']
    },
    genderOptions: {
        options: ["Mr.", "Mrs", "Ms."]
    },
    byjusAdvantageAccountValidData: {
        title: ["M", "r", "Tab"],
        customerName: "Dummy customer name",
        accountType: ["S", "a", "v", "Tab"],
        bankName: ["A", "B", "H", "Y", "", "Tab"]
    },

    previousLoanOptions: {
        options: ["IIFL", 'ICICI', 'AVANSE', 'INCRED', 'FULLERTON', 'BYJUS DIRECT', 'BYJUS ASSURE', 'BYJUS ADVANTAGE', 'KOTAK', 'RBL', 'ABFL', 'PREPAID']
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
export { byjusSubscribeData };
