const mongoose = require('mongoose');

//define the user schema
const transactionSchema = new mongoose.Schema({
    transactionType: { type: String, required: [true, 'Transaction type is required']  },
    walletId: { type: String, required: [true, 'WallletId is required']  },
    user: {type: mongoose.Schema.Types.ObjectId,ref:'User' ,required: [true, 'user is required']},
    requestCurrency:{ type: String, required: [true, 'Request currency is required']  },
    status:{ type: String, default:'pending' },
    currencyConversion:{ type: String, default:'None'},
    amount:{ type: String, required: [true, 'Amount is required']  },
    conversionAmount:{ type: String, default:0 },
}, {
    timestamps: true,
})


module.exports = mongoose.model('Transaction', transactionSchema)