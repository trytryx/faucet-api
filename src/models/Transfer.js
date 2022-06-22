// External Dependancies
const mongoose = require('mongoose')

const TransferSchema = new mongoose.Schema({
  address: { type: String, required: true },                   // to_address
  chainId: { type: String, default: '' },                      //  chain net id
  assetId: { type: String, default: '' },                      //  asset id
  expired_at: { type: Date, default: null },                  //  time limited
  amount: { type: String, default: '' },                       //  amount
  txhash: { type: String, default: '' },                       //   tx hash
  remote: { type: String, default: 'unknow location' }         //   ip:port
}, { timestamps: true })

module.exports = mongoose.model('Transfer', TransferSchema)