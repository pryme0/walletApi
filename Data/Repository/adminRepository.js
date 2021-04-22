

const adminModel= require('../Models/admin');
const _ = require('lodash');

/**
 * @class UserRepo
 * @classdesc  a class with static database query methods, this class will contain all the queries for our User model.
 */
class userRepo {
    /**
     * @description A static method to create a new user.
     * @param userData - The user credentials
     * @returns {Promise<adminModel>}
     */
    static async create(userData) {
        const user = await adminModel.create(userData);
        return user;
    }

    /**
     * @description A static method to find user by thier emails
     * @param userEmail -the user email
     * @returns {Promise<adminModel>}
     */

    static async findByEmail(email) {
        let user = await adminModel.findOne({email}).exec();
        return user
    }

    /**
     * @description A static method to find user by thier id
     * @param ID-userId
     * @returns {Promise<adminModel>}
     */

    static async findUserById(profileId) {
     let user  = adminModel.findById(profileId)
    return user;
    }
     /**
     * @description A static method to update user data by thier Id
     * @returns {Promise<adminModel>}
     */
    static async findAdmins(id){
      let users = await adminModel.find({})
        return users;
  }

    static async updateOneById(profileId, data) {
     let update =adminModel.findOneAndUpdate({ _id: profileId }, data, { new: true })
    return update;
    }

}

module.exports = userRepo