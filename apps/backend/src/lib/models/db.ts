import mongoose from 'mongoose';
import config from '../../config';

export const init = async () => {
  const user =
    config.mongo.username && config.mongo.password
      ? `${config.mongo.username}:${config.mongo.password}@`
      : '';
  await mongoose.connect(
    `${config.mongo.protocol}://${user}${config.mongo.host}/${config.mongo.database}`
  );
};
