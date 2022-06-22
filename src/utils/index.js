const Web3 = require('web3');
// fix Tx is not a constructor
const Tx = require('ethereumjs-tx').Transaction;
/**
 * @description getBalance
 * @param {*} node 
 * @param {*} contract 
 * @param {*} account 
 * @returns 
 */
exports.getBalance = async (node,contract,account)=>{
  // console.log('[ node,contract,account ] >', node,contract,account)
  const web3 = new Web3(new Web3.providers.HttpProvider(node));
  const {abi,address} = contract
  const contractInstance = new web3.eth.Contract(abi,address);
  const balanceOf = await contractInstance.methods.balanceOf(account).call({from: account})
  const balance = Number(Web3.utils.fromWei(balanceOf,'ether')) || 0
  return balance
}
/**
 * @description handleTransfer via assets&chains
 * @param {*} chain 
 * @param {*} contract 
 * @param {String} pri 
 * @param {String} from 
 * @param {String} to 
 * @param {String} amount 
 * @returns 
 */
exports.handleTransfer = async (chain,contract,pri,from,to,amount)=>{
  const web3 = new Web3(new Web3.providers.HttpProvider(chain.nodes[0]));
  if(!web3.utils.isAddress(to)){ throw Error('Wrong address') }
  const {abi,address} = contract;
  const contractInstance = new web3.eth.Contract(abi,address);
  //the number of sended token
  const transferAmount = web3.utils.toWei(String(amount), 'ether');
  if(chain.test){
    web3.eth.accounts.wallet.add(pri);
    const transaction =  await contractInstance.methods.transfer(to, transferAmount).send({
      from,
      gasLimit: web3.utils.toHex(8000000),
      gasPrice: web3.utils.toHex(10e9),
    });
    return transaction.transactionHash
  }else{
    // get the nonce
    const nonceCnt = await web3.eth.getTransactionCount(from);
    console.log(`num transactions so far: ${nonceCnt}`);
    //raw Tx 
    var rawTransaction = { 
      "from": from, 
      "nonce": web3.utils.toHex(nonceCnt),
      "gasLimit": web3.utils.toHex(8000000),
      "gasPrice": web3.utils.toHex(10e9),
      "to": address,
      "value": "0x0",
      "data": contractInstance.methods.transfer(to, transferAmount).encodeABI(),
      "chainId": chain.chainId
    }; 
    //  fix  invalid sender
    var tx = new Tx(rawTransaction,{chain: chain.chainId});
    // fix Expected private key to be an Uint8Array with length 32 
    const privateKey = Buffer.from(pri, 'hex')
    tx.sign(privateKey);
    const serializedTx = tx.serialize();
    // Comment out these three lines if you don't really want to send the TX right now 
    console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
    var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')); 
    console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
    return  receipt
  }
}