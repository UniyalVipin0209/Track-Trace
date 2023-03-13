import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine, RiSaveFill } from "react-icons/ri";
const EditingRow = ({
  index,
  val,
  saveFields,
  handleEditDataChange,
  dltFieldsSave,
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
          onChange={($event) => handleEditDataChange($event)}
        />
      </td>
      <td className="col6">
        <input
          type="text"
          name="animal_type"
          defaultValue={val.Record.animal_type}
          onChange={($event) => handleEditDataChange($event)}
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

      <td className="col7">
        <input
          type="text"
          name="material_color"
          defaultValue={val.Record.material_color}
          onChange={($event) => handleEditDataChange($event)}
        />
      </td>
      <td className="col8">
        <input
          type="text"
          name="ph_value"
          defaultValue={val.Record.ph_value}
          onChange={($event) => handleEditDataChange($event)}
        />
      </td>
      <td className="col8" style={{ marginBlockStart: "5px" }}>
        <input
          type="text"
          defaultValue={val.Record.temp}
          onChange={($event) => handleEditDataChange($event)}
        />
      </td>
      {dltFieldsSave ? (
        <>
          <td className="col7">
            <input
              type="text"
              name="block"
              defaultValue={val.Record.block}
              readOnly
            />
          </td>
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
          <td className="col7" hidden="true">
            <input
              type="text"
              name="block"
              defaultValue={val.Record.block}
              readOnly
            />
          </td>
          <td className="col8" hidden="true">
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
