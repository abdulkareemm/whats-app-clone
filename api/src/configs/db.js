import mongoose from"mongoose";
import logger from"./logger.js";

const dbConnect = async () => {
  logger.info("connect to database ...");
  try {
    mongoose.set("strictQuery", false);
    const connected = await mongoose.connect(process.env.MONGO_URL);

    logger.info(`Mongo db ${connected.connection.host}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

export default dbConnect;
