import db from "../../Lib/db.js";

export const getPosts = async (req, res) => {
  const posts = await db.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      comments: {
        select: {
          comment: true,
        },
      },
    },
  });

  return res.json({
    posts,
  });
};

export const createPost = async (req, res) => {
  try {
    const post = await db.post.create({
      data: {
        authorId: req.body.authorId,
      },
    });

    return post
      ? res.json({
          message: "Post Created!",
        })
      : res.json({
          message: "Something went wrong!",
        });
  } catch (error) {
    return res.json({
      error,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await db.post.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.json({
      message: "Deleted Successfully!",
    });
  } catch (error) {
    return res.json({
      error,
      message: "Something went wrong!",
    });
  }
};
