const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const jsonWebToken = require('../utilities/jsonWebToken');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * user signUp route
 */
router.post('/user/signup',userController.signUp);
/**
 * user login route
 */
router.post('/user/login',userController.logIn);

/**
 * Route to fund user wallets
 */
router.post('/user/wallets/fund',jsonWebToken.verifyToken,userController.fundWallet);
/**
 * Route to update user transactions
 */
router.post('/user/transactions/update',jsonWebToken.verifyToken,userController.updateTransactions);
/**
 * Route to withdraw from user wallet
 */
router.post('/user/wallets/withdraw',jsonWebToken.verifyToken,userController.withdraw);
/**
 * Route to withdraw from user wallet
 */
router.post('/user/updateMainCurrency',jsonWebToken.verifyToken,userController.updateMainCurrency);
/**
 * Route to get all user transactions
 */
router.get('/user/getAllTransactions',jsonWebToken.verifyToken,userController.getAllTransactions);
/**
 * Route to get single transaction
 */
router.get('/user/getSingleTransaction',jsonWebToken.verifyToken,userController.getSingleTransaction);

/**
 * Route to get user transaction
 */
router.get('/user/getUserTransactions',jsonWebToken.verifyToken,userController.getUserTransactions);
/**
 * Route to get all Users
 */
router.get('/user/getAllUsers',jsonWebToken.verifyToken,userController.getAllUsers);
/**
 * Route to get single user
 */
router.get('/user/getSingleUser',jsonWebToken.verifyToken,userController.getSingleuser);
/**
 * Route to get all wallets
 */
router.get('/user/getAllWallets',jsonWebToken.verifyToken,userController.getAllWallets);
/**
 * Route to get all user wallets
 */ 
router.get('/user/getAllUserWallets',jsonWebToken.verifyToken,userController.getAllUserWallets);
/**
 * Route to get single wallet
 */
router.get('/user/getSingleWallet',jsonWebToken.verifyToken,userController.getSingleWallet);
/**
 * Route to update user account Type
 */
router.post('/user/updateAccountType',jsonWebToken.verifyToken,userController.updateAccountType);
/**
 * Route to get create admin users
 */
router.post('/user/createAdmin',userController.adminSignUp);
/**
 * Route to get create admin users
 */
router.post('/user/adminLogin',userController.adminLogIn);

/**
 * export router
 */
module.exports = router;
