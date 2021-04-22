

const UserModel= require('../Models/User');
const _ = require('lodash');

/**
 * @class UserRepo
 * @classdesc  a class with static database query methods, this class will contain all the queries for our User model.
 */
class userRepo {
    /**
     * @description A static method to create a new user.
     * @param userData - The user credentials
     * @returns {Promise<UserModel>}
     */
    static async create(userData) {
        const user = await UserModel.create(userData);
        return user;
    }

    /**
     * @description A static method to find user by thier emails
     * @param userEmail -the user email
     * @returns {Promise<UserModel>}
     */

    static async findByEmail(email) {
        let user = await UserModel.findOne({ email}).exec();
        return user
    }

    /**
     * @description A static method to find user by thier id
     * @param ID-userId
     * @returns {Promise<UserModel>}
     */

    static async findUserById(profileId) {
     let user  = UserModel.findById(profileId)
    return user;
    }
    /**
     * @description A static method to update user data by thier Id
     * @param ID-the user social media id
     * @returns {Promise<UserModel>}
     */
    static async findUserAndwallet(id){
        let user = await UserModel.findById(id)
          return user;
    }

     /**
     * @description A static method to update user data by thier Id
     * @returns {Promise<UserModel>}
     */
    static async findUsers(id){
      let users = await UserModel.find({})
        return users;
  }

    static async updateOneById(profileId, data) {
     let update =UserModel.findOneAndUpdate({ _id: profileId }, data, { new: true })
    return update;
    }

}

module.exports = userRepo