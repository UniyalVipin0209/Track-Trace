import axios from "axios";

import {
  LOGIN_DATA,
  LOGIN_DATA_ERR,
  GET_LOGIN_DETAILS,
  GET_LOGIN_DETAILS_ERR,
} from "./types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const devURLTest = "http://localhost:7001/";

export const getLoginDetails = (data) => (dispatch) => {
  const body = { userName: data };

  axios
    .get(devURLTest + "user_login", body)
    .then((res) => {
      console.log(res);
      dispatch({ type: GET_LOGIN_DETAILS, payload: res });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_LOGIN_DETAILS_ERR, payload: err });
    });
};

