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
import PUItemSelector from "../ItemDetails/PUItemSelector";
import DisplayDate from "../DisplayDate";

const PUDashboard = () => {
  const [profileRole] = useState(localStorage.getItem("loginRole"));

  const [screenTitle, setTitle] = useState("Raw Materials Collected");

  const handleScreenTitleChange = (name) => {
    console.log("Change::", name);
    setTitle(name);
  };

  return (
    <div className="full-layout-right-body">
      <div className="top-right-header">
        <div className="_40_percent">
          {screenTitle !== "Raw Materials Collected" && (
            <IoMdArrowRoundBack
              onClick={() => {
                handleScreenTitleChange("Raw Materials Collected");
              }}
              style={{ cursor: "pointer" }}
            ></IoMdArrowRoundBack>
          )}{" "}
          Dashboard
        </div>
        <div className="_60_percent"></div>
      </div>

      <div className="mid-right-body">
        {profileRole === "processingunit" &&
          screenTitle !== "Raw Materials Collected" && (
            <>
              <div className="left-title">
                <span className="main-title">{screenTitle}</span>
              </div>
              <div className="right-date">
                <div>
                  <DisplayDate />
                </div>
              </div>
            </>
          )}
      </div>
      <div className="right-body">
        <div className="row">
          {screenTitle === "Raw Materials Collected" && (
            <ItemMenu
              handleScreenTitleChange={handleScreenTitleChange}
            ></ItemMenu>
          )}
          {profileRole === "processingunit" &&
            screenTitle !== "Raw Materials Collected" && (
              <PUItemSelector ItemName={screenTitle}></PUItemSelector>
            )}
        </div>
      </div>
    </div>
  );
};

export default PUDashboard;
