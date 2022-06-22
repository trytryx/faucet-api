# Faucet Api
## Common
### Prefix
- `/faucet`
### Response-Error

```
{
    "statusCode": 500,
    "error": "Internal Server Error",
    "message": "xxxx"
}
```
### Hints
Gift Action is limted according to the `expired_at`.
- 2024: 20/24h
- 1012: 10/12h'
- 506: 5/6h

Chains 
- 97 : BSC-TEST
- 56 : BSC-MAIN

Assets(For example)
- TBUSD

## Check Health

|  Url   | Method |
|  ----  | ----  |
| /health   | `GET`| 

Query
```
{ 
    chainId: String(Required)
    assetId: String(Required)
}
```
Example
> /health?chainId=97
```
{ 
    chainId, // the chain number
    assetId, // the assetId code
    balance,    //  the banalce of chain
    count,  //  the count of transfer
    total  //   the total of transfer
}
```

## Gift Handle

|  Url   | Method |
|  ----  | ----  |
| /gift   | `GET`| 

Param
```
{ 
    address: String(Required),
}
```
Query
```
{ 
    chainId: String(Required),
    assetId: String(Required),
    giftMode: '2024'|'1012'|'506'
}
```

Response
> /gift/{address}?chainId=97&assetId=TBUSD&giftMode=2024
```
{ 
  address: { type: String },
  chainId: { type: String, default: '' },
  assetId: { type: String, default: '' },
  expired_at: { type: Date, default: null },
  amount: { type: String, default: '' },
  txhash: { type: String, default: '' },
  remote: { type: String, default: 'unknow location' }
}
```

## Get Histroy

|  Url   | Method |
|  ----  | ----  |
| /history   | `GET`| 

Query
```
{ 
    chainId: String,
    address: String,
    assetId: String,
    txhash: String
}
```

Response
> /history?chainId=97&assetId=TBUSD&address=&txhash=
```
[
    { 
        address: { type: String },
        chainId: { type: String, default: '' },
        assetId: { type: String, default: '' },
        expired_at: { type: Date, default: null },
        amount: { type: String, default: '' },
        txhash: { type: String, default: '' },
        remote: { type: String, default: 'unknow location' }
    },
    ...
]
```