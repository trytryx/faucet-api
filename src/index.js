// Require the config of fastify-plugin-options
const conf = require('./config')
const fp = require('fastify-plugin')
// Import Routes
const routes = require('./routes')
//  Setup logger
const {opt} = require('fastify-logger')(conf.logger);
opt.stream = null;
// Require the fastify framework and instantiate it
const fastify = require('fastify')({ logger: opt })
/**
 * @description connect mongoDB with env-conf
 * @param {*} fastify 
 */
async function connectDB (fastify) {
  // Require external modules
  const mongoose = require('mongoose')
  /*DeprecationWarning: collection.ensureIndex is deprecated.Use createIndexes*/
  mongoose.set('useCreateIndex', true);
  // Connect to DB
  mongoose.connect(fastify.config.DB_MONGO,{
    /*DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.*/
    useNewUrlParser: true ,
    /*DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.*/
    useUnifiedTopology: true
  })
    .then(() => fastify.log.info('==============>MongoDB connected success<=============='))
    .catch(err => fastify.log.error(err))
}
/**
 * @description Start the service
 */
async function start () {
  // Reigseter Plugins
  await fastify
    // Register ENV (https://github.com/fastify/fastify-env)
    .register(require('fastify-env'), conf.env)
    // Register Cors (https://github.com/fastify/fastify-cors)
    .register(require('fastify-cors'), conf.cors)
    // Register helmet (https://github.com/fastify/fastify-helmet)
    .register(require('fastify-helmet'), conf.helmet)
    // Register Pressure (https://github.com/fastify/under-pressure)
    .register(require('under-pressure'), conf.pressure)
    // Register Rate-limit (https://github.com/fastify/fastify-rate-limit)
    .register(require('fastify-rate-limit'), conf.rateLimit)
    .register(fp(connectDB))

  // console.info("==============>fastify.config",fastify.config)

  fastify.setErrorHandler(function (error, request, reply) {
    if (reply.statusCode === 429) {
      error.message = 'You hit the rate limit! Slow down please!'
    }
    reply.send(error)
  })

  // Loop over each route
  fastify.get('/', ()=>('Hello API'))
  fastify.register(require('./routes/index'), { prefix: '/faucet' })

  try {
    await fastify.listen(fastify.config.APP_PORT, fastify.config.APP_HOST)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()