const userRepo = require('../Data/Repository/userRepository');
const walletRepo = require('../Data/Repository/walletRepository');
const transactionRepo = require('../Data/Repository/transactionRepository');
const updateTransactionSchema = require('../utilities/validator').updateTransactionSchema();
const withdrawSchema = require('../utilities/validator').withdrawalSchema();
const updateCurrencySchema = require('../utilities/validator').updateCurrencySchema();

const crypto = require('crypto');
const transationRepo = require('../Data/Repository/transactionRepository');
const cc = require('currency-converter')({ CLIENTKEY: process.env.OPENEXCHANGERATE_API_KEY, fetchInterval: 3600000 })
// const fixerApi = require('fixer-api');

//
// fixerApi.set({accessKey:process.env.fixerApiKey});
class Wallet {
    /**
  * static method to fund elite users
  * @param data funding information
  * @param user user 
  * @returns sucess response if operation was sucessful
  * @returns failed if the operation failed
  */
    static async fundNoob(data, user) {
        let transactionData = {
            transactionType: 'Funding',
            user: user.id,
            requestCurrency: data.currency,
            amount: data.amount
        }
        try {
            let wallet = await walletRepo.findWalletByHolderAndCurrency(user.id, data.currency);
            if (wallet) {
                transactionData.walletId = wallet._id;
                let transaction = await transactionRepo.create(transactionData);
                return { message: 'success', 'transaction': transaction };
            } else {
                let wallet = await walletRepo.findWalletByHolder(user.id);
                let convert = await cc.convert(data.amount, data.currency, wallet[0].currency, 'live')
                if (!convert) {
                    throw { error: 'currency conversion failed' }
                }
                transactionData.currencyConversion = user.currency,
                    transactionData.conversionAmount = convert.amount
                transactionData.walletId = wallet[0]._id;
                let transaction = await transactionRepo.create(transactionData);
                return { message: 'success', 'transaction': transaction };
            }
        } catch (err) {
            if (err.message) {
                return ({ error: err.message });
            } else {
                return ({ error: err });
            }
        }
    }

    /**
     * static method to fund elite users
     * @param data funding information
     * @param user user information
     */
    static async fundElite(data, user) {
        let transactionData = {
            transactionType: 'Funding',
            user: user.id,
            requestCurrency: data.currency,
            amount: data.amount
        }
        try {
            let wallet = await walletRepo.findWalletByHolderAndCurrency(user.id, data.currency);
            if (wallet) {
                transactionData.walletId = wallet._id;
                let transaction = await transactionRepo.create(transactionData);
                return { message: 'success', 'transaction': transaction };
            } else {
                const walletId = `${user.lastName}${crypto.randomBytes(10).toString('hex')}`;
                let walletData = {
                    currency: data.currency,
                    walletNumber: walletId,
                    walletHolder: user.id
                }
                let newWallet = await walletRepo.create(walletData);
                transactionData.walletId = newWallet._id;
                let transaction = await transactionRepo.create(transactionData);
                return { message: 'success', 'transaction': transaction };
            }
        } catch (err) {
            return { error: err.message };
        }
    }



    /**
* static method to fund elite users
* @param data funding information
* @param user user 
* @returns sucess response if operation was sucessful
* @returns failed if the operation failed
*/
    static async withdrawals(data, user) {
        let validate = withdrawSchema.validate(data);
        if (validate.error) {
            throw ({ error: validate.error.details[0].message, statusCode: 400 })
        }

        let transactionData = {
            transactionType: 'Withdrawal',
            user: user.id,
            requestCurrency: data.currency,
            amount: data.amount
        }
        try {
            let wallet = await walletRepo.findWalletByHolderAndCurrency(user.id, data.currency);
            if (wallet) {
                if (parseInt(wallet.funds) >= parseInt(data.amount)) {
                    wallet.funds = parseInt(wallet.funds) - parseInt(data.amount);
                    await wallet.save();
                    transactionData.walletId = wallet._id;
                    transactionData.status = 'Approved'
                    let transaction = await transactionRepo.create(transactionData);
                    return { message: 'success', 'transaction': transaction };
                } else {
                    throw { message: 'insifficient funds' };
                }
            } else {
                console.log(user.currency)
                let defaultWallet = await walletRepo.findWalletByHolderAndCurrency(user.id, user.currency);
                let convert = await cc.convert(data.amount, data.currency, user.currency, 'live')
                if (!convert) {
                    throw { error: 'currency conversion failed' }
                }
                if (parseInt(defaultWallet.funds) >= parseInt(convert.amount)) {
                    defaultWallet.funds = parseInt(defaultWallet.funds) - parseInt(data.amount);
                    await defaultWallet.save();
                    transactionData.currencyConversion = user.currency,
                        transactionData.conversionAmount = convert.amount
                    transactionData.walletId = defaultWallet._id;
                    let transaction = await transactionRepo.create(transactionData);
                    return { message: 'success', 'transaction': transaction };
                } else {
                    throw { error: 'Insufficient funds' }
                }
            }
        } catch (err) {
            if (err.message) {
                return { error: err.message }
            } else {
                return ({ error: err })
            }
        }
    }

