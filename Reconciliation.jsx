import "./../style/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../branch/context/AuthContext";
import { useContext } from "react";
import { base_url } from "./../api/Axios";
import * as React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
const Reconciliation = () => {
  const [reconciliationData, setReconciliationData] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${base_url}users/reconciliation`, {
        headers: { Authorization: `Bearer ${token.token}` },
      });

      setReconciliationData(response.data.results);
    })();
  }, []);
  let i = 0;
  console.log(reconciliationData);
  const listOfReconciliations = reconciliationData.map((reconciliation) => {
    return {
      id: Number(++i),
      initiator: reconciliation.initiator,
      credits: reconciliation.credits,
      debits: reconciliation.debits,
      difference: reconciliation.credits - reconciliation.debits,
    };
  });

  const reconciliationColumn = [
    // { field: "id", headerName: "ID", width: 70 },

    {
      field: "initiator",
      headerName: "Initiator",
      width: 150,
      renderCell: (params) => {
        return <div className={`cellsWithFields `}>{params.row.initiator}</div>;
      },
    },
    {
      field: "credits",
      headerName: "Cash Out",
      width: 150,
      renderCell: (params) => {
        return <div className={`cellsWithFields `}>{params.row.credits}</div>;
      },
    },

    {
      field: "debits",
      headerName: "Cash In",
      width: 100,
      renderCell: (params) => {
        return <div className={`cellsWithFields `}>{params.row.debits}</div>;
      },
    },
    {
      field: "difference",
      headerName: "Difference",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={`cellsWithFields `}>{params.row.difference}</div>
        );
      },
    },
  ];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar title={"Reconciliation"}/>
        <div className="datatable">
          {/* <div className="datatableTitle">Reconciliation</div> */}
          <DataGrid
            rowHeight={40}
            className="datagrid"
            rows={listOfReconciliations}
            columns={reconciliationColumn}
            pageSize={9}
            rowsPerPageOptions={[9]}
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

export default Reconciliation;
