import { getRandomNum } from '../utils/functions';
let randomVar = getRandomNum();
let current_date = new Date();
let current_iso_date = current_date.toISOString();
const dataToMoveTo = {
    eSignAgreementPage: {
        "documents": {
            "generatedNachMandate": {
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/cibil/94285968369309/generatedNachMandate-20220530_17025290.pdf",
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/cibil/94285968369309/generatedNachMandate-20220530_17025290.pdf",
                "format": "pdf"
            },
            "addressProof": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/byjusassure/94285968369309/addressProof-cibil-20220530_17033830.jpeg"
            },
            "cancelledChequeOrBankStatement": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/byjusassure/94285968369309/cancelledChequeOrBankStatement-cibil-20220530_17048990.jpeg"
            },
            "applicantLivePhoto": {
                "badImageQualityReason": "",
                "format": "jpeg",
                "uploadedAt": current_iso_date,
                "uploadedBy": "achievetesting@byjus.com",
                "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/byjusassure/94285968369309/applicantLivePhoto-cibil-20220530_17048350.jpeg"
            }
        }
    }
}


export { dataToMoveTo };