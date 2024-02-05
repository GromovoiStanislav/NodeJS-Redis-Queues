const IORedis = require('ioredis');

const redisConfig = {
  // port: 6379,
  // host: '127.0.0.1',
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

let client;
let subscriber;

const redisOptions = {
  // redisOpts here will contain at least a property of connectionName which will identify the queue based on its name
  createClient: (type, options) => {
    switch (type) {
      case 'client':
        if (!client) {
          client = new IORedis(redisConfig, options);
        }
        return client;
      case 'subscriber':
        if (!subscriber) {
          subscriber = new IORedis(redisConfig, options);
        }
        return subscriber;
      case 'bclient':
        return new IORedis(redisConfig, options);
      default:
        throw new Error('Unexpected connection type: ', type);
    }
  },
};

module.exports = redisOptions;
