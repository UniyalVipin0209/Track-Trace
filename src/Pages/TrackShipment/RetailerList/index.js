import React, { useEffect, useState, useReducer } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

import { ConfigForDistributionRetailerList } from "../ApiUtility.js";
import axios from "axios";
import DisplayDate from "../../DisplayDate";
import { Table } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import MapContainer from "../../MapContainer/index.js";

const RetailerList = () => {
  const [itemData, setItemData] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [infoMessage, setInfoMessage] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState({});

  const [pageText, setPageText] = useState();
  const loginRole = localStorage.getItem("loginRole");

  const history = useHistory();
  const columns1 = [
    {
      key: 1,
      title: "Carton",
      dataIndex: "cartonId",
      render: (catronId) => <span className="productname">{catronId}</span>,
      hidden: false,
    },

    {
      key: 2,
      title: "Product Name",
      dataIndex: "productName",
      render: (prodName) => <span className="productname">{prodName}</span>,
      hidden: false,
    },
    {
      key: 3,
      title: "Quantity",
      dataIndex: "quantity",
      //render: (qty) => <span className="productname">{qty} Units</span>,
      render(qty, record) {
        return {
          props: {
            style: { color: parseInt(qty) > 10 ? "red" : "green" },
          },
          children: <div>{qty + " units"}</div>,
        };
      },
      hidden: false,
    },
    {
      key: 4,
      title: "Retailer Name",
      dataIndex: "retailerName",
      hidden: false,
    },
    {
      key: 5,
      title: "Retailer Location",
      dataIndex: "retailerLocation",
      render: (distLocation) => (
        <div>
          <HiOutlineLocationMarker
            style={{ fontSize: "1rem", marginLeft: "6px" }}
          ></HiOutlineLocationMarker>
          &nbsp;&nbsp;<span className="qrcontainer">{distLocation} </span>
        </div>
      ),

      hidden: false,
    },
    {
      key: "6",
      title: "Actions",
      hidden: false,
      render: (record) => {
        return (
          <>
            <button
              onClick={() => {
                console.log("Record Selected ::", record);
                setSelectedRowKeys({ record });
                console.log("Record Selected A4::", selectedRowKeys);
              }}
            >
              Track
            </button>
          </>
        );
      },
    },
  ];

  const columns = columns1.filter((i) => i.hidden === false);

  const fetchData = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };
  const handleFetchResponse = async (res, setInfoMessage) => {
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
      console.log("Map--");
      let customResponse = [];

      customResponse = response.result?.map((elem, idx) => {
        const responseObject = elem.Record;
        console.log("responseObject ", elem.Record);

        return {
          index: responseObject?.key,
          cartonId: responseObject?.carton,
          retailerName: responseObject?.retailerName,
          productName: responseObject?.cartonproduct,
          quantity: parseInt(responseObject?.totalUnits),
          retailerLocation:
            responseObject?.retailerLocation +
            ", " +
            responseObject?.retailerPinCode,
          sendToRetailer: "Send",

          distretailLocation: responseObject?.retailerLocation,
          distretailPinCode: responseObject?.retailerPinCode,
          actionStatus: responseObject?.actionStatus,
          distretailLatitude: responseObject?.latitude,
          distretailLongitude: responseObject?.longitude,

          originAddress: responseObject?.originAddress,
          originLatitude: responseObject?.originLatitude,
          originLongitude: responseObject?.originLongitude,
          originPincode: responseObject?.originPincode,
        }; //
      });
      console.log("customResponse ", customResponse);
      setItemData(customResponse);
    }
  };
  useEffect(() => {
    console.log("LR:", loginRole);
    const text =
      (loginRole === "shippingunit") ? "Shipping Unit" : 
      (loginRole === "retailerunit")?"Retailer Unit": "Distributor Unit";
    setPageText(text);
    //Code to add Api logic
    const inputParameter = {
      fcn: "getRetailer",
      args: "test",
    };
    var { endPoint, config } =
      ConfigForDistributionRetailerList(inputParameter);
    var apiResponse = fetchData(endPoint, config);
    apiResponse.then((res) => {
      handleFetchResponse(res, setInfoMessage);
    });
    console.log("ItemData ", itemData);
  }, [reducerValue]);
  //

  return (
    <div className="full-layout-right-body mb-3">
      <div className="top-right-header">
        <div className="_40_percent pagetitle">
          <span className="pagetitle">{pageText}</span>
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
          <span className="main-title">Retailer's List</span>
        </div>
        <div className="right-date">
          <div>
            <DisplayDate></DisplayDate>
          </div>
        </div>
      </div>
      {infoMessage !== "Error" && itemData.length > 0 && (
        <div className="right-body1">
          <div className="row">
            <div className="col-md-12">
              <Table
                size="medium"
                columns={columns}
                dataSource={itemData}
                showHeader={true}
              />
            </div>
          </div>
          {Object.keys(selectedRowKeys).length > 0 && (
            <div className="row mt-4 mb-2">
              <div
                className="col-11 col-md-11 col-sm-11"
                style={{
                  maxWidth: "60vw",
                  margin: "2% auto",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <MapContainer record={selectedRowKeys.record}></MapContainer>
              </div>
              <div className="col-1 col-md-1 col-sm-1" />
            </div>
          )}
        </div>
      )}

      {infoMessage !== "Error" && itemData.length === 0 && (
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

export default RetailerList;