    static async updateTransaction(data, id) {
        try {
            let validate = updateTransactionSchema.validate(data);
            if (validate.error) {
                throw ({ error: validate.error.message, statusCode: 400 })
            }
            let transaction = await transactionRepo.findtransationById(id);
            if (!transaction) {
                throw { error: 'Transaction not found' };
            } else {
                let update = await transactionRepo.updateOneById(id, data);
                let wallet = await walletRepo.findWalletById(update.walletId);
                if (update.status === 'verified' && parseInt(update.conversionAmount) !== 0) {
                    wallet.funds = parseInt(wallet.funds) + parseInt(update.conversionAmount);
                    await wallet.save();
                    return ({ status: "Transaction updated sucessfully", transaction: update });
                } else if (update.status === 'verified' && parseInt(update.conversionAmount) === 0) {
                    wallet.funds = parseInt(wallet.funds) + parseInt(update.amount);
                    await wallet.save();
                    return ({ status: "Transaction updated sucessfully", transaction: update });
                } else {
                    return ({ status: "Transaction updated sucessfully", transaction: update });
                }
            }
        } catch (err) {
            if (err.message) {
                return ({ error: err.message });
            } else {
                return ({ error: err });
            }

        }
    }

    static async updateCurrency(data, id) {
        console.log(id)
        try {
            let validate = updateCurrencySchema.validate(data);
            if (validate.err) {
                throw ({ error: validate.error.message, statusCode: 400 });
            }
            let user = await userRepo.findUserById(id);
            if (!user) {
                throw { error: 'User not found' };
            } else {
                let defaultWallet = await walletRepo.findWalletByHolderAndCurrency(id, user.currency);
                if (!defaultWallet) {
                    let update = await userRepo.updateOneById(id, { defaultCurrency: data.currency });
                    let wallet = await walletRepo.findWalletByHolder(user._id);
                    let newFunds = await cc.convert(wallet[0].funds, wallet[0].currency, data.currency, 'live');
                    wallet[0].currency = update.defaultCurrency;
                    wallet[0].funds = newFunds.amount;
                    await wallet[0].save();
                    return ({ status: "Default currency updated successfully", user: update });
                } else {
                    let update = await userRepo.updateOneById(id, { defaultCurrency: data.currency });
                    defaultWallet.currency = update.defaultCurrency;
                    await defaultWallet.save();
                    return ({ status: "Default currency updated successfully", user: update });
                }
            }
        } catch (err) {
            if (err.message) {
                return ({ error: err.message });
            } else {
                return ({ error: err });
            }

        }
    }

    static async getAllTransactions() {
        try {
            let transactions = await transationRepo.findAll();
            if (!transactions) {
                throw { error: 'Error getting transactions' };
            } else {

                return ({ status: "success", transactions: transactions })
            }
        } catch (err) {
            if (err.message) {
                return ({ error: err.message });
            } else {
                return (err);
            }
        }
    }
    static async getSingleTransactions(id) {
        try {
            let transactions = await transationRepo.findtransationById(id);
            if (!transactions) {
                throw { error: 'Error getting transaction' };
            } else {

                return ({ status: "success", transactions: transactions })
            }
        } catch (err) {
            if (err.message) {
                return ({ error: err.message });
            } else {
                return (err);
            }
        }
    }
    static async getAllUserTransactions(id) {
        try {
            let transactions = await transationRepo.findtransationByUser(id);
            if (!transactions) {
                throw { error: 'Error getting transactions' };
            } else {

                return ({ status: "success", transactions: transactions })
            }
        } catch (err) {
            if (err.message) {
                return ({ error: err.message });
            } else {
                return (err);
            }
        }
    }
    static async getAllWallets() {
        try {
            let wallets = await walletRepo.findAll();
            if (!wallets) {
                throw { error: 'Error getting wallets' };
            } else {
                return ({ status: "success", wallets: wallets })
            }
        } catch (err) {
            if (err.message) {
                return ({ error: err.message });
            } else {
                return (err);
            }
        }
    }
    static async getAllUserWallets(id) {
        try {
            let wallets = await walletRepo.findAllUserWallets(id);
            if (!wallets) {
                throw { error: 'Error getting wallets' };
            } else {
                return ({ status: "success", wallets: wallets })
            }
        } catch (err) {
            if (err.message) {
                return ({ error: err.message });
            } else {
                return (err);
            }
        }
    }
    static async getSingleWallet(id) {
        try {
            let wallet = await walletRepo.findWalletById(id);
            if (!wallet) {
                throw { error: 'Error getting wallets' };
            } else {
                return ({ status: "success", wallet: wallet })
            }
        } catch (err) {
            if (err.message) {
                return ({ error: err.message });
            } else {
                return (err);
            }
        }
    }


}

module.exports = Wallet;