import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Button, Form, Input } from "antd";
import "../formstyle.css";
import { UID } from "../ApiUtility.js";
import openNotification from "../../notification.js";

import { PrerequistiesInsUpd } from "../ApiUtility.js";

import { FaRegUser } from "react-icons/fa";
import { useHistory } from "react-router";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const { TextArea } = Input;

const CreateRetailer = () => {
  const [licenseNumber, setLicenseNumber] = useState();
  const [distName, setDistName] = useState();
  const [regAddress, setRegAddress] = useState();

  const [infoMessage, setInfoMessage] = useState();
  const [form] = Form.useForm();

  const navigate = useHistory();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    console.log("Values  ", values);
    Swal.fire({
      title: "Are you sure?",
      html: `Are you sure want to add the  record ? `,
      icon: "warning",
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Confirm",
      confirmButtonColor: "#360036",
      cancelButtonColor: "red",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        console.log(willDelete, willDelete.isConfirmed);
        const params = {
          key: UID("RTLR_"),
          licenseNumber: values.licenseNo,
          retailerName: values.retailerName,
          registeredAddress: values.registeredAddress,
          stakeholder: "Retailer",
        };

        try {
          console.log("Param ::", params);
          PostData(params);
        } catch (error) {
          console.log("Errr", error);
        }
      } else {
        return;
      }
    });
  };
  const PostData = async (params) => {
    const inputParams = {
      args: params,
      fcn: "addDistributorsAndRetailer",
      defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
      actiontype: "POST",
    };
    //Code to add Api logic
    console.log("inputParams ", inputParams);
    var { endPoint, data, config } = PrerequistiesInsUpd(inputParams);
    console.log("-endPoint, data, config-", endPoint, data, config);
    const InsertEditAPI = async (endPoint, data, config) => {
      let modeMsg = {};
      modeMsg = "Inserted";
      let modeMsgErr = "";
      modeMsgErr = "Inserting";
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

            navigate.push("/shipping");
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
        });
    };

    await InsertEditAPI(endPoint, data, config);
  };

  return (
    <div className="mainbox">
      <Form
        size="small"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="License Number"
          name="licenseNo"
          allowClear
          rules={[
            {
              required: true,
              message: "Please provide the input for License number!",
            },
          ]}
        >
          <Input
            className="col2"
            placeholder="Please input license number"
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Retailer's Name"
          name="retailerName"
          allowClear
          rules={[
            {
              required: true,
              message: "Please provide the input for retailer name!",
            },
          ]}
        >
          <Input className="col2" allowClear />
        </Form.Item>
        <Form.Item
          label="Registered Address"
          name="registeredAddress"
          allowClear
        >
          <TextArea className="col2" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 14,
            span: 16,
          }}
        >
          <Button
            style={{ background: "#043484", color: "white" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateRetailer;
