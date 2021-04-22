

const WalletModel = require('../Models/wallet');
const _= require('lodash');

/**
 * @class UserRepo
 * @classdesc  a class with static database query methods, this class will contain all the queries for our User model.
 */
class walletRepo {
    /**
     * @description A static method to create a new user.
     * @param userData - The user credentials
     * @returns {Promise<UserModel>}
     */
    static async create(userData) {
        const wallet = await WalletModel.create(userData);
        return wallet;
    }

    /**
     * @description A static method to find user by thier emails
     * @param userEmail -the user email
     * @returns {Promise<UserModel>}
     */

    static async findUserByWalletId(walletid) {
        return WalletModel.findOne({ walletId: walletid}).exec()
    }

    /**
     * @description A static method to find user by thier id
     * @param ID-userId
     * @returns {Promise<UserModel>}
     */

    static async findWalletById(id) {
     let wallet = await WalletModel.findById(id);
     return wallet
    }

    
    /**
     * @description A static method to find user by thier id
     * @param ID-userId
     * @returns {Promise<UserModel>}
     */

    static async findWalletByHolder(walletHolder) {
        return WalletModel.find({walletHolder:walletHolder});
    }
    /**
     * @description A static method to find user by thier id
     * @param ID-userId
     * @returns {Promise<UserModel>}
     */

    static async findAllUserWallets(walletHolder) {
        let wal = await WalletModel.find({walletHolder:walletHolder});

        return wal
    }
      /**
     * @description A static method to find user by thier id
     * @param ID-userId
     * @returns {Promise<UserModel>}
     */

    static async findWalletByHolderAndCurrency(walletHolder,currency) {
        return WalletModel.findOne({walletHolder:walletHolder,currency:currency});
    }

  /**
     * @description A static method to find user by thier id
     * @param ID-userId
     * @returns {Promise<UserModel>}
     */

    static async findWalletByWalletIdAndCurrency(id,currency) {
        return WalletModel.find({_id:id,currency:currency});
    }

    /**
     * @description A static method to update user data by thier Id
     * @returns {Promise<UserModel>}
     */

    static async updateOneById(profileId, data) {
        return WalletModel.findOneAndUpdate({ _id: profileId }, data, { new: true });
    }
      /**
     * @description A static method to get all wallets
     * @returns {Promise<UserModel>}
     */

    static async findAll() {
        return WalletModel.find({});
    }


}

module.exports = walletRepo;