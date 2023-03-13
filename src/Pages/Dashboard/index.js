import React from "react";
import { useState } from "react";
import CUDashboard from "./CUDashboard";
import PUDashboard from "./PUDashboard";
// import SUDashboard from "./SUDashboard";
// import RUDashboard from "./RUDashboard";
// import DUDashboard from "./DUDashboard";

const setDashboard = () => {
  let loginRole = localStorage.getItem("loginRole");
  let _dashboard = "";
  if (loginRole === "collectionunit") _dashboard = "CU";
  else if (loginRole === "processingunit") _dashboard = "PU";
  return _dashboard;
};
const Dashboard = () => {
  let customDashboard = setDashboard();
  return (
    <>
      {customDashboard === "CU" && <CUDashboard></CUDashboard>}
      {customDashboard === "PU" && <PUDashboard></PUDashboard>}
      {/* {customDashboard === "SU" && <SUDashboard></SUDashboard>}
      {customDashboard === "DU" && <DUDashboard></DUDashboard>} */}
      {/* {customDashboard === "RU" && <RUDashboard></RUDashboard>} */}
    </>
  );
};

export default Dashboard;
