const Contracts = require('./contract.base.json')
module.exports={
    137:{
        "chainId": 137,
        "test": false,
        "name": "EPIC",
        "assets": Contracts[137] || [],
		"nodes": [
			"https://polygon-rpc.com/",
			"https://rpc-mainnet.matic.network/",
			"https://rpc-mainnet.maticvigil.com/",
			"https://rpc-mainnet.matic.quiknode.pro/",
			
		],
    },
    56:{
        "chainId": 56,
        "test": false,
        "name": "BSC_MAIN",
        "assets": Contracts[56] || [],
		"nodes": [
            "https://bsc-dataseed1.binance.org/",
            "https://bsc-dataseed2.binance.org/",
            "https://bsc-dataseed3.binance.org/",
            "https://bsc-dataseed4.binance.org/",
            "https://bsc-dataseed1.defibit.io/",
            "https://bsc-dataseed2.defibit.io/",
            "https://bsc-dataseed3.defibit.io/",
            "https://bsc-dataseed4.defibit.io/",
            "https://bsc-dataseed1.ninicoin.io/",
            "https://bsc-dataseed2.ninicoin.io/",
            "https://bsc-dataseed3.ninicoin.io/",
            "https://bsc-dataseed4.ninicoin.io/",
		],
    }
}
