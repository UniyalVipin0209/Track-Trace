import React from "react";

import Milk from "../ProcessingUnit/Material/Milk/Milk";
import Coco from "../ProcessingUnit/Material/Coco/Coco";
import Mangoes from "../ProcessingUnit/Material/Mangoes/Mangoes";
import Apples from "../ProcessingUnit/Material/Apples/Apples";
import Rice from "../ProcessingUnit/Material/Rice/Rice";
import Strawberries from "../ProcessingUnit/Material/Strawberries/Strawberries";
import Honey from "../ProcessingUnit/Material/Honey/Honey";
import Flour from "../ProcessingUnit/Material/Flour/Flour";
import Oils from "../ProcessingUnit/Material/Oils/Oils";
import Potatoes from "../ProcessingUnit/Material/Potatoes/Potatoes";

const DUItemSelector = (props) => {
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
  else if (props.ItemName === "Rice") _ItemSelected = <Rice />;
  return <div>{_ItemSelected}</div>;
};

export default DUItemSelector;
