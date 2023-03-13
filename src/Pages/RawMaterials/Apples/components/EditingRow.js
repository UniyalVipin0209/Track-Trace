import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine, RiSaveFill } from "react-icons/ri";
import { checkQuantity, checkNumWithDecimal } from "../../ApiUtility.js";

const EditingRow = ({
  index,
  val,
  saveFields,
  handleEditDataChange,
  dltFieldsSaved,
}) => {
  return (
    <tr key={"productTB" + index} className="tb-body">
      <td className="col1">{val.Record.key}</td>
      <td className="col2">
        <input
          type="text"
          name="material_name"
          defaultValue={val.Record.material_name}
          onChange={($event) => handleEditDataChange($event)}
        />
      </td>
      <td className="col3">
        <input
          type="text"
          name="farmer_name"
          defaultValue={val.Record.farmer_name}
          onChange={($event) => handleEditDataChange($event)}
        />
      </td>
      <td className="col4">
        <input
          type="text"
          name="quantity"
          defaultValue={val.Record.quantity}
          onChange={($event) => {
            if (checkQuantity($event)) handleEditDataChange($event);
          }}
        />
      </td>
      <td className="col5">
        <input
          type="date"
          name="exp_date"
          defaultValue={val.Record.exp_date}
          onChange={($event) => handleEditDataChange($event)}
        />
      </td>
      <td className="col6">
        <input
          type="text"
          name="size"
          defaultValue={val.Record.size}
          onChange={($event) => handleEditDataChange($event)}
        />
      </td>
      <td className="col7">
        <input
          type="text"
          name="material_color"
          defaultValue={val.Record.material_color}
          onChange={($event) => handleEditDataChange($event)}
        />
      </td>
      <td
        className="col8"
        style={{ marginBlockStart: "5px", textAlign: "center" }}
      >
        <input
          type="text"
          name="ph_value"
          defaultValue={val.Record.ph_value}
          onChange={($event) => {
            if (checkNumWithDecimal($event)) handleEditDataChange($event);
          }}
        />
      </td>
      <td
        className="col8"
        style={{ marginBlockStart: "5px", textAlign: "center" }}
      >
        <input
          type="text"
          defaultValue={val.Record.temp}
          onChange={($event) => {
            if (checkNumWithDecimal($event)) handleEditDataChange($event);
          }}
        />
      </td>

      {dltFieldsSaved ? (
        <>
          <td className="col8">
            <input
              type="text"
              name="hash"
              defaultValue={val.Record.hash}
              readOnly
            />
          </td>
        </>
      ) : (
        <>
          <td className="col8" hidden>
            <input
              type="text"
              name="hash"
              defaultValue={val.Record.hash}
              readOnly
            />
          </td>
        </>
      )}

      <td className="col10" style={{ width: "6%" }}>
        <RiSaveFill
          onClick={(event) => {
            saveFields(event, index);
          }}
          className="updt-otps-edit"
        ></RiSaveFill>{" "}
        <RiDeleteBinLine
          className="updt-opts-delete"
          style={{ marginLeft: "1rem", fontSize: "0.9rem" }}
        ></RiDeleteBinLine>
      </td>
    </tr>
  );
};

export default EditingRow;
