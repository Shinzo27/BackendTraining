import { RESPONSE_MESSAGE } from "../Lib/Constants.js";
import Books from "../Models/Books.js";

export const sortBooksService = () => {
  const sortBooksByName = async (req, res) => {
    const books = await Books.findAll({
      order: [["bookName", "ASC"]],
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.SORT,
      data: books,
    });
  };

  const sortBooksByPrice = async (req, res) => {
    const books = await Books.findAll({
      order: [["bookPrice", "ASC"]],
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.SORT,
      data: books,
    });
  };

  const sortBooksByAuthor = async (req, res) => {
    const books = await Books.findAll({
      order: [["bookAuthor", "ASC"]],
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.SORT,
      data: books,
    });
  };

  const sortBooksByNoOfPages = async (req, res) => {
    const books = await Books.findAll({
      order: [["noOfPage", "ASC"]],
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.SORT,
      data: books,
    });
  };

  const sortBooksByCategory = async (req, res) => {
    const books = await Books.findAll({
      order: [["bookCategory", "ASC"]],
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.SORT,
      data: books,
    });
  };

  const sortBooksByReleasedYear = async (req, res) => {
    const books = await Books.findAll({
      order: [["releasedYear", "ASC"]],
    });

    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.SORT,
      data: books,
    });
  };

  return {
    sortBooksByName,
    sortBooksByPrice,
    sortBooksByAuthor,
    sortBooksByNoOfPages,
    sortBooksByCategory,
    sortBooksByReleasedYear
  }
};
