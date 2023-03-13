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
import DUItemSelector from "../ItemDetails/DUItemSelector";
import DisplayDate from "../DisplayDate";
import PUItemSelector from "./../ItemDetails/PUItemSelector";

const DUDashboard = () => {
  const [profileRole] = useState(localStorage.getItem("loginRole"));

  const [screenTitle, setTitle] = useState("Distribution Unit");

  const handleScreenTitleChange = (name) => {
    console.log("Change::", name);
    setTitle(name);
  };

  return (
    <div className="full-layout-right-body">
      <div className="top-right-header">
        <div className="_40_percent">
          {screenTitle !== "Distribution Unit" && (
            <IoMdArrowRoundBack
              onClick={() => {
                handleScreenTitleChange("Distribution Unit");
              }}
              style={{ cursor: "pointer" }}
            ></IoMdArrowRoundBack>
          )}{" "}
          Distribution Unit
        </div>
        <div className="_60_percent">
          <input type="map" placeholder="Address" /> &nbsp;&nbsp; &nbsp;&nbsp;
          <Autocomplete
            placeholder="Address"
            onPlaceSelected={(place) => {
              console.log(place);
            }}
          />
          &nbsp;&nbsp; &nbsp;&nbsp;
        </div>
      </div>

      <div className="mid-right-body">
        {screenTitle === "Explore Raw Materials" && (
          <div className="left-title">
            <span className="main-title">Explore Raw Materials</span> &nbsp;
            &nbsp; <span className="sub-title">View all</span>
          </div>
        )}
        {profileRole === "collectionunit" &&
          screenTitle !== "Explore Raw Materials" && (
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
        {profileRole === "processingunit" &&
          screenTitle !== "Explore Raw Materials" && <></>}
      </div>
      <div className="right-body">
        <div className="row">
          {screenTitle === "Explore Raw Materials" && (
            <ItemMenu
              handleScreenTitleChange={handleScreenTitleChange}
            ></ItemMenu>
          )}
          {profileRole === "collectionunit" &&
            screenTitle !== "Explore Raw Materials" && (
              <PUItemSelector ItemName={screenTitle}></PUItemSelector>
            )}
        </div>
      </div>
    </div>
  );
};

export default DUDashboard;
