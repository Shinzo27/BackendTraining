import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { buttonLogicService } from "../Services/ButtonServices";

const Buttons = ({
  setRenderData,
}) => {
  const {
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
    handleSubmitUpdateBookByNameAndAuthor
  } = buttonLogicService(setRenderData);

  const buttonData = [
    {
      divStyle: "flex items-center justify-start gap-2",
      buttons: [
        {
          color: "success",
          variant: "contained",
          onClick: handleUpdateBookByName,
          value: "Update By Name",
        },
        {
          color: "success",
          variant: "contained",
          onClick: handleUpdateBookByNameAndAuthor,
          value: "Update By Name And Author",
        },
        {
          color: "success",
          variant: "contained",
          onClick: handleDeleteBookById,
          value: "Delete By Book Id",
        },
        {
          color: "success",
          variant: "contained",
          onClick: handleDeleteBookByName,
          value: "Delete By Book Name",
        },
        {
          color: "success",
          variant: "contained",
          onClick: handleDeleteBookByDescAndAuthor,
          value: "Delete By Book Desc and Author",
        },
      ],
    },
    {
      divStyle: "flex items-center justify-start gap-2",
      buttons: [
        {
          color: "success",
          variant: "contained",
          onClick: handleDeleteBookByNameAndCategory,
          value: "Delete By Book Name And Category",
        },
        {
          color: "success",
          variant: "contained",
          onClick: showAll,
          value: "Show All",
        },
      ],
    },
    {
      divStyle: "flex items-center justify-start gap-2",
      buttons: [
        {
          color: "success",
          variant: "contained",
          onClick: handleShowBookById,
          value: "Show Book By Id",
        },
        {
          color: "success",
          variant: "contained",
          onClick: handleShowBookByName,
          value: "Show Book By Name",
        },
        {
          color: "success",
          variant: "contained",
          onClick: handleShowBookByNameAndAuthor,
          value: "Show Book By Name And Author",
        },
        {
          color: "success",
          variant: "contained",
          onClick: showBookPagesMoreThan100,
          value: "Show Book pages more than 100",
        },
      ],
    },
    {
      divStyle: "flex items-center justify-start gap-2",
      buttons: [
        {
          color: "success",
          variant: "contained",
          onClick: showBookPagesLessThan90MoreThan25,
          value: "Show book pages less than 90 More than 25",
        },
        {
          color: "success",
          variant: "contained",
          onClick: showBookPagesLessThan90MoreThan25Not80,
          value: "Show book pages less than 90 More than 25 but not 80",
        },
        {
          color: "success",
          variant: "contained",
          onClick: showBookWith0Page,
          value: "Show Book pages zero",
        },
      ],
    },
    {
      divStyle: "flex items-center justify-start gap-2",
      buttons: [
        {
          color: "success",
          variant: "contained",
          onClick: showBookByReleaseYear,
          value: "Show book released year 2001 and 2015",
        },
        {
          color: "success",
          variant: "contained",
          onClick: sortByName,
          value: "Sort By Book Name",
        },
        {
          color: "success",
          variant: "contained",
          onClick: sortByBookPrice,
          value: "Sort By Book Price",
        },
        {
          color: "success",
          variant: "contained",
          onClick: sortByBookAuthor,
          value: "Sort By Book Author",
        },
        {
          color: "success",
          variant: "contained",
          onClick: sortByNoOfPages,
          value: "Sort By Books No of Pages",
        },
      ],
    },
    {
      divStyle: "flex items-center justify-start gap-2",
      buttons: [
        {
          color: "success",
          variant: "contained",
          onClick: sortByBookCategory,
          value: "Sort By Book Category",
        },
        {
          color: "success",
          variant: "contained",
          onClick: sortByReleaseYear,
          value: "Sort By Book Released Year",
        },
      ],
    },
  ];

  const dialogData = [
    {
      dialogOpen: showBookByIdDialog,
      dialogClose: handleShowBookByIdClose,
      dialogTitle: "Enter the id number of book:",
      onSubmit: handleSubmitShowBookById,
      fields: [
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookId",
          label: "Book Id",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
      ],
      buttonTitle: "Get Book",
    },
    {
      dialogOpen: showBookByNameDialog,
      dialogClose: handleShowBookByNameClose,
      dialogTitle: "Enter the name of book:",
      onSubmit: handleSubmitShowBookByName,
      fields: [
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookName",
          label: "Book Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
      ],
      buttonTitle: "Get Book",
    },
    {
      dialogOpen: showBookByNameAndAuthorDialog,
      dialogClose: handleShowBookByNameAndAuthorClose,
      dialogTitle: "Enter the name and author of book:",
      onSubmit: handleSubmitShowBookByNameAndAuthor,
      fields: [
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookName",
          label: "Book Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookAuthor",
          label: "Author Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
      ],
      buttonTitle: "Get Book",
    },
    {
      dialogOpen: deleteBookByIdDialog,
      dialogClose: handleDeleteBookByIdClose,
      dialogTitle: "Enter the Id of book:",
      onSubmit: handleSubmitDeleteBookById,
      fields: [
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookId",
          label: "Book Id",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
      ],
      buttonTitle: "Delete Book",
    },
    {
      dialogOpen: deleteBookByNameDialog,
      dialogClose: handleDeleteBookByNameClose,
      dialogTitle: "Enter the name of book:",
      onSubmit: handleSubmitDeleteBookByName,
      fields: [
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookName",
          label: "Book Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
      ],
      buttonTitle: "Delete Book",
    },
    {
      dialogOpen: deleteBookByDescAndAuthorDialog,
      dialogClose: handleDeleteBookByDescAndAuthorClose,
      dialogTitle: "Enter the Description and Author of book:",
      onSubmit: handleSubmitDeleteBookByDescAndAuthor,
      fields: [
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookDesc",
          label: "Book Description",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookAuthor",
          label: "Book Author",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
      ],
      buttonTitle: "Delete Book",
    },
    {
      dialogOpen: deleteBookByNameAndCategory,
      dialogClose: handleDeleteBookByNameAndCategoryClose,
      dialogTitle: "Enter the Name and Category of book:",
      onSubmit: handleSubmitDeleteBookByNameAndCategory,
      fields: [
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookName",
          label: "Book Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookCategory",
          label: "Book Category",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
      ],
      buttonTitle: "Delete Book",
    },
    {
      dialogOpen: updateBookByName,
      dialogClose: handleUpdateBookByNameClose,
      dialogTitle: "Enter the Old And New Name of book:",
      onSubmit: handleSubmitUpdateBookByName,
      fields: [
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookOldName",
          label: "Old Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookNewName",
          label: "New Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
      ],
      buttonTitle: "Update Book",
    },
    {
      dialogOpen: updateBookByNameAndAuthor,
      dialogClose: handleUpdateBookByNameAndAuthorClose,
      dialogTitle: "Enter the Old And New Name And Author of book:",
      onSubmit: handleSubmitUpdateBookByNameAndAuthor,
      fields: [
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookOldName",
          label: "Old Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookNewName",
          label: "New Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookOldAuthor",
          label: "Old Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
        {
          required: true,
          margin: "dense",
          id: "name",
          name: "bookNewAuthor",
          label: "New Name",
          type: "text",
          variant: "standard",
          fullWidth: true,
        },
      ],
      buttonTitle: "Update Book",
    },
  ];

  return (
    <>
      <div className="mt-10 mx-5 mb-5 flex gap-5 flex-col">
        {buttonData.map((div, index) => (
          <div key={index} className={div.divStyle}>
            {div.buttons.map((button, index) => (
              <Button
                key={index}
                color={button.color}
                variant={button.variant}
                onClick={button.onClick}
              >
                {button.value}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {dialogData.map((dialog, index) => (
        <Dialog
          key={index}
          open={dialog.dialogOpen}
          onClose={dialog.dialogClose}
        >
          <DialogTitle>{dialog.dialogTitle}</DialogTitle>
          <DialogContent sx={{ paddingBottom: 0 }}>
            <DialogContentText>{dialog.dialogTitle}</DialogContentText>
            <form onSubmit={dialog.onSubmit}>
              {dialog.fields.map((field, index) => (
                <TextField key={index} {...field} />
              ))}
              <DialogActions>
                <Button onClick={dialog.dialogClose}>Cancel</Button>
                <Button type="submit">{dialog.buttonTitle}</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};

export default Buttons;
