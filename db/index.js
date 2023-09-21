// This file is to connect our app to the database

import Mongoose from "mongoose";
import { mongo } from "../config/environment";

let isConnected;
let db;

const connectDB = async () => {
  // if we are already connected we will return the connection and establish a new connection
  if (isConnected) return db;

  try {
    db = await Mongoose.connect(mongo.url);
    isConnected = db.connections[0].readyState;
    return db;
  } catch (err) {
    throw new Error(err);
  }
};

export default connectDB;
