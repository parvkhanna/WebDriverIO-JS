import { getRandomNum } from '../utils/functions';
let randomVar = getRandomNum();
let current_date = new Date();
let current_iso_date = current_date.toISOString();
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
    eSignPage: {
        "documents": {
            "generatedNachMandate": {
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/cibil/94781148670691/generatedNachMandate-20220203_16384800.pdf",
                "format": "pdf"
            },
            "addressProof": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/byjusdirect/94781148670691/addressProof-cibil-20220203_16398910.jpeg"
            },
            "cancelledChequeOrBankStatement": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/byjusdirect/94781148670691/cancelledChequeOrBankStatement-cibil-20220203_16396470.jpeg"
            },
            "applicantLivePhoto": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/byjusdirect/94781148670691/applicantLivePhoto-cibil-20220203_16393700.jpeg"

            },
        },
        "nachDetails": {
            "hasBorder": "no",
            "isFilledNachUploaded": false,
            "isPnachUploaded": false,
            "nachAgent": "digio",
            "nachId": "ENA21119" + randomVar + "AAHGJ8ZXP1LM8ZA",
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
            "nachStartDate": current_iso_date,
            "signAt": current_iso_date,
            "signedAmount": 29000,
            "sponsorBank": "KOTAK MAHINDRA BANK LTD",
            "updatedAt": current_iso_date,
            "updatedBy": "achievetesting@byjus.com",
            "utilityCode": "NACHTEST000000000"
        },
        "workflowStatus": "initiated",
        "fdpuStatus": "approval_pending",
        "fdpuTicketId": "FDPU-2202031108704968",
        "abb": 5513058,
        "additionalDetailsUpdated": false,
        "assignedTo": [],
        "breCheckSkipped": false,
        "deviceDetails": [],
        "dobMismatch": false,
        "emiType": "regular_emi",
        "feedbacks": [],
        "highRiskFlag": "yes",
        "isAnalysed": false,
        "managerApprovalStatus": "pending",
        "riskRemarks": "sd",
        "riskType": "Others",
        "sentSanctionLetter": false,
        "tsCheckSkipped": false,
        "firstEmiDate": current_iso_date,
        "eligibleForEmandate": "No",
        "eligibleForEnach": "Yes",
        "eligibleForUpiMandate": "No",
        "agNachEmailedAt": current_iso_date
    },
}
export { dataToMoveTo };
