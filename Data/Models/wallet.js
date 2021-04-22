const mongoose = require('mongoose');

//define the user schema
const walletSchema = new mongoose.Schema({
    funds: { type: String, default:0 },
    walletNumber: { type: String, required: [true, 'WallletId is required']  },
    walletHolder: {type: mongoose.Schema.Types.ObjectId,ref:'User' ,required: [true, 'walletHolder is required']},
    currency: { type: String, required: [true, 'Currency is required'] },

}, {
    timestamps: true,
})


module.exports = mongoose.model('wallet', walletSchema)