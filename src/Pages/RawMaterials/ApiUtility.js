import shortHash from "shorthash2";

const PrerequistiesConfig = (categoryName) => {
  const parameter = {
    args: categoryName,
    fcn: "getProduct",
    defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
  };
  let endPoint = process.env.REACT_APP_ENDPOINT_PRODUCT;
  let token = process.env.REACT_APP_TOKEN;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      args: parameter.args,
      fcn: parameter.fcn,
      peer: parameter,
    },
  };
  return { endPoint, config };
};

const PrerequistiesDelete = (parameter) => {
  let endPoint = process.env.REACT_APP_ENDPOINT_PRODUCT;
  let token = process.env.REACT_APP_TOKEN;

  const config = {
    method: parameter.actiontype,
    headers: {
      "Content-Type": "application/json",
      "Acess-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  const data = {
    peers: parameter.defaultpeers,
    fcn: parameter.fcn,
    args: parameter.args,
  };

  return { endPoint, data, config };
};

const PrerequistiesInsUpd = (parameter) => {
  let endPoint = process.env.REACT_APP_ENDPOINT_PRODUCT;
  let token = process.env.REACT_APP_TOKEN;

  const config = {
    method: parameter.actiontype,
    headers: {
      "Content-Type": "application/json",
      "Acess-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  const data = {
    peers: parameter.defaultpeers,
    fcn: "addproduct",
    args: parameter.args,
  };

  return { endPoint, data, config };
};

const UID = (categoryName) => {
  console.log("UID:", new Date().getTime());
  const val = Math.floor(new Date().getTime() * Math.random(0, 300));
  let hashVal = shortHash(val).toUpperCase();
  return `${categoryName}${hashVal}`;
};
//FieldValidations
const checkQuantity = (event) => {
  const regex = /^[0-9\b]+$/;
  return event.target.value === "" || regex.test(event.target.value);
};
//Ph-Value, Temp
const checkNumWithDecimal = (event) => {
  //const regex = /^\d+\.\d{0,2}$/;
  const regex = /^[0-9\b]+$/;
  return event.target.value === "" || regex.test(event.target.value);
};
export {
  PrerequistiesConfig,
  PrerequistiesDelete,
  PrerequistiesInsUpd,
  checkQuantity,
  checkNumWithDecimal,
  UID,
};
