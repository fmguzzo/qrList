import mongoose from "mongoose";

// Set .env (environment var) - PORT
import config from "./config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host} [DB -> ${conn.connection.name}]`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

/*
const connectDB = mongoose.connect(config.mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
connect.then(
  (db) => {
    console.log("Connected to DB -> " + db.connection.name);
  },
  (err) => {
    console.log(err);
  }
);
*/

export default connectDB;
