import React from "react";
import { RiDeleteBinLine, RiSaveFill } from "react-icons/ri";
import { checkQuantity, checkNumWithDecimal } from "../../ApiUtility.js";

const InsertRowTemplate = ({
  tempData,
  handleTempDataChange,
  addMaterial,
  dltFieldsSaved,
}) => {
  return (
    <tr className="tb-body">
      <td className="col1">{tempData.key}</td>

      <td className="col2">
        <input
          type="text"
          name="material_name"
          value={tempData.material_name}
          onChange={($event) => handleTempDataChange($event)}
        />
      </td>
      <td className="col3">
        <input
          type="text"
          name="farmer_name"
          value={tempData.farmer_name}
          onChange={($event) => handleTempDataChange($event)}
        />
      </td>
      <td className="col4">
        <input
          type="text"
          name="quantity"
          value={tempData.quantity}
          onChange={($event) => {
            if (checkQuantity($event)) handleTempDataChange($event);
          }}
        />
      </td>
      <td className="col5">
        <input
          type="date"
          name="exp_date"
          value={tempData.exp_date}
          onChange={($event) => handleTempDataChange($event)}
        />
      </td>
      <td className="col6">
        <input
          type="text"
          name="storage_mechanism"
          value={tempData.storage_mechanism}
          onChange={($event) => handleTempDataChange($event)}
        />
      </td>
      <td className="col5">
        <input
          type="text"
          name="material_color"
          value={tempData.material_color}
          onChange={($event) => handleTempDataChange($event)}
        />
      </td>

      <td className="col5">
        <input
          type="text"
          name="ph_value"
          value={tempData.ph_value}
          onChange={($event) => {
            if (checkQuantity($event)) handleTempDataChange($event);
          }}
        />
      </td>
      <td className="col8">
        <input
          type="text"
          name="temp"
          value={tempData.temp}
          onChange={($event) => {
            if (checkQuantity($event)) handleTempDataChange($event);
          }}
        />
      </td>
      {dltFieldsSaved ? (
        <>
          <td className="col8">
            <input type="text" name="hash" value={tempData.hash} />
          </td>
        </>
      ) : (
        <>
          <td className="col8" hidden>
            <input type="text" name="hash" value={tempData.hash} />
          </td>
        </>
      )}
      <td className="col10" style={{ width: "6%" }}>
        <RiSaveFill
          onClick={(e) => {
            addMaterial(e);
          }}
          className="updt-otps-edit"
          style={{
            cursor: "pointer",
            marginLeft: ".7rem",
            fontSize: "0.68rem",
          }}
        ></RiSaveFill>{" "}
        <RiDeleteBinLine
          className="updt-opts-delete"
          style={{
            cursor: "pointer",
            marginLeft: ".7rem",
            fontSize: "0.68rem",
          }}
        ></RiDeleteBinLine>
      </td>
    </tr>
  );
};

export default InsertRowTemplate;
