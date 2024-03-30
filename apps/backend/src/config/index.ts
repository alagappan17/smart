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
  llm: {
    openAiApiKey: process.env.OPEN_AI_API_KEY || '',
    googleApiKey: process.env.GOOGLE_API_KEY || '',
    cohereApiKey: process.env.COHERE_API_KEY || '',
    ollama: {
      baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    },
  },
  log: {
    level: process.env.LOG_LEVEL || 'debug',
  },
};

export default config;
