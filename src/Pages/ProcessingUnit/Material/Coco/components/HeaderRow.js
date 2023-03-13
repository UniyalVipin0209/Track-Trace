import React from "react";

const HeaderRow = ({ measurementUnit, dltFieldsSaved }) => {
  return (
    <tr className="tb-header">
      <td className="col1">ID</td>
      <td className="col2">Raw Material Name</td>
      <td>Farmer Name</td>
      <td>Quantity {measurementUnit}</td>
      <td>Bean Type</td>
      <td>Material Exp. Date</td>
      <td>Material Color</td>
      <td>Dry</td>
      <td>Temperature</td>
      {dltFieldsSaved ? (
        <>
          <td className="col7">Block</td>
          <td className="col8">Hash</td>
        </>
      ) : (
        <>
          <td className="col7" hidden>
            Block
          </td>
          <td className="col8" hidden>
            Hash
          </td>
        </>
      )}

      <td className="text-center">&nbsp;&nbsp;Action</td>
    </tr>
  );
};

export default HeaderRow;
