import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
const SavedRows = ({
  index,
  val,
  editFields,
  deleteFields,
  dltFieldsSaved,
}) => {
  return (
    <tr key={"productTB" + index} className="tb-body">
      <td>{val.Record.key}</td>
      <td>{val.Record.material_name}</td>
      <td>{val.Record.farmer_name}</td>
      <td>{val.Record.quantity}</td>
      <td>{val.Record.exp_date}</td>
      <td>{val.Record.size}</td>
      <td>{val.Record.material_color}</td>
      <td>{val.Record.ph_value}</td>
      <td>{val.Record.temp}</td>

      {dltFieldsSaved ? (
        <>
          <td className="col8">Hash</td>
        </>
      ) : (
        <>
          <td className="col8" hidden>
            {val.Record.hash}
          </td>
        </>
      )}
    </tr>
  );
};

export default SavedRows;
