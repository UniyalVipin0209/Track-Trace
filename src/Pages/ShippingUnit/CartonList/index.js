import React, { useEffect, useState, useReducer } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import img1 from "../../../Assests/images/702-7027868_picture-of-cadbury-dairy-milk-silk-roast-almond-removebg-preview 1.png";

import qrImg from "../../../Assests/images/QR.svg";

import { PrerequistiesConfigCartonList } from "../ApiUtility.js";
import axios from "axios";
//import TableCheckBox from "./TableCheckBox";
import DisplayDate from "../../DisplayDate";
import { SiCodesandbox } from "react-icons/si";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const CartonList = () => {
  const [itemData, setItemData] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [infoMessage, setInfoMessage] = useState("");
  const navigate = useHistory();

  const fetchData = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };
  const handleFetchResponse = async (res, setInfoMessage) => {
    console.log("CARTON LIST");
    const response = await res.data;
    console.log("CARTON LIST ", res);

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
        let responseObject = elem.Record?.cartonDetails;
        console.log("responseObject ", responseObject);

        return {
          index: elem.Key,
          cartonQRCode: elem.Record?.cartonQRCode,
          cartonDetails: responseObject.details,
        }; //
      });
      console.log("customResponse ", customResponse);
      setItemData(customResponse);
    }
  };
  useEffect(() => {
    //Code to add Api logic
    var { endPoint, config } = PrerequistiesConfigCartonList("getCartoonList");
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
          <span className="pagetitle">Shipping Unit</span>
        </div>
        <div className="_60_percent" style={{ position: "relative" }}>
          {/* <input type="map" stye={{ position:'absolute !important',right:0 }}placeholder="Search"/> &nbsp;&nbsp; &nbsp;&nbsp; */}
        </div>
      </div>
      <div className="mid-right-body mt-3">
        <div className="left-title">
          <span className="main-title">Carton Packed Products</span>
        </div>
        <div className="right-date">
          <div>
            <DisplayDate></DisplayDate>
          </div>
        </div>
      </div>

      {infoMessage !== "Error" && itemData.length > 0 && (
        <div className="right-body">
          <div className="row mt-4 mb-2">
            <div className="col-md-12">
              {itemData.map((data, index) =>
                data.cartonDetails.map((obj, i) => (
                  <div key={index + "_" + i} className="col-md-12">
                    <div className="row">
                      <div
                        className="col-md-1"
                        style={{ width: "12%", marginRight: "10px" }}
                      >
                        {obj.productImg && (
                          <img
                            src={obj.productImg}
                            style={{ width: "6rem" }}
                            alt={obj.productImg}
                          />
                        )}
                      </div>
                      <div
                        className="col-md-2"
                        style={{
                          width: "15%",
                        }}
                      >
                        <div className=" p-box-title mt-5">
                          <div className="p-name">{obj.productName}</div>
                          <div className="p-units">{obj.productUnits}</div>
                        </div>
                      </div>
                      <div
                        className="col-md-2"
                        style={{
                          width: "10%",
                          marginLeft: "10px",
                          marginRight: "10px",
                        }}
                      >
                        <div className="pid mt-5">ID: {obj.productId}</div>
                      </div>
                      <div
                        className="col-md-2"
                        style={{
                          width: "15%",
                          marginLeft: "4px",
                          marginRight: "4px",
                        }}
                      >
                        {obj.productQRCode && (
                          <img
                            src={obj.productQRCode}
                            style={{ width: "6rem" }}
                            alt={obj.productName}
                          />
                        )}
                      </div>
                      <div
                        className="col-md-2"
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          marginTop: "18px",
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            marginTop: "3px",
                            fontSize: ".72rem",
                            color: "green",
                          }}
                        >
                          <Link to={`/fetchCartonDetails/${data.index}`}>
                            {data.index}
                          </Link>
                        </div>
                        <div>
                          <SiCodesandbox
                            style={{
                              fontSize: "2.5rem",
                              color: "orange",
                            }}
                          ></SiCodesandbox>
                        </div>
                      </div>
                      <div
                        className="col-md-3"
                        style={{
                          width: "15%",
                        }}
                      >
                        <div className="text-center">
                          <img
                            src={data.cartonQRCode}
                            style={{ width: "6rem" }}
                            alt={data.index}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-3 col-md-3">
              <button
                className="btnUpdate"
                onClick={(e) => {
                  setTimeout(3000);
                  navigate.push("/retailerList");
                }}
              >
                Go to Retailers
              </button>
            </div>

            <div className="col-4 col-md-4">
              <button
                onClick={(e) => {
                  setTimeout(3000);
                  navigate.push("/DistList");
                }}
                className="btn btn-link qr-status"
                style={{}}
              >
                View Distributor's List
              </button>
            </div>
            <div className="col-5 col-md-5"></div>
          </div>
        </div>
      )}

      {infoMessage !== "Error" && itemData.length === 0 && (
        <div className="right-body">
          <div className="row mt-4 mb-2">
            <div className="col-md-12">
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

export default CartonList;
