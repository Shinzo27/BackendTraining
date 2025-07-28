import { RESPONSE_MESSAGE } from "../Lib/Constants.js";
import Books from "../Models/Books.js";

export const getAllBooks = async (req, res) => {
  const books = await Books.find({});

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.FETCHED,
    data: books,
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

  const bookByName = await Books.findOne({ bookName });

  if (!bookByName) {
    return res.status(400).json({
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
      data: [],
    });
  }

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.FETCHED,
    data: bookByName,
  });
};

const getBookByNameAndAuthor = async (req, res, bookName, bookAuthor) => {
  if (!bookName || !bookAuthor)
    return res.status(400).json({
      status: 400,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });

  const bookByNameAndAuthor = await Books.findOne({ bookName, bookAuthor });

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
  const bookMoreThan100Pages = await Books.find({ noOfPage: { $gt: 100 } });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.FETCHED,
    data: bookMoreThan100Pages,
  });
};

const getBooksLessThan90MoreThan25 = async (req, res) => {
  const booksLessThan90MoreThan25 = await Books.find({
    $and: [{ noOfPage: { $gt: 25 } }, { noOfPage: { $lt: 90 } }],
  });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.FETCHED,
    data: booksLessThan90MoreThan25,
  });
};

const getBooksLessThan90MoreThan25Not80 = async (req, res) => {
  const booksLessThan90MoreThan25Not80 = await Books.find({
    $and: [
      { noOfPage: { $gt: 25 } },
      { noOfPage: { $lt: 90 } },
      { noOfPage: { $ne: 80 } },
    ],
  });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.FETCHED,
    data: booksLessThan90MoreThan25Not80,
  });
};

const getBooksPagesZero = async (req, res) => {
  const booksPagesZero = await Books.find({ noOfPage: { $eq: 0 } });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.FETCHED,
    data: booksPagesZero,
  });
};

const getBooksReleasedYear2015and2001 = async (req, res) => {
  const booksReleasedYear2015and2001 = await Books.find({
    $or: [{ releasedYear: { $eq: 2015 } }, { releasedYear: { $eq: 2001 } }],
  });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.FETCHED,
    data: booksReleasedYear2015and2001,
  });
};

const sortBooksByName = async (req, res) => {
  const books = await Books.find({}).sort({ bookName: 1 });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.SORT,
    data: books,
  });
};

const sortBooksByPrice = async (req, res) => {
  const books = await Books.find({}).sort({ bookPrice: 1 });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.SORT,
    data: books,
  });
};

const sortBooksByAuthor = async (req, res) => {
  const books = await Books.find({}).sort({ bookAuthor: 1 });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.SORT,
    data: books,
  });
};

const sortBooksByNoOfPages = async (req, res) => {
  const books = await Books.find({}).sort({ noOfPage: 1 });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.SORT,
    data: books,
  });
};

const sortBooksByCategory = async (req, res) => {
  const books = await Books.find({}).sort({ bookCategory: 1 });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.SORT,
    data: books,
  });
};

const sortBooksByReleasedYear = async (req, res) => {
  const books = await Books.find({}).sort({ releasedYear: 1 });

  return res.json({
    message: RESPONSE_MESSAGE.SUCCESS.SORT,
    data: books,
  });
};

const deleteBookByBookId = async (req, res, bookId) => {
  if (!bookId)
    return res.status(400).json({
      status: 400,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });

  const book = await Books.findOneAndDelete({ bookId });
  const books = await Books.find({});

  if (book) {
    return res.json({
      status: 200,
      message: RESPONSE_MESSAGE.SUCCESS.DELETED,
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

  const book = await Books.findOneAndDelete({ bookName });

  const books = await Books.find({});

  if (book) {
    return res.json({
      status: 200,
      message: RESPONSE_MESSAGE.SUCCESS.DELETED,
      data: books,
    });
  } else {
    return res.status(400).json({
      status: 400,
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
    });
  }
};

const deleteBookByBookDescAndAuthor = async (req, res, bookDesc, bookAuthor) => {
  if (!bookDesc || !bookAuthor)
    return res.status(400).json({
      status: 400,
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
    });

  const book = await Books.findOneAndDelete({ bookDesc, bookAuthor });

  const books = await Books.find({});

  if (book) {
    return res.json({
      status: 200,
      message: RESPONSE_MESSAGE.SUCCESS.DELETED,
      data: books,
    });
  } else {
    return res.status(400).json({
      status: 400,
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
    });
  }
};

const deleteBookByBookNameAndCategory = async (req, res, bookName, bookCategory) => {
  if (!bookName || !bookCategory)
    return res.status(400).json({
      status: 400,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });

  const book = await Books.findOneAndDelete({ bookName, bookCategory });

  const books = await Books.find({});

  if (book) {
    return res.json({
      status: 200,
      message: RESPONSE_MESSAGE.SUCCESS.DELETED,
      data: books,
    });
  } else {
    return res.status(400).json({
      status: 400,
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
    });
  }
};

const updateBookByName = async (req, res, bookName) => {
  const body = req.body;

  const book = await Books.findOne({ bookName });

  if (!book)
    return res.status(400).json({
      status: 400,
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
    });

  book.bookName = body.bookName;

  await book.save();

  const books = await Books.find({});

  return res.json({
    status: 200,
    message: RESPONSE_MESSAGE.SUCCESS.UPDATED,
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

  const book = await Books.findOne({ bookName, bookAuthor });

  if (!book)
    return res.status(400).json({
      status: 400,
      message: RESPONSE_MESSAGE.ERROR.NOT_FOUND,
    });

  book.bookName = body.bookName;
  book.bookAuthor = body.bookAuthor;

  await book.save();

  const books = await Books.find({});

  return res.json({
    status: 200,
    message: RESPONSE_MESSAGE.SUCCESS.UPDATED,
    data: books,
  });
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

export const deleteBooks = async (req, res) => {
  const query = req.query;
  const { type } = req.params;

  if (type === "id" && query.id) {
    await deleteBookByBookId(req, res, query.id);
  } else if (type === "name" && query.name) {
    await deleteBookByBookName(req, res, query.name);
  } else if (type === "descAndAuthor" && query.desc && query.author) {
    await deleteBookByBookDescAndAuthor(req, res, query.desc, query.author)
  } else if (type === "nameAndCategory" && query.name && query.category) {
    await deleteBookByBookNameAndCategory(req, res, query.name, query.category)
  } else {
    return res.json({
      success: false,
      message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST,
    });
  }
};

export const updateBooks = async (req, res) => {
    const query = req.query;
    const { type } = req.params

    console.log(query);
    console.log(type);
    if(type === 'name' && query.name) {
        await updateBookByName(req, res, query.name)
    } else if(type === 'nameAndAuthor' && query.name && query.author) {
        await updateBookByNameAndAuthor(req, res, query.name, query.author)
    } else {
        return res.json({
            success: false,
            message: RESPONSE_MESSAGE.ERROR.BAD_REQUEST
        })
    }
}