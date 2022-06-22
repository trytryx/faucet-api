const path = require('path')

module.exports = {
    env: {
        dotenv: true,
        schema: {
            type: 'object',
            required: [ 'ETH_WALLET_PUB', 'ETH_WALLET_PRI' ],
            properties: {
                APP_PORT: { type: 'string', default: 3699},
                APP_HOST: { type: 'string', default: '0.0.0.0'},
                DB_MONGO: { type: 'string', default: 'mongodb://localhost/faucet'},
                ETH_WALLET_PUB: { type: 'string', default: ''},
                ETH_WALLET_PRI: { type: 'string', default: ''}
            }
        }
    },
    logger: {
        // console: true,
        file : path.join(__dirname, '../../logs/fastify.log'), //此处设置log文件输出路径
        logrotator : {  // 设置按什么归档日志
          byDay: true,
          dayDelimiter: '_'
        },
        customLevels: 'all',    //自定义level设置输出所有级别日志
        maxBufferLength: 4096,
        flushInterval: 1000,
        //  setup pino-pretty
        prettyPrint: {
            colorize: false,
            timestampKey: 'time',
            translateTime : 'SYS:yyyy-mm-dd HH:MM:ss Z',
            messageFormat: '{msg}',
        }
    },
    cors: {},
    helmet: { contentSecurityPolicy: false },
    pressure: {
        maxEventLoopDelay: 10_000,
        maxHeapUsedBytes: 300_000_000,
        maxRssBytes: 50_000_0000,
        maxEventLoopUtilization: 0.98,
        message: 'Under pressure!',
        retryAfter: 50,
        healthCheckInterval: 1_000 * 60 * 30,
        healthCheck: async function (fastifyInstance) {
            fastifyInstance.log.info(`======> ❤️ Heart-Jump ❤️ <======`)
            return true
        }
    },
    rateLimit: {
        max: 1_000,
        timeWindow: 1_000 * 60
    }
}