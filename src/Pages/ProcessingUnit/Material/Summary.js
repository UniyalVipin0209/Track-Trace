import React, { useState } from "react";
import { Col, Row } from "antd";
import milkIcon from "../../../Assests/icons/twemoji_glass-of-milk.svg";
// import milkIcon from "../../../Assests/icons/twemoji_glass-of-milk.svg";
import cocoBeans from "../../../Assests/icons/cocoa (1) 1.svg";
import oilIcon from "../../../Assests/icons/fat 1.svg";
import strawBerry from "../../../Assests/icons/emojione_strawberry.svg";
import flour from "../../../Assests/icons/flour 1.svg";
import apples from "../../../Assests/icons/apples 1.svg";
import honey from "../../../Assests/icons/noto_honey-pot.svg";
import potato from "../../../Assests/icons/noto_potato.svg";
import mango from "../../../Assests/icons/noto_mango.svg";
import rice from "../../../Assests/icons/noto_sheaf-of-rice.svg";
import almond from "../../../Assests/icons/almond.svg";

import { map } from "d3";
export const Summary = (props) => {
  const IconList = [
    {
      item_name: "Milk",
      bgColorValue: "#F3F9FC",
      iconImg: milkIcon,
    },
    {
      item_name: "Cocoa Beans",
      bgColorValue: "#FFF8F5",
      iconImg: cocoBeans,
    },
    {
      item_name: "Oils",
      bgColorValue: "#FCFAF3",
      iconImg: oilIcon,
    },
    {
      item_name: "Flour",
      bgColorValue: "#FCF5F3",
      iconImg: flour,
    },
    {
      item_name: "Apples",
      bgColorValue: "#F5FCF3",
      iconImg: apples,
    },
    {
      item_name: "Strawberries",
      bgColorValue: "#FCF3F3",
      iconImg: strawBerry,
    },
    {
      item_name: "Honey",
      bgColorValue: "#FFFAED",
      iconImg: honey,
    },
    ,
    {
      item_name: "Potatoes",
      bgColorValue: "#FFF8F5",
      iconImg: potato,
    },
    {
      item_name: "Almonds",
      bgColorValue: "#FFF8F5",
      iconImg: almond,
    },
    {
      item_name: "Rice",
      bgColorValue: "#FCFBF3",
      iconImg: rice,
    },
    {
      item_name: "Mangoes",
      bgColorValue: "#FCF4F3",
      iconImg: mango,
    },
  ];
  const [iconConfig, setIconConfig] = useState(IconList);
  const [unit, setUnits] = useState(props.MeasurementUnit);

  const iconCriteria = (elem) => elem.item_name === props.ItemName;
  const filterCriteria = IconList.filter(iconCriteria);
  return (
    <>
      <div className="row">
        <span
          className="main-title"
          style={{ marginLeft: "20px", fontSize: "bold" }}
        >
          {props.ItemName}
        </span>{" "}
        &nbsp;
      </div>
      <div className="row">
        <Row>
          <Col span={5} style={{ background: filterCriteria[0].bgColorValue }}>
            <div
              style={{
                height: "35px",
                width: "200px",
                margin: "16px",
                display: "flex",
                fontSize: ".82rem",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <span>
                <span style={{ fontWeight: "bold" }}>Total Units : </span>
                <br
                  style={{
                    height: "0px!important",
                    lineHeight: "0px!important",
                  }}
                />
                <span
                  style={{
                    textAlign: "top",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "0.74rem",
                    letterSpacing: ".15rem",
                    color: "black",
                    fontWeight: "bold",
                    lineHeight: "20px",
                    height: "18px",
                  }}
                >
                  (In &nbsp;{unit})
                </span>{" "}
              </span>
              <span style={{ marginRight: "10px" }}> &nbsp; {props.Total}</span>
              {"   "}
              <span
                style={{
                  position: "absolute",
                  marginLeft: "1.5rem",
                  right: ".6rem",
                  width: "30px",
                }}
              >
                &nbsp;&nbsp;
                <img
                  src={filterCriteria[0].iconImg}
                  style={{ width: "22px" }}
                  alt={props.ItemName}
                />{" "}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
