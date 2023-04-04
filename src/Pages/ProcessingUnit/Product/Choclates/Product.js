import React from "react";
import { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { BsFillPlusCircleFill } from "react-icons/bs";
import DisplayDate from "../../../DisplayDate";
import Template from "./Template";
import openNotification from "../notification";
import { ImageUpload, fileName } from "../../ImageUpload";
import { Select } from "antd";

const Product = () => {
  const [screenTitle, setTitle] = useState("Explore Raw Materials");

  const [profileRole] = useState(localStorage.getItem("loginRole"));

  const [productTitle, setProductTitle] = useState("");
  const [productUnits, setProductUnits] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productdisable, setProductDisable] = useState(false);

  const handleScreenTitleChange = (name) => {
    console.log("Change::", name);
    setTitle(name);
  };

  const onChangeProductTitle = (value) => {
    if (value === undefined) {
      console.log("undefined ...");
      return;
    } else {
      setProductTitle(value);
    }

    console.log("setSelectDistrOption ", value);
  };

  const InitializeProduct = (event) => {
    event.preventDefault();
    const productTitle = document.getElementById("txtProductTitle").value;
    const productUnits = document.getElementById("txtProductUnits").value;

    console.log("ProductImage :", productImage);
    if (
      productTitle !== "" &&
      productTitle !== undefined &&
      productUnits !== "" &&
      productUnits !== undefined
    ) {
      setProductDisable(true);
    } else {
      openNotification(
        `Product Title and Product Units can not be empty`,
        ``,
        "",
        "error",
        "topRight"
      );
      return false;
    }

    //   addProduct1(tempAdd, "add");
  };

  return (
    <div className="full-layout-right-body">
      <div className="top-right-header">
        <div className="_40_percent">Product</div>
        <div className="_60_percent"></div>
      </div>

      <div className="mid-right-body">
        <div className="left-title">
          <span className="main-title">Product Processing</span> &nbsp;
        </div>

        <div className="right-date">
          <div>
            <DisplayDate></DisplayDate>
          </div>
        </div>
      </div>
      <div className="right-body">
        <div className="row">
          {!productdisable ? (
            <>
              {" "}
              <div className="row">
                <div className="col-5" style={{ width: "49%" }}>
                  <label for="txtProductTitle">Product Name:</label>
                  <Select
                    placeholder="Enter Product Name"
                    style={{
                      marginLeft: "8px",
                      borderRadius: "5px",
                      padding: "5px",
                      fontSize: "0.58rem",
                      width: "44%",
                    }}
                    onChange={onChangeProductTitle}
                    id="txtProductTitle"
                  >
                    <Select.Option value="Five Star">5 Star</Select.Option>
                    <Select.Option value="Alpen Gold">Alpen Gold</Select.Option>
                    <Select.Option value="Barni">Barni</Select.Option>
                    <Select.Option value="Bournvita">Bournvita</Select.Option>
                    <Select.Option value="Cadbury">Cadbury</Select.Option>
                    <Select.Option value="Cadbury Dairy Milk">
                      Cadbury Dairy Milk
                    </Select.Option>
                    <Select.Option value="Lacta">Lacta</Select.Option>
                    <Select.Option value="Oreo">Oreo</Select.Option>
                  </Select>
                </div>
                <div className="col-5" style={{ width: "40%" }}>
                  <label for="txtproductUnits">Product Units:</label>
                  <input
                    type="text"
                    className="product-text"
                    placeholder=""
                    style={{
                      border: "1px solid #d9d9d9",
                      marginLeft: "8px",
                      borderRadius: "5px",
                      padding: "5px",
                      fontSize: "0.58rem",
                      width: "38%",
                    }}
                    value={productUnits}
                    onChange={($event) => {
                      const re = /^[0-9\b]+$/;
                      if (
                        $event.target.value === "" ||
                        re.test($event.target.value)
                      ) {
                        setProductUnits($event.target.value);
                      }
                    }}
                    name="txtProductUnits"
                    id="txtProductUnits"
                  />
                </div>
                <div className="col-2" style={{ width: "10%" }}>
                  <BsFillPlusCircleFill
                    size={32}
                    style={{
                      marginLeft: "20px",
                      color: "#043484",
                      fontSize: "1.7rem",
                      border: "0!important",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                    onClick={(e) => {
                      InitializeProduct(e);
                    }}
                  >
                    Plus
                  </BsFillPlusCircleFill>
                </div>
              </div>
              <div className="row">
                <ImageUpload setProductImage={setProductImage}></ImageUpload>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="col-5" style={{ width: "49%" }}>
                <label for="txtProductTitle">Product Name:</label>
                <input
                  type="text"
                  className="product-text"
                  placeholder="Enter Product Name"
                  style={{
                    border: "1px solid #d9d9d9",
                    marginLeft: "8px",
                    borderRadius: "5px",
                    padding: "5px",
                    fontSize: "0.58rem",
                    width: "45%",
                  }}
                  value={productTitle}
                  readOnly
                  id="txtProductTitle"
                  name="txtProductTitle"
                />
              </div>
              <div className="col-5" style={{ width: "40%" }}>
                <label for="txtproductUnits">Units:</label>
                <input
                  type="text"
                  inputmode="numeric"
                  pattern="\d*"
                  className="product-text"
                  placeholder="Enter Product Units"
                  style={{
                    border: "1px solid #d9d9d9",
                    marginLeft: "8px",
                    borderRadius: "5px",
                    padding: "5px",
                    fontSize: "0.58rem",
                    width: "38%",
                  }}
                  value={productUnits}
                  id="txtProductUnits"
                  name="txtProductUnits"
                  readOnly
                />
              </div>
            </>
          )}
        </div>
        <br />
        {productdisable && productTitle && (
          <>
            {/* console.log("RMRow1 ::", {RMRow1}) */}
            <div className="middle-header">
              <div className="row">
                <div className="col _98_percent">
                  <Template
                    productTitle={productTitle}
                    productUnits={productUnits}
                    productImage={productImage}
                  ></Template>
                </div>
              </div>
              <br />
              <br />
              <br />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
