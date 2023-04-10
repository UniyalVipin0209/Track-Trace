import React, { useState, useEffect } from "react";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
// import "react-vertical-timeline-component/style.min.css";
import "react-vertical-timeline-component/style.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { GiFarmer } from "react-icons/gi";
import { GoPerson, GoLocation } from "react-icons/go";
//FaShippingFast

import { TbBrandCarbon } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import "./style.css";
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
      let productImage = response?.productImg;
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

      // console.log("productDetailsArray ", productDetailsArray);
      // console.log("rawMaterialCollection ", rawMaterialArray);
      // console.log("shipingToDistributorDetails ", shipingToDistributorDetails);
      // console.log("productImage ", productImage);

      let customRespone = {
        productDetails: productDetailsArray,
        rawMaterial: rawMaterialArray,
        shipingToDistributorDetails,
        distributorToRetailorDetails,
        totalCarbon: totalCarbon,
        productImage: productImage,
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
        <div className="_60_percent right-date top-menu">
          <a href="#rawmaterials">Raw Materials</a>
          <a href="#productdetails">Product</a>
          <a href="#shippingtodistr">Shipment - Distribution</a>
          <a href="#distrtoRetailer">Shipment - Retailer</a>
          <a href="#finalcarbon">Total Estimated Carbon</a>
          <span>{moment().format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <div
        className="right-body1"
        style={{
          width: "80vw",
          scrollBehavior: "smooth",
          overflowY: "hidden",
          maxHeight: "48vw",
          scrollSnapType: "y",
        }}
      >
        <div className="row mt-4 mb-4">
          <div className="col-md-10 m-auto overflow-scroll">
            {itemData && (
              <VerticalTimeline>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "rgb(33, 150, 243)",
                    color: "#fff",
                  }}
                  contentArrowStyle={{
                    borderRight: "18px solid rgb(33, 150, 243)",
                  }}
                  iconStyle={{
                    background: "rgb(33, 150, 243)",
                    color: "#fff",
                  }}
                  icon={<BiCategory />}
                  id="rawmaterials"
                >
                  <h3 className="vertical-timeline-element-title">Commodity</h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    <p>Farmer and Commodity Details</p>
                    {itemData.rawMaterial &&
                      itemData.rawMaterial.map((ele, idx) => (
                        <p>
                          {idx + 1}. {ele.key}, {ele.farmer_name}{" "}
                          <b>Item collected from </b>({ele.material_name}){" "}
                        </p>
                      ))}
                  </h4>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentArrowStyle={{
                    borderRight: "18px solid rgb(142, 127, 67)",
                  }}
                  contentStyle={{
                    background: "rgb(142, 127, 67)",
                    color: "#fff",
                  }}
                  iconStyle={{
                    background: "rgb(142, 127, 67)",
                    color: "#fff",
                  }}
                  icon={<GiFarmer />}
                  id="productdetails"
                >
                  {/* <h4 className="vertical-timeline-element-subtitle"></h4> */}
                  <div className="flex-container">
                    <div className="divcontent">
                      <h3 className="vertical-timeline-element-title">
                        Product Details
                      </h3>

                      {itemData.productDetails &&
                        itemData.productDetails.map((ele, idx) => (
                          <p>
                            {idx + 1}. {ele.productname} from category{" "}
                            {ele.producttype}
                          </p>
                        ))}
                    </div>
                    <div className="divimage">
                      {itemData.productImage && (
                        <img
                          src={itemData.productImage}
                          alt={itemData.productImage}
                          style={{ width: "6rem" }}
                        />
                      )}
                    </div>
                  </div>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentArrowStyle={{
                    borderRight: "18px solid rgb(67, 142, 142)",
                  }}
                  contentStyle={{
                    background: "rgb(67, 142, 142)",
                    color: "#fff",
                  }}
                  iconStyle={{
                    background: "rgb(67, 142, 142)",
                    color: "#fff",
                  }}
                  id="shippingtodistr"
                  icon={<FaShippingFast />}
                >
                  <h3 className="vertical-timeline-element-title">
                    Shipping to Distributor
                  </h3>
                  {/* <h4 className="vertical-timeline-element-subtitle"></h4> */}
                  {itemData?.shipingToDistributorDetails ? (
                    <>
                      <p>
                        Origin <GoLocation color="white" size={19} />:
                        {itemData?.shipingToDistributorDetails.originLocation}{" "}
                      </p>
                      <p>
                        Destination <GoLocation color="white" size={19} /> :{" "}
                        {
                          itemData?.shipingToDistributorDetails
                            .destinationLocation
                        }{" "}
                      </p>
                      <p>
                        Distributor Name :
                        {
                          itemData?.shipingToDistributorDetails.distributorName.split(
                            "~"
                          )[1]
                        }
                      </p>
                      <p>
                        Transported by{" "}
                        {itemData?.shipingToDistributorDetails.travelMode}
                      </p>
                      <p>
                        Distance(Kms) :{" "}
                        {itemData?.shipingToDistributorDetails.distanceInKms}
                      </p>
                      <p>
                        Calculated Emmission :{" "}
                        {
                          itemData?.shipingToDistributorDetails
                            .calculateEmmision
                        }{" "}
                      </p>
                    </>
                  ) : (
                    <b>Data not available</b>
                  )}
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  id="distrtoRetailer"
                  contentArrowStyle={{
                    borderRight: "18px solid rgb(108, 88, 138)",
                  }}
                  contentStyle={{
                    background: "rgb(108, 88, 138)",
                    color: "#fff",
                  }}
                  iconStyle={{
                    background: "rgb(108, 88, 138)",
                    color: "#fff",
                  }}
                  icon={<MdLocalShipping />}
                >
                  <h3 className="vertical-timeline-element-title">
                    Distributor to Retailer Details
                  </h3>
                  {itemData?.distributorToRetailorDetails ? (
                    <>
                      <p>
                        Destination <GoLocation color="white" size={19} />:
                        {
                          itemData?.distributorToRetailorDetails
                            .destinationLocation
                        }{" "}
                      </p>

                      <p>
                        Retailer Name :(
                        {
                          itemData?.distributorToRetailorDetails.retailerName.split(
                            "~"
                          )[1]
                        }
                        ){" "}
                      </p>
                      <p>
                        Transported by :
                        {itemData?.distributorToRetailorDetails.travelMode}
                      </p>
                      <p>
                        Distance(Kms) :
                        {itemData?.distributorToRetailorDetails.distanceInKms}
                      </p>
                      <p>
                        Calculated Emmission :
                        {
                          itemData?.distributorToRetailorDetails
                            .calculateEmmision
                        }{" "}
                      </p>
                    </>
                  ) : (
                    <p>No data.</p>
                  )}
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  id="finalcarbon"
                  className="vertical-timeline-element--education"
                  contentArrowStyle={{
                    borderRight: "18px solid rgb(233, 30, 99)",
                  }}
                  contentStyle={{
                    background: "rgb(233, 30, 99)",
                    color: "#fff",
                  }}
                  iconStyle={{
                    background: "rgb(233, 30, 99)",
                    color: "#fff",
                  }}
                  icon={<TbBrandCarbon />}
                >
                  <h3 className="vertical-timeline-element-title">
                    Total Estimated Emission
                  </h3>

                  <p style={{ textAlign: "center" }}>
                    {" "}
                    {itemData?.totalCarbon}
                  </p>
                </VerticalTimelineElement>
              </VerticalTimeline>
            )}
          </div>
        </div>
        <div className="row mt-5 mb-5"></div>
      </div>
    </div>
  );
};

export default FetchCartonDetails;
