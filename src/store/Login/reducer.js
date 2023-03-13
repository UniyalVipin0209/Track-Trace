import { GET_LOGIN_DETAILS } from "./types";

const initialState = {
  message: "waiting for the reducer",
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_LOGIN_DETAILS:
      return {
        ...state,
        getLoginDetails: payload,
      };
    default:
      return {
        ...state,
      };
  }
}
