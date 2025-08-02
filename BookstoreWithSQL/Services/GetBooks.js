import { Op } from "sequelize";
import { RESPONSE_MESSAGE } from "../Lib/Constants.js";
import Books from "../Models/Books.js";

export const getBooksServices = () => {
  const getAllBooks = async (req, res) => {
    const books = await Books.findAll({});

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.Fetched,
      books: books,
    });
  };

  const getBookById = async (req, res, bookId) => {
    if (!bookId)
      return res.status(400).json({
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
        status: 400,
      });

    const bookById = await Books.findOne({ bookId });

    if (!bookById) {
      return res.status(400).json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
        data: [],
      });
    }
    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.FETCHED,
      data: bookById,
    });
  };

  const getBookByName = async (req, res, bookName) => {
    if (!bookName)
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });

    const bookByName = await Books.findOne({ where: { bookName } });

    if (!bookByName) {
      return res.status(400).json({
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
        data: [],
      });
    }

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.Fetched,
      data: bookByName,
    });
  };

  const getBookByNameAndAuthor = async (req, res, bookName, bookAuthor) => {
    if (!bookName || !bookAuthor)
      return res.status(400).json({
        status: 400,
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });

    const bookByNameAndAuthor = await Books.findOne({
      where: { bookName, bookAuthor },
    });

    if (!bookByNameAndAuthor) {
      return res.status(400).json({
        message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
        data: [],
      });
    }

    return res.json({
      data: bookByNameAndAuthor,
    });
  };

  const getBooksMoreThan100Pages = async (req, res) => {
    const bookMoreThan100Pages = await Books.findAll({
      where: { noOfPage: { [Op.gt]: 100 } },
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.Fetched,
      data: bookMoreThan100Pages,
    });
  };

  const getBooksLessThan90MoreThan25 = async (req, res) => {
    const booksLessThan90MoreThan25 = await Books.findAll({
      where: {
        noOfPage: {
          [Op.and]: {
            [Op.gt]: 25,
            [Op.lt]: 90,
          },
        },
      },
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.Fetched,
      data: booksLessThan90MoreThan25,
    });
  };

  const getBooksLessThan90MoreThan25Not80 = async (req, res) => {
    const booksLessThan90MoreThan25Not80 = await Books.findAll({
      where: {
        noOfPage: {
          [Op.and]: {
            [Op.gt]: 25,
            [Op.lt]: 90,
            [Op.ne]: 80,
          },
        },
      },
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.Fetched,
      data: booksLessThan90MoreThan25Not80,
    });
  };

  const getBooksPagesZero = async (req, res) => {
    const booksPagesZero = await Books.findAll({
      where: { noOfPage: { [Op.eq]: 0 } },
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.Fetched,
      data: booksPagesZero,
    });
  };

  const getBooksReleasedYear2015and2001 = async (req, res) => {
    const booksReleasedYear2015and2001 = await Books.findAll({
      $or: [{ releasedYear: { $eq: 2015 } }, { releasedYear: { $eq: 2001 } }],
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.Fetched,
      data: booksReleasedYear2015and2001,
    });
  };

  return {
    getAllBooks,
    getBookById,
    getBookByName,
    getBookByNameAndAuthor,
    getBooksMoreThan100Pages,
    getBooksLessThan90MoreThan25,
    getBooksLessThan90MoreThan25Not80,
    getBooksPagesZero,
    getBooksReleasedYear2015and2001,
  };
};
