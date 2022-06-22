# Faucet Api

A cool fast REST-APIs for blockchain faucet based on fastify.

```bash
 _____      _      _   _    ____   _____   _____          _      ____    ___ 
 |  ___|    / \    | | | |  / ___| | ____| |_   _|        / \    |  _ \  |_ _|
 | |_      / _ \   | | | | | |     |  _|     | |         / _ \   | |_) |  | | 
 |  _|    / ___ \  | |_| | | |___  | |___    | |    _   / ___ \  |  __/   | | 
 |_|     /_/   \_\  \___/   \____| |_____|   |_|   (_) /_/   \_\ |_|     |___|
                                                                              
```

## Tech Stack

**Server:**

[![nodejs](https://img.shields.io/badge/nodejs-v14.17.4-green.svg?)](https://nodejs.org/)

[![fastify](https://img.shields.io/badge/fastify-v3.20.1-black.svg?)](https://www.fastify.io/)

**Database:**

[![mongoDB](https://img.shields.io/badge/mongoDB-moogose-orange.svg?)](https://www.mongodb.com/)

**Plugins:**

[![web3](https://img.shields.io/badge/web3-1.5.2-yellow.svg?)](https://web3js.readthedocs.io/)

## Documentation

API-Doc is put on at [Api Help](/docs/api.md)

## Features

- `/health` Get status of wallet
- `/gift/:address` Transfer the token
- `/history` Get transfer records

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_PORT`- `APP_HOST` - `DB_MONGO`- `ETH_WALLET_PUB`- `ETH_WALLET_PRI`

And create your custom contract describe json

```json
# src/config/contract.base.json

{
    "97": [
        {
            "token": "xxxx",
            "name": "yyyy",
            "address": "0x00000000000000000000000000000000000000000",
            "abi": []
        }
    ]
}

```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Mulander-J/faucet-api
```

Go to the project directory

```bash
  cd faucet-api
```

Install dependencies

```bash
  npm install
```

Start the server with nodemon

```bash
  npm run dev
```

Start the server locally

```bash
  npm run start
```

Clean the npm cache

```bash
  npm run clean
```

## Running Tests

To run tests, run the following command

```bash
  curl http://localhost:3699/
```

## Deployment

To deploy this project run

```bash
# depoly via docker & build
docker-compose up -d --build
# deploy via docker udate
docker-compose up -d
# deploy via pm2
npm run pm2
```

## Optimizations

- ["under-pressure"](https://github.com/fastify/under-pressure): "5.7.0" - pressure-control
- ["fastify-rate-limit"](https://github.com/fastify/fastify-rate-limit): "5.6.0" - rate-limit-control

## Authors

- [@Mulander](https://mulander-j.github.io/fillory/Wiki1001/)

## Contributing

Contributions are always welcome!

## Related

Seek more detials via these sites below

- [fastify-official-doc](https://www.fastify.io/)
- [fastify-guidebook-cn](https://lavyun.gitbooks.io/fastify/content/)
- [使用Web3.js查询以太币和代币余额以及转账](https://blog.csdn.net/LJFPHP/article/details/82526684)
- [使用web3.js收发ETH或ERC20Token](https://bbs.huaweicloud.com/blogs/217236)

## License

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg?)](https://github.com/Mulander-J/faucet-api/blob/main/LICENSE)
