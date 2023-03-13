import React, { useEffect, useState, useReducer } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Swal from "sweetalert2";

import { ConfigForDistributionRetailerList } from "./ApiUtility.js";
import axios from "axios";
import DisplayDate from "../DisplayDate";
import { Table } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import MapContainer from "../MapContainer/index.js";

const RetailerUnit = () => {
  const [itemData, setItemData] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [selectedRowKeys, setSelectedRowKeys] = useState({});
  const [infoMessage, setInfoMessage] = useState("");
  const history = useHistory();
  const [pageText, setPageText] = useState();
  const loginRole = localStorage.getItem("loginRole");

  const setAction = (record) => {
    if (record.actionStatus !== "NOTSTARTED")
      return (
        <button
          className="btn btn-link qr-status"
          style={{ textDecoration: "none", cursor: "pointer" }}
          onClick={() => {
            setSelectedRowKeys({ record });
          }}
        >
          Track Shipment
        </button>
      );
    else if (record.actionStatus === "NOTSTARTED")
      return (
        <span
          className="qr-status"
          style={{ textDecoration: "none", color: "gray" }}
        >
          N/A
        </span>
      );
  };

  const checkStatus = (record) => {
    //NOTSTARTED
    const status = record;
    console.log("checkstatus ", status);
    if (status === "NOTSTARTED")
      return (
        <button
          className="btn btn-link qr-status"
          style={{ textDecoration: "none", color: "gray" }}
        >
          Not Started
        </button>
      );
    if (status === "ONTIME")
      return (
        <button
          className="btn btn-link qr-status"
          style={{ textDecoration: "none", color: "blue" }}
        >
          On Time
        </button>
      );
    else if (status === "DELAYED")
      return (
        <button
          className="btn btn-link qr-status"
          style={{ textDecoration: "none", color: "red" }}
        >
          Delayed
        </button>
      );
    else if (status === "DELIVERED")
      return (
        <button
          className="btn btn-link qr-status"
          style={{ textDecoration: "none", color: "red" }}
        >
          Delivered
        </button>
      );
    else if (status === "DELAYED")
      return (
        <button
          className="btn btn-link qr-status"
          style={{ textDecoration: "none", color: "orange" }}
        >
          Delayed
        </button>
      );
  };
  const columns1 = [
    {
      key: 1,
      title: "Carton",
      dataIndex: "cartonId",
      render: (_carton) => <span className="productname">{_carton}</span>,
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
      key: 2,
      title: "Quantity",
      dataIndex: "quantity",
      render(text, record) {
        return {
          props: {
            style: { color: parseInt(text) > 10 ? "red" : "green" },
          },
          children: <div>{text + " units"}</div>,
        };
      },
      hidden: false,
    },
    {
      key: 3,
      title: "Distribution Name",
      dataIndex: "distretailName",
      hidden: false,
    },
    {
      key: 4,
      title: "Distributor Location",
      dataIndex: "distretailLocation",
      render: (distLocation) => (
        <div>
          <HiOutlineLocationMarker
            style={{ fontSize: "1rem", marginLeft: "6px" }}
          ></HiOutlineLocationMarker>
          &nbsp;&nbsp;<span className="qrcontainer">{distLocation}</span>
        </div>
      ),
      hidden: false,
    },

    {
      key: 5,
      title: "Status",
      dataIndex: "actionStatus",
      hidden: false,
      render: (record) => {
        console.log("action status ", record);
        return checkStatus(record);
      },
    },
    {
      key: "6",
      title: "Actions",
      hidden: false,
      render: (text, record) => {
        return setAction(record);
      },
    },
  ];

  const columns = columns1.filter((i) => i.hidden === false);

  const confirmPopUp = (record) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Do you really want to ship the Carton to Distributor ? `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Confirm",
      confirmButtonColor: "#360036",
      cancelButtonColor: "red",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        console.log(willDelete, willDelete.isConfirmed);
        //API Logic need to be added
        const objIndex = itemData.findIndex(
          (obj) => obj.index === record.index
        );
        if (objIndex === -1) {
          return;
        }

        console.log("objIndex --", objIndex);
        const updatedObj = { ...itemData[objIndex], mode: "shipped" };
        console.log("befor UpdateObjct ", updatedObj);
        console.log("Before Update ", itemData);
        const updatedProjects = [
          ...itemData.slice(0, objIndex),
          updatedObj,
          ...itemData.slice(objIndex + 1),
        ];
        console.log("Updated Items :", updatedProjects);
        setItemData(updatedProjects);

        console.log("After Update ", itemData);
      } else {
        return;
      }
    });
  };

  const fetchData = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };
  const handleFetchResponse = async (res, setInfoMessage) => {
    const response = await res.data;
    console.log("DistributorList LIST ", res);

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
          distretailName: responseObject?.distributorName,
          productName: responseObject?.cartonproduct,
          quantity: parseInt(responseObject?.totalUnits),
          distretailLocation: responseObject?.distributorLocation,
          vehicleType: responseObject?.vehicleDetails,
          distanceInKms: responseObject?.distanceInKms,
          mode: "shipping",
          distretailPinCode: responseObject?.distretailPinCode,
          actionStatus: responseObject?.actionStatus,
          distretailLatitude: responseObject?.latitude,
          distretailLongitude: responseObject?.longitude,
          originAddress: responseObject?.originAddress,
          originLatitude: responseObject?.originLatitude,
          originLongitude: responseObject?.originLongitude,
          originPincode: responseObject?.originPincode,

          //vehicleType,distanceInKms
        }; //
      });
      console.log("customResponse ", customResponse);
      setItemData(customResponse);
    }
  };
  useEffect(() => {
    console.log("LR:", loginRole);
    const text =
      loginRole === "shippingunit"
        ? "Shipping Unit"
        : loginRole === "retailerunit"
        ? "Retailer Unit"
        : "Distributor Unit";
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
        <div className="_60_percent" style={{ position: "relative" }}>
          {/* <input type="map" stye={{ position:'absolute !important',right:0 }}placeholder="Search"/> &nbsp;&nbsp; &nbsp;&nbsp; */}
        </div>
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
          <span className="main-title">Product Shipped to Distributors</span>
        </div>
        <div className="right-date">
          <div>
            <DisplayDate></DisplayDate>
          </div>
        </div>
      </div>

      {infoMessage !== "Error" && itemData.length > 0 && (
        <div className="right-body1">
          <div className="row mt-4 mb-2">
            <div className="col-md-12">
              <Table
                size="medium"
                columns={columns}
                dataSource={itemData}
                showHeader={true}
              />
            </div>
          </div>
        </div>
      )}

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

export default RetailerUnit;
