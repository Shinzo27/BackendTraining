import React, { useEffect, useState } from "react";
import Buttons from "../Components/Buttons";
import TableComponent from "../Components/TableComponent";
import { Snackbar } from "@mui/material";
import axios from "axios";

const Index = () => {
  const [renderData, setRenderData] = useState([]);

  useEffect(()=> {
    const fetchApi = async() => {
        const { data } = await axios.get('http://localhost:8000/api/books/getAllBooks')
        setRenderData(data.data)
    }
    fetchApi()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Buttons
        setRenderData={setRenderData}
      />
      <TableComponent tableDataJson={renderData} />
    </div>
  )
};

export default Index;
