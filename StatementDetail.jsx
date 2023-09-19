import "./../style/detail.scss";
import Sidebar from "./../components/sidebar/Sidebar";
import Navbar from "./../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const StatementDetail = () => {
  const location = useLocation();
  const statementDetailData = location.state.statement;
  console.log(statementDetailData);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Statement Detail</h1>
            <div className="item" style={{ "margin-left": "60px" }}>
              <div className="details">
                {/* <div className="detailItem">
                  <span className="itemKey">Transaction ID:</span>
                  <span className="itemValue">{statementDetailData.id}</span>
                </div> */}
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">
                    {statementDetailData.id}
                  </span>
                </div>
               <div className="detailItem">
                  <span className="itemKey">Reference:</span>
                  <span className="itemValue">
                    {statementDetailData.reference}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Transaction Type:</span>
                  <span className="itemValue">
                    {statementDetailData.transaction_type}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Other Party:</span>
                  <span className="itemValue">
                    {statementDetailData.other_party}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Other Party Name:</span>
                  <span className="itemValue">
                    {statementDetailData.other_party_name}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Initiator:</span>
                  <span className="itemValue">
                    {statementDetailData.initiator}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Initiator Name:</span>
                  <span className="itemValue">
                    {statementDetailData.initiator_name}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">
                    {statementDetailData.description}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Amount:</span>
                  <span className="itemValue">
                    {statementDetailData.amount}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">
                    {statementDetailData.status}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Updated At :</span>
                  <span className="itemValue">
                    {statementDetailData.updated_at}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementDetail;
