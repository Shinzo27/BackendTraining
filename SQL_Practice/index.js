import express from "express";
import db from "./Lib/db.js";
import User from "./Models/User.js";

const app = express();
app.use(express.json());
db.sync();

app.get("/", async (req, res) => {
  return res.json({
    message: "Server is healthy!",
  });
});

app.get("/getUsers", async (req, res) => {
  const users = await User.findAll();

  return res.json({
    message: "Users fetched!",
    users,
  });
});

app.post("/postUser", async (req, res) => {
  const body = req.body;

  try {
    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    });
    if(user) {
      return res.json({
        message: "Created!",
      });
    } else {
      return res.json({
        message: "Something went wrong!"
      })
    }
  } catch (error) {
    return res.json({
      error: error
    })
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.destroy({
    where: {
      id: Number(id),
    },
  });

  if (user) {
    return res.json({
      message: "User Deleted Successfully!",
    });
  } else {
    return res.json({
      message: "Something went wrong!",
    });
  }
});

app.get("/getSingleUser/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id)

  if (!user)
    return res.json({
      message: "User not found!",
    });

  return res.json({
    user,
  });
});

app.put("/updateUser/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const user = await User.update(
    { firstName: body.firstName },
    { where: { id: id } }
  );

  if (user) {
    return res.json({
      message: "User updated!",
    });
  } else {
    return res.json({
      message: "Something went wrong!",
    });
  }
});

app.listen(8000, () => console.log("Server is running on port: 8000"));
