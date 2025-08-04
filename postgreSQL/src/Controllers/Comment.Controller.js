import db from "../../Lib/db.js";

export const addComment = async (req, res) => {
  try {
    const comment = await db.comments.create({
      data: {
        comment: req.body.comment,
        postId: req.body.postId,
      },
    });

    return res.json({
      message: "Created Successfully!",
    });
  } catch (error) {
    return res.json({
      error,
    });
  }
};
