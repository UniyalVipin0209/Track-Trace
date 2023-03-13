import React from "react";

const HeaderRow = ({ measurementUnit, dltFieldsSave }) => {
  return (
    <tr className="tb-header">
      <td className="col1">ID</td>
      <td className="col2">Primary Comodity</td>
      <td>Farmer Name</td>
      <td>Quantity {measurementUnit}</td>
      <td>Animal Type</td>
      <td>Material Exp. Date</td>
      <td>Material Color</td>
      <td>Ph Value</td>
      <td>Temperature</td>

      {dltFieldsSave ? (
        <>
          <td className="col8">Hash</td>
        </>
      ) : (
        <>
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
