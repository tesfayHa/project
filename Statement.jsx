import "./../style/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../branch/context/AuthContext";
import { useContext } from "react";
import { base_url } from "../api/Axios";
import * as React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
const Statements = () => {
  const [statementData, setStatementData] = useState([]);
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const activityLogs = await axios.get(`${base_url}users/statement`, {
        headers: { Authorization: `Bearer ${token.token}` },
      });

      setStatementData(activityLogs.data.results);
    })();
  }, []);
  let i = 0;
  const listOfStatements = statementData.map((statement) => {
    return {
      id: statement.id,
      type: statement.type === "DEBIT" ? "-" : "+",
      transaction_type: statement.transaction_type,
      amount: statement.amount,
      reference: statement.reference,
      other_party: statement.other_party,
      other_party_name: statement.other_party_name,
      initiator: statement.initiator,
      initiator_name: statement.initiator_name,
      description: statement.description,
      status: statement.status,
      updated_at: new Date(statement.updated_at).toLocaleString(),
    };
  });
  console.log(listOfStatements);
  const statementColumn = [
    // { field: "id", headerName: "ID", width: 70 },

    {
      field: "transaction_type",
      headerName: "Transaction Type",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={`cellsWithFields `}>
            {params.row.transaction_type}
          </div>
        );
      },
    },
    {
      field: "initiator_name",
      headerName: "Initiator Name",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={`cellsWithFields `}>{params.row.initiator_name}</div>
        );
      },
    },
    {
      field: "other_party_name",
      headerName: "Other Party Name",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={`cellsWithFields `}>
            {params.row.other_party_name}
          </div>
        );
      },
    },


    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithType ${params.row.type}`}>
            {params.row.type} {params.row.amount}
          </div>
        );
      },
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`cellsWithFields `}>{params.row.updated_at}</div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  const detailHandler = (statements) => {
    console.log(statements);
    navigate("/statement/statementDetail", {
      state: { statement: statements },
    });
  };
  const actionColumn = [
    {
      field: "Detail",
      headerName: "Detail",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => detailHandler(params.row)}
            >
              <VisibilityIcon />
            </div>
          </div>
        );
      },
    },

  ];
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar title={"Statements"} />
        <div className="datatable">
          {/* <div className="datatableTitle">Statements</div> */}
          <DataGrid
            rowHeight={40}
            className="datagrid"
            rows={listOfStatements}
            columns={statementColumn.concat(actionColumn)}
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

export default Statements;
