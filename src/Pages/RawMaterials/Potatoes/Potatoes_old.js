import React, { useState, useEffect, useReducer } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import HeaderRow from "./components/HeaderRow.js";
import InsertRowTemplate from "./components/InsertRowTemplate.js";
import SavedRows from "./components/SavedRows.js";
import EditingRow from "./components/EditingRow.js";
import { createDataSchema, updateDataSchema } from "./DefaultSchema.js";

import {
  PrerequistiesConfig,
  PrerequistiesDelete,
  PrerequistiesInsUpd,
} from "../ApiUtility.js";
const Potatoes = () => {
  const [screenTitle] = useState("Potatoes");
  const [tempData, setTempData] = useState(createDataSchema);
  const [measurementUnit] = useState("Kg");

  const [itemData, setItemData] = useState([]);

  const [editSaveInstance, setEditSaveInstance] = useState(updateDataSchema);

  const [infoMessage, setInfoMessage] = useState("");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
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
  }, [reducerValue]);

  const editFields = (event, i) => {
    event.preventDefault();
    var prevState = itemData;
    prevState[i].row_action = "edit";

    console.log("Edit Click::", prevState);
    setEditSaveInstance(prevState[i].Record);
    setItemData(prevState);
  };
  const saveFields = (event, i) => {
    event.preventDefault();
    var temp2 = editSaveInstance;
    // temp2.itemData[i].row_action = "Updated";
    console.log("saveFields Click::", temp2);
    //editProduct implemented in addProduct
    addProduct1(temp2, "edit");
  };

  const deleteFields = (event, i) => {
    event.preventDefault();
    console.log("delete Click::", itemData[i].Record.key);

    //Displal alert on confirm delete it.
    deleteProduct1(itemData[i].Record.key);
  };
  const addMaterial = (event) => {
    event.preventDefault();
    var tempAdd = addRowActionValue(tempData, "updated");
    console.log("Add ::", tempAdd);
    addProduct1(tempAdd, "add");
  };
  const addRowActionValue = (tempObject, status) => {
    return {
      ...tempObject,
      row_action: status,
    };
  };

  const addProduct1 = async (productObject, mode) => {
    const inputParams = {
      args: productObject,
      fcn: "addproduct",
      defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
      actiontype: "POST",
    };
    //Code to add Api logic
    var { endPoint, data, config } = PrerequistiesInsUpd(inputParams);
    //console.log("AddProduct Object :::", productObject);

    const InsertEditAPI = async (endPoint, data, config, setInfoMessage) => {
      let modeMsg = {};
      modeMsg = mode === "add" ? "Inserted" : "Updated";
      let modeMsgErr = "";
      modeMsgErr = mode === "add" ? "Inserting" : "Updating";
      await axios
        .post(endPoint, data, config)
        .then((res) => {
          console.log("Api post ::", res.status);
          if (res.status === "200" || res.status === 200) {
            console.log("Success Response!!!");
            //assigning the last inserted object in state
            //let result = res.result;
            //console.log("API Respone::", result);

            Swal.fire({
              title: `Data ${modeMsg}  Successfully!!`,
              icon: "success",
              timer: 1500,
              html: `Data ${modeMsg}  Successfully for ${screenTitle}!! <br/>
                `,
            }).then((result) => {
              if (mode === "add") setTempData(createDataSchema);
              if (mode === "edit") setEditSaveInstance(updateDataSchema);
              forceUpdate();
            });
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          Swal.fire({
            title: `Error: Issue in ${modeMsgErr}  Successfully!!`,
            icon: "error",
            timer: 1500,
            html: `Issue in ${modeMsg} data for ${screenTitle}!! <br/>
              `,
          }).then((result) => {
            if (mode === "add") setTempData(createDataSchema);
            if (mode === "edit") setEditSaveInstance(updateDataSchema);
            forceUpdate();
          });
        });
    };

    InsertEditAPI(endPoint, data, config, setInfoMessage);
  };

  const deleteProduct1 = async (productKey, mode) => {
    const inputParams = {
      args: { key: productKey },
      fcn: "deleteProduct",
      defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
      actiontype: "DELETE",
    };
    //Code to add Api logic
    var { endPoint, data, config } = PrerequistiesDelete(inputParams);

    const deleteAPI = async (endPoint, data, config, setInfoMessage) => {
      let modeMsg = "deleted";
      let modeMsgErr = "deleting";
      await axios
        .post(endPoint, data, config)
        .then((res) => {
          console.log("Api post ::", res.status);
          if (res.status === "200" || res.status === 200) {
            Swal.fire({
              title: `Data ${modeMsg} successfully!!`,
              icon: "success",
              timer: 1500,
              html: `Data ${modeMsg} successfully for ${screenTitle}!! <br/>`,
            }).then((result) => {
              if (mode === "add") setTempData(createDataSchema);
              if (mode === "edit") setEditSaveInstance(updateDataSchema);
              forceUpdate();
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: `Error occurred in ${modeMsgErr} the data!!`,
            icon: "error",
            timer: 1500,
            html: `Error occurred in ${modeMsg} the data for ${screenTitle}!! <br/>`,
          }).then((result) => {
            setTempData(createDataSchema);
            forceUpdate();
          });
        });
    };

    deleteAPI(endPoint, data, config, setInfoMessage);
  };

  const handleTempDataChange = (e) => {
    e.preventDefault();

    setTempData({
      ...tempData,
      [e.target.name]: e.target.value,
    });
    console.log("onChange:: ", e.target.name, e.target.value);
  };

  const handleEditDataChange = (e) => {
    e.preventDefault();

    setEditSaveInstance({
      ...editSaveInstance,
      [e.target.name]: e.target.value,
    });
    console.log("handleEditDataChange::", editSaveInstance);
  };

  return (
    <div className="col-md-12 mt-4 items-details">
      <table className="items-details-table">
        <HeaderRow
          measurementUnit={measurementUnit}
          dltFieldsSaved={dltFieldsSaved}
        />
        <InsertRowTemplate
          tempData={tempData}
          handleTempDataChange={handleTempDataChange}
          addMaterial={addMaterial}
          dltFieldsSaved={dltFieldsSaved}
        />
        {infoMessage !== "Error" &&
          itemData.map((val, index) =>
            val.row_action !== "edit" ? (
              <SavedRows
                index={index}
                val={val}
                editFields={editFields}
                deleteFields={deleteFields}
                dltFieldsSaved={dltFieldsSaved}
              />
            ) : (
              <EditingRow
                index={index}
                val={val}
                saveFields={saveFields}
                handleEditDataChange={handleEditDataChange}
                dltFieldsSaved={dltFieldsSaved}
              />
            )
          )}
      </table>

      <div className="row mt-5">
        <div className="col-md-2">
          <button
            style={{
              background: "#043484",
              maxWidth: "60%",
              width: "90%",
              height: "1.8rem",
              fontSize: "0.7rem",
              color: "#fff",
              borderRadius: "5px",
              border: "0!important",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            Update
          </button>
        </div>
        <br></br>
        <div
          className="row mt-6"
          style={{ maxHeight: "90px", height: "100%" }}
        ></div>
        <div className="row mt-3">
          <div className="col-md-10"></div>
          <div className="col-md-2 p-2 gap-25">
            <BsFillPlusCircleFill
              size={45}
              style={{
                marginLeft: "20px",
                color: "#043484",
                height: "1.8rem",
                fontSize: "0.7rem",
                border: "0!important",
                alignContent: "center",
                alignItems: "center",
              }}
              onClick={(e) => {
                addMaterial(e);
              }}
            >
              Plus
            </BsFillPlusCircleFill>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Potatoes;
