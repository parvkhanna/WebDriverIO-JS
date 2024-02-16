import { getRandomNum } from '../utils/functions.js';
let phoneNumber = getRandomNum();
let randomNum6digits = getRandomNum(6);
let randomNum7digits = getRandomNum(7);


const abflData = {
    abflValidData: {
        panNumber: "DGLPK3432G",
        dobYear: "1990",
        dobMonth: "June",
        dobDay: "10",
        gender: ["M", "a", "Tab"],
        telephoneNumber: "7834356809",
        email: "rajalakshmi0811@gmail.com",
        SchoolLocation: "Delhi,India",
        mothersName: "Rashmi",
        studentsName: "Rohan",
        schoolFeeBand: ["2", "5", "0", "0", "Tab"],
        schoolFee: ["500", "Tab"],
        studentGrade: ["1", "Tab"],
        studentsAddress: "125/12 New road",
        studentPinCode: "456001",
        stateName: ["M", "a", "d", "h", "y", "Tab"],
        cityName: ["U", "j", "j", "a", "i", "Tab"],
        loanTenure: ["9", "Tab"],
        maritalStatus: ["S", "i", "n", "Tab"],
        customerOccupation: ["S", "a", "l", "a", "r", "Tab"],
        payableAmount: "29000",
        randomNum6digits: randomNum6digits,
        randomNum7digits: randomNum7digits,
        bankStatementSource: ["E", "m", "a", "i", "l", "Tab"],
        nameTitle: ["M", "r", "Tab"],
        accountHolderName: "Dummy customer name",
        accountNumber: phoneNumber,
        accountType: ["S", "a", "v", "Tab"],
        bankName: ["A", "B", "H", "Y", "", "Tab"],
        loanStatus: ["A", "p", "p", "Tab"]
    },

    abflDataWithAmountLessThan25000: {
        panNumber: "DGLPK3432G",
        dobYear: "1995",
        dobMonth: "June",
        dobDay: "10",
        gender: ["M", "a", "Tab"],
        telephoneNumber: phoneNumber,
        email: "byyjusllearningg@gmail.com",
        studentsAddress: "42/32e, temple street",
        maritalStatus: ["S", "i", "n", "Tab"],
        qualification: ["P", "o", "s", "t", "Tab"],
        qualification: ["P", "o", "s", "t", "Tab"],
        studentGrade: ["1", "Tab"],
        studentPinCode: "456001",
        stateName: ["M", "a", "d", "h", "y", "Tab"],
        cityName: ["U", "j", "j", "a", "i", "Tab"],
        loanTenure: ["9", "Tab"],
        customerOccupation: ["S", "a", "l", "a", "r", "Tab"],
        payableAmount: "2900",
        schoolFeeBand: ["2", "5", "0", "0", "Tab"],
        SchoolLocation: "Delhi,India",
        mothersName: "Rashmi",
        studentsName: "Rohan",
    },
    abflDataWithAgeLessThan25: {
        panNumber: "DGLPK3432G",
        dobYear: "2001",
        dobMonth: "June",
        dobDay: "10",
        gender: ["M", "a", "Tab"],
        telephoneNumber: phoneNumber,
        email: "byyjusllearningg@gmail.com",
        maritalStatus: ["S", "i", "n", "Tab"],
        schoolName: "St pauls convent School",
        qualification: ["P", "o", "s", "t", "Tab"],
        studentGrade: ["1", "Tab"],
        studentsAddress: "125/12 New road",
        studentPinCode: "456001",
        stateName: ["M", "a", "d", "h", "y", "Tab"],
        cityName: ["U", "j", "j", "a", "i", "Tab"],
        loanTenure: ["9", "Tab"],
        productname: "Product name",
        customerOccupation: ["S", "a", "l", "a", "r", "Tab"],
        payableAmount: "29000",
        schoolFeeBand: ["2", "5", "0", "0", "Tab"],
        SchoolLocation: "Delhi,India",
        mothersName: "Rashmi",
        studentsName: "Rohan",
    },
    abflDataWithAgeMoreThan60: {
        panNumber: "DGLPK3432G",
        dobYear: "1952",
        dobMonth: "June",
        dobDay: "15",
        gender: ["M", "a", "Tab"],
        telephoneNumber: phoneNumber,
        email: "byjusllearningg@gmail.com",
        maritalStatus: ["S", "i", "n", "Tab"],
        qualification: ["P", "o", "s", "t", "Tab"],
        studentGrade: ["1", "Tab"],
        studentPinCode: "456001",
        stateName: ["M", "a", "d", "h", "y", "Tab"],
        cityName: ["U", "j", "j", "a", "i", "Tab"],
        loanTenure: ["9", "Tab"],
        customerOccupation: ["S", "a", "l", "a", "r", "Tab"],
        payableAmount: "29000",
        schoolFeeBand: ["2", "5", "0", "0", "Tab"],
        studentsAddress: "125/12 New road",
        SchoolLocation: "Delhi,India",
        mothersName: "Rashmi",
        studentsName: "Rohan",
    },
    abflDataWithInvalidPan: {
        panNumber: "yyy8jyyy77",
        dobYear: "2001",
        dobMonth: "June",
        dobDay: "10",
        gender: ["M", "a", "Tab"],
        telephoneNumber: phoneNumber,
        email: "byyjusllearningg@gmail.com",
        maritalStatus: ["S", "i", "n", "Tab"],
        qualification: ["P", "o", "s", "t", "Tab"],
        studentGrade: ["1", "Tab"],
        studentsAddress: "125/12 New road",
        studentPinCode: "456001",
        stateName: ["M", "a", "d", "h", "y", "Tab"],
        cityName: ["U", "j", "j", "a", "i", "Tab"],
        loanTenure: ["9", "Tab"],
        customerOccupation: ["S", "a", "l", "a", "r", "Tab"],
        payableAmount: "29000",
        schoolFeeBand: ["2", "5", "0", "0", "Tab"],
        SchoolLocation: "Delhi,India",
        mothersName: "Rashmi",
        studentsName: "Rohan",
    },
    abflDataWithInvalidEmailAddress: {
        panNumber: "DGLPK3432G",
        dobYear: "2001",
        dobMonth: "June",
        dobDay: "10",
        gender: ["M", "a", "Tab"],
        telephoneNumber: phoneNumber,
        email: phoneNumber + "@gmail.com",
        maritalStatus: ["S", "i", "n", "Tab"],
        qualification: ["P", "o", "s", "t", "Tab"],
        studentGrade: ["1", "Tab"],
        studentPinCode: "456001",
        stateName: ["M", "a", "d", "h", "y", "Tab"],
        cityName: ["U", "j", "j", "a", "i", "Tab"],
        loanTenure: ["9", "Tab"],
        customerOccupation: ["S", "a", "l", "a", "r", "Tab"],
        payableAmount: "29000",
        schoolFeeBand: ["2", "5", "0", "0", "Tab"],
        studentsAddress: "125/12 New road",
        SchoolLocation: "Delhi,India",
        mothersName: "Rashmi",
        studentsName: "Rohan",
    },

    abflInvalidMobileNoLessthan10Digits: {
        panNumber: "DGLPK3432G",
        dobYear: "1989",
        dobMonth: "June",
        dobDay: "10",
        gender: ["M", "a", "Tab"],
        telephoneNumber: "000790456",
        email: "byyjusllearningg@gmail.com",
        maritalStatus: ["S", "i", "n", "Tab"],
        schoolName: "St pauls convent School",
        qualification: ["P", "o", "s", "t", "Tab"],
        studentGrade: ["1", "Tab"],
        studentsAddress: "125/12 New road",
        studentPinCode: "456001",
        stateName: ["M", "a", "d", "h", "y", "Tab"],
        cityName: ["U", "j", "j", "a", "i", "Tab"],
        loanTenure: ["9", "Tab"],
        customerOccupation: ["S", "a", "l", "a", "r", "Tab"],
        payableAmount: "29000",
        schoolFeeBand: ["2", "5", "0", "0", "Tab"],
        SchoolLocation: "Delhi,India",
        mothersName: "Rashmi",
        studentsName: "Rohan",
    },

    abflInvalidMobileNoMorethan10Digits: {
        panNumber: "DGLPK3432G",
        dobYear: "1989",
        dobMonth: "June",
        dobDay: "10",
        gender: ["M", "a", "Tab"],
        telephoneNumber: "00079045600",
        email: "byyjusllearningg@gmail.com",
        maritalStatus: ["S", "i", "n", "Tab"],
        schoolName: "St pauls convent School",
        qualification: ["P", "o", "s", "t", "Tab"],
        studentGrade: ["1", "Tab"],
        studentsAddress: "125/12 New road",
        studentPinCode: "456001",
        stateName: ["M", "a", "d", "h", "y", "Tab"],
        cityName: ["U", "j", "j", "a", "i", "Tab"],
        loanTenure: ["9", "Tab"],
        customerOccupation: ["S", "a", "l", "a", "r", "Tab"],
        payableAmount: "29000",
        schoolFeeBand: ["2", "5", "0", "0", "Tab"],
        SchoolLocation: "Delhi,India",
        mothersName: "Rashmi",
        studentsName: "Rohan",
    },

    maritalStatusOptions: {
        options: ["Single", "Married"]
    },

    genderOptions: {
        options: ["Male", "Female"]
    },

    StudentsGradeOptions:{
        options:["LKG" ,"UKG" , "1" ,"2", "3","4" ,"5" ,"6" ,"7","8" ,"9" ,"10" ,"11", "12" ,"Pursuing Graduate Degree" ,"Graduate" , "Pursuing Post Graduate Degree" , "Post Graduate" ,"Others"]
    },

    maritalStatusOptions: {
        options: ["Single", "Married","Divorced", "Widowed"]
    },

    residenceTypeOptions:
    {
        options:["Owned","Rented","Company Alloted","Jointly Owned","Shared Accomodation","Parental Owned"]
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
export { abflData, };