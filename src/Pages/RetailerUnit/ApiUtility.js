const ConfigForDistributionRetailerList = (inputParam) => {
  const parameter = {
    args: inputParam.args,
    fcn: inputParam.fcn,
    defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
  };
  //let endPoint = process.env.REACT_APP_ENDPOINT_CARTONLIST;
  let endPoint =
    "http://20.96.181.1:5000/channels/mychannel/chaincodes/supplychain";
  console.log("endpoint -", endPoint);
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
  console.log("Params :", config.params);
  return { endPoint, config };
};

const PrerequistiesConfigCartonList = (distributionParam) => {
  const parameter = {
    args: distributionParam,
    fcn: distributionParam,
    defaultpeers: ["peer0.org1.example.com", "peer0.org2.example.com"],
  };
  //let endPoint = process.env.REACT_APP_ENDPOINT_CARTONLIST;
  let endPoint =
    "http://20.96.181.1:5000/channels/mychannel/chaincodes/supplychain";
  console.log("endpoint -", endPoint);
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
  console.log("Params :", config.params);
  return { endPoint, config };
};

const PrerequistiesConfig = (productProcessing) => {
  const parameter = {
    args: productProcessing,
    fcn: "getProductShippingUnit",
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

const PrerequistiesDeleteNotApplicable = (parameter) => {
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
  // let endPoint = process.env.REACT_APP_ENDPOINT_ADDTOCARTON;
  let token = process.env.REACT_APP_TOKEN;
  let endPoint = "http://20.96.181.1:5000/shippingUnitCarton";
  console.log("EndPoint ", endPoint);
  const config = {
    method: parameter.actiontype,
    headers: {
      "Content-Type": "application/json",
      "Acess-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  console.log("Parameter ::", parameter);
  const data = {
    peers: parameter.defaultpeers,
    fcn: parameter.fcn,
    args: parameter.input,
  };
  console.log(" data ", data);
  return { endPoint, data, config };
};

export {
  PrerequistiesConfig,
  PrerequistiesInsUpd,
  PrerequistiesConfigCartonList,
  ConfigForDistributionRetailerList,
};
