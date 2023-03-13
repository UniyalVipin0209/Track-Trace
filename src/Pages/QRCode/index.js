import React, { useEffect, useState, useReducer } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Products from "./Products";
import img1 from "../../Assests/images/702-7027868_picture-of-cadbury-dairy-milk-silk-roast-almond-removebg-preview 1.png";
// import img2 from '../../Assests/images/image 1.png';
import qrImg from "../../Assests/images/QR.svg";

import { notification } from "antd";
import { PrerequistiesConfig, PrerequistiesInsUpd } from "./ApiUtility.js";
import axios from "axios";
import MakeQRCode from "qrcode";
import DisplayDate from "../DisplayDate";
import { Link } from "react-router-dom";

const openNotification = (_notificationTitle, _desc, msg, _type, placement) => {
  notification.open({
    message: _notificationTitle,
    description: _desc,
    type: _type,
    onClick: () => {
      console.log(msg);
    },
    placement,
  });
};

const QRCode = () => {
  const [itemData, setItemData] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [infoMessage, setInfoMessage] = useState("");

  const [qrInputObject, setqrInputObject] = useState([]);
  const [qrCodeImg, setQrCodeImg] = useState();

  const [detailsObj, setDetailsObj] = useState({});

  const generateQRCode = async (event, inputParams, index) => {
    event.preventDefault();
    const response = await MakeQRCode.toDataURL(inputParams);
    console.log("response 1 :", response);
    setQrCodeImg(response);

    let prevObj = itemData[index];
    prevObj.productQRCode = window.encodeURI(response);
    console.log("prevObj :", prevObj);
    setDetailsObj(prevObj);
    console.log("prevObj :", prevObj);
    // console.log("detailsObj :", detailsObj);
    const inputParam = {
      key: prevObj.productId,
      productQRCode: prevObj.productQRCode,
      status: "CREATED",
    };
    addProduct1(inputParam, "add");
    console.log("itemData :", itemData);
  };

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
      customResponse = response.result?.map((elem) => {
        let responseObject = elem.Record?.productDetails;
        console.log("Responseobject ", responseObject);
        console.log(
          "responseObject.hasOwnProperty()",
          responseObject.hasOwnProperty("productImage")
        );
        return {
          productId: elem.Key,
          productName: responseObject.productName,
          action: responseObject.status,
          // productImg: responseObject.hasOwnProperty("productImage")
          //   ? window.decodeURI(responseObject.productImage)
          //   : img1,
          productImg: window.decodeURI(responseObject.productImage),
          productUnits: parseInt(responseObject.productunits),

          productQRCode: window.decodeURI(responseObject.productQRCode),
        };
      });

      setItemData(customResponse);
      console.log("customResponse ::", customResponse);
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

  const UpdateStatus = async (event, id) => {
    event.preventDefault();
    console.log("Id :", id);

    const inputParam = {
      key: id,
      status: "CREATED",
    };

    //    addProduct1(inputParam, "add");
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
    <div className="full-layout-right-body">
      <div className="top-right-header">
        <div className="_40_percent">
          <span className="pagetitle">Create QR Code</span>
        </div>
        <div className="_60_percent" style={{ position: "relative" }}>
          {/* <input type="map" stye={{ position:'absolute !important',right:0 }}placeholder="Search"/> &nbsp;&nbsp; &nbsp;&nbsp; */}
        </div>
      </div>
      <div className="mid-right-body">
        <div className="left-title">
          <span className="main-title">Product QR Code</span>
        </div>
        <div className="right-date">
          <div>
            <DisplayDate></DisplayDate>
          </div>
        </div>
      </div>
      {/* F9F9F9 */}

      {infoMessage !== "Error" && (
        <div className="right-body">
          {itemData.map((data, index) => (
            <div className="row mt-2">
              <div className="col-md-12">
                <div className="row graycolor">
                  <div className="col-md-2 text-center mt-2">
                    <img
                      src={data.productImg}
                      style={{ width: "5rem" }}
                      alt={data.productName}
                    />
                  </div>
                  <div className="col-md-3">
                    <div className=" p-box-title mt-3">
                      <div className="p-name">
                        <span className="productname">{data.productName}</span>
                      </div>
                      <div className="p-units">
                        <span className="productname">
                          {data.productUnits} Units
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="pid mt-3">ID: {data.productId}</div>
                  </div>
                  <div className="col-md-2">
                    <div className="qr-status mt-3">
                      {/* CREATE_QRCODE */}
                      {data.action === "CREATE_QRCODE" ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            // UpdateStatus(e, data.productId);
                            generateQRCode(e, data.productId, index);
                          }}
                          className="btn-link qr-status"
                          style={{
                            textDecoration: "none",
                            fontSize: "0.62rem!important",
                            padding: "0!important",
                            color: "green",
                            border: "none",
                          }}
                        >
                          Create QR Code
                        </button>
                      ) : (
                        <strong style={{ padding: "1px 6px", color: "green" }}>
                          Created
                        </strong>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    {data.action === "CREATE_QRCODE" ? (
                      ""
                    ) : (
                      <div className="text-center">
                        {data.productQRCode && (
                          <img
                            src={data.productQRCode}
                            style={{ width: "4.8rem" }}
                            alt={data.productName}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QRCode;
