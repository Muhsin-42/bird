import conf from "@/conf/config";
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!conf.MONGODB_URL) return console.log("MONGODB_URL not found");

  if (isConnected) return console.log("Already connected to mongo.");

  try {
    await mongoose.connect(conf.MONGODB_URL);
    isConnected = true;
    console.log("Connected to Mongodb.");
  } catch (error) {
    console.log("Error connecting mongodb = ", error);
  }
};
