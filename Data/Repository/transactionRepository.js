

const TransactionModel= require('../Models/transactions');
const _ = require('lodash');

/**
 * @class transationRepo
 * @classdesc  a class with static database query methods, this class will contain all the queries for our transation model.
 */
class transationRepo {
    /**
     * @description A static method to create a new transation.
     * @param transationData - The transation credentials
     * @returns {Promise<TransactionModel>}
     */
    static async create(transationData) {
        const transaction = await TransactionModel.create(transationData);
        return transaction;
    }

    /**
     * @description A static method to find transation by thier id
     * @param ID-transationId
     * @returns {Promise<TransactionModel>}
     */
    static async findtransationById(id) {
        return TransactionModel.findById(id);
    }

    
    /**
     * @description A static method to find transation by thier id
     * @param ID-transationId
     * @returns {Promise<TransactionModel>}
     */
    static async findAll() {
        return TransactionModel.find({});
    }
    /**
     * @description A static method to update transation data by thier wallet Id
     * @param ID-the transation social media id
     * @returns {Promise<TransactionModel>}
     */
    static async findtransationByWallet(id){
        let transation = await TransactionModel.findById({walletId:id});
          return transation;
    }
    /**
     * @description A static method to update transations by users
     * @param ID-the transation social media id
     * @returns {Promise<TransactionModel>}
     */
    static async findtransationByUser(id){
        let transation = await TransactionModel.find({user:id});
          return transation;
    }

    static async updateOneById(profileId, data) {
        return TransactionModel.findOneAndUpdate({ _id: profileId }, data, { new: true });
    }

}

module.exports = transationRepo