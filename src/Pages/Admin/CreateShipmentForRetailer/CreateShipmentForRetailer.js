import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Button, Select, Form, Input, Space } from "antd";
import "../formstyle.css";
import "./style.css";
import { AiFillSave, AiOutlineTransaction } from "react-icons/ai";
//
//import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { ConfigForDistributionRetailerList, UID } from "../ApiUtility.js";
import openNotification from "../../notification.js";
import {
  Box,
  Button as CButton,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input as CInput,
  SkeletonText,
  Text,
} from "@chakra-ui/react";

import { FaTimes, FaChair } from "react-icons/fa";

import {
  PrerequistiesConfigCartonList,
  PrerequistiesInsUpd,
} from "../ApiUtility.js";

import { FaRegUser } from "react-icons/fa";
import { useHistory } from "react-router";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 };
const { Option } = Select;

const pageTemplate = {
  key: "",
  carton: [],
  // shipmentProductNo: "",
  totalUnits: 0,
  retailerName: "",
  actionStatus: "NOTSTARTED",

  //vehicleType: "",
  travelMode: "",
  originLocation: "",
  destinationLocation: "",
  distanceInKms: "",
  durationTime: "",
  calculateEmmision: "",
  //esg
  esgInput: {},
};

const CreateShipmentForRetailer = () => {
  const [cartonOption, setCartonOption] = useState();
  const [selectCarton, setSelectCarton] = useState([]);
  const [optionList1, setOptionList1] = useState([]);

  const [retailerMaster, setDistrMaster] = useState();
  const [selectDistrOption, setSelectDistrOption] = useState();

  const [totalUnits, setTotalUnits] = useState();
  const [distributorStatus, setdistributorStatus] = useState();
  const [form] = Form.useForm();
  const [infoMessage, setInfoMessage] = useState();
  //const [destinationLocation, setDestinationLocation] = useState("");
  const [destinationAddress, setDestinationAddress] = useState({});
  const [sourceAddress, setSourceAddress] = useState({});

  const [screen1, setScreen1] = useState(pageTemplate);
  const [isReadyForMap, setIsReadyForMap] = useState(false);

  const carDetailsTemplate = {
    carName: "",
    fuelType: "",
    index: "",
  };
  const flightDetailsTemplate = {
    chairType: "",
    index: "",
  };
  const truckDetailsTemplate = {
    truckName: "",
    truckType: "",
    index: "",
  };

  const [inputForESG, setInputForESG] = useState({
    staffCount: 1,
    flightDetails: {},
    carDetails: {},
    truckDetails: {},
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [mapFinal, setMapFinal] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [estimatedEmmision, setEstimatedEmmision] = useState("");
  const [zoomval, setZoomVal] = useState(10);

  //carbon calculation
  const [travelType, setTravelType] = useState("");
  const [objFlightDetails, setObjFlightDetails] = useState(
    flightDetailsTemplate
  );
  const [objCarDetails, setObjCarDetails] = useState(carDetailsTemplate);
  const [objTruckDetails, setObjTruckDetails] = useState(truckDetailsTemplate);

  const [truckFlag, setTruckFlag] = useState(false);
  const [airFlag, setAirFlag] = useState(false);
  //car
  const [petrolFuelTypeFlag, setPetrollFuelTypeFlag] = useState(false);
  const [dieselFuelTypeFlag, setDieselFuelTypeFlag] = useState(false);
  const [cngTypeFlag, setCNGTypeFlag] = useState(false);

  const [vehicle_Details, setVehicleDetails] = useState();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  const navigate = useHistory();
  const { isLoaded } = useJsApiLoader({
    //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: "AIzaSyAMHmvxTgc0IucoQkMM-NTjnrtJYDDOX3Y",
    libraries: ["places"],
  });
  const fetchData = async (endPoint, config) => {
    return await axios.get(endPoint, config);
  };
  const handleFetchResponseCarton = async (res, setInfoMessage) => {
    const response = await res.data;
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
  const handleFetchResponseDistr = async (res, setInfoMessage) => {
    const response = await res.data;
    // console.log("RetailerList LIST ", res);

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
          retailerName: responseObject?.retailerName,
        }; //
      });
      console.log("customResponse ", customResponse);
      setDistrMaster(customResponse);
    }
  };
  useEffect(() => {
    //Code to add Api logic
    if (!isReadyForMap) {
      console.log("enter first ");
      var { endPoint, config } =
        PrerequistiesConfigCartonList("getCartoonList");
      var apiResponse = fetchData(endPoint, config);
      apiResponse.then((res) => {
        handleFetchResponseCarton(res, setInfoMessage);
      });
    }
  }, [isReadyForMap]);
  //to fill the distributor dropdown
  useEffect(() => {
    const inputParameter = {
      fcn: "getRetailer",
      args: "test",
    };
    var { endPoint, config } =
      ConfigForDistributionRetailerList(inputParameter);
    var apiResponse = fetchData(endPoint, config);
    apiResponse.then((res) => {
      handleFetchResponseDistr(res, setInfoMessage);
    });
    console.log("retailerMaster ", retailerMaster);
  }, []);
  //map
  if (!isLoaded) {
    return <SkeletonText />;
  }

  const SetTotalUnitsForCarton = (updOptionList, setTotalUnits) => {
    console.log("setTotalUnits :", updOptionList);
    var selectedItem = 0;
    updOptionList.map((idx) => {
      let selectedIdx = cartonOption.filter((elem) => elem.index.includes(idx));
      console.log("aaaa", selectedIdx);
      selectedItem += selectedIdx[0].totalUnits;
      console.log("Map --Filter selectedItem ", selectedItem);
      return true;
    });
    if (selectedItem !== undefined) {
      console.log("SelectedValue :", selectedItem);
      setTotalUnits(selectedItem);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const saveData = async (values) => {
    await Swal.fire({
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
        try {
          console.log("Param ::", screen1);
          PostData(screen1);
        } catch (error) {
          console.log("Errr", error);
        }
      } else {
        return;
      }
    });
  };

  const onFinish = (values) => {
    console.log("Finish ", values);

    if (travelType === "") return;
    var prevTravelDetails = inputForESG;
    prevTravelDetails.flightDetails = null;
    prevTravelDetails.carDetails = null;
    prevTravelDetails.truckDetails = null;
    if (travelType === "AIR") {
      prevTravelDetails.flightDetails = objFlightDetails;
    } else if (travelType === "CAR") {
      prevTravelDetails.carDetails = objCarDetails;
    } else if (travelType === "TRUCK") {
      prevTravelDetails.truckDetails = objTruckDetails;
    }
    setInputForESG(prevTravelDetails);

    setScreen1({
      ...screen1,
      key: UID("SHPMR_"),
      carton: selectCarton,
      // shipmentProductNo: values.shipmentProductNo,
      retailerName: selectDistrOption,
      totalUnits: parseInt(totalUnits),
      actionStatus: "NOTSTARTED",
      //vehicleType: vehicle_Details,
      esgInput: inputForESG,
    });
    setIsReadyForMap(true);
    console.log("screen1 Final", screen1);
  };
  const PostData = async (params) => {
    const inputParams = {
      args: params,
      fcn: "moveDistributorToRetailor",
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

            navigate.push("/Shipping");
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

  const onCartonChange = (value) => {
    console.log("prevCarton ", optionList1);

    if (value === undefined || value?.length === 0) {
      console.log("undefined ...");
      setSelectCarton([]);
      setTotalUnits();
      return;
    } else {
      console.log(" value ", value);
      if (value.length > 0) {
        setOptionList1(value);
        form.setFieldsValue({
          carton: value,
        });
        setSelectCarton(value);
        SetTotalUnitsForCarton(value, setTotalUnits);
      }
    }

    form.setFieldsValue({
      carton: value,
    });

    //   SetTotalUnitsForCarton(cartonOption, value, setTotalUnits);
  };

  const onRetailerMasterChange = (value) => {
    console.log("dist name ", value);
    if (value === undefined) {
      console.log("undefined ...");
      return;
    } else {
      form.setFieldsValue({
        retailerName: value,
      });
      setSelectDistrOption(value);
    }

    console.log("setSelectDistrOption ", value);
  };

  const onTravelType = (value) => {
    if (value === undefined) {
      console.log("undefined ...");
      setAirFlag(false);
      setTruckFlag(false);
      setCNGTypeFlag(false);
      setPetrollFuelTypeFlag(false);
      setDieselFuelTypeFlag(false);

      setObjCarDetails(carDetailsTemplate);
      setObjFlightDetails(flightDetailsTemplate);
      setObjTruckDetails(truckDetailsTemplate);
      return;
    } else if (value === "AIR") {
      setTravelType("AIR");
      setAirFlag(true);
      setTruckFlag(false);

      setCNGTypeFlag(false);
      setPetrollFuelTypeFlag(false);
      setDieselFuelTypeFlag(false);
    } else if (value === "TRUCK") {
      setTravelType("TRUCK");
      setAirFlag(false);
      setTruckFlag(false);
      setCNGTypeFlag(false);
      setPetrollFuelTypeFlag(false);
      setDieselFuelTypeFlag(false);

      setObjCarDetails(carDetailsTemplate);
    } else if (value === "CAR") {
      setTravelType("CAR");
      setTruckFlag(false);
      setAirFlag(false);
    }
    setObjCarDetails(carDetailsTemplate);
    setObjFlightDetails(flightDetailsTemplate);
    setObjTruckDetails(truckDetailsTemplate);
  };
  //onFuelType
  const onFuelType = (value) => {
    if (value === undefined) {
      console.log("undefined ...");

      return;
    } else if (value === "PETROL") {
      setPetrollFuelTypeFlag(true);
      setDieselFuelTypeFlag(false);
      setCNGTypeFlag(false);
    } else if (value === "DIESEL") {
      setDieselFuelTypeFlag(true);
      setPetrollFuelTypeFlag(false);
      setCNGTypeFlag(false);
    } else if (value === "CNG") {
      setCNGTypeFlag(true);
      setDieselFuelTypeFlag(false);
      setPetrollFuelTypeFlag(false);
    }
    var prevCarObj = objCarDetails;
    setObjCarDetails({
      ...prevCarObj,
      fuelType: value,
    });
    console.log("FuelType ", value);
  };
  const onCarType = (e, carType) => {
    if (e === undefined) {
      console.log("undefined ...");
      return;
    }
    console.log("carType ", e, carType);
    var cardetails = e.split("~");
    var prevCarDetails = objCarDetails;
    prevCarDetails.index = cardetails[1];
    prevCarDetails.carName = cardetails[0];

    console.log("prevCarDetails ", prevCarDetails);
    if (carType === "PETROL") {
      setObjCarDetails(prevCarDetails);
    } else if (carType === "DIESEL") {
      setObjCarDetails(prevCarDetails);
    }
    if (carType === "CNG") {
      setObjCarDetails(prevCarDetails);
    }
    setObjTruckDetails(truckDetailsTemplate);
    setObjFlightDetails(flightDetailsTemplate);
    console.log("car ", objCarDetails);
  };
  const onTruckChange = (value) => {
    if (value === undefined) {
      console.log("undefined ...");
      return;
    }
    let indexVal = "-1";
    if (value === "LOCAL") indexVal = "0.0965";
    else if (value === "COACH") indexVal = "0.02781";
    console.log("TruckChange ", indexVal);
    var prevTruckDetails = objTruckDetails;
    prevTruckDetails.index = indexVal;
    prevTruckDetails.truckType = value;
    prevTruckDetails.truckName = "";
    setTruckFlag(true);
    setObjTruckDetails(prevTruckDetails);
    setObjCarDetails(carDetailsTemplate);
    setObjFlightDetails(flightDetailsTemplate);
  };
  const onVehicleChange = (value) => {
    form.setFieldsValue({
      vehicleDetails: value,
    });
    var prevTruckDetails = objTruckDetails;
    prevTruckDetails.truckName = value;
    setObjTruckDetails(prevTruckDetails);

    console.log("onVehicleChange ", objTruckDetails);
  };

  const onFlightType = (value) => {
    if (value === undefined) {
      console.log("undefined ...");
      return;
    }

    let indexVal = "-1";
    if (value === "ECONOMY") indexVal = "0.140625";
    else if (value === "PREMIUM") indexVal = "0.225";
    else if (value === "BUSINESS") indexVal = "0.40781";
    else if (value === "FIRST") indexVal = "0.56251";

    console.log("AirFlight ", indexVal);
    var prevFlightDetails = objFlightDetails;
    prevFlightDetails.index = indexVal;
    prevFlightDetails.chairType = value;
    setObjFlightDetails(prevFlightDetails);
    setTruckFlag(false);

    setObjTruckDetails(truckDetailsTemplate);
    setObjCarDetails(carDetailsTemplate);
    console.log("prevFlightDetails ", prevFlightDetails);
  };

  //
  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    console.log("CalculateRoute....");
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    let distance = results.routes[0].legs[0].distance.value / 1000;
    let customZoom = calculateZoomLevel(distance);
    setDistance(results.routes[0].legs[0].distance.text);
    setZoomVal(customZoom);
    setDuration(results.routes[0].legs[0].duration.text);
    let calculateEmmisionval = await calculateEstimatedEmmission(distance);
    setEstimatedEmmision(calculateEmmisionval);
    setMapFinal({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: travelType,
      distanceInKms: distance,
      durationTime: results.routes[0].legs[0].duration.text,
      calculateEmmision: calculateEmmisionval,
    });
    setScreen1({
      ...screen1,
      originLocation: originRef.current.value,
      destinationLocation: destiantionRef.current.value,
      travelMode: travelType,
      distanceInKms: distance,
      durationTime: results.routes[0].legs[0].duration.text,
      calculateEmmision: calculateEmmisionval,
    });
  }
  const calculateEstimatedEmmission = async (distance) => {
    console.log("calculateEstimatedEmmission ");
    let distanceVal = Number(distance);
    let prevInputForESG = inputForESG;
    let staffCount = parseInt(prevInputForESG.staffCount);

    let index;
    let estimatedEmmission = "";

    if (travelType === "AIR") {
      index = Number(prevInputForESG.flightDetails.index);
    } else if (travelType === "CAR") {
      index = Number(prevInputForESG.carDetails.index);
    } else if (travelType === "TRUCK") {
      index = Number(prevInputForESG.truckDetails.index);
    }

    estimatedEmmission = (distanceVal * staffCount * index).toFixed(2);

    console.log(
      "calculateEstimatedEmmission estimatedEmmission ",
      travelType,
      estimatedEmmission,
      distanceVal,
      staffCount,
      index,
      prevInputForESG
    );
    return estimatedEmmission;
  };

  function calculateZoomLevel(distance) {
    let customZoom;
    if (distance > 0 && distance < 450) customZoom = 15;
    else if (distance > 450 && distance < 750) customZoom = 14;
    else if (distance > 750 && distance < 1200) customZoom = 12;
    else if (distance > 1200 && distance < 1700) customZoom = 10;
    else if (distance > 1700 && distance < 2100) customZoom = 8;
    else if (distance > 2100 && distance < 2600) customZoom = 8;
    else customZoom = 6;
    console.log("customzoom ", customZoom);
    return customZoom;
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setZoomVal(10);
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }
  return (
    <div className="mainbox">
      {!isReadyForMap && (
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
            label="Carton"
            name="carton"
            wrapperCol={{
              span: 8,
            }}
          >
            <Space size="large" style={{ width: "100%" }}>
              <Select
                mode="multiple"
                className="col2"
                onChange={($event) => {
                  setOptionList1($event);
                  onCartonChange($event);
                }}
                style={{ width: "100%", display: "inline-block" }}
                allowClear
              >
                <Option
                  disabled="true"
                  value="----------------Select a Carton----------------"
                >
                  Select a Carton
                </Option>
                {cartonOption &&
                  cartonOption.map((ele, idx) => (
                    <>
                      <Option key={idx} value={ele.index}>
                        {ele.index}
                      </Option>
                    </>
                  ))}
              </Select>
              {"  "}

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

          {/* <Form.Item
            label="Shipment No"
            name="shipmentProductNo"
            allowClear
            rules={[
              {
                required: true,
                message: "Please provide the input for product name!",
              },
            ]}
          >
            <Input className="col1" />
          </Form.Item> */}
          <Form.Item label="Retailer's Name" name="retailerName" allowClear>
            <Space size="large" style={{ width: "100%" }} block>
              <Select
                className="col2"
                onChange={onRetailerMasterChange}
                style={{ width: "100%" }}
                allowClear
              >
                <Option
                  disabled="true"
                  value="------------Select a retailer------------"
                >
                  Please Select
                </Option>
                {retailerMaster &&
                  retailerMaster.map((ele, idx) => (
                    <>
                      <Option
                        key={idx}
                        value={ele.index + "~" + ele.retailerName}
                      >
                        {ele.index + " " + ele.retailerName}
                      </Option>
                    </>
                  ))}
              </Select>{" "}
            </Space>
          </Form.Item>

          <Form.Item label="Travel Type" name="travelType" allowClear>
            {" "}
            <Select
              className="col2"
              placeholder="----Select Travel Type----"
              onChange={onTravelType}
              allowClear
              suffixIcon={
                <AiOutlineTransaction
                  style={{
                    fontSize: "1rem",
                    marginright: "16px",
                    color: "black",
                  }}
                ></AiOutlineTransaction>
              }
            >
              <Option disabled="true" value="---Please Select---">
                Please Select
              </Option>
              <Option value="AIR">AIR</Option>
              <Option value="TRUCK">TRUCK</Option>
              <Option value="CAR">CAR</Option>
            </Select>
          </Form.Item>
          <Option value="CAR">CAR</Option>
          {/* FLIGHT */}
          {travelType === "AIR" && (
            <Form.Item label="Travel Class" name="travelClass" allowClear>
              {" "}
              <Select
                className="col2"
                placeholder="----Select Travel Class----"
                onChange={onFlightType}
                allowClear
                suffixIcon={
                  <FaChair
                    style={{
                      fontSize: "1rem",
                      marginright: "16px",
                      color: "black",
                    }}
                  ></FaChair>
                }
              >
                <Option disabled="true" value="---Please Select---">
                  Please Select
                </Option>
                <Option value="ECONOMY">Economy</Option>
                <Option value="FIRST">First Class</Option>
                <Option value="BUSINESS">Business</Option>
              </Select>
            </Form.Item>
          )}

          {/**CAR */}
          {travelType === "CAR" && (
            <Form.Item label="Fuel Type" name="fuelType" allowClear>
              {" "}
              <Select className="col2" onChange={onFuelType} allowClear>
                <Option disabled="true" value="---Please select fuel type---">
                  Please Select
                </Option>
                <Option value="PETROL">Petrol</Option>
                <Option value="DIESEL">Diesel</Option>
                <Option value="CNG">CNG</Option>
              </Select>
            </Form.Item>
          )}
          {petrolFuelTypeFlag && travelType === "CAR" && (
            <Form.Item label="Petrol Car" name="petrolType" allowClear>
              {" "}
              <Select
                className="col2"
                onChange={(e) => onCarType(e, "PETROL")}
                allowClear
              >
                <Option disabled="true" value="---Please select petrol car---">
                  Please Select
                </Option>

                <Option value="Small car (Engine Upto: 1.4 ltr)~0.1465">
                  Small car (Engine Upto: 1.4 ltr)
                </Option>
                <Option value="Medium Car (Engine Upto: 1.4 - 2 ltr)~0.1847">
                  Medium Car (Engine Upto: 1.4 - 2 ltr)
                </Option>
                <Option value="Large Car (Engine Upto: Above 2 ltr)~0.27639">
                  Large Car (Engine Upto: Above 2 ltr)
                </Option>
                <Option value="Average Car (Engine Upto: Unknown ltr)~0.17048">
                  Average Car (Engine Upto: Unknown ltr)
                </Option>
              </Select>
            </Form.Item>
          )}
          {dieselFuelTypeFlag && travelType === "CAR" && (
            <Form.Item label="Diesel Car" name="deiselType" allowClear>
              {" "}
              <Select
                className="col2"
                placeholder="----Select Diesel Car----"
                onChange={(e) => onCarType(e, "DIESEL")}
                allowClear
              >
                <Option disabled="true" value="---Please Select---">
                  Please Select
                </Option>

                <Option value="" disabled>
                  Choose your Car Type
                </Option>
                <Option value="Small car (Engine Upto: 1.7 ltr)~0.13989">
                  Small car (Engine Upto: 1.7 ltr)
                </Option>
                <Option value="Medium Car (Engine Upto: 1.7 - 2 ltr)~0.168">
                  Medium Car (Engine Upto: 1.7 - 2 ltr)
                </Option>
                <Option value="Large Car (Engine Upto: Above 2 ltr)~0.20953">
                  Large Car (Engine Upto: Above 2 ltr)
                </Option>
                <Option value="Average Car (Engine Upto: Unknown ltr)~0.17082">
                  Average Car (Engine Upto: Unknown ltr)
                </Option>
              </Select>
            </Form.Item>
          )}

          {cngTypeFlag && travelType === "CAR" && (
            <Form.Item label="CNG Type" name="cngType" allowClear>
              {" "}
              <Select
                className="col2"
                placeholder="----Select CNG Car----"
                allowClear
                onChange={(e) => onCarType(e, "CNG")}
              >
                <Option disabled="true" value="---Please Select---">
                  Please Select
                </Option>

                <Option value="" disabled>
                  Choose your Car Type
                </Option>
                <Option value="Medium Car (Engine Upto: 1.4 - 2 ltr)~0.15803">
                  Medium Car (Engine Upto: 1.4 - 2 ltr)
                </Option>
                <Option value="Large Car (Engine Upto: Above 2 ltr)~0.23578">
                  Large Car (Engine Upto: Above 2 ltr)
                </Option>
                <Option value="Average Car (Engine Upto: Unknown ltr)~0.17517">
                  Average Car (Engine Upto: Unknown ltr)
                </Option>
              </Select>
            </Form.Item>
          )}

          {travelType === "TRUCK" && (
            <>
              <Form.Item label="Truck Type" name="truckType" allowClear>
                <Select
                  className="col2"
                  placeholder="----Select a Vehicle----"
                  onChange={onTruckChange}
                  allowClear
                >
                  <Option disabled="true" value="---Please Select---">
                    Please Select
                  </Option>
                  <Option value="LOCAL">Local</Option>
                  <Option value="COACH">Coach</Option>
                </Select>
              </Form.Item>
              {truckFlag && (
                <Form.Item label="Vehicle" name="vehicleDetails" allowClear>
                  <Select
                    className="col2"
                    placeholder="----Select a Vehicle----"
                    onChange={onVehicleChange}
                    allowClear
                  >
                    <Option disabled="true" value="---Please Select---">
                      Please Select
                    </Option>
                    <Option value="Jumbo Truck (1250)">
                      Jumbo Truck (1250)
                    </Option>
                    <Option value="Flatbeds (1250)">Flatbeds (1250)</Option>
                    <Option value="Box Truck (1250)">Box Truck (1250)</Option>
                    <Option value="VAN (1050)">VAN (1050)</Option>
                    <Option value="Tata Ace (950)">Tata Ace (950)</Option>
                  </Select>
                </Form.Item>
              )}
            </>
          )}
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
      )}
      {isReadyForMap && (
        <Flex
          position="relative"
          flexDirection="column"
          alignItems="center"
          h="74.5vh"
          w="73.8vw"
        >
          <Box position="absolute" left={0} top={0} h="97%" w="96.5%">
            <GoogleMap
              center={center}
              zoom={8}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={center} />
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </Box>
          <Box
            p={4}
            borderRadius="lg"
            m={4}
            bgColor="#FFFFFF"
            shadow="base"
            minW="container.md"
            w="80%"
            h="20%"
            zIndex="1"
          >
            <HStack spacing={4} justifyContent="space-between">
              <Box flexGrow={1}>
                <Autocomplete>
                  <CInput
                    type="text"
                    style={{
                      width: "92.2%",
                      lineHeight: "1.5rem",
                      marginLeft: "5px",
                      marginRight: "5px",
                      marginTop: "5px",
                    }}
                    placeholder="Origin Address"
                    ref={originRef}
                  />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <CInput
                    type="text"
                    style={{
                      width: "92.2%",
                      lineHeight: "1.5rem",
                      marginLeft: "5px",
                      marginRight: "5px",
                      marginTop: "5px",
                    }}
                    placeholder="Destination Address"
                    ref={destiantionRef}
                  />
                </Autocomplete>
              </Box>
              <Box flexGrow={2}>
                <ButtonGroup>
                  <CButton
                    colorScheme="pink"
                    type="submit"
                    onClick={calculateRoute}
                  >
                    Calculate Route
                  </CButton>
                  <IconButton
                    aria-label="center back"
                    icon={<FaTimes style={{ width: "30px" }} />}
                    onClick={clearRoute}
                  />
                </ButtonGroup>
              </Box>
            </HStack>

            <HStack mt={5} spacing={5} justifyContent="space-between">
              <Text ml={4}>Distance: {distance} </Text>
              <Text>Duration: {duration} </Text>
              <Text style={{ color: "Green" }}>
                Estimated Emmision(Co2): {estimatedEmmision}{" "}
              </Text>
              <IconButton
                aria-label="center back"
                icon={<AiFillSave />}
                isRound
                className="updt-otps-edit"
                style={{ cursor: "pointer", marginRight: "15px" }}
                onClick={(e) => {
                  saveData(e);
                }}
              ></IconButton>
            </HStack>
          </Box>
        </Flex>
      )}
    </div>
  );
};

export default CreateShipmentForRetailer;
