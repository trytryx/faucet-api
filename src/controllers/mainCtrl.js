// External Dependancies
const boom = require('boom');
//  Get Conf
const giftRule = require('../config/gift.rule');
const transferRoad = require('../config/road.rule.js');
// Get Data Models
const Transfer = require('../models/Transfer');
//  Get web3 methods
const { getBalance, handleTransfer } = require('../utils/index');

/**
 * @description check balance | transfer count | transfer amount
 * @param {*} req
 * @param {*} reply
 * @returns 
 */
exports.checkHealth = async (req, reply) => {
  try {
    const { chainId, assetId } = req.query

    const rider = transferRoad(chainId,assetId)

    const balance = await getBalance(
      rider.chain.nodes[0], 
      rider.contract,
      reply.context.config.pub
    )

    const records = await Transfer.find({chainId,assetId})
    const count = records.length
    const total = records.reduce((t,c)=>(t+1*c.amount),0)

    return {
      chainId,
      assetId,
      balance,
      count,
      total
    }
  } catch (err) {
    req.log.error(err)
    throw boom.boomify(err)
  }
}

/**
 * @description Handle the gift
 * @param {*} req 
 * @param {*} reply 
 * @returns 
 */
exports.executeGift = async (req, reply) => {
  try {
    //  check required address
    const address = req.params.address
    if(!address){ throw Error('Required address') }

    const { chainId, assetId, giftMode = '2024' } = req.query

    const rider = transferRoad(chainId,assetId)

    //  check existed's expired_at
    const records = await Transfer.find({assetId,chainId,address},null,{sort:{updatedAt:-1}})
    const existed = records[0] || null
    //  check limited
    if(existed && existed.expired_at > Date.now()){
      throw Error(`Gift Time Limited After ${new Date(existed.expired_at).toISOString()}`)
    }
    //  prepare the gift pattern
    const giftPattern = giftRule[giftMode] || giftRule[2024]
    //  do wallet transfer via wbe3
    const {pub,pri} = reply.context.config
    const txhash = await handleTransfer(
      rider.chain, 
      rider.contract,
      pri,pub,
      address,
      giftPattern.amount
    )
    
    req.log.info(txhash)

    if(!txhash){ throw Error("Transactions error") }

    //  prepare to write into db
    const theData = {
      address, assetId, chainId, txhash,
      expired_at: Date.now() + giftPattern.expired_at,
      amount: giftPattern.amount,
      remote: `${req.hostname||req.ip||'unknow location'}`
    }

    req.log.info(`[ theData ] > ${JSON.stringify(theData)}`)

    const transfer = new Transfer(theData)

    return transfer.save()
  } catch (err) {
    req.log.error(err)
    throw boom.boomify(err)
  }
}

/**
 * @description Get all transfer records
 * @param {*} req 
 * @param {*} reply 
 * @returns 
 */
exports.getTransfers = async (req, reply) => {
  try {
    const filterKeys = ["chainId","assetId","address","txhash"]
    let filters = {}
    filterKeys.forEach(k=>{ req.query[k] && (filters[k] = req.query[k]) })
    const records = await Transfer.find(filters)
    return records
  } catch (err) {
    req.log.error(err)
    throw boom.boomify(err)
  }
}