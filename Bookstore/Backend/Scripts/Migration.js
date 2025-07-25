import mongoose from "mongoose";
import User from "../Models/Users.js";

export async function migration() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");

  const userUpdate = await User.updateMany(
    {
      isVerified: { $exists: false },
    },
    {
      $set: { isVerified: false },
    }
  );

  if (userUpdate) {
    const users = await User.find({});
    console.log(users)
  } else {
    console.log("Something went wrong!");
  }

  mongoose.connection.close();
}