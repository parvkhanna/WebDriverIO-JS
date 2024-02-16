import { getRandomNum } from '../utils/functions';
let randomVar = getRandomNum();
let current_date = new Date();
let current_iso_date = current_date.toISOString();

const dataToMoveTo = {

    uploadDocumentsPage: {
        "pennyDropResponse": {
            "status": true,
            "referenceId": "GB2IY55GAK3XFLT",
            "providerName": "digio",
            "receiverName": "Dummy Customer Name",
            "fuzzyScore": 100,
            "accountNumber": "62478472456",
            "ifsc": "SBIN0000002",
            "errorReason": null,
            "createdAt": null,
            "providerCode": null
        },
        "accountDetails": {
            "name": "Dummy customer name",
            "bankName": "STATE BANK OF INDIA",
            "accountNumber": "62478472456",
            "accountType": "savings",
            "ifsc": "SBIN0000002",
            "micr": "799002002",
            "city": "WEST TRIPURA",
            "branch": "AGARTALA"
        },
        "applicantTitle": "Mr",
        "firstEmiDate": current_iso_date,
        "eligibleForEmandate": "Yes",
        "eligibleForEnach": "No",
        "emandateDetails": {
            "nachId": "ENA220418125035740KHFFYXKWWLVUAP",
            "signStatus": "partial",
            "signAt": current_iso_date,
            "updatedBy": "achievetesting@byjus.com",
            "updatedAt": current_iso_date,
            "nachStartDate": current_iso_date,
            "source": "payment",
            "sponsorBank": "KOTAK MAHINDRA BANK LTD",
            "utilityCode": "NACHTEST000000000",
            "corporateConfigId": "TSE181102131550399FKSM6QXVAM58WC",
            "enachMandateUrl": "https://ext.digio.in/#/gateway/login/ENA220418125035740KHFFYXKWWLVUAP/94263448680184/8334232929",
            "enachMandateUrlGeneratedAt": current_iso_date,
            "signedAmount": 20000,
            "bankDetails": {
                "accountNumber": "62478472456",
                "ifsc": "SBIN0000002",
                "bankName": "STATE BANK OF INDIA",
                "accountType": "savings",
                "name": "Dummy customer name"
            }
        },
        "documents": {
            "generatedNachMandate": {
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/cibil/94263448680184/generatedNachMandate-20220418_12515270.pdf",
                "format": "pdf"
            }
        },
        "nachDetails": {
            "bankDetails": {
                "accountNumber": "62478472456",
                "ifsc": "SBIN0000002",
                "bankName": "STATE BANK OF INDIA",
                "accountType": "savings",
                "name": "Dummy customer name"
            },
            "corporateConfigId": "TSE181102131550399FKSM6QXVAM58WC",
            "hasBorder": "no",
            "nachId": "ENA22030" + randomVar + "BBKBBLY8MJNCPH",
            "nachStartDate": current_iso_date,
            "signAt": current_iso_date,
            "signStatus": "partial",
            "signedAmount": 20000,
            "sponsorBank": "KOTAK MAHINDRA BANK LTD",
            "updatedAt": current_iso_date,
            "updatedBy": "achievetesting@byjus.com",
            "utilityCode": "NACHTEST000000000"
        },
        "agNachEmailedAt": current_iso_date
    },

    loanEligibilityStatusPage: {
        "actionDetails": {
            "loanInitiatedAt": "2022-04-21T06:21:05.715Z",
            "loanInitiatedBy": "achievetesting@byjus.com",
            "softApprovedAt": "2022-04-21T06:23:12.707Z",
            "softApprovedBy": "achievetesting@byjus.com"
        },
        "pennyDropResponse": {
            "status": true,
            "referenceId": "GB2IY55GAK3XFLT",
            "providerName": "digio",
            "receiverName": "Dummy Customer Name",
            "fuzzyScore": 100,
            "accountNumber": "62478472456",
            "ifsc": "SBIN0000002",
            "errorReason": null,
            "createdAt": null,
            "providerCode": null
        },
        "accountDetails": {
            "name": "Dummy customer name",
            "bankName": "STATE BANK OF INDIA",
            "accountNumber": "62478472456",
            "accountType": "savings",
            "ifsc": "SBIN0000002",
            "micr": "799002002",
            "city": "WEST TRIPURA",
            "branch": "AGARTALA"
        },
        "applicantTitle": "Mr",
        "firstEmiDate": current_iso_date,
        "eligibleForEmandate": "Yes",
        "eligibleForEnach": "No",
        "emandateDetails": {
            "nachId": "ENA220418125035740KHFFYXKWWLVUAP",
            "signStatus": "partial",
            "signAt": current_iso_date,
            "updatedBy": "achievetesting@byjus.com",
            "updatedAt": current_iso_date,
            "nachStartDate": current_iso_date,
            "source": "payment",
            "sponsorBank": "KOTAK MAHINDRA BANK LTD",
            "utilityCode": "NACHTEST000000000",
            "corporateConfigId": "TSE181102131550399FKSM6QXVAM58WC",
            "enachMandateUrl": "https://ext.digio.in/#/gateway/login/ENA220418125035740KHFFYXKWWLVUAP/94263448680184/8334232929",
            "enachMandateUrlGeneratedAt": current_iso_date,
            "signedAmount": 20000,
            "bankDetails": {
                "accountNumber": "62478472456",
                "ifsc": "SBIN0000002",
                "bankName": "STATE BANK OF INDIA",
                "accountType": "savings",
                "name": "Dummy customer name"
            }
        },
        "documents": {
            "generatedNachMandate": {
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/cibil/94263448680184/generatedNachMandate-20220418_12515270.pdf",
                "format": "pdf"
            },
            "cancelledChequeOrBankStatement": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/byjussubscribe/94262336445223/cancelledChequeOrBankStatement-cibil-20220421_11523560.jpeg"
            },
            "applicantLivePhoto": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/byjussubscribe/94262336445223/applicantLivePhoto-cibil-20220421_11533610.jpeg"
            }
        },
        "nachDetails": {
            "bankDetails": {
                "accountNumber": "62478472456",
                "ifsc": "SBIN0000002",
                "bankName": "STATE BANK OF INDIA",
                "accountType": "savings",
                "name": "Dummy customer name"
            },
            "corporateConfigId": "TSE181102131550399FKSM6QXVAM58WC",
            "hasBorder": "no",
            "nachId": "ENA22030" + randomVar + "BBKBBLY8MJNCPH",
            "nachStartDate": current_iso_date,
            "signAt": current_iso_date,
            "signStatus": "partial",
            "signedAmount": 20000,
            "sponsorBank": "KOTAK MAHINDRA BANK LTD",
            "updatedAt": current_iso_date,
            "updatedBy": "achievetesting@byjus.com",
            "utilityCode": "NACHTEST000000000"
        },
        "agNachEmailedAt": current_iso_date
    },

}
export { dataToMoveTo };