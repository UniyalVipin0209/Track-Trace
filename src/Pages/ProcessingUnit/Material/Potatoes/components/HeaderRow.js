import React from "react";

const HeaderRow = ({ measurementUnit, dltFieldsSave }) => {
  return (
    <tr className="tb-header">
      <td className="col1">ID</td>
      <td className="col2" style={{ marginLeft: "3px" }}>
        Category
      </td>
      <td>Farmer Name</td>
      <td>Quantity {measurementUnit}</td>
      <td>Material Exp. Date</td>
      <td>Size</td>
      <td>Material Color</td>
      <td>pH Value</td>
      <td>Temperature</td>

      {dltFieldsSave && (
        <>
          <td className="col7" hidden={!dltFieldsSave}>
            Block
          </td>
          <td className="col8" hidden={!dltFieldsSave}>
            Hash
          </td>
        </>
      )}
    </tr>
  );
};

export default HeaderRow;
