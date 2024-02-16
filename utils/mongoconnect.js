import { getRandomNum } from './functions.js';
import { ObjectId } from 'mongodb';
let randomVar = getRandomNum();
let ticketID = getRandomNum(5).toString();
let randomAppId = getRandomNum(14).toString();
let kartLeadID = getRandomNum(4).toString();
let objetcId = ObjectId();
const { MongoClient } = require('mongodb');
let current_date = new Date();
let current_iso_date = current_date.toISOString();
class mongoConnect {

    constructor() {
        // Mongo URI
        this.url = process.env.MONGO_DB_URI;
        // Sales email which needs to update
        this.salesEmail = process.env.USER_EMAIL_POOJA;
        // Database Name
        this.dbName = process.env.DB_NAME;
    }

    async getMongoClient() {
        const client = new MongoClient(this.url);
        await client.connect();
        return client.db(this.dbName);
    }

    async updateGpayRecord(reference_id, status = 'Success') {
        // This function will update gpay record sales email id based on reference id 
        let db = await this.getMongoClient();
        let gpay_collection = db.collection('transactions_gpay')
        let updateResult = await gpay_collection.updateMany(
            { "referenceId": reference_id }, { $set: { "salesEmail": this.salesEmail, "status": status } });
        return updateResult;
    }

    async updatePayuRecord(txn_id, status = 'Success') {
        // This function will update payu record sales email id based on reference id 
        let db = await this.getMongoClient();
        let payu_collection = db.collection('transactionspayu');
        let updateResult = await payu_collection.updateMany(
            { "txnid": txn_id }, { $set: { "salesEmail": this.salesEmail, "status": status } });
        return updateResult;
    }

    async updatetransactionsCibilRecord(appId, status = "ops_team_approval_pending") {
        // This function will update transactionscibil record's status
        let db = await this.getMongoClient();
        let transactionscibil_collection = db.collection('transactionscibil');
        let updateResult = await transactionscibil_collection.updateOne(
            { "appId": appId }, { $set: { "status": status } });
        return updateResult;
    }
    async updatetransactionsCibilRecordCibilCheckPassed(appId, status = "cibil_check_passed") {
        // This function will update transactionscibil record's status
        let db = await this.getMongoClient();
        let transactionscibil_collection = db.collection('transactionscibil');
        let updateResult = await transactionscibil_collection.updateOne(
            { "appId": appId }, { $set: { "status": status } });
        return updateResult;
    }


