import { Router } from 'express'
import { deleteBookByBookDescAndAuthor, deleteBookByBookId, deleteBookByBookName, deleteBookByBookNameAndCategory, getAllBooks, getBookById, getBookByName, getBookByNameAndAuthor, getBooksLessThan90MoreThan25, getBooksLessThan90MoreThan25Not80, getBooksMoreThan100Pages, getBooksPagesZero, getBooksReleasedYear2015and2001, sortBooksByAuthor, sortBooksByCategory, sortBooksByName, sortBooksByNoOfPages, sortBooksByPrice, sortBooksByReleasedYear, updateBookByName, updateBookByNameAndAuthor } from '../Controllers/Books.Controller.js'

const router = Router()

router.get('/getAllBooks', getAllBooks)
router.get('/getBookById/:bookId', getBookById)
router.get('/getBookByName/:bookName', getBookByName)
router.get('/getBookByNameAndAuthor/:bookName/:bookAuthor', getBookByNameAndAuthor)
router.get('/getBooksMoreThan100Pages', getBooksMoreThan100Pages)
router.get('/getBooksLessThan90MoreThan25', getBooksLessThan90MoreThan25)
router.get('/getBooksLessThan90MoreThan25Not80', getBooksLessThan90MoreThan25Not80)
router.get('/getBooksPagesZero', getBooksPagesZero)
router.get('/getBooksReleasedYear2015and2001', getBooksReleasedYear2015and2001)
router.get('/sortBooksByName', sortBooksByName)
router.get('/sortBooksByPrice', sortBooksByPrice)
router.get('/sortBooksByAuthor', sortBooksByAuthor)
router.get('/sortBooksByNoOfPages', sortBooksByNoOfPages)
router.get('/sortBooksByCategory', sortBooksByCategory)
router.get('/sortBooksByReleasedYear', sortBooksByReleasedYear)
router.delete('/deleteBookByBookId/:bookId', deleteBookByBookId)
router.delete('/deleteBookByBookName/:bookName', deleteBookByBookName)
router.delete('/deleteBookByBookDescAndAuthor/:bookDesc/:bookAuthor', deleteBookByBookDescAndAuthor)
router.delete('/deleteBookByBookNameAndCategory/:bookName/:bookCategory', deleteBookByBookNameAndCategory)
router.put('/updateBookByName/:bookName', updateBookByName)
router.put('/updateBookByNameAndAuthor/:bookName/:bookAuthor', updateBookByNameAndAuthor)

export default router