import React, { useEffect, useState, useReducer } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import img1 from "../../../Assests/images/702-7027868_picture-of-cadbury-dairy-milk-silk-roast-almond-removebg-preview 1.png";

import qrImg from "../../../Assests/images/QR.svg";

import { ConfigForDistributionRetailerList } from "../ApiUtility.js";
import axios from "axios";
//import TableCheckBox from "./TableCheckBox";
import DisplayDate from "../../DisplayDate";
import { SiCodesandbox } from "react-icons/si";
import { Table, Radio } from "antd";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import MapContainer from "../../MapContainer";
import { getRenderPropValue } from "antd/lib/_util/getRenderPropValue";

const DistributorList = () => {
  const [itemData, setItemData] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [selectedRowKeys, setSelectedRowKeys] = useState({});
  const [pageText, setPageText] = useState();
  const loginRole = localStorage.getItem("loginRole");

  const [infoMessage, setInfoMessage] = useState("");
  const history = useHistory();
  // cartoon,productName,quantity,distretailName,distretailLocation

  const columns1 = [
    {
      key: "1",
      title: "Carton",
      dataIndex: "cartonId",
      render: (_carton) => <span className="productname">{_carton}</span>,
      hidden: false,
    },
    {
      key: "2",
      title: "Product Name",
      dataIndex: "productName",
      render: (prodName) => <span className="productname">{prodName}</span>,
      hidden: false,
    },
    {
      key: "3",
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
      key: "4",
      title: "Distribution Name",
      dataIndex: "distretailName",
      hidden: false,
    },
    {
      key: "5",
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
    console.log("DistributorList LIST");
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
          distretailName: responseObject?.distretailName,
          productName: responseObject?.cartonproduct,
          quantity: parseInt(responseObject?.totalUnits),
          distretailLocation: responseObject?.distretailLocation,
          distretailPinCode: responseObject?.distretailPinCode,
          actionStatus: responseObject?.actionStatus,
          distretailLatitude: responseObject?.latitude,
          distretailLongitude: responseObject?.longitude,
          originAddress: responseObject?.originAddress,
          originLatitude: responseObject?.originLatitude,
          originLongitude: responseObject?.originLongitude,
          originPincode: responseObject?.originPincode,
          calculateEmmision: responseObject?.calculateEmmision,
        }; //
      });
      console.log("customResponse ", customResponse);
      setItemData(customResponse);
    }
  };
  useEffect(() => {
    console.log("LR:", loginRole);
    const text =
      loginRole === "shippingunit" ? "Shipping Unit" : "Distributor Unit";
    setPageText(text);
    //Code to add Api logic
    const inputParameter = {
      fcn: "getDistributor",
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
          <span className="main-title">Distributor's List</span>
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

export default DistributorList;
