import React, { useEffect, useState, useReducer } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import img1 from "../../../Assests/images/702-7027868_picture-of-cadbury-dairy-milk-silk-roast-almond-removebg-preview 1.png";

// import img2 from '../../Assests/images/image 1.png';
import qrImg from "../../../Assests/images/QR.svg";
import MakeQRCode from "qrcode";

import { notification } from "antd";
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
  //

  const generateQRCode = async (event, id) => {
    event.preventDefault();
    console.log("Id :", id);

    const inputParam = {
      key: id,
      status: "CREATED",
    };

    // const response = await QRCode.toDataURL(inputParam.key);
    // setQrCodeImg(response);

    await addProduct1(inputParam, "add");
  };

  const addProduct1 = async (productObject, mode) => {
    console.log("Enter generateQRCode");

    const inputParams = {
      args: productObject,
      fcn: "qrCreate",
      defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
      actiontype: "POST",
    };
    //Code to add Api logic
    var { endPoint, data, config } = PrerequistiesInsUpd(inputParams);
    //console.log("AddProduct Object :::", productObject);

    const InsertEditAPI = async (endPoint, data, config) => {
      axios
        .post(endPoint, data, config)
        .then((res) => {
          console.log("Api post ::", res.status);
          if (res.status === "200" || res.status === 200) {
            console.log("Success Response!!!");
            openNotification(
              `QR Code created Successfully for ${productObject.key}!!`,
              ``,
              "",
              "success",
              "topRight"
            );
            setItemData([]);

            forceUpdate();
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          openNotification(
            `Oops!! Error: Issue in creating the QR Code for ${productObject.key} !!`,
            ``,
            "",
            "error",
            "topRight"
          );
          forceUpdate();
        });
    };

    await InsertEditAPI(endPoint, data, config);
  };

  return (
    <div className="full-layout-right-body mb-3">
      <div className="top-right-header">
        <div className="_40_percent pagetitle">
          <span className="pagetitle">Shipping Unit</span>
        </div>
        <div className="_60_percent" style={{ position: "relative" }}>
          {/* <input type="map" stye={{ position:'absolute !important',right:0 }}placeholder="Search"/> &nbsp;&nbsp; &nbsp;&nbsp; */}
        </div>
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
