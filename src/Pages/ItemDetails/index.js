import React, { Component, useEffect } from "react";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine, RiSaveFill } from "react-icons/ri";

class ItemDetails extends Component {
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
        animal_type: "",
        material_color: "",
        ph_value: 0,
        temp: "",
        row_action: "",
      },
      itemData: [
        {
          id: "F101",
          material_name: "Cow Milk",
          farmer_name: "Ram",
          quantity: "10 lit",
          exp_date: "June 25, 2022",
          animal_type: "Murah",
          material_color: "Creamy White",
          ph_value: 6.7,
          temp: "10.20 C",
          row_action: "Updated",
        },
        {
          id: "F102",
          material_name: "Cow Milk",
          farmer_name: "Ram",
          quantity: "10 lit",
          exp_date: "June 25, 2022",
          animal_type: "Murah",
          material_color: "Creamy White",
          ph_value: 6.7,
          temp: "10.20 C",
          row_action: "Updated",
        },
        {
          id: "F103",
          material_name: "Cow Milk",
          farmer_name: "Ram",
          quantity: "10 lit",
          exp_date: "June 25, 2022",
          animal_type: "Murah",
          material_color: "Creamy White",
          ph_value: 6.7,
          temp: "10.20 C",
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
            <td className="col2">Primary Comodity</td>
            <td>Farmer Name</td>
            <td>Quantity</td>
            <td>Material Exp. Date</td>
            <td>Animal Type</td>
            <td>Material Color</td>
            <td>pH Value</td>
            <td>Termperature</td>
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
                name="animal_type"
                value={this.state.tempData.animal_type}
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
            <td className="col9">
              <input
                type="text"
                name="temp"
                value={this.state.tempData.temp}
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
            val.row_action != "edit" ? (
              <tr key={"productTB" + index} className="tb-body">
                <td>{val.id}</td>
                <td>{val.material_name}</td>
                <td>{val.farmer_name}</td>
                <td>{val.quantity}</td>
                <td>{val.exp_date}</td>
                <td>{val.animal_type}</td>
                <td>{val.material_color}</td>
                <td>{val.ph_value}</td>
                <td>{val.temp}</td>
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
                  <input type="text" defaultValue={val.animal_type} />
                </td>
                <td className="col7">
                  <input type="text" defaultValue={val.material_color} />
                </td>
                <td className="col8">
                  <input type="text" defaultValue={val.ph_value} />
                </td>
                <td className="col9">
                  <input type="text" defaultValue={val.temp} />
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
      </div>
    );
  }
}

export default ItemDetails;
