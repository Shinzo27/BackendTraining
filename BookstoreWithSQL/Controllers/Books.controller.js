import { RESPONSE_MESSAGE } from "../Lib/Constants.js";
import { getBooksServices } from "../Services/GetBooks.js";
import { sortBooksService } from "../Services/SortBooks.js";
import { updateBookService } from "../Services/UpdateBooks.js";
import { deleteBookService } from "../Services/DeleteBooks.js";

const {
  getAllBooks,
  getBookById,
  getBookByName,
  getBookByNameAndAuthor,
  getBooksMoreThan100Pages,
  getBooksLessThan90MoreThan25,
  getBooksLessThan90MoreThan25Not80,
  getBooksPagesZero,
  getBooksReleasedYear2015and2001,
} = getBooksServices();

const {
  sortBooksByName,
  sortBooksByPrice,
  sortBooksByAuthor,
  sortBooksByCategory,
  sortBooksByNoOfPages,
  sortBooksByReleasedYear,
} = sortBooksService();

const { updateBookByName, updateBookByNameAndAuthor } = updateBookService();

const {
  deleteBookByBookId,
  deleteBookByBookName,
  deleteBookByBookDescAndAuthor,
  deleteBookByBookNameAndCategory,
} = deleteBookService();

export const getBooks = async (req, res) => {
  const query = req.query;
  const { type } = req.params;

  if (type === "all") {
    await getAllBooks(req, res);
  } else if (type === "bookById" && query.id) {
    if (!query.id)
      return res.json({
        success: false,
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });
    await getBookById(req, res, query.id);
  } else if (type === "bookByName" && query.name) {
    if (!query.name)
      return res.json({
        success: false,
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });
    await getBookByName(req, res, query.name);
  } else if (type === "bookByNameAndAuthor" && query.name && query.author) {
    if (!query.name && !query.author)
      return res.json({
        success: false,
        message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
      });
    await getBookByNameAndAuthor(req, res, query.name, query.author);
  } else if (type === "booksMoreThan100Pages") {
    await getBooksMoreThan100Pages(req, res);
  } else if (type === "booksLessThan90MoreThan25") {
    await getBooksLessThan90MoreThan25(req, res);
  } else if (type === "booksLessThan90MoreThan25Not80") {
    await getBooksLessThan90MoreThan25Not80(req, res);
  } else if (type === "booksPagesZero") {
    await getBooksPagesZero(req, res);
  } else if (type === "booksReleasedYear2015and2001") {
    await getBooksReleasedYear2015and2001(req, res);
  } else {
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });
  }
};

export const sortBooks = async (req, res) => {
  const { query } = req.params;

  if (query === "name") {
    await sortBooksByName(req, res);
  } else if (query === "price") {
    await sortBooksByPrice(req, res);
  } else if (query === "author") {
    await sortBooksByAuthor(req, res);
  } else if (query === "noOfPages") {
    await sortBooksByNoOfPages(req, res);
  } else if (query === "category") {
    await sortBooksByCategory(req, res);
  } else if (query === "releasedYear") {
    await sortBooksByReleasedYear(req, res);
  } else {
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });
  }
};

export const updateBooks = async (req, res) => {
  const query = req.query;
  const { type } = req.params;

  console.log(query);
  console.log(type);
  if (type === "name" && query.name) {
    await updateBookByName(req, res, query.name);
  } else if (type === "nameAndAuthor" && query.name && query.author) {
    await updateBookByNameAndAuthor(req, res, query.name, query.author);
  } else {
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });
  }
};

export const deleteBooks = async (req, res) => {
  const query = req.query;
  const { type } = req.params;

  if (type === "id" && query.id) {
    await deleteBookByBookId(req, res, query.id);
  } else if (type === "name" && query.name) {
    await deleteBookByBookName(req, res, query.name);
  } else if (type === "descAndAuthor" && query.desc && query.author) {
    await deleteBookByBookDescAndAuthor(req, res, query.desc, query.author);
  } else if (type === "nameAndCategory" && query.name && query.category) {
    await deleteBookByBookNameAndCategory(req, res, query.name, query.category);
  } else {
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });
  }
};
