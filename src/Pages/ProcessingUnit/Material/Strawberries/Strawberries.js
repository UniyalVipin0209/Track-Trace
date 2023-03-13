import React, { Component, useEffect } from "react";
import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine, RiSaveFill } from "react-icons/ri";

class Strawberries extends Component {
  constructor() {
    super();
    this.state = {
      itemData: [
        {
          id: "F101",
          material_name: "Cow Milk",
          farmer_name: "Ram",
          quantity: "10 Kg",
          exp_date: "June 25, 2022",
          duration: "17 Hour",
          material_color: "Creamy White",
          ph_value: 6.7,
          block: "12345889",
          hash: "0x98ABC12UI5780",
          internaltemp: "10.20 C",
          row_action: "Updated",
        },
        {
          id: "F102",
          material_name: "Cow Milk",
          farmer_name: "Ram",
          quantity: "10 Kg",
          exp_date: "June 25, 2022",
          duration: "20 Hour",
          material_color: "Creamy White",
          ph_value: 6.7,
          block: "12345889",
          hash: "0x98ABC12UI5780",
          internaltemp: "10.20 C",
          row_action: "Updated",
        },
        {
          id: "F103",
          material_name: "Cow Milk",
          farmer_name: "Ram",
          quantity: "10 Kg",
          exp_date: "June 25, 2022",
          duration: "19 Hour",
          material_color: "Creamy White",
          ph_value: 6.7,
          block: "12345889",
          hash: "0x98ABC12UI5780",
          internaltemp: "10.20 C",
          row_action: "Updated",
        },
      ],
    };
  }

  componentDidMount() {
    this.setState({});
  }
  componentDidUpdate(prev) {}

  // useEffect(()=>{console.log('State=> ',this.state)},[this.state])

  render() {
    console.log(this.state);
    return (
      <div className="col-md-12 mt-4 items-details">
        <table className="items-details-table">
          <tr className="tb-header">
            <td className="col1">ID</td>
            <td className="col2">Raw Material Name</td>
            <td>Farmer Name</td>
            <td>Quantity</td>
            <td>Material Exp. Date</td>
            <td>Duration Hour</td>
            <td>Material Color</td>
            <td>pH Value</td>
            <td>Block</td>
            <td>Hash</td>
            <td>Internal Temperature</td>
          </tr>

          {this.state.itemData.map((val, index) => (
            <tr key={"productTB" + index} className="tb-body">
              <td className="col1">{val.id}</td>
              <td className="col2">{val.material_name}</td>
              <td className="col3">{val.farmer_name}</td>
              <td className="col4">{val.quantity}</td>
              <td className="col5">{val.exp_date}</td>
              <td className="col6">{val.duration}</td>
              <td className="col7">{val.material_color}</td>
              <td className="col8">{val.ph_value}</td>

              <td className="col7">{val.block}</td>
              <td className="col8">{val.hash}</td>
              <td className="col9">{val.internaltemp}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default Strawberries;
