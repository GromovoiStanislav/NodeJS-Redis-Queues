/*
A standard queue requires 3 connections to the Redis server. 
In some situations you might want to re-use connections.
You can do this with the createClient option in the Queue constructor.
*/

const Redis = require('ioredis');

const redisConfig = {
  // port: 6379,
  // host: '127.0.0.1',
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  user: process.env.REDIS_USER,
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
          client = new Redis(redisConfig, options);
        }
        return client;
      case 'subscriber':
        if (!subscriber) {
          subscriber = new Redis(redisConfig, options);
        }
        return subscriber;
      case 'bclient':
        return new Redis(redisConfig, options);
      default:
        throw new Error('Unexpected connection type: ', type);
    }
  },
};

module.exports = redisOptions;
