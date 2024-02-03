const CONNECTOR = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  user: process.env.REDIS_USER || '',
  password: process.env.REDIS_PASSWORD || '',
};

const DEFAULT_REMOVE_CONFIG = {
  removeOnComplete: {
    age: 3600,
  },
  removeOnFail: {
    age: 24 * 3600,
  },
};
module.exports = { CONNECTOR, DEFAULT_REMOVE_CONFIG };
