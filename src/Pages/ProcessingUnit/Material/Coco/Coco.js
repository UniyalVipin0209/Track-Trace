import React, { useState, useEffect, useReducer } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import HeaderRow from "./components/HeaderRow.js";
import SavedRows from "./components/SavedRows.js";
import { createDataSchema } from "./DefaultSchema.js";

import { PrerequistiesConfig } from "../ApiUtility.js";
const Coco = () => {
  const [screenTitle] = useState("Coco");
  const [tempData, setTempData] = useState(createDataSchema);
  const [measurementUnit] = useState("Litre");

  const [itemData, setItemData] = useState([]);

  const [infoMessage, setInfoMessage] = useState("");
  const [dltFieldsSaved, setDltFieldsSaved] = useState(false);

  const fetchData = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };
  const handleFetchResponse = async (res, setInfoMessage, setItemData) => {
    const response = await res.data;
    console.log("Response ::", response);
    console.log(response.status);
    if (typeof response === "object" && typeof response.result == "string") {
      // issue in backend(configuration side)
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
      console.log("Map--");
      response.result?.map((elem) => console.log(elem.Key, elem.Record));
      setItemData(response.result);
    }
  };
  useEffect(() => {
    //Code to add Api logic
    var { endPoint, config } = PrerequistiesConfig(screenTitle);
    var apiResponse = fetchData(endPoint, config);
    apiResponse.then((res) => {
      handleFetchResponse(res, setInfoMessage, setItemData);
    });
  }, []);

  return (
    <div className="col-md-12 mt-4 items-details">
      <table className="items-details-table">
        <HeaderRow
          measurementUnit={measurementUnit}
          dltFieldsSaved={dltFieldsSaved}
        />

        {infoMessage !== "Error" &&
          itemData.map((val, index) => (
            <SavedRows
              index={index}
              val={val}
              dltFieldsSaved={dltFieldsSaved}
            />
          ))}
      </table>
    </div>
  );
};
export default Coco;
