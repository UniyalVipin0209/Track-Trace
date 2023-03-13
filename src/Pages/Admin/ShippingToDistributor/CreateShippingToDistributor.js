import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Button,
  Select,
  Form,
  Input,
  Table,
  InputNumber,
  Row,
  Col,
  Space,
  Divider,
} from "antd";
import "../formstyle.css";
import { DistributorList, OriginList } from "../dummydata.js";
import { UID } from "../ApiUtility.js";
import openNotification from "../../notification.js";
import { useDebugValue } from "react";
import {
  PrerequistiesConfigCartonList,
  PrerequistiesInsUpd,
} from "../ApiUtility.js";
import { BiTimer } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import { useHistory } from "react-router";
import CartonList from "../../ShippingUnit/CartonList";
import FormItem from "antd/lib/form/FormItem";

const { Option } = Select;

//carton, cartonproduct,distributorName, address, latitude

const CreateShippingToDistributor = () => {
  const [cartonOption, setCartonOption] = useState();
  const [totalUnits, setTotalUnits] = useState();
  const [distributorStatus, setdistributorStatus] = useState();
  const [form] = Form.useForm();
  const [infoMessage, setInfoMessage] = useState();
  //const [destinationLocation, setDestinationLocation] = useState("");
  const [destinationAddress, setDestinationAddress] = useState({});
  const [sourceAddress, setSourceAddress] = useState({});
  const navigate = useHistory();

  const fetchDataForCarton = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };
  const handleFetchResponseCarton = async (res, setInfoMessage) => {
    console.log("CARTON LIST");
    const response = await res.data;
    console.log("CARTON LIST ", res);

    if (typeof response === "object" && typeof response.result == "string") {
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
      console.log("Map--");
      let customResponse = [];

      customResponse = response.result?.map((elem, idx) => {
        let responseObject = elem.Record?.cartonDetails;
        console.log("responseObject ", responseObject);
        return {
          index: elem.Key,
          totalUnits: elem.Record?.totalUnits,
        }; //
      });
      console.log("customResponse carton", customResponse);
      setCartonOption(customResponse);
    }
  };
  const fetchDataForDistMaster = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };
  const handleFetchResponseDistMaster = async (res, setInfoMessage) => {
    const response = await res.data;
    // console.log("DistributorList LIST ", res);

    if (typeof response === "object" && typeof response.result == "string") {
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
      let customResponse = [];

      customResponse = response.result?.map((elem, idx) => {
        const responseObject = elem.Record;
        // console.log("responseObject ", elem.Record);

        return {
          index: responseObject?.key,
          cartonId: responseObject?.carton,
          distributorName: responseObject?.distributorName,
          productName: responseObject?.cartonproduct,
          quantity: parseInt(responseObject?.totalUnits),
          distributorLocation: responseObject?.destinationLocation,
        }; //
      });
      console.log("customResponse ", customResponse);
      setItemData(customResponse);
    }
  };

  useEffect(() => {
    //Code to add Api logic
    var { endPoint, config } = PrerequistiesConfigCartonList("getCartoonList");
    var apiResponse = fetchDataForCarton(endPoint, config);
    apiResponse.then((res) => {
      handleFetchResponseCarton(res, setInfoMessage);
    });
  }, []);

  useEffect(() => {
    //Code to add Api logic
    var { endPoint, config } = PrerequistiesConfigCartonList("getCartoonList");
    var apiResponse = fetchDataForCarton(endPoint, config);
    apiResponse.then((res) => {
      handleFetchResponseCarton(res, setInfoMessage);
    });
  }, []);
  //

  const setData = () => {
    console.log();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
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
          key: UID("DSTR_"),
          carton: values.carton,
          cartonproduct: values.cartonproduct,
          totalUnits: parseInt(totalUnits),
          distributorName: destinationAddress.distributorName,
          distributorLocation: destinationAddress.distributorLocation,
          distributorPincode: destinationAddress.distributorPincode,
          originAddress: sourceAddress.originAddress,
          originPincode: sourceAddress.originPincode,
          latitude: destinationAddress.distributorLatitude,
          longitude: destinationAddress.distributorLongitude,
          stakeholder: "Distributor",
          actionStatus: distributorStatus,
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

            navigate.push("/shiping");
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

  const onTrackStausChange = (value) => {
    form.setFieldsValue({
      actionStatus: value,
    });
    console.log("---Stats", value);
    setdistributorStatus(value);
  };
  const onSourceAddressChange = (value) => {
    console.log("calue ", value);
    const selectedValue = OriginList.filter(
      (element) => element.index === parseInt(value)
    );

    console.log("SelectedValue ", selectedValue[0]);

    form.setFieldsValue({
      originAddress: selectedValue[0].orginLocation,
    });
    form.setFieldsValue({
      originPincode: selectedValue[0].orginPinCode,
    });
    setSourceAddress({
      originAddress: selectedValue[0].orginLocation,
      originPincode: selectedValue[0].orginPinCode,
    });
  };
  //onDistributorAddressChange
  const onDistributorAddressChange = (value) => {
    console.log("d value ", value);
    const selectedValue = DistributorList.filter(
      (element) => element.index === parseInt(value)
    );

    console.log("SelectedValue ", selectedValue[0]);

    form.setFieldsValue({
      distributorName: selectedValue[0].distributorName,
      distributorLocation: selectedValue[0].distributorLocation,
      distributorPincode: selectedValue[0].distributorPinCode,
      distributorLatitude: selectedValue[0].latitude,
      distributorLongitude: selectedValue[0].longitude,
    });

    setDestinationAddress({
      distributorName: selectedValue[0].distributorName,
      distributorLocation: selectedValue[0].distributorLocation,
      distributorPincode: selectedValue[0].distributorPinCode,
      distributorLatitude: selectedValue[0].latitude,
      distributorLongitude: selectedValue[0].longitude,
    });

    console.log("-setDestinationCordinates-", destinationAddress);
  };

  const onCartonChange = (value) => {
    if (value === undefined) {
      console.log("undefined ...");
      setTotalUnits();
      return;
    } else {
      form.setFieldsValue({
        carton: value,
      });

      var selectedItem = cartonOption.filter((elem) => elem.index === value);
      console.log("--value", value);
      if (selectedItem !== undefined) {
        console.log("SelectedValue :", selectedItem[0].totalUnits);
        setTotalUnits(selectedItem[0].totalUnits);
      }
    }
  };

  return (
    <div className="mainbox">
      <Form
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
          label="Carton"
          name="carton"
          wrapperCol={{
            span: 8,
          }}
        >
          <Space size="middle" block>
            <Select
              className="col2"
              placeholder="----Select a Carton----"
              onChange={onCartonChange}
              allowClear
            >
              <Option disabled="true" value="---Please Select---">
                Please Select
              </Option>
              {cartonOption &&
                cartonOption.map((ele, idx) => (
                  <>
                    <Select.Option key={idx} value={ele.index}>
                      <div className="demo-option-label-item">{ele.index}</div>
                    </Select.Option>
                  </>
                ))}
            </Select>{" "}
            {totalUnits && (
              <>
                <div className="col2">
                  <label className="col2" style={{ fontWeight: "bold" }}>
                    {`${totalUnits} Units`}{" "}
                  </label>
                </div>
              </>
            )}
          </Space>
        </Form.Item>
        <Form.Item
          label="Name"
          name="cartonproduct"
          allowClear
          rules={[
            {
              required: true,
              message: "Please provide the input for product name!",
            },
          ]}
        >
          <Input className="col1" />
        </Form.Item>
        <Form.Item label="Track Status" name="actionStatus" allowClear>
          {" "}
          <Select
            className="col2"
            placeholder="----Select a status----"
            onChange={onTrackStausChange}
            allowClear
            suffixIcon={
              <BiTimer
                style={{
                  fontSize: "1rem",
                  marginright: "16px",
                  color: "blue",
                }}
              ></BiTimer>
            }
          >
            <Option disabled="true" value="---Please Select---">
              Please Select
            </Option>
            <Option value="ONTIME">On Time</Option>
            <Option value="DELAYED">Delayed</Option>
            <Option value="DELIVERED">Delivered</Option>
            <Option value="NOTSTARTED">Not Started</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Distributor's Name"
          name="distributorAddress"
          allowClear
          rules={[
            {
              required: true,
              message: "Please provide the input for origin address!",
            },
          ]}
        >
          <Select
            className="col2"
            mode="multiple"
            placeholder="----Select a source's name----"
            onChange={onDistributorAddressChange}
            allowClear
            suffixIcon={
              <HiOutlineLocationMarker
                style={{
                  fontSize: "1rem",
                  marginLeft: "6px",
                  marginright: "16px",
                  color: "red",
                }}
              ></HiOutlineLocationMarker>
            }
          >
            <Option disabled="true" value="---Please Select---">
              Please Select
            </Option>
            {DistributorList.map((ele, idx) => (
              <>
                <Select.Option key={idx} value={ele.index}>
                  <div className="demo-option-label-item">
                    {ele.distributorName +
                      ", " +
                      ele.distributorLocation +
                      ", " +
                      ele.distributorPinCode}
                  </div>
                </Select.Option>
              </>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Distributor's Address"
          name="distributorLocation"
          allowClear
        >
          {" "}
          <Input
            className="col2"
            value={destinationAddress.distributorLocation}
          />
        </Form.Item>

        <Form.Item
          label="Distributor's Pincode"
          name="distributorPincode"
          allowClear
        >
          {" "}
          <Input
            className="col2"
            value={destinationAddress.distributorPincode}
          />
        </Form.Item>

        <Form.Item
          label="Source Address"
          name="originAddress"
          allowClear
          rules={[
            {
              required: true,
              message: "Please provide the input for origin address!",
            },
          ]}
        >
          <Select
            className="col2"
            placeholder="----Select a source's name----"
            onChange={onSourceAddressChange}
            suffixIcon={
              <HiOutlineLocationMarker
                style={{
                  fontSize: "1rem",
                  color: "red",
                  marginLeft: "6px",
                  marginright: "16px",
                }}
              ></HiOutlineLocationMarker>
            }
            allowClear
          >
            <Option disabled="true" value="---Please Select---">
              Please Select
            </Option>
            {OriginList.map((ele, idx) => (
              <>
                <Select.Option key={idx} value={ele.index}>
                  <div className="demo-option-label-item">
                    {ele.orginLocation}
                  </div>
                </Select.Option>
              </>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Source Pincode" name="originPincode" allowClear>
          {" "}
          <Input className="col2" value={sourceAddress.originPincode} />
        </Form.Item>
        {/* <Divider type="horizontal" dashed /> */}

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

export default CreateShippingToDistributor;
