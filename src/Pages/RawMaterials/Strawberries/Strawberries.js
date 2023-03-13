import React, { Component, useEffect } from "react";
import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine, RiSaveFill } from "react-icons/ri";

class Strawberries extends Component {
  constructor() {
    super();
    this.state = {
      counter: 104,
      tempData: {
        id: "F104",
        material_name: "",
        farmer_name: "",
        quantity: "",
        exp_date: "",
        duration: "",
        material_color: "",
        ph_value: 0,
        block: "",
        hash: "",
        internaltemp: "",
        row_action: "",
      },
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

  editFields = (i) => {
    var temp2 = this.state;
    temp2.itemData[i].row_action = "edit";
    this.setState(temp2);
  };
  saveFields = (i) => {
    var temp2 = this.state;
    temp2.itemData[i].row_action = "Updated";
    this.setState(temp2);
  };
  // useEffect(()=>{console.log('State=> ',this.state)},[this.state])

  addMaterial = () => {
    var temp2 = this.state;
    temp2.itemData.push(this.state.tempData);
    temp2.counter++;
    this.setState(temp2);
  };

  handleTempDataChange = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      tempData: { ...this.state.tempData, [e.target.name]: e.target.value },
    });
  };

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
            <td className="text-center">Action</td>
          </tr>
          <tr className="tb-body">
            <td className="col1">{this.state.tempData.id}</td>
            <td className="col2">
              <input
                type="text"
                name="material_name"
                value={this.state.tempData.material_name}
                onChange={($event) => this.handleTempDataChange($event)}
              />
            </td>
            <td className="col3">
              <input
                type="text"
                name="farmer_name"
                value={this.state.tempData.farmer_name}
                onChange={($event) => this.handleTempDataChange($event)}
              />
            </td>
            <td className="col4">
              <input
                type="text"
                name="quantity"
                value={this.state.tempData.quantity}
                onChange={($event) => this.handleTempDataChange($event)}
              />
            </td>
            <td className="col5">
              <input
                type="date"
                name="exp_date"
                value={this.state.tempData.exp_date}
                onChange={($event) => this.handleTempDataChange($event)}
              />
            </td>
            <td className="col6">
              <input
                type="text"
                name="duration"
                value={this.state.tempData.duration}
                onChange={($event) => this.handleTempDataChange($event)}
              />
            </td>
            <td className="col7">
              <input
                type="text"
                name="material_color"
                value={this.state.tempData.material_color}
                onChange={($event) => this.handleTempDataChange($event)}
              />
            </td>
            <td className="col8">
              <input
                type="text"
                name="ph_value"
                value={this.state.tempData.ph_value}
                onChange={($event) => this.handleTempDataChange($event)}
              />
            </td>
            <td className="col8">
              <input
                type="text"
                name="block"
                value={this.state.tempData.block}
                onChange={($event) => this.handleTempDataChange($event)}
              />
            </td>
            <td className="col8">
              <input
                type="text"
                name="hash"
                value={this.state.tempData.hash}
                onChange={($event) => this.handleTempDataChange($event)}
              />
            </td>
            <td className="col9">
              <input
                type="text"
                name="internaltemp"
                value={this.state.tempData.internaltemp}
                onChange={($event) => this.handleTempDataChange($event)}
              />
            </td>
            <td className="col10" style={{ width: "6%" }}>
              <RiSaveFill
                onClick={this.addMaterial}
                className="updt-otps-edit"
                style={{ cursor: "pointer" }}
              ></RiSaveFill>{" "}
              <RiDeleteBinLine
                className="updt-opts-delete"
                style={{ marginLeft: "1rem", fontSize: "0.9rem" }}
              ></RiDeleteBinLine>
            </td>
          </tr>
          {this.state.itemData.map((val, index) =>
            val.row_action !== "edit" ? (
              <tr key={"productTB" + index} className="tb-body">
                <td>{val.id}</td>
                <td>{val.material_name}</td>
                <td>{val.farmer_name}</td>
                <td>{val.quantity}</td>
                <td>{val.exp_date}</td>
                <td>{val.duration}</td>
                <td>{val.material_color}</td>
                <td>{val.ph_value}</td>
                <td>{val.block}</td>
                <td>{val.hash}</td>
                <td>{val.internaltemp}</td>
                <td className="update-opts">
                  <MdOutlineEdit
                    onClick={() => this.editFields(index)}
                    className="updt-otps-edit"
                  ></MdOutlineEdit>{" "}
                  <RiDeleteBinLine className="updt-opts-delete"></RiDeleteBinLine>
                </td>
              </tr>
            ) : (
              <tr key={"productTB" + index} className="tb-body">
                <td className="col1">{val.id}</td>
                <td className="col2">{val.material_name}</td>
                <td className="col3">
                  <input type="text" defaultValue={val.farmer_name} />
                </td>
                <td className="col4">
                  <input type="text" defaultValue={val.quantity} />
                </td>
                <td className="col5">
                  <input type="text" defaultValue={val.exp_date} />
                </td>
                <td className="col6">
                  <input type="text" defaultValue={val.duration} />
                </td>
                <td className="col7">
                  <input type="text" defaultValue={val.material_color} />
                </td>
                <td className="col8">
                  <input type="text" defaultValue={val.ph_value} />
                </td>

                <td className="col7">
                  <input type="text" defaultValue={val.block} />
                </td>
                <td className="col8">
                  <input type="text" defaultValue={val.hash} />
                </td>
                <td className="col9">
                  <input type="text" defaultValue={val.internaltemp} />
                </td>
                <td className="col10" style={{ width: "6%" }}>
                  <RiSaveFill
                    onClick={() => this.saveFields(index)}
                    className="updt-otps-edit"
                  ></RiSaveFill>{" "}
                  <RiDeleteBinLine
                    className="updt-opts-delete"
                    style={{ marginLeft: "1rem", fontSize: "0.9rem" }}
                  ></RiDeleteBinLine>
                </td>
                {/* <td className="update-opts"><MdOutlineEdit className='updt-otps-edit'></MdOutlineEdit> <RiDeleteBinLine className='updt-opts-delete'></RiDeleteBinLine></td> */}
              </tr>
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
              >
                Plus
              </BsFillPlusCircleFill>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Strawberries;
