const Chains = require('./chain.base.js')
module.exports = (chainId,assetId)=>{
    if(!assetId||!chainId){ throw Error('Both chainId & assetId are required!') }
    const theChain = Chains[chainId]
    if(!theChain){ throw Error('ChainId not found!') }
    const theContract = theChain.assets.find(e=>e.token===assetId)
    if(!theContract){ throw Error('Asset not found!') }
    return {
        chain: theChain,
        contract: theContract
    }
}