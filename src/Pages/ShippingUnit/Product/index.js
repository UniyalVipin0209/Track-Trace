import React, { useEffect, useState, useReducer } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import img1 from "../../../Assests/images/702-7027868_picture-of-cadbury-dairy-milk-silk-roast-almond-removebg-preview 1.png";

import { Alert, Spin, notification } from "antd";
import { PrerequistiesConfig, PrerequistiesInsUpd } from "../ApiUtility.js";
import axios from "axios";
import TableCheckBox from "./TableCheckBox";
import DisplayDate from "../../DisplayDate";
import openNotification from "../../notification.js";

const QRCode = () => {
  const [itemData, setItemData] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [infoMessage, setInfoMessage] = useState("");

  //QRCode
  const [qrInputObject, setqrInputObject] = useState([]);
  const [qrCodeImg, setQrCodeImg] = useState();

  const fetchData = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };
  const handleFetchResponse = async (res, setInfoMessage) => {
    const response = await res.data;
    if (typeof response === "object" && typeof response.result == "string") {
      // issue in backend(configuration side)
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
        let responseObject = elem.Record?.productDetails;
        console.log("responseObject ", responseObject);
        return {
          key: "cbx_" + elem.Key,
          productId: elem.Key,
          productName: responseObject.productName,
          action: responseObject.status,
          productImg: window.decodeURI(responseObject.productImage),
          productUnits: parseInt(responseObject.productunits),
          productQRCode: window.decodeURI(responseObject.productQRCode),
        };
      });
      console.log("customResponse ", customResponse);
      setItemData(customResponse);
    }
  };
  useEffect(() => {
    //Code to add Api logic
    var { endPoint, config } = PrerequistiesConfig("productProcessing");
    var apiResponse = fetchData(endPoint, config);
    apiResponse.then((res) => {
      handleFetchResponse(res, setInfoMessage);
    });
    console.log("ItemData ", itemData);
  }, [reducerValue]);

  return (
    <div className="full-layout-right-body mb-3">
      <div className="top-right-header">
        <div className="_40_percent pagetitle">
          <span className="pagetitle">Shipping Unit</span>
        </div>
        <div className="_60_percent" style={{ position: "relative" }}></div>
      </div>
      <div className="mid-right-body mt-3">
        <div className="left-title">
          <span className="main-title">Products in Warehouse</span>
        </div>
        <div className="right-date">
          <div>
            <DisplayDate></DisplayDate>
          </div>
        </div>
      </div>

      {infoMessage !== "Error" && itemData.length > 0 && (
        <div className="right-body">
          <div className="row mt-1 mb-2">
            <div className="col-10 col-md-10 col-sm-10">
              <TableCheckBox dataSource={itemData} />
            </div>
          </div>
        </div>
      )}
      {infoMessage !== "Error" && itemData.length === 0 && (
        <div className="right-body">
          <div className="row mt-4 mb-2">
            <div className="col-10 col-md-10 col-sm-10">
              <span style={{ textAlign: "center", verticalAlign: "middle" }}>
                There are no products available.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCode;
