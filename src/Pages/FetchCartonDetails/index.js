import React, { useState, useEffect } from "react";
import { Timeline } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { SmileOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";
import ShippingToDistributer from "./../ShippingUnit/ShippingToDistributer/index";
import Apples from "./../RawMaterials/Apples/Apples";

const PrerequistiesConfigCartonList = (_cartoonid) => {
  const parameter = {
    defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
  };
  //let endPoint = process.env.REACT_APP_ENDPOINT_CARTONLIST;
  let endPoint = `http://20.96.181.1:5000/getfarmToFork?cartoonid=${_cartoonid}`;
  console.log("endpoint -", endPoint);
  let token = process.env.REACT_APP_TOKEN;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      peer: parameter,
    },
  };
  console.log("Params :", config.params);
  return { endPoint, config };
};
const FetchCartonDetails = () => {
  const { cartoonid } = useParams();

  const [itemData, setItemData] = useState({});
  const [infoMessage, setInfoMessage] = useState("");

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
      console.log("Map 1--");
      let shipingToDistributorDetails = {};
      let productDetails = {};
      let rawMaterialCollection = {};
      let distributorToRetailorDetails = {};

      productDetails = response?.productCollection;
      rawMaterialCollection = response?.productCollectionRawMaterial;

      let productDetailsArray = Object.entries(productDetails).map((ele) => {
        let elem = ele;
        console.log("Element ", elem[1]);
        return elem[1];
      });
      // let distributorToRetailorDetails = {};
      shipingToDistributorDetails = response?.shipingToDistributorDetails;
      distributorToRetailorDetails = response?.distributorToRetailorDetails;

      console.log("rawMaterialCollection ", rawMaterialCollection);
      let rawMaterialArray = Object.entries(rawMaterialCollection).map(
        (ele) => {
          let elem = ele;
          console.log("Element ", elem[1]);
          return elem[1];
        }
      );

      console.log("productDetailsArray ", productDetailsArray);
      console.log("rawMaterialCollection ", rawMaterialArray);
      console.log("shipingToDistributorDetails ", shipingToDistributorDetails);

      let customRespone = {
        productDetails: productDetailsArray,
        rawMaterial: rawMaterialArray,
        shipingToDistributorDetails,
        distributorToRetailorDetails,
      };
      setItemData(customRespone);
    }
  };
  useEffect(() => {
    // Code to add Api logic
    var { endPoint, config } = PrerequistiesConfigCartonList(cartoonid);
    var apiResponse = fetchData(endPoint, config);
    apiResponse.then((res) => {
      handleFetchResponse(res, setInfoMessage);
    });
    console.log("ItemData ", itemData);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {itemData && (
        <div
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            overflowX: "auto",
          }}
        >
          <Timeline mode="alternate">
            <Timeline.Item color="Yellow">
              <p>
                <span style={{ fontSize: "1.48rem", color: "brown" }}>
                  Commodities Details
                </span>
              </p>
              <p>
                {itemData.rawMaterial &&
                  itemData.rawMaterial.map((ele, idx) => (
                    <>
                      <p>
                        <b>Farmer Details :</b> {ele.key} {ele.farmer_name}
                        <b> Raw Material collected </b>({ele.material_name}){" "}
                      </p>
                    </>
                  ))}
              </p>
              <p></p>
            </Timeline.Item>
            <Timeline.Item color="green">
              <p>
                <span style={{ fontSize: "1.48rem", color: "Green" }}>
                  Product Details
                </span>
              </p>

              {itemData.productDetails &&
                itemData.productDetails.map((ele, idx) => (
                  <p>
                    <b>Product Name :</b> {ele.productname} <b>Category </b>
                    {ele.producttype}
                    <b>Farmers ID :</b> {ele.key}
                  </p>
                ))}
            </Timeline.Item>
            <Timeline.Item color="green">
              Created QR Code for product.
            </Timeline.Item>
            <Timeline.Item color="red">
              <p>
                <span style={{ fontSize: "1.48rem", color: "Red" }}>
                  Shipping to Distributor Details
                </span>
              </p>

              <p>
                {itemData?.shipingToDistributorDetails ? (
                  <>
                    <b>Destination Location :</b>{" "}
                    {itemData?.shipingToDistributorDetails.destinationLocation}{" "}
                    <b>Distributor Name is </b>(
                    {
                      itemData?.shipingToDistributorDetails.distributorName.split(
                        "~"
                      )[1]
                    }
                    ) <br />
                    <b>Distance(Kms) :</b>{" "}
                    {itemData?.shipingToDistributorDetails.distanceInKms}
                    <b>Calculated Emmission :</b>{" "}
                    {itemData?.shipingToDistributorDetails.calculateEmmision}{" "}
                  </>
                ) : (
                  <b>Data not available</b>
                )}
              </p>
            </Timeline.Item>
            <Timeline.Item color="orange">
              <p>
                <span style={{ fontSize: "1.48rem", color: "Orange" }}>
                  Shipping Distributor to Retailer Details
                </span>
              </p>
              <p>
                {itemData?.distributorToRetailorDetails ? (
                  <>
                    <b>Destination Location :</b>{" "}
                    {itemData?.distributorToRetailorDetails.destinationLocation}{" "}
                    <b>Distributor Name is </b>(
                    {
                      itemData?.distributorToRetailorDetails.retailerName.split(
                        "~"
                      )[1]
                    }
                    ) <br />
                    <b>Distance(Kms) :</b>{" "}
                    {itemData?.distributorToRetailorDetails.distanceInKms}
                    <br />
                    <b>Calculated Emmission :</b>{" "}
                    {itemData?.distributorToRetailorDetails.calculateEmmision}{" "}
                    <br />
                  </>
                ) : (
                  <b>Data not available</b>
                )}
              </p>
            </Timeline.Item>
          </Timeline>
        </div>
      )}
    </div>
  );
};

export default FetchCartonDetails;
