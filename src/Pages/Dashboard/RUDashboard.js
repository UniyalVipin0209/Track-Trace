import React from "react";
import { useHistory } from "react-router";
import logo from "../../Assests/icons/Mondelez-Logo.png";
import avatar from "../../Assests/icons/profile-avatar.jpg";
import { AiOutlineSetting } from "react-icons/ai";
import { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsChat } from "react-icons/bs";
import Autocomplete from "react-google-autocomplete";
import ItemMenu from "../ItemMenu";
//import ItemDetails from "../ItemDetails";
import ItemSelector from "../ItemDetails/ItemSelector";
import SUItemSelector from "../ItemDetails/SUItemSelector";
import DisplayDate from "../DisplayDate";

const RUDashboard = () => {
  const [profileRole] = useState(localStorage.getItem("loginRole"));

  const [screenTitle, setTitle] = useState("Expolore Shipping Units");

  const handleScreenTitleChange = (name) => {
    console.log("Change::", name);
    setTitle(name);
  };

  return (
    <div className="full-layout-right-body">
      <div className="top-right-header">
        <div className="_40_percent">
          <IoMdArrowRoundBack
            onClick={() => {
              handleScreenTitleChange("Explore Retailer Units");
            }}
            style={{ cursor: "pointer" }}
          ></IoMdArrowRoundBack>{" "}
        </div>
        <div className="_60_percent">&nbsp;&nbsp; &nbsp;&nbsp;</div>
      </div>

      <div className="mid-right-body">
        <div className="left-title">
          <span className="main-title">Explore Retail Units</span> &nbsp;
        </div>

        <div className="left-title">
          <span className="main-title">{screenTitle}</span>
        </div>
        <div className="right-date">
          <div>
            <DisplayDate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RUDashboard;
