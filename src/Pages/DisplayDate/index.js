import React from "react";
import Moment from "react-moment";
//import "moment-timezone";
import moment from "moment";

const DisplayDate = () => {
  return moment().format("MMM DD, YYYY");
};

export default DisplayDate;
