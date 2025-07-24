import Books from "../Models/Books.js"


export const getAllBooks = async(req, res) => {
    const books = await Books.find({})

    return res.json({
        data: books
    })
}

export const getBookById = async(req, res) => {
    const { bookId } = req.params

    if(!bookId) return res.status(400).json({
        status: 400,
        message: "No BookId Found!"
    })

    const bookById = await Books.findOne({ bookId })

    if(!bookById) {
        return res.status(400).json({
            data: [],
        })
    }
    return res.json({
        data: bookById
    })
}

export const getBookByName = async(req, res) => {
    const { bookName } = req.params
    
    if(!bookName) return res.status(400).json({
        status: 400,
        message: "No Book Name Found!"
    })

    const bookByName = await Books.findOne({ bookName })

    if(!bookByName) {
        return res.status(400).json({
            data: []
        })
    }

    return res.json({
        data: bookByName
    })
}

export const getBookByNameAndAuthor = async(req, res) => {
    const { bookName, bookAuthor } = req.params

    if(!bookName || !bookAuthor) return res.status(400).json({
        status: 400,
        message: "No Book Name or Book Author Found!"
    })

    const bookByNameAndAuthor = await Books.findOne({ bookName, bookAuthor })

    if(!bookByNameAndAuthor) {
        return res.status(400).json({
            data: []
        })
    }

    return res.json({
        data: bookByNameAndAuthor
    })
}

export const getBooksMoreThan100Pages = async(req, res) => {
    const bookMoreThan100Pages = await Books.find({ noOfPage: { $gt: 100}})

    return res.json({
        data: bookMoreThan100Pages
    })
}

export const getBooksLessThan90MoreThan25 = async(req, res) => {
    const booksLessThan90MoreThan25 = await Books.find({
        $and: [
            { noOfPage: { $gt: 25}},
            { noOfPage: { $lt: 90}},
        ]
    })

    return res.json({
        data: booksLessThan90MoreThan25
    })
}

export const getBooksLessThan90MoreThan25Not80 = async(req, res) => {
    const booksLessThan90MoreThan25Not80 = await Books.find({
        $and: [
            { noOfPage: { $gt: 25 }},
            { noOfPage: { $lt: 90 }},
            { noOfPage: { $ne: 80 }}
        ]
    })

    return res.json({
        data: booksLessThan90MoreThan25Not80
    })
}

export const getBooksPagesZero = async(req, res) => {
    const booksPagesZero = await Books.find({ noOfPage: { $eq: 0}})

    return res.json({
        data: booksPagesZero
    })
}

export const getBooksReleasedYear2015and2001 = async(req, res) => {
    const booksReleasedYear2015and2001 = await Books.find({
        $or: [
            { releasedYear: { $eq: 2015 }},
            { releasedYear: { $eq: 2001 }},
        ]
    })

    return res.json({
        data: booksReleasedYear2015and2001
    })
}

export const sortBooksByName = async(req, res) => {
    const books = await Books.find({})

    const sortedBooks = books.sort((a,b) => a.bookName.localeCompare(b.bookName))

    return res.json({
        data: sortedBooks
    })
}

export const sortBooksByPrice = async(req, res) => {
    const books = await Books.find({})

    const sortedBooks = books.sort((a,b) => a.bookPrice - b.bookPrice)

    return res.json({
        data: sortedBooks
    })
}

export const sortBooksByAuthor = async(req, res) => {
    const books = await Books.find({})

    const sortedBooks = books.sort((a,b) => a.bookAuthor.localeCompare(b.bookAuthor))

    return res.json({
        data: sortedBooks
    })
}

export const sortBooksByNoOfPages = async(req, res) => {
    const books = await Books.find({})

    const sortedBooks = books.sort((a,b) => a.noOfPage - b.noOfPage)

    return res.json({
        data: sortedBooks
    })
}

export const sortBooksByCategory = async(req, res) => {
    const books = await Books.find({})

    const sortedBooks = books.sort((a,b) => a.bookCategory.localeCompare(b.bookCategory))

    return res.json({
        data: sortedBooks
    })
}

export const sortBooksByReleasedYear = async(req, res) => {
    const books = await Books.find({})

    const sortedBooks = books.sort((a,b) => a.releasedYear - b.releasedYear)

    return res.json({
        data: sortedBooks
    })
}

export const deleteBookByBookId = async(req, res) => {
    const { bookId } = req.params

    if(!bookId) return res.status(400).json({
        status: 400,
        message: "Book Not Found"
    })

    const book = await Books.findOneAndDelete({ bookId })
    const books = await Books.find({})

    if(book) {
        return res.json({
            status: 200,
            message: "Book Deleted Successfully!",
            data: books
        })
    } else {
        return res.status(400).json({
            status: 400,
            message: "Book not found!"
        })
    }
}

export const deleteBookByBookName = async(req, res) => {
    const { bookName } = req.params

    if(!bookName) return res.status(400).json({
        status: 400,
        message: "Book Name Not Found"
    })

    const book = await Books.findOneAndDelete({ bookName })
    
    const books = await Books.find({})

    if(book) {
        return res.json({
            status: 200,
            message: "Book Deleted Successfully!",
            data: books
        })
    } else {
        return res.status(400).json({
            status: 400,
            message: "Book not found!"
        })
    }
}

export const deleteBookByBookDescAndAuthor = async(req, res) => {
    const { bookDesc, bookAuthor } = req.params

    if( !bookDesc || !bookAuthor ) return res.status(400).json({
        status: 400,
        message: "Book Not Found"
    })

    const book = await Books.findOneAndDelete({ bookDesc, bookAuthor })

    const books = await Books.find({})
    
    if(book) {
        return res.json({
            status: 200,
            message: "Book Deleted Successfully!",
            data: books
        })
    } else {
        return res.status(400).json({
            status: 400,
            message: "Book not found!"
        })
    }
}

export const deleteBookByBookNameAndCategory = async(req, res) => {
    const { bookName, bookCategory } = req.params

    if( !bookName || !bookCategory ) return res.status(400).json({
        status: 400,
        message: "Book Not Found"
    })

    const book = await Books.findOneAndDelete({ bookName, bookCategory })

    const books = await Books.find({})

    if(book) {
        return res.json({
            status: 200,
            message: "Book Deleted Successfully!",
            data: books
        })
    } else {
        return res.status(400).json({
            status: 400,
            message: "Book not found!"
        })
    }
}

export const updateBookByName = async(req, res) => {
    const { bookName } = req.params

    const body = req.body

    const book = await Books.findOne({ bookName })

    if(!book) return res.status(400).json({
        status: 400,
        message: "No book found!"
    })

    book.bookName = body.bookName

    await book.save()

    const books = await Books.find({})

    return res.json({
        status: 200,
        message: "Book updated successfully!",
        data: books
    })
}

export const updateBookByNameAndAuthor = async(req, res) => {
    const { bookName, bookAuthor } = req.params

    const body = req.body
    
    if(!body.bookName || !body.bookAuthor) return res.status(400).json({
        status: 400,
        message: "Enter data properly!"
    })

    const book = await Books.findOne({ bookName, bookAuthor })

    if(!book) return res.status(400).json({
        status: 400,
        message: "No book found!"
    })

    book.bookName = body.bookName
    book.bookAuthor = body.bookAuthor

    await book.save()

    const books = await Books.find({})

    return res.json({
        status: 200,
        message: "Book updated successfully!",
        data: books
    })
}