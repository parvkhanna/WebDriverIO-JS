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
            "bankStatementSourceProof": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": "2021-12-06T11:05:40.429Z",
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/bankStatementSourceProof-cibil-20211116_16303840.jpeg"
            },
            "passbook1": {
                "badImageQualityReason": "BLURRED_IMAGE",
                "format": "jpeg",
                "uploadedAt": "2021-12-06T11:05:40.429Z",
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/passbook1-cibil-20211116_16312760.jpeg"
            },
            "passbook2": {
                "badImageQualityReason": "BLURRED_IMAGE",
                "format": "jpeg",
                "uploadedAt": "2021-12-06T11:05:40.429Z",
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94806469021072/passbook2-cibil-20211116_16313130.jpeg"
            },
            "pan": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94810110055447/pan-cibil-20211206_16412850.jpeg"
            },
            "aadharFrontSide": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94810110055447/aadharFrontSide-cibil-20211206_16417920.jpeg"
            },
            "aadharBackSide": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94810110055447/aadharBackSide-cibil-20211206_16414080.jpeg"
            },
            "poaBankStatement": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94810110055447/poaBankStatement-cibil-20211206_16410130.jpeg"
            },
            "cancelledChequeOrBankStatement": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94810110055447/cancelledChequeOrBankStatement-cibil-20211206_16416250.jpeg"
            },
            "applicantLivePhoto": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/avanse/94810110055447/applicantLivePhoto-cibil-20211206_16412010.jpeg"
            }

        }
        , "kycDetails": {
            "kycInitiated": false,
            "type": "osv"
        },
        "emandateDetails": {
            "nachAgent": "digio",
            "nachId": "ENA21119" + randomVar + "AAHGJ8ZXP1LM8ZA",
            "registrationStatus": "",
            "rejectedReason": "",
            "relaunch": "NA",
            "relaunchCount": 0,
            "signStatus": "signed",
            "umrn": "2336",
            "signAt": "2021-12-06T11:11:25.465Z",
            "updatedBy": "pranshu.dubey@byjus.com",
            "updatedAt": "2021-12-06T11:11:25.465Z",
            "nachStartDate": "2021-12-06T11:11:25.465Z",
            "source": "payment",
            "sponsorBank": "KOTAK MAHINDRA BANK LTD",
            "utilityCode": "NACHTEST000000000",
            "corporateConfigId": "TSE181102131550399FKSM6QXVAM58WC",
            "enachMandateUrl": "https://ext.digio.in/#/gateway/login/ENA211013151233393AA7B8ZXP1LM8AP/94879928762779/8889999411",
            "enachMandateUrlGeneratedAt": "2021-12-06T11:11:25.465Z",
            "signedAmount": "29000"
        },
        "firstEmiDate": current_iso_date,
        "eligibleForEmandate": "No",
        "eligibleForEnach": "Yes",
        "eligibleForUpiMandate": "No"
    },


}
export { dataToMoveTo };
