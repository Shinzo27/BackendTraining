import { Request, Response } from "express";
import { ResponseMessages } from "../Lib/ResponseMessage";
import { blogSchema } from "../Lib/ValidationSchema";
import { prisma } from "../Lib/prisma";
import { BlogDetails } from "../Lib/Types";

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blogs.findMany({});

    if (blogs.length === 0) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.BLOGS.FETCHED,
      blogs,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blogs.findMany({
      where: {
        id: Number(id),
      },
    });

    if (!blog) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.BLOGS.FETCHED,
      blog,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const getBlogsByUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const blog = await prisma.blogs.findMany({
      where: {
        authorId: user?.id,
      },
    });

    if (blog.length === 0) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.BLOGS.FETCHED,
      blog,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause ? error.meta.cause : error.message,
    });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    await blogSchema.validateAsync(req.body);

    const { title, content, authorId } = req.body as BlogDetails;
    const file = req.file;
    console.log(file);

    const blog = await prisma.blogs.create({
      data: {
        title,
        content,
        authorId,
        coverImage: file?.path as string,
      },
    });

    if (!blog) throw new Error(ResponseMessages.ERROR.WENT_WRONG);

    return res.json({
      success: true,
      message: ResponseMessages.BLOGS.CREATED,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.message,
    });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    await blogSchema.validateAsync(req.body);

    const { id } = req.params;
    const { title, content, authorId } = req.body;

    const updateData = await prisma.blogs.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
        authorId,
      },
    });

    if (!updateData) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.BLOGS.UPDATED,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause ? error.meta.cause : error.message,
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteData = await prisma.blogs.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deleteData) throw new Error(ResponseMessages.ERROR.NOT_FOUND);

    return res.json({
      success: true,
      message: ResponseMessages.BLOGS.DELETED,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: ResponseMessages.ERROR.WENT_WRONG,
      error: error.meta.cause ? error.meta.cause : error.message,
    });
  }
};
