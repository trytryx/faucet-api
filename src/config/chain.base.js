const Contracts = require('./contract.base.json')
module.exports={
    97:{
        "chainId": 97,
        "test": true,
        "name": "BSC_TEST",
        "assets": Contracts[97] || [],
		"nodes": [
			"https://data-seed-prebsc-1-s1.binance.org:8545/",
			"https://data-seed-prebsc-2-s1.binance.org:8545/",
			"http://data-seed-prebsc-1-s2.binance.org:8545/",
			"http://data-seed-prebsc-2-s2.binance.org:8545/",
			"https://data-seed-prebsc-1-s3.binance.org:8545/",
			"https://data-seed-prebsc-2-s3.binance.org:8545/",
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