import { RESPONSE_MESSAGE } from "../Lib/Constants.js";
import Books from "../Models/Books.js";

export const deleteBookService = () => {
  const deleteBookByBookId = async (req, res, bookId) => {
    if (!bookId)
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });

    const book = await Books.destroy({ where: { id: bookId } });
    const books = await Books.findAll({});

    if (book) {
      return res.json({
        status: 200,
        message: RESPONSE_MESSAGE.SUCCESS.Deleted,
        data: books,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
    }
  };

  const deleteBookByBookName = async (req, res, bookName) => {
    if (!bookName)
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });

    const book = await Books.destroy({ where: { bookName } });

    const books = await Books.findAll({});

    if (book) {
      return res.json({
        status: 200,
        message: RESPONSE_MESSAGE.SUCCESS.Deleted,
        data: books,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
    }
  };

  const deleteBookByBookDescAndAuthor = async (
    req,
    res,
    bookDesc,
    bookAuthor
  ) => {
    if (!bookDesc || !bookAuthor)
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });

    const book = await Books.destroy({ where: { bookDesc, bookAuthor } });

    const books = await Books.findAll({});

    if (book) {
      return res.json({
        status: 200,
        message: RESPONSE_MESSAGE.SUCCESS.Deleted,
        data: books,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
    }
  };

  const deleteBookByBookNameAndCategory = async (
    req,
    res,
    bookName,
    bookCategory
  ) => {
    if (!bookName || !bookCategory)
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });

    const book = await Books.destroy({ where: { bookName, bookCategory } });

    const books = await Books.findAll({});

    if (book) {
      return res.json({
        status: 200,
        message: RESPONSE_MESSAGE.SUCCESS.Deleted,
        data: books,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });
    }
  };

  return {
    deleteBookByBookId,
    deleteBookByBookName,
    deleteBookByBookNameAndCategory,
    deleteBookByBookDescAndAuthor
  }
};
