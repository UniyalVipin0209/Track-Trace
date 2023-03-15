import axios from "axios";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
// import { IoMdArrowRoundBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import DisplayDate from "../../DisplayDate";
import { IoMdArrowRoundBack } from "react-icons/io";
const ConfigForDistributionRetailerList = (inputParam) => {
  const parameter = {
    args: inputParam.args,
    fcn: inputParam.fcn,
    defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
  };
  //let endPoint = process.env.REACT_APP_ENDPOINT_CARTONLIST;
  let endPoint =
    "http://20.96.181.1:5000/channels/mychannel/chaincodes/supplychain";
  console.log("endpoint -", endPoint);
  let token = process.env.REACT_APP_TOKEN;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      args: parameter.args,
      fcn: parameter.fcn,
      peer: parameter,
    },
  };
  console.log("Params :", config.params);
  return { endPoint, config };
};
const DistributorList = () => {
  const [distrMaster, setDistrMaster] = useState([]);
  const [infoMessage, setInfoMessage] = useState("");
  const history = useHistory();

  const fetchData = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };

  const handleFetchResponseDistr = async (res, setInfoMessage) => {
    const response = await res.data;
    console.log("Distributor LIST ", res);

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
      let customResponse = [];

      customResponse = response.result?.map((elem, idx) => {
        const responseObject = elem.Record;
        console.log("--- ", responseObject);
        return {
          index: responseObject?.key,
          licenseNumber: responseObject?.licenseNumber,
          retailerName: responseObject?.distributorName,
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
    console.log("test api ", apiResponse);
    apiResponse.then((res) => {
      console.log("ApiResponse...");
      handleFetchResponseDistr(res, setInfoMessage);
    });
    console.log("distrMaster ", distrMaster);
  }, []);
  const columns = [
    {
      key: 1,
      title: "license Number",
      dataIndex: "licenseNumber",
      render: (_licenseNumber) => (
        <span className="productname">{_licenseNumber}</span>
      ),
      hidden: false,
    },
    {
      key: 2,
      title: "Retailer Name",
      dataIndex: "retailerName",
      render: (retailerName) => (
        <span className="productname">{retailerName}</span>
      ),
      hidden: false,
    },
    {
      key: 3,
      title: "Address",
      dataIndex: "registeredAddress",
      hidden: false,
    },
  ];
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
          <span className="main-title">Distributor</span>
        </div>
        <div className="right-date">
          <div>
            <DisplayDate></DisplayDate>
          </div>
        </div>
      </div>

      {infoMessage !== "Error" && distrMaster.length > 0 && (
        <div className="right-body1">
          <div className="row mt-4 mb-2">
            <div className="col-md-12">
              <Table
                size="medium"
                columns={columns}
                dataSource={distrMaster}
                showHeader={true}
              />
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
