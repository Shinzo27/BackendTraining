import { RESPONSE_MESSAGE } from "../Lib/Constants.js";
import Books from "../Models/Books.js";

const deleteBooksByCondition = async (req, res, condition) => {
  const book = await Books.findOneAndDelete(condition);

  if (book) {
    const books = await Books.find({});
    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.DELETED,
      data: books,
    });
  } else {
    return res.json({
      status: 400,
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
    });
  }
};

export const deleteBooks = async (req, res) => {
  const query = req.query;
  const { type } = req.params;

  if (type === "id" && query.id) {
    await deleteBooksByCondition(req, res, { bookId: query.id });
  } else if (type === "name" && query.name) {
    await deleteBooksByCondition(req, res, { bookName: query.name });
  } else if (type === "descAndAuthor" && query.desc && query.author) {
    await deleteBooksByCondition(req, res, {
      bookDesc: query.desc,
      bookAuthor: query.author,
    });
  } else if (type === "nameAndCategory" && query.name && query.category) {
    await deleteBooksByCondition(req, res, {
      bookName: query.name,
      bookCategory: query.category,
    });
  } else {
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });
  }
};

const updateBookByCondition = async (req, res, condition) => {
  const book = await Books.findOneAndUpdate(
    { ...condition.current },
    { ...condition.update }
  );

  if (book) {
    const books = await Books.find({});
    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.UPDATED,
      data: books,
    });
  } else {
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
    });
  }
};

export const updateBooks = async (req, res) => {
  const query = req.query;
  const { type } = req.params;
  const body = req.body;

  if (type === "name" && query.name) {
    await updateBookByCondition(req, res, {
      current: { bookName: query.name },
      update: { bookName: body.bookName },
    });
  } else if (type === "nameAndAuthor" && query.name && query.author) {
    await updateBookByCondition(req, res, {
      current: { bookName: query.name, bookAuthor: query.author },
      update: { bookName: body.bookName, bookAuthor: body.bookAuthor },
    });
  } else {
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });
  }
};

export const sortAllBooks = async (req, res) => {
  let books;
  const { query } = req.params;

  books = await Books.find({}).sort({ [query]: 1 });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.SORT,
    data: books,
  });
};

const getBooksByCondition = async (req, res, condition) => {
  const books = await Books.find(condition);

  if (books.length > 0) {
    return res.json({
      message: RESPONSE_MESSAGE.SUCCESS.FETCHED,
      data: books,
    });
  } else {
    return res.json({
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      data: books,
    });
  }
};

export const getAllBooks = async (req, res) => {
  const { type } = req.params;
  const query = req.query;

  try {
    switch (type) {
      case "all":
        return await getBooksByCondition(req, res, {});

      case "bookById":
        if (!query.id) break;
        return await getBooksByCondition(req, res, { bookId: query.id });

      case "bookByName":
        if (!query.name) break;
        return await getBooksByCondition(req, res, { bookName: query.name });

      case "bookByNameAndAuthor":
        if (!query.name || !query.author) break;
        return await getBooksByCondition(req, res, {
          bookName: query.name,
          bookAuthor: query.author,
        });

      case "booksMoreThan100Pages":
        return await getBooksByCondition(req, res, { noOfPage: { $gt: 100 } });

      case "booksLessThan90MoreThan25":
        return await getBooksByCondition(req, res, {
          $and: [{ noOfPage: { $gt: 25 } }, { noOfPage: { $lt: 90 } }],
        });

      case "booksLessThan90MoreThan25Not80":
        return await getBooksByCondition(req, res, {
          $and: [
            { noOfPage: { $gt: 25 } },
            { noOfPage: { $lt: 90 } },
            { noOfPage: { $ne: 80 } },
          ],
        });

      case "booksPagesZero":
        return await getBooksByCondition(req, res, {
          noOfPage: { $eq: 0 },
        });

      case "booksReleasedYear2015and2001":
        return await getBooksByCondition(req, res, {
          $or: [
            { releasedYear: { $eq: 2015 } },
            { releasedYear: { $eq: 2001 } },
          ],
        });

      default:
        return res.json({
          success: false,
          message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
        });
    }

    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });
  }
};