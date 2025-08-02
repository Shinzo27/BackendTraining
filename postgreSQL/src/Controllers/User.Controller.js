import db from "../../Lib/db.js";

export const getUsers = async (req, res) => {
  const user = await db.user.findMany({
    include: {
      posts: {
        include: {
          comments: true
        }
      }
    }
  });

  return res.json({
    user,
  });
};

export const addUser = async (req, res) => {
  const user = await db.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
  });

  return user
    ? res.json({
        message: "Created Successfully!",
      })
    : res.json({
        message: "Something went wrong!",
      });
};

export const updateUser = async (req, res) => {
  const user = await db.user.update({
    where: { id: Number(req.params.id) },
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
  });
  
  return user ? res.json({
    message: "User updated!"
  }) : res.json({
    message: "Something went wrong!"
  })
}

export const deleteUser = async(req, res) => {
  const user = await db.user.delete({
    where: { id: Number(req.params.id)}
  })

  return user ? res.json({
    message: "Deleted Successfully!"
  }) : res.json({
    message: "Something went wrong!"
  })
}