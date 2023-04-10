import React, { useEffect, useReducer, useState } from "react";
import { RiDeleteBinLine, RiSaveFill } from "react-icons/ri";
import { Collapse, Select } from "antd";
import { PrerequistiesConfigAll } from "./TemplateUtility.js";
import axios from "axios";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import {
  tempDataMangoes,
  tempDataHoney,
  tempDataApples,
  pageDataTemplate,
  customDetailsObj,
} from "./DefaultSchema.js";
import openNotification from "../notification";
//import { ApplesCat, MangoesCat, HoneyCat } from "./DefaultValues.js";
//API

import { notification } from "antd";
import {
  PrerequistiesInsUpd,
  PrerequistiesConfigure,
} from "../../ApiUtility.js";

import { useHistory } from "react-router";

const { Panel } = Collapse;
const { Option } = Select;

const Template = ({ productTitle, productUnits, productImage }) => {
  const [dataApples, setDataApples] = useState([]);
  const [dataHoney, setDataHoney] = useState([]);
  const [dataMangoes, setDataMangoes] = useState([]);

  const [infoMessage, setInfoMessage] = useState("");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [optionList1, setOptionList1] = useState([]);
  const [selectR1, setSelectR1] = useState(false);
  const [itemData, setItemData] = useState([]);

  const [optionList2, setOptionList2] = useState([]);
  const [selectR2, setSelectR2] = useState(false);

  const [optionList3, setOptionList3] = useState([]);
  const [selectR3, setSelectR3] = useState(false);

  const [pageData, setPageData] = useState(pageDataTemplate);

  const [RMRow1, setRMRow1] = useState(tempDataApples);
  const [RMRow2, setRMRow2] = useState(tempDataHoney);
  const [RMRow3, setRMRow3] = useState(tempDataMangoes);

  const [RMRow1Added, setRM1RowAdded] = useState(false);
  const [RMRow2Added, setRM2RowAdded] = useState(false);
  const [RMRow3Added, setRM3RowAdded] = useState(false);
  const navigate = useHistory();

  const [detailsObj, setDetailsObj] = useState(customDetailsObj);

  const InitializePage = () => {
    setPageData({
      ...pageData,
      productName: productTitle,
      productunits: productUnits,
      productImage: window.encodeURI(productImage),
    });
    console.log(
      "Product Name ::",
      productTitle,
      pageData.productName,
      productUnits,
      pageData.productQRCode,
      productImage
    );
  };

  const fetchData = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };
  const handleFetchResponse = async (res, setInfoMessage) => {
    const response = await res.data;
    console.log("Response ::", response);
    console.log(response.status);
    if (typeof response === "object" && typeof response.result == "string") {
      // issue in backend(configuration side)
      if (response.result.includes("error")) setInfoMessage("Error");
    } else if (
      typeof response === "object" &&
      response.error != null &&
      response.errorData != null &&
      response.result.length === 0 &&
      typeof response.result == "string"
    ) {
      setInfoMessage("");
    } else {
      console.log("Map 123--");
      //response.result?.map((elem) => console.log(elem.Key, elem.Record));
      const result1 = response.result;
      console.log("Map 123--", result1);
      let ApplesCat = [];
      let HoneyCat = [];
      let MangoesCat = [];
      ApplesCat = result1.filter((e) => e.productType === "Apples");
      setDataApples(ApplesCat);
      HoneyCat = result1.filter((e) => e.productType === "Honey");
      setDataHoney(HoneyCat);
      MangoesCat = result1.filter((e) => e.productType === "Mangoes");
      setDataMangoes(MangoesCat);
    }
  };

  useEffect(() => {
    //Code to add Api logic
    var { endPoint, config } = PrerequistiesConfigure({
      actiontype: "GET",
      args: "test",
    });
    var apiResponse = fetchData(endPoint, config);
    apiResponse.then((res) => {
      handleFetchResponse(res, setInfoMessage);
    });
  }, [reducerValue]);

  useEffect(() => InitializePage(), []);
  //Apples
  const handleChangeRM1 = (e) => {
    console.log(`selected  Category ${e}`);
    console.log("Row 1 update b4", RMRow1, e);

    if (e.length > 0 || tempDataApples.length > 0) {
      tempDataApples.key.length = 0;
      e.map((item) => tempDataApples.key.push(item));
      setSelectR1(true);
    } else {
      setSelectR1(false);
    }

    console.log("Row 1 update", tempDataApples);
  };
  //Honey
  const handleChangeRM2 = (e) => {
    console.log(`selected  Category ${e}`);
    console.log("Row 2 update b4", RMRow2, e);

    if (e.length > 0 || tempDataHoney.length > 0) {
      tempDataHoney.key.length = 0;
      e.map((item) => tempDataHoney.key.push(item));
      setSelectR2(true);
    } else {
      setSelectR2(false);
    }

    console.log("Row 2 update", optionList2);
  };
  //Mangoes
  const handleChangeRM3 = (e) => {
    console.log(`selected  Category ${e}`);
    console.log("Row 3 update b4", RMRow3, e);

    if (e.length > 0 || tempDataMangoes.length > 0) {
      tempDataMangoes.key.length = 0;
      e.map((item) => tempDataMangoes.key.push(item));
      setSelectR3(true);
    } else {
      setSelectR3(false);
    }

    console.log("Row 3 update", optionList3);
  };

  const handleRMRow1DataChange = (e) => {
    e.preventDefault();
    console.log("Row 1-- prev State", RMRow1);
    setRMRow1({
      ...RMRow1,
      [e.target.name]: e.target.value,
    });

    console.log("Row 1-- post State", RMRow1);
    console.log("Row 1", e.target.name, e.target.value);
  };

  const handleRMRow2DataChange = (e) => {
    e.preventDefault();
    setRMRow2({
      ...RMRow2,
      [e.target.name]: e.target.value,
    });
    console.log("Row 2", e.target.name, e.target.value);
  };

  const handleRMRow3DataChange = (e) => {
    e.preventDefault();
    setRMRow3({
      ...RMRow3,
      [e.target.name]: e.target.value,
    });
    console.log("Row 3", e.target.name, e.target.value);
  };

  const addProduct1 = async (productObject, mode) => {
    console.log("AddProduct Object b4:::", productObject);
    const inputParams = {
      input: productObject,
      fcn: "processingProduct",
      defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
      actiontype: "POST",
    };
    //Code to add Api logic
    var { endPoint, data, config } = PrerequistiesInsUpd(inputParams);
    // console.log("AddProduct Object :::", productObject);
    // console.log("data ", data);
    // console.log("endPoint, data, config ", endPoint, data, config);
    const InsertEditAPI = async (endPoint, data, config) => {
      let modeMsg = {};
      modeMsg = mode === "add" ? "Inserted" : "Updated";
      let modeMsgErr = "";
      modeMsgErr = mode === "add" ? "Inserting" : "Updating";
      axios
        .post(endPoint, data, config)
        .then((res) => {
          console.log("Api post ::", res.status);
          if (res.status === "200" || res.status === 200) {
            console.log("Success Response!!!");
            openNotification(
              `Data ${modeMsg} Successfully for Product!!`,
              ``,
              "",
              "success",
              "topRight"
            );
            setTimeout(3000);
            navigate.push("/QRCode");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          openNotification(
            `Error: Issue in ${modeMsgErr}  Successfully!!`,
            ``,
            "",
            "error",
            "topRight"
          );
          // if (mode === "add") setTempData(createDataSchema);
          // if (mode === "edit") setEditSaveInstance(updateDataSchema);
          // forceUpdate();
        });
    };

    await InsertEditAPI(endPoint, data, config);
  };

  const addNewProduct = (event) => {
    event.preventDefault();
    // var tempAdd = addRowActionValue(tempData, "updated");
    console.log("Adding :", detailsObj);
    const prevPageData = { ...pageData };
    prevPageData.details = detailsObj;

    setPageData(prevPageData);
    console.log("Prev Page ", prevPageData);
    addProduct1(prevPageData, "add");
    console.log("Page Data ::", pageData, pageData.details);
  };

  //R3
  const addMaterialMangoes = (event) => {
    event.preventDefault();

    setRMRow3({
      ...RMRow3,
      key: [...optionList3, optionList3],
    });

    setDetailsObj({
      ...detailsObj,
      Mangoes: RMRow3,
    });
    setRM3RowAdded(true);

    console.log("Added ::", RMRow3);
  };
  //R2
  const addMaterialHoney = (event) => {
    event.preventDefault();

    setRMRow2({
      ...RMRow2,
      key: [...optionList2, optionList2],
    });
    setRM2RowAdded(true);

    setDetailsObj({
      ...detailsObj,
      Honey: RMRow2,
    });
    //

    console.log("Added ::", RMRow2);
  };
  //R1

  const validateRow = (rowMaterial, optionList) => {
    //materialname,productname,materialquantity

    console.log("ValdiateRow ", rowMaterial);
    if (
      rowMaterial.materialname === "" ||
      rowMaterial.productname === "" ||
      rowMaterial.materialquantity === ""
    ) {
      openNotification(
        `Please provide the values for Product Name, Product Type and Product Quantity for ${rowMaterial.producttype}`,
        ``,
        "",
        "error",
        "topRight"
      );
      return false;
    } else {
      return true;
    }
  };
  const addMaterialApples = (event) => {
    event.preventDefault();
    // var tempAdd = addRowActionValue(tempData, "updated");
    // console.log("optionList1 ", optionList1);
    // console.log("Add ::", RMRow1);

    setRMRow1({
      ...RMRow1,
      key: [...optionList1, optionList1],
    });

    setDetailsObj({
      ...detailsObj,
      Apples: RMRow1,
    });
    setRM1RowAdded(true);

    console.log("Added ::", RMRow1);
  };

  return (
    <>
      <div
        style={{
          width: "72vw",
          height: "50vh",
          borderBottom: "1px solid gray",
        }}
      >
        <Collapse accordion>
          <Panel header="Apples" key="1">
            <div className="col-md-12 mt-1 items-details">
              <table className="items-details-table">
                <tr className="tb-header">
                  <td className="col1">ID</td>
                  <td className="col2" style={{ marginLeft: "3px" }}>
                    Product Name
                  </td>
                  <td className="col3">Product Type</td>
                  <td className="col4">Quantity (Kg)</td>
                  <td className="col5">Temperature</td>
                  <td className="col7 text-center">&nbsp;&nbsp;Action</td>
                </tr>
                <tr className="tb-body">
                  <td className="col1">
                    <Select
                      mode="multiple"
                      name="key"
                      style={{
                        width: "100%",
                      }}
                      // defaultValue={[ApplesCat[0].Id]}
                      placeholder="--Select--"
                      onChange={($event) => {
                        setOptionList1($event);
                        handleChangeRM1($event);
                      }}
                      optionLabelProp="label"
                    >
                      {dataApples.map((ele, idx) => (
                        <>
                          <Select.Option key={idx} value={ele.key}>
                            <div className="demo-option-label-item">
                              {ele.key}
                            </div>
                          </Select.Option>
                        </>
                      ))}
                    </Select>
                  </td>

                  <td className="col2">
                    <input
                      type="text"
                      name="productname"
                      value={RMRow1.productname}
                      onChange={handleRMRow1DataChange}
                    />
                  </td>
                  <td className="col3">
                    <input
                      type="text"
                      name="materialname"
                      value={RMRow1?.materialname}
                      onChange={($event) => handleRMRow1DataChange($event)}
                    />
                  </td>
                  <td className="col4">
                    <input
                      type="text"
                      name="materialquantity"
                      value={RMRow1?.materialquantity}
                      onChange={($event) => handleRMRow1DataChange($event)}
                    />
                  </td>
                  <td className="col5">
                    <input
                      type="text"
                      name="temp"
                      value={RMRow1?.temp}
                      onChange={($event) => handleRMRow1DataChange($event)}
                    />
                  </td>
                  <td
                    className="col7"
                    style={{
                      width: "6%",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <RiSaveFill
                      onClick={(e) => {
                        if (!selectR1) {
                          openNotification(
                            `Please select the values from the select list - ${RMRow1.producttype}`,
                            ``,
                            "",
                            "error",
                            "topRight"
                          );
                          return false;
                        } else {
                          if (validateRow(RMRow1, optionList1))
                            addMaterialApples(e);
                        }
                      }}
                      title="Click here to add"
                      className="updt-otps-edit"
                      style={{
                        cursor: "pointer",
                        marginLeft: ".7rem",
                        fontSize: "0.68rem",
                      }}
                    ></RiSaveFill>{" "}
                  </td>
                </tr>
              </table>
            </div>
          </Panel>
          <Panel header="Honey" key="2">
            <div className="col-md-12 mt-1 items-details">
              <table className="items-details-table">
                <tr className="tb-header">
                  <td className="col1">ID</td>
                  <td className="col2" style={{ marginLeft: "3px" }}>
                    Product Name
                  </td>
                  <td className="col3">Honey Type</td>
                  <td className="col4">Quantity (Litres)</td>
                  <td className="col6">Temperature</td>
                  <td className="col7 text-center">&nbsp;&nbsp;Action</td>
                </tr>
                <tr className="tb-body">
                  <td className="col1">
                    <Select
                      mode="multiple"
                      name="key"
                      style={{
                        width: "100%",
                      }}
                      placeholder="--Select--"
                      onChange={($event) => {
                        handleChangeRM2($event);
                        setOptionList2($event);
                      }}
                      optionLabelProp="label"
                    >
                      {dataHoney.map((ele, idx) => (
                        <>
                          <Select.Option key={idx} value={ele.key}>
                            <div className="demo-option-label-item">
                              {ele.key}
                            </div>
                          </Select.Option>
                        </>
                      ))}
                    </Select>
                  </td>

                  <td className="col2">
                    <input
                      type="text"
                      name="productname"
                      value={RMRow2.productname}
                      onChange={($event) => handleRMRow2DataChange($event)}
                    />
                  </td>
                  <td className="col3">
                    <input
                      type="text"
                      name="materialname"
                      value={RMRow2.materialname}
                      onChange={($event) => handleRMRow2DataChange($event)}
                    />
                  </td>
                  <td className="col4">
                    <input
                      type="text"
                      name="materialquantity"
                      value={RMRow2.materialquantity}
                      onChange={($event) => handleRMRow2DataChange($event)}
                    />
                  </td>
                  <td className="col5">
                    <input
                      type="text"
                      name="temp"
                      value={RMRow2.temp}
                      onChange={($event) => handleRMRow2DataChange($event)}
                    />
                  </td>
                  <td
                    className="col7"
                    style={{
                      width: "6%",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <RiSaveFill
                      onClick={(e) => {
                        if (!selectR2) {
                          openNotification(
                            `Please select the values from the select list - ${RMRow2.producttype}`,
                            ``,
                            "",
                            "error",
                            "topRight"
                          );
                          return false;
                        } else {
                          if (validateRow(RMRow2, optionList2))
                            addMaterialHoney(e);
                        }
                      }}
                      className="updt-otps-edit"
                      style={{
                        cursor: "pointer",
                        marginLeft: ".7rem",
                        fontSize: "0.68rem",
                      }}
                    ></RiSaveFill>{" "}
                  </td>
                </tr>
              </table>
            </div>
          </Panel>
          <Panel header="Mangoes" key="3">
            <div className="col-md-12 mt-1 items-details">
              <table className="items-details-table">
                <tr className="tb-header">
                  <td className="col1">ID</td>
                  <td className="col2" style={{ marginLeft: "3px" }}>
                    Product Name
                  </td>
                  <td className="col3">Product Type</td>
                  <td className="col4">Quantity (Kg)</td>
                  <td className="col6">Temperature</td>
                  <td className="col7 text-center">&nbsp;&nbsp;Action</td>
                </tr>
                <tr className="tb-body">
                  <td className="col1">
                    <Select
                      mode="multiple"
                      name="key"
                      style={{
                        width: "100%",
                      }}
                      placeholder="--Select--"
                      onChange={($event) => {
                        handleChangeRM3($event);
                        setOptionList3($event);
                      }}
                      optionLabelProp="label"
                    >
                      {dataMangoes.map((ele, idx) => (
                        <>
                          <Select.Option key={idx} value={ele.key}>
                            <div className="demo-option-label-item">
                              {ele.key}
                            </div>
                          </Select.Option>
                        </>
                      ))}
                    </Select>
                  </td>

                  <td className="col2">
                    <input
                      type="text"
                      name="productname"
                      value={RMRow3.productname}
                      onChange={($event) => handleRMRow3DataChange($event)}
                    />
                  </td>
                  <td className="col3">
                    <input
                      type="text"
                      name="materialname"
                      value={RMRow3.materialname}
                      onChange={($event) => handleRMRow3DataChange($event)}
                    />
                  </td>
                  <td className="col4">
                    <input
                      type="text"
                      name="materialquantity"
                      value={RMRow3.materialquantity}
                      onChange={($event) => handleRMRow3DataChange($event)}
                    />
                  </td>
                  <td className="col5">
                    <input
                      type="text"
                      name="temp"
                      value={RMRow3.temp}
                      onChange={($event) => handleRMRow3DataChange($event)}
                    />
                  </td>
                  <td className="col7" style={{ width: "8%", maxWidth: "10%" }}>
                    <RiSaveFill
                      onClick={(e) => {
                        if (!selectR3) {
                          openNotification(
                            `Please select the values from the select list -${RMRow3.producttype}`,
                            ``,
                            "",
                            "error",
                            "topRight"
                          );
                          return false;
                        } else {
                          if (validateRow(RMRow3, optionList3))
                            addMaterialMangoes(e);
                        }
                      }}
                      title="Click here to add"
                      className="updt-otps-edit"
                      style={{
                        cursor: "pointer",
                        marginLeft: ".7rem",
                        fontSize: "0.68rem",
                      }}
                    ></RiSaveFill>{" "}
                  </td>
                </tr>
              </table>
            </div>
          </Panel>
        </Collapse>
        <div className="row mt-5">
          <div className="col-md-1"></div>
          <div className="col-md-4">
            <button
              style={{
                background: "#043484",
                maxWidth: "30%",
                width: "90%",
                height: "1.8rem",
                fontSize: "0.7rem",
                color: "#fff",
                borderRadius: "5px",
                border: "0!important",
                alignContent: "center",
                alignItems: "center",
              }}
              onClick={(e) => {
                addNewProduct(e);
              }}
            >
              Update
            </button>
          </div>
          <div className="col-md-8"></div>
        </div>
      </div>
    </>
  );
};

export default Template;
