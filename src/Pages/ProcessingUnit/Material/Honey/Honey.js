import React, { useState, useEffect, useReducer } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import HeaderRow from "./components/HeaderRow.js";
import SavedRows from "./components/SavedRows.js";

import {
  PrerequistiesConfig,
  PrerequistiesConfigSummary,
} from "../ApiUtility.js";
import { Summary } from "../Summary.js";
const Honey = () => {
  const [screenTitle] = useState("Honey");
  const [measurementUnit] = useState("Litres");

  const [itemData, setItemData] = useState([]);
  const [itemTotalQty, setItemTotalQty] = useState("");
  const [itemTotalQtyMsg, setItemTotalQtyMsg] = useState("");

  const [dltFieldsSaved, setDltFieldsSaved] = useState(false);

  const [infoMessage, setInfoMessage] = useState("");

  const fetchAllApis = async (
    screenTitle,
    setInfoMessage,
    setItemData,
    setItemTotalQty,
    itemTotalQty
  ) => {
    var { endPoint, config } = PrerequistiesConfig(screenTitle);
    var { endPointSummary, configSummary } =
      PrerequistiesConfigSummary(screenTitle);

    let fetchData = {
      URL: endPoint,
      CONFIG: config,
    };
    let fetchTotal = {
      URL: endPointSummary,
      CONFIG: configSummary,
    };

    const fetchDataAPI = axios.get(fetchData.URL, fetchData.CONFIG);
    const fetchTotalAPI = axios.get(fetchTotal.URL, fetchTotal.CONFIG);

    await axios.all([fetchDataAPI, fetchTotalAPI]).then(
      axios.spread((...allData) => {
        const fetchDataAPIRes = allData[0];
        const fetchTotalAPIRes = allData[1];

        if (
          typeof fetchDataAPIRes === "object" &&
          typeof fetchDataAPIRes.result == "string"
        ) {
          // issue in backend(configuration side)
          if (fetchDataAPIRes.result.includes("error")) setInfoMessage("Error");
        } else if (
          typeof fetchDataAPIRes === "object" &&
          fetchDataAPIRes.error != null &&
          fetchDataAPIRes.errorData != null &&
          fetchDataAPIRes.result.length === 0 &&
          typeof fetchDataAPIRes.result == "string"
        ) {
          setInfoMessage("");
        } else {
          console.log("Map--", fetchDataAPIRes.data.result);
          // fetchDataAPIRes.result?.map((elem) =>
          //   console.log("Items ::", elem.Key, elem.Record)
          // );
          setItemData(fetchDataAPIRes.data.result);
        }

        console.log("fetchTotalAPIRes ", fetchTotalAPIRes);

        if (
          fetchTotalAPIRes.data.error == null &&
          fetchTotalAPIRes.data.errorData == null &&
          typeof fetchTotalAPIRes.data === "object" &&
          typeof fetchTotalAPIRes.data.result == "object"
        ) {
          // issue in backend(configuration side)
          console.log(
            "fetchTotalAPIRes.data ::",
            fetchTotalAPIRes.data.result.totalAmountProduct
          );
          setItemTotalQty(fetchTotalAPIRes.data.result.totalAmountProduct);
          console.log("Total ::", itemTotalQty);
        }
      })
    );
  };

  useEffect(() => {
    fetchAllApis(
      screenTitle,
      setInfoMessage,
      setItemData,
      setItemTotalQty,
      itemTotalQty
    );
  }, []);

  return (
    <>
      <>
        {itemTotalQtyMsg !== "Error" ? (
          <Summary
            ItemName="Honey"
            Total={itemTotalQty}
            MeasurementUnit={measurementUnit}
          />
        ) : (
          <Summary ItemName="Honey" Total="N/A" MeasurementUnit="" />
        )}

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
      </>
    </>
  );
};
export default Honey;