    async updatetransactionsCibilRecordByjusAssure(appId, status = "cibil_check_passed") {
        // This function will update transactionscibil record's status
        let db = await this.getMongoClient();
        let transactionscibil_collection = db.collection('transactionscibil');
        let updateResult = await transactionscibil_collection.updateOne(
            { "appId": appId }, { $set: { "status": status } });
        return updateResult;
    }
    async updateTransactionsCibilStatusApprovalPending(appId, status = "approval_pending") {
        // This function will update transactionscibil status to approvavl pending
        let db = await this.getMongoClient();
        let transactionscibil_collection = db.collection('transactionscibil');
        let updateResult = await transactionscibil_collection.updateOne(
            { "appId": appId }, { $set: { "status": status } });
        return updateResult;
    }
    async updateUploadBankstatementSourceCibilRecord(app_id) {
        // This function will update transactionscibil collection record
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "freshdeskTicketCreated": false,
                "documents": {
                    "bankStatementSourceProof": {
                        "badImageQualityReason": "",
                        "format": "png",
                        "uploadedAt": current_iso_date,
                        "uploadedBy": "achievetesting@byjus.com",
                        "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/iifl/94840363113158/bankStatementSourceProof-cibil-20211112_18021480.png"
                    }
                },
                "bankStatementSource": "email"
            }
        });
        return updateResult;
    }

    async updateEmandateDetailsCibilRecord(app_id, payableAmount) {
        // This function will update transactionscibil collection record
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')

        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "emandateDetails": {
                    "nachAgent": "digio",
                    "nachId": "ENA2111" + randomVar + "3AAHGJ8ZXP1LM8AP",
                    "registrationStatus": "",
                    "rejectedReason": "",
                    "relaunch": "NA",
                    "relaunchCount": 0,
                    "signStatus": "signed",
                    "umrn": "2336",
                    "signAt": current_iso_date,
                    "updatedBy": process.env.USER_EMAIL_PRANSHU,
                    "updatedAt": current_iso_date,
                    "nachStartDate": current_iso_date,
                    "source": "payment",
                    "sponsorBank": "KOTAK MAHINDRA BANK LTD",
                    "utilityCode": "NACHTEST000000000",
                    "corporateConfigId": process.env.CORPORTATE_CONFIG_ID,
                    "enachMandateUrl": process.env.ENACH_MANDATE_URL,
                    "enachMandateUrlGeneratedAt": current_iso_date,
                    "signedAmount": payableAmount
                }
            }
        });
        return updateResult;
    }

    async updateEsignDetailsCibilRecord(app_id) {
        // This function will update transactionscibil collection record
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "documentId": "DID21" + randomVar + "629U211493BR99G4O",
                "esignLinkGeneratedAt": current_iso_date,
                "esignStatus": "signed",
                "esignStatusReceivedAt": current_iso_date
            }
        });
        return updateResult;
    }

    async updateEsignPDFDocument(app_id) {
        // This function will update transactionscibil collection record
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "documents.esignedLoanAgreement": {
                    "url": process.env.S3_SAMPLE_PDF,
                    "format": "pdf",
                    "uploadedBy": "SYSTEM",
                    "uploadedAt": current_iso_date
                }
            }
        });
        return updateResult;
    }

    async updateEmailId(app_id) {
        // This function will update transactionscibil collection record
        let db = await this.getMongoClient();
        let avance_collection = db.collection('transactionsavanse')
        let cibil_collection = db.collection('transactionscibil')
        await avance_collection.updateOne(
            { "appId": app_id }, { $set: { "salesEmail": this.salesEmail } });
        let updateResult = await cibil_collection.updateOne(
            { "appId": app_id }, { $set: { "salesEmail": this.salesEmail } });
        return updateResult;
    }

    async iiflDeleteObjectFromDb(panNumber, phoneNumber) {
        let db = await this.getMongoClient();
        await db.collection('transactionscibil').deleteMany({ "identifiers.idNumber": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('transactionsiifl').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('transactionscibil').deleteMany({ "telephones.telephoneNumber": phoneNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "contactDetails.mobileNo": phoneNumber });
        await db.collection('lms_abb_assessments').deleteMany({ "ticketId": ticketID })
    }

    async byjusNachDeleteObjectFromDb(panNumber, telephoneNumber) {
        let db = await this.getMongoClient();
        await db.collection('transactionscibil').deleteMany({ "identifiers.idNumber": panNumber });
        await db.collection('transactions_nach').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('lms_abb_assessments').deleteMany({ "ticketId": ticketID })
        await db.collection('lms_loan_aggregator').deleteMany({ "telephones.telephoneNumber": randomVar });
        await db.collection('transactionscibil').deleteMany({ "telephones.telephoneNumber": randomVar });
        await db.collection('lms_loan_aggregator').deleteMany({ "contactDetails.mobileNo": randomVar });
    }
    async byjusAssureDeleteObjectFromDb(panNumber, telephoneNumber) {
        let db = await this.getMongoClient();
        await db.collection('transactionscibil').deleteMany({ "identifiers.idNumber": panNumber });
        await db.collection('transactionsassure').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "telephones.telephoneNumber": randomVar });
        await db.collection('transactionscibil').deleteMany({ "telephones.telephoneNumber": randomVar });
        await db.collection('lms_loan_aggregator').deleteMany({ "contactDetails.mobileNo": randomVar });

    }

    async kotakDeleteObjectFromDb(panNumber, telephoneNumber) {
        let db = await this.getMongoClient();
        await db.collection('transactionscibil').deleteMany({ "identifiers.idNumber": panNumber });
        await db.collection('transactionskotak').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "telephones.telephoneNumber": telephoneNumber });
        await db.collection('transactionscibil').deleteMany({ "telephones.telephoneNumber": telephoneNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "contactDetails.mobileNo": telephoneNumber });
        await db.collection('lms_abb_assessments').deleteMany({ "ticketId": ticketID })
    }

    async avanseDeleteObjectFromDb(panNumber, telephoneNumber) {
        let db = await this.getMongoClient();
        await db.collection('transactionscibil').deleteMany({ "identifiers.idNumber": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('transactionsavanse').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('transactionscibil').deleteMany({ "telephones.telephoneNumber": randomVar });
        await db.collection('lms_loan_aggregator').deleteMany({ "contactDetails.mobileNo": randomVar });
        await db.collection('lms_abb_assessments').deleteMany({ "ticketId": ticketID })

    }

    async iiflAddOrderId(app_id) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionsiifl')
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "orders": [
                    {
                        "orderId": "667676767"
                    }
                ],
            }
        });
    }
    async deleteActiveLoanAppId(app_id) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionsbyjusdirect')
        // Please update data as per scenario
        await collection.updateOne(
            { "appId": app_id }, {
            $unset: {
                "previousAppId": ""
            }
        });
    }
    async fullertonAddOrderId(app_id) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionsfullerton')
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "orders": [
                    {
                        "orderId": "667676767"
                    }
                ],
            }
        });
    }


    async abflDeleteObjectFromDb(panNumber, telephoneNumber) {
        let db = await this.getMongoClient();
        await db.collection('transactionscibil').deleteMany({ "identifiers.idNumber": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('transactionsavanse').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('transactionscibil').deleteMany({ "telephones.telephoneNumber": telephoneNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "contactDetails.mobileNo": telephoneNumber });
        await db.collection('lms_abb_assessments').deleteMany({ "ticketId": ticketID })

    }

    async byjusAdvantageDeleteObjectFromDb(panNumber, telephoneNumber) {
        let db = await this.getMongoClient();
        await db.collection('transactionscibil').deleteMany({ "identifiers.idNumber": panNumber });
        await db.collection('transactionbyjusdirect').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('transactionscibil').deleteMany({ "telephones.telephoneNumber": randomVar });
        await db.collection('lms_loan_aggregator').deleteMany({ "telephones.telephoneNumber": randomVar });
    }

    async fullertonDeleteObjectFromDb(panNumber, telephoneNumber) {
        let db = await this.getMongoClient();
        await db.collection('transactionscibil').deleteMany({ "identifiers.idNumber": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('transactionsfullerton').deleteMany({ "identifierDetails.panNo": panNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "telephones.telephoneNumber": telephoneNumber });
        await db.collection('transactionscibil').deleteMany({ "telephones.telephoneNumber": telephoneNumber });
        await db.collection('lms_loan_aggregator').deleteMany({ "contactDetails.mobileNo": telephoneNumber });
        await db.collection('lms_abb_assessments').deleteMany({ "ticketId": ticketID })
    }

    async iiflAddDetailsToAccountInfo(app_id, data) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async avanseAddDetailsToAccountInfo(app_id, data) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }
    async abflAddOrderId(app_id) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionsabfl')
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "orders": [
                    {
                        "orderId": "667676767"
                    }
                ],
            }
        });
    }

    async avanseAddOrderId(app_id) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionsavanse')
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "orders": [
                    {
                        "orderId": "667676767"
                    }
                ],
            }
        });
    }
    async AddOrderIdByjus(app_id) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionsbyjusdirect')
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "orders": [
                    {
                        "orderId": "667676767"
                    }
                ],
            }
        })
            ;
    }
    async updateNachStatusForCreateLoan(app_id) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionsbyjusdirect')
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "emandateDetails": {
                    "signStatus": "signed",
                    "umrn": "7676789",
                    "registrationStatus": "dest_register_success",
                },
            }
        })
            ;
    }
    async kotakAddOrderId(app_id) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionskotak')
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "orders": [
                    {
                        "orderId": "667676767"
                    }
                ],
            }
        });
    }
    async updateAlternateNumberOtp(app_id) {
        let db = await this.getMongoClient();
        let collection = db.collection('lms_otp_transactions')
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: {
                "validateCount": 1,
                "verifiedAt": current_iso_date
            }
        });
    }
    async abflAddDetailsToDb(app_id, data) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }


    async iiflAddDetailsToWaitForOpsTeamApproval(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async updateDocumentsInDb(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }



    async iiflAddDetailsToUploadPassbookPhoto(app_id, data) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async iiflAddDetailsToEsignPage(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async byjusNachAddDetailsToWaitForOpsTeamApproval(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async byjusnachAddDetailsToAccountInfo(app_id, data) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async kotakAddDetailsToAccountInfo(app_id, data) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async kotakAddDetailsToWaitForOpsTeamApproval(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }
    async kotakAddDetailsToDb(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }
    async kotakAddDetailsToUploadDocuments(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async fullertonAddDetailsToAccountInfo(app_id, data) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async fulleronAddDetailsToUploadPassbookPhoto(app_id, data) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async fullertonAddDetailsToEsignPage(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async byjusSubscribeAddDetailsToDb(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }


    async lmsAbbAssessmentCollectionObject(appId, loanVendor) {

        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        let db = await this.getMongoClient();
        let collection = db.collection('lms_abb_assessments')
        let updateResult = await collection.insertOne(
            {
                "documents": {
                    "passbook1": {
                        "badImageQualityReason": "BLURRED_IMAGE",
                        "format": "jpeg",
                        "uploadedAt": current_iso_date,
                        "uploadedBy": "achievetesting@byjus.com",
                        "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/" + loanVendor + "/94818246005210/passbook1-cibil-20211201_16256740.jpeg"
                    },
                    "passbook2": {
                        "badImageQualityReason": "BLURRED_IMAGE",
                        "format": "jpeg",
                        "uploadedAt": current_iso_date,
                        "uploadedBy": "achievetesting@byjus.com",
                        "url": "https://s3-ap-southeast-1.amazonaws.com/byjus-oms/" + loanVendor + "/94818246005210/passbook2-cibil-20211201_16259700.jpeg"
                    }
                },
                "orgFormattedName": "byjus",
                "appId": appId,
                "abbId": "ABB1_" + appId,
                "ticketId": ticketID,
                "loanVendor": loanVendor,
                "abbStatus": "",
                "status": "open",
                "salesEmail": "achievetesting@byjus.com",
                "ticketCount": 1,
                "requestedLoanAmount": 29000,
                "loanTenure": 9,
                "requestedAt": current_iso_date,
                "accountDetails": {
                    "name": "Dummy customer name",
                    "accountNumber": "9356029486",
                    "accountType": "savings",
                    "bankName": "ICICI BANK LIMITED",
                    "branch": "CHENNAI - CENOTAPH ROAD? ",
                    "micr": "600229002",
                    "ifsc": "ICIC0000001",
                    "city": "CHENNAI"
                },
                "abbAssessment": [],
                "createdAt": current_iso_date,
                "updatedAt": current_iso_date,
                "__v": 0,
                "docsumoErrorCode": "BAD_IMAGE"
            }
        )
    }

    async avanseAddDetailsToUploadPassbookPhoto(app_id, data) {
        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        // Get current date in iso format
        let current_date = new Date();
        let current_iso_date = current_date.toISOString();
        // Please update data as per scenario
        let updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async avanseAddDetailsToWaitForOpsTeamApproval(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }
    async avanseAddDetailsToEsignPage(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }
    async abflAddDetailsToWaitForOpsTeamApproval(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }

    async abflAddDetailsToEsignPage(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }
    async ByjusNachAddDetailsToEsignPage(app_id, data) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        let updateResult = await collection.updateOne(
            { "appId": app_id }, { $set: { "freshdeskTicketCreated": true } });
        // Please update data as per scenario
        updateResult = await collection.updateOne(
            { "appId": app_id }, {
            $set: data
        });
    }
    async tlPayAppIdCreation(panNumber) {

        let db = await this.getMongoClient();
        let collection = db.collection('transactionscibil')
        await collection.insertOne(
            {
                "appId": randomAppId,
                "__v": 0,
                "actionDetails": {
                    "loanInitiatedBy": "rajalakshmi.r@byjus.com",
                    "loanInitiatedAt": "2022-07-20T10:27:38.468Z"
                },
                "additionalDetailsUpdated": false,
                "addresses": [
                    {
                        "addressLine1": "201 / 211 MARIAMMAN KOIL STREET M KANNANUR LALGUDI TRICHY 621 652",
                        "city": "LALGUDI",
                        "pinCode": "621652",
                        "state": "TAMIL NADU",
                        "addressType": "02",
                        "residenceType": "02"
                    }
                ],
                "advanceEmiDetails": {
                    "kartDownPaymentDetails": []
                },
                "applicantFirstName": "RAJA",
                "applicantLastName": "RAJALAKSHMI",
                "appliedLoanAmount": 30000,
                "approvedLoanAmount": 0,
                "campaign": "Delhi",
                "cibilCheckPassed": false,
                "contactId": 255511,
                "courseDuration": 0,
                "createdAt": current_iso_date,
                "customerId": "CX-2007311159425762",
                "dateOfBirth": "07031993",
                "dateOfBirthIso": current_iso_date,
                "dobMismatch": false,
                "docDetails": [],
                "eligibleVendors": [],
                "emailAddress": "lakshmirithick10@gmail.com",
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
                "emiType": "regular_emi",
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
                "feedbacks": [],
                "freshdeskTicketCreated": false,
                "gender": "female",
                "identifiers": [
                    {
                        "idType": "02",
                        "_id": objetcId,
                        "idNumber": panNumber
                    },
                    {
                        "idType": "01",
                        "_id": objetcId,
                        "idNumber": "YJV0446708"
                    }
                ],
                "kartLeadId": kartLeadID,
                "kycDetails": {
                    "kycInitiated": false
                },
                "loanTenure": 12,
                "location": "Mumbai",
                "mobileNumberValidatedAt": current_iso_date,
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
                "networkOperator": "Reliance Jio",
                "nsdlResponse": {
                    "applicantFirstName": "RAJA",
                    "applicantMiddleName": "",
                    "applicantLastName": "RAJALAKSHMI"
                },
                "nsdlValidation": "success",
                "orgFormattedName": "byjus",
                "otpVerified": false,
                "parentDetails": {
                    "nsdlVerified": false
                },
                "productName": "byjus_tlp",
                "productValue": 0,
                "repeatCustomer": false,
                "requestedLoanAmount": 30000,
                "reuploadReason": "",
                "salesEmail": "rajalakshmi.r@byjus.com",
                "source": "mobileapp",
                "status": "soft_deleted",
                "studentClass": "4",
                "studentName": "rttrtrrrtt",
                "telephones": [
                    {
                        "telephoneType": "01",
                        "_id": objetcId,
                        "telephoneNumber": randomVar
                    }
                ],
                "updatedAt": current_iso_date,
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
                "user": {
                    "_id": "5ea2fe21e7c84fd412a77e95",
                    "name": "Rajalakshmi",
                    "email": "rajalakshmi.r@byjus.com"
                },
                "vendorApiRetry": {
                    "karzaEmailValidationSkip": true,
                    "karzaNameMatchSkip": true
                },
                "workflowStatus": "dropped",
                "documents": {
                    "pan": {
                        "format": "png",
                        "isLive": true,
                        "uploadedAt": current_iso_date,
                        "uploadedBy": "customer",
                        "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/pan-cibil-94218931210207-20220720_160010601658313022106.jpeg"
                    },
                    "poaFront": {
                        "format": "png",
                        "isLive": false,
                        "uploadedAt": current_iso_date,
                        "uploadedBy": "customer",
                        "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/poaFront-cibil-94218931210207-20220720_160098801658313048988.jpeg"
                    },
                    "poaBack": {
                        "format": "png",
                        "isLive": true,
                        "uploadedAt": current_iso_date,
                        "uploadedBy": "customer",
                        "url": "https://byjus-oms.s3.ap-southeast-1.amazonaws.com/poaBack-cibil-94218931210207-20220720_160140901658313079409.jpeg"
                    }
                },
                "fathersName": "RAJA",
                "additionalDocumentsRequired": {
                    "poaDobAdditionalDocument": false
                },
                "otpForDeletion": "1287",
                "otpGeneratedTime": current_iso_date,
                "softDeletedReason": "ABB account used mismatch.",
                "softDeletedBy": "rajalakshmi.r@byjus.com",
                "softDeletedOn": current_iso_date
            }
        )
        return [randomAppId, kartLeadID]
    }
}

export default new mongoConnect();
