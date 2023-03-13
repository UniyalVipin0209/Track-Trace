// import { SET_ROUTING_NAME } from "./types";
import {
  GET_CITY_NAMES,
  GET_REPORT_TYPE,
  GET_STATE_NAMES,
  GET_USER_DEPARTMENTS,
  GET_USER_PREVILEGES,
  GET_USER_ROLE_LIST,
  POST_USER_ROLES,
  SET_ROUTING_NAME,
} from "./types";
// import
// import
const initialState = {
  message: "waiting for the reducer",
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    default:
      return {
        ...state,
      };
  }
}
