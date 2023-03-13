import React, { useEffect, useState, useReducer } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

import { ConfigForDistributionRetailerList } from "../ApiUtility.js";
import axios from "axios";
//import TableCheckBox from "./TableCheckBox";
import DisplayDate from "../../DisplayDate";

import { Table } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useHistory } from "react-router-dom";

const DistributorList = () => {
  const [infoMessage, setInfoMessage] = useState("Error");
  const [distrMaster, setDistrMaster] = useState();
  const history = useHistory();

  const loginRole = localStorage.getItem("loginRole");

  const columns1 = [
    {
      title: "Distributor",
      dataIndex: "distributorName",
      render: (distributorName) => (
        <span className="productname">{distributorName}</span>
      ),
      hidden: false,
    },
    {
      title: "License",
      dataIndex: "license",
      render: (_license) => <span className="productname">{_license}</span>,
      hidden: false,
    },
    {
      title: "Registered Address",
      dataIndex: "registeredAddress",
      render: (_registeredAddress) => (
        <span className="productname">{_registeredAddress}</span>
      ),
      hidden: false,
    },
  ];

  const columns = columns1.filter((i) => i.hidden === false);
  const fetchData = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };
  const handleFetchResponseDistr = async (res, setInfoMessage) => {
    const response = await res.data;

    if (typeof response === "object" && typeof response.result == "string") {
      if (response.result.includes("error")) setInfoMessage("Error");
    } else if (
      typeof response === "object" &&
      response.error != null &&
      response.errorData != null &&
      response.result.length === 0 &&
      typeof response.result == "string"
    ) {
      setInfoMessage("");
    } else {
      setInfoMessage("");
      let customResponse = [];

      customResponse = response.result?.map((elem, idx) => {
        const responseObject = elem.Record;
        // console.log("responseObject ", elem.Record);

        return {
          index: responseObject?.key,
          distributorName: responseObject?.distributorName,
          license: responseObject?.license,
          registeredAddress: responseObject?.registeredAddress,
        }; //
      });
      console.log("customResponse ", customResponse);
      setDistrMaster(customResponse);
    }
  };
  useEffect(() => {
    const inputParameter = {
      fcn: "getDistributor",
      args: "test",
    };
    var { endPoint, config } =
      ConfigForDistributionRetailerList(inputParameter);
    var apiResponse = fetchData(endPoint, config);
    apiResponse.then((res) => {
      handleFetchResponseDistr(res, setInfoMessage);
    });
    console.log("distrMaster ", distrMaster);
  }, []);
  //

  return (
    <div className="full-layout-right-body mb-3">
      <div className="top-right-header">
        <div className="_40_percent pagetitle">
          <span className="pagetitle">Distributor List</span>
        </div>
        <div className="_60_percent" style={{ position: "relative" }}></div>
      </div>
      <div className="mid-right-body mt-3">
        <div className="left-title">
          <IoMdArrowRoundBack
            onClick={() => {
              setTimeout(3000);
              history.goBack();
            }}
            style={{ cursor: "pointer" }}
          ></IoMdArrowRoundBack>
          {"   "}
          <span className="main-title">Distributor's List</span>
        </div>
        <div className="right-date">
          {loginRole === "administratorunit" && (
            <div>
              <button
                onClick={() => {
                  history.push("/CreateDistributor");
                }}
              >
                Create Distributor
              </button>
            </div>
          )}

          <div>
            <DisplayDate></DisplayDate>
          </div>
        </div>
      </div>

      {distrMaster.length > 0 && (
        <div className="right-body1">
          <div className="row mt-4 mb-2">
            <div className="col-md-12">
              {/* <Table size="medium" dataSource={distrMaster} showHeader={true} /> */}
            </div>
          </div>
        </div>
      )}

      {infoMessage !== "Error" && distrMaster.length === 0 && (
        <div className="right-body">
          <div className="row mt-4 mb-2">
            <div className="col-md-12">
              <span style={{ textAlign: "center", verticalAlign: "middle" }}>
                There is no data available.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistributorList;
