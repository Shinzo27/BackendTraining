/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const buttonLogicService = (setRenderData) => {
  // Show book pages more than 100
  const showBookPagesMoreThan100 = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/books/getBooksMoreThan100Pages"
    );
    setRenderData(data.data);
  };

  // Show All
  const showAll = async () => {
    const { data } = await axios.get("http://localhost:8000/api/books/getAllBooks");
    setRenderData(data.data);
  };

  // show book pages less than 90 more than 25
  const showBookPagesLessThan90MoreThan25 = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/books/getBooksLessThan90MoreThan25"
    );
    setRenderData(data.data);
  };

  // show book pages less than 90 more than 25 not 80
  const showBookPagesLessThan90MoreThan25Not80 = async () => {
    const {data } = await axios.get(
      "http://localhost:8000/api/books/getBooksLessThan90MoreThan25Not80"
    );
    setRenderData(data.data);
  };

  // Show book with 0 page
  const showBookWith0Page = async () => {
    const { data } = await axios.get("http://localhost:8000/api/books/getBooksPagesZero");
    setRenderData(data.data);
  };

  // Show book by release year
  const showBookByReleaseYear = async () => {
    const { data } = await axios.get("http://localhost:8000/api/books/getBooksReleasedYear2015and2001");
    setRenderData(data.data);
  };

  // Sort By Name
  const sortByName = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/books/sortBooksByName"
    );
    setRenderData(data.data);
  };

  // Sort by Book Price
  const sortByBookPrice = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/books/sortBooksByPrice"
    );
    setRenderData( data.data);
  };

  // Sort By Book Author
  const sortByBookAuthor = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/books/sortBooksByAuthor"
    );
    setRenderData(data.data);
  };

  // Sort By No of Pages
  const sortByNoOfPages = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/books/sortBooksByNoOfPages"
    );
    setRenderData(data.data);
  };

  // Sort By Book Category
  const sortByBookCategory = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/books/sortBooksByCategory"
    );
    setRenderData(data.data);
  };

  // Sort By Release Year
  const sortByReleaseYear = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/books/sortBooksByReleasedYear"
    );
    setRenderData(data.data);
  };

  //Show Book By Id
  const [showBookByIdDialog, setShowBookByIdDialog] = useState(false);

  const handleShowBookById = () => {
    setShowBookByIdDialog(true);
  };

  const handleShowBookByIdClose = () => {
    setShowBookByIdDialog(false);
  };

  const handleSubmitShowBookById = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookId = formJson.bookId.trim();
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/books/getBookById/${bookId}`
      );
      data && setRenderData([data.data])
      toast.success("Book found!")
    } catch (error) {
      console.log(error);
      toast.error("Book not found!")
    }
    handleShowBookByIdClose();
  };

  //Show book by name
  const [showBookByNameDialog, setShowBookByNameDialog] = useState(false);

  const handleShowBookByName = () => {
    setShowBookByNameDialog(true);
  };

  const handleShowBookByNameClose = () => {
    setShowBookByNameDialog(false);
  };

  const handleSubmitShowBookByName = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookName = formJson.bookName.trim();

    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/books/getBookByName/${bookName}`
      );
      data && setRenderData([data.data])
      toast.success("Book found!")
    } catch (e) {
      console.log(e);
      toast.error("Book not found!")
    }
    handleShowBookByNameClose();
  };

  // Show book by name and author
  const [showBookByNameAndAuthorDialog, setShowBookByNameAndAuthorDialog] = useState(false);

  const handleShowBookByNameAndAuthor = () => {
    setShowBookByNameAndAuthorDialog(true);
  };

  const handleShowBookByNameAndAuthorClose = () => {
    setShowBookByNameAndAuthorDialog(false);
  };

  const handleSubmitShowBookByNameAndAuthor = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookName = formJson.bookName.trim();
    const bookAuthor = formJson.bookAuthor.trim();

    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/books/getBookByNameAndAuthor/${bookName}/${bookAuthor}`
      );
      data && setRenderData([data.data])
      toast.success("Book found!")
    } catch (error) {
      console.log(error);
      toast.error('Book not found!')
    }
    handleShowBookByNameAndAuthorClose();
  };

  //   Delete Book By Id
  const [deleteBookByIdDialog, setDeleteBookByIdDialog] = useState(false);

  const handleDeleteBookById = () => {
    setDeleteBookByIdDialog(true);
  };

  const handleDeleteBookByIdClose = () => {
    setDeleteBookByIdDialog(false);
  };

  const handleSubmitDeleteBookById = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookId = formJson.bookId.trim();

    try {
      const { data } = await axios.delete(`http://localhost:8000/api/books/deleteBookByBookId/${bookId}`)
      setRenderData(data.data)
      toast.success("Book deleted by Id!")
    } catch (error) {
      console.log(error);
      toast.error("Book not found!")
    }

    handleDeleteBookByIdClose();
  };

  //   Delete Book By Name
  const [deleteBookByNameDialog, setDeleteBookByNameDialog] = useState(false);

  const handleDeleteBookByName = () => {
    setDeleteBookByNameDialog(true);
  };

  const handleDeleteBookByNameClose = () => {
    setDeleteBookByNameDialog(false);
  };

  const handleSubmitDeleteBookByName = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookName = formJson.bookName.trim();

    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/books/deleteBookByBookName/${bookName}`
      );
      setRenderData(data.data)
      toast.success("Book deleted by Name!")
    } catch (error) {
      console.log(error);
      toast.error("Book not found!")
    }
    handleDeleteBookByNameClose();
  };

  //   delete Book By Desc And Author
  const [deleteBookByDescAndAuthorDialog, setDeleteBookByDescAndAuthorDialog] = useState(false);

  const handleDeleteBookByDescAndAuthor = () => {
    setDeleteBookByDescAndAuthorDialog(true);
  };

  const handleDeleteBookByDescAndAuthorClose = () => {
    setDeleteBookByDescAndAuthorDialog(false);
  };

  const handleSubmitDeleteBookByDescAndAuthor = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookAuthor = formJson.bookAuthor.trim();
    const bookDesc = formJson.bookDesc.trim();

    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/books/deleteBookByBookDescAndAuthor/${bookDesc}/${bookAuthor}`
      );
      setRenderData(data.data)
      toast.success("Book deleted by Desc And Author!")
    } catch (error) {
      toast.error("Book not found!")
      console.log(error);
    }
    handleDeleteBookByDescAndAuthorClose();
  };

  // delete Book By Name And Category
  const [deleteBookByNameAndCategory, setDeleteBookByNameAndCategory] = useState(false);

  const handleDeleteBookByNameAndCategory = () => {
    setDeleteBookByNameAndCategory(true);
  };

  const handleDeleteBookByNameAndCategoryClose = () => {
    setDeleteBookByNameAndCategory(false);
  };

  const handleSubmitDeleteBookByNameAndCategory = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookName = formJson.bookName.trim();
    const bookCategory = formJson.bookCategory.trim();

    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/books/deleteBookByBookNameAndCategory/${bookName}/${bookCategory}`
      );
      setRenderData(data.data)
      toast.success('Book deleted by Name And Category!')
    } catch (error) {
      toast.error("Book not found!")
      console.log(error);
    }
    handleDeleteBookByNameAndCategoryClose();
  };

  // update Book By Name
  const [updateBookByName, setUpdateBookByName] = useState(false);

  const handleUpdateBookByName = () => {
    setUpdateBookByName(true);
  };

  const handleUpdateBookByNameClose = () => {
    setUpdateBookByName(false);
  };

  const handleSubmitUpdateBookByName = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookOldName = formJson.bookOldName.trim();
    const bookNewName = formJson.bookNewName.trim();

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/books/updateBookByName/${bookOldName}`, { bookName: bookNewName}
      );
      setRenderData(data.data)
      toast.success("Book updated by name!")
    } catch (error) {
      toast.error("Book not found!")
      console.log(error);
    }

    handleUpdateBookByNameClose();
  };

  // update Book By Name And Author
  const [updateBookByNameAndAuthor, setUpdateBookByNameAndAuthor] = useState(false);

  const handleUpdateBookByNameAndAuthor = () => {
    setUpdateBookByNameAndAuthor(true);
  };

  const handleUpdateBookByNameAndAuthorClose = () => {
    setUpdateBookByNameAndAuthor(false);
  };

  const handleSubmitUpdateBookByNameAndAuthor = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookOldName = formJson.bookOldName.trim();
    const bookNewName = formJson.bookNewName.trim();
    const bookOldAuthor = formJson.bookOldAuthor.trim();
    const bookNewAuthor = formJson.bookNewAuthor.trim();

    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/books/updateBookByNameAndAuthor/${bookOldName}/${bookOldAuthor}`, { bookName: bookNewName, bookAuthor: bookNewAuthor}
      );
      setRenderData(data.data)
      toast.success("Book updated by Name and Author!")
    } catch (error) {
        toast.error("Book not found!")
        console.log(error);
    }

    handleUpdateBookByNameAndAuthorClose();
  };

  return {
    showBookPagesMoreThan100,
    showAll,
    showBookPagesLessThan90MoreThan25,
    showBookPagesLessThan90MoreThan25Not80,
    showBookWith0Page,
    showBookByReleaseYear,
    sortByName,
    sortByBookPrice,
    sortByBookAuthor,
    sortByNoOfPages,
    sortByBookCategory,
    sortByReleaseYear,
    showBookByIdDialog,
    handleShowBookById,
    handleShowBookByIdClose,
    handleSubmitShowBookById,
    showBookByNameDialog,
    handleShowBookByName,
    handleShowBookByNameClose,
    handleSubmitShowBookByName,
    showBookByNameAndAuthorDialog,
    handleShowBookByNameAndAuthor,
    handleShowBookByNameAndAuthorClose,
    handleSubmitShowBookByNameAndAuthor,
    deleteBookByIdDialog,
    handleDeleteBookById,
    handleDeleteBookByIdClose,
    handleSubmitDeleteBookById,
    deleteBookByNameDialog,
    handleDeleteBookByName,
    handleDeleteBookByNameClose,
    handleSubmitDeleteBookByName,
    deleteBookByDescAndAuthorDialog,
    handleDeleteBookByDescAndAuthor,
    handleDeleteBookByDescAndAuthorClose,
    handleSubmitDeleteBookByDescAndAuthor,
    deleteBookByNameAndCategory,
    handleDeleteBookByNameAndCategory,
    handleDeleteBookByNameAndCategoryClose,
    handleSubmitDeleteBookByNameAndCategory,
    updateBookByName,
    handleUpdateBookByName,
    handleUpdateBookByNameClose,
    handleSubmitUpdateBookByName,
    updateBookByNameAndAuthor,
    handleUpdateBookByNameAndAuthor,
    handleUpdateBookByNameAndAuthorClose,
    handleSubmitUpdateBookByNameAndAuthor,
  };
};
