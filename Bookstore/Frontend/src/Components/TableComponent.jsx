/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const TableComponent = ({ tableDataJson }) => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setTableData(tableDataJson);
  }, [tableDataJson, tableData]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 800 }}>Book Id</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Book Name</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Book Desc</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Book Author</TableCell>
              <TableCell style={{ fontWeight: 800 }}>No Of Page</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Book Category</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Book Price</TableCell>
              <TableCell style={{ fontWeight: 800 }}>Released Year</TableCell>
            </TableRow>
          </TableHead>
          {tableData.length > 0 ? (
            <TableBody>
              {tableData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((book) => (
                  <TableRow key={book.bookId}>
                    <TableCell>{book.bookId}</TableCell>
                    <TableCell>{book.bookName}</TableCell>
                    <TableCell>{book.bookDesc}</TableCell>
                    <TableCell>{book.bookAuthor}</TableCell>
                    <TableCell>{book.noOfPage}</TableCell>
                    <TableCell>{book.bookCategory}</TableCell>
                    <TableCell>{book.bookPrice}</TableCell>
                    <TableCell>{book.releasedYear}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <div className="flex items-center justify-center px-16">
              <Alert severity="error" className="w-full">
                No Data Found
              </Alert>
            </div>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={10}
        component={"div"}
        count={tableData.length}
        rowsPerPage={10}
        page={page}
        onPageChange={(event, value) => handleChangePage(value)}
      />
    </>
  );
};

export default TableComponent;
