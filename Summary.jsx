import "./../style/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../branch/context/AuthContext";
import { useContext } from "react";
import { base_url } from "./../api/Axios";
import * as React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
const Summary = () => {
  const [summaryData, setSummaryData] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${base_url}users/summary`, {
        headers: { Authorization: `Bearer ${token.token}` },
      });

      setSummaryData(response.data.results);
    })();
  }, []);
  console.log(summaryData)
  let i = 0;
  const ListOfSummary = summaryData.map((summary) => {
    return {
      id: Number(++i),
      type: summary.type === "DEBIT" ? "-" : "+",
      count: summary.count,
      initiator: summary.initiator,
      process: summary.process,
      total: summary.total,
    };
  });
console.log(ListOfSummary)
  const summaryColumn = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "process",
      headerName: "Process",
      width: 150,
      renderCell: (params) => {
        return <div className={`cellsWithFields `}>{params.row.process}</div>;
      },
    },
    {
      field: "count",
      headerName: "Count",
      width: 150,
      renderCell: (params) => {
        return <div className={`cellsWithFields `}>{params.row.count}</div>;
      },
    },
    {
      field: "initiator",
      headerName: "Initiator",
      width: 150,
      renderCell: (params) => {
        return <div className={`cellsWithFields `}>{params.row.initiator}</div>;
      },
    },
    {
      field: "total",
      headerName: "Total",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithType ${params.row.type}`}>
            {params.row.type} {params.row.total}
          </div>
        );
      },
    },

  ];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
      <Navbar title={"Summary"}/>
        <div className="datatable">
          {/* <div className="datatableTitle">Summary</div> */}
          <DataGrid
            rowHeight={40}
            className="datagrid"
            rows={ListOfSummary}
            columns={summaryColumn}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            sx={{
              boxShadow: 2,
              // border: 2,
              // borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
