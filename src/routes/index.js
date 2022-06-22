// Import our Controllers
const mainCtrl = require('../controllers/mainCtrl.js')

module.exports = function (fastify, opts, done) {
  /**
   * @description check health
   */
  fastify.get('/health', {
    schema: {
      description: `Get status of wallet`,
      summary: `Check the health`,
      querystring: {
        type: 'object',
        required:['chainId','assetId'],
        additionalProperties: false,
        properties: {
          chainId: { type: 'string' },
          assetId: { type: 'string' }
        }
      }
    },
    config: {
      pub: fastify.config.ETH_WALLET_PUB
    }
  },mainCtrl.checkHealth)
  /**
   * @description handle gift
   */
  fastify.get('/gift/:address',{
    schema: {
      description: `Transfer with your param`,
      summary: `Transfer the token`,
      params:{
        type: 'object',
        required: ['address'],
        properties: {
          address: { type: 'string' }
        }
      },
      querystring: {
        type: 'object',
        required:['chainId','assetId'],
        additionalProperties: false,
        properties: {
          chainId: { type: 'string' },
          assetId: { type: 'string' },
          giftMode: { type: 'string' }
        }
      }
    },
    config: {
      pub: fastify.config.ETH_WALLET_PUB,
      pri: fastify.config.ETH_WALLET_PRI
    }
  } ,mainCtrl.executeGift)
  //fastify.config.ETH_WALLET_PUB,fastify.config.ETH_WALLET_PRI
  /**
   * @description check history
   */
  fastify.get('/history', {
    schema: {
      description: `Get list by query`,
      summary: `Get transfer records`,
      querystring: {
        type: 'object',
        additionalProperties: false,
        properties: {
          chainId: { type: 'string' },
          assetId: { type: 'string' },
          address: { type: 'string' },
          txhash: { type: 'string' }
        }
      }
    }
  }, mainCtrl.getTransfers)

  done()
}
