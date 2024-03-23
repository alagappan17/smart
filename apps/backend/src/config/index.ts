const config = {
  port: parseInt(process.env.NODE_PORT || '6500') || 6500,
  sessionKey: process.env.SESSION_KEY || 'smart-session',
  mongo: {
    database: process.env.MONGO_DATABASE || 'smart',
    protocol: process.env.MONGO_PROTOCOL || 'mongodb',
    host: process.env.MONGO_HOST || 'localhost:27017',
    username: process.env.MONGO_USERNAME || '',
    password: process.env.MONGO_PASSWORD || '',
  },
  log: {
    level: process.env.LOG_LEVEL || 'debug',
  },
};

export default config;
