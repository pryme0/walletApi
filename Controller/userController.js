const authService = require('../Services/authService');
const walletService = require('../Services/walletService');
const asyncHandler = require('../utilities/asyncHandler');




exports.signUp= asyncHandler(async(req,res)=>{
    const data = req.body;
    let processUser = await authService.signUp(data);
    processUser.error?res.status(400).json(processUser.error):res.status(200).json(processUser);
});

exports.adminSignUp= asyncHandler(async(req,res)=>{
    const data = req.body;
    let processUser = await authService.adminSignUp(data);
    processUser.error?res.status(400).json(processUser.error):res.status(200).json(processUser);
});

exports.logIn= asyncHandler( async(req,res)=>{
    let data = req.body;
    let loginUser = await authService.login(data);
    loginUser.error?res.status(loginUser.statusCode).json(loginUser.error):res.status(200).json(loginUser);
});
exports.adminLogIn= asyncHandler( async(req,res)=>{
    let data = req.body;
    let loginUser = await authService.adminLogin(data);
    loginUser.error?res.status(loginUser.statusCode).json(loginUser.error):res.status(200).json(loginUser);
});

exports.fundWallet= asyncHandler(async(req,res)=>{
    const user = req.user;
    const data = req.body;
    if(user.accountType ==='Noob'){
        let fund = await walletService.fundNoob(data,user);
        fund.error?res.status(400).json(fund.error):res.status(200).json(fund);
    }else 
    if(user.accountType ==='Elite'){
        let fund = await walletService.fundElite(data,user);
        fund.error?res.status(400).json(fund.error):res.status(200).json(fund);
    }
    
});

exports.withdraw= asyncHandler(async(req,res)=>{
    const user = req.user;
    const data = req.body;
    if(user.accountType ==='Noob'){
        let withdraw = await walletService.withdrawals(data,user);
        withdraw.error?res.status(400).json(withdraw.error):res.status(200).json(withdraw);
    }else 
    if(user.accountType ==='Elite'){
        let withdraw = await walletService.withdrawals(data,user);
        withdraw.error?res.status(400).json(withdraw.error):res.status(200).json(withdraw);
    }else if(user.accountType === 'Admin'){
        return res.status(400).json({error:'you are not allowed to peform this operation'});
    }
});

exports.updateTransactions= asyncHandler(async(req,res)=>{
    let user = req.user;
    let transactionId = req.query.transactionId;
    if(user.accountType !== 'Admin'){
    return res.status(401).json({error:"You are not authorized to acess this route"});
    }else if(user.accountType === 'Admin'){
        let updateTransaction = await walletService.updateTransaction(req.body,transactionId);
        updateTransaction.error?res.status(400).json(updateTransaction.error):res.status(200).json(updateTransaction);

    }
})

exports.updateMainCurrency= asyncHandler(async(req,res)=>{
    let user = req.user;
    let userId = req.query.userId;
    if(user.accountType !== 'Admin'){
    return res.status(401).json({error:"You are not authorized to access this route"});
    }else if(user.accountType === 'Admin'){
        let userId = req.query.userId;
        let updateCurrency = await walletService.updateCurrency(req.body,userId);
        updateCurrency.error?res.status(400).json(updateCurrency.error):res.status(200).json(updateCurrency);
    }
})
exports.getAllTransactions= asyncHandler(async(req,res)=>{
    let user = req.user;
    if(user.accountType !== 'Admin'){
    return res.status(401).json({error:"You are not authorized to acess this route"});
    }else if(user.accountType === 'Admin'){
        let transactions = await walletService.getAllTransactions();
        transactions.error?res.status(400).json(transactions.error):res.status(200).json(transactions);
    }
})
exports.getSingleTransaction= asyncHandler(async(req,res)=>{
    let user = req.user;
    let transationId = req.query.id;
    let transaction = await walletService.getSingleTransactions(transationId);
    transaction.error?res.status(400).json(transaction.error):res.status(200).json(transaction);
    
})
exports.getUserTransactions= asyncHandler(async(req,res)=>{
    let userId = req.query.id;
    let transaction = await walletService.getAllUserTransactions(userId);
    transaction.error?res.status(400).json(transaction.error):res.status(200).json(transaction);
    
})
exports.getAllUsers= asyncHandler(async(req,res)=>{
    let user = req.user;
    if(user.accountType !== 'Admin'){
    return res.status(401).json({error:"You are not authorized to acess this route"});
    }else if(user.accountType === 'Admin'){
        let users = await authService.getAllUsers();
        users.error?res.status(400).json(users.error):res.status(200).json(users);
    }
})

exports.getSingleuser= asyncHandler(async(req,res)=>{
    let userId = req.query.id
    let singleUser = await authService.getSingleuser(userId);
    singleUser.error?res.status(400).json(singleUser.error):res.status(200).json(singleUser);
})
exports.getAllWallets= asyncHandler(async(req,res)=>{
    let user = req.user;
    if(user.accountType !== 'Admin'){
    return res.status(401).json({error:"You are not authorized to acess this route"});
    }else if(user.accountType === 'Admin'){
        let wallets = await walletService.getAllWallets();
        wallets.error?res.status(400).json(wallets.error):res.status(200).json(wallets);
    }
})
exports.getAllUserWallets= asyncHandler(async(req,res)=>{
    let id = req.query.id;
    let wallet = await walletService.getAllUserWallets(id);
    wallet.error?res.status(400).json(wallet.error):res.status(200).json(wallet);
})
exports.getSingleWallet= asyncHandler(async(req,res)=>{
    let id = req.query.id;
    let wallet = await walletService.getSingleWallet(id);
    wallet.error?res.status(400).json(wallet.error):res.status(200).json(wallet);
})
exports.updateAccountType= asyncHandler(async(req,res)=>{
    let user = req.user;
    const data = req.body;  
    let id = req.query.id;
    if(user.accountType !== 'Admin'){
        return res.status(401).json({error:'you are not Authorized to peform this operation'});
    }else{
        let wallet = await authService.updateAccountType(id,data);
        wallet.error?res.status(400).json(wallet.error):res.status(200).json(wallet);
    }
})


