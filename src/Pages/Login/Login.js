import React, { useState } from "react";
import MondelezHQSign_Lead from "../../Assests/images/Mask group.svg";
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom";

import { UserDetails } from "./dummydata.js";
import { notification } from "antd";

const openNotification = (_notificationTitle, _desc, msg, _type, placement) => {
  notification.open({
    message: _notificationTitle,
    description: _desc,
    type: _type,
    onClick: () => {
      console.log(msg);
    },
    placement,
  });
};
const Login = () => {
  const navigate = useHistory();

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState("");

  const SetNavigation = (loginRole, navigate) => {
    if (loginRole === "collectionunit" || loginRole === "processingunit")
      navigate.push("/dashboard");
    else if (loginRole === "shippingunit") navigate.push("/ProductInWH");
    else if (loginRole === "distributorunit") navigate.push("/trackshipment");
    else if (loginRole === "retailerunit") navigate.push("/TrackRetailUnit");
    else if (loginRole === "administratorunit")
      navigate.push("/CreateDistributor");
  };

  const validateUser = (loginRole) => {
    const expression = (e) =>
      e.username === loginName &&
      e.password === loginPassword &&
      e.role === loginRole;
    console.log(loginRole, "Login Passw ", loginPassword, " Name ", loginName);
    const result = UserDetails.filter(expression);
    if (result.length > 0) {
      localStorage.setItem("userName", result[0].fullName);

      return true;
    }
    return false;
  };

  const setHomePage = (loginRole) => {
    const emailPattern = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

    let validEmail = emailPattern.test(loginName);
    console.log("Valid Email :", validEmail, loginName);
    if (!validEmail) {
      openNotification(
        `Invalid Email `,
        `Please provide correct email format for user name  !!`,
        "",
        "error",
        "topRight"
      );
      return false;
    } else {
      if (validateUser(loginRole)) SetNavigation(loginRole, navigate);
      else {
        openNotification(
          `Invalid User Details. `,
          `Please provide correct credentials!!`,
          "",
          "error",
          "topRight"
        );

        navigate.push("/login");
      }
    }
  };

  return (
    <div className="login-layout">
      <div className="login-card-layout">
        <div className="row" style={{ height: "100%" }}>
          <div className="col-md-6">
            <div className="login-card-img">
              <img src={MondelezHQSign_Lead} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="login-form-card">
              <div className="login-form">
                <div className="login-form-head">
                  <div className="left-head">
                    <span>Welcome back</span>
                    <br />
                    <span className="login-label">Login to your account</span>
                  </div>
                  <div className="right-head">
                    <select
                      onChange={(e) => {
                        const selectedRole = e.target.value;
                        console.log("Role:", selectedRole);
                        setLoginRole(selectedRole);
                      }}
                    >
                      <option value="-1">----Please Select----</option>
                      <option value="collectionunit">Collection Unit</option>
                      <option value="processingunit">Processing Unit</option>
                      <option value="administratorunit">
                        Administrator Unit
                      </option>
                      <option value="shippingunit">Shipping Unit</option>
                      <option value="distributorunit">Distribution Unit</option>
                      <option value="retailerunit">Retailer Unit</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="form-label">Email</label>
                  </div>
                  <div className="col-md-12">
                    <input
                      className="form-input"
                      type="email"
                      value={loginName}
                      onChange={(e) => {
                        setLoginName(e.target.value);
                        console.log("loginName: ", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="form-label">Password</label>
                  </div>
                  <div className="col-md-12">
                    <input
                      className="form-input"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        console.log("Pwd: ", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <input type="radio" /> &nbsp;
                    <label className="form-label">Remember me</label>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <button
                      className="btn login-now"
                      onClick={() => {
                        localStorage.setItem("loginRole", loginRole);
                        localStorage.setItem("loginName", loginName);
                        setHomePage(loginRole);
                      }}
                    >
                      Login now
                    </button>
                  </div>
                </div>

                <div className="row mt-3">
                  <div
                    className="col-md-12 text-center"
                    style={{ fontSize: "0.8rem" }}
                  >
                    <span>Don't have an account?</span>
                    <span style={{ color: "blue", cursor: "pointer" }}>
                      &nbsp; Join free today
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
