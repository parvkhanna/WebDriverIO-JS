import { ObjectId } from 'mongodb';
import { getRandomNum } from '../utils/functions';
let randomVar = getRandomNum();
let current_date = new Date();
let current_iso_date = current_date.toISOString();
let objetcId = ObjectId();
const dataToMoveTo = {
    UploadPassbookPhoto: {
        "accountDetails": {
            "name": "Dummy customer name",
            "accountNumber": randomVar,
            "accountType": "savings",
            "bankName": "ICICI BANK LIMITED",
            "branch": "CHENNAI - CENOTAPH ROAD? ",
            "micr": "600229002",
            "ifsc": "ICIC0000001",
            "city": "CHENNAI"
        },
        "applicantTitle": "Mr",
        "pennyDropResponse": {
            "status": true,
            "referenceId": "HB8VLLIW4YDUU49",
            "providerName": "digio",
            "receiverName": "Dummy Customer Name",
            "fuzzyScore": 100,
            "accountNumber": randomVar,
            "ifsc": "ICIC0000001",
            "errorReason": null,
            "createdAt": null,
            "providerCode": null
        }
    },
    AccountInfo: {
        "freshdeskTicketCreated": false,
        "documents": {
            "bankStatementSourceProof": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94820449431169/bankStatementSourceProof-cibil-20211101_17171360.jpeg"
            }
        },
        "bankStatementSource": "email"
    },

    WaitForOpsTeamApproval: {
        "freshdeskTicketCreated": true,
        "documents": {
            "bankStatementSourceProof": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/bankStatementSourceProof-cibil-20211116_16303840.jpeg"
            },
            "passbook1": {
                "badImageQualityReason": "BLURRED_IMAGE",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/passbook1-cibil-20211116_16312760.jpeg"
            },
            "passbook2": {
                "badImageQualityReason": "BLURRED_IMAGE",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/passbook2-cibil-20211116_16313130.jpeg"
            }
        },
        "bankStatementSource": "email",
        "pennyDropResponse": {
            "status": true,
            "referenceId": "175WRI9WZ273428",
            "providerName": "digio",
            "receiverName": "Dummy Customer Name",
            "fuzzyScore": 100,
            "accountNumber": "2090876546",
            "ifsc": "ICIC0000001",
            "errorReason": null,
            "createdAt": null,
            "providerCode": null
        },
        "accountDetails": {
            "name": "Dummy customer name",
            "accountNumber": "2090876546",
            "accountType": "savings",
            "bankName": "ABHYUDAYA COOPERATIVE BANK LIMITED",
            "branch": "RTGS-HO ",
            "micr": "400065001",
            "ifsc": "ABHY0065001",
            "city": "GREATER MUMBAI"
        },
        "applicantTitle": "Mr",
        "abbCalculationSource": "freshdesk",
        "abbTicketId": "12785",
        "cibilCheckPassed": false,
        "docDetails": [],
        "emandateDetails": {
            "nachAgent": "digio",
            "nachId": "",
            "registrationStatus": "",
            "rejectedReason": "",
            "relaunch": "NA",
            "relaunchCount": 0,
            "signStatus": "",
            "umrn": ""
        },
        "enachDetails": {
            "nachAgent": "digio",
            "nachId": "",
            "registrationStatus": "",
            "rejectedReason": "",
            "relaunch": "NA",
            "relaunchCount": 0,
            "signStatus": "",
            "umrn": ""
        },
        "kycDetails": {
            "kycInitiated": false
        },
        "nachDetails": {
            "hasBorder": "",
            "isFilledNachUploaded": false,
            "isPnachUploaded": false,
            "nachAgent": "digio",
            "nachId": "",
            "registrationStatus": "",
            "rejectedReason": "",
            "relaunch": "NA",
            "relaunchCount": 0,
            "signStatus": "",
            "sponsorBankStatus": "",
            "umrn": ""
        },
        "otpVerified": false,
        "repeatCustomer": false,
        "reuploadReason": "",
        "upiMandateDetails": {
            "nachAgent": "paytm",
            "nachId": "",
            "registrationStatus": "",
            "rejectedReason": "",
            "relaunch": "NA",
            "relaunchCount": 0,
            "signStatus": "",
            "umrn": ""
        },
        "workflowStatus": "initiated"
    },

    uploadDocumentsPage: {
        "freshdeskTicketCreated": true,
        "documents": {
            "bankStatementSourceProof": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/bankStatementSourceProof-cibil-20211116_16303840.jpeg"
            },
            "passbook1": {
                "badImageQualityReason": "BLURRED_IMAGE",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/passbook1-cibil-20211116_16312760.jpeg"
            },
            "passbook2": {
                "badImageQualityReason": "BLURRED_IMAGE",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/passbook2-cibil-20211116_16313130.jpeg"
            },
            "generatedNachMandate": {
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/cibil/94740370861657/generatedNachMandate-20220308_13040710.pdf",
                "format": "pdf"
            },
            "aadhaarOkyc": {
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/abflOkycDocuments/94740395463847/docs/invoice-20220308_12220800.pdf",
                "format": "pdf",
                "uploadedBy": "SYSTEM",
                "uploadedAt": current_date.toISOString()
            },
            "aadhaarOkycXml": {
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/abflOkycDocuments/94740395463847/xml/aadhaarOKYCXml-20220308_12224140None",
                "format": "zip",
                "uploadedBy": "SYSTEM",
                "uploadedAt": current_date.toISOString()
            }
        },
        "kycDetails": {
            "kycInitiated": true,
            "completedAt": current_date.toISOString(),
            "id": "1452885662873",
            "otp": "6128",
            "status": "approved",
            "type": "okyc"
        },
        "nachDetails": {
            "hasBorder": "no",
            "isFilledNachUploaded": false,
            "isPnachUploaded": false,
            "nachAgent": "digio",
            "nachId": "ENA22030" + randomVar + "BBKBBLY8MJNCPH",
            "registrationStatus": "",
            "rejectedReason": "",
            "relaunch": "NA",
            "relaunchCount": 0,
            "signStatus": "partial",
            "sponsorBankStatus": "",
            "umrn": "",
            "autoRelaunch": false,
            "generatedNachCount": 0,
            "picGeneratedNachCount": 0,
            "bankDetails": {
                "accountNumber": "2090876546",
                "ifsc": "ABHY0065001",
                "bankName": "ABHYUDAYA COOPERATIVE BANK LIMITED",
                "accountType": "savings",
                "name": "Dummy customer name"
            },
            "corporateConfigId": "TSE181102131550399FKSM6QXVAM58WC",
            "nachStartDate": current_date.toISOString(),
            "signAt": current_date.toISOString(),
            "signedAmount": 29000,
            "sponsorBank": "KOTAK MAHINDRA BANK LTD",
            "updatedAt": current_date.toISOString(),
            "updatedBy": "achievetesting@byjus.com",
            "utilityCode": "NACHTEST000000000"
        },

        "firstEmiDate": current_date.toISOString(),
        "eligibleForEmandate": "No",
        "eligibleForEnach": "Yes",
        "eligibleForUpiMandate": "No",
        "agNachEmailedAt": current_date.toISOString()

    },

    eSignAgreementPage: {
        "freshdeskTicketCreated": true,
        "docDetails": [
            {
                "_id": objetcId,
                "docType": "poi",
                "name": "Dummy Customer Name",
                "number": "EDBPK2802L",
                "type": "pan",
                "updatedBy": "achievetesting@byjus.com",
                "updatedAt": current_date.toISOString()
            },
            {
                "_id": objetcId,
                "docType": "poa",
                "name": "",
                "number": "7407",
                "type": "aadhaar",
                "updatedBy": "achievetesting@byjus.com",
                "updatedAt": current_date.toISOString()
            }
        ],
        "documents": {
            "bankStatementSourceProof": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/bankStatementSourceProof-cibil-20211116_16303840.jpeg"
            },
            "passbook1": {
                "badImageQualityReason": "BLURRED_IMAGE",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/passbook1-cibil-20211116_16312760.jpeg"
            },
            "passbook2": {
                "badImageQualityReason": "BLURRED_IMAGE",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/passbook2-cibil-20211116_16313130.jpeg"
            },
            "passbook3": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/kotak/94238467840294/passbook3-cibil-20220512_18317730.jpeg"
            },
            "generatedNachMandate": {
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/cibil/94740370861657/generatedNachMandate-20220308_13040710.pdf",
                "format": "pdf"
            },
            "pan": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/kotak/94740833862147/pan-cibil-20220308_15112900.jpeg"
            },
            "aadharFrontSide": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/kotak/94740833862147/aadharFrontSide-cibil-20220308_15136000.jpeg"
            },
            "aadharBackSide": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/kotak/94740833862147/aadharBackSide-cibil-20220308_15141260.jpeg"
            }, "cancelledChequeOrBankStatement": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/kotak/94740833862147/cancelledChequeOrBankStatement-cibil-20220308_15146120.jpeg"
            },
            "applicantLivePhoto": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_date.toISOString(),
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/kotak/94740833862147/applicantLivePhoto-cibil-20220308_15150790.jpeg"
            },
            "esignedLoanAgreement": {
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/cibil/94879387062040/esignedLoanAgreement-20211013_16541890.pdf",
                "format": "pdf",
                "uploadedBy": "SYSTEM",
                "uploadedAt": current_date.toISOString(),
            }
        },
        "nachDetails": {
            "hasBorder": "no",
            "isFilledNachUploaded": false,
            "isPnachUploaded": false,
            "nachAgent": "digio",
            "nachId": "ENA22030" + randomVar + "BBKBBLY8MJNCPH",
            "registrationStatus": "",
            "rejectedReason": "",
            "relaunch": "NA",
            "relaunchCount": 0,
            "signStatus": "partial",
            "sponsorBankStatus": "",
            "umrn": "",
            "autoRelaunch": false,
            "generatedNachCount": 0,
            "picGeneratedNachCount": 0,
            "bankDetails": {
                "accountNumber": "2090876546",
                "ifsc": "ABHY0065001",
                "bankName": "ABHYUDAYA COOPERATIVE BANK LIMITED",
                "accountType": "savings",
                "name": "Dummy customer name"
            },
            "corporateConfigId": "TSE181102131550399FKSM6QXVAM58WC",
            "nachStartDate": current_date.toISOString(),
            "signAt": current_date.toISOString(),
            "signedAmount": 29000,
            "sponsorBank": "KOTAK MAHINDRA BANK LTD",
            "updatedAt": current_date.toISOString(),
            "updatedBy": "achievetesting@byjus.com",
            "utilityCode": "NACHTEST000000000"
        },

        "firstEmiDate": current_date.toISOString(),
        "eligibleForEmandate": "No",
        "eligibleForEnach": "Yes",
        "eligibleForUpiMandate": "No",
        "agNachEmailedAt": current_date.toISOString()

    }
}



export { dataToMoveTo };