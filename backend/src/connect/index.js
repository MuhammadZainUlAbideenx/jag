// ../connect/index.js

import mongoose  from "mongoose";

function ConnectToMongoDb(url) {
  return mongoose.connect(url);
}

export default ConnectToMongoDb;
