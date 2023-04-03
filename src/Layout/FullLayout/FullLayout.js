import React from "react";
import { useHistory } from "react-router";
import logo from "../../Assests/icons/image 5.svg";
import avatar from "../../Assests/icons/profile-avatar.jpg";
import { AiOutlineSetting } from "react-icons/ai";
import { useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineQrCodeScanner,
  MdOutlineLocalShipping,
} from "react-icons/md";

import { MdBackpack } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { BsChat, BsQuestionCircle, BsDistributeVertical } from "react-icons/bs";
import Autocomplete from "react-google-autocomplete";
import { FiAnchor } from "react-icons/fi";
import { FaShippingFast } from "react-icons/fa";
import { GiPowerButton } from "react-icons/gi";

import { IoIosBusiness } from "react-icons/io";

import { RiUserSharedFill } from "react-icons/ri";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const FullLayoutComponent = ({ children }) => {
  const loginRole = localStorage.getItem("loginRole");
  const userName = localStorage.getItem("userName");
  const SignOutApp = () => {
    Swal.fire({
      html: `Are you sure want to <b>Sign Out</b>? `,
      icon: "warning",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonAriaLabel: "Sign Out!",
      confirmButtonText: "Confirm",
      confirmButtonColor: "#360036",
      cancelButtonAriaLabel: "Continue",
      cancelButtonColor: "Red",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        setTimeout(3000);
        navigate.push("/login");
      }
    });
  };

  const menuIconsCU = [
    {
      title: "Dashboard",
      icon: (
        <MdOutlineDashboard style={{ fontSize: "1rem" }}></MdOutlineDashboard>
      ),
      classN: "active",
      id: "Dash",
      tabSelect: true,
      path: "/Dashboard",
    },
  ];

  const menuIconsPU = [
    {
      title: "Dashboard",
      icon: (
        <MdOutlineDashboard style={{ fontSize: "1rem" }}></MdOutlineDashboard>
      ),
      classN: "active",
      id: "Dash",
      tabSelect: true,
      path: "/Dashboard",
    },
    {
      title: "Choclate Product",
      icon: <CgFileDocument style={{ fontSize: "1rem" }}></CgFileDocument>,
      classN: "inactive",
      id: "ProdCh",
      tabSelect: false,
      path: "/product/choclate",
    },
    {
      title: "Fruit Product",
      icon: <CgFileDocument style={{ fontSize: "1rem" }}></CgFileDocument>,
      classN: "inactive",
      id: "ProdFruit",
      tabSelect: false,
      path: "/product/fruits",
    },
    {
      title: "QR Code",
      icon: (
        <MdOutlineQrCodeScanner
          style={{ fontSize: "1rem" }}
        ></MdOutlineQrCodeScanner>
      ),
      classN: "inactive",
      id: "qrCode",
      tabSelect: false,
      path: "/QRCode",
    },
  ];
  const menuIconsSU = [
    {
      title: "Product(In WH)",
      icon: (
        <MdOutlineDashboard style={{ fontSize: "1rem" }}></MdOutlineDashboard>
      ),
      classN: "active",
      id: "prodinwh", // prodinwh old prod
      tabSelect: true,
      path: "ProductInWH",
    },

    {
      //Carton Packed Products
      title: "Product (CPP)",
      icon: <MdBackpack style={{ fontSize: "1rem" }}></MdBackpack>,
      classN: "inactive",
      id: "prod", // prodinwh old prod
      tabSelect: false,
      path: "CartonPackedProd",
    },
    {
      title: "Shipping",
      icon: (
        <MdOutlineLocalShipping
          style={{ fontSize: "1rem" }}
        ></MdOutlineLocalShipping>
      ),
      classN: "inactive",
      id: "shipping",
      tabSelect: false,
      path: "/shipping",
    },
    {
      title: "Track Shipment",
      icon: <FaShippingFast style={{ fontSize: "1rem" }}></FaShippingFast>,
      classN: "inactive",
      id: "trackshipment",
      tabSelect: false,
      path: "/TrackShipment",
    },
    {
      title: "Distribution List",
      icon: (
        <BsDistributeVertical
          style={{ fontSize: "1rem" }}
        ></BsDistributeVertical>
      ),
      classN: "inactive",
      id: "DistList",
      tabSelect: false,
      path: "/DistList",
    },
  ];

  const menuIconsDU = [
    {
      title: "Product in Warehouse",
      icon: (
        <MdOutlineDashboard style={{ fontSize: "1rem" }}></MdOutlineDashboard>
      ),
      classN: "active",
      id: "prod",
      tabSelect: false,
      path: "#",
    },
    {
      title: "Track Shipment",
      icon: <FaShippingFast style={{ fontSize: "1rem" }}></FaShippingFast>,
      classN: "inactive",
      id: "trackshipment",
      tabSelect: true,
      path: "/trackshipment",
    },
    {
      title: "Retailer List",
      icon: <IoIosBusiness style={{ fontSize: "1rem" }}></IoIosBusiness>,
      classN: "inactive",
      id: "retailerList",
      tabSelect: false,
      path: "/retailerList",
    },
  ];
  const menuIconsRU = [
    {
      title: "Product",
      icon: (
        <MdOutlineDashboard style={{ fontSize: "1rem" }}></MdOutlineDashboard>
      ),
      classN: "active",
      id: "prod",
      tabSelect: true,
      path: "#",
    },

    {
      title: "Track Shipment",
      icon: <FaShippingFast style={{ fontSize: "1rem" }}></FaShippingFast>,
      classN: "inactive",
      id: "trackshipment",
      tabSelect: false,
      path: "/TrackRetailUnit",
    },
  ];

  const menuIconsAU = [
    {
      title: "Create Distributor",
      icon: <RiUserSharedFill style={{ fontSize: "1rem" }}></RiUserSharedFill>,
      classN: "inactive",
      id: "distributor",
      tabSelect: false,
      path: "/createDistributor",
    },
    {
      title: "Create Retailer",
      icon: <IoIosBusiness style={{ fontSize: "1rem" }}></IoIosBusiness>,
      classN: "inactive",
      id: "retailer",
      tabSelect: false,
      path: "/createRetailer",
    },
    {
      title: "Distributor List",
      icon: (
        <MdOutlineLocalShipping
          style={{ fontSize: "1rem" }}
        ></MdOutlineLocalShipping>
      ),
      classN: "inactive",
      id: "distList",
      tabSelect: false,
      path: "/distList",
    },
    {
      title: "Retailer List",
      icon: (
        <MdOutlineLocalShipping
          style={{ fontSize: "1rem" }}
        ></MdOutlineLocalShipping>
      ),
      classN: "inactive",
      id: "retailerList",
      tabSelect: false,
      path: "/retailerList",
    },
  ];
  const navigate = useHistory();

  const customMenu = () => {
    let profileMenu = [];
    if (loginRole === "collectionunit") profileMenu = menuIconsCU;
    else if (loginRole === "processingunit") profileMenu = menuIconsPU;
    else if (loginRole === "shippingunit") profileMenu = menuIconsSU;
    else if (loginRole === "distributorunit") profileMenu = menuIconsDU;
    else if (loginRole === "retailerunit") profileMenu = menuIconsRU;
    else if (loginRole === "administratorunit") profileMenu = menuIconsAU;

    return profileMenu;
  };
  const [menu, setMenu] = useState(() => customMenu());

  const changeTabPU = (id, activeStatus, path) => {
    navigate.push(path);

    let x = document.getElementById("Dash");
    let y = document.getElementById("ProdCh");
    let x1 = document.getElementById("ProdFruit");
    let y2 = document.getElementById("qrCode");

    let myState = menu;

    if (id === "Dash") {
      x.classList.add("active");
      y2.classList.add("inactive");
      y.classList.add("inactive");
      x1.classList.add("inactive");

      x.classList.remove("inactive");
      y2.classList.remove("active");
      y.classList.remove("active");
      x1.classList.add("active");
    }

    if (id === "qrCode") {
      y2.classList.add("active");
      x.classList.add("inactive");
      x1.classList.add("inactive");
      y.classList.add("inactive");

      y2.classList.remove("inactive");
      x.classList.remove("active");
      x1.classList.remove("active");
      y.classList.remove("active");
    }

    if (id === "ProdCh") {
      y.classList.add("active");
      x.classList.add("inactive");
      x1.classList.add("inactive");
      y2.classList.add("inactive");

      y.classList.remove("inactive");
      x.classList.remove("active");
      y2.classList.remove("active");
      x1.classList.remove("active");
    }
    if (id === "ProdFruit") {
      x1.classList.add("active");
      x.classList.add("inactive");
      y.classList.add("inactive");
      y2.classList.add("inactive");

      x1.classList.remove("inactive");
      y.classList.remove("active");
      x.classList.remove("active");
      y2.classList.remove("active");
    }

    myState[0].tabSelect = false;
    myState[1].tabSelect = false;
    myState[2].tabSelect = true;
    setMenu(myState);
    //}
  };
  const changeTabCU = (id, activeStatus, path) => {
    navigate.push(path);
    let x = document.getElementById("Dash");

    let myState = menu;
    if (id === "Dash") {
      x.classList.add("active");
    }

    myState[0].tabSelect = true;
    setMenu(myState);
  };
  const changeTabSU = (id, activeStatus, path) => {
    console.log("changeTabSU ", path, id, activeStatus);
    navigate.push(path);
    let x = document.getElementById("prod");
    let y = document.getElementById("shipping");
    let y2 = document.getElementById("trackshipment");
    let z = document.getElementById("DistList");
    let z1 = document.getElementById("prodinwh");

    let myState = menu;
    if (id === "prodinwh") {
      z1.classList.add("active");
      x.classList.add("inactive");
      y.classList.add("inactive");
      y2.classList.add("inactive");
      z.classList.add("inactive");

      z1.classList.remove("inactive");
      x.classList.remove("active");
      y.classList.remove("active");
      y2.classList.remove("active");
      z.classList.remove("active");
    }
    if (id === "prod") {
      x.classList.add("active");
      y2.classList.add("inactive");
      y.classList.add("inactive");
      z.classList.add("inactive");
      z1.classList.add("inactive");

      x.classList.remove("inactive");
      y2.classList.remove("active");
      y.classList.remove("active");
      z.classList.remove("active");
      z1.classList.remove("active");
    }
    if (id === "shipping") {
      y.classList.add("active");
      x.classList.add("inactive");
      y2.classList.add("inactive");
      z.classList.add("inactive");
      z1.classList.add("inactive");

      y.classList.remove("inactive");
      x.classList.remove("active");
      y2.classList.remove("active");
      z.classList.remove("active");
      z1.classList.remove("active");
    }
    if (id === "trackshipment") {
      y2.classList.add("active");
      x.classList.add("inactive");
      y.classList.add("inactive");
      z.classList.add("inactive");
      z1.classList.add("inactive");

      y2.classList.remove("inactive");
      x.classList.remove("active");
      y.classList.remove("active");
      z.classList.remove("active");
      z1.classList.remove("active");
    }

    if (id === "DistList") {
      z.classList.add("active");
      x.classList.add("inactive");
      y.classList.add("inactive");
      y2.classList.add("inactive");
      z1.classList.add("inactive");

      z.classList.remove("inactive");
      x.classList.remove("active");
      y.classList.remove("active");
      y2.classList.remove("active");
      z1.classList.remove("active");
    }

    myState[0].tabSelect = false;
    myState[1].tabSelect = false;
    myState[2].tabSelect = true;
    setMenu(myState);
  };
  const changeTabDU = (id, activeStatus, path) => {
    navigate.push(path);
    let x = document.getElementById("prod");
    let y2 = document.getElementById("trackshipment");
    let z = document.getElementById("retailerList");

    let myState = menu;

    if (id === "trackshipment") {
      y2.classList.add("active");
      x.classList.add("inactive");
      z.classList.add("inactive");

      y2.classList.remove("inactive");
      x.classList.remove("active");
      z.classList.remove("active");
    }

    if (id === "prod") {
      x.classList.add("active");
      y2.classList.add("inactive");
      z.classList.add("inactive");

      x.classList.remove("inactive");
      y2.classList.remove("active");
      z.classList.remove("active");
    }
    if (id === "retailerList") {
      z.classList.add("active");
      x.classList.add("inactive");
      y2.classList.add("inactive");

      z.classList.remove("inactive");
      x.classList.remove("active");
      y2.classList.remove("active");
    }

    myState[0].tabSelect = false;
    myState[1].tabSelect = false;
    myState[2].tabSelect = true;
    setMenu(myState);
  };
  const changeTabRU = (id, activeStatus, path) => {
    //prodru,trackshipment
    let x = document.getElementById("prod");
    let y2 = document.getElementById("trackshipment");

    let myState = menu;

    if (id === "trackshipment") {
      y2.classList.add("active");
      x.classList.add("inactive");

      y2.classList.remove("inactive");
      x.classList.remove("active");
    }

    if (id === "prod") {
      x.classList.add("active");
      y2.classList.add("inactive");

      x.classList.remove("inactive");
      y2.classList.remove("active");
    }

    myState[0].tabSelect = false;
    myState[1].tabSelect = true;
    // myState[2].tabSelect = true;
    setMenu(myState);
  };
  const changeTabAU = (id, activeStatus, path) => {
    console.log("changeTabAU ", path, id, activeStatus);
    navigate.push(path);
    // distributorList,retailerList
    let x = document.getElementById("distributor");
    let y = document.getElementById("retailerList");
    let y1 = document.getElementById("distList");
    let z1 = document.getElementById("retailer");

    let myState = menu;
    if (id === "distributor") {
      x.classList.add("active");
      y.classList.add("inactive");
      y1.classList.add("inactive");
      z1.classList.add("inactive");

      x.classList.remove("inactive");
      y.classList.remove("active");
      y1.classList.remove("active");
      z1.classList.remove("active");
    } else if (id === "retailer") {
      z1.classList.add("active");
      x.classList.add("inactive");
      y.classList.remove("inactive");
      y1.classList.add("inactive");

      z1.classList.remove("inactive");
      x.classList.remove("active");
      y.classList.remove("active");
      y1.classList.remove("active");
    } else if (id === "retailerList") {
      y1.classList.add("active");
      x.classList.add("inactive");
      y.classList.remove("inactive");
      z1.classList.add("inactive");

      y1.classList.remove("inactive");
      x.classList.remove("active");
      y.classList.remove("active");
      z1.classList.remove("active");
    } else if (id === "distList") {
      y1.classList.add("active");
      x.classList.add("inactive");
      y.classList.remove("inactive");
      z1.classList.add("inactive");

      y1.classList.remove("inactive");
      x.classList.remove("active");
      y.classList.remove("active");
      z1.classList.remove("active");
    }

    myState[0].tabSelect = false;
    myState[1].tabSelect = false;
    myState[2].tabSelect = false;
    myState[3].tabSelect = true;
    console.log("MyState ::", myState);
    setMenu(myState);
  };

  return (
    <div className="full-layout">
      <div className="body-area">
        <div className="full-layout-left">
          <div id="verticalBarID" className="verticalBar">
            <div className="verticalBar-logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="verticalBar-profile">
              <div className="profile-pic">
                <img src={avatar} alt="avatar" />
              </div>
              <div className="profile-name">
                <span>
                  <span className="wlc">Welcome back,</span>
                  <br />
                  <span className="name">{userName}</span>
                </span>
              </div>
              <div className="settings">
                <AiOutlineSetting size={18}></AiOutlineSetting>
              </div>
            </div>
            <div className="barBox">
              {loginRole === "shippingunit" && (
                <>
                  {menu.map((val, i) => (
                    <div
                      id={val.id}
                      onClick={() =>
                        changeTabSU(val.id, val.activeStatus, val.path)
                      }
                      className={val.classN + " mt-2 d-flex align-items-center"}
                    >
                      {val.icon} &nbsp; {val.title}
                    </div>
                  ))}
                </>
              )}

              {loginRole === "collectionunit" && (
                <>
                  {menu.map((val, i) => (
                    <div
                      id={val.id}
                      onClick={() =>
                        changeTabCU(val.id, val.activeStatus, val.path)
                      }
                      className={val.classN + " mt-2 d-flex align-items-center"}
                    >
                      {val.icon} &nbsp; {val.title}
                    </div>
                  ))}
                </>
              )}
              {loginRole === "processingunit" && (
                <>
                  {menu.map((val, i) => (
                    <div
                      id={val.id}
                      onClick={() =>
                        changeTabPU(val.id, val.activeStatus, val.path)
                      }
                      className={val.classN + " mt-2 d-flex align-items-center"}
                    >
                      {val.icon} &nbsp; {val.title}
                    </div>
                  ))}
                </>
              )}
              {loginRole === "distributorunit" && (
                <>
                  {menu.map((val, i) => (
                    <div
                      id={val.id}
                      onClick={() =>
                        changeTabDU(val.id, val.activeStatus, val.path)
                      }
                      className={val.classN + " mt-2 d-flex align-items-center"}
                    >
                      {val.icon} &nbsp; {val.title}
                    </div>
                  ))}
                </>
              )}
              {loginRole === "retailerunit" && (
                <>
                  {menu.map((val, i) => (
                    <div
                      id={val.id}
                      onClick={() =>
                        changeTabRU(val.id, val.activeStatus, val.path)
                      }
                      className={val.classN + " mt-2 d-flex align-items-center"}
                    >
                      {val.icon} &nbsp; {val.title}
                    </div>
                  ))}
                </>
              )}
              {loginRole === "administratorunit" && (
                <>
                  {menu.map((val, i) => (
                    <div
                      id={val.id}
                      onClick={() =>
                        changeTabAU(val.id, val.activeStatus, val.path)
                      }
                      className={val.classN + " mt-2 d-flex align-items-center"}
                    >
                      {val.icon} &nbsp; {val.title}
                    </div>
                  ))}
                </>
              )}
              <div className="bottom-tabs">
                <div
                  className="mt-3"
                  onClick={() => {
                    SignOutApp();
                  }}
                >
                  <GiPowerButton></GiPowerButton> &nbsp;&nbsp;&nbsp;&nbsp; Sign
                  Out
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="full-layout-right">{children}</div>
      </div>
    </div>
  );
};
