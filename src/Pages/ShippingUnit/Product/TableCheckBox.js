import React from "react";
import { Alert, Spin, Button, Table } from "antd";
import { PrerequistiesInsUpd } from "../ApiUtility.js";
import axios from "axios";
import { useState } from "react";
import openNotification from "../../notification.js";
import { useHistory } from "react-router";

const columns1 = [
  {
    title: "Product Image",
    dataIndex: "productImg",
    width: "25%",

    render: (theImageURL) => (
      <span className="imagecontainer">
        <img alt="Product" src={theImageURL} style={{ width: "5rem" }} />
      </span>
    ),

    hidden: false,
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    width: "15%",
    render: (prodName) => <span className="productname">{prodName}</span>,
    hidden: false,
  },
  {
    title: "Product Units",
    dataIndex: "productUnits",
    width: "15%",
    render: (units) => (
      <span className="qrcontainer font-weight-bold">{units} Units</span>
    ),

    hidden: false,
  },
  {
    title: "Product Id",
    dataIndex: "productId",
    width: "15%",
    hidden: false,
  },
  {
    title: "QR Code",
    dataIndex: "productQRCode",
    width: "20%",
    render: (theImageURL) => (
      <span className="qrcontainer">
        <img alt="Product" src={theImageURL} />
      </span>
    ),

    hidden: true,
  },
  {
    status: "Action",
    dataIndex: "action",
    hidden: false,
    width: "20%",
    render: (scanImaged, row) =>
      scanImaged ? (
        <span className="qrcontainer">
          <img alt="Product" src={row.productQRCode} />
        </span>
      ) : (
        ""
      ),
  },
];

const columns = columns1.filter((i) => i.hidden === false);
const TableCheckBox = ({ dataSource }) => {
  const [load, setLoad] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedfilteredRows, setSelectedfilteredRows] = useState([]);
  const [sumOfUnits, setsumOfUnits] = useState("");
  const statusCheck = ["PRODUCT_ADDEDTOCARTON"];
  const navigate = useHistory();

  const evaluateSumOfUnits = (selectedRowKeys, dataSource, setsumOfUnits) => {
    let filteredData = [];
    filteredData = selectedRowKeys.map((item) =>
      dataSource.filter((elem) => {
        return "cbx_" + elem.productId === item;
      })
    );

    // console.log("--FResult ", filteredData);
    let allSelectedUnitsSum = 0;
    console.log("Data: ", filteredData);
    filteredData.map((obj) => {
      allSelectedUnitsSum += parseInt(obj[0].productUnits);
      return obj;
    });
    setsumOfUnits(allSelectedUnitsSum);
    setSelectedfilteredRows(filteredData);
  };

  const addProductsToCarton = async (productObject, mode) => {
    //console.log("AddProduct Object b4:::", productObject);
    const inputParams = {
      input: productObject,
      fcn: "shippingUnitCarton",
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
            openNotification(
              `Data ${modeMsg} Successfully for Product!!`,
              ``,
              "",
              "success",
              "topRight"
            );
          }

          navigate.push("/CartonPackedProd");
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
        })
        .finally(setLoad(false));
    };
    await InsertEditAPI(endPoint, data, config);
  };
  const addToCartons = (event) => {
    console.log(" add 2 cartons");
    event.preventDefault();
    // console.log("AddtoCarton ", selectedfilteredRows);
    if (selectedfilteredRows.length <= 0) {
      setSelectedfilteredRows([]);
      setsumOfUnits();
      // alert("Please select the row");
      openNotification(
        `Warning: Please select the row!!`,
        ``,
        "",
        "warning",
        "topRight"
      );
      return;
    } else {
      let details = [];

      details = selectedfilteredRows.map((ele1) => {
        let ele = ele1[0];

        let Obj = {
          productImg: ele?.productImg,
          productId: ele?.productId,
          productName: ele?.productName,
          productUnits: ele?.productUnits,
          productQRCode: ele?.productQRCode,
        };
        return Obj;
      });
      console.log("details ", details);
      let objectInput = {
        totalUnits: sumOfUnits,
        status: "PRODUCT_ADDEDTOCARTON",
        cartonQrRCode: "",
        details: details,
      };
      console.log("Final Stat bf add", objectInput);

      setTimeout(() => {
        addProductsToCarton(objectInput, "add");
      }, 4100);
    }
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    evaluateSumOfUnits(newSelectedRowKeys, dataSource, setsumOfUnits);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    // getCheckboxProps: (record) => {
    //   console.log("record row selection ", record);
    //   if (statusCheck === record.action)
    //     return {
    //       disabled: true,
    //     };
    // },
  };

  return (
    <>
      <div className="row mb-4">
        <div className="col-3 col-md-3 col-3 col-sm-3">
          <button
            className="btnUpdate"
            onClick={(e) => {
              console.log("Carton ....");
              setLoad(true);
              addToCartons(e);
            }}
          >
            Add to Carton
          </button>
        </div>
        <div className="col-5 col-md-4 col-sm-4"></div>
        <div className="col-4 col-md-4 col-sm-4">
          <div className="labelTotal">
            <span style={{ fontSize: "bold" }}>Total Units</span> :{" "}
            <span style={{ fontSize: "bold" }}>
              {sumOfUnits === "" ? " " : sumOfUnits}
            </span>
          </div>
        </div>
      </div>
      {load && (
        <div className="row">
          <div className="col-10 m-auto">
            <Spin
              size="large"
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Alert
                message="Data submitting to server"
                description="Thank you for your patience"
                type="info"
              />
            </Spin>
          </div>
        </div>
      )}
      {!load && (
        <div className="row">
          <Table
            // className="mt-1 row"
            // rowClassName="data-row"
            size="medium"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            showHeader={false}
            pagination={true}
            scroll={{ y: 380 }}
          />
        </div>
      )}

      <div className="row mt-2"></div>
    </>
  );
};
//
export default TableCheckBox;
