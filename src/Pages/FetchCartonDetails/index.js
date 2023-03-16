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
import moment from "moment";
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
      let totalCarbon = response?.TotalCarbon;
      productDetails = response?.productCollection;
      rawMaterialCollection = response?.productCollectionRawMaterial;
      console.log("Product details ", productDetails);
      let productDetailsArray = Object.entries(productDetails).map(
        (ele) => ele[1]
      );
      // let distributorToRetailorDetails = {};
      shipingToDistributorDetails = response?.shipingToDistributorDetails;
      distributorToRetailorDetails = response?.distributorToRetailorDetails;

      let rawMaterialArray = Object.entries(rawMaterialCollection).map(
        (ele) => ele[1]
      );

      console.log("productDetailsArray ", productDetailsArray);
      console.log("rawMaterialCollection ", rawMaterialArray);
      console.log("shipingToDistributorDetails ", shipingToDistributorDetails);
      console.log("totalCarbon ", totalCarbon);

      let customRespone = {
        productDetails: productDetailsArray,
        rawMaterial: rawMaterialArray,
        shipingToDistributorDetails,
        distributorToRetailorDetails,
        totalCarbon: totalCarbon,
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
    <div className="full-layout-right-body mb-3">
      <div className="top-right-header">
        <div className="_40_percent pagetitle">
          <span className="pagetitle">History</span>
        </div>
        <div
          className="_60_percent right-date"
          style={{ display: "inline-flex", gap: "1.45rem" }}
        >
          <a href="#rawmaterials">Raw Materials</a>
          <a href="#productdetails">Product</a>
          <a href="#shippingtodistr">Shipment - Distribution</a>
          <a href="#distrtoRetailer">Shipment - Retailer</a>
          <a href="#finalcarbon">totalcarbon</a>
          <span>{moment().format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <div
        className="right-body1"
        style={{
          width: "60vw",
          scrollBehavior: "smooth",
          overflowY: "hidden",
          maxHeight: "47vw",
          scrollSnapType: "y",
        }}
      >
        <div className="row mt-2 mb-2"></div>
        <div className="row mt-4 mb-2">
          <div className="col-md-12">
            {itemData && (
              <div
                style={{
                  marginLeft: "20px",
                  marginTop: "50px",
                }}
              >
                <Timeline mode="alternate">
                  <Timeline.Item
                    id="rawmaterials"
                    style={{ scrollSnapAlign: "start", maxHeight: "45vw" }}
                    color="Yellow"
                  >
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
                              <b>Farmer Details :</b> {ele.key}{" "}
                              {ele.farmer_name}
                              <br />
                              <b> Raw Material collected </b>
                              {ele.material_name}{" "}
                            </p>
                          </>
                        ))}
                    </p>
                    <p></p>
                  </Timeline.Item>
                  <Timeline.Item
                    id="productdetails"
                    style={{ scrollSnapAlign: "start" }}
                    color="green"
                  >
                    <p>
                      <span style={{ fontSize: "1.48rem", color: "Green" }}>
                        Product Details
                      </span>
                    </p>

                    {itemData.productDetails &&
                      itemData.productDetails.map((ele, idx) => (
                        <p>
                          <b>Product Name :</b> {ele.productname} for{" "}
                          <b>Category </b>
                          {ele.producttype}
                          <br /> <b>Farmers ID :</b> {ele.key}
                          <img
                            src={ele.productImg}
                            alt={ele.productImg}
                            style={{ width: "7rem" }}
                          />
                        </p>
                      ))}
                  </Timeline.Item>
                  <Timeline.Item
                    id="shippingtodistr"
                    style={{ scrollSnapAlign: "center" }}
                    color="red"
                  >
                    <p>
                      <span style={{ fontSize: "1.48rem", color: "Red" }}>
                        Shipping to Distributor Details
                      </span>
                    </p>

                    <p>
                      {itemData?.shipingToDistributorDetails ? (
                        <>
                          <b>Origin :</b>{" "}
                          {itemData?.shipingToDistributorDetails.originLocation}{" "}
                          <br />
                          <b>Destination Location :</b>{" "}
                          {
                            itemData?.shipingToDistributorDetails
                              .destinationLocation
                          }{" "}
                          <br />
                          <b>Distributor Name is </b>
                          {
                            itemData?.shipingToDistributorDetails.distributorName.split(
                              "~"
                            )[1]
                          }
                          <br />
                          <b>Transported by </b>{" "}
                          {itemData?.shipingToDistributorDetails.travelMode}
                          <br />
                          <b>Distance(Kms) :</b>{" "}
                          {itemData?.shipingToDistributorDetails.distanceInKms}
                          <br />
                          <b>Calculated Emmission :</b>{" "}
                          {
                            itemData?.shipingToDistributorDetails
                              .calculateEmmision
                          }{" "}
                        </>
                      ) : (
                        <b>Data not available</b>
                      )}
                    </p>
                  </Timeline.Item>
                  <Timeline.Item
                    id="distrtoRetailer"
                    style={{ scrollSnapAlign: "center" }}
                    color="orange"
                  >
                    <p>
                      <span style={{ fontSize: "1.48rem", color: "Orange" }}>
                        Shipping Distributor to Retailer Details
                      </span>
                    </p>
                    <p>
                      {itemData?.distributorToRetailorDetails ? (
                        <>
                          <b>Destination Location :</b>{" "}
                          {
                            itemData?.distributorToRetailorDetails
                              .destinationLocation
                          }{" "}
                          <br />
                          <b>Distributor Name is </b>(
                          {
                            itemData?.distributorToRetailorDetails.retailerName.split(
                              "~"
                            )[1]
                          }
                          ) <br />
                          <b>Transported by </b>
                          {itemData?.distributorToRetailorDetails.travelMode}
                          <br />
                          <b>Distance(Kms) :</b>{" "}
                          {itemData?.distributorToRetailorDetails.distanceInKms}
                          <br />
                          <b>Calculated Emmission :</b>{" "}
                          {
                            itemData?.distributorToRetailorDetails
                              .calculateEmmision
                          }{" "}
                          <br />
                        </>
                      ) : (
                        <b>Data not available</b>
                      )}
                    </p>
                  </Timeline.Item>

                  <Timeline.Item
                    id="finalcarbon"
                    style={{ scrollSnapAlign: "end" }}
                    color="red"
                  >
                    <p>
                      <span style={{ fontSize: "1.48rem", color: "Orange" }}>
                        Carbon Footprint
                      </span>
                    </p>
                    {itemData?.totalCarbon && (
                      <p>
                        Total Estimated Carbon Footprint is{" "}
                        {itemData?.totalCarbon}
                        <br />
                        <br />
                      </p>
                    )}
                  </Timeline.Item>
                </Timeline>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-5 mb-5"></div>
      </div>
    </div>
  );
};

export default FetchCartonDetails;
