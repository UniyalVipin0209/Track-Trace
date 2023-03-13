import React from "react";
import { useState } from "react";
import { GiMilkCarton } from "react-icons/gi";
import milkIcon from "../../Assests/icons/twemoji_glass-of-milk.svg";
import cocoBeans from "../../Assests/icons/cocoa (1) 1.svg";
import oilIcon from "../../Assests/icons/fat 1.svg";
import strawBerry from "../../Assests/icons/emojione_strawberry.svg";
import flour from "../../Assests/icons/flour 1.svg";
import apples from "../../Assests/icons/apples 1.svg";
import honey from "../../Assests/icons/noto_honey-pot.svg";
import almond from "../../Assests/icons/almond.svg";

import potato from "../../Assests/icons/noto_potato.svg";
import mango from "../../Assests/icons/noto_mango.svg";
import rice from "../../Assests/icons/noto_sheaf-of-rice.svg";
import { MenuItem } from "semantic-ui-react";
// import  from '../../Assests/icons/.svg';
// import  from '../../Assests/icons/.svg';

const ItemMenu = ({ handleScreenTitleChange }) => {
  const [materials, setMaterials] = useState([
    {
      item_name: "Milk",
      bgColorValue: "#F3F9FC",
      img: milkIcon,
    },
    {
      item_name: "Cocoa Beans",
      bgColorValue: "#FFF8F5",
      img: cocoBeans,
    },
    {
      item_name: "Oils",
      bgColorValue: "#FCFAF3",
      img: oilIcon,
    },
    {
      item_name: "Flour",
      bgColorValue: "#FCF5F3",
      img: flour,
    },
    {
      item_name: "Apples",
      bgColorValue: "#F5FCF3",
      img: apples,
    },
    {
      item_name: "Strawberries",
      bgColorValue: "#FCF3F3",
      img: strawBerry,
    },
    {
      item_name: "Honey",
      bgColorValue: "#FFFAED",
      img: honey,
    },
    ,
    {
      item_name: "Almonds",
      bgColorValue: "#FFF8F5",
      img: almond,
    },
    {
      item_name: "Rice",
      bgColorValue: "#FCFBF3",
      img: rice,
    },
    {
      item_name: "Mangoes",
      bgColorValue: "#FCF4F3",
      img: mango,
    },
  ]);
  return (
    <>
      {materials.map((val, i) => (
        <div key={"materials-" + i} className="col-md-2 mt-4">
          <div
            className="items-card"
            onClick={() => handleScreenTitleChange(val.item_name)}
            style={{ backgroundColor: val.bgColorValue }}
          >
            <span>{val.item_name}</span>
            <span style={{ position: "absolute", right: "1rem" }}>
              <img src={val.img} style={{ width: "22px", height: "20px" }} />{" "}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ItemMenu;
