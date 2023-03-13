import React from "react";
import DisplayDate from "../../DisplayDate";
import CreateShipmentForRetailer from "./CreateShipmentForRetailer";

const Shipment = () => {
  return (
    <div className="full-layout-right-body">
      <div className="top-right-header">
        <div className="_40_percent">
          <span className="pagetitle">Create Shipment To Retailer</span>
        </div>
        <div className="_60_percent">
          <div style={{ width: "70%", padding: "20px" }}></div>
          <div
            className="pagetitle right-date"
            style={{ position: "relative", marginTop: "15px" }}
          >
            <DisplayDate></DisplayDate>
          </div>
        </div>
      </div>
      <div className="right-body">
        <div className="row mt-2">
          <CreateShipmentForRetailer />
        </div>
      </div>
    </div>
  );
};

export default Shipment;
