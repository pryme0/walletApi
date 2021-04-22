const userRepo = require('../Data/Repository/userRepository');
const loginSchema = require('../utilities/validator').loginSchema();
const signupSchema = require('../utilities/validator').signupSchema();
const adminRepo = require('../Data/Repository/adminRepository');
const adminSignupSchema =require('../utilities/validator').adminSignupSchema();
const updateAccountTypeSchema = require('../utilities/validator').updateAccountTypeSchema();
const crypto = require('crypto');
const _ = require('lodash');
const walletRepo = require('../Data/Repository/walletRepository');

class TwitterService {
    
    static async signUp(data){
        try{
            let validate = signupSchema.validate(data);
            if(validate.error){
                throw ({error:validate.error.message,statusCode:400})
            }
            let checkMail = await userRepo.findByEmail(data.email);
            if(!checkMail){
                let newUser = await userRepo.create(data);
                if(newUser){
                    const walletId =`${newUser.lastName}${crypto.randomBytes(10).toString('hex')}`;
                    let walletData ={
                        currency:newUser.defaultCurrency,
                        walletNumber:walletId,
                        walletHolder:newUser._id
                    }
                    let creatWallet = await walletRepo.create(walletData);
                    newUser.wallets.push({walletId:creatWallet._id,walletNumber:creatWallet.walletNumber,currency:creatWallet.currency});
                    await newUser.save();
                    let acessToken = await newUser.createToken();
                    return  {'user':newUser,'acessToken':acessToken,'wallet':creatWallet};
                }
            }else{
                throw ({error:'Email already exists login to acess account',statusCode:400});
            }
        }catch(err){
          if(err.message){
              return({error:err.message})
          }
            return(err)
        }
    }

    static async adminSignUp(data){
        try{
            data.accountType = "Admin";
            let validate = adminSignupSchema.validate(data);
            if(validate.error){
                throw ({error:validate.error.message,statusCode:400})
            }
            let checkMail = await adminRepo.findByEmail(data.email);
            if(!checkMail){
                let newUser = await adminRepo.create(data);
                if(newUser){
                    let acessToken = await newUser.createToken();
                    return  {user:newUser,acessToken:acessToken};
                }
            }else{
                throw ({error:'Email already exists login to acess account',statusCode:400});
            }
        }catch(err){
          if(err.message){
              return({error:err.message})
          }
            return(err)
        }
    }


    static async login(data){
        try{
            let validate = loginSchema.validate(data);
            if(validate.err){
             throw ({error:validate.error.message,statusCode:400});
            }
            let findUser = await userRepo.findByEmail(data.email);
            let comparePassword = await findUser.comparePassword(data.password);
            if (comparePassword === false || comparePassword.error) throw ({ error: "Incorrect password or email",statusCode:400 });
                let wallets = await walletRepo.findWalletByHolder(findUser._id)
                let acessToken = await findUser.createToken();
                return {'user':findUser,'wallets':wallets,'acessToken':acessToken};
        }catch(err){
           if(err.message){
               return({error:err.message,statusCode:401});
           }
            return err;
        }
    }
    
    static async adminLogin(data){
        try{
            let validate = loginSchema.validate(data);
            if(validate.err){
             throw ({error:validate.error.message,statusCode:400});
            }
            let findUser = await adminRepo.findByEmail(data.email);
            let comparePassword = await findUser.comparePassword(data.password);
            if (comparePassword === false || comparePassword.error) throw ({ error: "Incorrect password or email",statusCode:400 });
                let acessToken = await findUser.createToken();
                return {'user':findUser,'acessToken':acessToken};
        }catch(err){
           if(err.message){
               return({error:err.message,statusCode:401});
           }
            return err;
        }

    }

    static async getAllUsers(){
        try{
            let users = await userRepo.findUsers();
            if(!users){
                throw {error:'Error getting transactions'};
            }else{
            return({status:"success",users:users})
            }
        }catch(err){
            if(err.message){
                return({error:err.message});
            }else{
                return(err);
            }
        } 
    }
    static async getSingleuser(id){
        try{
            let user = await userRepo.findUserById(id);
            if(!user){
                throw {error:'Error getting transactions'};
            }else{
            return({status:"success",user:user})
            }
        }catch(err){
            if(err.message){
                return({error:err.message});
            }else{
                return(err);
            }
        } 
    }
    static async updateAccountType(id,data){
        let validate = updateAccountTypeSchema.validate(data);
        if(validate.err){
         throw ({error:validate.error.message,statusCode:400});
        }
        try{
            let update = await userRepo.updateOneById(id,{accountType:data.accountType});
            if(!update){
                throw {error:'Error getting user account'};
            }else{
            return({status:"success",user:update})
            }
        }catch(err){
            if(err.message){
                return({error:err.message});
            }else{
                return(err);
            }
        } 
    }

}

module.exports = TwitterService;
