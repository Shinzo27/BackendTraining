import mongoose from "mongoose";
import express from "express";
import Users from "./Models/Users.js";

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Database Connected"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Server health",
  });
});

app.get("/getUsers", async (req, res) => {
  const users = await Users.find({});
  return res.status(200).json({
    message: "Users found",
    users: users,
  });
});

app.get("/getSingleUser/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Users.findById({ _id: id });

  if (data) {
    return res.json({
      status: 200,
      user: data,
    });
  } else {
    return res.status(400).json({
      status: 400,
      message: "User not found",
    });
  }
});

app.post("/postUser", async (req, res) => {
  const { id, email, password, name } = req.body;
  if (!id || !email || !password || !name) {
    return res.status(400).json({
      status: 400,
      message: "Enter correct data properly!",
    });
  }

  const user = await Users.insertOne({
    id,
    name,
    email,
    password,
  });

  if (user) {
    return res.json({
      status: 200,
      message: "User added successfully!",
    });
  } else {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong!",
    });
  }
});

app.put("/editUser/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const body = req.body;
  console.log(body);
  const update = await Users.findOneAndUpdate(
    { _id: id },
    { email: body.email }
  );
  console.log(update);
  if (update) {
    return res.json({
      status: 200,
      message: "User updated successfully!",
    });
  } else {
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById({ _id: id });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }

    const deleteUser = await Users.findOneAndDelete({ _id: id });
    console.log(deleteUser);
    if (deleteUser) {
      return res.json({
        status: 200,
        message: "User deleted successfully!",
      });
    } else {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
});

app.listen(PORT, () => console.log("Server is listening on : " + PORT));
