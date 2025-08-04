import { RESPONSE_MESSAGE } from "../Lib/Constants.js";
import Books from "../Models/Books.js";

export const updateBookService = () => {
  const updateBookByName = async (req, res, bookName) => {
    const body = req.body;

    const book = await Books.findOne({ where: { bookName } });

    if (!book)
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });

    book.bookName = body.bookName;

    await book.save();

    const books = await Books.findAll({});

    return res.json({
      status: 200,
      message: RESPONSE_MESSAGE.SUCCESS.Updated,
      data: books,
    });
  };

  const updateBookByNameAndAuthor = async (req, res, bookName, bookAuthor) => {
    const body = req.body;

    if (!body.bookName || !body.bookAuthor)
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });

    const book = await Books.findOne({ where: { bookName, bookAuthor } });

    if (!book)
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      });

    book.bookName = body.bookName;
    book.bookAuthor = body.bookAuthor;

    await book.save();

    const books = await Books.findAll({});

    return res.json({
      status: 200,
      message: RESPONSE_MESSAGE.SUCCESS.Updated,
      data: books,
    });
  };

  return {
    updateBookByName, updateBookByNameAndAuthor
  }
};
