import React from "react";

import Milk from "../RawMaterials/Milk/Milk";
import Coco from "../RawMaterials/Coco/Coco";
import Mangoes from "../RawMaterials/Mangoes/Mangoes";
import Apples from "../RawMaterials/Apples/Apples";
import Rice from "../RawMaterials/Rice/Rice";
import Strawberries from "../RawMaterials/Strawberries/Strawberries";
import Honey from "../RawMaterials/Honey/Honey";
import Flour from "../RawMaterials/Flour/Flour";
import Oils from "../RawMaterials/Oils/Oils";
import Potatoes from "../RawMaterials/Potatoes/Potatoes";
import Almonds from "./../RawMaterials/Almonds/Almonds";

const ItemSelector = (props) => {
  console.log("Selected Itemname::", props.ItemName);

  var _ItemSelected = "";
  if (props.ItemName === "Milk") _ItemSelected = <Milk />;
  else if (props.ItemName === "Cocoa Beans") _ItemSelected = <Coco />;
  else if (props.ItemName === "Mangoes") _ItemSelected = <Mangoes />;
  else if (props.ItemName === "Apples") _ItemSelected = <Apples />;
  else if (props.ItemName === "Oils") _ItemSelected = <Oils />;
  else if (props.ItemName === "Flour") _ItemSelected = <Flour />;
  else if (props.ItemName === "Strawberries") _ItemSelected = <Strawberries />;
  else if (props.ItemName === "Honey") _ItemSelected = <Honey />;
  else if (props.ItemName === "Potatoes") _ItemSelected = <Potatoes />;
  else if (props.ItemName === "Almonds") _ItemSelected = <Almonds />;
  else if (props.ItemName === "Rice") _ItemSelected = <Rice />;
  return <div>{_ItemSelected}</div>;
};

export default ItemSelector;
